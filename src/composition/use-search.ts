import { iconUrl } from '@/api/url';
import {
  saveDefaultSearchEngineIdx,
  saveSearchRecord
} from '@/config/set-data';
import { useStore } from '@/store';
import { CONTROLLERS, SETTINGS } from '@/store/mutation-types';
import { computed, ref, watch } from 'vue';

export default (focusHandle?: () => void) => {
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
    let engine = engines.value.find(
      eng => eng.value === activedEngineName.value
    );

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
    if (focusHandle) focusHandle();
  }

  /**
   * 切换搜索引擎
   * @param engine 搜索引擎
   */
  function onSelectEngine(engine: any) {
    activedEngineName.value = engine;
    if (focusHandle) focusHandle();

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

  /**
   * 搜索文本
   */
  const searchText = ref('');
  /**
   * 原始文本（建议时使用）
   */
  const originText = ref('');

  function setTyping(val: any) {
    originText.value = val;
  }

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
          originText.value = '';
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
      if (focusHandle) focusHandle();
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

  return {
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
  };
};
