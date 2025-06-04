# 🚀 快速参考卡片

## 📋 常用命令

### 🔧 本地开发
```bash
# 启动开发服务器
zola serve

# 指定端口
zola serve --port 3000

# 构建网站
zola build

# 检查配置
zola check
```

### 🏗️ 构建选项
```bash
# 智能构建（推荐）
npm run build

# 静态备用构建
npm run build-static

# Bash 构建
npm run build-bash

# 检查部署配置
npm run check
```

### ✍️ 写作流程
```bash
# 1. 创建新文章
cp article-template.md content/blog/new-post.md

# 2. 编辑内容
# 使用您喜欢的编辑器

# 3. 本地预览
zola serve

# 4. 发布
git add .
git commit -m "📝 Add new post: 标题"
git push origin main
```

### 🌐 部署到 Vercel

#### 🚀 智能一键部署（推荐）
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/csssun/taka-blog)

**🧠 智能构建：自动尝试多种方案，确保部署成功！**

#### 📋 手动部署
```bash
# 1. 检查部署配置
npm run check

# 2. 推送到 GitHub
git push origin main

# 3. Vercel 自动部署
# 无需额外操作，几分钟后自动上线
```

## 📝 文章模板

```markdown
+++
title = "文章标题"
description = "文章描述（用于 SEO）"
date = 2024-01-20
updated = 2024-01-20

[extra]
author = "您的名字"
+++

# 文章标题

文章内容...

## 主要内容

### 子标题

更多内容...
```

## 🎨 常用 Markdown 语法

| 语法 | 效果 |
|------|------|
| `# 标题` | # 一级标题 |
| `**粗体**` | **粗体** |
| `*斜体*` | *斜体* |
| `[链接](url)` | [链接](url) |
| `![图片](url)` | 图片 |
| `` `代码` `` | `代码` |

## 🔧 配置文件位置

| 文件 | 用途 |
|------|------|
| `config.toml` | 网站基本配置 |
| `sass/main.scss` | 样式文件 |
| `static/js/main.js` | JavaScript 功能 |
| `templates/` | HTML 模板 |
| `content/` | 内容文件 |

## 🌐 重要链接

- **📖 [完整文档](DOCUMENTATION.md)**
- **🚀 [Vercel 部署](https://vercel.com)**
- **📚 [Zola 官方文档](https://www.getzola.org/documentation/)**
- **🎨 [Font Awesome 图标](https://fontawesome.com/icons)**

## 🆘 常见问题

### CSS 没有加载？
```bash
# 1. 检查 sass 文件
ls sass/main.scss

# 2. 重新构建
zola build

# 3. 强制刷新浏览器
# Ctrl+F5 或 Ctrl+Shift+R
```

### 部署失败？
```bash
# 1. 检查 vercel.json
cat vercel.json

# 2. 检查构建脚本
chmod +x build.sh

# 3. 查看 Vercel 构建日志
```

### 搜索不工作？
```bash
# 1. 检查配置
grep "build_search_index" config.toml

# 2. 确认 JS 文件存在
ls static/js/main.js

# 3. 检查浏览器控制台错误
```

---

💡 **提示**: 将此文件保存为书签，方便随时查看！
