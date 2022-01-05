<template>
  <div class="p-404">
    <h1>页面不存在</h1>
    <div>对不起，您访问的页面不存在。</div>
    <button @click="onBack">返回</button>
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
      this.$router.go(-1);
    }
  }
});
</script>

<style scoped>
.p-404 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
}
</style>
