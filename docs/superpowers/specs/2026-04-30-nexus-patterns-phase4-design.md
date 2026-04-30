# NEXUS Patterns Phase 4 (Final) - Complete Gap Coverage

> **For agentic workers:** This spec covers ALL remaining TRUE gaps from the 110-pattern gap analysis after deduplication.

**Goal:** Add 61 patterns to complete BAM V2's pattern library from 45 to 106, covering MCP Integration, Agent Communication, RAG/Knowledge, Advanced AI, Enterprise Compliance, and Scale/Platform.

**Architecture:** Hybrid TOML distribution using existing TOMLs where appropriate + 2 new specialized TOMLs (MCP, RAG). Mixed QG approach with 3 new targeted quality gates.

**Tech Stack:** Markdown patterns with YAML frontmatter, CSV registry entries with {date} web queries, TOML menu entries, domain file references.

---

## Pre-requisite: Fix Existing Shortcode Bugs

**CRITICAL:** These shortcode duplications MUST be fixed before Phase 4 implementation:

| Bug | File 1 | File 2 | Fix |
|-----|--------|--------|-----|
| ZDV duplicate | ai-discovery.md | decision-verification.md | Change ai-discovery.md → **ZAD** |
| ZGV duplicate | ai-verification.md | grounding-verifier.md | Change ai-verification.md → **ZAV** |
| ZCI duplicate | compliance-checkpoint.md | context-injection.md | Change context-injection.md → **ZCX** |

After fixes, update CSV entries and any TOML references.

---

## Deduplication Analysis

### Patterns Already Covered (SKIP - 16 patterns)

These patterns from the original gap analysis are **fully covered** by existing patterns:

| Gap Pattern | Existing Coverage | Existing File |
|-------------|-------------------|---------------|
| Tool Versioning | Full | tool-schema-versioning.md (ZTV) |
| Agent Delegation | Full | agent-handoff-protocol.md (ZAH) |
| Multi-Agent Coordination | Full | agent-orchestration.md (ZAO) |
| Agent Discovery | Full | ai-discovery.md (ZAD) |
| RAG Evaluation | Full | ai-verification.md (ZAV) |
| Citation Management | Full | ai-verification.md (ZAV) |
| Retrieval Quality | Full | ai-verification.md (ZAV) |
| Reranking Patterns | Full | ai-verification.md (ZAV) |
| Multi-Turn Memory | Full | state-management.md (ZSS) |
| Audit Trail | Full | audit-event-schema.md (ZAS) |
| Key Rotation | Full | secrets-management.md (ZSM) |
| Breach Response | Full | incident-response.md (ZIR) |
| Horizontal Scaling | Full | scaling-readiness.md |
| Cost Optimization | Full | provider-management.md (ZPV) |
| Capacity Planning | Full | capacity-forecasting.md (ZCA) |
| Agent Rollback | Full | state-management.md (ZSS) |

### Patterns to Merge (2 patterns)

| Gap Pattern | Merge Into | Rationale |
|-------------|------------|-----------|
| Encryption Management | secrets-management.md (ZSM) | Add key management section |
| Multi-Region Failover | disaster-recovery.md (ZDR) | Add failover section |

---

## Current State

| Asset | Before Phase 4 | After Phase 4 |
|-------|----------------|---------------|
| Pattern files | 45 | 106 |
| TOML files | 12 | 14 |
| Domain files | 16 | 18 |
| Quality gates | ~30 | ~33 |

### Existing Shortcodes (Reserved - 46 after bug fixes)

These shortcodes are already in use and MUST NOT be reused:
```
ZAD*, ZAG, ZAH, ZAO, ZAS, ZAV*, ZAX, ZBL, ZCA, ZCB, ZCI, ZCN, ZCX*, 
ZDP, ZDR, ZDV, ZFC, ZFD, ZGV, ZIC, ZIF, ZIR, ZKS, ZLG, ZMS, ZOB, 
ZOD, ZOS, ZPD, ZPV, ZRE, ZRL, ZRT, ZRX, ZSD, ZSF, ZSL, ZSM, ZSO, 
ZSS, ZTI, ZTQ, ZTR, ZTS, ZTV, ZZT

* = New after bug fixes
```

