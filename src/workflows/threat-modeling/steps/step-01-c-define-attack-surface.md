# Step 1: Define Attack Surface

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

Define the attack surface for the multi-tenant AI platform including system components, data flows, external interfaces, trust boundaries, and AI-specific entry points.

## Prerequisites

- Master architecture approved or in progress
- Tenant tier model defined (Free/Pro/Enterprise)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation


---

## Inputs

- Master architecture document
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Identify System Components

Map all system components:

| Component | Type | Data Sensitivity | Exposure |
|-----------|------|------------------|----------|
| API Gateway | Entry point | Low | Internet |
| Auth Service | Security | Critical | Internal |
| Tenant Service | Core | High | Internal |
| AI Orchestrator | AI Runtime | High | Internal |
| LLM Gateway | AI Runtime | High | Internal |
| Vector Store | Data | High | Internal |
| Database | Data | Critical | Internal |

### 2. Map Data Flows

Document data flow paths:

| Flow | Source | Destination | Data Type | Classification |
|------|--------|-------------|-----------|----------------|
| User Input | Client | API Gateway | Request | Public |
| Auth Token | Auth | All Services | Credential | Secret |
| Tenant Data | API | Database | Business | Confidential |
| AI Prompt | Client | LLM Gateway | User Input | Confidential |
| Model Output | LLM | Client | AI Response | Varies |

### 3. Document AI-Specific Entry Points

AI attack vectors:

| Entry Point | Attack Type | Risk | Impact |
|-------------|-------------|------|--------|
| Prompt Input | Prompt Injection | High | Data exfiltration |
| RAG Query | RAG Poisoning | Medium | Misinformation |
| Model API | Model Extraction | High | IP theft |
| Training Data | Data Poisoning | Critical | Model compromise |
| Tool Calls | Tool Abuse | High | Unauthorized actions |

### 4. Identify Trust Boundaries

Define trust boundaries:

| Boundary | Inside | Outside | Controls |
|----------|--------|---------|----------|
| Internet | CDN, WAF | Public clients | TLS, DDoS protection |
| DMZ | API Gateway | Internet | Authentication |
| Application | Services | API Gateway | Authorization |
| Tenant | Tenant data | Other tenants | RLS, encryption |
| AI | Model | User input | Guardrails, filters |

**Verify current best practices with web search:**
Search the web: "attack surface analysis multi-tenant {date}"
Search the web: "AI system threat surface mapping {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Review component inventory
- **A2**: Analyze data flow security
- **A3**: Evaluate AI entry points
- **A4**: Assess trust boundary effectiveness

### [P]ropose Changes
- **P1**: Propose additional components
- **P2**: Propose data flow modifications
- **P3**: Suggest AI attack vector additions
- **P4**: Recommend trust boundary adjustments

### [C]ontinue
- **C1**: Accept current attack surface and proceed to STRIDE
- **C2**: Mark step complete and load `step-02-c-apply-stride-analysis.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] System components inventoried
- [ ] Data flows documented
- [ ] AI entry points identified
- [ ] Trust boundaries defined
- [ ] Patterns align with pattern registry

## Outputs

- Component inventory
- Data flow diagram
- AI attack surface map
- Trust boundary documentation

## Next Step

Proceed to `step-02-c-apply-stride-analysis.md` to apply STRIDE analysis.
