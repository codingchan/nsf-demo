<script lang="ts" setup>
import { ref, Ref } from '@vue/reactivity'

const emits = defineEmits(['ok'])

const title: Ref<string> = ref('')
const url: Ref<string> = ref('')
</script>

<template>
  <div class="article-wrapper">
    <h1>Article</h1>
    <el-input
      v-model="title"
      :autosize="{ minRows: 3 }"
      type="textarea"
      size="large"
      placeholder="Please input the article title"
    />
    <el-input
      v-model="url"
      :autosize="{ minRows: 3 }"
      type="textarea"
      size="large"
      placeholder="Please input the article URL"
    />
    <el-button size="large" @click="emits('ok')">Next</el-button>
  </div>
</template>

<style lang="scss" scoped>
.article-wrapper {
  height: 100%;
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-bottom: 30px;
  }

  .el-textarea {
    margin-bottom: 20px
  }
}
</style>
