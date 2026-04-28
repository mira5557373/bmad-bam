# V2 Gap Fulfillment Phase 2 Design Specification

**Created:** 2026-04-28
**Status:** Approved for Implementation
**Approach:** Layered Dependency Order (4 phases)
**Predecessor:** 2026-04-28-v2-gap-fulfillment-design.md (template migration)

---

## Executive Summary

This design closes remaining content gaps in BAM V2 identified through deep content analysis. Phase 1 (template migration) is complete. Phase 2 follows a layered dependency approach ensuring each layer is complete before the next begins.

**Gaps Addressed:**
- 4 missing pattern files (zero-trust, disaster-recovery, secrets-management, incident-response)
- 3 domain enrichments (compliance.md, tenant.md, security.md)
- 6 missing skills (secrets-management, threat-modeling, incident-response, disaster-recovery, chaos-engineering, gdpr-compliance)
- 4 missing TOML extensions (devops, security, compliance, data)
- 6 missing checklists (qg-s3, qg-ir1, qg-dr1, qg-ce1, qg-cc, qg-st)

**Alignment:** All components follow BMAD v6.4.0 patterns verified against existing V2 reference files.

---

## Layer 1: Pattern Files (4 files)

Patterns provide foundational knowledge referenced by domains, skills, and TOMLs.

### 1.1 zero-trust.md

**Location:** `src-v2/data/patterns/zero-trust.md`
**Shortcode:** ZZT
**Size Target:** 180-220 lines

**Structure:**
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
[ASCII diagram showing tenant boundaries, service mesh, identity verification points]

### Verification Points
| Layer | Verification | Enforcement |
|-------|-------------|-------------|
| API Gateway | JWT + tenant_id | Block |
| Service Mesh | mTLS + service identity | Block |
| Database | RLS + connection context | Filter |
| AI Agent | Tool permissions + budget | Throttle |

### Implementation Schema
yaml format with:
- identity_provider
- token_validation
- service_mesh
- database_context

## Trade-offs
[Table comparing strict vs relaxed trust models]

