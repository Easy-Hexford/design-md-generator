/**
 * Design MD Generator - Main Entry Point
 * Orchestrates the extraction and generation pipeline.
 */

const fs = require('fs');
const path = require('path');
const { extractDesignTokens } = require('./extractor');
const { extractDesignTokensFromLocal } = require('./local-extractor');
const { generateDesignMd } = require('./generator');

/**
 * Generate a DESIGN.md file from a website URL
 * @param {string} url - The website URL
 * @param {object} options - Generation options
 * @returns {object} Result with paths and stats
 */
async function generateDesignMdFromUrl(url, options = {}) {
  const {
    outputPath = path.resolve('./DESIGN.md'),
    siteName = null,
    timeout = 30000,
    screenshot = false,
    outputJson = false,
    waitForSelector = null,
  } = options;

  // Determine output directory
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Determine screenshot path
  const screenshotPath = screenshot
    ? path.join(outputDir, 'screenshot.png')
    : null;

  // Step 1: Extract design tokens
  const tokens = await extractDesignTokens(url, {
    timeout,
    waitForSelector,
    screenshotPath,
  });

  // Step 2: Determine site name
  const resolvedSiteName = siteName || deriveSiteName(url, tokens);

  // Step 3: Generate DESIGN.md content
  console.log(`📝 Generating DESIGN.md for "${resolvedSiteName}"...`);
  const markdown = generateDesignMd(tokens, resolvedSiteName);

  // Step 4: Write DESIGN.md
  fs.writeFileSync(outputPath, markdown, 'utf-8');
  console.log(`💾 Saved DESIGN.md to ${outputPath}`);

  // Step 5: Optionally write raw JSON tokens
  let jsonPath = null;
  if (outputJson) {
    jsonPath = path.join(outputDir, 'design-tokens.json');
    fs.writeFileSync(jsonPath, JSON.stringify(tokens, null, 2), 'utf-8');
    console.log(`💾 Saved raw tokens to ${jsonPath}`);
  }

  // Compute stats
  const colorCount = tokens.colors.palette.length + Object.keys(tokens.colors.semantic).length;
  const fontCount = tokens.typography.fontFamilies.length;
  const componentCount =
    (tokens.components.buttons?.length || 0) +
    (tokens.components.cards?.length || 0) +
    (tokens.components.inputs?.length || 0) +
    (tokens.components.badges?.length || 0) +
    (tokens.components.navigation ? 1 : 0);

  return {
    outputPath,
    jsonPath,
    screenshotPath,
    colorCount,
    fontCount,
    componentCount,
    siteName: resolvedSiteName,
    tokens,
    markdown,
  };
}

/**
 * Generate a DESIGN.md file from local source code
 * @param {string} dir - The directory containing source code
 * @param {object} options - Generation options
 * @returns {object} Result with paths and stats
 */
async function generateDesignMdFromLocal(dir, options = {}) {
  const {
    outputPath = path.resolve('./DESIGN.md'),
    siteName = null,
    pages = [],
    include = [],
    exclude = [],
    outputJson = false,
  } = options;

  // Determine output directory
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Step 1: Extract design tokens from local source code
  const tokens = await extractDesignTokensFromLocal(dir, {
    pages,
    include,
    exclude,
  });

  // Step 2: Determine project name
  const resolvedSiteName = siteName || tokens.meta.title || path.basename(path.resolve(dir));

  // Step 3: Generate DESIGN.md content
  console.log(`📝 Generating DESIGN.md for "${resolvedSiteName}"...`);
  const markdown = generateDesignMd(tokens, resolvedSiteName);

  // Step 4: Write DESIGN.md
  fs.writeFileSync(outputPath, markdown, 'utf-8');
  console.log(`💾 Saved DESIGN.md to ${outputPath}`);

  // Step 5: Optionally write raw JSON tokens
  let jsonPath = null;
  if (outputJson) {
    jsonPath = path.join(outputDir, 'design-tokens.json');
    fs.writeFileSync(jsonPath, JSON.stringify(tokens, null, 2), 'utf-8');
    console.log(`💾 Saved raw tokens to ${jsonPath}`);
  }

  // Compute stats
  const colorCount = tokens.colors.palette.length + Object.keys(tokens.colors.semantic).length;
  const fontCount = tokens.typography.fontFamilies.length;
  const componentCount =
    (tokens.components.buttons?.length || 0) +
    (tokens.components.cards?.length || 0) +
    (tokens.components.inputs?.length || 0) +
    (tokens.components.badges?.length || 0) +
    (tokens.components.navigation ? 1 : 0);

  return {
    outputPath,
    jsonPath,
    screenshotPath: null,
    colorCount,
    fontCount,
    componentCount,
    siteName: resolvedSiteName,
    tokens,
    markdown,
  };
}

/**
 * Derive a human-readable site name from URL and meta
 */
function deriveSiteName(url, tokens) {
  // Try meta title first
  if (tokens.meta.ogTitle) {
    // Clean up common suffixes
    return tokens.meta.ogTitle
      .replace(/\s*[-|–—]\s*.+$/, '') // Remove "- Company Name" suffixes
      .replace(/\s*\|.+$/, '')
      .trim()
      .slice(0, 40);
  }

  if (tokens.meta.title) {
    return tokens.meta.title
      .replace(/\s*[-|–—]\s*.+$/, '')
      .replace(/\s*\|.+$/, '')
      .trim()
      .slice(0, 40);
  }

  // Fallback: extract from URL
  try {
    const hostname = new URL(url).hostname;
    return hostname
      .replace(/^www\./, '')
      .replace(/\.\w+$/, '') // Remove TLD
      .split('.')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  } catch {
    return 'Website';
  }
}

module.exports = { generateDesignMdFromUrl, generateDesignMdFromLocal };
