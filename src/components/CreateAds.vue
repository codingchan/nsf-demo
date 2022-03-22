<script setup lang="ts">
import { ref, Ref } from '@vue/reactivity'
import { nextTick, onMounted } from '@vue/runtime-core'
import TwitterEditor from './twitterEditor.vue'

const props = defineProps(['initAdList', 'actived'])
const emits = defineEmits(['done'])

const adList: Ref<string[]> = ref([''])
const currentAdIndex: Ref<number> = ref(0)
const twitterEditor: Ref<any> = ref(null)

function handleChangeTwitterValue (val: string) {
  adList.value[currentAdIndex.value] = val
}
function changeCurrentAdIndex (current: number) {
  currentAdIndex.value = current
  twitterEditor.value.changeEditContent(adList.value[current])
}
function create () {
  adList.value.push('')
  changeCurrentAdIndex(adList.value.length - 1)
}

onMounted(() => {
  if (props.initAdList.length > 0) {
    adList.value = props.initAdList
  }

  if (props.actived > -1) {
    currentAdIndex.value = props.actived
  }

  nextTick(() => {
    twitterEditor.value.changeEditContent(adList.value[currentAdIndex.value])
  })
})
</script>

<template>
  <div class="createAds-wrapper">
    <ul class="adList">
      <li
        v-for="(ad, index) in adList"
        :key="index"
        class="adItem"
        :class="{ actived: currentAdIndex === index }"
        @click="changeCurrentAdIndex(index)"
      >Message {{ index + 1 }}</li>
    </ul>
    <div class="adEditor">
      <h1>Message {{ currentAdIndex + 1 }}</h1>
      <twitter-editor ref="twitterEditor" @change="handleChangeTwitterValue" @save="create" />
      <div class="suggestion">Learn how to start building, shipping, and maintaining software with GitHub. Explore our products, sign up for an account, and connect with the world's largest development community.</div>
    </div>
    <div class="actions">
      <div class="articleUrl">
        Article: U.S. Warns China Not to Help Russia in Ukraine<br />
        URL: <a href="https://www.nytimes.com/live/2022/03/14/world/ukraine-russia-war">https://www.nytimes.com/live/2022/03/14/world/ukraine-russia-war</a>
      </div>

      <button @click="create">+</button>

      <button @click="emits('done', adList)">DONE</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.createAds-wrapper {
  height: 90%;
  width: 90%;
  display: flex;
  justify-content: space-between;
}

.adList {
  border: 1px solid #dcdee2;
  border-radius: 4px;
  padding: 20px 10px;
  width: 15%;
}

.adItem {
  padding: 10px 20px;
  cursor: pointer;

  &.actived,
  &:hover {
    color: #2d8cf0;
  }
}

.adEditor {
  width: 50%;
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 30px;
  }

  .suggestion {
    font-size: 18px;
    margin-top: 20px;
  }
}

.actions {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  button {
    border: 1px solid #dcdee2;
    border-radius: 4px;
    padding: 50px;
    font-size: 50px;
    background-color: transparent;
    outline: none;
  }
}

.suggestion,
.articleUrl {
  padding: 10px 20px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  word-break: break-all;
  line-height: 1.5;
}
</style>
