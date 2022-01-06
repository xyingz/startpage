<template>
  <div class="p-home" :class="{ 'show-tool-box': isShowToolBox }">
    <div class="p-home-search">
      <TimeComponent />

      <SearchBarComponent :is-tidy="isShowToolBox" />

      <div>
        <ButtonComponent
          :icon="`drop${drop}`"
          type="transparent"
          class="drop-btn"
          @click="changeToolBoxState"
        />
      </div>
    </div>

    <transition name="scale">
      <div v-if="isShowToolBox" class="tool-box">
        <div v-for="i in 30" :key="i">{{ i }}</div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import TimeComponent from '@/components/time/Time.vue';
import SearchBarComponent from '@/components/SearchBar.vue';
import ButtonComponent from '@/components/button/Button.vue';
import { useStore } from '@/store/index';

const store = useStore();

const drop = ref('down');
const isShowToolBox = ref(false);

function changeToolBoxState() {
  isShowToolBox.value = !isShowToolBox.value;
  drop.value = isShowToolBox.value ? 'up' : 'down';
}

watch(
  () => store.state.focusMode,
  mode => {
    if (mode && isShowToolBox.value) changeToolBoxState();
  }
);
</script>

<style scoped lang="scss">
.p-home {
  height: 100%;
  width: 100vw;
  padding-top: 10rem;
  transition: padding-top 0.5s;

  &-search {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 1rem;
    grid-auto-columns: 100%;
    justify-content: center;

    .drop-btn {
      animation: bounce 1s ease-in-out infinite alternate;
    }
  }
}

@media screen and (max-width: 768px) {
  .p-home.show-tool-box {
    padding-top: 4rem;
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

.tool-box {
  width: 70%;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 0.5rem;
  grid-auto-columns: 100%;
  justify-content: center;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  .tool-box {
    width: 80%;
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
