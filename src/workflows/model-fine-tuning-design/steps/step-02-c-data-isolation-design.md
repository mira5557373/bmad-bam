# Step 2: Data Isolation Design

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
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design data isolation mechanisms for fine-tuning datasets to ensure tenant data remains strictly separated and secure throughout the training pipeline.

---

## Prerequisites

- Requirements analysis complete (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Design Per-Tenant Data Storage

Define storage architecture for fine-tuning datasets:

| Component | Isolation Strategy | Encryption |
|-----------|-------------------|------------|
| Raw uploads | Tenant-prefixed S3 buckets | AES-256 at rest |
| Processed data | Tenant-scoped directories | AES-256 + tenant key |
| Training cache | Ephemeral per-job storage | In-memory encryption |
| Model artifacts | Tenant-namespaced registry | Encrypted artifacts |

### 2. Define Data Validation Pipeline

Establish validation stages:

| Stage | Purpose | Actions |
|-------|---------|---------|
| Schema validation | Format compliance | Validate JSONL/CSV structure |
| Content validation | Quality checks | Token count, duplicates, format |
| Security scan | Threat detection | Malware, injection attempts |
| PII detection | Privacy compliance | Flag/redact PII before training |
| Size validation | Quota enforcement | Reject if exceeds tier limits |

### 3. Design PII Detection and Handling

Configure PII handling:

| PII Type | Detection Method | Handling |
|----------|-----------------|----------|
| Names | NER model | Redact or pseudonymize |
| Emails | Regex + validation | Redact |
| Phone numbers | Regex patterns | Redact |
| Addresses | NER + geocoding | Pseudonymize |
| SSN/ID numbers | Regex patterns | Block upload |
| Custom PII | Tenant-defined rules | Configurable |

### 4. Prevent Cross-Tenant Contamination

Implement isolation guarantees:

- **Storage isolation:** Separate storage paths per tenant
- **Process isolation:** Dedicated training containers per job
- **Memory isolation:** No shared GPU memory across tenants
- **Network isolation:** Private subnets per training job
- **Audit trail:** Log all data access with tenant context

### 5. Define Data Retention Policies

Establish retention rules:

| Data Type | Retention | Deletion Trigger |
|-----------|-----------|------------------|
| Raw uploads | 90 days | User request or expiry |
| Processed data | Until model deletion | Model deletion |
| Training logs | 1 year | Auto-expire |
| Checkpoints | 30 days | Job completion + grace |
| Final models | Tenant lifecycle | Tenant offboarding |

**Verify current best practices with web search:**
Search the web: "ML training data isolation multi-tenant {date}"
Search the web: "PII detection machine learning datasets {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the data isolation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into PII handling or encryption strategies
- **P (Party Mode)**: Bring security and compliance perspectives on data isolation
- **C (Continue)**: Accept data isolation design and proceed to training config
- **[Specific refinements]**: Describe data isolation concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: storage isolation, PII handling, contamination prevention
- Process enhanced insights on data security
- Ask user: "Accept these refined data isolation decisions? (y/n)"
- If yes, integrate into data isolation specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review data isolation for fine-tuning pipeline in multi-tenant platform"
- Process security and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save data isolation design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-training-config-design.md`

---

## Verification

- [ ] Per-tenant storage architecture defined
- [ ] Data validation pipeline complete
- [ ] PII detection and handling configured
- [ ] Cross-tenant contamination prevention documented
- [ ] Data retention policies established
- [ ] Patterns align with pattern registry

---

## Outputs

- Data isolation architecture
- Validation pipeline specification
- PII handling configuration
- Retention policy documentation
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-model-template.md`

---

## Next Step

Proceed to `step-03-c-training-config-design.md` to configure training infrastructure.
