# Step 1: Fine-tuning Requirements Analysis

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

Gather and analyze requirements for tenant-specific LLM fine-tuning capabilities, including supported models, fine-tuning methods, use cases, and compute constraints.

---

## Prerequisites

- Master architecture document loaded
- AI runtime configuration (`{ai_runtime}`) resolved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-runtime
- **Web research (if available):** Search for current fine-tuning best practices

---

## Inputs

- User requirements and constraints for fine-tuning pipeline
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Identify Supported Base Models

Determine which base models will support fine-tuning:

| Provider | Models | Fine-tuning Support |
|----------|--------|---------------------|
| OpenAI | GPT-4, GPT-3.5-turbo | API-based fine-tuning |
| Anthropic | Claude models | Custom training (limited) |
| Open Source | Llama, Mistral, Qwen | Full control fine-tuning |
| Custom | Self-hosted models | Full control |

### 2. Select Fine-tuning Methods

Evaluate fine-tuning approaches based on requirements:

| Method | VRAM Required | Training Time | Quality | Use Case |
|--------|---------------|---------------|---------|----------|
| Full Fine-tuning | High (40GB+) | Long | Highest | Enterprise tier |
| LoRA | Medium (16GB) | Medium | High | Pro tier |
| QLoRA | Low (8GB) | Medium | Good | Standard tier |
| Prefix Tuning | Low (8GB) | Fast | Moderate | Rapid iteration |
| Prompt Tuning | Minimal | Fast | Variable | Lightweight customization |

### 3. Document Tenant Use Cases

Capture typical fine-tuning scenarios:

- Domain-specific language adaptation
- Custom response style/tone
- Specialized task performance
- Proprietary knowledge injection
- Compliance-specific outputs

### 4. Define Compute Budget Constraints

Establish per-tier compute budgets:

| Tier | GPU Hours/Month | Max Concurrent Jobs | Dataset Size Limit |
|------|-----------------|---------------------|-------------------|
| Free | 0 | 0 | N/A |
| Starter | 10 | 1 | 10MB |
| Pro | 100 | 3 | 100MB |
| Enterprise | Unlimited | 10 | 1GB+ |

### 5. Assess Infrastructure Requirements

Evaluate infrastructure needs:
- GPU cluster requirements (A100, H100, consumer GPUs)
- Cloud vs on-premise considerations
- Cost optimization strategies
- Scaling patterns for burst training

**Verify current best practices with web search:**
Search the web: "LLM fine-tuning best practices multi-tenant {date}"
Search the web: "LoRA QLoRA fine-tuning production {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the requirements analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific fine-tuning method trade-offs
- **P (Party Mode)**: Bring ML engineer and platform architect perspectives
- **C (Continue)**: Accept requirements and proceed to data isolation design
- **[Specific refinements]**: Describe requirements concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: base models, fine-tuning methods, compute constraints
- Process enhanced insights on method selection
- Ask user: "Accept these refined requirements? (y/n)"
- If yes, integrate into requirements specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review fine-tuning requirements for multi-tenant AI platform"
- Process ML engineer and platform architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save requirements analysis to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-data-isolation-design.md`

---

## Verification

- [ ] Supported base models identified
- [ ] Fine-tuning methods selected per tier
- [ ] Tenant use cases documented
- [ ] Compute budgets defined
- [ ] Infrastructure requirements assessed
- [ ] Patterns align with pattern registry

---

## Outputs

- Fine-tuning requirements specification
- Supported models matrix
- Fine-tuning method selection by tier
- Compute budget allocation
- **Load template:** `{project-root}/_bmad/bam/templates/model-fine-tuning-template.md`

---

## Next Step

Proceed to `step-02-c-data-isolation-design.md` to design tenant data isolation.
