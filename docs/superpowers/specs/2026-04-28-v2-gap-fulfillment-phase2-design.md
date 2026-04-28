# V2 Gap Fulfillment Phase 2 Design Specification

**Created:** 2026-04-28
**Status:** Approved for Implementation (Revised after self-review)
**Approach:** Layered Dependency Order (4 phases)
**Predecessor:** 2026-04-28-v2-gap-fulfillment-design.md (template migration)

---

## Executive Summary

This design closes remaining content gaps in BAM V2 identified through deep content analysis. Phase 1 (template migration) is complete. Phase 2 follows a layered dependency approach ensuring each layer is complete before the next begins.

**Gaps Addressed (Revised after self-review):**
- 4 missing pattern files (zero-trust, disaster-recovery, secrets-management, incident-response)
- 3 domain enrichments (compliance.md 55→300+, tenant.md 58→200+, security.md 171→280+)
- 3 consolidated skills following V2 6:1 philosophy (security-operations, resilience, privacy-compliance)
- 4 missing TOML extensions (devops, security, compliance, data)

**Self-Review Corrections:**
- ~~6 missing checklists~~ → All 28 referenced checklists exist (qg-s3.md, qg-ce1.md, qg-dr.md, qg-ir.md all present)
- ~~6 new skills~~ → Consolidated to 3 skills per V2 consolidation philosophy (6:1 ratio)

**Alignment:** All components follow BMAD v6.4.0 patterns verified against:
- Pattern reference: `src-v2/data/patterns/tenant-quotas.md` (230 lines)
- TOML reference: `src-v2/customize/bmad-agent-architect.toml`
- Skill reference: `src-v2/skills/bmad-bam-convergence/`

---

## Layer 1: Pattern Files (4 files)

Patterns provide foundational knowledge referenced by domains, skills, and TOMLs.

### 1.1 zero-trust.md

**Location:** `src-v2/data/patterns/zero-trust.md`
**Shortcode:** ZZT
**Size Target:** 180-220 lines

**Structure (following tenant-quotas.md format):**
```markdown
# Zero Trust Architecture - BAM Pattern

**Loaded by:** ZZT
**Applies to:** Never trust, always verify - tenant and service level

---

## When to Use
- Multi-tenant SaaS with sensitive data
- Microservices with inter-service calls
- AI agents accessing tenant resources
- External API integrations

## When NOT to Use
- Single-tenant deployments with network isolation
- Internal tools with trusted networks
- Development environments

## Architecture

### Trust Boundary Model
┌─────────────────────────────────────────────────────────────┐
│                     UNTRUSTED ZONE                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              API Gateway (JWT + tenant_id)             │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │          Service Mesh (mTLS + identity)         │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │        Database (RLS + context)           │  │  │  │
│  │  │  │  ┌───────────────────────────────────┐    │  │  │  │
│  │  │  │  │    AI Agent (tools + budget)      │    │  │  │  │
│  │  │  │  └───────────────────────────────────┘    │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

### Verification Points
| Layer | Verification | Enforcement |
|-------|-------------|-------------|
| API Gateway | JWT + tenant_id | Block |
| Service Mesh | mTLS + service identity | Block |
| Database | RLS + connection context | Filter |
| AI Agent | Tool permissions + budget | Throttle |

### Implementation Schema
zero_trust_config:
  identity_provider: string
  token_validation:
    issuer: string
    audience: string
    tenant_claim: string
  service_mesh:
    mtls_enabled: bool
    service_accounts: string[]
  database_context:
    rls_enabled: bool
    context_propagation: string

## Trade-offs
| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Full zero trust | Maximum security | Performance overhead | Regulated industries |
| Perimeter + internal trust | Better performance | Single breach exposure | Internal tools |
| Selective trust | Balanced | Complex configuration | Hybrid deployments |

## Web Research Queries
- "zero trust architecture multi-tenant SaaS {date}"
- "service mesh mTLS patterns {date}"
- "AI agent permission boundaries {date}"
```

### 1.2 disaster-recovery.md

**Location:** `src-v2/data/patterns/disaster-recovery.md`
**Shortcode:** ZDR
**Size Target:** 200-250 lines
**Quality Gate:** QG-DR (existing checklist)

**Content:**
- RTO/RPO tier table (Free: 24h/24h, Pro: 4h/1h, Enterprise: 1h/15min)
- Backup strategies ASCII diagram (hot/warm/cold standby)
- Failover automation flow
- Tenant data priority matrix
- Cross-region replication patterns
- YAML schema: DR configuration per tier

