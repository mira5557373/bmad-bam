# Step 4: Create Secrets Management Plan

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
- SEARCH Use web search to verify current best practices when making technology decisions
- CLIP Reference pattern registry `web_queries` for search topics


---

## Purpose

Assemble the comprehensive secrets management plan incorporating secret classification, vault integration, and rotation policies from previous steps.

## Prerequisites

- Secret classification defined in Step 1
- Vault integration defined in Step 2
- Rotation policies defined in Step 3
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security


---

## Inputs

- All outputs from Steps 1-3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Template: `{project-root}/_bmad/bam/data/templates/secrets-management-template.md`

---

## Actions

### 1. Assemble Plan Document

Using the secrets management template, compile:

| Section | Source | Status |
|---------|--------|--------|
| Executive Summary | New | Draft |
| Secret Classification | Step 1 | Complete |
| Vault Architecture | Step 2 | Complete |
| Authentication | Step 2 | Complete |
| Rotation Policies | Step 3 | Complete |
| Operational Runbooks | New | Draft |
| Access Control | New | Draft |
| Review Schedule | New | Draft |

### 2. Define Operational Runbooks

Create operational procedures:

| Runbook | Purpose | Trigger |
|---------|---------|---------|
| Secret Creation | Create new secret | On-demand |
| Secret Rotation | Rotate existing secret | Schedule/manual |
| Emergency Rotation | Immediate rotation | Incident |
| Access Grant | Grant secret access | Request |
| Access Revoke | Revoke secret access | Off-boarding |
| Disaster Recovery | Restore vault | DR event |

### 3. Define Access Control Policies

Create RBAC matrix:

| Role | Create | Read | Update | Delete | Rotate |
|------|--------|------|--------|--------|--------|
| Security Admin | Yes | Yes | Yes | Yes | Yes |
| Platform Admin | Yes | Yes | Yes | No | Yes |
| Developer | No | Yes | No | No | No |
| Service Account | No | Yes | No | No | No |
| Tenant Admin | No | Tenant | No | No | No |

### 4. Schedule Security Reviews

Define review cadence:

| Review Type | Frequency | Scope | Output |
|-------------|-----------|-------|--------|
| Access Audit | Monthly | All access | Audit report |
| Rotation Compliance | Quarterly | All secrets | Compliance report |
| Architecture Review | Annual | Entire system | Assessment |

**Verify current best practices with web search:**
Search the web: "secrets management operational procedures {date}"
Search the web: "vault access control best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Review document structure completeness
- **A2**: Analyze runbook coverage
- **A3**: Evaluate access control policies
- **A4**: Assess review schedule feasibility

### [P]ropose Changes
- **P1**: Propose additional runbooks
- **P2**: Propose access control adjustments
- **P3**: Suggest review schedule modifications
- **P4**: Recommend document enhancements

### [C]ontinue
- **C1**: Finalize secrets management plan
- **C2**: Mark workflow complete and output to `{output_folder}/planning-artifacts/secrets-management-plan.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All sections from template populated
- [ ] Operational runbooks defined
- [ ] Access control policies complete
- [ ] Review schedule documented
- [ ] Document ready for approval

## Outputs

- `{output_folder}/planning-artifacts/secrets-management-plan.md`

## Next Step

Workflow complete. Output secrets management plan to designated location.
