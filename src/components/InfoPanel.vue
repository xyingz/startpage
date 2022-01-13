<template>
  <div class="flex justify-center">
    <div class="row relative-position">
      <TimeComponent class="q-pa-md" />
      <div class="q-mr-md flex items-center text-black text-weight-bold">
        {{ weatherStr }}
      </div>
      <div class="fit absolute shadow-5 info-panel-bg" />
    </div>
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
        weatherStr.value = `${res[0].location.name} 当前：${res[0].now.temperature}°C ${res[0].now.text}`;
      }
    });

    return {
      weatherStr
    };
  }
});
</script>

<style scoped lang="scss">
.info-panel-bg {
  background-color: #cccccc44;
  filter: blur(3px);
  border-radius: 1rem;
}
</style>
