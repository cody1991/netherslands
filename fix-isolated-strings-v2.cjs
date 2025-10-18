const fs = require('fs');

const filePath = './src/data/places.js';
let content = fs.readFileSync(filePath, 'utf-8');
let lines = content.split('\n');

console.log('查找所有孤立的字符串...\n');

let fixCount = 0;

// 从后往前处理，避免行号变化
for (let i = lines.length - 1; i >= 1; i--) {
  const line = lines[i];
  const prevLine = lines[i - 1];
  const nextLine = i < lines.length - 1 ? lines[i + 1] : '';
  
  // 检查当前行是否是一个字符串（被引号包围）
  const isString = line.trim().match(/^'[^']*',?\s*$/);
  
  if (isString) {
    // 检查前一行是否是有效的
    const prevIsValid = 
      prevLine.trim().endsWith(',') ||  // 数组元素
      prevLine.trim().endsWith('[') ||  // 数组开始
      prevLine.trim().endsWith('{') ||  // 对象开始
      prevLine.trim().match(/:\s*\[$/)||  // 属性数组开始
      prevLine.trim().startsWith('//'); // 注释
    
    // 检查下一行是否是其他属性
    const nextIsProperty = nextLine.trim().match(/^\w+:/);
    
    if (!prevIsValid && nextIsProperty) {
      console.log(`第 ${i + 1} 行是孤立的字符串: ${line.trim().substring(0, 50)}`);
      // 删除这一行
      lines.splice(i, 1);
      fixCount++;
    }
  }
}

console.log(`\n总共删除了 ${fixCount} 处孤立的字符串`);

// 写回文件
content = lines.join('\n');
fs.writeFileSync(filePath, content, 'utf-8');
console.log('修复完成！');

