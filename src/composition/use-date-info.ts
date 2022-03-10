/*
 * @Author: JeremyJone
 * @Date: 2022-03-10 10:09:37
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-03-10 13:58:54
 * @Description: 日期信息的显示钩子
 */
import { ref, computed } from 'vue';
import { Solar, Foto, Tao } from 'lunar-typescript';
import { formatDate, realInterval } from '@/utils/common';

export default () => {
  function createDate() {
    return new Date();
  }

  const date = ref(createDate());

  const dateStr = computed<string>({
    get() {
      return formatDate(date.value, 'yyyy-MM-dd HH:mm:ss');
    },
    set(value) {
      date.value = new Date(value);
    }
  });

  let interval: number | undefined;
  function startDate() {
    interval = realInterval(() => {
      date.value = createDate();
    }, 1000);
  }

  startDate();

  function stopDate() {
    clearInterval(interval);
  }

  const solar = computed(() => Solar.fromDate(new Date(date.value)));
  const lunarStr = computed(
    () =>
      `${solar.value.getLunar().getMonthInChinese()}月${solar.value
        .getLunar()
        .getDayInChinese()}`
  );
  const dateInfoStr = computed(
    () =>
      `${solar.value.getLunar().getYearInGanZhi()}(${solar.value
        .getLunar()
        .getYearShengXiao()})年 ${solar.value
        .getLunar()
        .getMonthInGanZhi()}月 ${solar.value
        .getLunar()
        .getDayInGanZhi()}日 ${solar.value.getLunar().getJieQi()} ${solar.value
        .getLunar()
        .getFestivals()
        .concat(solar.value.getLunar().getOtherFestivals())
        .join(',')} ${solar.value
        .getFestivals()
        .concat(solar.value.getOtherFestivals())
        .join(',')}`
  );

  const solarInfoStr = computed(() => solar.value.toFullString());
  const lunarInfoStr = computed(() => solar.value.getLunar().toFullString());
  const fotoInfoStr = computed(() =>
    Foto.fromLunar(solar.value.getLunar()).toFullString()
  );
  const taoInfoStr = computed(() =>
    Tao.fromLunar(solar.value.getLunar()).toFullString()
  );

  return {
    createDate,
    date,
    dateStr,
    lunarStr,
    dateInfoStr,
    solarInfoStr,
    lunarInfoStr,
    fotoInfoStr,
    taoInfoStr,

    startDate,
    stopDate
  };
};
