<script setup lang="ts">
import { ref, Ref } from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import * as echarts from 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  GraphicComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
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

const updateFrequency: number = 6000
const tweetNumber: number = 4 // tweet数量
const dayNumber: number = 10 // 天数
const colors: string[] = ['#ead7bb', '#5d7599', '#abb6c8', '#9fcaa3', '#e78764', '#e1d839']

const days: string[] = [] // 显示日期
for (let i: number = dayNumber - 1; i >= 0; i--) {
  days.push(getBeforeDate(i))
}

const raw: Array<number[]> = [] // 原始数据
for (let i: number = 0; i < dayNumber; i++) {
  raw.push([])
  for (let j: number = 0;j < tweetNumber; j++) {
    raw[i].push(Math.round(Math.random() * 100) + i * 100)
  }
}

const tweets: string[] = [] // 纵坐标data
for (let i: number = 1; i <= tweetNumber; i++) {
  tweets.push('tweet ' + i)
}

const chartOption: Ref<EChartsOption> = ref({
  grid: {
    top: 30,
    bottom: 30,
    left: 30,
    right: 30,
    containLabel: true
  },
  color: colors,
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    inverse: true,
    axisLabel: {
      show: true,
      fontSize: 14,
      rich: {
        flag: {
          fontSize: 25,
          padding: 5
        }
      }
    },
    data: tweets,
    animationDuration: 300,
    animationDurationUpdate: 300
  },
  series: [{
    realtimeSort: true,
    seriesLayoutBy: 'column',
    type: 'bar',
    colorBy: 'data',
    barWidth: '40%',
    label: {
      show: true,
      position: 'right',
      valueAnimation: true,
      fontFamily: 'monospace'
    }
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
  let index = 0
  function update () {
    chartOption.value.series[0].data = raw[index]
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
