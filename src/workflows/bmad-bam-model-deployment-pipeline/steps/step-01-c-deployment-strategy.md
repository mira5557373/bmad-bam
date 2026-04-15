# Step 1: Define Deployment Strategy

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

Define the core deployment strategy including deployment patterns, model versioning, artifact management, and infrastructure requirements for multi-tenant AI platforms.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `model-deployment`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `ai-lifecycle`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---

## Inputs

- User requirements and constraints for model deployment
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Select Deployment Pattern

Choose the primary deployment strategy:

| Pattern | Description | When to Use |
|---------|-------------|-------------|
| Blue-Green | Two identical environments, instant switch | Zero-downtime, full rollback capability |
| Canary | Gradual traffic shift to new version | Risk mitigation, production testing |
| Rolling | Incremental instance updates | Resource efficient, continuous availability |
| Shadow | Mirror traffic to new version | Testing without impact, A/B comparison |

For each pattern, document:
- Resource requirements
- Rollback time
- Tenant isolation considerations
- Cost implications per tier

### 2. Define Model Versioning Strategy

| Component | Versioning Approach | Example |
|-----------|---------------------|---------|
| Model Artifacts | Semantic versioning | `v1.2.3` |
| Model Weights | Hash-based | `sha256:abc123` |
| Configuration | Git-tagged | `config-v1.2.0` |
| Prompts | Version + timestamp | `prompt-v2-20260410` |

Establish:
- Version naming conventions
- Artifact storage locations (S3, GCS, MLflow)
- Metadata tracking requirements
- Lineage and provenance tracking

### 3. Configure Infrastructure Targets

Define deployment targets per tenant tier:

| Tier | Deployment Target | Scaling | Isolation |
|------|-------------------|---------|-----------|
| Free | Shared inference pool | Auto-scale 1-5 | Namespace |
| Pro | Dedicated inference pods | Auto-scale 2-10 | Pod |
| Enterprise | Dedicated cluster | Custom | Cluster |

For each target, specify:
- Compute requirements (GPU, CPU, memory)
- Network configuration
- Storage requirements
- Failover strategy

**Verify current best practices with web search:**
Search the web: "model deployment pipeline MLOps {date}"
Search the web: "blue-green canary deployment ML models {date}"
Search the web: "model versioning best practices multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the deployment strategy above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into deployment pattern selection and infrastructure requirements
- **P (Party Mode)**: Bring analyst and architect perspectives for strategy review
- **C (Continue)**: Accept deployment strategy and proceed to tenant rollout design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass strategy context: deployment patterns, versioning, infrastructure
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into deployment strategy
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review deployment strategy: {summary of patterns and infrastructure}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save deployment strategy to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-tenant-rollout.md`

---

## Verification

- [ ] Deployment pattern selected and justified
- [ ] Model versioning strategy defined
- [ ] Infrastructure targets specified per tier
- [ ] Resource requirements documented
- [ ] Rollback capabilities assessed
- [ ] Patterns align with pattern registry

---

## Outputs

- Deployment strategy specification
- Model versioning conventions
- Infrastructure requirements matrix
- **Load template:** `{project-root}/_bmad/bam/data/templates/deployment-strategy-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/deployment-template.md`

---

## Next Step

Proceed to `step-02-c-tenant-rollout.md` to design tenant-specific rollout procedures.
