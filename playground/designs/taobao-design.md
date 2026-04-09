# Design System: Taobao (淘宝)

## 1. Visual Theme & Atmosphere

Taobao's website presents a light-themed, warm, discovery-oriented design. The page opens on a warm white canvas (`#ffffff`) with primary text in `#3c3c3c`. The dominant accent color is `#ff5000` (Taobao Orange), which appears across the logo, promotions, price tags, and key interactive elements.

The primary typeface is `PingFang SC, Microsoft YaHei, Helvetica Neue`, complemented by `Arial` as a fallback font.

> 淘！我喜欢 — Taobao is China's largest consumer-to-consumer e-commerce platform, known for its vast product variety and personalized shopping experience.

**Key Characteristics:**
- Primary font: `PingFang SC, Microsoft YaHei`
- Page background: `#f5f5f5`
- Primary text color: `#3c3c3c`
- Primary accent (Taobao Orange): `#ff5000`
- Secondary accent: `#ff2d54`
- Shadow system with 2 distinct shadow levels
- Most common border-radius: `12px`
- Light theme as default
- Card-based discovery layout with rounded, modern aesthetics

## 2. Color Palette & Roles

### Primary
- **Page Background** (`#f5f5f5`): Main page background color.
- **Card Background** (`#ffffff`): Product cards and content areas.
- **Primary Text** (`#3c3c3c`): Default body text color.
- **Secondary Text** (`#7f7f7f`): Descriptions and secondary info.
- **Tertiary Text** (`#b0b0b0`): Placeholder and hint text.

### Accent Colors
- **Taobao Orange** (`#ff5000`): Brand color, primary CTAs, price highlights.
- **Hot Pink** (`#ff2d54`): Flash deals, live streaming badges.
- **Promotion Red** (`#ff4444`): Coupon and discount highlights.
- **Gold** (`#ffb400`): Star ratings, VIP indicators.
- **Link Orange** (`#ff6600`): Hyperlinks and interactive text.
- **Gradient Start** (`#ff5000`): Gradient button start.
- **Gradient End** (`#ff2d54`): Gradient button end.

### Neutral Scale
- **Neutral 50** (`#fafafa`): Subtle backgrounds.
- **Neutral 100** (`#f5f5f5`): Page background, section dividers.
- **Neutral 200** (`#eeeeee`): Borders, divider lines.
- **Neutral 300** (`#d9d9d9`): Input borders, disabled states.
- **Neutral 400** (`#b0b0b0`): Placeholder text.
- **Neutral 500** (`#7f7f7f`): Secondary labels.
- **Neutral 700** (`#3c3c3c`): Primary body text.
- **Neutral 900** (`#1a1a1a`): Headings, emphasis.

### Surface & Borders
- **Navigation Background** (`#ffffff`): Top navigation bar (clean white).
- **Category Background** (`#ff5000`): Category section with orange gradient.
- **Footer Background** (`#f2f2f2`): Footer section background.
- **Card Border** (`transparent`): Cards rely on shadow, not borders.
- **Promotion Surface** (`#fff5f0`): Light orange promotion backgrounds.

## 3. Typography Rules

