import fs from 'fs';

const content = fs.readFileSync('src/pages/PlaceDetail.jsx', 'utf8');

// 测试卡普里岛的景点
const attractions = ['蓝洞', '奥古斯都花园', '卡普里镇', '阿纳卡普里', '法拉里奥尼岩石'];

console.log('卡普里岛景点的推荐理由:');
attractions.forEach(attraction => {
  const reasonPattern = new RegExp(`'${attraction}': '([^']+)'`);
  const reasonMatch = content.match(reasonPattern);
  if (reasonMatch) {
    console.log(attraction + ':', reasonMatch[1]);
  } else {
    console.log(attraction + ': 未找到');
  }
});

console.log('\n卡普里岛景点的故事:');
attractions.forEach(attraction => {
  const storyPattern = new RegExp(`'${attraction}': '([^']+)'`);
  const storyMatch = content.match(storyPattern);
  if (storyMatch) {
    console.log(attraction + ':', storyMatch[1]);
  } else {
    console.log(attraction + ': 未找到');
  }
});

// 统计已定义的景点数量
const reasonMatches = content.match(/'([^']+)': '[^']+'/g);
const storyMatches = content.match(/'([^']+)': '[^']+'/g);

console.log('\n统计信息:');
console.log('已定义的推荐理由景点数量:', reasonMatches ? reasonMatches.length : 0);
console.log('已定义的景点故事数量:', storyMatches ? storyMatches.length : 0);
