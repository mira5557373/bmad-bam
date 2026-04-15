# Step 2: Design Defense Layers

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

Design multi-layered DDoS defense strategy from edge to application.

## Prerequisites

- Attack vector analysis from Step 1
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Configure Edge Protection

| Component | Provider | Capability |
|-----------|----------|------------|
| CDN | Cloudflare/AWS | Volumetric absorption |
| DDoS Shield | Cloud provider | Network protection |
| Anycast | CDN | Traffic distribution |
| Scrubbing | Provider | Attack traffic filtering |

### 2. Configure WAF Rules

| Rule Category | Purpose | Action |
|---------------|---------|--------|
| Rate Limiting | Request throttling | Block/Challenge |
| Bot Management | Bot detection | Challenge/Block |
| Geo-blocking | Geographic restriction | Block |
| IP Reputation | Known bad actors | Block |
| Signature Rules | Known attacks | Block |

### 3. Configure Application Protection

| Protection | Implementation | Threshold |
|------------|----------------|-----------|
| API Rate Limit | Per tenant/endpoint | Tier-based |
| Request Throttling | Sliding window | Dynamic |
| Circuit Breaker | Service mesh | Error rate |
| Queue Management | Async processing | Queue depth |

### 4. Configure AI-Specific Protection

| Protection | Implementation | Threshold |
|------------|----------------|-----------|
| Token Rate Limit | Per tenant/hour | Tier quota |
| Request Size Limit | Payload validation | 4KB-100KB |
| Concurrent Limit | Connection pool | Tier-based |
| Cost Circuit Breaker | Spend monitoring | Budget limit |

**Verify current best practices with web search:**
Search the web: "multi-layer DDoS defense architecture {date}"
Search the web: "WAF configuration best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review edge protection
- **A2**: Analyze WAF rules
- **A3**: Evaluate application protection
- **A4**: Assess AI protection

### [P]ropose Changes
- **P1**: Propose edge improvements
- **P2**: Propose WAF adjustments
- **P3**: Suggest application changes
- **P4**: Recommend AI protection additions

### [C]ontinue
- **C1**: Accept defense layers
- **C2**: Mark step complete and load `step-03-c-design-tenant-fairness.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Edge protection configured
- [ ] WAF rules designed
- [ ] Application protection defined
- [ ] AI-specific protection configured
- [ ] Patterns align with pattern registry

## Outputs

- Edge protection configuration
- WAF rule set
- Application protection specification
- AI protection configuration

## Next Step

Proceed to `step-03-c-design-tenant-fairness.md`.
