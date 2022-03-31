<script setup lang="ts">
import { ref, Ref } from '@vue/reactivity'
import { computed, nextTick, onMounted } from '@vue/runtime-core'
import { ElMessage, ElMessageBox } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DropType } from 'element-plus/es/components/tree/src/tree.type'
import TwitterEditor from '@/components/twitterEditor.vue'

interface AdType {
  id: number
  content: string
  img: string
  category: string
}

const props = defineProps(['initAdList', 'actived'])
const emits = defineEmits(['done'])

const categories: Ref<string[]> = ref(['category1'])
const currentCategory: Ref<string> = ref('category1')

const adList: Ref<AdType[]> = ref([])
const currentAdId: Ref<number> = ref(0)
const treeData = computed(() =>
  categories.value.map(item => {
    return {
      label: item,
      children: adList.value.filter(ele => ele.category === item).map(ele => {
        return {
          id: ele.id,
          label: 'Message ' + ele.id
        }
      })
    }
  })
)
const title = computed<string>(() => {
  if (currentAdId.value) return 'Message ' + currentAdId.value
  else return 'New Message'
})
const twitterEditor: Ref<any> = ref(null)

function handleClickTreeNode (a, node: Node) {
  if (node.data.children) currentCategory.value = node.data.label
  else {
    currentAdId.value = node.data.id
    twitterEditor.value.changeEditContent(adList.value.find(ele => ele.id === currentAdId.value))
  }
}
function allowDrop (draggingNode: Node, dropNode: Node, type: DropType) { // 判断目标节点能否成为拖动目标位置
  if (dropNode.data.children) {
    return type !== 'prev' && type !== 'next'
  } else {
    return false
  }
}
function allowDrag (node: Node) { // 判断节点时候可被拖动
  return !node.data.children
}
function handleDrop (draggingNode: Node, dropNode: Node) { // 拖拽完成
  const index = adList.value.findIndex(ele => ele.id === draggingNode.data.id)
  const target = adList.value[index]
  Object.assign(target, { category: dropNode.label })
  adList.value.splice(index, 1, target)
  currentCategory.value = dropNode.label // 修改当前分类
}

function addCategory () { // 新增分类
  categories.value.push('category' + (categories.value.length + 1))
}

function handleSave (val) {
  const index = adList.value.findIndex(ele => ele.id === currentAdId.value)
  if (index > -1) { // 修改
    const target = adList.value[index]
    Object.assign(target, val)
    adList.value.splice(index, 1, target)
  } else { // 新增
    const id = adList.value.length > 0 ? (adList.value[adList.value.length - 1].id + 1) : 1
    adList.value.push({
      img: val.img,
      content: val.content,
      id,
      category: currentCategory.value
    })
    currentAdId.value = id
  }
  ElMessage.success('Saved!')
}
function addMessage (category: string) {
  currentCategory.value = category
  currentAdId.value = 0
  twitterEditor.value.changeEditContent({
    content: '',
    img: ''
  })
}

function changeCategoryName (data: any) { // 修改分类名称
  if (data.children) {
    const category = data.label
    ElMessageBox.prompt('Please input category name', '', {
      inputValue: category,
    }).then(({ value }) => {
      adList.value.forEach((item, index) => {
        if (item.category === category) {
          item.category = value
          adList.value.splice(index, 1, item)
        }
      })
      categories.value.splice(categories.value.indexOf(category), 1, value)

      if (currentCategory.value === category) {
        currentCategory.value = value
      }
    }).catch(_ => {})
  }
}

onMounted(() => {
  if (props.initAdList.length > 0) {
    adList.value = props.initAdList
  }

  if (props.actived > -1) {
    currentAdId.value = props.actived
    twitterEditor.value.changeEditContent(adList.value.find(ele => ele.id === currentAdId.value))
  } else {
    twitterEditor.value.changeEditContent({
      content: '',
      img: ''
    })
  }
})
</script>

<template>
  <div class="createAds-wrapper">
    <el-card class="articleUrl">
      <p>Article: U.S. Warns China Not to Help Russia in Ukraine</p>
      <p class="url">URL: <a href="https://www.nytimes.com/live/2022/03/14/world/ukraine-russia-war">https://www.nytimes.com/live/2022/03/14/world/ukraine-russia-war</a></p>
    </el-card>

    <el-row :gutter="30">
      <el-col :span="6">
        <el-card class="adList-card">
          <el-button type="primary" plain style="margin-bottom: 10px" @click="addCategory">Add Category</el-button>
          <el-tree
            :allow-drop="allowDrop"
            :allow-drag="allowDrag"
            :data="treeData"
            draggable
            default-expand-all
            node-key="id"
            :expand-on-click-node="false"
            @node-click="handleClickTreeNode"
            @node-drop="handleDrop"
          >
            <template #default="{ node, data }">
              <span class="tree-item">
                <span
                  :class="{ categoryName: data.children ? true : false, actived: data.label === currentCategory || data.id === currentAdId }"
                  @click.stop="changeCategoryName(data)"
                >{{ node.label }}</span>
                <el-button v-if="data.children" type="text" @click="addMessage(data.label)">Add Message</el-button>
              </span>
            </template>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="12">
        <div class="adEditor">
          <h1>{{ title }}</h1>
          <twitter-editor ref="twitterEditor" @save="handleSave" />
          <el-card class="tips">
            <p><span>Tip 1:</span> Avoid repeating misinformation. Say what’s true.<el-link type="primary">see more</el-link></p>
            <p><span>Tip 2</span>: Choose your sources wisely. Try to find a credible source that the person respects.<el-link type="primary">see more</el-link></p>
            <p><span>Tip 3</span>: Give readers a sense of where the scientific community stands and how strong the available evidence is for different views.<el-link type="primary">see more</el-link></p>
            <p><span>Tip 4</span>: Consider headlines and images that inform rather than shock or provoke.<el-link type="primary">see more</el-link></p>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-button type="primary" size="large" round class="next-btn" @click="emits('done', adList)">Next</el-button>
  </div>
</template>

<style lang="scss" scoped>
.createAds-wrapper {
  padding: 3% 3% calc(3% + 40px);
  min-height: 100%;
  box-sizing: border-box;
  position: relative;
}

.articleUrl {
  word-break: break-word;
  line-height: 1.5;
  margin-bottom: 20px;

  p {
    display: inline-block;
    margin-right: 12px;
  }

  .url {
    margin-right: 0;
    word-break: break-all;
  }
}

.adList-card {
  margin-top: 57px;
  min-height: 500px;
}

.tree-item {
  flex: 1;
  display: flex;
  height: 32px;
  justify-content: space-between;
  align-items: center;

  .categoryName {
    cursor: text;
  }

  .actived {
    color: #409eff;
  }

  .el-button {
    display: none;
  }

  &:hover {
    .el-button {
      display: block;
    }
  }
}

.adEditor {
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 20px;
  }

  .tips {
    margin-top: 20px;
    word-break: break-word;
    line-height: 1.5;

    p {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    span {
      font-weight: bold;
    }

    .el-link {
      margin-left: 8px;
    }
  }
}

.next-btn {
  position: absolute;
  bottom: 3%;
  right: 3%;
}
</style>
