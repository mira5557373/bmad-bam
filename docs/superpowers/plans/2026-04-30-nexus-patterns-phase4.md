# NEXUS Patterns Phase 4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 61 patterns to complete BAM V2's pattern library from 45 to 106 patterns, with full 6-point anti-decay strategy.

**Architecture:** Create new patterns following existing conventions (YAML frontmatter, decision matrices, web queries with {date}), add to CSV registry, create TOML menu entries, and update domain files. Two new TOMLs (MCP, RAG) and four new domains (mcp.md, rag.md, scaling.md, platform.md).

**Tech Stack:** Markdown with YAML frontmatter, TOML configuration, CSV registry, Jest tests.

---

## File Structure Overview

**New Files (69 total):**
- `src-v2/data/patterns/*.md` - 61 new pattern files
- `src-v2/data/domains/mcp.md` - MCP domain
- `src-v2/data/domains/rag.md` - RAG domain  
- `src-v2/data/domains/scaling.md` - Scaling domain
- `src-v2/data/domains/platform.md` - Platform domain
- `src-v2/customize/bmad-agent-mcp.toml` - MCP TOML
- `src-v2/customize/bmad-agent-rag.toml` - RAG TOML
- `src-v2/data/checklists/qg-mcp1.md` - MCP quality gate
- `src-v2/data/checklists/qg-rag1.md` - RAG quality gate

**Modified Files:**
- `src-v2/data/patterns/ai-discovery.md` - Fix shortcode ZDV→ZAD
- `src-v2/data/patterns/ai-verification.md` - Fix shortcode ZGV→ZAV
- `src-v2/data/patterns/context-injection.md` - Fix shortcode ZCI→ZCX
- `src-v2/data/patterns/secrets-management.md` - Add encryption-management section
- `src-v2/data/patterns/disaster-recovery.md` - Add multi-region-failover section
- `src-v2/data/bam-patterns.csv` - Add 61 rows
- `src-v2/customize/bmad-agent-architect.toml` - Add 7 menu entries
- `src-v2/customize/bmad-agent-compliance.toml` - Add 15 menu entries
- `src-v2/customize/bmad-agent-security.toml` - Add 3 menu entries
- `src-v2/customize/bmad-agent-devops.toml` - Add 7 menu entries
- `src-v2/customize/bmad-agent-data.toml` - Add 2 menu entries
- `src-v2/data/domains/ai-runtime.md` - Add pattern references
- `src-v2/data/domains/security.md` - Add pattern references
- `src-v2/data/domains/compliance.md` - Add pattern references
- `src-v2/data/domains/observability.md` - Add pattern references
- `src-v2/data/domains/billing.md` - Add pattern references
- `test/v2/file-counts.test.js` - Update pattern count to 106

---

## Task 0: Fix Existing Shortcode Bugs

**Files:**
- Modify: `src-v2/data/patterns/ai-discovery.md:3`
- Modify: `src-v2/data/patterns/ai-verification.md:3`
- Modify: `src-v2/data/patterns/context-injection.md:3`
- Modify: `src-v2/data/bam-patterns.csv`

- [ ] **Step 1: Fix ai-discovery.md shortcode ZDV→ZAD**

```bash
sed -i 's/shortcode: ZDV/shortcode: ZAD/' src-v2/data/patterns/ai-discovery.md
```

- [ ] **Step 2: Fix ai-verification.md shortcode ZGV→ZAV**

```bash
sed -i 's/shortcode: ZGV/shortcode: ZAV/' src-v2/data/patterns/ai-verification.md
```

- [ ] **Step 3: Fix context-injection.md shortcode ZCI→ZCX**

First check if file exists:
```bash
ls src-v2/data/patterns/context-injection.md 2>/dev/null || echo "File not found - skip this step"
```

If exists:
```bash
sed -i 's/shortcode: ZCI/shortcode: ZCX/' src-v2/data/patterns/context-injection.md
```

- [ ] **Step 4: Update CSV references for changed shortcodes**

Search for any references to old shortcodes in CSV and update:
```bash
grep -l "ZDV\|ZGV" src-v2/data/*.csv
```

- [ ] **Step 5: Run tests to verify no breakage**

```bash
npm test -- test/v2/ --verbose
```

Expected: All tests pass

- [ ] **Step 6: Commit shortcode fixes**

```bash
git add src-v2/data/patterns/ai-discovery.md src-v2/data/patterns/ai-verification.md
git commit -m "fix: resolve shortcode duplicates (ZDV→ZAD, ZGV→ZAV)

- ai-discovery.md: ZDV → ZAD (ZDV used by decision-verification)
- ai-verification.md: ZGV → ZAV (ZGV used by grounding-verifier)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 1: Create MCP Domain and TOML

**Files:**
- Create: `src-v2/data/domains/mcp.md`
- Create: `src-v2/customize/bmad-agent-mcp.toml`

- [ ] **Step 1: Create mcp.md domain file**

```bash
cat > src-v2/data/domains/mcp.md << 'EOF'
# MCP Integration - BAM Domain Context

**Loaded by:** ZML, ZMD, ZMT, ZTP, ZMF, ZMC, ZMA, ZMV, ZA2, ZMR  
**Related Workflows:** bmad-bam-mcp-integration, bmad-bam-tool-orchestration

---

## Overview

MCP (Model Context Protocol) provides standardized tool integration for AI agents in multi-tenant environments.

## Core Concepts

### Server Lifecycle

| Phase | Actions | Tenant Considerations |
|-------|---------|----------------------|
| Registration | Capability declaration | Tenant-scoped registration |
| Health | Heartbeat monitoring | Per-tenant health tracking |
| Versioning | Schema evolution | Tenant migration coordination |
| Discovery | Tool enumeration | Tenant capability filtering |

### Tenant Isolation Model

```
┌─────────────────────────────────────────────┐
│              MCP Gateway                     │
├─────────────────────────────────────────────┤
│  Tenant A Context  │  Tenant B Context      │
│  ┌─────────────┐   │  ┌─────────────┐       │
│  │ Server Pool │   │  │ Server Pool │       │
│  │ (isolated)  │   │  │ (isolated)  │       │
│  └─────────────┘   │  └─────────────┘       │
└─────────────────────────────────────────────┘
```

## Decision Matrix

| Requirement | Pattern | Rationale |
|-------------|---------|-----------|
| Tool discovery | mcp-tool-discovery | Dynamic capability enumeration |
| Auth per server | mcp-authentication | Tenant-scoped credentials |
| Rate limits | mcp-rate-limiting | Prevent tenant resource abuse |
| Cross-server | mcp-federation | Multi-server orchestration |

## Quality Checks

- [ ] All MCP servers register with tenant context
- [ ] Tool discovery returns tenant-scoped capabilities
- [ ] **CRITICAL:** No cross-tenant tool access possible

## Related Patterns

**Core MCP:**
- `{project-root}/_bmad/bam/data/patterns/mcp-server-lifecycle.md` - Server management
- `{project-root}/_bmad/bam/data/patterns/mcp-tool-discovery.md` - Capability enumeration
- `{project-root}/_bmad/bam/data/patterns/mcp-tenant-isolation.md` - Isolation enforcement

**Security & Auth:**
- `{project-root}/_bmad/bam/data/patterns/mcp-authentication.md` - Server auth
- `{project-root}/_bmad/bam/data/patterns/tool-permission-model.md` - Access control

