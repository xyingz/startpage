<template>
  <Clock :time="time" />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import Clock from './flip/Clock.vue';

export default defineComponent({
  components: { Clock },

  setup() {
    const time = ref<Date>(new Date()) as Ref<Date>;
    setInterval(() => {
      time.value = new Date();
    }, 1000);

    return {
      time
    };
  }
});
</script>

<style scoped></style>
