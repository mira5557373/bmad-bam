# Step 05: Complete Tenant Isolation Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT at QG-M2 checkpoint** - Do not proceed without explicit approval

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## CONTEXT BOUNDARIES

This step builds on all previous Create mode steps:

| Step | Deliverable | Required Input |
|------|-------------|----------------|
| Step 01 | Requirements gathered | Tenant model selection |
| Step 02 | Isolation patterns analyzed | 8-dimension matrix started |
| Step 03 | Context propagation designed | Tenant context flow |
| Step 04 | Sharing rules documented | Cross-tenant boundaries |

**All prior step outputs must be present before proceeding.**

---

## Purpose

Compile all isolation decisions into the final tenant-isolation.md artifact and present the QG-M2 soft gate checkpoint for review before workflow completion.

---

## Prerequisites

- Steps 01-04 completed successfully
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-isolation.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m2.md`

---

## YOUR TASK

Document the complete tenant isolation design by:

1. Loading the tenant-isolation template
2. Compiling the 8-dimension isolation matrix with all decisions from previous steps
3. Documenting the context propagation design
4. Documenting sharing rules and boundaries
5. Presenting the QG-M2 soft gate checkpoint
6. Saving the final artifact

---

## Actions

### 1. Load Tenant Isolation Template

Load the design template:
- `{project-root}/_bmad/bam/data/templates/tenant-isolation.md`

Prepare frontmatter with:

```yaml
tenant_model: {tenant_model}
version: 1.0.0
date: {current_date}
stepsCompleted: [1, 2, 3, 4]
```

### 2. Compile 8-Dimension Isolation Matrix

Aggregate decisions from Steps 02-04 into the complete matrix:

| Dimension | Strategy | Implementation | Verification |
|-----------|----------|----------------|--------------|
| **Data** | {tenant_model} | RLS policies / Schema isolation / DB routing | Query audit |
| **Cache** | Tenant-prefixed keys | `tenant:{id}:resource:{key}` pattern | Key inspection |
| **Storage** | Tenant-scoped paths | `/tenants/{id}/...` structure | Path validation |
| **Compute** | Resource quotas | Per-tenant limits | Usage metrics |
| **Network** | Namespace isolation | VPC/namespace boundaries | Network audit |
| **API** | Tenant context header | `X-Tenant-ID` propagation | Header validation |
| **Events** | Tenant-scoped topics | `tenant.{id}.event.type` | Event tracing |
| **Logs** | Tenant ID injection | Structured logging | Log filtering |

### 3. Document Context Propagation Design

Consolidate from Step 03:

```markdown
## Context Propagation

### Entry Points
- API Gateway: Extract tenant from JWT/header
- Event Consumer: Parse tenant from event envelope
- Background Jobs: Load tenant from job metadata

### Propagation Chain
Request → Gateway → Service → Repository → Database
         ↓ Tenant context set at gateway
         ↓ Context passed via thread-local/async context
         ↓ RLS session variable set before query

### Context Carriers
| Layer | Carrier | Format |
|-------|---------|--------|
| HTTP | Header | `X-Tenant-ID: {uuid}` |
| gRPC | Metadata | `tenant-id: {uuid}` |
| Async | Message envelope | `{ "tenantId": "{uuid}", "payload": {...} }` |
| Database | Session variable | `SET app.current_tenant = '{uuid}'` |
```

### 4. Document Sharing Rules

Consolidate from Step 04:

```markdown
## Sharing Rules and Boundaries

### Shared Resources (Cross-Tenant)
| Resource | Sharing Scope | Access Control |
|----------|---------------|----------------|
| Reference data | Read-only global | No tenant filter |
| Feature configs | Platform-wide | Admin only |
| System settings | All tenants | Immutable at runtime |

### Isolated Resources (Per-Tenant)
| Resource | Isolation Level | Enforcement |
|----------|-----------------|-------------|
| User data | Complete | RLS policy |
| Documents | Complete | Storage path |
| Cache entries | Complete | Key prefix |
| Audit logs | Complete | Tenant column |

