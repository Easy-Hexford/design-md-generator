/**
 * DESIGN.md Generator
 * Transforms extracted design tokens into a structured DESIGN.md file
 * following the 9-section format inspired by Google Stitch.
 * Supports both English (en) and Chinese (zh) output.
 */

// ============================================================
// i18n dictionary
// ============================================================
const i18n = {
  en: {
    // Section titles
    s1Title: '## 1. Visual Theme & Atmosphere',
    s2Title: '## 2. Color Palette & Roles',
    s3Title: '## 3. Typography Rules',
    s4Title: '## 4. Component Stylings',
    s5Title: '## 5. Layout Principles',
    s6Title: '## 6. Depth & Elevation',
    s7Title: '## 7. Do\'s and Don\'ts',
    s8Title: '## 8. Responsive Behavior',
    s9Title: '## 9. Agent Prompt Guide',

    // Section 1
    keyCharacteristics: '**Key Characteristics:**',
    primaryFont: 'Primary font',
    monoFont: 'Monospace font',
    monoFontSuffix: 'for code elements',
    pageBg: 'Page background',
    primaryTextColor: 'Primary text color',
    primaryAccent: 'Primary accent',
    shadowSystem: (n) => `Shadow system with ${n} distinct shadow levels`,
    flatDesign: 'Flat design with minimal shadow usage',
    commonRadius: 'Most common border-radius',
    darkTheme: 'Dark theme as default',
    lightTheme: 'Light theme as default',
    browserThemeColor: 'Browser theme color',
    atmosphere: {
      darkThemed: 'dark-themed',
      immersive: 'immersive',
      lightThemed: 'light-themed',
      clean: 'clean',
      layeredDepth: 'layered depth',
      flatDesign: 'flat design',
      richColor: 'rich color palette',
      restrainedColor: 'restrained color usage',
    },
    s1Presents: (site, atmo) => `${site}'s website presents a ${atmo} design. `,
    s1Canvas: (isDark, bg) => `The page opens on a ${isDark ? 'dark' : 'light'} canvas (\`${bg}\`) `,
    s1PrimaryText: (color) => `with primary text in \`${color}\`. `,
    s1AccentColor: (color) => `The dominant accent color is \`${color}\`, which appears across interactive elements and key visual anchors. `,
    s1PrimaryTypeface: (font) => `The primary typeface is \`${font}\``,
    s1SecondaryFont: (font) => `, complemented by \`${font}\` as a secondary font`,

    // Section 2
    primary: '### Primary',
    accentColors: '### Accent Colors',
    neutralScale: '### Neutral Scale',
    surfaceBorders: '### Surface & Borders',
    cssCustomProps: '### CSS Custom Properties',
    cssCustomPropsDesc: (n) => `The site defines ${n} color-related CSS custom properties. Key ones include:`,
    colorNames: {
      pageBg: 'Page Background',
      primaryText: 'Primary Text',
      heading: 'Heading',
      link: 'Link',
      buttonBg: 'Button Background',
      buttonText: 'Button Text',
      navBg: 'Navigation Background',
      footerBg: 'Footer Background',
      inputBg: 'Input Background',
    },
    colorDescs: {
      pageBg: 'Main page background color.',
      primaryText: 'Default body text color.',
      heading: 'Primary heading text color.',
      link: 'Hyperlink text color.',
      buttonBg: 'Primary button background.',
      buttonText: 'Primary button text color.',
      navBg: 'Navigation/header background.',
      footerBg: 'Footer section background.',
      inputBg: 'Form input background.',
    },
    neutralLabel: (l) => `Neutral ${l}%`,
    borderLabel: (hex) => `Border ${hex}`,
    surfaceLabel: (hex) => `Surface ${hex}`,
    accentLabel: (hex) => `Accent ${hex}`,
    usedFor: (roles, count) => `Used for ${roles}. Appears ${count} times.`,
    borderColorDesc: (count) => `Border color. Appears ${count} times.`,
    surfaceColorDesc: (count) => `Light surface/background. Appears ${count} times.`,

    // Section 3
    fontFamily: '### Font Family',
    primaryLabel: '**Primary**',
    secondaryLabel: '**Secondary**',
    monospaceLabel: '**Monospace**',
    hierarchy: '### Hierarchy',
    typoTableHeader: '| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |',
    principles: '### Principles',
    primaryFontUsed: (font) => `Primary font \`${font}\` is used across all major text elements`,
    fontWeightsUsed: (weights) => `Font weights used: ${weights}`,
    sizeRange: (min, max) => `Size range: ${min}px to ${max}px`,

    // Section 4
    buttons: '### Buttons',
    cardsContainers: '### Cards & Containers',
    badgesTags: '### Badges / Tags',
    inputsForms: '### Inputs & Forms',
    navigation: '### Navigation',
    noButtons: 'No distinct button styles detected. Buttons may use utility classes or framework defaults.',
    noCards: 'No distinct card/container styles detected.',
    noInputs: 'No form inputs detected on the homepage.',
    noNav: 'Navigation element not detected.',
    navLinks: '**Nav Links:**',
    btnVariants: ['Primary', 'Secondary'],
    btnVariantN: (n) => `Variant ${n}`,

    // Section 5
    spacingSystem: '### Spacing System',
    baseUnit: 'Base unit',
    scale: 'Scale',
    gridContainer: '### Grid & Container',
    maxContentWidth: 'Max content width',
    cssGridUsage: 'CSS Grid usage',
    flexboxUsage: 'Flexbox usage',
    elements: 'elements',
    primaryLayoutMethod: 'Primary layout method',
    whitespacePhilosophy: '### Whitespace Philosophy',
    generousSpacing: '**Generous spacing**: The design uses ample whitespace, creating a breathable, premium feel.',
    balancedSpacing: '**Balanced spacing**: The design strikes a balance between density and breathing room.',
    denseSpacing: '**Dense spacing**: The design favors compact layouts with tight spacing.',
    borderRadiusScale: '### Border Radius Scale',
    radiusTableHeader: '| Radius | Usage Count |',
    noRadius: 'No significant border-radius usage detected (sharp corners).',

    // Section 6
    flatApproach: 'The design uses a flat approach with no significant box-shadow usage detected.',
    shadowTableHeader: '| Level | Shadow Value | Usage Count |',
    flatTableHeader: '| Level | Treatment | Use |',
    flatRow: '| Flat (Level 0) | No shadow | All elements |',
    levelNames: ['Subtle', 'Standard', 'Elevated', 'Deep', 'Dramatic'],
    shadowPhilosophy: '**Shadow Philosophy**: ',
    multiLevelShadow: (n) => `The design employs a multi-level shadow system with ${n} distinct elevation levels, creating a clear visual hierarchy through depth.`,
    restrainedShadow: (n) => `The design uses a restrained shadow approach with ${n} shadow level(s), keeping the interface relatively flat with selective elevation.`,
    tintedShadows: ' Notably, the shadows use tinted colors rather than pure black, adding brand atmosphere to the elevation system.',

    // Section 7
    doTitle: '### Do',
    dontTitle: '### Don\'t',
    doUseFont: (font) => `Use \`${font}\` as the primary typeface for all text elements`,
    doUseBg: (bg) => `Use \`${bg}\` as the page background color`,
    doUseTextColor: (color) => `Use \`${color}\` for primary body text`,
    doUseHeadingColor: (color) => `Use \`${color}\` for headings`,
    doUseAccent: (color) => `Use \`${color}\` as the primary accent/interactive color`,
    doUseWeight: (w) => `Use weight ${w} for headings — this is the signature weight`,
    doKeepRadius: (r) => `Keep border-radius consistent at \`${r}\` for most elements`,
    doApplyShadow: 'Apply the shadow system consistently for elevation hierarchy',
    dontPureBlack: 'Don\'t use pure black (`#000000`) for text if the design uses a softer dark color',
    dontPureWhite: 'Don\'t use pure white (`#ffffff`) backgrounds — maintain the dark theme',
    dontLargeRadius: 'Don\'t use large border-radius (pill shapes) — the design favors conservative rounding',
    dontSharpCorners: 'Don\'t use sharp corners (0px radius) — the design favors rounded elements',
    dontHeavyShadows: 'Don\'t add heavy box-shadows — the design is intentionally flat',
    dontMixFonts: 'Don\'t mix font families — stick to the defined type system',
    dontOutsidePalette: 'Don\'t use colors outside the defined palette',
    dontOverrideSpacing: 'Don\'t override the spacing system with arbitrary values',

    // Section 8
    breakpoints: '### Breakpoints',
    bpTableHeader: '| Name | Width | Key Changes |',
    noBpDetected: 'No explicit media query breakpoints detected in accessible stylesheets. The site may use:',
    noBpOptions: ['Container queries', 'JavaScript-based responsive logic', 'CSS-in-JS with dynamic breakpoints'],
    touchTargets: '### Touch Targets',
    touchRules: [
      'Buttons should maintain minimum 44px touch target on mobile',
      'Navigation links should have adequate spacing for touch interaction',
      'Form inputs should be at least 44px tall on mobile',
    ],
    collapsingStrategy: '### Collapsing Strategy',
    collapseRules: [
      'Navigation: horizontal links → hamburger menu on mobile',
      'Multi-column layouts → single column stacked on mobile',
      'Typography scale compresses on smaller viewports',
      'Spacing reduces proportionally on mobile',
    ],
    gridAdapt: 'CSS Grid layouts adapt via auto-fill/auto-fit or explicit template changes',
    flexWrap: 'Flexbox layouts wrap naturally on smaller screens',
    bpNames: [
      { max: 480, name: 'Mobile Small', desc: 'Compact mobile layout' },
      { max: 640, name: 'Mobile', desc: 'Single column, reduced heading sizes, stacked cards' },
      { max: 768, name: 'Tablet Portrait', desc: 'Transitional layout, 2-column where possible' },
      { max: 1024, name: 'Tablet / Small Desktop', desc: '2-column grids, moderate padding' },
      { max: 1280, name: 'Desktop', desc: 'Full layout, multi-column feature grids' },
      { max: 1440, name: 'Large Desktop', desc: 'Centered content with generous margins' },
      { max: 1920, name: 'Wide Desktop', desc: 'Maximum content width, extra whitespace' },
      { max: Infinity, name: 'Ultra Wide', desc: 'Content centered, max-width constrained' },
    ],

    // Section 9
    quickColorRef: '### Quick Color Reference',
    background: 'Background',
    primaryTextLabel: 'Primary text',
    headingText: 'Heading text',
    bodyText: 'Body text',
    linkLabel: 'Link',
    buttonBgLabel: 'Button background',
    navBgLabel: 'Navigation background',
    accentUsed: (hex, roles, count) => `Accent \`${hex}\`: used for ${roles} (${count}x)`,
    examplePrompts: '### Example Component Prompts',
    iterationGuide: '### Iteration Guide',
    alwaysUseFont: (font) => `Always use \`${font}\` as the primary font`,
    fontWeightsLabel: 'Font weights',
    pageBgText: (bg, text) => `Page background: \`${bg}\`, text: \`${text}\``,
    defaultRadius: 'Default border-radius',
    primaryShadow: 'Primary shadow',
    spacingBaseUnit: 'Spacing base unit',
    heroPrompt: (bg, size, font, weight, lh, color) =>
      `"Create a hero section with background \`${bg}\`. Headline at ${size} \`${font}\` weight ${weight}, line-height ${lh}, color \`${color}\`.`,
    ctaPrompt: (bgColor, textColor, radius, padding) =>
      ` CTA button: \`${bgColor}\` background, \`${textColor}\` text, ${radius} radius, ${padding} padding."`,
    cardPrompt: (bg) => `"Design a card: \`${bg}\` background`,
    navPrompt: (bg) => `"Build navigation: \`${bg}\` background`,
  },
  zh: {
    // Section titles
    s1Title: '## 1. 视觉主题与氛围',
    s2Title: '## 2. 色彩体系与角色',
    s3Title: '## 3. 排版规则',
    s4Title: '## 4. 组件样式',
    s5Title: '## 5. 布局原则',
    s6Title: '## 6. 层深与阴影',
    s7Title: '## 7. 设计规范与禁忌',
    s8Title: '## 8. 响应式行为',
    s9Title: '## 9. AI 代理提示指南',

    // Section 1
    keyCharacteristics: '**关键特征：**',
    primaryFont: '主字体',
    monoFont: '等宽字体',
    monoFontSuffix: '用于代码元素',
    pageBg: '页面背景',
    primaryTextColor: '主文本颜色',
    primaryAccent: '主强调色',
    shadowSystem: (n) => `阴影系统包含 ${n} 个不同的阴影层级`,
    flatDesign: '扁平设计，极少使用阴影',
    commonRadius: '最常用的圆角半径',
    darkTheme: '默认深色主题',
    lightTheme: '默认浅色主题',
    browserThemeColor: '浏览器主题色',
    atmosphere: {
      darkThemed: '深色主题',
      immersive: '沉浸式',
      lightThemed: '浅色主题',
      clean: '简洁',
      layeredDepth: '层次分明',
      flatDesign: '扁平设计',
      richColor: '丰富的色彩体系',
      restrainedColor: '克制的色彩运用',
    },
    s1Presents: (site, atmo) => `${site} 的网站呈现出${atmo}的设计风格。`,
    s1Canvas: (isDark, bg) => `页面以${isDark ? '深色' : '浅色'}画布（\`${bg}\`）为底，`,
    s1PrimaryText: (color) => `主文本颜色为 \`${color}\`。`,
    s1AccentColor: (color) => `主强调色为 \`${color}\`，广泛应用于交互元素和关键视觉锚点。`,
    s1PrimaryTypeface: (font) => `主字体为 \`${font}\``,
    s1SecondaryFont: (font) => `，辅以 \`${font}\` 作为次要字体`,

    // Section 2
    primary: '### 主色',
    accentColors: '### 强调色',
    neutralScale: '### 中性色阶',
    surfaceBorders: '### 表面与边框',
    cssCustomProps: '### CSS 自定义属性',
    cssCustomPropsDesc: (n) => `网站定义了 ${n} 个颜色相关的 CSS 自定义属性，主要包括：`,
    colorNames: {
      pageBg: '页面背景',
      primaryText: '主文本',
      heading: '标题',
      link: '链接',
      buttonBg: '按钮背景',
      buttonText: '按钮文本',
      navBg: '导航背景',
      footerBg: '页脚背景',
      inputBg: '输入框背景',
    },
    colorDescs: {
      pageBg: '页面主背景色。',
      primaryText: '默认正文文本颜色。',
      heading: '主标题文本颜色。',
      link: '超链接文本颜色。',
      buttonBg: '主按钮背景色。',
      buttonText: '主按钮文本颜色。',
      navBg: '导航/头部背景色。',
      footerBg: '页脚区域背景色。',
      inputBg: '表单输入框背景色。',
    },
    neutralLabel: (l) => `中性色 ${l}%`,
    borderLabel: (hex) => `边框色 ${hex}`,
    surfaceLabel: (hex) => `表面色 ${hex}`,
    accentLabel: (hex) => `强调色 ${hex}`,
    usedFor: (roles, count) => `用于${roles}，出现 ${count} 次。`,
    borderColorDesc: (count) => `边框颜色，出现 ${count} 次。`,
    surfaceColorDesc: (count) => `浅色表面/背景色，出现 ${count} 次。`,

    // Section 3
    fontFamily: '### 字体族',
    primaryLabel: '**主字体**',
    secondaryLabel: '**次要字体**',
    monospaceLabel: '**等宽字体**',
    hierarchy: '### 层级体系',
    typoTableHeader: '| 角色 | 字体 | 字号 | 字重 | 行高 | 字间距 | 备注 |',
    principles: '### 原则',
    primaryFontUsed: (font) => `主字体 \`${font}\` 应用于所有主要文本元素`,
    fontWeightsUsed: (weights) => `使用的字重：${weights}`,
    sizeRange: (min, max) => `字号范围：${min}px 至 ${max}px`,

    // Section 4
    buttons: '### 按钮',
    cardsContainers: '### 卡片与容器',
    badgesTags: '### 徽章 / 标签',
    inputsForms: '### 输入框与表单',
    navigation: '### 导航',
    noButtons: '未检测到明显的按钮样式。按钮可能使用了工具类或框架默认样式。',
    noCards: '未检测到明显的卡片/容器样式。',
    noInputs: '首页未检测到表单输入框。',
    noNav: '未检测到导航元素。',
    navLinks: '**导航链接：**',
    btnVariants: ['主要', '次要'],
    btnVariantN: (n) => `变体 ${n}`,

    // Section 5
    spacingSystem: '### 间距系统',
    baseUnit: '基础单位',
    scale: '比例尺',
    gridContainer: '### 栅格与容器',
    maxContentWidth: '最大内容宽度',
    cssGridUsage: 'CSS Grid 使用',
    flexboxUsage: 'Flexbox 使用',
    elements: '个元素',
    primaryLayoutMethod: '主要布局方式',
    whitespacePhilosophy: '### 留白哲学',
    generousSpacing: '**宽松间距**：设计使用充裕的留白，营造出通透、高端的感觉。',
    balancedSpacing: '**均衡间距**：设计在信息密度和呼吸空间之间取得了平衡。',
    denseSpacing: '**紧凑间距**：设计偏好紧凑的布局和较小的间距。',
    borderRadiusScale: '### 圆角比例尺',
    radiusTableHeader: '| 圆角值 | 使用次数 |',
    noRadius: '未检测到明显的圆角使用（直角设计）。',

    // Section 6
    flatApproach: '该设计采用扁平风格，未检测到明显的 box-shadow 使用。',
    shadowTableHeader: '| 层级 | 阴影值 | 使用次数 |',
    flatTableHeader: '| 层级 | 处理方式 | 用途 |',
    flatRow: '| 扁平（层级 0） | 无阴影 | 所有元素 |',
    levelNames: ['微妙', '标准', '抬升', '深层', '戏剧化'],
    shadowPhilosophy: '**阴影设计哲学**：',
    multiLevelShadow: (n) => `设计采用了包含 ${n} 个不同层级的多层阴影系统，通过层深创造清晰的视觉层次。`,
    restrainedShadow: (n) => `设计采用克制的阴影方式，仅有 ${n} 个阴影层级，保持界面相对扁平，选择性地使用抬升效果。`,
    tintedShadows: '值得注意的是，阴影使用了带色调的颜色而非纯黑色，为层级系统增添了品牌氛围。',

    // Section 7
    doTitle: '### 推荐做法',
    dontTitle: '### 避免做法',
    doUseFont: (font) => `使用 \`${font}\` 作为所有文本元素的主字体`,
    doUseBg: (bg) => `使用 \`${bg}\` 作为页面背景色`,
    doUseTextColor: (color) => `使用 \`${color}\` 作为主正文文本颜色`,
    doUseHeadingColor: (color) => `使用 \`${color}\` 作为标题颜色`,
    doUseAccent: (color) => `使用 \`${color}\` 作为主强调色/交互色`,
    doUseWeight: (w) => `标题使用字重 ${w} —— 这是标志性字重`,
    doKeepRadius: (r) => `保持大多数元素的圆角一致为 \`${r}\``,
    doApplyShadow: '一致地应用阴影系统以建立层级关系',
    dontPureBlack: '不要使用纯黑色（`#000000`）作为文本颜色——设计使用了更柔和的深色',
    dontPureWhite: '不要使用纯白色（`#ffffff`）背景——保持深色主题',
    dontLargeRadius: '不要使用过大的圆角（药丸形状）——设计偏好保守的圆角',
    dontSharpCorners: '不要使用直角（0px 圆角）——设计偏好圆润的元素',
    dontHeavyShadows: '不要添加厚重的阴影——设计刻意保持扁平',
    dontMixFonts: '不要混用字体族——遵循已定义的字体系统',
    dontOutsidePalette: '不要使用调色板之外的颜色',
    dontOverrideSpacing: '不要用随意的值覆盖间距系统',

    // Section 8
    breakpoints: '### 断点',
    bpTableHeader: '| 名称 | 宽度 | 关键变化 |',
    noBpDetected: '在可访问的样式表中未检测到明确的媒体查询断点。网站可能使用了：',
    noBpOptions: ['容器查询', '基于 JavaScript 的响应式逻辑', 'CSS-in-JS 动态断点'],
    touchTargets: '### 触控目标',
    touchRules: [
      '按钮在移动端应保持最小 44px 的触控目标',
      '导航链接应有足够的间距以便触控交互',
      '表单输入框在移动端应至少 44px 高',
    ],
    collapsingStrategy: '### 折叠策略',
    collapseRules: [
      '导航：水平链接 → 移动端汉堡菜单',
      '多列布局 → 移动端单列堆叠',
      '排版比例在较小视口上压缩',
      '间距在移动端按比例缩小',
    ],
    gridAdapt: 'CSS Grid 布局通过 auto-fill/auto-fit 或显式模板变更进行适配',
    flexWrap: 'Flexbox 布局在较小屏幕上自然换行',
    bpNames: [
      { max: 480, name: '小屏手机', desc: '紧凑的移动端布局' },
      { max: 640, name: '手机', desc: '单列布局，缩小标题字号，卡片堆叠' },
      { max: 768, name: '平板竖屏', desc: '过渡布局，尽可能双列' },
      { max: 1024, name: '平板 / 小桌面', desc: '双列栅格，适中内边距' },
      { max: 1280, name: '桌面', desc: '完整布局，多列功能栅格' },
      { max: 1440, name: '大桌面', desc: '居中内容，宽裕外边距' },
      { max: 1920, name: '宽屏桌面', desc: '最大内容宽度，额外留白' },
      { max: Infinity, name: '超宽屏', desc: '内容居中，最大宽度约束' },
    ],

    // Section 9
    quickColorRef: '### 快速颜色参考',
    background: '背景',
    primaryTextLabel: '主文本',
    headingText: '标题文本',
    bodyText: '正文文本',
    linkLabel: '链接',
    buttonBgLabel: '按钮背景',
    navBgLabel: '导航背景',
    accentUsed: (hex, roles, count) => `强调色 \`${hex}\`：用于 ${roles}（${count}次）`,
    examplePrompts: '### 示例组件提示',
    iterationGuide: '### 迭代指南',
    alwaysUseFont: (font) => `始终使用 \`${font}\` 作为主字体`,
    fontWeightsLabel: '字重',
    pageBgText: (bg, text) => `页面背景：\`${bg}\`，文本：\`${text}\``,
    defaultRadius: '默认圆角',
    primaryShadow: '主阴影',
    spacingBaseUnit: '间距基础单位',
    heroPrompt: (bg, size, font, weight, lh, color) =>
      `"创建一个英雄区域，背景为 \`${bg}\`。标题使用 ${size} \`${font}\` 字重 ${weight}，行高 ${lh}，颜色 \`${color}\`。`,
    ctaPrompt: (bgColor, textColor, radius, padding) =>
      ` CTA 按钮：\`${bgColor}\` 背景，\`${textColor}\` 文本，${radius} 圆角，${padding} 内边距。"`,
    cardPrompt: (bg) => `"设计一个卡片：\`${bg}\` 背景`,
    navPrompt: (bg) => `"构建导航：\`${bg}\` 背景`,
  },
};

