<template>
  <div class="clock">
    <template v-if="showHour">
      <Flipper ref="flipperHour1" />
      <Flipper ref="flipperHour2" />
    </template>
    <template v-if="showHour && showMinute">
      <span>:</span>
    </template>
    <template v-if="showMinute">
      <Flipper ref="flipperMinute1" />
      <Flipper ref="flipperMinute2" />
    </template>
    <template v-if="showMinute && showSecond">
      <span>:</span>
    </template>
    <template v-if="showSecond">
      <Flipper ref="flipperSecond1" />
      <Flipper ref="flipperSecond2" />
    </template>
  </div>
</template>

<script lang="ts">
import { formatDate } from '@/utils/common';
import { ref, reactive, onMounted, watch, PropType } from 'vue';
import Flipper from './Flipper.vue';

type Direction = 'up' | 'down';
</script>

<script lang="ts" setup>
const props = defineProps({
  time: {
    type: Date,
    default: new Date()
  },
  direction: {
    type: String as PropType<Direction>,
    default: 'down'
  },
  showHour: {
    type: Boolean,
    default: true
  },
  showMinute: {
    type: Boolean,
    default: true
  },
  showSecond: {
    type: Boolean,
    default: true
  }
});

const flipperHour1 = ref();
const flipperHour2 = ref();
const flipperMinute1 = ref();
const flipperMinute2 = ref();
const flipperSecond1 = ref();
const flipperSecond2 = ref();
const flippers = reactive<any>([]);

onMounted(() => {
  flippers.push(
    ...[
      flipperHour1,
      flipperHour2,
      flipperMinute1,
      flipperMinute2,
      flipperSecond1,
      flipperSecond2
    ]
  );

  // 初始化所有时间
  const nowTime = formatDate(props.time, 'HHmmss');
  for (let i = 0; i < flippers.length; i++) {
    flippers[i]?.value?.setFront(nowTime[i]);
  }
});

// 监听时间更新
watch(
  () => props.time,
  () => {
    const nowTime = formatDate(new Date(props.time.getTime() - 1000), 'HHmmss');
    const nextTime = formatDate(props.time, 'HHmmss');

    for (let i = 0; i < flippers.length; i++) {
      if (nowTime[i] !== nextTime[i]) {
        if (props.direction === 'up')
          flippers[i]?.value?.flipUp(nowTime[i], nextTime[i]);
        else flippers[i]?.value?.flipDown(nowTime[i], nextTime[i]);
      }
    }
  }
);
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
