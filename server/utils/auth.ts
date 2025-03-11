import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'

// 生成随机验证码
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// 生成重置密码的令牌
export function generateResetToken(): string {
  return randomBytes(32).toString('hex')
}

// 密码加密
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

// 验证密码
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// 验证码是否过期
export function isCodeExpired(expiryDate: Date | null): boolean {
  if (!expiryDate) return true
  return new Date() > expiryDate
}

// 密码重置令牌是否过期
export function isTokenExpired(expiryDate: Date): boolean {
  return new Date() > expiryDate
}

// 生成过期时间
export function generateExpiryDate(minutes: number): Date {
  const date = new Date()
  date.setMinutes(date.getMinutes() + minutes)
  return date
} 