/**
 * Get i18n text helper
 * @param {string} lang - Language code ('en' or 'zh')
 * @returns {object} The i18n text object
 */
function t(lang) {
  return i18n[lang] || i18n.zh;
}

/**
 * Generate a complete DESIGN.md from extracted tokens
 * @param {object} tokens - Extracted design tokens from extractor
 * @param {string} siteName - Name of the website
 * @returns {string} The DESIGN.md content as a string
 */
function generateDesignMd(tokens, siteName, lang = 'zh') {
  const sections = [
    generateHeader(tokens, siteName),
    generateVisualTheme(tokens, siteName, lang),
    generateColorPalette(tokens, lang),
    generateTypography(tokens, lang),
    generateComponentStyles(tokens, lang),
    generateLayoutPrinciples(tokens, lang),
    generateDepthElevation(tokens, lang),
    generateDosAndDonts(tokens, siteName, lang),
    generateResponsiveBehavior(tokens, lang),
    generateAgentPromptGuide(tokens, siteName, lang),
  ];

  return sections.join('\n\n');
}

// ============================================================
// Header
// ============================================================
function generateHeader(tokens, siteName) {
  return `# Design System: ${siteName}`;
}

// ============================================================
// Section 1: Visual Theme & Atmosphere
// ============================================================
function generateVisualTheme(tokens, siteName, lang) {
  const L = t(lang);
  const { meta, colors, typography, shadows } = tokens;
  const isDark = meta.isDarkTheme;
  const primaryFont = typography.fontFamilies[0]?.family || 'system font';
  const primaryColor = colors.palette[0]?.hex || '#000000';
  const pageBg = colors.pageBg;

  // Determine atmosphere descriptors
  const atmosphere = [];
  if (isDark) {
    atmosphere.push(L.atmosphere.darkThemed, L.atmosphere.immersive);
  } else {
    atmosphere.push(L.atmosphere.lightThemed, L.atmosphere.clean);
  }

  if (shadows.length > 3) {
    atmosphere.push(L.atmosphere.layeredDepth);
  } else if (shadows.length === 0) {
    atmosphere.push(L.atmosphere.flatDesign);
  }

  const hasManyColors = colors.palette.length > 15;
  if (hasManyColors) {
    atmosphere.push(L.atmosphere.richColor);
  } else {
    atmosphere.push(L.atmosphere.restrainedColor);
  }

  let md = `${L.s1Title}\n\n`;
  md += L.s1Presents(siteName, atmosphere.join(lang === 'zh' ? '、' : ', '));
  md += L.s1Canvas(isDark, pageBg);
  md += L.s1PrimaryText(colors.pageColor);

  if (primaryColor !== colors.pageBg) {
    md += L.s1AccentColor(primaryColor);
  }

  md += `\n\n`;
  md += L.s1PrimaryTypeface(primaryFont);
  if (typography.fontFamilies.length > 1) {
    md += L.s1SecondaryFont(typography.fontFamilies[1]?.family);
  }
  md += `. `;

  if (meta.description) {
    md += `\n\n> ${meta.description}`;
  }

  md += `\n\n${L.keyCharacteristics}\n`;

  // Font characteristics
  md += `- ${L.primaryFont}: \`${primaryFont}\`\n`;
  if (typography.fontFamilies.length > 1) {
    const monoFont = typography.fontFamilies.find(
      (f) => /mono|code|consol/i.test(f.family)
    );
    if (monoFont) {
      md += `- ${L.monoFont}: \`${monoFont.family}\` ${L.monoFontSuffix}\n`;
    }
  }

  // Color characteristics
  md += `- ${L.pageBg}: \`${pageBg}\`\n`;
  md += `- ${L.primaryTextColor}: \`${colors.pageColor}\`\n`;
  if (colors.palette.length > 0) {
    md += `- ${L.primaryAccent}: \`${colors.palette[0].hex}\`\n`;
  }

  // Shadow characteristics
  if (shadows.length > 0) {
    md += `- ${L.shadowSystem(shadows.length)}\n`;
  } else {
    md += `- ${L.flatDesign}\n`;
  }

  // Border radius
  if (tokens.layout.borderRadiusScale.length > 0) {
    const topRadius = tokens.layout.borderRadiusScale[0].radius;
    md += `- ${L.commonRadius}: \`${topRadius}\`\n`;
  }

  // Theme
  md += `- ${isDark ? L.darkTheme : L.lightTheme}\n`;

  if (meta.themeColor) {
    md += `- ${L.browserThemeColor}: \`${meta.themeColor}\`\n`;
  }

  return md;
}

