declare interface ControllersState {
  focusMode: boolean;
  isShowToolBox: boolean;
  removeToolState: boolean;

  /**
   * 默认搜索引擎索引
   */
  defaultEngineIdx: number;

  backgroundImage?: BackgroundImage;

  isFirstVisit: boolean;

  /**
   * 是否显示添加工具对话框
   */
  showAddToolDialog: boolean;

  /**
   * 是否显示自定义工具对话框
   */
  showAddCustomToolDialog: boolean;

  /**
   * 是否显示设置对话框
   */
  showSettingDialog: boolean;
}
