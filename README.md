# 荷兰周边游 - Nethersland Travel Guide 🌍

一个精美的 React 应用，帮助住在荷兰阿尔梅勒（Almere）的用户发现周边精彩的旅游景点。

## ✨ 功能特点

- 🗺️ **分类浏览**：当天来回、2 天周末游、3-4 天游等多种分类
- 📍 **Google Maps 集成**：每个景点都有详细的地图位置
- 🚆 **交通推荐**：提供火车、汽车、飞机等多种交通方式和时间
- 🎯 **景点推荐**：每个目的地都包含主要景点和旅行建议
- 📱 **响应式设计**：完美支持手机、平板和桌面设备
- 🎨 **现代 UI**：使用 Tailwind CSS 打造的美观界面

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 Google Maps API（可选）

如果你想使用 Google Maps 功能，需要配置 API 密钥：

1. 访问 [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
2. 创建一个新项目或选择现有项目
3. 启用 Maps JavaScript API
4. 创建 API 密钥
5. 复制 `.env.example` 为 `.env`
6. 将你的 API 密钥填入 `.env` 文件

```bash
cp .env.example .env
# 编辑 .env 文件，填入你的API密钥
```

**注意**：如果不配置 API 密钥，地图位置会显示为 Google Maps 链接，点击后会在新标签页打开。

### 3. 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:5173 启动

### 4. 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录

## 📦 技术栈

- **React 18** - UI 框架
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **Lucide React** - 图标库
- **Google Maps JavaScript API** - 地图集成

## 🗂️ 项目结构

```
nethersland/
├── src/
│   ├── components/          # React组件
│   │   ├── Header.jsx      # 导航栏组件
│   │   ├── PlaceCard.jsx   # 景点卡片组件
│   │   └── MapComponent.jsx # 地图组件
│   ├── data/
│   │   └── places.js       # 景点数据
│   ├── utils/
│   │   └── loadGoogleMaps.js # Google Maps加载器
│   ├── App.jsx             # 主应用组件
│   ├── main.jsx            # 应用入口
│   └── index.css           # 全局样式
├── index.html              # HTML模板
├── package.json            # 项目配置
├── vite.config.js          # Vite配置
├── tailwind.config.js      # Tailwind配置
└── README.md              # 项目文档
```

## 🎯 推荐景点分类

### 🚗 当天来回

- 阿姆斯特丹 (Amsterdam)
- 乌得勒支 (Utrecht)
- 海牙 (The Hague)
- 鹿特丹 (Rotterdam)
- 羊角村 (Giethoorn)
- 北海沿岸海滩

### 🏖️ 2 天周末游

- 布鲁塞尔 (Brussels, Belgium)
- 布鲁日 (Bruges, Belgium)
- 根特 (Ghent, Belgium)
- 科隆 (Cologne, Germany)
- 杜塞尔多夫 (Düsseldorf, Germany)

### ✈️ 3-4 天游

- 巴黎 (Paris, France)
- 伦敦 (London, UK)

## 🎨 自定义

### 添加新景点

编辑 `src/data/places.js` 文件，按照以下格式添加新的景点：

```javascript
{
  id: 16,
  name: '景点名称',
  country: '国家',
  emoji: '🎡',
  duration: '当天来回',
  category: 'day-trip', // 可选: day-trip, weekend, long-weekend
  distance: '100公里',
  travelTime: '1.5小时',
  description: '景点描述...',
  location: { lat: 52.0000, lng: 5.0000 }, // GPS坐标
  transport: [
    { type: 'train', method: '火车', time: '1小时' },
  ],
  highlights: ['景点1', '景点2'],
  tips: ['建议1', '建议2'],
}
```

### 修改主题颜色

编辑 `tailwind.config.js` 中的 `primary` 颜色配置：

```javascript
colors: {
  primary: {
    // 修改这些颜色值
    500: '#0ea5e9',
    600: '#0284c7',
    // ...
  }
}
```

## 📝 待办事项

- [ ] 添加景点搜索功能
- [ ] 添加收藏/喜欢功能
- [ ] 添加用户评论和评分
- [ ] 集成实时天气信息
- [ ] 添加行程规划功能
- [ ] 多语言支持 (中文/英文/荷兰语)

## 🤝 贡献

欢迎提交问题和拉取请求！

## 📄 许可

MIT License

---

**Enjoy your journey! 🚀 祝你旅途愉快！**
