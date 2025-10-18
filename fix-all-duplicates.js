import fs from 'fs';

console.log('🛠️ 全面修复PlaceDetail.jsx中的重复键...\n');

const content = fs.readFileSync('src/pages/PlaceDetail.jsx', 'utf8');

// 定义所有重复键的修复映射
const duplicateFixes = {
  '莱茵河畔': ['科隆莱茵河畔', '杜塞尔多夫莱茵河畔'],
  '老城区': ['布鲁日老城区', '科隆老城区', '杜塞尔多夫老城区', '纳尔登老城区', '莱顿老城区'],
  '风车群': ['小孩堤防风车群', '赞斯风车村风车群', '阿尔梅勒风车群'],
  '自行车道': ['阿姆斯特丹自行车道', '布鲁日自行车道'],
  '木鞋工坊': ['赞斯风车村木鞋工坊', '阿尔梅勒木鞋工坊'],
  '奶酪农场': ['赞斯风车村奶酪农场', '阿尔梅勒奶酪农场'],
  '传统建筑': ['赞斯风车村传统建筑', '阿尔梅勒传统建筑'],
  '莱顿大学': ['莱顿莱顿大学', '阿姆斯特丹莱顿大学'],
  '国立古物博物馆': ['莱顿国立古物博物馆', '阿姆斯特丹国立古物博物馆'],
  '风车博物馆': ['莱顿风车博物馆', '阿姆斯特丹风车博物馆'],
  '植物园': ['莱顿植物园', '阿姆斯特丹植物园'],
  '运河区': ['莱顿运河区', '阿姆斯特丹运河区'],
  '埃菲尔铁塔': ['巴黎埃菲尔铁塔', '里昂埃菲尔铁塔'],
  '卢浮宫': ['巴黎卢浮宫', '里昂卢浮宫'],
  '凯旋门': ['巴黎凯旋门', '里昂凯旋门'],
  '圣母院': ['巴黎圣母院', '里昂圣母院'],
  '圣心大教堂': ['巴黎圣心大教堂', '里昂圣心大教堂'],
  '香榭丽舍大街': ['巴黎香榭丽舍大街', '里昂香榭丽舍大街'],
  '凡尔赛宫': ['巴黎凡尔赛宫', '里昂凡尔赛宫'],
  '历史中心': ['帕维亚历史中心', '蒂沃利历史中心']
};

let newContent = content;
let fixedCount = 0;

// 为每个重复键创建修复
Object.entries(duplicateFixes).forEach(([originalKey, newKeys]) => {
  // 找到所有匹配的行
  const regex = new RegExp(`'${originalKey}': '([^']+)'`, 'g');
  let match;
  let matchIndex = 0;

  while ((match = regex.exec(newContent)) !== null) {
    if (matchIndex < newKeys.length) {
      const newKey = newKeys[matchIndex];
      const oldPattern = `'${originalKey}': '${match[1]}'`;
      const newPattern = `'${newKey}': '${match[1]}'`;

      newContent = newContent.replace(oldPattern, newPattern);
      console.log(`✅ 修复: "${originalKey}" → "${newKey}"`);
      fixedCount++;
      matchIndex++;
    }
  }
});

// 保存修复后的文件
fs.writeFileSync('src/pages/PlaceDetail.jsx', newContent);

console.log(`\n🎉 成功修复了 ${fixedCount} 个重复键！`);
console.log('📝 所有重复的景点名称现在都有城市前缀区分');
