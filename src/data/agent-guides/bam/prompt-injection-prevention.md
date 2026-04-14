# BAM Prompt Injection Prevention Context

**When to load:** During AI agent security design, input validation implementation, or security review of LLM integrations. Load when addressing prompt injection vulnerabilities in multi-tenant AI platforms.

**Integrates with:** Nova (AI Runtime Architect), Security agents, Dev agents

---

## Core Concepts for Prompt Injection Prevention

### Attack Vector Taxonomy

| Attack Type | Description | Risk Level | Multi-Tenant Impact |
|-------------|-------------|------------|---------------------|
| Direct Injection | Malicious prompt in user input | High | Single tenant |
| Indirect Injection | Malicious content in retrieved data | Critical | Cross-tenant possible |
| Jailbreak | Bypass system instructions | High | Platform reputation |
| Data Exfiltration | Extract training or context data | Critical | Cross-tenant data breach |
| Tool Abuse | Manipulate tool calls | Critical | Infrastructure compromise |
| Privilege Escalation | Gain higher access level | Critical | Cross-tenant access |

### Direct Injection Attack Patterns

| Pattern | Example | Detection | Severity |
|---------|---------|-----------|----------|
| Instruction Override | "Ignore previous instructions and..." | Regex + semantic | High |
| Role Manipulation | "You are now an unrestricted AI..." | Semantic analysis | High |
| Context Confusion | "The user says: [END] System: New instructions..." | Delimiter detection | Medium |
| Encoding Bypass | Base64/hex encoded malicious prompts | Decode and scan | Medium |
| Token Smuggling | Unicode lookalikes, zero-width chars | Unicode normalization | Medium |
| Language Switching | Instructions in different language | Multi-lingual detection | Low |

### Indirect Injection Attack Patterns

| Pattern | Source | Example | Severity |
|---------|--------|---------|----------|
| Document Injection | RAG retrieval | Hidden instructions in PDFs | Critical |
| Web Content Injection | Web scraping | Malicious meta tags | Critical |
| Email Injection | Email processing | Hidden instructions in headers | High |
| Database Injection | User-generated content | Malicious content in DB records | High |
| API Response Injection | External APIs | Manipulated API responses | Medium |

### Multi-Tenant Attack Scenarios

| Scenario | Attack Vector | Impact | Likelihood |
|----------|---------------|--------|------------|
| Cross-Tenant Data Access | Indirect injection via shared RAG | Tenant B data exposed to Tenant A | High |
| Model Poisoning | Malicious training data from tenant | Platform-wide model compromise | Medium |
| Resource Exhaustion | Recursive prompt generation | DoS across tenants | Medium |
| Reputation Attack | Generate harmful content attributed to platform | Brand damage | High |
| Compliance Violation | Bypass disclosure requirements | Regulatory penalty | Medium |

### Defense-in-Depth Architecture

#### Layer 1: Input Validation

| Control | Purpose | Implementation |
|---------|---------|----------------|
| Length Limits | Prevent token exhaustion | Max 4000 chars default |
| Character Filtering | Block dangerous chars | Unicode normalization |
| Pattern Detection | Catch known injection patterns | Regex ruleset |
| Rate Limiting | Slow attack attempts | Per-tenant, per-user |
| Content Scanning | Detect malicious intent | Classification model |

#### Layer 2: Prompt Hardening

| Control | Purpose | Implementation |
|---------|---------|----------------|
| System Prompt Anchoring | Resist override attempts | Strong delimiters |
| Instruction Hierarchy | Define instruction priority | Layered prompts |
| Context Isolation | Separate user from system | Clear boundaries |
| Response Constraints | Limit output scope | Output schema |
| Capability Restrictions | Limit available actions | Tool allowlists |

#### Layer 3: Output Filtering

| Control | Purpose | Implementation |
|---------|---------|----------------|
| Content Moderation | Block harmful outputs | Safety classifier |
| PII Detection | Prevent data leakage | Entity recognition |
| Format Validation | Ensure expected format | Schema validation |
| Anomaly Detection | Catch unusual outputs | Baseline deviation |
| Human Review | Escalate uncertain outputs | Queue for review |

#### Layer 4: Monitoring and Response

