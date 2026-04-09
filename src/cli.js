#!/usr/bin/env node

/**
 * CLI entry point for design-md-generator
 * Usage:
 *   design-md-generator <url> [options]          — Extract from live website via Puppeteer
 *   design-md-generator local <dir> [options]    — Extract from local source code
 */

const { program } = require('commander');
const path = require('path');
const { generateDesignMdFromUrl, generateDesignMdFromLocal } = require('./index');

// ============================================================
// Default command: extract from URL via Puppeteer
// ============================================================
program
  .name('design-md-generator')
  .description('Generate DESIGN.md from any website or local source code')
  .version('1.0.0');

program
  .command('url', { isDefault: true })
  .description('Generate DESIGN.md from a live website URL using Puppeteer')
  .argument('<url>', 'Website URL to extract design tokens from')
  .option('-o, --output <path>', 'Output file path', './DESIGN.md')
  .option('-n, --name <name>', 'Site name (auto-detected if not provided)')
  .option('-t, --timeout <ms>', 'Navigation timeout in milliseconds', '30000')
  .option('-s, --screenshot', 'Save a screenshot of the homepage')
  .option('--json', 'Also output raw tokens as JSON')
  .option('-w, --wait <selector>', 'Wait for a specific CSS selector before extracting')
  .option('-l, --lang <lang>', 'Output language: zh (Chinese) or en (English)', 'zh')
  .action(async (url, options) => {
    try {
      // Normalize URL
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      console.log(`\n🎨 Design MD Generator (URL mode)\n`);
      console.log(`   URL: ${url}`);
      console.log(`   Output: ${options.output}`);
      console.log('');

      const result = await generateDesignMdFromUrl(url, {
        outputPath: path.resolve(options.output),
        siteName: options.name,
        timeout: parseInt(options.timeout),
        screenshot: options.screenshot,
        outputJson: options.json,
        waitForSelector: options.wait,
        lang: options.lang,
      });

      console.log(`\n✨ Done! DESIGN.md generated successfully.`);
      console.log(`   📄 ${result.outputPath}`);
      if (result.jsonPath) {
        console.log(`   📊 ${result.jsonPath}`);
      }
      if (result.screenshotPath) {
        console.log(`   📸 ${result.screenshotPath}`);
      }
      console.log(`   🎨 ${result.colorCount} colors extracted`);
      console.log(`   🔤 ${result.fontCount} font families detected`);
      console.log(`   📐 ${result.componentCount} component styles captured`);
      console.log('');
    } catch (error) {
      console.error(`\n❌ Error: ${error.message}\n`);
      if (error.message.includes('net::ERR')) {
        console.error('   Could not reach the website. Check the URL and your network connection.');
      }
      if (error.message.includes('timeout')) {
        console.error('   The page took too long to load. Try increasing --timeout.');
      }
      process.exit(1);
    }
  });

// ============================================================
// Local command: extract from local source code
// ============================================================
program
  .command('local')
  .description('Generate DESIGN.md from local source code by static analysis')
  .argument('<dir>', 'Directory containing source code to analyze')
  .option('-o, --output <path>', 'Output file path', './DESIGN.md')
  .option('-n, --name <name>', 'Project name (auto-detected from package.json if not provided)')
  .option('-p, --pages <patterns...>', 'Page/directory patterns to focus on (e.g. "src/pages/home" "components/Header")')
  .option('-i, --include <patterns...>', 'Include only files matching these patterns')
  .option('-e, --exclude <patterns...>', 'Exclude files matching these patterns')
  .option('--json', 'Also output raw tokens as JSON')
  .option('-l, --lang <lang>', 'Output language: zh (Chinese) or en (English)', 'zh')
  .action(async (dir, options) => {
    try {
      console.log(`\n🎨 Design MD Generator (Local mode)\n`);
      console.log(`   Directory: ${path.resolve(dir)}`);
      console.log(`   Output: ${options.output}`);
      if (options.pages) {
        console.log(`   Pages: ${options.pages.join(', ')}`);
      }
      console.log('');

      const result = await generateDesignMdFromLocal(dir, {
        outputPath: path.resolve(options.output),
        siteName: options.name,
        pages: options.pages || [],
        include: options.include || [],
        exclude: options.exclude || [],
        outputJson: options.json,
        lang: options.lang,
      });

      console.log(`\n✨ Done! DESIGN.md generated successfully.`);
      console.log(`   📄 ${result.outputPath}`);
      if (result.jsonPath) {
        console.log(`   📊 ${result.jsonPath}`);
      }
      console.log(`   🎨 ${result.colorCount} colors extracted`);
      console.log(`   🔤 ${result.fontCount} font families detected`);
      console.log(`   📐 ${result.componentCount} component styles captured`);
      console.log('');
    } catch (error) {
      console.error(`\n❌ Error: ${error.message}\n`);
      if (error.message.includes('not found')) {
        console.error('   Directory not found. Check the path and try again.');
      }
      process.exit(1);
    }
  });

program.parse();
