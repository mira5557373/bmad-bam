# BAM Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate BAM from 233 agent guides to 25 domain guides, 186 workflows to 40 composite workflows, achieving 85% file reduction with 100% capability preservation.

**Architecture:** Pattern registry-centric design where `bam-patterns.csv` routes to consolidated domain guides via new `consolidated_guide` and `section_anchor` columns. All BAM conventions preserved verbatim in domain guide `§Conventions` sections. Web search with `{date}` placeholder provides current implementation details.

**Tech Stack:** YAML extensions, Markdown guides, CSV pattern registry, Bash scripts for validation

---

## File Structure

### Files to Create

```
src/data/agent-guides/bam/
├── tenant-patterns-guide.md          # Domain guide (NEW)
├── ai-runtime-patterns-guide.md      # Domain guide (NEW)
├── security-patterns-guide.md        # Domain guide (NEW)
├── observability-patterns-guide.md   # Domain guide (NEW)
├── reliability-patterns-guide.md     # Domain guide (NEW)
├── governance-patterns-guide.md      # Domain guide (NEW)
├── integration-patterns-guide.md     # Domain guide (NEW)
├── cost-patterns-guide.md            # Domain guide (NEW)
├── state-patterns-guide.md           # Domain guide (NEW)
├── discovery-patterns-guide.md       # Domain guide (NEW)
├── testing-patterns-guide.md         # Domain guide (NEW)
├── operations-patterns-guide.md      # Domain guide (NEW)
├── scaling-patterns-guide.md         # Domain guide (NEW)
├── ai-lifecycle-patterns-guide.md    # Domain guide (NEW)
├── ai-safety-patterns-guide.md       # Domain guide (NEW)
├── ai-observability-patterns-guide.md # Domain guide (NEW)
├── runtime-loops-patterns-guide.md   # Domain guide (NEW)
├── mcp-patterns-guide.md             # Domain guide (NEW)
├── data-patterns-guide.md            # Domain guide (NEW)
├── rag-patterns-guide.md             # Domain guide (NEW)
├── architecture-patterns-guide.md    # Domain guide (NEW)
├── analytics-patterns-guide.md       # Domain guide (NEW)
├── gate-verification-patterns-guide.md # Domain guide (NEW)
├── federation-patterns-guide.md      # Domain guide (NEW)
└── documentation-patterns-guide.md   # Domain guide (NEW)

src/data/
├── bam-patterns.csv                  # MODIFY: Add 3 columns

_archive/                             # Archive directory (NEW)
├── agent-guides/                     # Archived old guides
└── workflows/                        # Archived old workflows
```

### Files to Modify

```
src/data/bam-patterns.csv             # Add: consolidated_guide, section_anchor, phase columns
src/data/extensions/*.yaml            # Update prompt references
```

---

## Phase 1: Pattern Registry Enhancement

### Task 1.1: Backup Current State

**Files:**
- Read: `src/data/bam-patterns.csv`
- Create: `_archive/bam-patterns-backup-2026-04-24.csv`

- [ ] **Step 1: Create archive directory**

```bash
mkdir -p _archive
```

- [ ] **Step 2: Copy current CSV to archive**

```bash
cp src/data/bam-patterns.csv _archive/bam-patterns-backup-2026-04-24.csv
```

- [ ] **Step 3: Verify backup**

Run: `wc -l _archive/bam-patterns-backup-2026-04-24.csv`
Expected: 194 (193 patterns + 1 header)

- [ ] **Step 4: Commit**

```bash
git add _archive/
git commit -m "chore: backup bam-patterns.csv before consolidation"
```

---

### Task 1.2: Add New Columns to Pattern Registry

**Files:**
- Modify: `src/data/bam-patterns.csv`

- [ ] **Step 1: Create Python script for CSV modification**

Create `scripts/add-consolidation-columns.py`:

```python
#!/usr/bin/env python3
"""Add consolidation columns to bam-patterns.csv"""

import csv
import sys

# Domain mapping: pattern category prefix -> consolidated guide
# Comprehensive mapping to ensure 100% pattern coverage
DOMAIN_MAP = {
    # Tenant patterns
    'tenant': 'tenant-patterns-guide.md',
    'multi-tenant': 'tenant-patterns-guide.md',
    'isolation': 'tenant-patterns-guide.md',
    
    # Security patterns
    'security': 'security-patterns-guide.md',
    'auth': 'security-patterns-guide.md',
    'rbac': 'security-patterns-guide.md',
    'abac': 'security-patterns-guide.md',
    'secrets': 'security-patterns-guide.md',
    'encryption': 'security-patterns-guide.md',
    'zero-trust': 'security-patterns-guide.md',
    
    # AI/Agent patterns
    'ai': 'ai-runtime-patterns-guide.md',
    'agent': 'ai-runtime-patterns-guide.md',
    'llm': 'ai-runtime-patterns-guide.md',
    'ai-lifecycle': 'ai-lifecycle-patterns-guide.md',
    'ai-ops': 'ai-runtime-patterns-guide.md',
    'model': 'ai-lifecycle-patterns-guide.md',
    'prompt': 'ai-lifecycle-patterns-guide.md',
    
    # AI Safety
    'ai-safety': 'ai-safety-patterns-guide.md',
    'guardrail': 'ai-safety-patterns-guide.md',
    'kill-switch': 'ai-safety-patterns-guide.md',
    'grounding': 'ai-safety-patterns-guide.md',
    
    # Observability
    'observability': 'observability-patterns-guide.md',
    'monitoring': 'observability-patterns-guide.md',
    'logging': 'observability-patterns-guide.md',
    'tracing': 'observability-patterns-guide.md',
    'alerting': 'observability-patterns-guide.md',
    'ai-observability': 'ai-observability-patterns-guide.md',
    'llm-observability': 'ai-observability-patterns-guide.md',
    
    # Reliability
    'reliability': 'reliability-patterns-guide.md',
    'circuit-breaker': 'reliability-patterns-guide.md',
    'retry': 'reliability-patterns-guide.md',
    'fallback': 'reliability-patterns-guide.md',
    'resilience': 'reliability-patterns-guide.md',
    'bulkhead': 'reliability-patterns-guide.md',
    'disaster': 'reliability-patterns-guide.md',
    
    # MCP
    'mcp': 'mcp-patterns-guide.md',
    'tool': 'mcp-patterns-guide.md',
    
    # RAG/Embeddings
    'rag': 'rag-patterns-guide.md',
    'vector': 'rag-patterns-guide.md',
    'embedding': 'rag-patterns-guide.md',
    'retrieval': 'rag-patterns-guide.md',
    'chunking': 'rag-patterns-guide.md',
    
    # Data
    'data': 'data-patterns-guide.md',
    'database': 'data-patterns-guide.md',
    'connection': 'data-patterns-guide.md',
    'migration': 'data-patterns-guide.md',
    'query': 'data-patterns-guide.md',
    
    # State
    'state': 'state-patterns-guide.md',
    'cache': 'state-patterns-guide.md',
    'caching': 'state-patterns-guide.md',
    'session': 'state-patterns-guide.md',
    'checkpoint': 'state-patterns-guide.md',
    'memory': 'state-patterns-guide.md',
    'event-sourcing': 'state-patterns-guide.md',
    
    # Integration
    'integration': 'integration-patterns-guide.md',
    'api': 'integration-patterns-guide.md',
    'event': 'integration-patterns-guide.md',
    'webhook': 'integration-patterns-guide.md',
    'saga': 'integration-patterns-guide.md',
    'facade': 'integration-patterns-guide.md',
    'a2a': 'integration-patterns-guide.md',
    
    # Governance/Compliance
    'governance': 'governance-patterns-guide.md',
    'compliance': 'governance-patterns-guide.md',
    'audit': 'governance-patterns-guide.md',
    'policy': 'governance-patterns-guide.md',
    'gdpr': 'governance-patterns-guide.md',
    'soc2': 'governance-patterns-guide.md',
    'hipaa': 'governance-patterns-guide.md',
    
    # Operations
    'operations': 'operations-patterns-guide.md',
    'deployment': 'operations-patterns-guide.md',
    'devops': 'operations-patterns-guide.md',
    'incident': 'operations-patterns-guide.md',
    'runbook': 'operations-patterns-guide.md',
    'release': 'operations-patterns-guide.md',
    
    # Scaling
    'scaling': 'scaling-patterns-guide.md',
    'performance': 'scaling-patterns-guide.md',
    'rate-limit': 'scaling-patterns-guide.md',
    'capacity': 'scaling-patterns-guide.md',
    'load-balancing': 'scaling-patterns-guide.md',
    
    # Cost
    'cost': 'cost-patterns-guide.md',
    'billing': 'cost-patterns-guide.md',
    'metering': 'cost-patterns-guide.md',
    'quota': 'cost-patterns-guide.md',
    'monetization': 'cost-patterns-guide.md',
    
    # Testing
    'testing': 'testing-patterns-guide.md',
    'test': 'testing-patterns-guide.md',
    'contract': 'testing-patterns-guide.md',
    
    # Discovery/Planning
    'discovery': 'discovery-patterns-guide.md',
    'planning': 'discovery-patterns-guide.md',
    'requirements': 'discovery-patterns-guide.md',
    'triage': 'discovery-patterns-guide.md',
    
    # Runtime loops
    'runtime': 'runtime-loops-patterns-guide.md',
    'loop': 'runtime-loops-patterns-guide.md',
    'control-loop': 'runtime-loops-patterns-guide.md',
    
    # Quality Gates
    'gate': 'gate-verification-patterns-guide.md',
    'verification': 'gate-verification-patterns-guide.md',
    'qg': 'gate-verification-patterns-guide.md',
    'quality': 'gate-verification-patterns-guide.md',
    
    # Analytics
    'analytics': 'analytics-patterns-guide.md',
    'dashboard': 'analytics-patterns-guide.md',
    'reporting': 'analytics-patterns-guide.md',
    'metrics': 'analytics-patterns-guide.md',
    
    # Federation
    'federation': 'federation-patterns-guide.md',
    'partner': 'federation-patterns-guide.md',
    'cross-tenant': 'federation-patterns-guide.md',
    
    # Documentation
    'documentation': 'documentation-patterns-guide.md',
    'docs': 'documentation-patterns-guide.md',
    'changelog': 'documentation-patterns-guide.md',
    
    # Architecture (default)
    'architecture': 'architecture-patterns-guide.md',
    'module': 'architecture-patterns-guide.md',
    'domain': 'architecture-patterns-guide.md',
    'idempotency': 'architecture-patterns-guide.md',
}

# Phase mapping based on verification_gate
PHASE_MAP = {
    'QG-D1': 'discovery',
    'QG-PL1': 'planning',
    'QG-F1': 'foundation',
    'QG-M1': 'solutioning',
    'QG-M2': 'solutioning',
    'QG-M3': 'solutioning',
    'QG-I1': 'integration',
    'QG-I2': 'integration',
    'QG-I3': 'integration',
    'QG-P1': 'production',
    'QG-S': 'solutioning',
    'QG-AI': 'solutioning',
    'none': 'anytime',
}

def get_guide(category):
    """Get consolidated guide for category"""
    for prefix, guide in DOMAIN_MAP.items():
        if category.startswith(prefix) or category == prefix:
            return guide
    # Default based on common categories
    if 'tenant' in category:
        return 'tenant-patterns-guide.md'
    if 'agent' in category or 'ai' in category:
        return 'ai-runtime-patterns-guide.md'
    return 'architecture-patterns-guide.md'

def get_section(pattern_id):
    """Generate section anchor from pattern_id"""
    return pattern_id.replace('_', '-')

def get_phase(gate):
    """Get phase from verification gate"""
    if not gate:
        return 'anytime'
    for prefix, phase in PHASE_MAP.items():
        if gate.startswith(prefix):
            return phase
    return 'solutioning'

def main():
    input_file = sys.argv[1] if len(sys.argv) > 1 else 'src/data/bam-patterns.csv'
    output_file = sys.argv[2] if len(sys.argv) > 2 else input_file
    
    rows = []
    with open(input_file, 'r', newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames + ['consolidated_guide', 'section_anchor', 'phase']
        
        for row in reader:
            row['consolidated_guide'] = get_guide(row.get('category', ''))
            row['section_anchor'] = get_section(row.get('pattern_id', ''))
            row['phase'] = get_phase(row.get('verification_gate', ''))
            rows.append(row)
    
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    
    print(f"Updated {len(rows)} patterns with consolidation columns")

if __name__ == '__main__':
    main()
```

- [ ] **Step 2: Run the script**

Run: `python3 scripts/add-consolidation-columns.py src/data/bam-patterns.csv`
Expected: "Updated 193 patterns with consolidation columns"

- [ ] **Step 3: Verify new columns exist**

Run: `head -1 src/data/bam-patterns.csv`
Expected: Header ending with `...,consolidated_guide,section_anchor,phase`

- [ ] **Step 4: Verify sample rows**

Run: `grep "tenant-isolation" src/data/bam-patterns.csv | head -1`
Expected: Row containing `tenant-patterns-guide.md,tenant-isolation,solutioning`

- [ ] **Step 5: Commit initial script-added columns**

```bash
git add src/data/bam-patterns.csv scripts/add-consolidation-columns.py
git commit -m "feat: add consolidation columns to pattern registry (script-generated)"
```

---

### Task 1.2.1: Manual Verification of Pattern-to-Guide Mappings

> **CRITICAL:** The script uses category prefix matching which may produce incorrect mappings. Every pattern's `consolidated_guide` assignment MUST be manually verified.

**Time estimate:** 4 hours (193 patterns × ~1.25 min each)

- [ ] **Step 1: Export patterns for review**

```bash
# Create review spreadsheet
cut -d',' -f1,3,14,15,16 src/data/bam-patterns.csv > _consolidation/pattern-review.csv
```

- [ ] **Step 2: Manual review checklist for EACH pattern**

For each of the 193 patterns, verify:

| Check | Question | Action if Wrong |
|-------|----------|-----------------|
| Guide Match | Does the pattern's topic fit this guide's scope? | Reassign to correct guide |
| Section Exists | Will this §anchor exist in the consolidated guide? | Verify section will be created |
| Phase Correct | Is this the right implementation phase? | Adjust phase value |
| Category Alignment | Does category make sense for this guide? | Consider if category needs updating |

- [ ] **Step 3: Document corrections in review log**

Create `_consolidation/pattern-mapping-corrections.md`:
```markdown
# Pattern Mapping Corrections

## Patterns Reassigned
| pattern_id | Original Guide | Corrected Guide | Reason |
|------------|----------------|-----------------|--------|

## Phases Corrected
| pattern_id | Original Phase | Corrected Phase | Reason |
|------------|----------------|-----------------|--------|

## Section Anchors Fixed
| pattern_id | Original Anchor | Corrected Anchor | Reason |
|------------|-----------------|------------------|--------|
```

- [ ] **Step 4: Apply corrections to CSV**

Manually edit `src/data/bam-patterns.csv` to fix any incorrect mappings.

- [ ] **Step 5: Commit verified mappings**

```bash
git add src/data/bam-patterns.csv _consolidation/pattern-mapping-corrections.md
git commit -m "fix: manually verify and correct pattern-to-guide mappings"
```

---

### Task 1.3: Create Validation Test for Pattern Registry

**Files:**
- Create: `test/consolidation-columns.test.js`

- [ ] **Step 1: Write the test**

```javascript
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

describe('Pattern Registry Consolidation Columns', () => {
  const csvPath = path.join(__dirname, '../src/data/bam-patterns.csv');
  let patterns;
  
  beforeAll(() => {
    const content = fs.readFileSync(csvPath, 'utf-8');
    patterns = parse(content, { columns: true, skip_empty_lines: true });
  });
  
  test('should have consolidated_guide column', () => {
    expect(patterns[0]).toHaveProperty('consolidated_guide');
  });
  
  test('should have section_anchor column', () => {
    expect(patterns[0]).toHaveProperty('section_anchor');
  });
  
  test('should have phase column', () => {
    expect(patterns[0]).toHaveProperty('phase');
  });
  
  test('all patterns should have consolidated_guide value', () => {
    patterns.forEach(p => {
      expect(p.consolidated_guide).toBeTruthy();
      expect(p.consolidated_guide).toMatch(/\.md$/);
    });
  });
  
  test('all patterns should have section_anchor value', () => {
    patterns.forEach(p => {
      expect(p.section_anchor).toBeTruthy();
    });
  });
  
  test('all patterns should have valid phase', () => {
    const validPhases = ['discovery', 'planning', 'foundation', 'solutioning', 'integration', 'production', 'anytime'];
    patterns.forEach(p => {
      expect(validPhases).toContain(p.phase);
    });
  });
  
  test('tenant patterns should map to tenant-patterns-guide.md', () => {
    const tenantPatterns = patterns.filter(p => p.category.includes('tenant'));
    tenantPatterns.forEach(p => {
      expect(p.consolidated_guide).toBe('tenant-patterns-guide.md');
    });
  });
});
```

