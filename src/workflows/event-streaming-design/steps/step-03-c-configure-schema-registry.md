# Step 3: Configure Schema Registry

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
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Design schema evolution rules, plan compatibility modes, set up schema validation, and configure serialization.

## Prerequisites

- Step 2 completed: Topic architecture designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: schema-registry
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: serialization

---

## Inputs

- Output from Steps 1-2 (Domains, topics)
- Schema format preferences
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`

---

## Actions

**Verify current best practices with web search:**
Search the web: "Confluent Schema Registry best practices {date}"
Search the web: "Avro schema evolution patterns {date}"

_Source: [URL]_

### 1. Design Schema Evolution Rules

| Rule | Description | Enforcement |
|------|-------------|-------------|
| Required fields | Cannot add required fields | Schema validation |
| Field removal | Mark deprecated first | Version policy |
| Type changes | Not allowed | Compatibility check |
| Default values | Required for new optional fields | Schema validation |

### 2. Plan Compatibility Modes

| Mode | Direction | Use Case | Risk |
|------|-----------|----------|------|
| BACKWARD | New can read old | Consumer-first upgrades | Low |
| FORWARD | Old can read new | Producer-first upgrades | Medium |
| FULL | Both directions | Zero-downtime | Low |
| NONE | No compatibility | Breaking changes only | High |

### 3. Set Up Schema Validation

| Validation Point | Check | Action on Failure |
|------------------|-------|-------------------|
| Producer | Schema registered | Reject message |
| Broker | Schema ID valid | Reject message |
| Consumer | Schema compatible | DLQ or skip |
| CI/CD | Compatibility check | Block deployment |

### 4. Configure Serialization

| Format | Pros | Cons | Use Case |
|--------|------|------|----------|
| Avro | Compact, schema evolution | Requires registry | High volume |
| JSON Schema | Human readable | Verbose | Low volume, debugging |
| Protobuf | Very compact, typed | Steeper learning | Performance critical |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the schema registry configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into schema evolution and compatibility
- **P (Party Mode)**: Bring analyst and architect perspectives for schema review
- **C (Continue)**: Accept schema configuration and proceed to consumer strategy
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass schema context: evolution, compatibility, validation, serialization
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into configuration
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review schema registry configuration: {summary of evolution and compatibility}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save schema registry configuration
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-plan-consumer-strategy.md`

---

## Verification

- [ ] Schema evolution rules designed
- [ ] Compatibility modes planned
- [ ] Schema validation set up
- [ ] Serialization configured
- [ ] Patterns align with pattern registry

## Outputs

- Schema registry configuration
- Evolution rules document
- Compatibility mode settings

## Next Step

Proceed to `step-04-c-plan-consumer-strategy.md` to plan consumer strategy.
