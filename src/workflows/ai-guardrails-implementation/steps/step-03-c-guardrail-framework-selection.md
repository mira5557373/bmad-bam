# Step 3: Guardrail Framework Selection

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

Select and configure guardrail frameworks (NeMo Guardrails, LlamaGuard, custom engines) based on requirements from input filtering and output validation design.

---

## Prerequisites

- Step 1 and 2 completed with input/output design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-safety
- **Web research (if available):** Search for current AI guardrail framework comparisons

---

## Inputs

- Input filtering design from Step 1
- Output validation design from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Latency and cost requirements

---

## Actions

### 1. Evaluate Guardrail Frameworks

Compare available frameworks:

| Framework | Strengths | Latency | Multi-tenant |
|-----------|-----------|---------|--------------|
| NeMo Guardrails | Programmable rails, dialog flows | Medium | Partial |
| LlamaGuard | Safety classification, fine-tunable | Low | Yes |
| Guardrails AI | Output parsing, validators | Low | Yes |
| Custom Engine | Full control, tenant-specific | Variable | Yes |

### 2. Assess Framework Requirements

Match requirements to capabilities:

| Requirement | NeMo | LlamaGuard | Guardrails AI | Custom |
|-------------|------|------------|---------------|--------|
| Input Filtering | Yes | Partial | No | Yes |
| Output Validation | Yes | Yes | Yes | Yes |
| Dialog Control | Yes | No | No | Yes |
| Per-tenant Config | Partial | Yes | Yes | Yes |
| Latency <100ms | No | Yes | Yes | Variable |

### 3. Design Hybrid Architecture

Recommend hybrid approach combining frameworks:

| Layer | Framework | Purpose |
|-------|-----------|---------|
| Input Gate | Custom + NeMo | Injection detection, dialog rails |
| Output Gate | LlamaGuard | Safety classification |
| Validation | Guardrails AI | Schema validation, parsing |
| Policy | Custom Engine | Tenant-specific rules |

### 4. Define Integration Points

Specify framework integration:

| Integration Point | Framework | Trigger |
|-------------------|-----------|---------|
| Pre-LLM | NeMo Guardrails | Every request |
| Post-LLM | LlamaGuard | Every response |
| Schema Validation | Guardrails AI | Structured outputs |
| Policy Check | Custom Engine | Tenant-flagged content |

**Verify current best practices with web search:**
Search the web: "NeMo Guardrails vs LlamaGuard comparison {date}"
Search the web: "AI guardrail framework production deployment {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the framework selection analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific framework capabilities or integration
- **P (Party Mode)**: Bring AI infrastructure and security perspectives on framework selection
- **C (Continue)**: Accept framework selection and proceed to policy engine design
- **[Specific refinements]**: Describe framework concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: framework comparison, hybrid architecture, integration points
- Process enhanced insights on framework trade-offs
- Ask user: "Accept these refined framework decisions? (y/n)"
- If yes, integrate into framework specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI guardrail framework selection for multi-tenant platform"
- Process AI infrastructure and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save framework selection to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-policy-engine-design.md`

---

## Verification

- [ ] Frameworks evaluated against requirements
- [ ] Hybrid architecture designed
- [ ] Integration points defined
- [ ] Latency budget validated
- [ ] Patterns align with pattern registry

---

## Outputs

- Framework selection with justification
- Hybrid architecture specification
- Integration design document
- **Load template:** `{project-root}/_bmad/bam/data/templates/ai-guardrails-template.md`

---

## Next Step

Proceed to `step-04-c-policy-engine-design.md` to design the policy engine.
