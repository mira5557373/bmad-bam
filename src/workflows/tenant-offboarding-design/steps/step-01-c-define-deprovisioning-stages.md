# Step 1: Define Deprovisioning Stages

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

Define the ordered stages of tenant deprovisioning with reversibility windows.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: event-driven`

---


## Inputs

- User requirements and constraints for tenant offboarding design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define the ordered stages of tenant deprovisioning:

| Stage | Name | Description | Reversibility Window |
|-------|------|-------------|----------------------|
| 1 | Offboarding Request | Validate deprovisioning request (admin authorization, billing clearance) | N/A |
| 2 | Status Transition | Transition tenant to SUSPENDED status, disable new logins | Immediate (reactivate) |
| 3 | Active Session Termination | Gracefully terminate all active user sessions | 24h (reactivation restores access) |
| 4 | Running Job Completion | Allow in-flight jobs to complete or timeout (max 1h) | Until completion |
| 5 | Data Export Preparation | Generate tenant data export package (GDPR compliance) | 30 days |
| 6 | Archive Creation | Create archival snapshot of tenant data | 30 days |
| 7 | Soft Delete | Mark tenant as ARCHIVED, retain data per policy | Retention period |
| 8 | Hard Delete | Permanently delete all tenant data | Irreversible |
| 9 | Resource Cleanup | Remove all infrastructure resources | Irreversible |

---

## Stage Timing Policies

```yaml
deprovisioning_timing:
  suspension_to_archive: 7_days  # Grace period for reactivation
  archive_retention:
    FREE: 30_days
    PRO: 90_days
    ENTERPRISE: 365_days  # Or custom per contract
  hard_delete_delay: 24_hours  # After retention expires
```

---

## Cancellation Points

| Before Stage | Cancellation Action |
|--------------|---------------------|
| Stage 6 | Full reactivation, restore all access |
| Stage 7 | Reactivation from archive (may take time) |
| Stage 8 | No cancellation possible |

For each stage, define:
- Authorization requirements (who can trigger)
- Notification recipients (tenant admin, billing, operations)
- Audit log entries required
- Checkpoint verification before proceeding

**Verify current best practices with web search:**
Search the web: "tenant deprovisioning tenant lifecycle {date}"
Search the web: "tenant offboarding stages multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the deprovisioning stages above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into stage timing and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for stage review
- **C (Continue)**: Accept deprovisioning stages and proceed to data retention design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass stage context: stages, timing, cancellation points
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into deprovisioning stages
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review deprovisioning stages: {summary of stages and timing}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save deprovisioning stages to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-data-retention.md`

---

## Verification

- [ ] All deprovisioning stages defined
- [ ] Reversibility windows specified
- [ ] Timing policies configured
- [ ] Cancellation points documented
- [ ] Authorization requirements specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Deprovisioning stage definitions
- Timing policy configuration

---

## Next Step

Proceed to `step-02-c-design-data-retention.md` to define data retention policies.
