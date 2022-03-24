<script setup lang="ts">
import { ref, Ref } from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import * as echarts from 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart } from 'echarts/charts'
import {
  TooltipComponent,
  GridComponent,
  GraphicComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  ScatterChart,
  TooltipComponent,
  GridComponent,
  GraphicComponent
])

type EChartsOption = echarts.EChartsOption

function getBeforeDate (n: number) { // 获取今天前第n天的日期
  const date = new Date()
  const month: number = date.getMonth() + 1
  date.setDate(date.getDate() - n)
  let day: number = date.getDate()
  return (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day)
}

const updateFrequency: number = 3000
const colors: string[] = ['#ead7bb', '#5d7599', '#abb6c8', '#9fcaa3', '#e78764', '#e1d839']

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
const days: string[] = [] // 显示日期
for (let i: number = dayNumber - 1; i >= 0; i--) {
  days.push(getBeforeDate(i))
}

const chartOption: Ref<EChartsOption> = ref({
  grid: {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
    containLabel: true
  },
  color: colors,
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
    min: 0,
    max: Math.max(...retweetRaw.map(item => Math.max(...item)))
  },
  yAxis: {
    type: 'value',
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
        right: 100,
        bottom: 50,
        style: {
          font: 'bolder 80px monospace',
          fill: 'rgba(100, 100, 100, 0.25)'
        },
        z: 100
      }
    ]
  }
})

let timer: any = null
onMounted(() => {
  const tweetNumber: number = numberRaw[0].length // tweet数量
  let index = 0
  function update () {
    const data = []
    for (let i = 0; i < tweetNumber; i++) {
      data[i] = {
        value: [retweetRaw[index][i], replyRaw[index][i]],
        symbolSize: numberRaw[index][i],
        title: 'tweet ' + (i + 1)
      }
    }
    console.log(data)
    chartOption.value.series[0].data = data
    chartOption.value.graphic.elements[0].style.text = days[index]

    if (index < dayNumber - 1) index++
    else clearInterval(timer)
  }
  update()
  timer = setInterval(update, updateFrequency)
})
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <v-chart :option="chartOption" />
</template>
