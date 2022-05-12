<script setup lang="ts">
import { PropType } from '@vue/runtime-core'
import { Edit, Delete } from '@element-plus/icons-vue'
import { AdType } from '@/assets/public.ts'

defineProps({
  treeData: {
    type: Array,
    required: true
  }
})
const emits = defineEmits(['edit', 'delete', 'back', 'done'])
</script>

<template>
  <div class="tweetList-wrapper">
    <h1>Chart your Courses</h1>
    <div class="category-list">
      <el-space :size="20">
        <el-card
          v-for="(category, index) in treeData"
          :key="index"
          :header="category.label"
        >
          <div v-for="tweet in category.children" :key="tweet.id" class="tweet-item">
            <p>{{ tweet.content }}</p>
            <img v-if="tweet.img" :src="tweet.img" :style="{ marginTop: tweet.content ? '12px' : 0 }">
            <div class="actions">
              <el-button :icon="Edit" circle @click="emits('edit', tweet.id)" />
              <el-button :icon="Delete" circle @click="emits('delete', tweet.id)" />
            </div>
          </div>
        </el-card>
      </el-space>
    </div>
    <div class="bottom-btns">
      <el-button @click="emits('back')">Back</el-button>
      <el-button type="primary" @click="emits('done')">Tweet</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tweetList-wrapper {
  padding: 3%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
}

.category-list {
  flex: 1;
  overflow: auto;
  display: flex;
  margin: 20px 0;

  :deep(.el-space__item) {
    height: 100%;
  }

  .el-card {
    flex-shrink: 0;
    width: 450px;
    height: 100%;
    box-sizing: border-box;
  }

  :deep(.el-card__header) {
    text-align: center;
  }

  :deep(.el-card__body) {
    height: calc(100% - 55px);
    overflow: auto;
    box-sizing: border-box;
  }
}

.tweet-item {
  background-color: #f7f7f7;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

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

  .actions {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    opacity: 0;
    transition: opacity .3s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover .actions {
    opacity: 1;
  }
}

.bottom-btns {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
