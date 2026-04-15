# Step 3: Design Encryption in Transit

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

Design TLS configuration, mTLS for internal services, and API encryption strategy.

## Prerequisites

- Data classification from Step 1
- Encryption at rest from Step 2
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Configure TLS Standards

| Channel | Protocol | Cipher Suites | Certificate |
|---------|----------|---------------|-------------|
| External API | TLS 1.3 | AES-256-GCM | Public CA |
| Internal API | TLS 1.3 | AES-256-GCM | Private CA |
| Database | TLS 1.3 | AES-256-GCM | Private CA |
| LLM Provider | TLS 1.3 | Provider managed | Provider CA |

### 2. Configure mTLS for Services

| Service Mesh | mTLS | Certificate Management |
|--------------|------|----------------------|
| Istio/Envoy | Required | SPIFFE/SPIRE |
| gRPC | Required | Private CA |
| Kafka | Required | Private CA |

### 3. Design API Encryption

| Endpoint | Transport | Payload Encryption |
|----------|-----------|-------------------|
| Public API | TLS 1.3 | Optional (sensitive) |
| Admin API | TLS 1.3 + mTLS | Required |
| Webhook | TLS 1.3 | Signature |
| AI API | TLS 1.3 | Prompt masking |

**Soft Gate:** Present summary and ask for confirmation.

**Verify current best practices with web search:**
Search the web: "TLS 1.3 configuration best practices {date}"
Search the web: "mTLS service mesh security {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review TLS configuration
- **A2**: Analyze mTLS coverage
- **A3**: Evaluate API encryption

### [P]ropose Changes
- **P1**: Propose TLS adjustments
- **P2**: Propose mTLS changes
- **P3**: Suggest API encryption improvements

### [C]ontinue
- **C1**: Accept encryption in transit design
- **C2**: Mark step complete and load `step-04-c-create-encryption-design.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] TLS standards configured
- [ ] mTLS for services designed
- [ ] API encryption defined
- [ ] Patterns align with pattern registry

## Outputs

- TLS configuration specification
- mTLS architecture
- API encryption requirements

## Next Step

Proceed to `step-04-c-create-encryption-design.md`.
