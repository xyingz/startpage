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

<script lang="ts" setup>
import { ref } from 'vue';
import { Solar } from 'lunar-typescript';
import getWeather from '@/api/weather';
import { formatDate } from '@/utils/common';
import TimeComponent from './time/Time.vue';

const weatherStr = ref('');
getWeather().then(res => {
  if (typeof res === 'string') {
    weatherStr.value = res;
  } else {
    weatherStr.value = `${res[0].location.name} 当前：${res[0].now.temperature}°C ${res[0].now.text}`;
  }
});

const dateStr = ref(formatDate(new Date(), 'yyyy-MM-dd'));

const solar = Solar.fromDate(new Date());
const lunarStr = `${solar.getLunar().getMonthInChinese()}月${solar
  .getLunar()
  .getDayInChinese()}`;
const ganzhiStr = `${solar.getLunar().getYearInGanZhi()}(${solar
  .getLunar()
  .getYearShengXiao()})年 ${solar.getLunar().getMonthInGanZhi()}月 ${solar
  .getLunar()
  .getDayInGanZhi()}日 ${solar.getLunar().getJieQi()} ${solar
  .getLunar()
  .getFestivals()
  .concat(solar.getLunar().getOtherFestivals())
  .join(',')} ${solar
  .getFestivals()
  .concat(solar.getOtherFestivals())
  .join(',')}`;
</script>

<style scoped lang="scss">
.info-panel-bg {
  background-color: #cccccc44;
  filter: blur(3px);
  border-radius: 1rem;
}
</style>
