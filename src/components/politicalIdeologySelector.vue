<script lang="ts" setup>
import { useAttrs } from '@vue/runtime-core'

const attrs = useAttrs()

const options = [
  { value: 1, color: '#294b8b' },
  { value: 2, color: '#85a0d7' },
  { value: 3, color: '#acc0e3' },
  { value: 4, color: '#d4d4d4' },
  { value: 5, color: '#f9e5e6' },
  { value: 6, color: '#db807f' },
  { value: 7, color: '#b80000' },
]

function select (value: number) {
  const target = attrs.modelValue
  const index = target.indexOf(value)
  if (index === -1) {
    target.push(value)
  } else {
    target.splice(index, 1)
  }
  attrs['onUpdate:modelValue'](target)
}
</script>

<template>
  <div class="politicalIdeologySelector-wrapper">
    <div class="text">Liberals</div>
    <div
      v-for="item in options"
      :key="item.value"
      :class="{ option: true, selected: attrs.modelValue.includes(item.value) }"
      @click="select(item.value)"
    >
      <span :style="{ backgroundColor: item.color }"></span>
    </div>
    <div class="text">Conservatives</div>
  </div>
</template>

<style lang="scss" scoped>
.politicalIdeologySelector-wrapper {
  display: flex;
  align-items: center;

  div {
    margin: 0 5px;
  }

  .text {
    font-weight: bold;
  }

  .option {
    border: 2px solid transparent;
    padding: 5px;
    height: 40px;
    cursor: pointer;

    span {
      display: inline-block;
      width: 40px;
      height: 40px;
    }

    &.selected {
      border-color: #409eff;
    }
  }
}
</style>
