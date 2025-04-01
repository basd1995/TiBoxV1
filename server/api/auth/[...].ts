import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthService } from '../../services/auth.service'
// @ts-ignore
import { NuxtAuthHandler } from '#auth'

const prisma = new PrismaClient()

interface Credentials {
  email: string
  code: string
}

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    // @ts-expect-error Use .default here for it to work during SSR.
    CredentialsProvider.default({
      credentials: {
        email: { label: '邮箱', type: 'email' },
        code: { label: '验证码', type: 'text' },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials?.email || !credentials?.code) {
          return null
        }

        const user = await AuthService.verifyCode(credentials.email, credentials.code)
        console.log('authorize:user', user)

        return user
      }
    })
  ],
  callbacks: {
    async session({ session, user }: { session: any, user: any }) {
      console.log('callbacks:session', { session, user })
      if (session.user && user) {
        session.user.id = user.id
      }
      console.log('callbacks:session', session)
      return session
    },
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  },
  session: {
    strategy: "jwt"
  }
})
