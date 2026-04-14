# Step 1: Cost Categories

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions

---

## Purpose

Identify and categorize all cost components of the multi-tenant AI platform to establish the foundation for fair and accurate cost allocation.

---

## Prerequisites

- Master architecture document loaded
- Cloud billing data access
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations

---

## Actions

### 1. Define Infrastructure Cost Categories

Identify infrastructure costs:

| Category | Components | Billing Source | Attribution Method |
|----------|------------|----------------|-------------------|
| Compute | VMs, Kubernetes nodes | Cloud provider | Per-tenant metering |
| Storage | Block, object, database | Cloud provider | Direct measurement |
| Network | Egress, CDN, load balancers | Cloud provider | Per-tenant traffic |
| Database | RDS, managed DB | Cloud provider | Per-tenant usage |
| Cache | Redis, Memcached | Cloud provider | Shared allocation |
| Monitoring | Logging, metrics, traces | Vendor | Per-tenant volume |

### 2. Define AI/LLM Cost Categories

Identify AI-specific costs:

| Category | Components | Billing Source | Attribution Method |
|----------|------------|----------------|-------------------|
| LLM API | OpenAI, Anthropic, etc. | Provider invoices | Per-token metering |
| Embeddings | Vector generation | Provider invoices | Per-token metering |
| Vector DB | Pinecone, Weaviate | Vendor | Per-tenant storage |
| Model hosting | Self-hosted models | GPU compute | Time-based allocation |
| Fine-tuning | Model customization | GPU compute | Project-based |
| Inference | Model inference | GPU/API | Per-request metering |

### 3. Define Platform Cost Categories

Identify platform service costs:

| Category | Components | Billing Source | Attribution Method |
|----------|------------|----------------|-------------------|
| Authentication | Auth0, Okta | Vendor | Per-MAU |
| Email | SendGrid, SES | Vendor | Per-message |
| SMS/Voice | Twilio | Vendor | Per-message |
| Search | Elasticsearch, Algolia | Vendor | Per-query |
| Analytics | Segment, Mixpanel | Vendor | Per-event |
| Support | Zendesk, Intercom | Vendor | Per-ticket |

### 4. Define Operational Cost Categories

Identify operational costs:

| Category | Components | Billing Source | Attribution Method |
|----------|------------|----------------|-------------------|
| Engineering | Development time | Payroll | Indirect allocation |
| Support | Customer support | Payroll | Per-ticket allocation |
| Infrastructure team | SRE/DevOps | Payroll | Shared allocation |
| Security | Security tools, audits | Multiple | Shared allocation |
| Compliance | Audits, certifications | Multiple | Shared allocation |

### 5. Classify Cost Attribution Types

Categorize costs by attribution method:

| Attribution Type | Description | Examples |
|------------------|-------------|----------|
| Direct | 1:1 tenant attribution | LLM tokens, storage |
| Proportional | Based on usage proportion | Shared compute |
| Fixed allocation | Equal split | Platform base costs |
| Tiered | Based on tier/plan | Support SLA |
| Marginal | Incremental cost only | Burst capacity |

### 6. Define Cost Centers

Establish cost center structure:

| Cost Center | Description | Owner | Budget |
|-------------|-------------|-------|--------|
| CC-INFRA | Infrastructure | Engineering | Variable |
| CC-AI | AI/ML services | AI Team | Variable |
| CC-PLATFORM | Platform services | Platform | Variable |
| CC-OPS | Operations | Operations | Fixed |
| CC-SHARED | Shared services | Finance | Allocated |

**Verify current best practices with web search:**
Search the web: "multi-tenant SaaS cost allocation best practices {date}"
Search the web: "FinOps cost categorization {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the cost categorization above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific cost categories
- **P (Party Mode)**: Bring finance and engineering perspectives
- **C (Continue)**: Accept categories and proceed to allocation rules
- **[Specific refinements]**: Describe categorization concerns

Select an option:
```

#### If 'C' (Continue):
- Save cost categories to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-allocation-rules.md`

---

## Verification

- [ ] Infrastructure costs categorized
- [ ] AI/LLM costs categorized
- [ ] Platform costs categorized
- [ ] Operational costs categorized
- [ ] Attribution types classified
- [ ] Cost centers defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Infrastructure cost catalog
- AI/LLM cost catalog
- Platform cost catalog
- Operational cost catalog
- Attribution type classification
- Cost center structure
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-cost-attribution-template.md`

---

## Next Step

Proceed to `step-02-c-allocation-rules.md` to define allocation rules.
