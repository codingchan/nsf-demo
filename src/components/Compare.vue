<script setup lang="ts">
import { ref, Ref } from '@vue/reactivity'
import { nextTick, watch } from '@vue/runtime-core'
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

const metrics: Ref<string[]> = ref(['Likes', 'Retweets', 'Replies', 'Clicks'])
const metric: Ref<string> = ref('')
const showChart: Ref<boolean> = ref(false)
const chart: Ref<any> = ref(null)

/**
 * chart 相关
 */
const updateFrequency: number = 4000 // 更新间隔
const tweetNumber: number = 10 // tweet数量
const dayNumber: number = 10 // 天数
const colors: string[] = ['#ffc461', '#eb833a', '#6d684b', '#fff1df', '#7f482a', '#af9d3c']

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

const chartOption: Ref<EChartsOption> = ref({})
watch(showChart, (val: boolean) => {
  if (val) {
    nextTick(() => {
      chartOption.value = {
        grid: {
          top: 10,
          bottom: 30,
          left: 150,
          right: 80
        },
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
          animationDurationUpdate: 1500
        },
        series: [{
          realtimeSort: true,
          seriesLayoutBy: 'column',
          type: 'bar',
          itemStyle: {
            color: () => colors[Math.round(Math.random() * 5)]
          },
          label: {
            show: true,
            precision: 1,
            position: 'right',
            valueAnimation: true,
            fontFamily: 'monospace'
          }
        }],
        animationDuration: 0,
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
      }

      function updateDay (i) {
        console.log(raw[i])
        console.log(days[i])
        chartOption.value.series[0].data = raw[i]
        chartOption.value.graphic.elements[0].style.text = days[i]
        chart.value.setOption(chartOption.value)
      }
      // for (let i = 0; i < dayNumber; i++) {
      //   (function (i) {
      //     setTimeout(updateDay(i), i * updateFrequency)
      //   })(i)
      // }

      // function run() {
      //   for (let i = 0; i < dayNumber; ++i) {
      //     if (Math.random() > 0.9) {
      //       data[i] += Math.round(Math.random() * 2000)
      //     } else {
      //       data[i] += Math.round(Math.random() * 200)
      //     }
      //   }
      //   myChart.setOption({
      //     series: [
      //       {
      //         type: 'bar',
      //         data
      //       }
      //     ]
      //   })
      // }
      let index = 0
      setTimeout(function () {
        updateDay(index)
        index++
      }, 0)
      setInterval(function () {
        updateDay(index)
        index++
      }, 3000)
    })
  }
})
</script>

<template>
  <div class="compare-wrapper">
    <v-chart v-if="showChart" ref="chart" class="chart-box" :option="chartOption" />
    <div v-else class="metrics">
      <h1>Who is the winner?</h1>
      <h3>[ Select your metric ]</h3>
      <div class="metricList"></div>
      <div class="metricList">
        <div v-for="item in metrics" :key="item" class="metricItem" @click="showChart = true">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.compare-wrapper {
  height: 90%;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.metrics {
  width: 100%;

  h1, h3 {
    text-align: center;
  }
}

.metricList {
  display: flex;
  flex-wrap: wrap;
}

.metricItem {
  width: 22%;
  height: 100px;
  margin: 30px 1.4% 0;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-box {
  width: 100%;
  height: 100%;
}
</style>
