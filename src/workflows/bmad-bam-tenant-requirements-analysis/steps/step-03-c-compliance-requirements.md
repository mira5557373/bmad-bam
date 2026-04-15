# Step 3: Compliance Requirements

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

Identify compliance and regulatory requirements affecting multi-tenant architecture.

## Prerequisites

- Step 2 complete (tenant personas defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-residency
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Map Regulatory Requirements by Segment

| Segment | Regulations | Data Residency | Audit Needs |
|---------|------------|----------------|-------------|
| Healthcare | HIPAA, HITRUST | US-only option | Full audit trail |
| Finance | SOC2, PCI-DSS | Regional | Transaction logging |
| EU Customers | GDPR | EU-only option | Right to erasure |

### 2. Define Data Governance Requirements

- Data classification per tenant
- Retention policies
- Deletion/anonymization requirements
- Cross-border data transfer rules

### 3. Identify Audit Requirements

- Audit log retention periods
- Compliance reporting frequency
- Third-party audit support needs

**Verify current best practices with web search:**
Search the web: "compliance requirements best practices {date}"
Search the web: "compliance requirements enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the compliance requirements above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into regulatory frameworks and data governance
- **P (Party Mode)**: Bring security and compliance perspectives for review
- **C (Continue)**: Accept compliance requirements and proceed to scaling assumptions
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass compliance context: regulations identified, data governance requirements
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into compliance requirements
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review compliance requirements for tenant analysis: {summary of regulations and audit needs}"
- Process collaborative analysis from security and compliance personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save compliance requirements to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-scaling-assumptions.md`

---

## Verification

- [ ] All applicable regulations identified
- [ ] Data residency requirements mapped
- [ ] Audit requirements documented
- [ ] Patterns align with pattern registry
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/tenant-isolation.md` (preview items)

## Outputs

- Compliance requirements matrix
- Data governance requirements
- **Load template:** `{project-root}/_bmad/bam/data/templates/compliance-checklist-template.md`

## Next Step

Proceed to `step-04-c-scaling-assumptions.md` with compliance requirements.
