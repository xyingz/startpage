<template>
  <div class="column items-center" @click.stop>
    <q-input
      ref="inputBar"
      v-model="searchText"
      dark
      dense
      standout
      rounded
      class="search-bar"
      bg-color="white"
      :placeholder="placeholderText"
      aria-placeholder="搜索框"
      @keypress.enter="() => onSearch()"
      @focusin="onFocus"
    >
      <template #append>
        <q-btn
          flat
          rounded
          icon="search"
          color="primary"
          @click="() => onSearch()"
        />
      </template>

      <q-menu ref="searchRecordPopup" no-focus fit dark>
        <q-list dense>
          <q-item
            v-for="(record, index) in searchRecord"
            :key="`${record}-${index}`"
            v-close-popup
            clickable
            @click="() => onSearchRecord(record)"
          >
            <q-item-section>{{ record }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-input>

    <q-slide-transition>
      <q-btn-toggle
        v-if="!store.state.controllers.isShowToolBox"
        v-model="activedEngineName"
        class="search-bar-engine-toggle-wrap"
        toggle-color="primary"
        :glossy="store.state.controllers.focusMode"
        rounded
        :options="engines"
        @update:model-value="value => onSelectEngine(value)"
      />
    </q-slide-transition>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { CONTROLLERS, SETTINGS } from '@/store/mutation-types';
import { useStore } from '@/store/index';
import {
  saveDefaultSearchEngineIdx,
  saveSearchRecord
} from '@/config/set-data';
</script>

<script lang="ts" setup>
const store = useStore();

const engines = store.state.settings.searchEngines.map(engine => ({
  value: engine.name,
  icon: `img:${import.meta.env.PROD ? '' : './src'}/assets/icons/${
    engine.icon
  }.svg`,
  url: engine.url,
  slot: engine.name,
  comment: engine.comment
}));

const activedEngineName = ref(
  engines[store.getters[CONTROLLERS.GET_SEARCH_ENGINE_INDEX]]?.value
);
const activeEngine = computed(() =>
  engines.find(eng => eng.value === activedEngineName.value)
);

function onSelectEngine(engine: any) {
  activedEngineName.value = engine;
  inputBar.value?.focus();

  // 保存搜索引擎
  saveDefaultSearchEngineIdx(engines.findIndex(eng => eng.value === engine));
}

const placeholderText = computed(() => {
  return `使用 ${activeEngine.value?.comment} 搜索` || '开始搜索';
});

const searchText = ref('');
function onSearch(isRecord: boolean = true) {
  if (!searchText.value) {
    inputBar.value?.focus();
    return;
  }

  // 保存搜索记录
  if (isRecord && store.state.settings.userSettings.isSaveSearchRecord) {
    store
      .dispatch(SETTINGS.SET_SEARCH_RECORD, searchText.value)
      .then(saveSearchRecord);
  }

  if (activeEngine.value) {
    window.open(activeEngine.value.url + searchText.value);
    searchText.value = '';
  }
}

function onSearchRecord(record: string) {
  searchText.value = record;
  onSearch(false);
}

const inputBar = ref<HTMLInputElement>();
const searchRecordPopup = ref();
onMounted(() => {
  if (store.state.controllers.focusMode) inputBar.value?.focus();
});

function onFocus() {
  if (!searchText.value) {
    searchRecordPopup.value?.hide();
  }

  store.dispatch(CONTROLLERS.SET_FOCUS_MODE, true);
}

watch(
  () => store.state.controllers.focusMode,
  val => {
    if (val) {
      inputBar.value?.focus();
    }
  }
);

// 实时搜索记录
const searchRecord = ref(store.state.settings.searchRecord);
watch(
  () => searchText.value,
  val => {
    searchRecord.value = store.state.settings.searchRecord?.filter(
      record => record.indexOf(val) !== -1
    );
    searchRecordPopup.value.show();
  }
);
</script>

<style lang="scss">
.search-bar {
  width: 50%;
  min-width: 300px;
  margin-bottom: 0.5rem;
}

.search-bar-engine-toggle-wrap {
  // 为了解决 QQ浏览器 图标大小异常的问题
  img {
    width: 24px;
    height: 24px;
  }
}
</style>
