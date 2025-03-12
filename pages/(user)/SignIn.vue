<script lang="ts" setup>
const { status } = useAuth()
const email = ref('barry.caosong@gmail.com')
const code = ref('')
const password = ref('')
// 发送验证码
async function sendCode() {
  const { data, error } = await useFetch('/api/auth/email/send-code', {
    method: 'POST',
    body: { email: email.value },
  })
  if (error) {
    console.error(error)
  }
  console.info(data)
}

// 邮箱登录
async function signIn() {
  const { data, error } = await useFetch('/api/auth/email/verify-code', {
    method: 'POST',
    body: {
      email: email.value,
      code: code.value,
      password: password.value,
    },
  })
  if (error) {
    console.error(error)
  }
  console.info(data)
}
</script>

<template>
  <div>
    <h1>SignIn</h1>
    {{ status }}
    <button @click="sendCode">
      发送验证码
    </button>
    <input v-model="email" placeholder="邮箱">
    <input v-model="code" placeholder="验证码">
    <input v-model="password" placeholder="密码">
    <button @click="signIn">
      邮箱登录
    </button>
  </div>
</template>

<style>

</style>
