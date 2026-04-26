# Step 21: Validate Scaling Design (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Systematic validation against all checklist criteria
- 💾 Track: Validation results per category
- 📖 Context: Reference loaded document and checklist from Step 20
- 🚫 Do NOT: Fix issues in this step - only identify and document
- 🔍 Use web search: Verify current best practices for critical checks

---

## Purpose

Validate the scaling design against the quality gate checklist, identifying compliance status for each criterion and documenting any gaps or issues.

---

## Prerequisites

- Step 20 complete with document and checklist loaded
- Validation scope determined
- **Reference checklist:** `{project-root}/_bmad/bam/data/checklists/scaling-design.md`

**Web Research (For Critical Checks):**

Search the web: "multi-tenant scaling validation criteria {date}"
Search the web: "SaaS autoscaling best practices audit {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Validate Horizontal Scaling

| Check | Status | Evidence | Notes |
|-------|--------|----------|-------|
| Stateless service design documented | PASS/FAIL | {section ref} | {details} |
| Load balancing strategy defined | PASS/FAIL | {section ref} | {details} |
| Session affinity requirements addressed | PASS/FAIL | {section ref} | {details} |
| Autoscaling policies per tier defined | PASS/FAIL | {section ref} | {details} |
| **CRITICAL:** Min/max replicas specified | PASS/FAIL | {section ref} | {details} |
| **CRITICAL:** Scale-up/down thresholds defined | PASS/FAIL | {section ref} | {details} |
| Graceful shutdown handling documented | PASS/FAIL | {section ref} | {details} |

### 2. Validate Database Scaling

| Check | Status | Evidence | Notes |
|-------|--------|----------|-------|
| Read replica strategy defined | PASS/FAIL | {section ref} | {details} |
| Connection pooling per tier configured | PASS/FAIL | {section ref} | {details} |
| Pool sizing rationale documented | PASS/FAIL | {section ref} | {details} |
| **CRITICAL:** RLS optimization patterns defined (if applicable) | PASS/FAIL | {section ref} | {details} |
| **CRITICAL:** Sharding strategy defined (if database-per-tenant) | PASS/FAIL | {section ref} | {details} |
| Cross-shard query handling addressed | PASS/FAIL | {section ref} | {details} |
| Failover procedures documented | PASS/FAIL | {section ref} | {details} |

### 3. Validate Tenant-Aware Scaling

| Check | Status | Evidence | Notes |
|-------|--------|----------|-------|
| **CRITICAL:** Noisy neighbor isolation defined | PASS/FAIL | {section ref} | {details} |
| Tenant resource quotas by tier | PASS/FAIL | {section ref} | {details} |
| Enterprise dedicated pool design | PASS/FAIL | {section ref} | {details} |
| Cache allocation per tier | PASS/FAIL | {section ref} | {details} |
| **CRITICAL:** Queue partitioning strategy | PASS/FAIL | {section ref} | {details} |
| Fair scheduling implementation | PASS/FAIL | {section ref} | {details} |
| Starvation prevention mechanisms | PASS/FAIL | {section ref} | {details} |

### 4. Validate Capacity Planning

| Check | Status | Evidence | Notes |
|-------|--------|----------|-------|
| Growth projection framework defined | PASS/FAIL | {section ref} | {details} |
| Capacity dimensions identified | PASS/FAIL | {section ref} | {details} |
| **CRITICAL:** Scaling triggers documented | PASS/FAIL | {section ref} | {details} |
| Tenant growth modeling included | PASS/FAIL | {section ref} | {details} |
| Review cadence established | PASS/FAIL | {section ref} | {details} |
| Headroom buffers defined | PASS/FAIL | {section ref} | {details} |

### 5. Validate Cost Optimization

| Check | Status | Evidence | Notes |
|-------|--------|----------|-------|
| Resource right-sizing strategy | PASS/FAIL | {section ref} | {details} |
| Cost allocation by tier | PASS/FAIL | {section ref} | {details} |
| **CRITICAL:** Budget alerts configured | PASS/FAIL | {section ref} | {details} |
| Reserved vs on-demand strategy | PASS/FAIL | {section ref} | {details} |
| Cost optimization targets defined | PASS/FAIL | {section ref} | {details} |
| Chargeback model (if applicable) | PASS/FAIL | {section ref} | {details} |

### 6. Validate Runbooks

| Check | Status | Evidence | Notes |
|-------|--------|----------|-------|
| **CRITICAL:** Scale-up runbook complete | PASS/FAIL | {section ref} | {details} |
| **CRITICAL:** Scale-down runbook complete | PASS/FAIL | {section ref} | {details} |
| **CRITICAL:** Emergency scaling runbook | PASS/FAIL | {section ref} | {details} |
| Database scaling runbook | PASS/FAIL | {section ref} | {details} |
| Owner assignments defined | PASS/FAIL | {section ref} | {details} |
| Verification steps included | PASS/FAIL | {section ref} | {details} |
| Communication procedures documented | PASS/FAIL | {section ref} | {details} |

### 7. Cross-Cutting Validation

| Check | Status | Evidence | Notes |
|-------|--------|----------|-------|
| Tenant model alignment | PASS/FAIL | {consistency check} | {details} |
| Tier definitions consistent | PASS/FAIL | {consistency check} | {details} |
| Metrics and observability defined | PASS/FAIL | {section ref} | {details} |
| SLA targets achievable | PASS/FAIL | {analysis} | {details} |
| Web research findings incorporated | PASS/FAIL | {citations present} | {details} |

---

## COLLABORATION MENUS (A/P/C)

After completing validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation failures
- **P (Party Mode)**: Get architect perspectives on critical issues
- **C (Continue)**: Proceed to generate validation report

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation results, failed checks
- Process enhanced insights on remediation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation failures for scaling design"
- Present synthesized recommendations on priorities
- Return to A/P/C menu

#### If 'C' (Continue):
- Compile validation results
- Proceed to next step: `step-22-v-report.md`

---

## Verification

- [ ] All checklist categories validated
- [ ] Critical checks explicitly evaluated
- [ ] Evidence documented for each check
- [ ] Gaps and issues identified
- [ ] Web research verified critical patterns

---

## Outputs

- Validation results per category
- List of passed checks
- List of failed checks with details
- Critical issue identification

---

## Next Step

Proceed to `step-22-v-report.md` to generate the validation report.
