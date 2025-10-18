# Places 数据结构

为了更好地管理和维护，原来的 `places.js` (9201 行) 已经被拆分成多个文件，按出发城市分组。

## 文件列表

| 文件名         | 出发城市  | 行数     | 说明                     |
| -------------- | --------- | -------- | ------------------------ |
| `almere.js`    | Almere    | ~2437 行 | 从阿尔梅勒出发的所有景点 |
| `brussels.js`  | Brussels  | ~364 行  | 从布鲁塞尔出发的所有景点 |
| `lyon.js`      | Lyon      | ~164 行  | 从里昂出发的所有景点     |
| `marseille.js` | Marseille | ~156 行  | 从马赛出发的所有景点     |
| `nice.js`      | Nice      | ~144 行  | 从尼斯出发的所有景点     |
| `monaco.js`    | Monaco    | ~191 行  | 从摩纳哥出发的所有景点   |
| `milan.js`     | Milan     | ~367 行  | 从米兰出发的所有景点     |
| `verona.js`    | Verona    | ~213 行  | 从维罗纳出发的所有景点   |
| `venice.js`    | Venice    | ~287 行  | 从威尼斯出发的所有景点   |
| `florence.js`  | Florence  | ~331 行  | 从佛罗伦萨出发的所有景点 |
| `pisa.js`      | Pisa      | ~182 行  | 从比萨出发的所有景点     |
| `rome.js`      | Rome      | ~223 行  | 从罗马出发的所有景点     |
| `vatican.js`   | Vatican   | ~141 行  | 从梵蒂冈出发的所有景点   |
| `naples.js`    | Naples    | ~4039 行 | 从那不勒斯出发的所有景点 |

## 使用方式

主文件 `../places.js` 会自动导入并合并所有分文件的数据：

```javascript
// src/data/places.js
import { almerePlaces } from './places/almere.js';
import { brusselsPlaces } from './places/brussels.js';
// ... 其他导入

export const places = [
  ...almerePlaces,
  ...brusselsPlaces,
  // ... 其他数据
];
```

## 如何添加新景点

1. 找到对应的出发城市文件（如 `almere.js`）
2. 在文件中添加新的景点对象
3. 确保格式正确，包含所有必需字段
4. 保存后，主文件会自动包含新数据

## 备注

- 原始的单文件已备份为 `places.js.bak`
- 所有文件都经过语法检查，确保没有错误
- 总共 207 个地点，分布在 14 个文件中
