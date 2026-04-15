# Step 2: Output Validation Design

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

Design output validation pipeline to ensure AI agent responses meet safety, accuracy, and brand standards before delivery to users.

---

## Prerequisites

- Step 1 completed with input filtering design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-safety
- **Web research (if available):** Search for current AI output validation best practices

---

## Inputs

- Input filtering design from Step 1
- Agent runtime architecture document
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Content safety requirements

---

## Actions

### 1. Define Output Safety Categories

Catalog output safety concerns:

| Category | Description | Action |
|----------|-------------|--------|
| Harmful Content | Violence, hate speech, self-harm | Block + Log |
| PII Leakage | Personal data in responses | Redact + Alert |
| Hallucination | Factually incorrect claims | Flag + Disclaimer |
| Brand Safety | Off-brand or inappropriate tone | Revise + Log |
| Confidential Data | System/tenant data exposure | Block + Alert |

### 2. Design Validation Pipeline

Define output processing stages:

| Stage | Purpose | Latency Budget |
|-------|---------|----------------|
| Content Safety Scan | Detect harmful content | 50ms |
| PII Detection | Identify personal data | 30ms |
| Factual Verification | Check claims against knowledge | 100ms |
| Brand Compliance | Verify tone and style | 20ms |
| Final Assembly | Combine with metadata | 10ms |

### 3. Configure Safety Scoring

Define scoring thresholds:

| Metric | Threshold | Action Below Threshold |
|--------|-----------|------------------------|
| Safety Score | 0.95 | Block response |
| Confidence Score | 0.80 | Add disclaimer |
| Factual Score | 0.85 | Flag for review |
| Brand Score | 0.90 | Route to revision |

### 4. Define Fallback Responses

Design graceful degradation:

| Trigger | Fallback Response | Logging |
|---------|-------------------|---------|
| Safety Block | "I cannot help with that request" | Full context |
| Low Confidence | Response + confidence disclaimer | Metrics only |
| Factual Concern | Response + verification note | Full context |
| System Error | "Please try again" | Error details |

**Verify current best practices with web search:**
Search the web: "LLM output validation safety scoring {date}"
Search the web: "AI content moderation pipeline design {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the output validation analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation categories or scoring
- **P (Party Mode)**: Bring AI safety and product perspectives on output validation
- **C (Continue)**: Accept output validation design and proceed to framework selection
- **[Specific refinements]**: Describe output validation concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: safety categories, validation pipeline, scoring thresholds
- Process enhanced insights on output safety trade-offs
- Ask user: "Accept these refined output validation decisions? (y/n)"
- If yes, integrate into output validation specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI output validation design for multi-tenant platform safety"
- Process AI safety and product perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save output validation design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-guardrail-framework-selection.md`

---

## Verification

- [ ] Safety categories defined
- [ ] Validation pipeline designed
- [ ] Scoring thresholds configured
- [ ] Fallback responses documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Output validation pipeline specification
- Safety scoring configuration
- Fallback response definitions

---

## Next Step

Proceed to `step-03-c-guardrail-framework-selection.md` to select guardrail frameworks.
