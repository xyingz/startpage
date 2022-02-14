<template>
  <div class="column items-center" @click.stop>
    <q-input
      ref="inputBarRef"
      v-model="searchText"
      dark
      dense
      standout
      rounded
      class="x-search-bar"
      bg-color="white"
      input-style="color: black"
      :placeholder="placeholderText"
      aria-placeholder="搜索框"
      @keypress.enter="onEnter"
      @keydown.up.exact="onKeyUp"
      @keydown.down.exact="onKeyDown"
      @focusin="onFocus"
    >
      <template #append>
        <q-btn flat rounded icon="search" color="primary" @click="onSearch" />
      </template>

      <q-menu v-model="showSearchRecord" no-focus fit dark>
        <q-list dense>
          <q-item
            v-for="(record, index) in searchRecord"
            :key="`${record}-${index}`"
            v-close-popup
            class="x-search-record"
            clickable
            @click="() => onSearchRecord(record)"
          >
            <q-item-section>
              <q-item-label>{{ record }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                flat
                dense
                round
                size="sm"
                icon="close"
                @click.stop="() => onDeleteRecord(record)"
              />
            </q-item-section>
          </q-item>

          <q-item
            v-if="searchRecord?.length"
            v-close-popup
            clickable
            @click="onClear"
          >
            <q-item-section>
              <q-item-label class="text-center">清除所有记录</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-input>

    <q-slide-transition>
      <q-btn-toggle
        v-if="!store.state.controllers.isShowToolBox"
        v-model="activedEngineName"
        class="x-search-bar-engine-toggle-wrap"
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
  inputBarRef.value?.focus();

  // 保存搜索引擎
  saveDefaultSearchEngineIdx(engines.findIndex(eng => eng.value === engine));
}

const placeholderText = computed(() => {
  return `使用 ${activeEngine.value?.comment} 搜索` || '开始搜索';
});

