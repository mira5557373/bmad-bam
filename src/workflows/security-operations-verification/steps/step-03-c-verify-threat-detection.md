# Step 3: Verify Threat Detection

## Purpose

Verify threat detection capabilities across all attack vectors relevant to multi-tenant AI platforms.

## Prerequisites

- Steps 1-2 complete
- Threat model available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `security`

## Actions

### 1. Traditional Threat Detection

| Threat Vector | Detection Method | Test Result | Status |
|---------------|------------------|-------------|--------|
| SQL injection | WAF rules | | |
| XSS | WAF + CSP | | |
| CSRF | Token validation | | |
| Brute force | Rate limiting | | |
| DDoS | WAF + Shield | | |
| Path traversal | Input validation | | |

### 2. AI-Specific Threat Detection

| Threat Vector | Detection Method | Test Result | Status |
|---------------|------------------|-------------|--------|
| Prompt injection | Guardrails | | |
| Model extraction | Rate + pattern | | |
| Data poisoning | Input validation | | |
| Adversarial inputs | Input filtering | | |
| Jailbreaking | Output monitoring | | |
| Cross-tenant attack | Isolation checks | | |

### 3. Behavioral Detection

| Behavior Pattern | Baseline | Anomaly Detection | Status |
|------------------|----------|-------------------|--------|
| User activity | Established | ML-based | |
| API usage | Per-tenant | Threshold + ML | |
| Data access | Role-based | Anomaly alert | |
| Token usage | Historical | Spike detection | |
| Admin actions | Normal patterns | Unusual activity | |

### 4. Threat Intelligence Integration

| Intelligence Source | Integration | Automated | Status |
|---------------------|-------------|-----------|--------|
| IP reputation | WAF | Yes | |
| Known attack patterns | SIEM rules | Yes | |
| Vulnerability feeds | Scanning | Yes | |
| AI threat feeds | Guardrails | Yes | |

### 5. Detection Validation Tests

| Test | Attack Simulated | Detected | Alert Time |
|------|------------------|----------|------------|
| Red team exercise | Multiple vectors | | |
| Penetration test | External attacks | | |
| Purple team | Collab testing | | |
| AI adversarial | Prompt attacks | | |

**Verify threat detection patterns with web search:**
Search the web: "AI threat detection validation {date}"
Search the web: "multi-tenant threat monitoring {date}"

## Verification

- [ ] Traditional threats detected
- [ ] AI-specific threats detected
- [ ] Behavioral detection working
- [ ] Threat intel integrated
- [ ] Detection validated

## Outputs

- Threat detection assessment

## Next Step

Proceed to `step-04-c-assess-controls.md`