### 1.3 secrets-management.md

**Location:** `src-v2/data/patterns/secrets-management.md`
**Shortcode:** ZSM
**Size Target:** 180-220 lines
**Quality Gate:** QG-S3 (existing checklist)

**Content:**
- Tenant-scoped secrets isolation
- Vault integration patterns (HashiCorp, AWS Secrets Manager, Azure Key Vault)
- Rotation strategies without downtime
- Agent credential management (short-lived tokens)
- Secret lifecycle ASCII diagram
- YAML schema: Secrets configuration

### 1.4 incident-response.md

**Location:** `src-v2/data/patterns/incident-response.md`
**Shortcode:** ZIR
**Size Target:** 180-220 lines
**Quality Gate:** QG-IR (existing checklist)

**Content:**
- Severity classification (P0-P3) with tenant impact matrix
- Escalation paths per tier
- Communication templates (tenant notification)
- Runbook integration points
- Incident timeline ASCII diagram
- YAML schema: Incident configuration

---

## Layer 2: Domain Enrichments (3 files)

Domains consolidate knowledge for agent guidance. These enhancements add missing capabilities while preserving existing content.

### 2.1 compliance.md Enhancement

**Location:** `src-v2/data/domains/compliance.md`
**Current:** 55 lines
**Target:** 300+ lines

**Content Additions (append to existing):**

**GDPR Section:**
- Data Subject Rights table (Access Art.15, Erasure Art.17, Portability Art.20, Rectification Art.16)
- Lawful Basis Tracking (consent, legitimate interest, contract)
- Cross-Border Transfer (SCCs, adequacy decisions, data residency)
- DPO integration requirements

**CCPA Section:**
- Consumer Rights (know, delete, opt-out, non-discrimination)
- Do Not Sell Implementation
- 12-month lookback requirements

**SOC 2 Type II Section:**
- Trust Service Criteria table (Security CC1-9, Availability A1, Confidentiality C1, Processing Integrity PI1, Privacy P1-8)
- Evidence Collection automation patterns
- Continuous compliance monitoring

**HIPAA Section (if applicable):**
- PHI Handling (BAA, minimum necessary, audit logging)
- Breach notification requirements

**PCI-DSS Section (if applicable):**
- Cardholder Data scope (segmentation, encryption, quarterly scans)

**Pattern References:**
- `zero-trust.md` for security controls
- `compliance-frameworks.csv` for framework matrix

### 2.2 tenant.md Enhancement

**Location:** `src-v2/data/domains/tenant.md`
**Current:** 58 lines
**Target:** 200+ lines

**Content Additions (append to existing):**

**Advanced Isolation Patterns:**
- Hybrid Isolation (combining RLS + schema for sensitive data)
- Tenant Hierarchy (parent/child, reseller, enterprise sub-tenants)
- Resource Quotas by Tier (reference to tenant-quotas.md pattern)

**Tenant Lifecycle Events:**
- Provisioning Sequence (5 steps: record → schema → seed → webhooks → welcome)
- Suspension Flow (grace period, limited access, reactivation)
- Termination Flow (export window, backup retention, hard delete schedule)

**Cross-Tenant Operations:**
- Admin Access Patterns (super-admin audit, tenant-admin scope)
- Data Migration (tenant-to-tenant copy, merge, split)
- Tenant impersonation for support (audit requirements)

### 2.3 security.md Enhancement

**Location:** `src-v2/data/domains/security.md`
**Current:** 171 lines
**Target:** 280+ lines

**Content Additions (append to existing):**

**AI-Specific Security:**
- Prompt Injection Prevention table (direct, indirect, jailbreak detection/mitigation)
- AI Red Teaming checklist (adversarial testing, model boundaries, output validation)
- LLM Security Controls (token budget, response filtering, PII detection in outputs)

**Threat Modeling Integration:**
- STRIDE per Component table (API Gateway, Tenant Service, AI Agent)
- Attack Tree methodology reference
- Threat-to-mitigation mapping

**Security Operations:**
- Vulnerability Management (CVE tracking, patch priority by tenant impact)
- Penetration Testing (multi-tenant scope, tenant boundary validation, AI component testing)

---

## Layer 3: Skills (3 Consolidated Workflows)

Following V2 consolidation philosophy (6:1 ratio), the original 6 skills are consolidated into 3.

