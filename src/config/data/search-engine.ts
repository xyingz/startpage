const searchEngines: Array<SearchEngine> = [
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
  }
];

export default searchEngines;
