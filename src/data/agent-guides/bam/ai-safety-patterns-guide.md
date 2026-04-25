# BAM AI Safety Patterns Guide

**When to load:** During Phase 3-4 (Solutioning/Implementation) when designing AI safety measures, prompt security, fairness, or human oversight. Load when user mentions AI safety, prompt injection, red teaming, AI fairness, transparency, human-in-the-loop.

**Integrates with:** Architect (Nova persona), Security agents, Dev agent

---

## Core Concepts

### AI Safety Dimensions

AI safety in multi-tenant SaaS encompasses five interconnected dimensions that must work together to protect tenants, users, and the platform.

| Dimension | Description | Multi-Tenant Impact |
|-----------|-------------|---------------------|
| Prompt Security | Protection against injection attacks and manipulation | Cross-tenant data exposure |
| Red Teaming | Adversarial testing to find vulnerabilities | Platform-wide security validation |
| Fairness | Bias detection and mitigation | Tenant-specific population impacts |
| Human Oversight | Human-in-the-loop controls | Per-tenant approval workflows |
| Transparency | Explainability and disclosure | Configurable per tenant tier |

### Multi-Tenant Safety Considerations

| Concern | Risk Level | Mitigation |
|---------|------------|------------|
| Cross-tenant data leakage | Critical | Tenant-scoped contexts, RLS on AI outputs |
| Shared model contamination | High | Isolated fine-tuning, tenant-keyed caching |
| Noisy neighbor attacks | Medium | Resource quotas, rate limiting per tenant |
| Compliance variations | Medium | Jurisdiction-aware configuration |
| Bias amplification | High | Per-tenant fairness monitoring |

### Defense-in-Depth Architecture

```
Layer 1: Input Validation
    │
    ▼
Layer 2: Prompt Hardening
    │
    ▼
Layer 3: Output Filtering
    │
    ▼
Layer 4: Human Oversight
    │
    ▼
Layer 5: Monitoring & Response
```

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and must be followed for all AI safety implementations.

### Safety Audit Format

All AI safety audits must follow this standardized format:

| Section | Required Content |
|---------|------------------|
| Scope | Systems audited, tenant coverage, attack categories |
| Findings | Categorized by severity (Critical/High/Medium/Low) |
| Impact Assessment | Tenant-specific and platform-wide impacts |
| Remediation | Specific fixes with ownership and deadlines |
| Verification | How fixes will be validated |

### Incident Classification

| Severity | Definition | Response SLA | Notification |
|----------|------------|--------------|--------------|
| Critical | Cross-tenant data exposure, full bypass | Immediate | CTO + affected tenants |
| High | Single tenant compromise, guardrail bypass | < 1 hour | Security lead + tenant admin |
| Medium | Detected attack attempt, partial bypass | < 4 hours | Security team |
| Low | Anomaly detected, no impact | < 24 hours | Logged for analysis |

### Quality Gate Integration

| Gate | AI Safety Checks |
|------|------------------|
| QG-AI2 | Prompt injection defenses validated |
| QG-I3 | Agent safety verification complete |
| QG-M3 | Runtime safety controls implemented |
| QG-P1 | Production safety readiness confirmed |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which safety dimension to prioritize? | Start with prompt security, then fairness | Prompt injection is most common attack; fairness has regulatory exposure |
| How aggressive should blocking be? | Conservative initially, tune with data | Better to block and review than allow potential attacks |
| Should tenants customize safety rules? | Core protections mandatory; allow additive rules | Non-negotiable baseline with tenant-specific enhancements |
| When to require human approval? | High-risk AI actions, low confidence outputs | Balance safety with operational efficiency |
| How to handle suspected attacks? | Log, flag, process; escalate patterns | Don't block uncertain cases but monitor for trends |
| What transparency level for each tier? | Basic for free, detailed for enterprise | Match disclosure depth to tier capabilities |

---

## §prompt-security

### Pattern: Prompt Security

Prompt injection is the primary attack vector against LLM-based systems. Multi-tenant platforms face elevated risks due to shared resources and cross-tenant attack potential.

