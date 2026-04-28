# Step 3: Design Cross-Region Handling

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

## Purpose

Design cross-region handling including data replication restrictions, cross-region API routing, backup storage location policies, and disaster recovery strategies across regions.

---

## Prerequisites

- Step 2 completed with regional data storage design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: cross-region
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- Regional storage design from Step 2
- Compliance requirements from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Data Replication Restrictions

Define replication policies by data classification:

| Data Classification | Cross-Region Replication | Allowed Destinations | Compliance Basis |
|---------------------|--------------------------|----------------------|------------------|
| PII - EU Residents | Prohibited | EU regions only | GDPR Art. 44-49 |
| PII - BR Residents | Restricted | BR, approved countries | LGPD Art. 33 |
| PII - CN Residents | Prohibited | CN regions only | PIPL Art. 38-40 |
| PII - US Residents | Allowed | Any region | No federal restriction |
| Non-PII Metadata | Allowed | Any region | N/A |
| Aggregated Analytics | Allowed | Any region | Anonymized |
| AI Model Weights | Region-specific | Training region | IP protection |

**Replication Enforcement:**

| Enforcement Layer | Mechanism | Audit |
|-------------------|-----------|-------|
| Database | Replication filters | Yes |
| Storage | Bucket policies | Yes |
| Application | Data classification tags | Yes |
| Network | VPC peering restrictions | Yes |

### 2. Cross-Region API Routing

Design API routing for cross-region requests:

| Request Type | Routing Strategy | Latency Target | Failover |
|--------------|------------------|----------------|----------|
| Tenant API | Route to tenant region | < 100ms | Regional DR |
| Platform API | Nearest region | < 50ms | Global LB |
| AI Inference | Model region | < 500ms | Queue + retry |
| Admin API | Central region | N/A | Manual failover |

**API Gateway Configuration:**

| Region | Gateway | Routing Rules | Rate Limits |
|--------|---------|---------------|-------------|
| US-EAST | gw-us-east | tenant_region=US → local | Per-tenant |
| EU-WEST | gw-eu-west | tenant_region=EU → local | Per-tenant |
| APAC-EAST | gw-apac-east | tenant_region=APAC → local | Per-tenant |
| GLOBAL | gw-global | Platform APIs | Global |

**Cross-Region Request Handling:**

| Scenario | Action | Response |
|----------|--------|----------|
| Request to wrong region | Redirect to correct region | 307 Temporary Redirect |
| Region unavailable | Queue for retry | 503 with retry-after |
| Compliance violation | Block request | 403 Forbidden |
| Cross-region data request | Require explicit consent | 428 Precondition Required |

### 3. Backup Storage Location

Define backup storage policies by region:

| Region | Primary Backup | Secondary Backup | Retention | Encryption |
|--------|----------------|------------------|-----------|------------|
| US-EAST | US-EAST | US-WEST | 90 days | AES-256 |
| US-WEST | US-WEST | US-EAST | 90 days | AES-256 |
| EU-WEST | EU-WEST | EU-CENTRAL | 90 days | AES-256 |
| EU-CENTRAL | EU-CENTRAL | EU-WEST | 90 days | AES-256 |
| APAC-EAST | APAC-EAST | APAC-SOUTH | 90 days | AES-256 |
| SA-EAST | SA-EAST | SA-EAST | 90 days | AES-256 |

**Backup Classification:**

| Backup Type | Cross-Region Allowed | Compliance Notes |
|-------------|----------------------|------------------|
| Database | Same compliance zone only | RTO < 4 hours |
| File Storage | Same compliance zone only | RTO < 8 hours |
| Configuration | Global mirror allowed | Non-PII |
| Audit Logs | Same region + archive | Compliance retention |

### 4. Disaster Recovery Across Regions

Design DR strategy respecting residency:

| DR Scenario | Strategy | RTO | RPO | Residency Compliance |
|-------------|----------|-----|-----|----------------------|
| Single AZ failure | Multi-AZ failover | < 5 min | 0 | Maintained |
| Region failure | Same-zone DR | < 4 hours | < 1 hour | Maintained |
| Compliance zone failure | Manual intervention | TBD | < 24 hours | Requires approval |

**DR Runbook Components:**

| Component | Primary | DR Target | Failover Method |
|-----------|---------|-----------|-----------------|
| Database | Regional primary | Same-zone replica | Automated |
| Storage | Regional bucket | Same-zone bucket | Cross-region sync |
| Cache | Regional Redis | Cold start | Rebuild from DB |
| Event Bus | Regional Kafka | Same-zone Kafka | Topic mirroring |

**Compliance-Aware DR:**

| Compliance Zone | Allowed DR Regions | Approval Required |
|-----------------|-------------------|-------------------|
| EU | EU-WEST, EU-CENTRAL | No |
| US | US-EAST, US-WEST | No |
| APAC | APAC-EAST, APAC-SOUTH | No |
| BR | SA-EAST only | Yes for cross-zone |
| CN | CN regions only | Yes for any DR |

**Verify current best practices with web search:**
Search the web: "cross-region data replication compliance GDPR {date}"
Search the web: "multi-region disaster recovery SaaS architecture {date}"
Search the web: "API routing multi-region latency patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the cross-region handling analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into replication restrictions, DR strategy, or API routing
- **P (Party Mode)**: Bring security, compliance, and SRE perspectives on cross-region handling
- **C (Continue)**: Accept cross-region design and proceed to tenant region assignment
- **[Specific refinements]**: Describe cross-region concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: replication restrictions, API routing, backup policies, DR strategy
- Process enhanced insights on cross-region architecture trade-offs
- Ask user: "Accept these refined cross-region decisions? (y/n)"
- If yes, integrate into design document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review cross-region handling design for multi-tenant platform"
- Process security, compliance, and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save cross-region handling design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## Verification

- [ ] Data replication restrictions defined
- [ ] Cross-region API routing designed
- [ ] Backup storage location policies documented
- [ ] Disaster recovery across regions planned
- [ ] Patterns align with pattern registry

---

## Outputs

- Data replication restriction matrix
- Cross-region API routing configuration
- Backup storage location policies
- Disaster recovery strategy by compliance zone

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

Proceed to `step-04-c-document.md` to design tenant region assignment.
