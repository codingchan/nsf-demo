<script setup lang="ts">
import { ref, Ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import Trial from './views/Trial.vue'
import AudienceAndBuget from './views/Audience&Buget.vue'
import Welcome from './components/Welcome.vue'
import Article from './components/Article.vue'
import Message from './views/Message/Index.vue'
import Compete from './views/Compete/Index.vue'

const timeline: Ref<any[]> = ref([
  { key: 'trial', title: 'Your Course Correct Trial' },
  { key: 'audience', title: 'Audience & Budget' },
  // { key: 'welcome', title: 'Choose' },
  // { key: 'article', title: 'Article' },
  { key: 'message', title: 'Message Studio' },
  { key: 'compete', title: 'Compete!' },
])
const step: Ref<string> = ref('trial')
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
    <Trial v-show="step === 'trial'" @done="changeStep('audience')" />
    <audience-and-buget v-show="step === 'audience'" @done="changeStep('message')" />
    <!-- <Welcome v-show="step === 'welcome'" @click="changeStep" /> -->
    <!-- <Article v-show="step === 'article'" @ok="changeStep('message')" /> -->
    <Message v-show="step === 'message'" @done="editTweetDone" />
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
