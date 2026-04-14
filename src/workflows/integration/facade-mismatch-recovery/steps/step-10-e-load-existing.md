# Step 10: Load Existing Artifact (Edit Mode)

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

This step loads the existing mismatch recovery artifacts for modification. Edit mode allows updates to the recovery phase, resolution strategy, or verification status without restarting the entire recovery process from scratch.

---

## Prerequisites

- Existing mismatch recovery artifacts to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Locate Recovery Documents

Search for recovery reports in `{output_folder}/planning-artifacts/quality/`:

| Document | Location | Status |
|----------|----------|--------|
| Mismatch detection report | {path} | [ ] Found / [ ] Missing |
| Divergence analysis | {path} | [ ] Found / [ ] Missing |
| Resolution strategy document | {path} | [ ] Found / [ ] Missing |

### 2. Parse Recovery State

| Recovery Aspect | Current Value |
|-----------------|---------------|
| Current phase | Detection / Analysis / Resolution / Implementation / Verification |
| Resolution option chosen | A / B / C / D / Not yet chosen |
| Implementation status | Not started / In progress / Complete |
| Outstanding items | {list} |

### 3. Display Recovery Summary

Present a summary:

| Summary Item | Value |
|--------------|-------|
| Affected modules | {provider} → {consumers} |
| Affected operations | {list of operations} |
| Mismatch type | Schema / Signature / Semantic / Version |
| Severity | Low / Medium / High / Critical |
| Resolution strategy | {selected option} |
| Completed verification steps | {count} / {total} |
| Pending verification steps | {list} |

If the recovery documents do not exist, inform the user and suggest switching to Create mode.

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the recovery state summary, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific recovery documents or history
- **P (Party Mode)**: Bring integration architect perspectives on modification scope
- **C (Continue)**: Proceed to apply modifications
- **[Specific sections]**: Describe which aspects of recovery to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current recovery state, document contents, modification history
- Process enhanced insights on modification impact
- Ask user: "Accept this recovery state analysis? (y/n)"
- If yes, document analysis findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review facade mismatch recovery state for modification planning"
- Process integration architect and module owner perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document confirmed modification scope
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Recovery documents loaded correctly
- [ ] Summary accurately reflects current state
- [ ] Modification scope clearly identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current recovery state
- Confirmed modification scope from user

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with confirmed modification scope.
