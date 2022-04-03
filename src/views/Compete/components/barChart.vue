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
import Mock from 'mockjs'
import { getBeforeDate, chartColor } from '@/assets/public.ts'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  GraphicComponent
])

type EChartsOption = echarts.EChartsOption
type CallbackDataParams = echarts.DefaultLabelFormatterCallbackParams

const props = defineProps({
  isStatic: {
    type: Boolean,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  dataSource: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['click'])

const updateFrequency: number = 6000
const dayNumber: number = 10 // 天数

const days: string[] = [] // 显示日期
for (let i: number = dayNumber - 1; i >= 0; i--) {
  days.push(getBeforeDate(i))
}

const Random = Mock.Random
const raw: Array<number[]> = [] // 模拟数据
for (let i: number = 0; i < dayNumber; i++) {
  raw.push([])
  for (let j: number = 0;j < props.data.length; j++) {
    // raw[i].push(Math.round(Math.random() * 100) + i * 100)
    raw[i].push(Random.integer(i === 0 ? 0 : raw[i - 1][j], (i + 1) * 100))
  }
}

const chartOption: Ref<EChartsOption> = ref({
  grid: {
    top: 30,
    bottom: 30,
    left: 30,
    right: 30,
    containLabel: true
  },
  color: chartColor,
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
    data: props.data
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
      fontFamily: 'monospace'
    }
  }],
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

if (props.isStatic) { // 静态
  chartOption.value.series[0].data = raw[dayNumber - 1]
  chartOption.value.graphic.elements[0].style.text = days[dayNumber - 1]
} else { // 动态
  Object.assign(chartOption.value.series[0].label, { valueAnimation: true })
  Object.assign(chartOption.value.yAxis, {
    animationDuration: 300,
    animationDurationUpdate: 300
  })
  Object.assign(chartOption.value, {
    animationDuration: updateFrequency,
    animationDurationUpdate: updateFrequency,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
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
    if (timer) clearInterval(timer)
  })
}

function handleClickChart (params: CallbackDataParams) {
  if (props.dataSource === 'category' && params.componentType === 'series') {
    emits('click', {
      type: 'bar',
      category: params.name
    })
  }
}
</script>

<template>
  <v-chart :option="chartOption" @click="handleClickChart" />
</template>
