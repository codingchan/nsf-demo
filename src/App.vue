<script setup lang="ts">
import { ref, Ref } from '@vue/reactivity'
import Targets from './components/Targets.vue'
import Welcome from './components/Welcome.vue'
import Article from './components/Article.vue'
import Test from './components/CreateAds.vue'
import AdList from './components/AdList.vue'
import Compare from './components/Compare.vue'

interface AdType {
  content: string
  img: string
}

const timeline: Ref<any[]> = ref([
  { key: 'targets', title: 'Targets & Buget' },
  { key: 'welcome', title: 'Choose' },
  { key: 'article', title: 'Article' },
  { key: 'test', title: 'Tweet' },
  { key: 'compare', title: 'Complete' },
])
const step: Ref<string> = ref('targets')
const adList: Ref<AdType[]> = ref([])
const editAdIndex: Ref<number> = ref(-1)

function changeStep (_step: string) {
  step.value = _step
}

function adsEditDone (_adList: AdType[]) {
  adList.value = _adList
  if (_adList[_adList.length - 1].content === '' && _adList[_adList.length - 1].img === '') {
    adList.value.pop()
  }
  changeStep('adList')
}

function editAd (index: number) {
  editAdIndex.value = index
  changeStep('test')
}
function deleteAd (index: number) {
  adList.value.splice(index, 1)
} 
</script>

<template>
  <div class="timeline">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in timeline"
        :key="index"
        hide-timestamp
        :type="item.key === step ? 'primary' : ''"
      >
        <span :class=" { timelineContent: true, active: item.key === step }">{{ item.title }}</span>
      </el-timeline-item>
    </el-timeline>
  </div>
  <div class="app-content">
    <Targets v-if="step === 'targets'" @ok="changeStep('budget')" />
    <Welcome v-if="step === 'welcome'" @click="changeStep" />
    <Article v-if="step === 'article'" @ok="changeStep('test')" />
    <Test v-if="step === 'test'" :init-ad-list="adList" :actived="editAdIndex" @done="adsEditDone" />
    <ad-list
      v-if="step === 'adList'"
      :ad-list="adList"
      @edit="editAd"
      @delete="deleteAd"
      @upload="changeStep('compare')"
    />
    <Compare v-if="step === 'compare'" />
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}

html, body {
  height: 100%;
}

ul, li {
  list-style: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  width: 100%;
  height: 100%;
  display: flex;
}

.timeline {
  padding: 20px;
  margin-right: 20px;
}

.timelineContent {
  font-size: 18px;
  font-weight: bold;
  cursor: default;
}

.timelineContent.active {
  color: #409eff;
}

.app-content {
  flex: 1;
  height: 100%;
  overflow: auto;
}
</style>
