<script setup lang="ts">
const emits = defineEmits(['click'])
</script>

<template>
  <div class="welcome-wrapper">
    <div class="btn" @click="emits('click', 'test')">
      Test Tweets<br />
      for<br />
      my article
    </div>
    <div class="btn" @click="emits('click', 'compare')">
      Article<br />
      VS<br />
      Article
    </div>
  </div>
</template>

<style lang="scss" scoped>
.welcome-wrapper {
  height: 60%;
  width: 90%;
  display: flex;
  justify-content: space-between;
}

.btn {
  border: 1px solid #dcdee2;
  border-radius: 8px;
  height: 100%;
  min-height: 300px;
  width: 45%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  line-height: 80px;
  text-align: center;
}
</style>
