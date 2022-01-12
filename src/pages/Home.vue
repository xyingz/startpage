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
import ToolboxComponent from '@/components/tools/ToolBox.vue';
import { useStore } from '@/store';
import { CONTROLLERS } from '@/store/mutation-types';

const store = useStore();

function onFocusOut() {
  // 移除聚焦类
  if (document.body.classList.contains('global-search-active')) {
    document.body.classList.remove('global-search-active');
  }

  // 移除聚焦模式
  if (store.state.controllers.focusMode) {
    store.dispatch(CONTROLLERS.SET_FOCUS_MODE, false);
  }

  // 移除删除导航工具状态
  if (store.state.controllers.removeToolState) {
    store.dispatch(CONTROLLERS.SET_REMOVE_TOOL_STATE, false);
  }
}
</script>

<style scoped lang="scss"></style>
