# Step 01: Locate Project Context

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

Locate the existing project-context.md file and verify it is ready for BAM configuration extension.

---

## Prerequisites

- BAM module installed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation

---


## Inputs

- User requirements and constraints for bam extend project context
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Search for Project Context

Search for `**/project-context.md` in the project directory.

### 2. Verify File Structure

Check that the file contains expected BMM sections:
- Project Overview
- Technical Context
- Architecture Decisions (or similar)

### 3. Identify Insertion Point

Determine where to add the BAM configuration section:
- After Architecture Decisions
- Before References/Appendix if present

### 4. Check for Existing BAM Section

If BAM section already exists, recommend Edit mode instead.

**Verify current best practices with web search:**
Search the web: "locate project context best practices {date}"
Search the web: "locate project context enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After locating the file, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into project context structure
- **P (Party Mode)**: Bring architect perspectives on BAM integration approach
- **C (Continue)**: Accept file location and proceed to gather configuration
- **[Specific concerns]**: Describe concerns about project context structure

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: project-context.md location, existing sections, structure analysis
- Process enhanced insights on optimal BAM section placement
- Ask user: "Accept this analysis? (y/n)"
- If yes, document placement decision
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review project-context.md structure for BAM extension"
- Process architect and PM perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm file location
- Document insertion point
- Proceed to next step: `step-02-c-gather-config.md`

---

## Verification

- [ ] Project-context.md located
- [ ] File structure verified
- [ ] Insertion point identified
- [ ] No existing BAM section (or Edit mode recommended)

---

## Outputs

- File path confirmation
- Insertion point decision
- Readiness assessment

---

## Next Step

Proceed to `step-02-c-gather-config.md` to gather BAM configuration choices.
