<template>
  <XDialog v-model="show">
    <q-toolbar>
      <q-toolbar-title class="text-center text-bold">搜索记录</q-toolbar-title>
      <q-btn v-close-popup flat round dense icon="close" />
    </q-toolbar>

    <q-list
      dense
      style="min-width: 500px; max-width: 1000px"
      class="q-pa-md q-gutter-md"
    >
      <q-item
        v-for="(item, index) in store.state.settings.searchRecord"
        :key="`${item}-${index}`"
        v-close-popup
        clickable
        @click="() => onSearchItem(item)"
      >
        <q-item-section>
          <q-item-label>{{ item }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            flat
            dense
            round
            size="sm"
            icon="close"
            @click.stop="() => onDeleteRecord(item)"
          />
        </q-item-section>
      </q-item>

      <q-item
        v-if="store.state.settings.searchRecord?.length"
        v-close-popup
        clickable
        @click="onClear"
      >
        <q-item-section>
          <q-item-label class="text-center">清除所有记录</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </XDialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import XDialog from '@/components/dialog/BasicDialog.vue';
import { useStore } from '@/store';
import useSearch from '@/composition/use-search';
import { saveSearchRecord } from '@/config/set-data';
import { SETTINGS } from '@/store/mutation-types';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:modelValue']);

const show = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
});

const store = useStore();

const { onClickRecord } = useSearch();
function onSearchItem(item: string) {
  onClickRecord(item);
}

function onDeleteRecord(record: string) {
  store.dispatch(SETTINGS.DELETE_SEARCH_RECORD, record).then(saveSearchRecord);
}

function onClear() {
  store.dispatch(SETTINGS.CLEAR_SEAECH_RECORD).then(saveSearchRecord);
  show.value = false;
}
</script>

<style scoped></style>