// ============================================================
// Section 2: Color Palette & Roles
// ============================================================
function generateColorPalette(tokens, lang) {
  const L = t(lang);
  const { colors, cssVariables } = tokens;
  let md = `${L.s2Title}\n\n`;

  // Categorize colors
  const categories = categorizeColors(colors, cssVariables, lang);

  // Primary colors
  if (categories.primary.length > 0) {
    md += `${L.primary}\n`;
    for (const c of categories.primary) {
      md += `- **${c.name}** (\`${c.hex}\`): ${c.description}\n`;
    }
    md += `\n`;
  }

  // Accent colors
  if (categories.accent.length > 0) {
    md += `${L.accentColors}\n`;
    for (const c of categories.accent) {
      md += `- **${c.name}** (\`${c.hex}\`): ${c.description}\n`;
    }
    md += `\n`;
  }

  // Neutral scale
  if (categories.neutral.length > 0) {
    md += `${L.neutralScale}\n`;
    for (const c of categories.neutral) {
      md += `- **${c.name}** (\`${c.hex}\`): ${c.description}\n`;
    }
    md += `\n`;
  }

  // Surface & Borders
  if (categories.surface.length > 0) {
    md += `${L.surfaceBorders}\n`;
    for (const c of categories.surface) {
      md += `- **${c.name}** (\`${c.hex}\`): ${c.description}\n`;
    }
    md += `\n`;
  }

  // CSS Variables section
  const colorVars = Object.entries(cssVariables).filter(([key, val]) => {
    return (
      (key.includes('color') || key.includes('bg') || key.includes('border') || key.includes('shadow')) &&
      (val.startsWith('#') || val.startsWith('rgb') || val.startsWith('hsl'))
    );
  });

  if (colorVars.length > 0) {
    md += `${L.cssCustomProps}\n`;
    md += `${L.cssCustomPropsDesc(colorVars.length)}\n\n`;
    for (const [key, val] of colorVars.slice(0, 20)) {
      const hex = parseColorValue(val);
      md += `- \`${key}\`: \`${hex || val}\`\n`;
    }
    md += `\n`;
  }

  return md;
}