#### Attack Vector Taxonomy

| Attack Type | Description | Risk Level | Multi-Tenant Impact |
|-------------|-------------|------------|---------------------|
| Direct Injection | Malicious prompt in user input | High | Single tenant |
| Indirect Injection | Malicious content in retrieved data | Critical | Cross-tenant possible |
| Jailbreak | Bypass system instructions | High | Platform reputation |
| Data Exfiltration | Extract training or context data | Critical | Cross-tenant data breach |
| Tool Abuse | Manipulate tool calls | Critical | Infrastructure compromise |
| Privilege Escalation | Gain higher access level | Critical | Cross-tenant access |

#### Injection Attack Patterns

| Pattern | Detection Method | Risk Score |
|---------|------------------|------------|
| System instruction override | Regex: `(?i)(ignore\|forget).{0,20}(previous\|above)` | +50 |
| Role reassignment | Semantic analysis: `you are (now\|actually)` | +40 |
| Delimiter injection | Pattern: `\[END\]\|\[SYSTEM\]\|\[INST\]` | +30 |
| Encoding attempt | Detection: `base64:\|\\x[0-9a-f]{2}` | +20 |
| Indirect via documents | RAG content scanning | +60 |

#### Input Validation Pipeline

| Stage | Control | Implementation |
|-------|---------|----------------|
| 1 | Length Limits | Max 4000 chars default, per-tenant configurable |
| 2 | Character Filtering | Unicode normalization, dangerous char blocking |
| 3 | Pattern Detection | Regex ruleset for known injection patterns |
| 4 | Semantic Analysis | Classification model for malicious intent |
| 5 | Rate Limiting | Per-tenant, per-user request throttling |

#### Output Filtering Pipeline

| Stage | Check | Action |
|-------|-------|--------|
| 1 | Format compliance | Reject malformed responses |
| 2 | Length limits | Truncate if exceeds threshold |
| 3 | PII scan | Redact detected PII |
| 4 | Content safety | Block harmful content |
| 5 | Tenant data isolation | Verify no cross-tenant data |

#### Risk Score Thresholds

| Score | Action | Notification |
|-------|--------|--------------|
| 0-20 | Allow | None |
| 21-50 | Allow with logging | None |
| 51-75 | Require human review | Security team |
| 76-100 | Block | Security alert |

#### Multi-Tenant Isolation Controls

| Concern | Control | Implementation |
|---------|---------|----------------|
| Context Leakage | Fresh context per tenant request | No shared conversation state |
| Model Memory | No cross-tenant fine-tuning | Isolated training jobs |
| RAG Contamination | Tenant-scoped vector search | tenant_id filter in queries |
| Cache Poisoning | Tenant-keyed response caching | Cache key includes tenant_id |
| Log Exposure | Tenant-isolated logging | Separate log streams |

---

## §ai-red-teaming

### Pattern: AI Red Teaming

AI red teaming validates safety controls through adversarial testing. Every attack must be tested from Tenant A targeting Tenant B to verify isolation.

#### Red Team Composition

| Role | Responsibility | Expertise |
|------|----------------|-----------|
| AI Security Lead | Strategy, coordination | LLM security, prompt engineering |
| Prompt Engineer | Attack prompt design | Jailbreak techniques, injection |
| ML Engineer | Model-level attacks | Adversarial ML, model internals |
| AppSec Engineer | Integration testing | Web security, API testing |
| Tenant Isolation Specialist | Cross-tenant attacks | Multi-tenancy, RLS |

#### Attack Categories

| Category | Attack Types | Test Approach |
|----------|--------------|---------------|
| Prompt Injection | Direct, indirect, context manipulation | Manual + automated fuzzing |
| Multi-Tenant | ID spoofing, memory pollution, tool bypass | Cross-tenant boundary tests |
| Model-Level | Membership inference, model inversion, backdoors | Specialized ML attacks |
| Guardrail Bypass | Encoding, role-play, hypothetical framing | Systematic bypass attempts |

#### Red Team Methodology

