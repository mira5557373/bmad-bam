# Step 3: Tenant Namespacing

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

Design tenant namespacing and isolation for embeddings to ensure no cross-tenant data leakage during embedding generation, storage, or retrieval.

---

## Prerequisites

- Steps 1-2 completed
- Tenant model design loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation
- **Web research (if available):** Search for embedding tenant isolation patterns

---

## Inputs

- Model and dimension decisions from previous steps
- Tenant model design: `{output_folder}/planning-artifacts/tenant-model.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Embedding Request Isolation

| Stage | Isolation Mechanism | Verification |
|-------|---------------------|--------------|
| API Request | Tenant context injection | Auth token validation |
| Batch Queue | Tenant-partitioned queues | Queue name prefix |
| Processing | Isolated workers (optional) | Process isolation |
| Caching | Tenant-prefixed cache keys | Key structure |

### 2. Define Namespace Schema

Design embedding namespace structure:

| Component | Schema | Example |
|-----------|--------|---------|
| Vector ID | `{tenant_id}_{doc_id}_{chunk_id}` | `t123_d456_c1` |
| Metadata field | `tenant_id` (indexed) | `"tenant_id": "t123"` |
| Collection | Shared with filter | `embeddings` |
| Namespace | Provider-specific | `tenant_123` |

### 3. Implement Query Guardrails

Define mandatory query guards:

| Guard | Implementation | Failure Action |
|-------|----------------|----------------|
| Tenant context required | Middleware check | Reject request |
| Filter injection | Add tenant_id to all queries | Automatic |
| Result validation | Verify all results match tenant | Log alert |
| Cross-tenant detection | Audit query patterns | Alert + block |

### 4. Design Tenant-Specific Models

| Feature | Implementation | Tenant Scope |
|---------|----------------|--------------|
| Fine-tuned models | Separate model per tenant | Enterprise only |
| Custom vocabularies | Tenant-specific tokenization | Enterprise only |
| Domain adaptation | Tenant training data isolation | Enterprise only |

### 5. Document Isolation Guarantees

| Guarantee | Level | Verification Method |
|-----------|-------|---------------------|
| Embedding API isolation | Request-level | Token validation |
| Vector storage isolation | Namespace/filter | Automated tests |
| Cache isolation | Key prefix | Key structure audit |
| Model isolation | Optional | Model registry check |

**Verify current best practices with web search:**
Search the web: "embedding API multi-tenant isolation {date}"
Search the web: "vector namespace tenant isolation patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant namespacing analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into isolation guarantees and compliance
- **P (Party Mode)**: Bring security architect and compliance perspectives
- **C (Continue)**: Accept namespacing design and proceed to batch processing
- **[Specific refinements]**: Describe isolation concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: namespace schema, query guards, isolation levels
- Process enhanced insights on isolation strength
- Ask user: "Accept these refined isolation decisions? (y/n)"
- If yes, integrate into isolation specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review embedding tenant isolation for security and compliance"
- Process security architect and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant namespacing to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-batch-processing.md`

---

## Verification

- [ ] Request isolation designed
- [ ] Namespace schema defined
- [ ] Query guardrails implemented
- [ ] Tenant-specific model approach documented
- [ ] Isolation guarantees documented
- [ ] No cross-tenant data access possible
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant namespacing specification
- Query guard implementation plan
- Isolation guarantee documentation

---

## Next Step

Proceed to `step-04-c-batch-processing.md` to configure batch embedding.
