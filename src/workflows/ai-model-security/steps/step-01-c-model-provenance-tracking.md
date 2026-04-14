# Step 1: Model Provenance Tracking

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

Design a comprehensive model provenance tracking system to ensure trusted model origins and lineage.

## Prerequisites

- Agent runtime architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: model-versioning, model-deployment
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-safety, llmops

---

## Inputs

- User requirements and constraints for AI model security
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Design model provenance tracking system:

## Provenance Components

**Model Origin Verification:**
- Signed model artifacts (cryptographic signatures)
- Trusted model registries (HuggingFace, Replicate, internal)
- Certificate chain validation for model downloads
- Checksum verification on model load

**Version Lineage Tracking:**
- Model version ancestry graph
- Base model identification
- Merge/fork tracking for fine-tuned variants
- Model deprecation and sunset tracking

**Training Data Provenance:**
- Training dataset attestation
- Data source verification
- Synthetic data identification
- Bias and quality metrics per dataset

**Tenant Fine-Tuning History:**
- Per-tenant fine-tuning records
- Training hyperparameters logged
- Validation metrics captured
- Rollback capability per tenant

**Third-Party Model Auditing:**
- Vendor security assessments
- Model update notification pipeline
- Vulnerability scanning for model dependencies
- License compliance tracking

Output: Model provenance design document with verification workflows.

**Verify current best practices with web search:**
Search the web: "AI model provenance tracking best practices {date}"
Search the web: "ML model supply chain security patterns {date}"

_Source: [URL]_

## COLLABORATION MENUS (A/P/C):

After completing the provenance design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into provenance requirements and verification workflows
- **P (Party Mode)**: Bring Security Architect, MLOps Engineer, and Compliance Officer perspectives
- **C (Continue)**: Accept provenance design and proceed to Step 2: Model Integrity Verification
- **Refine provenance**: Describe specific provenance concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: provenance components, verification requirements, tenant isolation
- Process enhanced insights
- Ask user: "Accept these refined provenance requirements? (y/n)"
- If yes, integrate into provenance document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review model provenance tracking design for AI model supply chain security"
- Process Security Architect, MLOps Engineer, Compliance Officer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save provenance design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-model-integrity-verification.md`

---

## Verification

- [ ] Model origin verification defined
- [ ] Version lineage tracking specified
- [ ] Training data provenance documented
- [ ] Tenant fine-tuning history tracked
- [ ] Third-party model auditing planned
- [ ] Patterns align with pattern registry

## Outputs

- Model provenance design document
- Verification workflows
- **Load template:** `{project-root}/_bmad/bam/templates/model-provenance-template.md`

## Next Step

Proceed to `step-02-c-model-integrity-verification.md` to design integrity controls.
