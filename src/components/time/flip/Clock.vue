<template>
  <div class="FlipClock">
    <Flipper ref="flipperHour1" />
    <Flipper ref="flipperHour2" />
    <em>:</em>
    <Flipper ref="flipperMinute1" />
    <Flipper ref="flipperMinute2" />
    <em>:</em>
    <Flipper ref="flipperSecond1" />
    <Flipper ref="flipperSecond2" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Flipper from './Flipper.vue';

type FormatKey = 'M+' | 'd+' | 'h+' | 'H+' | 'm+' | 's+' | 'q+' | 'S';

export default defineComponent({
  name: 'FlipClock',
  components: {
    Flipper
  },
  data() {
    return {
      timer: null as any,
      flipObjs: [] as any[]
    };
  },
  mounted() {
    this.flipObjs = [
      this.$refs.flipperHour1,
      this.$refs.flipperHour2,
      this.$refs.flipperMinute1,
      this.$refs.flipperMinute2,
      this.$refs.flipperSecond1,
      this.$refs.flipperSecond2
    ];
    this.init();
    this.run();
  },
  methods: {
    // 初始化数字
    init() {
      const now = new Date();
      const nowTimeStr = this.formatDate(new Date(now.getTime()), 'hhmmss');
      for (let i = 0; i < this.flipObjs.length; i++) {
        this.flipObjs[i].setFront(nowTimeStr[i]);
      }
    },
    // 开始计时
    run() {
      this.timer = setInterval(() => {
        // 获取当前时间
        const now = new Date();
        const nowTimeStr = this.formatDate(
          new Date(now.getTime() - 1000),
          'hhmmss'
        );
        const nextTimeStr = this.formatDate(now, 'hhmmss');
        for (let i = 0; i < this.flipObjs.length; i++) {
          if (nowTimeStr[i] !== nextTimeStr[i]) {
            this.flipObjs[i].flipDown(nowTimeStr[i], nextTimeStr[i]);
          }
        }
      }, 1000);
    },
    // 正则格式化日期
    formatDate(date: Date, dateFormat: string) {
      /* 单独格式化年份，根据y的字符数量输出年份
     * 例如：yyyy => 2019
            yy => 19
            y => 9
     */
      if (/(y+)/.test(dateFormat)) {
        // eslint-disable-next-line no-param-reassign
        dateFormat = dateFormat.replace(
          RegExp.$1,
          `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
        );
      }

      const o: Record<FormatKey, number> = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
      };

      let k: keyof Record<FormatKey, number>;
      // eslint-disable-next-line no-restricted-syntax
      for (k in o) {
        if (new RegExp(`(${k})`).test(dateFormat)) {
          // 取出对应的值
          const str = o[k].toString();
          /* 根据设置的格式，输出对应的字符
           * 例如: 早上8时，hh => 08，h => 8
           * 但是，当数字>=10时，无论格式为一位还是多位，不做截取，这是与年份格式化不一致的地方
           * 例如: 下午15时，hh => 15, h => 15
           */
          // eslint-disable-next-line no-param-reassign
          dateFormat = dateFormat.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          );
        }
      }
      return dateFormat;
    },
    // 日期时间补零
    padLeftZero(str: string | any[]) {
      return `00${str}`.substr(str.length);
    }
  }
});
</script>

<style>
.FlipClock {
  text-align: center;
}
.FlipClock .M-Flipper {
  margin: 0 0.2rem;
}
.FlipClock em {
  display: inline-block;
  line-height: 5rem;
  font-size: 3rem;
  font-style: normal;
  vertical-align: top;
}

@media screen and (max-width: 768px) {
  .FlipClock {
    font-size: 1.5rem;
  }
  .FlipClock .M-Flipper {
    margin: 0 0.1rem;
  }
  .FlipClock em {
    line-height: 3rem;
    font-size: 1.5rem;
  }
}
</style>