---

## Phase 4 Pattern Categories

### Category 1: MCP Integration (10 patterns)

| Pattern | Shortcode | Description | Domain | TOML |
|---------|-----------|-------------|--------|------|
| mcp-server-lifecycle | ZML | Server registration, health, versioning | mcp.md | bmad-agent-mcp.toml |
| mcp-tool-discovery | ZMD | Dynamic tool capability enumeration | mcp.md | bmad-agent-mcp.toml |
| mcp-tenant-isolation | ZMT | Tenant-scoped MCP contexts | mcp.md | bmad-agent-mcp.toml |
| tool-permission-model | ZTP | Granular tool access per role/tier | mcp.md | bmad-agent-mcp.toml |
| mcp-federation | ZMF | Cross-server MCP orchestration | mcp.md | bmad-agent-mcp.toml |
| mcp-result-caching | ZMC | Tenant-aware tool result caching | mcp.md | bmad-agent-mcp.toml |
| mcp-authentication | ZMA | Server auth patterns | mcp.md | bmad-agent-mcp.toml |
| mcp-schema-validation | ZMV | Tool schema validation | mcp.md | bmad-agent-mcp.toml |
| a2a-protocol | ZA2 | Agent-to-agent communication | mcp.md | bmad-agent-mcp.toml |
| mcp-rate-limiting | ZMR | Per-server tenant limits | mcp.md | bmad-agent-mcp.toml |

### Category 2: Agent Communication (4 patterns)

*Note: 4 patterns removed - already covered by agent-handoff-protocol.md (ZAH), agent-orchestration.md (ZAO), ai-discovery.md (ZAD), state-management.md (ZSS)*

| Pattern | Shortcode | Description | Domain | TOML |
|---------|-----------|-------------|--------|------|
| agent-negotiation | ZAN | Multi-agent agreement protocols | ai-runtime.md | bmad-agent-architect.toml |
| cross-tenant-agent | ZXA | Federated agent patterns | ai-runtime.md | bmad-agent-architect.toml |
| event-driven-agents | ZEA | Event-based orchestration | ai-runtime.md | bmad-agent-architect.toml |
| agent-marketplace | ZAM | Agent registry/store | ai-runtime.md | bmad-agent-architect.toml |

### Category 3: RAG/Knowledge (11 patterns)

*Note: 4 patterns removed - already covered by ai-verification.md (ZAV) and state-management.md (ZSS)*

| Pattern | Shortcode | Description | Domain | TOML |
|---------|-----------|-------------|--------|------|
| rag-pipeline | ZRP | End-to-end RAG orchestration | rag.md | bmad-agent-rag.toml |
| vector-store-multi-tenant | ZVS | Tenant-isolated vector indexes | rag.md | bmad-agent-rag.toml |
| semantic-chunking | ZSC | Context-aware document splitting | rag.md | bmad-agent-rag.toml |
| hybrid-search | ZHS | Vector + keyword fusion | rag.md | bmad-agent-rag.toml |
| knowledge-graph | ZKG | Graph-based knowledge storage | rag.md | bmad-agent-rag.toml |
| embedding-lifecycle | ZEL | Embedding model lifecycle | rag.md | bmad-agent-rag.toml |
| context-compilation | ZCC | Context assembly patterns | rag.md | bmad-agent-rag.toml |
| context-window-optimization | ZCW | Token budget management | rag.md | bmad-agent-rag.toml |
| index-management | ZIM | Index lifecycle patterns | rag.md | bmad-agent-rag.toml |
| query-transformation | ZQT | Query rewriting patterns | rag.md | bmad-agent-rag.toml |
| streaming-rag | ZSR | Real-time retrieval | rag.md | bmad-agent-rag.toml |

### Category 4: Advanced AI Patterns (6 patterns)

