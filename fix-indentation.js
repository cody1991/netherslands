const fs = require('fs');

// 读取文件
const filePath = 'src/data/places.js';
let content = fs.readFileSync(filePath, 'utf8');

// 修复缩进问题
// 1. 修复对象属性的缩进
content = content.replace(/^    name:/gm, '  name:');
content = content.replace(/^      country:/gm, '  country:');
content = content.replace(/^        emoji:/gm, '  emoji:');
content = content.replace(/^          duration:/gm, '  duration:');
content = content.replace(/^            category:/gm, '  category:');
content = content.replace(/^              departureCity:/gm, '  departureCity:');
content = content.replace(/^                distance:/gm, '  distance:');
content = content.replace(/^                  travelTime:/gm, '  travelTime:');
content = content.replace(/^                    description:/gm, '  description:');
content = content.replace(/^                      location:/gm, '  location:');

// 2. 修复数组内容的缩进
content = content.replace(/^    highlights: \[/gm, '  highlights: [');
content = content.replace(/^      tips: \[/gm, '  tips: [');
content = content.replace(/^        / / 详细卡片信息 / gm, '  // 详细卡片信息');
content = content.replace(/^        ticketPrice:/gm, '  ticketPrice:');
content = content.replace(/^    openingHours:/gm, '  openingHours:');
content = content.replace(/^  historicalSignificance:/gm, '  historicalSignificance:');
content = content.replace(/^    famousPeople:/gm, '  famousPeople:');
content = content.replace(/^      bestTimeToVisit:/gm, '  bestTimeToVisit:');
content = content.replace(/^        accessibility:/gm, '  accessibility:');
content = content.replace(/^          recommendationReason:/gm, '  recommendationReason:');
content = content.replace(/^            story:/gm, '  story:');

// 3. 修复数组内部元素的缩进
content = content.replace(/^      '([^']+)' - /gm, "    '$1' - ");
content = content.replace(/^        '([^']+)' - /gm, "    '$1' - ");
content = content.replace(/^      '([^']+)'/gm, "    '$1'");
content = content.replace(/^        '([^']+)'/gm, "    '$1'");

// 4. 修复对象内部属性的缩进
content = content.replace(/^    '([^']+)':/gm, "    '$1':");
content = content.replace(/^      '([^']+)':/gm, "    '$1':");
content = content.replace(/^        '([^']+)':/gm, "    '$1':");

// 5. 修复一些特殊的缩进问题
content = content.replace(/^    \],/gm, '  ],');
content = content.replace(/^      \],/gm, '  ],');
content = content.replace(/^        \],/gm, '  ],');

// 写回文件
fs.writeFileSync(filePath, content, 'utf8');

console.log('缩进修复完成！');
