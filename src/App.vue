<template>
  <router-view style="height: 100vh" />

  <footer>CopyRight @ JeremyJone</footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { get } from './utils/http/requests';

export default defineComponent({
  name: 'App',

  setup() {
    const image = ref();

    get('https://api.xiaopangying.com/image/bing').then(([, res]) => {
      image.value = res;
      document.body.style.backgroundImage = `url(${image.value.url})`;
    });

    return { image };
  }
});
</script>

<style lang="scss">
#app {
  text-align: center;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-weight: 500;
  color: black;
  backdrop-filter: blur(10px);
}
</style>