| Pattern | Shortcode | Description | Domain | TOML |
|---------|-----------|-------------|--------|------|
| prompt-chaining | ZPC | Multi-step prompt orchestration | ai-runtime.md | bmad-agent-architect.toml |
| chain-of-thought | ZCT | Reasoning patterns | ai-runtime.md | bmad-agent-architect.toml |
| self-correction | ZSE | Auto-correction patterns | ai-runtime.md | bmad-agent-architect.toml |
| multi-modal-rag | ZMM | Images/docs/code RAG | rag.md | bmad-agent-rag.toml |
| knowledge-refresh | ZKR | Stale knowledge detection | rag.md | bmad-agent-rag.toml |
| fine-tuning-pipeline | ZFT | Custom model training workflow | ai-runtime.md | bmad-agent-architect.toml |

### Category 5: Enterprise Compliance (18 patterns)

*Note: 3 patterns removed - audit-trail covered by audit-event-schema.md (ZAS), breach-response covered by incident-response.md (ZIR), key-rotation covered by secrets-management.md (ZSM). Encryption-management merged into secrets-management.md.*

| Pattern | Shortcode | Description | Domain | TOML |
|---------|-----------|-------------|--------|------|
| sso-integration | ZSI | SAML/OIDC patterns | security.md | bmad-agent-security.toml |
| agent-rbac | ZRB | Role-based agent access | security.md | bmad-agent-security.toml |
| tenant-rbac | ZTR | Tenant role management | security.md | bmad-agent-security.toml |
| data-residency | ZDY | Geographic data controls | compliance.md | bmad-agent-compliance.toml |
| consent-management | ZCN | User consent tracking | compliance.md | bmad-agent-compliance.toml |
| data-retention | ZDT | Retention policy enforcement | compliance.md | bmad-agent-compliance.toml |
| anonymization | ZAY | PII anonymization patterns | compliance.md | bmad-agent-compliance.toml |
| right-to-deletion | ZRD | GDPR deletion workflows | compliance.md | bmad-agent-compliance.toml |
| export-portability | ZEP | Data export patterns | compliance.md | bmad-agent-compliance.toml |
| compliance-reporting | ZCR | Audit report generation | compliance.md | bmad-agent-compliance.toml |
| data-classification | ZDC | Sensitivity labeling | compliance.md | bmad-agent-compliance.toml |
| access-reviews | ZAW | Periodic access reviews | compliance.md | bmad-agent-compliance.toml |
| privacy-by-design | ZPB | Privacy-first architecture | compliance.md | bmad-agent-compliance.toml |
| vendor-management | ZVM | Third-party risk assessment | compliance.md | bmad-agent-compliance.toml |
| soc2-compliance | ZS2 | SOC2 control mapping | compliance.md | bmad-agent-compliance.toml |
| hipaa-compliance | ZHC | HIPAA compliance patterns | compliance.md | bmad-agent-compliance.toml |
| pci-dss-compliance | ZPX | PCI-DSS compliance | compliance.md | bmad-agent-compliance.toml |
| gdpr-compliance | ZGD | GDPR compliance patterns | compliance.md | bmad-agent-compliance.toml |

### Category 6: Scale/Platform (12 patterns)

*Note: 4 patterns removed - horizontal-scaling and auto-scaling covered by scaling-readiness.md, cost-optimization covered by provider-management.md (ZPV), capacity-planning covered by capacity-forecasting.md (ZCA). Multi-region-failover merged into disaster-recovery.md (ZDR).*

| Pattern | Shortcode | Description | Domain | TOML |
|---------|-----------|-------------|--------|------|
| vertical-scaling | ZVT | Scale-up patterns | scaling.md | bmad-agent-devops.toml |
| geo-distribution | ZGE | Multi-region deployment | scaling.md | bmad-agent-devops.toml |
| edge-deployment | ZED | Edge inference patterns | scaling.md | bmad-agent-devops.toml |
| load-balancing | ZLB | Traffic distribution patterns | scaling.md | bmad-agent-devops.toml |
| caching-strategies | ZCG | Multi-tier caching | caching.md | bmad-agent-architect.toml |
| usage-analytics | ZUA | Usage tracking patterns | observability.md | bmad-agent-devops.toml |
| predictive-scaling | ZPS | ML-based scaling | scaling.md | bmad-agent-devops.toml |
| performance-profiling | ZPF | Performance analysis | observability.md | bmad-agent-devops.toml |
| white-label-platform | ZWL | Tenant branding infrastructure | customization.md | bmad-agent-architect.toml |
| reseller-model | ZRM | Partner management | billing.md | bmad-agent-data.toml |
| api-monetization | ZAI | API usage billing | billing.md | bmad-agent-data.toml |
| plugin-architecture | ZPA | Extensibility patterns | platform.md | bmad-agent-architect.toml |

