# Step 1: Identify Training Requirements

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

Identify all compliance training requirements based on applicable frameworks, workforce roles, and regulatory mandates.

## Prerequisites

- Compliance frameworks identified
- Workforce roles documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Actions

### 1. Map Framework Training Requirements

| Framework | Training Requirement | Reference | Frequency |
|-----------|---------------------|-----------|-----------|
| HIPAA | Security awareness | 164.308(a)(5) | Annual |
| SOC 2 | Security training | CC1.4 | Annual |
| GDPR | Data protection | Art. 39 | Annual |
| PCI DSS | Security awareness | Req 12.6 | Annual |

### 2. Define Role-Based Requirements

| Role Category | Required Training | Additional Training |
|---------------|-------------------|---------------------|
| All employees | Security awareness, code of conduct | - |
| Developers | Secure coding, OWASP | Framework-specific |
| IT Operations | Incident response, access management | PCI-DSS specific |
| HR | Privacy, data handling | HIPAA for healthcare |
| Executives | Risk management, compliance overview | Board responsibilities |

### 3. Document Timing Requirements

| Requirement Type | Timing | Grace Period |
|------------------|--------|--------------|
| New hire | Within 30 days | None |
| Annual renewal | Before anniversary | 30 days |
| Role change | Within 14 days | None |
| Policy update | Within 30 days of update | 14 days |

### 4. Identify Assessment Requirements

| Training Type | Assessment Method | Pass Score | Retake Policy |
|---------------|-------------------|------------|---------------|
| Security awareness | Quiz | 80% | 2 retakes, then manager |
| Secure coding | Practical exam | 85% | Unlimited with cooldown |
| Privacy | Knowledge check | 80% | 2 retakes |
| Incident response | Tabletop exercise | Pass/Fail | Remediation training |

**Verify current best practices with web search:**
Search the web: "compliance training requirements best practices {date}"
Search the web: "HIPAA security training requirements {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### [A] Analyse - Requirements Analysis
- **A1**: Analyze framework-specific training mandates
- **A2**: Evaluate role-based training matrix
- **A3**: Assess training frequency requirements
- **A4**: Review assessment effectiveness

### [P] Propose - Requirements Recommendations
- **P1**: Propose training requirement prioritization
- **P2**: Suggest role-based training paths
- **P3**: Recommend training frequency optimization
- **P4**: Propose assessment improvement

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 2 (Design Curriculum) - load `step-02-c-design-curriculum.md`
- **C2**: Return to workflow overview
- **C3**: Export current requirements analysis

---

## Verification

- [ ] Framework requirements identified
- [ ] Role-based requirements defined
- [ ] Timing requirements documented
- [ ] Assessment requirements specified
- [ ] Patterns align with pattern registry

## Outputs

- Framework training requirements matrix
- Role-based training requirements
- Timing and frequency requirements
- Assessment requirements

## Next Step

Proceed to `step-02-c-design-curriculum.md` to design training curriculum.