- [ ] **Step 2: Run the test**

Run: `npm test -- test/consolidation-columns.test.js`
Expected: All tests pass

- [ ] **Step 3: Commit**

```bash
git add test/consolidation-columns.test.js
git commit -m "test: add consolidation columns validation"
```

---

### Task 1.4: Create Pre-Consolidation Inventory

> **CRITICAL:** Before consolidating any content, create a complete inventory of what exists. This enables post-consolidation verification that NOTHING was lost.

**Time estimate:** 2 hours

- [ ] **Step 1: Create content inventory spreadsheet**

Create `_consolidation/pre-consolidation-inventory.md`:

```markdown
# Pre-Consolidation Inventory

Generated: {date}

## Agent Guides Summary

| Domain | File | Lines | Code Blocks | Tables | Unique Sections |
|--------|------|-------|-------------|--------|-----------------|
| tenant | tenant-isolation.md | 322 | 5 | 3 | 8 |
| tenant | tenant-lifecycle.md | 275 | 3 | 2 | 6 |
| ... | ... | ... | ... | ... | ... |

**Total Files:** ___
**Total Lines:** ___
**Total Code Blocks:** ___
**Total Tables:** ___

## BAM Conventions Found

| Convention | Files Containing | Example |
|------------|------------------|---------|
| `app.current_tenant` | tenant-isolation.md, tenant-context.md, ... | Context key |
| `tenant:{id}:{ns}:{key}` | caching-strategy.md, ... | Cache key pattern |
| `tenants/{id}/{cat}/{file}` | file-storage.md, ... | File path pattern |
| `X-Tenant-ID` | authentication.md, ... | Header |
| `X-Correlation-ID` | distributed-tracing.md, ... | Header |

## Workflows Summary

| Category | Count | Files |
|----------|-------|-------|
| tenant-* | ___ | (list) |
| ai-* | ___ | (list) |
| ... | ... | ... |

**Total Workflows:** 186
```

- [ ] **Step 2: Populate inventory by reading each file**

For each of the 233 agent guides:
1. Read the file
2. Count lines, code blocks, tables
3. Identify unique section headers
4. Note any BAM conventions present

- [ ] **Step 3: Commit inventory**

```bash
git add _consolidation/pre-consolidation-inventory.md
git commit -m "docs: create pre-consolidation inventory for verification"
```

---

### Task 1.5: Extract BAM Conventions Checklist

> **CRITICAL:** Extract ALL BAM conventions from CLAUDE.md into a checklist. Every convention MUST be preserved in consolidated guides.

**Time estimate:** 1 hour

- [ ] **Step 1: Read CLAUDE.md and extract conventions**

From CLAUDE.md, extract all naming patterns, formats, and standards:

Create `_consolidation/bam-conventions-checklist.md`:

```markdown
# BAM Conventions Preservation Checklist

Use this checklist after creating EACH consolidated guide to verify all BAM conventions are preserved.

## Context Keys
- [ ] `app.current_tenant` - Tenant context storage
- [ ] `app.tenant_tier` - Subscription tier
- [ ] `app.tenant_config` - Tenant configuration

## Cache Key Patterns
- [ ] `tenant:{tenant_id}:{namespace}:{key}` - Standard cache key format
- [ ] Examples: `tenant:abc123:cache:user_profile`, `tenant:abc123:query:orders_page_1`

## File Path Patterns
- [ ] `tenants/{tenant_id}/{category}/{filename}` - S3/file storage path
- [ ] Examples: `tenants/abc123/uploads/`, `tenants/abc123/exports/`

## Headers
- [ ] `X-Tenant-ID` - Tenant identifier header
- [ ] `X-User-ID` - User identifier header
- [ ] `X-Correlation-ID` - Request correlation header
- [ ] `X-Request-Source` - Origin service header

## Secret Naming
- [ ] `{tenant_id}/{service}/{secret_type}/{name}` - Vault secret path

## Permission Format
- [ ] `{domain}:{resource}:{action}` - Permission string format

## Metric Naming
- [ ] `{service}_{component}_{metric}_{unit}` - Prometheus metric format
- [ ] Labels: `tenant_id`, `environment`, `region`

## Log Format
- [ ] Structured JSON with: timestamp, level, message, tenant_id, user_id, correlation_id

## Verification per Guide
After creating each domain guide, verify:
- [ ] All applicable conventions appear in ## BAM Conventions section
- [ ] Examples use correct placeholder formats
- [ ] No typos in convention patterns
```

- [ ] **Step 2: Commit checklist**

```bash
git add _consolidation/bam-conventions-checklist.md
git commit -m "docs: extract BAM conventions checklist for preservation verification"
```

---

## Phase 2: Domain Guide Creation (Manual Consolidation Approach)

> **CRITICAL METHODOLOGY:** This phase uses MANUAL file-by-file analysis, NOT automated extraction scripts. Each source file is read by a human/agent, analyzed using the File Analysis Template (Task 2.5.2), quality variance is assessed, and the best content is selected using Consolidation Rules (Task 2.5.3). This ensures no valuable content is lost and duplicates are intelligently merged rather than mechanically concatenated.

**Phase 2 Time Estimate:** 35 hours (manual analysis + guide creation for 25 domains)

### Task 2.1: Create Domain Guide Template

**Files:**
- Create: `templates/domain-guide-template.md`

- [ ] **Step 1: Write the template**

```markdown
# BAM {Domain} Patterns Guide

**When to load:** {When this guide should be loaded}
**Integrates with:** {Which agents use this guide}

---

## Core Concepts

{High-level explanation of this domain}

### Key Principles

| Principle | Description |
|-----------|-------------|
| {Principle 1} | {Description} |
| {Principle 2} | {Description} |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and MUST be followed exactly.

### {Convention Category 1}

| Item | Format | Example |
|------|--------|---------|
| {Item} | {Format} | {Example} |

### {Convention Category 2}

```
Pattern: {pattern}
Examples:
- {example 1}
- {example 2}
```

---

## Decision Framework

### Quick Decision Matrix

| Situation | Recommendation | Confidence |
|-----------|---------------|------------|
| {Situation 1} | {Recommendation} | High/Medium/Low |

### Decision Tree

```
START: {Initial Question}
│
├─► {Answer A}
│   └─► {Recommendation A}
│
└─► {Answer B}
    └─► {Recommendation B}
```

---

## §{pattern-1-anchor}

### Pattern: {Pattern Name}

**When to use:** {decision_criteria from registry}
**Variants:** {variants from registry}

#### Pattern Structure

```{language}
{Code pattern with {placeholders}}
```

#### Placeholders

| Placeholder | Replace With | Example |
|-------------|--------------|---------|
| `{placeholder}` | {Description} | {Example} |

#### Web Research

For current implementation details, search:
- "{web_query_1} {date}"
- "{web_query_2} {date}"

---

## Quality Gates

| Gate | Checks | Related Patterns |
|------|--------|------------------|
| {QG-ID} | {Key checks} | {pattern_ids} |

---

## Web Research

| Topic | Query |
|-------|-------|
| {Topic 1} | "{query} {date}" |
| {Topic 2} | "{query} {date}" |

---

## Related Patterns

- `{related-guide-1}.md` §{section}
- `{related-guide-2}.md` §{section}

Load from registry:
- `bam-patterns.csv` → filter: `{category}-*`

---

## Related Workflows

- `bmad-bam-{workflow}` - {When to use}
```

- [ ] **Step 2: Commit**

```bash
git add templates/domain-guide-template.md
git commit -m "chore: add domain guide template"
```

---

### Task 2.2: Create Tenant Patterns Domain Guide

**Files:**
- Create: `src/data/agent-guides/bam/tenant-patterns-guide.md`
- Read: `src/data/agent-guides/bam/tenant-isolation.md` (for manual analysis)

- [ ] **Step 1: Create the consolidated guide**

```markdown
# BAM Tenant Patterns Guide

**When to load:** During any tenant-related design, implementation, or validation work. Triggered by keywords: tenant, multi-tenant, isolation, RLS, schema isolation, tenant lifecycle.
**Integrates with:** Architect (Winston/Atlas), Dev (James), Security agents

---

## Core Concepts

Multi-tenant isolation ensures each tenant's data, operations, and resources are completely separated from other tenants, even when sharing infrastructure.

### The 8 Dimensions of Tenant Isolation

| Dimension | What to Isolate | Strategy |
|-----------|-----------------|----------|
| **Database** | Rows, schemas, databases | RLS, schema-per-tenant, database-per-tenant |
| **Cache** | Cached values | Key prefix `tenant:{id}:...` |
| **Memory** | Agent memory/context | Scope tags (session/user/tenant/global) |
| **Tools** | Available tools per tenant | Permission middleware |
| **Jobs** | Background job execution | Context serialization |
| **Vectors** | Embeddings and indexes | Namespace filtering |
| **Logs** | Log entries and traces | Field injection |
| **Files** | Stored files and assets | Path prefix `tenants/{id}/...` |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and MUST be followed exactly.

### PostgreSQL Context Keys

| Key | Purpose | Type |
|-----|---------|------|
| `app.current_tenant` | Current tenant UUID | uuid |
| `app.is_admin` | Admin bypass flag | boolean |
| `app.tenant_tier` | Subscription tier | text |

### Cache Key Format

```
Pattern: tenant:{tenant_id}:{namespace}:{key}

Examples:
- tenant:abc123:cache:user_profile
- tenant:abc123:session:token_xyz
- tenant:abc123:rate_limit:api_calls
```

### File Storage Paths

```
Pattern: tenants/{tenant_id}/{category}/{filename}

Examples:
- tenants/abc123/uploads/document.pdf
- tenants/abc123/exports/report.csv
- tenants/abc123/avatars/user_123.png
```

### Memory Scope Tags

| Scope | Lifetime | Isolation |
|-------|----------|-----------|
| `session` | Request | Per-request |
| `user` | Session | Per-user |
| `tenant` | Persistent | Per-tenant |
| `global` | Persistent | Shared |

### Queue Naming

```
Pattern: {module}.{event_type}.tenant.{tenant_id}

Examples:
- billing.invoice.tenant.abc123
- agent.run_complete.tenant.abc123
```

### Message Headers (Required)

| Header | Description |
|--------|-------------|
| `X-Tenant-ID` | Tenant identifier |
| `X-Correlation-ID` | Request tracing ID |
| `X-User-ID` | Originating user |
| `X-Timestamp` | Message timestamp |

---

## Decision Framework

### Quick Decision Matrix

| Situation | Recommended Model | Confidence |
|-----------|-------------------|------------|
| <100 tenants, startup | RLS | High |
| 100-1000 tenants, standard SaaS | RLS | High |
| Regulated industry (finance, health) | Schema-per-tenant | High |
| Enterprise with compliance requirements | Database-per-tenant | High |
| Mixed tiers (free + enterprise) | Hybrid | Medium |

### Decision Tree

```
START: How many tenants?
│
├─► <1000 tenants
│   │
│   └─► Regulated industry?
│       ├─► YES → Schema-per-tenant
│       └─► NO → RLS (recommended)
│
├─► 1000-10000 tenants
│   │
│   └─► Need schema-level customization?
│       ├─► YES → Schema-per-tenant
│       └─► NO → RLS with sharding
│
└─► >10000 tenants
    │
    └─► Enterprise tier?
        ├─► YES → Database-per-tenant
        └─► NO → RLS with sharding + caching
```

### Trade-off Analysis

| Factor | RLS | Schema | Database |
|--------|-----|--------|----------|
| Setup complexity | Low | Medium | High |
| Operational cost | Low | Medium | High |
| Isolation strength | Medium | High | Maximum |
| Query performance | Good | Good | Best |
| Backup granularity | Tenant-filtered | Per-schema | Per-database |

---

## §tenant-isolation

### Pattern: Tenant Isolation (RLS)

**When to use:** <1000 tenants AND shared-tables AND cost-efficient
**Variants:** row-level-security, schema-per-tenant, database-per-tenant

#### RLS Policy Pattern

```sql
-- BAM Standard RLS Pattern
-- Placeholders: {table}, {tenant_column}
-- Convention: Uses app.current_tenant

ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;
ALTER TABLE {table} FORCE ROW LEVEL SECURITY;

-- Primary isolation policy
CREATE POLICY tenant_isolation ON {table}
  USING ({tenant_column} = current_setting('app.current_tenant')::uuid);

-- Fail-safe: require context to be set
CREATE POLICY require_context ON {table}
  USING (current_setting('app.current_tenant', true) IS NOT NULL);
```

#### Admin Bypass Pattern

```sql
-- BAM Admin Bypass Pattern (always audit)
CREATE POLICY admin_bypass ON {table}
  FOR ALL
  USING (current_setting('app.is_admin', true)::boolean = true)
  WITH CHECK (current_setting('app.is_admin', true)::boolean = true);
```

#### Placeholders

| Placeholder | Replace With | Example |
|-------------|--------------|---------|
| `{table}` | Your table name | `orders` |
| `{tenant_column}` | Tenant FK column | `tenant_id` |

#### Web Research

For current implementation details, search:
- "PostgreSQL RLS multi-tenant best practices {date}"
- "row level security performance optimization {date}"

---

## §tenant-routing

### Pattern: Tenant Routing

**When to use:** Request routing to tenant context
**Variants:** header-based, subdomain-based, path-based, token-based

#### Context Setting Pattern

```typescript
// Set context at request boundary
// Convention: Always use SET LOCAL (transaction-scoped)
await db.query("SET LOCAL app.current_tenant = $1", [ctx.tenantId]);

// NEVER use SET (session-scoped) - security risk
```

#### Middleware Pattern

```typescript
// Tenant context middleware
async function tenantMiddleware(req, res, next) {
  const tenantId = extractTenantId(req); // from header/subdomain/token
  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant context required' });
  }
  req.tenantContext = { tenantId };
  next();
}
```

#### Web Research

For current implementation details, search:
- "multi-tenant request routing patterns {date}"
- "tenant context middleware {date}"

---

## §tenant-context-propagation

### Pattern: Context Propagation

**When to use:** Context flow through services, async boundaries
**Variants:** thread-local, async-context, correlation-id, baggage

#### Async Context Pattern

```typescript
// Propagate across async boundaries
const asyncHooks = require('async_hooks');

class TenantContext {
  private static storage = new AsyncLocalStorage<TenantContextData>();
  
  static run<T>(context: TenantContextData, fn: () => T): T {
    return this.storage.run(context, fn);
  }
  
  static get(): TenantContextData | undefined {
    return this.storage.getStore();
  }
}
```

#### Web Research

For current implementation details, search:
- "tenant context propagation async {date}"
- "AsyncLocalStorage multi-tenant {date}"

---

## §tenant-lifecycle

### Pattern: Tenant Lifecycle

**When to use:** Manage tenant state changes (onboarding, offboarding)
**Variants:** self-service, assisted, enterprise

#### Lifecycle States

| State | Description | Actions |
|-------|-------------|---------|
| `pending` | Signup initiated | Validate, provision |
| `provisioning` | Resources being created | Create schema, seed data |
| `active` | Fully operational | Normal operations |
| `suspended` | Temporarily disabled | Block access, preserve data |
| `offboarding` | Deletion initiated | Export data, archive |
| `deleted` | Soft delete completed | Purge after retention |

#### Onboarding Checklist

- [ ] Create tenant record in `tenants` table
- [ ] Provision database resources (RLS policies or schema)
- [ ] Create storage prefix `tenants/{tenant_id}/`
- [ ] Initialize cache namespace
- [ ] Create default admin user
- [ ] Send welcome notification
- [ ] Log onboarding event for audit

#### Web Research

For current implementation details, search:
- "tenant onboarding automation SaaS {date}"
- "tenant provisioning patterns {date}"

---

## §file-storage

### Pattern: Tenant File Storage

**When to use:** Tenant-scoped file storage with isolation
**Variants:** bucket-per-tenant, prefix-isolation, metadata-tagging

#### S3 Path Strategy

```
s3://platform-bucket/
  └── tenants/
      ├── {tenant_id_1}/
      │   ├── uploads/
      │   ├── exports/
      │   └── agent-outputs/
      └── {tenant_id_n}/
          └── ...
