# Step 1: Context Strategy Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Design token budget allocation, context prioritization, and truncation strategies for optimal context window utilization.

---

## Prerequisites

- Agent runtime architecture document loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Actions

### 1. Define Token Budget Allocation

| Context Component | Budget % | Priority |
|-------------------|----------|----------|
| System Prompt | 15% | Fixed |
| Conversation History | 40% | Sliding |
| Retrieved Context | 30% | Dynamic |
| User Message | 10% | Protected |
| Response Buffer | 5% | Reserved |

### 2. Design Context Prioritization

| Priority Level | Content Type | Retention |
|----------------|--------------|-----------|
| Critical | System instructions | Always |
| High | Recent messages (last 5) | Sliding |
| Medium | Relevant retrieved docs | Dynamic |
| Low | Older history | Compressed |

### 3. Configure Truncation Strategies

| Strategy | When | Method |
|----------|------|--------|
| Recency | Window exceeded | Drop oldest |
| Relevance | Low semantic score | Drop irrelevant |
| Compression | High volume | Summarize |
| Hybrid | Complex conversations | Combined |

**Verify current best practices with web search:**
Search the web: "LLM context window management {date}"
Search the web: "token budget optimization AI {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into budget allocation
- **P (Party Mode)**: Bring ML and product perspectives
- **C (Continue)**: Accept strategy design and proceed to compression
```

#### If 'C' (Continue):
- Save context strategy to output document
- Proceed to next step: `step-02-c-compression-techniques.md`

---

## Verification

- [ ] Token budget defined
- [ ] Prioritization designed
- [ ] Truncation strategies configured

---

## Outputs

- Token budget allocation specification
- Context prioritization rules
- Truncation strategy configuration

---

## Next Step

Proceed to `step-02-c-compression-techniques.md` to design compression.
