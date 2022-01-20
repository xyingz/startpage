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
            class="absolute-bottom text-grey-8"
            style="padding-bottom: 10rem"
          >
            <sup>『</sup> {{ randomAphorisms?.content }} <sub>』</sub>
            <q-tooltip :delay="500">
              {{ randomAphorisms?.source }} {{ randomAphorisms?.author }}
            </q-tooltip>
          </div>
        </transition>
      </div>
    </div>

    <SettingDrawer v-model="showSettings" />

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
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import InfoPanelComponent from '@/components/InfoPanel.vue';
import SearchBarComponent from '@/components/SearchBar.vue';
import ToolboxComponent from '@/components/tools/ToolBox.vue';
import { useStore } from '@/store';
import { CONTROLLERS } from '@/store/mutation-types';
import { mobileKeyboardCallback, random } from '@/utils/common';
import { get } from '@/utils/http/requests';
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

// 处理背景图片
function getImage(rand = false, catchCb = () => {}, finallyCb = () => {}) {
  get<BackgroundImage>(`https://api.xiaopangying.com/image/bing?random=${rand}`)
    .then(([, res]) => {
      store.dispatch(CONTROLLERS.SET_BACKGROUND_IMAGE, res).then(() => {
        document.body.style.backgroundImage = `url(${store.state.controllers.backgroundImage?.url})`;
      });
    })
    .catch(catchCb)
    .finally(finallyCb);
}

// 初始请求一次
getImage();

const loadingChangeImage = ref(false);
function changeBgImage() {
  loadingChangeImage.value = true;

  // 延长切换图片的时间，降低请求频率
  setTimeout(() => {
    getImage(true, undefined, () => {
      loadingChangeImage.value = false;
    });
  }, 500);
}
</script>

<style scoped lang="scss"></style>
