# Step 1: Detect Mismatch

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

Identify and document the facade contract mismatch.

---

## Prerequisites

- Facade contract exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---


## Inputs

- User requirements and constraints for integration - facade mismatch recovery
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

**Verify current best practices with web search:**
Search the web: "contract mismatch detection API integration patterns {date}"
Search the web: "facade contract validation design {date}"

_Source: [URL]_

### 1. Gather Mismatch Evidence

Collect error logs or test failures indicating mismatch:

| Evidence Type | Description | Source |
|---------------|-------------|--------|
| Error logs | Runtime errors indicating type/schema mismatches | Application logs |
| Test failures | Contract tests failing | CI/CD pipeline |
| Consumer module | Module experiencing issues | Caller context |
| Provider module | Module providing the facade | Facade registry |
| Symptoms | Type errors, runtime failures, data issues | Error reports |

### 2. Load Contract Documents

- Load the documented facade contract from `{output_folder}/planning-artifacts/contracts/`
- Load the actual implementation (TypeScript interfaces, API definitions)
- Identify version numbers for both contract and implementation

### 3. Identify Mismatch Type

Classify the mismatch using this decision matrix:

| Mismatch Type | Characteristics | Severity |
|---------------|-----------------|----------|
| Schema Mismatch | DTO structure differs from contract | High |
| Signature Mismatch | Operation parameters or return types differ | High |
| Semantic Mismatch | Same interface, different behavior | Critical |
| Version Mismatch | Consumer expecting different contract version | Medium |

### 4. Document Discovery Context

Record the discovery context:

| Context Item | Value |
|--------------|-------|
| How discovered | Test / Production / Code Review |
| When did mismatch likely occur | {date/commit} |
| What changes may have caused it | {description} |
| Impact assessment | {scope of affected consumers} |

---

## COLLABORATION MENUS (A/P/C):

After gathering mismatch evidence and classifying the mismatch type, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into mismatch symptoms or contract history
- **P (Party Mode)**: Bring integration architect and module owner perspectives on mismatch detection
- **C (Continue)**: Accept mismatch detection report and proceed to divergence analysis
- **[Specific refinements]**: Describe additional evidence to gather

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: mismatch evidence, contract documents, mismatch type classification
- Process enhanced insights on mismatch detection accuracy
- Ask user: "Accept this detailed mismatch analysis? (y/n)"
- If yes, integrate into detection report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review facade contract mismatch detection for accuracy and completeness"
- Process integration architect and module owner perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save mismatch detection report to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-analyze-divergence.md`

---

## Verification

- [ ] Mismatch evidence gathered
- [ ] Contract documents loaded
- [ ] Mismatch type identified
- [ ] Discovery context documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Mismatch detection report
- Evidence documentation

---

## Next Step

Proceed to `step-02-c-analyze-divergence.md` to analyze the divergence.