/**
 * Categorize extracted colors into semantic groups
 */
function categorizeColors(colors, cssVariables, lang) {
  const L = t(lang);
  const categories = {
    primary: [],
    accent: [],
    neutral: [],
    surface: [],
  };

  // Page background and text are primary
  categories.primary.push({
    name: L.colorNames.pageBg,
    hex: colors.pageBg,
    description: L.colorDescs.pageBg,
  });
  categories.primary.push({
    name: L.colorNames.primaryText,
    hex: colors.pageColor,
    description: L.colorDescs.primaryText,
  });

  // Semantic colors
  const semantic = colors.semantic;
  if (semantic['heading-fg']) {
    categories.primary.push({
      name: L.colorNames.heading,
      hex: semantic['heading-fg'],
      description: L.colorDescs.heading,
    });
  }
  if (semantic['link-fg']) {
    categories.accent.push({
      name: L.colorNames.link,
      hex: semantic['link-fg'],
      description: L.colorDescs.link,
    });
  }
  if (semantic['button-bg']) {
    categories.accent.push({
      name: L.colorNames.buttonBg,
      hex: semantic['button-bg'],
      description: L.colorDescs.buttonBg,
    });
  }
  if (semantic['button-fg']) {
    categories.accent.push({
      name: L.colorNames.buttonText,
      hex: semantic['button-fg'],
      description: L.colorDescs.buttonText,
    });
  }
  if (semantic['navigation-bg']) {
    categories.surface.push({
      name: L.colorNames.navBg,
      hex: semantic['navigation-bg'],
      description: L.colorDescs.navBg,
    });
  }
  if (semantic['footer-bg']) {
    categories.surface.push({
      name: L.colorNames.footerBg,
      hex: semantic['footer-bg'],
      description: L.colorDescs.footerBg,
    });
  }
  if (semantic['input-bg']) {
    categories.surface.push({
      name: L.colorNames.inputBg,
      hex: semantic['input-bg'],
      description: L.colorDescs.inputBg,
    });
  }

  // Palette colors - categorize by hue and saturation
  for (const color of colors.palette) {
    const { h, s, l } = hexToHSL(color.hex);

    // Skip if already added
    const allAdded = [
      ...categories.primary,
      ...categories.accent,
      ...categories.neutral,
      ...categories.surface,
    ].map((c) => c.hex);
    if (allAdded.includes(color.hex)) continue;

    if (s < 10) {
      // Neutral / gray
      categories.neutral.push({
        name: L.neutralLabel(Math.round(l)),
        hex: color.hex,
        description: L.usedFor(color.roles.join(', '), color.count),
      });
    } else if (color.roles.includes('border')) {
      categories.surface.push({
        name: L.borderLabel(color.hex),
        hex: color.hex,
        description: L.borderColorDesc(color.count),
      });
    } else if (color.roles.includes('background') && l > 90) {
      categories.surface.push({
        name: L.surfaceLabel(color.hex),
        hex: color.hex,
        description: L.surfaceColorDesc(color.count),
      });
    } else {
      categories.accent.push({
        name: L.accentLabel(color.hex),
        hex: color.hex,
        description: L.usedFor(color.roles.join(', '), color.count),
      });
    }
  }

  // Limit each category
  categories.primary = categories.primary.slice(0, 5);
  categories.accent = categories.accent.slice(0, 8);
  categories.neutral = categories.neutral.slice(0, 8);
  categories.surface = categories.surface.slice(0, 6);

  return categories;
}

