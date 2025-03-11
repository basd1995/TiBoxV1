# Prisma 数据库说明

## 数据模型关系

### 1. User 表（用户表）

```prisma
model User {
  id            String    @id @default(cuid())  // 用户唯一标识
  name          String?   // GitHub 用户名
  email         String?   @unique  // 邮箱
  emailVerified DateTime? // 邮箱验证时间
  image         String?   // 头像 URL

  // 关系字段
  accounts      Account[] // 一个用户可以有多个第三方账号
  sessions      Session[] // 一个用户可以有多个会话
}
```

### 2. Account 表（账号表）

```prisma
model Account {
  id                String  @id @default(cuid())  // 账号唯一标识
  userId            String  // 关联的用户 ID
  type              String  // 账号类型（如 "oauth"）
  provider          String  // 提供商（如 "github"）
  providerAccountId String  // GitHub 的用户 ID
  refresh_token     String? @db.Text  // 刷新令牌
  access_token      String? @db.Text  // 访问令牌
  expires_at        Int?    // 令牌过期时间
  token_type        String? // 令牌类型
  scope             String? // 权限范围
  id_token         String? @db.Text  // ID 令牌
  session_state    String? // 会话状态

  // 关系字段
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}
```

### 3. Session 表（会话表）

```prisma
model Session {
  id           String   @id @default(cuid())  // 会话唯一标识
  sessionToken String   @unique  // 会话令牌
  userId       String   // 关联的用户 ID
  expires      DateTime // 会话过期时间

  // 关系字段
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## 表关系说明

### 一对多关系

1. 一个用户（User）可以有多个账号（Account）

   - 例如：同时使用 GitHub 和 Google 登录
   - 通过 `userId` 字段关联
   - 删除用户时自动删除关联的账号记录

2. 一个用户（User）可以有多个会话（Session）
   - 例如：在不同设备上登录
   - 通过 `userId` 字段关联
   - 删除用户时自动删除关联的会话记录

### 数据流程示例

1. 用户通过 GitHub 登录
2. 系统创建或更新 User 记录
3. 创建关联的 Account 记录（存储 GitHub 令牌）
4. 创建新的 Session 记录（维持登录状态）

## 常用操作

### 查看数据库内容

```bash
pnpm db:studio  # 启动 Prisma Studio
```

### 更新数据库结构

```bash
pnpm db:push    # 将 schema 变更推送到数据库
```

### 测试数据库连接

```bash
pnpm db:test    # 运行数据库连接测试
```

## 注意事项

1. 所有的 ID 字段都使用 `cuid()` 自动生成
2. 删除用户时会自动删除关联的账号和会话（级联删除）
3. 邮箱字段设置了唯一约束
4. Account 表的 provider 和 providerAccountId 组合具有唯一约束
