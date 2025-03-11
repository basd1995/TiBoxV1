<script setup lang="ts">
const { data: session } = useAuth()
</script>

<template>
  <div v-if="session?.user" class="flex items-center gap-4 p-4">
    <img
      :src="session.user.image || ''"
      :alt="session.user.name || '用户头像'"
      class="w-10 h-10 rounded-full"
    >
    <div class="flex flex-col">
      <span class="font-medium">{{ session.user.name || '未知用户' }}</span>
      <span class="text-sm text-gray-500">{{ session.user.email || '无邮箱' }}</span>
    </div>
    <LogoutButton />
  </div>
  <div v-else>
    <!-- 这里可以放登录按钮 -->
  </div>
</template>
