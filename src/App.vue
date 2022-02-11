<template>
  <router-view style="height: 100vh" />

  <footer>
    CopyRight @
    <a href="https://www.xiaopangying.com" target="_blank">XiaoPangYing</a>
    <span> | </span>
    <a
      href="https://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=support%40xiaopangying.com&subject=StartPage%20feedback"
      target="_blank"
    >
      反馈
    </a>
  </footer>
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

  a {
    color: black;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
