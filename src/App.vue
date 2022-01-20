<template>
  <router-view style="height: 100vh" />

  <footer>CopyRight @ JeremyJone</footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
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
}
</style>