**Operations:**
- `{project-root}/_bmad/bam/data/patterns/mcp-federation.md` - Cross-server
- `{project-root}/_bmad/bam/data/patterns/mcp-rate-limiting.md` - Throttling
- `{project-root}/_bmad/bam/data/patterns/mcp-result-caching.md` - Performance

## Web Research

- "MCP Model Context Protocol patterns {date}"
- "multi-tenant tool orchestration {date}"
- "agent tool discovery patterns {date}"
EOF
```

- [ ] **Step 2: Create bmad-agent-mcp.toml**

```bash
cat > src-v2/customize/bmad-agent-mcp.toml << 'EOF'
# BAM MCP Integration Extensions
# Adds MCP server lifecycle, tool discovery, tenant isolation patterns

[agent]
activation_steps_append = [
  "BAM MCP Integration available. Use ZML for server lifecycle, ZMD for tool discovery.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
  "file:{project-root}/_bmad/bam/data/domains/mcp.md",
]

principles = [
  "BAM MCP: All tool access is tenant-scoped.",
  "BAM MCP: Server registration includes tenant context.",
  "BAM MCP: Tool discovery respects tenant boundaries.",
  "BAM Gates: QG-MCP1 (MCP Integration).",
]

[[agent.menu]]
code = "ZML"
description = "MCP Server Lifecycle: registration, health, versioning"
prompt = """
Loading MCP server lifecycle pattern:
`{project-root}/_bmad/bam/data/patterns/mcp-server-lifecycle.md`

Confirm loaded. Ready for MCP server management guidance.
"""

[[agent.menu]]
code = "ZMD"
description = "MCP Tool Discovery: dynamic capability enumeration"
prompt = """
Loading MCP tool discovery pattern:
`{project-root}/_bmad/bam/data/patterns/mcp-tool-discovery.md`

Confirm loaded. Ready for tool discovery guidance.
"""

[[agent.menu]]
code = "ZMT"
description = "MCP Tenant Isolation: tenant-scoped contexts"
prompt = """
Loading MCP tenant isolation pattern:
`{project-root}/_bmad/bam/data/patterns/mcp-tenant-isolation.md`

Confirm loaded. Ready for MCP isolation guidance.
"""

[[agent.menu]]
code = "ZTP"
description = "Tool Permission Model: granular access control"
prompt = """
Loading tool permission model pattern:
`{project-root}/_bmad/bam/data/patterns/tool-permission-model.md`

Confirm loaded. Ready for tool permission guidance.
"""

[[agent.menu]]
code = "ZMF"
description = "MCP Federation: cross-server orchestration"
prompt = """
Loading MCP federation pattern:
`{project-root}/_bmad/bam/data/patterns/mcp-federation.md`

Confirm loaded. Ready for MCP federation guidance.
"""

[[agent.menu]]
code = "ZMC"
description = "MCP Result Caching: tenant-aware caching"
prompt = """
Loading MCP result caching pattern:
`{project-root}/_bmad/bam/data/patterns/mcp-result-caching.md`

Confirm loaded. Ready for MCP caching guidance.
"""

[[agent.menu]]
code = "ZMA"
description = "MCP Authentication: server auth patterns"
prompt = """
Loading MCP authentication pattern:
`{project-root}/_bmad/bam/data/patterns/mcp-authentication.md`

Confirm loaded. Ready for MCP auth guidance.
"""

[[agent.menu]]
code = "ZMV"
description = "MCP Schema Validation: tool schema validation"
prompt = """
Loading MCP schema validation pattern:
`{project-root}/_bmad/bam/data/patterns/mcp-schema-validation.md`

Confirm loaded. Ready for schema validation guidance.
"""

[[agent.menu]]
code = "ZA2"
description = "A2A Protocol: agent-to-agent communication"
prompt = """
Loading A2A protocol pattern:
`{project-root}/_bmad/bam/data/patterns/a2a-protocol.md`

Confirm loaded. Ready for A2A communication guidance.
"""

[[agent.menu]]
code = "ZMR"
description = "MCP Rate Limiting: per-server tenant limits"
prompt = """
Loading MCP rate limiting pattern:
`{project-root}/_bmad/bam/data/patterns/mcp-rate-limiting.md`

Confirm loaded. Ready for MCP rate limiting guidance.
"""
EOF
```

- [ ] **Step 3: Verify TOML syntax**

```bash
python3 -c "import tomllib; tomllib.load(open('src-v2/customize/bmad-agent-mcp.toml', 'rb'))" && echo "TOML valid"
```

Expected: "TOML valid"

- [ ] **Step 4: Commit domain and TOML**

```bash
git add src-v2/data/domains/mcp.md src-v2/customize/bmad-agent-mcp.toml
git commit -m "feat(phase4): add MCP domain and TOML

- Create mcp.md domain with server lifecycle, isolation concepts
- Create bmad-agent-mcp.toml with 10 menu entries (ZML-ZMR)
- QG-MCP1 quality gate reference

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Create 10 MCP Pattern Files

**Files:**
- Create: `src-v2/data/patterns/mcp-server-lifecycle.md`
- Create: `src-v2/data/patterns/mcp-tool-discovery.md`
- Create: `src-v2/data/patterns/mcp-tenant-isolation.md`
- Create: `src-v2/data/patterns/tool-permission-model.md`
- Create: `src-v2/data/patterns/mcp-federation.md`
- Create: `src-v2/data/patterns/mcp-result-caching.md`
- Create: `src-v2/data/patterns/mcp-authentication.md`
- Create: `src-v2/data/patterns/mcp-schema-validation.md`
- Create: `src-v2/data/patterns/a2a-protocol.md`
- Create: `src-v2/data/patterns/mcp-rate-limiting.md`

- [ ] **Step 1: Create mcp-server-lifecycle.md**

```bash
cat > src-v2/data/patterns/mcp-server-lifecycle.md << 'EOF'
---
pattern_id: mcp-server-lifecycle
shortcode: ZML
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# MCP Server Lifecycle - BAM Pattern

**Loaded by:** ZML  
**Applies to:** Multi-tenant AI systems with MCP tool servers  
**See also:** [mcp-tool-discovery.md](mcp-tool-discovery.md), [mcp-tenant-isolation.md](mcp-tenant-isolation.md)

---

## When to Use

- Managing MCP server registration and deregistration
- Implementing server health monitoring per tenant
- Coordinating schema versioning across tenants
- Server pool management with tenant affinity

## When NOT to Use

- Single-tenant deployments with static servers
- Direct tool integration without MCP protocol
- Development environments with manual server management

## Architecture

### Server Lifecycle States

```
┌──────────┐    ┌───────────┐    ┌──────────┐    ┌────────────┐
│Registering│───►│  Active   │───►│ Draining │───►│Deregistered│
└──────────┘    └───────────┘    └──────────┘    └────────────┘
      │              │                │
      │              ▼                │
      │         ┌─────────┐           │
      └────────►│ Unhealthy│◄─────────┘
                └─────────┘
