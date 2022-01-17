declare interface SettingsState {
  /**
   * 工具箱集合。最多容纳24个工具图标
   */
  tools: Array<Tool>;

  /**
   * 搜索引擎集合
   */
  searchEngines: Array<SearchEngine>;

  /**
   * 用户设置项
   */
  userSettings: {
    isSaveDefaultSearchEngine: boolean;
    toolRadius: number;
    isDefaultFocusMode: boolean;
    isShowInfoPanel: boolean;
  };
}
