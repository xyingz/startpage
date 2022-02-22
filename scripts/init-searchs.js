/*
 * @Author: JeremyJone
 * @Date: 2022-02-15 16:38:16
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-02-22 10:01:41
 * @Description: 初始化搜索引擎
 */

const fs = require('fs');

const json = [
  {
    name: 'baidu',
    icon: 'baidu',
    comment: '百度',
    website: 'https://www.baidu.com/',
    searchs: [
      {
        name: '网页',
        url: 'https://www.baidu.com/s?wd='
      },
      {
        name: '图片',
        url: 'https://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word='
      },
      {
        name: '视频',
        url: 'https://v.baidu.com/v?word='
      },
      {
        name: '地图',
        url: 'https://map.baidu.com/m?word='
      }
    ]
  },
  {
    name: 'bing',
    icon: 'bing',
    comment: '必应',
    website: 'https://www.bing.com/',
    searchs: [
      {
        name: '网页',
        url: 'https://www.bing.com/search?q='
      },
      {
        name: '图片',
        url: 'https://cn.bing.com/images/search?q='
      },
      {
        name: '视频',
        url: 'https://www.bing.com/videos/search?q='
      },
      {
        name: '地图',
        url: 'https://www.bing.com/maps/default.aspx?q='
      }
    ]
  },
  {
    name: 'google',
    icon: 'google',
    comment: '谷歌（需要梯子）',
    website: 'https://www.google.com/',
    searchs: [
      {
        name: '网页',
        url: 'https://www.google.com/search?q='
      },
      {
        name: '图片',
        url: 'https://www.google.com/search?q=',
        params: '&tbm=isch'
      },
      {
        name: '视频',
        url: 'https://www.google.com/search?q=',
        params: '&tbm=vid'
      },
      {
        name: '地图',
        url: 'https://www.google.com/maps?q='
      }
    ]
  },
  {
    name: 'sogou',
    icon: 'sogou',
    comment: '搜狗',
    website: 'https://www.sogou.com/',
    searchs: [
      {
        name: '网页',
        url: 'https://www.sogou.com/web?query='
      },
      {
        name: '图片',
        url: 'https://pic.sogou.com/pics?query='
      },
      {
        name: '视频',
        url: 'https://v.sogou.com/v?query='
      },
      {
        name: '地图',
        url: 'https://map.sogou.com/index?query='
      }
    ]
  },
  {
    name: 'bilibili',
    icon: 'bilibili',
    comment: 'B站视频',
    website: 'https://www.bilibili.com/',
    searchs: [
      {
        name: '视频',
        url: 'https://www.bilibili.com/search?keyword='
      }
    ]
  },
  {
    name: 'magi',
    icon: 'magi',
    comment: 'Magi（搜人、事、物、概念，或者直接提问）',
    website: 'https://magi.com/',
    searchs: [
      {
        name: '网页',
        url: 'https://magi.com/search?q='
      }
    ]
  }
];

fs.writeFileSync(
  './public/searchs.json',
  JSON.stringify(json, null, 2),
  'utf8'
);
