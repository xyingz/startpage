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
  userSettings: UserSettings;

  /**
   * 用户设置了背景图片
   */
  todayBgImageInfo?: TodayBgImageInfo;

  /**
   * 搜索历史记录
   */
  searchRecord?: Array<string>;

  /**
   * 用户便签记录
   */
  notes?: Array<Note>;
}
