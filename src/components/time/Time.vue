<template>
  <Clock :time="time" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Clock from './flip/Clock.vue';

export default defineComponent({
  components: { Clock },

  setup() {
    const time = ref<Date>(new Date());
    setInterval(() => {
      time.value = new Date();
    }, 100);

    return {
      time
    };
  }
});
</script>

<style scoped></style>
