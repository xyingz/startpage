<template>
  <div class="clock">
    <Flipper ref="flipperHour1" />
    <Flipper ref="flipperHour2" />
    <span>:</span>
    <Flipper ref="flipperMinute1" />
    <Flipper ref="flipperMinute2" />
    <span>:</span>
    <Flipper ref="flipperSecond1" />
    <Flipper ref="flipperSecond2" />
  </div>
</template>

<script lang="ts" setup>
import { formatDate } from '@/utils/common';
import { ref, reactive, onMounted } from 'vue';
import Flipper from './Flipper.vue';

const flipperHour1 = ref();
const flipperHour2 = ref();
const flipperMinute1 = ref();
const flipperMinute2 = ref();
const flipperSecond1 = ref();
const flipperSecond2 = ref();

onMounted(() => {
  const flippers = reactive<Array<any>>([
    flipperHour1,
    flipperHour2,
    flipperMinute1,
    flipperMinute2,
    flipperSecond1,
    flipperSecond2
  ]);

  // 初始化所有时间
  let now = new Date();
  let nowTime = formatDate(new Date(now.getTime()), 'hhmmss');
  for (let i = 0; i < flippers.length; i++) {
    flippers[i].value.setFront(nowTime[i]);
  }

  // 启动时间更新
  setInterval(() => {
    now = new Date();
    nowTime = formatDate(new Date(now.getTime() - 1000), 'hhmmss');
    const nextTime = formatDate(now, 'hhmmss');
    for (let i = 0; i < flippers.length; i++) {
      if (nowTime[i] !== nextTime[i]) {
        flippers[i].value.flipDown(nowTime[i], nextTime[i]);
      }
    }
  }, 1000);
});
</script>

<style scoped lang="scss">
.clock {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: 3rem;
    align-self: baseline;
  }
}

@media screen and (max-width: 768px) {
  .clock {
    gap: 0.25rem;

    span {
      font-size: 1.75rem;
    }
  }
}
</style>
