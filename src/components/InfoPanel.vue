<template>
  <div class="flex justify-center">
    <div class="relative-position" :class="$q.screen.gt.xs ? 'row' : 'column'">
      <div class="fit absolute shadow-5 info-panel-bg z-1" />
      <TimeComponent class="q-pa-md" />
      <div
        class="column justify-center text-grey-1 z-2 cursor-default"
        :class="{ 'q-mr-md': $q.screen.gt.xs, 'q-mb-md': !$q.screen.gt.xs }"
      >
        <div class="text-caption">
          {{ date.toLocaleDateString() }} 农历 {{ lunarStr }}
          <q-popup-proxy v-if="!isDeviceMobile()" :offset="[200, 25]">
            <div class="q-gutter-sm row items-start">
              <q-date
                v-model="dateStr"
                mask="YYYY-MM-DD HH:mm:ss"
                @update:model-value="onClickDate"
                @navigation="onClickDate"
              />
              <q-time
                v-model="dateStr"
                mask="YYYY-MM-DD HH:mm:ss"
                @update:model-value="onClickDate"
              />
            </div>
            <div class="row items-center">
              <q-chip square color="secondary" text-color="white">
                <q-avatar color="red">1</q-avatar>
                选日期
              </q-chip>

              <q-chip square color="secondary" text-color="white">
                <q-avatar color="red">2</q-avatar>
                选时间
              </q-chip>

              <q-chip square color="secondary" text-color="white">
                <q-avatar color="red">3</q-avatar>
                查看具体信息
              </q-chip>

              <q-space />
              <div class="q-pa-sm q-gutter-sm">
                <q-btn
                  v-close-popup
                  label="今天"
                  color="primary"
                  @click="onClickToday"
                />
                <q-btn v-close-popup label="关闭" color="primary" outline />
              </div>
            </div>
          </q-popup-proxy>
        </div>
        <div class="text-caption">
          {{ dateInfoStr }}
          <q-popup-proxy
            anchor="bottom middle"
            self="top middle"
            class="x-dialog-bg"
            transition-show="flip-up"
            transition-hide="flip-down"
          >
            <q-list bordered separator>
              <q-item v-ripple clickable @click="() => onCopy(solarInfoStr)">
                <q-item-section>
                  <q-item-label overline class="text-info">阳历</q-item-label>
                  <q-item-label>{{ solarInfoStr }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-ripple clickable @click="() => onCopy(lunarInfoStr)">
                <q-item-section>
                  <q-item-label overline class="text-info">阴历</q-item-label>
                  <q-item-label>{{ lunarInfoStr }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-ripple clickable @click="() => onCopy(fotoInfoStr)">
                <q-item-section>
                  <q-item-label overline class="text-info">佛教历</q-item-label>
                  <q-item-label>{{ fotoInfoStr }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple clickable @click="() => onCopy(taoInfoStr)">
                <q-item-section>
                  <q-item-label overline class="text-info">道教历</q-item-label>
                  <q-item-label>{{ taoInfoStr }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-popup-proxy>
        </div>
        <div class="text-weight-bold">{{ weatherStr }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import getWeather from '@/api/weather';
import { realInterval } from '@/utils/common';
import useDateInfo from '@/composition/use-date-info';
import useCopy from '@/composition/use-copy';
import { isDeviceMobile } from '@/utils/check';
import TimeComponent from './time/Time.vue';

const weatherStr = ref('');
function getCurrentWeather() {
  getWeather().then(res => {
    if (typeof res === 'string') {
      weatherStr.value = res;
    } else {
      weatherStr.value = `${res[0].location.name} 当前：${res[0].now.temperature}°C ${res[0].now.text}`;
    }
  });
}
getCurrentWeather();

// 一小时更新一次
realInterval(() => {
  getCurrentWeather();
}, 60 * 60 * 1000);

const {
  date,
  dateStr,
  lunarStr,
  dateInfoStr,
  lunarInfoStr,
  solarInfoStr,
  fotoInfoStr,
  taoInfoStr,
  startDate,
  stopDate
} = useDateInfo();

function onClickDate() {
  stopDate();
}

function onClickToday() {
  startDate();
}

const { onCopy } = useCopy();
</script>

<style scoped lang="scss">
.info-panel-bg {
  background-color: #cccccc44;
  filter: blur(3px);
  border-radius: 1rem;
}
</style>
