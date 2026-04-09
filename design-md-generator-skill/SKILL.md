---
name: design-md-generator
description: "Generate DESIGN.md files from any website URL or local source code. This skill extracts design tokens (colors, typography, components, layout, shadows, responsive breakpoints) from live web pages via Puppeteer or from local source files via static analysis, and produces a structured DESIGN.md following the Google Stitch format. Use this skill whenever the user wants to: create a DESIGN.md for a website, extract a site's design system, capture visual design tokens from a URL or local codebase, reverse-engineer a website's styling, generate a design reference document from source code, or replicate a website's look and feel. Also trigger when the user mentions 'design system extraction', 'style guide generation', 'CSS token extraction', 'local source code design analysis', or wants to make their UI match a specific website's design."
---

# Design MD 生成器技能

从任意网站 URL 或本地源码生成结构化的 `DESIGN.md` 文件。支持两种提取模式和中英文双语输出：

- **URL 模式**：使用 Puppeteer 访问在线网站，从实时 DOM 和计算样式中提取设计令牌
- **Local 模式**：通过静态分析本地前端源码文件，从 CSS/SCSS/Less/HTML/JSX/TSX/Vue 等文件中提取设计令牌
- **多语言支持**：输出文档支持中文（`zh`，默认）和英文（`en`）两种语言

两种模式均生成一份全面的设计系统文档，供 AI 代理用于生成一致的 UI。

## 前置条件

`design-md-generator` CLI 工具需要通过 npm 全局安装：

```bash
npm install -g design-md-generator
```

验证安装：

```bash
design-md-generator --version
```

## 核心工作流程

### 第一步：运行提取

#### 方式 A：从在线网站提取（URL 模式）

```bash
design-md-generator url <url> -o <输出路径>/DESIGN.md
```

**URL 模式选项：**

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `-o, --output <path>` | 输出文件路径 | `./DESIGN.md` |
| `-n, --name <name>` | 网站名称（不指定则自动检测） | 自动 |
| `-t, --timeout <ms>` | 导航超时时间（毫秒） | `30000` |
| `-s, --screenshot` | 保存首页截图 | 关闭 |
| `--json` | 同时输出原始令牌的 JSON 文件 | 关闭 |
| `-w, --wait <selector>` | 提取前等待指定的 CSS 选择器 | 无 |
| `-l, --lang <lang>` | 输出语言：`zh`（中文）或 `en`（英文） | `zh` |

**URL 模式示例：**

```bash
# 基本用法
design-md-generator url https://stripe.com

# 完整选项
design-md-generator url https://linear.app -o ./output/linear-DESIGN.md -n "Linear" --json --screenshot

# 需要额外等待时间的单页应用（SPA）
design-md-generator url https://app.example.com -w ".main-content" -t 60000

# 生成英文版 DESIGN.md
design-md-generator url https://stripe.com -l en
```

#### 方式 B：从本地源码提取（Local 模式）

```bash
design-md-generator local <dir> -o <输出路径>/DESIGN.md
```

**Local 模式选项：**

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `-o, --output <path>` | 输出文件路径 | `./DESIGN.md` |
| `-n, --name <name>` | 项目名称（不指定则从 package.json 自动检测） | 自动 |
| `-p, --pages <patterns...>` | 聚焦分析的页面/目录模式 | 全部 |
| `-i, --include <patterns...>` | 仅包含匹配这些模式的文件 | 全部 |
| `-e, --exclude <patterns...>` | 排除匹配这些模式的文件 | 无 |
| `--json` | 同时输出原始令牌的 JSON 文件 | 关闭 |
| `-l, --lang <lang>` | 输出语言：`zh`（中文）或 `en`（英文） | `zh` |

**Local 模式示例：**

```bash
# 分析整个项目
design-md-generator local ./my-react-app

# 聚焦特定页面
design-md-generator local ./my-project -p "src/pages/dashboard" "src/components/shared"

# 排除测试文件
design-md-generator local ./my-project -e "__tests__" "*.test"

# 仅分析样式目录
design-md-generator local ./my-project -i "src/styles" "src/theme"

# 生成英文版 DESIGN.md
design-md-generator local ./my-react-app -l en
```