---

## Summary Counts

| Category | Count |
|----------|-------|
| MCP Integration | 10 |
| Agent Communication | 4 |
| RAG/Knowledge | 11 |
| Advanced AI | 6 |
| Enterprise Compliance | 18 |
| Scale/Platform | 12 |
| **Total New Patterns** | **61** |
| **Total Patterns (45 + 61)** | **106** |
| Skipped (already covered) | 16 |
| Merged into existing | 2 |

---

## New TOML Files (2)

### 1. bmad-agent-mcp.toml

```toml
# MCP Integration capabilities
[agent]
activation_steps_append = [
  "BAM MCP Integration available. Use ZML for server lifecycle.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
  "file:{project-root}/_bmad/bam/data/domains/mcp.md",
]

principles = [
  "BAM MCP: All tool access is tenant-scoped.",
  "BAM Gates: QG-MCP1 (MCP Integration).",
]

[[agent.menu]]
code = "ZML"
description = "MCP Server Lifecycle: registration, health, versioning"
skill = "bmad-bam-mcp-server-lifecycle"

[[agent.menu]]
code = "ZMD"
description = "MCP Tool Discovery: capability enumeration"
prompt = "Load: {project-root}/_bmad/bam/data/patterns/mcp-tool-discovery.md"

# ... (8 more menu entries for MCP patterns)
```

### 2. bmad-agent-rag.toml

```toml
# RAG/Knowledge capabilities
[agent]
activation_steps_append = [
  "BAM RAG capabilities available. Use ZRP for RAG pipeline.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
  "file:{project-root}/_bmad/bam/data/domains/rag.md",
]

principles = [
  "BAM RAG: All knowledge stores are tenant-isolated.",
  "BAM Gates: QG-RAG1 (RAG Quality).",
]

[[agent.menu]]
code = "ZRP"
description = "RAG Pipeline: end-to-end retrieval orchestration"
skill = "bmad-bam-rag-pipeline"

[[agent.menu]]
code = "ZVS"
description = "Vector Store Multi-tenant: isolated indexes"
prompt = "Load: {project-root}/_bmad/bam/data/patterns/vector-store-multi-tenant.md"

# ... (13 more menu entries for RAG patterns)
```

---

## New Domain Files (2)

### 1. mcp.md

```markdown
# MCP Integration - BAM Domain Context

**Loaded by:** ZML, ZMD, ZMT  
**Related Workflows:** bmad-bam-mcp-integration, bmad-bam-tool-orchestration

---

## Overview

MCP (Model Context Protocol) provides standardized tool integration for AI agents.

## Core Concepts

### Server Lifecycle
| Phase | Actions | Tenant Considerations |
|-------|---------|----------------------|
| Registration | Capability declaration | Tenant-scoped registration |
| Health | Heartbeat monitoring | Per-tenant health tracking |
| Versioning | Schema evolution | Tenant migration coordination |

## Related Patterns

- `{project-root}/_bmad/bam/data/patterns/mcp-server-lifecycle.md`
- `{project-root}/_bmad/bam/data/patterns/mcp-tool-discovery.md`
- `{project-root}/_bmad/bam/data/patterns/mcp-tenant-isolation.md`

## Web Research

- "MCP Model Context Protocol patterns {date}"
- "multi-tenant tool orchestration {date}"
```

### 2. rag.md

