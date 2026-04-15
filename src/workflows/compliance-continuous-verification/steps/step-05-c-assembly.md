# Step 5: Assembly - Compliance Continuous Verification

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Combine all compliance continuous verification designs into a comprehensive design document.

---

## Prerequisites

- Steps 1-4 completed
- **Load template:** `{project-root}/_bmad/bam/data/templates/compliance-design-template.md`

---

## Actions

### 1. Document Assembly

Combine outputs from all previous steps:

| Section | Source Step | Content |
|---------|-------------|---------|
| Compliance Scope | Step 1 | Frameworks, controls, rules |
| Automated Checks | Step 2 | Scanning design, check automation |
| Drift Detection | Step 3 | Evidence collection, drift monitoring |
| Reporting Automation | Step 4 | Dashboards, alerts, reports |

### 2. Continuous Verification Architecture

```
Compliance Continuous Verification Architecture
├── 1. Compliance Rules Engine
│   ├── Framework Mappings (SOC2, GDPR, HIPAA)
│   ├── Control Definitions
│   └── Tenant-Specific Requirements
├── 2. Automated Scanning
│   ├── Infrastructure Scans
│   ├── Configuration Audits
│   └── Access Control Verification
├── 3. Evidence Collection
│   ├── Automated Evidence Capture
│   ├── Evidence Storage & Retention
│   └── Audit Trail Generation
├── 4. Drift Detection
│   ├── Baseline Configurations
│   ├── Change Detection
│   └── Remediation Workflows
├── 5. Reporting & Dashboards
│   ├── Real-time Compliance Score
│   ├── Control Status Views
│   └── Audit Readiness Reports
└── 6. Integration Points
    ├── CI/CD Pipeline Hooks
    ├── SIEM Integration
    └── Ticketing System Sync
```

### 3. Multi-Tenant Compliance Matrix

| Framework | Free Tier | Pro Tier | Enterprise |
|-----------|-----------|----------|------------|
| SOC 2 Type II | Shared | Shared | Dedicated |
| GDPR | Auto-applied (EU) | Auto-applied (EU) | Custom DPA |
| HIPAA | Not available | Opt-in | BAA included |
| ISO 27001 | N/A | On request | Standard |
| PCI DSS | N/A | Shared | Dedicated |

### 4. Quality Gate Mapping

| Gate | Requirement | Addressed In |
|------|-------------|--------------|
| QG-CC | Continuous compliance monitoring | Steps 1-4 |
| QG-P1 | Compliance readiness | All steps |

### 5. Final Validation Checklist

| Item | Status |
|------|--------|
| All compliance frameworks mapped | [ ] |
| Automated scanning configured | [ ] |
| Evidence collection automated | [ ] |
| Drift detection active | [ ] |
| Reporting dashboards defined | [ ] |
| Tenant isolation verified | [ ] |

**Verify current best practices with web search:**
Search the web: "compliance as code architecture patterns {date}"
Search the web: "continuous compliance verification SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Complete Create mode
```

#### If 'C' (Continue):
- Save complete compliance continuous verification design
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Output to: `{output_folder}/planning-artifacts/compliance/compliance-continuous-verification.md`
- Create mode complete

---

## Verification

- [ ] All sections assembled from previous steps
- [ ] Architecture diagram documented
- [ ] Multi-tenant compliance matrix complete
- [ ] Quality gate requirements mapped
- [ ] Final validation checklist complete

---

## Outputs

- Complete Compliance Continuous Verification Design document
- Multi-tenant compliance architecture
- Quality gate compliance verification
- **Output to:** `{output_folder}/planning-artifacts/compliance/compliance-continuous-verification.md`

---

## Next Step

Create workflow complete. Compliance continuous verification design ready for validation using Validate mode (`step-20-v-*`).

---

## Quality Gate Contribution: QG-CC Continuous Compliance

This workflow completes contribution to QG-CC by establishing continuous compliance verification:

| QG-CC Pattern | Step | Status |
|---------------|------|--------|
| `compliance_rules_defined` | Step 1 | Framework rules specified |
| `automated_scanning_active` | Step 2 | Scanning design complete |
| `evidence_collection_automated` | Step 3 | Evidence workflows defined |
| `drift_detection_enabled` | Step 3 | Drift monitoring configured |
| `compliance_reporting_live` | Step 4 | Dashboards and alerts |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-CC`

---

## Create Mode Complete

Compliance continuous verification design is complete.
