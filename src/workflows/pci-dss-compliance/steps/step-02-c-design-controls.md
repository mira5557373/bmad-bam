# Step 2: Design PCI-DSS Security Controls

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

Design comprehensive PCI-DSS security controls covering all 12 requirements organized into 6 control objectives.

## Prerequisites

- CDE scope defined (Step 1 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: PCI-DSS


---

## Inputs

- CDE scope documentation from Step 1
- Network segmentation requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- PCI-DSS v4.0 requirements

---

## Actions

### 1. Build and Maintain Secure Network (Requirements 1-2)

Design network security controls:

| Requirement | Control | Implementation | Tenant Impact |
|-------------|---------|----------------|---------------|
| 1.1 | Firewall configuration | WAF, network ACLs | Per-tenant rules |
| 1.2 | Deny untrusted networks | Default deny policy | Tenant isolation |
| 1.3 | CDE perimeter | DMZ architecture | Shared perimeter |
| 2.1 | Change vendor defaults | Hardening standards | Tenant configs |
| 2.2 | System configuration | CIS benchmarks | Per-tenant baseline |

### 2. Protect Cardholder Data (Requirements 3-4)

Design data protection controls:

| Requirement | Control | Implementation | Tenant Impact |
|-------------|---------|----------------|---------------|
| 3.1 | Minimize CHD storage | Tokenization | Per-tenant tokens |
| 3.2 | Protect stored PAN | AES-256 encryption | Per-tenant keys |
| 3.3 | Mask PAN display | First 6, last 4 only | Tenant UI |
| 3.4 | Render PAN unreadable | Encryption/hashing | Shared algorithm |
| 4.1 | Encrypt transmission | TLS 1.3 minimum | Tenant endpoints |
| 4.2 | Secure messaging | No PAN via email/IM | Tenant notifications |

### 3. Maintain Vulnerability Management (Requirements 5-6)

Design vulnerability management controls:

| Requirement | Control | Implementation | Tenant Impact |
|-------------|---------|----------------|---------------|
| 5.1 | Anti-malware | EDR solution | Shared protection |
| 5.2 | Update anti-malware | Auto-update enabled | Platform-wide |
| 5.3 | Active malware protection | Real-time scanning | Shared scanning |
| 6.1 | Security patches | 30-day critical patches | Platform-wide |
| 6.2 | Secure development | SSDLC practices | Shared process |
| 6.3 | Code review | Security review | Shared process |

### 4. Implement Access Control (Requirements 7-9)

Design access control measures:

| Requirement | Control | Implementation | Tenant Impact |
|-------------|---------|----------------|---------------|
| 7.1 | Restrict CHD access | Need-to-know basis | Per-tenant RBAC |
| 7.2 | Access control system | RBAC + MFA | Tenant-scoped roles |
| 8.1 | Unique user IDs | No shared accounts | Per-tenant users |
| 8.2 | Authentication controls | MFA required | Tenant MFA config |
| 8.3 | Strong authentication | Password + MFA | Tenant policies |
| 9.1 | Physical access | Data center controls | Provider SOC 2 |

### 5. Monitor and Test Networks (Requirements 10-11)

Design monitoring and testing controls:

| Requirement | Control | Implementation | Tenant Impact |
|-------------|---------|----------------|---------------|
| 10.1 | Audit trails | Comprehensive logging | Per-tenant logs |
| 10.2 | Automated audit trails | SIEM integration | Tenant-scoped |
| 10.3 | Review audit logs | Daily review process | Per-tenant review |
| 11.1 | Wireless scanning | Quarterly scans | N/A for cloud |
| 11.2 | Vulnerability scans | Quarterly internal/external | Platform-wide |
| 11.3 | Penetration testing | Annual testing | Shared + tenant |

### 6. Maintain Security Policy (Requirement 12)

Design policy and governance:

| Requirement | Control | Implementation | Tenant Impact |
|-------------|---------|----------------|---------------|
| 12.1 | Security policy | Documented policies | Platform policies |
| 12.2 | Risk assessment | Annual assessment | Platform + tenant |
| 12.3 | Usage policies | Acceptable use | Tenant agreements |
| 12.4 | Responsibility assignment | RACI matrix | Platform + tenant |
| 12.5 | Security responsibilities | Job descriptions | Platform staff |

**Verify current best practices with web search:**
Search the web: "PCI DSS v4.0 security controls implementation {date}"
Search the web: "PCI DSS multi-tenant cloud compliance {date}"

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

### [A] Analyse - Control Analysis
- **A1**: Analyze encryption key management architecture
- **A2**: Evaluate access control effectiveness for multi-tenant
- **A3**: Assess vulnerability scanning coverage
- **A4**: Review audit logging completeness

### [P] Propose - Control Recommendations
- **P1**: Propose tokenization architecture for PAN protection
- **P2**: Suggest centralized key management solution
- **P3**: Recommend SIEM integration approach
- **P4**: Propose penetration testing methodology

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 3 (Design Tenant Isolation) - load `step-03-c-design-tenant-isolation.md`
- **C2**: Return to workflow overview
- **C3**: Export current control design

---

## Verification

- [ ] All 12 PCI-DSS requirements addressed
- [ ] Controls mapped to implementation
- [ ] Tenant impact assessed for each control
- [ ] Control gaps identified
- [ ] Patterns align with pattern registry

## Outputs

- PCI-DSS security control matrix
- Control implementation requirements
- Tenant control impact matrix
- Control gap analysis

## Next Step

Proceed to `step-03-c-design-tenant-isolation.md` to design tenant payment isolation.