```

### Configuration Schema

```yaml
mcp_server_lifecycle:
  version: "1.0.0"
  bam_controlled: true
  
  registration:
    tenant_scoped: bool
    capability_declaration: required
    health_endpoint: string
    
  health_check:
    interval_seconds: int
    timeout_seconds: int
    unhealthy_threshold: int
    
  versioning:
    schema_version: semver
    backward_compatible: bool
    migration_strategy: enum[rolling, blue-green, canary]
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Per-tenant pools | Full isolation | Higher cost | Enterprise tiers |
| Shared pools | Cost efficient | Noisy neighbor risk | Standard tiers |
| Hybrid | Balanced | Complexity | Multi-tier SaaS |

## Web Research Queries

- "MCP server lifecycle management {date}"
- "model context protocol health monitoring {date}"
- "multi-tenant tool server patterns {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | Server lifecycle implements tenant-scoped registration |

## Related Patterns

- [mcp-tool-discovery.md](mcp-tool-discovery.md) - Tool enumeration
- [mcp-tenant-isolation.md](mcp-tenant-isolation.md) - Isolation enforcement
- [mcp-authentication.md](mcp-authentication.md) - Server auth
EOF
```

- [ ] **Step 2: Create mcp-tool-discovery.md**

```bash
cat > src-v2/data/patterns/mcp-tool-discovery.md << 'EOF'
---
pattern_id: mcp-tool-discovery
shortcode: ZMD
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# MCP Tool Discovery - BAM Pattern

**Loaded by:** ZMD  
**Applies to:** AI agents discovering available MCP tools  
**See also:** [mcp-server-lifecycle.md](mcp-server-lifecycle.md), [ai-discovery.md](ai-discovery.md)

---

## When to Use

- Dynamic enumeration of available tools per tenant
- Capability-based tool selection for agents
- Runtime tool availability checks
- Tenant-scoped tool catalogs

## When NOT to Use

- Static tool configurations
- Single-tenant with known tool sets
- Development with hardcoded tool lists

## Architecture

### Discovery Flow

```
Agent Request (tenant_id)
        │
        ▼
┌───────────────────┐
│  Discovery Cache  │◄──── TTL-based invalidation
└────────┬──────────┘
         │ cache miss
         ▼
┌───────────────────┐
│ Tool Registry     │
│ (tenant-filtered) │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│ Capability List   │
│ (schemas, limits) │
└───────────────────┘
```

### Configuration Schema

```yaml
mcp_tool_discovery:
  version: "1.0.0"
  bam_controlled: true
  
  discovery:
    cache_ttl_seconds: int
    tenant_filtering: required
    capability_schema: json_schema
    
  enumeration:
    include_schemas: bool
    include_rate_limits: bool
    include_examples: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Pull-based | Simple | Latency | Low tool churn |
| Push-based | Real-time | Complexity | Dynamic tools |
| Hybrid | Balanced | Cache invalidation | Production |

## Web Research Queries

- "MCP tool discovery patterns {date}"
- "agent capability enumeration {date}"
- "multi-tenant service discovery {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | Tool discovery returns tenant-scoped capabilities |

## Related Patterns

- [mcp-server-lifecycle.md](mcp-server-lifecycle.md) - Server management
- [ai-discovery.md](ai-discovery.md) - AGENTS.md format
EOF
```

- [ ] **Step 3: Create remaining 8 MCP patterns**

Create mcp-tenant-isolation.md:
```bash
cat > src-v2/data/patterns/mcp-tenant-isolation.md << 'EOF'
---
pattern_id: mcp-tenant-isolation
shortcode: ZMT
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# MCP Tenant Isolation - BAM Pattern

**Loaded by:** ZMT  
**Applies to:** Multi-tenant MCP server deployments  
**See also:** [tenant-isolation.md](tenant-isolation.md), [mcp-server-lifecycle.md](mcp-server-lifecycle.md)

---

## When to Use

- Enforcing tenant boundaries in MCP tool access
- Preventing cross-tenant data leakage via tools
- Implementing tenant-scoped server pools
- Audit logging for tool invocations

## When NOT to Use

- Single-tenant deployments
- Shared tools with no tenant-specific data
- Development environments

## Architecture

### Isolation Enforcement

```
┌────────────────────────────────────┐
│         MCP Gateway                │
│  ┌──────────────────────────────┐  │
│  │   Tenant Context Extractor   │  │
│  └──────────────┬───────────────┘  │
│                 │                   │
│  ┌──────────────▼───────────────┐  │
│  │   Tenant Isolation Filter    │  │
│  │   - Server pool selection    │  │
│  │   - Request decoration       │  │
│  │   - Response sanitization    │  │
│  └──────────────┬───────────────┘  │
│                 │                   │
│  ┌──────────────▼───────────────┐  │
│  │   Audit Logger               │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

### Configuration Schema

```yaml
mcp_tenant_isolation:
  version: "1.0.0"
  bam_controlled: true
  
  isolation:
    mode: enum[shared, pool-per-tenant, dedicated]
    context_propagation: required
    cross_tenant_blocking: required
    
  audit:
    log_all_invocations: bool
    include_request_payload: bool
    redact_sensitive_fields: list[string]
```

## Trade-offs

| Mode | Isolation | Cost | Complexity |
|------|-----------|------|------------|
| Shared | Logical | Low | Medium |
| Pool-per-tenant | Strong | Medium | Medium |
| Dedicated | Complete | High | High |

## Web Research Queries

- "MCP tenant isolation patterns {date}"
- "multi-tenant tool access control {date}"
- "agent tool sandboxing {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | **CRITICAL:** No cross-tenant tool access possible |

## Related Patterns

- [tenant-isolation.md](tenant-isolation.md) - Database isolation
- [mcp-authentication.md](mcp-authentication.md) - Server auth
EOF
```

Create tool-permission-model.md:
```bash
cat > src-v2/data/patterns/tool-permission-model.md << 'EOF'
---
pattern_id: tool-permission-model
shortcode: ZTP
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Tool Permission Model - BAM Pattern

**Loaded by:** ZTP  
**Applies to:** Granular tool access control in multi-tenant AI systems  
**See also:** [mcp-tenant-isolation.md](mcp-tenant-isolation.md), [rbac-per-tool.md](rbac-per-tool.md)

---

## When to Use

- Implementing role-based tool access
- Tier-based tool availability (free vs premium)
- User-level tool permissions within tenants
- Audit requirements for tool usage

## When NOT to Use

- All tools available to all users
- No tier differentiation
- Single-user systems

## Architecture

### Permission Hierarchy

```
Platform Level (BAM)
    │
    ├── Tier Level (Free/Pro/Enterprise)
    │       │
    │       ├── Tenant Level (Org-specific)
    │       │       │
    │       │       └── User Level (Role-based)
    │       │               │
    │       │               └── Tool: allow/deny
```

### Configuration Schema

```yaml
tool_permission_model:
  version: "1.0.0"
  bam_controlled: true
  
  permission_layers:
    - platform
    - tier
    - tenant
    - user
    
  default_policy: enum[allow, deny]
  
  tool_permissions:
    - tool_id: string
      tier_requirements: list[enum]
      roles_allowed: list[string]
      rate_limit_override: optional[int]
```

## Trade-offs

| Approach | Flexibility | Complexity | Performance |
|----------|-------------|------------|-------------|
| Static config | Low | Low | Fast |
| Dynamic policies | High | High | Medium |
| Hybrid | Balanced | Medium | Good |

## Web Research Queries

