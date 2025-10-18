import fs from 'fs';

console.log('开始精确验证...');

// 读取 places.js 文件
const content = fs.readFileSync('src/data/places.js', 'utf8');
const placesContent = content.replace('export const places = ', '');
const places = eval(placesContent);

const allHighlights = new Set();

places.forEach(place => {
  if (place.highlights) {
    place.highlights.forEach(highlight => {
      const [attractionName] = highlight.split(' - ');
      const cleanName = attractionName || highlight;
      allHighlights.add(cleanName);
    });
  }
});

console.log('总景点数量:', allHighlights.size);

// 读取 PlaceDetail.jsx 文件
const placeDetailContent = fs.readFileSync('src/pages/PlaceDetail.jsx', 'utf8');

// 提取 reasonMap 中定义的景点
const reasonMapStart = placeDetailContent.indexOf('const reasonMap = {');
const reasonMapEnd = placeDetailContent.indexOf('return reasonMap[attractionName]');
const reasonMapContent = placeDetailContent.substring(reasonMapStart, reasonMapEnd);

const definedAttractions = new Set();
const matches = reasonMapContent.match(/'([^']+)':\s*'/g);
if (matches) {
  matches.forEach(match => {
    const name = match.match(/'([^']+)':/)[1];
    definedAttractions.add(name);
  });
}

console.log('已定义的唯一景点数量:', definedAttractions.size);

// 找出缺失的景点
const missingAttractions = [];
allHighlights.forEach(attraction => {
  if (!definedAttractions.has(attraction)) {
    missingAttractions.push(attraction);
  }
});

console.log('缺失的景点数量:', missingAttractions.length);
console.log('覆盖率:', ((allHighlights.size - missingAttractions.length) / allHighlights.size * 100).toFixed(1) + '%');

if (missingAttractions.length > 0) {
  console.log('\n缺失的景点:');
  missingAttractions.slice(0, 20).forEach((name, index) => {
    console.log(`${index + 1}. ${name}`);
  });
  if (missingAttractions.length > 20) {
    console.log(`... 还有 ${missingAttractions.length - 20} 个`);
  }
} else {
  console.log('\n🎉 太棒了！所有666个景点都已添加，达到100%覆盖率！');
}

