# 添加新景点指南 📝

如果你发现了新的好去处，可以按照以下步骤添加到应用中。

## 步骤 1：编辑景点数据

打开文件：`src/data/places.js`

## 步骤 2：添加新景点对象

在 `places` 数组末尾添加新的景点对象：

```javascript
{
  id: 16, // 使用下一个可用的ID
  name: '景点名称',
  country: '国家',
  emoji: '🎡', // 选择一个代表性的emoji
  duration: '当天来回', // 或 '2天周末游' 或 '3-4天游'
  category: 'netherlands', // 或 'international'
  distance: '50公里',
  travelTime: '1小时',
  description: '详细描述这个地方...',
  location: {
    lat: 52.0000, // 纬度
    lng: 5.0000   // 经度
  },
  transport: [
    { type: 'train', method: '火车', time: '1小时' },
    { type: 'car', method: '开车', time: '1.5小时' },
  ],
  highlights: [
    '主要景点1',
    '主要景点2',
    '主要景点3',
  ],
  tips: [
    '旅行建议1',
    '旅行建议2',
  ],
}
```

## 字段说明

### 必填字段

| 字段          | 类型   | 说明               | 示例                                 |
| ------------- | ------ | ------------------ | ------------------------------------ |
| `id`          | Number | 唯一标识符         | `16`                                 |
| `name`        | String | 景点名称           | `'代尔夫特'`                         |
| `country`     | String | 所在国家           | `'荷兰'`                             |
| `emoji`       | String | 代表性 emoji       | `'🏛️'`                               |
| `duration`    | String | 建议游玩时长       | `'当天来回'`                         |
| `category`    | String | 分类               | `'netherlands'` 或 `'international'` |
| `distance`    | String | 距离阿尔梅勒的距离 | `'60公里'`                           |
| `travelTime`  | String | 旅行时间           | `'1小时'`                            |
| `description` | String | 景点描述           | 详细描述...                          |
| `location`    | Object | GPS 坐标           | `{ lat: 52.0, lng: 5.0 }`            |
| `transport`   | Array  | 交通方式           | 见下方详情                           |
| `highlights`  | Array  | 推荐景点           | `['景点1', '景点2']`                 |

### 可选字段

| 字段   | 类型  | 说明     |
| ------ | ----- | -------- |
| `tips` | Array | 旅行建议 |

### Category（分类）选项

- `'netherlands'` - 荷兰境内的景点
- `'international'` - 荷兰以外的景点

注意：用户可以通过导航栏的不同标签筛选景点：

- "当天来回" - 显示 `duration` 包含 "当天来回" 的景点
- "2 天周末游" - 显示 `duration` 包含 "2 天" 或 "周末" 的景点
- "3-4 天游" - 显示 `duration` 包含 "3-4 天" 的景点
- "荷兰境内" - 显示 `category: 'netherlands'` 的景点
- "周边国家" - 显示 `category: 'international'` 的景点

### Transport（交通方式）字段

```javascript
transport: [
  {
    type: 'train', // 可选: 'train', 'car', 'plane'
    method: '火车', // 显示的文字
    time: '1小时', // 所需时间
  },
];
```

## 步骤 3：获取 GPS 坐标

### 方法 1：使用 Google Maps

1. 在 Google Maps 中搜索地点
2. 右键点击位置
3. 点击坐标以复制（例如：52.0116, 4.3571）

### 方法 2：使用网站

- https://www.latlong.net/
- 输入地址即可获取坐标

## 步骤 4：选择合适的 Emoji

一些建议：

- 🏛️ 博物馆、历史建筑
- 🏰 城堡、宫殿
- 🌉 桥梁、现代建筑
- ⛪ 教堂
- 🏖️ 海滩
- 🌷 花卉相关
- 🚣 水上活动
- 🍺 啤酒、美食相关
- 📚 书店、图书馆
- 🧇 比利时华夫饼
- 🗼 标志性建筑

## 步骤 5：保存并测试

1. 保存 `places.js` 文件
2. 开发服务器会自动重新加载
3. 在浏览器中查看新添加的景点
4. 确认所有信息显示正确

## 示例：添加代尔夫特

```javascript
{
  id: 16,
  name: '代尔夫特',
  country: '荷兰',
  emoji: '🏛️',
  duration: '当天来回',
  category: 'netherlands',
  distance: '55公里',
  travelTime: '1小时',
  description: '荷兰南荷兰省的一座历史名城，以精美的代尔夫特蓝瓷闻名于世。这座迷人的小城保留了中世纪的街道和运河，是荷兰画家维米尔的故乡。',
  location: { lat: 52.0116, lng: 4.3571 },
  transport: [
    { type: 'train', method: '火车', time: '50分钟' },
    { type: 'car', method: '开车', time: '1小时' },
  ],
  highlights: [
    '新教堂',
    '老教堂',
    '市政厅',
    '代尔夫特蓝瓷博物馆',
    '维米尔中心',
    '运河区',
  ],
  tips: [
    '非常适合半日游或一日游',
    '可以参观代尔夫特蓝瓷工厂',
    '市中心很紧凑，步行即可游览',
    '可以和海牙安排在同一天',
  ],
},
```

## 数据质量提示

✅ **好的描述**

- 简洁明了，突出特色
- 包含实用信息
- 有吸引力

❌ **避免**

- 过于冗长
- 信息不准确
- 过于主观的评价

## 需要帮助？

如果不确定如何填写某个字段，可以参考现有的景点数据作为模板。

祝你发现更多美丽的地方！🌍✨