// ============================================================
// Section 3: Typography Rules
// ============================================================
function generateTypography(tokens, lang) {
  const L = t(lang);
  const { typography } = tokens;
  let md = `${L.s3Title}\n\n`;

  // Font families
  md += `${L.fontFamily}\n`;
  if (typography.fontFamilies.length > 0) {
    md += `- ${L.primaryLabel}: \`${typography.fontFamilies[0].family}\`\n`;
  }
  if (typography.fontFamilies.length > 1) {
    const mono = typography.fontFamilies.find((f) => /mono|code|consol/i.test(f.family));
    const secondary = typography.fontFamilies[1];
    if (mono && mono !== secondary) {
      md += `- ${L.secondaryLabel}: \`${secondary.family}\`\n`;
      md += `- ${L.monospaceLabel}: \`${mono.family}\`\n`;
    } else if (mono) {
      md += `- ${L.monospaceLabel}: \`${mono.family}\`\n`;
    } else {
      md += `- ${L.secondaryLabel}: \`${secondary.family}\`\n`;
    }
  }
  md += `\n`;

  // Typography hierarchy table
  md += `${L.hierarchy}\n\n`;
  md += `${L.typoTableHeader}\n`;
  md += `|------|------|------|--------|-------------|----------------|-------|\n`;

  for (const entry of typography.scale) {
    const notes = [];
    if (entry.textTransform && entry.textTransform !== 'none') {
      notes.push(entry.textTransform);
    }
    if (entry.fontFeatureSettings && entry.fontFeatureSettings !== 'normal') {
      notes.push(`features: ${entry.fontFeatureSettings}`);
    }
    if (entry.sampleText) {
      notes.push(`"${entry.sampleText.slice(0, 25)}..."`);
    }

    md += `| ${entry.role} | ${entry.fontFamily} | ${entry.fontSize} | ${entry.fontWeight} | ${entry.lineHeight} | ${entry.letterSpacing} | ${notes.join('; ') || '-'} |\n`;
  }

  md += `\n${L.principles}\n`;
  md += `- ${L.primaryFontUsed(typography.fontFamilies[0]?.family || 'system')}\n`;

  // Detect weight patterns
  const weights = typography.scale.map((e) => parseInt(e.fontWeight));
  const uniqueWeights = [...new Set(weights)].sort();
  md += `- ${L.fontWeightsUsed(uniqueWeights.join(', '))}\n`;

  // Detect size range
  const sizes = typography.scale.map((e) => parseFloat(e.fontSize)).filter((s) => !isNaN(s));
  if (sizes.length > 0) {
    md += `- ${L.sizeRange(Math.min(...sizes), Math.max(...sizes))}\n`;
  }

  return md;
}

