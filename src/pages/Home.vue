<template>
  <div class="column" @click.passive="onFocusOut">
    <div class="col-5 column full-width justify-end q-gutter-y-md">
      <TimeComponent />
      <SearchBarComponent />
    </div>

    <div class="col-7 q-py-md">
      <ToolboxComponent />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TimeComponent from '@/components/time/Time.vue';
import SearchBarComponent from '@/components/SearchBar.vue';
import ToolboxComponent from '@/components/ToolBox.vue';
import { useStore } from '@/store';
import { SET_FOCUS_MODE } from '@/store/mutation-types';

const store = useStore();

function onFocusOut() {
  document.body.classList.remove('global-search-active');
  store.commit(SET_FOCUS_MODE, false);
}
</script>

<style scoped lang="scss"></style>
