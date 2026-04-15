#!/bin/bash
# ============================================================================
# BAM Enhanced Post-Install Script
# ============================================================================
# Purpose: Complete BAM installation by copying data/ directory
#
# WHY THIS IS NEEDED:
# BMB installer uses "plugin resolution" for BAM which only copies skills.
# The data/ directory (agent-guides, templates, checklists, extensions) is
# not copied. This script fixes that.
#
# USAGE:
#   ./bam-post-install.sh                    # Auto-detect paths
#   ./bam-post-install.sh /path/to/project   # Explicit project path
#   ./bam-post-install.sh --force            # Force reinstall
#
# This script can be run:
#   1. After npx bmad-method install
#   2. From node_modules: ./node_modules/bmad-bam/scripts/bam-post-install.sh
#   3. From cloned source: ./scripts/bam-post-install.sh /project/path
# ============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Parse arguments
FORCE=false
PROJECT_DIR=""

for arg in "$@"; do
    case $arg in
        --force|-f)
            FORCE=true
            ;;
        *)
            if [ -z "$PROJECT_DIR" ]; then
                PROJECT_DIR="$arg"
            fi
            ;;
    esac
done

# Determine project directory
if [ -z "$PROJECT_DIR" ]; then
    # Try to auto-detect
    if [ -d "./_bmad" ]; then
        PROJECT_DIR="."
    elif [ -d "../_bmad" ]; then
        PROJECT_DIR=".."
    elif [ -d "../../_bmad" ]; then
        PROJECT_DIR="../.."
    else
        echo -e "${RED}ERROR: Could not auto-detect project directory.${NC}"
        echo "Usage: $0 /path/to/project"
        exit 1
    fi
fi

PROJECT_DIR=$(cd "$PROJECT_DIR" && pwd)
BMAD_DIR="$PROJECT_DIR/_bmad"
BAM_DIR="$BMAD_DIR/bmad-bam"

# Determine source directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Try multiple source locations
if [ -d "$SCRIPT_DIR/../src/data" ]; then
    SOURCE_DIR="$SCRIPT_DIR/../src"
elif [ -d "$SCRIPT_DIR/../../src/data" ]; then
    SOURCE_DIR="$SCRIPT_DIR/../../src"
elif [ -d "$PROJECT_DIR/node_modules/bmad-bam/src/data" ]; then
    SOURCE_DIR="$PROJECT_DIR/node_modules/bmad-bam/src"
elif [ -d "$HOME/.bmad/cache/external-modules/bmad-bam/src/data" ]; then
    SOURCE_DIR="$HOME/.bmad/cache/external-modules/bmad-bam/src"
else
    echo -e "${RED}ERROR: Could not find BAM source directory.${NC}"
    echo "Tried:"
    echo "  - $SCRIPT_DIR/../src/data"
    echo "  - $SCRIPT_DIR/../../src/data"
    echo "  - $PROJECT_DIR/node_modules/bmad-bam/src/data"
    echo "  - $HOME/.bmad/cache/external-modules/bmad-bam/src/data"
    exit 1
