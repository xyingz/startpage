declare interface TodayBgImageInfo {
  /**
   * 是否需要更新
   */
  needUpdate?: boolean;

  /**
   * 是否为用户自定义
   */
  isCustom?: boolean;

  /**
   * 保存的时间
   */
  savedTime: Date;

  /**
   * 当前的背景图片信息
   */
  image?: BackgroundImage;
}
