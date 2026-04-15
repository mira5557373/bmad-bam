# Step 1: Audit Scope Definition

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions


---

## Purpose

Define the scope and objectives for the quarterly security audit. This includes identifying systems in scope, compliance frameworks to verify, and audit timeline.

---

## Prerequisites

- Previous audit findings (if not first audit)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`
- **Load compliance:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- Previous audit report (if available)
- List of systems and services
- Applicable compliance frameworks
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Audit Objectives

Document audit objectives:

| Objective | Description | Priority |
|-----------|-------------|----------|
| Access Control Review | Review RBAC/ABAC policies and user permissions | HIGH |
| Vulnerability Assessment | Execute security scans on all systems | HIGH |
| Compliance Verification | Verify alignment with applicable frameworks | HIGH |
| Tenant Isolation Audit | Verify tenant data isolation | CRITICAL |
| AI Safety Review | Audit AI agent permissions and safety controls | HIGH |

### 2. Identify Systems in Scope

Enumerate all systems requiring audit:

| System | Type | Criticality | Last Audited |
|--------|------|-------------|--------------|
| API Gateway | Infrastructure | Critical | Q1 2026 |
| Database Cluster | Data | Critical | Q1 2026 |
| AI Agent Runtime | Application | Critical | Q1 2026 |
| Tenant Portal | Application | High | Q1 2026 |
| Admin Console | Application | High | Q1 2026 |

### 3. Map Compliance Frameworks

Identify applicable compliance frameworks:

| Framework | Applicable | Controls to Verify |
|-----------|------------|-------------------|
| SOC 2 Type II | Yes | All trust service criteria |
| GDPR | Yes | Data protection requirements |
| HIPAA | If healthcare | PHI protection controls |
| PCI DSS | If payments | Cardholder data controls |

### 4. Establish Audit Timeline

| Phase | Activities | Duration |
|-------|------------|----------|
| Planning | Scope definition, resource allocation | 1 week |
| Access Review | Permission audits, IAM review | 1 week |
| Vulnerability Scan | Security scans, penetration tests | 1 week |
| Compliance Check | Framework verification | 1 week |
| Reporting | Findings documentation | 3 days |

**Verify current best practices with web search:**
Search the web: "security audit scope definition best practices {date}"
Search the web: "multi-tenant SaaS security audit checklist {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing scope definition, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into audit scope and coverage gaps
- **P (Party Mode)**: Bring security and compliance perspectives for scope review
- **C (Continue)**: Accept audit scope and proceed to access control review
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass scope context: objectives, systems, frameworks, timeline
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into audit scope
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review audit scope: {summary of objectives and systems}"
- Process collaborative analysis from security and compliance personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save audit scope to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-access-control-review.md`

---

## Verification

- [ ] Audit objectives documented
- [ ] Systems in scope enumerated
- [ ] Compliance frameworks mapped
- [ ] Audit timeline established
- [ ] Patterns align with pattern registry

---

## Outputs

- Audit scope document
- Systems inventory
- Compliance framework mapping
- Audit timeline
- **Load template:** `{project-root}/_bmad/bam/data/templates/security-audit-scope-template.md`

---

## Next Step

Proceed to `step-02-c-access-control-review.md` to review access controls.
