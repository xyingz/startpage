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
      @update:model-value="setTyping"
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

            <q-item-section side>
              <q-btn
                flat
                rounded
                size="sm"
                label="历史记录"
                @click.stop="onOpenSearchHistory"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-input>

    <SearchHistoryDialog v-model="showSearchHistoryDialog" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { CONTROLLERS, SETTINGS } from '@/store/mutation-types';
import { useStore } from '@/store/index';
import { suggestionUrl } from '@/api/url';
import { saveSearchRecord } from '@/config/set-data';
import { get } from '@/utils/http/requests';
import SearchHistoryDialog from '@/components/dialog/SearchHistoryDialog.vue';
import useSearch from '@/composition/use-search';
</script>

<script lang="ts" setup>
const store = useStore();

/**
 * Element 相关
 */
const inputBarRef = ref();

const {
  activeEngine,
  searchType,
  searchText,
  originText,
  onChangeSearchType,
  onSelectEngine,
  onOpenOfficial,
  onSearch,
  onClickRecord,
  setTyping,
  engines,
  activedEngineName
} = useSearch(inputBarRef.value?.focus);

const placeholderText = computed(() => {
  return `使用 ${activeEngine.value?.comment} 搜索` || '开始搜索';
});

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
        record => !originText.value || record.indexOf(originText.value) !== -1
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
  () => originText.value,
  async val => {
    searchRecord.value = store.state.settings.searchRecord?.filter(
      record => record.indexOf(val) !== -1
    );

    // 获取建议
    const res = await get<any>(`${suggestionUrl}${val}`);
    if (res[1]) {
      searchSuggestion.value = res[1].suggests;
    }

    // 没有字符时隐藏搜索记录
    if (originText.value.length) {
      if (searchSuggestion.value.length || searchRecord.value?.length) {
        showSearchRecord.value = true;
      } else {
        showSearchRecord.value = false;
      }
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

  // 将建议内容填入搜索框
  if (selectedRecordItem.value < searchSuggestion.value.length) {
    searchText.value = searchSuggestion.value[selectedRecordItem.value];
  } else {
    searchText.value = originText.value;
  }

  eleList[selectedRecordItem.value].classList.add('x-search-record-active');

  if (selectedRecordItem.value >= eleList.length - 1) {
    selectedRecordItem.value = 0;
  } else {
    selectedRecordItem.value += 1;
  }
}

// 按键上，选择搜索 建议 / 记录
function onKeyUp(e: KeyboardEvent) {
  if (!showSearchRecord.value) return;

  // 显示记录的时候，要阻止按上键光标前置的事件
  e.preventDefault();

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

  // 将建议内容填入搜索框
  if (selectedRecordItem.value < searchSuggestion.value.length) {
    searchText.value = searchSuggestion.value[selectedRecordItem.value];
  } else {
    searchText.value = originText.value;
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
  } else if (!showSearchRecord.value || selectedRecordItem.value === -1) {
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

const showSearchHistoryDialog = ref(false);
function onOpenSearchHistory() {
  showSearchHistoryDialog.value = true;
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
