# Step 5: Assembly

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

Assemble all feature rollout components into a complete design document.

---

## Prerequisites

- Steps 1-4 completed
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-lifecycle-template.md`

---

## Actions

### 1. Document Assembly

Compile sections from previous steps:

| Section | Source | Content |
|---------|--------|---------|
| Feature Flags | Step 1 | Flag system, evaluation |
| Rollout Strategy | Step 2 | Progressive deployment |
| Monitoring | Step 3 | Metrics, alerting |
| Rollback | Step 4 | Reversion procedures |

### 2. Cross-Reference Validation

Ensure consistency across sections:

| Check | Validation |
|-------|------------|
| Flag coverage | All rollout stages have flag definitions |
| Monitoring alignment | Metrics cover all rollout stages |
| Rollback triggers | Alert thresholds trigger rollback |
| Tier consistency | All tiers handled in all sections |

### 3. Tier-Based Access Control Summary

| Tier | Feature Access | Rollout Priority | Monitoring Level |
|------|----------------|------------------|------------------|
| Free | Core features only | Last | Basic |
| Pro | Standard features | Middle | Standard |
| Enterprise | All features | Early adopter | Enhanced |
| Dedicated | Custom | By agreement | Premium |

### 4. Implementation Roadmap

| Phase | Deliverable | Priority |
|-------|-------------|----------|
| Phase 1 | Feature flag infrastructure | P0 |
| Phase 2 | Tenant-aware evaluation | P0 |
| Phase 3 | Progressive rollout automation | P1 |
| Phase 4 | Self-service feature management | P2 |

### 5. Output Document Structure

```markdown
# Tenant Feature Rollout Design

## Overview
- Purpose and scope
- Tenant tier alignment

## Feature Flag System
- Flag types and lifecycle
- Tenant-aware evaluation
- Configuration management

## Progressive Rollout Strategy
- Canary deployment approach
- Percentage-based rollout
- Tier-based progression

## Tier-Based Access Control
- Feature entitlements
- Access control mechanisms
- Upsell integration

## Monitoring and Observability
- Success metrics
- Error tracking
- Tenant impact analysis

## Rollback Procedures
- Trigger conditions
- Rollback types
- State management

## Operational Runbook
- Standard procedures
- Emergency responses
- Communication templates
```

**Verify current best practices with web search:**
Search the web: "feature rollout design documentation best practices {date}"
Search the web: "feature flag architecture multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the assembly, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections for enhancement
- **P (Party Mode)**: Final review with product and engineering perspectives
- **C (Continue)**: Accept design and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save complete design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Output to: `{output_folder}/planning-artifacts/operations/tenant-feature-rollout.md`
- Create mode complete

---

## Verification

- [ ] All sections assembled
- [ ] Cross-references validated
- [ ] Tier access control summarized
- [ ] Implementation roadmap defined
- [ ] Output document generated
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete feature rollout design document
- **Output to:** `{output_folder}/planning-artifacts/operations/tenant-feature-rollout.md`

---

## Next Step

Create workflow complete. Tenant feature rollout design ready for validation using Validate mode (`step-20-v-*`).

---

## Create Mode Complete

Tenant feature rollout design is complete. The artifact is ready for validation or implementation.