- "tool permission model AI agents {date}"
- "RBAC for LLM tools {date}"
- "tier-based feature access SaaS {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | Tool permissions respect tier and tenant boundaries |

## Related Patterns

- [rbac-per-tool.md](rbac-per-tool.md) - Role-based access
- [mcp-tenant-isolation.md](mcp-tenant-isolation.md) - Tenant boundaries
EOF
```

Create mcp-federation.md:
```bash
cat > src-v2/data/patterns/mcp-federation.md << 'EOF'
---
pattern_id: mcp-federation
shortcode: ZMF
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# MCP Federation - BAM Pattern

**Loaded by:** ZMF  
**Applies to:** Cross-server MCP orchestration  
**See also:** [mcp-server-lifecycle.md](mcp-server-lifecycle.md), [federation.md](federation.md)

---

## When to Use

- Routing requests across multiple MCP server instances
- Load balancing tool invocations
- Geographic distribution of tool servers
- Failover between server pools

## When NOT to Use

- Single MCP server deployment
- No high availability requirements
- Development environments

## Architecture

### Federation Topology

```
┌─────────────────────────────────────────┐
│           Federation Router              │
├─────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │Region A │  │Region B │  │Region C │ │
│  │ Pool    │  │ Pool    │  │ Pool    │ │
│  └─────────┘  └─────────┘  └─────────┘ │
└─────────────────────────────────────────┘
```

### Configuration Schema

```yaml
mcp_federation:
  version: "1.0.0"
  bam_controlled: true
  
  routing:
    strategy: enum[round-robin, latency, tenant-affinity, capability]
    failover_enabled: bool
    health_check_interval: int
    
  regions:
    - region_id: string
      servers: list[string]
      priority: int
```

## Trade-offs

| Strategy | Latency | Complexity | Use Case |
|----------|---------|------------|----------|
| Round-robin | Variable | Low | Uniform load |
| Latency-based | Optimal | Medium | Geo-distributed |
| Tenant-affinity | Consistent | Medium | Data locality |

## Web Research Queries

- "MCP server federation patterns {date}"
- "multi-region tool routing {date}"
- "service mesh for AI tools {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | Federation maintains tenant isolation across regions |

## Related Patterns

- [federation.md](federation.md) - General federation
- [mcp-server-lifecycle.md](mcp-server-lifecycle.md) - Server management
EOF
```

Create mcp-result-caching.md:
```bash
cat > src-v2/data/patterns/mcp-result-caching.md << 'EOF'
---
pattern_id: mcp-result-caching
shortcode: ZMC
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# MCP Result Caching - BAM Pattern

**Loaded by:** ZMC  
**Applies to:** Caching tool results in multi-tenant environments  
**See also:** [mcp-tool-discovery.md](mcp-tool-discovery.md), [caching-strategies.md](caching-strategies.md)

---

## When to Use

- Reducing latency for repeated tool calls
- Lowering costs for expensive tool invocations
- Improving throughput for common queries
- Tenant-scoped result sharing

## When NOT to Use

- Tools with non-deterministic outputs
- Real-time data requirements
- Tools with side effects

## Architecture

### Cache Hierarchy

```
┌─────────────────────────────┐
│     L1: Request Cache       │ ←─ Same request in flight
├─────────────────────────────┤
│     L2: Tenant Cache        │ ←─ Tenant-scoped results
├─────────────────────────────┤
│     L3: Global Cache        │ ←─ Cross-tenant (if safe)
└─────────────────────────────┘
```

### Configuration Schema

```yaml
mcp_result_caching:
  version: "1.0.0"
  bam_controlled: true
  
  cache_levels:
    request:
      enabled: bool
      dedup_window_ms: int
    tenant:
      enabled: bool
      ttl_seconds: int
      max_entries: int
    global:
      enabled: bool
      tenant_safe_only: bool
      
  invalidation:
    on_tool_update: bool
    on_tenant_config_change: bool
```

## Trade-offs

| Level | Hit Rate | Isolation | Staleness Risk |
|-------|----------|-----------|----------------|
| Request | Low | Full | None |
| Tenant | Medium | Full | Low |
| Global | High | Requires care | Medium |

## Web Research Queries

- "tool result caching patterns {date}"
- "multi-tenant cache isolation {date}"
- "LLM tool response caching {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | Cache maintains tenant isolation |

## Related Patterns

- [caching-strategies.md](caching-strategies.md) - General caching
- [mcp-tool-discovery.md](mcp-tool-discovery.md) - Tool enumeration
EOF
```

Create mcp-authentication.md:
```bash
cat > src-v2/data/patterns/mcp-authentication.md << 'EOF'
---
pattern_id: mcp-authentication
shortcode: ZMA
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# MCP Authentication - BAM Pattern

**Loaded by:** ZMA  
**Applies to:** Server authentication for MCP integrations  
**See also:** [mcp-tenant-isolation.md](mcp-tenant-isolation.md), [sso-auth.md](sso-auth.md)

---

## When to Use

- Authenticating MCP servers with the platform
- Per-tenant credential management for external tools
- API key rotation for tool integrations
- OAuth flows for third-party MCP servers

## When NOT to Use

- Internal-only tool servers
- Development without auth requirements
- Trusted network deployments

## Architecture

### Auth Flow

```
┌──────────┐    ┌──────────────┐    ┌───────────┐
│  Agent   │───►│ Auth Gateway │───►│MCP Server │
└──────────┘    └──────┬───────┘    └───────────┘
                       │
                ┌──────▼───────┐
                │ Credential   │
                │ Store        │
                │ (per-tenant) │
                └──────────────┘
```

### Configuration Schema

```yaml
mcp_authentication:
  version: "1.0.0"
  bam_controlled: true
  
  auth_methods:
    - type: enum[api_key, oauth2, mtls]
      tenant_scoped: bool
      rotation_days: int
      
  credential_storage:
    backend: enum[vault, kms, database]
    encryption: required
```

## Trade-offs

| Method | Security | Complexity | Use Case |
|--------|----------|------------|----------|
| API Key | Medium | Low | Internal tools |
| OAuth 2.0 | High | Medium | External tools |
| mTLS | Highest | High | Critical tools |

## Web Research Queries

- "MCP server authentication patterns {date}"
- "tool API key management multi-tenant {date}"
- "OAuth for AI tool integrations {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | Credentials are tenant-scoped and rotatable |

## Related Patterns

- [sso-auth.md](sso-auth.md) - SSO patterns
- [secrets-management.md](secrets-management.md) - Secret storage
EOF
```

Create mcp-schema-validation.md:
```bash
cat > src-v2/data/patterns/mcp-schema-validation.md << 'EOF'
---
pattern_id: mcp-schema-validation
shortcode: ZMV
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# MCP Schema Validation - BAM Pattern

**Loaded by:** ZMV  
**Applies to:** Validating tool schemas in MCP integrations  
**See also:** [tool-schema-versioning.md](tool-schema-versioning.md), [mcp-tool-discovery.md](mcp-tool-discovery.md)

---

## When to Use

- Validating tool input/output schemas
- Schema version compatibility checks
- Runtime schema enforcement
- Migration planning for schema changes

## When NOT to Use

- Trusted internal tools
- Schema-less tool integrations
- Development with frequent schema changes

## Architecture

### Validation Pipeline