## Web Research Queries
- "zero trust architecture multi-tenant SaaS {date}"
- "service mesh mTLS patterns {date}"
- "AI agent permission boundaries {date}"
```

### 1.2 disaster-recovery.md

**Location:** `src-v2/data/patterns/disaster-recovery.md`
**Shortcode:** ZDR
**Size Target:** 200-250 lines

**Content:**
- RTO/RPO definitions per tenant tier
- Backup strategies (hot/warm/cold standby)
- Failover automation patterns
- Tenant data priority during recovery
- Cross-region replication patterns
- ASCII diagram: Recovery flow with decision points
- YAML schema: DR configuration per tier

**Quality Gate Reference:** QG-DR1

### 1.3 secrets-management.md

**Location:** `src-v2/data/patterns/secrets-management.md`
**Shortcode:** ZSM
**Size Target:** 180-220 lines

**Content:**
- Tenant-scoped secrets isolation
- Vault integration patterns (HashiCorp, AWS Secrets Manager)
- Rotation strategies without downtime
- Agent credential management
- ASCII diagram: Secret lifecycle with rotation
- YAML schema: Secrets configuration

**Quality Gate Reference:** QG-S3 (Security Baseline)

### 1.4 incident-response.md

**Location:** `src-v2/data/patterns/incident-response.md`
**Shortcode:** ZIR
**Size Target:** 180-220 lines

**Content:**
- Severity classification (P0-P3) with tenant impact
- Escalation paths per tier
- Communication templates
- Runbook integration
- ASCII diagram: Incident timeline with checkpoints
- YAML schema: Incident configuration

**Quality Gate Reference:** QG-IR1

---

## Layer 2: Domain Enrichments (3 files)

Domains consolidate knowledge for agent guidance. These enhancements add missing capabilities while preserving existing content.

### 2.1 compliance.md Enhancement

**Location:** `src-v2/data/domains/compliance.md`
**Current:** 56 lines
**Target:** 300+ lines

**Content Additions:**

**GDPR Section:**
- Data Subject Rights table (Access, Erasure, Portability, Rectification)
- Lawful Basis Tracking (consent, legitimate interest, contract)
- Cross-Border Transfer (SCCs, data residency)

**CCPA Section:**
- Consumer Rights (know, delete, opt-out, non-discrimination)
- Do Not Sell Implementation

**SOC 2 Type II Section:**
- Trust Service Criteria table (Security, Availability, Confidentiality, Processing Integrity, Privacy)
- Evidence Collection patterns

**HIPAA Section:**
- PHI Handling (BAA, minimum necessary, audit logging)

**PCI-DSS Section (if applicable):**
- Cardholder Data (segmentation, encryption, scans)

**Pattern References:**
- zero-trust.md
- compliance-frameworks.csv

### 2.2 tenant.md Enhancement

**Location:** `src-v2/data/domains/tenant.md`
**Current:** 58 lines
**Target:** 200+ lines

**Content Additions:**

**Advanced Isolation Patterns:**
- Hybrid Isolation (combining RLS + schema)
- Tenant Hierarchy (parent/child, reseller, enterprise sub-tenants)
- Resource Quotas by Tier (reference to tenant-quotas.md)

**Tenant Lifecycle Events:**
- Provisioning Sequence (5 steps)
- Suspension Flow (grace period, access, reactivation)
- Termination Flow (export window, backup retention, hard delete)

**Cross-Tenant Operations:**
- Admin Access Patterns (super-admin vs tenant-admin)
- Data Migration (tenant-to-tenant, merge, split)

### 2.3 security.md Enhancement

**Location:** `src-v2/data/domains/security.md`
**Current:** 172 lines
**Target:** 280+ lines

**Content Additions:**

**AI-Specific Security:**
- Prompt Injection Prevention table (detection, mitigation)
- AI Red Teaming (adversarial testing, boundaries, output validation)
- LLM Security Controls (token budget, response filtering, PII detection)

**Threat Modeling Integration:**
- STRIDE per Component table
- Attack Trees (reference to threat-modeling skill)

**Security Operations:**
- Vulnerability Management (CVE tracking, patch priority)
- Penetration Testing (scope for multi-tenant, boundary validation)

---

## Layer 3: Skills (6 workflows)

Each skill follows V2 structure: SKILL.md, bmad-skill-manifest.yaml, customize.toml, workflow.md, steps/

### 3.1 bmad-bam-secrets-management

**Location:** `src-v2/skills/bmad-bam-secrets-management/`
**Quality Gate:** QG-S3
**Menu Code:** ZSR

**Files:**
- `SKILL.md` - Overview with 6-step activation
- `bmad-skill-manifest.yaml` - Metadata
- `customize.toml` - Customization points
- `workflow.md` - Mode router
- `steps/step-01-c-analyze-secrets.md`
- `steps/step-02-c-design-rotation.md`
- `steps/step-03-c-implement-vault.md`
- `steps/step-20-v-validate-isolation.md`

**Outputs:** `secrets-management-design.md`

### 3.2 bmad-bam-threat-modeling

**Location:** `src-v2/skills/bmad-bam-threat-modeling/`
**Quality Gate:** QG-S3
**Menu Code:** ZST

**Files:** Standard skill structure
**Focus:** STRIDE analysis, attack trees, mitigation planning
**Outputs:** `threat-model.md`

### 3.3 bmad-bam-incident-response

**Location:** `src-v2/skills/bmad-bam-incident-response/`
**Quality Gate:** QG-IR1
**Menu Code:** ZIR

**Files:** Standard skill structure
**Focus:** Severity classification, escalation, postmortem
**Outputs:** `incident-response-plan.md`

### 3.4 bmad-bam-disaster-recovery

**Location:** `src-v2/skills/bmad-bam-disaster-recovery/`
**Quality Gate:** QG-DR1
**Menu Code:** ZDR

**Files:** Standard skill structure
**Focus:** RTO/RPO definition, backup strategy, failover testing
**Outputs:** `disaster-recovery-plan.md`

### 3.5 bmad-bam-chaos-engineering

**Location:** `src-v2/skills/bmad-bam-chaos-engineering/`
**Quality Gate:** QG-CE1
**Menu Code:** ZCH

**Files:** Standard skill structure
**Focus:** Blast radius, tenant safety, experiment design
**Outputs:** `chaos-engineering-plan.md`

### 3.6 bmad-bam-gdpr-compliance

**Location:** `src-v2/skills/bmad-bam-gdpr-compliance/`
**Quality Gate:** QG-CC
**Menu Code:** ZGD

**Files:** Standard skill structure
**Focus:** Data mapping, consent management, DSAR automation
**Outputs:** `gdpr-compliance-assessment.md`

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

## Modes
| Mode | Purpose | Steps |
|------|---------|-------|
| Create | {Create description} | step-01-c to step-0N-c |
| Edit | {Edit description} | step-10-e to step-1N-e |
| Validate | {Validate description} | step-20-v to step-2N-v |

## Prerequisites
- {Prerequisites}
- **Config required:** `{config_variables}`

## Quality Gates
- **{QG-XX}:** {Gate description}

## Outputs
- `{output_folder}/planning-artifacts/{artifact}.md`

## Related Workflows
- `bmad-bam-{related}` - {Relationship}

## On Activation
[6-step activation sequence]

## Domain References
- `{project-root}/_bmad/bam/data/patterns/{pattern}.md`
- `{project-root}/_bmad/bam/data/domains/{domain}.md`
```

**bmad-skill-manifest.yaml Template:**
```yaml
type: workflow
name: bmad-bam-{skill-name}
displayName: {Display Name}
description: '{Description}'
module: bam
config_variables:
  - tenant_model
  - ai_runtime
step_naming_convention: "step-NN-mode-description"
```

**customize.toml Template:**
```toml
[workflow]
activation_steps_prepend = []
activation_steps_append = [
  "BAM {skill-name} workflow ready.",
]
persistent_facts = [
  "file:{project-root}/_bmad/bam/data/patterns/{pattern}.md",
  "file:{project-root}/_bmad/bam/data/checklists/{checklist}.md",
]
principles = [
  "{Skill-specific principle 1}",
  "{Skill-specific principle 2}",
]
```

