# Step 03: Verify Tenant Isolation Across Boundaries

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol

## EXECUTION PROTOCOLS

- 🎯 Focus: Verify tenant isolation across module boundaries (QG-I2)
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Tenant context propagation, cache/storage isolation
- 🚫 Do NOT: Verify agent safety (that's Step 04)
- 🔍 Use web search: Verify tenant isolation patterns against current best practices
- ⚠️ Gate: QG-I2 - CRITICAL checks must pass for tenant safety

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Verifying tenant context propagation across modules
- Checking cross-tenant access prevention
- Validating cache and storage isolation
- Confirming event tenant context handling

**OUT OF SCOPE:**
- Agent safety verification (Step 04)
- Final gate decisions (Step 05)
- Integration point analysis (Step 02)

---

## Purpose

Verify tenant isolation across all module boundaries. This step validates that tenant context propagates correctly through facades, events, and shared services, ensuring no cross-tenant data leakage. This addresses QG-I2 (Tenant Safety) requirements.

---

## Prerequisites

- Step 02 completed: Integration analysis complete
- Tenant model defined in master architecture
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i2.md`

---

## Inputs

- Integration point matrix from Step 02
- Tenant model configuration
- Facade contracts with TenantContext parameters
- Event schemas with tenant context fields
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Verify tenant isolation across all module boundaries against QG-I2 criteria.

---

## Main Sequence

### 1. Tenant Context Propagation Verification

#### 1.1 Facade Tenant Context Check

For each facade contract:

| Facade | TenantContext Param | Propagation | Enforcement |
|--------|---------------------|-------------|-------------|
| {{facade}} | YES/NO | Complete/Partial | Verified/Missing |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** All facade methods receive TenantContext as first parameter
- [ ] **CRITICAL:** TenantContext is validated at facade boundary
- [ ] **CRITICAL:** Tenant context propagates to all downstream calls

#### 1.2 Event Tenant Context Check

For each cross-module event:

| Event | tenant_id Field | Context Source | Validation |
|-------|-----------------|----------------|------------|
| {{event}} | Present/Missing | Header/Payload | Verified/Missing |

**Criteria:**
- [ ] All events carry tenant_id in metadata
- [ ] Event consumers validate tenant context before processing
- [ ] Event handlers scope operations to event tenant_id

### 2. Cross-Tenant Access Prevention

#### 2.1 Database RLS Verification (if applicable)

| Module | RLS Enabled | Policy Test | Result |
|--------|-------------|-------------|--------|
| {{module}} | YES/NO | Cross-tenant query blocked | PASS/FAIL |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** RLS policies active on all tenant-scoped tables
- [ ] **CRITICAL:** Cross-tenant queries blocked at database level

#### 2.2 Schema Isolation Verification (if applicable)

| Module | Schema Strategy | Tenant Schema | Cross-Schema Access |
|--------|-----------------|---------------|---------------------|
| {{module}} | per-tenant/shared | {{schema}} | Blocked/Open |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** Tenant cannot access other tenant schemas
- [ ] Schema routing uses validated tenant context

### 3. Cache Isolation Verification

#### 3.1 Cache Key Patterns

| Cache Type | Key Pattern | Tenant Scoped | Verification |
|------------|-------------|---------------|--------------|
| Session | `tenant:{id}:session:*` | YES | PASS/FAIL |
| Data | `tenant:{id}:data:*` | YES | PASS/FAIL |
| Query | `tenant:{id}:query:*` | YES | PASS/FAIL |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** All cache keys include tenant_id prefix
- [ ] **CRITICAL:** Cache entries scoped to requesting tenant
- [ ] Cache invalidation respects tenant boundaries

#### 3.2 Cache Cross-Tenant Test

| Test Scenario | Expected | Actual | Status |
|---------------|----------|--------|--------|
| Tenant A reads Tenant B cache | Blocked | {{actual}} | PASS/FAIL |
| Tenant A invalidates Tenant B cache | Blocked | {{actual}} | PASS/FAIL |

### 4. Storage Isolation Verification

#### 4.1 File Storage Paths

| Storage Type | Path Pattern | Tenant Scoped | Verification |
|--------------|--------------|---------------|--------------|
| Documents | `/{tenant_id}/documents/` | YES | PASS/FAIL |
| Uploads | `/{tenant_id}/uploads/` | YES | PASS/FAIL |
| Exports | `/{tenant_id}/exports/` | YES | PASS/FAIL |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** All storage paths include tenant_id
- [ ] **CRITICAL:** Storage access validates tenant ownership
- [ ] Pre-signed URLs scoped to tenant context

#### 4.2 Storage Cross-Tenant Test

| Test Scenario | Expected | Actual | Status |
|---------------|----------|--------|--------|
| Tenant A lists Tenant B files | Empty/Blocked | {{actual}} | PASS/FAIL |
| Tenant A downloads Tenant B file | Forbidden | {{actual}} | PASS/FAIL |

### 5. Tenant Lifecycle Operations

#### 5.1 Tenant Deletion Verification

| Module | Cascade Delete | Data Purge | Audit Trail |
|--------|----------------|------------|-------------|
| {{module}} | Configured | Complete | Maintained |

**Standard Criteria:**
- [ ] Tenant deletion cascades to all module data
- [ ] Soft-delete respects retention policies
- [ ] Audit logs preserved after tenant deletion

#### 5.2 Tenant Export Verification

| Module | Export Scope | Cross-Module Data | Format |
|--------|--------------|-------------------|--------|
| {{module}} | Tenant Only | Included | JSON/CSV |

**Standard Criteria:**
- [ ] Tenant export includes all tenant-owned data
- [ ] Cross-module references resolved
- [ ] Export excludes other tenant data

### 6. Isolation Monitoring

#### 6.1 Cross-Tenant Access Alerts

| Alert | Trigger | Configured | Tested |
|-------|---------|------------|--------|
| Cross-tenant query | RLS violation | YES/NO | PASS/FAIL |
| Cross-tenant cache | Cache key mismatch | YES/NO | PASS/FAIL |
| Cross-tenant storage | Path traversal | YES/NO | PASS/FAIL |

**Standard Criteria:**
- [ ] Monitoring alerts configured for isolation violations
- [ ] Alert severity appropriate (CRITICAL)
- [ ] Incident response procedure documented

---

## COLLABORATION MENUS (A/P/C):

After completing tenant isolation verification, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific isolation findings
- **P (Party Mode)**: Bring security and platform perspectives on isolation
- **C (Continue)**: Accept verification and proceed to agent safety
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tenant isolation findings, potential leakage points
- Process enhanced insights on isolation patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into verification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant isolation verification for QG-I2: {summary}"
- Process Security Architect and Platform Architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document tenant isolation verification results
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## SUCCESS METRICS:

- [ ] All CRITICAL tenant isolation checks pass
- [ ] Cache isolation verified end-to-end
- [ ] Storage isolation verified end-to-end
- [ ] Tenant lifecycle operations tested
- [ ] Isolation monitoring configured

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Missing TenantContext | Update facade to require TenantContext |
| RLS not enforced | Enable RLS policies on affected tables |
| Cache key missing tenant | Refactor cache key pattern |
| Storage path vulnerable | Add tenant validation to storage access |

---

## Verification

- [ ] Tenant context propagation verified
- [ ] Cross-tenant access blocked
- [ ] Cache isolation confirmed
- [ ] Storage isolation confirmed
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant isolation verification matrix
- Cross-tenant access test results
- Cache and storage isolation findings
- Isolation monitoring status
- QG-I2 preliminary assessment

---

## NEXT STEP:

Proceed to `step-04-c-document.md` to verify agent safety across module boundaries.
