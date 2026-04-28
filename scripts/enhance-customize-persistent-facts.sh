#!/bin/bash
# Enhance customize.toml files with domain-specific persistent_facts

SKILL_DIR="$1"
if [ -z "$SKILL_DIR" ]; then
  echo "Usage: $0 <skill-directory>"
  exit 1
fi

TOML_FILE="$SKILL_DIR/customize.toml"
if [ ! -f "$TOML_FILE" ]; then
  echo "customize.toml not found in $SKILL_DIR"
  exit 1
fi

# Check if already has domain files
if grep -q "domains/" "$TOML_FILE"; then
  echo "Already has domain files: $TOML_FILE"
  exit 0
fi

SKILL_NAME=$(basename "$SKILL_DIR")

# Map skills to their domain files
declare -A DOMAIN_MAP
DOMAIN_MAP["bmad-bam-master-architecture"]="tenant.md ai-runtime.md integration.md"
DOMAIN_MAP["bmad-bam-tenant-isolation"]="tenant.md security.md"
DOMAIN_MAP["bmad-bam-agent-runtime"]="ai-runtime.md"
DOMAIN_MAP["bmad-bam-module-architecture"]="integration.md"
DOMAIN_MAP["bmad-bam-facade-contract"]="integration.md events.md"
DOMAIN_MAP["bmad-bam-convergence"]="integration.md security.md"
DOMAIN_MAP["bmad-bam-production-readiness"]="tenant.md ai-runtime.md security.md observability.md"
DOMAIN_MAP["bmad-bam-tenant-onboarding"]="tenant.md onboarding.md"
DOMAIN_MAP["bmad-bam-tenant-offboarding"]="tenant.md onboarding.md"
DOMAIN_MAP["bmad-bam-observability"]="observability.md"
DOMAIN_MAP["bmad-bam-scaling"]="tenant.md"
DOMAIN_MAP["bmad-bam-events"]="events.md integration.md"
DOMAIN_MAP["bmad-bam-agent-debug"]="ai-runtime.md"
DOMAIN_MAP["bmad-bam-agent-tracing"]="ai-runtime.md observability.md"
DOMAIN_MAP["bmad-bam-tool-contracts"]="ai-runtime.md integration.md"
DOMAIN_MAP["bmad-bam-memory-tiers"]="ai-runtime.md"
DOMAIN_MAP["bmad-bam-llm-versioning"]="ai-runtime.md"
DOMAIN_MAP["bmad-bam-caching"]="caching.md tenant.md"
DOMAIN_MAP["bmad-bam-security"]="security.md compliance.md"
DOMAIN_MAP["bmad-bam-compliance"]="compliance.md security.md"
DOMAIN_MAP["bmad-bam-data-residency"]="compliance.md storage.md"
DOMAIN_MAP["bmad-bam-white-labeling"]="tenant.md"
DOMAIN_MAP["bmad-bam-billing"]="billing.md tenant.md"
DOMAIN_MAP["bmad-bam-testing"]="testing.md tenant.md"
DOMAIN_MAP["bmad-bam-research"]="ai-runtime.md"
DOMAIN_MAP["bmad-bam-api-versioning"]="integration.md"
DOMAIN_MAP["bmad-bam-requirements"]="tenant.md"
DOMAIN_MAP["bmad-bam-triage"]="tenant.md ai-runtime.md"
DOMAIN_MAP["bmad-bam-module-epics"]="tenant.md integration.md"
DOMAIN_MAP["bmad-bam-cross-module-story"]="integration.md"

# Get domains for this skill
DOMAINS="${DOMAIN_MAP[$SKILL_NAME]:-tenant.md}"

# Get quality gate
QG=$(grep -o "qg-[a-z][0-9]*" "$TOML_FILE" | head -1)
if [ -z "$QG" ]; then
  QG="qg-f1"
fi

# Build domain lines
DOMAIN_LINES=""
for domain in $DOMAINS; do
  DOMAIN_LINES="$DOMAIN_LINES  \"file:{project-root}/_bmad/bam/data/domains/$domain\",\n"
done

# Update persistent_facts section
sed -i "/^persistent_facts = \[/,/^\]/c\persistent_facts = [\n  \"file:{project-root}/_bmad/bam/data/context/bam-core.md\",\n$DOMAIN_LINES  \"file:{project-root}/_bmad/bam/data/checklists/$QG.md\",\n  \"file:{project-root}/**/project-context.md\",\n]" "$TOML_FILE"

echo "Enhanced persistent_facts: $TOML_FILE"