### Cross-Tenant Boundaries
- [ ] No direct tenant-to-tenant data access
- [ ] Shared resources read-only
- [ ] Admin operations require explicit tenant scope
- [ ] Data export scoped to single tenant
```

### 5. QG-M2 Soft Gate Checkpoint

**🚦 HALT - Present checkpoint and await user decision:**

```
================================================================================
QG-M2 SOFT GATE CHECKPOINT: Tenant Isolation Review
================================================================================
TENANT MODEL: {tenant_model}
ISOLATION: 8-dimension matrix complete
PROPAGATION: Context flow designed
SHARING: Rules documented
================================================================================

CRITICAL CHECKS:
- [ ] RLS policies on all tenant tables
- [ ] Tenant context propagation verified
- [ ] No cross-tenant data access possible
- [ ] Cache keys include tenant prefix

STANDARD CHECKS:
- [ ] Storage paths include tenant segment
- [ ] Tenant ID in all request logs
- [ ] Backup strategy includes tenant isolation
- [ ] Tenant deletion process documented
- [ ] Data export scoped to tenant
- [ ] Tenant quota enforcement in place

================================================================================
[A] Approve - Accept isolation design and complete workflow
[E] Edit - Modify specific sections before completion
[V] Validate - Run full QG-M2 validation workflow
================================================================================

Select an option:
```

### 6. Save to Output Location

Upon approval, write final artifact:
- **Output to:** `{output_folder}/planning-artifacts/tenant-isolation.md`
- Update frontmatter: `stepsCompleted: [1, 2, 3, 4, 5]`
- Set status: `QG-M2: PASS` or `QG-M2: CONDITIONAL`

**Verify current best practices with web search:**
Search the web: "tenant isolation design best practices multi-tenant SaaS {date}"
Search the web: "row level security patterns PostgreSQL {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

After presenting QG-M2 checkpoint, offer:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific isolation dimensions
- **P (Party Mode)**: Security and architect review of isolation design
- **C (Continue)**: Accept isolation design and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: 8-dimension matrix, propagation design, sharing rules
- Explore edge cases: multi-region, disaster recovery, tenant migration
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into isolation document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant isolation design: {tenant_model} with 8 dimensions"
- Process security and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete isolation design to output file
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Record QG-M2 outcome in document
- Output to: `{output_folder}/planning-artifacts/tenant-isolation.md`
- Create mode complete

---

## SUCCESS METRICS

- ✅ 8-dimension isolation matrix fully populated
- ✅ Context propagation chain documented end-to-end
- ✅ Sharing rules clearly defined with enforcement methods
- ✅ QG-M2 critical checks addressed
- ✅ Artifact saved to planning-artifacts
- ✅ Patterns align with pattern registry

---

## FAILURE MODES

- ❌ **Missing dimensions:** Return to Step 02 to complete matrix
- ❌ **Incomplete propagation:** Return to Step 03 to design context flow
- ❌ **Undefined sharing rules:** Return to Step 04 to document boundaries
- ❌ **QG-M2 critical failure:** Document gaps and enter recovery protocol
- ❌ **Template not found:** Verify BAM installation with `./scripts/verify-install.sh`

---

## Verification

- [ ] All 8 isolation dimensions documented
- [ ] Context propagation design complete
- [ ] Sharing rules and boundaries defined
- [ ] QG-M2 checkpoint presented
- [ ] User approval received
- [ ] Artifact written to output location
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete tenant isolation design document
- **Output to:** `{output_folder}/planning-artifacts/tenant-isolation.md`

---

## WORKFLOW COMPLETE

Create workflow complete. Tenant isolation design is ready for:

- **Validation:** Run `bmad-bam-tenant-isolation` Validate mode (step-20-v-*)
- **Next workflows:**
  - `bmad-bam-convergence` (QG-F1 validation) - Run QG-F1 validation
  - `bmad-bam-create-module-architecture` - Design individual modules
  - `bmad-bam-agent-runtime-architecture` - Design AI runtime (if applicable)

---

## Next Step

Proceed to validation if quality gate formal sign-off required, or continue to next planning workflow.
