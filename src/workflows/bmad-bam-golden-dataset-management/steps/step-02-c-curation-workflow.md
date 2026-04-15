# Step 2: Curation Workflow

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

Design the dataset curation process including collection, quality review, and annotation.

## Prerequisites

- Dataset schema designed (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-testing, compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: llmops

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design dataset curation workflow:

## Data Collection Methods

**Collection Sources:**
| Source | Method | Volume | Quality |
|--------|--------|--------|---------|
| Production logs | Sampling | High | Raw |
| Expert creation | Manual | Low | High |
| Synthetic generation | LLM-based | High | Medium |
| User feedback | Annotation | Medium | Variable |
| Adversarial testing | Red team | Low | Targeted |

**Collection Pipeline:**
```
Source → Filter → Anonymize → Validate → Store
           │           │          │
           v           v          v
      PII check    Redaction   Schema check
```

**Sampling Strategy:**
- Stratified by agent type
- Balanced by category (happy path, edge, adversarial)
- Representative of tenant distribution
- Includes rare but important cases

## Quality Review Procedures

**Review Levels:**
| Level | Reviewer | Criteria | Required For |
|-------|----------|----------|--------------|
| L1 | Automated | Schema validation, dedup | All tasks |
| L2 | QA Engineer | Quality check, accuracy | Production use |
| L3 | Domain Expert | Domain accuracy | Critical paths |
| L4 | Cross-review | Consensus validation | Safety tests |

**Quality Metrics:**
- Schema compliance rate
- Duplicate detection rate
- Annotation agreement (inter-rater reliability)
- Expert review pass rate

**Review Workflow:**
```
Submit → L1 Auto → L2 Review → L3 Expert → Approved
           │           │           │
           v           v           v
        Rejected    Feedback    Revision
```

## Expert Annotation Guidelines

**Annotator Requirements:**
- Domain expertise certification
- Training on annotation guidelines
- Test set qualification (>90% agreement)
- Regular calibration sessions

**Annotation Instructions:**
| Field | Guidance |
|-------|----------|
| expected_output | Complete, accurate, natural response |
| acceptance_criteria | Specific, measurable, unambiguous |
| difficulty | Based on complexity, not rarity |
| priority | Based on business impact |

**Quality Assurance:**
- Double annotation for critical tasks
- Regular inter-rater reliability checks
- Disagreement resolution process
- Annotator performance tracking

## Tenant Contribution Handling

**Tenant-Contributed Tasks:**
| Tier | Contribution Rights | Review Level | Visibility |
|------|---------------------|--------------|------------|
| FREE | View only | N/A | N/A |
| PRO | Suggest tasks | L2 + L3 | Private |
| ENTERPRISE | Direct submission | L1 only | Private/Shared |

**Contribution Workflow:**
1. Tenant submits task proposal
2. Automated schema validation (L1)
3. Internal review for quality (L2)
4. Domain expert validation (L3 if critical)
5. Publish to tenant's private set
6. Optional: Promote to shared set (anonymized)

**Data Rights:**
- Tenant retains ownership of contributed tasks
- Platform may use anonymized versions for improvement
- Tenant can request deletion (GDPR compliance)

Output: Curation workflow documentation with quality procedures.

**Verify current best practices with web search:**
Search the web: "golden dataset curation workflow best practices {date}"
Search the web: "LLM evaluation data annotation guidelines {date}"

_Source: [URL]_

## COLLABORATION MENUS (A/P/C):

After completing the curation workflow design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into curation procedures and quality thresholds
- **P (Party Mode)**: Bring Data Curator, QA Lead, and Domain Expert perspectives
- **C (Continue)**: Accept curation workflow and proceed to Step 3: Version Control
- **Refine workflow**: Describe specific curation concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: collection methods, review procedures, annotation guidelines
- Process enhanced insights
- Ask user: "Accept these refined curation procedures? (y/n)"
- If yes, integrate into workflow document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review golden dataset curation workflow for AI evaluation"
- Process Data Curator, QA Lead, Domain Expert perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save curation workflow to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-version-control.md`

---

## Verification

- [ ] Collection methods defined
- [ ] Quality review procedures documented
- [ ] Annotation guidelines established
- [ ] Tenant contribution handling specified
- [ ] Data rights clarified
- [ ] Patterns align with pattern registry

## Outputs

- Curation workflow documentation
- Quality review procedures
- **Load template:** `{project-root}/_bmad/bam/data/templates/curation-workflow-template.md`

## Next Step

Proceed to `step-03-c-version-control.md` to design dataset versioning.
