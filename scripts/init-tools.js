/*
 * @Author: JeremyJone
 * @Date: 2022-01-17 14:09:41
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-17 16:39:38
 * @Description: 初始化工具列表
 */

const fs = require('fs');

function uuid(len, radix = 16) {
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const res = [];
  let i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) res[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    // eslint-disable-next-line no-multi-assign
    res[8] = res[13] = res[18] = res[23] = '-';
    res[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!res[i]) {
        r = 0 | (Math.random() * 16);
        res[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return res.join('');
}

const labels = {
  /**
   * 实用工具 */
  utilitity: {
    en: 'utilitity',
    cn: '实用工具'
  },

  /**
   * 文件 */
  file: {
    en: 'file',
    cn: '文件'
  },

  /**
   * 购物 */
  shopping: {
    en: 'shopping',
    cn: '购物'
  },

  /**
   * 社交 */
  sociality: {
    en: 'sociality',
    cn: '社交'
  },

  /**
   * 音乐 */
  music: {
    en: 'music',
    cn: '音乐'
  },

  /**
   * 视频 */
  video: {
    en: 'video',
    cn: '视频'
  },

  /**
   * 图片 */
  image: {
    en: 'image',
    cn: '图片'
  },

  /**
   * 阅读 */
  reading: {
    en: 'reading',
    cn: '阅读'
  },

  /**
   * 新闻 */
  news: {
    en: 'news',
    cn: '新闻'
  },

  /**
   * 数码 */
  digital: {
    en: 'digital',
    cn: '数码'
  },

  /**
   * 游戏 */
  game: {
    en: 'game',
    cn: '游戏'
  },

  /**
   * 体育 */
  sport: {
    en: 'sport',
    cn: '体育'
  },

  /**
   * 旅行 */
  travel: {
    en: 'travel',
    cn: '旅行'
  },

  /**
   * 教育 */
  education: {
    en: 'education',
    cn: '教育'
  },

  /**
   * 财经 */
  finance: {
    en: 'finance',
    cn: '财经'
  },

  /**
   * 科学 */
  science: {
    en: 'science',
    cn: '科学'
  },

  /**
   * 健康 */
  health: {
    en: 'health',
    cn: '健康'
  },

  /**
   * 其他 */
  other: {
    en: 'other',
    cn: '其他'
  }
};

const tools = [
  {
    id: 'C0A9D43F6903',
    url: 'https://pan.baidu.com',
    name: '百度网盘',
    comment: '百度旗下网盘服务',
    label: [labels.utilitity, labels.file]
  },
  {
    id: 'BB355B5AC8B4',
    url: 'https://mail.qq.com',
    name: 'QQ邮箱',
    comment: '为亿万用户提供高效稳定便捷的电子邮件服务',
    label: [labels.utilitity]
  },
  {
    id: '55EE1ECDB03B',
    url: 'https://mail.163.com/',
    name: '163邮箱',
    comment: '中文邮箱第一品牌',
    label: [labels.utilitity]
  },
  {
    id: uuid(12),
    url: 'https://www.jd.com',
    name: '京东',
    comment: '专业的综合网上购物商城',
    label: [labels.shopping]
  },
  {
    id: uuid(12),
    url: 'https://www.taobao.com',
    name: '淘宝',
    comment: '中国最大的网上购物商城',
    label: [labels.shopping]
  },
  {
    id: uuid(12),
    url: 'https://www.bilibili.com',
    name: 'Bilibili',
    comment: '国内知名视频弹幕网站',
    label: [labels.video]
  },
  {
    id: uuid(12),
    url: 'https://www.weibo.com',
    name: '微博',
    comment: '中国最大的网络社交媒体',
    label: [labels.sociality]
  },
  {
    id: uuid(12),
    url: 'https://www.zhihu.com',
    name: '知乎',
    comment: '中国最大的问答社区',
    label: [labels.sociality, labels.reading, labels.news]
  },
  {
    id: 'BBA139347B80',
    url: 'https://web.wechat.com/?lang=zh_CN',
    name: '微信网页版',
    comment: '扫一扫即可通过浏览器沟通',
    label: [labels.sociality, labels.utilitity]
  },
  {
    id: uuid(12),
    url: 'https://www.npmjs.com',
    name: 'npm',
    comment: 'Node.js 包管理工具',
    label: [labels.utilitity, labels.digital]
  },
  {
    id: uuid(12),
    url: 'https://juejin.im',
    name: '掘金',
    comment: '中国最大的开源技术社区',
    label: [labels.sociality, labels.reading, labels.digital]
  },
  {
    id: uuid(12),
    url: 'https://segmentfault.com',
    name: 'SegmentFault',
    comment: '中国领先的开发者技术社区',
    label: [labels.sociality, labels.reading, labels.digital]
  },
  {
    id: uuid(12),
    url: 'https://www.jianshu.com',
    name: '简书',
    comment: '一个优质的创作社区',
    label: [labels.sociality, labels.reading]
  },
  {
    id: uuid(12),
    url: 'https://www.csdn.net',
    name: 'CSDN',
    comment: '中国最大的IT社区',
    label: [labels.sociality, labels.reading]
  },
  {
    id: uuid(12),
    url: 'https://github.com',
    name: 'GitHub',
    comment: '开源代码托管平台',
    label: [labels.utilitity, labels.digital, labels.sociality]
  },
  {
    id: uuid(12),
    url: 'https://gitee.com',
    name: '码云Gitee',
    comment: '中国开源代码托管平台',
    label: [labels.utilitity, labels.digital, labels.sociality]
  },
  {
    id: uuid(12),
    url: 'https://stackoverflow.com',
    name: 'StackOverflow',
    comment: '最权威的IT技术问答社区',
    label: [labels.digital, labels.sociality, labels.science, labels.education]
  },
  {
    id: uuid(12),
    url: 'https://greasyfork.org/zh-CN/scripts',
    name: '油猴脚本',
    comment: '油猴脚本是一个开源脚本管理平台',
    label: [labels.utilitity, labels.digital]
  }
];

const json_cn = {};
const json_en = {};
tools.forEach(tool => {
  const label = tool.label;
  label.forEach(l => {
    if (!json_cn[l.cn]) {
      json_cn[l.cn] = [];
      json_en[l.en] = [];
    }
    json_cn[l.cn].push({
      ...tool,
      label: tool.label.map(l => l.cn)
    });
    json_en[l.en].push({
      ...tool,
      label: tool.label.map(l => l.en)
    });
  });
});

fs.writeFileSync(
  './public/tools.json',
  JSON.stringify(json_cn, null, 2),
  'utf8'
);
fs.writeFileSync(
  './public/tools-en.json',
  JSON.stringify(json_en, null, 2),
  'utf8'
);
