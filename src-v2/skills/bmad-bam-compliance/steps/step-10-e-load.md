# Step 10: Load Existing Compliance Design (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📖 Maintain append-only document building
- :white_check_mark: Track progress in `stepsCompleted` array

---

## Purpose

Load and review existing compliance design documents to identify sections requiring modification based on new regulatory requirements, framework updates, or organizational changes.

---

## Prerequisites

- Existing compliance design document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` (for current framework requirements)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---

## Actions

### 1. Load Existing Documents

Load the existing compliance design:
- `{output_folder}/planning-artifacts/compliance-design.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current compliance design:

| Section | Status | Last Updated | Key Configuration |
|---------|--------|--------------|-------------------|
| Compliance Frameworks | YES/NO | {date} | {frameworks listed} |
| Data Governance | YES/NO | {date} | {classification levels} |
| Audit Controls | YES/NO | {date} | {event categories} |
| Compliance Monitoring | YES/NO | {date} | {check categories} |
| Implementation Roadmap | YES/NO | {date} | {current phase} |
| Risk Assessment | YES/NO | {date} | {risk count} |

### 3. Identify Framework Updates

Check for regulatory changes since last update:

| Framework | Document Version | Current Version | Update Required |
|-----------|------------------|-----------------|-----------------|
| SOC2 | {version} | 2024 TSC | YES/NO |
| GDPR | {version} | Current | YES/NO |
| HIPAA | {version} | Current | YES/NO |
| PCI-DSS | {version} | v4.0 | YES/NO |
| EU-AI-Act | {version} | 2024 | YES/NO |

### 4. Gather Modification Requirements

Collect user input on required changes:

| Change Category | Examples |
|-----------------|----------|
| New frameworks | Adding HIPAA, PCI-DSS, FedRAMP |
| Framework updates | PCI-DSS v3.2.1 -> v4.0, new GDPR guidance |
| New data types | Adding PHI, payment data |
| New regions | Expanding to new jurisdictions |
| Organizational changes | New business units, acquisitions |
| Audit findings | Remediation from recent audit |

### 5. Impact Assessment

Assess modification impact:

| Modification | Sections Affected | Complexity | Estimated Effort |
|--------------|-------------------|------------|------------------|
| {modification} | {sections} | Low/Medium/High | {effort} |

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing documents, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections before editing
- **P (Party Mode)**: Bring compliance and regulatory expert perspectives on changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific sections]**: Describe which sections to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current document state, proposed modifications, framework updates
- Process enhanced insights on change impact
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review proposed modifications to compliance design"
- Present synthesized recommendations from DPO, compliance officer, legal counsel
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply.md`

---

## Verification

- [ ] Existing compliance design loaded successfully
- [ ] Document structure understood
- [ ] Framework versions compared with current requirements
- [ ] Modification requirements gathered from user
- [ ] Impact assessment completed
- [ ] Sections for modification identified

---

## Outputs

- Summary of current compliance design state
- Framework version comparison
- List of required modifications with impact assessment

---

## Next Step

Proceed to `step-11-e-apply.md` with identified modifications.
