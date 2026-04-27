# Step 20: Load Security Artifact and Checklist

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing security-design.md file
- 📖 ALWAYS read the complete document and QG-S3 checklist
- 🔄 ALWAYS map artifact sections to checklist categories
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT all security controls for validation mapping
- 📋 PRESENT validation scope summary with estimated check counts
- 🎯 IDENTIFY CRITICAL checks that must pass for QG-S3 compliance

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load security design artifact and QG-S3 validation checklist
- 💾 Track: `validateMode: true, stepsCompleted: [20]` when complete
- 📖 Context: Prepare for security baseline validation
- 🚫 Do NOT: Perform validation yet; only load and prepare
- 🔍 Use web search: Not required for loading step
- ⚠️ Gate: QG-S3 (Security Baseline) - preparation

---

## YOUR TASK

Load the security design artifact and QG-S3 security baseline checklist, map all artifact sections to validation categories, identify CRITICAL checks, and prepare the validation scope for execution in Step 21.

---

## Purpose

Load the security design artifact and the QG-S3 security baseline checklist in preparation for validation. Extract all sections and validation criteria.

---

## Prerequisites

- Security design document exists at `{output_folder}/planning-artifacts/security-design.md`
- QG-S3 checklist available

---

## Actions

### 1. Load Security Design Artifact

**Load artifact:** `{output_folder}/planning-artifacts/security-design.md`

**Extract sections:**

| Section | Present | Content Summary |
|---------|---------|-----------------|
| Executive Summary | Yes/No | |
| Authentication Architecture | Yes/No | JWT, MFA, Sessions, SSO |
| Authorization Architecture | Yes/No | RBAC, Permissions, API Keys |
| Data Protection Architecture | Yes/No | Encryption, Keys, Secrets, Classification |
| Threat Model & Mitigations | Yes/No | Threats, Controls, Residual Risk |
| Security Testing Requirements | Yes/No | Scope, Scenarios, SLAs |
| Appendices | Yes/No | Inventory, Compliance, Decisions |

### 2. Load QG-S3 Security Baseline Checklist

**Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m2.md`

**Checklist Categories:**

| Category | Classification | Check Count | Critical Checks |
|----------|----------------|-------------|-----------------|
| Authentication & Authorization | CRITICAL | 10 | 5 |
| Network Security | CRITICAL | 10 | 4 |
| Data Protection | CRITICAL | 10 | 5 |
| Logging & Monitoring | Non-critical | 10 | 2 |
| Vulnerability Management | Non-critical | 10 | 2 |
| Multi-Tenant Isolation | CRITICAL | 9 | 2 |
| AI-Specific Security | CRITICAL | 8 | 2 |

### 3. Map Artifact Sections to Checklist Categories

| Checklist Category | Artifact Section | Mapping Status |
|--------------------|------------------|----------------|
| Authentication & Authorization | Authentication + Authorization | Mapped |
| Network Security | Data Protection (transit) | Partial |
| Data Protection | Data Protection | Mapped |
| Logging & Monitoring | Threat Mitigations (audit) | Partial |
| Vulnerability Management | Testing Requirements | Mapped |
| Multi-Tenant Isolation | All sections (tenant scope) | Cross-cutting |
| AI-Specific Security | Threat Mitigations (AI) | Conditional |

### 4. Identify Validation Scope

**Validation Scope:**

| Scope Item | Include | Rationale |
|------------|---------|-----------|
| All CRITICAL checks | Yes | Mandatory for PASS |
| Non-critical checks | Yes | Required for 90%+ |
| Multi-tenant specific | Yes | Core BAM concern |
| AI-specific | Conditional | If AI runtime used |
| Web research verification | Yes | Current best practices |

**Pre-validation Summary:**

| Metric | Value |
|--------|-------|
| Total checks to validate | ~67 |
| CRITICAL checks | ~22 |
| Non-critical checks | ~45 |
| Artifact sections available | {count} |
| Estimated validation time | 15-30 minutes |

⏸️ **PAUSE:** Present validation scope and confirm readiness to proceed.

---

## SUCCESS METRICS

- ✅ Security design artifact located and fully loaded
- ✅ All security control sections parsed and inventoried
- ✅ QG-S3 checklist loaded with all categories
- ✅ CRITICAL checks identified (22 across categories)
- ✅ Checklist categories mapped to artifact sections
- ✅ Validation scope confirmed with user
- ✅ AI-specific security scope determined (if applicable)

---

## FAILURE MODES

- ❌ **Document not found:** Inform user, suggest running Create mode first
- ❌ **QG-S3 checklist not found:** Fall back to embedded security criteria
- ❌ **Incomplete document:** Flag missing sections, recommend Edit mode first
- ❌ **Missing tenant isolation sections:** Warn about critical multi-tenant security gaps
- ❌ **AI sections missing when AI runtime configured:** Flag as validation blocker

---

## Verification

- [ ] Security design artifact loaded successfully
- [ ] All sections extracted and inventoried
- [ ] QG-S3 checklist loaded
- [ ] Checklist categories mapped to artifact sections
- [ ] Validation scope confirmed with user

---

## Outputs

- Loaded security design artifact in memory
- QG-S3 checklist prepared for validation
- Section-to-category mapping

---

## Next Step

Proceed to `step-21-v-validate.md` to execute validation against checklist.
