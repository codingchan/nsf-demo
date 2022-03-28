<script setup lang="ts">
import { ref, Ref } from '@vue/reactivity'
import { nextTick, onMounted } from '@vue/runtime-core'
import TwitterEditor from './twitterEditor.vue'

interface AdType {
  content: string
  img: string
}

const props = defineProps(['initAdList', 'actived'])
const emits = defineEmits(['done'])

const adList: Ref<AdType[]> = ref([{
  content: '',
  img: ''
}])
const currentAdIndex: Ref<number> = ref(0)
const twitterEditor: Ref<any> = ref(null)

function handleChangeTwitterValue (val: AdType) {
  adList.value[currentAdIndex.value] = val
}
function changeCurrentAdIndex (index: number) {
  currentAdIndex.value = index
  twitterEditor.value.changeEditContent(adList.value[index])
}
function create () {
  adList.value.push({
    content: '',
    img: ''
  })
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
      <div class="tips">
        <p><span>Tip 1:</span> Avoid repeating misinformation. Say what’s true.<el-link type="primary">see more</el-link></p>
        <p><span>Tip 2</span>: Choose your sources wisely. Try to find a credible source that the person respects.<el-link type="primary">see more</el-link></p>
        <p><span>Tip 3</span>: Give readers a sense of where the scientific community stands and how strong the available evidence is for different views.<el-link type="primary">see more</el-link></p>
        <p><span>Tip 4</span>: Consider headlines and images that inform rather than shock or provoke.<el-link type="primary">see more</el-link></p>
      </div>
    </div>
    <div class="actions">
      <div class="articleUrl">
        <p>Article: U.S. Warns China Not to Help Russia in Ukraine</p>
        <p class="url-text">URL: <a href="https://www.nytimes.com/live/2022/03/14/world/ukraine-russia-war">https://www.nytimes.com/live/2022/03/14/world/ukraine-russia-war</a></p>
      </div>

      <button @click="create">+</button>

      <button @click="emits('done', adList)">DONE</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.createAds-wrapper {
  padding: 3%;
  display: flex;
  justify-content: space-between;
  min-height: 100%;
  box-sizing: border-box;
}

.adList {
  border: 1px solid #dcdee2;
  border-radius: 4px;
  padding: 10px;
  width: 15%;
}

.adItem {
  padding: 10px;
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
    margin-bottom: 20px;
  }

  .tips {
    margin-top: 20px;
    word-break: break-word;
    padding: 20px 20px 10px;

    p {
      margin-bottom: 10px;
    }

    span {
      font-weight: bold;
    }

    .el-link {
      margin-left: 8px;
    }
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

.tips,
.articleUrl {
  padding: 20px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  word-break: break-word;
  line-height: 1.5;
}

.url-text {
  word-break: break-all;
}
</style>
