# NEXUS Patterns Phase 4 (Final) - Complete Gap Coverage

> **For agentic workers:** This spec covers ALL remaining patterns from the 110-pattern gap analysis.

**Goal:** Add 70 patterns to complete BAM V2's pattern library from 45 to 115, covering MCP Integration, Agent Communication, RAG/Knowledge, Advanced AI, Enterprise Compliance, and Scale/Platform.

**Architecture:** Hybrid TOML distribution using existing TOMLs where appropriate + 2 new specialized TOMLs (MCP, RAG). Mixed QG approach with 3 new targeted quality gates.

**Tech Stack:** Markdown patterns with YAML frontmatter, CSV registry entries with {date} web queries, TOML menu entries, domain file references.

---

## Current State

| Asset | Before Phase 4 | After Phase 4 |
|-------|----------------|---------------|
| Pattern files | 45 | 115 |
| TOML files | 12 | 14 |
| Domain files | 16 | 18 |
| Quality gates | ~30 | ~33 |

### Existing Shortcodes (Reserved)

These shortcodes are already in use and MUST NOT be reused:
```
ZAG, ZAH, ZAO, ZAS, ZAX, ZBL, ZCA, ZCB, ZCI, ZCN, ZDP, ZDR, ZDV, 
ZFC, ZFD, ZGV, ZIC, ZIF, ZIR, ZKS, ZLG, ZMS, ZOB, ZOD, ZOS, ZPD, 
ZPV, ZRE, ZRL, ZRT, ZRX, ZSD, ZSF, ZSL, ZSM, ZSO, ZSS, ZTI, ZTQ, 
ZTR, ZTS, ZTV, ZZT
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
| mcp-protocol-gateway | ZMG | Protocol translation layer | mcp.md | bmad-agent-mcp.toml |
| mcp-capability-negotiation | ZMN | Version/capability handshake | mcp.md | bmad-agent-mcp.toml |
| mcp-streaming-transport | ZMX | Streaming tool responses | mcp.md | bmad-agent-mcp.toml |
| mcp-error-recovery | ZME | Tool failure handling | mcp.md | bmad-agent-mcp.toml |

### Category 2: Agent Communication (8 patterns)

| Pattern | Shortcode | Description | Domain | TOML |
|---------|-----------|-------------|--------|------|
| multi-agent-coordination | ZAC | Agent collaboration protocols | ai-runtime.md | bmad-agent-architect.toml |
| agent-delegation | ZAD | Task delegation patterns | ai-runtime.md | bmad-agent-architect.toml |
| agent-memory-sharing | ZAM | Cross-agent context sharing | ai-runtime.md | bmad-agent-architect.toml |
| agent-consensus | ZAN | Multi-agent agreement protocols | ai-runtime.md | bmad-agent-architect.toml |
| agent-supervision | ZAP | Supervisor/worker hierarchies | ai-runtime.md | bmad-agent-architect.toml |
| agent-capability-routing | ZAR | Skill-based task routing | ai-runtime.md | bmad-agent-architect.toml |
| agent-session-isolation | ZAI | Per-tenant agent sessions | ai-runtime.md | bmad-agent-architect.toml |
| agent-rollback | ZAK | Agent state rollback | ai-runtime.md | bmad-agent-architect.toml |

### Category 3: RAG/Knowledge (15 patterns)

| Pattern | Shortcode | Description | Domain | TOML |
|---------|-----------|-------------|--------|------|
| rag-pipeline | ZRP | End-to-end RAG orchestration | rag.md | bmad-agent-rag.toml |
| vector-store-multi-tenant | ZVS | Tenant-isolated vector indexes | rag.md | bmad-agent-rag.toml |
| semantic-chunking | ZSC | Context-aware document splitting | rag.md | bmad-agent-rag.toml |
| hybrid-search | ZHS | Vector + keyword fusion | rag.md | bmad-agent-rag.toml |
| citation-management | ZCM | Source attribution tracking | rag.md | bmad-agent-rag.toml |
| knowledge-graph | ZKG | Graph-based knowledge storage | rag.md | bmad-agent-rag.toml |
| embedding-versioning | ZEV | Embedding model lifecycle | rag.md | bmad-agent-rag.toml |
| retrieval-reranking | ZRR | Multi-stage retrieval | rag.md | bmad-agent-rag.toml |
| document-ingestion | ZDI | Multi-format document processing | rag.md | bmad-agent-rag.toml |
| context-window-optimization | ZCW | Token budget management | rag.md | bmad-agent-rag.toml |
| rag-evaluation | ZRV | RAG quality metrics | rag.md | bmad-agent-rag.toml |
| multi-turn-memory | ZMM | Conversation context persistence | rag.md | bmad-agent-rag.toml |
| knowledge-refresh | ZKR | Stale knowledge detection | rag.md | bmad-agent-rag.toml |
| tenant-knowledge-isolation | ZTK | Knowledge boundary enforcement | rag.md | bmad-agent-rag.toml |
| rag-caching | ZRC | Retrieval result caching | rag.md | bmad-agent-rag.toml |

### Category 4: Advanced AI Patterns (5 patterns)

| Pattern | Shortcode | Description | Domain | TOML |
|---------|-----------|-------------|--------|------|
| model-routing | ZMR | Dynamic model selection | ai-runtime.md | bmad-agent-architect.toml |
| prompt-versioning | ZPR | Prompt template lifecycle | ai-runtime.md | bmad-agent-architect.toml |
| fine-tuning-pipeline | ZFT | Custom model training workflow | ai-runtime.md | bmad-agent-architect.toml |
| model-ab-testing | ZAB | Model experiment framework | ai-runtime.md | bmad-agent-architect.toml |
| inference-optimization | ZIO | Latency/cost optimization | ai-runtime.md | bmad-agent-architect.toml |

### Category 5: Enterprise Compliance (21 patterns)

| Pattern | Shortcode | Description | Domain | TOML |
|---------|-----------|-------------|--------|------|
| audit-trail | ZAT | Immutable action logging | compliance.md | bmad-agent-compliance.toml |
| data-residency | ZDY | Geographic data controls | compliance.md | bmad-agent-compliance.toml |
| encryption-management | ZEM | Key lifecycle management | security.md | bmad-agent-security.toml |
| consent-management | ZCS | User consent tracking | compliance.md | bmad-agent-compliance.toml |
| data-retention | ZDT | Retention policy enforcement | compliance.md | bmad-agent-compliance.toml |
| anonymization | ZAY | PII anonymization patterns | compliance.md | bmad-agent-compliance.toml |
| right-to-erasure | ZER | GDPR deletion workflows | compliance.md | bmad-agent-compliance.toml |
| compliance-reporting | ZCR | Audit report generation | compliance.md | bmad-agent-compliance.toml |
| data-classification | ZDC | Sensitivity labeling | compliance.md | bmad-agent-compliance.toml |
| access-audit | ZAU | Access log analysis | compliance.md | bmad-agent-compliance.toml |
| privacy-by-design | ZPB | Privacy-first architecture | compliance.md | bmad-agent-compliance.toml |
| cross-border-transfer | ZCT | Data transfer compliance | compliance.md | bmad-agent-compliance.toml |
| breach-notification | ZBN | Incident disclosure workflow | security.md | bmad-agent-security.toml |
| compliance-automation | ZCO | Policy-as-code | compliance.md | bmad-agent-compliance.toml |
| vendor-risk | ZVR | Third-party risk assessment | compliance.md | bmad-agent-compliance.toml |
| soc2-controls | ZS2 | SOC2 control mapping | compliance.md | bmad-agent-compliance.toml |
| hipaa-controls | ZHC | HIPAA compliance patterns | compliance.md | bmad-agent-compliance.toml |
| pci-controls | ZPC | PCI-DSS compliance | compliance.md | bmad-agent-compliance.toml |
| iso27001-controls | Z27 | ISO 27001 mapping | compliance.md | bmad-agent-compliance.toml |
| fedramp-controls | ZFR | FedRAMP compliance | compliance.md | bmad-agent-compliance.toml |
| gdpr-controls | ZGD | GDPR compliance patterns | compliance.md | bmad-agent-compliance.toml |

### Category 6: Scale/Platform (11 patterns)

| Pattern | Shortcode | Description | Domain | TOML |
|---------|-----------|-------------|--------|------|
| horizontal-scaling | ZSH | Stateless scale-out patterns | scaling.md | bmad-agent-devops.toml |
| auto-scaling | ZSA | Load-based scaling rules | scaling.md | bmad-agent-devops.toml |
| geo-distribution | ZGE | Multi-region deployment | scaling.md | bmad-agent-devops.toml |
| caching-strategies | ZCG | Multi-tier caching | caching.md | bmad-agent-architect.toml |
| white-label-platform | ZWL | Tenant branding infrastructure | customization.md | bmad-agent-architect.toml |
| api-monetization | ZAW | API usage billing | billing.md | bmad-agent-data.toml |
| rate-limiting | ZLT | Tenant-aware throttling | scaling.md | bmad-agent-devops.toml |
| multi-region-failover | ZRF | Cross-region DR | deployment.md | bmad-agent-devops.toml |
| connection-pooling | ZCP | Database connection management | scaling.md | bmad-agent-devops.toml |
| load-balancing | ZLB | Traffic distribution patterns | scaling.md | bmad-agent-devops.toml |
| performance-profiling | ZPF | Performance analysis tools | observability.md | bmad-agent-devops.toml |

---

## Summary Counts

| Category | Count |
|----------|-------|
| MCP Integration | 10 |
| Agent Communication | 8 |
| RAG/Knowledge | 15 |
| Advanced AI | 5 |
| Enterprise Compliance | 21 |
| Scale/Platform | 11 |
| **Total New Patterns** | **70** |
| **Total Patterns (45 + 70)** | **115** |

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

All 70 patterns will follow this structure:

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

Add 70 rows to `src-v2/data/bam-patterns.csv`:

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
test('115 pattern files exist (after Phase 4)', () => {
  const patterns = fs.readdirSync(patternsDir).filter(f =>
    f.endsWith('.md') && !f.startsWith('.')
  );
  expect(patterns.length).toBe(115);
});
```

