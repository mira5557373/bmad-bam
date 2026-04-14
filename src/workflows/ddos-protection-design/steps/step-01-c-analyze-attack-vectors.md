# Step 1: Analyze Attack Vectors

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

Analyze potential DDoS attack vectors targeting the multi-tenant AI platform including volumetric, protocol, and application-layer attacks.

## Prerequisites

- Master architecture approved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Identify Volumetric Attack Vectors

| Attack Type | Target | Impact | Mitigation Layer |
|-------------|--------|--------|------------------|
| UDP Flood | Network | Bandwidth exhaustion | Edge/ISP |
| ICMP Flood | Network | Bandwidth exhaustion | Edge/ISP |
| DNS Amplification | Network | Bandwidth exhaustion | Edge/ISP |
| NTP Amplification | Network | Bandwidth exhaustion | Edge/ISP |

### 2. Identify Protocol Attack Vectors

| Attack Type | Target | Impact | Mitigation Layer |
|-------------|--------|--------|------------------|
| SYN Flood | Load balancer | Connection exhaustion | Edge |
| Slowloris | Web server | Connection exhaustion | WAF |
| HTTP Flood | Application | Resource exhaustion | WAF |
| SSL/TLS Attacks | TLS termination | CPU exhaustion | Edge |

### 3. Identify Application-Layer Attack Vectors

| Attack Type | Target | Impact | Mitigation Layer |
|-------------|--------|--------|------------------|
| HTTP Flood | API endpoints | Server exhaustion | WAF/App |
| API Abuse | Specific APIs | Resource exhaustion | Rate limit |
| Login Brute Force | Auth service | Auth exhaustion | App |
| Search/Query Abuse | Database | DB exhaustion | App |

### 4. Identify AI-Specific Attack Vectors

| Attack Type | Target | Impact | Mitigation Layer |
|-------------|--------|--------|------------------|
| Token Exhaustion | LLM Gateway | Cost explosion | Rate limit |
| Embedding Flood | Vector store | Storage exhaustion | Quota |
| Prompt Length | AI service | Memory exhaustion | Validation |
| Concurrent Requests | Orchestrator | Thread exhaustion | Throttle |

**Verify current best practices with web search:**
Search the web: "DDoS attack vectors {date}"
Search the web: "AI service denial of service attacks {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review volumetric attacks
- **A2**: Analyze protocol attacks
- **A3**: Evaluate application attacks
- **A4**: Assess AI-specific attacks

### [P]ropose Changes
- **P1**: Propose additional vectors
- **P2**: Propose impact adjustments
- **P3**: Suggest mitigation layers

### [C]ontinue
- **C1**: Accept attack vector analysis
- **C2**: Mark step complete and load `step-02-c-design-defense-layers.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Volumetric attacks identified
- [ ] Protocol attacks identified
- [ ] Application attacks identified
- [ ] AI-specific attacks identified
- [ ] Patterns align with pattern registry

## Outputs

- Attack vector inventory
- Impact assessment
- Mitigation layer mapping

## Next Step

Proceed to `step-02-c-design-defense-layers.md`.
