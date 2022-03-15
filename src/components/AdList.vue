<script setup lang="ts">
import { PropType } from '@vue/runtime-core'

defineProps({
  adList: {
    type: Array as PropType<string[]>,
    required: true
  }
})
const emits = defineEmits(['edit', 'delete', 'upload'])
</script>

<template>
  <div class="adList-wrapper">
    <div class="adList">
      <div v-for="(ad, index) in adList" :key="index" class="adItem">
        <div class="adContent">{{ ad }}</div>
        <div class="actions">
          <button style="margin-right: 20px;" @click="emits('edit', index)">edit</button>
          <button @click="emits('delete', index)">delete</button>
        </div>
      </div>
    </div>
    <button class="upload-btn" @click="emits('upload')">Tweet</button>
  </div>
</template>

<style lang="scss" scoped>
.adList-wrapper {
  height: 90%;
  width: 90%;
  display: flex;
  flex-direction: column;
}

.adList {
  display: flex;
  flex-wrap: wrap;
}

.adItem {
  width: 30%;
  margin: 0 1.66% 30px;
}

.adContent {
  border: 1px solid #dcdee2;
  border-radius: 4px;
  padding: 20px 10px;
  margin-bottom: 20px;
  word-break: break-all;
}

.actions {
  display: flex;
  justify-content: center;

  button {
    border: 1px solid #dcdee2;
    border-radius: 4px;
    padding: 10px 15px;
    background-color: transparent;
    outline: none;
    cursor: pointer;
  }
}

.upload-btn {
  cursor: pointer;
  padding: 15px 0;
  width: 300px;
  max-width: 100%;
  margin: 0 auto;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  background-color: transparent;
  outline: none;
}
</style>