```
Tool Request
     │
     ▼
┌────────────────┐
│ Schema Lookup  │ ←─ From tool discovery
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ Input Validate │ ←─ JSON Schema / Pydantic
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ Tool Execution │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│Output Validate │
└────────────────┘
```

### Configuration Schema

```yaml
mcp_schema_validation:
  version: "1.0.0"
  bam_controlled: true
  
  validation:
    input_validation: enum[strict, lenient, none]
    output_validation: enum[strict, lenient, none]
    coercion_enabled: bool
    
  schema_registry:
    source: enum[tool_discovery, central_registry]
    cache_ttl_seconds: int
```

## Trade-offs

| Mode | Safety | Flexibility | Performance |
|------|--------|-------------|-------------|
| Strict | High | Low | Lower |
| Lenient | Medium | Medium | Good |
| None | Low | High | Best |

## Web Research Queries

- "tool schema validation patterns {date}"
- "JSON schema for AI tools {date}"
- "runtime schema enforcement {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | Schema validation configured for production tools |

## Related Patterns

- [tool-schema-versioning.md](tool-schema-versioning.md) - Schema versions
- [mcp-tool-discovery.md](mcp-tool-discovery.md) - Tool enumeration
EOF
```

Create a2a-protocol.md:
```bash
cat > src-v2/data/patterns/a2a-protocol.md << 'EOF'
---
pattern_id: a2a-protocol
shortcode: ZA2
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# A2A Protocol - BAM Pattern

**Loaded by:** ZA2  
**Applies to:** Agent-to-agent communication in multi-tenant systems  
**See also:** [agent-orchestration.md](agent-orchestration.md), [mcp-federation.md](mcp-federation.md)

---

## When to Use

- Direct communication between AI agents
- Delegating subtasks to specialized agents
- Multi-agent collaboration workflows
- Cross-tenant agent federation (with controls)

## When NOT to Use

- Single-agent systems
- Human-in-the-loop required for all decisions
- No agent interoperability requirements

## Architecture

### A2A Communication

```
┌─────────────────────────────────────────┐
│           A2A Message Bus                │
├─────────────────────────────────────────┤
│  Agent A ─────────────► Agent B         │
│  (Tenant X)   message   (Tenant X)      │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │     Tenant Boundary Check       │    │
│  │     - Same tenant: allow        │    │
│  │     - Cross-tenant: policy      │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### Configuration Schema

```yaml
a2a_protocol:
  version: "1.0.0"
  bam_controlled: true
  
  messaging:
    transport: enum[direct, queue, pubsub]
    serialization: enum[json, protobuf]
    encryption: required
    
  tenant_policy:
    same_tenant: allow
    cross_tenant: enum[deny, policy_check, federated]
    
  message_schema:
    request_id: required
    source_agent: required
    target_agent: required
    tenant_id: required
    payload: any
```

## Trade-offs

| Approach | Latency | Decoupling | Complexity |
|----------|---------|------------|------------|
| Direct | Low | Low | Low |
| Queue | Medium | High | Medium |
| Pub/Sub | Variable | Highest | High |

## Web Research Queries

- "agent to agent communication patterns {date}"
- "A2A protocol AI agents {date}"
- "multi-agent messaging {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | A2A respects tenant boundaries |

## Related Patterns

- [agent-orchestration.md](agent-orchestration.md) - Multi-agent patterns
- [mcp-federation.md](mcp-federation.md) - Cross-server federation
EOF
```

Create mcp-rate-limiting.md:
```bash
cat > src-v2/data/patterns/mcp-rate-limiting.md << 'EOF'
---
pattern_id: mcp-rate-limiting
shortcode: ZMR
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# MCP Rate Limiting - BAM Pattern

**Loaded by:** ZMR  
**Applies to:** Per-server tenant rate limiting for MCP tools  
**See also:** [tenant-quotas.md](tenant-quotas.md), [mcp-tenant-isolation.md](mcp-tenant-isolation.md)

---

## When to Use

- Preventing tool abuse by tenants
- Fair resource allocation across tenants
- Protecting external MCP servers from overload
- Tier-based tool access limits

## When NOT to Use

- Unlimited tool access by design
- Single-tenant deployments
- Internal tools with no limits

## Architecture

### Rate Limit Enforcement

```
Tool Request
     │
     ▼
┌────────────────────┐
│ Tenant Rate Bucket │
│ (per-tool limits)  │
└────────┬───────────┘
         │
    ┌────┴────┐
    │ Allow?  │
    └────┬────┘
    yes  │  no
    ▼    ▼
┌──────┐ ┌─────────────┐
│ Tool │ │ 429 + Retry │
└──────┘ └─────────────┘
```

### Configuration Schema

```yaml
mcp_rate_limiting:
  version: "1.0.0"
  bam_controlled: true
  
  limits:
    - tier: free
      tools_per_minute: 10
      tools_per_day: 100
    - tier: pro
      tools_per_minute: 100
      tools_per_day: 10000
    - tier: enterprise
      tools_per_minute: 1000
      tools_per_day: unlimited
      
  enforcement:
    algorithm: enum[token_bucket, sliding_window, fixed_window]
    burst_allowance: float
    retry_after_header: bool
```

## Trade-offs

| Algorithm | Accuracy | Burst Handling | Memory |
|-----------|----------|----------------|--------|
| Token Bucket | High | Good | Medium |
| Sliding Window | Highest | Best | High |
| Fixed Window | Medium | Poor | Low |

## Web Research Queries

- "tool rate limiting multi-tenant {date}"
- "per-tenant API throttling {date}"
- "tiered rate limits SaaS {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | Rate limits enforced per-tenant per-tool |

## Related Patterns

- [tenant-quotas.md](tenant-quotas.md) - Quota management
- [mcp-tenant-isolation.md](mcp-tenant-isolation.md) - Tenant isolation
EOF
```

- [ ] **Step 4: Verify all 10 MCP patterns created**

```bash
ls src-v2/data/patterns/mcp-*.md src-v2/data/patterns/tool-permission-model.md src-v2/data/patterns/a2a-protocol.md | wc -l
```

Expected: 10

- [ ] **Step 5: Commit MCP patterns**

```bash
git add src-v2/data/patterns/mcp-*.md src-v2/data/patterns/tool-permission-model.md src-v2/data/patterns/a2a-protocol.md
git commit -m "feat(phase4): add 10 MCP integration patterns

Patterns: mcp-server-lifecycle (ZML), mcp-tool-discovery (ZMD),
mcp-tenant-isolation (ZMT), tool-permission-model (ZTP),
mcp-federation (ZMF), mcp-result-caching (ZMC),
mcp-authentication (ZMA), mcp-schema-validation (ZMV),
a2a-protocol (ZA2), mcp-rate-limiting (ZMR)

All with YAML frontmatter, decision matrices, web queries with {date}

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Create RAG Domain, TOML, and 11 Patterns

**Files:**
- Create: `src-v2/data/domains/rag.md`
- Create: `src-v2/customize/bmad-agent-rag.toml`
- Create: 11 pattern files in `src-v2/data/patterns/`

- [ ] **Step 1: Create rag.md domain file**

```bash
cat > src-v2/data/domains/rag.md << 'EOF'
# RAG/Knowledge - BAM Domain Context

**Loaded by:** ZRP, ZVS, ZSC, ZHS, ZKG, ZEL, ZCC, ZCW, ZIM, ZQT, ZSR  
**Related Workflows:** bmad-bam-rag-pipeline, bmad-bam-knowledge-management

