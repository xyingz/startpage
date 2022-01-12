<template>
  <div class="column items-center" @click.stop>
    <q-input
      ref="inputBar"
      v-model="searchText"
      dark
      dense
      standout
      rounded
      class="q-ml-md search-bar"
      bg-color="white"
      :placeholder="placeholderText"
      aria-placeholder="搜索框"
      @keypress.enter="onSearch"
      @focusin="onFocus"
    >
      <template #append>
        <q-btn flat rounded icon="search" color="primary" @click="onSearch" />
      </template>
    </q-input>

    <q-slide-transition>
      <q-btn-toggle
        v-if="!store.state.isShowToolBox"
        v-model="activedEngineName"
        toggle-color="primary"
        :glossy="store.state.focusMode"
        rounded
        :options="engines"
        @update:model-value="value => onSelectEngine(value)"
      />
    </q-slide-transition>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import { SET_FOCUS_MODE } from '@/store/mutation-types';
import { useStore } from '@/store/index';
</script>

<script lang="ts" setup>
const store = useStore();

const engines = store.state.searchEngines.map(engine => ({
  value: engine.name,
  icon: `img:${import.meta.env.PROD ? '' : './src'}/assets/icons/${
    engine.icon
  }.svg`,
  url: engine.url,
  slot: engine.name,
  comment: engine.comment
}));

const activedEngineName = ref(engines[0]?.value);

function getActiveEngine() {
  return engines.find(eng => eng.value === activedEngineName.value);
}

function onSelectEngine(engine: any) {
  activedEngineName.value = engine;
  inputBar.value?.focus();
}

const placeholderText = computed(() => {
  const engine = getActiveEngine();
  return `使用 ${engine?.comment} 搜索` || '开始搜索';
});

const searchText = ref('');
function onSearch() {
  if (!searchText.value) {
    inputBar.value?.focus();
    return;
  }

  const engine = getActiveEngine();
  if (engine) {
    window.open(engine.url + searchText.value);
    searchText.value = '';
  }
}

const inputBar = ref<HTMLInputElement>();
onMounted(() => {
  inputBar.value?.focus();
});

function onFocus() {
  document.body.classList.add('global-search-active');
  store.dispatch(SET_FOCUS_MODE, true);
}
</script>

<style scoped lang="scss">
.search-bar {
  width: 50%;
  min-width: 300px;
  margin-bottom: 0.5rem;
}
</style>
