import { PrismaClient } from '@prisma/client'
import { generateVerificationCode, generateExpiryDate } from '~/server/utils/auth'
import { sendVerificationCode } from '~/server/utils/mailer'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    if (!body?.email) {
      return {
        statusCode: 400,
        message: '请提供邮箱地址'
      }
    }

    const { email } = body

    // 生成验证码和过期时间
    const verifyCode = generateVerificationCode()
    const verifyCodeExp = generateExpiryDate(15) // 15分钟后过期

    console.log('生成的验证码信息:', { email, verifyCode, verifyCodeExp })

    // 确保用户存在
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email
      }
    })

    console.log('用户信息:', user)

    // 删除旧的验证码
    const deletedTokens = await prisma.verificationToken.deleteMany({
      where: {
        identifier: email
      }
    })

    console.log('删除的旧验证码:', deletedTokens)

    // 创建新的验证码记录
    const newToken = await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: verifyCode,
        expires: verifyCodeExp
      }
    })

    console.log('创建的新验证码:', newToken)

    // 发送验证码邮件
    await sendVerificationCode(email, verifyCode)

    return { 
      statusCode: 200,
      message: '验证码已发送',
      data: { email } 
    }
  } catch (error: any) {
    console.error('发送验证码失败:', error)
    return {
      statusCode: 500,
      message: error.message || '发送验证码失败'
    }
  }
}) 
