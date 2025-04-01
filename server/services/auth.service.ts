import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export class AuthService {
  static async verifyCode(email: string, code: string) {
    // 调用接口验证验证码是否存在
    const data = await $fetch('/api/auth/email/verify-code', {
      method: 'POST',
      body: { email, code },
    })
    
    if (!data.success) {
      throw new Error('验证码错误')
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      throw new Error('用户不存在')
    }

    await prisma.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: 'email',
          providerAccountId: user.id.toString()
        }
      },
      update: {},
      create: {
        type: 'code',
        provider: 'email',
        providerAccountId: user.id.toString(),
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    console.log('返回的user', user)
    return user
  }
} 
