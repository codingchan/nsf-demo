<script setup lang="ts">
import { Ref, ref } from '@vue/reactivity'
import { Medal } from '@element-plus/icons-vue'
import {
  ageMinList,
  ageMaxList,
  languages,
  ioses,
  androids,
  mobiles,
  models,
  carriers,
  followers,
  interests
} from '@/assets/options.ts'
import politicalIdeologySelector from '@/components/politicalIdeologySelector.vue'

const emits = defineEmits(['done'])

const cascaderProps = { multiple: true }
const deliveryFormData = ref({
  totalBudget: 0,
  start: '',
  end: '',
  bidStrategy: 'auto',
  maxBid: '1.05'
})
const demographicsFormData = ref({
  ideology: [],
  audienceTypes: [],
  gender: 'Any',
  age: 'all',
  ageRange: {
    min: 13,
    max: 'And up'
  },
  location: '',
  language: ''
})
const devicesFormData = ref({
  os: [],
  model: [],
  carrier: [],
  new: false
})
const devicesOS_ios: Ref<string> = ref('all')
const devicesOS_android: Ref<string> = ref('all')
const devicesOS_other: Ref<string> = ref('all')
const targetingFormData = ref({
  keywords: {
    include: [],
    exclude: []
  },
  alikes: [],
  interests: []
})
const targetingKeywordsType: Ref<string> = ref('include')
const targetingKeywords: Ref<string> = ref('')
</script>

