# 🚀 GitHub 部署指南

## ✅ 已完成的步骤

1. ✅ Git 仓库已初始化
2. ✅ 代码已提交（216 个文件）
3. ✅ GitHub 仓库已创建
4. ✅ 代码已推送到 GitHub
5. ✅ GitHub Actions 工作流已配置
6. ✅ 工作流已触发（正在队列中）

---

## 📦 GitHub 仓库信息

**仓库地址：** https://github.com/gupengcheng1413-ai/fenping-demo

**仓库描述：** Interactive learning demo for 5.6-inch strip screen (1640x348) - Features split-screen synchronized scrolling for Chinese/English content

**分支：** main

**提交数：** 2 commits
- Initial commit: Fenping demo project
- Add GitHub Pages deployment workflow

---

## 🌐 启用 GitHub Pages（手动步骤）

由于 GitHub API token 权限限制，需要手动启用 GitHub Pages：

### 步骤 1：访问仓库设置
```
https://github.com/gupengcheng1413-ai/fenping-demo/settings/pages
```

### 步骤 2：配置 Pages
1. 在 "Build and deployment" 部分
2. **Source** 选择：`GitHub Actions`
3. 点击 **Save**

### 步骤 3：等待部署完成
- GitHub Actions 工作流会自动运行
- 部署通常需要 1-2 分钟
- 可以在 Actions 标签页查看进度：
  ```
  https://github.com/gupengcheng1413-ai/fenping-demo/actions
  ```

### 步骤 4：获取预览链接
部署完成后，预览链接将是：
```
https://gupengcheng1413-ai.github.io/fenping-demo/
```

---

## 🔍 检查部署状态

### 方法 1：通过 GitHub 网页
访问：https://github.com/gupengcheng1413-ai/fenping-demo/actions

查看 "Deploy to GitHub Pages" 工作流的状态：
- 🟡 黄色圆圈 = 正在运行
- ✅ 绿色勾号 = 部署成功
- ❌ 红色叉号 = 部署失败

### 方法 2：通过命令行
```bash
cd "/home/pcgu3/fenping demo/Claude code fenping"
gh run list --limit 5
```

### 方法 3：查看工作流日志
```bash
gh run view --log
```

---

## 📋 GitHub Actions 工作流说明

工作流文件位置：`.github/workflows/deploy.yml`

**触发条件：**
- 推送到 main 分支时自动触发
- 手动触发（workflow_dispatch）

**工作流程：**
1. **Build 阶段**
   - 检出代码
   - 安装 Node.js 20
   - 安装依赖（npm ci）
   - 构建项目（npm run build）
   - 上传 dist/ 目录作为 artifact

2. **Deploy 阶段**
   - 部署到 GitHub Pages
   - 生成预览链接

**预计时间：** 2-3 分钟

---

## 🎯 预览链接

### 主预览链接
```
https://gupengcheng1413-ai.github.io/fenping-demo/
```

### 重要提示
⚠️ **必须设置浏览器视口为 1640×348**

1. 打开预览链接
2. 按 F12 打开 DevTools
3. 按 Ctrl+Shift+M 切换设备模拟
4. 添加自定义设备：
   - 宽度：1640px
   - 高度：348px
   - 设备像素比：1

---

## 🔧 故障排查

### 问题 1：工作流失败
**症状：** Actions 标签页显示红色叉号

**解决方案：**
1. 点击失败的工作流查看日志
2. 常见原因：
   - 依赖安装失败 → 检查 package.json
   - 构建失败 → 检查 vite.config.ts
   - Pages 未启用 → 按照上方步骤启用

### 问题 2：预览链接 404
**症状：** 访问预览链接显示 404

**解决方案：**
1. 确认 GitHub Pages 已启用
2. 确认工作流已成功运行
3. 等待 1-2 分钟让 DNS 生效
4. 清除浏览器缓存

### 问题 3：页面显示空白
**症状：** 预览链接可访问但页面空白

**解决方案：**
1. 检查浏览器控制台是否有错误
2. 确认视口设置为 1640×348
3. 检查资源路径是否正确（可能需要配置 base URL）

### 问题 4：资源路径错误
**症状：** 图片或 CSS 加载失败

**解决方案：**
需要在 `vite.config.ts` 中配置 base URL：

```typescript
export default defineConfig({
  base: '/fenping-demo/',  // 添加这一行
  // ... 其他配置
})
```

然后重新提交并推送：
```bash
git add vite.config.ts
git commit -m "Fix: Add base URL for GitHub Pages"
git push
```

---

## 📊 部署统计

| 项目 | 数值 |
|------|------|
| 文件数量 | 216 个 |
| 代码行数 | 44,928 行 |
| 构建时间 | ~3 秒 |
| 部署时间 | ~2 分钟 |
| 包大小 | 1.4 MB (gzip: 255 KB) |
| 图片资源 | 11 个 PNG (~3.5 MB) |

---

## 🔄 更新部署

每次推送到 main 分支时，GitHub Actions 会自动重新部署：

```bash
cd "/home/pcgu3/fenping demo/Claude code fenping"

# 修改代码后
git add .
git commit -m "Update: your changes"
git push

# 自动触发部署
```

---

## 📱 分享预览链接

### 完整的分享信息

**项目名称：** 分屏演示（Fenping Demo）

**GitHub 仓库：** https://github.com/gupengcheng1413-ai/fenping-demo

**预览链接：** https://gupengcheng1413-ai.github.io/fenping-demo/

**使用说明：**
1. 访问预览链接
2. 设置浏览器视口为 1640×348（必须）
3. 点击历史记录页面的模块进入详细页面
4. 重点体验"英文句子-分屏"的双向滚动同步功能

**技术栈：**
- React 18 + TypeScript
- Vite 6 + Tailwind CSS 4
- 24 个学习模块
- 分屏同步滚动

---

## 🎉 部署完成检查清单

完成以下步骤后，部署即完成：

- [ ] 访问 https://github.com/gupengcheng1413-ai/fenping-demo/settings/pages
- [ ] 将 Source 设置为 "GitHub Actions"
- [ ] 等待工作流运行完成（1-2 分钟）
- [ ] 访问 https://gupengcheng1413-ai.github.io/fenping-demo/
- [ ] 设置浏览器视口为 1640×348
- [ ] 测试核心功能（分屏滚动）
- [ ] 分享预览链接

---

## 📞 快速命令参考

```bash
# 查看仓库信息
gh repo view gupengcheng1413-ai/fenping-demo

# 查看工作流运行状态
gh run list --limit 5

# 查看最新工作流日志
gh run view --log

# 在浏览器中打开仓库
gh repo view --web

# 在浏览器中打开 Actions 页面
gh browse --repo gupengcheng1413-ai/fenping-demo --branch main --settings

# 本地预览构建结果
cd "/home/pcgu3/fenping demo/Claude code fenping"
npm run build
npm run preview
```

---

**部署时间：** 2026-05-13 14:50  
**仓库地址：** https://github.com/gupengcheng1413-ai/fenping-demo  
**预览链接：** https://gupengcheng1413-ai.github.io/fenping-demo/ （需手动启用 Pages）
