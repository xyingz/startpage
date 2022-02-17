<template>
  <Clock :time="time" />
</template>

<script lang="ts">
import { realInterval } from '@/utils/common';
import { defineComponent, Ref, ref } from 'vue';
import Clock from './flip/Clock.vue';

export default defineComponent({
  components: { Clock },

  setup() {
    const time = ref<Date>(new Date()) as Ref<Date>;

    realInterval(() => {
      time.value = new Date();
    });

    return {
      time
    };
  }
});
</script>

<style scoped></style>
