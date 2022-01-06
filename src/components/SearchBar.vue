<template>
  <div class="search-section">
    <div style="position: relative; width: 100%">
      <input
        ref="inputBar"
        v-model="searchText"
        :class="{ shadow: store.state.focusMode }"
        type="text"
        placeholder="开始搜索"
        aria-placeholder="开始搜索"
        @keypress.enter="onSearch"
        @focusin="onFocus"
        @focusout="onFocusOut"
      />

      <ButtonComponent
        type="primary"
        icon="search"
        class="search-btn"
        radius="0.5rem"
        @click="onSearch"
      />
    </div>

    <transition name="shrink">
      <div v-if="!isTidy">
        <div class="search-engine-group">
          <template v-for="engine in searchEngines" :key="engine.name">
            <ButtonComponent
              size="large"
              class="search-engine"
              radius="2rem"
              :type="activedEngine.name === engine.name ? 'info' : 'normal'"
              :icon="engine.icon"
              @click="onSelectEngine(engine)"
            />
          </template>
        </div>

        <div class="search-comment">{{ activedEngine.comment }}</div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { SET_FOCUS_MODE } from '@/store/mutation-types';
import { useStore } from '@/store/index';
import ButtonComponent from './button/Button.vue';

interface SearchEngine {
  name: string;
  icon: string;
  url: string;
  comment: string;
}

export default defineComponent({
  components: { ButtonComponent }
});
</script>

<script lang="ts" setup>
defineProps({
  isTidy: {
    type: Boolean,
    default: false
  }
});

const store = useStore();

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
  inputBar.value?.focus();
}

const searchText = ref('');
function onSearch() {
  if (!searchText.value) {
    inputBar.value?.focus();
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
  store.commit(SET_FOCUS_MODE, true);
}

function onFocusOut() {
  document.body.classList.remove('global-search-active');
  store.commit(SET_FOCUS_MODE, false);
}
</script>

<style scoped lang="scss">
.search-section {
  display: flex;
  flex-direction: column;
  position: relative;
}

input {
  width: 50%;
  height: 3rem;
  border-radius: 0.5rem;
  border: 0px;
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
  padding: 0;
}

.search-engine-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 2rem;
  margin-top: 1rem;
}

.search-comment {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #666;
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

  .search-engine {
    width: 1rem;
    padding: 0.25rem 0.75rem;
  }

  .search-engine-group {
    height: 1rem;
  }
}
</style>
