<template>
  <q-dialog
    ref="dialogRef"
    v-model="show"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 50%">
      <q-card-section class="bg-primary">
        <div class="text-h6 text-white">添加导航</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          ref="toolNameRef"
          v-model="toolName"
          dense
          placeholder="导航名称"
          :rules="[val => !!val || '导航名称是必要的']"
        />
        <q-input
          ref="toolUrlRef"
          v-model="toolUrl"
          dense
          placeholder="完整的 URL，通常以 http:// 或 https:// 起始"
          :rules="[val => !!val || 'URL 是必要的']"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="添加" @click="onConfirm" />
        <q-btn v-close-popup outline color="primary" label="取消" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useStore } from '@/store';
import { CONTROLLERS, SETTINGS } from '@/store/mutation-types';
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';

const store = useStore();

const $q = useQuasar();
const show = computed<boolean>({
  get() {
    return store.state.controllers.showAddCustomToolDialog;
  },
  set(value) {
    store.dispatch(CONTROLLERS.SET_ADD_CUSTOM_TOOL_DIALOG_VISIBLE, value);
  }
});

const toolName = ref('');
const toolUrl = ref('');
const toolNameRef = ref<HTMLInputElement>();
const toolUrlRef = ref<HTMLInputElement>();
const dialogRef = ref();
function onConfirm() {
  if (!toolName.value) {
    toolNameRef.value?.focus();
    dialogRef.value?.shake();
    return;
  }

  if (!toolUrl.value) {
    toolUrlRef.value?.focus();
    dialogRef.value?.shake();
    return;
  }

  if (store.state.settings.tools.length >= 18) {
    $q.notify({
      color: 'warning',
      message: '工具箱已满。最多可以放置 24 个工具',
      position: 'center'
    });
    return;
  }

  store.dispatch(SETTINGS.ADD_TOOL, {
    name: toolName.value,
    url: toolUrl.value
  });
  toolName.value = '';
  toolUrl.value = '';

  show.value = false;
}
</script>

<style scoped></style>
