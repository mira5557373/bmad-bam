# Step 2: Design Network Segmentation

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

Design microsegmentation strategy with software-defined perimeters and least-privilege network access.

## Prerequisites

- Identity architecture from Step 1
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Define Network Zones

| Zone | Services | Isolation | Access |
|------|----------|-----------|--------|
| Public | CDN, WAF, LB | DMZ | Internet |
| API | API Gateway | Protected | Authenticated |
| Application | Microservices | Segmented | Service mesh |
| Data | Databases, storage | Restricted | mTLS only |
| AI | LLM, vector stores | Isolated | Authorized services |
| Management | Admin tools | Air-gapped | VPN + MFA |

### 2. Implement Microsegmentation

| Technology | Use Case | Policy |
|------------|----------|--------|
| Service Mesh | Inter-service | mTLS + AuthZ |
| Network Policy | Pod isolation | Label-based |
| Security Groups | Cloud resources | Least privilege |
| Software-Defined | Dynamic policy | Identity-based |

### 3. Configure Service-to-Service Access

| Source | Destination | Protocol | Policy |
|--------|-------------|----------|--------|
| API Gateway | Services | HTTPS | JWT validation |
| Services | Database | PostgreSQL | mTLS + RLS |
| Orchestrator | LLM Gateway | HTTPS | Service identity |
| Services | Redis | Redis | mTLS |

**Verify current best practices with web search:**
Search the web: "microsegmentation zero trust {date}"
Search the web: "service mesh security patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review network zones
- **A2**: Analyze microsegmentation
- **A3**: Evaluate service access

### [P]ropose Changes
- **P1**: Propose zone adjustments
- **P2**: Propose segmentation changes
- **P3**: Suggest access improvements

### [C]ontinue
- **C1**: Accept network segmentation
- **C2**: Mark step complete and load `step-03-c-design-continuous-verification.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Network zones defined
- [ ] Microsegmentation configured
- [ ] Service access documented
- [ ] Patterns align with pattern registry

## Outputs

- Network zone architecture
- Microsegmentation configuration
- Service access matrix

## Next Step

Proceed to `step-03-c-design-continuous-verification.md`.
