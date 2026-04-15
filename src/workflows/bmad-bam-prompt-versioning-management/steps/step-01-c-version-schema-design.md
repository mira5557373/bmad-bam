# Step 1: Version Schema Design

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

Define the prompt versioning schema that enables semantic versioning, tenant-specific overrides, and multi-language support for AI prompts across the platform.

---

## Prerequisites

- Master architecture document loaded
- AI runtime configuration (`{ai_runtime}`) resolved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: prompt-management
- **Web research (if available):** Search for current prompt versioning best practices

---

## Inputs

- User requirements and constraints for prompt versioning
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Versioning Strategy

Select semantic versioning approach for prompts:

| Version Change | Trigger Condition | Example |
|----------------|-------------------|---------|
| Major (X.0.0) | Breaking behavior change | New output format |
| Minor (X.Y.0) | New capability, backward compatible | Added context |
| Patch (X.Y.Z) | Bug fix, wording improvement | Typo correction |

### 2. Design Prompt Metadata Schema

Define the metadata structure for versioned prompts:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| prompt_id | string | YES | Unique identifier |
| version | semver | YES | Semantic version |
| model_compatibility | array | YES | Compatible model versions |
| context_window | int | YES | Max context tokens |
| temperature | float | NO | Recommended temperature |
| tenant_scope | enum | YES | GLOBAL/TENANT/USER |
| language | string | YES | ISO language code |
| created_at | timestamp | YES | Creation timestamp |
| created_by | string | YES | Author identifier |
| parent_version | semver | NO | Previous version reference |
| status | enum | YES | DRAFT/ACTIVE/DEPRECATED |

### 3. Design Tenant Override Mechanism

Define how tenants can override global prompts:

| Override Level | Scope | Inheritance | Approval |
|----------------|-------|-------------|----------|
| Platform Default | All tenants | Base layer | Platform admin |
| Tenant Override | Single tenant | Extends platform | Tenant admin |
| User Preference | Single user | Extends tenant | User/auto |

### 4. Define Version History Tracking

Design diff tracking and audit trail:

- Git-like diff for prompt changes
- Author and timestamp for each change
- Change reason/justification field
- Rollback reference chain
- Approval workflow integration

### 5. Multi-Language Variant Strategy

Define how language variants are managed:

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Locale Suffix | `prompt_v1.0.0_en-US` | Full localization |
| Language Family | `prompt_v1.0.0_en` | Regional variants |
| Fallback Chain | en-US -> en -> default | Progressive fallback |

**Verify current best practices with web search:**
Search the web: "LLM prompt versioning best practices {date}"
Search the web: "prompt management multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the version schema analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into versioning complexity and edge cases
- **P (Party Mode)**: Bring AI architect and DevOps perspectives on schema design
- **C (Continue)**: Accept version schema and proceed to A/B testing framework
- **[Specific refinements]**: Describe schema concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: versioning strategy, metadata schema, tenant override mechanisms
- Process enhanced insights on schema trade-offs
- Ask user: "Accept these refined schema decisions? (y/n)"
- If yes, integrate into version specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review prompt versioning schema design for multi-tenant AI platform"
- Process AI architect and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save version schema design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-ab-testing-framework.md`

---

## Verification

- [ ] Semantic versioning strategy defined
- [ ] Metadata schema complete with all required fields
- [ ] Tenant override mechanism documented
- [ ] Version history tracking designed
- [ ] Multi-language strategy defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Prompt versioning schema specification
- Metadata structure definition
- Tenant override hierarchy
- **Load template:** `{project-root}/_bmad/bam/data/templates/prompt-version-template.md`

---

## Next Step

Proceed to `step-02-c-ab-testing-framework.md` to design A/B testing infrastructure.