// ============================================================
// Section 4: Component Stylings
// ============================================================
function generateComponentStyles(tokens, lang) {
  const L = t(lang);
  const { components } = tokens;
  let md = `${L.s4Title}\n\n`;

  // Buttons
  md += `${L.buttons}\n\n`;
  if (components.buttons.length > 0) {
    for (let i = 0; i < components.buttons.length; i++) {
      const btn = components.buttons[i];
      const variant = i < L.btnVariants.length ? L.btnVariants[i] : L.btnVariantN(i + 1);
      md += `**${variant}${btn.text ? ` ("${btn.text}")` : ''}**\n`;
      md += `- Background: \`${btn.background}\`\n`;
      md += `- Text: \`${btn.color}\`\n`;
      md += `- Padding: \`${btn.padding}\`\n`;
      md += `- Radius: \`${btn.borderRadius}\`\n`;
      md += `- Font: ${btn.fontSize} ${btn.fontFamily} weight ${btn.fontWeight}\n`;
      if (btn.border && btn.border !== 'none' && !btn.border.includes('0px')) {
        md += `- Border: \`${btn.border}\`\n`;
      }
      if (btn.boxShadow) {
        md += `- Shadow: \`${btn.boxShadow}\`\n`;
      }
      md += `\n`;
    }
  } else {
    md += `${L.noButtons}\n\n`;
  }

  // Cards & Containers
  md += `${L.cardsContainers}\n\n`;
  if (components.cards.length > 0) {
    for (let i = 0; i < components.cards.length; i++) {
      const card = components.cards[i];
      md += `**Card Style ${i + 1}**\n`;
      md += `- Background: \`${card.background}\`\n`;
      md += `- Radius: \`${card.borderRadius}\`\n`;
      if (card.border) {
        md += `- Border: \`${card.border}\`\n`;
      }
      if (card.boxShadow) {
        md += `- Shadow: \`${card.boxShadow}\`\n`;
      }
      if (card.padding) {
        md += `- Padding: \`${card.padding}\`\n`;
      }
      md += `\n`;
    }
  } else {
    md += `${L.noCards}\n\n`;
  }

  // Badges
  if (components.badges && components.badges.length > 0) {
    md += `${L.badgesTags}\n\n`;
    for (let i = 0; i < components.badges.length; i++) {
      const badge = components.badges[i];
      md += `**Badge Style ${i + 1}**\n`;
      md += `- Background: \`${badge.background}\`\n`;
      md += `- Text: \`${badge.color}\`\n`;
      md += `- Padding: \`${badge.padding}\`\n`;
      md += `- Radius: \`${badge.borderRadius}\`\n`;
      md += `- Font: ${badge.fontSize} weight ${badge.fontWeight}\n`;
      if (badge.border) {
        md += `- Border: \`${badge.border}\`\n`;
      }
      md += `\n`;
    }
  }

  // Inputs
  md += `${L.inputsForms}\n\n`;
  if (components.inputs.length > 0) {
    for (let i = 0; i < components.inputs.length; i++) {
      const input = components.inputs[i];
      md += `**Input Style ${i + 1}**\n`;
      md += `- Background: \`${input.background}\`\n`;
      md += `- Border: \`${input.border}\`\n`;
      md += `- Radius: \`${input.borderRadius}\`\n`;
      md += `- Padding: \`${input.padding}\`\n`;
      md += `- Font: ${input.fontSize}, color \`${input.color}\`\n`;
      md += `\n`;
    }
  } else {
    md += `${L.noInputs}\n\n`;
  }

  // Navigation
  md += `${L.navigation}\n\n`;
  if (components.navigation) {
    const nav = components.navigation;
    md += `- Background: \`${nav.background || 'transparent'}\`\n`;
    md += `- Position: \`${nav.position}\`\n`;
    if (nav.height) md += `- Height: \`${nav.height}\`\n`;
    if (nav.padding) md += `- Padding: \`${nav.padding}\`\n`;
    if (nav.boxShadow) md += `- Shadow: \`${nav.boxShadow}\`\n`;
    if (nav.borderBottom) md += `- Border bottom: \`${nav.borderBottom}\`\n`;
    if (nav.backdropFilter) md += `- Backdrop filter: \`${nav.backdropFilter}\`\n`;

    if (components.navLinks) {
      md += `\n${L.navLinks}\n`;
      md += `- Color: \`${components.navLinks.color}\`\n`;
      md += `- Font: ${components.navLinks.fontSize} weight ${components.navLinks.fontWeight}\n`;
      md += `- Text decoration: \`${components.navLinks.textDecoration}\`\n`;
    }
  } else {
    md += `${L.noNav}\n`;
  }

  return md;
}

