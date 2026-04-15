# Step 5: Generate Findings

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

Consolidate all security findings from the assessment into a prioritized report with remediation recommendations.

---

## Prerequisites

- Steps 1-4 completed: Scope, threat model, tenant isolation, AI safety reviews
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `compliance,testing-agent-safety`
- **Load template:** `{project-root}/_bmad/bam/data/templates/quality-gate-report-template.md`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Consolidate Findings

Compile all findings from previous steps:

| Finding ID | Category | Title | Severity | Status |
|------------|----------|-------|----------|--------|
| SEC-001 | Tenant Isolation | {title} | Critical/High/Medium/Low | Open |
| SEC-002 | AI Safety | {title} | Critical/High/Medium/Low | Open |
| SEC-003 | Authentication | {title} | Critical/High/Medium/Low | Open |
| ... | ... | ... | ... | ... |

### 2. Document Finding Details

For each finding, document:

**Finding Template:**

| Field | Content |
|-------|---------|
| **ID** | SEC-XXX |
| **Title** | {Brief description} |
| **Category** | Tenant Isolation / AI Safety / Auth / Data Protection |
| **Severity** | Critical / High / Medium / Low |
| **Affected Component** | {Component name} |
| **Description** | {Detailed description of the issue} |
| **Attack Scenario** | {How this could be exploited} |
| **Evidence** | {Proof or test results} |
| **Remediation** | {Recommended fix} |
| **Effort** | Low / Medium / High |
| **Priority** | P0 / P1 / P2 / P3 |

### 3. Create Remediation Roadmap

Prioritize remediation:

| Priority | Timeline | Findings | Owner |
|----------|----------|----------|-------|
| P0 - Critical | Immediate (24-48h) | SEC-001, SEC-002 | Security |
| P1 - High | 1 week | SEC-003, SEC-004 | Engineering |
| P2 - Medium | 1 month | SEC-005, SEC-006 | Engineering |
| P3 - Low | Backlog | SEC-007 | Engineering |

### 4. Generate Executive Summary

Create executive summary for leadership:

| Metric | Value |
|--------|-------|
| Total findings | {count} |
| Critical | {count} |
| High | {count} |
| Medium | {count} |
| Low | {count} |
| Overall security posture | Strong/Moderate/Weak |
| Top risk areas | {list} |
| Immediate actions required | {list} |

### 5. Document Compensating Controls

For findings that cannot be immediately fixed:

| Finding ID | Compensating Control | Risk Acceptance |
|------------|---------------------|-----------------|
| SEC-XXX | {Control description} | Accepted by: {name}, Until: {date} |

---

## Quality Gates

- [ ] All findings documented with required fields
- [ ] Severity accurately assigned
- [ ] Remediation recommendations actionable
- [ ] Remediation roadmap created
- [ ] Executive summary complete
- [ ] Compensating controls documented where applicable

**Verify current best practices with web search:**
Search the web: "generate findings best practices {date}"
Search the web: "generate findings enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After generating the findings above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific findings or remediation
- **P (Party Mode)**: Bring engineering and leadership perspectives on priorities
- **C (Continue)**: Accept findings report and complete Create mode
- **[Specific refinements]**: Describe findings concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: findings list, remediation roadmap, risk assessment
- Process enhanced insights on finding accuracy
- Ask user: "Accept these refined findings? (y/n)"
- If yes, integrate into findings report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review security findings and remediation priorities"
- Process engineering and leadership perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete security assessment report
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Complete Create mode workflow

---

## Verification

- [ ] All findings consolidated
- [ ] Finding details complete
- [ ] Remediation roadmap created
- [ ] Executive summary generated
- [ ] Compensating controls documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Security Assessment Report (complete)
- Security Findings List
- Remediation Roadmap
- Executive Summary
- **Output to:** `{output_folder}/planning-artifacts/security/security-assessment-report.md`
- **Output to:** `{output_folder}/planning-artifacts/security/security-findings.md`

---

## Next Step

**Workflow Complete.**

The Create mode workflow is finished. To modify the output, use Edit mode (`step-10-e-*`). To verify the output meets quality criteria, use Validate mode (`step-20-v-*`).

---

## Workflow Complete (Create Mode)

Create mode complete for security-review workflow. The following artifacts have been produced:

1. Assessment scope with trust boundaries and threat actors
2. Threat model with STRIDE analysis and attack trees
3. Tenant isolation security review
4. AI safety security review
5. Consolidated findings with remediation roadmap
