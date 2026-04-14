# Step 21: Validate PCI-DSS Compliance

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

---

## Purpose

Execute comprehensive validation of the PCI-DSS compliance specification against PCI-DSS v4.0 requirements, all 12 requirements, and tenant isolation controls.

## Prerequisites

- PCI-DSS specification loaded (Step 20 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: PCI-DSS


---

## Inputs

- Loaded PCI-DSS compliance specification
- PCI-DSS v4.0 requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Validate CDE Scope

Check CDE scope completeness:

| Validation Check | Requirement | Status | Finding |
|------------------|-------------|--------|---------|
| CHD elements identified | All data types | {Pass/Fail} | {Detail} |
| System components listed | All CDE systems | {Pass/Fail} | {Detail} |
| Data flows mapped | All CHD movement | {Pass/Fail} | {Detail} |
| Segmentation documented | Network boundaries | {Pass/Fail} | {Detail} |

### 2. Validate Requirements 1-6

Check network and data protection:

| Requirement | Description | Status | Gap |
|-------------|-------------|--------|-----|
| 1 | Install and maintain network security controls | {Pass/Fail} | {Gap} |
| 2 | Apply secure configurations | {Pass/Fail} | {Gap} |
| 3 | Protect stored account data | {Pass/Fail} | {Gap} |
| 4 | Protect CHD with cryptography during transmission | {Pass/Fail} | {Gap} |
| 5 | Protect systems from malware | {Pass/Fail} | {Gap} |
| 6 | Develop and maintain secure systems | {Pass/Fail} | {Gap} |

### 3. Validate Requirements 7-12

Check access control and monitoring:

| Requirement | Description | Status | Gap |
|-------------|-------------|--------|-----|
| 7 | Restrict access by business need | {Pass/Fail} | {Gap} |
| 8 | Identify users and authenticate access | {Pass/Fail} | {Gap} |
| 9 | Restrict physical access | {Pass/Fail} | {Gap} |
| 10 | Log and monitor all access | {Pass/Fail} | {Gap} |
| 11 | Test security of systems regularly | {Pass/Fail} | {Gap} |
| 12 | Support information security with policies | {Pass/Fail} | {Gap} |

### 4. Validate Tenant Isolation

Check multi-tenant controls:

| Validation Check | Requirement | Status | Finding |
|------------------|-------------|--------|---------|
| Key isolation | Per-tenant keys | {Pass/Fail} | {Detail} |
| Data segregation | CHD separation | {Pass/Fail} | {Detail} |
| Access isolation | Tenant-scoped RBAC | {Pass/Fail} | {Detail} |
| Audit isolation | Per-tenant logs | {Pass/Fail} | {Detail} |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A] Analyse - Validation Deep Dive
- **A1**: Analyze network security control implementation
- **A2**: Evaluate data protection control effectiveness
- **A3**: Assess access control adequacy
- **A4**: Review monitoring and testing coverage

### [P] Propose - Remediation Recommendations
- **P1**: Propose remediation plan for critical gaps
- **P2**: Suggest control enhancement priorities
- **P3**: Recommend tenant isolation improvements
- **P4**: Propose validation automation approach

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 22 (Generate Report) - load `step-22-v-generate-report.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-pci.md`
- **C3**: Return to workflow overview

---

## Verification

- [ ] CDE scope validated
- [ ] Requirements 1-6 checked
- [ ] Requirements 7-12 verified
- [ ] Tenant isolation assessed
- [ ] All findings documented
- [ ] Patterns align with pattern registry

## Outputs

- CDE scope validation results
- Requirements compliance matrix (all 12)
- Tenant isolation assessment
- Gap analysis with severity ratings

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
