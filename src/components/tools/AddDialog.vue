<template>
  <q-dialog v-model="show" transition-show="scale" transition-hide="scale">
    <q-card class="fit">
      <q-card-section class="bg-primary q-pa-none">
        <q-toolbar>
          <q-btn
            flat
            round
            dense
            icon="add"
            class="q-mr-sm"
            @click="showCustomDialog"
          />
          <q-toolbar-title class="text-center text-bold">
            添加导航工具
          </q-toolbar-title>
          <q-btn v-close-popup flat round dense icon="close" />
        </q-toolbar>
      </q-card-section>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section class="col-3 q-pa-none">
          <q-tabs
            v-model="tab"
            vertical
            active-color="primary"
            indicator-color="primary"
          >
            <template v-for="label in labels" :key="label">
              <q-tab :name="label" :label="label" />
            </template>
          </q-tabs>
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="fit">
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <template v-for="label in labels" :key="label">
              <q-tab-panel :name="label" class="q-pa-none">
                <template v-for="tool in toolList[label]" :key="tool.id">
                  <q-list bordered separator>
                    <q-item v-ripple clickable>
                      <q-item-section>
                        <q-item-label>{{ tool.name }}</q-item-label>
                        <q-item-label caption>
                          {{ tool.comment || '无描述' }}
                        </q-item-label>
                      </q-item-section>

                      <q-item-section side>
                        <q-btn
                          v-if="!checkAdded(tool)"
                          flat
                          size="sm"
                          color="primary"
                          label="添加"
                          @click="addTool(tool)"
                        />
                        <div v-else>
                          <span>已添加</span>
                          <q-btn
                            flat
                            round
                            icon="delete"
                            size="sm"
                            @click="removeTool(tool)"
                          />
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </template>
              </q-tab-panel>
            </template>
          </q-tab-panels>
        </q-card-section>
      </q-card-section>
    </q-card>

    <AddCustomDialog v-model="isShowCustomDialog" />
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from '@/store';
import { SETTINGS } from '@/store/mutation-types';
import AddCustomDialog from './AddCustomDialog.vue';

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

const isShowCustomDialog = ref(false);
function showCustomDialog() {
  isShowCustomDialog.value = true;
}

const store = useStore();
function checkAdded(tool: Tool) {
  return store.state.settings.tools.find(t => t.id === tool.id);
}

const toolList = ref<{ [key: string]: Tool[] }>({});
const labels = ref<string[]>();
const tab = ref<string>();
fetch('/tools.json')
  .then(res => res.json())
  .then(data => {
    toolList.value = data;
    labels.value = Object.keys(data);
    tab.value = labels.value?.[0];
  });

function addTool(tool: Tool) {
  store.dispatch(SETTINGS.ADD_TOOL, tool);
}

function removeTool(tool: Tool) {
  store.dispatch(SETTINGS.REMOVE_TOOL, tool);
}
</script>

<style scoped></style>
