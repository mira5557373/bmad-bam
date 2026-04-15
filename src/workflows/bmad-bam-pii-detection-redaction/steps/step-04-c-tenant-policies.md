# Step 4: Tenant Policies

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

Design tenant-configurable privacy policies including sensitivity thresholds, custom PII categories, retention/deletion rules, and compliance mapping.

---

## Prerequisites

- Steps 1-3 completed with PII taxonomy, detection methods, and redaction strategies
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-safety
- **Web research (if available):** Search for tenant-configurable privacy policy patterns

---

## Inputs

- PII taxonomy design from Step 1
- Detection methods design from Step 2
- Redaction strategies design from Step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Per-Tenant Sensitivity Configuration

Design tenant sensitivity controls:

| Setting | Default | Configurable | Constraints |
|---------|---------|--------------|-------------|
| Detection Threshold | 0.85 | Yes (0.7-0.99) | Cannot go below compliance minimum |
| Auto-Redaction | Enabled | Yes | Critical PII always redacted |
| ML Detection | Enabled | Yes (tier-gated) | Enterprise tier only |
| Context Awareness | Enabled | Yes | Performance impact warning |
| Audit Level | Full | Yes (Full/Summary/Minimal) | Compliance minimum enforced |

### 2. Configure Custom PII Categories

Design tenant custom categories:

| Feature | Description | Limits |
|---------|-------------|--------|
| Custom Patterns | Tenant-defined regex patterns | Max 50 per tenant |
| Custom Labels | Tenant-specific PII labels | Must map to standard category |
| Industry Templates | Pre-built category sets | Healthcare, Finance, Legal |
| Import/Export | Policy portability | JSON format, validated |

### 3. Define Retention and Deletion Rules

Design data lifecycle policies:

| Policy | Default | Tenant Override | Enforcement |
|--------|---------|-----------------|-------------|
| PII Retention | 30 days | Yes (7-365 days) | Automated purge |
| Token Retention | 90 days | Yes (30-365 days) | Vault cleanup |
| Audit Log Retention | 365 days | No | Compliance locked |
| Right to Deletion | 30 day SLA | Yes (7-30 days) | GDPR/CCPA compliance |
| Data Export | 30 day SLA | Yes (7-30 days) | Portability compliance |

### 4. Map Compliance Requirements

Define compliance framework mapping:

| Framework | Requirements | Auto-Applied |
|-----------|--------------|--------------|
| GDPR | Article 17 (erasure), 20 (portability) | EU tenant flag |
| CCPA/CPRA | Deletion, opt-out, disclosure | CA tenant flag |
| HIPAA | PHI handling, BAA required | Healthcare flag |
| SOC 2 | Audit trail, access controls | Enterprise tier |
| ISO 27001 | Information security controls | On request |

### 5. Design Policy Inheritance

Define policy precedence:

| Level | Override Capability | Example |
|-------|---------------------|---------|
| Platform | Cannot be overridden | Critical PII always protected |
| Compliance | Limited override | GDPR minimum standards |
| Tenant Admin | Full within bounds | Custom sensitivity |
| User Preference | Within tenant bounds | Personal data preferences |

**Verify current best practices with web search:**
Search the web: "multi-tenant privacy policy configuration {date}"
Search the web: "GDPR CCPA compliance automation best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant policies analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tenant configuration or compliance mapping
- **P (Party Mode)**: Bring compliance and product perspectives on tenant policies
- **C (Continue)**: Accept tenant policies design and complete Create mode
- **[Specific refinements]**: Describe tenant policy concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: sensitivity config, custom categories, retention, compliance
- Process enhanced insights on tenant policy trade-offs
- Ask user: "Accept these refined tenant policy decisions? (y/n)"
- If yes, integrate into tenant policies specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant privacy policies for multi-tenant AI platform compliance"
- Process compliance and product perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant policies design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final PII detection architecture document
- Workflow Create mode complete

---

## Verification

- [ ] Sensitivity configuration designed
- [ ] Custom PII categories defined
- [ ] Retention/deletion rules documented
- [ ] Compliance mapping complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant sensitivity configuration schema
- Custom category definition structure
- Retention policy specifications
- Compliance framework mapping
- **Output to:** `{output_folder}/planning-artifacts/architecture/pii-detection-design.md`

---

## Next Step

Create mode complete. Proceed to validation or downstream workflows.
