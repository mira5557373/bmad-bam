# BAM Tier-H Federation Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing agent-to-agent communication,
or when user mentions federation, A2A, or cross-system agent interop.

**Integrates with:** Nova (AI Runtime), L17 A2A Interoperability layer

---

## Core Concepts

### Tier-H Operating Model

Tier-H ("Hyper-scale") enables agent federation across tenant and system boundaries.

```
Tenant A Agent ←→ Federation Layer ←→ Tenant B Agent
       │                │                    │
       └────────────────┴────────────────────┘
                   Tier-H Federation
              (Cross-boundary agent comms)
```

### Federation Modes

| Mode | Trust Level | Use Case |
|------|-------------|----------|
| Internal | High | Same tenant, different agents |
| Partner | Medium | Pre-approved external tenants |
| Public | Low | Open agent marketplace |

### Agent Card Schema (A2A Protocol)

```yaml
agent_card:
  id: "agent-uuid"
  tenant_id: "tenant-uuid"
  capabilities:
    - action_type: "data_retrieval"
      confidence_min: 0.8
  
  federation:
    mode: partner
    allowed_tenants: ["tenant-b", "tenant-c"]
    rate_limit: 100_per_minute
  
  proof_requirements:
    require_certificate: true
    verify_chain: true
```

### Cross-Tenant Action Contract

When Agent A (Tenant X) calls Agent B (Tenant Y):

| Field | Source | Validation |
|-------|--------|------------|
| tenant_id | Agent A's tenant | Must match caller |
| target_tenant_id | Agent B's tenant | Must be in allowed list |
| federation_token | Federation layer | JWT with short TTL |
| action_contract | Agent A | Full 8-field contract |

### Federation Security Layers

| Layer | Mechanism | Purpose |
|-------|-----------|---------|
| Transport | Mutual TLS | Identity verification |
| Authentication | JWT + JWKS | Token validation |
| Authorization | RBAC + tenant scope | Permission check |
| Audit | Distributed trace | Compliance trail |

## Application Guidelines

1. **Default to Internal mode** - Least privilege principle ensures agents only communicate within their own tenant boundary unless explicitly configured otherwise
2. **Require mutual TLS** - For Partner/Public modes, bidirectional certificate validation prevents impersonation attacks
3. **Log all cross-tenant calls** - Audit requirement for compliance, every federation request must include correlation IDs for distributed tracing
4. **Set conservative rate limits** - Prevent abuse and resource exhaustion, start with 10 requests/minute for new federation partners
5. **Validate agent cards on each request** - Agent capabilities and permissions may change, do not cache indefinitely

## Decision Framework

| Scenario | Federation Mode | Security Level |
|----------|----------------|----------------|
| Same-tenant agents | Internal | Standard auth |
| B2B integration | Partner | mTLS + allow list |
| Marketplace | Public | Full verification |
| Regulated data | None | No federation |

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Runtime design
- `bmad-bam-action-contract-design` - Contract requirements
- `bmad-bam-ai-security-testing` - Security validation

## Related Patterns

Load from pattern registry:

- **Federation patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `federation-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "agent-to-agent protocol interoperability {date}"
- Search: "multi-tenant AI federation patterns {date}"
- Search: "A2A agent card specification {date}"
