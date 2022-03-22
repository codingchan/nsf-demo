<script setup lang="ts">
import Mock from 'mockjs'

const emits = defineEmits(['ok'])

const data = Mock.mock(
  ''
)
</script>

<template>
  <div class="targets-wrapper">
    <h1>Select Targets</h1>
    <div class="options">
      <div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.targets-wrapper{
  height: 90%;
  width: 90%;
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.options {
  flex: 1;
  overflow: auto;
}
</style>
