import nodemailer from 'nodemailer'

// 创建邮件传输器
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.qq.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// 发送验证码邮件
export async function      sendVerificationCode(email: string, code: string) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: '验证码 - TiBox',
    html: `
      <div style="padding: 20px; background-color: #f5f5f5;">
        <h2>您的验证码是：</h2>
        <h1 style="color: #1a73e8; font-size: 32px;">${code}</h1>
        <p>验证码有效期为15分钟，请尽快使用。</p>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

// 发送密码重置邮件
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: '重置密码 - TiBox',
    html: `
      <div style="padding: 20px; background-color: #f5f5f5;">
        <h2>重置密码</h2>
        <p>点击下面的链接重置您的密码：</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #1a73e8; color: white; text-decoration: none; border-radius: 5px;">
          重置密码
        </a>
        <p>链接有效期为1小时。如果您没有请求重置密码，请忽略此邮件。</p>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
} 
