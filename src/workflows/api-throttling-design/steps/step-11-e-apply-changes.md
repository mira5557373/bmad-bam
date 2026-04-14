# Step 11: Apply Targeted Modifications

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

This step applies the identified changes to the existing API throttling design artifacts. Changes are applied incrementally while preserving algorithm consistency, tier-to-quota alignment, burst-to-degradation sequencing, and monitoring rule integrity.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-throttling`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`

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

Map requested changes to document sections:

| Requested Change | Affected Sections | Impact Assessment |
|------------------|-------------------|-------------------|
| {change 1} | {sections} | {impact} |
| {change 2} | {sections} | {impact} |

### 2. Apply Modifications

For each identified change:
1. Present the current content of the affected section
2. Apply the requested modification
3. Verify consistency with related sections

### 3. Preserve Consistency

Ensure modifications maintain:
- **Algorithm consistency**: If changing limits, verify algorithm still appropriate
- **Tier-to-quota alignment**: If changing tiers, update all quota references
- **Burst-to-degradation sequencing**: If changing burst thresholds, update degradation triggers
- **Monitoring rule integrity**: If changing limits, update alert thresholds

### 4. Cross-Reference Validation

If modifying throttling rules, verify:
- Tier quotas are aligned
- Burst allowances are consistent
- Response headers reflect new limits

If modifying tier quotas, verify:
- Throttling rules reference correct limits
- Overage policies are consistent

If modifying burst handling, verify:
- Detection thresholds align with tier burst allowances
- Degradation levels are consistent with capacity

### 5. Generate Change Summary

Present a diff summary:

| Section | Before | After | Rationale |
|---------|--------|-------|-----------|
| {section} | {old value} | {new value} | {reason} |

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact and validation
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and finalize throttling update
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
- Context: "Review throttling changes: {summary of modifications and impact}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated throttling documents
- Update frontmatter `stepsCompleted: [10, 11]`
- Suggest validation mode if significant changes

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] Algorithm consistency maintained
- [ ] Tier quotas aligned with throttling rules
- [ ] Monitoring rules updated appropriately

---

## Outputs

- Updated API throttling design document
- Updated throttling rules matrix (if affected)

---

## Next Step

Run throttling validation to verify changes against completeness criteria.