fi

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}BAM Post-Install${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""
echo "Project: $PROJECT_DIR"
echo "Target:  $BAM_DIR"
echo "Source:  $SOURCE_DIR"
echo ""

# Check if BAM module directory exists
if [ ! -d "$BAM_DIR" ]; then
    echo -e "${RED}ERROR: BAM module not found at $BAM_DIR${NC}"
    echo "Please run 'npx bmad-method install' first and select the BAM module."
    exit 1
fi

# Check source data directory
if [ ! -d "$SOURCE_DIR/data" ]; then
    echo -e "${RED}ERROR: Source data directory not found at $SOURCE_DIR/data${NC}"
    exit 1
fi

# Check if data directory already exists and has content
if [ -d "$BAM_DIR/data/agent-guides" ] && [ -d "$BAM_DIR/data/templates" ]; then
    GUIDE_COUNT=$(ls "$BAM_DIR/data/agent-guides/bam/" 2>/dev/null | wc -l)
    TEMPLATE_COUNT=$(ls "$BAM_DIR/data/templates/" 2>/dev/null | wc -l)

    if [ "$GUIDE_COUNT" -gt 150 ] && [ "$TEMPLATE_COUNT" -gt 400 ]; then
        if [ "$FORCE" = false ]; then
            echo -e "${GREEN}BAM data already installed:${NC}"
            echo "  - Agent guides: $GUIDE_COUNT"
            echo "  - Templates: $TEMPLATE_COUNT"
            echo ""
            echo "Run with --force to reinstall."
            exit 0
        else
            echo -e "${YELLOW}Force reinstall requested. Removing existing data...${NC}"
            rm -rf "$BAM_DIR/data"
        fi
    fi
fi

# Copy data directory
echo -e "${CYAN}Copying BAM data directory...${NC}"
cp -r "$SOURCE_DIR/data" "$BAM_DIR/"

# Verify installation
echo ""
echo -e "${CYAN}Verifying installation...${NC}"

ERRORS=0

check_count() {
    local path="$1"
    local expected="$2"
    local name="$3"
    local actual=$(ls "$path" 2>/dev/null | wc -l)
    if [ "$actual" -lt "$expected" ]; then
        echo -e "  ${RED}[FAIL]${NC} $name: Expected $expected+, found $actual"
        ERRORS=$((ERRORS + 1))
    else
        echo -e "  ${GREEN}[PASS]${NC} $name: $actual files"
    fi
}

check_file() {
    local path="$1"
    local name="$2"
    if [ -f "$path" ]; then
        echo -e "  ${GREEN}[PASS]${NC} $name"
    else
        echo -e "  ${RED}[FAIL]${NC} $name missing"
        ERRORS=$((ERRORS + 1))
    fi
}

echo ""
echo "Data Directory Contents:"
check_count "$BAM_DIR/data/agent-guides/bam" 180 "Agent guides"
check_count "$BAM_DIR/data/templates" 400 "Templates"
check_count "$BAM_DIR/data/checklists" 30 "Checklists"
check_count "$BAM_DIR/data/extensions" 25 "Extensions"

echo ""
echo "Pattern Registry CSVs:"
check_file "$BAM_DIR/data/bam-patterns.csv" "bam-patterns.csv"
check_file "$BAM_DIR/data/tenant-models.csv" "tenant-models.csv"
check_file "$BAM_DIR/data/ai-runtimes.csv" "ai-runtimes.csv"
check_file "$BAM_DIR/data/quality-gates.csv" "quality-gates.csv"
check_file "$BAM_DIR/data/compliance-frameworks.csv" "compliance-frameworks.csv"
check_file "$BAM_DIR/data/section-pattern-map.csv" "section-pattern-map.csv"

# Summary
echo ""
echo -e "${BLUE}============================================${NC}"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}BAM Post-Install: SUCCESS${NC}"
    echo -e "${BLUE}============================================${NC}"
    echo ""
    echo "BAM data directory has been installed successfully."
    echo ""
    echo "Installed:"
    echo "  - Agent guides: $(ls "$BAM_DIR/data/agent-guides/bam" 2>/dev/null | wc -l) files"
    echo "  - Templates: $(ls "$BAM_DIR/data/templates" 2>/dev/null | wc -l) files"
    echo "  - Checklists: $(ls "$BAM_DIR/data/checklists" 2>/dev/null | wc -l) files"
    echo "  - Extensions: $(ls "$BAM_DIR/data/extensions" 2>/dev/null | wc -l) files"
    echo "  - Pattern CSVs: 6 files"
else
    echo -e "${RED}BAM Post-Install: INCOMPLETE ($ERRORS issues)${NC}"
    echo -e "${BLUE}============================================${NC}"
    echo ""
    echo "Some components were not installed correctly."
    echo "Please check the errors above and try again."
    exit 1
fi
