declare interface ControllersState {
  focusMode: boolean;
  isShowToolBox: boolean;
  removeToolState: boolean;

  /**
   * 默认搜索引擎索引
   */
  defaultEngineIdx: number;

  backgroundImage?: BackgroundImage;

  /**
   * 是否显示新手教程导航
   */
  showBeginnerTour: boolean;

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

  /**
   * 是否显示管理搜索引擎对话框
   */
  showManageSearchDialog: boolean;

  /**
   * 当前选中的便签ID
   */
  selectedNoteId?: string;
}
