/**
 * Local Source Code Design Token Extractor
 * Statically analyzes local source code files to extract design tokens
 * (colors, typography, components, layout, shadows, etc.) without a browser.
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// File discovery
// ============================================================

const STYLE_EXTENSIONS = new Set(['.css', '.scss', '.sass', '.less', '.styl', '.stylus', '.wxss', '.acss']);
const TEMPLATE_EXTENSIONS = new Set(['.html', '.htm', '.jsx', '.tsx', '.vue', '.svelte', '.wxml', '.axml', '.swan']);
const CONFIG_FILES = new Set([
  'tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.mjs', 'tailwind.config.cjs',
  'theme.js', 'theme.ts', 'tokens.js', 'tokens.ts', 'tokens.json',
  'design-tokens.json', 'design-tokens.js',
]);
const ALL_EXTENSIONS = new Set([...STYLE_EXTENSIONS, ...TEMPLATE_EXTENSIONS, '.js', '.ts']);

const IGNORE_DIRS = new Set([
  'node_modules', '.git', '.next', '.nuxt', 'dist', 'build', 'out',
  '.cache', 'coverage', '.turbo', '.vercel', '.output', 'vendor',
]);

/**
 * Recursively find all relevant source files in a directory
 */
function findSourceFiles(dir, options = {}) {
  const { include = [], exclude = [], maxDepth = 10 } = options;
  const files = { styles: [], templates: [], configs: [] };

  function walk(currentDir, depth) {
    if (depth > maxDepth) return;

    let entries;
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relativePath = path.relative(dir, fullPath);

      // Check exclude patterns
      if (exclude.length > 0 && exclude.some((p) => relativePath.includes(p))) continue;

      if (entry.isDirectory()) {
        if (IGNORE_DIRS.has(entry.name)) continue;
        walk(fullPath, depth + 1);
      } else if (entry.isFile()) {
        // Check include patterns (if specified, only include matching files)
        if (include.length > 0 && !include.some((p) => relativePath.includes(p))) continue;

        const ext = path.extname(entry.name).toLowerCase();
        const basename = entry.name.toLowerCase();

        if (CONFIG_FILES.has(basename)) {
          files.configs.push(fullPath);
        } else if (STYLE_EXTENSIONS.has(ext)) {
          files.styles.push(fullPath);
        } else if (TEMPLATE_EXTENSIONS.has(ext)) {
          files.templates.push(fullPath);
        }
      }
    }
  }

  walk(dir, 0);
  return files;
}

// ============================================================
// Color extraction
// ============================================================

/**
 * Extract all color values from source code content
 */
function extractColorsFromContent(content) {
  const colors = new Map(); // hex -> { count, roles }

  // Hex colors: #RGB, #RRGGBB, #RRGGBBAA
  const hexRegex = /#([0-9a-fA-F]{3,8})\b/g;
  let match;
  while ((match = hexRegex.exec(content)) !== null) {
    let hex = match[0].toLowerCase();
    // Normalize 3-digit hex to 6-digit
    if (hex.length === 4) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    // Strip alpha channel from 8-digit hex
    if (hex.length === 9) {
      hex = hex.slice(0, 7);
    }
    if (hex !== '#000000' && hex !== '#ffffff' && hex !== '#fff' && hex.length === 7) {
      addColor(colors, hex, guessColorRole(content, match.index));
    }
  }

  // rgb/rgba colors
  const rgbRegex = /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/g;
  while ((match = rgbRegex.exec(content)) !== null) {
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    if (r <= 255 && g <= 255 && b <= 255) {
      const hex = rgbToHex(r, g, b);
      if (hex !== '#000000' && hex !== '#ffffff') {
        addColor(colors, hex, guessColorRole(content, match.index));
      }
    }
  }

  // hsl/hsla colors
  const hslRegex = /hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%/g;
  while ((match = hslRegex.exec(content)) !== null) {
    const h = parseInt(match[1]);
    const s = parseInt(match[2]);
    const l = parseInt(match[3]);
    const hex = hslToHex(h, s, l);
    if (hex !== '#000000' && hex !== '#ffffff') {
      addColor(colors, hex, guessColorRole(content, match.index));
    }
  }

  return colors;
}

