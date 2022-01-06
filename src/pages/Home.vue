<template>
  <div class="p-home">
    <TimeComponent />

    <SearchBarComponent />

    <ButtonComponent :icon="`drop${drop}`" class="drop-btn" @click="onClick" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TimeComponent from '@/components/time/Time.vue';
import SearchBarComponent from '@/components/SearchBar.vue';
import ButtonComponent from '@/components/button/Button.vue';

const drop = ref('down');

function onClick() {
  console.log('click');
}
</script>

<style scoped lang="scss">
.p-home {
  padding-top: 10rem;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 1rem;
  grid-auto-columns: 100%;
  justify-content: center;

  .drop-btn {
    animation: bounce 1s ease-in-out infinite alternate;
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
</style>
