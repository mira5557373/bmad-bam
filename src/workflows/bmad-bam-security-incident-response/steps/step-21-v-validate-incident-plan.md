# Step 2: Validate Incident Response Plan

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- CYCLE **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- MEMO Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array

---

## Purpose

Perform detailed validation of the incident response plan against security best practices, compliance requirements, and NIST framework alignment.

## Prerequisites

- Incident response plan loaded in Step 20
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security


---

## Inputs

- Loaded incident response plan from Step 20
- Quality gate checklist
- Pattern registry

---

## Actions

### 1. Validate Incident Classification

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Severity Levels | All levels defined with response times | [ ] |
| Categories | Common incident types covered | [ ] |
| Tenant Impact | Multi-tenant considerations | [ ] |
| AI Incidents | AI-specific incidents addressed | [ ] |

### 2. Validate Response Procedures

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Team Structure | Roles and responsibilities clear | [ ] |
| Response Phases | NIST phases covered | [ ] |
| Containment | Strategies per incident type | [ ] |
| Evidence | Preservation procedures documented | [ ] |

### 3. Validate Tenant Notification

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Triggers | Notification criteria defined | [ ] |
| Channels | Per-tier channels documented | [ ] |
| Regulatory | Compliance timelines met | [ ] |
| Templates | Communication templates present | [ ] |

### 4. Validate Compliance Alignment

| Framework | Requirement | Status |
|-----------|-------------|--------|
| SOC2 | CC7.4 - Incident response | [ ] |
| ISO27001 | A.16 - Security incident management | [ ] |
| NIST CSF | RS - Respond | [ ] |
| GDPR | Article 33 - Breach notification | [ ] |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Deep dive into classification gaps
- **A2**: Analyze response procedure effectiveness
- **A3**: Evaluate notification compliance
- **A4**: Assess playbook coverage

### [P]ropose Changes
- **P1**: Propose classification improvements
- **P2**: Suggest procedure enhancements
- **P3**: Recommend notification updates
- **P4**: Propose compliance remediation

### [C]ontinue
- **C1**: Accept validation results and proceed to report
- **C2**: Mark step complete and load `step-22-v-generate-report.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Incident classification validated
- [ ] Response procedures validated
- [ ] Tenant notification validated
- [ ] Compliance alignment checked
- [ ] All findings documented

## Outputs

- Classification validation results
- Response procedure assessment
- Notification compliance evaluation
- Compliance gap analysis

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
