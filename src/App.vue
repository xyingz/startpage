<template>
  <router-view />

  <footer>CopyRight @ JeremyJone</footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {}
});
</script>

<style>
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
