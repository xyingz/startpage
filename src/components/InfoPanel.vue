<template>
  <div class="row justify-center">
    <TimeComponent />
    <div class="q-ml-md flex items-center">{{ weatherStr }}</div>
  </div>
</template>

<script lang="ts">
import getWeather from '@/api/get-weather';
import { defineComponent, ref } from 'vue';
import TimeComponent from './time/Time.vue';

export default defineComponent({
  components: {
    TimeComponent
  },

  setup() {
    const weatherStr = ref('');

    getWeather().then(res => {
      if (typeof res === 'string') {
        weatherStr.value = res;
      } else {
        weatherStr.value = `${res[0].location.name} 当前：${res[0].now.temperature}°C`;
      }
    });

    return {
      weatherStr
    };
  }
});
</script>

<style scoped lang="scss"></style>
