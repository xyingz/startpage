import { SearchEngine } from '@/typings/search';

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
  }
];

export default searchEngines;
