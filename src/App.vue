<script setup lang="ts">
import { ref, Ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import CampaignDetails from './views/CampaignDetails.vue'
import TargetsAndBuget from './views/Targets&Buget.vue'
import Welcome from './components/Welcome.vue'
import Article from './components/Article.vue'
import Tweet from './views/Tweet/Index.vue'
import Compete from './views/Compete/Index.vue'

const timeline: Ref<any[]> = ref([
  { key: 'campaign', title: 'Campaign Details' },
  { key: 'targets', title: 'Targets & Buget' },
  // { key: 'welcome', title: 'Choose' },
  // { key: 'article', title: 'Article' },
  { key: 'tweet', title: 'Tweet' },
  { key: 'compete', title: 'Compete!' },
])
const step: Ref<string> = ref('campaign')
const stepIndex = computed<number>(() => timeline.value.findIndex(ele => ele.key === step.value))

function changeStep (_step: string) {
  step.value = _step
}

function handleClickTimeline (enabled: boolean, _step: string) {
  if (enabled) {
    changeStep(_step)
  }
}

const tweets = ref({})
function editTweetDone (data) {
  tweets.value = data
  changeStep('compete')
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
    <targets-and-buget v-show="step === 'targets'" @done="changeStep('tweet')" />
    <!-- <Welcome v-show="step === 'welcome'" @click="changeStep" /> -->
    <!-- <Article v-show="step === 'article'" @ok="changeStep('tweet')" /> -->
    <Tweet v-show="step === 'tweet'" @done="editTweetDone" />
    <Compete :data="tweets" v-if="step === 'compete'" />
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