### Font Family
- **Primary**: `PingFang SC, Microsoft YaHei, Helvetica Neue, sans-serif`
- **Secondary**: `Arial, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | PingFang SC | 32px | 600 | 1.3 | -0.5px | Banner headlines |
| Section Heading | PingFang SC | 20px | 600 | 1.4 | 0px | Category titles |
| Sub-heading | PingFang SC | 16px | 500 | 1.4 | 0px | Section sub-titles |
| Product Title | PingFang SC | 14px | 400 | 1.5 | 0px | Two-line clamp |
| Price Large | DIN Alternate, PingFang SC | 22px | 700 | 1.2 | 0px | Main price display |
| Price Small | DIN Alternate, PingFang SC | 12px | 400 | 1.2 | 0px | Strikethrough original price |
| Body | PingFang SC | 14px | 400 | 1.6 | 0px | General body text |
| Caption | PingFang SC | 12px | 400 | 1.5 | 0px | Labels, tags, meta |

### Principles
- Primary font `PingFang SC` is used across all major text elements
- Font weights used: 400, 500, 600, 700
- Size range: 12px to 32px
- Prices use `DIN Alternate` for a modern numeric feel, fallback to system font
- Product titles are limited to 2 lines with ellipsis overflow

## 4. Component Stylings

### Buttons

**Primary ("立即购买")**
- Background: `linear-gradient(135deg, #ff5000, #ff2d54)`
- Text: `#ffffff`
- Padding: `10px 28px`
- Radius: `24px`
- Font: 14px PingFang SC weight 600
- Shadow: `0 4px 12px rgba(255, 80, 0, 0.3)`

**Secondary ("加入购物车")**
- Background: `#ffffff`
- Text: `#ff5000`
- Padding: `10px 28px`
- Radius: `24px`
- Font: 14px PingFang SC weight 500
- Border: `1px solid #ff5000`

**Tag Button ("猜你喜欢")**
- Background: `#fff5f0`
- Text: `#ff5000`
- Padding: `6px 16px`
- Radius: `16px`
- Font: 13px PingFang SC weight 400

### Cards & Containers

**Product Card (Waterfall)**
- Background: `#ffffff`
- Radius: `12px`
- Border: `none`
- Shadow: `0 1px 6px rgba(0, 0, 0, 0.05)`
- Padding: `0`
- Overflow: `hidden`
- Image aspect ratio: variable (waterfall layout)

**Promotion Card**
- Background: `linear-gradient(135deg, #fff5f0, #ffffff)`
- Radius: `16px`
- Padding: `16px`
- Shadow: `0 2px 8px rgba(255, 80, 0, 0.1)`

### Badges / Tags

**Live Badge**
- Background: `linear-gradient(135deg, #ff2d54, #ff5000)`
- Text: `#ffffff`
- Padding: `2px 8px`
- Radius: `8px`
- Font: 11px weight 600

**Coupon Badge**
- Background: `#ff5000`
- Text: `#ffffff`
- Padding: `2px 6px`
- Radius: `4px`
- Font: 11px weight 500

**Sales Count Badge**
- Background: `transparent`
- Text: `#7f7f7f`
- Padding: `0`
- Radius: `0`
- Font: 12px weight 400

### Inputs & Forms

**Search Input**
- Background: `#f5f5f5`
- Border: `none`
- Radius: `20px`
- Padding: `10px 16px`
- Font: 14px, color `#3c3c3c`
- Placeholder color: `#b0b0b0`

### Navigation

- Background: `#ffffff`
- Position: `sticky`
- Height: `48px`
- Padding: `0 16px`
- Border bottom: `1px solid #f0f0f0`

**Nav Links:**
- Color: `#3c3c3c`
- Font: 14px weight 500
- Text decoration: `none`
- Active color: `#ff5000`

## 5. Layout Principles

### Spacing System
- Base unit: `8px`
- Scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px

### Grid & Container
- Max content width: `1190px`
- Product grid: Waterfall 2-column (mobile), 4-5 column (desktop)
- CSS Grid usage: moderate
- Flexbox usage: heavy
- Primary layout method: CSS Grid for product waterfall, Flexbox for structure

### Whitespace Philosophy
- **Balanced spacing**: The design strikes a balance between density and breathing room, with generous card gaps and rounded corners creating a friendly, approachable feel.

### Border Radius Scale
| Radius | Usage Count |
|--------|-------------|
| `8px` | 60 |
| `12px` | 95 |
| `16px` | 45 |
| `24px` | 35 |
| `50%` | 20 |

## 6. Depth & Elevation

| Level | Shadow Value | Usage Count |
|-------|-------------|-------------|
| Subtle (Level 1) | `0 1px 6px rgba(0, 0, 0, 0.05)` | 100 |
| Standard (Level 2) | `0 2px 12px rgba(0, 0, 0, 0.08)` | 30 |

**Shadow Philosophy**: The design uses a minimal shadow approach with 2 shadow levels, creating a clean, modern feel. Cards float gently above the background with very subtle shadows, emphasizing content over chrome.

## 7. Do's and Don'ts

### Do
- Use `PingFang SC` as the primary typeface for all text elements
- Use `#f5f5f5` as the page background color
- Use `#3c3c3c` for primary body text
- Use `#ff5000` (Taobao Orange) as the primary accent/interactive color
- Use gradient buttons (`#ff5000` → `#ff2d54`) for primary CTAs
- Use weight 600 for headings — this is the signature weight
- Keep border-radius at `12px` for cards, `24px` for buttons
- Use waterfall/masonry layout for product discovery feeds
- Display prices with `DIN Alternate` font for modern numeric feel
- Use warm color tones throughout the interface

### Don't
- Don't use pure black (`#000000`) for text — use `#3c3c3c` or softer darks
- Don't use sharp corners (0px radius) — the design favors rounded elements
- Don't add heavy box-shadows — the design is intentionally light and airy
- Don't mix font families — stick to the defined type system
- Don't use colors outside the defined palette
- Don't override the spacing system with arbitrary values
- Don't use cold blue tones — Taobao's palette is warm (orange/red family)

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | 640px | 2-column waterfall, bottom tab navigation |
| Tablet Portrait | 768px | 3-column product grid |
| Tablet | 1024px | 4-column product grid |
| Desktop | 1190px | Full layout, 4-5 column grid, sidebar |

### Touch Targets
- Buttons should maintain minimum 44px touch target on mobile
- Product cards are tappable with generous padding
- Form inputs should be at least 44px tall on mobile

### Collapsing Strategy
- Navigation: horizontal tabs → bottom tab bar on mobile
- Product grid: 4-5 columns → 2-column waterfall on mobile
- Sidebar categories → horizontal scrollable chips on mobile
- Typography scale compresses on smaller viewports
- Flexbox layouts wrap naturally on smaller screens

## 9. Agent Prompt Guide

### Quick Color Reference
- Background: `#f5f5f5`
- Card background: `#ffffff`
- Primary text: `#3c3c3c`
- Secondary text: `#7f7f7f`
- Taobao Orange (brand): `#ff5000`
- Price color: `#ff5000`
- Gradient CTA: `linear-gradient(135deg, #ff5000, #ff2d54)`
- Link: `#ff6600`
- Success: `#52c41a`
- Navigation background: `#ffffff`

### Example Component Prompts

- "Create a product card with white background, 12px border-radius, subtle shadow `0 1px 6px rgba(0,0,0,0.05)`. Product image at top (variable height for waterfall), title in 14px `PingFang SC` weight 400 color `#3c3c3c` (2-line clamp), price in 22px `DIN Alternate` weight 700 color `#ff5000` with ¥ prefix. Add sales count in gray below."

- "Design a waterfall product grid with 2 columns on mobile, 12px gap, on `#f5f5f5` background. Cards have rounded corners and minimal shadow for a clean, modern feel."

- "Build navigation: white background, sticky position, subtle bottom border. Logo on left, search bar centered with rounded `#f5f5f5` background, user actions on right. Active tab: `#ff5000` with bottom indicator."

### Iteration Guide
1. Always use `PingFang SC, Microsoft YaHei` as the primary font
2. Font weights: 400, 500, 600, 700
3. Page background: `#f5f5f5`, card background: `#ffffff`, text: `#3c3c3c`
4. Default border-radius: `12px` for cards, `24px` for buttons
5. Primary shadow: `0 1px 6px rgba(0, 0, 0, 0.05)`
6. Spacing base unit: 8px
7. All prices in `#ff5000` bold, use `DIN Alternate` for numbers
8. Warm, rounded, discovery-oriented layout
