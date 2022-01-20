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
            <q-item-section>
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
                :src="
                  store.state.controllers.backgroundImage?.url.replace(
                    '1920x1080',
                    '400x240'
                  )
                "
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
            <q-item-section side style="gap: 1rem">
              <span>
                图片源自
                <a
                  style="display: inline"
                  target="_blank"
                  href="https://bing.com"
                >
                  Bing
                </a>
              </span>

              <q-btn
                label="下载该图片"
                flat
                size="sm"
                color="primary"
                @click="downloadImage"
              />
            </q-item-section>
          </q-item>

          <!-- 重置放在最下面 -->
          <q-separator spaced />
          <q-item-label header>重置</q-item-label>

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
import { SETTINGS } from '@/store/mutation-types';
import { computed } from 'vue';
import { useQuasar } from 'quasar';

const props = defineProps({
  showDialog: {
    default: false,
    type: Boolean
  }
});
const emits = defineEmits(['update:modelValue']);
const show = computed<boolean>({
  get() {
    return props.showDialog;
  },
  set(value) {
    emits('update:modelValue', value);
  }
});

const store = useStore();
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

function downloadImage() {
  if (store.state.controllers.backgroundImage?.url) {
    // 跨域下载图片
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = store.state.controllers.backgroundImage.url;
    img.onload = () => {
      const canves = document.createElement('canvas');
      canves.width = img.width;
      canves.height = img.height;
      const ctx = canves.getContext('2d');
      ctx?.drawImage(img, 0, 0, img.width, img.height);

      const a = document.createElement('a');
      a.href = canves.toDataURL('image/png');
      a.download = 'background.png';
      a.click();
    };
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
