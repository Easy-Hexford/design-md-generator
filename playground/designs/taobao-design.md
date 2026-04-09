# Design System: 淘宝

## 1. 视觉主题与氛围

淘宝 的网站呈现出浅色主题、简洁、扁平设计、克制的色彩运用的设计风格。页面以浅色画布（`#ffffff`）为底，主文本颜色为 `#000000`。主强调色为 `#1f1f1f`，广泛应用于交互元素和关键视觉锚点。

主字体为 `system-ui`，辅以 `Inter V` 作为次要字体. 

> 淘宝网 - 亚洲较大的网上交易平台，提供各类服饰、美容、家居、数码、话费/点卡充值… 数亿优质商品，同时提供担保交易(先收货后付款)等安全交易保障服务，并由商家提供退货承诺、破损补寄等消费者保障服务，让你安心享受网上购物乐趣！

**关键特征：**
- 主字体: `system-ui`
- 页面背景: `#ffffff`
- 主文本颜色: `#000000`
- 主强调色: `#1f1f1f`
- 扁平设计，极少使用阴影
- 最常用的圆角半径: `8px`
- 默认浅色主题


## 2. 色彩体系与角色

### 主色
- **页面背景** (`#ffffff`): 页面主背景色。
- **主文本** (`#000000`): 默认正文文本颜色。
- **标题** (`#000000`): 主标题文本颜色。

### 强调色
- **链接** (`#000000`): 超链接文本颜色。
- **按钮背景** (`#ff5000`): 主按钮背景色。
- **按钮文本** (`#ffffff`): 主按钮文本颜色。

### 中性色阶
- **中性色 12%** (`#1f1f1f`): 用于text, border, outline，出现 1714 次。
- **中性色 48%** (`#7a7a7a`): 用于text, border, outline，出现 30 次。
- **中性色 96%** (`#f5f5f5`): 用于background，出现 10 次。
- **中性色 97%** (`#f7f7f7`): 用于background，出现 10 次。
- **中性色 92%** (`#ebebeb`): 用于border, background，出现 7 次。
- **中性色 24%** (`#3d3d3d`): 用于text, border, outline，出现 5 次。

### 表面与边框
- **输入框背景** (`#000000`): 表单输入框背景色。
- **边框色 #ff4859** (`#ff4859`): 边框颜色，出现 5 次。
- **边框色 #11192d** (`#11192d`): 边框颜色，出现 5 次。
- **边框色 #cc6600** (`#cc6600`): 边框颜色，出现 5 次。

### CSS 自定义属性
网站定义了 29 个颜色相关的 CSS 自定义属性，主要包括：

- `--tbpc-primary-theme-alpha-color`: `#fff1eb`
- `--tbpc-secondary-theme-alpha-color`: `#ff500015`
- `--tbpc-price-color`: `#ff5000`
- `--tbpc-price-alpha-color`: `#ff500015`
- `--tbpc-border-theme-color`: `#ffd5c2`
- `--tbpc-background-theme--color`: `#fff1eb`
- `--tbpc-gold-theme-color`: `#b88449`
- `--tbpc-primary-color`: `#1f1f1f`
- `--tbpc-secondary-color`: `#7a7a7a`
- `--tbpc-tertiary-color`: `#999`
- `--tbpc-disable-color`: `#ccc`
- `--tbpc-border-color`: `#d6d6d6`
- `--tbpc-divider-color`: `#ebebeb`
- `--tbpc-bg1-color`: `#f5f5f5`
- `--tbpc-bg2-color`: `#f7f7f7`
- `--tbpc-bg3-color`: `#fafafa`
- `--tbpc-white-color`: `#fff`
- `--tbpc-primary-alpha-color`: `#000000`
- `--tbpc-secondary-alpha-color`: `#000000`
- `--tbpc-tertiary-alpha-color`: `#000000`



## 3. 排版规则

### 字体族
- **主字体**: `system-ui`
- **次要字体**: `Inter V`

### 层级体系