### 3.1 bmad-bam-security-operations

**Location:** `src-v2/skills/bmad-bam-security-operations/`
**Consolidates:** secrets-management, threat-modeling, incident-response
**Quality Gates:** QG-S3, QG-IR
**Menu Codes:** ZSO (main), ZSR (secrets), ZST (threat), ZIR (incident)

**Files:**
- `SKILL.md` - Overview with 6-step activation
- `bmad-skill-manifest.yaml` - Metadata
- `customize.toml` - Customization points
- `workflow.md` - Mode router with sub-workflow selection
- `steps/step-01-c-select-focus.md` - Choose: secrets, threat-model, or incident
- `steps/step-02-c-secrets-analysis.md`
- `steps/step-03-c-secrets-rotation.md`
- `steps/step-04-c-threat-stride.md`
- `steps/step-05-c-threat-mitigations.md`
- `steps/step-06-c-incident-classification.md`
- `steps/step-07-c-incident-runbooks.md`
- `steps/step-20-v-validate-security.md`

**Outputs:** 
- `secrets-management-design.md`
- `threat-model.md`
- `incident-response-plan.md`

### 3.2 bmad-bam-resilience

**Location:** `src-v2/skills/bmad-bam-resilience/`
**Consolidates:** disaster-recovery, chaos-engineering
**Quality Gates:** QG-DR, QG-CE1
**Menu Codes:** ZRS (main), ZDR (DR), ZCH (chaos)

**Files:**
- `SKILL.md` - Overview
- `bmad-skill-manifest.yaml`
- `customize.toml`
- `workflow.md` - Mode router
- `steps/step-01-c-select-focus.md` - Choose: DR or chaos
- `steps/step-02-c-dr-rto-rpo.md`
- `steps/step-03-c-dr-failover.md`
- `steps/step-04-c-chaos-blast-radius.md`
- `steps/step-05-c-chaos-experiments.md`
- `steps/step-20-v-validate-resilience.md`

**Outputs:**
- `disaster-recovery-plan.md`
- `chaos-engineering-plan.md`

### 3.3 bmad-bam-privacy-compliance

**Location:** `src-v2/skills/bmad-bam-privacy-compliance/`
**Consolidates:** gdpr-compliance (+ future CCPA, privacy workflows)
**Quality Gate:** QG-CC (uses existing qg-ops.md)
**Menu Codes:** ZPC (main), ZGD (GDPR)

**Files:**
- `SKILL.md` - Overview
- `bmad-skill-manifest.yaml`
- `customize.toml`
- `workflow.md` - Mode router
- `steps/step-01-c-data-mapping.md`
- `steps/step-02-c-consent-management.md`
- `steps/step-03-c-dsar-automation.md`
- `steps/step-04-c-cross-border.md`
- `steps/step-20-v-validate-privacy.md`

**Outputs:**
- `privacy-compliance-assessment.md`
- `gdpr-dsar-procedures.md`

### Skill File Templates

**SKILL.md Template:**
```markdown
---
name: bmad-bam-{skill-name}
description: '{One-line description}'
module: bam
tags: [{category}, {subcategory}]
---

# {Skill Display Name}

## Overview
{What this workflow produces and why}

## Sub-Workflows
| Focus | Menu Code | Steps | Output |
|-------|-----------|-------|--------|
| {sub1} | Z{XX} | step-0N-c | {artifact1}.md |
| {sub2} | Z{XX} | step-0N-c | {artifact2}.md |

## Modes
| Mode | Purpose | Steps |
|------|---------|-------|
| Create | Generate new | step-01-c to step-0N-c |
| Edit | Modify existing | step-10-e to step-11-e |
| Validate | Check criteria | step-20-v to step-22-v |

## Prerequisites
- {Prerequisites}
- **Config required:** `tenant_model`, `ai_runtime`

## Quality Gates
- **{QG-XX}:** {Gate description}

## Outputs
- `{output_folder}/planning-artifacts/{artifact}.md`

## Related Workflows
- `bmad-bam-{related}` - {Relationship}

## On Activation
[6-step activation sequence from V2 template]

## Domain References
- `{project-root}/_bmad/bam/data/patterns/{pattern}.md`
- `{project-root}/_bmad/bam/data/domains/{domain}.md`
```

---

## Layer 4: TOML Extensions (4 files)

TOMLs add menu items to existing agents, referencing the consolidated skills and new patterns.

