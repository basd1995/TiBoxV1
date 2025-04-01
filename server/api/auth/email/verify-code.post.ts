import { PrismaClient } from '@prisma/client'
import { isCodeExpired, hashPassword } from '~/server/utils/auth'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const { email, code } = await readBody(event)

    console.log('收到的验证请求:', { email, code })

    if (!email || !code) {
      throw createError({
        statusCode: 400,
        message: '请提供完整信息'
      })
    }

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email }
    })

    console.log('查找到的用户:', user)

    if (!user) {
      throw createError({
        statusCode: 404,
        message: '用户不存在'
      })
    }

    // 验证验证码
    const verifyCode = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token: code
      }
    })

    console.log('查找到的验证码:', verifyCode)

    if (!verifyCode || isCodeExpired(verifyCode.expires)) {
      throw createError({
        statusCode: 400,
        message: '验证码无效或已过期'
      })
    }

    // 加密密码并更新用户
    // const hashedPassword = await hashPassword(password)
    // const updatedUser = await prisma.user.update({
    //   where: { email },
    //   data: {
    //     password: hashedPassword,
    //     emailVerified: new Date()
    //   }
    // })

    // console.log('更新后的用户:', updatedUser)

    // 删除已使用的验证码
    const deletedToken = await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token: code
        }
      }
    })

    console.log('删除的验证码:', deletedToken)

    return { success: true }
  } catch (error: any) {
    console.error('验证失败:', error)
    throw createError({
      statusCode: 500,
      message: error.message || '验证失败'
    })
  }
}) 