// ============================================================
// Section 5: Layout Principles
// ============================================================
function generateLayoutPrinciples(tokens, lang) {
  const L = t(lang);
  const { layout } = tokens;
  let md = `${L.s5Title}\n\n`;

  // Spacing system
  md += `${L.spacingSystem}\n`;
  md += `- ${L.baseUnit}: \`${layout.baseUnit || 8}px\`\n`;
  if (layout.spacingScale.length > 0) {
    md += `- ${L.scale}: ${layout.spacingScale.map((v) => `${v}px`).join(', ')}\n`;
  }
  md += `\n`;

  // Grid & Container
  md += `${L.gridContainer}\n`;
  md += `- ${L.maxContentWidth}: \`${layout.maxContentWidth}\`\n`;
  md += `- ${L.cssGridUsage}: ${layout.gridUsage} ${L.elements}\n`;
  md += `- ${L.flexboxUsage}: ${layout.flexUsage} ${L.elements}\n`;
  md += `- ${L.primaryLayoutMethod}: ${layout.flexUsage > layout.gridUsage ? 'Flexbox' : 'CSS Grid'}\n`;
  md += `\n`;

  // Whitespace philosophy
  md += `${L.whitespacePhilosophy}\n`;
  const avgSpacing =
    layout.spacingScale.length > 0
      ? Math.round(layout.spacingScale.reduce((a, b) => a + b, 0) / layout.spacingScale.length)
      : 16;

  if (avgSpacing > 24) {
    md += `- ${L.generousSpacing}\n`;
  } else if (avgSpacing > 12) {
    md += `- ${L.balancedSpacing}\n`;
  } else {
    md += `- ${L.denseSpacing}\n`;
  }
  md += `\n`;

  // Border radius scale
  md += `${L.borderRadiusScale}\n`;
  if (layout.borderRadiusScale.length > 0) {
    md += `${L.radiusTableHeader}\n`;
    md += `|--------|-------------|\n`;
    for (const { radius, count } of layout.borderRadiusScale) {
      md += `| \`${radius}\` | ${count} |\n`;
    }
  } else {
    md += `${L.noRadius}\n`;
  }

  return md;
}

