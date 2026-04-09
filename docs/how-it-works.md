# design.md 生成原理

## 概述

`design-md-generator` 是一个设计系统逆向工程工具，能够从**在线网站**或**本地源码**中自动提取设计 Token（Design Tokens），并生成结构化的 `DESIGN.md` 文件。整个流程分为三个核心阶段：**提取（Extract）→ 转换（Transform）→ 生成（Generate）**。

## 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                     CLI 入口 (cli.js)                    │
│         url <url> [options]  |  local <dir> [options]    │
└──────────────┬──────────────────────────┬───────────────┘
               │                          │
               ▼                          ▼
┌──────────────────────┐   ┌──────────────────────────────┐
│   流程编排 (index.js) │   │    流程编排 (index.js)        │
│ generateDesignMdFromUrl│   │ generateDesignMdFromLocal    │
└──────────┬───────────┘   └──────────┬───────────────────┘
           │                          │
           ▼                          ▼
┌──────────────────────┐   ┌──────────────────────────────┐
│  在线提取器            │   │  本地提取器                    │
│  (extractor.js)       │   │  (local-extractor.js)        │
│  Puppeteer + DOM API  │   │  静态文件分析 + 正则匹配       │
└──────────┬───────────┘   └──────────┬───────────────────┘
           │                          │
           └──────────┬───────────────┘
                      │
                      ▼  统一的 Design Tokens 数据结构
           ┌──────────────────────┐
           │  生成器               │
           │  (generator.js)      │
           │  Tokens → Markdown   │
           │  支持中/英文 (i18n)   │
           └──────────┬───────────┘
                      │
                      ▼
              📄 DESIGN.md
```

## 阶段一：设计 Token 提取

工具支持两种提取模式，最终输出**统一格式**的 Design Tokens 对象。

### 模式 A：在线提取（extractor.js）

通过 Puppeteer 启动无头浏览器，访问目标网站，在真实 DOM 环境中提取计算后的样式。

**流程：**

1. **启动浏览器** — 使用 Puppeteer 以 headless 模式启动 Chromium，设置 1440×900 视口和 2x 设备像素比
2. **导航到目标页面** — 等待 `networkidle2`（网络空闲）后额外等待 2 秒，确保动画/过渡完成
3. **在浏览器内执行提取** — 通过 `page.evaluate()` 在页面上下文中运行 9 个提取器

**9 个提取器详解：**

| # | 提取器 | 提取内容 | 实现方式 |
|---|--------|----------|----------|
| 1 | `extractCSSVariables()` | CSS 自定义属性（CSS Variables） | 遍历 `document.styleSheets` 的所有规则，收集 `--` 开头的属性，再从 `:root` 计算值补充 |
| 2 | `extractColors()` | 颜色体系 | 采样最多 500 个 DOM 元素，读取 `color`、`backgroundColor`、`borderColor` 等计算样式；同时从语义化选择器（`body`、`header`、`nav`、`h1-h3`、`a`、`button`、`input` 等）提取语义颜色 |
| 3 | `extractTypography()` | 排版信息 | 遍历所有文本元素（h1-h6、p、a、button、span 等），收集 `fontFamily`、`fontSize`、`fontWeight`、`lineHeight`、`letterSpacing`，按字号降序排列并去重 |
| 4 | `extractComponents()` | 组件样式 | 通过选择器匹配按钮、卡片、输入框、导航、徽章等组件，提取其计算样式（背景、圆角、阴影、边框、内边距等） |
| 5 | `extractLayout()` | 布局与间距 | 采样 300 个元素的 padding/margin/gap 值，统计间距分布，检测基础间距单位（4px/8px 等），收集 border-radius 值，统计 Grid/Flexbox 使用量 |
| 6 | `extractShadows()` | 阴影与层深 | 采样 400 个元素的 `boxShadow` 计算值，按使用频率排序 |
| 7 | `extractMeta()` | 页面元信息 | 读取 `<title>`、`<meta>` 标签（description、theme-color、og:image、og:title）、favicon，检测深色/浅色主题 |
| 8 | `extractMediaQueries()` | 响应式断点 | 遍历所有样式表的 `@media` 规则，提取 `min-width`/`max-width` 断点值 |
| 9 | `extractStructureSummary()` | 页面结构摘要 | 递归遍历 `<body>` 子元素（最深 3 层），输出带 class/id 的标签树 |

**关键技术细节：**

- **采样策略**：为避免性能问题，颜色提取采样 500 个元素、布局采样 300 个、阴影采样 400 个，采用均匀分布采样（`Math.floor((i / sampleSize) * allElements.length)`）
- **颜色解析**：支持 `#hex`、`rgb()`、`rgba()` 格式，统一转换为 6 位小写 hex
- **去重机制**：每个提取器都使用 `Set` 或 `Map` 进行去重，避免重复数据
- **跨域保护**：遍历样式表时 catch 跨域异常，静默跳过不可访问的外部样式表

