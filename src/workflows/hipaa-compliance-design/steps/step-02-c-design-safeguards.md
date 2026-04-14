# Step 2: Design HIPAA Safeguards

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

Design comprehensive HIPAA safeguards covering Administrative, Technical, and Physical controls to protect PHI throughout the platform.

## Prerequisites

- PHI data flows analyzed (Step 1 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: HIPAA


---

## Inputs

- PHI inventory from Step 1
- PHI data flow diagram
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- HIPAA Security Rule requirements

---

## Actions

### 1. Design Administrative Safeguards

Define administrative controls per HIPAA Security Rule:

| Safeguard | HIPAA Reference | Implementation | Owner |
|-----------|-----------------|----------------|-------|
| Security Management Process | 164.308(a)(1) | Risk analysis, sanction policy | Security Officer |
| Workforce Security | 164.308(a)(3) | Authorization, termination | HR + Security |
| Information Access Management | 164.308(a)(4) | Access authorization, clearance | IAM Team |
| Security Awareness Training | 164.308(a)(5) | Training program, reminders | Training Team |
| Security Incident Procedures | 164.308(a)(6) | Response and reporting | Incident Team |
| Contingency Plan | 164.308(a)(7) | Backup, DR, emergency mode | Operations |
| Evaluation | 164.308(a)(8) | Periodic technical/non-tech eval | Compliance |
| BAA Requirements | 164.308(b)(1) | Written contracts | Legal |

### 2. Design Technical Safeguards

Define technical controls for PHI protection:

| Safeguard | HIPAA Reference | Implementation | Tenant Impact |
|-----------|-----------------|----------------|---------------|
| Access Control | 164.312(a)(1) | Unique user ID, emergency access | Per-tenant RBAC |
| Audit Controls | 164.312(b) | Hardware/software audit trails | Tenant-scoped logs |
| Integrity Controls | 164.312(c)(1) | Electronic PHI authentication | Checksums, signatures |
| Person Authentication | 164.312(d) | Verify identity | MFA per tenant |
| Transmission Security | 164.312(e)(1) | Encryption, integrity | TLS 1.3, mTLS |

### 3. Design Physical Safeguards

Define physical controls for infrastructure:

| Safeguard | HIPAA Reference | Implementation | Cloud Provider |
|-----------|-----------------|----------------|----------------|
| Facility Access Controls | 164.310(a)(1) | Contingency operations, access control | SOC 2 certified DC |
| Workstation Use | 164.310(b) | Approved functions, access | Remote work policy |
| Workstation Security | 164.310(c) | Physical safeguards | Endpoint protection |
| Device and Media Controls | 164.310(d)(1) | Disposal, re-use, accountability | NIST SP 800-88 |

### 4. Map Controls to Tenant Model

Align safeguards with tenant isolation:

| Control Category | RLS Impact | Schema Impact | Database Impact |
|------------------|------------|---------------|-----------------|
| Access Control | Policy-enforced | Schema-scoped | Connection-scoped |
| Audit Logging | Tenant column | Schema prefix | Database tag |
| Encryption | Shared key + tenant | Per-schema key | Per-DB key |
| Backup/Recovery | Tenant filter | Schema export | Full DB backup |

**Verify current best practices with web search:**
Search the web: "HIPAA Security Rule safeguards implementation {date}"
Search the web: "HIPAA technical safeguards cloud computing {date}"

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

### [A] Analyse - Safeguard Analysis
- **A1**: Analyze administrative safeguard gaps for multi-tenant platform
- **A2**: Evaluate technical control effectiveness for tenant isolation
- **A3**: Assess physical safeguard coverage for cloud deployment
- **A4**: Review safeguard automation opportunities

### [P] Propose - Safeguard Recommendations
- **P1**: Propose automated access review workflow per tenant
- **P2**: Suggest audit log aggregation architecture
- **P3**: Recommend emergency access break-glass procedure
- **P4**: Propose continuous compliance monitoring approach

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 3 (Design BAA Management) - load `step-03-c-design-baa-management.md`
- **C2**: Return to workflow overview
- **C3**: Export current safeguard design

---

## Verification

- [ ] All administrative safeguards addressed
- [ ] Technical safeguards mapped to implementation
- [ ] Physical safeguards appropriate for deployment model
- [ ] Tenant model alignment verified
- [ ] Patterns align with pattern registry

## Outputs

- Administrative safeguard implementation plan
- Technical safeguard control matrix
- Physical safeguard requirements
- Tenant-safeguard alignment matrix

## Next Step

Proceed to `step-03-c-design-baa-management.md` to design Business Associate Agreement management.
