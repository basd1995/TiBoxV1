import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // 测试数据库连接
    await prisma.$connect()
    console.log('✅ 数据库连接成功！')
    
    // 测试查询
    const userCount = await prisma.user.count()
    console.log(`当前用户数量: ${userCount}`)
    
    // 测试创建用户
    const testUser = await prisma.user.create({
      data: {
        name: '测试用户',
        email: 'test@example.com',
      },
    })
    console.log('✅ 测试用户创建成功：', testUser)
    
    // 清理测试数据
    await prisma.user.delete({
      where: { id: testUser.id },
    })
    console.log('✅ 测试数据清理完成')
    
  } catch (error) {
    console.error('❌ 数据库测试失败：', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 
