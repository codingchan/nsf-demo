<script setup lang="ts">
import { ref, Ref } from '@vue/reactivity'
import { computed, onBeforeUnmount, onMounted } from '@vue/runtime-core'
import { VideoPlay, VideoPause } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart } from 'echarts/charts'
import {
  TooltipComponent,
  GridComponent,
  GraphicComponent,
  DataZoomComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { getBeforeDate, chartColor } from '@/assets/public.ts'

use([
  CanvasRenderer,
  ScatterChart,
  TooltipComponent,
  GridComponent,
  GraphicComponent,
  DataZoomComponent
])

type EChartsOption = echarts.EChartsOption

const updateFrequency: number = 3000

// 原始数据
const numberRaw: Array<number[]> = [
  [0, 4, 6, 2, 1, 4],
  [4, 6, 7, 6, 3, 5],
  [7, 13, 16, 6, 7, 10],
  [7 * 2, 15 * 2, 20 * 2, 12 * 2, 10 * 2, 12 * 2],
  [10 * 3, 18 * 3, 22 * 3, 18 * 3, 18 * 3, 12 * 3],
  [15 * 4, 22 * 4, 25 * 4, 22 * 4, 25 * 4, 17 * 4],
  [20 * 5, 22 * 5, 28 * 5, 26 * 5, 30 * 5, 27 * 5]
]
const replyRaw: Array<number[]> = [
  [0, 2, 3, 1, 1, 5],
  [3, 8, 5, 4, 4, 9],
  [8, 10, 12, 10, 8, 10],
  [15, 14, 19, 17, 12, 16],
  [18, 20, 21, 22, 14, 23],
  [24, 20, 25, 26, 20, 30],
  [29, 24, 28, 32, 25, 40]
]
const retweetRaw: Array<number[]> = [
  [0, 4, 6, 2, 1, 4],
  [4, 6, 7, 6, 3, 5],
  [7, 13, 16, 6, 7, 10],
  [7, 15, 20, 12, 10, 12],
  [10, 18, 22, 18, 18, 12],
  [15, 22, 25, 22, 25, 17],
  [20, 22, 28, 26, 30, 27]
]

const dayNumber: number = numberRaw.length // 天数
const days: Ref<string[]> = ref([]) // 显示日期
for (let i: number = dayNumber - 1; i >= 0; i--) {
  days.value.push(getBeforeDate(i))
}

const index: Ref<number> = ref(0)
const sliderMarks = computed(() => {
  const target = {}
  days.value.forEach((item, i) => {
    target[i] = item
  })
  return target
})

const chartOption: Ref<EChartsOption> = ref({
  grid: {
    top: 70,
    bottom: 50,
    left: 20,
    right: 100,
    containLabel: true
  },
  color: chartColor,
  tooltip: {
    formatter: ({ data }) => `
      <b>${ data.title }</b><br/>
      urls contains: ${ data.symbolSize }<br/>
      retweets: ${ data.value[0] }<br/>
      replies: ${ data.value[1] }
    `
  },
  xAxis: {
    type: 'value',
    name: 'Retweets',
    nameTextStyle: { fontSize: 18 },
    min: 0,
    max: Math.max(...retweetRaw.map(item => Math.max(...item)))
  },
  yAxis: {
    type: 'value',
    name: 'Replies',
    nameTextStyle: { fontSize: 18 },
    min: 0,
    max: Math.max(...replyRaw.map(item => Math.max(...item)))
  },
  series: [{
    type: 'scatter',
    colorBy: 'data'
  }],
  animationDuration: updateFrequency,
  animationDurationUpdate: updateFrequency,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear',
  graphic: {
    elements: [
      {
        type: 'text',
        right: 120,
        bottom: 80,
        style: {
          font: 'bolder 80px monospace',
          fill: 'rgba(100, 100, 100, 0.25)'
        },
        z: 100
      }
    ]
  }
})

const tweetNumber: number = numberRaw[0].length // tweet数量
function update (_index: number) {
  const data = []
  for (let i = 0; i < tweetNumber; i++) {
    data[i] = {
      value: [retweetRaw[_index][i], replyRaw[_index][i]],
      symbolSize: numberRaw[_index][i],
      title: 'tweet ' + (i + 1)
    }
  }

  chartOption.value.series[0].data = data
  chartOption.value.graphic.elements[0].style.text = days.value[_index]
}

const timer: Ref<any> = ref(null)
function start () {
  update(index.value)
  timer.value = setInterval(() => {
    if (index.value < dayNumber - 1) {
      index.value++
      update(index.value)
    } else {
      stop()
    }
  }, updateFrequency)
}
function stop () {
  clearInterval(timer.value)
  timer.value = null
}
function triggerTimer () {
  if (timer.value) stop()
  else {
    if (index.value === dayNumber - 1) index.value = 0
    start()
  }
}
function manualSlide(val: number) {
  stop()
  update(index.value)
}

onMounted(start)
onBeforeUnmount(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>

<template>
  <div class="scatter-wrapper">
    <div class="slider-box">
      <el-button type="text" :icon="timer ? VideoPause : VideoPlay " @click="triggerTimer" />
      <el-slider v-model="index" :show-tooltip="false" :max="days.length - 1" :marks="sliderMarks" @change="manualSlide" />
    </div>
    <v-chart :option="chartOption" />
  </div>
</template>

<style lang="scss" scoped>
.scatter-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  x-vue-echarts {
    flex: 1;
  }
}

.slider-box {
  display: flex;
  padding-right: 18px;
  margin: 30px 0;

  .el-button {
    margin-right: 30px;
    padding: 0;
    font-size: 32px;
  }
}

.el-slider {
  flex: 1;
}

:deep(.el-slider__marks-text) {
  white-space: nowrap;
}
</style>