```

#### Presigned URL Pattern

```typescript
// Always validate tenant ownership before generating URL
async function getPresignedUrl(tenantId: string, key: string): Promise<string> {
  if (!key.startsWith(`tenants/${tenantId}/`)) {
    throw new Error('Access denied: tenant mismatch');
  }
  return s3.getSignedUrl('getObject', {
    Bucket: BUCKET,
    Key: key,
    Expires: 300 // 5 minutes
  });
}
```

#### Web Research

For current implementation details, search:
- "tenant isolated file storage S3 {date}"
- "multi-tenant blob storage patterns {date}"

---

## §caching-strategy

### Pattern: Tenant Cache Isolation

**When to use:** Per-tenant cache isolation with quotas
**Variants:** key-prefix, separate-instance, quota-based

#### Redis Key Strategy

```
# All keys MUST follow this pattern
tenant:{tenant_id}:{namespace}:{key}

# Examples
tenant:abc123:cache:user_profile
tenant:abc123:query:orders_page_1
tenant:abc123:session:token_xyz
```

#### Eviction by Tenant

```bash
# Evict all cache for a single tenant
redis-cli --scan --pattern "tenant:abc123:*" | xargs redis-cli del
```

#### Web Research

For current implementation details, search:
- "Redis multi-tenant key isolation {date}"
- "tenant cache eviction patterns {date}"

---

## Quality Gates

| Gate | Checks | Related Patterns |
|------|--------|------------------|
| QG-M2 | RLS enabled, context propagation, cross-tenant prevention | tenant-isolation, tenant-routing |
| QG-I2 | Tenant safety verification | testing-isolation |
| QG-P1 | Production tenant isolation | All tenant patterns |

---

## Web Research

| Topic | Query |
|-------|-------|
| RLS Implementation | "PostgreSQL RLS multi-tenant best practices {date}" |
| Context Propagation | "tenant context async propagation {date}" |
| Cache Isolation | "Redis multi-tenant isolation patterns {date}" |
| File Storage | "S3 multi-tenant prefix isolation {date}" |
| Performance | "multi-tenant noisy neighbor prevention {date}" |

---

## Related Patterns

- `security-patterns-guide.md` §rbac - Role-based access within tenant
- `ai-runtime-patterns-guide.md` §memory-tiers - Tenant-scoped memory
- `observability-patterns-guide.md` §distributed-tracing - Tenant context in traces

Load from registry:
- `bam-patterns.csv` → filter: category contains `tenant`
- `bam-patterns.csv` → filter: pattern_id starts with `tenant-`

---

## Related Workflows

- `bmad-bam-tenant-setup` - Full tenant isolation implementation
- `bmad-bam-validate-foundation` - Validate QG-M2 tenant isolation
- `bmad-bam-tenant-onboarding` - Tenant provisioning workflow
- `bmad-bam-tenant-offboarding` - Tenant deprovisioning workflow
```

- [ ] **Step 2: Verify guide has all required sections**

Run: `grep -c "^## " src/data/agent-guides/bam/tenant-patterns-guide.md`
Expected: At least 8 sections (Core Concepts, BAM Conventions, Decision Framework, patterns, Quality Gates, Web Research, Related Patterns, Related Workflows)

- [ ] **Step 3: Verify BAM conventions are present**

Run: `grep "app.current_tenant" src/data/agent-guides/bam/tenant-patterns-guide.md`
Expected: Multiple matches (context key convention preserved)

- [ ] **Step 4: Commit**

```bash
git add src/data/agent-guides/bam/tenant-patterns-guide.md
git commit -m "feat: create tenant-patterns-guide.md (consolidation POC)"
```

---

### Task 2.3: Validate Tenant Guide Structure

**Files:**
- Create: `test/domain-guide-structure.test.js`

- [ ] **Step 1: Write the structure test**

```javascript
const fs = require('fs');
const path = require('path');

describe('Domain Guide Structure', () => {
  const guidePath = path.join(__dirname, '../src/data/agent-guides/bam/tenant-patterns-guide.md');
  let content;
  
  beforeAll(() => {
    content = fs.readFileSync(guidePath, 'utf-8');
  });
  
  test('should have When to load header', () => {
    expect(content).toMatch(/\*\*When to load:\*\*/);
  });
  
  test('should have Integrates with header', () => {
    expect(content).toMatch(/\*\*Integrates with:\*\*/);
  });
  
  test('should have Core Concepts section', () => {
    expect(content).toMatch(/## Core Concepts/);
  });
  
  test('should have BAM Conventions section', () => {
    expect(content).toMatch(/## BAM Conventions/);
  });
  
  test('should have Decision Framework section', () => {
    expect(content).toMatch(/## Decision Framework/);
  });
  
  test('should have Quality Gates section', () => {
    expect(content).toMatch(/## Quality Gates/);
  });
  
  test('should have Web Research section', () => {
    expect(content).toMatch(/## Web Research/);
  });
  
  test('should have Related Patterns section', () => {
    expect(content).toMatch(/## Related Patterns/);
  });
  
  test('should have Related Workflows section', () => {
    expect(content).toMatch(/## Related Workflows/);
  });
  
  test('should preserve app.current_tenant convention', () => {
    expect(content).toMatch(/app\.current_tenant/);
  });
  
  test('should preserve cache key format', () => {
    expect(content).toMatch(/tenant:\{tenant_id\}:\{namespace\}:\{key\}/);
  });
  
  test('should preserve file path pattern', () => {
    expect(content).toMatch(/tenants\/\{tenant_id\}\/\{category\}\/\{filename\}/);
  });
  
  test('should have section anchors (§)', () => {
    expect(content).toMatch(/## §tenant-isolation/);
  });
  
  test('should have web queries with {date} placeholder', () => {
    expect(content).toMatch(/\{date\}/);
  });
});
```

- [ ] **Step 2: Run the test**

Run: `npm test -- test/domain-guide-structure.test.js`
Expected: All tests pass

- [ ] **Step 3: Commit**

```bash
git add test/domain-guide-structure.test.js
git commit -m "test: add domain guide structure validation"
```

---

### Task 2.4: Update Pattern Registry for Tenant Patterns

**Files:**
- Modify: `src/data/bam-patterns.csv`

- [ ] **Step 1: Verify tenant patterns point to new guide**

Run: `grep "tenant" src/data/bam-patterns.csv | grep "tenant-patterns-guide.md" | wc -l`
Expected: 10+ (all tenant-related patterns)

- [ ] **Step 2: Fix any missing mappings manually if needed**

If any tenant patterns don't map correctly, edit the CSV:

```csv
tenant-isolation,...,tenant-patterns-guide.md,tenant-isolation,solutioning
tenant-routing,...,tenant-patterns-guide.md,tenant-routing,solutioning
tenant-context-propagation,...,tenant-patterns-guide.md,tenant-context-propagation,solutioning
tenant-lifecycle,...,tenant-patterns-guide.md,tenant-lifecycle,production
```

- [ ] **Step 3: Commit**

```bash
git add src/data/bam-patterns.csv
git commit -m "fix: ensure tenant patterns map to consolidated guide"
```

---

## Phase 2 Continued: Create Remaining Domain Guides

### Task 2.5: Create AI Runtime Patterns Guide

**Files:**
- Create: `src/data/agent-guides/bam/ai-runtime-patterns-guide.md`

- [ ] **Step 1: Create the guide following the template**

Extract content from:
- `agent-runtime.md`
- `agent-runtime-patterns.md`
- `agent-coordination.md`
- `memory-tiers.md`
- `run-contracts.md`
- `tool-execution.md`

Key sections to include:
- §agent-runtime - Core execution patterns
- §memory-tiers - 5-tier memory hierarchy
- §tool-execution - Tool governance
- §run-contracts - Budget enforcement
- §agent-coordination - Multi-agent patterns
- §agent-negotiation - Conflict resolution

- [ ] **Step 2: Verify structure**

Run: `grep "## §" src/data/agent-guides/bam/ai-runtime-patterns-guide.md | wc -l`
Expected: 6+ section anchors

- [ ] **Step 3: Commit**

```bash
git add src/data/agent-guides/bam/ai-runtime-patterns-guide.md
git commit -m "feat: create ai-runtime-patterns-guide.md"
```

---

### Task 2.5.1: Manual Domain-to-Files Mapping

> **CRITICAL:** Manual consolidation approach - NO extraction scripts. Read each file, analyze quality variance, preserve richer content, eliminate duplicates through human judgment.

**Time estimate:** 35 hours total for Phase 2 (manual analysis + guide creation)

#### Master Domain-to-Files Mapping Table

| Domain Guide | Source Files | Est. Time |
|--------------|--------------|-----------|
| `tenant-patterns-guide.md` | `tenant-isolation.md`, `tenant-lifecycle.md`, `tenant-lifecycle-patterns.md`, `tenant-onboarding-patterns.md`, `tenant-routing.md`, `tenant-context.md` | 2h |
| `ai-runtime-patterns-guide.md` | `agent-runtime.md`, `agent-runtime-patterns.md`, `agent-coordination.md`, `memory-tiers.md`, `run-contracts.md`, `tool-execution.md`, `agent-negotiation.md`, `agent-delegation.md` | 2.5h |
| `security-patterns-guide.md` | `all-security-patterns.md`, `rbac-patterns.md`, `abac-patterns.md`, `zero-trust-patterns.md`, `secrets-management.md`, `authentication.md` | 2h |
| `observability-patterns-guide.md` | `observability-patterns.md`, `distributed-tracing.md`, `log-aggregation.md`, `apm-integration.md`, `monitoring-patterns.md`, `alerting-patterns.md` | 1.5h |
| `reliability-patterns-guide.md` | `circuit-breaker.md`, `retry-policies.md`, `disaster-recovery.md`, `resilience-patterns.md`, `fallback-patterns.md`, `bulkhead-patterns.md` | 1.5h |
| `governance-patterns-guide.md` | `compliance-patterns.md`, `governance.md`, `audit-logging.md`, `data-residency.md`, `policy-enforcement.md` | 1.5h |
| `integration-patterns-guide.md` | `event-driven.md`, `saga-orchestration.md`, `facade-contracts.md`, `webhook-delivery.md`, `api-versioning.md`, `a2a-protocol.md` | 1.5h |
| `cost-patterns-guide.md` | `cost-tracking.md`, `usage-metering.md`, `llm-cost-tracking.md`, `billing-integration.md`, `quota-management.md` | 1h |
| `state-patterns-guide.md` | `caching-strategy.md`, `session-management.md`, `event-sourcing.md`, `cqrs-patterns.md`, `checkpoint-patterns.md` | 1.5h |
| `discovery-patterns-guide.md` | `discovery-patterns.md`, `requirements-patterns.md`, `planning-patterns.md`, `triage-patterns.md` | 1h |
| `testing-patterns-guide.md` | `testing-isolation.md`, `testing-agent-safety.md`, `ai-testing.md`, `integration-testing.md`, `contract-testing.md` | 1.5h |
| `operations-patterns-guide.md` | `deployment-patterns.md`, `devops-patterns.md`, `sre-patterns.md`, `sla-patterns.md`, `incident-response.md`, `runbook-patterns.md` | 1.5h |
| `scaling-patterns-guide.md` | `auto-scaling.md`, `capacity-patterns.md`, `performance-patterns.md`, `rate-limiting.md`, `load-balancing.md` | 1h |
| `ai-lifecycle-patterns-guide.md` | `model-fine-tuning.md`, `model-deployment.md`, `model-versioning.md`, `prompt-catalog.md`, `model-registry.md` | 1.5h |
| `ai-safety-patterns-guide.md` | `ai-safety-patterns.md`, `guardrails.md`, `kill-switch.md`, `grounding-patterns.md`, `prg-gate.md` | 1.5h |
| `ai-observability-patterns-guide.md` | `llm-observability.md`, `rag-observability.md`, `embedding-observability.md`, `token-tracking.md`, `inference-metrics.md` | 1h |
| `runtime-loops-patterns-guide.md` | `request-loop.md`, `control-loop.md`, `learning-loop.md`, `economic-loop.md`, `feedback-loop.md` | 1h |
| `mcp-patterns-guide.md` | `mcp-server-isolation.md`, `mcp-client-patterns.md`, `tool-schema-validation.md`, `mcp-federation.md`, `tool-permission.md` | 1.5h |
| `data-patterns-guide.md` | `connection-pooling.md`, `query-routing.md`, `migration-per-tenant.md`, `database-patterns.md`, `data-lifecycle.md` | 1.5h |
| `rag-patterns-guide.md` | `rag-retrieval.md`, `rag-generation.md`, `embedding-management.md`, `vector-store.md`, `chunking-patterns.md`, `reranking.md` | 1.5h |
| `architecture-patterns-guide.md` | `module-boundaries.md`, `idempotency.md`, `cache-aside.md`, `architecture-decision.md`, `domain-modeling.md` | 1.5h |
| `analytics-patterns-guide.md` | `analytics-patterns.md`, `dashboard-patterns.md`, `reporting-patterns.md`, `health-scoring.md`, `metrics-aggregation.md` | 1h |
| `gate-verification-patterns-guide.md` | `qg-foundation.md`, `qg-module.md`, `qg-integration.md`, `qg-production.md`, `qg-security.md`, `qg-ai.md` | 1.5h |
| `federation-patterns-guide.md` | `federation-a2a.md`, `partner-ecosystem.md`, `cross-tenant.md`, `federated-identity.md` | 1h |
| `documentation-patterns-guide.md` | `documentation-patterns.md`, `api-design.md`, `api-documentation.md`, `changelog-patterns.md` | 1h |

---

### Task 2.5.2: File Analysis Template

**For each source file, complete this 5-question analysis:**

```markdown
## File Analysis: {filename}

### 1. Line Count & Structure
- Total lines: ___
- Code blocks: ___ lines
- Tables: ___ 
- Section headers (##): ___

### 2. Unique Content Assessment
- [ ] Contains unique patterns not in other files?
- [ ] Has deeper implementation detail than similar files?
- [ ] Includes unique BAM conventions (app.current_tenant, cache keys, paths)?
- Unique sections: ___

### 3. Overlap Detection
- Overlaps with: {list other files with similar content}
- Overlap %: ___
- Which version is richer? {this file / other file}

### 4. Quality Assessment
- [ ] Has complete decision framework (table/flowchart)?
- [ ] Has code examples with BAM conventions?
- [ ] Has web research queries with {date}?
- [ ] Has quality gate references?
- Quality score: {1-5}

### 5. Consolidation Decision
- Action: {KEEP_FULL | KEEP_PARTIAL | MERGE_WITH | DISCARD_DUPLICATE}
- If MERGE_WITH, take what from this file: ___
- If KEEP_PARTIAL, which sections: ___
```

---

### Task 2.5.3: Consolidation Rules

**When content overlaps between files, apply these rules:**

| Situation | Rule | Example |
|-----------|------|---------|
| **Same topic, different detail** | Keep the richer version | `tenant-onboarding-patterns.md` has 6-step checklist vs `tenant-lifecycle.md` has 3-step → Keep 6-step |
| **Complementary content** | Merge under section anchors | `tenant-isolation.md` §dimensions + `tenant-lifecycle.md` §states → Both kept |
| **Exact duplicate sections** | Keep from primary file only | If same table appears in 2 files → Keep in designated primary |
| **Conflicting patterns** | Prefer pattern with decision criteria | Pattern with when-to-use table beats bare description |
| **Code examples** | Keep all unique, consolidate duplicates | Same RLS code in 3 files → Keep once with §section-anchor |
| **BAM conventions** | Must appear in consolidated guide | Never lose `app.current_tenant`, cache key, file path patterns |

