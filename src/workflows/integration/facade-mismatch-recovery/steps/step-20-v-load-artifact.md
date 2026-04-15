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

This step loads the facade mismatch recovery artifacts for validation. These documents capture the detection, analysis, resolution strategy, and verification of mismatches between facade contracts and their implementations across modules.

---

## Prerequisites

- Mismatch recovery workflow has been executed (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---


## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Locate All Recovery Documents

| Document | Location | Status |
|----------|----------|--------|
| Mismatch detection report | {path} | [ ] Found / [ ] Missing |
| Divergence analysis | {path} | [ ] Found / [ ] Missing |
| Resolution strategy document | {path} | [ ] Found / [ ] Missing |
| Implementation artifacts | {path} | [ ] Found / [ ] Missing / [ ] N/A |
| Verification results | {path} | [ ] Found / [ ] Missing / [ ] N/A |

### 2. Parse Complete Recovery Package

| Parsed Element | Content Summary |
|----------------|-----------------|
| Mismatch details and classification | {summary} |
| Resolution decision and rationale | {summary} |
| Implementation status | {summary} |
| Verification checklist state | {count complete} / {total} |

### 3. Prepare Validation Context

| Validation Preparation | Status |
|------------------------|--------|
| Completeness of each phase checked | [ ] |
| Logical flow from detection to resolution verified | [ ] |
| Verification covers all affected areas confirmed | [ ] |

If the recovery documents do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

---

## COLLABORATION MENUS (A/P/C):

After loading the recovery artifacts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure or completeness concerns
- **P (Party Mode)**: Bring QA and integration architect perspectives on validation approach
- **C (Continue)**: Proceed to detailed validation
- **[Specific concerns]**: Describe pre-validation concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: loaded artifacts, missing documents, recovery phase completeness
- Process enhanced insights on validation readiness
- Ask user: "Accept this validation readiness assessment? (y/n)"
- If yes, document any caveats for validation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review facade mismatch recovery artifacts readiness for validation"
- Process QA and integration architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm artifact loaded successfully
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Document structure matches expected format
- [ ] No placeholder content remaining
- [ ] Patterns align with pattern registry

---

## Outputs

Confirm successful loading with:
- Mismatch identifier and type
- Current recovery phase
- Resolution option selected
- Number of verification items (complete/pending)

---

## Next Step

Once all recovery artifacts are successfully loaded and recovery phase is confirmed, proceed to `step-21-v-validate.md` to perform detailed quality criteria checks against facade pattern compliance.
