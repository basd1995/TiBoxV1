<script lang="ts" setup>
const { init, addRect } = useLeafer()

onMounted(() => {
  init()
})
</script>

<template>
  <div>
    <h1>Board</h1>
    <button @click="addRect">
      Add Rect
    </button>
    <BoardMenu />
    <div id="leafer-view" class="leafer-container" />
  </div>
</template>

<style scoped>
.leafer-container {
  width: 100%;
  height: 80vh;
  border: 1px solid #000;
}
</style>