### 模式 B：本地提取（local-extractor.js）

通过静态文件分析和正则匹配，从本地源码中提取设计 Token，无需浏览器。

**流程：**

1. **文件发现** — 递归扫描目录，按扩展名分类：
   - 样式文件：`.css`、`.scss`、`.sass`、`.less`、`.styl`、`.wxss`、`.acss`
   - 模板文件：`.html`、`.jsx`、`.tsx`、`.vue`、`.svelte`、`.wxml`、`.axml`、`.swan`
   - 配置文件：`tailwind.config.*`、`theme.*`、`tokens.*` 等
   - 自动忽略：`node_modules`、`.git`、`dist`、`build` 等目录

2. **内容读取与合并** — 读取所有样式文件内容，同时从模板文件中提取 `<style>` 块

3. **正则匹配提取** — 对合并后的内容执行以下提取：

| 提取项 | 正则策略 |
|--------|----------|
| 颜色 | 匹配 `#hex`、`rgb()`、`rgba()`、`hsl()`、`hsla()` 模式，通过上下文（前 120 字符）推断颜色角色（background/text/border 等） |
| CSS 变量 | 匹配 `--variable-name: value` 模式 |
| 排版 | 匹配 `font-family`、`font-size`、`font-weight`、`line-height`、`letter-spacing` 声明，通过选择器推断排版角色 |
| 组件 | 通过选择器模式（`.btn`、`.card`、`nav` 等）定位 CSS 规则块，提取块内属性 |
| 布局 | 匹配 `padding`、`margin`、`gap`、`border-radius`、`display`、`max-width` 声明 |
| 阴影 | 匹配 `box-shadow` 声明 |
| 断点 | 匹配 `@media` 规则中的 `min-width`/`max-width` 值 |

4. **Tailwind 配置合并** — 如果发现 `tailwind.config.*` 文件，解析其中的 `colors`、`fontFamily`、`spacing`、`screens` 配置，合并到提取结果中

5. **项目元信息** — 从 `package.json` 读取项目名称和描述

### 统一的 Design Tokens 数据结构

两种提取模式最终输出相同格式的对象：

```javascript
{
  cssVariables: { '--primary': '#3b82f6', ... },
  colors: {
    palette: [{ hex: '#3b82f6', count: 15, roles: ['text', 'background'] }, ...],
    semantic: { 'heading-fg': '#1a1a1a', 'button-bg': '#3b82f6', ... },
    pageBg: '#ffffff',
    pageColor: '#1a1a1a',
  },
  typography: {
    fontFamilies: [{ family: 'Inter', count: 42 }, ...],
    scale: [{ tag: 'h1', role: 'Display / Hero', fontSize: '48px', fontWeight: '700', ... }, ...],
  },
  components: {
    buttons: [{ background: '#3b82f6', color: '#ffffff', borderRadius: '8px', ... }],
    cards: [{ background: '#f8f9fa', borderRadius: '12px', boxShadow: '...', ... }],
    inputs: [...],
    badges: [...],
    navigation: { background: '#ffffff', position: 'fixed', ... },
    navLinks: { color: '#333', fontSize: '14px', ... },
  },
  layout: {
    maxContentWidth: '1280px',
    spacingScale: [4, 8, 12, 16, 24, 32, 48, 64],
    baseUnit: 8,
    borderRadiusScale: [{ radius: '8px', count: 25 }, ...],
    gridUsage: 5,
    flexUsage: 42,
  },
  shadows: [{ shadow: '0 1px 3px rgba(0,0,0,0.1)', count: 12 }, ...],
  breakpoints: [640, 768, 1024, 1280],
  meta: { title: 'My Site', isDarkTheme: false, ... },
  structure: '<header>...',
  url: 'https://example.com',
  timestamp: '2026-04-09T12:00:00.000Z',
}
```

