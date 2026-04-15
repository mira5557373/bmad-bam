# Step 1: LLM Metrics Collection Setup

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Use web search to verify current best practices

---

## Purpose

Configure trace collection, prompt/completion logging, model metadata capture, and per-tenant attribution for comprehensive LLM observability.

---

## Prerequisites

- AI runtime architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-observability

---

## Actions

### 1. Trace Collection Configuration

| Trace Component | Tool | Configuration | Status |
|-----------------|------|---------------|--------|
| Request spans | Langfuse/Arize | Auto-instrumentation | Active/Pending |
| Agent traces | {ai_runtime} SDK | Custom spans | Active/Pending |
| Tool execution | OpenTelemetry | Tool spans | Active/Pending |
| Memory operations | Custom | Memory spans | Active/Pending |

Trace sampling configuration:
| Environment | Sampling Rate | Retention |
|-------------|---------------|-----------|
| Development | 100% | 7 days |
| Staging | 100% | 30 days |
| Production | 10% (100% errors) | 90 days |

### 2. Prompt/Completion Logging

| Data Type | Logged | Storage | Privacy |
|-----------|--------|---------|---------|
| System prompts | Yes | Encrypted | PII-free |
| User prompts | Yes (sanitized) | Encrypted | PII masked |
| Completions | Yes (sanitized) | Encrypted | PII masked |
| Token counts | Yes | Metrics store | N/A |

PII handling:
- [ ] PII detection active
- [ ] Automatic masking enabled
- [ ] Opt-out respected

### 3. Model Metadata Capture

| Metadata | Captured | Example |
|----------|----------|---------|
| Model name | Yes | gpt-4-turbo |
| Model version | Yes | 2024-04-09 |
| Temperature | Yes | 0.7 |
| Max tokens | Yes | 4096 |
| Provider | Yes | OpenAI |
| Prompt template version | Yes | v1.2.3 |

### 4. Per-Tenant Attribution

| Attribution Field | Source | Status |
|-------------------|--------|--------|
| Tenant ID | Context header | Active |
| User ID | Auth token | Active |
| Tier | Tenant lookup | Active |
| Cost center | Tenant config | Active |

**Verify current best practices with web search:**
Search the web: "LLM observability best practices {date}"
Search the web: "LangSmith Langfuse comparison {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into trace configuration
- **P (Party Mode)**: Bring AI and observability perspectives
- **C (Continue)**: Accept configuration and proceed to token tracking
- **[Specific refinements]**: Describe concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save LLM metrics collection to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-token-usage-tracking.md`

---

## Verification

- [ ] Trace collection configured
- [ ] Prompt/completion logging active
- [ ] Model metadata captured
- [ ] Per-tenant attribution working

---

## Outputs

- LLM metrics collection configuration
- **Load template:** `{project-root}/_bmad/bam/data/templates/ai-observability-template.md`

---

## Next Step

Proceed to `step-02-c-token-usage-tracking.md` to set up token tracking.
