# Step 1: Provider Catalog Design

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

Design the provider registry with capabilities matrix, model equivalence mapping, SLA requirements, and cost comparison for multi-provider AI resilience.

---

## Prerequisites

- Agent runtime architecture document loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Actions

### 1. Catalog Provider Capabilities

Document provider features:

| Provider | Models | Capabilities | Region | SLA |
|----------|--------|--------------|--------|-----|
| OpenAI | GPT-4, GPT-3.5 | Chat, Completion, Embeddings | Global | 99.9% |
| Anthropic | Claude 3 | Chat, Analysis | US, EU | 99.5% |
| Azure OpenAI | GPT-4, GPT-3.5 | Chat, Completion | Multi-region | 99.95% |
| AWS Bedrock | Multiple | Chat, Embeddings | AWS Regions | 99.99% |
| Google Vertex | Gemini | Chat, Multimodal | GCP Regions | 99.9% |

### 2. Define Model Equivalence

Map equivalent models across providers:

| Use Case | Primary | Fallback 1 | Fallback 2 |
|----------|---------|------------|------------|
| Complex Reasoning | GPT-4 | Claude 3 Opus | Gemini Pro |
| Fast Chat | GPT-3.5 | Claude 3 Haiku | Gemini Flash |
| Embeddings | text-embedding-3 | Cohere Embed | Titan Embed |

### 3. Document SLA Requirements

Specify SLA needs:

| Requirement | Target | Measurement |
|-------------|--------|-------------|
| Availability | 99.9% | Monthly uptime |
| Latency p50 | <500ms | Request timing |
| Latency p99 | <2s | Request timing |
| Error Rate | <0.1% | Failed requests |

### 4. Compare Costs

Document pricing comparison:

| Model Class | Provider A | Provider B | Provider C |
|-------------|------------|------------|------------|
| Premium | $X/1K tokens | $Y/1K tokens | $Z/1K tokens |
| Standard | $X/1K tokens | $Y/1K tokens | $Z/1K tokens |
| Economy | $X/1K tokens | $Y/1K tokens | $Z/1K tokens |

**Verify current best practices with web search:**
Search the web: "LLM provider comparison {date}"
Search the web: "multi-provider AI fallback patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into provider capabilities
- **P (Party Mode)**: Bring infrastructure and cost perspectives
- **C (Continue)**: Accept provider catalog and proceed to quality thresholds
```

#### If 'C' (Continue):
- Save provider catalog to output document
- Proceed to next step: `step-02-c-quality-threshold-configuration.md`

---

## Verification

- [ ] Provider capabilities cataloged
- [ ] Model equivalence mapped
- [ ] SLA requirements documented
- [ ] Cost comparison completed

---

## Outputs

- Provider catalog specification
- Model equivalence mapping

---

## Next Step

Proceed to `step-02-c-quality-threshold-configuration.md` to design quality thresholds.