---

## Layer 4: TOML Extensions (4 files)

TOMLs add menu items to existing agents, referencing the new skills and patterns.

### 4.1 bmad-agent-devops.toml

**Location:** `src-v2/customize/bmad-agent-devops.toml`
**Extends:** bmad-agent-dev (DevOps persona)

**Menu Items:**
- `ZDR` - Disaster Recovery skill
- `ZCH` - Chaos Engineering skill
- `ZPDR` - Load DR pattern

**Principles:**
- Design for failure, test recovery regularly
- Chaos experiments must be tenant-safe
- Gates: QG-DR1, QG-CE1

### 4.2 bmad-agent-security.toml

**Location:** `src-v2/customize/bmad-agent-security.toml`
**Extends:** bmad-agent-architect (Security focus)

**Menu Items:**
- `ZSR` - Secrets Management skill
- `ZST` - Threat Modeling skill
- `ZIR` - Incident Response skill
- `ZPZT` - Load Zero Trust pattern
- `ZPSM` - Load Secrets Management pattern
- `ZPIR` - Load Incident Response pattern

**Principles:**
- Zero trust for all tenant boundaries
- Secrets must be tenant-isolated and rotatable
- Incident response must include tenant notification
- Gates: QG-S3, QG-IR1

### 4.3 bmad-agent-compliance.toml

**Location:** `src-v2/customize/bmad-agent-compliance.toml`
**Extends:** bmad-agent-analyst (Compliance focus)

**Menu Items:**
- `ZGD` - GDPR Compliance skill
- `ZDC` - Load full compliance domain

**Principles:**
- Data subject rights are non-negotiable
- Consent must be granular and auditable
- Cross-border transfers require documented basis
- Gates: QG-CC

### 4.4 bmad-agent-data.toml

**Location:** `src-v2/customize/bmad-agent-data.toml`
**Extends:** bmad-agent-architect (Data focus)

**Menu Items:**
- `ZDD` - Load data domain context
- `ZDL` - Load tenant lifecycle patterns

**Principles:**
- Tenant data residency is a deployment constraint
- Data lifecycle must include retention and purge
- Cross-tenant queries are prohibited by default

---

## Checklist Alignment

New checklists to create:

| Checklist | Gate ID | Skill Reference |
|-----------|---------|-----------------|
| qg-s3.md | QG-S3 | secrets-management, threat-modeling |
| qg-ir1.md | QG-IR1 | incident-response |
| qg-dr1.md | QG-DR1 | disaster-recovery |
| qg-ce1.md | QG-CE1 | chaos-engineering |
| qg-cc.md | QG-CC | gdpr-compliance |
| qg-st.md | QG-ST | threat-modeling |

**Checklist Template (from qg-f1.md):**
```markdown
# {Gate ID}: {Gate Name}

**Workflow:** {entry_workflows}
**Prerequisites:** {dependencies}

## Critical Checks (All Must Pass)
- [ ] **CRITICAL:** {Check 1}
- [ ] **CRITICAL:** {Check 2}

## Standard Checks
- [ ] {Check 1}
- [ ] {Check 2}

## Recovery Protocol
{fail_recovery from CSV}

## Outcome
| Result | Criteria |
|--------|----------|
| PASS | All critical + 80% standard |
| CONDITIONAL | All critical, <80% standard + mitigation |
| FAIL | Any critical fails |
```

---

## Test Updates

Update `test/v2/file-counts.test.js`:

```javascript
test('pattern files (14+)', () => {
  // 10 existing + 4 new
  expect(files.length).toBeGreaterThanOrEqual(14);
});

test('36 workflow skills', () => {
  // 30 existing + 6 new
  expect(dirs.length).toBe(36);
});

test('12 TOML customize files', () => {
  // 8 existing + 4 new
  expect(files.length).toBe(12);
});

test('checklist files (14+)', () => {
  // 8 existing + 6 new
  expect(files.length).toBeGreaterThanOrEqual(14);
});
```

---

## Implementation Order

| Phase | Task | Files | Dependencies |
|-------|------|-------|--------------|
| 1 | Create 4 pattern files | 4 | None |
| 2 | Enhance 3 domain files | 3 | Layer 1 patterns |
| 3 | Create 6 skill directories | ~30 | Layers 1-2 |
| 4 | Create 4 TOML extensions | 4 | Layers 1-3 |
| 5 | Create 6 checklists | 6 | Layers 1-3 |
| 6 | Update test assertions | 1 | All layers |
| 7 | Run verification | 0 | All complete |

---

## File Summary

| Category | New Files | Total After |
|----------|-----------|-------------|
| Patterns | 4 | 14+ |
| Domains | 0 (enhancements) | 12+ |
| Skills | 6 directories (~30 files) | 36 |
| TOMLs | 4 | 12 |
| Checklists | 6 | 14+ |
| **Total New Files** | ~50 | - |

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
- [ ] All checklists follow QG-XX naming
- [ ] All checklists have CRITICAL checks marked
- [ ] All tests pass after implementation
- [ ] No broken cross-references

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-04-28 | Claude | Initial Phase 2 design spec |
