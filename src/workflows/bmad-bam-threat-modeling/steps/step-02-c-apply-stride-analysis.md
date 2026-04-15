# Step 2: Apply STRIDE Analysis

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

Apply STRIDE methodology to systematically identify threats across all attack surface components for the multi-tenant AI platform.

## Prerequisites

- Attack surface defined in Step 1
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security


---

## Inputs

- Attack surface from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Analyze Spoofing Threats

| Component | Threat | Likelihood | Impact | Risk |
|-----------|--------|------------|--------|------|
| API Gateway | Forged API keys | Medium | High | High |
| Auth Service | Token forgery | Low | Critical | Medium |
| Tenant Service | Tenant ID spoofing | Medium | Critical | High |
| AI Orchestrator | Agent impersonation | Medium | High | High |
| LLM Gateway | Model identity spoof | Low | High | Medium |

### 2. Analyze Tampering Threats

| Component | Threat | Likelihood | Impact | Risk |
|-----------|--------|------------|--------|------|
| API Gateway | Request modification | Low | Medium | Low |
| Database | Data manipulation | Low | Critical | Medium |
| AI Orchestrator | Prompt tampering | High | High | High |
| Vector Store | Embedding poisoning | Medium | High | High |
| Model Output | Response manipulation | Medium | Medium | Medium |

### 3. Analyze Repudiation Threats

| Component | Threat | Likelihood | Impact | Risk |
|-----------|--------|------------|--------|------|
| API Gateway | Action denial | Medium | Medium | Medium |
| Auth Service | Login denial | Low | Low | Low |
| AI Orchestrator | AI action denial | Medium | High | High |
| Tenant Service | Transaction denial | Medium | High | High |

### 4. Analyze Information Disclosure

| Component | Threat | Likelihood | Impact | Risk |
|-----------|--------|------------|--------|------|
| API Gateway | Error leakage | Medium | Low | Low |
| Database | Cross-tenant leak | Low | Critical | Medium |
| AI Orchestrator | PII in prompts | High | High | High |
| LLM Gateway | Model weight leak | Low | Critical | Medium |
| Vector Store | Embedding extraction | Medium | High | High |

### 5. Analyze Denial of Service

| Component | Threat | Likelihood | Impact | Risk |
|-----------|--------|------------|--------|------|
| API Gateway | DDoS attack | High | High | High |
| Auth Service | Auth flood | Medium | High | High |
| AI Orchestrator | Token exhaustion | Medium | High | High |
| LLM Gateway | Model overload | Medium | High | High |

### 6. Analyze Elevation of Privilege

| Component | Threat | Likelihood | Impact | Risk |
|-----------|--------|------------|--------|------|
| Auth Service | Privilege escalation | Low | Critical | Medium |
| Tenant Service | Cross-tenant access | Medium | Critical | High |
| AI Orchestrator | Tool permission bypass | Medium | High | High |
| Admin Portal | Admin takeover | Low | Critical | Medium |

**Verify current best practices with web search:**
Search the web: "STRIDE threat modeling methodology {date}"
Search the web: "AI specific STRIDE threats {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Deep dive into spoofing threats
- **A2**: Analyze tampering attack vectors
- **A3**: Evaluate information disclosure risks
- **A4**: Assess elevation of privilege scenarios

### [P]ropose Changes
- **P1**: Propose additional threats
- **P2**: Propose risk rating adjustments
- **P3**: Suggest AI-specific threat additions
- **P4**: Recommend component coverage

### [C]ontinue
- **C1**: Accept STRIDE analysis and proceed to mitigations
- **C2**: Mark step complete and load `step-03-c-design-mitigations.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Spoofing threats analyzed
- [ ] Tampering threats analyzed
- [ ] Repudiation threats analyzed
- [ ] Information disclosure analyzed
- [ ] DoS threats analyzed
- [ ] Elevation of privilege analyzed
- [ ] Patterns align with pattern registry

## Outputs

- STRIDE threat matrix
- Risk-rated threat inventory
- AI-specific threat analysis

## Next Step

Proceed to `step-03-c-design-mitigations.md` to design mitigations.
