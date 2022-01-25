<template>
  <div class="nav-page fixed fit" @click="nextNav">
    <div ref="navCircleRef" class="nav-circle" @click="onClickCircle" />
    <div ref="navTipsRef" class="nav-tips absolute text-white text-h6">
      {{ tips }}
    </div>
    <q-btn
      v-if="step > -1"
      label="退出"
      color="secondary"
      outline
      rounded
      class="q-mt-md"
      @click.stop="() => store.dispatch(CONTROLLERS.SET_FIRST_VISIT, false)"
    />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store';
import { CONTROLLERS } from '@/store/mutation-types';
import { useQuasar } from 'quasar';
import { onBeforeMount, ref } from 'vue';
import useBackgroundImage from '@/composition/use-background-image';

const store = useStore();
const $q = useQuasar();

const { changeBgImage } = useBackgroundImage();

const navCircleRef = ref<HTMLDivElement>();
const navTipsRef = ref<HTMLDivElement>();
const tips = ref(
  '欢迎来到新手导航，下面我将带你快速了解每个步骤的功能。点击任意地方开始导航...'
);

onBeforeMount(() => {
  // 在挂载就绪之前需要一些操作
  store.dispatch(CONTROLLERS.SET_FOCUS_MODE, true);
});

// 是否允许点击导航圆点
const isClickableCircle = ref(false);

// 按步骤名称依次递进。这个列表的顺序就是显示的顺序
const stepName = ref([
  'start',
  'focus_mode',
  'time_panel',
  'info_panel',
  'search',
  'not_focus_mode',
  'tools_btn',
  'tools_panel',
  'change_bg',
  'settings',
  'end'
]);
const step = ref(-1);
function nextNav() {
  if (!isClickableCircle.value) {
    step.value += 1;
  } else {
    $q.notify({
      message: '请点击指定位置...',
      position: 'center'
    });
  }

  tips.value = '';

  if (navCircleRef.value) {
    let top = `${navCircleRef.value.offsetTop}px`;
    let left = `${navCircleRef.value.offsetLeft}px`;
    let width = '70px';
    let height = '70px';
    let radius = '50%';

    let textTop = '50%';
    let textLeft = '50%';
    switch (stepName.value[step.value]) {
      case 'start':
        tips.value = '点击这里可以随时退出新手导航';
        textTop = '50px';
        textLeft = 'calc(50% + 170px)';
        break;

      case 'focus_mode': // 聚焦模式
        top = 'calc(50% - 300px)';
        left = '15%';
        width = '70%';
        height = '240px';
        radius = '10px';
        tips.value =
          '默认进入聚焦模式。只显示基本信息，方便我们预览关键信息，并快速搜索内容';
        break;

      case 'time_panel': // 日期
        top = 'calc(50% - 285px)';
        left = 'calc(50% - 210px)';
        width = '250px';
        height = '100px';
        radius = '10px';
        tips.value = '这里显示的是当前时间';
        textTop = 'calc(50% - 325px)';
        textLeft = 'calc(50% - 150px)';
        break;

      case 'info_panel': // 信息面板
        top = 'calc(50% - 285px)';
        left = 'calc(50% + 20px)';
        width = '200px';
        height = '100px';
        radius = '10px';
        tips.value = '这里显示的是当前日期、农历，以及天气信息等';
        textTop = 'calc(50% - 355px)';
        textLeft = 'calc(50% + 150px)';
        break;

      case 'search': // 搜索框
        top = 'calc(50% - 195px)';
        left = '15%';
        width = '70%';
        height = '120px';
        radius = '10px';
        tips.value = '聚焦模式下，默认会自动定位到搜索框，让您可以快速搜索内容';
        textTop = '45%';
        break;

      case 'tools_btn': // 扩展工具按钮
        top = 'calc(50% - 90px)';
        left = 'calc(50% - 50px)';
        width = '100px';
        height = '50px';
        radius = '10px';
        tips.value = '在非聚焦模式下，可以使用扩展工具栏。点击按钮可以打开它';
        textTop = '50%';
        textLeft = 'calc(50% - 100px)';
        isClickableCircle.value = true;
        break;

      case 'tools_panel': // 扩展工具箱
        top = 'calc(50% - 100px)';
        left = '5%';
        width = '90%';
        height = '40%';
        radius = '10px';
        tips.value = '工具箱中可以添加你喜欢的任意网站导航';
        textTop = '34%';
        textLeft = 'calc(50% - 100px)';
        break;

      case 'not_focus_mode': // 关闭聚焦
        top = '60%';
        left = '70%';
        width = '100px';
        height = '100px';
        tips.value = '点击任意空白位置可以关闭聚焦模式';
        textTop = 'calc(50% + 40px)';
        textLeft = 'calc(50% + 200px)';
        isClickableCircle.value = true;
        break;

      case 'change_bg': // 切换背景
        top = 'calc(100% - 80px)';
        left = 'calc(100% - 70px)';
        tips.value = '点击这里可以切换背景图片';
        textTop = 'calc(100% - 100px)';
        textLeft = 'calc(100% - 200px)';
        isClickableCircle.value = true;
        break;

      case 'settings': // 设置
        top = '0';
        left = 'calc(100% - 70px)';
        tips.value = '点击这里可以打开设置面板';
        textTop = '70px';
        textLeft = 'calc(100% - 150px)';
        break;

      case 'end': // 结束
        top = '0';
        left = 'calc(50% - 35px)';
        tips.value =
          '恭喜您~！已经完成了所有新手导航，现在可以愉快的使用它了~（点击任意地方闭新手导航）';
        textTop = '10%';
        break;

      default:
        store.dispatch(CONTROLLERS.SET_FIRST_VISIT, false);
        break;
    }

    navCircleRef.value.style.top = top;
    navCircleRef.value.style.left = left;
    navCircleRef.value.style.width = width;
    navCircleRef.value.style.height = height;
    navCircleRef.value.style.borderRadius = radius;

    if (navTipsRef.value) {
      navTipsRef.value.style.top = textTop;
      navTipsRef.value.style.left = textLeft;
    }
  }
}

// 允许点击导航聚焦点的操作
function onClickCircle(e: Event) {
  if (!isClickableCircle.value) return;

  // 可以点击时，阻止事件冒泡
  e.stopPropagation();

  switch (stepName.value[step.value]) {
    case 'not_focus_mode':
      store.dispatch(CONTROLLERS.SET_FOCUS_MODE, false);
      tips.value = '做得好~！';
      break;

    case 'tools_btn':
      store.dispatch(CONTROLLERS.SET_SHOW_TOOLBOX, true);
      tips.value = '做得好~！';
      break;

    case 'change_bg':
      tips.value = '做得好~！';
      changeBgImage();
      break;

    default:
      break;
  }

  isClickableCircle.value = false;
}
</script>

<style scoped lang="scss">
.nav-page {
  z-index: 10;

  .nav-circle {
    position: absolute;
    top: 0;
    left: calc(50% - 35px);
    width: 0;
    height: 0;
    border-radius: 50%;
    box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.7);
    transition-property: top, left, width, height, border-radius;
    transition-duration: 0.5s;
  }

  .nav-tips {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    background-color: transparent;
    transition-property: top, left;
    transition-duration: 0.5s;
  }
}

@keyframes nav-circle-anim {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.9);
  }
}

.nav-circle {
  animation: nav-circle-anim 1s infinite;
}
</style>
