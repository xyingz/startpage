<template>
  <div class="position-relative">
    <BeginnerTourComponent
      v-if="!isDeviceMobile() && store.state.controllers.showBeginnerTour"
    />

    <div
      class="fit absolute shadow-5 x-home-bg"
      :class="{ 'x-home-filter': store.state.controllers.focusMode }"
      @click.passive="onFocusOut"
    />
    <div class="column full-height" @click.passive="onFocusOut">
      <div class="absolute-top-right q-mr-md q-mt-sm">
        <q-btn flat round size="sm" icon="favorite_border" @click.stop>
          <q-tooltip anchor="bottom start" self="center end">
            如果喜欢本页面，可以设为主页。
            <br />
            也可以按 <em>Ctrl+D</em> 快速添加到收藏夹~
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          size="sm"
          icon="settings"
          @click="
            () => store.dispatch(CONTROLLERS.SET_SETTING_DIALOG_VISIBLE, true)
          "
        />
      </div>
      <div
        class="column full-width justify-end q-gutter-y-md"
        :class="`col-${$q.screen.lt.sm && isShowKeyboard ? 9 : 5}`"
      >
        <InfoPanelComponent
          v-if="store.state.settings.userSettings.isShowInfoPanel"
        />
        <SearchBarComponent />
      </div>

      <div
        class="q-py-md"
        :class="`col-${$q.screen.lt.sm && isShowKeyboard ? 3 : 7}`"
      >
        <ToolboxComponent />

        <transition name="fade">
          <div
            v-if="!isShowKeyboard && store.state.controllers.focusMode"
            class="absolute-bottom text-grey-6"
            style="margin-bottom: 10rem"
          >
            <sup>『</sup> {{ randomAphorisms?.content }} <sub>』</sub>
            <q-tooltip
              :delay="500"
              anchor="top middle"
              self="bottom middle"
              transition-show="scale"
              transition-hide="scale"
              class="shadow-5"
              style="background-color: #75757555"
            >
              {{ randomAphorisms?.source }} {{ randomAphorisms?.author }}
            </q-tooltip>
          </div>
        </transition>
      </div>
    </div>

    <SettingDrawer />

    <q-btn
      v-show="!store.state.controllers.focusMode"
      class="absolute-bottom-right q-mb-lg q-mr-md"
      round
      flat
      icon="auto_awesome"
      :loading="loadingChangeImage"
      :disable="loadingChangeImage"
      color="accent"
      @click="changeBgImage"
    >
      <template #loading>
        <q-spinner-ball />
      </template>

      <q-tooltip anchor="center left" self="center right">
        {{ store.state.controllers.backgroundImage?.copyright || 'undefined' }}
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import InfoPanelComponent from '@/components/InfoPanel.vue';
import SearchBarComponent from '@/components/SearchBar.vue';
import ToolboxComponent from '@/components/tools/ToolBox.vue';
import { useStore } from '@/store';
import { CONTROLLERS } from '@/store/mutation-types';
import { mobileKeyboardCallback, random } from '@/utils/common';
import useBackgroundImage from '@/composition/use-background-image';
import { isDeviceMobile } from '@/utils/check';
import SettingDrawer from './HomeSettingDrawer.vue';
import BeginnerTourComponent from './BeginnerTourPage.vue';

const store = useStore();

function onFocusOut() {
  // 移除聚焦模式
  if (store.state.controllers.focusMode) {
    store.dispatch(CONTROLLERS.SET_FOCUS_MODE, false);
  }

  // 移除删除导航工具状态
  if (store.state.controllers.removeToolState) {
    store.dispatch(CONTROLLERS.SET_REMOVE_TOOL_STATE, false);
  }
}

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

// 格言警句
const aphorisms = ref<any[]>([]);
const randomAphorisms = ref<any>();
fetch('/aphorisms.json')
  .then(res => res.json())
  .then(data => {
    aphorisms.value = data;
    randomAphorisms.value = random(aphorisms.value);
  });

watch(
  () => store.state.controllers.focusMode,
  () => {
    randomAphorisms.value = random(aphorisms.value);
  }
);

const { initImage, changeBgImage, loadingChangeImage } = useBackgroundImage();

// 初始背景图片
initImage();

const minBlur = computed(() => store.state.settings?.userSettings.minBlur || 0);
const maxBlur = computed(
  () => store.state.settings?.userSettings.maxBlur || 20
);
</script>

<style scoped lang="scss">
$min-blur: calc(v-bind(minBlur) * 1px);
$max-blur: calc(v-bind(maxBlur) * 1px);

.x-home-bg {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  transition: filter 0.2s;
  filter: blur(#{$min-blur});
  transform: scale(1.1); // 隐藏白边
}

.x-home-filter {
  filter: blur(#{$max-blur});
}
</style>
