<template>
  <q-dialog v-model="show">
    <q-card class="fit">
      <q-card-section class="bg-primary q-pa-none">
        <q-toolbar>
          <q-toolbar-title class="text-center text-bold">设置</q-toolbar-title>
          <q-btn v-close-popup flat round dense icon="close" />
        </q-toolbar>
      </q-card-section>

      <q-card-section class="scroll" style="height: calc(100% - 50px)">
        <q-list bordered padding>
          <q-item-label header>功能</q-item-label>

          <q-item v-ripple tag="label">
            <q-item-section>
              <q-item-label>切换搜索引擎时保存为默认引擎</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="isSaveDefaultSearchEngine" color="blue" />
            </q-item-section>
          </q-item>

          <q-item v-ripple tag="label">
            <q-item-section>
              <q-item-label>启动时启用聚焦模式</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="isDefaultFocusMode" color="blue" />
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item-label header>显示</q-item-label>

          <q-item v-ripple tag="label">
            <q-item-section>
              <q-item-label>信息面板</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="isShowInfoPanel" color="blue" />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-item-label>工具箱图标圆角</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="toolRadius"
                :min="0"
                :max="50"
                label
                @change="onChangeToolRadius"
              />
            </q-item-section>
            <q-item-section side>
              <q-btn
                size="sm"
                color="primary"
                label="重置"
                @click="toolRadius = 10"
              />
            </q-item-section>
          </q-item>

          <q-item class="bg-image">
            <q-item-section>
              <q-item-label>背景图片</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-img
                :src="store.state.controllers.backgroundImage?.thumbnailUrl"
              >
                <div class="image-tip absolute-bottom text-caption text-center">
                  <a
                    target="_blank"
                    :href="
                      store.state.controllers.backgroundImage?.copyrightLink
                    "
                  >
                    {{ store.state.controllers.backgroundImage?.copyright }}
                  </a>
                </div>
              </q-img>
            </q-item-section>
            <q-item-section side style="gap: 1rem; align-items: center">
              <span>
                图片源自
                <a
                  style="display: inline"
                  target="_blank"
                  href="https://cn.bing.com"
                >
                  Bing
                </a>
              </span>

              <q-btn-dropdown
                split
                size="sm"
                color="secondary"
                label="下载该图片"
                @click="() => downloadImage('2k')"
              >
                <q-list dense>
                  <q-item
                    v-close-popup
                    clickable
                    @click="() => downloadImage('small')"
                  >
                    <q-item-section>
                      <q-item-label>下载小图</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item
                    v-close-popup
                    clickable
                    @click="() => downloadImage('2k')"
                  >
                    <q-item-section>
                      <q-item-label>下载大图(2K)</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item
                    v-close-popup
                    clickable
                    @click="() => downloadImage('4k')"
                  >
                    <q-item-section>
                      <q-item-label>下载高清图(4K)</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item
                    v-close-popup
                    clickable
                    @click="() => downloadImage('mobile')"
                  >
                    <q-item-section>
                      <q-item-label>下载手机桌面</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-item-label>背景图片模糊区间</q-item-label>
            </q-item-section>
            <q-item-section class="q-ml-sm">
              <q-range
                v-model="focusBgBlurRange"
                label
                markers
                :marker-labels="focusBgBlurRangeLabels"
                :min="0"
                :max="30"
                @change="onChangeFocusBgBlurRange"
              />
            </q-item-section>
          </q-item>

          <!-- 系统基础功能放在最下面 -->
          <q-separator spaced />
          <q-item-label header>系统</q-item-label>

          <q-item
            v-if="!isDeviceMobile()"
            v-ripple
            tag="label"
            @click="
              () => store.dispatch(CONTROLLERS.SET_SHOW_BEGINNER_TOUR, true)
            "
          >
            <q-item-section>
              <q-item-label>查看新手教程</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn flat color="primary" label="查看" />
            </q-item-section>
          </q-item>

          <q-item tag="label" @click.prevent>
            <q-item-section>
              <q-item-label>恢复默认设置</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                flat
                color="negative"
                label="重置"
                @click="showResetDialog"
              />
            </q-item-section>
          </q-item>

          <!-- <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label>Content filtering</q-item-label>
              <q-item-label caption>
                Set the content filtering level to restrict apps that can be
                downloaded
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label>Password</q-item-label>
              <q-item-label caption>
                Require password for purchase or use password to restrict
                purchase
              </q-item-label>
            </q-item-section>
          </q-item> -->

          <!-- <q-separator spaced />
          <q-item-label header>General</q-item-label>

          <q-item v-ripple tag="label">
            <q-item-section side top>
              <q-checkbox v-model="check1" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Notifications</q-item-label>
              <q-item-label caption>
                Notify me about updates to apps or games that I downloaded
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-ripple tag="label">
            <q-item-section side top>
              <q-checkbox v-model="check2" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Sound</q-item-label>
              <q-item-label caption>
                Auto-update apps at anytime. Data charges may apply
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-ripple tag="label">
            <q-item-section side top>
              <q-checkbox v-model="check3" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Auto-add widgets</q-item-label>
              <q-item-label caption>
                Automatically add home screen widgets
              </q-item-label>
            </q-item-section>
          </q-item> -->

          <!-- <q-separator spaced />
          <q-item-label header>Notifications</q-item-label>

          <q-item v-ripple tag="label">
            <q-item-section>
              <q-item-label>Battery too low</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="notif1" color="blue" val="battery" />
            </q-item-section>
          </q-item>

          <q-item v-ripple tag="label">
            <q-item-section>
              <q-item-label>Friend request</q-item-label>
              <q-item-label caption>Allow notification</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-toggle v-model="notif2" color="green" val="friend" />
            </q-item-section>
          </q-item>

          <q-item v-ripple tag="label">
            <q-item-section>
              <q-item-label>Picture uploaded</q-item-label>
              <q-item-label caption
                >Allow notification when uploading images</q-item-label
              >
            </q-item-section>
            <q-item-section side top>
              <q-toggle v-model="notif3" color="red" val="picture" />
            </q-item-section>
          </q-item> -->

          <!-- <q-separator spaced />
          <q-item-label header>Other settings</q-item-label>

          <q-item>
            <q-item-section side>
              <q-icon color="teal" name="volume_down" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="volume"
                :min="0"
                :max="10"
                label
                color="teal"
              />
            </q-item-section>
            <q-item-section side>
              <q-icon color="teal" name="volume_up" />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="deep-orange" name="brightness_medium" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="brightness"
                :min="0"
                :max="10"
                label
                color="deep-orange"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="mic" :min="0" :max="50" label />
            </q-item-section>
          </q-item> -->
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { clearAll, saveUserSettings } from '@/config/set-data';
import { useStore } from '@/store';
import { CONTROLLERS, SETTINGS } from '@/store/mutation-types';
import { computed, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { download } from '@/utils/http/requests';
import { isDeviceMobile } from '@/utils/check';

const store = useStore();

const show = computed<boolean>({
  get() {
    return store.state.controllers.showSettingDialog;
  },
  set(value) {
    store.dispatch(CONTROLLERS.SET_SETTING_DIALOG_VISIBLE, value);
  }
});

const isSaveDefaultSearchEngine = computed<boolean>({
  get() {
    return store.state.settings.userSettings.isSaveDefaultSearchEngine;
  },
  set(value) {
    const v = { isSaveDefaultSearchEngine: value };
    store.commit(SETTINGS.SAVE_USER_SETTINGS, v);
    saveUserSettings(v);
  }
});

const isDefaultFocusMode = computed<boolean>({
  get() {
    return store.state.settings.userSettings.isDefaultFocusMode;
  },
  set(value) {
    const v = { isDefaultFocusMode: value };
    store.commit(SETTINGS.SAVE_USER_SETTINGS, v);
    saveUserSettings(v);
  }
});

const isShowInfoPanel = computed<boolean>({
  get() {
    return store.state.settings.userSettings.isShowInfoPanel;
  },
  set(value) {
    const v = { isShowInfoPanel: value };
    store.commit(SETTINGS.SAVE_USER_SETTINGS, v);
    saveUserSettings(v);
  }
});

const toolRadius = computed<number>({
  get() {
    return store.state.settings.userSettings.toolRadius || 10;
  },
  set(value) {
    const v = { toolRadius: value };
    store.commit(SETTINGS.SAVE_USER_SETTINGS, v);
  }
});

function onChangeToolRadius(val: number) {
  const v = { toolRadius: val };
  saveUserSettings(v);
}

const focusBgBlurRange = ref({
  min: store.state.settings.userSettings.minBlur,
  max: store.state.settings.userSettings.maxBlur
});
watch(
  () => focusBgBlurRange.value.min,
  val => {
    const v = { minBlur: val };
    store.commit(SETTINGS.SAVE_USER_SETTINGS, v);
  }
);
watch(
  () => focusBgBlurRange.value.max,
  val => {
    const v = { maxBlur: val };
    store.commit(SETTINGS.SAVE_USER_SETTINGS, v);
  }
);

const focusBgBlurRangeLabels: { value: number; label: string }[] = [];
for (let i = 0; i <= 30; i++) {
  if (i % 5 === 0) {
    focusBgBlurRangeLabels.push({ value: i, label: `${i}` });
  }
}

function onChangeFocusBgBlurRange(value: { min: number; max: number }) {
  saveUserSettings({
    minBlur: value.min,
    maxBlur: value.max
  });
}

const $q = useQuasar();
function showResetDialog() {
  $q.dialog({
    title: '警告',
    message: '确认后系统会清除所有数据并恢复默认值，您确定继续吗?',
    color: 'negative',
    ok: '是的',
    cancel: '不，我再想想'
  }).onOk(() => {
    clearAll();
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  });
}

function downloadImage(size: 'small' | '2k' | '4k' | 'mobile') {
  let url: string | undefined = '';
  switch (size) {
    case 'small':
      url = store.state.controllers.backgroundImage?.smallUrl;
      break;
    case '4k':
      url = store.state.controllers.backgroundImage?.uhdUrl;
      break;
    case 'mobile':
      url = store.state.controllers.backgroundImage?.standardUrl_M;
      break;
    case '2k':
    default:
      url = store.state.controllers.backgroundImage?.standardUrl;
  }
  if (url) {
    download(url, 'background.png', 'image/png');
  }
}
</script>

<style scoped lang="scss">
.bg-image {
  .image-tip {
    opacity: 0;
    transition: opacity 0.5s;
  }

  &:hover {
    .image-tip {
      opacity: 1;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}
</style>
