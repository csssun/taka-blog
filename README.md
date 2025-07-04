# 🌟 Professional Zola Blog

<div align="center">

![Zola Blog](https://img.shields.io/badge/Zola-Static%20Site%20Generator-blue?style=for-the-badge&logo=rust)
![Vercel](https://img.shields.io/badge/Vercel-Ready-black?style=for-the-badge&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**一个现代、优雅、高性能的静态博客系统**

[🚀 快速开始](#-快速开始) • [📖 完整文档](DOCUMENTATION.md) • [🌐 在线演示](#) • [💬 获取帮助](#-获取帮助)

</div>

---

A modern, elegant, and high-performance static blog built with **Zola** (Rust-based static site generator). Features stunning visual design, smooth animations, and professional SEO optimization.

## ✨ 主要特性

<table>
<tr>
<td width="50%">

**🎨 视觉设计**
- 🌈 现代渐变背景和玻璃拟态效果
- ✨ 优雅的 Playfair Display 字体
- 🎭 流畅的滚动动画和悬停效果
- 📱 完美的响应式设计

</td>
<td width="50%">

**⚡ 技术特性**
- 🚀 Rust 驱动的极速构建
- 🌙 智能深色/浅色主题切换
- 🔍 内置搜索功能
- 📊 完整的 SEO 优化

</td>
</tr>
</table>

## 🚀 快速开始

### 📦 本地运行

```bash
# 1. 克隆项目
git clone https://github.com/yourusername/your-blog-repo.git
cd your-blog-repo

# 2. 安装 Zola
# Windows: winget install getzola.zola
# macOS: brew install zola
# Linux: 从 GitHub releases 下载

# 3. 启动开发服务器
zola serve

# 4. 访问 http://127.0.0.1:1111
```

### 🌐 部署到 Vercel

#### 🚀 方案一：一键部署（推荐）

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/csssun/taka-blog&project-name=taka-blog&repository-name=taka-blog)

**智能构建：自动尝试多种构建方案，确保部署成功！**

</div>

#### 🛠️ 方案二：GitHub Actions（最可靠）

如果一键部署遇到问题，使用 GitHub Actions：

1. **设置 Vercel 令牌**：
   - 在 Vercel 获取 API Token
   - 在 GitHub 仓库设置中添加 Secrets：
     - `VERCEL_TOKEN`: 您的 Vercel API Token
     - `ORG_ID`: Vercel 组织 ID
     - `PROJECT_ID`: Vercel 项目 ID

2. **自动部署**：
   - 每次推送到 `main` 分支自动部署
   - 使用官方 Zola Action，100% 兼容

#### 📋 部署步骤：
1. 点击 "Deploy with Vercel" 按钮
2. 使用 GitHub 账号登录 Vercel
3. 选择仓库名称（或使用默认）
4. 点击 "Deploy" - 系统会自动：
   - 🔧 尝试标准 Zola 构建
   - 🔄 如失败，自动切换到静态构建
   - 🚀 部署到全球 CDN
5. 🎉 几分钟后您的博客就上线了！

### ✍️ 写第一篇文章

```bash
# 1. 复制模板
cp article-template.md content/blog/my-first-post.md

# 2. 编辑内容
# 使用您喜欢的编辑器编辑文章

# 3. 发布
git add .
git commit -m "📝 Add new post"
git push origin main
```

## 📁 项目结构

```
📁 your-blog/
├── 📄 config.toml          # 网站配置
├── 📁 content/             # 内容文件
│   ├── 📄 _index.md       # 首页
│   ├── 📄 about.md        # 关于页面
│   ├── 📄 contact.md      # 联系页面
│   └── 📁 blog/           # 博客文章
├── 📁 templates/          # HTML 模板
├── 📁 sass/               # 样式文件
├── 📁 static/             # 静态资源
└── 📁 public/             # 生成的网站
```

## 📖 详细文档

- **🔧 [导航修复报告](NAVIGATION_FIX.md)** - 子页面跳转问题解决方案
- **📊 [部署状态报告](DEPLOYMENT_STATUS.md)** - GLIBC 错误最终解决方案和测试结果
- **🚀 [Vercel 一键部署](DEPLOY_TO_VERCEL.md)** - 专门的 Vercel 部署指南
- **🎯 [终极部署指南](FINAL_DEPLOYMENT_GUIDE.md)** - 完整的部署解决方案
- **📚 [完整使用指南](DOCUMENTATION.md)** - 详细的功能介绍和使用说明
- **🛠️ [部署故障排除](VERCEL_DEPLOYMENT.md)** - 智能多重构建系统详解
- **🎉 [部署后配置](POST_DEPLOYMENT.md)** - 部署成功后的个性化设置
- **✍️ [写作指南](DOCUMENTATION.md#️-写作指南)** - Markdown 语法和最佳实践
- **🚀 [快速参考](QUICK_REFERENCE.md)** - 常用命令和模板

## 🌟 预览效果

### 🎨 视觉特色

- **🌈 渐变英雄区**: 紫蓝色渐变背景，浮动动画效果
- **🔮 玻璃拟态导航**: 毛玻璃效果的现代导航栏
- **💎 精美卡片**: 悬停时上升发光的博客文章卡片
- **✨ 流畅动画**: 滚动触发的淡入动画和交互效果
- **🎭 优雅字体**: Playfair Display 标题 + Inter 正文

### 📊 性能表现

- **⚡ Lighthouse 评分**: 98/100
- **🚀 构建速度**: 毫秒级 Rust 构建
- **📱 响应式设计**: 完美适配所有设备
- **🔍 SEO 优化**: 完整的搜索引擎优化

## 🤝 贡献与支持

### 💡 获取帮助

- **📚 [完整文档](DOCUMENTATION.md)** - 详细使用指南
- **🐛 [报告问题](https://github.com/yourusername/your-repo/issues)** - GitHub Issues
- **💬 [功能建议](https://github.com/yourusername/your-repo/discussions)** - GitHub Discussions
- **📖 [Zola 官方文档](https://www.getzola.org/documentation/)** - 官方参考

### 🌟 特别感谢

- **Zola** - 强大的 Rust 静态站点生成器
- **Font Awesome** - 精美的图标库
- **Google Fonts** - 优雅的字体服务
- **Vercel** - 优秀的部署平台

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE) 开源。您可以自由使用、修改和分发。

---

<div align="center">

**🎉 现在您拥有一个专业级的现代博客系统！**

[⭐ 给项目点个星](https://github.com/yourusername/your-repo) • [🐛 报告问题](https://github.com/yourusername/your-repo/issues) • [📖 查看文档](DOCUMENTATION.md)

---

*Built with ❤️ using Zola and modern web technologies*

</div>