function addColor(map, hex, role) {
  if (!map.has(hex)) {
    map.set(hex, { count: 0, roles: new Set() });
  }
  const entry = map.get(hex);
  entry.count++;
  if (role) entry.roles.add(role);
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return rgbToHex(f(0), f(8), f(4));
}

/**
 * Guess the role of a color based on surrounding context
 */
function guessColorRole(content, index) {
  const context = content.slice(Math.max(0, index - 120), index).toLowerCase();
  if (/(?:background|bg)[-_]?(?:color)?/.test(context)) return 'background';
  if (/(?:^|\s)color\s*:/.test(context)) return 'text';
  if (/border/.test(context)) return 'border';
  if (/outline/.test(context)) return 'outline';
  if (/shadow/.test(context)) return 'shadow';
  if (/(?:primary|brand|accent|main)/.test(context)) return 'primary';
  if (/(?:secondary|muted)/.test(context)) return 'secondary';
  if (/(?:success|green)/.test(context)) return 'success';
  if (/(?:error|danger|red)/.test(context)) return 'error';
  if (/(?:warning|yellow|orange)/.test(context)) return 'warning';
  if (/(?:info|blue)/.test(context)) return 'info';
  return null;
}

// ============================================================
// CSS Variable extraction
// ============================================================

function extractCSSVariables(content) {
  const variables = {};
  // Match --variable-name: value patterns
  const varRegex = /(--[\w-]+)\s*:\s*([^;}\n]+)/g;
  let match;
  while ((match = varRegex.exec(content)) !== null) {
    const name = match[1].trim();
    const value = match[2].trim();
    if (value) {
      variables[name] = value;
    }
  }
  return variables;
}

// ============================================================
// Typography extraction
// ============================================================

