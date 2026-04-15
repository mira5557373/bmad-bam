# Step 3: Design Cleanup

## Purpose

Design sandbox cleanup and expiration procedures.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all steps in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each step produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 2 completed

**Web Research (Required):**

Search the web: "sandbox cleanup automation best practices {date}"
Search the web: "ephemeral environment lifecycle multi-tenant SaaS patterns {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Expiration Handling

| Sandbox Type | Warning | Grace Period | Cleanup |
|--------------|---------|--------------|---------|
| Trial | Day 12, 13, 14 | 3 days | Day 17 |
| Demo | Hour 22 | 24 hours | Hour 48 |
| Dev | Monthly review | 30 days | Manual |

### 2. Cleanup Process

| Phase | Action | Reversible |
|-------|--------|------------|
| 1 | Disable access | Yes |
| 2 | Export data offer | N/A |
| 3 | Archive (14 days) | Yes |
| 4 | Permanent delete | No |

### 3. Resource Reclamation

| Resource | Cleanup Method |
|----------|----------------|
| Database | Drop schema/rows |
| Storage | Delete prefix |
| Cache | Clear namespace |
| Vector store | Delete collection |

### 4. Conversion Path

| From | To | Process |
|------|-----|---------|
| Trial | FREE | Preserve data, upgrade limits |
| Trial | PRO | Preserve data, add billing |
| Demo | Trial | Extend duration, keep data |

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Complete Create mode
```

#### If 'C' (Continue):
- Save complete design
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Output to: `{output_folder}/planning-artifacts/operations/tenant-sandbox-provisioning.md`
- Create mode complete

---

## Verification

- [ ] Expiration handling defined
- [ ] Cleanup process documented
- [ ] Resource reclamation specified
- [ ] Conversion paths established

---

## Outputs

- Expiration handling specifications by sandbox type
- Cleanup process phases with reversibility status
- Resource reclamation methods by resource type
- Conversion path specifications from sandbox to production
- Complete sandbox provisioning design document
- **Output to:** `{output_folder}/planning-artifacts/operations/tenant-sandbox-provisioning.md`

---

## Next Step

Create workflow complete. Sandbox provisioning design ready for validation using Validate mode (`step-20-v-*`).

---

## Create Mode Complete

Sandbox provisioning design is complete.