```markdown
# RAG/Knowledge - BAM Domain Context

**Loaded by:** ZRP, ZVS, ZSC  
**Related Workflows:** bmad-bam-rag-pipeline, bmad-bam-knowledge-management

---

## Overview

RAG (Retrieval-Augmented Generation) patterns for multi-tenant knowledge systems.

## Core Concepts

### Vector Store Isolation
| Model | Isolation | Performance | Cost |
|-------|-----------|-------------|------|
| Index-per-tenant | Full | Optimal | High |
| Namespace | Good | Good | Medium |
| Metadata filter | Basic | Varies | Low |

## Related Patterns

- `{project-root}/_bmad/bam/data/patterns/rag-pipeline.md`
- `{project-root}/_bmad/bam/data/patterns/vector-store-multi-tenant.md`
- `{project-root}/_bmad/bam/data/patterns/semantic-chunking.md`

## Web Research

- "RAG multi-tenant vector store patterns {date}"
- "semantic chunking best practices {date}"
```

---

## New Quality Gates (3)

### QG-MCP1: MCP Integration Gate

**Purpose:** Verify MCP server integration meets multi-tenant requirements.

**Critical Checks:**
- [ ] All MCP servers register with tenant context
- [ ] Tool discovery returns tenant-scoped capabilities
- [ ] No cross-tenant tool access possible

**Standard Checks:**
- [ ] Server health monitoring configured
- [ ] Protocol version negotiation implemented
- [ ] Error recovery patterns in place

### QG-RAG1: RAG Quality Gate

**Purpose:** Verify RAG pipeline meets quality and isolation requirements.

**Critical Checks:**
- [ ] Vector store has tenant isolation
- [ ] No cross-tenant retrieval possible
- [ ] Citation tracking implemented

**Standard Checks:**
- [ ] Chunking strategy documented
- [ ] Embedding versioning in place
- [ ] Retrieval quality metrics defined

### QG-ENT1: Enterprise Compliance Gate

**Purpose:** Verify enterprise compliance patterns are properly implemented.

**Critical Checks:**
- [ ] Audit trail captures all sensitive operations
- [ ] Data residency controls enforced
- [ ] Encryption at rest and in transit

**Standard Checks:**
- [ ] Consent management workflow documented
- [ ] Data retention policies configured
- [ ] Compliance reporting automated

---

## Pattern File Template

All 61 patterns will follow this structure:

```yaml
---
name: pattern-name
shortcode: ZXX
category: category-name
version: 1.0.0
domain: domain-file.md
toml: bmad-agent-xxx.toml
qg_alignment: QG-XXX
web_queries:
  - "pattern topic multi-tenant {date}"
  - "pattern topic best practices {date}"
---

# Pattern Name

## Overview

Brief description of the pattern and its multi-tenant relevance.

## When to Use

| Scenario | Recommendation | Rationale |
|----------|----------------|-----------|
| scenario 1 | use/avoid | why |

## Multi-Tenant Considerations

Key tenant isolation requirements for this pattern.

## Decision Matrix

| Factor | Option A | Option B |
|--------|----------|----------|
| factor | choice | choice |

## Related Patterns

- `pattern-a.md` - relationship
- `pattern-b.md` - relationship

## Web Research

- "topic multi-tenant patterns {date}"
- "topic best practices {date}"
```

---

## CSV Registry Updates

Add 61 rows to `src-v2/data/bam-patterns.csv`:

```csv
pattern_id,name,shortcode,category,domain,toml,qg_alignment,web_queries
mcp-server-lifecycle,MCP Server Lifecycle,ZML,mcp,mcp.md,bmad-agent-mcp.toml,QG-MCP1,"MCP server lifecycle patterns {date};model context protocol {date}"
mcp-tool-discovery,MCP Tool Discovery,ZMD,mcp,mcp.md,bmad-agent-mcp.toml,QG-MCP1,"MCP tool discovery patterns {date}"
...
```

---

## Test Updates

### file-counts.test.js

```javascript
test('106 pattern files exist (after Phase 4)', () => {
  const patterns = fs.readdirSync(patternsDir).filter(f =>
    f.endsWith('.md') && !f.startsWith('.')
  );
  expect(patterns.length).toBe(106);
});
```

### pattern-standards.test.js

```javascript
test('106 pattern files exist (after NEXUS Phase 4)', () => {
  const patterns = fs.readdirSync(patternsDir).filter(f =>
    f.endsWith('.md') && !f.startsWith('.')
  );
  // 21 base + 6 Phase 1 + 9 Phase 2 + 9 Phase 3 + 61 Phase 4 = 106
  expect(patterns.length).toBe(106);
});
```

