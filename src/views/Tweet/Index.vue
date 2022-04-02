<script lang="ts" setup>
import { ref, Ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import Edit from './components/edit.vue'
import List from './components/list.vue'

const emits = defineEmits(['done'])

interface AdType {
  id: number
  content: string
  img: string
  category: string
}

const editing: Ref<boolean> = ref(true)
 
// 分类
const categories: Ref<string[]> = ref(['category1'])
function addCategory () { // 新增分类
  categories.value.push('category' + (categories.value.length + 1))
}
function changeCategoryName ({ old, newName }: { old: string, newName: string }) { // 修改分类名称
  adList.value.forEach((item, index) => { // 修改该分类中的message的category属性
    if (item.category === old) {
      item.category = newName
      adList.value.splice(index, 1, item)
    }
  })
  categories.value.splice(categories.value.indexOf(old), 1, newName)
}

// tweets
const adList: Ref<AdType[]> = ref([])
const activedAdId: Ref<number> = ref(0)
function addAd (newAd: AdType) {
  adList.value.push(newAd)
}
function changeAd ({ id, newData }: { id: number, newData: any }) {
  const index = adList.value.findIndex(ele => ele.id === id)
  const target = adList.value[index]
  Object.assign(target, newData)
  adList.value.splice(index, 1, target)
}
function changeActivedAdId (id: number) {
  activedAdId.value = id
}
function editAd (id: number) {
  changeActivedAdId(id)
  editing.value = true
}
function deleteAd (id: number) {
  const index = adList.value.findIndex(ele => ele.id === id)
  adList.value.splice(index, 1)
}

const treeData = computed(() =>
  categories.value.map(item => {
    return {
      label: item,
      children: adList.value.filter(ele => ele.category === item).map(ele => {
        const _ele = { label: 'Message ' + ele.id }
        Object.assign(_ele, ele)
        return _ele
      })
    }
  })
)
</script>

<template>
  <Edit
    v-if="editing"
    :ad-list="adList"
    :actived-ad-id="activedAdId"
    :tree-data="treeData"
    @add-category="addCategory"
    @change-category-name="changeCategoryName"
    @add-ad="addAd"
    @change-ad="changeAd"
    @change-actived-ad-id="changeActivedAdId"
    @done="editing = false"
  />
  <List
    v-else
    :ad-list="adList"
    :tree-data="treeData"
    @edit="editAd"
    @delete="deleteAd"
    @back="editing = true"
    @done="emits('done')"
  />
</template>
