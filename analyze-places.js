import fs from 'fs';

// 读取places.js文件
const placesContent = fs.readFileSync('src/data/places.js', 'utf8');

// 提取places数组 - 从export const places = [ 到最后的 ];
const startIndex = placesContent.indexOf('export const places = [');
const endIndex = placesContent.lastIndexOf('];');
if (startIndex === -1 || endIndex === -1) {
  console.error('无法找到places数组');
  process.exit(1);
}

const placesArrayStr = placesContent.substring(startIndex + 'export const places = '.length, endIndex + 1);
const places = eval(placesArrayStr);

console.log('总景点数量:', places.length);

console.log('\n有详细信息的景点:');
let detailedCount = 0;
places.forEach(place => {
  if (place.ticketPrice || place.openingHours || place.historicalSignificance || place.famousPeople || place.bestTimeToVisit || place.accessibility) {
    console.log(`- ${place.name} (id: ${place.id}) - ${place.country}`);
    detailedCount++;
  }
});

console.log(`\n有详细信息的景点数量: ${detailedCount}`);

console.log('\n缺少详细信息的景点:');
let missingCount = 0;
places.forEach(place => {
  if (!place.ticketPrice && !place.openingHours && !place.historicalSignificance && !place.famousPeople && !place.bestTimeToVisit && !place.accessibility) {
    console.log(`- ${place.name} (id: ${place.id}) - ${place.country}`);
    missingCount++;
  }
});

console.log(`\n缺少详细信息的景点数量: ${missingCount}`);