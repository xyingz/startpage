<template>
  <router-view style="height: 100vh" />

  <footer>
    CopyRight @
    <a href="https://www.xiaopangying.com" target="_blank">XiaoPangYing.COM</a>
    <span> | </span>
    <a
      href="https://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=support%40xiaopangying.com&subject=StartPage%20feedback"
      target="_blank"
    >
      反馈
    </a>
    <span> | </span>
    <a href="javascript:void(0);" @click="openFunctionalIntroDialog">功能</a>
  </footer>

  <ManageSearchDialog />
  <FuncionalIntroDialog v-model="showFunctionalIntro" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ManageSearchDialog from '@/components/ManageSearchDialog.vue';
import FuncionalIntroDialog from '@/pages/FunctionalIntroDialog.vue';

export default defineComponent({
  name: 'App',
  components: { ManageSearchDialog, FuncionalIntroDialog },

  setup() {
    const showFunctionalIntro = ref(false);

    return {
      showFunctionalIntro,
      openFunctionalIntroDialog: () => {
        showFunctionalIntro.value = true;
      }
    };
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

  a {
    color: black;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
