<script setup lang="ts">
import { ref, Ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import CampaignDetails from './views/CampaignDetails.vue'
import Targets from './views/Targets.vue'
import Welcome from './components/Welcome.vue'
import Article from './components/Article.vue'
import Test from './views/CreateAds.vue'
import AdList from './components/AdList.vue'
import Compare from './components/Compare.vue'

interface AdType {
  id: number
  content: string
  img: string
  category: string
}

const timeline: Ref<any[]> = ref([
  { key: 'campaign', title: 'Campaign Details' },
  { key: 'targets', title: 'Targets & Buget' },
  { key: 'welcome', title: 'Choose' },
  // { key: 'article', title: 'Article' },
  { key: 'test', title: 'Tweet' },
  { key: 'compare', title: 'Compete!' },
])
const step: Ref<string> = ref('test')
const stepIndex = computed<number>(() => timeline.value.findIndex(ele => ele.key === step.value))
const adList: Ref<AdType[]> = ref([])
const editAdIndex: Ref<number> = ref(-1)

function changeStep (_step: string) {
  step.value = _step
}

function handleClickTimeline (enabled: boolean, _step: string) {
  if (enabled) {
    changeStep(_step)
  }
}

function adsEditDone (_adList: AdType[]) {
  adList.value = _adList
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
        <span
          :class="{ timelineContent: true, active: item.key === step, disabled: index > stepIndex }"
          @click="handleClickTimeline(index < stepIndex, item.key)"
        >{{ item.title }}</span>
      </el-timeline-item>
    </el-timeline>
  </div>
  <div class="app-content">
    <campaign-details v-show="step === 'campaign'" @done="changeStep('targets')" />
    <Targets v-show="step === 'targets'" @done="changeStep('welcome')" />
    <Welcome v-show="step === 'welcome'" @click="changeStep" />
    <!-- <Article v-show="step === 'article'" @ok="changeStep('test')" /> -->
    <Test v-show="step === 'test'" :init-ad-list="adList" :actived="editAdIndex" @done="adsEditDone" />
    <ad-list
      v-show="step === 'adList'"
      :ad-list="adList"
      @edit="editAd"
      @delete="deleteAd"
      @upload="changeStep('compare')"
    />
    <Compare v-show="step === 'compare'" />
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
  cursor: pointer;
}
.timelineContent.active {
  color: #409eff;
  cursor: default;
}
.timelineContent.disabled {
  color: #999;
  cursor: not-allowed;
}

.app-content {
  flex: 1;
  height: 100%;
  overflow: auto;
}
</style>
