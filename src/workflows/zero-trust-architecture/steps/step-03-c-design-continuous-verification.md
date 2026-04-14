# Step 3: Design Continuous Verification

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

Design continuous verification mechanisms for all access requests including context-aware authentication and behavioral analysis.

## Prerequisites

- Identity architecture from Step 1
- Network segmentation from Step 2
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Define Verification Points

| Checkpoint | Verification | Frequency |
|------------|--------------|-----------|
| Initial Auth | Identity + MFA | Per session |
| API Request | Token validity | Per request |
| Service Call | mTLS + JWT | Per call |
| Data Access | Authorization | Per query |
| AI Action | Permission check | Per action |

### 2. Implement Context-Aware Access

| Context Signal | Weight | Action |
|----------------|--------|--------|
| Device trust | High | Block untrusted |
| Location | Medium | Step-up auth |
| Time of access | Low | Audit |
| Behavior anomaly | High | Challenge |
| Risk score | High | Adaptive |

### 3. Configure Behavioral Analysis

| Behavior | Detection | Response |
|----------|-----------|----------|
| Unusual login | Geo-velocity | Step-up MFA |
| Access pattern | Frequency analysis | Alert |
| Data exfiltration | Volume monitoring | Block |
| Privilege abuse | Permission analysis | Revoke |

**Soft Gate:** Present summary and ask for confirmation.

**Verify current best practices with web search:**
Search the web: "continuous verification zero trust {date}"
Search the web: "context-aware access control {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review verification points
- **A2**: Analyze context signals
- **A3**: Evaluate behavioral analysis

### [P]ropose Changes
- **P1**: Propose verification additions
- **P2**: Propose context improvements
- **P3**: Suggest behavioral enhancements

### [C]ontinue
- **C1**: Accept continuous verification
- **C2**: Mark step complete and load `step-04-c-create-zero-trust-design.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Verification points defined
- [ ] Context-aware access configured
- [ ] Behavioral analysis designed
- [ ] Patterns align with pattern registry

## Outputs

- Verification checkpoint matrix
- Context-aware access policy
- Behavioral analysis configuration

## Next Step

Proceed to `step-04-c-create-zero-trust-design.md`.
