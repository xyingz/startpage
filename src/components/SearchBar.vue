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
      placeholder="开始搜索"
      aria-placeholder="开始搜索"
      @keypress.enter="onSearch"
      @focusin="onFocus"
    >
      <template #append>
        <q-btn flat rounded icon="search" color="primary" @click="onSearch" />
      </template>
    </q-input>

    <transition name="shrink">
      <q-btn-toggle
        v-if="!store.state.isShowToolBox"
        v-model="activedEngineName"
        toggle-color="primary"
        :glossy="store.state.focusMode"
        rounded
        :options="engines"
        @update:model-value="value => onSelectEngine(value)"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { SET_FOCUS_MODE } from '@/store/mutation-types';
import { useStore } from '@/store/index';
</script>

<script lang="ts" setup>
const store = useStore();

const engines = store.state.searchEngines.map(engine => ({
  value: engine.name,
  icon: `img:./src/assets/icons/${engine.icon}.svg`,
  url: engine.url
}));

const activedEngineName = ref(engines[0]?.value);

function onSelectEngine(engine: any) {
  activedEngineName.value = engine;
  inputBar.value?.focus();
}

const searchText = ref('');
function onSearch() {
  if (!searchText.value) {
    inputBar.value?.focus();
    return;
  }

  const engine = engines.find(
    engine => engine.value === activedEngineName.value
  );

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
  store.commit(SET_FOCUS_MODE, true);
}
</script>

<style scoped lang="scss">
.search-bar {
  width: 50%;
  min-width: 400px;
  margin-bottom: 0.5rem;
}
</style>
