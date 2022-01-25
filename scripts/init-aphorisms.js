/*
 * @Author: JeremyJone
 * @Date: 2022-01-17 17:23:21
 * @LastEditors: JeremyJone
 * @LastEditTime: 2022-01-25 10:15:00
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
  },
  {
    content: '命里有时终须有，命里无时莫强求',
    author: '佚名',
    source: '《增广贤文》'
  },
  {
    content: '立身以立学为先，立学以读书为本',
    author: '欧阳修',
    source: '《欧阳文忠公文集》'
  },
  {
    content: '知人者智也，自知者明也',
    author: '老子',
    source: '《老子》'
  },
  {
    content: '旧书不厌百回读，熟读精思子自知',
    author: '苏轼',
    source: '《送安敦秀才失解西归》'
  },
  {
    content: '人生富贵驹过隙，惟有荣名寿金石',
    author: '顾炎武',
    source: '《秋风行》'
  },
  {
    content: '义重于生，舍生可矣',
    author: '范晔',
    source: '《后汉书·杜乔列传》'
  },
  {
    content: '君子计行虑义，小人计行其利',
    author: '佚名',
    source: '《吕氏春秋·慎行》'
  },
  {
    content: '古来多被虚名误，宁负虚名身莫负',
    author: '晏几道',
    source: '《玉楼春》'
  },
  {
    content: '忽贪意外之财，勿饮过量之酒',
    author: '朱伯庐',
    source: '《治家格言》'
  }
];

fs.writeFileSync(
  './public/aphorisms.json',
  JSON.stringify(json, null, 2),
  'utf8'
);
