<script setup lang="ts">
const { signIn, signOut, status } = useAuth()
const testString = ref('test')

const email = ref('103510351035@qq.com')
const code = ref('')

async function handleLogin() {
  const result = await signIn('credentials', {
    email: email.value,
    code: code.value,
    redirect: false,
  })
  console.log('result', result)
}

async function handleSendCode() {
  const result = await useFetch('/api/auth/email/send-code', {
    method: 'POST',
    body: {
      email: email.value,
    },
  })
  console.log('result', result)
}
</script>

<template>
  <div>
    <div @click="testString = 'test2'">
      {{ testString }}
    </div>
    <div>
      <button class="login-button github" @click="signIn('github')">
        使用 GitHub 登录
      </button>
    </div>
    <div>
      <button class="login-button google" @click="signIn('google')">
        使用 Google 登录
      </button>
    </div>
    <div>
      <div>
        <input v-model="email" type="email" placeholder="邮箱">
      </div>
      <div>
        <input v-model="code" type="text" placeholder="验证码">
      </div>
      <button class="login-button email" @click="handleSendCode">
        发送验证码
      </button>
      <button class="login-button email" @click="handleLogin">
        使用邮箱登录
      </button>
    </div>
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

.email {
  background-color: #007bff;
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
