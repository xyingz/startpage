<template>
  <div class="column items-center" @click.stop>
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
        @dblclick="onOpenOfficial"
      />
    </q-slide-transition>

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
      <!-- 如果有其他搜索url，提供选择 -->
      <template
        v-if="activeEngine?.searchs?.length && activeEngine.searchs.length > 1"
        #prepend
      >
        <q-btn-dropdown
          flat
          rounded
          color="black"
          dense
          :label="searchType"
          @click.prevent.stop
        >
          <q-list dense>
            <template
              v-for="(search, index) in activeEngine?.searchs"
              :key="index"
            >
              <q-item
                v-close-popup
                clickable
                @click="() => onChangeSearchType(search)"
              >
                <q-item-section>
                  <q-item-label>{{ search.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-btn-dropdown>
      </template>

      <template #append>
        <q-btn flat rounded icon="search" color="primary" @click="onSearch" />
      </template>

      <q-menu v-model="showSearchRecord" no-focus fit dark>
        <q-list dense>
          <q-item
            v-for="(suggestion, index) in searchSuggestion"
            :key="`${suggestion}-${index}`"
            v-close-popup
            class="x-search-record"
            clickable
            @click="() => onClickRecord(suggestion)"
          >
            <q-item-section>
              <q-item-label>{{ suggestion }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="searchSuggestion.length && searchRecord?.length">
            <q-item-section>
              <q-separator />
            </q-item-section>
          </q-item>

          <q-item
            v-for="(record, index) in searchRecord"
            :key="`${record}-${index}`"
            v-close-popup
            class="x-search-record"
            clickable
            @click="() => onClickRecord(record)"
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
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { CONTROLLERS, SETTINGS } from '@/store/mutation-types';
import { useStore } from '@/store/index';
import { iconUrl, suggestionUrl } from '@/api/url';
import {
  saveDefaultSearchEngineIdx,
  saveSearchRecord
} from '@/config/set-data';
import { get } from '@/utils/http/requests';
</script>

<script lang="ts" setup>
const store = useStore();

const engines = computed(() =>
  store.state.settings.searchEngines.map(engine => ({
    value: engine.name,
    icon: engine.icon
      ? `img:${import.meta.env.PROD ? '' : './src'}/assets/icons/${
          engine.icon
        }.svg`
      : `img:${iconUrl}?url=${engine.website}`,
    slot: engine.name,
    comment: engine.comment,
    website: engine.website,
    searchs: engine.searchs
  }))
);

/**
 * 当前搜索引擎名称。用于切换按钮
 */
const activedEngineName = ref(
  engines.value[store.getters[CONTROLLERS.GET_SEARCH_ENGINE_INDEX]]?.value
);
/**
 * 当前搜索引擎，所有关于搜索引擎的内容都从这里获取
 */
const activeEngine = computed(() => {
  let engine = engines.value.find(eng => eng.value === activedEngineName.value);

  // 如果重新设置了搜索引擎，可能会出现索引找不到的情况，则用默认的0即可，并且重置索引
  if (!engine) {
    engine = engines.value?.[0];
    saveDefaultSearchEngineIdx(0);
  }
  return engine;
});
// 写在 computed 中有副作用，通过 watch 来更新
watch(
  () => activeEngine.value,
  val => {
    activedEngineName.value = val.value;
  }
);

/**
 * 当前搜索引擎的搜索类型，默认第一个
 */
const searchType = ref(activeEngine.value?.searchs?.[0].name ?? '网页');
function onChangeSearchType(url: {
  url: string;
  name: string;
  params?: string;
}) {
  searchType.value = url.name;
  inputBarRef.value?.focus();
}

/**
 * 切换搜索引擎
 * @param engine 搜索引擎
 */
function onSelectEngine(engine: any) {
  activedEngineName.value = engine;
  inputBarRef.value?.focus();

  // 保存搜索引擎
  saveDefaultSearchEngineIdx(
    engines.value.findIndex(eng => eng.value === engine)
  );

  // 切换搜索引擎后，重新检查一下搜索 type
  if (
    !activeEngine.value?.searchs?.find(
      search => search.name === searchType.value
    )
  ) {
    searchType.value = activeEngine.value?.searchs?.[0].name ?? '网页';
  }
}

/**
 * 跳转到官方页面
 */
function onOpenOfficial() {
  window.open(activeEngine.value?.website);
}

const placeholderText = computed(() => {
  return `使用 ${activeEngine.value?.comment} 搜索` || '开始搜索';
});

/**
 * 搜索文本
 */
const searchText = ref('');

/**
 * 搜索标准动作。所有搜索动作最后都调用这个方法实施搜索
 */
function handleSearch() {
  if (activeEngine.value?.searchs) {
    // 获取搜索链接
    const index = activeEngine.value.searchs.findIndex(
      search => search.name === searchType.value
    );
    let search = activeEngine.value.searchs[0];
    if (index !== -1) {
      search = activeEngine.value.searchs[index];
    }

    if (search) {
      window.open(search.url + searchText.value + (search.params ?? ''));

      if (!store.state.settings.userSettings.isSaveInput) {
        searchText.value = '';
      }
    }
  }
}

/**
 * 常规搜索事件。通过按钮或键盘触发的事件
 */
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

  handleSearch();
}

/**
 * 搜索记录事件。点击或选择搜索记录触发的事件
 * @param record 搜索记录
 */
function onClickRecord(record: string) {
  searchText.value = record;

  // 保存搜索记录
  if (store.state.settings.userSettings.isSaveSearchRecord) {
    store
      .dispatch(SETTINGS.SET_SEARCH_RECORD, searchText.value)
      .then(saveSearchRecord);
  }

  handleSearch();
}

/**
 * Element 相关
 */
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

// 实时搜索记录。只显示10条
const privateRecord = ref(store.state.settings.searchRecord);
const searchRecord = computed({
  get: () =>
    store.state.settings.searchRecord
      ?.filter(
        record => !searchText.value || record.indexOf(searchText.value) !== -1
      )
      .slice(0, 10),
  set: val => {
    privateRecord.value = val?.slice(0, 10);
  }
});
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

// 实时搜索建议
const searchSuggestion = ref<string[]>([]);

// 监听输入变化
watch(
  () => searchText.value,
  val => {
    searchRecord.value = store.state.settings.searchRecord?.filter(
      record => record.indexOf(val) !== -1
    );

    // 获取建议
    get<any>(`${suggestionUrl}${val}`).then(res => {
      if (res[1]) {
        searchSuggestion.value = res[1].suggests;
      }
    });

    // 没有字符时隐藏搜索记录
    if (
      (searchSuggestion.value || searchRecord.value?.length) &&
      searchText.value.length
    ) {
      showSearchRecord.value = true;
    } else {
      showSearchRecord.value = false;
    }
  }
);

function onDeleteRecord(record: string) {
  store.dispatch(SETTINGS.DELETE_SEARCH_RECORD, record).then(saveSearchRecord);
  inputBarRef.value?.focus();
  if (searchSuggestion.value || searchRecord.value?.length)
    showSearchRecord.value = true;
}

function onClear() {
  store.dispatch(SETTINGS.CLEAR_SEAECH_RECORD).then(saveSearchRecord);
  inputBarRef.value?.focus();
  if (searchSuggestion.value) showSearchRecord.value = true;
}

// 按下键，显示搜索 建议 / 记录。如果已经显示，则可以上下选择内容
const selectedRecordItem = ref(-1);
const selectedDirection = ref<'up' | 'down'>('down');

watch(
  () => showSearchRecord.value,
  value => {
    if (!value) {
      selectedRecordItem.value = -1;
    } else if (!searchText.value) searchSuggestion.value = [];
  }
);

// 按键下，选择搜索 建议 / 记录
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

// 按键上，选择搜索 建议 / 记录
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
/*  4、输入了搜索内容，没有选择搜索建议/记录，直接搜索输入内容
/*  5、输入了搜索内容，选择了搜索建议/记录，选择后按下回车搜索选择的内容
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

    // 有输入内容是包含建议和记录的，所以先合并这两个内容列表
    const selectList = [
      ...searchSuggestion.value,
      ...(searchRecord.value ?? [])
    ];
    // 因为往下选择是后加，所以要 -1
    if (selectedDirection.value === 'down') {
      if (selectedRecordItem.value === 0) {
        index = (selectList.length ?? 0) - 1;
      } else {
        index -= 1;
      }
    }
    searchText.value = selectList[index] ?? '';
    onSearch();
  }
}
</script>

<style lang="scss">
.x-search-bar {
  width: 50%;
  min-width: 300px;
  margin-top: 0.5rem;
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
