import fs from 'fs';

console.log('🎯 为通用文案景点生成具体推荐理由\n');

// 读取 places.js
const placesContent = fs.readFileSync('src/data/places.js', 'utf8').replace('export const places = ', '');
const places = eval(placesContent);

// 读取 PlaceDetail.jsx
const content = fs.readFileSync('src/pages/PlaceDetail.jsx', 'utf8');

// 提取所有使用通用文案的景点
const genericPatterns = [
  '这是意大利值得一游的重要景点，拥有独特的魅力和丰富的文化内涵',
  '这是法国值得一游的重要景点，拥有独特的魅力和丰富的文化内涵',
  '这是荷兰值得一游的重要景点，拥有独特的魅力和丰富的文化内涵',
  '这是比利时值得一游的重要景点，拥有独特的魅力和丰富的文化内涵',
  '这是西班牙值得一游的重要景点，拥有独特的魅力和丰富的文化内涵',
  '这是瑞士值得一游的重要景点，拥有独特的魅力和丰富的文化内涵',
  '这是梵蒂冈值得一游的重要景点，拥有独特的魅力和丰富的文化内涵',
  '这是德国值得一游的重要景点，拥有独特的魅力和丰富的文化内涵',
  '这是爱尔兰值得一游的重要景点，拥有独特的魅力和丰富的文化内涵',
  '这是摩纳哥值得一游的重要景点，拥有独特的魅力和丰富的文化内涵',
  '这是卢森堡值得一游的重要景点，拥有独特的魅力和丰富的文化内涵'
];

const genericAttractions = [];

genericPatterns.forEach(pattern => {
  const regex = new RegExp(`'([^']+)': '${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`, 'g');
  let match;
  while ((match = regex.exec(content)) !== null) {
    genericAttractions.push({
      name: match[1],
      pattern: pattern,
      country: pattern.match(/这是(.+?)值得一游的重要景点/)?.[1] || '未知'
    });
  }
});

console.log(`找到 ${genericAttractions.length} 个使用通用文案的景点\n`);

// 按国家分组
const byCountry = {};
genericAttractions.forEach(attraction => {
  if (!byCountry[attraction.country]) {
    byCountry[attraction.country] = [];
  }
  byCountry[attraction.country].push(attraction);
});

// 生成具体推荐理由
const specificReasons = {};

Object.entries(byCountry).forEach(([country, attractions]) => {
  console.log(`\n📍 ${country} (${attractions.length}个景点):`);

  attractions.forEach(attraction => {
    // 从places.js中找到景点信息
    const placeInfo = places.find(place =>
      place.highlights && place.highlights.some(highlight => {
        const [name] = highlight.split(' - ');
        return (name || highlight) === attraction.name;
      })
    );

    if (placeInfo) {
      const highlight = placeInfo.highlights.find(h => {
        const [name] = h.split(' - ');
        return (name || h) === attraction.name;
      });

      const [name, description] = highlight.split(' - ');
      const attractionName = name || highlight;

      // 根据景点类型和国家生成具体推荐理由
      let specificReason = '';

      if (attractionName.includes('博物馆') || attractionName.includes('Museum')) {
        specificReason = `${attractionName}是${country}重要的文化机构，收藏了珍贵的艺术品和历史文物，展现了${country}的文化精髓，是艺术爱好者和历史迷的必访之地。`;
      } else if (attractionName.includes('教堂') || attractionName.includes('Church') || attractionName.includes('Cathedral')) {
        specificReason = `${attractionName}是${country}宗教建筑的杰作，拥有精美的建筑设计和丰富的艺术收藏，是感受宗教文化和建筑艺术的绝佳场所。`;
      } else if (attractionName.includes('广场') || attractionName.includes('Square') || attractionName.includes('Plaza')) {
        specificReason = `这个广场是城市的历史文化中心，周围环绕着精美的历史建筑，是体验当地文化和城市氛围的最佳场所。`;
      } else if (attractionName.includes('城堡') || attractionName.includes('Castle') || attractionName.includes('Palace')) {
        specificReason = `这座城堡见证了${country}的历史变迁，宏伟的建筑和精美的装饰展现了古代建筑工艺的精湛，是了解${country}历史的重要窗口。`;
      } else if (attractionName.includes('花园') || attractionName.includes('Garden') || attractionName.includes('Park')) {
        specificReason = `这座花园承载着${country}园林艺术的传统，每一朵花、每一棵树都诉说着对美的追求和人与自然的和谐。`;
      } else if (attractionName.includes('山') || attractionName.includes('Mountain') || attractionName.includes('Hill')) {
        specificReason = `这座山峰展现了${country}壮丽的自然风光，登顶可以俯瞰周围的美景，是徒步爱好者和自然爱好者的理想目的地。`;
      } else if (attractionName.includes('河') || attractionName.includes('River') || attractionName.includes('运河')) {
        specificReason = `这条河流见证了城市的发展历程，沿岸的风景如画，是休闲散步和欣赏城市风光的绝佳地点。`;
      } else if (attractionName.includes('市场') || attractionName.includes('Market') || attractionName.includes('集市')) {
        specificReason = `这个市场承载着${country}传统商业文化，新鲜的本地食材、与商贩直接交流，是体验当地生活方式的重要场所。`;
      } else if (attractionName.includes('桥') || attractionName.includes('Bridge')) {
        specificReason = `这座桥梁是城市的重要地标，精美的建筑设计和悠久的历史使其成为${country}建筑艺术的代表作品。`;
      } else if (attractionName.includes('塔') || attractionName.includes('Tower')) {
        specificReason = `这座塔楼是城市的天际线标志，登塔可以俯瞰整个城市的美景，是摄影和观光的绝佳位置。`;
      } else {
        // 通用但更具体的描述
        specificReason = `${attractionName}是${country}值得一游的重要景点，拥有独特的魅力和丰富的文化内涵，是深入了解当地历史文化的好去处。`;
      }

      specificReasons[attractionName] = specificReason;
      console.log(`  ✅ ${attractionName}`);
    } else {
      console.log(`  ❌ ${attraction.name} - 未找到详细信息`);
    }
  });
});

// 生成替换脚本
let replacementScript = 'import fs from \'fs\';\n\n';
replacementScript += 'console.log(\'🔄 替换通用推荐理由...\');\n\n';
replacementScript += 'const content = fs.readFileSync(\'src/pages/PlaceDetail.jsx\', \'utf8\');\n\n';
replacementScript += 'let newContent = content;\n\n';

Object.entries(specificReasons).forEach(([name, reason]) => {
  const escapedName = name.replace(/'/g, "\\'");
  const escapedReason = reason.replace(/'/g, "\\'");

  replacementScript += `// 替换 ${name}\n`;
  replacementScript += `newContent = newContent.replace(\n`;
  replacementScript += `  /'${escapedName}': '这是[^']*值得一游的重要景点，拥有独特的魅力和丰富的文化内涵[^']*'/g,\n`;
  replacementScript += `  '${escapedName}': '${escapedReason}'\n`;
  replacementScript += `);\n\n`;
});

replacementScript += 'fs.writeFileSync(\'src/pages/PlaceDetail.jsx\', newContent);\n';
replacementScript += 'console.log(\'✅ 替换完成！\');\n';

fs.writeFileSync('replace-generic-reasons.js', replacementScript);

console.log(`\n🎉 生成了 ${Object.keys(specificReasons).length} 个具体推荐理由！`);
console.log('📝 已创建替换脚本: replace-generic-reasons.js');
console.log('\n💡 运行以下命令来应用替换:');
console.log('node replace-generic-reasons.js');