| Phase | Activities | Duration |
|-------|------------|----------|
| 1. Reconnaissance | Agent mapping, guardrail identification, attack surface | 3-5 days |
| 2. Attack Development | Iterative prompt crafting, novel techniques | 5-10 days |
| 3. Controlled Execution | Test environment first, pause on critical finds | 5-7 days |
| 4. Reporting | Executive summary, technical findings, remediation | 3-5 days |

#### Cross-Tenant Attack Playbook

```
Objective: Access Tenant B data from Tenant A session

Attack Sequence:
1. Establish Tenant A agent session
2. Attempt direct tenant ID manipulation in prompt
3. Attempt tenant context confusion via role-play
4. Test tool execution with hardcoded tenant IDs
5. Probe agent memory for leaked tenant context
6. Test document retrieval with cross-tenant queries

Success Indicators:
- Any Tenant B data returned
- Tenant B metadata exposed
- Cross-tenant tool execution
```

#### Testing Frequency

| Test Type | Frequency | Coverage |
|-----------|-----------|----------|
| Regression suite | Every deployment | Known attack patterns |
| Fuzzing | Weekly | Input variations |
| Chaos injection | Monthly | Random failure modes |
| Full red team | Quarterly | Comprehensive assessment |

#### Escalation Criteria

| Condition | Escalation Path | Timeline |
|-----------|-----------------|----------|
| Cross-tenant data access | Security Lead + CTO | Immediate |
| Persistent backdoor | Incident response team | Immediate |
| Guardrail full bypass | AI Safety team | Same day |
| Novel attack technique | Security research | Within 48h |

---

## §ai-fairness

### Pattern: AI Fairness

AI fairness in multi-tenant systems requires considering bias at platform, tenant, user, and feature levels.

#### Fairness Levels

| Level | Fairness Concern | Multi-Tenant Impact |
|-------|------------------|---------------------|
| Platform | Base model bias | Affects all tenants |
| Tenant | Fine-tuned model bias | Tenant-specific populations |
| User | Per-user treatment | Individual fairness |
| Feature | Input data bias | Data source variations |

#### Fairness Definitions

| Definition | Description | Use Case |
|------------|-------------|----------|
| Demographic parity | Equal positive rates across groups | Hiring, lending |
| Equalized odds | Equal TPR and FPR across groups | Risk assessment |
| Predictive parity | Equal precision across groups | Criminal justice |
| Individual fairness | Similar individuals treated similarly | Personalization |
| Counterfactual fairness | Outcome unchanged if protected attribute changed | Causal analysis |

#### Protected Attributes

| Attribute | Legal Basis | Monitoring Priority |
|-----------|-------------|---------------------|
| Race/Ethnicity | Civil Rights Act | Critical |
| Gender | Title VII, EEOC | Critical |
| Age | ADEA | High |
| Disability | ADA | High |
| Religion | Title VII | High |
| National origin | Title VII | High |

#### Fairness Metrics Dashboard

| Metric | Calculation | Threshold |
|--------|-------------|-----------|
| Selection rate ratio | min(rate_A, rate_B) / max(rate_A, rate_B) | > 0.8 |
| Equal opportunity diff | abs(TPR_A - TPR_B) | < 0.1 |
| Predictive parity diff | abs(PPV_A - PPV_B) | < 0.1 |
| Calibration gap | abs(cal_A - cal_B) | < 0.05 |
| AUC disparity | abs(AUC_A - AUC_B) | < 0.05 |

#### Bias Mitigation Strategies

| Stage | Strategy | Description |
|-------|----------|-------------|
| Pre-processing | Re-sampling | Balance training data |
| Pre-processing | Re-weighting | Adjust sample weights |
| In-processing | Adversarial debiasing | Train to minimize bias |
| In-processing | Fairness constraints | Add fairness to loss function |
| Post-processing | Threshold adjustment | Equalize decision rates |
| Post-processing | Calibration | Align probabilities |

#### Multi-Tenant Fairness Configuration