---

## Overview

RAG (Retrieval-Augmented Generation) patterns for multi-tenant knowledge systems with strict tenant isolation.

## Core Concepts

### Vector Store Isolation Models

| Model | Isolation | Performance | Cost |
|-------|-----------|-------------|------|
| Index-per-tenant | Full | Optimal | High |
| Namespace | Good | Good | Medium |
| Metadata filter | Basic | Varies | Low |

### RAG Pipeline Architecture

```
┌─────────────────────────────────────────────┐
│                RAG Pipeline                  │
│  ┌─────────┐  ┌──────────┐  ┌────────────┐ │
│  │ Ingest  │─►│ Retrieve │─►│ Generate   │ │
│  │ (chunk) │  │ (search) │  │ (synthesize│ │
│  └─────────┘  └──────────┘  └────────────┘ │
│       ▲            │              │         │
│       │     tenant_id      tenant_id        │
│       └────────────┴──────────────┘         │
└─────────────────────────────────────────────┘
```

## Decision Matrix

| Requirement | Pattern | Rationale |
|-------------|---------|-----------|
| Tenant isolation | vector-store-multi-tenant | Prevent data leakage |
| Chunking | semantic-chunking | Context-aware splits |
| Search quality | hybrid-search | Vector + keyword fusion |
| Knowledge graphs | knowledge-graph | Entity relationships |

## Quality Checks

- [ ] **CRITICAL:** Vector store has tenant isolation
- [ ] **CRITICAL:** No cross-tenant retrieval possible
- [ ] Citation tracking implemented
- [ ] Embedding versioning in place

## Related Patterns

**Core RAG:**
- `{project-root}/_bmad/bam/data/patterns/rag-pipeline.md` - End-to-end orchestration
- `{project-root}/_bmad/bam/data/patterns/vector-store-multi-tenant.md` - Isolated indexes
- `{project-root}/_bmad/bam/data/patterns/semantic-chunking.md` - Document splitting

**Search & Retrieval:**
- `{project-root}/_bmad/bam/data/patterns/hybrid-search.md` - Vector + keyword
- `{project-root}/_bmad/bam/data/patterns/query-transformation.md` - Query rewriting

**Knowledge Management:**
- `{project-root}/_bmad/bam/data/patterns/knowledge-graph.md` - Graph-based storage
- `{project-root}/_bmad/bam/data/patterns/embedding-lifecycle.md` - Model management

## Web Research

- "RAG multi-tenant vector store patterns {date}"
- "semantic chunking best practices {date}"
- "hybrid search vector keyword fusion {date}"
EOF
```

- [ ] **Step 2: Create bmad-agent-rag.toml**

```bash
cat > src-v2/customize/bmad-agent-rag.toml << 'EOF'
# BAM RAG/Knowledge Extensions
# Adds RAG pipeline, vector store isolation, semantic chunking patterns

[agent]
activation_steps_append = [
  "BAM RAG capabilities available. Use ZRP for RAG pipeline, ZVS for vector stores.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/context/bam-core.md",
  "file:{project-root}/_bmad/bam/data/domains/rag.md",
]

principles = [
  "BAM RAG: All knowledge stores are tenant-isolated.",
  "BAM RAG: Embeddings are versioned and tracked.",
  "BAM RAG: Citations required for all retrieved content.",
  "BAM Gates: QG-RAG1 (RAG Quality).",
]

[[agent.menu]]
code = "ZRP"
description = "RAG Pipeline: end-to-end retrieval orchestration"
prompt = """
Loading RAG pipeline pattern:
`{project-root}/_bmad/bam/data/patterns/rag-pipeline.md`

Confirm loaded. Ready for RAG architecture guidance.
"""

[[agent.menu]]
code = "ZVS"
description = "Vector Store Multi-tenant: isolated indexes"
prompt = """
Loading vector store multi-tenant pattern:
`{project-root}/_bmad/bam/data/patterns/vector-store-multi-tenant.md`

Confirm loaded. Ready for vector isolation guidance.
"""

[[agent.menu]]
code = "ZSC"
description = "Semantic Chunking: context-aware document splitting"
prompt = """
Loading semantic chunking pattern:
`{project-root}/_bmad/bam/data/patterns/semantic-chunking.md`

Confirm loaded. Ready for chunking strategy guidance.
"""

[[agent.menu]]
code = "ZHS"
description = "Hybrid Search: vector + keyword fusion"
prompt = """
Loading hybrid search pattern:
`{project-root}/_bmad/bam/data/patterns/hybrid-search.md`

Confirm loaded. Ready for search strategy guidance.
"""

[[agent.menu]]
code = "ZKG"
description = "Knowledge Graph: graph-based knowledge storage"
prompt = """
Loading knowledge graph pattern:
`{project-root}/_bmad/bam/data/patterns/knowledge-graph.md`

Confirm loaded. Ready for knowledge graph guidance.
"""

[[agent.menu]]
code = "ZEL"
description = "Embedding Lifecycle: embedding model management"
prompt = """
Loading embedding lifecycle pattern:
`{project-root}/_bmad/bam/data/patterns/embedding-lifecycle.md`

Confirm loaded. Ready for embedding management guidance.
"""

[[agent.menu]]
code = "ZCC"
description = "Context Compilation: context assembly patterns"
prompt = """
Loading context compilation pattern:
`{project-root}/_bmad/bam/data/patterns/context-compilation.md`

Confirm loaded. Ready for context assembly guidance.
"""

[[agent.menu]]
code = "ZCW"
description = "Context Window Optimization: token budget management"
prompt = """
Loading context window optimization pattern:
`{project-root}/_bmad/bam/data/patterns/context-window-optimization.md`

Confirm loaded. Ready for token budget guidance.
"""

[[agent.menu]]
code = "ZIM"
description = "Index Management: index lifecycle patterns"
prompt = """
Loading index management pattern:
`{project-root}/_bmad/bam/data/patterns/index-management.md`

Confirm loaded. Ready for index lifecycle guidance.
"""

[[agent.menu]]
code = "ZQT"
description = "Query Transformation: query rewriting patterns"
prompt = """
Loading query transformation pattern:
`{project-root}/_bmad/bam/data/patterns/query-transformation.md`

Confirm loaded. Ready for query optimization guidance.
"""

[[agent.menu]]
code = "ZSR"
description = "Streaming RAG: real-time retrieval"
prompt = """
Loading streaming RAG pattern:
`{project-root}/_bmad/bam/data/patterns/streaming-rag.md`

Confirm loaded. Ready for streaming RAG guidance.
"""
EOF
```

- [ ] **Step 3: Create 11 RAG pattern files**

Due to plan length constraints, create patterns using this template for each:

```bash
# Pattern template - repeat for each of 11 RAG patterns
for pattern in rag-pipeline vector-store-multi-tenant semantic-chunking hybrid-search knowledge-graph embedding-lifecycle context-compilation context-window-optimization index-management query-transformation streaming-rag; do
  cat > "src-v2/data/patterns/${pattern}.md" << EOF
---
pattern_id: ${pattern}
shortcode: Z${pattern:0:2}
category: rag
qg_ref: QG-RAG1
version: 1.0.0
last_reviewed: 2026-04-30
---

