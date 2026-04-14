# Step 1: Analyze PHI Data Flows

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Identify and classify all Protected Health Information (PHI) within the platform, map data flows across tenant boundaries, and establish the scope of HIPAA compliance requirements.

## Prerequisites

- Master architecture document completed
- Tenant model isolation defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: HIPAA


---

## Inputs

- User requirements and constraints for HIPAA compliance
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Identify PHI Elements

Catalog all PHI data elements within the platform:

| PHI Category | Data Elements | Storage Location | Encryption |
|--------------|---------------|------------------|------------|
| Demographic | Name, DOB, SSN, Address | {Location} | {AES-256/At-rest} |
| Medical | Diagnoses, Treatments, Medications | {Location} | {At-rest/In-transit} |
| Financial | Insurance, Billing, Claims | {Location} | {Encryption method} |
| Contact | Phone, Email, Emergency Contacts | {Location} | {Encryption method} |
| Identifiers | MRN, Account Numbers, Device IDs | {Location} | {Encryption method} |

### 2. Map PHI Data Flows

Document how PHI moves through the system:

| Flow ID | Source | Destination | PHI Elements | Security Controls |
|---------|--------|-------------|--------------|-------------------|
| PHI-001 | Patient Portal | Database | All demographics | TLS 1.3, AES-256 |
| PHI-002 | API Gateway | Tenant Service | Medical records | mTLS, Field encryption |
| PHI-003 | Analytics | Reporting | De-identified | Anonymization |

### 3. Classify PHI by Sensitivity

Establish sensitivity levels for PHI categories:

| Sensitivity Level | PHI Types | Access Requirements | Audit Level |
|-------------------|-----------|---------------------|-------------|
| Critical | SSN, Financial | Role + MFA + Supervisor | Real-time |
| High | Medical records | Role + MFA | Near real-time |
| Standard | Demographics | Role-based | Daily batch |
| Low | De-identified | Service account | Weekly |

### 4. Document Tenant PHI Isolation

Define PHI isolation requirements per tenant model:

| Tenant Model | PHI Isolation Method | Cross-tenant Risk | Mitigation |
|--------------|---------------------|-------------------|------------|
| RLS | Row-level policies | Query bypass | Policy testing |
| Schema | Schema boundaries | Naming collision | Namespace validation |
| Database | Physical separation | Connection routing | Connection pooling |

**Verify current best practices with web search:**
Search the web: "HIPAA PHI data classification best practices {date}"
Search the web: "HIPAA covered entity data flow mapping {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A] Analyse - PHI Data Analysis
- **A1**: Analyze third-party integrations for PHI exposure risk
- **A2**: Evaluate AI/ML model training data for PHI leakage
- **A3**: Assess backup and disaster recovery PHI handling
- **A4**: Review logging and monitoring for inadvertent PHI capture

### [P] Propose - PHI Protection Recommendations
- **P1**: Propose PHI minimization strategy for tenant data
- **P2**: Suggest de-identification approach for analytics
- **P3**: Recommend tenant-specific PHI encryption key management
- **P4**: Propose real-time PHI access monitoring approach

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 2 (Design Safeguards) - load `step-02-c-design-safeguards.md`
- **C2**: Return to workflow overview
- **C3**: Export current PHI analysis

---

## Verification

- [ ] All PHI elements identified and cataloged
- [ ] Data flows mapped comprehensively
- [ ] Sensitivity classifications assigned
- [ ] Tenant isolation requirements documented
- [ ] Patterns align with pattern registry

## Outputs

- PHI inventory with classifications
- PHI data flow diagram
- Sensitivity classification matrix
- Tenant PHI isolation requirements

## Next Step

Proceed to `step-02-c-design-safeguards.md` to design HIPAA safeguard controls.
