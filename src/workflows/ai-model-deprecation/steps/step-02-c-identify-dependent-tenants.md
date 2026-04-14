# Step 2: Identify Dependent Tenants

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOOP **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- WRITE Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- CLIP Reference pattern registry `web_queries` for search topics

---

## Purpose

Map all tenants with dependencies on the deprecated model, categorize dependency types, and assess migration complexity for each tenant to enable targeted communication and support.

---

## Prerequisites

- Step 01 (Assess Model Usage) completed
- Model usage inventory available
- Tenant configuration database access
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Actions

### 1. Query Tenant Model Configurations

Extract tenant-level model configurations:

| Tenant ID | Tenant Name | Tier | Primary Model | Fallback Model | Custom Config |
|-----------|-------------|------|---------------|----------------|---------------|
| {id} | {name} | {tier} | {model} | {fallback} | Yes/No |

Configuration elements to extract:
- Explicitly selected models
- Default model assignments
- Model routing rules
- Custom temperature/token settings

### 2. Categorize Dependency Types

Classify each tenant's dependency on the deprecated model:

| Dependency Type | Description | Migration Complexity | Tenant Count |
|-----------------|-------------|---------------------|--------------|
| **Hard Dependency** | Model explicitly configured, no fallback | High | {count} |
| **Soft Dependency** | Model is default, fallback available | Medium | {count} |
| **Implicit Dependency** | Using platform default | Low | {count} |
| **No Dependency** | Different model configured | None | {count} |

### 3. Assess Per-Tenant Migration Complexity

Evaluate migration effort for each dependent tenant:

| Tenant | Tier | Dependency Type | Custom Integrations | Fine-tuned Models | Complexity Score |
|--------|------|-----------------|---------------------|-------------------|-----------------|
| {name} | {tier} | {type} | {count} | Yes/No | 1-5 |

Complexity factors:
- Number of active agents using the model
- Custom prompt engineering investments
- API integration patterns
- Compliance/regulatory requirements
- SLA commitments

### 4. Identify High-Risk Tenants

Flag tenants requiring special attention:

| Tenant | Risk Level | Risk Factors | Mitigation Priority |
|--------|------------|--------------|---------------------|
| {name} | Critical | {factors} | Immediate |
| {name} | High | {factors} | High |
| {name} | Medium | {factors} | Standard |
| {name} | Low | {factors} | Standard |

Risk indicators:
- High request volume on deprecated model
- Custom fine-tuned models dependent on base model
- Contractual SLA requirements
- Enterprise tier with dedicated support
- Regulatory compliance dependencies

### 5. Map Tenant Communication Requirements

Define communication approach per tenant segment:

| Segment | Tenant Count | Communication Channel | Lead Time Required | Special Requirements |
|---------|--------------|----------------------|-------------------|---------------------|
| Enterprise | {count} | Dedicated CSM + Email | 90+ days | Executive briefing |
| Pro | {count} | Email + In-app | 60+ days | Migration guide |
| Free | {count} | In-app + Banner | 30+ days | Self-service docs |

### 6. Document Tenant Contact Information

Compile contact matrix for deprecation communication:

| Tenant | Primary Contact | Technical Contact | Communication Preference |
|--------|-----------------|-------------------|-------------------------|
| {name} | {contact} | {contact} | Email/Slack/Portal |

**Verify current best practices with web search:**
Search the web: "tenant impact assessment model deprecation SaaS {date}"
Search the web: "multi-tenant migration complexity scoring {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into tenant dependencies
- **[P] Party Mode**: Collaborative tenant analysis
- **[C] Continue**: Proceed to replacement model evaluation

### Menu Options

### [A]nalyze Options
- **A1**: Deep analysis of high-risk tenant configurations
- **A2**: Review tenant SLA commitments affecting migration
- **A3**: Analyze custom integration patterns
- **A4**: Evaluate fine-tuned model dependencies

### [P]ropose Changes
- **P1**: Propose tenant segmentation improvements
- **P2**: Suggest risk scoring adjustments
- **P3**: Recommend communication strategy refinements
- **P4**: Identify tenant grouping for batch migration

### [C]ontinue
- **C1**: Accept tenant dependency analysis and proceed
- **C2**: Mark step complete and load `03-evaluate-replacement-models.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All tenant model configurations extracted
- [ ] Dependency types categorized for all tenants
- [ ] Migration complexity assessed per tenant
- [ ] High-risk tenants identified and flagged
- [ ] Communication requirements mapped
- [ ] Contact information compiled

---

## Outputs

- Tenant dependency matrix
- Dependency type categorization
- Per-tenant complexity scores
- High-risk tenant registry
- Communication requirements by segment
- Tenant contact directory

---

## Next Step

Proceed to `step-03-c-evaluate-replacement-models.md` to identify migration target models.
