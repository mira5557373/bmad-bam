# Step 4: Create Security Baseline Document

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- SEARCH Use web search to verify current best practices when making technology decisions

---

## Purpose

Assemble the comprehensive security baseline configuration document.

## Prerequisites

- All previous steps completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Assemble Document

| Section | Source | Status |
|---------|--------|--------|
| Executive Summary | New | Draft |
| Infrastructure Baselines | Step 1 | Complete |
| Application Baselines | Step 2 | Complete |
| AI-Specific Baselines | Step 3 | Complete |
| Compliance Mapping | New | Draft |
| Enforcement Mechanisms | New | Draft |

### 2. Map to Compliance Frameworks

| Framework | Baselines Covered | Gaps |
|-----------|-------------------|------|
| SOC2 | CC6, CC7, CC8 | - |
| ISO27001 | A.9, A.12, A.13 | - |
| CIS | Cloud, K8s, Docker | - |
| NIST CSF | PR, DE | - |

### 3. Define Enforcement Mechanisms

| Mechanism | Coverage | Automation |
|-----------|----------|------------|
| Infrastructure as Code | Cloud, K8s | Terraform/CDK |
| Policy as Code | All | OPA/Kyverno |
| CI/CD Scanning | Applications | Pipeline |
| Runtime Monitoring | All | Agents |
| Drift Detection | All | Continuous |

**Verify current best practices with web search:**
Search the web: "security baseline enforcement automation {date}"
Search the web: "policy as code security {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review document completeness
- **A2**: Analyze compliance mapping
- **A3**: Evaluate enforcement mechanisms

### [P]ropose Changes
- **P1**: Propose document additions
- **P2**: Propose compliance adjustments
- **P3**: Suggest enforcement improvements

### [C]ontinue
- **C1**: Finalize security baseline config
- **C2**: Mark workflow complete and output

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All sections populated
- [ ] Compliance mapped
- [ ] Enforcement defined
- [ ] Document ready for approval

## Outputs

- `{output_folder}/planning-artifacts/security-baseline-config.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/security-baseline-template.md`

## Next Step

Workflow complete.