# ${pattern//-/ } - BAM Pattern

**Loaded by:** Z${pattern:0:2}  
**Applies to:** Multi-tenant RAG systems  

---

## When to Use

- [Add specific use cases]

## When NOT to Use

- [Add exclusion criteria]

## Architecture

[Add architecture diagram and schema]

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| [Option] | [Pros] | [Cons] | [Use case] |

## Web Research Queries

- "${pattern//-/ } patterns {date}"
- "multi-tenant ${pattern//-/ } {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-RAG1 | [Verification criteria] |

## Related Patterns

- [Related pattern links]
EOF
done
```

Then manually enhance each pattern with specific content (architecture diagrams, decision matrices, etc.).

- [ ] **Step 4: Commit RAG domain, TOML, and patterns**

```bash
git add src-v2/data/domains/rag.md src-v2/customize/bmad-agent-rag.toml src-v2/data/patterns/rag-pipeline.md src-v2/data/patterns/vector-store-multi-tenant.md src-v2/data/patterns/semantic-chunking.md src-v2/data/patterns/hybrid-search.md src-v2/data/patterns/knowledge-graph.md src-v2/data/patterns/embedding-lifecycle.md src-v2/data/patterns/context-compilation.md src-v2/data/patterns/context-window-optimization.md src-v2/data/patterns/index-management.md src-v2/data/patterns/query-transformation.md src-v2/data/patterns/streaming-rag.md
git commit -m "feat(phase4): add RAG domain, TOML, and 11 patterns

Domain: rag.md with vector isolation, pipeline architecture
TOML: bmad-agent-rag.toml with 11 menu entries

Patterns: rag-pipeline (ZRP), vector-store-multi-tenant (ZVS),
semantic-chunking (ZSC), hybrid-search (ZHS), knowledge-graph (ZKG),
embedding-lifecycle (ZEL), context-compilation (ZCC),
context-window-optimization (ZCW), index-management (ZIM),
query-transformation (ZQT), streaming-rag (ZSR)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Create Agent Communication Patterns (4)

**Files:**
- Create: `src-v2/data/patterns/agent-negotiation.md`
- Create: `src-v2/data/patterns/cross-tenant-agent.md`
- Create: `src-v2/data/patterns/event-driven-agents.md`
- Create: `src-v2/data/patterns/agent-marketplace.md`
- Modify: `src-v2/customize/bmad-agent-architect.toml`
- Modify: `src-v2/data/domains/ai-runtime.md`

- [ ] **Step 1: Create 4 agent communication patterns**

Create using the standard pattern template with shortcodes ZAN, ZXA, ZEA, ZAM.

- [ ] **Step 2: Add menu entries to bmad-agent-architect.toml**

Append to existing TOML:
```toml
[[agent.menu]]
code = "ZAN"
description = "Agent Negotiation: multi-agent agreement protocols"
prompt = """
Loading agent negotiation pattern:
`{project-root}/_bmad/bam/data/patterns/agent-negotiation.md`

Confirm loaded. Ready for negotiation protocol guidance.
"""

# ... add ZXA, ZEA, ZAM entries
```

- [ ] **Step 3: Update ai-runtime.md domain with new pattern references**

- [ ] **Step 4: Commit agent communication patterns**

---

## Task 5: Create Advanced AI Patterns (6)

**Files:**
- Create: `src-v2/data/patterns/prompt-chaining.md`
- Create: `src-v2/data/patterns/chain-of-thought.md`
- Create: `src-v2/data/patterns/self-correction.md`
- Create: `src-v2/data/patterns/multi-modal-rag.md`
- Create: `src-v2/data/patterns/knowledge-refresh.md`
- Create: `src-v2/data/patterns/fine-tuning-pipeline.md`

- [ ] **Step 1: Create 6 advanced AI patterns**

Use shortcodes: ZPC, ZCT, ZSE, ZMM, ZKR, ZFT

- [ ] **Step 2: Update relevant TOMLs with menu entries**

- [ ] **Step 3: Commit advanced AI patterns**

---

## Task 6: Create Enterprise Compliance Patterns (18)

**Files:**
- Create: 18 pattern files (sso-integration, agent-rbac, tenant-rbac, data-residency, consent-management, data-retention, anonymization, right-to-deletion, export-portability, compliance-reporting, data-classification, access-reviews, privacy-by-design, vendor-management, soc2-compliance, hipaa-compliance, pci-dss-compliance, gdpr-compliance)
- Modify: `src-v2/customize/bmad-agent-compliance.toml`
- Modify: `src-v2/customize/bmad-agent-security.toml`
- Modify: `src-v2/data/domains/compliance.md`
- Modify: `src-v2/data/domains/security.md`

- [ ] **Step 1: Create 3 security patterns (sso-integration, agent-rbac, tenant-rbac)**

Use shortcodes: ZSI, ZRB, ZTR

- [ ] **Step 2: Create 15 compliance patterns**

Use shortcodes: ZDY, ZCN, ZDT, ZAY, ZRD, ZEP, ZCR, ZDC, ZAW, ZPB, ZVM, ZS2, ZHC, ZPX, ZGD

- [ ] **Step 3: Update compliance and security TOMLs**

- [ ] **Step 4: Update compliance.md and security.md domains**

- [ ] **Step 5: Commit enterprise compliance patterns**

---

## Task 7: Create Scale/Platform Patterns (12)

**Files:**
- Create: `src-v2/data/domains/scaling.md`
- Create: `src-v2/data/domains/platform.md`
- Create: 12 pattern files
- Modify: `src-v2/customize/bmad-agent-devops.toml`
- Modify: `src-v2/customize/bmad-agent-data.toml`

- [ ] **Step 1: Create scaling.md domain**

- [ ] **Step 2: Create platform.md domain**

- [ ] **Step 3: Create 12 scale/platform patterns**

Use shortcodes: ZVT, ZGE, ZED, ZLB, ZCG, ZUA, ZPS, ZPF, ZWL, ZRM, ZAI, ZPA

- [ ] **Step 4: Update devops and data TOMLs**

- [ ] **Step 5: Commit scale/platform patterns**

---

## Task 8: Merge Patterns into Existing Files

**Files:**
- Modify: `src-v2/data/patterns/secrets-management.md`
- Modify: `src-v2/data/patterns/disaster-recovery.md`

- [ ] **Step 1: Add encryption-management section to secrets-management.md**

Add after existing content:
```markdown
## Encryption Key Management (Merged Pattern)

### When to Use
- Managing encryption keys per tenant
- Key rotation automation
- Customer-managed key (CMK) support

### Configuration Schema

```yaml
encryption_management:
  key_types:
    - platform_keys: managed
    - tenant_keys: per-tenant
    - customer_keys: cmk_enabled
  rotation:
    auto_rotate: bool
    rotation_days: int
  hsm_integration: optional
```

### Related
- Merged from: encryption-management pattern
- See: HSM integration patterns
```

- [ ] **Step 2: Add multi-region-failover section to disaster-recovery.md**

Add after existing content:
```markdown
## Multi-Region Failover (Merged Pattern)

### When to Use
- Active-passive DR across regions
- Automatic failover triggers
- Tenant-aware region selection

### Configuration Schema

```yaml
multi_region_failover:
  primary_region: string
  secondary_regions: list[string]
  failover:
    auto_trigger: bool
    health_threshold: float
    dns_ttl_seconds: int
  tenant_routing:
    region_affinity: bool
    data_residency_respect: bool
