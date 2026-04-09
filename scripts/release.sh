#!/bin/bash

# =============================================================================
# Release Script for design-md-generator
# Usage: ./scripts/release.sh [patch|minor|major] [--dry-run]
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
BUMP_TYPE="${1:-patch}"
DRY_RUN=false

# Parse arguments
for arg in "$@"; do
  case $arg in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    patch|minor|major)
      BUMP_TYPE="$arg"
      shift
      ;;
    *)
      echo -e "${RED}Unknown argument: $arg${NC}"
      echo "Usage: ./scripts/release.sh [patch|minor|major] [--dry-run]"
      exit 1
      ;;
  esac
done

echo -e "${BLUE}🚀 Starting release process...${NC}"
echo -e "${BLUE}   Bump type: ${YELLOW}${BUMP_TYPE}${NC}"

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
  echo -e "${RED}❌ Error: You have uncommitted changes. Please commit or stash them first.${NC}"
  git status --short
  exit 1
fi

# Get current and new version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo -e "${BLUE}   Current version: ${YELLOW}v${CURRENT_VERSION}${NC}"

# Calculate new version
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"
case $BUMP_TYPE in
  major)
    NEW_VERSION="$((MAJOR + 1)).0.0"
    ;;
  minor)
    NEW_VERSION="${MAJOR}.$((MINOR + 1)).0"
    ;;
  patch)
    NEW_VERSION="${MAJOR}.${MINOR}.$((PATCH + 1))"
    ;;
esac

echo -e "${BLUE}   New version:     ${GREEN}v${NEW_VERSION}${NC}"

if $DRY_RUN; then
  echo -e "${YELLOW}🏃 Dry run mode - no changes will be made${NC}"
fi

# Generate changelog entry
echo -e "${BLUE}📝 Generating changelog entry...${NC}"

# Get commits since last tag (or all commits if no tags)
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [[ -n "$LAST_TAG" ]]; then
  COMMITS=$(git log "${LAST_TAG}..HEAD" --pretty=format:"- %s (%h)" --no-merges)
else
  COMMITS=$(git log --pretty=format:"- %s (%h)" --no-merges)
fi

if [[ -z "$COMMITS" ]]; then
  echo -e "${YELLOW}⚠️  No new commits found since last release.${NC}"
  read -p "Continue anyway? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Aborted.${NC}"
    exit 1
  fi
  COMMITS="- Maintenance release"
fi

# Build changelog entry
DATE=$(date +%Y-%m-%d)
CHANGELOG_ENTRY="## [${NEW_VERSION}] - ${DATE}

${COMMITS}
"

echo -e "${GREEN}Changelog entry:${NC}"
echo "$CHANGELOG_ENTRY"
echo ""

if $DRY_RUN; then
  echo -e "${YELLOW}🏃 Dry run complete. No changes were made.${NC}"
  exit 0
fi

# Confirm release
read -p "Proceed with release v${NEW_VERSION}? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo -e "${RED}Aborted.${NC}"
  exit 1
fi

# Update CHANGELOG.md
echo -e "${BLUE}📝 Updating CHANGELOG.md...${NC}"
if [[ -f CHANGELOG.md ]]; then
  # Insert new entry after the header
  TEMP_FILE=$(mktemp)
  {
    head -n 2 CHANGELOG.md
    echo ""
    echo "$CHANGELOG_ENTRY"
    tail -n +3 CHANGELOG.md
  } > "$TEMP_FILE"
  mv "$TEMP_FILE" CHANGELOG.md
else
  cat > CHANGELOG.md << EOF
# Changelog

${CHANGELOG_ENTRY}
## [1.0.0] - 2025-01-01

- 🎉 Initial release
- Extract design tokens from any website
- Generate DESIGN.md files
- CLI support with multiple options
EOF
fi

# Bump version in package.json
echo -e "${BLUE}📦 Bumping version in package.json...${NC}"
npm version "$BUMP_TYPE" --no-git-tag-version

# Commit and tag
echo -e "${BLUE}📌 Committing and tagging...${NC}"
git add package.json CHANGELOG.md
git commit -m "release: v${NEW_VERSION}"
git tag -a "v${NEW_VERSION}" -m "Release v${NEW_VERSION}"

# Publish to npm
echo -e "${BLUE}🚀 Publishing to npm...${NC}"
npm publish --registry https://registry.npmjs.org/ --access public

# Push to git
echo -e "${BLUE}⬆️  Pushing to git...${NC}"
git push
git push --tags

echo ""
echo -e "${GREEN}✅ Successfully released v${NEW_VERSION}!${NC}"
echo -e "${GREEN}   📦 npm: https://www.npmjs.com/package/design-md-generator${NC}"
echo -e "${GREEN}   🏷️  tag: v${NEW_VERSION}${NC}"
