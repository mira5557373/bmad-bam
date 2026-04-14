# Step 11: Apply Targeted Modifications

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

This step applies the identified changes to the existing security operations verification artifacts. Changes are applied incrementally while preserving document structure, unaffected security assessments, and ensuring no degradation of security posture is introduced.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `security`
- **Load checklists:** `{project-root}/_bmad/bam/checklists/security-checklist.md`

---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

### 1. Identify Affected Sections

Identify the affected sections in the security operations documents:
- Security monitoring audit findings
- Incident response assessment
- Threat detection capabilities
- Security control effectiveness scores
- Remediation plan items

### 2. Present Current Content

Present the current content of each affected section for review.

### 3. Apply Modifications

Apply the requested modifications while preserving:
- Document structure and formatting
- Unaffected security assessments
- Historical audit findings (append, don't overwrite)
- Compliance evidence chain

### 4. Validate Security Impact

If modifying security operations settings, verify:
- No degradation of security monitoring coverage
- Incident response capabilities remain intact
- Threat detection effectiveness maintained
- Control effectiveness scores updated appropriately
- Compliance requirements still met

### 5. Update Documents

Write updated documents back to their original locations:
- `{output_folder}/security/security-operations-report.md`
- `{output_folder}/security/incident-readiness-assessment.md`
- `{output_folder}/security/security-controls-audit.md`

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact and validation
- **P (Party Mode)**: Bring security and operations perspectives for change review
- **C (Continue)**: Accept changes and finalize security operations update
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass change context: modifications applied, impact analysis
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into change validation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review security operations changes: {summary of modifications and impact}"
- Process collaborative analysis from security and operations personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated security operations documents
- Update frontmatter `stepsCompleted: [10, 11]`
- Suggest validation mode if significant changes

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] No degradation of security posture
- [ ] Compliance requirements still met
- [ ] Historical audit evidence preserved

---

## Outputs

- Updated security operations report
- Updated incident readiness assessment (if affected)
- Updated security controls audit (if affected)

---

## Next Step

Run security operations validation (QG-S4) to verify changes against security requirements.
