<script lang="ts" setup>
import { ref, Ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core'
import { Close } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import DivEditor from './divEditor.vue'

// 获取字符串字节数
function getStringByteLength (val: string) {
  const str = new String(val)
  let bytesCount = 0
  for (let i = 0, n = str.length; i < n; i++) {
    const c = str.charCodeAt(i)
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      bytesCount += 1
    } else {
      bytesCount += 2
    }
  }
  return bytesCount
}

interface AdType {
  content: string
  img: string
}

const emits = defineEmits(['change', 'save'])

const editContent: Ref<string> = ref('')

const editContentByteLength = computed<number>(() => getStringByteLength(editContent.value))
const progressPercentage = computed<number>(() => editContentByteLength.value > 280 ? 100 : Number((editContentByteLength.value / 260 * 100).toFixed(2)))
const progressWidth = computed<number>(() => editContentByteLength.value < 260 ? 20 : 30)
const progressColor = computed<string>(() => {
  if (editContentByteLength.value < 260) {
    return '#1d9bf0'
  } else if (editContentByteLength.value >= 260 && editContentByteLength.value < 280) {
    return '#ffd400'
  } else {
    return '#f4212e'
  }
})
const progressContent = computed<string>(() => {
  if (editContentByteLength.value >= 260) {
    return (280 - editContentByteLength.value).toString()
  } else {
    return ''
  }
})
const progressContentColor = computed<string>(() => {
  if (editContentByteLength.value < 280) {
    return '#536471'
  } else {
    return '#f4212e'
  }
})

const imageInput: Ref<any> = ref(null)
const imgSrc: Ref<string> = ref('')
function selectImage (e: Event) {
  const file = e.target.files[0]
  if (file.type.substring(0, 5) !== 'image') {
    e.target.value = ''
    ElMessage.error('Please choose a image file.')
  } else {
    const reader = new FileReader()
    reader.onloadend = () => {
      imgSrc.value = 'data:image/png;base64,' + reader.result.split(',')[1]
    }
    reader.readAsDataURL(file)
  }
}

watch(editContent, (val: string) => {
  emits('change', {
    content: val,
    img: imgSrc.value
  })
})
watch(imgSrc, (val: string) => {
  emits('change', {
    content: editContent.value,
    img: val
  })
})

function changeEditContent (val: AdType) {
  editContent.value = val.content
  imgSrc.value = val.img
}
defineExpose({ changeEditContent })
</script>

<template>
  <div class="twitter-wrapper">
    <img src="@/assets/portrait.jpg" class="portrait" />
    <div>
      <div class="editor-box">
        <p v-show="editContent === ''" class="editor-placeholder">What’s happening?</p>
        <div-editor v-model="editContent" class="editor" />
      </div>
      <div v-show="imgSrc" class="upload-img">
        <img :src="imgSrc" />
        <button><el-icon><Close /></el-icon></button>
      </div>
      <div class="twitter-toolbar">
        <button class="action-btn" @click="imageInput.click()">
          <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path><circle cx="8.868" cy="8.309" r="1.542"></circle></g></svg>
        </button>
        <input ref="imageInput" type="file" accept="image/jpeg,image/png,image/webp" hidden @change="selectImage" />
        <div class="toolbar-right">
          <div v-show="editContent" class="progress-box">
            <el-progress
              v-show="editContentByteLength < 290"
              type="circle"
              :width="progressWidth"
              :stroke-width="2"
              :percentage="progressPercentage"
              :color="progressColor"
            >
              <i></i>
            </el-progress>
            <span class="progress-text" :style="{ color: progressContentColor }">{{ progressContent }}</span>
          </div>
          <div v-show="editContent" class="divider"></div>
          <button class="save-btn" :disabled="editContent === ''" @click="emits('save')">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.twitter-wrapper {
  border: 1px solid #dcdee2;
  border-radius: 4px;
  padding: 20px;
  display: flex;

  .portrait {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    margin-right: 12px;

    & + div {
      flex: 1;
    }
  }

  .editor-box {
    font-size: 20px;
    line-height: 24px;
    padding: 14px 0;
    position: relative;
  }

  .editor-placeholder {
    color: #536471;
    position: absolute;
    top: 14px;
    left: 0;
    z-index: -1;
  }

  .editor {
    color: #0f1419;
  }

  .upload-img {
    max-width: 100%;
    max-height: 400px;
    position: relative;

    img {
      max-width: 100%;
      max-height: 100%;
    }

    button {
      position: absolute;
      top: 4px;
      left: 4px;
      background-color: rgba(15, 20, 25, .75);
      padding: 6px;
      height: 30px;
      width: 30px;
      color: #fff;
      border-radius: 100%;
      border: 0;
      outline: none;
      cursor: pointer;
      font-size: 18px;

      &:hover {
        background-color: rgba(39, 44, 48, .75)
      }
    }
  }

  .twitter-toolbar {
    padding-top: 12px;
    display: flex;
    justify-content: space-between;

    .action-btn {
      height: 36px;
      width: 36px;
      color: #1d9bf0;
      border-radius: 100%;
      border: 0;
      outline: none;
      background-color: transparent;
      cursor: pointer;
      padding: 8px;

      &:hover {
        background-color: rgba(29, 155, 240, .1);
      }

      svg {
        width: 20px;
        height: 20px;
        fill: currentcolor;
      }
    }

    .toolbar-right {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .progress-box {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .progress-text {
      font-size: 13px;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      margin: -8px 0 0 -8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .divider {
      height: 31px;
      margin: 0 12px 0 10px;
      width: 1px;
      background-color: #b9cad3;
    }

    .save-btn {
      color: #fff;
      background-color: #1d9bf0;
      height: 36px;
      padding: 0 16px;
      border: 0;
      outline: none;
      cursor: pointer;
      border-radius: 36px;
      font-size: 15px;
      font-weight: 700;

      &:disabled {
        opacity: .5;
      }
    }
  }
}
</style>
