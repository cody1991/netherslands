const fs = require('fs');

// 读取places.js文件
const placesContent = fs.readFileSync('src/data/places.js', 'utf8');

// 提取places数组
const startIndex = placesContent.indexOf('export const places = [');
const endIndex = placesContent.lastIndexOf('];');
const placesArrayStr = placesContent.substring(startIndex + 'export const places = '.length, endIndex + 1);
const places = eval(placesArrayStr);

console.log('总景点数量:', places.length);

// 生成详细信息的函数
function generateDetailedInfo(place) {
  const country = place.country;
  const name = place.name;
  const highlights = place.highlights || [];
  
  // 生成门票价格
  const ticketPrice = {};
  highlights.forEach(highlight => {
    const attractionName = highlight.includes(' - ') ? highlight.split(' - ')[0] : highlight;
    
    // 根据景点类型和国家生成价格
    if (attractionName.includes('博物馆') || attractionName.includes('美术馆')) {
      if (country === '荷兰') {
        ticketPrice[attractionName] = '15-20欧元';
      } else if (country === '法国') {
        ticketPrice[attractionName] = '12-18欧元';
      } else if (country === '意大利') {
        ticketPrice[attractionName] = '10-15欧元';
      } else if (country === '德国') {
        ticketPrice[attractionName] = '8-12欧元';
      } else if (country === '比利时') {
        ticketPrice[attractionName] = '10-15欧元';
      } else {
        ticketPrice[attractionName] = '10-15欧元';
      }
    } else if (attractionName.includes('教堂') || attractionName.includes('大教堂')) {
      ticketPrice[attractionName] = '免费（登塔5-10欧元）';
    } else if (attractionName.includes('塔') || attractionName.includes('钟楼')) {
      ticketPrice[attractionName] = '8-12欧元';
    } else if (attractionName.includes('游船') || attractionName.includes('运河')) {
      ticketPrice[attractionName] = '15-25欧元';
    } else if (attractionName.includes('城堡') || attractionName.includes('宫殿')) {
      ticketPrice[attractionName] = '12-20欧元';
    } else if (attractionName.includes('公园') || attractionName.includes('花园')) {
      ticketPrice[attractionName] = '5-10欧元';
    } else if (attractionName.includes('海滩') || attractionName.includes('广场')) {
      ticketPrice[attractionName] = '免费';
    } else {
      ticketPrice[attractionName] = '8-15欧元';
    }
  });
  
  // 生成开放时间
  const openingHours = {};
  highlights.forEach(highlight => {
    const attractionName = highlight.includes(' - ') ? highlight.split(' - ')[0] : highlight;
    
    if (attractionName.includes('教堂') || attractionName.includes('大教堂')) {
      openingHours[attractionName] = '6:00-19:00';
    } else if (attractionName.includes('博物馆') || attractionName.includes('美术馆')) {
      openingHours[attractionName] = '10:00-18:00';
    } else if (attractionName.includes('塔') || attractionName.includes('钟楼')) {
      openingHours[attractionName] = '9:00-18:00';
    } else if (attractionName.includes('游船') || attractionName.includes('运河')) {
      openingHours[attractionName] = '10:00-17:00';
    } else if (attractionName.includes('公园') || attractionName.includes('花园')) {
      openingHours[attractionName] = '8:00-20:00';
    } else if (attractionName.includes('海滩') || attractionName.includes('广场')) {
      openingHours[attractionName] = '全天开放';
    } else {
      openingHours[attractionName] = '9:00-17:00';
    }
  });
  
  // 生成历史意义
  let historicalSignificance = '';
  if (country === '荷兰') {
    historicalSignificance = `${name}是荷兰重要的历史文化城市，见证了荷兰黄金时代的繁荣。这座城市承载着深厚的历史底蕴，每一座建筑都诉说着荷兰的历史变迁。`;
  } else if (country === '法国') {
    historicalSignificance = `${name}是法国重要的历史文化名城，见证了法国历史的辉煌。这座城市承载着深厚的文化底蕴，每一座建筑都诉说着法国的历史变迁。`;
  } else if (country === '意大利') {
    historicalSignificance = `${name}是意大利重要的历史文化名城，见证了意大利文艺复兴的辉煌。这座城市承载着深厚的艺术底蕴，每一座建筑都诉说着意大利的历史变迁。`;
  } else if (country === '德国') {
    historicalSignificance = `${name}是德国重要的历史文化名城，见证了德国历史的变迁。这座城市承载着深厚的文化底蕴，每一座建筑都诉说着德国的历史变迁。`;
  } else if (country === '比利时') {
    historicalSignificance = `${name}是比利时重要的历史文化名城，见证了比利时历史的变迁。这座城市承载着深厚的文化底蕴，每一座建筑都诉说着比利时的历史变迁。`;
  } else {
    historicalSignificance = `${name}是重要的历史文化名城，见证了欧洲历史的变迁。这座城市承载着深厚的文化底蕴，每一座建筑都诉说着历史的故事。`;
  }
  
  // 生成相关名人
  const famousPeople = [];
  if (country === '荷兰') {
    famousPeople.push('伦勃朗', '梵高', '维米尔');
  } else if (country === '法国') {
    famousPeople.push('拿破仑', '路易十四', '莫奈');
  } else if (country === '意大利') {
    famousPeople.push('达芬奇', '米开朗基罗', '拉斐尔');
  } else if (country === '德国') {
    famousPeople.push('歌德', '贝多芬', '巴赫');
  } else if (country === '比利时') {
    famousPeople.push('埃尔热', '马格里特', '鲁本斯');
  } else {
    famousPeople.push('历史名人', '文化名人', '艺术名人');
  }
  
  // 生成最佳游览时间
  let bestTimeToVisit = '';
  if (country === '荷兰') {
    bestTimeToVisit = '春季和秋季最佳，夏季可以享受运河风光，冬季有圣诞市场，全年都适合游览。';
  } else if (country === '法国') {
    bestTimeToVisit = '春季和秋季最佳，夏季游客较多，冬季有圣诞市场，建议避开7-8月高峰期。';
  } else if (country === '意大利') {
    bestTimeToVisit = '春季和秋季最佳，夏季炎热但可以享受海滩，冬季有圣诞市场，全年都适合游览。';
  } else if (country === '德国') {
    bestTimeToVisit = '春季和秋季最佳，夏季可以享受户外活动，冬季有圣诞市场，全年都适合游览。';
  } else if (country === '比利时') {
    bestTimeToVisit = '春季和秋季最佳，夏季可以享受户外活动，冬季有圣诞市场，全年都适合游览。';
  } else {
    bestTimeToVisit = '春季和秋季最佳，夏季可以享受户外活动，冬季有圣诞市场，全年都适合游览。';
  }
  
  // 生成无障碍设施
  let accessibility = '';
  if (country === '荷兰') {
    accessibility = '大部分景点都有无障碍设施，博物馆和主要景点提供轮椅通道，但部分历史建筑可能有限制。';
  } else if (country === '法国') {
    accessibility = '大部分景点都有无障碍设施，博物馆和主要景点提供轮椅通道，但部分历史建筑可能有限制。';
  } else if (country === '意大利') {
    accessibility = '大部分景点都有无障碍设施，博物馆和主要景点提供轮椅通道，但部分历史建筑可能有限制。';
  } else if (country === '德国') {
    accessibility = '大部分景点都有无障碍设施，博物馆和主要景点提供轮椅通道，但部分历史建筑可能有限制。';
  } else if (country === '比利时') {
    accessibility = '大部分景点都有无障碍设施，博物馆和主要景点提供轮椅通道，但部分历史建筑可能有限制。';
  } else {
    accessibility = '大部分景点都有无障碍设施，博物馆和主要景点提供轮椅通道，但部分历史建筑可能有限制。';
  }
  
  return {
    ticketPrice,
    openingHours,
    historicalSignificance,
    famousPeople,
    bestTimeToVisit,
    accessibility
  };
}

// 为缺少详细信息的景点生成数据
const placesToUpdate = [];
places.forEach(place => {
  if (!place.ticketPrice && !place.openingHours && !place.historicalSignificance && !place.famousPeople && !place.bestTimeToVisit && !place.accessibility) {
    const detailedInfo = generateDetailedInfo(place);
    placesToUpdate.push({
      id: place.id,
      name: place.name,
      country: place.country,
      ...detailedInfo
    });
  }
});

console.log(`\n需要更新的景点数量: ${placesToUpdate.length}`);

// 保存到文件
fs.writeFileSync('places-detailed-info.json', JSON.stringify(placesToUpdate, null, 2));
console.log('\n详细信息已保存到 places-detailed-info.json');