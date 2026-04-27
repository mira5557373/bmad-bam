# BAM Security Operations Guide

**When to load:** During Phase 5-6 (Quality/Operations) when verifying security operations,
or when user mentions security monitoring, incident response, or threat detection.

**Integrates with:** Security Architect, SOC Analyst, SRE, Compliance Officer

---

## Core Concepts

### Security Operations Pillars

Multi-tenant AI platform security operations encompasses:

1. **Security Monitoring** - SIEM, log collection, dashboards
2. **Incident Response** - Detection, triage, containment, recovery
3. **Threat Detection** - Traditional and AI-specific threats
4. **Security Controls** - Preventive, detective, corrective
5. **Continuous Security** - Scanning, patching, auditing

### AI-Specific Security Concerns

| Threat Category | Detection Method | Response |
|-----------------|------------------|----------|
| Prompt Injection | Guardrail monitoring | Block + alert |
| Model Extraction | Rate + pattern analysis | Throttle + investigate |
| Data Poisoning | Input validation | Quarantine + review |
| Cross-Tenant Attack | Isolation monitoring | Isolate + forensics |
| Adversarial Inputs | Output analysis | Block + retrain |

### Security Monitoring Coverage

| Event Category | Sources | Alert Priority |
|----------------|---------|----------------|
| Authentication | IAM, API Gateway | High |
| Authorization | RBAC, RLS | High |
| Network | WAF, Firewall | Medium-High |
| AI Operations | LLM, Agents | High |
| Data Access | Database, Storage | High |

## Application Guidelines

When verifying security operations:

1. **Verify monitoring coverage** - All critical events collected
2. **Test incident response** - Run tabletop exercises
3. **Validate threat detection** - Both traditional and AI-specific
4. **Assess control effectiveness** - Test preventive and detective controls

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Pre-production | Full security ops setup | Required for QG-S4 |
| Post-incident | Update detection rules | Learn from attacks |
| New AI feature | Add specific monitoring | New attack surface |
| Compliance audit | Evidence collection | Prove controls work |

## Related Workflows

- `bmad-bam-security-operations-verification` - SecOps verification
- `bmad-bam-ai-security` - AI security audit
- `bmad-bam-continuous-security-setup` - Continuous security

## Related Patterns

Load decision criteria and `web_queries` column from pattern registry:

- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `security`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `compliance`

Use the `web_queries` column from pattern registry for current best practices.

### Web Research

Use these queries for current best practices:

- Search: "security operations AI platforms {date}"
- Search: "SOC multi-tenant SaaS {date}"
- Search: "AI threat detection patterns {date}"
- Search: "incident response automation {date}"

### Security Metrics

Key metrics to track for security operations effectiveness:

| Metric | Target | Measurement |
|--------|--------|-------------|
| MTTD (Mean Time to Detect) | < 1 hour | Detection alert timestamp |
| MTTR (Mean Time to Respond) | < 4 hours | Incident close timestamp |
| Alert-to-Incident Ratio | > 10% | Quality of detection rules |
| Coverage Score | > 90% | Events monitored vs total |
| Compliance Score | 100% | Automated compliance checks |
