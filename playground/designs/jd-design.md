# Design System: JD.com (京东)

## 1. Visual Theme & Atmosphere

JD.com's website presents a light-themed, vibrant, information-dense design. The page opens on a white canvas (`#ffffff`) with primary text in `#333333`. The dominant accent color is `#e1251b` (JD Red), which appears across the logo, CTAs, price tags, and key interactive elements.

The primary typeface is `Microsoft YaHei, PingFang SC, Helvetica Neue`, complemented by `Arial` as a fallback font.

> 多快好省，只为品质生活 — JD.com is China's leading e-commerce platform known for its reliable logistics and authentic products.

**Key Characteristics:**
- Primary font: `Microsoft YaHei, PingFang SC`
- Page background: `#f5f5f5`
- Primary text color: `#333333`
- Primary accent (JD Red): `#e1251b`
- Secondary accent: `#f2270c`
- Shadow system with 3 distinct shadow levels
- Most common border-radius: `8px`
- Light theme as default
- Dense, information-rich layout optimized for product browsing

## 2. Color Palette & Roles

### Primary
- **Page Background** (`#f5f5f5`): Main page background color.
- **Card Background** (`#ffffff`): Product cards and content areas.
- **Primary Text** (`#333333`): Default body text color.
- **Secondary Text** (`#666666`): Descriptions and secondary info.
- **Tertiary Text** (`#999999`): Placeholder and hint text.

### Accent Colors
- **JD Red** (`#e1251b`): Brand color, CTAs, price highlights, promotions.
- **Hot Red** (`#f2270c`): Flash sale badges, urgent promotions.
- **Orange** (`#f7a64c`): Star ratings, secondary promotions.
- **Link Blue** (`#005aa0`): Hyperlinks and breadcrumbs.
- **Success Green** (`#52c41a`): In-stock indicators, success states.

### Neutral Scale
- **Neutral 100** (`#f5f5f5`): Page background, section dividers.
- **Neutral 200** (`#eeeeee`): Borders, divider lines.
- **Neutral 300** (`#dddddd`): Input borders, disabled states.
- **Neutral 400** (`#cccccc`): Placeholder text.
- **Neutral 500** (`#999999`): Secondary labels.
- **Neutral 600** (`#666666`): Body text secondary.
- **Neutral 700** (`#333333`): Primary body text.
- **Neutral 900** (`#111111`): Headings, emphasis.

### Surface & Borders
- **Navigation Background** (`#e1251b`): Top navigation bar (JD Red).
- **Sub Navigation** (`#ffffff`): Category navigation background.
- **Footer Background** (`#5f5f5f`): Footer section background.
- **Card Border** (`#eeeeee`): Product card borders.
- **Promotion Banner** (`#fff1f0`): Light red promotion backgrounds.

## 3. Typography Rules

### Font Family
- **Primary**: `Microsoft YaHei, PingFang SC, Helvetica Neue, sans-serif`
- **Secondary**: `Arial, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | Microsoft YaHei | 28px | 700 | 1.3 | 0px | Banner headlines |
| Section Heading | Microsoft YaHei | 22px | 700 | 1.4 | 0px | Category titles |
| Sub-heading | Microsoft YaHei | 18px | 600 | 1.4 | 0px | Section sub-titles |
| Product Title | Microsoft YaHei | 14px | 400 | 1.5 | 0px | Product name in cards |
| Price Large | Microsoft YaHei | 24px | 700 | 1.2 | 0px | Main price display |
| Price Small | Microsoft YaHei | 14px | 700 | 1.2 | 0px | Comparison prices |
| Body | Microsoft YaHei | 14px | 400 | 1.6 | 0px | General body text |
| Caption | Microsoft YaHei | 12px | 400 | 1.5 | 0px | Labels, tags, meta |

### Principles
- Primary font `Microsoft YaHei` is used across all major text elements
- Font weights used: 400, 600, 700
- Size range: 12px to 28px
- Prices always use bold weight with JD Red color

## 4. Component Stylings

### Buttons

**Primary ("立即购买")**
- Background: `#e1251b`
- Text: `#ffffff`
- Padding: `8px 24px`
- Radius: `20px`
- Font: 14px Microsoft YaHei weight 600
- Hover: `#c91623`

**Secondary ("加入购物车")**
- Background: `#ffffff`
- Text: `#e1251b`
- Padding: `8px 24px`
- Radius: `20px`
- Font: 14px Microsoft YaHei weight 600
- Border: `1px solid #e1251b`

**Text Button ("查看更多")**
- Background: `transparent`
- Text: `#005aa0`
- Padding: `4px 0`
- Radius: `0`
- Font: 14px Microsoft YaHei weight 400

### Cards & Containers

**Product Card**
- Background: `#ffffff`
- Radius: `8px`
- Border: `none`
- Shadow: `0 2px 8px rgba(0, 0, 0, 0.06)`
- Padding: `0`
- Hover Shadow: `0 4px 16px rgba(0, 0, 0, 0.12)`

**Promotion Card**
- Background: `linear-gradient(135deg, #fff1f0, #ffffff)`
- Radius: `12px`
- Border: `1px solid #ffccc7`
- Padding: `16px`

### Badges / Tags

**Flash Sale Badge**
- Background: `#f2270c`
- Text: `#ffffff`
- Padding: `2px 8px`
- Radius: `4px`
- Font: 12px weight 600

