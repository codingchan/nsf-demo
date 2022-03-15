<script setup lang="ts">
const emits = defineEmits(['click'])
</script>

<template>
  <div class="welcome-wrapper">
    <h1>Welcome Page</h1>

    <div class="btns">
      <div class="btn" @click="emits('click', 'test')">
        Test Tweets<br />
        for<br />
        my article
      </div>
      <div class="btn" @click="emits('click', 'compare')">
        Article<br />
        VS<br />
        Article
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.welcome-wrapper {
  height: 60%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.btns {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.btn {
  border: 1px solid #dcdee2;
  border-radius: 8px;
  height: 100%;
  min-height: 300px;
  width: 48%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  line-height: 80px;
  text-align: center;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.01), 1px 1px 5px rgb(0 0 0 / 12%);
}
</style>
