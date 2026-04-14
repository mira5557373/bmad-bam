# Step 1: Analyze Merge Scenarios

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

Analyze the different M&A scenarios that require tenant consolidation and identify the data merging requirements for each scenario type.

---

## Prerequisites

- Master architecture document loaded with tenant model
- Tenant hierarchy design completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Inputs

- User requirements and constraints for M&A consolidation
- Tenant hierarchy documentation (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Document Merge Scenario Types

Identify and document M&A consolidation scenarios:

| Scenario | Description | Complexity | Primary Tenant |
|----------|-------------|------------|----------------|
| Full Acquisition | Acquiring company absorbs target | High | Acquirer |
| Merger of Equals | Both companies consolidate equally | Very High | New entity |
| Subsidiary Addition | Target becomes subsidiary of parent | Medium | Parent |
| Division Carve-Out | Split tenant into multiple entities | High | Original |
| Asset Purchase | Selective data/user transfer | Medium | Acquirer |

### 2. Map Data Consolidation Requirements

Document data that needs to be merged per scenario:

| Data Type | Full Acquisition | Merger | Subsidiary | Carve-Out | Asset Purchase |
|-----------|-----------------|--------|------------|-----------|----------------|
| User accounts | Merge into acquirer | Dedupe, combine | Link to parent | Split by division | Selective transfer |
| Application data | Full migration | Combined namespace | Maintain separate | Partition | Selective copy |
| AI models/configs | Evaluate, migrate | Merge best | Inherit parent | Clone | Selective copy |
| Integrations | Reconnect | Dedupe, merge | Inherit | Split | Selective setup |
| Billing | Consolidate | New combined | Rollup | Separate | New agreements |

### 3. Identify Conflict Resolution Rules

Define how to handle data conflicts during merge:

| Conflict Type | Resolution Strategy | Fallback |
|---------------|---------------------|----------|
| Duplicate users (same email) | Prompt for merge decision | Keep both with suffix |
| Conflicting settings | Acquirer wins (configurable) | Manual resolution queue |
| Duplicate records | Business key matching | Manual reconciliation |
| Conflicting permissions | Union of permissions | Admin review |
| Name collisions | Prefix with source tenant | Manual rename |

### 4. Define Compliance Considerations

Document legal/compliance requirements:

| Requirement | Impact | Implementation |
|-------------|--------|----------------|
| Data ownership consent | Users must consent to transfer | In-app consent flow |
| GDPR data portability | Export before merge | Pre-merge export |
| Contractual obligations | Honor existing contracts | Contract migration |
| Audit trail preservation | Maintain merge history | Comprehensive logging |
| Regulatory notifications | Inform regulators if required | Compliance checklist |

**Verify current best practices with web search:**
Search the web: "SaaS tenant data consolidation M&A {date}"
Search the web: "multi-tenant merger data migration patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the merge scenario analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific merge scenarios
- **P (Party Mode)**: Bring legal and data architecture perspectives
- **C (Continue)**: Accept merge analysis and proceed to data merging design
- **[Specific refinements]**: Describe merge scenario concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: merge scenarios, data requirements, conflict rules
- Process enhanced insights on merge complexity
- Ask user: "Accept these refined merge insights? (y/n)"
- If yes, integrate into merge analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review M&A tenant consolidation scenarios for multi-tenant platform"
- Process legal and data architecture perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save merge scenario analysis to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-data-merging.md`

---

## Verification

- [ ] All merge scenarios documented
- [ ] Data consolidation requirements mapped
- [ ] Conflict resolution rules defined
- [ ] Compliance considerations identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Merge scenario matrix
- Data consolidation requirements
- Conflict resolution rules
- Compliance checklist

---

## Next Step

Proceed to `step-02-c-design-data-merging.md` to design data merging procedures.
