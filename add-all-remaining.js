import fs from 'fs';

// 读取生成的内容
const generatedContent = JSON.parse(fs.readFileSync('missing-114-content.json', 'utf8'));
const entries = Object.entries(generatedContent);

console.log(`准备添加 ${entries.length} 个景点`);

// 读取当前文件
let content = fs.readFileSync('src/pages/PlaceDetail.jsx', 'utf8');

// 找到 reasonMap 的结束位置（在最后一个景点定义之后）
const reasonMapEndPattern = /    '历史中心': '[^']+'\n  }/;
const reasonMapMatch = content.match(reasonMapEndPattern);

if (!reasonMapMatch) {
  console.error('无法找到 reasonMap 的结束位置');
  process.exit(1);
}

// 生成新的景点条目（推荐理由）
let newReasonEntries = ',\n\n    // 剩余景点（自动生成）\n';
entries.forEach(([name, data]) => {
  // 转义单引号
  const reason = data.recommendationReason.replace(/'/g, "\\'");
  newReasonEntries += `    '${name}': '${reason}',\n`;
});

// 移除最后一个逗号
newReasonEntries = newReasonEntries.slice(0, -2) + '\n';

// 替换 reasonMap 部分
content = content.replace(
  reasonMapEndPattern,
  `    '历史中心': '这个历史中心保存着深厚的历史文化，狭窄的街道和传统建筑展现了当地的文化特色。'${newReasonEntries}  }`
);

console.log('已添加推荐理由');

// 找到 storyMap 的结束位置
const storyMapEndPattern = /    '历史中心': '[^']+'\n  }/;
const storyMapMatch = content.match(storyMapEndPattern);

if (!storyMapMatch) {
  console.error('无法找到 storyMap 的结束位置');
  process.exit(1);
}

// 生成新的景点条目（故事）
let newStoryEntries = ',\n\n    // 剩余景点故事（自动生成）\n';
entries.forEach(([name, data]) => {
  // 转义单引号
  const story = data.story.replace(/'/g, "\\'");
  newStoryEntries += `    '${name}': '${story}',\n`;
});

// 移除最后一个逗号
newStoryEntries = newStoryEntries.slice(0, -2) + '\n';

// 替换 storyMap 部分
content = content.replace(
  storyMapEndPattern,
  `    '历史中心': '这个历史中心保存着深厚的历史记忆，每一栋建筑都诉说着过去的故事，是了解当地文化的重要窗口。'${newStoryEntries}  }`
);

console.log('已添加景点故事');

// 保存文件
fs.writeFileSync('src/pages/PlaceDetail.jsx', content);

console.log('✅ 完成！所有景点已添加到 PlaceDetail.jsx');

