# Step 11: Apply Security Design Modifications

## MANDATORY EXECUTION RULES

- 🛑 NEVER apply changes that weaken security posture or tenant isolation
- 📖 ALWAYS validate changes against QG-S3 critical checks before applying
- 🔄 ALWAYS preserve document structure and unmodified security controls
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale in Change Log section
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes require QG-S3 re-validation
- 🔒 LOCK critical security controls (encryption, tenant isolation) without explicit user override

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested modifications while maintaining document integrity
- 💾 Track: `editMode: true, stepsCompleted: [10, 11]` when complete
- 📖 Context: Loaded document from Step 10, modification request from user
- 🚫 Do NOT: Remove existing valid content; only modify as requested
- 🔍 Use web search: Verify updated patterns against current best practices
- ⚠️ Gate: QG-S3 (Security Baseline) - re-validate after changes

---

## YOUR TASK

Apply the user's requested changes to the security design, validate that changes do not weaken security posture or create compliance gaps, update document metadata, and present a summary of modifications with any QG-S3 re-validation requirements.

---

## Purpose

Apply requested modifications to the security design document. Ensure changes maintain document integrity, update cross-references, and preserve security architecture coherence.

---

## Prerequisites

- Step 10 complete with document loaded
- User modification request documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: security-*

---

## Actions

### 1. Validate Modification Request

| Check | Validation | Pass/Fail |
|-------|------------|-----------|
| Scope clarity | Modification target is specific | |
| Security impact | Change doesn't weaken security posture | |
| Consistency | Change aligns with existing architecture | |
| Compliance | Change maintains compliance requirements | |

**Impact Assessment:**

| Change Type | Security Impact | Required Review |
|-------------|-----------------|-----------------|
| Add new control | Positive | None |
| Modify existing control | Neutral/Negative | Peer review |
| Remove control | Negative | Security team approval |
| Update policy | Varies | Compliance review |

### 2. Apply Requested Changes

**Modification Types:**

| If Modifying | Actions |
|--------------|---------|
| Authentication | Update JWT config, MFA rules, session policies, SSO settings |
| Authorization | Update RBAC model, permissions, cross-tenant rules, API keys |
| Data Protection | Update encryption, key management, secrets, classification |
| Threat Mitigations | Update threat mapping, controls, residual risks |
| Testing Requirements | Update scope, scenarios, SLAs |

**Change Application Protocol:**

1. **Backup current state** - Preserve original in change log
2. **Apply modification** - Update target section
3. **Update cross-references** - Ensure linked sections remain consistent
4. **Validate coherence** - Check for conflicts with other sections
5. **Update metadata** - Increment version, update author/date

### 3. Update Document Metadata

| Field | Update |
|-------|--------|
| Version | Increment (e.g., 1.0.0 → 1.1.0) |
| Date | Current date |
| Author | Current user |

**Change Log Entry:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {new_version} | {date} | {author} | {description of changes} |

### 4. Verify Consistency

**Cross-Reference Checks:**

| Section | Dependencies | Validation |
|---------|--------------|------------|
| Authentication | Authorization (roles), Data Protection (tokens) | Aligned |
| Authorization | Authentication (identity), Data Protection (keys) | Aligned |
| Data Protection | Authorization (access), Authentication (credentials) | Aligned |
| Threat Mitigations | All sections (controls) | Complete |
| Testing | All sections (coverage) | Complete |

**Coherence Validation:**

| Check | Pass Criteria |
|-------|---------------|
| No orphaned references | All internal links resolve |
| No conflicting policies | Policies are consistent |
| No security gaps | All controls still mapped to threats |
| No compliance drift | Regulatory requirements maintained |

**Verify current best practices with web search (if major change):**
Search the web: "{modified topic} security best practices {date}"

_Source: [URL]_

---

## Output Modified Document

**Write updated artifact to:** `{output_folder}/planning-artifacts/security-design.md`

**Summary of Changes:**

| Section | Change Type | Description |
|---------|-------------|-------------|
| {section} | {add/modify/remove} | {brief description} |

---

## SUCCESS METRICS

- ✅ All requested changes captured and validated
- ✅ Security posture maintained or improved (never weakened)
- ✅ Authentication controls updated correctly with valid configurations
- ✅ RBAC policies preserve tenant isolation boundaries
- ✅ Encryption standards meet compliance requirements (AES-256, TLS 1.3)
- ✅ Threat mitigations remain complete (no orphaned threats)
- ✅ Frontmatter version incremented appropriately
- ✅ Change Log updated with modification summary
- ✅ QG-S3 re-validation requirements communicated

---

## FAILURE MODES

- ❌ **Security weakening detected:** Block change, present security impact analysis
- ❌ **Tenant isolation breach:** Require explicit security team override with justification
- ❌ **Encryption downgrade:** Block any reduction in encryption standards
- ❌ **RBAC conflict:** Warn that permission changes may expose data across tenants
- ❌ **Save failure:** Retry with backup to alternate location

---

## Verification

- [ ] Modification applied as requested
- [ ] Document metadata updated (version, date, author)
- [ ] Change log entry added
- [ ] Cross-references validated
- [ ] No security gaps introduced
- [ ] Compliance requirements maintained

---

## Outputs

- Updated `{output_folder}/planning-artifacts/security-design.md`
- Change log entry documenting modifications

---

## Quality Gate Re-validation

**After significant changes, recommend re-running Validate mode:**

| Change Magnitude | Re-validation |
|------------------|---------------|
| Metadata only | Not required |
| Single element | Optional |
| Section update | Recommended |
| Multiple sections | Required |

---

## Next Step

**Edit mode complete.**

- Run **Validate mode** (`step-20-v-load.md`) to verify modified document against QG-S3
- Or return to production workflow with updated security design
