# AI Security Gate Checklist

**Gate ID:** QG-S4
**Phase:** 3-solutioning (Pre-Deployment)
**Dependencies:** QG-S3 (Security Baseline), QG-M3 (Agent Runtime)

---

## Purpose

Verify AI-specific security controls are properly implemented and tested before deployment. This gate ensures comprehensive protection against AI-specific threats including model theft, prompt injection, output manipulation, and agent safety failures.

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Model Security | CRITICAL | Minor access gaps documented | Model theft possible |
| Prompt Security | CRITICAL | Partial injection detection | Injection succeeds |
| Output Safety | CRITICAL | Filtering incomplete | PII/sensitive leakage |
| Agent Safety | CRITICAL | Kill switch >100ms | Kill switch fails |
| Data Security | Non-critical | <90% coverage | N/A |

---

## Model Security Checks

- [ ] **CRITICAL:** Model access control enforces tenant boundaries
- [ ] **CRITICAL:** Model theft prevention controls active
- [ ] **CRITICAL:** Model API authentication uses short-lived tokens
- [ ] **CRITICAL:** Model endpoints not publicly accessible
- [ ] Model versioning with immutable audit trail
- [ ] Model weights stored in encrypted, access-controlled storage
- [ ] Model serving infrastructure isolated per tenant tier
- [ ] Model download/export blocked for unauthorized users
- [ ] Fine-tuned model access restricted to owning tenant
- [ ] Model fingerprinting detection alerts on extraction attempts
- [ ] Rate limiting prevents model probing attacks
- [ ] Embedding extraction rate limited and monitored

## Prompt Security Checks

- [ ] **CRITICAL:** Prompt injection detection enabled
- [ ] **CRITICAL:** Input validation sanitizes all user prompts
- [ ] **CRITICAL:** System prompt protected from extraction attempts
- [ ] **CRITICAL:** Jailbreak resistance verified with adversarial tests
- [ ] Direct injection attack patterns detected and blocked
- [ ] Indirect injection via retrieved documents sanitized
- [ ] Prompt delimiter bypass attempts detected
- [ ] Nested instruction attacks blocked
- [ ] Multi-turn conversation manipulation detected
- [ ] Context window poisoning prevention active
- [ ] Unicode/encoding trick detection enabled
- [ ] Input length limits enforced per request type

## Output Safety Checks

- [ ] **CRITICAL:** Content filtering blocks harmful outputs
- [ ] **CRITICAL:** PII detection prevents sensitive data exposure
- [ ] **CRITICAL:** Output validation prevents injection into downstream systems
- [ ] Hallucination confidence scoring implemented
- [ ] Copyright/licensed content detection active
- [ ] Code output sandboxing prevents arbitrary execution
- [ ] Financial/legal advice disclaimers enforced
- [ ] Competitor information disclosure prevented
- [ ] Output format validation enforced per API contract
- [ ] Response size limits prevent resource exhaustion
- [ ] Citation and source attribution required for factual claims
- [ ] Sensitive business logic not exposed in explanations

## Agent Safety Checks

- [ ] **CRITICAL:** Tool permissions enforce least privilege
- [ ] **CRITICAL:** Guardrails prevent unauthorized actions
- [ ] **CRITICAL:** Kill switch enables emergency agent shutdown
- [ ] **CRITICAL:** Human-in-the-loop for high-risk operations
- [ ] Tool sandbox (E2B or equivalent) prevents escape
- [ ] Approval-required tools trigger human authorization
- [ ] Cost guardrails enforce budget limits per tenant
- [ ] Circuit breaker triggers on repeated failures
- [ ] Agent memory scoped to tenant context
- [ ] Tool execution timeout prevents runaway processes
- [ ] Agent collaboration limited to same-tenant agents
- [ ] Kill switch tested under load conditions
- [ ] Recovery from kill state requires human authorization

## Data Security Checks

- [ ] **CRITICAL:** Training data isolation prevents cross-tenant contamination
- [ ] **CRITICAL:** Tenant data handling follows data residency requirements
- [ ] Fine-tuning data segregated per tenant
- [ ] RAG retrieval respects tenant data boundaries
- [ ] Vector store access scoped to tenant embeddings
- [ ] Prompt logging excludes sensitive data (PII redacted)
- [ ] Model response logging sanitized
- [ ] Conversation history encrypted at rest
- [ ] Memory persistence (Mem0) respects tenant isolation
- [ ] Data retention policies enforced for AI interactions
- [ ] GDPR deletion requests remove AI-stored data
- [ ] Audit trail captures all data access patterns

