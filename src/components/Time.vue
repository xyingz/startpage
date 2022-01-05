<template>
  <Clock />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Clock from './time/flip/Clock.vue';

export default defineComponent({
  components: { Clock },

  setup() {
    const time = ref(new Date().toLocaleString());
    setInterval(() => {
      time.value = new Date().toLocaleString();
    }, 100);

    return {
      time
    };
  }
});
</script>

<style scoped></style>
