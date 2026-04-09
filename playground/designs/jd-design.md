# Design System: 京东

## 1. 视觉主题与氛围

京东 的网站呈现出浅色主题、简洁、扁平设计、丰富的色彩体系的设计风格。页面以浅色画布（`#ffffff`）为底，主文本颜色为 `#666666`。主强调色为 `#666666`，广泛应用于交互元素和关键视觉锚点。

主字体为 `PingFang SC`，辅以 `JDZhengHT-EN-Regular` 作为次要字体. 

> 京东JD.COM-专业的综合网上购物商城，为您提供正品低价的购物选择、优质便捷的服务体验。商品来自全球数十万品牌商家，囊括家电、手机、电脑、服装、居家、母婴、美妆、个护、食品、生鲜等丰富品类，满足各种购物需求。

**关键特征：**
- 主字体: `PingFang SC`
- 页面背景: `#ffffff`
- 主文本颜色: `#666666`
- 主强调色: `#666666`
- 扁平设计，极少使用阴影
- 最常用的圆角半径: `8px`
- 默认浅色主题


## 2. 色彩体系与角色

### 主色
- **页面背景** (`#ffffff`): 页面主背景色。
- **主文本** (`#666666`): 默认正文文本颜色。
- **标题** (`#666666`): 主标题文本颜色。

### 强调色
- **链接** (`#666666`): 超链接文本颜色。
- **按钮背景** (`#000000`): 主按钮背景色。
- **按钮文本** (`#505259`): 主按钮文本颜色。
- **强调色 #b5691a** (`#b5691a`): 用于text, outline，出现 8 次。
- **强调色 #ff3333** (`#ff3333`): 用于background，出现 1 次。
- **强调色 #ff0000** (`#ff0000`): 用于background，出现 1 次。

### 中性色阶
- **中性色 10%** (`#1a1a1a`): 用于text, border, outline，出现 350 次。
- **中性色 39%** (`#636363`): 用于text, border, outline，出现 170 次。
- **中性色 55%** (`#8c8c8c`): 用于text, border, outline，出现 35 次。
- **中性色 20%** (`#333333`): 用于text, border, outline，出现 20 次。
- **中性色 80%** (`#cccccc`): 用于text, border, outline，出现 20 次。
- **中性色 60%** (`#999999`): 用于text, border, outline，出现 20 次。
- **中性色 56%** (`#888b94`): 用于text, border, outline，出现 15 次。
- **中性色 10%** (`#191919`): 用于text, border, outline，出现 10 次。

### 表面与边框
- **输入框背景** (`#000000`): 表单输入框背景色。
- **边框色 #ff0f23** (`#ff0f23`): 边框颜色，出现 183 次。
- **边框色 #e9d2ba** (`#e9d2ba`): 边框颜色，出现 6 次。
- **边框色 #ff477f** (`#ff477f`): 边框颜色，出现 5 次。
- **边框色 #f92b18** (`#f92b18`): 边框颜色，出现 5 次。
- **边框色 #b26b00** (`#b26b00`): 边框颜色，出现 5 次。



## 3. 排版规则

### 字体族
- **主字体**: `PingFang SC`
- **次要字体**: `JDZhengHT-EN-Regular`

### 层级体系

| 角色 | 字体 | 字号 | 字重 | 行高 | 字间距 | 备注 |
|------|------|------|--------|-------------|----------------|-------|
| Sub-heading | PingFang SC | 28px | 700 | 45px | normal | "为你推荐..." |
| Display / Hero | PingFang SC | 24px | 700 | 36px | normal | "京东..." |
| Inline | JDZhengHT-EN-Regular | 22px | 500 | 14px | normal | "1899.00..." |
| Inline | PingFang SC | 20px | 600 | 20px | normal | "京东拍卖..." |
| Body | PingFang SC | 20px | 700 | 20px | normal | "精选热点..." |
| Section Heading | PingFang SC | 18px | 700 | 27px | normal | "京东,多快好省..." |
| Body | PingFang SC | 18px | 700 | 42px | normal | "品类齐全，轻松购物..." |
| Inline | JDZhengHeiVRegular2-1 | 18px | 600 | 18px | normal | "全部频道..." |
| Button | PingFang SC | 16px | 600 | normal | normal | "搜索..." |
| Inline | JDZhengHT-EN-Regular | 16px | 400 | 13px | normal | "¥399..." |
| Link | PingFang SC | 14px | 400 | 22px | normal | "中国大陆版..." |
| Inline | PingFang SC | 14px | 400 | 22px | normal | - |
| Body | PingFang SC | 14px | 500 | 18px | normal | "vivo iQOO Z11x 12GB+256G夜..." |
| List Item | PingFang SC | 14px | 400 | 26px | normal | "篮球鞋..." |
| Label | PingFang SC | 14px | 700 | 22px | normal | "购物指南..." |
| Link | PingFang SC | 12px | 400 | 18px | normal | "跳至搜索框..." |
| List Item | PingFang SC | 12px | 400 | 36px | normal | "中国大陆版中国大陆版中國港澳版中國台灣版京东全球..." |
| Inline | iconfont | 12px | 400 | 12px | normal | "..." |
| Body | PingFang SC | 12px | 400 | 18px | normal | "关于我们
        |
        联系..." |
