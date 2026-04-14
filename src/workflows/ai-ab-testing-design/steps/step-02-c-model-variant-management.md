# Step 2: Model Variant Management

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

---

## Purpose

Design the model variant management system for storing, versioning, and deploying different model configurations, prompts, and agent settings.

---

## Prerequisites

- Step 1 completed with experiment framework design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-testing

---

## Inputs

- Experiment framework from Step 1
- Agent runtime architecture document
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Variant Types

Catalog testable variant types:

| Variant Type | Description | Storage |
|--------------|-------------|---------|
| Model Version | Different LLM versions | Model registry |
| Prompt Template | System/user prompt variations | Prompt store |
| Parameters | Temperature, max_tokens, etc. | Config store |
| Agent Config | Topology, tool selection | Agent registry |
| Guardrails | Safety threshold variations | Policy store |

### 2. Design Variant Storage

Specify storage architecture:

| Component | Storage | Versioning | Access |
|-----------|---------|------------|--------|
| Prompt Templates | PostgreSQL + S3 | Git-style | API |
| Model Configs | Config store | Immutable | API |
| Parameters | Redis | Snapshot | Real-time |
| A/B Mappings | PostgreSQL | Audit log | API |

### 3. Configure Variant Deployment

Define deployment patterns:

| Pattern | Description | Rollback Time |
|---------|-------------|---------------|
| Blue/Green | Full variant swap | Instant |
| Canary | Gradual traffic shift | Minutes |
| Shadow | Parallel execution | N/A |
| Feature Flag | Toggle-based | Instant |

### 4. Design Rollout Controls

Specify rollout management:

| Control | Description | Default |
|---------|-------------|---------|
| Min Sample Size | Minimum requests before decision | 1000 |
| Ramp Rate | Traffic increase per period | 10%/hour |
| Auto-rollback | Trigger on metric degradation | Enabled |
| Manual Override | Force variant selection | Available |

**Verify current best practices with web search:**
Search the web: "LLM prompt versioning A/B testing {date}"
Search the web: "model variant deployment canary releases {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the variant management analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into variant storage or deployment patterns
- **P (Party Mode)**: Bring MLOps and platform engineering perspectives
- **C (Continue)**: Accept variant management design and proceed to metrics collection
- **[Specific refinements]**: Describe variant management concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save variant management design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-metrics-collection-design.md`

---

## Verification

- [ ] Variant types cataloged
- [ ] Storage architecture designed
- [ ] Deployment patterns specified
- [ ] Rollout controls defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Variant management specification
- Storage architecture document
- Deployment pattern documentation

---

## Next Step

Proceed to `step-03-c-metrics-collection-design.md` to design metrics collection.
