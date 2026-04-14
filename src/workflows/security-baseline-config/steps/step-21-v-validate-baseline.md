# Step 2: Validate Security Baseline

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- PAUSE **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

Perform detailed validation of the security baseline against CIS benchmarks and compliance frameworks.

## Prerequisites

- Baseline loaded in Step 20
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Validate Infrastructure Baselines

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Cloud Security | CIS aligned | [ ] |
| Container Security | CIS Docker | [ ] |
| Kubernetes | CIS K8s | [ ] |
| Database | Hardened | [ ] |

### 2. Validate Application Baselines

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| Web Application | OWASP aligned | [ ] |
| API Security | Best practices | [ ] |
| Authentication | NIST 800-63B | [ ] |
| Logging | Complete | [ ] |

### 3. Validate AI Baselines

| Validation Item | Criteria | Status |
|-----------------|----------|--------|
| LLM Gateway | Security controls | [ ] |
| Vector Store | Isolation | [ ] |
| Orchestrator | Sandboxed | [ ] |
| Model Security | Protected | [ ] |

### 4. Validate Compliance Mapping

| Framework | Coverage | Status |
|-----------|----------|--------|
| SOC2 | Mapped | [ ] |
| ISO27001 | Mapped | [ ] |
| CIS | Aligned | [ ] |
| NIST CSF | Mapped | [ ] |

---

## COLLABORATION MENUS (A/P/C)

### [C]ontinue
- **C1**: Accept validation results
- **C2**: Load `step-22-v-generate-report.md`

---

## Verification

- [ ] Infrastructure validated
- [ ] Application validated
- [ ] AI validated
- [ ] Compliance validated

## Outputs

- Validation results

## Next Step

Proceed to `step-22-v-generate-report.md`.
