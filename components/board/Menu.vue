<script setup lang='ts'>
// 画布菜单 抓手、鼠标、橡皮擦、画笔、矩形、圆形、文字、图片、导入、导出、保存
const menuItems = [
  {
    label: '抓手',
  },
  {
    label: '鼠标',
  },
  {
    label: '橡皮擦',
  },
  {
    label: '画笔',
  },
  {
    label: '矩形',
  },
  {
    label: '圆形',
  },
  {
    label: '文字',
  },
  {
    label: '图片',
  },
  {
    label: '导入',
  },
  {
    label: '导出',
  },
  {
    label: '保存',
  },
]
</script>

<template>
  <div class="menu-container">
    <div v-for="item in menuItems" :key="item.label" class="menu-item">
      {{ item.label }}
    </div>
  </div>
</template>

<style scoped>
.menu-container {
  display: flex;
  gap: 10px;
}
.menu-item {
  padding: 2px 4px;
  border: 1px solid #000;
  cursor: pointer;
}
</style>
