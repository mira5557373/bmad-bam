# Step 3: Define AI-Specific Baselines

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- SEARCH Use web search to verify current best practices when making technology decisions

---

## Purpose

Define security configuration baselines specific to AI/ML components including LLM gateways, vector stores, and agent orchestrators.

## Prerequisites

- Infrastructure baselines from Step 1
- Application baselines from Step 2
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Define LLM Gateway Baselines

| Setting | Baseline | Rationale |
|---------|----------|-----------|
| Input Filtering | Prompt injection detection | Attack prevention |
| Output Filtering | PII detection, content filter | Data protection |
| Rate Limiting | Token/request limits | Cost control |
| Logging | Prompt/response audit | Compliance |
| Timeout | 30s default, configurable | Resource control |

### 2. Define Vector Store Baselines

| Setting | Baseline | Rationale |
|---------|----------|-----------|
| Access Control | Tenant isolation | Data separation |
| Encryption | AES-256 at rest | Data protection |
| Network | Private access only | Network security |
| Indexing | Tenant-scoped | Query isolation |
| Backup | Encrypted, tenant-aware | Recovery |

### 3. Define Agent Orchestrator Baselines

| Setting | Baseline | Rationale |
|---------|----------|-----------|
| Tool Permissions | Least privilege | Attack surface |
| Execution Sandbox | Container isolation | Containment |
| Memory Limits | Per-tenant quotas | Resource control |
| Action Logging | All tool calls | Audit |
| Timeout | Configurable per action | Runaway prevention |

### 4. Define Model Security Baselines

| Setting | Baseline | Rationale |
|---------|----------|-----------|
| Model Access | Authenticated only | IP protection |
| Model Storage | Encrypted | Model protection |
| Versioning | Immutable versions | Integrity |
| Inference | Rate limited | Extraction prevention |
| Fine-tuning | Isolated environments | Data protection |

**Soft Gate:** Present summary and ask for confirmation.

**Verify current best practices with web search:**
Search the web: "LLM security configuration {date}"
Search the web: "AI system hardening best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review LLM baselines
- **A2**: Analyze vector store baselines
- **A3**: Evaluate orchestrator baselines
- **A4**: Assess model baselines

### [P]ropose Changes
- **P1**: Propose LLM adjustments
- **P2**: Propose vector store changes
- **P3**: Suggest orchestrator improvements
- **P4**: Recommend model enhancements

### [C]ontinue
- **C1**: Accept AI baselines
- **C2**: Mark step complete and load `step-04-c-create-baseline-document.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] LLM baselines defined
- [ ] Vector store baselines configured
- [ ] Orchestrator baselines documented
- [ ] Model baselines specified
- [ ] Patterns align with pattern registry

## Outputs

- LLM gateway baseline
- Vector store baseline
- Agent orchestrator baseline
- Model security baseline

## Next Step

Proceed to `step-04-c-create-baseline-document.md`.
