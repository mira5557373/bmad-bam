# Step 3: Design Tenant Fairness

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

Design tenant-fair resource allocation during DDoS attacks to prevent noisy neighbor problems and ensure SLA compliance.

## Prerequisites

- Attack vectors from Step 1
- Defense layers from Step 2
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Define Tenant Isolation During Attack

| Scenario | Detection | Action |
|----------|-----------|--------|
| Single tenant attacked | Traffic spike from tenant | Isolate tenant traffic |
| Platform attacked | Global spike | Fair share allocation |
| Noisy neighbor | One tenant affecting others | Throttle offending tenant |
| Targeted tenant | Attack on specific tenant | Dedicated scrubbing |

### 2. Configure Fair Share Allocation

| Tier | Normal Allocation | Under Attack |
|------|-------------------|--------------|
| Free | 10% | 5% |
| Pro | 30% | 20% |
| Enterprise | 60% | 50% |
| Reserved | N/A | Guaranteed |

### 3. Design Attack Response Procedures

| Phase | Actions | Owner |
|-------|---------|-------|
| Detection | Alert triggered, verify attack | SOC |
| Classification | Determine attack type, scope | Security |
| Mitigation | Enable protection, scale | DevOps |
| Communication | Notify affected tenants | Support |
| Recovery | Restore normal operation | DevOps |

**Soft Gate:** Present summary and ask for confirmation.

**Verify current best practices with web search:**
Search the web: "multi-tenant fair share DDoS {date}"
Search the web: "noisy neighbor isolation cloud {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review tenant isolation
- **A2**: Analyze fair share allocation
- **A3**: Evaluate response procedures

### [P]ropose Changes
- **P1**: Propose isolation improvements
- **P2**: Propose allocation adjustments
- **P3**: Suggest response modifications

### [C]ontinue
- **C1**: Accept tenant fairness design
- **C2**: Mark step complete and load `step-04-c-create-ddos-protection-plan.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Tenant isolation defined
- [ ] Fair share allocation configured
- [ ] Response procedures documented
- [ ] Patterns align with pattern registry

## Outputs

- Tenant isolation matrix
- Fair share allocation model
- Attack response procedures

## Next Step

Proceed to `step-04-c-create-ddos-protection-plan.md`.
