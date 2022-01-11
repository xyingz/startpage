import { Tool } from '@/typings/tool';
import { uuid } from '@/utils/common';

const tools: Array<Tool> = [
  {
    id: uuid(12),
    url: 'https://pan.baidu.com',
    comment: '百度网盘'
  },
  {
    id: uuid(12),
    url: 'https://mail.qq.com',
    comment: 'QQ邮箱'
  },
  {
    id: uuid(12),
    url: 'https://mail.163.com/',
    comment: '163邮箱'
  },
  {
    id: uuid(12),
    url: 'https://www.jd.com',
    comment: '京东'
  },
  {
    id: uuid(12),
    url: 'https://www.taobao.com',
    comment: '淘宝'
  },
  {
    id: uuid(12),
    url: 'https://www.bilibili.com',
    comment: 'Bilibili'
  },
  {
    id: uuid(12),
    url: 'https://www.weibo.com',
    comment: '微博'
  },
  {
    id: uuid(12),
    url: 'https://www.zhihu.com',
    comment: '知乎'
  },
  {
    id: uuid(12),
    url: 'https://web.wechat.com/?lang=zh_CN',
    comment: '微信网页版'
  },
  {
    id: uuid(12),
    url: 'https://www.npmjs.com',
    comment: 'npm'
  },
  {
    id: uuid(12),
    url: 'https://juejin.im',
    comment: '掘金'
  },
  {
    id: uuid(12),
    url: 'https://segmentfault.com',
    comment: 'SegmentFault'
  },
  {
    id: uuid(12),
    url: 'https://www.jianshu.com',
    comment: '简书'
  },
  {
    id: uuid(12),
    url: 'https://www.csdn.net',
    comment: 'CSDN'
  },
  {
    id: uuid(12),
    url: 'https://github.com',
    comment: 'GitHub'
  },
  {
    id: uuid(12),
    url: 'https://gitee.com',
    comment: '码云Gitee'
  },
  {
    id: uuid(12),
    url: 'https://stackoverflow.com',
    comment: 'StackOverflow'
  },
  {
    id: uuid(12),
    url: 'https://greasyfork.org/zh-CN/scripts',
    comment: '油猴脚本'
  }
];

export default tools;
