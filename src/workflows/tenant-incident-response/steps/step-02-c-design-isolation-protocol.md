# Step 2: Design Isolation Protocol

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design protocols for isolating affected tenants during incidents to prevent blast radius expansion and protect unaffected tenants.

---

## Prerequisites

- Step 1 completed: Severity levels defined
- Master architecture with `{tenant_model}` resolved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Isolation Mechanisms per Tenant Model

Document isolation capabilities based on tenant model:

| Tenant Model | Isolation Capability | Isolation Speed | Data Safety |
|--------------|---------------------|-----------------|-------------|
| Row-Level Security | Feature flag + query filter | Fast | Shared DB risk |
| Schema-per-Tenant | Schema disable | Medium | Moderate |
| Database-per-Tenant | Connection pool isolation | Fast | High |

### 2. Design Tenant Quarantine Procedure

Define steps to quarantine affected tenant:

| Step | Action | Automation | Rollback |
|------|--------|------------|----------|
| 1 | Set tenant status to QUARANTINE | Automatic | Set ACTIVE |
| 2 | Reject new requests for tenant | Automatic | Clear rejection |
| 3 | Drain active sessions | Automatic | N/A |
| 4 | Pause background jobs | Automatic | Resume jobs |
| 5 | Preserve state for investigation | Manual | N/A |

### 3. Define Blast Radius Assessment

Document how to assess incident spread:

| Assessment | Method | Threshold | Action |
|------------|--------|-----------|--------|
| Check adjacent tenants | Query shared resources | Any errors | Expand scope |
| Check shared services | Health checks | Degraded | Alert services |
| Check data consistency | Checksum validation | Mismatch | Escalate |
| Check resource pools | Usage metrics | Abnormal | Investigate |

### 4. Design Selective Isolation Strategies

For partial outages, define selective isolation:

| Strategy | When to Use | Impact | Duration |
|----------|-------------|--------|----------|
| Feature isolation | Single feature affected | Low | Until fix |
| Read-only mode | Write path affected | Medium | Until fix |
| Rate limiting | Resource exhaustion | Low | Dynamic |
| Full quarantine | Security or data issue | High | Manual release |

### 5. Define Isolation Verification

Confirm isolation is effective:

| Check | Method | Success Criteria |
|-------|--------|------------------|
| No cross-tenant queries | Query log analysis | 0 queries to other tenants |
| Isolated network | Connection audit | Only allowed endpoints |
| Resource boundaries | Resource monitoring | Within allocated limits |
| Job isolation | Job queue inspection | Only isolated tenant jobs |

**Verify current best practices with web search:**
Search the web: "design isolation protocol best practices {date}"
Search the web: "design isolation protocol enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the isolation protocol design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into isolation mechanism details
- **P (Party Mode)**: Bring security and SRE perspectives on isolation
- **C (Continue)**: Accept isolation protocol and proceed to communication plan
- **[Specific refinements]**: Describe isolation concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: isolation mechanisms, quarantine procedures, blast radius assessment
- Process enhanced insights on isolation completeness
- Ask user: "Accept these refined isolation protocols? (y/n)"
- If yes, integrate into isolation specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant isolation protocols for incident response"
- Process security and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save isolation protocol to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-create-communication-plan.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the incident detection and isolation design.**

Present summary of:
- Severity levels and escalation criteria
- Isolation mechanisms per tenant model (RLS, schema, database)
- Tenant quarantine procedure and blast radius assessment method

Ask for confirmation before proceeding to communication plan creation.

---

## Verification

- [ ] Isolation mechanisms per tenant model documented
- [ ] Quarantine procedure defined
- [ ] Blast radius assessment method documented
- [ ] Selective isolation strategies defined
- [ ] Isolation verification checks defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Isolation mechanisms per tenant model
- Tenant quarantine procedure
- Blast radius assessment method
- Selective isolation strategies
- Isolation verification checklist

---

## Next Step

Proceed to `step-03-c-create-communication-plan.md` to create the communication plan.
