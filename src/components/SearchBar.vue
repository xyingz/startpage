<template>
  <div class="search-section">
    <div style="position: relative; width: 100%">
      <input
        ref="inputBar"
        v-model="searchText"
        type="text"
        placeholder="开始搜索"
        aria-placeholder="开始搜索"
        @keypress.enter="onSearch"
        @focusin="onFocus"
        @focusout="onFocusOut"
      />

      <button class="search-btn" @click="onSearch">
        <i class="icon icon-search" style="font-size: 1rem" />
      </button>
    </div>

    <div class="search-engine-group">
      <div
        v-for="engine in searchEngines"
        :key="engine.name"
        class="icon search-engine"
        :class="{
          [`icon-${engine.icon}`]: true,
          active: activedEngine.name === engine.name
        }"
        @click="onSelectEngine(engine)"
      />
    </div>

    <div class="search-comment">{{ activedEngine.comment }}</div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from 'vue';

interface SearchEngine {
  name: string;
  icon: string;
  url: string;
  comment: string;
}
</script>

<script lang="ts" setup>
const searchEngines = reactive<Array<SearchEngine>>([
  {
    name: 'baidu',
    url: 'https://www.baidu.com/s?wd=',
    icon: 'baidu',
    comment: '百度'
  },
  {
    name: 'bing',
    url: 'https://www.bing.com/search?q=',
    icon: 'bing',
    comment: '必应'
  },
  {
    name: 'google',
    url: 'https://www.google.com/search?q=',
    icon: 'google',
    comment: '谷歌（需要梯子）'
  }
]);

const activedEngine = ref<SearchEngine>(searchEngines[0]);
function onSelectEngine(engine: SearchEngine) {
  activedEngine.value = engine;
}

const searchText = ref('');
function onSearch() {
  if (!searchText.value) {
    return;
  }

  window.open(activedEngine.value?.url + searchText.value);
  searchText.value = '';
}

const inputBar = ref<HTMLInputElement>();
onMounted(() => {
  inputBar.value?.focus();
});

function onFocus() {
  document.body.classList.add('global-search-active');
}

function onFocusOut() {
  document.body.classList.remove('global-search-active');
}
</script>

<style scoped lang="scss">
.search-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
}

input {
  width: 50%;
  height: 3rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  transition: all 0.2s;
  padding: 0 3.5rem 0 0.5rem;
  font-size: 1.5rem;

  &:focus {
    outline: none;
  }
}

.search-btn {
  position: absolute;
  right: calc(25% - 2rem);
  width: 3rem;
  height: 100%;
  border-radius: 0.5rem;
  border: 0px;
  transition: all 0.2s;
  cursor: pointer;
  display: inline-block;
  padding: 0;

  &:hover {
    background: #ccc;
  }

  &:active {
    background: #bbb;
  }

  &:focus {
    outline: none;
  }
}

@media screen and (max-width: 768px) {
  input {
    width: 70%;
    height: 2rem;
    padding: 0 2.5rem 0 0.5rem;
    font-size: 1rem;
  }

  .search-btn {
    width: 2rem;
    right: calc(15% - 1.5rem);
  }
}

.search-engine-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 2rem;

  .search-engine {
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.2rem 0.8rem;
    border-radius: 1rem;
    transition: all 0.2s;

    &:hover {
      background: #eee;
      font-size: 2rem;
    }
  }

  .active {
    background: #eee;
    font-size: 2rem;
  }
}

.search-comment {
  font-size: 0.8rem;
  color: #666;
}
</style>
