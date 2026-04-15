# Step 3: Training Configuration Design

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Define training infrastructure configuration including compute allocation, job orchestration, hyperparameter management, and checkpoint storage for tenant fine-tuning jobs.

---

## Prerequisites

- Data isolation design complete (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-runtime

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Compute Resource Allocation

Establish resource pools per tier:

| Tier | GPU Type | vCPU | Memory | Storage | Priority |
|------|----------|------|--------|---------|----------|
| Starter | T4 / A10 | 4 | 16GB | 100GB | Low |
| Pro | A10 / A100-40GB | 8 | 32GB | 500GB | Medium |
| Enterprise | A100-80GB / H100 | 16 | 64GB | 1TB | High |
| Dedicated | Custom | Custom | Custom | Custom | Highest |

### 2. Design Job Orchestration

Select and configure orchestration platform:

| Platform | Use Case | Configuration |
|----------|----------|---------------|
| Kubernetes + GPU Operator | Self-hosted | Node pools per tier, spot instances |
| Modal | Serverless GPU | On-demand, auto-scaling |
| AWS SageMaker | Managed training | Training jobs with spot |
| Azure ML | Managed training | Compute clusters |
| GCP Vertex AI | Managed training | Custom containers |

Job lifecycle:
1. Job submission with tenant context
2. Resource allocation from tier pool
3. Container provisioning with isolated storage
4. Training execution with monitoring
5. Artifact upload and cleanup

### 3. Configure Hyperparameter Management

Define hyperparameter handling:

| Parameter | Default | Tenant Configurable | Validation |
|-----------|---------|---------------------|------------|
| Learning rate | 2e-5 | Yes | 1e-6 to 1e-3 |
| Batch size | 4 | Yes | 1-32 based on GPU |
| Epochs | 3 | Yes | 1-10 |
| LoRA rank | 8 | Yes (Pro+) | 4-64 |
| Warmup ratio | 0.03 | Yes | 0-0.2 |
| Weight decay | 0.01 | No | Fixed |

Preset configurations:
- **Quality-optimized:** Lower LR, more epochs, higher rank
- **Speed-optimized:** Higher LR, fewer epochs, lower rank
- **Balanced:** Default settings

### 4. Design Checkpoint Storage

Define checkpoint management:

| Checkpoint Type | Storage | Retention | Purpose |
|-----------------|---------|-----------|---------|
| Epoch checkpoints | Object storage | Job duration | Resume training |
| Best checkpoint | Object storage | Until model delete | Quality tracking |
| Final model | Model registry | Tenant lifecycle | Deployment |
| Training state | Redis | Job duration | Fault tolerance |

### 5. Configure Training Monitoring

Establish monitoring hooks:

| Metric | Collection Frequency | Alert Threshold |
|--------|---------------------|-----------------|
| Loss | Per step | Divergence detection |
| GPU utilization | Per minute | < 50% sustained |
| Memory usage | Per minute | > 90% |
| Training throughput | Per epoch | < expected baseline |
| Cost accumulation | Per minute | Budget threshold |

**Verify current best practices with web search:**
Search the web: "LLM fine-tuning infrastructure best practices {date}"
Search the web: "Kubernetes GPU training multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the training configuration design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into orchestration or hyperparameter strategies
- **P (Party Mode)**: Bring ML ops and infrastructure perspectives on training config
- **C (Continue)**: Accept training config and proceed to tenant quotas
- **[Specific refinements]**: Describe training configuration concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: compute allocation, orchestration platform, hyperparameters
- Process enhanced insights on training infrastructure
- Ask user: "Accept these refined training configuration decisions? (y/n)"
- If yes, integrate into training configuration specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review training infrastructure for fine-tuning in multi-tenant platform"
- Process ML ops and infrastructure perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save training configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-tenant-quota-management.md`

---

## Verification

- [ ] Compute resource allocation defined per tier
- [ ] Job orchestration platform selected and configured
- [ ] Hyperparameter management designed
- [ ] Checkpoint storage strategy documented
- [ ] Training monitoring configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Compute resource allocation matrix
- Job orchestration architecture
- Hyperparameter configuration schema
- Checkpoint storage specification
- Monitoring configuration
- **Load template:** `{project-root}/_bmad/bam/data/templates/model-governance-template.md`

---

## Next Step

Proceed to `step-04-c-tenant-quota-management.md` to define quota systems.
