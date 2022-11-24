<template>
  <div class="p-404">
    <h1>页面不存在</h1>
    <div>对不起，您访问的页面不存在。</div>
    <q-btn label="返回" flat icon="chevron_left" @click="onBack" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },

  methods: {
    onBack() {
      this.$router.replace('/');
    }
  }
});
</script>

<style>
.p-404 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
}

/* 重置按钮左侧图标边距 */
.on-left {
  margin-right: 0;
}
</style>
