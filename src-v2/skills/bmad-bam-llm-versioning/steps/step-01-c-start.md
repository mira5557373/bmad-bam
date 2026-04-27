# Step 01: Initialize LLM Versioning Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Initialize LLM versioning design and identify current model inventory
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load AI runtime configuration and LLM versioning patterns
- 🚫 Do NOT: Design version management strategy (that's Step 02)
- 🔍 Use web search: Verify LLM versioning patterns against current best practices
- ⚠️ Gate: QG-AI1 - AI/Agent runtime configuration

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading AI runtime configuration
- Identifying all LLM models currently in use
- Cataloging model versions per tenant tier
- Loading LLM versioning patterns from registry

**OUT OF SCOPE:**
- Designing version management strategy (Step 02)
- Rollout planning (Step 03)
- Monitoring design (Step 04)

---

## Purpose

Initialize the LLM versioning design by loading AI runtime configuration, identifying all model versions currently deployed, and establishing the versioning design scope. This step gathers context required for tenant-aware LLM version management.

---

## Prerequisites

- Master architecture complete with AI runtime selection
- AI runtime configuration established
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` → filter: `{ai_runtime}`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-versioning
- **Load guide:** `{project-root}/_bmad/bam/data/domains/llm-versioning.md`

---

## Inputs

- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- AI runtime configuration: `{output_folder}/planning-artifacts/ai/runtime-config.md`
- Existing model inventory (if any)
- Tenant tier definitions

---

## YOUR TASK:

Load AI runtime configuration and identify all LLM models currently in use.

---

## Main Sequence

### 1. Load AI Runtime Configuration

Load the AI runtime configuration document:

```
{output_folder}/planning-artifacts/ai/runtime-config.md
```

Extract:
- Selected AI runtime framework ({ai_runtime})
- Orchestration patterns in use
- Agent definitions and their LLM dependencies
- Current model endpoints

If AI runtime configuration does not exist, inform user and offer to run `bmad-bam-agent-runtime-architecture` workflow first.

### 2. Identify LLM Models in Use

Catalog all LLM models currently deployed:

| Model ID | Provider | Model Name | Version | Purpose | Tier Access |
|----------|----------|------------|---------|---------|-------------|
| {{model_id}} | OpenAI/Anthropic/Custom | {{name}} | {{version}} | {{purpose}} | Free/Pro/Enterprise |

**Categories to identify:**
- Primary chat/completion models
- Embedding models
- Specialized task models (summarization, classification, etc.)
- Fine-tuned custom models

### 3. Document Tenant-Model Mapping

Create the current state of tenant-model assignments:

| Tenant Tier | Primary Model | Fallback Model | Rate Limits | Cost Tier |
|-------------|---------------|----------------|-------------|-----------|
| Free | {{model}} | {{fallback}} | {{limits}} | Low |
| Pro | {{model}} | {{fallback}} | {{limits}} | Medium |
| Enterprise | {{model}} | {{fallback}} | {{limits}} | High |

### 4. Identify Version Dependencies

Document dependencies that affect model versioning:

| Dependency Type | Description | Impact on Versioning |
|-----------------|-------------|----------------------|
| Prompt templates | Templates tied to specific model versions | Must version together |
| Output parsers | Parsers expecting specific response formats | May break on version change |
| Token limits | Different models have different context windows | Affects chunking strategies |
| API compatibility | Provider API versions | May require adapter updates |

### 5. Load LLM Versioning Patterns

**Verify current best practices with web search:**
Search the web: "LLM model versioning strategies multi-tenant {date}"
Search the web: "AI model version management SaaS platforms {date}"

Document applicable patterns:
- Semantic versioning for LLM configurations
- Blue-green model deployment
- Canary rollout strategies
- A/B testing frameworks

### 6. Establish Versioning Scope

Define the scope for version management design:

**Models Requiring Versioning:** {{count}} models
**Tenant Tiers:** {{count}} tiers
**Environments:** Development / Staging / Production
**Rollback Requirements:** {{requirements}}

---

## SUCCESS METRICS:

- [ ] AI runtime configuration loaded successfully
- [ ] All LLM models cataloged with versions
- [ ] Tenant-model mapping documented
- [ ] Version dependencies identified
- [ ] Versioning patterns loaded from registry
- [ ] Design scope established

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| AI runtime config missing | Run agent-runtime-architecture workflow first |
| No models identified | Review codebase for LLM API integrations |
| Tenant tiers undefined | Define tiers in master architecture first |
| Pattern registry unavailable | Use web search for versioning best practices |

---

## Verification

- [ ] AI runtime configuration loaded
- [ ] Model inventory complete
- [ ] Tenant-model assignments documented
- [ ] Dependencies cataloged
- [ ] Versioning patterns identified

---

## Outputs

- LLM model inventory table
- Current tenant-model mapping
- Version dependency analysis
- Applicable versioning patterns
- Design scope summary

---

## NEXT STEP:

Proceed to `step-02-c-analyze.md` to design the version management strategy with model registry and per-tenant assignments.