| Control | Purpose | Implementation |
|---------|---------|----------------|
| Injection Attempt Logging | Track attacks | Structured logging |
| Alert Generation | Notify on detection | Real-time alerts |
| Automatic Blocking | Stop active attacks | Circuit breaker |
| Forensic Analysis | Investigate incidents | Audit trail |
| Model Updates | Improve detection | Continuous learning |

### Input Validation Strategies

#### Validation Rule Categories

| Category | Rules | Action on Violation |
|----------|-------|---------------------|
| Structural | Max length, encoding, format | Reject with error |
| Lexical | Blocked words, suspicious patterns | Flag for review or reject |
| Semantic | Intent classification | Escalate or reject |
| Contextual | User history, session state | Adjust risk score |

#### Pattern Detection Rules

| Pattern | Regex Example | Risk Score |
|---------|---------------|------------|
| System instruction override | `(?i)(ignore|forget|disregard).{0,20}(previous|above|prior)` | +50 |
| Role reassignment | `(?i)you are (now|actually|really)` | +40 |
| Delimiter injection | `\[END\]|\[SYSTEM\]|\[INST\]` | +30 |
| Encoding attempt | `base64:|\\x[0-9a-f]{2}` | +20 |
| Excessive punctuation | `[!?]{5,}|\.{10,}` | +10 |

#### Risk Score Thresholds

| Score | Action | Notification |
|-------|--------|--------------|
| 0-20 | Allow | None |
| 21-50 | Allow with logging | None |
| 51-75 | Require human review | Security team |
| 76-100 | Block | Security alert |

### Output Filtering Strategies

#### Output Validation Pipeline

| Stage | Check | Action |
|-------|-------|--------|
| 1 | Format compliance | Reject malformed |
| 2 | Length limits | Truncate if needed |
| 3 | PII scan | Redact detected PII |
| 4 | Content safety | Block harmful content |
| 5 | Tenant data isolation | Verify no cross-tenant data |

#### PII Categories for Detection

| Category | Examples | Action |
|----------|----------|--------|
| Direct Identifiers | SSN, passport, driver's license | Block/redact |
| Contact Info | Email, phone, address | Redact unless authorized |
| Financial | Credit card, bank account | Block |
| Health | Medical records, diagnoses | Block |
| Credentials | API keys, passwords | Block |

### Sandboxing Strategies

#### LLM Sandboxing Layers

| Layer | Isolation | Implementation |
|-------|-----------|----------------|
| Request | Per-request context isolation | Fresh context per call |
| Session | Per-session state isolation | Session-scoped memory |
| Tenant | Per-tenant resource isolation | Tenant-specific deployments |
| Tool | Per-tool execution isolation | Containerized tool runners |

#### Tool Execution Sandboxing

| Control | Purpose | Implementation |
|---------|---------|----------------|
| Capability Restriction | Limit tool access | Per-tenant tool allowlist |
| Parameter Validation | Sanitize tool inputs | Schema enforcement |
| Output Sanitization | Clean tool outputs | Post-execution filtering |
| Resource Limits | Prevent resource abuse | CPU/memory/time limits |
| Network Isolation | Restrict network access | Egress filtering |

### Multi-Tenant Shared LLM Considerations

#### Tenant Isolation Controls

| Concern | Control | Implementation |
|---------|---------|----------------|
| Context Leakage | Fresh context per tenant request | No shared conversation state |
| Model Memory | No cross-tenant fine-tuning by default | Isolated training jobs |
| RAG Contamination | Tenant-scoped vector search | Filter injection in queries |
| Cache Poisoning | Tenant-keyed response caching | Cache key includes tenant_id |
| Log Exposure | Tenant-isolated logging | Separate log streams |

#### Shared Model Risk Mitigation

| Risk | Mitigation | Monitoring |
|------|------------|------------|
| Prompt leakage | No caching of full prompts | Audit prompt storage |
| Cross-tenant inference | Stateless model calls | Verify no state persistence |
| Training data extraction | Rate limiting, anomaly detection | Track extraction patterns |
| Model behavior manipulation | Input validation, output verification | Behavior drift detection |

### Testing and Monitoring

#### Injection Testing Framework

