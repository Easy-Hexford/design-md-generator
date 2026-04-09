/**
 * DESIGN.md Generator
 * Transforms extracted design tokens into a structured DESIGN.md file
 * following the 9-section format inspired by Google Stitch.
 */

/**
 * Generate a complete DESIGN.md from extracted tokens
 * @param {object} tokens - Extracted design tokens from extractor
 * @param {string} siteName - Name of the website
 * @returns {string} The DESIGN.md content as a string
 */
function generateDesignMd(tokens, siteName) {
  const sections = [
    generateHeader(tokens, siteName),
    generateVisualTheme(tokens, siteName),
    generateColorPalette(tokens),
    generateTypography(tokens),
    generateComponentStyles(tokens),
    generateLayoutPrinciples(tokens),
    generateDepthElevation(tokens),
    generateDosAndDonts(tokens, siteName),
    generateResponsiveBehavior(tokens),
    generateAgentPromptGuide(tokens, siteName),
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
function generateVisualTheme(tokens, siteName) {
  const { meta, colors, typography, shadows } = tokens;
  const isDark = meta.isDarkTheme;
  const primaryFont = typography.fontFamilies[0]?.family || 'system font';
  const primaryColor = colors.palette[0]?.hex || '#000000';
  const pageBg = colors.pageBg;

  // Determine atmosphere descriptors
  const atmosphere = [];
  if (isDark) {
    atmosphere.push('dark-themed', 'immersive');
  } else {
    atmosphere.push('light-themed', 'clean');
  }

  if (shadows.length > 3) {
    atmosphere.push('layered depth');
  } else if (shadows.length === 0) {
    atmosphere.push('flat design');
  }

  const hasManyColors = colors.palette.length > 15;
  if (hasManyColors) {
    atmosphere.push('rich color palette');
  } else {
    atmosphere.push('restrained color usage');
  }

  let md = `## 1. Visual Theme & Atmosphere\n\n`;
  md += `${siteName}'s website presents a ${atmosphere.join(', ')} design. `;
  md += `The page opens on a ${isDark ? 'dark' : 'light'} canvas (\`${pageBg}\`) `;
  md += `with primary text in \`${colors.pageColor}\`. `;

  if (primaryColor !== colors.pageBg) {
    md += `The dominant accent color is \`${primaryColor}\`, `;
    md += `which appears across interactive elements and key visual anchors. `;
  }

  md += `\n\nThe primary typeface is \`${primaryFont}\``;
  if (typography.fontFamilies.length > 1) {
    md += `, complemented by \`${typography.fontFamilies[1]?.family}\` as a secondary font`;
  }
  md += `. `;

  if (meta.description) {
    md += `\n\n> ${meta.description}`;
  }

  md += `\n\n**Key Characteristics:**\n`;

  // Font characteristics
  md += `- Primary font: \`${primaryFont}\`\n`;
  if (typography.fontFamilies.length > 1) {
    const monoFont = typography.fontFamilies.find(
      (f) => /mono|code|consol/i.test(f.family)
    );
    if (monoFont) {
      md += `- Monospace font: \`${monoFont.family}\` for code elements\n`;
    }
  }

  // Color characteristics
  md += `- Page background: \`${pageBg}\`\n`;
  md += `- Primary text color: \`${colors.pageColor}\`\n`;
  if (colors.palette.length > 0) {
    md += `- Primary accent: \`${colors.palette[0].hex}\`\n`;
  }

  // Shadow characteristics
  if (shadows.length > 0) {
    md += `- Shadow system with ${shadows.length} distinct shadow levels\n`;
  } else {
    md += `- Flat design with minimal shadow usage\n`;
  }

  // Border radius
  if (tokens.layout.borderRadiusScale.length > 0) {
    const topRadius = tokens.layout.borderRadiusScale[0].radius;
    md += `- Most common border-radius: \`${topRadius}\`\n`;
  }

  // Theme
  md += `- ${isDark ? 'Dark' : 'Light'} theme as default\n`;

  if (meta.themeColor) {
    md += `- Browser theme color: \`${meta.themeColor}\`\n`;
  }

  return md;
}

// ============================================================
// Section 2: Color Palette & Roles
// ============================================================
function generateColorPalette(tokens) {
  const { colors, cssVariables } = tokens;
  let md = `## 2. Color Palette & Roles\n\n`;

  // Categorize colors
  const categories = categorizeColors(colors, cssVariables);

  // Primary colors
  if (categories.primary.length > 0) {
    md += `### Primary\n`;
    for (const c of categories.primary) {
      md += `- **${c.name}** (\`${c.hex}\`): ${c.description}\n`;
    }
    md += `\n`;
  }

  // Accent colors
  if (categories.accent.length > 0) {
    md += `### Accent Colors\n`;
    for (const c of categories.accent) {
      md += `- **${c.name}** (\`${c.hex}\`): ${c.description}\n`;
    }
    md += `\n`;
  }

  // Neutral scale
  if (categories.neutral.length > 0) {
    md += `### Neutral Scale\n`;
    for (const c of categories.neutral) {
      md += `- **${c.name}** (\`${c.hex}\`): ${c.description}\n`;
    }
    md += `\n`;
  }

  // Surface & Borders
  if (categories.surface.length > 0) {
    md += `### Surface & Borders\n`;
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
    md += `### CSS Custom Properties\n`;
    md += `The site defines ${colorVars.length} color-related CSS custom properties. Key ones include:\n\n`;
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
function categorizeColors(colors, cssVariables) {
  const categories = {
    primary: [],
    accent: [],
    neutral: [],
    surface: [],
  };

  // Page background and text are primary
  categories.primary.push({
    name: 'Page Background',
    hex: colors.pageBg,
    description: 'Main page background color.',
  });
  categories.primary.push({
    name: 'Primary Text',
    hex: colors.pageColor,
    description: 'Default body text color.',
  });

  // Semantic colors
  const semantic = colors.semantic;
  if (semantic['heading-fg']) {
    categories.primary.push({
      name: 'Heading',
      hex: semantic['heading-fg'],
      description: 'Primary heading text color.',
    });
  }
  if (semantic['link-fg']) {
    categories.accent.push({
      name: 'Link',
      hex: semantic['link-fg'],
      description: 'Hyperlink text color.',
    });
  }
  if (semantic['button-bg']) {
    categories.accent.push({
      name: 'Button Background',
      hex: semantic['button-bg'],
      description: 'Primary button background.',
    });
  }
  if (semantic['button-fg']) {
    categories.accent.push({
      name: 'Button Text',
      hex: semantic['button-fg'],
      description: 'Primary button text color.',
    });
  }
  if (semantic['navigation-bg']) {
    categories.surface.push({
      name: 'Navigation Background',
      hex: semantic['navigation-bg'],
      description: 'Navigation/header background.',
    });
  }
  if (semantic['footer-bg']) {
    categories.surface.push({
      name: 'Footer Background',
      hex: semantic['footer-bg'],
      description: 'Footer section background.',
    });
  }
  if (semantic['input-bg']) {
    categories.surface.push({
      name: 'Input Background',
      hex: semantic['input-bg'],
      description: 'Form input background.',
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
        name: `Neutral ${Math.round(l)}%`,
        hex: color.hex,
        description: `Used for ${color.roles.join(', ')}. Appears ${color.count} times.`,
      });
    } else if (color.roles.includes('border')) {
      categories.surface.push({
        name: `Border ${color.hex}`,
        hex: color.hex,
        description: `Border color. Appears ${color.count} times.`,
      });
    } else if (color.roles.includes('background') && l > 90) {
      categories.surface.push({
        name: `Surface ${color.hex}`,
        hex: color.hex,
        description: `Light surface/background. Appears ${color.count} times.`,
      });
    } else {
      categories.accent.push({
        name: `Accent ${color.hex}`,
        hex: color.hex,
        description: `Used for ${color.roles.join(', ')}. Appears ${color.count} times.`,
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
function generateTypography(tokens) {
  const { typography } = tokens;
  let md = `## 3. Typography Rules\n\n`;

  // Font families
  md += `### Font Family\n`;
  if (typography.fontFamilies.length > 0) {
    md += `- **Primary**: \`${typography.fontFamilies[0].family}\`\n`;
  }
  if (typography.fontFamilies.length > 1) {
    const mono = typography.fontFamilies.find((f) => /mono|code|consol/i.test(f.family));
    const secondary = typography.fontFamilies[1];
    if (mono && mono !== secondary) {
      md += `- **Secondary**: \`${secondary.family}\`\n`;
      md += `- **Monospace**: \`${mono.family}\`\n`;
    } else if (mono) {
      md += `- **Monospace**: \`${mono.family}\`\n`;
    } else {
      md += `- **Secondary**: \`${secondary.family}\`\n`;
    }
  }
  md += `\n`;

  // Typography hierarchy table
  md += `### Hierarchy\n\n`;
  md += `| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |\n`;
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

  md += `\n### Principles\n`;
  md += `- Primary font \`${typography.fontFamilies[0]?.family || 'system'}\` is used across all major text elements\n`;

  // Detect weight patterns
  const weights = typography.scale.map((e) => parseInt(e.fontWeight));
  const uniqueWeights = [...new Set(weights)].sort();
  md += `- Font weights used: ${uniqueWeights.join(', ')}\n`;

  // Detect size range
  const sizes = typography.scale.map((e) => parseFloat(e.fontSize)).filter((s) => !isNaN(s));
  if (sizes.length > 0) {
    md += `- Size range: ${Math.min(...sizes)}px to ${Math.max(...sizes)}px\n`;
  }

  return md;
}

// ============================================================
// Section 4: Component Stylings
// ============================================================
function generateComponentStyles(tokens) {
  const { components } = tokens;
  let md = `## 4. Component Stylings\n\n`;

  // Buttons
  md += `### Buttons\n\n`;
  if (components.buttons.length > 0) {
    for (let i = 0; i < components.buttons.length; i++) {
      const btn = components.buttons[i];
      const variant = i === 0 ? 'Primary' : i === 1 ? 'Secondary' : `Variant ${i + 1}`;
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
    md += `No distinct button styles detected. Buttons may use utility classes or framework defaults.\n\n`;
  }

  // Cards & Containers
  md += `### Cards & Containers\n\n`;
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
    md += `No distinct card/container styles detected.\n\n`;
  }

  // Badges
  if (components.badges && components.badges.length > 0) {
    md += `### Badges / Tags\n\n`;
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
  md += `### Inputs & Forms\n\n`;
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
    md += `No form inputs detected on the homepage.\n\n`;
  }

  // Navigation
  md += `### Navigation\n\n`;
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
      md += `\n**Nav Links:**\n`;
      md += `- Color: \`${components.navLinks.color}\`\n`;
      md += `- Font: ${components.navLinks.fontSize} weight ${components.navLinks.fontWeight}\n`;
      md += `- Text decoration: \`${components.navLinks.textDecoration}\`\n`;
    }
  } else {
    md += `Navigation element not detected.\n`;
  }

  return md;
}

// ============================================================
// Section 5: Layout Principles
// ============================================================
function generateLayoutPrinciples(tokens) {
  const { layout } = tokens;
  let md = `## 5. Layout Principles\n\n`;

  // Spacing system
  md += `### Spacing System\n`;
  md += `- Base unit: \`${layout.baseUnit || 8}px\`\n`;
  if (layout.spacingScale.length > 0) {
    md += `- Scale: ${layout.spacingScale.map((v) => `${v}px`).join(', ')}\n`;
  }
  md += `\n`;

  // Grid & Container
  md += `### Grid & Container\n`;
  md += `- Max content width: \`${layout.maxContentWidth}\`\n`;
  md += `- CSS Grid usage: ${layout.gridUsage} elements\n`;
  md += `- Flexbox usage: ${layout.flexUsage} elements\n`;
  md += `- Primary layout method: ${layout.flexUsage > layout.gridUsage ? 'Flexbox' : 'CSS Grid'}\n`;
  md += `\n`;

  // Whitespace philosophy
  md += `### Whitespace Philosophy\n`;
  const avgSpacing =
    layout.spacingScale.length > 0
      ? Math.round(layout.spacingScale.reduce((a, b) => a + b, 0) / layout.spacingScale.length)
      : 16;

  if (avgSpacing > 24) {
    md += `- **Generous spacing**: The design uses ample whitespace, creating a breathable, premium feel.\n`;
  } else if (avgSpacing > 12) {
    md += `- **Balanced spacing**: The design strikes a balance between density and breathing room.\n`;
  } else {
    md += `- **Dense spacing**: The design favors compact layouts with tight spacing.\n`;
  }
  md += `\n`;

  // Border radius scale
  md += `### Border Radius Scale\n`;
  if (layout.borderRadiusScale.length > 0) {
    md += `| Radius | Usage Count |\n`;
    md += `|--------|-------------|\n`;
    for (const { radius, count } of layout.borderRadiusScale) {
      md += `| \`${radius}\` | ${count} |\n`;
    }
  } else {
    md += `No significant border-radius usage detected (sharp corners).\n`;
  }

  return md;
}

// ============================================================
// Section 6: Depth & Elevation
// ============================================================
function generateDepthElevation(tokens) {
  const { shadows } = tokens;
  let md = `## 6. Depth & Elevation\n\n`;

  if (shadows.length === 0) {
    md += `The design uses a flat approach with no significant box-shadow usage detected.\n\n`;
    md += `| Level | Treatment | Use |\n`;
    md += `|-------|-----------|-----|\n`;
    md += `| Flat (Level 0) | No shadow | All elements |\n`;
    return md;
  }

  md += `| Level | Shadow Value | Usage Count |\n`;
  md += `|-------|-------------|-------------|\n`;

  const levelNames = ['Subtle', 'Standard', 'Elevated', 'Deep', 'Dramatic'];
  for (let i = 0; i < shadows.length; i++) {
    const { shadow, count } = shadows[i];
    const level = levelNames[Math.min(i, levelNames.length - 1)];
    // Truncate very long shadow values
    const displayShadow = shadow.length > 80 ? shadow.slice(0, 77) + '...' : shadow;
    md += `| ${level} (Level ${i + 1}) | \`${displayShadow}\` | ${count} |\n`;
  }

  md += `\n**Shadow Philosophy**: `;
  if (shadows.length >= 3) {
    md += `The design employs a multi-level shadow system with ${shadows.length} distinct elevation levels, creating a clear visual hierarchy through depth.`;
  } else if (shadows.length >= 1) {
    md += `The design uses a restrained shadow approach with ${shadows.length} shadow level(s), keeping the interface relatively flat with selective elevation.`;
  }

  // Detect if shadows use colored tints
  const hasColoredShadows = shadows.some(
    (s) => s.shadow.includes('rgba') && !s.shadow.match(/rgba\(\s*0\s*,\s*0\s*,\s*0/)
  );
  if (hasColoredShadows) {
    md += ` Notably, the shadows use tinted colors rather than pure black, adding brand atmosphere to the elevation system.`;
  }

  md += `\n`;

  return md;
}

// ============================================================
// Section 7: Do's and Don'ts
// ============================================================
function generateDosAndDonts(tokens, siteName) {
  const { colors, typography, layout, shadows, meta } = tokens;
  let md = `## 7. Do's and Don'ts\n\n`;

  const primaryFont = typography.fontFamilies[0]?.family || 'the primary font';
  const isDark = meta.isDarkTheme;

  md += `### Do\n`;
  md += `- Use \`${primaryFont}\` as the primary typeface for all text elements\n`;

  if (colors.pageBg) {
    md += `- Use \`${colors.pageBg}\` as the page background color\n`;
  }
  if (colors.pageColor) {
    md += `- Use \`${colors.pageColor}\` for primary body text\n`;
  }
  if (colors.semantic['heading-fg']) {
    md += `- Use \`${colors.semantic['heading-fg']}\` for headings\n`;
  }
  if (colors.palette[0]) {
    md += `- Use \`${colors.palette[0].hex}\` as the primary accent/interactive color\n`;
  }

  // Weight guidance
  const weights = typography.scale.map((e) => parseInt(e.fontWeight));
  const headingWeights = typography.scale
    .filter((e) => ['Display / Hero', 'Section Heading', 'Sub-heading'].includes(e.role))
    .map((e) => parseInt(e.fontWeight));
  if (headingWeights.length > 0) {
    const avgWeight = Math.round(headingWeights.reduce((a, b) => a + b, 0) / headingWeights.length);
    md += `- Use weight ${avgWeight} for headings — this is the signature weight\n`;
  }

  if (layout.borderRadiusScale.length > 0) {
    const topRadius = layout.borderRadiusScale[0].radius;
    md += `- Keep border-radius consistent at \`${topRadius}\` for most elements\n`;
  }

  if (shadows.length > 0) {
    md += `- Apply the shadow system consistently for elevation hierarchy\n`;
  }

  md += `\n### Don't\n`;

  if (!isDark) {
    md += `- Don't use pure black (\`#000000\`) for text if the design uses a softer dark color\n`;
  }
  if (isDark) {
    md += `- Don't use pure white (\`#ffffff\`) backgrounds — maintain the dark theme\n`;
  }

  if (layout.borderRadiusScale.length > 0) {
    const maxRadius = parseFloat(layout.borderRadiusScale[0].radius);
    if (maxRadius < 12) {
      md += `- Don't use large border-radius (pill shapes) — the design favors conservative rounding\n`;
    }
    if (maxRadius > 16) {
      md += `- Don't use sharp corners (0px radius) — the design favors rounded elements\n`;
    }
  }

  if (shadows.length === 0) {
    md += `- Don't add heavy box-shadows — the design is intentionally flat\n`;
  }

  md += `- Don't mix font families — stick to the defined type system\n`;
  md += `- Don't use colors outside the defined palette\n`;
  md += `- Don't override the spacing system with arbitrary values\n`;

  return md;
}

// ============================================================
// Section 8: Responsive Behavior
// ============================================================
function generateResponsiveBehavior(tokens) {
  const { breakpoints, layout } = tokens;
  let md = `## 8. Responsive Behavior\n\n`;

  // Breakpoints
  md += `### Breakpoints\n`;
  if (breakpoints.length > 0) {
    md += `| Name | Width | Key Changes |\n`;
    md += `|------|-------|-------------|\n`;

    const bpNames = assignBreakpointNames(breakpoints);
    for (const bp of bpNames) {
      md += `| ${bp.name} | ${bp.width}px | ${bp.description} |\n`;
    }
  } else {
    md += `No explicit media query breakpoints detected in accessible stylesheets. The site may use:\n`;
    md += `- Container queries\n`;
    md += `- JavaScript-based responsive logic\n`;
    md += `- CSS-in-JS with dynamic breakpoints\n`;
  }
  md += `\n`;

  // Touch targets
  md += `### Touch Targets\n`;
  md += `- Buttons should maintain minimum 44px touch target on mobile\n`;
  md += `- Navigation links should have adequate spacing for touch interaction\n`;
  md += `- Form inputs should be at least 44px tall on mobile\n`;
  md += `\n`;

  // Collapsing strategy
  md += `### Collapsing Strategy\n`;
  md += `- Navigation: horizontal links → hamburger menu on mobile\n`;
  md += `- Multi-column layouts → single column stacked on mobile\n`;
  md += `- Typography scale compresses on smaller viewports\n`;
  md += `- Spacing reduces proportionally on mobile\n`;

  if (layout.gridUsage > layout.flexUsage) {
    md += `- CSS Grid layouts adapt via auto-fill/auto-fit or explicit template changes\n`;
  } else {
    md += `- Flexbox layouts wrap naturally on smaller screens\n`;
  }

  return md;
}

// ============================================================
// Section 9: Agent Prompt Guide
// ============================================================
function generateAgentPromptGuide(tokens, siteName) {
  const { colors, typography, components, layout, shadows } = tokens;
  let md = `## 9. Agent Prompt Guide\n\n`;

  // Quick color reference
  md += `### Quick Color Reference\n`;
  md += `- Background: \`${colors.pageBg}\`\n`;
  md += `- Primary text: \`${colors.pageColor}\`\n`;

  if (colors.semantic['heading-fg']) {
    md += `- Heading text: \`${colors.semantic['heading-fg']}\`\n`;
  }
  if (colors.semantic['body-text-fg']) {
    md += `- Body text: \`${colors.semantic['body-text-fg']}\`\n`;
  }
  if (colors.semantic['link-fg']) {
    md += `- Link: \`${colors.semantic['link-fg']}\`\n`;
  }
  if (colors.semantic['button-bg']) {
    md += `- Button background: \`${colors.semantic['button-bg']}\`\n`;
  }
  if (colors.semantic['navigation-bg']) {
    md += `- Navigation background: \`${colors.semantic['navigation-bg']}\`\n`;
  }

  // Top accent colors
  const accents = colors.palette.slice(0, 5);
  for (const c of accents) {
    md += `- Accent \`${c.hex}\`: used for ${c.roles.join(', ')} (${c.count}x)\n`;
  }
  md += `\n`;

  // Example component prompts
  md += `### Example Component Prompts\n\n`;

  const primaryFont = typography.fontFamilies[0]?.family || 'system font';

  // Hero section prompt
  const heroEntry = typography.scale.find((e) => e.role === 'Display / Hero');
  if (heroEntry) {
    md += `- "Create a hero section with background \`${colors.pageBg}\`. `;
    md += `Headline at ${heroEntry.fontSize} \`${primaryFont}\` weight ${heroEntry.fontWeight}, `;
    md += `line-height ${heroEntry.lineHeight}, color \`${colors.pageColor}\`. `;
    if (components.buttons[0]) {
      const btn = components.buttons[0];
      md += `CTA button: \`${btn.background}\` background, \`${btn.color}\` text, `;
      md += `${btn.borderRadius} radius, ${btn.padding} padding.`;
    }
    md += `"\n\n`;
  }

  // Card prompt
  if (components.cards[0]) {
    const card = components.cards[0];
    md += `- "Design a card: \`${card.background}\` background, `;
    if (card.border) md += `\`${card.border}\` border, `;
    md += `${card.borderRadius} radius. `;
    if (card.boxShadow) md += `Shadow: \`${card.boxShadow}\`. `;
    md += `"\n\n`;
  }

  // Navigation prompt
  if (components.navigation) {
    const nav = components.navigation;
    md += `- "Build navigation: \`${nav.background || 'transparent'}\` background`;
    if (nav.backdropFilter) md += `, backdrop-filter: ${nav.backdropFilter}`;
    md += `. `;
    if (components.navLinks) {
      md += `Links: ${components.navLinks.fontSize} weight ${components.navLinks.fontWeight}, `;
      md += `color \`${components.navLinks.color}\`. `;
    }
    md += `"\n\n`;
  }

  // Iteration guide
  md += `### Iteration Guide\n`;
  md += `1. Always use \`${primaryFont}\` as the primary font\n`;

  const uniqueWeights = [...new Set(typography.scale.map((e) => e.fontWeight))].sort();
  md += `2. Font weights: ${uniqueWeights.join(', ')}\n`;

  md += `3. Page background: \`${colors.pageBg}\`, text: \`${colors.pageColor}\`\n`;

  if (layout.borderRadiusScale[0]) {
    md += `4. Default border-radius: \`${layout.borderRadiusScale[0].radius}\`\n`;
  }

  if (shadows.length > 0) {
    md += `5. Primary shadow: \`${shadows[0].shadow.slice(0, 80)}${shadows[0].shadow.length > 80 ? '...' : ''}\`\n`;
  }

  md += `6. Spacing base unit: ${layout.baseUnit || 8}px\n`;

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

function assignBreakpointNames(breakpoints) {
  const named = [];
  const nameMap = [
    { max: 480, name: 'Mobile Small', desc: 'Compact mobile layout' },
    { max: 640, name: 'Mobile', desc: 'Single column, reduced heading sizes, stacked cards' },
    { max: 768, name: 'Tablet Portrait', desc: 'Transitional layout, 2-column where possible' },
    { max: 1024, name: 'Tablet / Small Desktop', desc: '2-column grids, moderate padding' },
    { max: 1280, name: 'Desktop', desc: 'Full layout, multi-column feature grids' },
    { max: 1440, name: 'Large Desktop', desc: 'Centered content with generous margins' },
    { max: 1920, name: 'Wide Desktop', desc: 'Maximum content width, extra whitespace' },
    { max: Infinity, name: 'Ultra Wide', desc: 'Content centered, max-width constrained' },
  ];

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
