# 部署到 GitHub Pages

本项目配置了自动部署到 GitHub Pages 的功能。

## 自动部署流程

当你推送代码到 `master` 分支时，GitHub Actions 会自动：

1. 安装依赖（使用 pnpm）
2. 构建项目
3. 部署到 GitHub Pages

## 首次配置步骤

### 1. 启用 GitHub Pages

在 GitHub 仓库中进行以下设置：

1. 打开仓库的 **Settings** 页面
2. 在左侧菜单中找到 **Pages**
3. 在 **Source** 部分，选择：
   - Source: **GitHub Actions**

### 2. 推送代码

```bash
git add .
git commit -m "feat: 添加 GitHub Pages 自动部署"
git push origin master
```

### 3. 查看部署状态

1. 在仓库页面点击 **Actions** 标签
2. 你会看到 "Deploy to GitHub Pages" 工作流正在运行
3. 等待构建和部署完成（通常需要 1-3 分钟）

### 4. 访问网站

部署成功后，你的网站将在以下地址可用：

```
https://<your-username>.github.io/netherlands/
```

## 本地测试

在推送到 GitHub 之前，建议先在本地测试构建：

```bash
# 安装依赖
pnpm install

# 本地开发
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 注意事项

- **base 路径**：`vite.config.js` 中已配置 `base: '/netherlands/'`，这是 GitHub Pages 子路径部署所必需的
- **分支**：默认从 `master` 分支部署，如果你的主分支是 `main`，需要修改 `.github/workflows/deploy.yml` 中的分支名
- **构建产物**：`dist` 目录已在 `.gitignore` 中，不会被提交到仓库

## 自定义域名（可选）

如果你有自定义域名：

1. 在项目根目录创建 `public/CNAME` 文件，内容为你的域名
2. 在域名 DNS 设置中添加 CNAME 记录指向 `<your-username>.github.io`
3. 在 GitHub Pages 设置中配置自定义域名

## 故障排除

### 部署失败

1. 检查 Actions 标签页的错误日志
2. 确保 GitHub Pages 已启用
3. 确保仓库有正确的权限设置

### 页面显示 404

1. 确认 `vite.config.js` 中的 `base` 路径与仓库名匹配
2. 确认 GitHub Pages 的 Source 设置为 "GitHub Actions"
3. 等待几分钟让 DNS 传播

### 路由问题

对于单页应用 (SPA)，如果使用 React Router 的 BrowserRouter：

- 刷新页面时可能出现 404
- 建议使用 HashRouter 或配置 404.html 重定向
