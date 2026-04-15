#!/bin/bash
# ============================================================================
# BAM Installation Migration Script
# ============================================================================
# Purpose: Fix BAM installation that is missing data/ directory
#
# PROBLEM SOLVED:
# The BMB installer uses "plugin resolution" for BAM which only copies skills.
# The data/ directory (721 files) is never copied, breaking all BAM workflows.
#
# This script:
# 1. Backs up existing config and customizations
# 2. Copies the complete data/ directory from BAM source
# 3. Restores user configuration
# 4. Verifies installation completeness
#
# Usage: ./migrate-installation.sh <target-project-path>
# Example: ./migrate-installation.sh /path/to/my-project
# ============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SOURCE_DIR="$SCRIPT_DIR/../src"
TARGET_PROJECT="${1:-.}"
BMAD_DIR="$TARGET_PROJECT/_bmad"
BAM_DIR="$BMAD_DIR/bam"
SKILLS_DIR="$TARGET_PROJECT/.claude/skills"
BACKUP_DIR="$BMAD_DIR/_bam-backup-$(date +%Y%m%d_%H%M%S)"

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}BAM Installation Migration${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""
echo "Source: $SOURCE_DIR"
echo "Target: $TARGET_PROJECT"
echo "BAM Dir: $BAM_DIR"
echo "Skills Dir: $SKILLS_DIR"
echo ""

# ============================================================================
# PHASE 1: Pre-flight Checks
# ============================================================================
echo -e "${YELLOW}Phase 1: Pre-flight Checks${NC}"

# Check source exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}ERROR: Source directory not found: $SOURCE_DIR${NC}"
    exit 1
fi

# Check source has required files
if [ ! -f "$SOURCE_DIR/module.yaml" ]; then
    echo -e "${RED}ERROR: module.yaml not found in source${NC}"
    exit 1
fi

if [ ! -d "$SOURCE_DIR/data" ]; then
    echo -e "${RED}ERROR: data/ directory not found in source${NC}"
    exit 1
fi

echo -e "  ${GREEN}[OK]${NC} Source validated"

# Check target project exists
if [ ! -d "$TARGET_PROJECT" ]; then
    echo -e "${RED}ERROR: Target project not found: $TARGET_PROJECT${NC}"
    exit 1
fi

echo -e "  ${GREEN}[OK]${NC} Target project exists"

# ============================================================================
# PHASE 2: Backup Existing Installation
# ============================================================================
echo ""
echo -e "${YELLOW}Phase 2: Backup Existing Installation${NC}"

if [ -d "$BAM_DIR" ]; then
    echo "  Backing up existing BAM to: $BACKUP_DIR"
    mkdir -p "$BACKUP_DIR"

    # Backup config files (preserve user settings)
    if [ -f "$BAM_DIR/config.yaml" ]; then
        cp "$BAM_DIR/config.yaml" "$BACKUP_DIR/"
        echo -e "  ${GREEN}[SAVED]${NC} config.yaml"
    fi

    # Backup any custom files in knowledge/ that were modified
    if [ -d "$BAM_DIR/knowledge" ]; then
        cp -r "$BAM_DIR/knowledge" "$BACKUP_DIR/"
        echo -e "  ${GREEN}[SAVED]${NC} knowledge/ directory"
    fi

    # Backup extensions (in case of customizations)
    if [ -d "$BAM_DIR/extensions" ]; then
        cp -r "$BAM_DIR/extensions" "$BACKUP_DIR/"
        echo -e "  ${GREEN}[SAVED]${NC} extensions/ directory"
    fi

    echo -e "  ${GREEN}[OK]${NC} Backup complete"
else
    echo "  No existing BAM installation found (fresh install)"
fi

# ============================================================================
# PHASE 3: Remove Old Structure
# ============================================================================
echo ""
echo -e "${YELLOW}Phase 3: Remove Old Structure${NC}"

if [ -d "$BAM_DIR" ]; then
    echo "  Removing old BAM directory..."
    rm -rf "$BAM_DIR"
    echo -e "  ${GREEN}[OK]${NC} Old structure removed"
else
    echo "  No old structure to remove"
fi

# ============================================================================
# PHASE 4: Create New BMB-Compatible Structure
# ============================================================================
echo ""
echo -e "${YELLOW}Phase 4: Create New BMB-Compatible Structure${NC}"

# Create BAM directory
mkdir -p "$BAM_DIR"
mkdir -p "$BAM_DIR/agents"   # Empty (pure extension module)
mkdir -p "$BAM_DIR/skills"   # Empty (BMB compatibility)

# Copy module files
cp "$SOURCE_DIR/module.yaml" "$BAM_DIR/"
cp "$SOURCE_DIR/module-help.csv" "$BAM_DIR/"
echo -e "  ${GREEN}[OK]${NC} Module files copied"

# Copy data directory (all resources)
cp -r "$SOURCE_DIR/data" "$BAM_DIR/"
echo -e "  ${GREEN}[OK]${NC} Data directory copied"

# ============================================================================
# PHASE 5: Restore User Configuration
# ============================================================================
echo ""
echo -e "${YELLOW}Phase 5: Restore User Configuration${NC}"

if [ -f "$BACKUP_DIR/config.yaml" ]; then
    cp "$BACKUP_DIR/config.yaml" "$BAM_DIR/"
    echo -e "  ${GREEN}[OK]${NC} User config restored"
else
    # Create default config
    cat > "$BAM_DIR/config.yaml" << 'EOF'
# BAM Module Configuration
# Generated by BAM migration script

tenant_model: row-level-security
ai_runtime: langgraph
design_first: true
test_architecture: true
planning_artifacts: "{project-root}/_bmad-output/planning-artifacts"
implementation_artifacts: "{project-root}/_bmad-output/implementation-artifacts"
output_folder: "{project-root}/_bmad-output"
EOF
    echo -e "  ${YELLOW}[NEW]${NC} Default config created"
fi

# ============================================================================
# PHASE 6: Install Skills to .claude/skills/
# ============================================================================
echo ""
echo -e "${YELLOW}Phase 6: Install Skills${NC}"

# Create skills directory if needed
mkdir -p "$SKILLS_DIR"

# Count existing skills
EXISTING_SKILLS=$(ls -d "$SKILLS_DIR"/*/ 2>/dev/null | wc -l)
echo "  Existing skills: $EXISTING_SKILLS"

# Copy all BAM workflows as skills
WORKFLOWS_DIR="$SOURCE_DIR/workflows"
SKILL_COUNT=0

# Function to copy skill
copy_skill() {
    local src="$1"
    local name=$(basename "$src")
    local dest="$SKILLS_DIR/$name"

    if [ -f "$src/bmad-skill-manifest.yaml" ]; then
        if [ ! -d "$dest" ]; then
            cp -r "$src" "$dest"
            SKILL_COUNT=$((SKILL_COUNT + 1))
        fi
    fi
}

# Copy flat workflows
for workflow in "$WORKFLOWS_DIR"/*/; do
    if [ -d "$workflow" ]; then
        name=$(basename "$workflow")
        # Skip container directories
        if [[ "$name" != "foundation" && "$name" != "module" && "$name" != "integration" && \
              "$name" != "ingestion" && "$name" != "discovery" && "$name" != "quality" && "$name" != "utility" ]]; then
            copy_skill "$workflow"
        else
            # Process nested workflows in container directories
            for nested in "$workflow"/*/; do
                if [ -d "$nested" ]; then
                    copy_skill "$nested"
                fi
            done
        fi
    fi
done

echo -e "  ${GREEN}[OK]${NC} Installed $SKILL_COUNT new skills"

# ============================================================================
# PHASE 7: Verification
# ============================================================================
echo ""
echo -e "${YELLOW}Phase 7: Verification${NC}"

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

echo "Module Files:"
check_file "$BAM_DIR/module.yaml" "module.yaml"
check_file "$BAM_DIR/module-help.csv" "module-help.csv"
check_file "$BAM_DIR/config.yaml" "config.yaml"

echo ""
echo "Data Directory:"
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

echo ""
echo "Skills Directory:"
TOTAL_SKILLS=$(ls -d "$SKILLS_DIR"/*/ 2>/dev/null | wc -l)
BAM_SKILLS=$(ls -d "$SKILLS_DIR"/*/ 2>/dev/null | xargs -I{} basename {} | grep -v "^bmad-\|^wds-" | wc -l)
echo -e "  Total skills: $TOTAL_SKILLS"
echo -e "  BAM skills: $BAM_SKILLS"

# ============================================================================
# PHASE 8: Summary
# ============================================================================
echo ""
echo -e "${BLUE}============================================${NC}"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}MIGRATION COMPLETE - SUCCESS${NC}"
    echo -e "${BLUE}============================================${NC}"
    echo ""
    echo "BAM has been successfully migrated to the new BMB-compatible structure."
    echo ""
    echo "Installed components:"
    echo "  - Module files: module.yaml, module-help.csv, config.yaml"
    echo "  - Agent guides: $(ls "$BAM_DIR/data/agent-guides/bam" | wc -l) files"
    echo "  - Templates: $(ls "$BAM_DIR/data/templates" | wc -l) files"
    echo "  - Checklists: $(ls "$BAM_DIR/data/checklists" | wc -l) files"
    echo "  - Extensions: $(ls "$BAM_DIR/data/extensions" | wc -l) files"
    echo "  - Skills: $SKILL_COUNT installed"
    echo ""
    if [ -d "$BACKUP_DIR" ]; then
        echo "Backup saved to: $BACKUP_DIR"
        echo "(Delete after verifying migration is successful)"
    fi
else
    echo -e "${RED}MIGRATION INCOMPLETE - $ERRORS ISSUES${NC}"
    echo -e "${BLUE}============================================${NC}"
    echo ""
    echo "Some components were not installed correctly."
    echo "Review the errors above and run the script again."
    exit 1
fi