### pattern-standards.test.js

```javascript
test('115 pattern files exist (after NEXUS Phase 4)', () => {
  const patterns = fs.readdirSync(patternsDir).filter(f =>
    f.endsWith('.md') && !f.startsWith('.')
  );
  // 21 base + 6 Phase 1 + 9 Phase 2 + 9 Phase 3 + 70 Phase 4 = 115
  expect(patterns.length).toBe(115);
});
```

---

## Domain Updates

### Existing Domains to Update

| Domain | New References |
|--------|----------------|
| ai-runtime.md | Agent Communication (8), Advanced AI (5) |
| security.md | encryption-management, breach-notification |
| compliance.md | 19 Enterprise patterns |
| deployment.md | multi-region-failover |
| observability.md | performance-profiling |
| billing.md | api-monetization |
| caching.md | caching-strategies |
| customization.md | white-label-platform |

### New Domains

| Domain | Pattern Count |
|--------|---------------|
| mcp.md | 10 |
| rag.md | 15 |
| scaling.md | 6 |

---

## TOML Distribution

| TOML | New Patterns | Total |
|------|--------------|-------|
| bmad-agent-mcp.toml (NEW) | 10 | 10 |
| bmad-agent-rag.toml (NEW) | 15 | 15 |
| bmad-agent-architect.toml | 12 | 12 |
| bmad-agent-compliance.toml | 17 | 17 |
| bmad-agent-security.toml | 2 | 2 |
| bmad-agent-devops.toml | 10 | 10 |
| bmad-agent-data.toml | 1 | 1 |
| **Other existing TOMLs** | 3 | 3 |
| **Total** | **70** | **70** |

