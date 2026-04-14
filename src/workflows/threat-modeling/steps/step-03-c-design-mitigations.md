# Step 3: Design Mitigations

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- CYCLE **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- MEMO Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- CLIP Reference pattern registry `web_queries` for search topics


---

## Purpose

Design mitigation strategies for identified threats, prioritize based on risk, and map to security controls.

## Prerequisites

- STRIDE analysis completed in Step 2
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security


---

## Inputs

- STRIDE threat analysis from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Spoofing Mitigations

| Threat | Mitigation | Control | Priority |
|--------|------------|---------|----------|
| Token forgery | Strong JWT validation, short TTL | Authentication | P1 |
| Tenant ID spoof | Cryptographic tenant binding | Authorization | P1 |
| API key forge | Key rotation, binding to origin | Authentication | P1 |
| Agent impersonation | Agent identity certificates | Authentication | P2 |

### 2. Design Tampering Mitigations

| Threat | Mitigation | Control | Priority |
|--------|------------|---------|----------|
| Prompt tampering | Input validation, sanitization | Input Control | P1 |
| Data manipulation | Integrity checks, audit logging | Data Protection | P1 |
| Embedding poisoning | Validation pipeline, checksums | AI Security | P2 |
| Response manipulation | Output signing, verification | Output Control | P2 |

### 3. Design Information Disclosure Mitigations

| Threat | Mitigation | Control | Priority |
|--------|------------|---------|----------|
| Cross-tenant leak | RLS, encryption at rest | Tenant Isolation | P1 |
| PII in prompts | PII detection, masking | AI Security | P1 |
| Model extraction | Rate limiting, output filtering | AI Security | P2 |
| Embedding extraction | Access controls, monitoring | Data Protection | P2 |

### 4. Design AI-Specific Mitigations

| Threat | Mitigation | Control | Priority |
|--------|------------|---------|----------|
| Prompt injection | Guardrails, input filtering | AI Security | P1 |
| Jailbreak attempts | Multi-layer defense, monitoring | AI Security | P1 |
| Tool abuse | Tool permissions, sandboxing | AI Security | P1 |
| Model poisoning | Training validation, rollback | AI Security | P2 |

**Soft Gate:** Steps 1-3 complete the core threat model. Present summary and ask for confirmation.

**Verify current best practices with web search:**
Search the web: "threat mitigation strategies STRIDE {date}"
Search the web: "AI security mitigations best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Review mitigation effectiveness
- **A2**: Analyze implementation complexity
- **A3**: Evaluate priority assignments
- **A4**: Assess AI-specific mitigations

### [P]ropose Changes
- **P1**: Propose additional mitigations
- **P2**: Propose priority adjustments
- **P3**: Suggest control mapping changes
- **P4**: Recommend implementation approaches

### [C]ontinue
- **C1**: Accept current mitigations and proceed to documentation
- **C2**: Mark step complete and load `step-04-c-create-threat-model.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Spoofing mitigations defined
- [ ] Tampering mitigations defined
- [ ] Information disclosure mitigations defined
- [ ] AI-specific mitigations defined
- [ ] Priorities assigned
- [ ] Patterns align with pattern registry

## Outputs

- Mitigation strategy matrix
- Control mapping
- Implementation roadmap

## Next Step

Proceed to `step-04-c-create-threat-model.md` to create the final documentation.
