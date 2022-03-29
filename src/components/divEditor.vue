<script lang="ts" setup>
import { Ref, ref, onMounted, watch, useAttrs } from 'vue'

function replaceAll(str: string, search: string, replacement: string) {
  return str.split(search).join(replacement)
}

const attrs = useAttrs()

const props = defineProps({
  noHTML: {
    type : Boolean,
    default : true
  },
  noNL : {
    type : Boolean,
    default : false,
  }
})

const emits = defineEmits(['returned'])

const element: Ref<HTMLElement | null> = ref(null)

function currentContent(){
  return props.noHTML ? 
    element.value!.innerText
    :
    element.value!.innerHTML
}
function updateContent(newcontent: string){
  if(props.noHTML) {
    element.value!.innerText = newcontent
  }
  else {
    element.value!.innerHTML = newcontent
  }
}
function update(event: any) {
  attrs['onUpdate:modelValue'](currentContent())
}
function onPaste(event: any) {
  event.preventDefault()
  let text = (event.originalEvent || event).clipboardData.getData('text/plain')
  if(props.noNL) {
    text = replaceAll(text, '\r\n', ' ')
    text = replaceAll(text, '\n', ' ')
    text = replaceAll(text, '\r', ' ')
  }
  window.document.execCommand('insertText', false, text)
}
function onKeypress(event: any) {
  if(event.key == 'Enter' && props.noNL) {
    event.preventDefault()
    emits('returned', currentContent())
  }
}

onMounted(() =>{
  updateContent(attrs.modelValue ?? '')
})

watch( () => attrs.modelValue, (newval) => {
  if(newval != currentContent()){
    updateContent(newval ?? '')
  }
})
</script>

<template>
  <div
    ref="element"
    contenteditable
    class="div-editor"
    @input="update"
    @blur="update"
    @paste="onPaste"
    @keypress="onKeypress"
  >
  </div>
</template>

<style lang="scss" scoped>
.div-editor {
  outline: none;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-break: break-word;
  user-select: text;
  -webkit-user-modify: read-write-plaintext-only;
}
</style>
