# Step 3: Redaction Strategies

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

Design redaction and anonymization approaches including methods, reversibility options, audit trail requirements, and performance optimization.

---

## Prerequisites

- Step 1 and 2 completed with PII taxonomy and detection methods
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-safety
- **Web research (if available):** Search for current data redaction best practices

---

## Inputs

- PII taxonomy design from Step 1
- Detection methods design from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Reversibility and audit requirements

---

## Actions

### 1. Define Redaction Methods

Design redaction approaches:

| Method | Description | Reversible | Use Case |
|--------|-------------|------------|----------|
| Masking | Replace with fixed pattern | No | Logs, displays |
| Tokenization | Replace with reversible token | Yes | Internal processing |
| Encryption | Encrypt in place | Yes | Storage, transit |
| Generalization | Replace with category | No | Analytics |
| Suppression | Remove entirely | No | High-risk PII |
| Pseudonymization | Replace with consistent fake | Yes | Testing |

### 2. Configure Method Selection

Define method selection rules:

| Sensitivity | Context | Method | Example |
|-------------|---------|--------|---------|
| CRITICAL | Display | Masking | `***-**-1234` |
| CRITICAL | Storage | Encryption | AES-256 encrypted |
| CRITICAL | Analytics | Suppression | Field removed |
| HIGH | Display | Partial mask | `j***@email.com` |
| HIGH | AI Processing | Tokenization | `<PII_TOKEN_123>` |
| MEDIUM | Analytics | Generalization | "Age: 30-40" |

### 3. Design Reversibility Architecture

Define token/encryption management:

| Component | Purpose | Security |
|-----------|---------|----------|
| Token Vault | Store PII ↔ token mappings | Tenant-isolated, encrypted |
| Key Management | Encryption key lifecycle | HSM-backed, rotation policy |
| Access Control | Who can reverse redaction | Role-based, audit logged |
| TTL Policy | Token/key expiration | Configurable per sensitivity |

### 4. Specify Audit Trail Requirements

Define redaction audit logging:

| Event | Data Captured | Retention |
|-------|---------------|-----------|
| Redaction Applied | PII type, method, location | 90 days |
| Redaction Reversed | Reverser identity, reason | 365 days |
| Detection Miss | False negative discovered | 365 days |
| Policy Change | Before/after rules | 365 days |

### 5. Optimize Performance

Define performance considerations:

| Optimization | Technique | Impact |
|--------------|-----------|--------|
| Caching | Cache detection patterns | 50% faster detection |
| Streaming | Process in chunks | Lower memory |
| Async | Background redaction | Non-blocking |
| Batch | Bulk operations | Throughput |

**Verify current best practices with web search:**
Search the web: "PII redaction tokenization best practices {date}"
Search the web: "data anonymization reversibility patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the redaction strategies analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific redaction methods or reversibility
- **P (Party Mode)**: Bring security and privacy perspectives on redaction design
- **C (Continue)**: Accept redaction strategies design and proceed to tenant policies
- **[Specific refinements]**: Describe redaction concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: redaction methods, reversibility, audit, performance
- Process enhanced insights on redaction trade-offs
- Ask user: "Accept these refined redaction strategy decisions? (y/n)"
- If yes, integrate into redaction strategies specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review PII redaction strategies for multi-tenant AI platform"
- Process security and privacy perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save redaction strategies design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-tenant-policies.md`

---

## Verification

- [ ] Redaction methods defined
- [ ] Method selection rules configured
- [ ] Reversibility architecture designed
- [ ] Audit trail requirements documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Redaction method specifications
- Method selection matrix
- Reversibility architecture design
- Audit trail specification

---

## Next Step

Proceed to `step-04-c-tenant-policies.md` to design tenant policies.
