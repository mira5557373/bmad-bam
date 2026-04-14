# Step 4: Audit Logging

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

Design comprehensive audit logging for all model operations to support security monitoring and compliance.

## Prerequisites

- Access control design completed (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability, compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: audit-immutability

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design comprehensive model audit logging:

## Model Access Logging

**Access Events:**
- Model load events (who, when, from where)
- Inference requests (tenant, model, timestamp)
- Model download attempts (blocked, allowed)
- Permission check results

**Access Log Schema:**
| Field | Description | Required |
|-------|-------------|----------|
| event_id | Unique event identifier | Yes |
| timestamp | ISO 8601 timestamp | Yes |
| tenant_id | Requesting tenant | Yes |
| user_id | Requesting user/service | Yes |
| model_id | Target model | Yes |
| action | load/invoke/download | Yes |
| result | success/denied/error | Yes |
| source_ip | Request origin | Yes |
| correlation_id | Request trace ID | Yes |

## Model Update Audit Trail

**Tracked Changes:**
- Model version deployments
- Configuration changes
- Permission modifications
- Fine-tuning events
- Model deprecation/deletion

**Immutability:**
- Append-only audit log storage
- Cryptographic chaining (hash chain)
- Tamper detection alerts
- Retention per compliance requirements

## Tenant Model Usage Tracking

**Usage Metrics:**
- Inference count per model per tenant
- Token usage per model per tenant
- Latency percentiles per tenant
- Error rates per tenant

**Cost Attribution:**
- Model usage to billing events
- Per-tenant cost allocation
- Budget threshold alerts

## Anomaly Detection Alerts

**Detection Rules:**
- Unusual access patterns (time, volume, geography)
- Failed authentication spikes
- Model extraction indicators
- Cross-tenant access attempts
- Privilege escalation attempts

**Alert Configuration:**
| Severity | Response Time | Notification |
|----------|---------------|--------------|
| Critical | Immediate | PagerDuty + SMS |
| High | 15 minutes | Slack + Email |
| Medium | 1 hour | Email |
| Low | Daily digest | Dashboard |

## Soft Gate Checkpoint

**Steps 1-4 complete the model security design.**

Present summary of:
- Model provenance tracking system
- Integrity verification controls
- Access control framework
- Audit logging configuration

Ask for confirmation before completing the workflow.

Output: Audit logging configuration with anomaly detection rules.

**Verify current best practices with web search:**
Search the web: "AI model audit logging best practices {date}"
Search the web: "ML security monitoring anomaly detection {date}"

_Source: [URL]_

## COLLABORATION MENUS (A/P/C):

After completing the audit logging design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into audit requirements and retention policies
- **P (Party Mode)**: Bring SOC Analyst, Compliance Auditor, and Platform Engineer perspectives
- **C (Continue)**: Accept audit logging design and finalize model security document
- **Refine alerts**: Describe specific anomaly detection concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: access logging, audit trail, anomaly detection
- Process enhanced insights
- Ask user: "Accept these refined audit requirements? (y/n)"
- If yes, integrate into audit document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review model audit logging design for security monitoring and compliance"
- Process SOC Analyst, Compliance Auditor, Platform Engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete model security document to output location
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final `model-security.md` artifact
- Present quality gate validation summary

---

## Verification

- [ ] Model access logging defined
- [ ] Model update audit trail specified
- [ ] Tenant usage tracking documented
- [ ] Anomaly detection alerts configured
- [ ] Retention policies established
- [ ] Patterns align with pattern registry

## Outputs

- `{output_folder}/planning-artifacts/security/model-security.md`
- Audit logging configuration
- Anomaly detection rules
- **Load template:** `{project-root}/_bmad/bam/templates/ai-model-security-template.md`

## Workflow Complete

Model security design complete. Run `bmad-bam-ai-security-testing` to validate security controls.
