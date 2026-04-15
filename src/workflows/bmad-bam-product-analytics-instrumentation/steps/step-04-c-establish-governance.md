# Step 4: Establish Data Governance

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Establish data governance policies for analytics.

---

## Prerequisites

- Step 3 completed (Pipeline designed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Access Control

| Role | Access Level | Scope |
|------|--------------|-------|
| Admin | Full access | All tenants |
| Analyst | Read analytics | Aggregated |
| Tenant Admin | Tenant data | Own tenant |
| Viewer | Dashboards | Assigned |

### 2. Data Classification

| Classification | PII | Retention | Access |
|----------------|-----|-----------|--------|
| Public | No | Indefinite | Open |
| Internal | No | 2 years | Employees |
| Confidential | Yes | 90 days | Limited |
| Restricted | Sensitive | 30 days | Approved |

### 3. Change Management

| Change Type | Process | Approval |
|-------------|---------|----------|
| New event | RFC + review | Data team |
| Modify schema | RFC + migration | Data lead |
| Delete event | RFC + impact | Data + Product |
| Add property | PR review | Engineer |

### 4. Compliance Requirements

| Regulation | Requirement | Implementation |
|------------|-------------|----------------|
| GDPR | Right to erasure | Delete pipeline |
| GDPR | Data portability | Export API |
| CCPA | Opt-out | Consent tracking |
| SOC2 | Audit trail | Event logging |

**Verify current best practices with web search:**
Search the web: "analytics data governance framework {date}"
Search the web: "GDPR compliant analytics {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into governance
- **P (Party Mode)**: Bring legal and security perspectives
- **C (Continue)**: Accept governance and complete Create mode
```

#### If 'C' (Continue):
- Save complete instrumentation design
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Output to: `{output_folder}/planning-artifacts/analytics/product-analytics-instrumentation-design.md`
- Create mode complete

---

## Verification

- [ ] Access control defined
- [ ] Data classification documented
- [ ] Change management established
- [ ] Compliance addressed
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete instrumentation design document
- Governance policies
- Compliance documentation
- Access control matrix

---

## Next Step

Create mode complete. Based on outcome:
- **Success**: Proceed to implementation
- **Refinement needed**: Use Edit mode
- **Validation required**: Use Validate mode
