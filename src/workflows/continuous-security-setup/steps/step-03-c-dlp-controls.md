# Step 3: DLP Controls Verification

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

---

## Purpose

Verify data classification rules, exfiltration prevention, tenant data isolation, and AI data leakage prevention controls.

---

## Prerequisites

- Threat monitoring set up (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: data-protection

---

## Actions

### 1. Data Classification Rules

| Classification | Detection Method | Examples | Control |
|----------------|------------------|----------|---------|
| PII | Regex + ML | SSN, email, phone | Encrypt + Mask |
| PHI | Regex + ML | Medical records | Encrypt + Restrict |
| Financial | Regex | Credit cards, bank | Encrypt + Audit |
| Confidential | Label-based | Trade secrets | Restrict |

### 2. Exfiltration Prevention

| Vector | Control | Status |
|--------|---------|--------|
| API response | Output scanning | Active |
| File export | Content inspection | Active |
| Email | DLP gateway | Active |
| AI responses | Output filtering | Active |

### 3. Tenant Data Isolation Verification

| Isolation Check | Method | Frequency | Status |
|-----------------|--------|-----------|--------|
| Cross-tenant query | Automated test | Daily | Passing |
| Memory isolation | Boundary test | Daily | Passing |
| Log isolation | Audit check | Weekly | Passing |
| AI context isolation | Prompt test | Daily | Passing |

### 4. AI Data Leakage Prevention

| Control | Description | Status |
|---------|-------------|--------|
| Context sanitization | Remove sensitive data before AI | Active |
| Output filtering | Scan AI responses | Active |
| Memory boundary | Tenant-scoped memory | Active |
| PII masking | Mask PII in prompts | Active |

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into DLP implementation
- **P (Party Mode)**: Bring security and privacy perspectives
- **C (Continue)**: Accept DLP and proceed to anomaly detection
- **[Specific refinements]**: Describe concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save DLP controls to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-anomaly-detection.md`

---

**Verify current best practices with web search:**
Search the web: "dlp controls best practices {date}"
Search the web: "dlp controls multi-tenant SaaS {date}"

## Verification

- [ ] Data classification active
- [ ] Exfiltration prevention enabled
- [ ] Tenant isolation verified
- [ ] AI leakage prevention active

---

## Outputs

- DLP controls documentation

---

## Next Step

Proceed to `step-04-c-anomaly-detection.md` to activate anomaly detection.