## 阶段二：Markdown 生成（generator.js）

生成器将 Design Tokens 转换为结构化的 9 章节 DESIGN.md 文件，灵感来自 Google Stitch 设计系统格式。

### 9 章节结构

| 章节 | 标题 | 内容 |
|------|------|------|
| 1 | 视觉主题与氛围 | 整体设计风格描述（深色/浅色、扁平/层次、色彩丰富度），关键特征列表 |
| 2 | 色彩体系与角色 | 主色、强调色、中性色阶、表面与边框色，CSS 自定义属性。颜色按 HSL 色相/饱和度自动分类 |
| 3 | 排版规则 | 字体族、排版层级表（角色/字号/字重/行高/字间距），排版原则 |
| 4 | 组件样式 | 按钮、卡片、徽章、输入框、导航的具体样式参数 |
| 5 | 布局原则 | 间距系统（基础单位+比例尺）、栅格容器、留白哲学、圆角比例尺 |
| 6 | 层深与阴影 | 阴影层级表，阴影设计哲学（多层/克制/带色调） |
| 7 | 设计规范与禁忌 | 推荐做法（Do's）和避免做法（Don'ts），基于提取数据动态生成 |
| 8 | 响应式行为 | 断点表、触控目标规范、折叠策略 |
| 9 | AI 代理提示指南 | 快速颜色参考、示例组件 Prompt、迭代指南——专为 AI 编码助手设计 |

### 智能推断逻辑

生成器不是简单地罗列数据，而是包含多处智能推断：

- **氛围描述**：根据 `isDarkTheme`、阴影数量、颜色数量自动组合描述词（如"深色主题、沉浸式、层次分明、丰富的色彩体系"）
- **颜色分类**：通过 HSL 转换，将颜色自动归类为中性色（饱和度 < 10%）、边框色、表面色、强调色
- **留白哲学**：根据平均间距值判断为"宽松"（> 24px）、"均衡"（> 12px）或"紧凑"
- **Do's & Don'ts**：根据主题（深色/浅色）、圆角大小、阴影使用情况动态生成建议
- **断点命名**：将数值断点映射为语义化名称（手机/平板/桌面等）

### 国际化（i18n）

生成器内置完整的中英文字典（`i18n` 对象），通过 `lang` 参数（`zh`/`en`）切换输出语言，默认中文。所有章节标题、描述文本、表格表头、建议文案均支持双语。

## 阶段三：输出与编排（index.js）

`index.js` 作为流程编排层，负责：

1. **参数处理** — 解析输出路径、站点名称、语言等选项
2. **调用提取器** — 根据模式调用 `extractDesignTokens()` 或 `extractDesignTokensFromLocal()`
3. **站点名称推断** — 优先使用用户指定名称，其次从 `og:title`/`<title>` 提取，最后从 URL 域名推导
4. **调用生成器** — 将 Tokens 和站点名称传入 `generateDesignMd()`
5. **文件写入** — 将 Markdown 写入指定路径，可选输出原始 JSON Tokens
6. **统计汇总** — 返回颜色数、字体数、组件数等统计信息

## 数据流总结

```
用户输入 (URL / 本地目录)
    │
    ▼
┌─────────────────────────────┐
│  提取阶段                    │
│  ┌─────────────────────┐    │
│  │ 在线: Puppeteer      │    │
│  │ - 启动无头浏览器      │    │
│  │ - 访问页面等待加载    │    │
│  │ - page.evaluate()   │    │
│  │ - 9 个 DOM 提取器    │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ 本地: 静态分析        │    │
│  │ - 递归扫描文件        │    │
│  │ - 正则匹配样式声明    │    │
│  │ - Tailwind 配置合并   │    │
│  │ - package.json 读取   │    │
│  └─────────────────────┘    │
└──────────┬──────────────────┘
           │
           ▼  Design Tokens (统一 JSON 结构)
┌─────────────────────────────┐
│  生成阶段                    │
│  - 9 章节 Markdown 生成      │
│  - 智能推断 (氛围/分类/建议)  │
│  - i18n 中英文切换           │
└──────────┬──────────────────┘
           │
           ▼
    📄 DESIGN.md + (可选) design-tokens.json
```