---

### Task 2.5.4: Per-Domain Manual Consolidation Steps

**For each domain, follow this exact sequence:**

- [ ] **Step 1: Read all source files**
Complete File Analysis Template (Task 2.5.2) for each source file

- [ ] **Step 2: Create Consolidation Map**
```markdown
## {Domain} Consolidation Map

### Files Analyzed
| File | Lines | Quality | Decision |
|------|-------|---------|----------|

### Content Disposition
| Section/Pattern | Source File | Action | Target §Section |
|-----------------|-------------|--------|-----------------|

### Unique Content to Preserve
- From {file1}: {what}
- From {file2}: {what}

### Duplicates to Eliminate
- {content} appears in: {file1, file2} → Keep in: {file1}
```

- [ ] **Step 3: Write consolidated guide**
Follow domain guide template, placing content under §section-anchors

- [ ] **Step 4: Verify completeness**
Run verification checklist (Task 2.5.5)

- [ ] **Step 5: Commit domain guide**
```bash
git add src/data/agent-guides/bam/{domain}-patterns-guide.md
git commit -m "feat: create {domain}-patterns-guide.md (manual consolidation)"
```

---

### Task 2.5.5: Domain Guide Verification Checklist

**Run after creating each domain guide:**

- [ ] **Structure verification**
```bash
# Verify required sections exist
grep -E "^## (Core Concepts|BAM Conventions|Decision Framework|Quality Gates|Web Research|Related)" {guide}.md | wc -l
# Expected: 6+
```

- [ ] **BAM conventions preserved**
```bash
# For tenant-related guides
grep -c "app.current_tenant" {guide}.md  # Should be > 0 for tenant domain

# For cache-related content  
grep -c "tenant:{tenant_id}:{namespace}:{key}" {guide}.md

# For file storage content
grep -c "tenants/{tenant_id}/{category}/{filename}" {guide}.md
```

- [ ] **Section anchors present**
```bash
grep -c "^## §" {guide}.md  # Should match expected pattern count
```

- [ ] **Web research queries have {date}**
```bash
grep -c "{date}" {guide}.md  # Should be > 0
```

- [ ] **Quality gates referenced**
```bash
grep -E "QG-(F1|M1|M2|M3|I1|I2|I3|P1)" {guide}.md | head -5
```

- [ ] **Line count reduction verified**
```bash
# Compare input lines vs output lines
wc -l src/data/agent-guides/bam/{source1}.md {source2}.md ... | tail -1  # Total input
wc -l src/data/agent-guides/bam/{domain}-patterns-guide.md  # Output
# Target: Output should be 60-80% of input (20-40% reduction from dedup)
```

---

### Task 2.6: Create Security Patterns Guide

> **Use Manual Consolidation Approach:** Follow Tasks 2.5.2-2.5.5 for this domain.

**Files:**
- Create: `src/data/agent-guides/bam/security-patterns-guide.md`
- Read (source files for manual analysis):
  - `all-security-patterns.md`
  - `rbac-patterns.md`
  - `abac-patterns.md`
  - `zero-trust-patterns.md`
  - `secrets-management.md`
  - `authentication.md`

- [ ] **Step 1: Complete File Analysis Template for each source file**

- [ ] **Step 2: Create Consolidation Map (see Task 2.5.4)**

- [ ] **Step 3: Create the guide based on manual analysis**

```markdown
# BAM Security Patterns Guide

**When to load:** During any security-related design, authentication, authorization, or secrets management work.
**Integrates with:** All agents - security is cross-cutting

---

## Core Concepts

Security in multi-tenant AI platforms requires defense in depth: authentication verifies identity, authorization controls access, isolation prevents cross-tenant contamination, and encryption protects data at rest and in transit.

### Security Layers

| Layer | Purpose | Patterns |
|-------|---------|----------|
| **Identity** | Who is accessing | SSO, MFA, API keys |
| **Authorization** | What can they do | RBAC, ABAC, policies |
| **Isolation** | Tenant separation | RLS, namespacing |
| **Encryption** | Data protection | TLS, at-rest, field-level |
| **Audit** | What happened | Logging, compliance |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and MUST be followed exactly.

### Security Context Headers

| Header | Purpose | Required |
|--------|---------|----------|
| `X-Tenant-ID` | Tenant identifier | Always |
| `X-User-ID` | User identifier | Always |
| `X-Correlation-ID` | Request tracing | Always |
| `X-Request-Source` | Origin service | Internal calls |

### Secret Naming

```
Pattern: {tenant_id}/{service}/{secret_type}/{name}
Examples:
- abc123/api/key/openai_api_key
- abc123/db/credential/postgres_password
- GLOBAL/shared/cert/tls_certificate
```

### Permission Format

```
Pattern: {domain}:{resource}:{action}
Examples:
- tenant:settings:read
- agent:run:execute
- billing:invoice:create
```

---

## Decision Framework

### Authentication Method Selection

| Scenario | Recommended | Confidence |
|----------|-------------|------------|
| B2B SaaS | SSO (SAML/OIDC) | High |
| API-first | API Keys + JWT | High |
| Consumer app | Social + MFA | High |
| Internal tools | SSO only | High |
| Mixed (B2B + API) | SSO + API Keys | Medium |

### Authorization Model Decision

```
START: How complex are permissions?
│
├─► Simple (read/write/admin)
│   └─► RBAC (Role-Based)
│
├─► Attribute-based (department, project, time)
│   └─► ABAC (Attribute-Based)
│
└─► Hierarchical + context-dependent
    └─► ABAC + Policy Engine (OPA/Cedar)
```

---

## §rbac

### Pattern: Role-Based Access Control

**When to use:** <10 distinct permission sets AND static role assignments
**Variants:** flat-rbac, hierarchical-rbac, constrained-rbac

#### Role Definition

```typescript
// BAM Standard Role Structure
interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  inherits?: string[]; // For hierarchical RBAC
  tenant_id: string;   // Tenant-scoped roles
}

interface Permission {
  resource: string;    // e.g., 'agent', 'tenant', 'billing'
  actions: string[];   // e.g., ['read', 'write', 'delete']
  conditions?: object; // Optional ABAC-like conditions
}
```

#### Enforcement Pattern

```typescript
async function checkPermission(
  user: User, 
  resource: string, 
  action: string
): Promise<boolean> {
  const roles = await getUserRoles(user.id, user.tenant_id);
  for (const role of roles) {
    if (hasPermission(role, resource, action)) {
      return true;
    }
  }
  return false;
}
```

#### Web Research

For current implementation details, search:
- "RBAC implementation best practices {date}"
- "role permission database schema {date}"

---

## §abac

### Pattern: Attribute-Based Access Control

**When to use:** Dynamic permissions based on context/attributes
**Variants:** policy-engine, inline-evaluation, hybrid

#### Policy Definition (OPA/Rego)

```rego
# BAM ABAC Policy Example
package bam.authz

default allow = false

allow {
    input.user.tenant_id == input.resource.tenant_id
    input.user.role == "admin"
}

allow {
    input.user.tenant_id == input.resource.tenant_id
    input.user.department == input.resource.department
    input.action == "read"
}
```

#### Web Research

For current implementation details, search:
- "OPA policy best practices {date}"
- "ABAC vs RBAC when to use {date}"

---

## §zero-trust

### Pattern: Zero Trust Architecture

**When to use:** High-security environments, regulated industries
**Variants:** full-zero-trust, perimeter-plus-zero-trust, progressive

#### Zero Trust Principles

| Principle | Implementation |
|-----------|----------------|
| Never trust | Authenticate every request |
| Always verify | Continuous authorization |
| Least privilege | Minimal permissions |
| Assume breach | Segment and isolate |

#### mTLS Pattern

```yaml
# BAM mTLS Configuration
tls:
  mode: STRICT
  client_certificate:
    required: true
    ca_cert: /certs/ca.pem
  verify_client: REQUIRE_AND_VERIFY_CLIENT_CERT
```

#### Web Research

For current implementation details, search:
- "zero trust architecture implementation {date}"
- "mTLS service mesh {date}"

---

## §secrets-management

### Pattern: Secrets Management

**When to use:** Any credential, key, or sensitive configuration
**Variants:** vault-based, cloud-native, hybrid

#### Secret Retrieval Pattern

```typescript
// BAM Secret Retrieval (tenant-aware)
async function getSecret(
  tenantId: string,
  secretPath: string
): Promise<string> {
  const fullPath = `${tenantId}/${secretPath}`;
  return vault.read(fullPath);
}

// Usage
const apiKey = await getSecret(ctx.tenantId, 'api/key/openai');
```

#### Rotation Pattern

```typescript
// Automated rotation with overlap period
async function rotateSecret(secretPath: string): Promise<void> {
  const newSecret = generateSecret();
  await vault.write(`${secretPath}_new`, newSecret);
  
  // 24h overlap for graceful rotation
  await scheduleJob('finalize-rotation', {
    path: secretPath,
    delay: '24h'
  });
}
```

#### Web Research

For current implementation details, search:
- "HashiCorp Vault best practices {date}"
- "AWS Secrets Manager rotation {date}"

---

## Quality Gates

| Gate | Checks | Related Patterns |
|------|--------|------------------|
| QG-S1 | Authentication configured, secrets in vault | rbac, secrets-management |
| QG-S2 | Authorization enforced at all entry points | rbac, abac |
| QG-S3 | Zero trust for internal services | zero-trust |

---

## Web Research

| Topic | Query |
|-------|-------|
| Authentication | "authentication best practices SaaS {date}" |
| Authorization | "RBAC ABAC comparison {date}" |
| Zero Trust | "zero trust implementation guide {date}" |
| Secrets | "secrets management multi-tenant {date}" |

---

## Related Patterns

- `tenant-patterns-guide.md` §tenant-isolation - Tenant-level isolation
- `governance-patterns-guide.md` §audit-logging - Security audit
- `enterprise-patterns-guide.md` §compliance - Compliance requirements

---

## Related Workflows

- `bmad-bam-security-review` - Security audit workflow
- `bmad-bam-enterprise-compliance` - Compliance validation
```

- [ ] **Step 2: Verify structure**

Run: `grep "## §" src/data/agent-guides/bam/security-patterns-guide.md | wc -l`
Expected: 4+ section anchors (rbac, abac, zero-trust, secrets-management)

- [ ] **Step 3: Commit**

```bash
git add src/data/agent-guides/bam/security-patterns-guide.md
git commit -m "feat: create security-patterns-guide.md"
```

---

### Task 2.7: Create Observability Patterns Guide

> **Use Manual Consolidation Approach:** Follow Tasks 2.5.2-2.5.5 for this domain.

**Files:**
- Create: `src/data/agent-guides/bam/observability-patterns-guide.md`
- Read (source files for manual analysis):
  - `observability-patterns.md`
  - `distributed-tracing.md`
  - `log-aggregation.md`
  - `apm-integration.md`
  - `monitoring-patterns.md`
  - `alerting-patterns.md`

- [ ] **Step 1: Complete File Analysis Template for each source file**

- [ ] **Step 2: Create Consolidation Map (see Task 2.5.4)**

- [ ] **Step 3: Create the guide based on manual analysis**

```markdown
# BAM Observability Patterns Guide

**When to load:** During monitoring, logging, tracing, or alerting work.
**Integrates with:** Architect, Dev, SRE agents

---

## Core Concepts

Observability enables understanding system behavior through three pillars: logs (events), metrics (measurements), and traces (request flows). In multi-tenant AI platforms, tenant context must be preserved across all observability data.

### The Three Pillars + AI

| Pillar | Data Type | Tenant Isolation |
|--------|-----------|------------------|
| **Logs** | Structured events | `tenant_id` field |
| **Metrics** | Time-series numbers | Label: `tenant_id` |
| **Traces** | Request flow graphs | Baggage: `tenant_id` |
| **AI Telemetry** | Token usage, latency | All of above |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and MUST be followed exactly.

### Log Format (Structured JSON)

```json
{
  "timestamp": "2026-04-24T10:15:30.123Z",
  "level": "info",
  "message": "Agent run completed",
  "tenant_id": "abc123",
  "user_id": "user_456",
  "correlation_id": "req_789",
  "service": "agent-runtime",
  "agent_id": "agent_001",
  "duration_ms": 1523,
  "tokens_used": 2500
}
```

### Metric Naming

```
Pattern: {service}_{component}_{metric}_{unit}
Labels: tenant_id, environment, region

Examples:
- agent_runtime_request_duration_seconds
- agent_runtime_tokens_consumed_total
- tenant_api_requests_total
```

### Trace Context Headers

| Header | Purpose |
|--------|---------|
| `traceparent` | W3C Trace Context |
| `tracestate` | Vendor-specific state |
| `X-Correlation-ID` | BAM correlation |
| `baggage` | tenant_id propagation |

---

## Decision Framework

### Observability Stack Selection

| Scale | Recommended Stack | Cost |
|-------|-------------------|------|
| Startup | Grafana Cloud + Loki | Low |
| Growth | Self-hosted Grafana + Prometheus + Jaeger | Medium |
| Enterprise | Datadog / New Relic / Honeycomb | High |

---

## §distributed-tracing

### Pattern: Distributed Tracing

**When to use:** Multi-service architectures, debugging latency issues
**Variants:** sampling-based, always-on, tail-based-sampling

#### Span Creation Pattern

```typescript
// BAM Standard Span with Tenant Context
const span = tracer.startSpan('agent-run', {
  attributes: {
    'tenant.id': ctx.tenantId,
    'agent.id': agentId,
    'user.id': ctx.userId,
  }
});

try {
  const result = await executeAgent(agentId, input);
  span.setStatus({ code: SpanStatusCode.OK });
  return result;
} catch (error) {
  span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
  span.recordException(error);
  throw error;
} finally {
  span.end();
}
```

#### Web Research

For current implementation details, search:
- "OpenTelemetry tracing best practices {date}"
- "distributed tracing multi-tenant {date}"

---

## §log-aggregation

### Pattern: Log Aggregation

**When to use:** Centralized logging for debugging and audit
**Variants:** push-based, pull-based, sidecar

#### Structured Logging Pattern

```typescript
// BAM Logger with Tenant Context
const logger = createLogger({
  defaultMeta: {
    service: 'agent-runtime',
    environment: process.env.NODE_ENV,
  }
});

function logWithContext(ctx: Context, level: string, message: string, data?: object) {
  logger.log(level, message, {
    tenant_id: ctx.tenantId,
    user_id: ctx.userId,
    correlation_id: ctx.correlationId,
    ...data
  });
}
```

#### Web Research

For current implementation details, search:
- "structured logging best practices {date}"
- "Loki log aggregation {date}"

---

## §alerting

### Pattern: Alerting Strategy

**When to use:** Proactive monitoring and incident response
**Variants:** threshold-based, anomaly-based, slo-based

#### Alert Definition Pattern

```yaml
# BAM Alert Rule (Prometheus)
groups:
  - name: agent-runtime
    rules:
      - alert: HighAgentLatency
        expr: histogram_quantile(0.95, agent_runtime_request_duration_seconds{tenant_id!=""}) > 5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High latency for tenant {{ $labels.tenant_id }}"
          runbook: "https://runbooks.internal/agent-latency"
```

#### Web Research

For current implementation details, search:
- "SRE alerting best practices {date}"
- "Prometheus alert rules {date}"

---

## Quality Gates

| Gate | Checks | Related Patterns |
|------|--------|------------------|
| QG-O1 | Structured logging with tenant_id | log-aggregation |
| QG-O2 | Distributed tracing configured | distributed-tracing |
| QG-O3 | Alerts for critical paths | alerting |

---

## Web Research

| Topic | Query |
|-------|-------|
| OpenTelemetry | "OpenTelemetry setup guide {date}" |
| Grafana | "Grafana dashboards best practices {date}" |
| Alerting | "on-call alerting strategy {date}" |

---

## Related Patterns

- `ai-observability-patterns-guide.md` - AI-specific observability
- `reliability-patterns-guide.md` §circuit-breaker - Reliability monitoring
- `tenant-patterns-guide.md` §tenant-isolation - Tenant context

---

## Related Workflows

- `bmad-bam-observability-setup` - Full observability setup
- `bmad-bam-incident-response` - Incident handling
```