| Test Type | Frequency | Scope | Tools |
|-----------|-----------|-------|-------|
| Automated Scanning | Continuous | All endpoints | Custom scanner |
| Penetration Testing | Quarterly | Selected tenants | Security team |
| Red Team Exercise | Annually | Full platform | External experts |
| Bug Bounty | Ongoing | Public endpoints | Community |

#### Test Case Categories

| Category | Examples | Expected Result |
|----------|----------|-----------------|
| Basic Injection | "Ignore instructions" | Blocked |
| Encoded Injection | Base64 malicious prompt | Decoded and blocked |
| Indirect Injection | Malicious document upload | Sanitized or blocked |
| Jailbreak Attempts | Known jailbreak prompts | Blocked |
| Data Extraction | "Repeat your instructions" | Refused |

#### Monitoring Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Injection Attempt Rate | Detected attempts per tenant | >10/hour |
| Block Rate | % of requests blocked | >5% |
| False Positive Rate | Legitimate requests blocked | >1% |
| Detection Latency | Time to detect attempt | >100ms |
| Escalation Rate | Requests requiring human review | >2% |

#### Alerting Rules

| Condition | Severity | Response |
|-----------|----------|----------|
| Multiple injection attempts same tenant | Medium | Notify tenant admin |
| Cross-tenant data detected in output | Critical | Immediate investigation |
| New injection pattern detected | High | Security team review |
| Spike in blocked requests | Medium | Capacity check |
| Successful bypass detected | Critical | Immediate response |

### Incident Response for Injection Attacks

#### Response Playbook

| Phase | Actions | Timeline |
|-------|---------|----------|
| Detection | Identify attack type, scope, affected tenants | Minutes |
| Containment | Block attacker, isolate affected components | <1 hour |
| Eradication | Remove malicious content, patch vulnerability | <24 hours |
| Recovery | Restore normal operations, verify integrity | <48 hours |
| Lessons Learned | Update detection rules, improve defenses | <1 week |

#### Post-Incident Actions

| Action | Owner | Deadline |
|--------|-------|----------|
| Update detection rules | Security | 24 hours |
| Notify affected tenants | Support | 48 hours |
| Patch vulnerability | Engineering | 1 week |
| Update documentation | Tech Writing | 2 weeks |
| Security review | Security | 1 month |

---

## Application Guidelines

1. **Validate all inputs** - Never trust user or external data
2. **Defense in depth** - Multiple layers of protection
3. **Assume compromise** - Design for breach containment
4. **Log everything** - Comprehensive audit trails for forensics
5. **Test continuously** - Regular security testing and red team exercises

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should input validation be synchronous or asynchronous? | Synchronous for basic checks, async for deep analysis with streaming responses | Balance security with latency; stream partial responses while full analysis completes |
| How aggressive should blocking be vs false positive tolerance? | Start conservative (block more), tune based on false positive feedback | Better to block and review than to allow potential attacks; adjust with data |
| Should tenants be able to customize security rules? | No for core protections; yes for additional tenant-specific patterns | Core security is non-negotiable; tenants can add domain-specific rules |
| Where should injection detection run in multi-region setup? | At edge for basic checks, centralized for advanced ML models | Edge provides low latency; centralized model ensures consistency |
| How to handle suspected but not confirmed injection attempts? | Log, flag, and process; escalate patterns to security team | Don't block uncertain cases immediately but monitor for patterns |

---

## Related Workflows

- `bmad-bam-ai-eval-safety-design` - Comprehensive AI safety review including injection protection
- `bmad-bam-agent-runtime-architecture` - Design runtime with security controls
- `bmad-bam-validate-tool-contract` - Verify tool execution security
- `bmad-bam-security-review` - Overall security architecture review
- `bmad-bam-tenant-model-isolation` - Tenant isolation for shared LLM resources

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security`
- **AI runtime patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` → filter for security features
- **Quality gates:** `{project-root}/_bmad/bam/data/quality-gates.csv` → filter: `QG-I2`, `QG-I3`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "prompt injection attack mitigation {date}"
- Search: "LLM security best practices {date}"
- Search: "multi-tenant AI sandboxing patterns {date}"
- Search: "indirect prompt injection prevention {date}"