**Local 模式支持的文件类型：**

| 类别 | 扩展名 |
|------|--------|
| 样式文件 | `.css`, `.scss`, `.sass`, `.less`, `.styl`, `.stylus` |
| 模板文件 | `.html`, `.htm`, `.jsx`, `.tsx`, `.vue`, `.svelte` |
| 配置文件 | `tailwind.config.*`, `theme.*`, `tokens.*`, `design-tokens.*` |

**Local 模式适用场景：**
- 本地开发中的项目，无需部署即可生成设计文档
- 需要认证才能访问的页面（URL 模式无法处理）
- 需要针对特定页面或组件生成设计文档
- CI/CD 流水线中自动生成设计文档
- 自动检测并解析 Tailwind CSS 配置文件

### 第二步：审查和优化输出

生成的 DESIGN.md 遵循 Google Stitch 的 9 大章节格式：

| # | 章节 | 提取内容 |
|---|------|----------|
| 1 | **视觉主题与氛围** | 风格基调、信息密度、设计哲学、关键特征 |
| 2 | **色彩体系与角色** | 语义化颜色及十六进制值、CSS 自定义属性、功能角色 |
| 3 | **排版规则** | 字体族、完整层级表（字号、字重、行高、字间距） |
| 4 | **组件样式** | 按钮、卡片、徽章、输入框、导航栏及其完整 CSS 属性 |
| 5 | **布局原则** | 间距比例尺、Grid/Flex 用法、留白哲学、圆角比例尺 |
| 6 | **层深与阴影** | 阴影系统及层级、表面层次结构、阴影设计哲学 |
| 7 | **设计规范与禁忌** | 针对该网站的设计护栏和反模式 |
| 8 | **响应式行为** | 断点、触控目标尺寸、折叠策略 |
| 9 | **AI 代理提示指南** | 快速颜色参考、即用型组件提示、迭代指南 |

生成后，建议审查以下方面：

- **颜色准确性**：URL 模式从 DOM 提取计算后的颜色，部分颜色可能来自第三方组件或广告；Local 模式从源码静态提取，可能包含未使用的颜色定义——请移除无关颜色。
- **排版**：URL 模式下如果网站通过 JavaScript 加载 Web 字体，可能显示为系统回退字体；Local 模式直接读取 font-family 声明，更准确。
- **组件状态**：两种模式均仅捕获默认状态（不含 hover/focus/active）。如需交互状态，请手动补充。
- **深色模式**：URL 模式捕获默认主题；Local 模式分析源码中的静态声明。如有主题切换逻辑，需手动补充。

### 第三步：使用 DESIGN.md

将生成的 `DESIGN.md` 放置在项目根目录，然后告诉你的 AI 编码代理：

> "按照 DESIGN.md 中的设计系统，帮我构建一个页面"

AI 代理会读取 DESIGN.md，生成与提取的设计令牌（颜色、排版、间距、阴影、组件样式）一致的 UI。

## 编程接口

该工具也可以作为 Node.js 库使用：

```javascript
const { generateDesignMdFromUrl, generateDesignMdFromLocal } = require('design-md-generator');

// 模式一：从 URL 提取（默认中文输出）
const result1 = await generateDesignMdFromUrl('https://stripe.com', {
  outputPath: './DESIGN.md',
  siteName: 'Stripe',
  timeout: 30000,
  screenshot: true,
  outputJson: true,
  lang: 'zh', // 'zh'（中文，默认）或 'en'（英文）
});

// 模式二：从本地源码提取（英文输出）
const result2 = await generateDesignMdFromLocal('./my-project', {
  outputPath: './DESIGN.md',
  siteName: 'My Project',
  pages: ['src/pages/home', 'src/components'],
  exclude: ['__tests__'],
  outputJson: true,
  lang: 'en',
});

// 两种模式返回相同结构
// result.markdown  — DESIGN.md 内容字符串
// result.tokens    — 原始设计令牌对象
// result.colorCount, result.fontCount, result.componentCount — 统计数据
```