- [ ] **Step 2: Verify and commit**

```bash
git add src/data/agent-guides/bam/observability-patterns-guide.md
git commit -m "feat: create observability-patterns-guide.md"
```

---

### Task 2.8-2.28: Create Remaining Domain Guides

> **MANDATORY:** Use Manual Consolidation Approach (Tasks 2.5.2-2.5.5) for ALL domain guides. NO extraction scripts.

Each remaining guide follows the same manual consolidation process:

| Task | Guide | Source Files | Key §Sections | Est. Time |
|------|-------|--------------|--------------|-----------|
| 2.8 | `reliability-patterns-guide.md` | `circuit-breaker.md`, `retry-policies.md`, `disaster-recovery.md`, `resilience-patterns.md`, `fallback-patterns.md`, `bulkhead-patterns.md` | §circuit-breaker, §retry, §fallback, §bulkhead | 1.5h |
| 2.9 | `governance-patterns-guide.md` | `compliance-patterns.md`, `governance.md`, `audit-logging.md`, `data-residency.md`, `policy-enforcement.md` | §compliance, §audit-logging, §data-residency, §policy | 1.5h |
| 2.10 | `integration-patterns-guide.md` | `event-driven.md`, `saga-orchestration.md`, `facade-contracts.md`, `webhook-delivery.md`, `api-versioning.md`, `a2a-protocol.md` | §event-driven, §saga, §facade, §webhook, §a2a | 1.5h |
| 2.11 | `cost-patterns-guide.md` | `cost-tracking.md`, `usage-metering.md`, `llm-cost-tracking.md`, `billing-integration.md`, `quota-management.md` | §cost-tracking, §metering, §llm-cost, §quota | 1h |
| 2.12 | `state-patterns-guide.md` | `caching-strategy.md`, `session-management.md`, `event-sourcing.md`, `cqrs-patterns.md`, `checkpoint-patterns.md` | §caching, §session, §event-sourcing, §checkpoint | 1.5h |
| 2.13 | `discovery-patterns-guide.md` | `discovery-patterns.md`, `requirements-patterns.md`, `planning-patterns.md`, `triage-patterns.md` | §requirements, §triage, §planning, §complexity | 1h |
| 2.14 | `testing-patterns-guide.md` | `testing-isolation.md`, `testing-agent-safety.md`, `ai-testing.md`, `integration-testing.md`, `contract-testing.md` | §isolation-testing, §agent-safety, §contract, §integration | 1.5h |
| 2.15 | `operations-patterns-guide.md` | `deployment-patterns.md`, `devops-patterns.md`, `sre-patterns.md`, `sla-patterns.md`, `incident-response.md`, `runbook-patterns.md` | §deployment, §rollback, §incident, §runbook | 1.5h |
| 2.16 | `scaling-patterns-guide.md` | `auto-scaling.md`, `capacity-patterns.md`, `performance-patterns.md`, `rate-limiting.md`, `load-balancing.md` | §auto-scaling, §rate-limiting, §capacity, §performance | 1h |
| 2.17 | `ai-lifecycle-patterns-guide.md` | `model-fine-tuning.md`, `model-deployment.md`, `model-versioning.md`, `prompt-catalog.md`, `model-registry.md` | §model-versioning, §fine-tuning, §prompt-catalog, §registry | 1.5h |
| 2.18 | `ai-safety-patterns-guide.md` | `ai-safety-patterns.md`, `guardrails.md`, `kill-switch.md`, `grounding-patterns.md`, `prg-gate.md` | §guardrails, §kill-switch, §grounding, §prg-gate | 1.5h |
| 2.19 | `ai-observability-patterns-guide.md` | `llm-observability.md`, `rag-observability.md`, `embedding-observability.md`, `token-tracking.md`, `inference-metrics.md` | §llm-telemetry, §token-tracking, §rag-metrics | 1h |
| 2.20 | `runtime-loops-patterns-guide.md` | `request-loop.md`, `control-loop.md`, `learning-loop.md`, `economic-loop.md`, `feedback-loop.md` | §request-loop, §control-loop, §learning-loop, §economic-loop | 1h |
| 2.21 | `mcp-patterns-guide.md` | `mcp-server-isolation.md`, `mcp-client-patterns.md`, `tool-schema-validation.md`, `mcp-federation.md`, `tool-permission.md` | §mcp-server, §tool-permission, §mcp-federation, §schema-validation | 1.5h |
| 2.22 | `data-patterns-guide.md` | `connection-pooling.md`, `query-routing.md`, `migration-per-tenant.md`, `database-patterns.md`, `data-lifecycle.md` | §connection-pooling, §query-routing, §migration | 1.5h |
| 2.23 | `rag-patterns-guide.md` | `rag-retrieval.md`, `rag-generation.md`, `embedding-management.md`, `vector-store.md`, `chunking-patterns.md`, `reranking.md` | §retrieval, §chunking, §embedding, §reranking, §citation | 1.5h |
| 2.24 | `architecture-patterns-guide.md` | `module-boundaries.md`, `idempotency.md`, `cache-aside.md`, `architecture-decision.md`, `domain-modeling.md` | §module-boundaries, §idempotency, §domain-modeling | 1.5h |
| 2.25 | `analytics-patterns-guide.md` | `analytics-patterns.md`, `dashboard-patterns.md`, `reporting-patterns.md`, `health-scoring.md`, `metrics-aggregation.md` | §dashboards, §health-scoring, §reporting | 1h |
| 2.26 | `gate-verification-patterns-guide.md` | `qg-foundation.md`, `qg-module.md`, `qg-integration.md`, `qg-production.md`, `qg-security.md`, `qg-ai.md` | §qg-foundation, §qg-module, §qg-integration, §qg-production | 1.5h |
| 2.27 | `federation-patterns-guide.md` | `federation-a2a.md`, `partner-ecosystem.md`, `cross-tenant.md`, `federated-identity.md` | §a2a-protocol, §partner-ecosystem, §cross-tenant | 1h |
| 2.28 | `documentation-patterns-guide.md` | `documentation-patterns.md`, `api-design.md`, `api-documentation.md`, `changelog-patterns.md` | §api-design, §changelog, §runbooks | 1h |

**For each guide, follow this EXACT manual consolidation process:**

```
┌─────────────────────────────────────────────────────────────────┐
│         Per-Domain Manual Consolidation Process                  │
├─────────────────────────────────────────────────────────────────┤
│ Step 1: READ all source files listed in the table above        │
│         └── Complete File Analysis Template (Task 2.5.2)        │
│             for EACH source file                                 │
│                                                                  │
│ Step 2: CREATE Consolidation Map                                 │
│         └── Document: Files Analyzed | Content Disposition       │
│         └── Identify: Unique vs Duplicate content               │
│         └── Decide: Which version is richer (keep that one)     │
│                                                                  │
│ Step 3: WRITE consolidated guide                                 │
│         └── Use domain-guide-template.md                        │
│         └── Place content under §section-anchors                │
│         └── Preserve ALL BAM conventions                        │
│         └── Include web research queries with {date}            │
│                                                                  │
│ Step 4: VERIFY completeness                                      │
│         └── Run verification checklist (Task 2.5.5)             │
│         └── Confirm line count reduction (20-40% expected)      │
│                                                                  │
│ Step 5: COMMIT domain guide                                      │
│         └── git add + commit with "manual consolidation" note   │
└─────────────────────────────────────────────────────────────────┘
```

**Commit pattern for each domain:**
```bash
git add src/data/agent-guides/bam/{domain}-patterns-guide.md
git commit -m "feat: create {domain}-patterns-guide.md (manual consolidation)

Consolidated from: {list source files}
Analysis: {unique} unique lines, {duplicate} duplicates eliminated
"
```

---

## Phase 3: Workflow Consolidation (Manual Analysis Approach)

> **CRITICAL METHODOLOGY:** Like domain guides, workflow consolidation uses MANUAL analysis. The existing 186 workflows must be analyzed to determine: (1) which workflows overlap and should be merged, (2) which should be kept as-is, (3) which should be archived. Do NOT create composite workflows without first analyzing existing workflows.

**Phase 3 Time Estimate:** 30 hours (manual workflow analysis + composite workflow creation)

---

### Task 3.0.0: Workflow Analysis Template

> **MANDATORY:** Complete this template for EACH of the 186 existing workflows before deciding on consolidation.

**Time estimate:** 15 hours (186 workflows × ~5 min each)

#### Workflow Analysis Template

```markdown
## Workflow Analysis: {workflow-name}

### 1. Basic Information
- **Path:** src/workflows/{workflow-name}/
- **Lines in SKILL.md:** ___
- **Number of steps:** ___
- **Quality Gate:** ___

### 2. Functionality Assessment
- **Primary purpose:** (one sentence)
- **Input artifacts:** (what does it require?)
- **Output artifacts:** (what does it produce?)
- **Unique value:** (what does this do that others don't?)

### 3. Overlap Detection
- **Similar workflows:** (list workflows with overlapping purpose)
- **Overlap %:** ___
- **Can be merged with:** {workflow-name} because ___

### 4. Consolidation Decision
- **Action:** {KEEP_STANDALONE | MERGE_INTO | ARCHIVE_DUPLICATE}
- **If MERGE_INTO:** Target composite workflow: ___
- **If ARCHIVE:** Reason: ___

### 5. Content Migration Notes
- **Unique steps to preserve:** ___
- **References to update:** ___
```

---

### Task 3.0.1: Create Workflow Consolidation Map

> **MANDATORY:** Before creating ANY composite workflow, analyze all 186 existing workflows and create a consolidation map.

**Time estimate:** 3 hours

- [ ] **Step 1: Group existing workflows by domain**

Create `_consolidation/workflow-consolidation-map.md`:

```markdown
# Workflow Consolidation Map

## Workflow Inventory by Domain

### Tenant Workflows (estimated: 15-20)
| Workflow | Purpose | Decision | Target |
|----------|---------|----------|--------|
| tenant-model-isolation | Design tenant isolation | MERGE_INTO | bmad-bam-tenant-setup |
| tenant-onboarding-design | Design onboarding flow | MERGE_INTO | bmad-bam-tenant-lifecycle |
| ... | ... | ... | ... |

### AI/Agent Workflows (estimated: 25-30)
| Workflow | Purpose | Decision | Target |
|----------|---------|----------|--------|

### Integration Workflows (estimated: 15-20)
| Workflow | Purpose | Decision | Target |
|----------|---------|----------|--------|

### Validation Workflows (estimated: 20-25)
| Workflow | Purpose | Decision | Target |
|----------|---------|----------|--------|

### Foundation Workflows (estimated: 10-15)
| Workflow | Purpose | Decision | Target |
|----------|---------|----------|--------|

### Other Workflows
| Workflow | Purpose | Decision | Target |
|----------|---------|----------|--------|

## Composite Workflow Plan

| New Composite Workflow | Source Workflows | Unique Steps Combined |
|------------------------|------------------|----------------------|
| bmad-bam-tenant-setup | tenant-model-isolation, tenant-context-propagation, ... | 12 |
| bmad-bam-tenant-lifecycle | tenant-onboarding-design, tenant-offboarding-design, ... | 10 |
| bmad-bam-ai-agent-setup | agent-runtime-architecture, agent-coordination, ... | 15 |
| ... | ... | ... |

## Archive List

| Workflow | Reason for Archive | Content Migrated To |
|----------|-------------------|---------------------|
| {workflow} | Duplicate of {other} | {composite-workflow} |
```

- [ ] **Step 2: Analyze each workflow**

For each of the 186 workflows:
1. Read SKILL.md and workflow.md
2. Complete Workflow Analysis Template
3. Assign to domain group
4. Decide: KEEP_STANDALONE, MERGE_INTO, or ARCHIVE_DUPLICATE

- [ ] **Step 3: Define composite workflows**

Based on analysis, define which composite workflows will be created and which existing workflows will feed into each.

- [ ] **Step 4: Commit consolidation map**

```bash
git add _consolidation/workflow-consolidation-map.md
git commit -m "docs: create workflow consolidation map (manual analysis)"
```

---

### Task 3.0.2: Workflow Consolidation Rules

> **Apply these rules when deciding on workflow consolidation:**

| Situation | Rule | Example |
|-----------|------|---------|
| **Same output artifact** | Merge workflows producing same artifact type | tenant-design-a + tenant-design-b → tenant-setup |
| **Sequential dependency** | Keep as separate workflows with clear handoff | foundation → module → integration (keep separate) |
| **Different quality gates** | Keep separate if different QG checkpoints | QG-F1 workflows separate from QG-M1 |
| **Overlapping steps** | Merge, keep richer step version | Like guide consolidation |
| **Mode variants** | Merge into single workflow with C/E/V modes | design-tenant + edit-tenant + validate-tenant → tenant-setup |
| **Domain coherence** | Group by domain, not by technical similarity | tenant-* workflows together even if different patterns |

---

### Task 3.0: Create Rollback Procedure

**Files:**
- Create: `scripts/rollback-consolidation.sh`

- [ ] **Step 1: Create rollback script**

```bash
#!/bin/bash
# BAM Consolidation Rollback Script
# Use if consolidation causes issues

set -e

ARCHIVE_DIR="_archive"
GUIDES_DIR="src/data/agent-guides/bam"
WORKFLOWS_DIR="src/workflows"
CSV_BACKUP="_archive/bam-patterns-backup-2026-04-24.csv"

echo "=== BAM Consolidation Rollback ==="

# Check if archive exists
if [ ! -d "$ARCHIVE_DIR" ]; then
    echo "ERROR: Archive directory not found. Cannot rollback."
    exit 1
fi

# Confirm rollback
read -p "This will restore old guides and remove consolidated ones. Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Rollback cancelled."
    exit 0
fi

# Step 1: Restore CSV
if [ -f "$CSV_BACKUP" ]; then
    echo "Restoring bam-patterns.csv..."
    cp "$CSV_BACKUP" src/data/bam-patterns.csv
fi

# Step 2: Remove consolidated guides
echo "Removing consolidated guides..."
rm -f "$GUIDES_DIR"/*-patterns-guide.md

# Step 3: Restore archived guides
if [ -d "$ARCHIVE_DIR/agent-guides/bam" ]; then
    echo "Restoring archived guides..."
    cp "$ARCHIVE_DIR/agent-guides/bam/"*.md "$GUIDES_DIR/"
fi

# Step 4: Restore archived workflows
if [ -d "$ARCHIVE_DIR/workflows" ]; then
    echo "Restoring archived workflows..."
    cp -r "$ARCHIVE_DIR/workflows/"* "$WORKFLOWS_DIR/"
fi

echo "=== Rollback Complete ==="
echo "Run 'npm test' to verify restored state"
```

- [ ] **Step 2: Make executable and commit**

```bash
chmod +x scripts/rollback-consolidation.sh
git add scripts/rollback-consolidation.sh
git commit -m "chore: add consolidation rollback script"
```

---

### Task 3.1: Create Composite Workflow Structure

**Files:**
- Create: `src/workflows/bmad-bam-tenant-setup/`

- [ ] **Step 1: Create workflow directory**

```bash
mkdir -p src/workflows/bmad-bam-tenant-setup/steps
```

- [ ] **Step 2: Create bmad-skill-manifest.yaml**

```yaml
type: workflow
name: bmad-bam-tenant-setup
displayName: Tenant Setup
description: 'Complete tenant isolation setup including RLS, context propagation, and cache isolation'
module: bam
config_variables:
  - tenant_model
  - ai_runtime
step_naming_convention: "step-NN-mode-description"
```

- [ ] **Step 3: Create SKILL.md**

```markdown
---
name: bmad-bam-tenant-setup
description: 'Complete tenant isolation setup workflow'
module: bam
web_bundle: false
tags: [tenant, isolation, foundation]
---

# Tenant Setup Workflow

## Overview

Comprehensive tenant isolation setup covering database isolation (RLS/schema/database), context propagation, cache isolation, file storage isolation, and queue isolation.

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Design new tenant isolation | `step-01-c-*` to `step-09-c-*` |
| Edit | Modify existing isolation | `step-10-e-*` to `step-19-e-*` |
| Validate | Verify isolation (QG-M2) | `step-20-v-*` to `step-29-v-*` |

## Prerequisites

- Master architecture complete (QG-F1 passed)
- **Config required:** `tenant_model`

## Outputs

- `tenant-isolation-design.md` in `{output_folder}/planning-artifacts/`
- RLS policies defined
- Context propagation strategy

## Related Workflows

- `bmad-bam-validate-foundation` - Validates QG-M2
- `bmad-bam-tenant-onboarding` - Uses isolation patterns
```

