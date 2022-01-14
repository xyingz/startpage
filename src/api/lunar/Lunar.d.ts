declare interface Lunar {
  date: string;

  /**
   * 属相
   */
  zodiac: string;

  ganzhi_year: string;
  ganzhi_month: string;
  ganzhi_day: string;
  lunar_year: string;

  /**
   * 阴历月，1-13，出现闰月，依次向后顺延
   */
  lunar_month: string;
  lunar_day: string;
  lunar_month_name: string;
  lunar_day_name: string;

  /**
   * 闰月，0表示无
   */
  lunar_leap_month: string;
  lunar_festival: string;
  solar_term: string;
}
