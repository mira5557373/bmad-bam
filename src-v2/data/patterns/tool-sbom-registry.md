---
pattern_id: tool-sbom-registry
shortcode: ZTS
category: security
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Tool SBOM Registry - BAM Pattern

**Loaded by:** ZTS  
**Applies to:** AI systems using external tools or MCP servers requiring supply chain security  
**See also:** [agent-registry.md](agent-registry.md), [rbac-per-tool.md](rbac-per-tool.md)

---

## When to Use

- Agents use external tools/MCP servers
- Supply chain security requirements
- Vulnerability tracking needed
- Compliance requires tool inventory

## When NOT to Use

- Only built-in tools used
- No external dependencies
- Air-gapped environments

## Architecture

### SBOM and Vulnerability Scanning

```
┌─────────────────────────────────────────────────────────────┐
│                    Tool SBOM Registry                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                   SBOM Store                             ││
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    ││
│  │  │ Tool A  │  │ Tool B  │  │ Tool C  │  │ MCP Srv │    ││
│  │  │ v1.2.3  │  │ v2.0.0  │  │ v0.9.1  │  │ v1.0.0  │    ││
│  │  │ deps:12 │  │ deps:8  │  │ deps:25 │  │ deps:5  │    ││
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘    ││
│  └───────┼────────────┼────────────┼────────────┼──────────┘│
│          │            │            │            │            │
│          └────────────┴────────────┴────────────┘            │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │ Vulnerability   │                        │
│                   │ Scanner         │                        │
│                   └─────────────────┘                        │
│                                                              │
│  Checks: [CVE Scan] [License] [Signature] [Freshness]       │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P3-07)

```yaml
tool_sbom_registry:
  version: "1.0.0"
  bam_controlled: true
  
  sbom_format: enum[spdx, cyclonedx, custom]
  
  tool_metadata:
    required:
      - tool_id
      - version
      - publisher
      - dependencies
      - hash
      
    optional:
      - license
      - signature
      - last_audit_date
      - cve_scan_date
      
  vulnerability_scanning:
    enabled: bool
    scan_frequency: enum[on_register, daily, weekly]
    sources: list[enum[nvd, github_advisory, osv]]
    block_on_critical: bool
    
  policy_enforcement:
    require_signature: bool
    require_license_allow_list: bool
    max_dependency_age_days: int
    block_unregistered: bool
    
  tenant_configuration:
    per_tenant_tools: bool
    tool_allow_list: bool
    tier_restrictions:
      free: list[string]
      pro: list[string]
      enterprise: list[string]
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Manual SBOM | Control | Maintenance burden | Small tool sets |
| Auto-generated | Complete | May miss nuances | Large deployments |
| Third-party service | Expert scanning | Cost, dependency | Enterprise |

## Web Research Queries

- "software bill of materials AI tools {date}"
- "MCP server security SBOM {date}"
- "agent tool supply chain security {date}"
- "CycloneDX SPDX AI integration {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Tool SBOM registry populated and scanned |

## Related Patterns

- [agent-registry.md](agent-registry.md) - Agent inventory
- [rbac-per-tool.md](rbac-per-tool.md) - Tool permissions
