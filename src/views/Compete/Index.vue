<script setup lang="ts">
import { ref, Ref } from '@vue/reactivity'
import BarChart from './components/barChart.vue'
import ScatterChart from './components/scatterChart.vue'

const showBarChart: Ref<boolean> = ref(false)
const showScatterChart: Ref<boolean> = ref(false)
</script>

<template>
  <div class="compete-wrapper">
    <div v-if="!showBarChart && !showScatterChart" class="metrics">
      <h1>Who is the winner?</h1>
      <h3>[ Select your metric ]</h3>
      <div class="metricList">
        <div class="metricItem" @click="showBarChart = true">Retweets<br />Likes<br />Replies<br />Clicks</div>
        <div class="metricItem" @click="showScatterChart = true">URL</div>
        <div class="metricItem" @click="showBarChart = true">Machine Learning</div>
      </div>
    </div>

    <bar-chart v-if="showBarChart" />
    <scatter-chart v-if="showScatterChart" />
  </div>
</template>

<style lang="scss" scoped>
.compete-wrapper {
  height: 100%;
  width: 90%;
  margin: 0 auto;
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
}
</style>