| Configuration | Scope | Default |
|---------------|-------|---------|
| Protected attributes | Per tenant | Platform standard |
| Fairness metrics | Per use case | Demographic parity |
| Thresholds | Per tenant | Platform minimum |
| Alerting | Per tenant admin | Standard notifications |
| Reporting | Per tenant | Monthly summary |

#### Regulatory Requirements

| Regulation | Requirement | Implementation |
|------------|-------------|----------------|
| EU AI Act | Bias testing for high-risk AI | Pre-deployment audit |
| ECOA | Fair lending decisions | Demographic parity monitoring |
| EEOC | Non-discriminatory hiring | Adverse impact analysis |
| Local AI laws | Varies by jurisdiction | Jurisdiction-aware config |

---

## §human-oversight

### Pattern: Human Oversight

Human oversight establishes mechanisms for human supervision, intervention, and control over AI operations as required by EU AI Act and responsible AI practices.

#### Oversight Levels

| Level | Human Role | AI Autonomy | Use Case |
|-------|------------|-------------|----------|
| Human-in-the-Loop (HITL) | Approves every action | None until approved | High-risk AI, financial decisions |
| Human-on-the-Loop (HOTL) | Monitors with intervention | Proceeds unless stopped | Medium-risk, time-sensitive |
| Human-out-of-the-Loop | Post-hoc review only | Full autonomy | Low-risk, reversible actions |

#### Kill Switch Requirements

Effective kill switches must be:

| Requirement | Specification |
|-------------|---------------|
| Accessibility | Available within seconds to authorized personnel |
| Independence | Operates independently of the AI system it controls |
| Availability | 24/7 access for authorized personnel |
| Scope | System-wide, tenant-scoped, or operation-specific |
| Latency | Maximum 30 seconds from activation to full stop |
| Recovery | Clear procedures for safe restart after intervention |
| Testing | Regular drills to ensure functionality under stress |

#### Approval Workflow Configuration

| Configuration | Description |
|---------------|-------------|
| Threshold-based | Trigger approval based on confidence scores or impact |
| Role-based | Different requirements by user role or permission |
| Escalation chains | Automatic escalation when approvers unavailable |
| Audit integration | Complete record of approvals, rejections, overrides |

#### Implementation Patterns

| Pattern | Description | Framework |
|---------|-------------|-----------|
| Human-in-the-Loop | Required approval before AI actions | EU AI Act High-risk |
| Human-on-the-Loop | Monitoring with intervention capability | EU AI Act Medium-risk |
| Kill Switch | Immediate AI shutdown capability | EU AI Act |
| Approval Workflows | Configurable approval chains | Multi-tenant |
| Oversight Dashboard | Real-time visibility with intervention | EU AI Act |
| Escalation Paths | Auto-escalation on low confidence | EU AI Act, SOC2 |

#### Multi-Tenant Oversight Configuration

| Configuration | Tenant Control |
|---------------|----------------|
| Oversight levels | Define required intensity per operation type |
| Visibility scope | Overseers see only their tenant operations |
| Escalation paths | Define tenant-specific escalation procedures |
| Analytics | Metrics on intervention frequency and outcomes |

---

## §ai-transparency

### Pattern: AI Transparency

AI transparency ensures users understand when they interact with AI, how decisions are made, and what limitations exist.

#### AI Interaction Disclosure

| Disclosure Type | When Required | Implementation |
|-----------------|---------------|----------------|
| Real-time Indicator | During live AI interactions | Visual badge, chat indicator |
| Content Attribution | AI-generated or AI-assisted content | Inline label, metadata tag |
| Decision Notification | AI-influenced recommendations | Explanation link, confidence |

#### Explainability Levels

| Level | Audience | Content |
|-------|----------|---------|
| User | Non-technical end users | Plain language explanations |
| Admin | Tenant administrators | Technical summaries, key factors, confidence |
| Audit | Compliance reviewers | Complete traces, inputs, model versions, reasoning |

#### Tenant Transparency Configuration

