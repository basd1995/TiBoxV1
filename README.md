# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# TiBoxV1

## 项目设置

### 数据库设置

本项目使用 PostgreSQL 作为数据库，并使用 Prisma 作为 ORM。

#### 1. 安装 PostgreSQL

```bash
# 使用 Homebrew 安装 PostgreSQL
brew install postgresql@14

# 启动 PostgreSQL 服务
brew services start postgresql@14

# 创建数据库
createdb tibox
```

#### 2. 配置环境变量

在 `.env` 文件中配置数据库连接：

```env
DATABASE_URL="postgresql://barry@localhost:5432/tibox?schema=public"
```

#### 3. 初始化数据库

```bash
# 同步数据库模型
pnpm db:push

# 测试数据库连接
pnpm db:test
```

### 数据库管理

#### 使用 Prisma Studio 查看数据库

```bash
pnpm db:studio
```

访问 http://localhost:5555 查看数据库内容。

## 开发命令

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm generate` - 生成静态文件
- `pnpm preview` - 预览生产版本
- `pnpm db:studio` - 打开数据库管理界面
- `pnpm db:push` - 同步数据库模型
- `pnpm db:test` - 测试数据库连接

## 技术栈

- Nuxt 3
- Vue 3
- PostgreSQL
- Prisma
- NextAuth.js