| 角色 | 字体 | 字号 | 字重 | 行高 | 字间距 | 备注 |
|------|------|------|--------|-------------|----------------|-------|
| Inline | iconfont | 24px | 400 | 24px | normal | "..." |
| Inline | global-iconfont | 20px | 400 | 35px | normal | "..." |
| Inline | global-iconfont | 16px | 400 | 8px | normal | "..." |
| Button | PingFangSC-Medium | 16px | 500 | 24px | normal | "搜索..." |
| Link | system-ui | 16px | 900 | 48px | normal | "立即登录..." |
| Inline | system-ui | 14px | 500 | 32px | normal | "查看更多皮肤..." |
| List Item | Roboto | 14px | 500 | 38px | normal | "宝贝..." |
| Link | system-ui | 14px | 600 | 22px | normal | "天猫..." |
| Link | system-ui | 12px | 400 | 18px | normal | - |
| List Item | system-ui | 12px | 400 | 18px | normal | "中国大陆中国大陆中国香港中国台湾中国澳门韩国马来..." |
| Inline | system-ui | 12px | 400 | 35px | normal | "中国大陆..." |
| Display / Hero | system-ui | 12px | 700 | 18px | normal | "淘宝网..." |
| Section Heading | system-ui | 12px | 700 | 18px | normal | "淘宝网..." |
| Body | system-ui | 12px | 400 | 16px | normal | "已买到..." |
| Inline | system-ui | 10px | 400 | 14px | normal | "桌面版..." |
| List Item | system-ui | 0px | 400 | 32px | normal | "券后7.7折起抢省钱补贴券后7.7折起超级8..." |
| Button | system-ui | 0px | 400 | 0px | normal | "Previous..." |
| Link | system-ui | 0px | 400 | 0px | normal | "百亿补贴 · 买贵必赔..." |
| Inline | system-ui | 0px | 400 | 0px | normal | - |

### 原则
- 主字体 `system-ui` 应用于所有主要文本元素
- 使用的字重：400, 500, 600, 700, 900
- 字号范围：0px 至 24px


## 4. 组件样式

### 按钮

**主要 ("搜索")**
- Background: `#ff5000`
- Text: `#ffffff`
- Padding: `0px`
- Radius: `8px`
- Font: 16px PingFangSC-Medium weight 500

**次要 ("Previous")**
- Background: `#000000`
- Text: `#000000`
- Padding: `0px`
- Radius: `0px`
- Font: 0px system-ui weight 400

**变体 3 ("注册")**
- Background: `#000000`
- Text: `#1f1f1f`
- Padding: `0px`
- Radius: `0px`
- Font: 12px system-ui weight 400

**变体 4 ("立即登录")**
- Background: `#ff5000`
- Text: `#ffffff`
- Padding: `0px`
- Radius: `12px`
- Font: 16px system-ui weight 900

### 卡片与容器

**Card Style 1**
- Background: `#ffffff`
- Radius: `12px`
- Border: `1px solid rgba(0, 0, 0, 0)`
- Shadow: `rgba(10, 10, 51, 0.12) 0px 4px 24px 0px, rgba(0, 0, 0, 0.04) 0px 0px 8px 0px`
- Padding: `8px`

**Card Style 2**
- Background: `#000000`
- Radius: `0px`
- Border: `0px none rgb(0, 0, 0)`
- Padding: `0px 8px`

**Card Style 3**
- Background: `#ffffff`
- Radius: `8px`
- Border: `0px none rgb(255, 72, 89)`
- Padding: `0px`

**Card Style 4**
- Background: `#ffffff`
- Radius: `0px`
- Border: `0px none rgb(255, 72, 89)`
- Padding: `0px`

**Card Style 5**
- Background: `#f7f7f7`
- Radius: `12px`
- Border: `0px none rgb(0, 0, 0)`
- Padding: `0px`

**Card Style 6**
- Background: `#ffffff`
- Radius: `12px`
- Border: `2px solid rgb(255, 80, 0)`
- Padding: `8px 6px 16px 16px`

### 徽章 / 标签

**Badge Style 1**
- Background: `#000000`
- Text: `#ffffff`
- Padding: `0px`
- Radius: `4px`
- Font: 12px weight 500
- Border: `0px none rgb(255, 255, 255)`

**Badge Style 2**
- Background: `#000000`
- Text: `#ffffff`
- Padding: `0px`
- Radius: `4px`
- Font: 12px weight 500
- Border: `0px none rgb(255, 255, 255)`

**Badge Style 3**
- Background: `#000000`
- Text: `#ffffff`
- Padding: `0px`
- Radius: `4px`
- Font: 12px weight 500
- Border: `0px none rgb(255, 255, 255)`

**Badge Style 4**
- Background: `#000000`
- Text: `#ffffff`
- Padding: `0px`
- Radius: `4px`
- Font: 12px weight 500
- Border: `0px none rgb(255, 255, 255)`

### 输入框与表单

**Input Style 1**
- Background: `#000000`
- Border: `0px none rgb(17, 25, 45)`
- Radius: `0px`
- Padding: `9px 36px 9px 0px`
- Font: 14px, color `#11192d`

**Input Style 2**
- Background: `#000000`
- Border: `0px none rgb(0, 0, 0)`
- Radius: `0px`
- Padding: `0px`
- Font: 12px, color `#000000`

### 导航

- Background: `#000000`
- Position: `relative`
- Height: `22px`
- Padding: `6px 0px`
- Border bottom: `0px none rgb(31, 31, 31)`
- Backdrop filter: `none`

**导航链接：**
- Color: `#000000`
- Font: 14px weight 600
- Text decoration: `none`


## 5. 布局原则

