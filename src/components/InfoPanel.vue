<template>
  <div class="flex justify-center">
    <div class="relative-position" :class="$q.screen.gt.xs ? 'row' : 'column'">
      <div class="fit absolute shadow-5 info-panel-bg" />
      <TimeComponent class="q-pa-md" />
      <div
        class="column justify-center text-grey-1"
        :class="{ 'q-mr-md': $q.screen.gt.xs, 'q-mb-md': !$q.screen.gt.xs }"
      >
        <div class="text-caption">{{ dateStr }} 农历 {{ lunarStr }}</div>
        <div class="text-caption">{{ ganzhiStr }}</div>
        <div class="text-weight-bold">{{ weatherStr }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import getLunar from '@/api/lunar';
import getWeather from '@/api/weather';
import { formatDate } from '@/utils/common';
import TimeComponent from './time/Time.vue';

export default defineComponent({
  components: {
    TimeComponent
  },

  setup() {
    const $q = useQuasar();

    const weatherStr = ref('');
    getWeather().then(res => {
      if (typeof res === 'string') {
        weatherStr.value = res;
      } else {
        weatherStr.value = `${res[0].location.name} 当前：${res[0].now.temperature}°C ${res[0].now.text}`;
      }
    });

    const dateStr = ref('');
    const lunarStr = ref('');
    const ganzhiStr = ref('');
    getLunar().then(res => {
      let date: Date | string = new Date();
      if (typeof res !== 'string') {
        date = res[0].date;
        lunarStr.value = `${res[0].lunar_month_name}${res[0].lunar_day_name}`;
        ganzhiStr.value = `${res[0].ganzhi_year}年 ${res[0].ganzhi_month}月 ${res[0].ganzhi_day}日 ${res[0].lunar_festival}`;
      }

      dateStr.value = formatDate(date, 'yyyy-MM-dd');
    });

    return {
      $q,
      weatherStr,
      dateStr,
      lunarStr,
      ganzhiStr
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