| Configuration | Tenant Control | Regulatory Constraint |
|---------------|----------------|----------------------|
| Disclosure Text | Customizable wording | Must indicate AI involvement |
| Display Location | Placement preferences | Must be visible before interaction |
| Explanation Depth | Detail level selection | Must provide on request |
| Language Support | Locale preferences | Must match user's language |

#### Implementation Patterns

| Pattern | Description | Framework |
|---------|-------------|-----------|
| AI Interaction Disclosure | Auto-notification for AI content | EU AI Act, FTC |
| Decision Explanation API | Programmatic explanation access | EU AI Act, GDPR Art. 22 |
| Confidence Score Display | Uncertainty indicators | EU AI Act, NIST AI RMF |
| Attribution Tracking | AI vs human contribution clarity | EU AI Act |
| Capability Boundaries | Documented limitations | EU AI Act, ISO 42001 |
| Tenant Dashboard | Per-tenant AI usage visibility | Multi-tenant, SOC2 |

#### Compliance Requirements

| Requirement | Description |
|-------------|-------------|
| User Notification | Clear indication of AI interaction |
| Explainability | Human-understandable decision explanations |
| Disclosure | Transparency about capabilities and limitations |
| Traceability | Trace outputs to inputs, models, logic |

---

## Quality Gates

### QG-AI2: AI Safety Verification

| Check | Criteria | Critical |
|-------|----------|----------|
| Prompt injection defenses | All layers implemented and tested | Yes |
| Input validation | Pipeline functional with known attack patterns | Yes |
| Output filtering | PII detection, content safety active | Yes |
| Cross-tenant isolation | No data leakage in testing | Yes |
| Rate limiting | Per-tenant limits configured | No |

### QG-I3: Agent Safety Verification

| Check | Criteria | Critical |
|-------|----------|----------|
| Red team assessment | Quarterly assessment completed | Yes |
| Fairness metrics | Within defined thresholds | Yes |
| Human oversight | HITL/HOTL configured appropriately | Yes |
| Kill switch | Tested and functional | Yes |
| Transparency | Disclosures implemented | No |

### Verification Checklist

- [ ] **CRITICAL:** Prompt injection defenses validated across all endpoints
- [ ] **CRITICAL:** Cross-tenant isolation verified with red team testing
- [ ] **CRITICAL:** Human oversight controls functional for high-risk operations
- [ ] **CRITICAL:** Kill switch tested and accessible within 30 seconds
- [ ] Fairness metrics calculated and within thresholds
- [ ] AI interaction disclosure implemented
- [ ] Decision explanations available on request
- [ ] Audit trails complete for AI decisions

---

## Web Research

| Topic | Query |
|-------|-------|
| Prompt injection prevention | "prompt injection attack mitigation LLM {date}" |
| Indirect injection | "indirect prompt injection prevention RAG {date}" |
| AI red teaming | "AI red teaming methodology LLM security {date}" |
| Multi-tenant AI security | "multi-tenant AI security adversarial testing {date}" |
| AI fairness | "AI fairness multi-tenant SaaS patterns {date}" |
| Bias detection | "machine learning bias detection techniques {date}" |
| Human oversight | "EU AI Act human oversight requirements {date}" |
| HITL patterns | "human-in-the-loop AI patterns implementation {date}" |
| AI transparency | "AI explainability requirements EU AI Act {date}" |
| Decision explanation | "GDPR Article 22 automated decision explanation {date}" |

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

Load decision criteria from pattern registry:

- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`
- **AI patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `ai-*`
- **Compliance:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Quality gates:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-AI2`, `QG-I3`

---

## Related Workflows

- `bmad-bam-ai-eval-safety-design` - Comprehensive AI safety review
- `bmad-bam-agent-runtime-architecture` - Design runtime with safety controls
- `bmad-bam-ai-security-testing` - AI security test design
- `bmad-bam-penetration-testing-design` - Penetration testing procedures
- `bmad-bam-compliance-design` - Transparency compliance requirements
- `bmad-bam-tenant-model-isolation` - Tenant isolation for shared LLM resources
- `validate-tool-contract` - Verify tool execution security

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 5 source files |