### 4.1 bmad-agent-devops.toml

**Location:** `src-v2/customize/bmad-agent-devops.toml`
**Extends:** bmad-agent-dev (DevOps persona)

```toml
# BAM DevOps Extensions for bmad-agent-dev
# Adds disaster recovery, chaos engineering capabilities

[agent]
activation_steps_append = [
  "BAM DevOps capabilities available. Use ZRS for resilience workflows.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/patterns/disaster-recovery.md",
]

principles = [
  "BAM DevOps: Design for failure, test recovery regularly.",
  "BAM DevOps: Chaos experiments must be tenant-safe with blast radius containment.",
  "BAM Gates: QG-DR (Disaster Recovery), QG-CE1 (Chaos Engineering).",
]

[[agent.menu]]
code = "ZRS"
description = "Resilience: DR and chaos engineering workflows"
skill = "bmad-bam-resilience"

[[agent.menu]]
code = "ZPDR"
description = "Load: Disaster Recovery pattern details"
prompt = """
Loading disaster recovery pattern:
`{project-root}/_bmad/bam/data/patterns/disaster-recovery.md`

Confirm loaded. Ready for DR planning guidance.
"""
```

### 4.2 bmad-agent-security.toml

**Location:** `src-v2/customize/bmad-agent-security.toml`
**Extends:** bmad-agent-architect (Security focus)

```toml
# BAM Security Extensions for bmad-agent-architect
# Adds secrets, threat modeling, incident response

[agent]
activation_steps_append = [
  "BAM Security capabilities available. Use ZSO for security operations.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/patterns/secrets-management.md",
  "file:{project-root}/_bmad/bam/data/patterns/incident-response.md",
  "file:{project-root}/_bmad/bam/data/patterns/zero-trust.md",
]

principles = [
  "BAM Security: Zero trust for all tenant boundaries.",
  "BAM Security: Secrets must be tenant-isolated and rotatable.",
  "BAM Security: Incident response must include tenant notification.",
  "BAM Gates: QG-S3 (Security Baseline), QG-IR (Incident Response).",
]

[[agent.menu]]
code = "ZSO"
description = "Security Operations: secrets, threat modeling, incident response"
skill = "bmad-bam-security-operations"

[[agent.menu]]
code = "ZPZT"
description = "Load: Zero Trust pattern details"
prompt = """
Loading zero trust pattern:
`{project-root}/_bmad/bam/data/patterns/zero-trust.md`

Confirm loaded. Ready for zero trust architecture guidance.
"""

[[agent.menu]]
code = "ZPSM"
description = "Load: Secrets Management pattern details"
prompt = """
Loading secrets management pattern:
`{project-root}/_bmad/bam/data/patterns/secrets-management.md`

Confirm loaded. Ready for secrets architecture guidance.
"""
```

### 4.3 bmad-agent-compliance.toml

**Location:** `src-v2/customize/bmad-agent-compliance.toml`
**Extends:** bmad-agent-analyst (Compliance focus)

```toml
# BAM Compliance Extensions for bmad-agent-analyst
# Adds GDPR, privacy compliance capabilities

[agent]
activation_steps_append = [
  "BAM Compliance capabilities available. Use ZPC for privacy workflows.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/domains/compliance.md",
  "file:{project-root}/_bmad/bam/data/compliance-frameworks.csv",
]

principles = [
  "BAM Compliance: Data subject rights are non-negotiable.",
  "BAM Compliance: Consent must be granular and auditable.",
  "BAM Compliance: Cross-border transfers require documented legal basis.",
  "BAM Gates: QG-CC (Continuous Compliance via qg-ops.md).",
]

[[agent.menu]]
code = "ZPC"
description = "Privacy Compliance: GDPR, CCPA workflows"
skill = "bmad-bam-privacy-compliance"

[[agent.menu]]
code = "ZDC"
description = "Load: Full compliance domain context"
prompt = """
Loading compliance domain context:
`{project-root}/_bmad/bam/data/domains/compliance.md`
`{project-root}/_bmad/bam/data/compliance-frameworks.csv`

Confirm loaded. Ready for compliance assessment guidance.
"""
```

### 4.4 bmad-agent-data.toml

**Location:** `src-v2/customize/bmad-agent-data.toml`
**Extends:** bmad-agent-architect (Data focus)

