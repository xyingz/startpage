const searchEngines: Array<SearchEngine> = [
  {
    name: 'baidu',
    url: 'https://www.baidu.com/s?wd=',
    icon: 'baidu',
    comment: '百度'
  },
  {
    name: 'bing',
    url: 'https://www.bing.com/search?q=',
    icon: 'bing',
    comment: '必应'
  },
  {
    name: 'google',
    url: 'https://www.google.com/search?q=',
    icon: 'google',
    comment: '谷歌（需要梯子）'
  },
  {
    name: 'magi',
    url: 'https://magi.com/search?q=',
    icon: 'magi',
    comment: 'Magi（搜人、事、物、概念，或者直接提问）'
  }
];

export default searchEngines;
