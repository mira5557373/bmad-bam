# Step 3: Plan Control Testing

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Plan control effectiveness testing including testing methodology, sample selection, exception handling, and remediation tracking.

## Prerequisites

- Evidence collection designed (Step 2 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Actions

### 1. Define Testing Methodology

| Control Type | Testing Method | Frequency | Tester |
|--------------|----------------|-----------|--------|
| Automated controls | System query | Continuous | Automated |
| Manual controls | Walkthrough | Quarterly | Internal audit |
| IT general controls | Sample testing | Semi-annual | External audit |

### 2. Design Sample Selection

| Population | Sample Size | Selection Method | Documentation |
|------------|-------------|------------------|---------------|
| Access reviews | 25 per quarter | Random selection | Sample list |
| Change management | 40 per period | Stratified random | Change log |
| Incident response | All incidents | Complete population | Incident log |

### 3. Define Exception Handling

| Exception Type | Response | Escalation | Timeline |
|----------------|----------|------------|----------|
| Control failure | Remediate | Control owner | 30 days |
| Documentation gap | Update | Process owner | 14 days |
| Design deficiency | Redesign | Management | 60 days |

### 4. Design Remediation Tracking

| Tracking Element | Method | Owner | Review |
|------------------|--------|-------|--------|
| Exception log | Issue tracker | Compliance | Weekly |
| Remediation plan | Document | Control owner | Monthly |
| Closure verification | Re-test | Internal audit | On closure |

**Verify current best practices with web search:**
Search the web: "control testing methodology SOC 2 {date}"
Search the web: "audit sample selection best practices {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-3 complete the evidence inventory, collection design, and testing plan.**

Present summary to user:
- Evidence inventory coverage
- Collection procedures
- Testing methodology

Ask for confirmation before proceeding to audit readiness specification creation.

---

## COLLABORATION MENUS (A/P/C)

### [A] Analyse - Testing Analysis
- **A1**: Analyze testing coverage per control
- **A2**: Evaluate sample size adequacy
- **A3**: Assess exception handling process
- **A4**: Review remediation tracking effectiveness

### [P] Propose - Testing Recommendations
- **P1**: Propose continuous control monitoring
- **P2**: Suggest risk-based testing prioritization
- **P3**: Recommend exception escalation workflow
- **P4**: Propose remediation dashboard

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 4 (Create Audit Spec) - load `step-04-c-create-audit-spec.md`
- **C2**: Return to workflow overview
- **C3**: Export current testing plan

---

## Verification

- [ ] Testing methodology defined
- [ ] Sample selection designed
- [ ] Exception handling documented
- [ ] Remediation tracking established
- [ ] Patterns align with pattern registry

## Outputs

- Testing methodology
- Sample selection procedures
- Exception handling process
- Remediation tracking design

## Next Step

Proceed to `step-04-c-create-audit-spec.md` to create the comprehensive audit readiness specification.