### 间距系统
- 基础单位: `4px`
- 比例尺: 2px, 4px, 6px, 8px, 9px, 10px, 12px, 13px, 14px, 16px, 30px, 32px, 36px, 42px, 94px

### 栅格与容器
- 最大内容宽度: `208px`
- CSS Grid 使用: 0 个元素
- Flexbox 使用: 22 个元素
- 主要布局方式: Flexbox

### 留白哲学
- **均衡间距**：设计在信息密度和呼吸空间之间取得了平衡。

### 圆角比例尺
| 圆角值 | 使用次数 |
|--------|-------------|
| `8px` | 13 |
| `4px` | 11 |
| `12px` | 8 |
| `48px` | 1 |
| `6px` | 1 |


## 6. 层深与阴影

该设计采用扁平风格，未检测到明显的 box-shadow 使用。

| 层级 | 处理方式 | 用途 |
|-------|-----------|-----|
| 扁平（层级 0） | 无阴影 | 所有元素 |


## 7. 设计规范与禁忌

### 推荐做法
- 使用 `system-ui` 作为所有文本元素的主字体
- 使用 `#ffffff` 作为页面背景色
- 使用 `#000000` 作为主正文文本颜色
- 使用 `#000000` 作为标题颜色
- 使用 `#1f1f1f` 作为主强调色/交互色
- 标题使用字重 700 —— 这是标志性字重
- 保持大多数元素的圆角一致为 `8px`

### 避免做法
- 不要使用纯黑色（`#000000`）作为文本颜色——设计使用了更柔和的深色
- 不要使用过大的圆角（药丸形状）——设计偏好保守的圆角
- 不要添加厚重的阴影——设计刻意保持扁平
- 不要混用字体族——遵循已定义的字体系统
- 不要使用调色板之外的颜色
- 不要用随意的值覆盖间距系统


## 8. 响应式行为

### 断点
| 名称 | 宽度 | 关键变化 |
|------|-------|-------------|
| 平板 / 小桌面 | 912px | 双列栅格，适中内边距 |
| 平板 / 小桌面 | 1009px | 双列栅格，适中内边距 |
| 桌面 | 1120px | 完整布局，多列功能栅格 |
| 桌面 | 1200px | 完整布局，多列功能栅格 |
| 桌面 | 1219px | 完整布局，多列功能栅格 |
| 桌面 | 1264px | 完整布局，多列功能栅格 |
| 大桌面 | 1342px | 居中内容，宽裕外边距 |
| 大桌面 | 1343px | 居中内容，宽裕外边距 |
| 大桌面 | 1399px | 居中内容，宽裕外边距 |
| 大桌面 | 1400px | 居中内容，宽裕外边距 |
| 大桌面 | 1414px | 居中内容，宽裕外边距 |
| 大桌面 | 1415px | 居中内容，宽裕外边距 |
| 宽屏桌面 | 1639px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1680px | 最大内容宽度，额外留白 |

### 触控目标
- 按钮在移动端应保持最小 44px 的触控目标
- 导航链接应有足够的间距以便触控交互
- 表单输入框在移动端应至少 44px 高

### 折叠策略
- 导航：水平链接 → 移动端汉堡菜单
- 多列布局 → 移动端单列堆叠
- 排版比例在较小视口上压缩
- 间距在移动端按比例缩小
- Flexbox 布局在较小屏幕上自然换行


## 9. AI 代理提示指南

### 快速颜色参考
- 背景: `#ffffff`
- 主文本: `#000000`
- 标题文本: `#000000`
- 正文文本: `#1f1f1f`
- 链接: `#000000`
- 按钮背景: `#ff5000`
- 强调色 `#1f1f1f`：用于 text, border, outline（1714次）
- 强调色 `#ff5000`：用于 text, border, outline, background（124次）
- 强调色 `#7a7a7a`：用于 text, border, outline（30次）
- 强调色 `#f5f5f5`：用于 background（10次）
- 强调色 `#f7f7f7`：用于 background（10次）

### 示例组件提示

- "创建一个英雄区域，背景为 `#ffffff`。标题使用 12px `system-ui` 字重 700，行高 18px，颜色 `#000000`。 CTA 按钮：`#ff5000` 背景，`#ffffff` 文本，8px 圆角，0px 内边距。"

- "设计一个卡片：`#ffffff` 背景, `1px solid rgba(0, 0, 0, 0)` border, 12px radius. Shadow: `rgba(10, 10, 51, 0.12) 0px 4px 24px 0px, rgba(0, 0, 0, 0.04) 0px 0px 8px 0px`. "

- "构建导航：`#000000` 背景, backdrop-filter: none. Links: 14px weight 600, color `#000000`. "

### 迭代指南
1. 始终使用 `system-ui` 作为主字体
2. 字重: 400, 500, 600, 700, 900
3. 页面背景：`#ffffff`，文本：`#000000`
4. 默认圆角: `8px`
6. 间距基础单位: 4px