```

### Related
- Merged from: multi-region-failover pattern
- See: geo-distribution pattern
```

- [ ] **Step 3: Commit merged content**

```bash
git add src-v2/data/patterns/secrets-management.md src-v2/data/patterns/disaster-recovery.md
git commit -m "feat(phase4): merge encryption-management and multi-region-failover

- Add encryption key management section to secrets-management.md
- Add multi-region failover section to disaster-recovery.md

These patterns were identified as overlapping with existing patterns
and merged to avoid duplication.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 9: Add CSV Registry Entries

**Files:**
- Modify: `src-v2/data/bam-patterns.csv`

- [ ] **Step 1: Add 61 new rows to bam-patterns.csv**

Add entries for all new patterns following the existing CSV schema:
```csv
pattern_id,name,category,decision_criteria,signals,intent,variants,decision_questions,web_queries,verification_gate,dependencies,conflicts,skill_level_notes,related_fragments,core_pattern_ref,domain_ref,shortcode
```

Example entries:
```csv
mcp-server-lifecycle,MCP Server Lifecycle,mcp,Use for MCP server management,"server lifecycle,health,versioning",Manage MCP server lifecycle,pool-per-tenant;shared-pool,What server pool model?;Health check frequency?,MCP server lifecycle patterns {date};model context protocol {date},QG-MCP1,mcp-tenant-isolation,,Basic: Shared pool;Advanced: Per-tenant pools,mcp-patterns,mcp-server-lifecycle.md,mcp.md,ZML
```

- [ ] **Step 2: Verify CSV is valid**

```bash
head -5 src-v2/data/bam-patterns.csv
wc -l src-v2/data/bam-patterns.csv
```

Expected: Original count + 61 new rows

- [ ] **Step 3: Commit CSV updates**

```bash
git add src-v2/data/bam-patterns.csv
git commit -m "feat(phase4): add 61 pattern entries to CSV registry

All patterns include:
- web_queries with {date} placeholder
- QG alignment (QG-MCP1, QG-RAG1, QG-ENT1, etc.)
- Domain references
- Shortcodes (ZML-ZPA)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 10: Create Quality Gate Checklists

**Files:**
- Create: `src-v2/data/checklists/qg-mcp1.md`
- Create: `src-v2/data/checklists/qg-rag1.md`
- Create: `src-v2/data/checklists/qg-ent1.md`

- [ ] **Step 1: Create qg-mcp1.md**

```bash
cat > src-v2/data/checklists/qg-mcp1.md << 'EOF'
---
name: qg-mcp1-mcp-integration
description: MCP integration validation gate ensuring tenant isolation and tool governance
module: bam
version: 1.0.0
tags: [mcp, quality-gate, multi-tenant, tools]
---

# QG-MCP1: MCP Integration Gate

> **Gate ID:** QG-MCP1 (MCP Integration)
> **Workflows:** bmad-bam-mcp-integration
> **Prerequisites:** QG-F1 (Foundation)

Validates MCP server integration meets multi-tenant requirements.

---

## Critical Checks (All Must Pass)

- [ ] **CRITICAL:** All MCP servers register with tenant context
- [ ] **CRITICAL:** Tool discovery returns tenant-scoped capabilities only
- [ ] **CRITICAL:** No cross-tenant tool access possible
- [ ] **CRITICAL:** Tool invocations include tenant_id in all requests

## Standard Checks

- [ ] Server health monitoring configured per tenant
- [ ] Protocol version negotiation implemented
- [ ] Error recovery patterns in place
- [ ] Rate limiting enforced per-tenant per-tool
- [ ] Audit logging captures all tool invocations
- [ ] Schema validation configured for production tools

## Recovery Protocol

If gate fails:
1. Review tenant isolation implementation
2. Add missing tenant context propagation
3. Re-run validation with test tenant

## Outcome

| Result | Criteria |
|--------|----------|
| PASS | All critical + 80% standard |
| CONDITIONAL | All critical, <80% standard + mitigation plan |
| FAIL | Any critical fails |
EOF
```

- [ ] **Step 2: Create qg-rag1.md and qg-ent1.md similarly**

- [ ] **Step 3: Commit quality gate checklists**

---

## Task 11: Update Test File

**Files:**
- Modify: `test/v2/file-counts.test.js`

- [ ] **Step 1: Update pattern count expectation**

```javascript
// Change from:
test('45 pattern files (after NEXUS Phase 3)', () => {
  // ...
  expect(files.length).toBe(45);
});

// To:
test('106 pattern files (after NEXUS Phase 4)', () => {
  const files = fs.readdirSync(path.join(v2Dir, 'data/patterns')).filter(f => f.endsWith('.md'));
  // V2 consolidated: 21 base + 6 Phase 1 + 9 Phase 2 + 9 Phase 3 + 61 Phase 4 = 106
  expect(files.length).toBe(106);
});
```

- [ ] **Step 2: Update TOML count expectation**

```javascript
// Change from:
expect(files.length).toBe(12);

// To:
expect(files.length).toBe(14);  // +2 for mcp.toml, rag.toml
```

- [ ] **Step 3: Update domain count expectation**

```javascript
// Ensure domain check accounts for 4 new domains
expect(files.length).toBeGreaterThanOrEqual(16);  // was 12
```

- [ ] **Step 4: Run tests to verify**

```bash
npm test -- test/v2/file-counts.test.js --verbose
```

Expected: All tests pass

- [ ] **Step 5: Commit test updates**

```bash
git add test/v2/file-counts.test.js
git commit -m "test(phase4): update file count expectations for 106 patterns

- Pattern files: 45 → 106
- TOML files: 12 → 14
- Domain files: 12 → 16

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 12: Final Validation

- [ ] **Step 1: Run full test suite**

```bash
npm test
```

Expected: All tests pass

- [ ] **Step 2: Verify pattern count**

```bash
ls src-v2/data/patterns/*.md | wc -l
```

Expected: 106

- [ ] **Step 3: Verify TOML count**

```bash
ls src-v2/customize/*.toml | wc -l
```

Expected: 14

- [ ] **Step 4: Verify domain count**

```bash
ls src-v2/data/domains/*.md | wc -l
```

Expected: At least 16

- [ ] **Step 5: Verify no shortcode duplicates**

```bash
grep -h "^shortcode:" src-v2/data/patterns/*.md | sort | uniq -d
```

Expected: No output (no duplicates)

- [ ] **Step 6: Create summary commit**

```bash
git log --oneline -10
```

Review commits are in order, then tag if desired:
```bash
git tag -a v2-phase4-complete -m "NEXUS Phase 4: 61 new patterns, 106 total"
```

---

## Success Criteria

1. ✅ Shortcode bugs fixed (ZDV→ZAD, ZGV→ZAV)
2. ✅ 61 new pattern files created with YAML frontmatter
3. ✅ All 61 CSV entries added with {date} web queries
4. ✅ 2 new TOML files (mcp, rag) with menu entries
5. ✅ 4 new domain files (mcp, rag, scaling, platform)
6. ✅ 3 new quality gate checklists
7. ✅ 2 patterns merged into existing files
8. ✅ All tests pass (106 patterns expected)
9. ✅ No shortcode conflicts
