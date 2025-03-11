import { PrismaClient } from '@prisma/client'
import { isCodeExpired, hashPassword } from '~/server/utils/auth'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const { email, code, password } = await readBody(event)

    if (!email || !code || !password) {
      throw createError({
        statusCode: 400,
        message: '请提供完整信息'
      })
    }

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email }
    })

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

    if (!verifyCode || isCodeExpired(verifyCode.expires)) {
      throw createError({
        statusCode: 400,
        message: '验证码无效或已过期'
      })
    }

    // 加密密码并更新用户
    const hashedPassword = await hashPassword(password)
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        verifyCode: null,
        verifyCodeExp: null,
        emailVerified: new Date()
      }
    })

    return { success: true }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || '验证失败'
    })
  }
}) 
