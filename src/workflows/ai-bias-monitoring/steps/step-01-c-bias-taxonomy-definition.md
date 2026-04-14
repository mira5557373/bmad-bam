# Step 1: Bias Taxonomy Definition

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

Define a comprehensive bias taxonomy relevant to the AI system's domain and use cases.

## Prerequisites

- Agent runtime architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-safety, ai-testing
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

---

## Inputs

- User requirements and constraints for AI bias monitoring
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define bias taxonomy for the AI system:

## Protected Attributes

**Demographic Attributes:**
- Age groups
- Gender and gender identity
- Race and ethnicity
- Disability status
- Religious affiliation
- National origin

**Contextual Attributes:**
- Geographic location
- Language preference
- Socioeconomic indicators
- Education level
- Employment status

**Tenant-Specific Attributes:**
| Tenant Tier | Protected Attributes | Monitoring Level |
|-------------|---------------------|------------------|
| FREE | Standard set | Basic |
| PRO | Standard + Custom | Enhanced |
| ENTERPRISE | Full customization | Comprehensive |

## Output Bias Types

**Selection Bias:**
- Who gets included/excluded from recommendations
- Search result ranking disparities
- Content visibility differences

**Ranking Bias:**
- Systematic ordering preferences
- Position bias amplification
- Relevance score disparities

**Content Bias:**
- Language quality differences
- Response completeness variations
- Tone and sentiment disparities
- Stereotyping in generated content

## Interaction Bias

**Prompt Handling:**
- Interpretation differences by dialect
- Sensitivity to phrasing variations
- Context understanding disparities

**Response Quality:**
- Helpfulness across demographics
- Accuracy variations
- Engagement level differences

Output: Bias taxonomy document with protected attributes and bias types.

**Verify current best practices with web search:**
Search the web: "AI bias taxonomy best practices {date}"
Search the web: "fairness protected attributes ML systems {date}"

_Source: [URL]_

## COLLABORATION MENUS (A/P/C):

After completing the taxonomy definition above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into bias categories and protected attributes
- **P (Party Mode)**: Bring AI Ethics Researcher, Legal Counsel, and DEI Expert perspectives
- **C (Continue)**: Accept taxonomy definition and proceed to Step 2: Detection Methods
- **Refine taxonomy**: Describe specific taxonomy concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: protected attributes, bias types, tenant requirements
- Process enhanced insights
- Ask user: "Accept these refined taxonomy requirements? (y/n)"
- If yes, integrate into taxonomy document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review bias taxonomy definition for AI fairness monitoring"
- Process AI Ethics Researcher, Legal Counsel, DEI Expert perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save taxonomy definition to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-detection-methods.md`

---

## Verification

- [ ] Protected attributes defined
- [ ] Output bias types specified
- [ ] Interaction bias documented
- [ ] Tenant-specific considerations addressed
- [ ] Patterns align with pattern registry

## Outputs

- Bias taxonomy document
- Protected attributes list
- **Load template:** `{project-root}/_bmad/bam/templates/bias-taxonomy-template.md`

## Next Step

Proceed to `step-02-c-detection-methods.md` to design bias detection approaches.
