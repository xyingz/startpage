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
  }
];

export default searchEngines;
