<template>
  <div>
    <div class="column full-height" @click.passive="onFocusOut">
      <div class="absolute-top-right q-mr-md q-mt-sm">
        <q-btn
          flat
          round
          size="sm"
          icon="settings"
          @click="() => (showSettings = true)"
        />
      </div>
      <div
        class="column full-width justify-end q-gutter-y-md"
        :class="`col-${$q.screen.lt.sm && isShowKeyboard ? 9 : 5}`"
      >
        <InfoPanelComponent />
        <SearchBarComponent />
      </div>

      <div
        class="q-py-md"
        :class="`col-${$q.screen.lt.sm && isShowKeyboard ? 3 : 7}`"
      >
        <ToolboxComponent />
      </div>
    </div>

    <SettingDrawer v-model="showSettings" />
  </div>
</template>

<script lang="ts" setup>
import InfoPanelComponent from '@/components/InfoPanel.vue';
import SearchBarComponent from '@/components/SearchBar.vue';
import ToolboxComponent from '@/components/tools/ToolBox.vue';
import { useStore } from '@/store';
import { CONTROLLERS } from '@/store/mutation-types';
import { mobileKeyboardCallback } from '@/utils/common';
import { ref } from 'vue';
import SettingDrawer from './HomeSettingDrawer.vue';

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

const showSettings = ref(false);

// 判断手机端的软键盘是否弹出，从而在聚焦模式下减少下方的高度
const isShowKeyboard = ref(false);
mobileKeyboardCallback(
  () => {
    isShowKeyboard.value = true;
  },
  () => {
    isShowKeyboard.value = false;
  }
);
</script>

<style scoped lang="scss"></style>