**Self-operated Badge (京东自营)**
- Background: `#e1251b`
- Text: `#ffffff`
- Padding: `1px 4px`
- Radius: `2px`
- Font: 12px weight 400

**Coupon Badge**
- Background: `#fff1f0`
- Text: `#e1251b`
- Padding: `2px 6px`
- Radius: `4px`
- Font: 12px weight 400
- Border: `1px solid #ffccc7`

### Inputs & Forms

**Search Input**
- Background: `#ffffff`
- Border: `2px solid #e1251b`
- Radius: `0 20px 20px 0`
- Padding: `8px 16px`
- Font: 14px, color `#333333`

### Navigation

- Background: `#e1251b`
- Position: `fixed`
- Height: `40px`
- Padding: `0 16px`

**Nav Links:**
- Color: `#ffffff`
- Font: 14px weight 400
- Text decoration: `none`

## 5. Layout Principles

### Spacing System
- Base unit: `4px`
- Scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px

### Grid & Container
- Max content width: `1200px`
- Product grid: 4-5 columns on desktop
- CSS Grid usage: moderate
- Flexbox usage: heavy
- Primary layout method: Flexbox

### Whitespace Philosophy
- **Dense spacing**: The design favors compact layouts with tight spacing, maximizing product visibility per viewport.

### Border Radius Scale
| Radius | Usage Count |
|--------|-------------|
| `4px` | 120 |
| `8px` | 85 |
| `12px` | 40 |
| `20px` | 30 |
| `50%` | 15 |

## 6. Depth & Elevation

| Level | Shadow Value | Usage Count |
|-------|-------------|-------------|
| Subtle (Level 1) | `0 1px 4px rgba(0, 0, 0, 0.04)` | 80 |
| Standard (Level 2) | `0 2px 8px rgba(0, 0, 0, 0.08)` | 45 |
| Elevated (Level 3) | `0 4px 16px rgba(0, 0, 0, 0.12)` | 20 |

**Shadow Philosophy**: The design uses a restrained shadow approach with 3 shadow levels, keeping the interface relatively flat with selective elevation for product cards on hover and dropdown menus.

## 7. Do's and Don'ts

### Do
- Use `Microsoft YaHei` as the primary typeface for all text elements
- Use `#f5f5f5` as the page background color
- Use `#333333` for primary body text
- Use `#e1251b` (JD Red) as the primary accent/interactive color
- Use weight 700 for headings and prices
- Keep border-radius consistent at `8px` for cards, `20px` for buttons
- Apply the shadow system consistently for elevation hierarchy
- Display prices in bold JD Red with ¥ symbol
- Use dense grid layouts to maximize product visibility

### Don't
- Don't use colors outside the JD Red family for CTAs
- Don't use large border-radius (pill shapes) for cards
- Don't add heavy box-shadows — the design uses subtle elevation
- Don't mix font families — stick to the defined type system
- Don't use colors outside the defined palette
- Don't override the spacing system with arbitrary values
- Don't use light font weights for prices or headings

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | 640px | Single column, bottom tab navigation |
| Tablet Portrait | 768px | 2-column product grid |
| Tablet | 1024px | 3-column product grid |
| Desktop | 1200px | 4-5 column product grid, full navigation |

### Touch Targets
- Buttons should maintain minimum 44px touch target on mobile
- Product cards are full-width on mobile with larger tap areas
- Form inputs should be at least 44px tall on mobile

### Collapsing Strategy
- Navigation: horizontal category bar → hamburger menu on mobile
- Product grid: 4-5 columns → 2 columns → 1 column
- Sidebar filters → bottom sheet on mobile
- Typography scale compresses on smaller viewports

## 9. Agent Prompt Guide

### Quick Color Reference
- Background: `#f5f5f5`
- Card background: `#ffffff`
- Primary text: `#333333`
- Secondary text: `#666666`
- JD Red (brand): `#e1251b`
- Price color: `#e1251b`
- Link: `#005aa0`
- Success: `#52c41a`
- Navigation background: `#e1251b`

### Example Component Prompts

- "Create a product card with white background, 8px border-radius, subtle shadow `0 2px 8px rgba(0,0,0,0.06)`. Product image at top (1:1 ratio), title in 14px `Microsoft YaHei` weight 400 color `#333333`, price in 24px weight 700 color `#e1251b` with ¥ prefix. Add JD self-operated badge in red."

- "Design a product grid with 4 columns, 16px gap, on `#f5f5f5` background. Each card has hover effect with elevated shadow `0 4px 16px rgba(0,0,0,0.12)` and slight translateY(-2px)."

- "Build navigation: `#e1251b` background, fixed position. Logo on left, search bar centered with red border, user actions on right. Links: 14px weight 400, color `#ffffff`."

### Iteration Guide
1. Always use `Microsoft YaHei, PingFang SC` as the primary font
2. Font weights: 400, 600, 700
3. Page background: `#f5f5f5`, card background: `#ffffff`, text: `#333333`
4. Default border-radius: `8px` for cards, `20px` for buttons
5. Primary shadow: `0 2px 8px rgba(0, 0, 0, 0.08)`
6. Spacing base unit: 4px
7. All prices in `#e1251b` bold
8. Dense layout, maximize product visibility