| Label | PingFang SC | 9.96px | 700 | 14.94px | normal | "多..." |
| Link | PingFang SC | 0px | 700 | 0px | normal | "京东..." |
| List Item | PingFang SC | 0px | 400 | 28px | normal | "冰洗
                      ..." |

### 原则
- 主字体 `PingFang SC` 应用于所有主要文本元素
- 使用的字重：400, 500, 600, 700
- 字号范围：0px 至 28px


## 4. 组件样式

### 按钮

**主要 ("中国大陆版中国大陆版中國港澳版中國台灣版京东全球版")**
- Background: `#000000`
- Text: `#505259`
- Padding: `0px`
- Radius: `0px`
- Font: 12px PingFang SC weight 400

**次要 ("上传图片")**
- Background: `#ff0f23`
- Text: `#ffffff`
- Padding: `0px`
- Radius: `6px`
- Font: 12px PingFang SC weight 600
- Border: `1px solid rgb(255, 15, 35)`

**变体 3 ("搜索")**
- Background: `#000000`
- Text: `#666666`
- Padding: `0px`
- Radius: `0px`
- Font: 12px PingFang SC weight 400

**变体 4 ("登录并领取")**
- Background: `#ff0f23`
- Text: `#ffffff`
- Padding: `0px`
- Radius: `8px`
- Font: 16px PingFang SC weight 600

**变体 5 ("享88折母婴出游")**
- Background: `#000000`
- Text: `#ffffff`
- Padding: `0px`
- Radius: `27px`
- Font: 14px PingFang SC weight 400

### 卡片与容器

**Card Style 1**
- Background: `#000000`
- Radius: `0px`
- Border: `0px none rgb(102, 102, 102)`
- Padding: `0px`

**Card Style 2**
- Background: `#ffffff`
- Radius: `12px`
- Border: `0px none rgb(102, 102, 102)`
- Padding: `0px`

**Card Style 3**
- Background: `#ffffff`
- Radius: `8px`
- Border: `0px none rgb(102, 102, 102)`
- Padding: `0px`

**Card Style 4**
- Background: `#000000`
- Radius: `8px`
- Border: `0px none rgb(102, 102, 102)`
- Padding: `12px 0px`

**Card Style 5**
- Background: `#f7f8fc`
- Radius: `8px`
- Border: `0px none rgb(102, 102, 102)`
- Padding: `12px`

**Card Style 6**
- Background: `#ffffff`
- Radius: `8px 8px 0px 0px`
- Border: `0px none rgb(102, 102, 102)`
- Padding: `0px`

### 徽章 / 标签

**Badge Style 1**
- Background: `#000000`
- Text: `#1a1a1a`
- Padding: `1px 0px 0px`
- Radius: `0px`
- Font: 14px weight 500
- Border: `0px none rgb(26, 26, 26)`

**Badge Style 2**
- Background: `#000000`
- Text: `#1a1a1a`
- Padding: `0px`
- Radius: `0px`
- Font: 14px weight 500
- Border: `0px none rgb(26, 26, 26)`

**Badge Style 3**
- Background: `#000000`
- Text: `#666666`
- Padding: `0.5px 0px`
- Radius: `0px`
- Font: 12px weight 400
- Border: `0px none rgb(102, 102, 102)`

**Badge Style 4**
- Background: `#000000`
- Text: `#666666`
- Padding: `0px`
- Radius: `0px`
- Font: 12px weight 400
- Border: `0px none rgb(102, 102, 102)`

### 输入框与表单

**Input Style 1**
- Background: `#000000`
- Border: `0px none rgb(0, 0, 0)`
- Radius: `8px`
- Padding: `2px 20px 2px 0px`
- Font: 14px, color `#000000`

