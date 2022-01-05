<template>
  <div class="flipper-bar" :class="[flipType, { go: isFlipping }]">
    <div class="digital front" :class="`number${frontText}`" />
    <div class="digital back" :class="`number${backText}`" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const frontText = ref('');
const backText = ref('');
const flipType = ref<'down' | 'up'>('down');
const isFlipping = ref(false);

function flip(type: 'down' | 'up', front: number, back: number) {
  // 如果处于翻转中，则不执行
  if (isFlipping.value) {
    return;
  }
  frontText.value = front.toString();
  backText.value = back.toString();
  flipType.value = type;

  // 使其翻转
  isFlipping.value = true;
  setTimeout(() => {
    // 停止翻转
    isFlipping.value = false;
    frontText.value = back.toString();
  }, 600); // 翻牌动画时间，与CSS中设置的animation-duration保持一致
}

// 下翻牌
function flipDown(front: any, back: any) {
  flip('down', front, back);
}

// 上翻牌
function flipUp(front: any, back: any) {
  flip('up', front, back);
}

// 设置前牌文字
function setFront(text: number) {
  frontText.value = text.toString();
}

// 设置后牌文字
function setBack(text: number) {
  backText.value = text.toString();
}

defineExpose({
  flipDown,
  flipUp,
  setFront,
  setBack
});
</script>

<style scoped lang="scss">
.flipper-bar {
  display: inline-block;
  position: relative;
  width: 3rem;
  height: 5rem;
  line-height: 5rem;
  border-radius: 10px;
  font-size: 3rem;
  color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

  .digital:before,
  .digital:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    background: #000;
    overflow: hidden;
    box-sizing: border-box;
  }

  .digital:before {
    top: 0;
    bottom: 50%;
    border-radius: 10px 10px 0 0;
  }

  .digital:after {
    top: 50%;
    bottom: 0;
    border-radius: 0 0 10px 10px;
    line-height: 0;
  }

  @each $i in 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 {
    .number#{$i} {
      &:before,
      &:after {
        content: '#{$i}';
      }
    }
  }

  /* 向下翻 */
  &.down .front:before {
    z-index: 3;
  }
  &.down .back:after {
    z-index: 2;
    transform-origin: 50% 0%;
    transform: perspective(160px) rotateX(180deg);
  }
  &.down .front:after,
  &.down .back:before {
    z-index: 1;
  }
  &.down.go .front:before {
    transform-origin: 50% 100%;
    animation: frontFlipDown 0.6s ease-in-out both;
    backface-visibility: hidden;
  }
  &.down.go .back:after {
    animation: backFlipDown 0.6s ease-in-out both;
  }

  /* 向上翻 */
  &.up .front:after {
    z-index: 3;
  }
  &.up .back:before {
    z-index: 2;
    transform-origin: 50% 100%;
    transform: perspective(160px) rotateX(-180deg);
  }
  &.up .front:before,
  &.up .back:after {
    z-index: 1;
  }
  &.up.go .front:after {
    transform-origin: 50% 0;
    animation: frontFlipUp 0.6s ease-in-out both;
    backface-visibility: hidden;
  }
  &.up.go .back:before {
    animation: backFlipUp 0.6s ease-in-out both;
  }
}

@media screen and (max-width: 768px) {
  .flipper-bar {
    width: 2rem;
    height: 3rem;
    line-height: 3rem;
    font-size: 2rem;
  }
}

@keyframes frontFlipDown {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }
  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}

@keyframes backFlipDown {
  0% {
    transform: perspective(160px) rotateX(180deg);
  }
  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

@keyframes frontFlipUp {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }
  100% {
    transform: perspective(160px) rotateX(180deg);
  }
}

@keyframes backFlipUp {
  0% {
    transform: perspective(160px) rotateX(-180deg);
  }
  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}
</style>
