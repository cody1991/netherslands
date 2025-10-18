const fs = require('fs');

// 读取文件
const filePath = './src/data/places.js';
let content = fs.readFileSync(filePath, 'utf-8');

// 修复模式1: highlights 数组后面直接跟 tips: [，缺少 ],
// 匹配 '...' 后面直接跟 tips: [
const pattern1 = /('.*?')\n\s*tips:\s*\[/g;
let matches1 = [];
let match;
while ((match = pattern1.exec(content)) !== null) {
  matches1.push({ index: match.index, match: match[0] });
}

console.log(`找到 ${matches1.length} 处需要修复的 highlights 数组`);

// 从后往前替换，避免索引变化
matches1.reverse().forEach(m => {
  const lines = m.match.split('\n');
  const lastLine = lines[lines.length - 1];
  const indent = lastLine.match(/^\s*/)[0];
  const replacement = m.match.replace(/\n\s*tips:\s*\[/, `\n${indent}],\n${indent}tips: [`);
  content = content.substring(0, m.index) + replacement + content.substring(m.index + m.match.length);
});

// 修复模式2: tips: [ 后面没有 ], 直接跟其他属性
// 匹配 tips: [ ... ] 后面应该有 ], 但没有
const pattern2 = /(tips:\s*\[\s*(?:.*?\n)*?\s*)\n\s*(recommendationReason:|story:|ticketPrice:)/g;
let matches2 = [];
while ((match = pattern2.exec(content)) !== null) {
  // 检查是否已经有 ],
  const beforeProperty = content.substring(match.index, match.index + match[1].length + 10);
  if (!beforeProperty.includes('],')) {
    matches2.push({ index: match.index, match: match[0] });
  }
}

console.log(`找到 ${matches2.length} 处需要修复的 tips 数组`);

matches2.reverse().forEach(m => {
  const lines = m.match.split('\n');
  const lastLineIndex = lines.length - 1;
  const lastLine = lines[lastLineIndex];
  const indent = lastLine.match(/^\s*/)[0];
  
  // 在最后一个属性前添加 ],
  lines[lastLineIndex - 1] = lines[lastLineIndex - 1] + '\n' + indent + '],';
  const replacement = lines.join('\n');
  
  content = content.substring(0, m.index) + replacement + content.substring(m.index + m.match.length);
});

// 写回文件
fs.writeFileSync(filePath, content, 'utf-8');
console.log('修复完成！');