---

## 6-Point Anti-Decay Checklist

For each of the 70 patterns:

- [ ] **CSV Entry:** Add row to `bam-patterns.csv` with `web_queries` containing `{date}`
- [ ] **Pattern .md:** Create file with YAML frontmatter (no implementation code)
- [ ] **TOML Menu:** Add menu entry to appropriate TOML
- [ ] **Domain Reference:** Update domain file's Related Patterns section
- [ ] **QG Alignment:** Map to appropriate quality gate
- [ ] **Schema Compliance:** Follow `bam_controlled: true` schema

---

## Implementation Order

### Batch 1: MCP Integration (10 patterns)
Files: Create `mcp.md` domain, `bmad-agent-mcp.toml`, 10 pattern files

### Batch 2: RAG/Knowledge (15 patterns)
Files: Create `rag.md` domain, `bmad-agent-rag.toml`, 15 pattern files

### Batch 3: Agent Communication (8 patterns)
Files: Update `ai-runtime.md`, add to `bmad-agent-architect.toml`, 8 pattern files

### Batch 4: Advanced AI (5 patterns)
Files: Update `ai-runtime.md`, add to `bmad-agent-architect.toml`, 5 pattern files

### Batch 5: Enterprise Compliance (21 patterns)
Files: Update `compliance.md`, `security.md`, add to compliance/security TOMLs, 21 pattern files

### Batch 6: Scale/Platform (11 patterns)
Files: Create `scaling.md`, update existing domains, add to devops TOML, 11 pattern files

### Batch 7: Test Updates & Validation
Files: Update test files, run full test suite

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Large batch causes merge conflicts | Create PR per batch, merge sequentially |
| Shortcode conflicts | All shortcodes verified against existing 43 |
| Test failures | Update test expectations before pattern creation |
| Domain file bloat | Keep domain files focused, use pattern references |

---

## Success Criteria

1. All 70 pattern files created with correct YAML frontmatter
2. All 70 CSV entries added with {date} web queries
3. Both new TOML files created with all menu entries
4. All 3 new domain files created
5. 3 new quality gate checklists created
6. All tests pass (115 patterns expected)
7. No shortcode conflicts
