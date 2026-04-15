# Step 1: Input Filtering Design

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

Design input validation and prompt injection prevention strategies to protect AI agents from malicious inputs while maintaining usability for legitimate requests.

---

## Prerequisites

- Agent runtime architecture document loaded
- AI runtime configuration (`{ai_runtime}`) resolved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-safety
- **Web research (if available):** Search for current AI input filtering best practices

---

## Inputs

- User requirements and constraints for input filtering
- Agent runtime architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Identify Input Attack Vectors

Catalog common input attack vectors for AI systems:

| Attack Type | Description | Risk Level |
|-------------|-------------|------------|
| Prompt Injection | Malicious instructions in user input | Critical |
| Jailbreaking | Attempts to bypass safety constraints | Critical |
| Data Exfiltration | Extracting training/system data | High |
| Context Manipulation | Confusing agent context | Medium |
| Resource Exhaustion | Extremely long inputs | Medium |

### 2. Design Input Sanitization Pipeline

Define the input processing stages:

| Stage | Purpose | Implementation |
|-------|---------|----------------|
| Length Validation | Prevent resource exhaustion | Max token limits per tier |
| Content Classification | Identify input type | PII, code, natural language |
| Injection Detection | Detect malicious patterns | ML classifier + rule engine |
| Sanitization | Clean potentially harmful content | Escape sequences, strip tags |
| Tenant Policy Check | Apply tenant-specific rules | Policy engine lookup |

### 3. Configure Prompt Injection Detection

Define detection mechanisms:

| Method | Description | Latency Impact |
|--------|-------------|----------------|
| Pattern Matching | Known injection signatures | Low |
| ML Classification | Trained injection detector | Medium |
| LLM-as-Judge | Secondary LLM evaluation | High |
| Behavioral Analysis | Anomaly detection | Medium |

### 4. Define Per-Tenant Input Policies

Design tenant-configurable input policies:

| Policy | Default | Configurable |
|--------|---------|--------------|
| Max Input Length | 4096 tokens | Yes (tier-based) |
| PII Detection | Enabled | Yes |
| Code Execution Block | Enabled | No (security) |
| Custom Deny Lists | Empty | Yes |
| Injection Sensitivity | Medium | Yes |

**Verify current best practices with web search:**
Search the web: "prompt injection prevention LLM {date}"
Search the web: "AI input validation best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the input filtering analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific attack vectors or detection methods
- **P (Party Mode)**: Bring AI security and DevOps perspectives on input filtering
- **C (Continue)**: Accept input filtering design and proceed to output validation
- **[Specific refinements]**: Describe input filtering concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: attack vectors, detection methods, tenant policies
- Process enhanced insights on input security trade-offs
- Ask user: "Accept these refined input filtering decisions? (y/n)"
- If yes, integrate into input filtering specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI input filtering design for multi-tenant platform security"
- Process AI security and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save input filtering design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-output-validation-design.md`

---

## Verification

- [ ] Attack vectors cataloged
- [ ] Sanitization pipeline defined
- [ ] Injection detection methods selected
- [ ] Per-tenant policies documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Input filtering architecture
- Sanitization pipeline specification
- Injection detection configuration
- Tenant policy schema
- **Load template:** `{project-root}/_bmad/bam/data/templates/content-policy-template.md`

---

## Next Step

Proceed to `step-02-c-output-validation-design.md` to design output validation.
