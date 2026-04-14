# Step 4: Tenant-Aware Releases

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

Design tenant-specific release management including release rings, feature flag integration, tenant-scoped rollbacks, and release communication.

---

## Prerequisites

- Steps 1-3 completed with pipeline architecture, testing stages, and deployment strategies
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: devops
- **Web research (if available):** Search for tenant-aware release management patterns

---

## Inputs

- Pipeline architecture design from Step 1
- Testing stages design from Step 2
- Deployment strategies design from Step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Tenant Release Rings

Define ring-based rollout:

| Ring | Tenants | % of Base | Duration | Purpose |
|------|---------|-----------|----------|---------|
| Ring 0 | Internal | 0% | 24h | Dogfooding |
| Ring 1 | Beta partners | 1% | 48h | Early feedback |
| Ring 2 | Small tenants | 10% | 72h | Broader validation |
| Ring 3 | Medium tenants | 40% | 48h | Scale testing |
| Ring 4 | Enterprise | 49% | 24h | Full rollout |

### 2. Configure Feature Flag Integration

Define feature flag strategy:

| Flag Type | Scope | Persistence | Use Case |
|-----------|-------|-------------|----------|
| Release Flag | Global | Short-term | New feature rollout |
| Tenant Flag | Per-tenant | Permanent | Tier-gated features |
| Experiment Flag | Percentage | Medium-term | A/B testing |
| Kill Switch | Global | Instant | Emergency disable |
| Ops Flag | Per-environment | Session | Maintenance mode |

### 3. Design Tenant-Scoped Rollbacks

Define tenant-specific rollback:

| Scenario | Scope | Action | Impact |
|----------|-------|--------|--------|
| Single tenant issue | One tenant | Disable feature flag | No other impact |
| Ring failure | Ring tenants | Rollback ring | Ring stops progression |
| Critical bug | All tenants | Full rollback | Platform-wide |
| Data issue | Affected tenants | Restore + rollback | Data recovery needed |

### 4. Design Release Communication

Define communication strategy:

| Event | Audience | Channel | Timing |
|-------|----------|---------|--------|
| Planned release | All tenants | Email + In-app | 7 days before |
| Ring progression | Ring tenants | Email | 24h before |
| Breaking change | Affected tenants | Email + Call | 14 days before |
| Incident | Affected tenants | Status page + Email | Immediately |
| Post-mortem | All tenants | Blog + Email | Within 48h |

### 5. Configure Release Metrics

Define success criteria:

| Metric | Measurement | Threshold | Action on Failure |
|--------|-------------|-----------|-------------------|
| Error rate | Per-tenant errors | <0.1% | Pause rollout |
| Latency | p95 per-tenant | <200ms | Investigate |
| Adoption | Feature usage | >10% in 7 days | Product review |
| Support tickets | Related tickets | <5 per 1k tenants | Investigate |
| Satisfaction | NPS delta | No drop >5 | Pause + review |

**Verify current best practices with web search:**
Search the web: "tenant-aware release management multi-tenant {date}"
Search the web: "feature flag deployment strategies best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant-aware releases analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into release rings or feature flags
- **P (Party Mode)**: Bring product and customer success perspectives on releases
- **C (Continue)**: Accept tenant-aware releases design and complete Create mode
- **[Specific refinements]**: Describe tenant release concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: release rings, feature flags, rollbacks, communication
- Process enhanced insights on tenant release trade-offs
- Ask user: "Accept these refined tenant-aware release decisions? (y/n)"
- If yes, integrate into tenant-aware releases specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant-aware release management for multi-tenant AI platform"
- Process product and customer success perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant-aware releases design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final CI/CD pipeline architecture document
- Workflow Create mode complete

---

## Verification

- [ ] Tenant release rings designed
- [ ] Feature flag integration configured
- [ ] Tenant-scoped rollbacks documented
- [ ] Release communication planned
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant release ring specification
- Feature flag strategy
- Tenant-scoped rollback procedures
- Release communication plan
- **Output to:** `{output_folder}/planning-artifacts/architecture/cicd-pipeline-design.md`

---

## Next Step

Create mode complete. Proceed to validation or downstream workflows.
