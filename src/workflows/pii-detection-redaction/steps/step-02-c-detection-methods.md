# Step 2: Detection Methods

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

Design PII detection mechanisms including pattern-based detection, ML-based classification, context-aware detection, and multi-language support.

---

## Prerequisites

- Step 1 completed with PII taxonomy design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-safety
- **Web research (if available):** Search for current PII detection best practices

---

## Inputs

- PII taxonomy design from Step 1
- Agent runtime architecture document
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Detection accuracy requirements

---

## Actions

### 1. Design Pattern-Based Detection

Define rule-based detection patterns:

| PII Type | Pattern Type | Example Pattern | Precision |
|----------|--------------|-----------------|-----------|
| SSN | Regex | `\d{3}-\d{2}-\d{4}` | High |
| Email | Regex | RFC 5322 compliant | High |
| Phone | Regex + Validation | Country-specific formats | Medium |
| Credit Card | Luhn + Regex | Card number patterns | High |
| Address | NER + Rules | Street, city, zip patterns | Medium |
| Name | NER | Person entity extraction | Medium |

### 2. Design ML-Based Classification

Define machine learning detection:

| Model Type | Use Case | Training Data | Accuracy Target |
|------------|----------|---------------|-----------------|
| NER (Spacy/Flair) | Entity extraction | Annotated PII corpus | 95%+ recall |
| Text Classifier | Sensitivity scoring | Labeled documents | 90%+ precision |
| Custom Fine-tune | Domain-specific PII | Tenant data (with consent) | 98%+ recall |
| Ensemble | Combined detection | Multiple sources | Maximize F1 |

### 3. Configure Context-Aware Detection

Define contextual detection rules:

| Context Signal | Detection Adjustment | Example |
|----------------|---------------------|---------|
| Field Name | Boost confidence | Field "ssn" + 9 digits = SSN |
| Document Type | Adjust sensitivity | Tax form = elevate all numbers |
| User Intent | Modify threshold | "Delete my data" = scan all |
| Data Flow | Apply pipeline rules | Export = strict detection |

### 4. Implement Multi-Language Support

Define language-specific detection:

| Language | Detection Strategy | Considerations |
|----------|-------------------|----------------|
| English | Full pattern + ML | Primary support |
| Spanish | NER + Patterns | Names, addresses differ |
| Chinese | Character-based NER | No spaces, different ID formats |
| Arabic | RTL-aware patterns | Direction-sensitive detection |
| Universal | ML transliteration | Fallback for unknown languages |

**Verify current best practices with web search:**
Search the web: "PII detection NER machine learning {date}"
Search the web: "multi-language PII detection best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the detection methods analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific detection methods or accuracy
- **P (Party Mode)**: Bring AI/ML and privacy perspectives on detection design
- **C (Continue)**: Accept detection methods design and proceed to redaction strategies
- **[Specific refinements]**: Describe detection concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: pattern detection, ML classification, context rules
- Process enhanced insights on detection trade-offs
- Ask user: "Accept these refined detection method decisions? (y/n)"
- If yes, integrate into detection methods specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review PII detection methods for multi-tenant AI platform"
- Process AI/ML and privacy perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save detection methods design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-redaction-strategies.md`

---

## Verification

- [ ] Pattern-based detection defined
- [ ] ML-based classification designed
- [ ] Context-aware rules configured
- [ ] Multi-language support planned
- [ ] Patterns align with pattern registry

---

## Outputs

- Pattern detection rule library
- ML model architecture specification
- Context-aware detection rules
- Multi-language support plan

---

## Next Step

Proceed to `step-03-c-redaction-strategies.md` to design redaction strategies.
