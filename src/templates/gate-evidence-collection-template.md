---
name: gate-evidence-collection-template
description: Template for collecting and organizing quality gate compliance evidence
category: quality-gates
version: "1.0.0"
---

# Quality Gate Evidence Collection

## Document Information

| Field | Value |
|-------|-------|
| **Template ID** | TPL-GEC-001 |
| **Version** | 1.0.0 |
| **Domain** | Quality Gates |
| **Quality Gate** | {{gate_id}} |

## Purpose

Collect and organize evidence for quality gate compliance verification.

---

## 1. Evidence Package Identification

| Attribute | Value |
|-----------|-------|
| Package ID | EVD-{gate_id}-{date} |
| Gate ID | {gate_id} |
| Gate Name | {gate_name} |
| Collection Date | {date} |
| Collector | {collector} |
| Project | {{project_name}} |

---

## 2. Documentation Evidence

### 2.1 Architecture Documents

| Document | Location | Version | Collected |
|----------|----------|---------|-----------|
| Master Architecture | {path} | {version} | [ ] |
| Module Architecture | {path} | {version} | [ ] |
| Tenant Model Design | {path} | {version} | [ ] |
| Agent Runtime Design | {path} | {version} | [ ] |

### 2.2 Process Documents

| Document | Location | Version | Collected |
|----------|----------|---------|-----------|
| Runbooks | {path} | {version} | [ ] |
| Incident Response Plan | {path} | {version} | [ ] |
| DR Plan | {path} | {version} | [ ] |
| Security Policies | {path} | {version} | [ ] |

---

## 3. Test Evidence

### 3.1 Unit Test Results

| Test Suite | Pass Rate | Coverage | Report Link |
|------------|-----------|----------|-------------|
| {suite} | {rate}% | {coverage}% | {link} |

### 3.2 Integration Test Results

| Test Suite | Pass Rate | Environments | Report Link |
|------------|-----------|--------------|-------------|
| {suite} | {rate}% | {envs} | {link} |

### 3.3 Tenant Isolation Tests

| Test Type | Pass Rate | Tenants Tested | Report Link |
|-----------|-----------|----------------|-------------|
| RLS Tests | {rate}% | {count} | {link} |
| Cross-tenant Tests | {rate}% | {count} | {link} |
| Boundary Tests | {rate}% | {count} | {link} |

### 3.4 AI Safety Tests

| Test Type | Pass Rate | Scenarios | Report Link |
|-----------|-----------|-----------|-------------|
| Prompt Injection | {rate}% | {count} | {link} |
| Output Validation | {rate}% | {count} | {link} |
| Kill Switch | {rate}% | {count} | {link} |

---

## 4. Security Evidence

### 4.1 Scan Results

| Scan Type | Date | Findings | Report Link |
|-----------|------|----------|-------------|
| Vulnerability Scan | {date} | {findings} | {link} |
| SAST | {date} | {findings} | {link} |
| DAST | {date} | {findings} | {link} |
| Dependency Scan | {date} | {findings} | {link} |

### 4.2 Penetration Testing

| Test Type | Date | Findings | Report Link |
|-----------|------|----------|-------------|
| Network Pentest | {date} | {findings} | {link} |
| Application Pentest | {date} | {findings} | {link} |
| AI Pentest | {date} | {findings} | {link} |

### 4.3 Access Control Evidence

| Control | Implementation | Verification | Evidence |
|---------|----------------|--------------|----------|
| RBAC | {impl} | {verification} | {link} |
| MFA | {impl} | {verification} | {link} |
| Tenant Isolation | {impl} | {verification} | {link} |

---

## 5. Compliance Evidence

### 5.1 Framework Compliance

| Framework | Score | Gaps | Report Link |
|-----------|-------|------|-------------|
| SOC 2 | {score}% | {gaps} | {link} |
| GDPR | {score}% | {gaps} | {link} |
| HIPAA | {score}% | {gaps} | {link} |
| ISO 27001 | {score}% | {gaps} | {link} |

### 5.2 Audit Evidence

| Audit Type | Date | Findings | Report Link |
|------------|------|----------|-------------|
| Internal Audit | {date} | {findings} | {link} |
| External Audit | {date} | {findings} | {link} |

---

## 6. Operational Evidence

### 6.1 Monitoring Evidence

| System | Coverage | Dashboard | Alert Rules |
|--------|----------|-----------|-------------|
| APM | {coverage}% | {link} | {count} |
| Logging | {coverage}% | {link} | {count} |
| Metrics | {coverage}% | {link} | {count} |

### 6.2 DR Evidence

| Test Type | Date | RTO Achieved | RPO Achieved | Report |
|-----------|------|--------------|--------------|--------|
| Failover Test | {date} | {rto} | {rpo} | {link} |
| Recovery Test | {date} | {rto} | {rpo} | {link} |

### 6.3 SLO Evidence

| SLO | Target | Actual | Period | Dashboard |
|-----|--------|--------|--------|-----------|
| Availability | {target}% | {actual}% | {period} | {link} |
| Latency | {target}ms | {actual}ms | {period} | {link} |
| Error Rate | {target}% | {actual}% | {period} | {link} |

---

## 7. Evidence Integrity

### 7.1 Hash Verification

| Document | Hash Algorithm | Hash Value |
|----------|----------------|------------|
| {document} | SHA-256 | {hash} |

### 7.2 Chain of Custody

| Action | Actor | Timestamp | System |
|--------|-------|-----------|--------|
| Collection | {actor} | {timestamp} | {system} |
| Verification | {actor} | {timestamp} | {system} |
| Submission | {actor} | {timestamp} | {system} |

---

## Verification Checklist

- [ ] All documentation evidence collected
- [ ] Test results gathered
- [ ] Security scans completed
- [ ] Compliance scores documented
- [ ] Operational evidence captured
- [ ] Evidence integrity verified
- [ ] Chain of custody documented

---

## Web Research Queries

For current evidence collection best practices:

```
audit evidence collection automation {date}
compliance evidence management SaaS {date}
quality gate evidence best practices {date}
```

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{date}} | {{author}} | Initial template creation |