- [ ] **Step 4: Create workflow.md**

```markdown
# Tenant Setup Workflow

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Design tenant isolation from scratch | `step-01-c-*` through `step-09-c-*` |
| **Edit** | Modify existing isolation design | `step-10-e-*` through `step-15-e-*` |
| **Validate** | Verify isolation passes QG-M2 | `step-20-v-*` through `step-23-v-*` |

Default: **Create** mode unless tenant isolation already designed.

### Create Mode
Follow Create steps sequentially: step-01-c → step-02-c → ... → step-09-c

### Edit Mode
Follow Edit steps: step-10-e-load → step-11-e-analyze → step-12-e-apply

### Validate Mode
Follow Validate steps: step-20-v-load → step-21-v-check → step-22-v-report
```

- [ ] **Step 5: Create step-01-c-assess-requirements.md**

```markdown
# Step 01: Assess Requirements

## Purpose

Gather requirements for tenant isolation model selection.

## Prerequisites

- Master architecture document available
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/tenant-patterns-guide.md`
  - Section: §Core Concepts
  - Section: §Decision Framework
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-*`

## Actions

### 1. Gather Project Context

| Question | Your Answer | Impact |
|----------|-------------|--------|
| Expected tenant count? | | Model selection |
| Regulated industry? | | Schema vs RLS |
| Enterprise tier needed? | | Database isolation |
| Tenant data sensitivity? | | Encryption requirements |

### 2. Evaluate Decision Criteria

Using the Decision Framework from tenant-patterns-guide.md §Decision Framework:

```
If <1000 tenants AND NOT regulated → RLS recommended
If regulated industry OR compliance requirements → Schema-per-tenant
If enterprise tier OR maximum isolation → Database-per-tenant
```

### 3. Document Initial Decision

Record in planning artifact:
- Selected model
- Rationale based on criteria
- Trade-offs accepted

## Verification

- [ ] Tenant count documented
- [ ] Regulatory requirements identified
- [ ] Initial model selected based on decision framework
- [ ] Trade-offs documented

## Outputs

- Requirements section of tenant-isolation-design.md

## Next Step

Proceed to `step-02-c-design-isolation.md`
```

- [ ] **Step 6: Create remaining step files**

Create these files following the same pattern:
- `step-02-c-design-isolation.md`
- `step-03-c-design-context.md`
- `step-04-c-design-cache.md`
- `step-05-c-design-files.md`
- `step-06-c-design-queues.md`
- `step-07-c-integration-plan.md`
- `step-10-e-load-existing.md`
- `step-11-e-apply-changes.md`
- `step-20-v-load-design.md`
- `step-21-v-validate-qg-m2.md`
- `step-22-v-generate-report.md`

- [ ] **Step 7: Commit**

```bash
git add src/workflows/bmad-bam-tenant-setup/
git commit -m "feat: create bmad-bam-tenant-setup composite workflow"
```

---

### Task 3.2: Validate Composite Workflow Structure

**Files:**
- Create: `test/composite-workflow.test.js`

- [ ] **Step 1: Write the test**

```javascript
const fs = require('fs');
const path = require('path');

describe('Composite Workflow Structure', () => {
  const workflowPath = path.join(__dirname, '../src/workflows/bmad-bam-tenant-setup');
  
  test('should have bmad-skill-manifest.yaml', () => {
    const manifestPath = path.join(workflowPath, 'bmad-skill-manifest.yaml');
    expect(fs.existsSync(manifestPath)).toBe(true);
  });
  
  test('should have SKILL.md', () => {
    const skillPath = path.join(workflowPath, 'SKILL.md');
    expect(fs.existsSync(skillPath)).toBe(true);
  });
  
  test('should have workflow.md', () => {
    const workflowMdPath = path.join(workflowPath, 'workflow.md');
    expect(fs.existsSync(workflowMdPath)).toBe(true);
  });
  
  test('should have steps directory', () => {
    const stepsPath = path.join(workflowPath, 'steps');
    expect(fs.existsSync(stepsPath)).toBe(true);
  });
  
  test('should have Create mode steps (01-09)', () => {
    const stepsPath = path.join(workflowPath, 'steps');
    const files = fs.readdirSync(stepsPath);
    const createSteps = files.filter(f => f.match(/step-0[1-9]-c-/));
    expect(createSteps.length).toBeGreaterThan(0);
  });
  
  test('should have Edit mode steps (10-19)', () => {
    const stepsPath = path.join(workflowPath, 'steps');
    const files = fs.readdirSync(stepsPath);
    const editSteps = files.filter(f => f.match(/step-1[0-9]-e-/));
    expect(editSteps.length).toBeGreaterThan(0);
  });
  
  test('should have Validate mode steps (20-29)', () => {
    const stepsPath = path.join(workflowPath, 'steps');
    const files = fs.readdirSync(stepsPath);
    const validateSteps = files.filter(f => f.match(/step-2[0-9]-v-/));
    expect(validateSteps.length).toBeGreaterThan(0);
  });
  
  test('step files should reference consolidated guide', () => {
    const stepPath = path.join(workflowPath, 'steps/step-01-c-assess-requirements.md');
    const content = fs.readFileSync(stepPath, 'utf-8');
    expect(content).toMatch(/tenant-patterns-guide\.md/);
  });
});
```

- [ ] **Step 2: Run the test**

Run: `npm test -- test/composite-workflow.test.js`
Expected: All tests pass

- [ ] **Step 3: Commit**

```bash
git add test/composite-workflow.test.js
git commit -m "test: add composite workflow validation"
```

---

### Task 3.3-3.40: Create Remaining Composite Workflows

Create all 40 composite workflows following the CEV structure (Create/Edit/Validate):

**Foundation Workflows (6 total)**

| Task | Workflow | Domain Guide Reference |
|------|----------|------------------------|
| 3.3 | `bmad-bam-master-architecture` | architecture-patterns-guide.md |
| 3.4 | `bmad-bam-scaffold-foundation` | architecture-patterns-guide.md |
| 3.5 | `bmad-bam-validate-foundation` | gate-verification-patterns-guide.md |
| 3.6 | `bmad-bam-module-architecture` | architecture-patterns-guide.md |
| 3.7 | `bmad-bam-module-implementation` | architecture-patterns-guide.md |
| 3.8 | `bmad-bam-validate-module` | gate-verification-patterns-guide.md |

**Domain Composite Workflows (15 total)**

| Task | Workflow | Domain Guide Reference |
|------|----------|------------------------|
| 3.9 | `bmad-bam-agent-runtime-setup` | ai-runtime-patterns-guide.md |
| 3.10 | `bmad-bam-agent-safety-hardening` | ai-safety-patterns-guide.md |
| 3.11 | `bmad-bam-reliability-design` | reliability-patterns-guide.md |
| 3.12 | `bmad-bam-observability-setup` | observability-patterns-guide.md |
| 3.13 | `bmad-bam-mcp-setup` | mcp-patterns-guide.md |
| 3.14 | `bmad-bam-rag-setup` | rag-patterns-guide.md |
| 3.15 | `bmad-bam-state-management` | state-patterns-guide.md |
| 3.16 | `bmad-bam-integration-design` | integration-patterns-guide.md |
| 3.17 | `bmad-bam-enterprise-compliance` | governance-patterns-guide.md |
| 3.18 | `bmad-bam-scaling-design` | scaling-patterns-guide.md |
| 3.19 | `bmad-bam-deployment-setup` | operations-patterns-guide.md |
| 3.20 | `bmad-bam-platform-setup` | architecture-patterns-guide.md |
| 3.21 | `bmad-bam-ai-discovery-setup` | discovery-patterns-guide.md |
| 3.22 | `bmad-bam-tenant-governance` | governance-patterns-guide.md |
| 3.23 | `bmad-bam-data-management` | data-patterns-guide.md |

**Integration Workflows (6 total)**

| Task | Workflow | Domain Guide Reference |
|------|----------|------------------------|
| 3.24 | `bmad-bam-facade-contract` | integration-patterns-guide.md |
| 3.25 | `bmad-bam-api-versioning` | integration-patterns-guide.md |
| 3.26 | `bmad-bam-event-architecture` | integration-patterns-guide.md |
| 3.27 | `bmad-bam-convergence` | architecture-patterns-guide.md |
| 3.28 | `bmad-bam-contract-validation` | testing-patterns-guide.md |
| 3.29 | `bmad-bam-cross-module` | integration-patterns-guide.md |

**Operations Workflows (6 total)**

| Task | Workflow | Domain Guide Reference |
|------|----------|------------------------|
| 3.30 | `bmad-bam-production-hardening` | operations-patterns-guide.md |
| 3.31 | `bmad-bam-incident-response` | operations-patterns-guide.md |
| 3.32 | `bmad-bam-performance-tuning` | scaling-patterns-guide.md |
| 3.33 | `bmad-bam-cost-optimization` | cost-patterns-guide.md |
| 3.34 | `bmad-bam-capacity-planning` | scaling-patterns-guide.md |
| 3.35 | `bmad-bam-disaster-recovery` | reliability-patterns-guide.md |

**Quality Workflows (4 total)**

| Task | Workflow | Domain Guide Reference |
|------|----------|------------------------|
| 3.36 | `bmad-bam-testing-strategy` | testing-patterns-guide.md |
| 3.37 | `bmad-bam-quality-gates` | gate-verification-patterns-guide.md |
| 3.38 | `bmad-bam-security-review` | security-patterns-guide.md |
| 3.39 | `bmad-bam-compliance-audit` | governance-patterns-guide.md |

**Utility Workflows (3 total)**

| Task | Workflow | Domain Guide Reference |
|------|----------|------------------------|
| 3.40 | `bmad-bam-requirement-ingestion` | discovery-patterns-guide.md |
| 3.41 | `bmad-bam-triage-complexity` | discovery-patterns-guide.md |
| 3.42 | `bmad-bam-ai-debug` | ai-observability-patterns-guide.md |

#### Standard Workflow Creation Process

For each workflow, create using this structure:

```bash
# Create workflow directory
mkdir -p src/workflows/{workflow-name}/steps

# Create manifest
cat > src/workflows/{workflow-name}/bmad-skill-manifest.yaml << 'EOF'
type: workflow
name: {workflow-name}
displayName: {Display Name}
description: '{Description}'
module: bam
config_variables:
  - {config_var_1}
step_naming_convention: "step-NN-mode-description"
EOF

# Create SKILL.md
cat > src/workflows/{workflow-name}/SKILL.md << 'EOF'
---
name: {workflow-name}
description: '{Description}'
module: bam
web_bundle: false
tags: [{tags}]
---

# {Display Name} Workflow

## Overview

{Brief description of what this workflow accomplishes}

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | {Create description} | `step-01-c-*` to `step-09-c-*` |
| Edit | {Edit description} | `step-10-e-*` to `step-19-e-*` |
| Validate | {Validate description} | `step-20-v-*` to `step-29-v-*` |

## Prerequisites

- {Prerequisite 1}
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/{domain-guide}.md`

## Outputs

- {Output 1}
- {Output 2}

## Related Workflows

- `{related-workflow}` - {When to use}
EOF

# Create workflow.md with mode selection
# Create step files following CEV structure

# Commit
git add src/workflows/{workflow-name}/
git commit -m "feat: create {workflow-name} composite workflow"
```

#### Example: Agent Runtime Setup Workflow (Task 3.9)

```bash
mkdir -p src/workflows/bmad-bam-agent-runtime-setup/steps
```

**SKILL.md:**

```markdown
---
name: bmad-bam-agent-runtime-setup
description: 'Configure agent runtime with memory, tools, and execution patterns'
module: bam
tags: [agent, runtime, ai]
---

# Agent Runtime Setup Workflow

## Overview

Configure the complete agent runtime environment including memory tiers, tool execution, run contracts, and coordination patterns.

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Design new agent runtime | `step-01-c-*` to `step-09-c-*` |
| Edit | Modify existing runtime | `step-10-e-*` to `step-19-e-*` |
| Validate | Verify runtime (QG-AI) | `step-20-v-*` to `step-29-v-*` |

## Prerequisites

- Foundation complete (QG-F1 passed)
- Tenant isolation designed
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/ai-runtime-patterns-guide.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `ai-*`, `agent-*`

## Outputs

- `agent-runtime-design.md` in `{output_folder}/planning-artifacts/`
- Memory tier configuration
- Tool execution policies
- Run contract templates

## Related Workflows

- `bmad-bam-agent-safety-hardening` - Safety guardrails
- `bmad-bam-mcp-setup` - Tool server configuration
```

**steps/step-01-c-assess-requirements.md:**

```markdown
# Step 01: Assess Agent Requirements

## Purpose

Gather requirements for agent runtime configuration.

## Prerequisites

- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/ai-runtime-patterns-guide.md`
  - Section: §Core Concepts
  - Section: §memory-tiers

## Actions

### 1. Define Agent Types

| Agent Type | Purpose | Memory Needs | Tool Access |
|------------|---------|--------------|-------------|
| {Type 1} | | | |
| {Type 2} | | | |

### 2. Memory Requirements

Using the 5-tier memory hierarchy from ai-runtime-patterns-guide.md §memory-tiers:

| Tier | Scope | This Project Needs |
|------|-------|-------------------|
| Ephemeral | Request | ☐ Yes ☐ No |
| Session | Conversation | ☐ Yes ☐ No |
| User | Cross-session | ☐ Yes ☐ No |
| Tenant | Organization | ☐ Yes ☐ No |
| Global | Platform | ☐ Yes ☐ No |

### 3. Tool Requirements

List tools each agent type needs access to.

## Verification

- [ ] Agent types documented
- [ ] Memory tiers selected
- [ ] Tool requirements listed

## Next Step

Proceed to `step-02-c-design-memory.md`
```

---

### Task 3.43: Create Workflow-Guide Dependency Validation

**Files:**
- Create: `test/workflow-guide-deps.test.js`

- [ ] **Step 1: Write dependency validation test**

```javascript
const fs = require('fs');
const path = require('path');
const glob = require('glob');

describe('Workflow-Guide Dependencies', () => {
  const workflowsPath = 'src/workflows';
  const guidesPath = 'src/data/agent-guides/bam';
  
  // Get all workflow step files
  const stepFiles = glob.sync(`${workflowsPath}/**/step-*.md`);
  
  test('all referenced guides should exist', () => {
    const missingGuides = [];
    
    stepFiles.forEach(stepFile => {
      const content = fs.readFileSync(stepFile, 'utf-8');
      
      // Find guide references
      const guideRefs = content.match(/agent-guides\/bam\/[\w-]+\.md/g) || [];
      
      guideRefs.forEach(ref => {
        const guidePath = path.join(guidesPath, path.basename(ref));
        if (!fs.existsSync(guidePath)) {
          missingGuides.push({
            workflow: stepFile,
            guide: ref
          });
        }
      });
    });
    
    if (missingGuides.length > 0) {
      console.error('Missing guides:', missingGuides);
    }
    expect(missingGuides).toHaveLength(0);
  });
  
  test('all section anchors should exist in referenced guides', () => {
    const missingSections = [];
    
    stepFiles.forEach(stepFile => {
      const content = fs.readFileSync(stepFile, 'utf-8');
      
      // Find section references like §memory-tiers
      const sectionRefs = content.match(/§[\w-]+/g) || [];
      const guideRefs = content.match(/agent-guides\/bam\/([\w-]+)\.md/g) || [];
      
      guideRefs.forEach(ref => {
        const guidePath = path.join(guidesPath, path.basename(ref));
        if (fs.existsSync(guidePath)) {
          const guideContent = fs.readFileSync(guidePath, 'utf-8');
          
          sectionRefs.forEach(section => {
            const sectionId = section.replace('§', '');
            if (!guideContent.includes(`## §${sectionId}`)) {
              missingSections.push({
                workflow: stepFile,
                guide: ref,
                section: section
              });
            }
          });
        }
      });
    });
    
    if (missingSections.length > 0) {
      console.error('Missing sections:', missingSections);
    }
    expect(missingSections).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Commit**

