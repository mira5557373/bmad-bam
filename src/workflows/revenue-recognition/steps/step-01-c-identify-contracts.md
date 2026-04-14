# Step 1: Identify Contracts

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
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Define contract identification rules per ASC 606 Step 1 requirements.

---

## Prerequisites

- Invoice generation design completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: compliance

---

## Inputs

- User requirements for revenue recognition
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Contract Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| contract_id | string | Yes | Unique contract identifier |
| tenant_id | string | Yes | Contracting tenant |
| effective_date | ISO8601 | Yes | Contract start date |
| term_months | integer | Yes | Contract duration |
| total_contract_value | decimal | Yes | TCV for recognition |
| billing_frequency | enum | Yes | Monthly/quarterly/annual |
| auto_renew | boolean | Yes | Renewal flag |

### 2. Contract Validation Criteria

| Criterion | ASC 606 Requirement | Validation |
|-----------|---------------------|------------|
| Approval | Both parties approved | Signature or acceptance |
| Rights identified | Each party's rights | Service terms documented |
| Payment terms | Clear terms | Payment schedule defined |
| Commercial substance | Transaction has substance | Service delivery expected |
| Collectibility | Probable collection | Credit check passed |

### 3. Multi-Element Arrangement Handling

| Arrangement Type | Treatment |
|------------------|-----------|
| Bundled subscription + support | Separate performance obligations |
| Subscription + professional services | Distinct obligations |
| Platform + add-on modules | Evaluate distinctness |

### 4. Contract Modification Types

| Modification | Treatment |
|--------------|-----------|
| Upgrade (additional services) | Prospective treatment |
| Downgrade (reduced services) | Prospective with catch-up |
| Extension (same services) | Prospective |
| Termination | Recognize remaining |

**Verify current best practices with web search:**
Search the web: "ASC 606 contract identification SaaS {date}"
Search the web: "revenue recognition contract criteria enterprise {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the contract identification above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into contract rules using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for compliance analysis
- **C (Continue)**: Accept contract identification and proceed to performance obligations
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass contract context: attributes, validation criteria
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into contract summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review contract identification for revenue recognition: {summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save contract identification to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-map-performance-obligations.md`

---

## Verification

- [ ] Contract attributes defined with all required fields
- [ ] Validation criteria meet ASC 606 requirements
- [ ] Multi-element arrangements handled
- [ ] Contract modifications documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Contract identification rules
- Validation criteria documentation
- Modification handling procedures

---

## Next Step

Proceed to `step-02-c-map-performance-obligations.md` to map performance obligations.
