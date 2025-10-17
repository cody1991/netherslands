#!/usr/bin/env node

// 快速迁移所有景点的脚本
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取原始places.js文件
const placesContent = fs.readFileSync('/Users/codytang/Desktop/tencent/nethersland/src/data/places.js', 'utf8');

// 提取所有景点对象
const placesMatch = placesContent.match(/export const places = \[([\s\S]*)\];/);
if (!placesMatch) {
  console.error('无法解析places.js文件');
  process.exit(1);
}

const placesArrayContent = placesMatch[1];

// 分割景点对象
const placeObjects = [];
let currentObject = '';
let braceCount = 0;
let inObject = false;

for (let i = 0; i < placesArrayContent.length; i++) {
  const char = placesArrayContent[i];

  if (char === '{') {
    if (!inObject) {
      inObject = true;
      currentObject = '';
    }
    braceCount++;
  }

  if (inObject) {
    currentObject += char;
  }

  if (char === '}') {
    braceCount--;
    if (braceCount === 0 && inObject) {
      placeObjects.push(currentObject);
      currentObject = '';
      inObject = false;
    }
  }
}

console.log(`找到 ${placeObjects.length} 个景点`);

// 为每个景点创建文件
let createdCount = 0;
placeObjects.forEach((placeObj, index) => {
  try {
    // 提取基本信息
    const idMatch = placeObj.match(/id:\s*['"]?([^,}]+)['"]?/);
    const nameMatch = placeObj.match(/name:\s*['"]([^'"]+)['"]/);
    const categoryMatch = placeObj.match(/category:\s*['"]([^'"]+)['"]/);

    if (!idMatch || !nameMatch || !categoryMatch) {
      console.log(`跳过景点 ${index}: 缺少必要信息`);
      return;
    }

    const id = idMatch[1].trim();
    const name = nameMatch[1];
    const category = categoryMatch[1];

    // 跳过已经创建的景点
    const existingFiles = [
      'almere-local', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];
    if (existingFiles.includes(id)) {
      console.log(`跳过已存在的景点: ${name} (${id})`);
      return;
    }

    // 创建文件名
    const fileName = `${id}-${name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-')}.js`;
    const categoryDir = path.join('/Users/codytang/Desktop/tencent/nethersland/src/data/attractions', category);

    // 确保目录存在
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    // 创建景点文件内容
    const fileContent = `// ${name}
export const ${id.replace(/[^a-zA-Z0-9]/g, '_')} = ${placeObj.trim()};
`;

    const filePath = path.join(categoryDir, fileName);
    fs.writeFileSync(filePath, fileContent, 'utf8');

    console.log(`创建文件: ${filePath}`);
    createdCount++;

  } catch (error) {
    console.error(`处理景点 ${index} 时出错:`, error.message);
  }
});

console.log(`批量创建完成！共创建了 ${createdCount} 个景点文件`);
