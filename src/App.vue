<script setup lang="ts">
import { ref, Ref } from '@vue/reactivity'
import Welcome from './components/Welcome.vue'
import Test from './components/CreateAds.vue'
import AdList from './components/AdList.vue'
import Compare from './components/Compare.vue'

const step: Ref<string> = ref('welcome')
const adList: Ref<string[]> = ref([])
const editAdIndex: Ref<number> = ref(-1)

function changeStep (_step: string) {
  step.value = _step
}

function adsEditDone (_adList: string[]) {
  adList.value = _adList
  if (_adList[_adList.length - 1] === '') {
    adList.value.pop()
  }
  changeStep('adList')
}

function editAd (index: number) {
  editAdIndex.value = index
  changeStep('test')
}
function deleteAd (index: number) {
  adList.value.splice(index, 1)
} 
</script>

<template>
  <Welcome v-if="step === 'welcome'" @click="changeStep" />
  <Test v-if="step === 'test'" :init-ad-list="adList" :actived="editAdIndex" @done="adsEditDone" />
  <ad-list
    v-if="step === 'adList'"
    :ad-list="adList"
    @edit="editAd"
    @delete="deleteAd"
    @upload="changeStep('compare')"
  />
  <Compare v-if="step === 'compare'" />
</template>

<style>
* {
  padding: 0;
  margin: 0;
}

ul, li {
  list-style: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
