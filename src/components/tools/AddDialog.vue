<template>
  <q-dialog
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
import { ADD_TOOL } from '@/store/mutation-types';
import { computed, ref } from 'vue';

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

const toolName = ref('');
const toolUrl = ref('');
const toolNameRef = ref<HTMLInputElement>();
const toolUrlRef = ref<HTMLInputElement>();
const store = useStore();
function onConfirm() {
  if (!toolName.value) {
    toolNameRef.value?.focus();
    return;
  }

  if (!toolUrl.value) {
    toolUrlRef.value?.focus();
    return;
  }

  store.dispatch(ADD_TOOL, {
    comment: toolName.value,
    url: toolUrl.value
  });
  toolName.value = '';
  toolUrl.value = '';

  show.value = false;
}
</script>

<style scoped></style>