```bash
git add test/workflow-guide-deps.test.js
git commit -m "test: add workflow-guide dependency validation"
```

---

### Task 3.44: Create Cross-Reference Validation

**Files:**
- Create: `test/cross-reference.test.js`

- [ ] **Step 1: Write cross-reference test**

```javascript
const fs = require('fs');
const path = require('path');
const glob = require('glob');

describe('Domain Guide Cross-References', () => {
  const guidesPath = 'src/data/agent-guides/bam';
  const guideFiles = glob.sync(`${guidesPath}/*-guide.md`);
  
  test('all related patterns references should exist', () => {
    const invalidRefs = [];
    
    guideFiles.forEach(guideFile => {
      const content = fs.readFileSync(guideFile, 'utf-8');
      const guideName = path.basename(guideFile);
      
      // Find references like `security-patterns-guide.md` §rbac
      const refs = content.match(/`([\w-]+-guide\.md)`\s*§?([\w-]*)/g) || [];
      
      refs.forEach(ref => {
        const match = ref.match(/`([\w-]+-guide\.md)`\s*§?([\w-]*)/);
        if (match) {
          const refGuide = match[1];
          const refSection = match[2];
          
          const refPath = path.join(guidesPath, refGuide);
          if (!fs.existsSync(refPath)) {
            invalidRefs.push({
              source: guideName,
              reference: refGuide,
              issue: 'Guide not found'
            });
          } else if (refSection) {
            const refContent = fs.readFileSync(refPath, 'utf-8');
            if (!refContent.includes(`## §${refSection}`)) {
              invalidRefs.push({
                source: guideName,
                reference: `${refGuide} §${refSection}`,
                issue: 'Section not found'
              });
            }
          }
        }
      });
    });
    
    if (invalidRefs.length > 0) {
      console.error('Invalid references:', invalidRefs);
    }
    expect(invalidRefs).toHaveLength(0);
  });
  
  test('all pattern registry filter references should be valid', () => {
    const csvPath = 'src/data/bam-patterns.csv';
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const categories = new Set();
    
    // Extract all categories from CSV
    csvContent.split('\n').slice(1).forEach(line => {
      const category = line.split(',')[2]; // category column
      if (category) categories.add(category.trim());
    });
    
    const invalidFilters = [];
    
    guideFiles.forEach(guideFile => {
      const content = fs.readFileSync(guideFile, 'utf-8');
      const guideName = path.basename(guideFile);
      
      // Find filter references like: filter: `tenant-*`
      const filters = content.match(/filter:\s*`?([\w-]+)-?\*?`?/gi) || [];
      
      filters.forEach(filter => {
        const match = filter.match(/filter:\s*`?([\w-]+)/i);
        if (match) {
          const prefix = match[1].toLowerCase();
          const hasMatch = Array.from(categories).some(c => 
            c.toLowerCase().startsWith(prefix) || c.toLowerCase().includes(prefix)
          );
          if (!hasMatch) {
            invalidFilters.push({
              source: guideName,
              filter: filter,
              issue: 'No matching categories in CSV'
            });
          }
        }
      });
    });
    
    if (invalidFilters.length > 0) {
      console.error('Invalid filters:', invalidFilters);
    }
    expect(invalidFilters).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Commit**

```bash
git add test/cross-reference.test.js
git commit -m "test: add cross-reference validation"
```

---

## Phase 4: Reference Updates & Migration

### Task 4.0: Update module-help.csv

**Files:**
- Modify: `src/data/module-help.csv`

- [ ] **Step 1: Read current module-help.csv**

```bash
head -20 src/data/module-help.csv
```

- [ ] **Step 2: Update guide references to consolidated guides**

Create update script `scripts/update-module-help.py`:

```python
#!/usr/bin/env python3
"""Update module-help.csv to reference consolidated guides."""

import csv
import re

# Mapping of old guides to consolidated guides
OLD_TO_NEW = {
    'tenant-isolation.md': 'tenant-patterns-guide.md §tenant-isolation',
    'tenant-lifecycle.md': 'tenant-patterns-guide.md §tenant-lifecycle',
    'tenant-routing.md': 'tenant-patterns-guide.md §tenant-routing',
    'agent-runtime.md': 'ai-runtime-patterns-guide.md §agent-runtime',
    'agent-coordination.md': 'ai-runtime-patterns-guide.md §agent-coordination',
    'memory-tiers.md': 'ai-runtime-patterns-guide.md §memory-tiers',
    'rbac-patterns.md': 'security-patterns-guide.md §rbac',
    'abac-patterns.md': 'security-patterns-guide.md §abac',
    'circuit-breaker.md': 'reliability-patterns-guide.md §circuit-breaker',
    'distributed-tracing.md': 'observability-patterns-guide.md §distributed-tracing',
    'mcp-server-isolation.md': 'mcp-patterns-guide.md §mcp-server',
    'rag-retrieval.md': 'rag-patterns-guide.md §retrieval',
    # Add more mappings as needed
}

def update_module_help(input_file, output_file=None):
    output_file = output_file or input_file
    rows = []
    
    with open(input_file, 'r', newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        
        for row in reader:
            # Update guide_file column if it exists
            if 'guide_file' in row:
                old_guide = row['guide_file']
                if old_guide in OLD_TO_NEW:
                    row['guide_file'] = OLD_TO_NEW[old_guide]
            
            # Update any reference columns
            for col in ['reference', 'related_guide', 'context_file']:
                if col in row and row[col]:
                    for old, new in OLD_TO_NEW.items():
                        if old in row[col]:
                            row[col] = row[col].replace(old, new)
            
            rows.append(row)
    
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    
    print(f"Updated {len(rows)} rows in module-help.csv")

if __name__ == '__main__':
    update_module_help('src/data/module-help.csv')
```

- [ ] **Step 3: Run update**

```bash
python3 scripts/update-module-help.py
```

- [ ] **Step 4: Verify updates**

```bash
grep "patterns-guide" src/data/module-help.csv | wc -l
```

- [ ] **Step 5: Commit**

```bash
git add src/data/module-help.csv scripts/update-module-help.py
git commit -m "refactor: update module-help.csv to use consolidated guides"
```

---

### Task 4.1: Update Extension Prompts

**Files:**
- Modify: `src/data/extensions/architect-bam.yaml`

- [ ] **Step 1: Read current extension**

```bash
cat src/data/extensions/architect-bam.yaml | head -50
```

- [ ] **Step 2: Update prompt references**

Change prompts from individual guides to consolidated guides with section anchors:

Before:
```yaml
- id: load-tenant-context-prompt
  content: |
    Read and internalize the BAM guide:
    `{project-root}/_bmad/bam/data/agent-guides/bam/tenant-isolation.md`
```

After:
```yaml
- id: load-tenant-context-prompt
  content: |
    Read and internalize the BAM tenant patterns guide:
    `{project-root}/_bmad/bam/data/agent-guides/bam/tenant-patterns-guide.md`
    
    Focus sections:
    - §Core Concepts - Tenant isolation overview
    - §BAM Conventions - Required naming standards
    - §Decision Framework - Choosing isolation model
    
    Load pattern registry:
    `{project-root}/_bmad/bam/data/bam-patterns.csv`
    Filter: category contains 'tenant'
```

- [ ] **Step 3: Manual verification for EACH extension prompt**

> **CRITICAL:** Before updating each prompt, verify the target guide contains the referenced sections.

For each prompt that references a consolidated guide:

| Check | Verification |
|-------|--------------|
| Guide exists | `ls src/data/agent-guides/bam/{guide-name}.md` |
| §Section exists | `grep "## §{section-name}" {guide-name}.md` |
| Content relevant | Read the section, verify it matches the prompt's purpose |

- [ ] **Step 4: Update all extensions with verification**

For each extension file in `src/data/extensions/`:
- `analyst-bam.yaml` - verify → update
- `architect-bam.yaml` - verify → update
- `dev-bam.yaml` - verify → update
- `pm-bam.yaml` - verify → update
- (continue for all 31 extensions)

Create verification log `_consolidation/extension-update-log.md`:
```markdown
# Extension Prompt Update Log

| Extension | Prompts Updated | Sections Verified | Issues Found |
|-----------|-----------------|-------------------|--------------|
| architect-bam.yaml | 12 | 12 ✓ | None |
| analyst-bam.yaml | 8 | 8 ✓ | None |
| ... | ... | ... | ... |
```

- [ ] **Step 5: Commit**

```bash
git add src/data/extensions/ _consolidation/extension-update-log.md
git commit -m "refactor: update extension prompts to use consolidated guides (verified)"
```

---

### Task 4.2: Archive Old Guide Files (Manual Verification)

> **CRITICAL:** Before archiving ANY file, verify its content has been preserved in consolidated guides. Do NOT archive files based on assumption.

**Time estimate:** 3 hours (233 files to verify)

**Files:**
- Move: Old individual guide files to `_archive/agent-guides/`

- [ ] **Step 1: Create archive directory**

```bash
mkdir -p _archive/agent-guides/bam
```

- [ ] **Step 2: Create pre-archive verification checklist**

For EACH file being archived, verify:

| File | Consolidated Into | Sections Preserved | Conventions Preserved | Safe to Archive |
|------|-------------------|-------------------|----------------------|-----------------|
| tenant-isolation.md | tenant-patterns-guide.md | §tenant-isolation ✓ | app.current_tenant ✓ | YES |
| tenant-lifecycle.md | tenant-patterns-guide.md | §tenant-lifecycle ✓ | - | YES |
| ... | ... | ... | ... | ... |

- [ ] **Step 3: Manual verification for EACH file**

For each file to be archived:

```markdown
## Archive Verification: {filename}

1. [ ] Read original file completely
2. [ ] Find corresponding §section in consolidated guide
3. [ ] Verify unique content is present:
   - [ ] Code blocks preserved
   - [ ] Tables preserved
   - [ ] Decision frameworks preserved
   - [ ] BAM conventions preserved
4. [ ] Note any content NOT migrated: ___
5. [ ] Safe to archive: YES / NO
```

- [ ] **Step 4: Move ONLY verified files**

```bash
# Only move files that passed verification
mv src/data/agent-guides/bam/{verified-file}.md _archive/agent-guides/bam/
```

- [ ] **Step 5: Create archive manifest with verification status**

Create `_archive/agent-guides/ARCHIVE-MANIFEST.md`:
```markdown
# Archive Manifest

Archived on: {date}
Verified by: {who}

## Archived Files

| Original File | Consolidated Into | Verification Status |
|---------------|-------------------|---------------------|
| tenant-isolation.md | tenant-patterns-guide.md | VERIFIED ✓ |
| ... | ... | ... |

## Files NOT Archived (Verification Failed)

| File | Reason | Action Needed |
|------|--------|---------------|
```

- [ ] **Step 6: Commit**

```bash
git add _archive/
git add src/data/agent-guides/bam/
git commit -m "chore: archive verified consolidated guides"
```

---

### Task 4.3: Run Full Test Suite

**Files:**
- All test files

- [ ] **Step 1: Run all tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 2: Verify guide count**

Run: `find src/data/agent-guides/bam -name "*-patterns-guide.md" | wc -l`
Expected: 25

- [ ] **Step 3: Verify pattern registry**

Run: `grep "patterns-guide.md" src/data/bam-patterns.csv | wc -l`
Expected: 193 (all patterns mapped)

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete BAM consolidation Phase 1-4"
```

---

## Phase 5: Add 110 New Patterns (Manual Research Approach)

> **CRITICAL METHODOLOGY:** New patterns must be RESEARCHED and DOCUMENTED manually. Do NOT use scripts with hardcoded pattern values. Each new pattern requires research to establish proper decision_criteria and web_queries.

**Phase 5 Time Estimate:** 25 hours (110 patterns × ~13 min each for research + documentation)

---

### Task 5.0: Pattern Research Template

> **MANDATORY:** Complete this template for EACH new pattern before adding to registry.

#### New Pattern Research Template

```markdown
## New Pattern Research: {pattern_id}

### 1. Pattern Identification
- **Pattern ID:** {kebab-case}
- **Pattern Name:** {Human Readable Name}
- **Category:** {existing category or new}
- **Phase:** {discovery|planning|foundation|solutioning|integration|production|anytime}

### 2. Research Conducted
- **Search queries used:**
  1. "{pattern-name} best practices 2026"
  2. "{pattern-name} implementation guide"
  3. "{related technology} {pattern-name}"
- **Sources found:**
  - {URL 1}: {summary}
  - {URL 2}: {summary}

### 3. Decision Criteria (researched, not invented)
- **When to use:** {specific conditions based on research}
- **When NOT to use:** {contraindications}
- **Trade-offs:** {pros/cons from research}

### 4. Web Queries for Registry
- Primary: "{researched query} {date}"
- Secondary: "{alternate query} {date}"

### 5. Consolidated Guide Placement
- **Guide:** {domain}-patterns-guide.md
- **Section anchor:** §{section-name}
- **Related patterns:** {list existing patterns this relates to}

### 6. §Section Content to Add
```markdown
## §{pattern-anchor}

### Pattern: {Pattern Name}

**When to use:** {decision_criteria from research}
**Variants:** {variants discovered}

#### Pattern Structure

{Code/structure from research}

#### Web Research

For current implementation details, search:
- "{web_query_1} {date}"
- "{web_query_2} {date}"
```
```

---

### Task 5.1: Manual Pattern Research and Addition

> **CRITICAL:** Do NOT use scripts with hardcoded pattern values. Each pattern must be individually researched.

**Files:**
- Modify: `src/data/bam-patterns.csv`

- [ ] **Step 1: Create pattern research tracker**

Create `_consolidation/new-pattern-research.md`:

```markdown
# New Pattern Research Tracker

## Research Progress

| Pattern ID | Status | Researched By | Date | Notes |
|------------|--------|---------------|------|-------|
| mcp-server-lifecycle | PENDING | | | |
| mcp-tool-discovery | PENDING | | | |
| ... | ... | ... | ... | ... |

## Patterns by Category

### MCP Patterns (18 new)
- [ ] mcp-server-lifecycle
- [ ] mcp-tool-discovery
- [ ] mcp-authentication
- [ ] mcp-federation
- [ ] ...

### RAG Patterns (20 new)
- [ ] rag-pipeline
- [ ] semantic-chunking
- [ ] hybrid-search
- [ ] reranking
- [ ] ...

### Enterprise Patterns (22 new)
- [ ] sso-integration
- [ ] soc2-compliance
- [ ] gdpr-patterns
- [ ] data-residency
- [ ] ...

### Scale Patterns (20 new)
- [ ] auto-scaling-agents
- [ ] geo-distribution
- [ ] white-label
- [ ] ...

### Integration Patterns (additional)
- [ ] a2a-protocol
- [ ] agent-delegation
- [ ] ...
```

- [ ] **Step 2: Research EACH pattern individually**

For each of the 110 new patterns:
1. Complete the Pattern Research Template
2. Web search to validate decision_criteria
3. Document sources and findings
4. Write §section content for consolidated guide

- [ ] **Step 3: Add patterns to CSV (manually)**

After research is complete for each pattern, manually add to CSV:

```csv
pattern_id,name,category,decision_criteria,web_queries,consolidated_guide,section_anchor,phase,...
mcp-server-lifecycle,MCP Server Lifecycle,mcp,"managing MCP server instances across tenant contexts","MCP server lifecycle management {date}",mcp-patterns-guide.md,mcp-server-lifecycle,integration,...
```

- [ ] **Step 4: Verify each pattern entry**

For each new pattern added:
- [ ] decision_criteria is specific and researched (not generic)
- [ ] web_queries will return relevant results
- [ ] consolidated_guide exists
- [ ] section_anchor will exist in guide

- [ ] **Step 5: Commit in batches by domain**

```bash
git add src/data/bam-patterns.csv _consolidation/new-pattern-research.md
git commit -m "feat: add {N} researched MCP patterns to registry"
```

---

### Task 5.1.1: Example Pattern Research (mcp-server-lifecycle)

> **Example of properly researched pattern:**

```markdown
## New Pattern Research: mcp-server-lifecycle

### 1. Pattern Identification
- **Pattern ID:** mcp-server-lifecycle
- **Pattern Name:** MCP Server Lifecycle
- **Category:** mcp
- **Phase:** integration

### 2. Research Conducted
- **Search queries used:**
  1. "MCP server lifecycle management 2026"
  2. "Model Context Protocol server patterns"
  3. "Claude MCP server best practices"
- **Sources found:**
  - Anthropic MCP docs: Server lifecycle events, startup/shutdown handling
  - Community patterns: Health checks, graceful degradation

### 3. Decision Criteria (researched)
- **When to use:** When deploying MCP servers that must handle tenant isolation, support graceful shutdown, or integrate with container orchestration
- **When NOT to use:** Simple single-tenant MCP setups, development environments
- **Trade-offs:** Added complexity vs operational reliability

### 4. Web Queries for Registry
- Primary: "MCP server lifecycle management multi-tenant {date}"
- Secondary: "Model Context Protocol server patterns {date}"

### 5. Consolidated Guide Placement
- **Guide:** mcp-patterns-guide.md
- **Section anchor:** §mcp-server-lifecycle
- **Related patterns:** mcp-tool-discovery, mcp-authentication
```

---

### Task 5.1.2: Batch Pattern Addition (with individual research)

For efficiency, research patterns in domain batches, but ensure EACH pattern is individually researched:

| Batch | Patterns | Research Time | CSV Addition |
|-------|----------|---------------|--------------|
| MCP batch | 18 patterns | 4h | Add after all 18 researched |
| RAG batch | 20 patterns | 4.5h | Add after all 20 researched |
| Enterprise batch | 22 patterns | 5h | Add after all 22 researched |
| Scale batch | 20 patterns | 4.5h | Add after all 20 researched |
| Integration batch | 30 patterns | 7h | Add after all 30 researched |

**DO NOT:**
- Copy/paste pattern values from old script
- Use generic decision_criteria like "handles X"
- Invent web_queries without testing they return results

**DO:**
- Actually search for each pattern's best practices
- Write decision_criteria that helps users decide when to use
- Test web_queries return relevant results

---

### Task 5.1-OLD-SCRIPT-REMOVED

The following Python script approach has been REMOVED in favor of manual research:

```
# REMOVED: scripts/add-new-patterns.py with hardcoded NEW_PATTERNS array
# Reason: Hardcoded patterns lack proper research, decision_criteria is generic
# Replaced with: Manual research template (Task 5.0) and individual pattern research
```
     'consolidated_guide': 'rag-patterns-guide.md', 'section_anchor': 'reranking', 'phase': 'solutioning',
     'decision_criteria': 'improving retrieval quality with reranking', 'web_queries': 'reranking models RAG {date}'},
    {'pattern_id': 'chain-of-thought', 'name': 'Chain-of-Thought', 'category': 'ai',
     'consolidated_guide': 'ai-runtime-patterns-guide.md', 'section_anchor': 'chain-of-thought', 'phase': 'solutioning',
     'decision_criteria': 'complex reasoning patterns', 'web_queries': 'chain of thought prompting {date}'},
    
    # Phase 4: Enterprise (22 patterns)
    {'pattern_id': 'sso-integration', 'name': 'SSO Integration', 'category': 'security',
     'consolidated_guide': 'security-patterns-guide.md', 'section_anchor': 'sso', 'phase': 'integration',
     'decision_criteria': 'enterprise single sign-on', 'web_queries': 'SAML OIDC SSO integration {date}'},
    {'pattern_id': 'soc2-compliance', 'name': 'SOC2 Compliance', 'category': 'governance',
     'consolidated_guide': 'governance-patterns-guide.md', 'section_anchor': 'soc2', 'phase': 'production',
     'decision_criteria': 'SOC2 certification requirements', 'web_queries': 'SOC2 compliance SaaS {date}'},
    {'pattern_id': 'gdpr-patterns', 'name': 'GDPR Patterns', 'category': 'governance',
     'consolidated_guide': 'governance-patterns-guide.md', 'section_anchor': 'gdpr', 'phase': 'production',
     'decision_criteria': 'GDPR compliance for AI systems', 'web_queries': 'GDPR AI compliance {date}'},
    {'pattern_id': 'data-residency', 'name': 'Data Residency', 'category': 'governance',
     'consolidated_guide': 'governance-patterns-guide.md', 'section_anchor': 'data-residency', 'phase': 'production',
     'decision_criteria': 'geographic data location requirements', 'web_queries': 'data residency multi-region {date}'},
    
    # Phase 5: Scale & Advanced (20 patterns)
    {'pattern_id': 'auto-scaling-agents', 'name': 'Auto-Scaling Agents', 'category': 'scaling',
     'consolidated_guide': 'scaling-patterns-guide.md', 'section_anchor': 'auto-scaling', 'phase': 'production',
     'decision_criteria': 'dynamic agent scaling', 'web_queries': 'auto scaling AI agents {date}'},
    {'pattern_id': 'geo-distribution', 'name': 'Geo Distribution', 'category': 'scaling',
     'consolidated_guide': 'scaling-patterns-guide.md', 'section_anchor': 'geo-distribution', 'phase': 'production',
     'decision_criteria': 'multi-region deployment', 'web_queries': 'multi-region AI deployment {date}'},
    {'pattern_id': 'white-label', 'name': 'White-Label Platform', 'category': 'platform',
     'consolidated_guide': 'architecture-patterns-guide.md', 'section_anchor': 'white-label', 'phase': 'production',
     'decision_criteria': 'multi-tenant branding', 'web_queries': 'white label SaaS architecture {date}'},
    
    # Add remaining patterns following the same structure...
]

def get_default_values():
    """Get default values for optional columns."""
    return {
        'signals': '',
        'intent': '',
        'variants': '',
        'decision_questions': '',
        'verification_gate': 'QG-M2',
        'dependencies': '',
        'conflicts': '',
        'skill_level_notes': '',
        'related_fragments': '',
    }

def add_patterns(csv_path, patterns):
    """Add new patterns to CSV."""
    
    # Read existing patterns
    existing = {}
    fieldnames = None
    
    with open(csv_path, 'r', newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        for row in reader:
            existing[row['pattern_id']] = row
    
    # Ensure new columns exist
    new_cols = ['consolidated_guide', 'section_anchor', 'phase']
    for col in new_cols:
        if col not in fieldnames:
            fieldnames = list(fieldnames) + [col]
    
    # Add new patterns
    defaults = get_default_values()
    added = 0
    skipped = 0
    
    for pattern in patterns:
        if pattern['pattern_id'] in existing:
            print(f"  SKIP: {pattern['pattern_id']} (already exists)")
            skipped += 1
            continue
        
        # Merge with defaults
        row = {**defaults, **pattern}
        existing[pattern['pattern_id']] = row
        added += 1
        print(f"  ADD: {pattern['pattern_id']}")
    
    # Write back
    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in existing.values():
            # Ensure all fieldnames have values
            for fn in fieldnames:
                if fn not in row:
                    row[fn] = ''
            writer.writerow(row)
    
    print(f"\nAdded {added} new patterns, skipped {skipped} existing")
    print(f"Total patterns: {len(existing)}")

if __name__ == '__main__':
    csv_path = sys.argv[1] if len(sys.argv) > 1 else 'src/data/bam-patterns.csv'
    add_patterns(csv_path, NEW_PATTERNS)
```

- [ ] **Step 2: Run pattern addition**

```bash
python3 scripts/add-new-patterns.py src/data/bam-patterns.csv
```

- [ ] **Step 3: Verify pattern count**

Run: `wc -l src/data/bam-patterns.csv`
Expected: 304+ (193 existing + 110 new + 1 header)

- [ ] **Step 4: Run tests**

```bash
npm test -- test/consolidation-columns.test.js
```

- [ ] **Step 5: Commit**

```bash
git add src/data/bam-patterns.csv scripts/add-new-patterns.py
git commit -m "feat: add 110 new patterns to consolidated registry"
```

---

### Task 5.2: Update Domain Guides with New Pattern Sections

**Files:**
- Modify: All 25 domain guides

For each new pattern added to the registry, ensure the corresponding §section exists in its domain guide:

- [ ] **Step 1: Identify missing sections**

```bash
# Check which section_anchors don't have corresponding §sections
python3 -c "
import csv
import os

with open('src/data/bam-patterns.csv', 'r') as f:
    reader = csv.DictReader(f)
    missing = []
    for row in reader:
        guide = row.get('consolidated_guide', '')
        anchor = row.get('section_anchor', '')
        if guide and anchor:
            guide_path = f'src/data/agent-guides/bam/{guide}'
            if os.path.exists(guide_path):
                with open(guide_path, 'r') as g:
                    if f'## §{anchor}' not in g.read():
                        missing.append((guide, anchor))
    
    print(f'Missing {len(missing)} sections:')
    for guide, anchor in missing[:20]:
        print(f'  {guide}: §{anchor}')
"
```

- [ ] **Step 2: Add missing sections to guides**

For each missing section, add a placeholder:

```markdown
## §{section-anchor}

### Pattern: {Pattern Name}

**When to use:** {decision_criteria from registry}
**Variants:** {variants from registry}

#### Implementation

{To be detailed - search: "{web_query}"}

#### Web Research

For current implementation details, search:
- "{web_query_from_registry}"
```

- [ ] **Step 3: Commit**

```bash
git add src/data/agent-guides/bam/
git commit -m "feat: add section anchors for new patterns"
```

---

### Task 5.3: Final Validation

- [ ] **Step 1: Run all tests**

```bash
npm test
```

- [ ] **Step 2: Verify file counts**

```bash
echo "Domain guides:"
find src/data/agent-guides/bam -name "*-guide.md" | wc -l
# Expected: 25

echo "Pattern count:"
tail -n +2 src/data/bam-patterns.csv | wc -l
# Expected: 303+

echo "Workflows:"
find src/workflows -name "bmad-bam-*" -type d | wc -l
# Expected: 40
```

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "feat: complete BAM consolidation with 110 new patterns"
```

---

## Validation Checklist

### Phase 1 Complete

- [ ] Pattern registry has `consolidated_guide` column
- [ ] Pattern registry has `section_anchor` column
- [ ] Pattern registry has `phase` column
- [ ] All 193 patterns have values in new columns
- [ ] DOMAIN_MAP covers all category prefixes

### Phase 2 Complete

- [ ] 25 domain guides created
- [ ] All guides have required sections (Core Concepts, BAM Conventions, etc.)
- [ ] All BAM conventions preserved verbatim
- [ ] All guides have §section anchors
- [ ] All guides have web research queries with `{date}`
- [ ] File Analysis Templates completed for all source files (manual consolidation)
- [ ] Consolidation Maps documented for each domain
- [ ] Line count reduction verified (20-40% from duplicate elimination)

### Phase 3 Complete

- [ ] Rollback script created and tested
- [ ] 40 composite workflows created
- [ ] All workflows have CEV structure (Create/Edit/Validate)
- [ ] All step files reference consolidated guides
- [ ] All step files reference pattern registry
- [ ] Workflow-guide dependency validation passes
- [ ] Cross-reference validation passes

### Phase 4 Complete

- [ ] module-help.csv updated
- [ ] Extension prompts updated
- [ ] Old files archived
- [ ] Full test suite passes
- [ ] File count reduced by 85%

### Phase 5 Complete

- [ ] 110 new patterns added to registry
- [ ] All new patterns have section anchors in guides
- [ ] Pattern count verified (303+)
- [ ] All validation tests pass

---

## Summary

> **METHODOLOGY v4.0:** ALL consolidation phases now use MANUAL analysis and verification. No scripts for content extraction, pattern addition, or archive decisions. Scripts are only used for validation tests and file operations (mkdir, mv, git).

| Phase | Tasks | Estimated Time | Method |
|-------|-------|----------------|--------|
| Phase 1 | 5 tasks (backup + columns + verify + inventory + conventions) | **9 hours** | **Manual verification** |
| Phase 2 | 29 tasks (template + 25 domains + validation) | **35 hours** | **Manual consolidation** |
| Phase 3 | 50+ tasks (analysis + rollback + 40 workflows + validation) | **30 hours** | **Manual workflow analysis** |
| Phase 4 | 4 tasks (module-help + extensions + archive + test) | **11 hours** | **Manual verification** |
| Phase 5 | 3 tasks (research + add patterns + validate) | **25 hours** | **Manual pattern research** |
| **Total** | **91+ tasks** | **~110 hours** | **Fully Manual** |

---

## Methodology Overview

| Phase | What's Manual | Why Manual |
|-------|---------------|------------|
| Phase 1 | Pattern-to-guide mapping verification | Script may mis-assign patterns |
| Phase 2 | File-by-file content analysis | Quality variance detection |
| Phase 3 | Workflow overlap analysis | Determine which workflows merge |
| Phase 4 | Extension and archive verification | Prevent content loss |
| Phase 5 | Pattern research and documentation | Hardcoded values lack proper research |

---

## Risk Mitigation Summary

| Risk | Mitigation | Recovery |
|------|------------|----------|
| Content loss | Git branches, archive directory, **manual pre-archive verification** | Rollback script |
| Quality variance missed | **File Analysis Template (5-question checklist)** | Re-analyze source files |
| Richer content discarded | **Consolidation Rules (keep richer version)** | Restore from source |
| Pattern mis-assignment | **Manual pattern-to-guide verification (Task 1.2.1)** | Correct CSV mappings |
| Workflow merge errors | **Workflow Analysis Template (Task 3.0.0)** | Keep original workflows |
| Extension broken refs | **Manual §section verification (Task 4.1)** | Fix before commit |
| Archive without verification | **Pre-archive verification checklist (Task 4.2)** | Don't archive unverified |
| Generic pattern values | **Pattern Research Template (Task 5.0)** | Research each pattern |
| Missing conventions | **BAM Conventions Checklist (Task 1.5)** | Verify per guide |
| Regression | Full test suite at each phase | Rollback to previous commit |

---

## Files Created/Modified Summary

| Category | Count | Action |
|----------|-------|--------|
| Domain guides | 25 | CREATE (manual consolidation) |
| Composite workflows | 40 | CREATE (after manual analysis) |
| Pattern CSV columns | 3 | MODIFY + VERIFY |
| New patterns | 110 | ADD (manual research) |
| Scripts | 2 | CREATE (rollback, validation only) |
| Tests | 4 | CREATE |
| Extensions | 31 | MODIFY + VERIFY |
| Archived files | ~230 | ARCHIVE (after verification) |
| Analysis documents | ~10 | CREATE (consolidation maps, checklists) |

---

**Plan Status:** COMPLETE (Fully Manual Consolidation)
**Plan Version:** 4.0
**Gaps Addressed:** All 8 identified gaps addressed

**Key Changes in v4.0:**
- **Phase 1:** Added Task 1.2.1 (Manual Pattern-to-Guide Verification), Task 1.4 (Pre-Consolidation Inventory), Task 1.5 (BAM Conventions Checklist)
- **Phase 2:** Retained manual consolidation from v3.0
- **Phase 3:** Added Task 3.0.0 (Workflow Analysis Template), Task 3.0.1 (Workflow Consolidation Map), Task 3.0.2 (Workflow Consolidation Rules)
- **Phase 4:** Added manual verification to Task 4.1 (Extension §section verification) and Task 4.2 (Pre-archive verification)
- **Phase 5:** Replaced script-based pattern addition with Task 5.0 (Pattern Research Template) and individual pattern research
- **Time estimate:** ~70h → ~110h (quality over speed, but reduced risk)

**Scripts REMOVED:**
- ❌ `scripts/extract-guide-content.py` - Replaced with File Analysis Template
- ❌ `scripts/add-new-patterns.py` - Replaced with Pattern Research Template

**Scripts KEPT (validation/operations only):**
- ✓ `scripts/add-consolidation-columns.py` - Column addition only, values verified manually
- ✓ `scripts/rollback-consolidation.sh` - Safety mechanism

---

**Next Action:** Choose execution method:
1. **Subagent-Driven (recommended)** - Fresh subagent per task, review between tasks
2. **Inline Execution** - Batch execution with checkpoints
