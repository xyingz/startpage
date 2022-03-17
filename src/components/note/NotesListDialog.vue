<template>
  <XDialog v-model="show">
    <q-list
      style="min-width: 200px; max-width: 600px"
      class="q-pa-md q-gutter-md"
    >
      <template v-for="note in notes" :key="note.id">
        <q-item
          class="rounded-borders no-padding overflow-hidden"
          clickable
          @dblclick="() => note.isClose && openNote(note)"
        >
          <q-item-section
            style="
              max-height: 10rem;
              background-color: darkgrey;
              justify-content: start;
            "
          >
            <div
              class="full-width absolute-top"
              :style="{ height: '3px', backgroundColor: note.backgroundColor }"
            />
            <!-- eslint-disable vue/no-v-html -->
            <p class="q-pa-sm" v-html="note.content" />
            <div v-if="!note.isClose" class="x-note-open-mark" />

            <!-- 右键菜单 -->
            <q-menu context-menu>
              <q-list dense>
                <q-item clickable>
                  <q-item-section>
                    删除该标签
                    <q-popup-proxy auto-close>
                      <q-btn
                        round
                        dense
                        color="positive"
                        icon="done"
                        @click="() => deleteNote(note)"
                      />
                      <q-btn round dense color="negative" icon="close" />
                    </q-popup-proxy>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </XDialog>
</template>

<script lang="ts" setup>
import XDialog from '@/components/dialog/BasicDialog.vue';
import useNote from '@/composition/use-note';
import { useStore } from '@/store';
import { computed, reactive } from 'vue';

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

const notes = reactive(store.state.settings.notes);

const { openNote, deleteNote } = useNote();
</script>

<style scoped lang="scss">
.x-note-open-mark {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 6px;
  height: 6px;
  background-color: inherit;
  filter: brightness(60%);
}
</style>
