<script setup lang="ts">
import { ref, Ref } from '@vue/reactivity'
import { computed, nextTick, PropType, watch } from '@vue/runtime-core'
import { ElMessage, ElMessageBox } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DropType } from 'element-plus/es/components/tree/src/tree.type'
import { AdType } from '@/assets/public.ts'
import TwitterEditor from '@/components/twitterEditor.vue'

const props = defineProps({
  adList: {
    type: Array as PropType<AdType[]>,
    required: true
  },
  activedAdId: {
    type: Number,
    required: true
  },
  treeData: {
    type: Array,
    required: true
  }
})
const emits = defineEmits([
  'addCategory',
  'changeCategoryName',
  'addAd',
  'changeAd',
  'changeActivedAdId',
  'done'
])

const currentCategory: Ref<string> = ref('category1') // 当前选中的分类
const title = computed<string>(() => {
  if (props.activedAdId) return 'Message ' + props.activedAdId
  else return 'New Message'
})
const twitterEditor: Ref<any> = ref(null)

function handleClickTreeNode (a, node: Node) {
  if (node.data.children) currentCategory.value = node.data.label
  else {
    emits('changeActivedAdId', node.data.id)
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
  emits('changeAd', {
    id: draggingNode.data.id,
    newData: { category: dropNode.label }
  })

  currentCategory.value = dropNode.label // 修改当前分类
}

function handleSave (val) {
  const index = props.adList.findIndex(ele => ele.id === props.activedAdId)
  if (index > -1) { // 修改
    emits('changeAd', {
      id: props.activedAdId,
      newData: val
    })
  } else { // 新增
    const id = props.adList.length > 0 ? (props.adList[props.adList.length - 1].id + 1) : 1
    emits('addAd', {
      img: val.img,
      content: val.content,
      id,
      category: currentCategory.value
    })
    emits('changeActivedAdId', id)
  }
  ElMessage.success('Saved!')
}
function addMessage (category: string) {
  currentCategory.value = category
  emits('changeActivedAdId', 0)
}

function handleClickName (data: any) {
  if (data.children) { // 修改分类名称
    const category = data.label
    ElMessageBox.prompt('Please input category name', '', {
      inputValue: category,
    }).then(({ value }) => {
      if (value !== category) {
        emits('changeCategoryName', {
          old: category,
          newName: value
        })

        if (currentCategory.value === category) {
          currentCategory.value = value
        }
      }
    }).catch(_ => {})
  }
}

watch(() => props.activedAdId, (val: number) => {
  const index = props.adList.findIndex(ele => ele.id === val)
  nextTick(() => {
    if (index > -1) {
      twitterEditor.value.changeEditContent(props.adList[index])
    } else {
      twitterEditor.value.changeEditContent({
        content: '',
        img: ''
      })
    }
  })
}, {
  immediate: true
})
</script>

<template>
  <div class="createAds-wrapper">
    <!-- <el-card class="articleUrl">
      <p>Article: U.S. Warns China Not to Help Russia in Ukraine</p>
      <p class="url">URL: <a href="https://www.nytimes.com/live/2022/03/14/world/ukraine-russia-war">https://www.nytimes.com/live/2022/03/14/world/ukraine-russia-war</a></p>
    </el-card> -->

    <el-row :gutter="30">
      <el-col :span="6">
        <el-card class="adList-card">
          <el-button type="primary" plain style="margin-bottom: 10px" @click="emits('addCategory')">Add Category</el-button>
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
                  :class="{ categoryName: data.children ? true : false, actived: data.label === currentCategory || data.id === activedAdId }"
                  @click="handleClickName(data)"
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
