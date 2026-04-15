---
name: pii-detection-redaction
displayName: PII Detection & Redaction
description: Design PII detection and redaction pipeline for AI contexts. Use when the user requests to 'implement PII detection' or 'design data redaction'.
module: bam
tags: [ai-safety, privacy, compliance]
---

# PII Detection & Redaction

## Overview

This workflow defines the personally identifiable information (PII) detection and redaction pipeline for multi-tenant AI platforms. It produces the privacy protection architecture that governs all data handling in AI contexts. Run after agent-runtime-architecture, before production deployment.

Act as a Privacy Engineer specializing in PII detection, data protection, and compliance for multi-tenant AI platforms.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Implementing PII detection for AI inputs/outputs
- Designing data redaction pipelines
- Establishing privacy compliance for multi-tenant AI
- Configuring per-tenant privacy policies

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new PII detection architecture | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing PII detection design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against privacy criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: PII Taxonomy

Define the PII classification taxonomy:
- PII categories and sensitivity levels
- Jurisdiction-specific PII definitions
- Context-aware classification rules
- Cross-tenant PII boundaries

### Step 2: Detection Methods

Design PII detection mechanisms:
- Pattern-based detection (regex, NER)
- ML-based classification
- Context-aware detection
- Multi-language support

### Step 3: Redaction Strategies

Design redaction and anonymization approaches:
- Redaction methods (masking, tokenization, encryption)
- Reversible vs irreversible anonymization
- Audit trail requirements
- Performance optimization

### Step 4: Tenant Policies

Design tenant-configurable privacy policies:
- Per-tenant sensitivity thresholds
- Custom PII categories
- Retention and deletion rules
- Compliance mapping

### Quality Gates

- [ ] PII taxonomy defined with sensitivity levels
- [ ] Detection methods documented
- [ ] Redaction strategies specified
- [ ] Tenant policies designed
- [ ] Compliance requirements addressed

## Quality Gates

This workflow contributes to:
- **QG-S3** (Security Baseline) - Validates data protection fundamentals
- **QG-I3** (Agent Safety) - Provides foundation for AI data handling

### Entry Gate
- QG-F1 (Foundation) must pass before starting
- Agent runtime architecture must be complete

### Exit Gate
- QG-S3 checklist items verified
- PII detection architecture documented
- Compliance mapping complete

## Output

- `{output_folder}/planning-artifacts/architecture/pii-detection-design.md`
- `{output_folder}/planning-artifacts/architecture/privacy-policy-schema.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/pii-detection-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
