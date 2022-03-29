<script setup lang="ts">
import { Ref, ref } from '@vue/reactivity'
import {
  objectives
} from '@/assets/options.ts'

const emits = defineEmits(['done'])

const formData = ref({
  objective: '',
  name: '',
  fundingSource: 'Credit card',
  dailyBudget: '100.00',
  totalBudget: '',
  start: new Date(),
  end: '',
  pacing: 'standard'
})
</script>

<template>
  <div class="campaignDetails-wrapper">
    <el-card header="Campaign details">
      <el-form label-position="top" :model="formData">
        <el-form-item label="Objective">
          <el-select v-model="formData.objective" placeholder="Choose your objective" style="width: 100%">
            <el-option-group
              v-for="group in objectives"
              :key="group.name"
              :label="group.name"
            >
              <el-option
                v-for="item in group.children"
                :key="item.value"
                :value="item.value"
              >
              {{ item.name }} ({{ item.description }})
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="Campaign name (optional)">
          <el-input
            v-model="formData.name"
            maxlength="255"
            placeholder="Untitled"
            show-word-limit
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="Funding source">
          <el-input v-model="formData.fundingSource" readonly />
          <p class="tip">Remaining budget: Not available | Runs: March 11, 2022 - Present</p>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="Daily Budget">
              <el-input v-model="formData.dailyBudget" placeholder="0.00">
                <template #prepend>USD</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="Total Budget">
              <el-input v-model="formData.totalBudget" placeholder="0.00">
                <template #prepend>USD</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="Start (optional)">
              <el-date-picker
                v-model="formData.start"
                type="datetime"
                :clearable="false"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="End (optional)">
              <el-date-picker
                v-model="formData.end"
                type="datetime"
                placeholder="Specify time"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Pacing">
          <el-radio v-model="formData.pacing" label="standard">Standard (recommended)</el-radio>
          <el-radio v-model="formData.pacing" label="accelerated">Accelerated</el-radio>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="next-btn-box">
      <el-button type="primary" size="large" round @click="emits('done')">Next</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.campaignDetails-wrapper{
  padding: 3%;
}

.tip {
  font-size: 12px;
  color: #888;
}

.next-btn-box {
  margin-top: 20px;
  text-align: right;
}
</style>
