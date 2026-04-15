# Step 1: Dataset Schema Design

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

Define the golden dataset schema including input/output formats, metadata, and tenant context.

## Prerequisites

- Agent runtime architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-testing, llmops
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: model-versioning

---

## Inputs

- User requirements and constraints for golden dataset management
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define golden dataset schema:

## Input Format Specification

**Base Input Schema:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| task_id | string | Yes | Unique task identifier |
| input_text | string | Yes | User prompt or input |
| input_context | object | No | Additional context |
| tenant_id | string | Yes | Tenant for multi-tenant testing |
| tier | enum | Yes | FREE/PRO/ENTERPRISE |
| agent_type | string | Yes | Target agent type |

**Context Object Schema:**
| Field | Type | Description |
|-------|------|-------------|
| conversation_history | array | Prior turns |
| documents | array | Retrieved context |
| user_profile | object | User attributes |
| session_state | object | Session variables |

## Output Format Specification

**Base Output Schema:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| task_id | string | Yes | Matching input task_id |
| expected_output | string | Yes | Expected response |
| expected_tools | array | No | Tools expected to be called |
| expected_actions | array | No | Actions expected |
| acceptance_criteria | object | Yes | Pass/fail criteria |

**Acceptance Criteria Schema:**
| Field | Type | Description |
|-------|------|-------------|
| semantic_match | boolean | Must match semantically |
| exact_match | boolean | Must match exactly |
| contains | array | Must contain phrases |
| excludes | array | Must not contain |
| tool_called | array | Required tool calls |
| latency_max_ms | number | Maximum latency |

## Metadata Requirements

**Task Metadata:**
| Field | Type | Description |
|-------|------|-------------|
| category | enum | happy_path/edge_case/adversarial/regression |
| priority | enum | critical/high/medium/low |
| created_by | string | Creator identifier |
| created_at | datetime | Creation timestamp |
| last_validated | datetime | Last validation date |
| tags | array | Classification tags |
| difficulty | enum | easy/medium/hard |

## Annotation Schema

**Human Annotation Fields:**
| Field | Type | Description |
|-------|------|-------------|
| annotator_id | string | Annotator identifier |
| annotation_date | datetime | Annotation timestamp |
| confidence_score | float | Annotator confidence |
| review_status | enum | pending/approved/rejected |
| reviewer_id | string | Reviewer identifier |
| notes | string | Annotator notes |

## Tenant Context Fields

**Multi-Tenant Extensions:**
| Field | Type | Description |
|-------|------|-------------|
| tenant_id | string | Owning tenant |
| tenant_tier | enum | Tenant subscription tier |
| tenant_config | object | Tenant-specific settings |
| visibility | enum | private/shared/global |
| usage_rights | object | Who can use this task |

Output: Dataset schema specification document.

**Verify current best practices with web search:**
Search the web: "golden dataset schema AI evaluation {date}"
Search the web: "LLM evaluation dataset format best practices {date}"

_Source: [URL]_

## COLLABORATION MENUS (A/P/C):

After completing the schema design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into schema requirements and field definitions
- **P (Party Mode)**: Bring MLOps Engineer, Data Engineer, and QA Lead perspectives
- **C (Continue)**: Accept schema design and proceed to Step 2: Curation Workflow
- **Refine schema**: Describe specific schema concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: input/output schemas, metadata, tenant context
- Process enhanced insights
- Ask user: "Accept these refined schema requirements? (y/n)"
- If yes, integrate into schema document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review golden dataset schema design for AI evaluation"
- Process MLOps Engineer, Data Engineer, QA Lead perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save schema design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-curation-workflow.md`

---

## Verification

- [ ] Input format specified
- [ ] Output format specified
- [ ] Metadata requirements defined
- [ ] Annotation schema documented
- [ ] Tenant context fields established
- [ ] Patterns align with pattern registry

## Outputs

- Dataset schema specification
- Field definitions
- **Load template:** `{project-root}/_bmad/bam/data/templates/golden-dataset-schema-template.md`

## Next Step

Proceed to `step-02-c-curation-workflow.md` to design the curation process.