```toml
# BAM Data Extensions for bmad-agent-architect
# Adds data residency, tenant lifecycle capabilities

[agent]
activation_steps_append = [
  "BAM Data capabilities available. Use ZDD for data domain context.",
]

persistent_facts = [
  "file:{project-root}/_bmad/bam/data/domains/tenant.md",
]

principles = [
  "BAM Data: Tenant data residency is a deployment constraint.",
  "BAM Data: Data lifecycle must include retention and purge schedules.",
  "BAM Data: Cross-tenant queries are prohibited by default.",
]

[[agent.menu]]
code = "ZDD"
description = "Load: Data domain context (residency, lifecycle, isolation)"
prompt = """
Loading data domain context:
`{project-root}/_bmad/bam/data/domains/tenant.md`
`{project-root}/_bmad/bam/data/patterns/rls.md`

Confirm loaded. Ready for data architecture guidance.
"""

[[agent.menu]]
code = "ZDL"
description = "Load: Tenant lifecycle patterns"
prompt = """
Loading tenant lifecycle context:
`{project-root}/_bmad/bam/data/domains/tenant.md`

Focus: provisioning, suspension, termination flows.
Confirm loaded. Ready for lifecycle design guidance.
"""
```

---

## Checklist Status (Self-Review Correction)

**Original claim:** 6 missing checklists
**Actual state:** All 28 referenced checklists exist

| Checklist | Status | Referenced By |
|-----------|--------|---------------|
| qg-s3.md | EXISTS | QG-S3 Security Baseline |
| qg-ce1.md | EXISTS | QG-CE1 Chaos Engineering |
| qg-dr.md | EXISTS | QG-DR1 Disaster Recovery |
| qg-ir.md | EXISTS | QG-IR1 Incident Response |
| qg-ops.md | EXISTS | QG-CC, QG-S5, etc. (shared ops) |

**No new checklists required.**

---

## Test Updates

Update `test/v2/file-counts.test.js`:

```javascript
test('pattern files (26+)', () => {
  // 22 existing + 4 new
  const files = fs.readdirSync(path.join(v2Dir, 'data/patterns')).filter(f => f.endsWith('.md'));
  expect(files.length).toBeGreaterThanOrEqual(26);
});

test('33 workflow skills', () => {
  // 30 existing + 3 new (consolidated)
  const dirs = fs.readdirSync(path.join(v2Dir, 'skills')).filter(d =>
    d.startsWith('bmad-bam-') && fs.statSync(path.join(v2Dir, 'skills', d)).isDirectory()
  );
  expect(dirs.length).toBe(33);
});

test('12 TOML customize files', () => {
  // 8 existing + 4 new
  const files = fs.readdirSync(path.join(v2Dir, 'customize')).filter(f => f.endsWith('.toml'));
  expect(files.length).toBe(12);
});

// Checklist test unchanged - already passing with 31 files
```

---

## Implementation Order

| Phase | Task | Files | Dependencies |
|-------|------|-------|--------------|
| 1 | Create 4 pattern files | 4 | None |
| 2 | Enhance 3 domain files | 3 | Layer 1 patterns |
| 3 | Create 3 skill directories | ~20 | Layers 1-2 |
| 4 | Create 4 TOML extensions | 4 | Layers 1-3 |
| 5 | Update test assertions | 1 | All layers |
| 6 | Run verification | 0 | All complete |

---

## File Summary (Revised)

| Category | New Files | Total After |
|----------|-----------|-------------|
| Patterns | 4 | 26 |
| Domains | 0 (enhancements) | 16 |
| Skills | 3 directories (~20 files) | 33 |
| TOMLs | 4 | 12 |
| Checklists | 0 (all exist) | 31 |
| **Total New Files** | ~31 | - |

---

## Verification Checklist

- [ ] All patterns have ASCII diagrams
- [ ] All patterns have YAML implementation schemas
- [ ] All patterns have Web Research Queries section
- [ ] All domain enhancements preserve existing content
- [ ] All skills have complete 5-file structure
- [ ] All skills have steps directory with mode-prefixed files
- [ ] All TOMLs use correct shortcode format (ZXX)
- [ ] All TOMLs reference existing agent bases
- [ ] All tests pass after implementation
- [ ] No broken cross-references

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-04-28 | Claude | Initial Phase 2 design spec |
| 1.1.0 | 2026-04-28 | Claude | Self-review corrections: removed 6 checklist claims (all exist), consolidated 6 skills to 3 per V2 philosophy |
