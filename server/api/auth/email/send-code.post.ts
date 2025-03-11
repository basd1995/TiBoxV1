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

    // 更新或创建用户
    await prisma.user.upsert({
      where: { email },
      update: {
        verifyCode,
        verifyCodeExp
      },
      create: {
        email,
        verifyCode,
        verifyCodeExp
      }
    })

    // 发送验证码邮件
    await sendVerificationCode(email, verifyCode)

    return { 
      statusCode: 200,
      message: '验证码已发送',
      data: { email } 
    }
  } catch (error: any) {
    return {
      statusCode: 500,
      message: error.message || '发送验证码失败'
    }
  }
}) 
