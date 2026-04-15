# Step 6: Model Versioning Strategy

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

Define the versioning approach for fine-tuned models including semantic versioning, comparison capabilities, promotion workflows, and artifact immutability.

---

## Prerequisites

- Model registry design complete (Step 5)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-runtime

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Semantic Versioning Scheme

Establish versioning format:

```
{tenant_id}/{model_name}:{major}.{minor}.{patch}[-{stage}]

Examples:
- tenant-abc/customer-support:1.0.0
- tenant-abc/customer-support:1.1.0-beta
- tenant-abc/customer-support:2.0.0-rc1
```

Version increment rules:

| Change Type | Increment | Example |
|-------------|-----------|---------|
| Base model change | Major | 1.0.0 -> 2.0.0 |
| Training data update | Minor | 1.0.0 -> 1.1.0 |
| Hyperparameter tuning | Patch | 1.0.0 -> 1.0.1 |
| Pre-release stage | Stage suffix | 1.1.0-beta |

### 2. Design Version Comparison

Implement comparison capabilities:

| Comparison Type | Data Compared | Output |
|-----------------|---------------|--------|
| Metrics diff | Evaluation scores | Side-by-side metrics |
| Config diff | Hyperparameters | JSON diff |
| Dataset diff | Training data stats | Sample overlap, size |
| Performance diff | Latency, throughput | Benchmark results |

Comparison API:
```
GET /api/models/{model_id}/compare?v1=1.0.0&v2=1.1.0
```

### 3. Define Promotion Workflows

Establish promotion stages:

| Stage | Purpose | Requirements | Approval |
|-------|---------|--------------|----------|
| Development | Initial training | Job completion | Auto |
| Testing | Validation | Pass eval threshold | Auto |
| Staging | Pre-production | Pass staging tests | Manual (Pro+) |
| Production | Live traffic | Pass prod checklist | Manual |
| Deprecated | Sunset | Replacement ready | Manual |

Promotion workflow:
1. Model created in Development
2. Automated evaluation runs
3. Promotion request submitted
4. Approval workflow triggered (if required)
5. Model promoted to target stage
6. Serving infrastructure updated

### 4. Implement Artifact Immutability

Design immutability guarantees:

| Artifact | Immutability Rule | Enforcement |
|----------|-------------------|-------------|
| Model weights | Never modified | Write-once storage |
| Metadata (core) | Never modified | Database constraints |
| Metadata (mutable) | Append-only | Audit log |
| Training config | Never modified | Snapshot at creation |
| Evaluation results | Append-only | New records only |

Immutability exceptions:
- Status transitions (controlled state machine)
- Tags and descriptions (audited changes)
- Deprecation marking

### 5. Configure Version Retention

Define retention policies:

| Version Status | Retention | Cleanup Action |
|----------------|-----------|----------------|
| Production | Indefinite | N/A |
| Staging | 90 days | Archive |
| Testing | 30 days | Delete |
| Development | 14 days | Delete |
| Deprecated | 180 days | Archive then delete |

Retention overrides:
- Legal hold: prevent deletion
- Compliance: extended retention
- Tenant request: early deletion

**Verify current best practices with web search:**
Search the web: "ML model versioning best practices {date}"
Search the web: "semantic versioning machine learning models {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the versioning strategy above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into promotion workflows or immutability strategies
- **P (Party Mode)**: Bring ML ops and release engineering perspectives on versioning
- **C (Continue)**: Accept versioning strategy and proceed to rollback design
- **[Specific refinements]**: Describe versioning concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: versioning scheme, promotion workflows, immutability rules
- Process enhanced insights on versioning strategy
- Ask user: "Accept these refined versioning decisions? (y/n)"
- If yes, integrate into versioning specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review model versioning strategy for multi-tenant fine-tuning platform"
- Process ML ops and release engineering perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save versioning strategy to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Proceed to next step: `step-07-c-rollback-strategy.md`

---

## Verification

- [ ] Semantic versioning scheme defined
- [ ] Version comparison capabilities designed
- [ ] Promotion workflows documented
- [ ] Artifact immutability implemented
- [ ] Version retention policies configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Versioning scheme specification
- Comparison API design
- Promotion workflow documentation
- Immutability rules
- Retention policy configuration
- **Load template:** `{project-root}/_bmad/bam/data/templates/prompt-version-template.md`

---

## Next Step

Proceed to `step-07-c-rollback-strategy.md` to design rollback mechanisms.
