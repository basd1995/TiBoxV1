<script setup lang="ts">
const { signOut } = useAuth()

async function handleLogout() {
  try {
    await signOut({
      callbackUrl: '/', // 登出后重定向到首页
      redirect: true,
    })
  }
  catch (error) {
    console.error('登出失败:', error)
  }
}
</script>

<template>
  <button
    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    @click="handleLogout"
  >
    退出登录
  </button>
</template>
