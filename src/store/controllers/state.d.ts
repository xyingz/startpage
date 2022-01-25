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
}
