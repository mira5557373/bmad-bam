# Step 2: Design Restore Procedures

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design recovery workflows for various restore scenarios.

---

## Prerequisites

- Step 1 completed (Backup strategy defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: disaster-recovery`

---

## Actions

### 1. Define Recovery Types

| Recovery Type | RTO | RPO | Scope | Use Case |
|---------------|-----|-----|-------|----------|
| Point-in-time | 1 hour | 5 min | Full tenant | Data corruption |
| Selective | 30 min | 15 min | Specific tables/objects | Accidental delete |
| Cross-region | 4 hours | 1 hour | Full tenant | Regional outage |
| Tenant clone | 2 hours | N/A | New tenant | Testing/staging |
| Table-level | 15 min | Last backup | Single table | Targeted recovery |

### 2. Restore Process Flow

| Phase | Actions | Validation |
|-------|---------|------------|
| 1. Initiation | Identify backup, verify integrity | Checksum validation |
| 2. Isolation | Create restore sandbox | Tenant boundary check |
| 3. Recovery | Execute restore operations | Progress monitoring |
| 4. Verification | Data integrity checks | Row count, checksums |
| 5. Cutover | Switch to restored data | User validation |
| 6. Cleanup | Remove temporary resources | Audit log |

### 3. Tenant Isolation During Restore

| Concern | Mitigation |
|---------|------------|
| Cross-tenant data leak | Restore to isolated namespace |
| Resource contention | Dedicated restore capacity |
| Access during restore | Maintenance mode option |
| Partial restore visibility | Transaction boundaries |

### 4. Self-Service vs Managed Recovery

| Tier | Self-Service Capabilities | Managed by Support |
|------|---------------------------|-------------------|
| FREE | None | All restores |
| PRO | File/object restore | Database restore |
| ENTERPRISE | Full self-service | Complex/custom |

**Soft Gate:** Steps 1-2 complete backup strategy and restore procedures. Present summary and ask for confirmation before proceeding to verification design.

**Verify current best practices with web search:**
Search the web: "tenant restore procedures multi-tenant SaaS {date}"
Search the web: "point-in-time recovery patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the restore procedures, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into RTO/RPO requirements and edge cases
- **P (Party Mode)**: Bring architect and operations perspectives for restore review
- **C (Continue)**: Accept restore procedures and proceed to verification design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save restore procedures to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-verification.md`

---

## Verification

- [ ] Recovery types defined with RTO/RPO
- [ ] Process flow documented
- [ ] Tenant isolation addressed
- [ ] Self-service capabilities defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Recovery type matrix
- Restore process flow
- Isolation procedures

---

## Next Step

Proceed to `step-03-c-design-verification.md` to design backup validation.