---

## Domain Updates

### Existing Domains to Update

| Domain | New References |
|--------|----------------|
| ai-runtime.md | Agent Communication (4), Advanced AI (6) |
| security.md | sso-integration, agent-rbac, tenant-rbac |
| compliance.md | 15 Enterprise patterns |
| observability.md | performance-profiling, usage-analytics |
| billing.md | api-monetization, reseller-model |
| caching.md | caching-strategies |
| customization.md | white-label-platform |
| platform.md | plugin-architecture |

### New Domains

| Domain | Pattern Count |
|--------|---------------|
| mcp.md | 10 |
| rag.md | 11 |
| scaling.md | 8 |
| platform.md | 1 |

---

## TOML Distribution

| TOML | New Patterns | Total |
|------|--------------|-------|
| bmad-agent-mcp.toml (NEW) | 10 | 10 |
| bmad-agent-rag.toml (NEW) | 17 | 17 |
| bmad-agent-architect.toml | 7 | 7 |
| bmad-agent-compliance.toml | 15 | 15 |
| bmad-agent-security.toml | 3 | 3 |
| bmad-agent-devops.toml | 7 | 7 |
| bmad-agent-data.toml | 2 | 2 |
| **Total** | **61** | **61** |

---

## 6-Point Anti-Decay Checklist

For each of the 61 patterns:

- [ ] **CSV Entry:** Add row to `bam-patterns.csv` with `web_queries` containing `{date}`
- [ ] **Pattern .md:** Create file with YAML frontmatter (no implementation code)
- [ ] **TOML Menu:** Add menu entry to appropriate TOML
- [ ] **Domain Reference:** Update domain file's Related Patterns section
- [ ] **QG Alignment:** Map to appropriate quality gate
- [ ] **Schema Compliance:** Follow `bam_controlled: true` schema

---

## Implementation Order

### Batch 0: Fix Shortcode Bugs (PRE-REQUISITE)
Files: Fix ZDV, ZGV, ZCI duplicates in existing patterns, update CSV entries

### Batch 1: MCP Integration (10 patterns)
Files: Create `mcp.md` domain, `bmad-agent-mcp.toml`, 10 pattern files

### Batch 2: RAG/Knowledge (11 patterns)
Files: Create `rag.md` domain, `bmad-agent-rag.toml`, 11 pattern files

### Batch 3: Agent Communication (4 patterns)
Files: Update `ai-runtime.md`, add to `bmad-agent-architect.toml`, 4 pattern files

### Batch 4: Advanced AI (6 patterns)
Files: Update `ai-runtime.md` and `rag.md`, add to architect/rag TOMLs, 6 pattern files

### Batch 5: Enterprise Compliance (18 patterns)
Files: Update `compliance.md`, `security.md`, add to compliance/security TOMLs, 18 pattern files

### Batch 6: Scale/Platform (12 patterns)
Files: Create `scaling.md`, `platform.md`, update existing domains, add to devops TOML, 12 pattern files

### Batch 7: Merge Patterns into Existing
Files: Add encryption-management section to secrets-management.md, add multi-region-failover section to disaster-recovery.md

### Batch 8: Test Updates & Validation
Files: Update test files, run full test suite

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Large batch causes merge conflicts | Create PR per batch, merge sequentially |
| Shortcode conflicts | All shortcodes verified against existing 46 (after bug fixes) |
| Test failures | Update test expectations before pattern creation |
| Domain file bloat | Keep domain files focused, use pattern references |
| Existing shortcode bugs | Fix ZDV/ZGV/ZCI duplicates in Batch 0 before proceeding |

---

## Success Criteria

1. **Shortcode bugs fixed** - ZDV, ZGV, ZCI duplicates resolved
2. All 61 pattern files created with correct YAML frontmatter
3. All 61 CSV entries added with {date} web queries
4. Both new TOML files created with all menu entries
5. All 4 new domain files created
6. 3 new quality gate checklists created
7. 2 patterns merged into existing files
8. All tests pass (106 patterns expected)
9. No shortcode conflicts
