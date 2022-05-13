<script setup lang="ts">
import { Ref, ref } from '@vue/reactivity'

const emits = defineEmits(['done'])

const formData = ref({
  goal: '',
  name: '',
  platform: '',
  dailyBudget: '100.00',
  totalBudget: '',
  start: new Date(),
  end: '',
  pacing: 'standard'
})
</script>

<template>
  <div class="campaignDetails-wrapper">
    <el-card header="Build Your Course Correction">
      <el-form label-position="top" :model="formData">
        <el-form-item label="Goal">
          <el-select v-model="formData.goal" placeholder="Choose your goal" style="width: 100%">
            <el-option value="reduceFlow" label="Reduce flow of misinformation" />
            <el-option value="boostEngagement" label="Boost engagement (e.g., clicks, likes, retweets, replies)" />
            <el-option value="increaseFollowers" label="Increase followers" />
          </el-select>
        </el-form-item>
        <el-form-item label="Your Trial Name (optional)">
          <el-input
            v-model="formData.name"
            maxlength="255"
            placeholder="Untitled"
            show-word-limit
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="Platform">
          <el-select v-model="formData.platform" style="width: 100%">
            <el-option value="twitter" label="Twitter" />
            <el-option value="facebook" label="Facebook" />
            <el-option value="youtube" label="YouTube" />
          </el-select>
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