---

## Multi-Tenant Considerations

- [ ] **CRITICAL:** Per-tenant guardrails configurable and enforced
- [ ] **CRITICAL:** Tenant-scoped models cannot access other tenant data
- [ ] Per-tenant prompt templates isolated
- [ ] Tenant-specific content filtering policies supported
- [ ] Cross-tenant agent communication blocked
- [ ] Per-tenant rate limits for AI operations
- [ ] Tenant tier-based model access (enterprise gets premium models)
- [ ] Per-tenant kill switch granularity
- [ ] Tenant-specific compliance requirements enforced (HIPAA, PCI)
- [ ] Tenant data never used for cross-tenant model improvement

---

## AI-Specific Threat Mitigations

### Adversarial Attack Prevention

- [ ] **CRITICAL:** Input anomaly detection identifies statistical deviations
- [ ] Suspicious pattern recognition (base64, unicode obfuscation)
- [ ] Homoglyph attack detection active
- [ ] Invisible character detection enabled
- [ ] Input source verification prevents forged context

### Model Supply Chain Security

- [ ] Model provenance verified (signed artifacts)
- [ ] Third-party model dependencies audited
- [ ] Model update process includes security review
- [ ] Rollback capability for compromised model versions

### AI-Specific Incident Response

- [ ] AI incident playbooks documented
- [ ] Model quarantine procedure tested
- [ ] Prompt attack escalation path defined
- [ ] Post-incident model forensics capability

---

## Required Templates

- `{project-root}/_bmad/bam/templates/ai-security-assessment-template.md` - AI/LLM security assessment
- `{project-root}/_bmad/bam/templates/ai-security-test-plan-template.md` - AI security test planning
- `{project-root}/_bmad/bam/templates/guardrail-config-template.md` - Guardrail configuration
- `{project-root}/_bmad/bam/templates/kill-switch-template.md` - Kill switch design
- `{project-root}/_bmad/bam/templates/tool-permissions-template.md` - Tool permission matrix

---

## Web Research Verification

- [ ] Search the web: "prompt injection prevention techniques {date}"
- [ ] Search the web: "LLM security best practices enterprise {date}"
- [ ] Search the web: "AI agent safety guardrails implementation {date}"
- [ ] Search the web: "model theft prevention techniques {date}"
- [ ] _Source: [URL]_ citations documented for all research findings

---

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Address identified AI security gaps (target: 1-3 days)
   - Review failed checks and categorize by attack vector
   - Run `bmad-bam-ai-agent-debug` workflow for safety violations
   - Execute adversarial prompt injection tests
   - Verify kill switch functionality in isolated environment
   - Re-run QG-S4 validation
   - **Lock passed categories**

2. **Attempt 2:** Deeper AI security investigation (target: 1 week)
   - Engage AI Runtime Architect (Nova) and Security team
   - Review tool permission matrix for unauthorized access
   - Audit agent memory for cross-tenant leakage potential
   - Update guardrail configurations based on findings
   - Test model access controls with penetration testing
   - Re-run validation
   - **Preserve locked categories**

3. **Mandatory Course Correction:**
   - Escalate to CISO, AI Ethics board, and project leadership
   - Document AI security blockers in ADR
   - Activate kill switch for problematic AI features
   - Reassess AI capabilities if safety repeatedly fails
   - Consider model rollback if security cannot be assured

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - AI runtime configuration
- `bmad-bam-ai-agent-debug` - Agent safety debugging
- `bmad-bam-validate-tool-contract` - Tool permission validation
- `tea-trace` - Formal agent safety verification

---

## Required Templates

| Template | Purpose | Location |
|----------|---------|----------|
| `agent-runtime-template.md` | AI agent runtime configuration | `{output_folder}/planning-artifacts/` |
| `guardrail-config-template.md` | Guardrail configuration | `{output_folder}/planning-artifacts/` |
| `kill-switch-template.md` | Kill switch procedures | `{output_folder}/operations/` |
| `tool-permissions-template.md` | Tool permission matrix | `{output_folder}/planning-artifacts/` |

---

## Gate Decision

| Outcome | Criteria |
|---------|----------|
| **PASS** | All CRITICAL checks pass, Data Security achieves 90%+ |
| **CONDITIONAL** | All CRITICAL checks pass, Data Security achieves 75%+ with documented remediation plan and 7-day deadline |
| **FAIL** | Any CRITICAL check fails |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, Data Security at threshold
**OWNER:** AI Runtime Architect + Security Architecture
**REVIEWERS:** CISO, AI Ethics Board, Platform Engineering
