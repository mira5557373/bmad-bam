# Step 20: Load Artifact (Validate Mode)

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

---

## Purpose

Load the Master Architecture Document artifact for QG-F1 validation. The master architecture serves as the foundational blueprint for the multi-tenant agentic AI platform, defining system-wide constraints, component relationships, and architectural decisions that all modules must conform to.

---

## Prerequisites

- Master Architecture Document artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,module-boundaries
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-f1-foundation.md`

---


## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

Load the existing master architecture document from `{output_folder}/planning-artifacts/master-architecture.md`.

### 2. Pre-Validation Checks

Before proceeding, verify the following conditions:

| Check | Status | Notes |
|-------|--------|-------|
| File exists at specified path | ✅/❌ | |
| File is readable and well-formed markdown | ✅/❌ | |
| Section hierarchy follows expected conventions | ✅/❌ | |
| All architectural diagrams or references intact | ✅/❌ | |

### 3. Verify Expected Structure

The master architecture should contain these required sections:

| Section | Required | Present |
|---------|----------|---------|
| System Overview with scope and objectives | ✅ | ✅/❌ |
| Architectural Principles and constraints | ✅ | ✅/❌ |
| Component Inventory with responsibilities | ✅ | ✅/❌ |
| Integration Patterns and communication flows | ✅ | ✅/❌ |
| Multi-Tenancy Strategy and isolation requirements | ✅ | ✅/❌ |
| Security Architecture baseline requirements | ✅ | ✅/❌ |
| Technology Stack decisions and rationale | ✅ | ✅/❌ |

### 4. Handle Errors

**If file does not exist:**
- Inform the user that there is no artifact to validate
- Suggest switching to Create mode

**If file exists but incomplete:**
- Enumerate the missing elements
- Advise whether validation can proceed with gaps
- Recommend artifact completion first if critical sections missing

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure concerns
- **P (Party Mode)**: Bring QA and architect perspectives on validation approach
- **C (Continue)**: Proceed to detailed validation against QG-F1 criteria
- **[Specific concerns]**: Describe pre-validation concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: loaded artifact structure, missing sections, pre-validation status
- Process enhanced insights on validation readiness
- Ask user: "Accept this validation readiness assessment? (y/n)"
- If yes, document any caveats for validation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review master architecture artifact readiness for QG-F1 validation"
- Process QA and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm artifact loaded successfully
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Pre-validation checks passed
- [ ] Validation criteria defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation context prepared
- Document structure confirmed
- Pre-validation status documented

---

## Next Step

Once the artifact is successfully loaded and initial structure is confirmed, proceed to `step-21-v-validate.md` to perform detailed quality criteria checks.
