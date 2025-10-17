# 快速启动指南 🚀

## 第一步：安装依赖

```bash
npm install
```

这会安装所有必要的依赖包，包括 React、Vite、Tailwind CSS 等。

## 第二步：配置 Google Maps API（可选）

### 为什么需要？

- 如果配置了 Google Maps API，景点详情会显示交互式地图
- 如果不配置，会显示"在 Google Maps 中打开"的链接，同样可以使用

### 如何配置？

1. **获取 API 密钥**

   - 访问 [Google Cloud Console](https://console.cloud.google.com/)
   - 创建新项目或选择现有项目
   - 启用 "Maps JavaScript API"
   - 在"凭据"中创建 API 密钥

2. **设置环境变量**
   ```bash
   cp .env.example .env
   ```
3. **编辑 .env 文件**
   ```
   VITE_GOOGLE_MAPS_API_KEY=你的API密钥
   ```

### 免费额度

Google Maps 提供每月$200 的免费额度，对于个人使用绰绰有余。

## 第三步：启动开发服务器

```bash
npm run dev
```

浏览器会自动打开 http://localhost:5173

## 第四步：开始使用

1. 在顶部导航栏选择不同的分类查看景点
2. 点击景点卡片的"查看详情和地图"展开完整信息
3. 查看交通方式、推荐景点和旅行建议

## 构建生产版本

```bash
npm run build
```

构建产物会生成在 `dist` 目录，可以部署到任何静态网站托管服务。

## 部署建议

### Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 设置环境变量 `VITE_GOOGLE_MAPS_API_KEY`
4. 自动部署完成

### Netlify

1. 将代码推送到 GitHub
2. 在 Netlify 中导入项目
3. Build command: `npm run build`
4. Publish directory: `dist`
5. 在环境变量中添加 `VITE_GOOGLE_MAPS_API_KEY`

### GitHub Pages

```bash
npm run build
# 将 dist 目录推送到 gh-pages 分支
```

## 故障排除

### 地图不显示？

- 检查 `.env` 文件是否正确配置
- 确认 API 密钥已启用 Maps JavaScript API
- 查看浏览器控制台是否有错误信息

### 样式异常？

- 清除浏览器缓存
- 确认所有依赖都已正确安装
- 重启开发服务器

### 端口被占用？

Vite 会自动使用下一个可用端口，或者你可以在 `vite.config.js` 中指定：

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 指定端口
  },
});
```

## 需要帮助？

查看完整的 README.md 文档，或者查阅：

- [React 文档](https://react.dev/)
- [Vite 文档](https://vitejs.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Google Maps API 文档](https://developers.google.com/maps/documentation/javascript)

祝你使用愉快！✨
