# Step 11: Apply Changes

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Apply the confirmed modifications to the compliance verification documents while maintaining document integrity and compliance framework consistency.

---

## Prerequisites

- Step 10 completed: Existing artifacts loaded
- Modification targets confirmed with user
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-cp1-compliance.md`

---

## Inputs

- Loaded artifacts from step 10
- Confirmed modification targets
- Updated compliance requirements or findings
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Apply Framework Updates

If modifying compliance framework coverage:

| Framework | Previous Status | New Status | Rationale |
|-----------|----------------|------------|-----------|
| SOC2 Type II | | | |
| GDPR | | | |
| HIPAA | | | |
| PCI-DSS | | | |
| ISO 27001 | | | |

### 2. Update Control Mappings

If modifying control implementations:

| Control ID | Previous Implementation | New Implementation | Affected Frameworks |
|------------|------------------------|-------------------|---------------------|
| | | | |

### 3. Revise Audit Findings

If updating audit findings:

| Finding ID | Previous Severity | New Severity | Status Change | Notes |
|------------|------------------|--------------|---------------|-------|
| | | | | |

### 4. Update Remediation Plan

If modifying remediation items:

| Remediation ID | Previous Status | New Status | New Due Date | Owner |
|----------------|-----------------|------------|--------------|-------|
| | | | | |

### 5. Validate Changes

Ensure all modifications maintain compliance consistency:
- Cross-reference affected frameworks
- Verify control coverage remains complete
- Check for cascading impacts
- Validate remediation dependencies

**Verify current requirements with web search:**
Search the web: "compliance framework change management best practices {date}"

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impacts and validation
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Finalize changes and complete edit workflow
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass change context: modifications applied, impact analysis
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into final changes
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review compliance changes: {summary of modifications and impacts}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated documents
- Update frontmatter `stepsCompleted: [10, 11]`
- Complete edit workflow

---

## Verification

- [ ] All specified modifications applied
- [ ] Document consistency maintained
- [ ] Cross-references updated
- [ ] No compliance gaps introduced
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated `compliance-verification-report.md`
- Updated `compliance-findings.md` (if findings modified)
- Updated `remediation-plan.md` (if remediation modified)
- Change summary documenting all modifications

---

## Next Step

Edit mode complete. Options:
- Run Validate mode to verify updated compliance posture
- Return to workflow selection
- Proceed with updated compliance documentation
