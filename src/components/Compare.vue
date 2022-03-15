<script setup lang="ts">
import { ref, Ref } from "@vue/reactivity";

const metrics: Ref<string[]> = ref(['Likes', 'Retweets', 'Reply', 'Click'])
const metric: Ref<string> = ref('')
const showChart: Ref<boolean> = ref(false)
</script>

<template>
  <div class="compare-wrapper">
    <div v-show="!showChart" class="metrics">
      <h1>Who is the winner?</h1>
      <h3>[ Select your metric ]</h3>
      <div class="metricList"></div>
      <div class="metricList">
        <div v-for="item in metrics" :key="item" class="metricItem">{{ item }}</div>
      </div>
    </div>
    <div v-show="showChart"></div>
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
</style>