const searchText = ref('');
function onSearch() {
  searchText.value = searchText.value.trim();

  if (!searchText.value) {
    inputBarRef.value?.focus();
    return;
  }

  // 保存搜索记录
  if (store.state.settings.userSettings.isSaveSearchRecord) {
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

  if (activeEngine.value) {
    window.open(activeEngine.value.url + searchText.value);
    searchText.value = '';
  }
}

const inputBarRef = ref();
const showSearchRecord = ref(false);
onMounted(() => {
  if (store.state.controllers.focusMode) inputBarRef.value?.focus();
});

function onFocus() {
  if (!searchText.value) {
    showSearchRecord.value = false;
  }

  store.dispatch(CONTROLLERS.SET_FOCUS_MODE, true);
}

watch(
  () => store.state.controllers.focusMode,
  val => {
    if (val) {
      inputBarRef.value?.focus();
    }
  }
);

// 实时搜索记录
const searchRecord = ref(store.state.settings.searchRecord);
// 深度监听，发现变化及时更新
watch(
  () => store.state.settings.searchRecord,
  val => {
    searchRecord.value = val;
  },
  {
    deep: true
  }
);

watch(
  () => searchText.value,
  val => {
    searchRecord.value = store.state.settings.searchRecord?.filter(
      record => record.indexOf(val) !== -1
    );

    // 没有字符时隐藏搜索记录
    if (searchRecord.value?.length && searchText.value.length) {
      showSearchRecord.value = true;
    } else {
      showSearchRecord.value = false;
    }
  }
);

function onDeleteRecord(record: string) {
  store.dispatch(SETTINGS.DELETE_SEARCH_RECORD, record).then(saveSearchRecord);
}

function onClear() {
  store.dispatch(SETTINGS.CLEAR_SEAECH_RECORD).then(saveSearchRecord);
}

// 按下键，显示搜索记录。如果已经显示，则可以上下选择内容
const selectedRecordItem = ref(-1);
const selectedDirection = ref<'up' | 'down'>('down');

watch(
  () => showSearchRecord.value,
  value => {
    if (!value) {
      selectedRecordItem.value = -1;
    }
  }
);

// 按键下，选择搜索记录
function onKeyDown() {
  if (!showSearchRecord.value) {
    showSearchRecord.value = true;
  }

  const eleList = document.querySelectorAll('.x-search-record');
  if (!eleList.length) return;

  eleList.forEach(ele => {
    ele.classList.remove('x-search-record-active');
  });

  if (selectedRecordItem.value === -1) {
    selectedRecordItem.value = 0;
    selectedDirection.value = 'down';
  }

  if (selectedDirection.value !== 'down') {
    selectedDirection.value = 'down';
    selectedRecordItem.value += 1;
    if (selectedRecordItem.value > eleList.length - 1) {
      selectedRecordItem.value = 0;
    }
  }

  eleList[selectedRecordItem.value].classList.add('x-search-record-active');

  if (selectedRecordItem.value >= eleList.length - 1) {
    selectedRecordItem.value = 0;
  } else {
    selectedRecordItem.value += 1;
  }
}

// 按键上，选择搜索记录
function onKeyUp() {
  if (!showSearchRecord.value) return;

  const eleList = document.querySelectorAll('.x-search-record');
  if (!eleList.length) return;

  eleList.forEach(ele => {
    ele.classList.remove('x-search-record-active');
  });

  if (selectedRecordItem.value === -1) {
    selectedRecordItem.value = 0;
    selectedDirection.value = 'up';
  }

  if (selectedDirection.value !== 'up') {
    selectedDirection.value = 'up';
    selectedRecordItem.value -= 1;
    if (selectedRecordItem.value < 0) {
      selectedRecordItem.value = eleList.length - 1;
    }
  }

  if (selectedRecordItem.value <= 0) {
    selectedRecordItem.value = eleList.length - 1;
  } else {
    selectedRecordItem.value -= 1;
  }

  eleList[selectedRecordItem.value].classList.add('x-search-record-active');
}

/** 按下回车键，这个情况有点复杂
/*  1、没有输入搜索内容，搜索记录关闭，因为是空值，直接返回
/*  2、没有输入搜索内容，搜索记录打开，没有选择任何内容，直接返回
/*  3、没有输入搜索内容，搜索记录打开，选择了搜索记录，直接搜索选择内容
/*  4、输入了搜索内容，搜索记录关闭，直接搜索输入内容
/*  5、输入了搜索内容，搜索记录打开，这时候是把对应的搜索记录内容填充到输入框中，关闭搜索记录框。此时如果再次按下回车键，则会搜索输入内容
 */
function onEnter() {
  if (!searchText.value.trim()) {
    if (!showSearchRecord.value || selectedRecordItem.value === -1) return;

    // 搜索选择的内容
    let index = selectedRecordItem.value;
    // 因为往下选择是后加，所以要 -1
    if (selectedDirection.value === 'down') {
      if (selectedRecordItem.value === 0) {
        index = (searchRecord.value?.length ?? 0) - 1;
      } else {
        index -= 1;
      }
    }
    searchText.value = searchRecord.value?.[index] ?? '';
    onSearch();
  } else if (!showSearchRecord.value) {
    onSearch();
  } else {
    // 搜索选择的内容
    let index = selectedRecordItem.value;
    // 因为往下选择是后加，所以要 -1
    if (selectedDirection.value === 'down') {
      if (selectedRecordItem.value === 0) {
        index = (searchRecord.value?.length ?? 0) - 1;
      } else {
        index -= 1;
      }
    }
    searchText.value = searchRecord.value?.[index] ?? '';
  }
}
</script>

<style lang="scss">
.x-search-bar {
  width: 50%;
  min-width: 300px;
  margin-bottom: 0.5rem;
}

.x-search-bar-engine-toggle-wrap {
  // 为了解决 QQ浏览器 图标大小异常的问题
  img {
    width: 24px;
    height: 24px;
  }
}

.x-search-record-active {
  background-color: #3d3d3d;
}
</style>
