<template>
  <q-dialog v-model="show" transition-show="scale" transition-hide="scale">
    <q-card>
      <q-card-section class="bg-primary q-pa-none">
        <q-toolbar>
          <q-toolbar-title class="text-center text-bold">
            管理搜索引擎
          </q-toolbar-title>
          <q-btn v-close-popup flat round dense icon="close" />
        </q-toolbar>
      </q-card-section>

      <q-card-section>
        <div class="text-caption text-grey">
          修改搜索引擎可能会重置您的默认选择
          <br />
          最少需要 1 个，最多可以添加
          {{ GlobalConfig.searchEngineMaxLength }} 个
        </div>
        <q-list bordered>
          <template v-for="search in searchList" :key="search.name">
            <q-item tag="label" @click.prevent>
              <q-item-section avatar>
                <q-icon :name="iconPath(search)" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ search.comment }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  v-if="!checkAdded(search)"
                  flat
                  size="sm"
                  color="primary"
                  label="添加"
                  @click="setSearchs(search, true)"
                />
                <div v-else>
                  <span>已添加</span>
                  <q-btn
                    flat
                    round
                    icon="delete"
                    size="sm"
                    @click="setSearchs(search, false)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useStore } from '@/store';
import { CONTROLLERS, SETTINGS } from '@/store/mutation-types';
import { useQuasar } from 'quasar';
import GlobalConfig from '@/config/global';
import { iconUrl } from '@/api/url';
import { saveSearchEngineList } from '@/config/set-data';

const store = useStore();

const show = computed<boolean>({
  get() {
    return store.state.controllers.showManageSearchDialog;
  },
  set(value) {
    store.dispatch(CONTROLLERS.SET_MANAGE_SEARCH_DIALOG_VISIBLE, value);
  }
});

function iconPath(search: SearchEngine) {
  if (!search.icon) return `img:${iconUrl}?url=${search.website}`;
  return `img:${import.meta.env.PROD ? '' : './src'}/assets/icons/${
    search.icon
  }.svg`;
}

/**
 * 检查是否已经添加到页面
 */
function checkAdded(search: SearchEngine) {
  return store.state.settings.searchEngines.find(t => t.name === search.name);
}

const searchList = ref<SearchEngine[]>([]);
watch(
  () => show.value,
  value => {
    if (value) {
      fetch('/searchs.json')
        .then(res => res.json())
        .then(data => {
          searchList.value = data;
        });
    }
  }
);

const $q = useQuasar();
function setSearchs(search: SearchEngine, isAppend: boolean) {
  const existsName = store.state.settings.searchEngines.map(t => t.name);
  if (isAppend) existsName.push(search.name);
  else existsName.splice(existsName.indexOf(search.name), 1);

  const searchs = searchList.value.filter(t => existsName.includes(t.name));

  if (searchs.length === 0) {
    $q.notify({
      color: 'negative',
      message: '至少需要一个搜索引擎',
      position: 'center'
    });
    return;
  }

  if (searchs.length > GlobalConfig.searchEngineMaxLength) {
    $q.notify({
      color: 'warning',
      message: `最多只能添加${GlobalConfig.searchEngineMaxLength}个搜索引擎`,
      position: 'center'
    });
    return;
  }

  store.dispatch(SETTINGS.SET_SEARCH_ENGINE_LIST, searchs);
  saveSearchEngineList(searchs);
}
</script>

<style scoped></style>