// ============================================================
// Section 6: Depth & Elevation
// ============================================================
function generateDepthElevation(tokens, lang) {
  const L = t(lang);
  const { shadows } = tokens;
  let md = `${L.s6Title}\n\n`;

  if (shadows.length === 0) {
    md += `${L.flatApproach}\n\n`;
    md += `${L.flatTableHeader}\n`;
    md += `|-------|-----------|-----|\n`;
    md += `${L.flatRow}\n`;
    return md;
  }

  md += `${L.shadowTableHeader}\n`;
  md += `|-------|-------------|-------------|\n`;

  const levelNames = L.levelNames;
  for (let i = 0; i < shadows.length; i++) {
    const { shadow, count } = shadows[i];
    const level = levelNames[Math.min(i, levelNames.length - 1)];
    // Truncate very long shadow values
    const displayShadow = shadow.length > 80 ? shadow.slice(0, 77) + '...' : shadow;
    md += `| ${level} (Level ${i + 1}) | \`${displayShadow}\` | ${count} |\n`;
  }

  md += `\n${L.shadowPhilosophy}`;
  if (shadows.length >= 3) {
    md += L.multiLevelShadow(shadows.length);
  } else if (shadows.length >= 1) {
    md += L.restrainedShadow(shadows.length);
  }

  // Detect if shadows use colored tints
  const hasColoredShadows = shadows.some(
    (s) => s.shadow.includes('rgba') && !s.shadow.match(/rgba\(\s*0\s*,\s*0\s*,\s*0/)
  );
  if (hasColoredShadows) {
    md += L.tintedShadows;
  }

  md += `\n`;

  return md;
}

// ============================================================
// Section 7: Do's and Don'ts
// ============================================================
function generateDosAndDonts(tokens, siteName, lang) {
  const L = t(lang);
  const { colors, typography, layout, shadows, meta } = tokens;
  let md = `${L.s7Title}\n\n`;

  const primaryFont = typography.fontFamilies[0]?.family || 'the primary font';
  const isDark = meta.isDarkTheme;

  md += `${L.doTitle}\n`;
  md += `- ${L.doUseFont(primaryFont)}\n`;

  if (colors.pageBg) {
    md += `- ${L.doUseBg(colors.pageBg)}\n`;
  }
  if (colors.pageColor) {
    md += `- ${L.doUseTextColor(colors.pageColor)}\n`;
  }
  if (colors.semantic['heading-fg']) {
    md += `- ${L.doUseHeadingColor(colors.semantic['heading-fg'])}\n`;
  }
  if (colors.palette[0]) {
    md += `- ${L.doUseAccent(colors.palette[0].hex)}\n`;
  }

  // Weight guidance
  const weights = typography.scale.map((e) => parseInt(e.fontWeight));
  const headingWeights = typography.scale
    .filter((e) => ['Display / Hero', 'Section Heading', 'Sub-heading'].includes(e.role))
    .map((e) => parseInt(e.fontWeight));
  if (headingWeights.length > 0) {
    const avgWeight = Math.round(headingWeights.reduce((a, b) => a + b, 0) / headingWeights.length);
    md += `- ${L.doUseWeight(avgWeight)}\n`;
  }

  if (layout.borderRadiusScale.length > 0) {
    const topRadius = layout.borderRadiusScale[0].radius;
    md += `- ${L.doKeepRadius(topRadius)}\n`;
  }

  if (shadows.length > 0) {
    md += `- ${L.doApplyShadow}\n`;
  }

  md += `\n${L.dontTitle}\n`;

  if (!isDark) {
    md += `- ${L.dontPureBlack}\n`;
  }
  if (isDark) {
    md += `- ${L.dontPureWhite}\n`;
  }

  if (layout.borderRadiusScale.length > 0) {
    const maxRadius = parseFloat(layout.borderRadiusScale[0].radius);
    if (maxRadius < 12) {
      md += `- ${L.dontLargeRadius}\n`;
    }
    if (maxRadius > 16) {
      md += `- ${L.dontSharpCorners}\n`;
    }
  }

  if (shadows.length === 0) {
    md += `- ${L.dontHeavyShadows}\n`;
  }

  md += `- ${L.dontMixFonts}\n`;
  md += `- ${L.dontOutsidePalette}\n`;
  md += `- ${L.dontOverrideSpacing}\n`;

  return md;
}

// ============================================================
// Section 8: Responsive Behavior
// ============================================================
function generateResponsiveBehavior(tokens, lang) {
  const L = t(lang);
  const { breakpoints, layout } = tokens;
  let md = `${L.s8Title}\n\n`;

  // Breakpoints
  md += `${L.breakpoints}\n`;
  if (breakpoints.length > 0) {
    md += `${L.bpTableHeader}\n`;
    md += `|------|-------|-------------|\n`;

    const bpNames = assignBreakpointNames(breakpoints, lang);
    for (const bp of bpNames) {
      md += `| ${bp.name} | ${bp.width}px | ${bp.description} |\n`;
    }
  } else {
    md += `${L.noBpDetected}\n`;
    for (const opt of L.noBpOptions) {
      md += `- ${opt}\n`;
    }
  }
  md += `\n`;

  // Touch targets
  md += `${L.touchTargets}\n`;
  for (const rule of L.touchRules) {
    md += `- ${rule}\n`;
  }
  md += `\n`;

  // Collapsing strategy
  md += `${L.collapsingStrategy}\n`;
  for (const rule of L.collapseRules) {
    md += `- ${rule}\n`;
  }

  if (layout.gridUsage > layout.flexUsage) {
    md += `- ${L.gridAdapt}\n`;
  } else {
    md += `- ${L.flexWrap}\n`;
  }

  return md;
}

// ============================================================
// Section 9: Agent Prompt Guide
// ============================================================
function generateAgentPromptGuide(tokens, siteName, lang) {
  const L = t(lang);
  const { colors, typography, components, layout, shadows } = tokens;
  let md = `${L.s9Title}\n\n`;

  // Quick color reference
  md += `${L.quickColorRef}\n`;
  md += `- ${L.background}: \`${colors.pageBg}\`\n`;
  md += `- ${L.primaryTextLabel}: \`${colors.pageColor}\`\n`;

  if (colors.semantic['heading-fg']) {
    md += `- ${L.headingText}: \`${colors.semantic['heading-fg']}\`\n`;
  }
  if (colors.semantic['body-text-fg']) {
    md += `- ${L.bodyText}: \`${colors.semantic['body-text-fg']}\`\n`;
  }
  if (colors.semantic['link-fg']) {
    md += `- ${L.linkLabel}: \`${colors.semantic['link-fg']}\`\n`;
  }
  if (colors.semantic['button-bg']) {
    md += `- ${L.buttonBgLabel}: \`${colors.semantic['button-bg']}\`\n`;
  }
  if (colors.semantic['navigation-bg']) {
    md += `- ${L.navBgLabel}: \`${colors.semantic['navigation-bg']}\`\n`;
  }

  // Top accent colors
  const accents = colors.palette.slice(0, 5);
  for (const c of accents) {
    md += `- ${L.accentUsed(c.hex, c.roles.join(', '), c.count)}\n`;
  }
  md += `\n`;

  // Example component prompts
  md += `${L.examplePrompts}\n\n`;

  const primaryFont = typography.fontFamilies[0]?.family || 'system font';

  // Hero section prompt
  const heroEntry = typography.scale.find((e) => e.role === 'Display / Hero');
  if (heroEntry) {
    md += `- ${L.heroPrompt(colors.pageBg, heroEntry.fontSize, primaryFont, heroEntry.fontWeight, heroEntry.lineHeight, colors.pageColor)}`;
    if (components.buttons[0]) {
      const btn = components.buttons[0];
      md += L.ctaPrompt(btn.background, btn.color, btn.borderRadius, btn.padding);
    } else {
      md += `"`;
    }
    md += `\n\n`;
  }

  // Card prompt
  if (components.cards[0]) {
    const card = components.cards[0];
    md += `- ${L.cardPrompt(card.background)}`;
    if (card.border) md += `, \`${card.border}\` border`;
    md += `, ${card.borderRadius} radius. `;
    if (card.boxShadow) md += `Shadow: \`${card.boxShadow}\`. `;
    md += `"\n\n`;
  }

  // Navigation prompt
  if (components.navigation) {
    const nav = components.navigation;
    md += `- ${L.navPrompt(nav.background || 'transparent')}`;
    if (nav.backdropFilter) md += `, backdrop-filter: ${nav.backdropFilter}`;
    md += `. `;
    if (components.navLinks) {
      md += `Links: ${components.navLinks.fontSize} weight ${components.navLinks.fontWeight}, `;
      md += `color \`${components.navLinks.color}\`. `;
    }
    md += `"\n\n`;
  }

  // Iteration guide
  md += `${L.iterationGuide}\n`;
  md += `1. ${L.alwaysUseFont(primaryFont)}\n`;

  const uniqueWeights = [...new Set(typography.scale.map((e) => e.fontWeight))].sort();
  md += `2. ${L.fontWeightsLabel}: ${uniqueWeights.join(', ')}\n`;

  md += `3. ${L.pageBgText(colors.pageBg, colors.pageColor)}\n`;

  if (layout.borderRadiusScale[0]) {
    md += `4. ${L.defaultRadius}: \`${layout.borderRadiusScale[0].radius}\`\n`;
  }

  if (shadows.length > 0) {
    md += `5. ${L.primaryShadow}: \`${shadows[0].shadow.slice(0, 80)}${shadows[0].shadow.length > 80 ? '...' : ''}\`\n`;
  }

  md += `6. ${L.spacingBaseUnit}: ${layout.baseUnit || 8}px\n`;

  return md;
}

// ============================================================
// Utility functions
// ============================================================

function hexToHSL(hex) {
  if (!hex || !hex.startsWith('#')) return { h: 0, s: 0, l: 0 };
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function parseColorValue(val) {
  if (!val) return null;
  if (val.startsWith('#')) return val.toLowerCase();
  const rgbMatch = val.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    return (
      '#' +
      [rgbMatch[1], rgbMatch[2], rgbMatch[3]]
        .map((x) => parseInt(x).toString(16).padStart(2, '0'))
        .join('')
    );
  }
  return val;
}

function assignBreakpointNames(breakpoints, lang) {
  const L = t(lang);
  const named = [];
  const nameMap = L.bpNames;

  for (const bp of breakpoints) {
    const match = nameMap.find((n) => bp <= n.max);
    if (match) {
      named.push({
        name: match.name,
        width: bp,
        description: match.desc,
      });
    }
  }

  return named;
}

module.exports = { generateDesignMd };
