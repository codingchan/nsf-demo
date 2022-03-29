<script setup lang="ts">
import { PropType } from '@vue/runtime-core'
import { Edit, Delete } from '@element-plus/icons-vue'

interface AdType {
  id: number
  content: string
  img: string
  category: string
}

defineProps({
  adList: {
    type: Array as PropType<AdType[]>,
    required: true
  }
})
const emits = defineEmits(['edit', 'delete', 'upload'])
</script>

<template>
  <div class="adList-wrapper">
    <el-row :gutter="30">
      <el-col v-for="(ad, index) in adList" :key="index" :xs="24" :sm="12" :md="8" class="adItem">
        <div class="adContent">
          <p>{{ ad.content }}</p>
          <img :src="ad.img" :style="{ marginTop: ad.content ? '12px' : 0 }">
        </div>
        <div class="actions">
          <el-button :icon="Edit" circle @click="emits('edit', index)" />
          <el-button :icon="Delete" circle @click="emits('delete', index)" />
        </div>
      </el-col>
    </el-row>
    <button class="upload-btn" @click="emits('upload')">Tweet</button>
  </div>
</template>

<style lang="scss" scoped>
.adList-wrapper {
  padding: 3%;
}

.adList {
  display: flex;
  flex-wrap: wrap;
}

.adItem {
  margin-bottom: 30px;
}

.adContent {
  border: 1px solid #dcdee2;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;

  p {
    font-size: 14px;
    line-height: 20px;
    word-break: break-word;
    overflow: hidden;
  }

  img {
    max-width: 100%;
    max-height: 350px;
  }
}

.actions {
  display: flex;
  justify-content: center;
}

.upload-btn {
  cursor: pointer;
  padding: 15px 0;
  width: 300px;
  max-width: 100%;
  display: block;
  margin: 0 auto;
  margin: 0 auto;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  background-color: transparent;
  outline: none;
}
</style>
