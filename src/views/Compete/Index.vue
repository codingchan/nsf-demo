<script setup lang="ts">
import { ref, Ref } from '@vue/reactivity'
import { nextTick } from '@vue/runtime-core'
import { AdType } from '@/assets/public.ts'
import BarChart from './components/barChart.vue'
// import ScatterChart from './components/scatterChart.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const showChart: Ref<string> = ref('')
const chartIsStatic: Ref<boolean> = ref(true)
const chartData = ref([])
const chartDataSource = ref('')

function viewChart (type: string, isStatic: boolean, category?: string) {
  if (category) {
    chartData.value = props.data.tweets
      .filter((ele: AdType) => ele.category === category)
      .map((ele: AdType) => 'Message ' + ele.id)
    chartDataSource.value = 'tweet'
  } else {
    chartData.value = props.data.categories
    chartDataSource.value = 'category'
  }

  switch (type) {
    case 'bar':
      showChart.value = type
      break
  }
  chartIsStatic.value = isStatic
}

function handleClickChart ({ type, category }: { type: string, category: string }) {
  showChart.value = 'none'
  nextTick(() => {
    viewChart(type, chartIsStatic.value, category)
  })
}
</script>

<template>
  <div class="compete-wrapper">
    <div v-if="showChart === ''" class="metrics">
      <h1>Who is the winner?</h1>
      <h3>[ Select your metric ]</h3>
      <div class="metricList">
        <div class="metricItem">
          Retweets<br />Likes<br />Replies<br />Clicks
          <div class="actions">
            <el-button @click="viewChart('bar', true)">static</el-button>
            <el-button @click="viewChart('bar', false)">dynamic</el-button>
          </div>
        </div>
        <div class="metricItem">
          URL
          <div class="actions">
            <el-button @click="viewChart('bar', true)">static</el-button>
            <el-button @click="viewChart('bar', false)">dynamic</el-button>
          </div>
        </div>
        <div class="metricItem">
          Machine Learning
          <div class="actions">
            <el-button @click="viewChart('bar', true)">static</el-button>
            <el-button @click="viewChart('bar', false)">dynamic</el-button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="chart-container">
      <div class="chart-box">
        <bar-chart
          v-if="showChart === 'bar'"
          :is-static="chartIsStatic"
          :data="chartData"
          :data-source="chartDataSource"
          @click="handleClickChart" />
        <!-- <scatter-chart v-if="showScatterChart" /> -->
      </div>

      <el-button @click="showChart = ''">Back</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.compete-wrapper {
  height: 100%;
  width: 90%;
  margin: 0 auto;
}

.metrics {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1, h3 {
    text-align: center;
  }
}

.metricList {
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

.metricItem {
  width: 30%;
  height: 150px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.5;
  position: relative;
  overflow: hidden;

  .actions {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    opacity: 0;
    transition: opacity .3s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-button {
    width: 90px;
  }

  &:hover .actions {
    opacity: 1;
  }
}

.chart-container {
  height: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
}

.chart-box {
  flex: 1;
  width: 100%;
  margin-bottom: 20px;
}
</style>
