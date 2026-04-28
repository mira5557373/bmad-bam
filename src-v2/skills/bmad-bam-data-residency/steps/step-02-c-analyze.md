# Step 2: Design Regional Data Storage

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

Design the regional data storage architecture including database deployment per region, storage bucket regional configuration, cache region affinity, and event routing by region.

---

## Prerequisites

- Step 1 completed with data residency requirements
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-storage
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Inputs

- Data residency requirements from Step 1
- Tenant model isolation document
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Target region definitions

---

## Actions

### 1. Database Deployment Per Region

Design regional database architecture:

| Region | Database Type | Instance Class | Multi-AZ | Read Replicas |
|--------|---------------|----------------|----------|---------------|
| US-EAST | PostgreSQL | {class} | Yes | 1 |
| EU-WEST | PostgreSQL | {class} | Yes | 1 |
| APAC-EAST | PostgreSQL | {class} | Yes | 1 |
| SA-EAST | PostgreSQL | {class} | Yes | 0 |

**Regional Database Routing:**

| Tenant Region | Primary DB | Failover DB | Connection Pool |
|---------------|------------|-------------|-----------------|
| US | US-EAST | US-WEST | us-primary-pool |
| EU | EU-WEST | EU-CENTRAL | eu-primary-pool |
| APAC | APAC-EAST | APAC-SOUTH | apac-primary-pool |
| SA | SA-EAST | US-EAST | sa-primary-pool |

### 2. Storage Bucket Regional Configuration

Configure object storage per region:

| Region | Bucket Name Pattern | Storage Class | Versioning | Lifecycle |
|--------|---------------------|---------------|------------|-----------|
| US-EAST | {project}-us-east-{purpose} | Standard | Enabled | 90-day archive |
| EU-WEST | {project}-eu-west-{purpose} | Standard | Enabled | 90-day archive |
| APAC-EAST | {project}-apac-east-{purpose} | Standard | Enabled | 90-day archive |
| SA-EAST | {project}-sa-east-{purpose} | Standard | Enabled | 90-day archive |

**Bucket Purpose Categories:**

| Purpose | Content Type | Residency Requirement |
|---------|--------------|----------------------|
| tenant-data | User uploads, documents | Strict regional |
| tenant-exports | Data exports, backups | Strict regional |
| ai-artifacts | Model outputs, embeddings | Regional preferred |
| system-logs | Audit logs, metrics | Regional + compliance archive |

### 3. Cache Region Affinity

Design regional caching strategy:

| Cache Layer | Scope | Regional Deployment | Failover Strategy |
|-------------|-------|---------------------|-------------------|
| Application Cache | Per-region | Redis per region | Local fallback |
| Session Cache | Per-region | Redis per region | Re-auth required |
| Query Cache | Per-region | Redis per region | Cache miss |
| Vector Cache | Per-region | Redis per region | Recompute embeddings |

**Cache Invalidation Across Regions:**

| Event Type | Invalidation Scope | Propagation |
|------------|-------------------|-------------|
| Tenant data update | Regional only | Immediate |
| Platform config | All regions | Event-driven |
| User session | Regional only | N/A |
| Feature flags | All regions | Event-driven |

### 4. Event Routing by Region

Design regional event architecture:

| Event Type | Regional Scope | Cross-Region Allowed | Transport |
|------------|----------------|----------------------|-----------|
| Tenant Events | Regional only | No | Regional Kafka |
| Platform Events | Global | Yes | Global Kafka |
| Audit Events | Regional + archive | Compliance copy only | Regional + archive |
| AI Events | Regional | No | Regional Kafka |

**Event Bus Configuration:**

| Region | Kafka Cluster | Topics Pattern | Retention |
|--------|---------------|----------------|-----------|
| US-EAST | kafka-us-east | {region}.{domain}.{event} | 7 days |
| EU-WEST | kafka-eu-west | {region}.{domain}.{event} | 7 days |
| APAC-EAST | kafka-apac-east | {region}.{domain}.{event} | 7 days |
| SA-EAST | kafka-sa-east | {region}.{domain}.{event} | 7 days |

**Verify current best practices with web search:**
Search the web: "multi-region database deployment patterns cloud {date}"
Search the web: "regional data storage architecture compliance {date}"
Search the web: "distributed cache regional affinity patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the regional storage analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into database sharding, cache strategy, or event routing
- **P (Party Mode)**: Bring data architect and compliance perspectives on regional storage
- **C (Continue)**: Accept regional storage design and proceed to cross-region handling
- **[Specific refinements]**: Describe regional storage concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: database deployment, storage configuration, cache strategy, event routing
- Process enhanced insights on regional architecture trade-offs
- Ask user: "Accept these refined regional storage decisions? (y/n)"
- If yes, integrate into design document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review regional data storage design for multi-tenant platform"
- Process data architect and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save regional storage design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## Verification

- [ ] Database deployment per region designed
- [ ] Storage bucket configuration defined
- [ ] Cache region affinity established
- [ ] Event routing by region documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Regional database deployment architecture
- Storage bucket regional configuration
- Cache region affinity design
- Event routing by region specification

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

Proceed to `step-03-c-design.md` to design cross-region handling.
