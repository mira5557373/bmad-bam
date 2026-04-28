# Step 4: Design Tenant Region Assignment

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Gathering required inputs for this step
- Making design decisions within step scope
- Documenting decisions with rationale

**OUT OF SCOPE:**
- Decisions from other steps
- Implementation details
- Validation (separate mode)
## Purpose

Design tenant region assignment including region selection at onboarding, region migration workflows, compliance verification per region, and edge location configuration.

---

## Prerequisites

- Step 3 completed with cross-region handling design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-onboarding
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- Cross-region handling design from Step 3
- Compliance requirements from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Region Selection at Onboarding

Design region selection workflow:

| Onboarding Step | Action | Input Required | Default |
|-----------------|--------|----------------|---------|
| 1. Country Selection | User selects country | Required | IP geolocation |
| 2. Region Recommendation | System recommends region | Auto | Nearest compliant |
| 3. Region Override | User can override (if allowed) | Optional | Recommended |
| 4. Compliance Check | Verify region compliance | Auto | Block if invalid |
| 5. Region Lock | Lock region assignment | Auto | Immutable |

**Region Selection Rules:**

| User Country | Compliance Zone | Recommended Region | Override Allowed |
|--------------|-----------------|-------------------|------------------|
| EU/EEA countries | EU | EU-WEST | EU regions only |
| UK | EU or UK | EU-WEST | EU regions only |
| USA | US | US-EAST | Any US region |
| Brazil | BR | SA-EAST | SA-EAST only |
| China | CN | CN-NORTH | CN regions only |
| Japan | APAC | APAC-EAST | Any APAC region |
| Other APAC | APAC | APAC-EAST | Any APAC region |
| Other | Global | Nearest | Any region |

**Tenant Region Record:**

| Field | Description | Immutable |
|-------|-------------|-----------|
| tenant_id | Tenant identifier | Yes |
| primary_region | Primary data region | No (migration) |
| compliance_zone | Compliance classification | Yes |
| country_code | User-declared country | No (with re-verification) |
| region_locked_at | Timestamp of region lock | Yes |
| migration_history | Array of migration events | Append-only |

### 2. Region Migration Workflow

Design controlled migration process:

| Migration Phase | Duration | Downtime | Rollback |
|-----------------|----------|----------|----------|
| 1. Pre-migration assessment | 1-2 days | None | N/A |
| 2. Compliance verification | 1 day | None | N/A |
| 3. Data sync preparation | 2-4 hours | None | Cancel |
| 4. Cutover window | 1-4 hours | Yes | Restore from backup |
| 5. Validation | 1-2 hours | Read-only | Full rollback |
| 6. Completion | Immediate | None | N/A |

**Migration Eligibility:**

| From Zone | To Zone | Allowed | Approval Required |
|-----------|---------|---------|-------------------|
| US → US | Yes | No |
| EU → EU | Yes | No |
| APAC → APAC | Yes | No |
| US → EU | Yes | DPO approval |
| EU → US | Restricted | DPO + legal |
| Any → CN | Prohibited | N/A |
| CN → Any | Prohibited | N/A |

**Migration Checklist:**

| Check | Verification | Blocking |
|-------|--------------|----------|
| Compliance zone compatibility | Auto | Yes |
| Active subscriptions | Manual | Yes |
| Pending data exports | Auto | Yes |
| AI model regional availability | Auto | Yes |
| Tenant admin approval | Manual | Yes |
| Platform admin approval | Manual | If cross-zone |

### 3. Compliance Verification Per Region

Design continuous compliance verification:

| Verification Type | Frequency | Scope | Action on Failure |
|-------------------|-----------|-------|-------------------|
| Region assignment | On change | Tenant | Block change |
| Data location | Daily | All tenants | Alert + audit |
| Cross-region access | Real-time | API calls | Block + log |
| Backup location | Weekly | Backups | Remediate |
| AI inference location | Real-time | Model calls | Route correction |

**Compliance Audit Trail:**

| Event | Logged Data | Retention |
|-------|-------------|-----------|
| Region assignment | tenant_id, region, timestamp, actor | 7 years |
| Migration request | from_region, to_region, reason, approvals | 7 years |
| Cross-region access | request_id, source_region, target_region, allowed | 7 years |
| Compliance violation | violation_type, severity, remediation | 7 years |

**Compliance Dashboard Metrics:**

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Tenants per region | Distribution of tenants | N/A |
| Cross-region requests | Count of cross-region API calls | > 1% of traffic |
| Compliance violations | Count of blocked requests | Any |
| Migration in progress | Active migrations | > 5 concurrent |

### 4. Edge Location Configuration

Design edge location strategy:

| Edge Purpose | Deployment | Data Cached | TTL |
|--------------|------------|-------------|-----|
| Static assets | Global CDN | JS, CSS, images | 1 day |
| API responses | Regional | Non-PII responses | 5 min |
| User sessions | Regional | Session tokens | Session duration |
| AI inference | Regional | Model artifacts | 1 hour |

**Edge-to-Origin Routing:**

| Request Type | Edge Handling | Origin Region |
|--------------|---------------|---------------|
| Static content | Serve from edge | N/A |
| Tenant API | Route to tenant region | tenant.primary_region |
| Platform API | Nearest origin | Nearest healthy |
| Authenticated | Validate at edge | Tenant region |

**Edge Security Configuration:**

| Security Layer | Implementation | Regional |
|----------------|----------------|----------|
| WAF | CloudFront/Cloudflare | Global rules |
| DDoS protection | Provider-managed | Global |
| TLS termination | Edge | Regional certs |
| Bot detection | Edge | Global rules |
| Rate limiting | Edge | Per-tenant |

**Verify current best practices with web search:**
Search the web: "tenant region assignment SaaS onboarding best practices {date}"
Search the web: "data migration workflow multi-tenant compliance {date}"
Search the web: "edge computing data residency patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant region assignment analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into onboarding flow, migration workflow, or edge configuration
- **P (Party Mode)**: Bring product, compliance, and DevOps perspectives on region assignment
- **C (Continue)**: Accept tenant region assignment design and proceed to compile final document
- **[Specific refinements]**: Describe region assignment concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: region selection, migration workflow, compliance verification, edge config
- Process enhanced insights on tenant experience and compliance trade-offs
- Ask user: "Accept these refined region assignment decisions? (y/n)"
- If yes, integrate into design document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant region assignment design for multi-tenant platform"
- Process product, compliance, and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant region assignment design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## Verification

- [ ] Region selection at onboarding designed
- [ ] Region migration workflow documented
- [ ] Compliance verification per region defined
- [ ] Edge location configuration specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Region selection workflow specification
- Region migration workflow documentation
- Compliance verification framework
- Edge location configuration

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-05-c-complete.md` to compile the data residency design document.