**Input Style 2**
- Background: `#000000`
- Border: `0px none rgb(102, 102, 102)`
- Radius: `0px`
- Padding: `0px`
- Font: 13.3333px, color `#666666`

### 导航

- Background: `#000000`
- Position: `static`
- Height: `36px`
- Padding: `0px 54px`
- Border bottom: `0px none rgb(80, 82, 89)`
- Backdrop filter: `none`

**导航链接：**
- Color: `#505259`
- Font: 12px weight 400
- Text decoration: `none`


## 5. 布局原则

### 间距系统
- 基础单位: `4px`
- 比例尺: 0.5px, 1px, 2px, 4px, 5px, 6px, 7px, 8px, 9px, 10px, 11px, 12px, 15px, 16px, 16.6719px, 18px, 22px, 24px, 25px, 137.891px

### 栅格与容器
- 最大内容宽度: `1700px`
- CSS Grid 使用: 0 个元素
- Flexbox 使用: 49 个元素
- 主要布局方式: Flexbox

### 留白哲学
- **均衡间距**：设计在信息密度和呼吸空间之间取得了平衡。

### 圆角比例尺
| 圆角值 | 使用次数 |
|--------|-------------|
| `8px` | 13 |
| `4px` | 9 |
| `12px` | 7 |
| `8px 8px 0px 0px` | 5 |
| `6px` | 3 |
| `20px` | 1 |


## 6. 层深与阴影

该设计采用扁平风格，未检测到明显的 box-shadow 使用。

| 层级 | 处理方式 | 用途 |
|-------|-----------|-----|
| 扁平（层级 0） | 无阴影 | 所有元素 |


## 7. 设计规范与禁忌

### 推荐做法
- 使用 `PingFang SC` 作为所有文本元素的主字体
- 使用 `#ffffff` 作为页面背景色
- 使用 `#666666` 作为主正文文本颜色
- 使用 `#666666` 作为标题颜色
- 使用 `#666666` 作为主强调色/交互色
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
| 平板竖屏 | 768px | 过渡布局，尽可能双列 |
| 桌面 | 1056px | 完整布局，多列功能栅格 |
| 桌面 | 1244px | 完整布局，多列功能栅格 |
| 大桌面 | 1316px | 居中内容，宽裕外边距 |
| 大桌面 | 1354px | 居中内容，宽裕外边距 |
| 大桌面 | 1384px | 居中内容，宽裕外边距 |
| 大桌面 | 1396px | 居中内容，宽裕外边距 |
| 大桌面 | 1415px | 居中内容，宽裕外边距 |
| 大桌面 | 1416px | 居中内容，宽裕外边距 |
| 大桌面 | 1424px | 居中内容，宽裕外边距 |
| 宽屏桌面 | 1456px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1463px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1464px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1496px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1535px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1536px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1592px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1679px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1680px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1684px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1688px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1696px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1700px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1708px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1732px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1760px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1780px | 最大内容宽度，额外留白 |
| 宽屏桌面 | 1876px | 最大内容宽度，额外留白 |
| 超宽屏 | 2800px | 内容居中，最大宽度约束 |

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
- 主文本: `#666666`
- 标题文本: `#666666`
- 正文文本: `#1a1a1a`
- 链接: `#666666`
- 按钮背景: `#000000`
- 强调色 `#666666`：用于 text, border, outline（1348次）
- 强调色 `#1a1a1a`：用于 text, border, outline（350次）
- 强调色 `#ff0f23`：用于 text, border, outline, background（183次）
- 强调色 `#636363`：用于 text, border, outline（170次）
- 强调色 `#505259`：用于 text, border, outline（122次）

### 示例组件提示

- "创建一个英雄区域，背景为 `#ffffff`。标题使用 24px `PingFang SC` 字重 700，行高 36px，颜色 `#666666`。 CTA 按钮：`#000000` 背景，`#505259` 文本，0px 圆角，0px 内边距。"

- "设计一个卡片：`#000000` 背景, `0px none rgb(102, 102, 102)` border, 0px radius. "

- "构建导航：`#000000` 背景, backdrop-filter: none. Links: 12px weight 400, color `#505259`. "

### 迭代指南
1. 始终使用 `PingFang SC` 作为主字体
2. 字重: 400, 500, 600, 700
3. 页面背景：`#ffffff`，文本：`#666666`
4. 默认圆角: `8px`
6. 间距基础单位: 4px
