/*
 * @Author: JeremyJone
 * @Date: 2022-01-17 17:23:21
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-17 17:43:39
 * @Description: 初始化格言警句
 */

const fs = require('fs');

const json = [
  {
    content: '无善无恶心之体，有善有恶意之动',
    author: '王阳明',
    source: '《心学四决》'
  },
  {
    content: '知善知恶是良知，为善去恶是格物',
    author: '王阳明',
    source: '《心学四决》'
  },
  {
    content: '与肝胆人共事，无字句处读书',
    author: '周恩来',
    source: '《周恩来语录》'
  },
  {
    content: '知人者智，自知者明。胜人者有力，自胜者强',
    author: '老子',
    source: '《道德经》'
  },
  {
    content: '业精于勤，荒于嬉；行成于思，毁于随',
    author: '韩愈',
    source: '《进学解》'
  },
  {
    content: '知之者不如好之者，好之者不如乐之者',
    author: '孔子',
    source: '《论语》'
  },
  {
    content: '学而不思则罔，思而不学则殆',
    author: '孔子',
    source: '《论语》'
  }
];

fs.writeFileSync(
  './public/aphorisms.json',
  JSON.stringify(json, null, 2),
  'utf8'
);
