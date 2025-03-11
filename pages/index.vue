<script setup lang="ts">
const { signIn, signOut, status } = useAuth()
</script>

<template>
  <div>
    <button class="login-button github" @click="signIn('github')">
      使用 GitHub 登录
    </button>
    <button class="login-button google" @click="signIn('google')">
      使用 Google 登录
    </button>
    <button v-if="status === 'authenticated'" class="logout-button" @click="signOut()">
      退出登录
    </button>
    <UserProfile />
  </div>
</template>

<style scoped>
.login-button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.github {
  background-color: #24292e;
  color: white;
}

.google {
  background-color: #4285f4;
  color: white;
}

.logout-button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
  font-weight: bold;
}
</style>
