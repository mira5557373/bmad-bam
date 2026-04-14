# Step 1: Define Severity Levels

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Define incident severity levels with tenant-aware impact assessment criteria, response time SLAs, and escalation triggers.

---

## Prerequisites

- Master architecture document with tenant model
- Understanding of tenant tiers (FREE/PRO/ENTERPRISE)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability

---


## Inputs

- User requirements and constraints for tenant incident response
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Severity Classification

Establish severity levels with tenant impact context:

| Severity | Name | Tenant Impact | System Impact | Example |
|----------|------|---------------|---------------|---------|
| SEV-1 | Critical | All tenants affected | Platform down | Database failure |
| SEV-2 | High | Multiple tenants affected | Major feature down | Auth service down |
| SEV-3 | Medium | Single tenant affected | Feature degraded | Tenant API errors |
| SEV-4 | Low | Minimal impact | Minor issues | Slow response |

### 2. Define Tenant-Aware Impact Matrix

Map incident types to tenant impact:

| Incident Type | Single Tenant | Multiple Tenants | All Tenants |
|---------------|---------------|------------------|-------------|
| Data corruption | SEV-3 | SEV-2 | SEV-1 |
| Service outage | SEV-3 | SEV-2 | SEV-1 |
| Performance degradation | SEV-4 | SEV-3 | SEV-2 |
| Security breach | SEV-2 | SEV-1 | SEV-1 |
| AI agent failure | SEV-3 | SEV-2 | SEV-1 |

### 3. Define Response Time SLAs

Establish SLAs per severity and tenant tier:

| Severity | Acknowledge | First Update | Resolution Target |
|----------|-------------|--------------|-------------------|
| SEV-1 | 5 min | 15 min | 1 hour |
| SEV-2 | 15 min | 30 min | 4 hours |
| SEV-3 | 1 hour | 2 hours | 1 business day |
| SEV-4 | 4 hours | 8 hours | 3 business days |

**Tier-Based SLA Modifiers:**
| Tier | SLA Modifier | Priority Boost |
|------|-------------|----------------|
| ENTERPRISE | 0.5x (faster) | +1 severity |
| PRO | 1x (standard) | None |
| FREE | 1.5x (slower) | None |

### 4. Define Escalation Triggers

Document when to escalate severity:

| Trigger | Escalation |
|---------|------------|
| Resolution time exceeded | +1 severity |
| Additional tenants impacted | Re-evaluate severity |
| Data loss confirmed | Immediate SEV-1 |
| Security compromise confirmed | Immediate SEV-1 |
| Customer executive escalation | +1 severity |

**Verify current best practices with web search:**
Search the web: "define severity levels best practices {date}"
Search the web: "define severity levels enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the severity level definitions above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into severity classification nuances
- **P (Party Mode)**: Bring SRE and customer success perspectives on SLAs
- **C (Continue)**: Accept severity levels and proceed to isolation protocol
- **[Specific refinements]**: Describe severity concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: severity levels, impact matrix, SLA targets
- Process enhanced insights on incident classification
- Ask user: "Accept these refined severity definitions? (y/n)"
- If yes, integrate into severity specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review incident severity levels for multi-tenant platform"
- Process SRE and customer success perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save severity definitions to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-isolation-protocol.md`

---

## Verification

- [ ] All severity levels defined (SEV-1 through SEV-4)
- [ ] Tenant impact matrix documented
- [ ] SLAs defined per severity
- [ ] Tier-based modifiers documented
- [ ] Escalation triggers defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Severity level definitions
- Tenant impact matrix
- Response time SLAs
- Escalation trigger rules

---

## Next Step

Proceed to `step-02-c-design-isolation-protocol.md` to design tenant isolation during incidents.