<template>
  <div class="targets-wrapper">
    <el-card header="Delivery">
      <el-form label-position="top" :model="deliveryFormData">
        <el-form-item label="Total ad group budget (optional)">
          <el-input v-model="deliveryFormData.totalBudget" placeholder="0.00">
            <template #prepend>USD</template>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :xs="24" :sm="12">
            <el-form-item label="Start (optional)">
              <el-date-picker
                v-model="deliveryFormData.start"
                type="datetime"
                placeholder="Specify time"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="End (optional)">
              <el-date-picker
                v-model="deliveryFormData.end"
                type="datetime"
                placeholder="Specify time"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Bid Strategy">
          <el-radio v-model="deliveryFormData.bidStrategy" label="auto" border style="margin-bottom: 12px">
            <p style="font-size: 16px">Autobid (recommended)</p>
            <p>Automatically maximize your results at the lowest price.</p>
          </el-radio>
          <el-radio v-model="deliveryFormData.bidStrategy" label="max" border>
            <p style="font-size: 16px">Maximum bid</p>
            <p>Set the maximum you’re willing to bid for each engagement.</p>
            <el-input
              v-show="deliveryFormData.bidStrategy === 'max'"
              v-model="deliveryFormData.maxBid"
              placeholder="0.00"
              style="margin-top: 8px"
            >
              <template #prepend>USD</template>
              <template #append>maximum bid per engagement</template>
            </el-input>
          </el-radio>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card header="Demographics">
      <el-form label-position="top" :model="demographicsFormData">
        <el-form-item label="Political Ideology">
          <political-ideology-selector v-model="demographicsFormData.ideology" />
        </el-form-item>
        <el-form-item label="Audience Types">
          <el-checkbox-group v-model="demographicsFormData.audienceTypes">
            <el-checkbox label="Merchants of falsehood" />
            <el-checkbox label="Spreaders" />
            <el-checkbox label="Observers" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Gender">
          <el-radio-group v-model="demographicsFormData.gender">
            <el-radio-button label="Any" />
            <el-radio-button label="Women" />
            <el-radio-button label="Men" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Age">
          <el-radio-group v-model="demographicsFormData.age">
            <el-radio label="all">All</el-radio>
            <el-radio label="range">Age range</el-radio>
          </el-radio-group>
          <span v-show="demographicsFormData.age === 'range'" style="margin-left: 15px">
            <el-select v-model="demographicsFormData.ageRange.min" style="width: 100px;">
              <el-option v-for="item in ageMinList" :key="item" :label="item" :value="item" />
            </el-select>
            -
            <el-select v-model="demographicsFormData.ageRange.max" style="width: 100px">
              <el-option v-for="item in ageMaxList" :key="item" :label="item" :value="item" />
            </el-select>
          </span>
        </el-form-item>
        <el-form-item label="Location (optional)">
          <el-input v-model="demographicsFormData.location" />
        </el-form-item>
        <el-form-item label="Language (optional)">
          <el-select v-model="demographicsFormData.language" clearable multiple style="width: 100%">
            <el-option v-for="item in languages" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card header="Devices">
      <el-form label-position="top" :model="devicesFormData">
        <el-form-item label="Operating System">
          <el-checkbox-group v-model="devicesFormData.os" style="width: 100%">
            <el-checkbox label="iOS" style="display: block" />
            <el-select v-show="devicesFormData.os.includes('iOS')" v-model="devicesOS_ios" style="margin-left: 22px;width: calc(100% - 22px)">
              <el-option label="All" value="all" />
              <el-option v-for="item in ioses" :key="item" :label="`iOS ${item} and above`" :value="item" />
            </el-select>
            <el-checkbox label="Android" style="display: block" />
            <el-select v-show="devicesFormData.os.includes('Android')" v-model="devicesOS_android" style="margin-left: 22px;width: calc(100% - 22px)">
              <el-option label="All" value="all" />
              <el-option v-for="item in androids" :key="item" :label="`Android ${item} and above`" :value="item" />
            </el-select>
            <el-checkbox label="Other mobile" style="display: block" />
            <el-select v-show="devicesFormData.os.includes('Other mobile')" v-model="devicesOS_other" style="margin-left: 22px;width: calc(100% - 22px)">
              <el-option label="All" value="all" />
              <el-option v-for="item in mobiles" :key="item" :label="`Other mobile ${item} and above`" :value="item" />
            </el-select>
            <el-checkbox label="Desktop" style="display: block" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Device Model (optional)">
          <el-cascader v-model="devicesFormData.model" :options="models" :props="cascaderProps" style="width: 100%" />
        </el-form-item>
        <el-form-item label="Carrier (optional)">
          <el-cascader v-model="devicesFormData.carrier" :options="carriers" :props="cascaderProps" style="width: 100%" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="devicesFormData.new" label="Target people who first used Twitter on a new device or carrier" />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card header="Targeting features">
      <el-form label-position="top" :model="targetingFormData">
        <el-form-item label="Keywords (optional)">
          <el-input v-model="targetingKeywords">
            <template #prepend>
              <el-select v-model="targetingKeywordsType" style="width: 110px">
                <el-option label="Include" value="include" />
                <el-option label="Exclude" value="exclude" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="Follower look-alikes (optional)">
          <el-select v-model="targetingFormData.alikes" multiple style="width: 100%">
            <el-option v-for="item in followers" :key="item.id" :value="item.id" class="follower-option">
              <div>
                <img :src="item.avatar" />
                <span class="nickname">{{ item.nickname }}</span>
                <el-icon v-if="item.certify"><Medal /></el-icon>
                <span class="id">@{{ item.id }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Interests (optional)">
          <el-cascader v-model="targetingFormData.interests" :options="interests" :props="cascaderProps" style="width: 100%" />
        </el-form-item>
      </el-form>
    </el-card>

    <div class="next-btn-box">
      <el-button type="primary" size="large" round @click="emits('done')">Next</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.targets-wrapper{
  padding: 3%;

  .el-card {
    margin-bottom: 20px;
  }
}

.el-radio.is-bordered {
  height: auto;
  width: 100%;
  margin-right: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  :deep(.el-radio__inner) {
    width: 20px;
    height: 20px;

    &:after {
      width: 6px;
      height: 6px;
    }
  }
  :deep(.el-form-item--default .el-form-item__content) {
    line-height: 22px;
  }
  :deep(.el-radio__label) {
    padding-left: 12px;
  }
  :deep(.el-radio__input.is-checked+.el-radio__label) {
    color: var(--el-radio-text-color);
  }
}

.follower-option {
  height: auto;

  & > div {
    height: 40px;
    display: flex;
    align-items: center;
  }
  
  img {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin-right: 10px;
  }

  .nickname {
    font-weight: bold;
    margin-right: 5px;
  }

  .el-icon {
    color: #409eff;
  }

  .id {
    color: #999;
  }
}

.next-btn-box {
  text-align: right;
}
</style>
