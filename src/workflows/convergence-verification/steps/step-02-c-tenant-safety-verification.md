# Step 2: Tenant Safety Verification

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

Verify that tenant isolation is maintained under all conditions, including concurrent load and edge cases. This step ensures that no data leakage can occur between tenants, that tenant context propagates correctly across all system boundaries, and that Row-Level Security (RLS) policies are consistently enforced.

## Prerequisites

- Cross-module integration verified (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-i2-tenant-safety.md`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "tenant isolation API integration patterns {date}"
Search the web: "multi-tenant safety contract design {date}"

_Source: [URL]_

1. **Run Tenant Isolation Tests Under Concurrent Load**
   - Execute multi-tenant load tests with simultaneous requests from different tenants
   - Simulate connection pool exhaustion scenarios
   - Test isolation during cache stampedes
   - Verify isolation under database failover conditions
   - Test behavior when tenant context middleware fails

2. **Verify Context Propagation Across All Boundaries**
   - Trace tenant context through HTTP request lifecycle
   - Verify context propagation through async job queues
   - Test context preservation across event handlers
   - Validate context in scheduled tasks and cron jobs
   - Confirm context in WebSocket connections
   - Check context propagation through external service calls

3. **Check for Data Leakage (Tenant A Data Visible to Tenant B)**
   - Run automated data leakage detection tests
   - Query all endpoints with mismatched tenant credentials
   - Verify API responses contain only authorized tenant data
   - Check that error messages don't leak cross-tenant information
   - Test aggregate queries and reports for data bleeding
   - Verify file storage isolation (S3 prefixes, blob paths)

4. **Verify RLS Policies Active on All Queries**
   - Audit all database queries for tenant_id filtering
   - Confirm RLS policies cannot be bypassed
   - Test direct database connections enforce RLS
   - Verify RLS in read replicas and analytics databases
   - Check RLS enforcement in database migrations and seeds

## Outputs

- Tenant isolation test report
- Context propagation verification matrix
- Data leakage scan results
- RLS policy audit document

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A]nalyze - Deep Dive Options
| Code | Action | Description |
|------|--------|-------------|
| A1 | Analyze isolation boundaries | Review tenant isolation implementation for QG-I2 |
| A2 | Analyze context propagation | Map tenant context flow across system boundaries |
| A3 | Analyze RLS policies | Audit row-level security policy coverage |
| A4 | Analyze leakage vectors | Identify potential cross-tenant data exposure paths |

### [P]roceed - Action Options
| Code | Action | Description |
|------|--------|-------------|
| P1 | Execute isolation tests | Run concurrent tenant isolation test suite |
| P2 | Execute leakage detection | Run automated data leakage scans |
| P3 | Execute RLS audit | Run RLS policy verification tests |
| P4 | Generate safety report | Create tenant safety verification report |

### [C]ontinue - Navigation Options
| Code | Action | Description |
|------|--------|-------------|
| C1 | Continue to Step 3 | Proceed to agent safety verification |
| C2 | Return to Step 1 | Go back to cross-module integration |
| C3 | Jump to validation | Skip to step-20-v-load-artifact.md |

**Convergence Gate Context:** This step validates QG-I2 (Tenant Safety). All isolation tests must pass with zero data leakage before proceeding to QG-I3 agent safety verification.

---

## Verification

- [ ] Zero data leakage detected across all test scenarios
- [ ] Tenant context verified at every system boundary
- [ ] RLS policies confirmed active on 100% of tenant tables
- [ ] Concurrent load tests show no isolation degradation
- [ ] All async operations preserve tenant context correctly
- [ ] Patterns align with pattern registry

## Incident Response: Data Leakage Detected

### CRITICAL: If cross-tenant data access is confirmed

**Immediate Actions (within 15 minutes):**
1. **HALT** all deployments and feature releases
2. Document the exact query/API that exposed data
3. Identify affected tenants (source and exposed)
4. Notify security team and incident commander

**Containment (within 1 hour):**
1. Disable the affected endpoint/feature via feature flag
2. If RLS bypass suspected, add emergency lockdown policy (refer to `rls-best-practices.md` for syntax)
3. Rotate any exposed API keys/tokens
4. Enable enhanced audit logging

**Load template:** `{project-root}/_bmad/bam/templates/rls-policy-doc-template.md` for emergency policy patterns

**Assessment:**
1. Query audit logs to determine exposure window
2. Identify all data types exposed
3. Document tenant IDs affected
4. Assess compliance impact (GDPR, SOC2, etc.)

**Recovery:**
1. Fix root cause (RLS policy, query, code)
2. Verify fix with isolation tests
3. Re-enable access incrementally
4. Prepare incident report

**Notification Requirements:**
| Exposure Level | Notify Within | Who to Notify |
|----------------|---------------|---------------|
| PII exposed | 24 hours | Legal, affected tenants, DPO |
| Non-PII business data | 48 hours | Affected tenants |
| Metadata only | 72 hours | Internal security team |

### Escalation Triggers
- Any confirmed cross-tenant data read: **CRITICAL**
- Any cross-tenant data write: **CRITICAL + immediate CEO notification**
- Suspected but unconfirmed: **HIGH - investigate within 4 hours**

## Next Step

Proceed to `step-03-c-agent-safety-verification.md` to verify AI agent safety.
