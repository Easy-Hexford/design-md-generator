/**
 * Design Token Extractor
 * Uses Puppeteer to visit a website and extract design tokens (colors, typography,
 * components, layout, shadows, etc.) from the live DOM and computed styles.
 */

const puppeteer = require('puppeteer');

/**
 * Main extraction function - visits the URL and extracts all design tokens
 * @param {string} url - The website URL to extract from
 * @param {object} options - Extraction options
 * @returns {object} Extracted design tokens
 */
async function extractDesignTokens(url, options = {}) {
  const { timeout = 30000, waitForSelector = null } = options;

  console.log(`🚀 Launching browser...`);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });

  try {
    const page = await browser.newPage();

    // Set a realistic viewport
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    // Set a realistic user agent
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    );

    console.log(`📡 Navigating to ${url}...`);
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout,
    });

    if (waitForSelector) {
      await page.waitForSelector(waitForSelector, { timeout: 10000 }).catch(() => {});
    }

    // Wait a bit for any animations/transitions to settle
    await new Promise((r) => setTimeout(r, 2000));

    console.log(`🔍 Extracting design tokens...`);

    // Extract all tokens in a single page.evaluate call for efficiency
    const tokens = await page.evaluate(() => {
      // ============================================================
      // Helper utilities
      // ============================================================

      function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
      }

      function parseColor(colorStr) {
        if (!colorStr || colorStr === 'transparent' || colorStr === 'none') return null;
        // Already hex
        if (colorStr.startsWith('#')) return colorStr.toLowerCase();
        // rgb/rgba
        const rgbMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (rgbMatch) {
          return rgbToHex(parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3]));
        }
        return colorStr;
      }

      function getComputedStyleSafe(el) {
        try {
          return window.getComputedStyle(el);
        } catch {
          return null;
        }
      }

      // ============================================================
      // 1. Extract CSS Custom Properties (CSS Variables)
      // ============================================================
      function extractCSSVariables() {
        const variables = {};
        try {
          for (const sheet of document.styleSheets) {
            try {
              const rules = sheet.cssRules || sheet.rules;
              if (!rules) continue;
              for (const rule of rules) {
                if (rule.style) {
                  for (let i = 0; i < rule.style.length; i++) {
                    const prop = rule.style[i];
                    if (prop.startsWith('--')) {
                      const value = rule.style.getPropertyValue(prop).trim();
                      if (value) {
                        variables[prop] = value;
                      }
                    }
                  }
                }
              }
            } catch {
              // Cross-origin stylesheet, skip
            }
          }
        } catch {
          // Fallback: read from :root computed style
        }

        // Also get computed values from :root
        const rootStyle = getComputedStyle(document.documentElement);
        for (const key of Object.keys(variables)) {
          const computed = rootStyle.getPropertyValue(key).trim();
          if (computed) {
            variables[key] = computed;
          }
        }

        return variables;
      }

      // ============================================================
      // 2. Extract Colors from elements
      // ============================================================
      function extractColors() {
        const colorMap = new Map(); // hex -> { count, roles: Set }
        const allElements = document.querySelectorAll('*');
        const sampleSize = Math.min(allElements.length, 500);

        for (let i = 0; i < sampleSize; i++) {
          const el = allElements[Math.floor((i / sampleSize) * allElements.length)];
          const style = getComputedStyleSafe(el);
          if (!style) continue;

          const colorProps = [
            { prop: 'color', role: 'text' },
            { prop: 'backgroundColor', role: 'background' },
            { prop: 'borderColor', role: 'border' },
            { prop: 'borderTopColor', role: 'border' },
            { prop: 'borderBottomColor', role: 'border' },
            { prop: 'outlineColor', role: 'outline' },
          ];

          for (const { prop, role } of colorProps) {
            const raw = style[prop];
            const hex = parseColor(raw);
            if (hex && hex !== '#000000' && hex !== '#ffffff' && hex.startsWith('#')) {
              if (!colorMap.has(hex)) {
                colorMap.set(hex, { count: 0, roles: new Set() });
              }
              const entry = colorMap.get(hex);
              entry.count++;
              entry.roles.add(role);
            }
          }
        }

        // Also extract background/text from key semantic elements
        const semanticSelectors = {
          'body': 'page-background',
          'header, nav, [role="banner"]': 'navigation',
          'main, [role="main"]': 'main-content',
          'footer, [role="contentinfo"]': 'footer',
          'h1, h2, h3': 'heading',
          'p': 'body-text',
          'a': 'link',
          'button, [role="button"]': 'button',
          'input, textarea, select': 'input',
        };

        const semanticColors = {};
        for (const [selector, role] of Object.entries(semanticSelectors)) {
          try {
            const el = document.querySelector(selector);
            if (el) {
              const style = getComputedStyleSafe(el);
              if (style) {
                const bg = parseColor(style.backgroundColor);
                const fg = parseColor(style.color);
                if (bg) semanticColors[`${role}-bg`] = bg;
                if (fg) semanticColors[`${role}-fg`] = fg;
              }
            }
          } catch {}
        }

        // Sort by frequency
        const sorted = [...colorMap.entries()]
          .sort((a, b) => b[1].count - a[1].count)
          .slice(0, 40)
          .map(([hex, data]) => ({
            hex,
            count: data.count,
            roles: [...data.roles],
          }));

        // Also capture black and white if used
        const bodyStyle = getComputedStyleSafe(document.body);
        const pageBg = bodyStyle ? parseColor(bodyStyle.backgroundColor) : '#ffffff';
        const pageColor = bodyStyle ? parseColor(bodyStyle.color) : '#000000';

        return {
          palette: sorted,
          semantic: semanticColors,
          pageBg: pageBg || '#ffffff',
          pageColor: pageColor || '#000000',
        };
      }

      // ============================================================
      // 3. Extract Typography
      // ============================================================
      function extractTypography() {
        const fontFamilies = new Map(); // family -> count
        const typographyScale = [];

        const textElements = document.querySelectorAll(
          'h1, h2, h3, h4, h5, h6, p, a, button, span, label, li, td, th, code, pre, blockquote, figcaption, small'
        );

        const seen = new Set();

        for (const el of textElements) {
          const style = getComputedStyleSafe(el);
          if (!style) continue;

          const family = style.fontFamily;
          if (family) {
            const primary = family.split(',')[0].trim().replace(/['"]/g, '');
            fontFamilies.set(primary, (fontFamilies.get(primary) || 0) + 1);
          }

          // Build typography scale entry
          const fontSize = style.fontSize;
          const fontWeight = style.fontWeight;
          const lineHeight = style.lineHeight;
          const letterSpacing = style.letterSpacing;
          const tag = el.tagName.toLowerCase();

          const key = `${tag}-${fontSize}-${fontWeight}`;
          if (!seen.has(key)) {
            seen.add(key);
            typographyScale.push({
              tag,
              role: getTypoRole(tag, el),
              fontFamily: family ? family.split(',')[0].trim().replace(/['"]/g, '') : 'inherit',
              fontSize,
              fontWeight,
              lineHeight,
              letterSpacing: letterSpacing === 'normal' ? 'normal' : letterSpacing,
              fontFeatureSettings: style.fontFeatureSettings || 'normal',
              textTransform: style.textTransform || 'none',
              sampleText: el.textContent?.trim().slice(0, 60) || '',
            });
          }
        }

        function getTypoRole(tag, el) {
          const roleMap = {
            h1: 'Display / Hero',
            h2: 'Section Heading',
            h3: 'Sub-heading',
            h4: 'Sub-heading Small',
            h5: 'Label',
            h6: 'Label Small',
            p: 'Body',
            a: 'Link',
            button: 'Button',
            span: 'Inline',
            label: 'Label',
            li: 'List Item',
            td: 'Table Cell',
            th: 'Table Header',
            code: 'Code',
            pre: 'Code Block',
            small: 'Caption',
            figcaption: 'Caption',
            blockquote: 'Blockquote',
          };
          return roleMap[tag] || 'Text';
        }

        // Sort font families by usage
        const sortedFamilies = [...fontFamilies.entries()]
          .sort((a, b) => b[1] - a[1])
          .map(([family, count]) => ({ family, count }));

        // Sort typography scale by font size (descending)
        typographyScale.sort((a, b) => {
          const sizeA = parseFloat(a.fontSize);
          const sizeB = parseFloat(b.fontSize);
          return sizeB - sizeA;
        });

        // Deduplicate by similar sizes
        const deduped = [];
        const sizesSeen = new Set();
        for (const entry of typographyScale) {
          const sizeKey = `${entry.role}-${Math.round(parseFloat(entry.fontSize))}`;
          if (!sizesSeen.has(sizeKey)) {
            sizesSeen.add(sizeKey);
            deduped.push(entry);
          }
        }

        return {
          fontFamilies: sortedFamilies,
          scale: deduped.slice(0, 25), // Top 25 entries
        };
      }

      // ============================================================
      // 4. Extract Component Styles
      // ============================================================
      function extractComponents() {
        const components = {};

        // Buttons
        const buttons = document.querySelectorAll('button, [role="button"], a.btn, .button, [class*="btn"]');
        const buttonStyles = [];
        const btnSeen = new Set();

        for (const btn of buttons) {
          const style = getComputedStyleSafe(btn);
          if (!style) continue;

          const key = `${parseColor(style.backgroundColor)}-${parseColor(style.color)}-${style.borderRadius}`;
          if (btnSeen.has(key)) continue;
          btnSeen.add(key);

          buttonStyles.push({
            text: btn.textContent?.trim().slice(0, 30) || '',
            background: parseColor(style.backgroundColor) || 'transparent',
            color: parseColor(style.color),
            padding: style.padding,
            borderRadius: style.borderRadius,
            border: style.border,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            fontFamily: style.fontFamily?.split(',')[0].trim().replace(/['"]/g, ''),
            boxShadow: style.boxShadow !== 'none' ? style.boxShadow : null,
            cursor: style.cursor,
          });
        }
        components.buttons = buttonStyles.slice(0, 8);

        // Cards / Containers
        const cardSelectors = [
          '[class*="card"]', '[class*="Card"]',
          '[class*="panel"]', '[class*="Panel"]',
          '[class*="tile"]', '[class*="Tile"]',
          '[class*="container"]',
          'article', 'section > div',
        ];
        const cards = document.querySelectorAll(cardSelectors.join(', '));
        const cardStyles = [];
        const cardSeen = new Set();

        for (const card of cards) {
          const style = getComputedStyleSafe(card);
          if (!style) continue;

          const bg = parseColor(style.backgroundColor);
          const radius = style.borderRadius;
          const shadow = style.boxShadow;
          const border = style.border;

          const key = `${bg}-${radius}-${shadow?.slice(0, 30)}`;
          if (cardSeen.has(key)) continue;
          cardSeen.add(key);

          if (bg || (shadow && shadow !== 'none') || (radius && radius !== '0px')) {
            cardStyles.push({
              background: bg || 'transparent',
              borderRadius: radius,
              boxShadow: shadow !== 'none' ? shadow : null,
              border: border !== 'none' ? border : null,
              padding: style.padding,
              overflow: style.overflow,
            });
          }
        }
        components.cards = cardStyles.slice(0, 6);

        // Inputs
        const inputs = document.querySelectorAll('input, textarea, select');
        const inputStyles = [];
        const inputSeen = new Set();

        for (const input of inputs) {
          const style = getComputedStyleSafe(input);
          if (!style) continue;

          const key = `${style.border}-${style.borderRadius}-${parseColor(style.backgroundColor)}`;
          if (inputSeen.has(key)) continue;
          inputSeen.add(key);

          inputStyles.push({
            background: parseColor(style.backgroundColor),
            border: style.border,
            borderRadius: style.borderRadius,
            padding: style.padding,
            fontSize: style.fontSize,
            color: parseColor(style.color),
            outline: style.outline,
          });
        }
        components.inputs = inputStyles.slice(0, 4);

        // Navigation
        const nav = document.querySelector('nav, header, [role="navigation"], [role="banner"]');
        if (nav) {
          const navStyle = getComputedStyleSafe(nav);
          if (navStyle) {
            components.navigation = {
              background: parseColor(navStyle.backgroundColor),
              position: navStyle.position,
              height: navStyle.height,
              padding: navStyle.padding,
              boxShadow: navStyle.boxShadow !== 'none' ? navStyle.boxShadow : null,
              borderBottom: navStyle.borderBottom !== 'none' ? navStyle.borderBottom : null,
              backdropFilter: navStyle.backdropFilter || navStyle.webkitBackdropFilter || null,
            };
          }

          // Nav links
          const navLinks = nav.querySelectorAll('a');
          if (navLinks.length > 0) {
            const linkStyle = getComputedStyleSafe(navLinks[0]);
            if (linkStyle) {
              components.navLinks = {
                color: parseColor(linkStyle.color),
                fontSize: linkStyle.fontSize,
                fontWeight: linkStyle.fontWeight,
                textDecoration: linkStyle.textDecoration,
              };
            }
          }
        }

        // Badges / Tags
        const badges = document.querySelectorAll(
          '[class*="badge"], [class*="Badge"], [class*="tag"], [class*="Tag"], [class*="chip"], [class*="Chip"], [class*="pill"], [class*="Pill"]'
        );
        const badgeStyles = [];
        for (const badge of badges) {
          const style = getComputedStyleSafe(badge);
          if (!style) continue;
          badgeStyles.push({
            background: parseColor(style.backgroundColor),
            color: parseColor(style.color),
            padding: style.padding,
            borderRadius: style.borderRadius,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            border: style.border !== 'none' ? style.border : null,
          });
          if (badgeStyles.length >= 4) break;
        }
        components.badges = badgeStyles;

        return components;
      }

      // ============================================================
      // 5. Extract Layout & Spacing
      // ============================================================
      function extractLayout() {
        const layout = {};

        // Max width of main content
        const contentContainers = document.querySelectorAll(
          'main, [role="main"], .container, [class*="container"], [class*="wrapper"], [class*="content"]'
        );
        const maxWidths = [];
        for (const el of contentContainers) {
          const style = getComputedStyleSafe(el);
          if (style) {
            const mw = style.maxWidth;
            if (mw && mw !== 'none' && mw !== '0px') {
              maxWidths.push(mw);
            }
          }
        }
        layout.maxContentWidth = maxWidths.length > 0 ? maxWidths[0] : 'not detected';

        // Collect spacing values used
        const spacingValues = new Map();
        const sampleElements = document.querySelectorAll('*');
        const sampleCount = Math.min(sampleElements.length, 300);

        for (let i = 0; i < sampleCount; i++) {
          const el = sampleElements[Math.floor((i / sampleCount) * sampleElements.length)];
          const style = getComputedStyleSafe(el);
          if (!style) continue;

          for (const prop of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
            'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'gap', 'rowGap', 'columnGap']) {
            const val = style[prop];
            if (val && val !== '0px' && val !== 'auto' && val !== 'normal') {
              const px = parseFloat(val);
              if (!isNaN(px) && px > 0 && px <= 200) {
                spacingValues.set(px, (spacingValues.get(px) || 0) + 1);
              }
            }
          }
        }

        // Sort and find the spacing scale
        const sortedSpacing = [...spacingValues.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 20)
          .map(([px]) => px)
          .sort((a, b) => a - b);

        layout.spacingScale = sortedSpacing;

        // Detect base unit (most common small spacing)
        const smallSpacing = sortedSpacing.filter((v) => v >= 4 && v <= 16);
        if (smallSpacing.length > 0) {
          // Find GCD-like base
          const candidates = [4, 8, 6, 5, 10];
          let bestBase = 8;
          let bestScore = 0;
          for (const base of candidates) {
            const score = smallSpacing.filter((v) => v % base === 0).length;
            if (score > bestScore) {
              bestScore = score;
              bestBase = base;
            }
          }
          layout.baseUnit = bestBase;
        }

        // Border radius values
        const radiusValues = new Map();
        for (let i = 0; i < sampleCount; i++) {
          const el = sampleElements[Math.floor((i / sampleCount) * sampleElements.length)];
          const style = getComputedStyleSafe(el);
          if (!style) continue;
          const radius = style.borderRadius;
          if (radius && radius !== '0px') {
            radiusValues.set(radius, (radiusValues.get(radius) || 0) + 1);
          }
        }

        layout.borderRadiusScale = [...radiusValues.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([radius, count]) => ({ radius, count }));

        // Grid / Flexbox usage
        let gridCount = 0;
        let flexCount = 0;
        for (let i = 0; i < sampleCount; i++) {
          const el = sampleElements[Math.floor((i / sampleCount) * sampleElements.length)];
          const style = getComputedStyleSafe(el);
          if (!style) continue;
          if (style.display === 'grid' || style.display === 'inline-grid') gridCount++;
          if (style.display === 'flex' || style.display === 'inline-flex') flexCount++;
        }
        layout.gridUsage = gridCount;
        layout.flexUsage = flexCount;

        return layout;
      }

      // ============================================================
      // 6. Extract Shadows & Depth
      // ============================================================
      function extractShadows() {
        const shadowMap = new Map();
        const allElements = document.querySelectorAll('*');
        const sampleSize = Math.min(allElements.length, 400);

        for (let i = 0; i < sampleSize; i++) {
          const el = allElements[Math.floor((i / sampleSize) * allElements.length)];
          const style = getComputedStyleSafe(el);
          if (!style) continue;

          const shadow = style.boxShadow;
          if (shadow && shadow !== 'none') {
            shadowMap.set(shadow, (shadowMap.get(shadow) || 0) + 1);
          }
        }

        return [...shadowMap.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([shadow, count]) => ({ shadow, count }));
      }

      // ============================================================
      // 7. Extract Meta Information
      // ============================================================
      function extractMeta() {
        const title = document.title || '';
        const metaDesc = document.querySelector('meta[name="description"]')?.content || '';
        const themeColor = document.querySelector('meta[name="theme-color"]')?.content || '';
        const ogImage = document.querySelector('meta[property="og:image"]')?.content || '';
        const ogTitle = document.querySelector('meta[property="og:title"]')?.content || '';
        const favicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]')?.href || '';

        // Detect dark mode preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const bodyBg = getComputedStyleSafe(document.body)?.backgroundColor;
        const bodyBgHex = parseColor(bodyBg);
        const isDarkTheme = bodyBgHex && parseInt(bodyBgHex.slice(1), 16) < 0x808080;

        return {
          title,
          description: metaDesc,
          themeColor,
          ogImage,
          ogTitle,
          favicon,
          isDarkTheme,
        };
      }

      // ============================================================
      // 8. Extract Responsive / Media Queries
      // ============================================================
      function extractMediaQueries() {
        const breakpoints = new Set();

        for (const sheet of document.styleSheets) {
          try {
            const rules = sheet.cssRules || sheet.rules;
            if (!rules) continue;
            for (const rule of rules) {
              if (rule.type === CSSRule.MEDIA_RULE) {
                const media = rule.conditionText || rule.media?.mediaText || '';
                const widthMatch = media.match(/(?:min|max)-width:\s*(\d+(?:\.\d+)?)(px|em|rem)/g);
                if (widthMatch) {
                  for (const m of widthMatch) {
                    const val = m.match(/(\d+(?:\.\d+)?)(px|em|rem)/);
                    if (val) {
                      let px = parseFloat(val[1]);
                      if (val[2] === 'em' || val[2] === 'rem') px *= 16;
                      breakpoints.add(Math.round(px));
                    }
                  }
                }
              }
            }
          } catch {
            // Cross-origin
          }
        }

        return [...breakpoints].sort((a, b) => a - b);
      }

      // ============================================================
      // 9. Extract full page HTML structure summary
      // ============================================================
      function extractStructureSummary() {
        const body = document.body;
        if (!body) return '';

        function summarize(el, depth = 0) {
          if (depth > 3) return '';
          const tag = el.tagName?.toLowerCase();
          if (!tag) return '';
          const cls = el.className && typeof el.className === 'string'
            ? el.className.split(/\s+/).slice(0, 3).join('.')
            : '';
          const id = el.id ? `#${el.id}` : '';
          const indent = '  '.repeat(depth);
          let result = `${indent}<${tag}${id}${cls ? '.' + cls : ''}>\n`;

          for (const child of el.children) {
            result += summarize(child, depth + 1);
          }
          return result;
        }

        // Only top-level structure
        let structure = '';
        for (const child of body.children) {
          structure += summarize(child, 0);
        }
        return structure.slice(0, 3000); // Limit size
      }

      // ============================================================
      // Run all extractors
      // ============================================================
      return {
        cssVariables: extractCSSVariables(),
        colors: extractColors(),
        typography: extractTypography(),
        components: extractComponents(),
        layout: extractLayout(),
        shadows: extractShadows(),
        meta: extractMeta(),
        breakpoints: extractMediaQueries(),
        structure: extractStructureSummary(),
        url: window.location.href,
        timestamp: new Date().toISOString(),
      };
    });

    console.log(`✅ Extraction complete!`);

    // Also take a screenshot for reference
    const screenshotPath = options.screenshotPath;
    if (screenshotPath) {
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`📸 Screenshot saved to ${screenshotPath}`);
    }

    return tokens;
  } finally {
    await browser.close();
  }
}

module.exports = { extractDesignTokens };
