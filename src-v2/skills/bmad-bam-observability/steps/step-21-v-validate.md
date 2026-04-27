# Step 21: Validate Observability Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Execute QG-OC validation checks, document findings per category
- 💾 Track: `stepsCompleted: [20, 21]` when complete
- 📖 Context: Loaded artifact from Step 20, QG-OC criteria
- 🚫 Do NOT: Generate report yet - that comes in Step 22
- 🔍 Use web search: Verify observability patterns if gaps found
- ⚠️ Gate: QG-OC (Observability Completeness)

---

## Purpose

Validate the tenant-aware observability design against QG-OC (Observability Completeness) quality criteria. This ensures tenant isolation across all signals (metrics, logs, traces), proper dashboard access controls, and compliance with platform observability patterns.

---

## Prerequisites

- Step 20 complete: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3.md`

---

## YOUR TASK

Execute all QG-OC validation checks against the loaded observability design artifact. Verify tenant isolation across all three pillars (metrics, logs, traces), validate dashboard access controls, SLO definitions, and alerting rules. Document each check result with evidence and calculate the final gate decision.

---

## Inputs

- Loaded artifact from Step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Validate Tenant Dimensions (CRITICAL)

- [ ] Core tenant dimensions defined (tenant_id, tenant_slug, tenant_tier)
- [ ] Request context dimensions defined (user_id, session_id, request_id)
- [ ] Resource attribution dimensions defined
- [ ] Dimension propagation rules documented
- [ ] Cardinality management strategy defined
- [ ] High-cardinality dimensions restricted to logs/traces only

### 2. Validate Metrics Collection (CRITICAL)

- [ ] Tenant-scoped metrics include `tenant_id` label
- [ ] Quota metrics track usage against tier limits
- [ ] Business metrics enable usage attribution
- [ ] Infrastructure metrics correlate to tenants
- [ ] Aggregation strategy defined with retention policies
- [ ] Cardinality within acceptable limits (<100K unique series per metric)

### 3. Validate Logging Strategy (CRITICAL)

- [ ] Structured log format defined with tenant fields
- [ ] Log context injection mechanism defined
- [ ] Log levels by context documented
- [ ] Tenant log isolation rules defined
- [ ] Sensitive data (PII) handling rules defined
- [ ] Log retention by tier documented
- [ ] Audit log requirements documented (7-year retention)

### 4. Validate Distributed Tracing (CRITICAL)

- [ ] Trace context structure defined (W3C compliant)
- [ ] Required span attributes include tenant.id
- [ ] Resource attributes defined
- [ ] Sampling strategy by tier documented
- [ ] Cross-service propagation configured
- [ ] Tenant trace isolation rules defined
- [ ] Agent execution tracing defined (if AI agents used)
- [ ] Export configuration complete

### 5. Validate Dashboards (HIGH)

- [ ] Dashboard hierarchy defined (platform vs tenant)
- [ ] Platform dashboards have operator-only access
- [ ] Tenant dashboards are filtered by tenant_id
- [ ] All dashboards have appropriate access controls
- [ ] Tier-based dashboard availability documented
- [ ] Queries reference valid metrics

### 6. Validate Alerting (HIGH)

- [ ] Platform-level alerts defined (error rate, quota, noisy neighbor)
- [ ] Tenant-level alerts defined (agent failure, quota warning)
- [ ] Alert expressions reference valid metrics
- [ ] Alert routing is tenant-aware
- [ ] Notification channels per tier documented
- [ ] Escalation paths defined

### 7. Validate SLO Definitions (MEDIUM)

- [ ] Availability SLO defined per tier
- [ ] Latency SLO defined per tier
- [ ] Agent response SLO defined (if applicable)
- [ ] Burn rate alerts configured
- [ ] SLO dashboard defined

### 8. Validate Tenant Isolation (CRITICAL)

- [ ] All signals (metrics, logs, traces) include tenant_id
- [ ] Tenant isolation maintained across all signals
- [ ] No cross-tenant data leakage possible in dashboards
- [ ] Consistent with tenant model isolation design
- [ ] Consistent with master architecture observability section

### 9. Determine Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, >=80% of HIGH/MEDIUM items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of HIGH/MEDIUM items pass - remediation plan required |
| **FAIL** | Any CRITICAL item fails - block until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off |

**If validation gaps found, verify with web search:**
Search the web: "observability multi-tenant validation best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation gaps or findings
- **P (Party Mode)**: Bring SRE and security architect perspectives on validation results
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe specific areas to re-validate

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation checklist results, gaps identified, isolation verification
- Process enhanced insights on observability quality
- Ask user: "Accept this detailed validation analysis? (y/n)"
- If yes, integrate into validation findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-OC validation results for observability design"
- Process SRE and security architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-report.md`

---

## SUCCESS METRICS

- ✅ All 8 QG-OC categories validated with evidence
- ✅ All three pillars verified for tenant isolation
- ✅ CRITICAL check results documented with evidence
- ✅ Non-critical check results documented
- ✅ Gate decision calculated correctly
- ✅ Cross-pillar consistency verified
- ✅ Recovery protocol activated (if FAIL)

---

## FAILURE MODES

- ❌ **CRITICAL category fails:** Enter recovery protocol, document gaps
- ❌ **Missing pillar evidence:** Cannot validate without pillar config
- ❌ **Tenant isolation gap:** Block until isolation is restored
- ❌ **Recovery attempt exhausted:** Escalate to mandatory course correction

---

## Verification

- [ ] All checklist items evaluated
- [ ] CRITICAL items clearly identified
- [ ] Gate decision determined
- [ ] Findings documented per category
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation findings per category
- Gate decision (PASS/CONDITIONAL/FAIL)
- Specific gaps identified
- Remediation recommendations (if applicable)

---

## Next Step

Proceed to `step-22-v-report.md` to generate validation report.