## 提取内容详解

### URL 模式

基于 Puppeteer 的提取器访问首页并捕获以下内容：

- **CSS 自定义属性**：从可访问的样式表中提取所有 `--custom-property` 值
- **颜色**：从 500+ DOM 元素中采样背景色、文字色、边框色、轮廓色，按语义角色分类
- **排版**：字体族及使用频率，完整层级表（字号/字重/行高/字间距/文本转换）
- **组件**：按钮（最多 8 种变体）、卡片（最多 6 种）、徽章、输入框、导航栏
- **布局**：间距比例尺、最大内容宽度、CSS Grid 与 Flexbox 使用情况、圆角比例尺
- **阴影**：所有不同的 box-shadow 值及使用频率
- **断点**：从可访问的样式表中提取媒体查询断点
- **元信息**：页面标题、描述、主题色、OG 图片、深色/浅色模式检测

### Local 模式

基于静态分析的提取器扫描源码文件并提取以下内容：

- **CSS 自定义属性**：从所有样式文件中提取 `--custom-property` 声明
- **颜色**：从源码中提取 hex、rgb/rgba、hsl/hsla 颜色值，根据上下文推断语义角色
- **排版**：从 font-family、font-size、font-weight、line-height、letter-spacing 声明提取
- **组件**：通过选择器模式匹配提取按钮、卡片、输入框、导航栏、徽章的样式块
- **布局**：从 padding、margin、gap 声明提取间距比例尺，检测 Grid/Flex 使用情况
- **阴影**：从 box-shadow 声明提取
- **断点**：从 @media 规则中提取
- **Tailwind 配置**：自动检测并解析 tailwind.config.* 中的颜色、字体、间距、断点配置
- **元信息**：从 package.json 读取项目名称和描述

## 常见问题排查

| 问题 | 模式 | 解决方案 |
|------|------|----------|
| `net::ERR_NAME_NOT_RESOLVED` | URL | 检查 URL 是否正确且可访问 |
| 超时错误 | URL | 增加超时时间：`-t 60000` |
| SPA 中样式缺失 | URL | 使用 `--wait` 等待内容加载：`-w ".app-container"` |
| 跨域 CSS 未提取 | URL | 外部 CDN 的 CSS 变量可能被浏览器安全策略阻止 |
| Puppeteer 启动失败 | URL | 确保 Chrome/Chromium 可用；尝试 `npx puppeteer browsers install chrome` |
| 提取到的颜色很少 | URL | 网站可能大量使用 CSS-in-JS 或内联样式 |
| 目录未找到 | Local | 检查路径是否正确，使用绝对路径或相对路径 |
| 样式文件未扫描到 | Local | 检查文件扩展名是否在支持列表中，确认目录未被自动忽略 |
| Tailwind 配置未解析 | Local | 确保配置文件名为 `tailwind.config.js/ts/mjs/cjs` |
| CSS-in-JS 样式缺失 | Local | Local 模式不支持运行时 CSS 方案，建议使用 URL 模式 |

## 已知限制

### URL 模式
- 仅提取**首页**（单页访问）
- 仅捕获**默认状态**（不含 hover、focus、active、disabled）
- **跨域样式表**可能阻止 CSS 变量提取
- **JavaScript 渲染的内容**需要使用 `--wait` 参数
- **需要认证的页面**不支持（仅支持公开页面）
- **深色模式**需要单独运行并覆盖浏览器偏好设置

### Local 模式
- **CSS-in-JS**：不支持 styled-components、emotion 等运行时 CSS 方案
- **动态样式**：无法捕获通过 JavaScript 动态生成的样式
- **计算值**：无法获取浏览器计算后的实际值（如 `calc()` 表达式）
- **Tailwind 工具类**：仅从配置文件提取，不解析模板中的工具类使用
- **主题切换**：仅分析源码中的静态声明
