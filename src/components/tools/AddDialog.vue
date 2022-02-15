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
                      <q-item-section
                        v-if="$q.screen.gt.xs"
                        avatar
                        style="width: 2rem; height: 2rem"
                      >
                        <q-img
                          :src="`${iconUrl}?url=${tool.url}`"
                          :alt="tool.name"
                          ratio="1"
                          width="100%"
                          height="100%"
                          fit="contain"
                        >
                          <template #error>
                            <q-icon
                              name="public"
                              size="2rem"
                              :class="{ 'error-btn-icon': $q.screen.gt.xs }"
                            />
                          </template>
                        </q-img>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label class="ellipsis">
                          {{ tool.name }}
                        </q-item-label>

                        <q-item-label caption class="ellipsis-2-lines">
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

    <AddCustomDialog />
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useStore } from '@/store';
import { CONTROLLERS, SETTINGS } from '@/store/mutation-types';
import { iconUrl } from '@/api/url';
import AddCustomDialog from './AddCustomDialog.vue';

const store = useStore();

const show = computed<boolean>({
  get() {
    return store.state.controllers.showAddToolDialog;
  },
  set(value) {
    store.dispatch(CONTROLLERS.SET_ADD_TOOL_DIALOG_VISIBLE, value);
  }
});

function showCustomDialog() {
  store.dispatch(CONTROLLERS.SET_ADD_CUSTOM_TOOL_DIALOG_VISIBLE, true);
}

function checkAdded(tool: Tool) {
  return store.state.settings.tools.find(t => t.id === tool.id);
}

const toolList = ref<{ [key: string]: Tool[] }>({});
const labels = ref<string[]>();
const tab = ref<string>();
watch(
  () => show.value,
  value => {
    if (value) {
      fetch('/tools.json')
        .then(res => res.json())
        .then(data => {
          toolList.value = data;
          labels.value = Object.keys(data);
          tab.value = labels.value?.[0];
        });
    }
  }
);

function addTool(tool: Tool) {
  store.dispatch(SETTINGS.ADD_TOOL, tool);
}

function removeTool(tool: Tool) {
  store.dispatch(SETTINGS.REMOVE_TOOL, tool);
}
</script>

<style scoped></style>
