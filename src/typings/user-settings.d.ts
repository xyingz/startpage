declare interface UserSettings {
  /**
   * 是否保存默认搜索引擎
   */
  isSaveDefaultSearchEngine: boolean;

  /**
   * 默认工具图标圆角
   */
  toolRadius: number;

  /**
   * 默认使用聚焦模式
   */
  isDefaultFocusMode: boolean;

  /**
   * 是否显示信息面板
   */
  isShowInfoPanel: boolean;

  /**
   * 背景图片最小模糊值
   */
  minBlur: number;

  /**
   * 背景图片最大模糊值
   */
  maxBlur: number;
}