function extractTypography(content) {
  const fontFamilies = new Map();
  const scale = [];
  const seen = new Set();

  // Font family declarations
  const fontFamilyRegex = /font-family\s*:\s*([^;}\n]+)/g;
  let match;
  while ((match = fontFamilyRegex.exec(content)) !== null) {
    const families = match[1].trim().replace(/!important/g, '').trim();
    const primary = families.split(',')[0].trim().replace(/['"]/g, '');
    if (primary && !primary.startsWith('var(') && !primary.startsWith('inherit')) {
      fontFamilies.set(primary, (fontFamilies.get(primary) || 0) + 1);
    }
  }

  // Font shorthand
  const fontShorthandRegex = /(?:^|\s)font\s*:\s*([^;}\n]+)/gm;
  while ((match = fontShorthandRegex.exec(content)) !== null) {
    const parts = match[1].trim();
    // Try to extract family from shorthand
    const familyMatch = parts.match(/(?:\d+(?:px|rem|em|%)\s*(?:\/\s*[\d.]+(?:px|rem|em|%)?\s*)?)([\w\s,'"()-]+)/);
    if (familyMatch) {
      const primary = familyMatch[1].split(',')[0].trim().replace(/['"]/g, '');
      if (primary && primary.length > 1) {
        fontFamilies.set(primary, (fontFamilies.get(primary) || 0) + 1);
      }
    }
  }

  // Font size declarations — build typography scale
  const fontSizeRegex = /font-size\s*:\s*([\d.]+(?:px|rem|em|%))/g;
  const fontWeightRegex = /font-weight\s*:\s*(\d{3}|normal|bold|bolder|lighter)/g;
  const lineHeightRegex = /line-height\s*:\s*([\d.]+(?:px|rem|em|%)?)/g;
  const letterSpacingRegex = /letter-spacing\s*:\s*([\d.]+(?:px|rem|em)|normal)/g;

  // Collect all font-size values
  const fontSizes = [];
  while ((match = fontSizeRegex.exec(content)) !== null) {
    fontSizes.push({ value: match[1], index: match.index });
  }

  // For each font-size, try to find nearby font-weight, line-height, letter-spacing
  for (const fs of fontSizes) {
    const sizeKey = fs.value;
    if (seen.has(sizeKey)) continue;
    seen.add(sizeKey);

    // Look in surrounding context (within same rule block)
    const blockStart = content.lastIndexOf('{', fs.index);
    const blockEnd = content.indexOf('}', fs.index);
    const block = blockStart >= 0 && blockEnd >= 0
      ? content.slice(blockStart, blockEnd)
      : content.slice(Math.max(0, fs.index - 200), fs.index + 200);

    const weightMatch = block.match(/font-weight\s*:\s*(\d{3}|normal|bold|bolder|lighter)/);
    const lhMatch = block.match(/line-height\s*:\s*([\d.]+(?:px|rem|em|%)?)/);
    const lsMatch = block.match(/letter-spacing\s*:\s*([\d.-]+(?:px|rem|em)|normal)/);
    const familyMatch = block.match(/font-family\s*:\s*([^;}\n]+)/);

    // Try to guess role from selector
    const selectorStart = content.lastIndexOf('\n', blockStart);
    const selector = content.slice(Math.max(0, selectorStart), blockStart).trim();
    const role = guessTypoRole(selector);

    scale.push({
      tag: guessTagFromSelector(selector),
      role,
      fontFamily: familyMatch
        ? familyMatch[1].split(',')[0].trim().replace(/['"]/g, '')
        : 'inherit',
      fontSize: fs.value,
      fontWeight: weightMatch ? weightMatch[1] : 'normal',
      lineHeight: lhMatch ? lhMatch[1] : 'normal',
      letterSpacing: lsMatch ? lsMatch[1] : 'normal',
      fontFeatureSettings: 'normal',
      textTransform: 'none',
      sampleText: '',
    });
  }

  // Sort by font size descending
  scale.sort((a, b) => {
    const sizeA = parseFloat(a.fontSize);
    const sizeB = parseFloat(b.fontSize);
    return sizeB - sizeA;
  });

  return {
    fontFamilies: [...fontFamilies.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([family, count]) => ({ family, count })),
    scale: scale.slice(0, 25),
  };
}

function guessTypoRole(selector) {
  const s = selector.toLowerCase();
  if (/\bh1\b/.test(s)) return 'Display / Hero';
  if (/\bh2\b/.test(s)) return 'Section Heading';
  if (/\bh3\b/.test(s)) return 'Sub-heading';
  if (/\bh4\b/.test(s)) return 'Sub-heading Small';
  if (/\bh5\b/.test(s)) return 'Label';
  if (/\bh6\b/.test(s)) return 'Label Small';
  if (/\bp\b/.test(s)) return 'Body';
  if (/\ba\b/.test(s)) return 'Link';
  if (/button/.test(s)) return 'Button';
  if (/label/.test(s)) return 'Label';
  if (/caption|small|\.text-sm|\.text-xs/.test(s)) return 'Caption';
  if (/code|pre|mono/.test(s)) return 'Code';
  if (/title|heading|hero|display/.test(s)) return 'Display / Hero';
  return 'Text';
}

function guessTagFromSelector(selector) {
  const s = selector.toLowerCase();
  const tagMatch = s.match(/\b(h[1-6]|p|a|button|span|label|li|td|th|code|pre|small|blockquote)\b/);
  if (tagMatch) return tagMatch[1];
  if (/title|hero|display/.test(s)) return 'h1';
  if (/heading/.test(s)) return 'h2';
  if (/subtitle|subhead/.test(s)) return 'h3';
  if (/body|text|paragraph/.test(s)) return 'p';
  if (/caption|small|hint/.test(s)) return 'small';
  if (/btn|button/.test(s)) return 'button';
  if (/link/.test(s)) return 'a';
  return 'div';
}

// ============================================================
// Layout & Spacing extraction
// ============================================================

function extractLayout(content) {
  const spacingValues = new Map();
  const radiusValues = new Map();
  let gridCount = 0;
  let flexCount = 0;
  let maxContentWidth = 'not detected';

  // Spacing: padding, margin, gap
  const spacingRegex = /(?:padding|margin|gap|row-gap|column-gap)(?:-(?:top|bottom|left|right))?\s*:\s*([\d.]+)(px|rem|em)/g;
  let match;
  while ((match = spacingRegex.exec(content)) !== null) {
    let px = parseFloat(match[1]);
    if (match[2] === 'rem' || match[2] === 'em') px *= 16;
    if (px > 0 && px <= 200) {
      spacingValues.set(Math.round(px), (spacingValues.get(Math.round(px)) || 0) + 1);
    }
  }

  // Also handle shorthand padding/margin (e.g., padding: 16px 24px)
  const shorthandRegex = /(?:padding|margin)\s*:\s*([^;}\n]+)/g;
  while ((match = shorthandRegex.exec(content)) !== null) {
    const values = match[1].match(/([\d.]+)(px|rem|em)/g);
    if (values) {
      for (const v of values) {
        const numMatch = v.match(/([\d.]+)(px|rem|em)/);
        if (numMatch) {
          let px = parseFloat(numMatch[1]);
          if (numMatch[2] === 'rem' || numMatch[2] === 'em') px *= 16;
          if (px > 0 && px <= 200) {
            spacingValues.set(Math.round(px), (spacingValues.get(Math.round(px)) || 0) + 1);
          }
        }
      }
    }
  }

  // Border radius
  const radiusRegex = /border-radius\s*:\s*([^;}\n]+)/g;
  while ((match = radiusRegex.exec(content)) !== null) {
    const value = match[1].trim().replace(/!important/g, '').trim();
    if (value && value !== '0' && value !== '0px') {
      radiusValues.set(value, (radiusValues.get(value) || 0) + 1);
    }
  }

  // Grid / Flex usage
  const displayRegex = /display\s*:\s*([\w-]+)/g;
  while ((match = displayRegex.exec(content)) !== null) {
    const val = match[1].toLowerCase();
    if (val === 'grid' || val === 'inline-grid') gridCount++;
    if (val === 'flex' || val === 'inline-flex') flexCount++;
  }

  // Max-width for content containers
  const maxWidthRegex = /max-width\s*:\s*([\d.]+(?:px|rem|em|%))/g;
  const maxWidths = [];
  while ((match = maxWidthRegex.exec(content)) !== null) {
    maxWidths.push(match[1]);
  }
  if (maxWidths.length > 0) {
    // Pick the most common or largest reasonable max-width
    maxContentWidth = maxWidths[0];
  }

  // Sort spacing scale
  const sortedSpacing = [...spacingValues.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([px]) => px)
    .sort((a, b) => a - b);

  // Detect base unit
  let baseUnit = 8;
  const smallSpacing = sortedSpacing.filter((v) => v >= 4 && v <= 16);
  if (smallSpacing.length > 0) {
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
    baseUnit = bestBase;
  }

  return {
    maxContentWidth,
    spacingScale: sortedSpacing,
    baseUnit,
    borderRadiusScale: [...radiusValues.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([radius, count]) => ({ radius, count })),
    gridUsage: gridCount,
    flexUsage: flexCount,
  };
}

// ============================================================
// Shadow extraction
// ============================================================

function extractShadows(content) {
  const shadowMap = new Map();
  const shadowRegex = /box-shadow\s*:\s*([^;}\n]+)/g;
  let match;
  while ((match = shadowRegex.exec(content)) !== null) {
    const value = match[1].trim().replace(/!important/g, '').trim();
    if (value && value !== 'none') {
      shadowMap.set(value, (shadowMap.get(value) || 0) + 1);
    }
  }

  return [...shadowMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([shadow, count]) => ({ shadow, count }));
}

// ============================================================
// Breakpoint extraction
// ============================================================

function extractBreakpoints(content) {
  const breakpoints = new Set();
  const mediaRegex = /@media[^{]*(?:min|max)-width\s*:\s*([\d.]+)(px|em|rem)/g;
  let match;
  while ((match = mediaRegex.exec(content)) !== null) {
    let px = parseFloat(match[1]);
    if (match[2] === 'em' || match[2] === 'rem') px *= 16;
    breakpoints.add(Math.round(px));
  }
  return [...breakpoints].sort((a, b) => a - b);
}

// ============================================================
// Component pattern extraction
// ============================================================

function extractComponents(allContent) {
  const components = {
    buttons: [],
    cards: [],
    inputs: [],
    badges: [],
    navigation: null,
    navLinks: null,
  };

  // Extract button styles
  const buttonBlocks = extractRuleBlocks(allContent, /(?:\.btn|button|\.button|\.Button|\[role="button"\])/);
  const btnSeen = new Set();
  for (const block of buttonBlocks) {
    const bg = extractProp(block, 'background-color') || extractProp(block, 'background');
    const color = extractProp(block, 'color');
    const key = `${bg}-${color}`;
    if (btnSeen.has(key)) continue;
    btnSeen.add(key);

    components.buttons.push({
      text: '',
      background: bg || 'transparent',
      color: color || null,
      padding: extractProp(block, 'padding') || null,
      borderRadius: extractProp(block, 'border-radius') || null,
      border: extractProp(block, 'border') || null,
      fontSize: extractProp(block, 'font-size') || null,
      fontWeight: extractProp(block, 'font-weight') || null,
      fontFamily: null,
      boxShadow: extractProp(block, 'box-shadow') || null,
      cursor: extractProp(block, 'cursor') || null,
    });
  }
  components.buttons = components.buttons.slice(0, 8);

  // Extract card styles
  const cardBlocks = extractRuleBlocks(allContent, /(?:\.card|\.Card|\.panel|\.Panel|\.tile|\.Tile|article)/);
  const cardSeen = new Set();
  for (const block of cardBlocks) {
    const bg = extractProp(block, 'background-color') || extractProp(block, 'background');
    const radius = extractProp(block, 'border-radius');
    const shadow = extractProp(block, 'box-shadow');
    const key = `${bg}-${radius}-${shadow?.slice(0, 30)}`;
    if (cardSeen.has(key)) continue;
    cardSeen.add(key);

    if (bg || shadow || radius) {
      components.cards.push({
        background: bg || 'transparent',
        borderRadius: radius || null,
        boxShadow: shadow && shadow !== 'none' ? shadow : null,
        border: extractProp(block, 'border') || null,
        padding: extractProp(block, 'padding') || null,
        overflow: extractProp(block, 'overflow') || null,
      });
    }
  }
  components.cards = components.cards.slice(0, 6);

  // Extract input styles
  const inputBlocks = extractRuleBlocks(allContent, /(?:input|textarea|select|\.input|\.Input)/);
  const inputSeen = new Set();
  for (const block of inputBlocks) {
    const border = extractProp(block, 'border');
    const radius = extractProp(block, 'border-radius');
    const bg = extractProp(block, 'background-color') || extractProp(block, 'background');
    const key = `${border}-${radius}-${bg}`;
    if (inputSeen.has(key)) continue;
    inputSeen.add(key);

    components.inputs.push({
      background: bg || null,
      border: border || null,
      borderRadius: radius || null,
      padding: extractProp(block, 'padding') || null,
      fontSize: extractProp(block, 'font-size') || null,
      color: extractProp(block, 'color') || null,
      outline: extractProp(block, 'outline') || null,
    });
  }
  components.inputs = components.inputs.slice(0, 4);

  // Extract navigation styles
  const navBlocks = extractRuleBlocks(allContent, /(?:nav|\.nav|\.navbar|\.header|\.Header|header)/);
  if (navBlocks.length > 0) {
    const block = navBlocks[0];
    components.navigation = {
      background: extractProp(block, 'background-color') || extractProp(block, 'background') || null,
      position: extractProp(block, 'position') || null,
      height: extractProp(block, 'height') || null,
      padding: extractProp(block, 'padding') || null,
      boxShadow: extractProp(block, 'box-shadow') || null,
      borderBottom: extractProp(block, 'border-bottom') || null,
      backdropFilter: extractProp(block, 'backdrop-filter') || null,
    };
  }

  // Extract badge styles
  const badgeBlocks = extractRuleBlocks(allContent, /(?:\.badge|\.Badge|\.tag|\.Tag|\.chip|\.Chip|\.pill|\.Pill)/);
  for (const block of badgeBlocks) {
    components.badges.push({
      background: extractProp(block, 'background-color') || extractProp(block, 'background') || null,
      color: extractProp(block, 'color') || null,
      padding: extractProp(block, 'padding') || null,
      borderRadius: extractProp(block, 'border-radius') || null,
      fontSize: extractProp(block, 'font-size') || null,
      fontWeight: extractProp(block, 'font-weight') || null,
      border: extractProp(block, 'border') || null,
    });
    if (components.badges.length >= 4) break;
  }

  return components;
}

/**
 * Extract CSS rule blocks matching a selector pattern
 */
function extractRuleBlocks(content, selectorPattern) {
  const blocks = [];
  const lines = content.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (selectorPattern.test(line)) {
      // Find the opening brace
      let braceStart = line.indexOf('{');
      let blockContent = '';

      if (braceStart >= 0) {
        // Brace on same line
        let depth = 1;
        blockContent = line.slice(braceStart + 1);
        let j = i + 1;
        while (j < lines.length && depth > 0) {
          const l = lines[j];
          for (const ch of l) {
            if (ch === '{') depth++;
            if (ch === '}') depth--;
          }
          if (depth > 0) blockContent += '\n' + l;
          j++;
        }
        blocks.push(blockContent);
        i = j;
        continue;
      } else {
        // Look for brace on next lines
        let j = i + 1;
        while (j < lines.length && !lines[j].includes('{')) j++;
        if (j < lines.length) {
          let depth = 1;
          blockContent = lines[j].slice(lines[j].indexOf('{') + 1);
          let k = j + 1;
          while (k < lines.length && depth > 0) {
            const l = lines[k];
            for (const ch of l) {
              if (ch === '{') depth++;
              if (ch === '}') depth--;
            }
            if (depth > 0) blockContent += '\n' + l;
            k++;
          }
          blocks.push(blockContent);
          i = k;
          continue;
        }
      }
    }
    i++;
  }

  return blocks;
}

/**
 * Extract a CSS property value from a block of CSS
 */
function extractProp(block, property) {
  // Escape special regex chars in property name
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`${escaped}\\s*:\\s*([^;}\n]+)`, 'i');
  const match = block.match(regex);
  if (match) {
    const value = match[1].trim().replace(/!important/g, '').trim();
    return value || null;
  }
  return null;
}

// ============================================================
// Tailwind config extraction
// ============================================================

function extractTailwindConfig(configPath) {
  const tokens = { colors: {}, fontFamilies: [], spacing: {}, borderRadius: {}, shadows: {}, breakpoints: {} };

  try {
    const content = fs.readFileSync(configPath, 'utf-8');

    // Extract color definitions from theme.extend.colors or theme.colors
    const colorBlockMatch = content.match(/colors\s*:\s*\{([\s\S]*?)\n\s*\}/);
    if (colorBlockMatch) {
      const colorBlock = colorBlockMatch[1];
      const colorRegex = /['"]?([\w-]+)['"]?\s*:\s*['"]?(#[0-9a-fA-F]{3,8}|rgb[a]?\([^)]+\))['"]?/g;
      let match;
      while ((match = colorRegex.exec(colorBlock)) !== null) {
        tokens.colors[match[1]] = match[2];
      }
    }

    // Extract font families
    const fontMatch = content.match(/fontFamily\s*:\s*\{([\s\S]*?)\n\s*\}/);
    if (fontMatch) {
      const fontBlock = fontMatch[1];
      const familyRegex = /['"]?([\w-]+)['"]?\s*:\s*\[([^\]]+)\]/g;
      let match;
      while ((match = familyRegex.exec(fontBlock)) !== null) {
        const families = match[2].match(/['"]([^'"]+)['"]/g);
        if (families) {
          tokens.fontFamilies.push(families[0].replace(/['"]/g, ''));
        }
      }
    }

    // Extract spacing
    const spacingMatch = content.match(/spacing\s*:\s*\{([\s\S]*?)\n\s*\}/);
    if (spacingMatch) {
      const spacingBlock = spacingMatch[1];
      const spRegex = /['"]?([\w.-]+)['"]?\s*:\s*['"]?([^'",}\n]+)['"]?/g;
      let match;
      while ((match = spRegex.exec(spacingBlock)) !== null) {
        tokens.spacing[match[1]] = match[2].trim();
      }
    }

    // Extract breakpoints (screens)
    const screensMatch = content.match(/screens\s*:\s*\{([\s\S]*?)\n\s*\}/);
    if (screensMatch) {
      const screensBlock = screensMatch[1];
      const bpRegex = /['"]?([\w-]+)['"]?\s*:\s*['"]?([\d]+(?:px|em|rem))['"]?/g;
      let match;
      while ((match = bpRegex.exec(screensBlock)) !== null) {
        tokens.breakpoints[match[1]] = match[2];
      }
    }
  } catch {
    // Config file couldn't be parsed
  }

  return tokens;
}

// ============================================================
// Main extraction function
// ============================================================

/**
 * Extract design tokens from local source code
 * @param {string} dir - The directory containing source code
 * @param {object} options - Extraction options
 * @returns {object} Extracted design tokens (same format as Puppeteer extractor)
 */
async function extractDesignTokensFromLocal(dir, options = {}) {
  const { include = [], exclude = [], pages = [] } = options;

  const resolvedDir = path.resolve(dir);
  if (!fs.existsSync(resolvedDir)) {
    throw new Error(`Directory not found: ${resolvedDir}`);
  }

  console.log(`📂 Scanning source files in ${resolvedDir}...`);

  // If specific pages are provided, use them as include patterns
  const includePatterns = pages.length > 0 ? pages : include;

  const files = findSourceFiles(resolvedDir, {
    include: includePatterns,
    exclude,
  });

  console.log(`   📄 Found ${files.styles.length} style files`);
  console.log(`   📄 Found ${files.templates.length} template files`);
  console.log(`   📄 Found ${files.configs.length} config files`);

  // Read all style file contents
  let allStyleContent = '';
  for (const file of files.styles) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      allStyleContent += '\n/* === ' + path.relative(resolvedDir, file) + ' === */\n' + content;
    } catch {}
  }

  // Read template files for inline styles and additional context
  let allTemplateContent = '';
  for (const file of files.templates) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      allTemplateContent += '\n' + content;

      // Extract <style> blocks from Vue/Svelte/HTML files
      const styleBlockRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
      let match;
      while ((match = styleBlockRegex.exec(content)) !== null) {
        allStyleContent += '\n' + match[1];
      }
    } catch {}
  }

  const combinedContent = allStyleContent + '\n' + allTemplateContent;

  console.log(`🔍 Extracting design tokens from source code...`);

  // Extract CSS variables
  const cssVariables = extractCSSVariables(allStyleContent);
  console.log(`   🎨 Found ${Object.keys(cssVariables).length} CSS variables`);

  // Extract colors
  const colorMap = extractColorsFromContent(combinedContent);
  const palette = [...colorMap.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 40)
    .map(([hex, data]) => ({
      hex,
      count: data.count,
      roles: [...data.roles],
    }));

  // Build semantic colors from CSS variables
  const semanticColors = {};
  for (const [name, value] of Object.entries(cssVariables)) {
    const hex = parseColorValue(value);
    if (hex) {
      const lowerName = name.toLowerCase();
      if (/bg|background/.test(lowerName)) semanticColors[`${cleanVarName(name)}-bg`] = hex;
      else if (/text|color|fg|foreground/.test(lowerName)) semanticColors[`${cleanVarName(name)}-fg`] = hex;
      else if (/primary/.test(lowerName)) semanticColors['primary'] = hex;
      else if (/secondary/.test(lowerName)) semanticColors['secondary'] = hex;
      else if (/accent/.test(lowerName)) semanticColors['accent'] = hex;
    }
  }

  const colors = {
    palette,
    semantic: semanticColors,
    pageBg: '#ffffff',
    pageColor: '#000000',
  };

  // Try to detect page bg/color from body or :root styles
  const bodyBgMatch = allStyleContent.match(/(?:body|:root|html)\s*\{[^}]*background(?:-color)?\s*:\s*([^;}\n]+)/);
  if (bodyBgMatch) {
    const hex = parseColorValue(bodyBgMatch[1].trim());
    if (hex) colors.pageBg = hex;
  }
  const bodyColorMatch = allStyleContent.match(/(?:body|:root|html)\s*\{[^}]*(?:^|\s)color\s*:\s*([^;}\n]+)/m);
  if (bodyColorMatch) {
    const hex = parseColorValue(bodyColorMatch[1].trim());
    if (hex) colors.pageColor = hex;
  }

  // Detect dark theme
  const isDarkTheme = colors.pageBg && parseInt(colors.pageBg.slice(1), 16) < 0x808080;

  console.log(`   🎨 Found ${palette.length} colors`);

  // Extract typography
  const typography = extractTypography(allStyleContent);
  console.log(`   🔤 Found ${typography.fontFamilies.length} font families`);

  // Extract components
  const components = extractComponents(allStyleContent);
  const componentCount =
    (components.buttons?.length || 0) +
    (components.cards?.length || 0) +
    (components.inputs?.length || 0) +
    (components.badges?.length || 0) +
    (components.navigation ? 1 : 0);
  console.log(`   📐 Found ${componentCount} component styles`);

  // Extract layout
  const layout = extractLayout(allStyleContent);

  // Extract shadows
  const shadows = extractShadows(allStyleContent);

  // Extract breakpoints
  const breakpoints = extractBreakpoints(allStyleContent);

  // Process Tailwind config if found
  let tailwindTokens = null;
  for (const configFile of files.configs) {
    if (path.basename(configFile).startsWith('tailwind')) {
      console.log(`   🌊 Found Tailwind config: ${path.relative(resolvedDir, configFile)}`);
      tailwindTokens = extractTailwindConfig(configFile);

      // Merge Tailwind colors into palette
      for (const [name, value] of Object.entries(tailwindTokens.colors)) {
        const hex = parseColorValue(value);
        if (hex && !colorMap.has(hex)) {
          palette.push({ hex, count: 1, roles: [name] });
        }
      }

      // Merge Tailwind font families
      for (const family of tailwindTokens.fontFamilies) {
        if (!typography.fontFamilies.some((f) => f.family === family)) {
          typography.fontFamilies.push({ family, count: 1 });
        }
      }

      // Merge Tailwind breakpoints
      for (const [, value] of Object.entries(tailwindTokens.breakpoints)) {
        const px = parseFloat(value);
        if (!isNaN(px) && !breakpoints.includes(Math.round(px))) {
          breakpoints.push(Math.round(px));
        }
      }
      breakpoints.sort((a, b) => a - b);
    }
  }

  // Build structure summary from template files
  let structure = '';
  if (files.templates.length > 0) {
    structure = files.templates
      .slice(0, 20)
      .map((f) => `  <file path="${path.relative(resolvedDir, f)}">`)
      .join('\n');
  }

  // Build meta information
  const meta = {
    title: path.basename(resolvedDir),
    description: `Design tokens extracted from local source code at ${resolvedDir}`,
    themeColor: '',
    ogImage: '',
    ogTitle: '',
    favicon: '',
    isDarkTheme,
  };

  // Try to read package.json for project name
  const pkgPath = path.join(resolvedDir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      if (pkg.name) meta.title = pkg.name;
      if (pkg.description) meta.description = pkg.description;
    } catch {}
  }

  console.log(`✅ Local extraction complete!`);

  return {
    cssVariables,
    colors,
    typography,
    components,
    layout,
    shadows,
    breakpoints,
    meta,
    structure,
    url: `file://${resolvedDir}`,
    timestamp: new Date().toISOString(),
    source: 'local',
  };
}

// ============================================================
// Utility helpers
// ============================================================

function parseColorValue(value) {
  if (!value) return null;
  value = value.trim();

  // Hex
  if (value.startsWith('#')) {
    let hex = value.toLowerCase();
    if (hex.length === 4) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    if (/^#[0-9a-f]{6}$/.test(hex)) return hex;
    if (/^#[0-9a-f]{8}$/.test(hex)) return hex.slice(0, 7);
  }

  // rgb/rgba
  const rgbMatch = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return rgbToHex(parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3]));
  }

  // hsl/hsla
  const hslMatch = value.match(/hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%/);
  if (hslMatch) {
    return hslToHex(parseInt(hslMatch[1]), parseInt(hslMatch[2]), parseInt(hslMatch[3]));
  }

  return null;
}

function cleanVarName(name) {
  return name.replace(/^--/, '').replace(/[-_]/g, '-');
}

module.exports = { extractDesignTokensFromLocal, findSourceFiles };
