# Step 1: Inventory Control Evidence

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

Create a comprehensive inventory of control evidence requirements, mapping each control to required evidence types, sources, and responsible parties.

## Prerequisites

- Compliance controls documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Actions

### 1. Map Controls to Evidence

| Control ID | Control Description | Evidence Type | Evidence Source | Owner |
|------------|---------------------|---------------|-----------------|-------|
| CC6.1 | Logical access controls | Access logs, RBAC config | IAM system | Security |
| CC6.2 | Authentication | MFA configs, auth logs | Auth provider | Security |
| CC7.2 | System monitoring | Alert configs, dashboards | SIEM | Operations |
| PI1.1 | Data handling | DPA, privacy notices | Legal docs | Legal |

### 2. Identify Evidence Sources

| Source Type | Systems | Data Format | Collection Method |
|-------------|---------|-------------|-------------------|
| System logs | Auth, access, audit | JSON/Syslog | API export |
| Configurations | IAM, network, security | YAML/JSON | Config snapshot |
| Documentation | Policies, procedures | PDF/Markdown | Document repo |
| Screenshots | UI configurations | PNG | Manual capture |

### 3. Define Evidence Quality Requirements

| Quality Dimension | Requirement | Validation Method |
|-------------------|-------------|-------------------|
| Completeness | Full audit period covered | Date range check |
| Accuracy | Reflects actual state | Control testing |
| Integrity | Tamper-evident | Hash verification |
| Timeliness | Within audit period | Timestamp validation |

### 4. Assess Automation Opportunities

| Evidence Type | Current Method | Automation Option | Effort |
|---------------|----------------|-------------------|--------|
| Access logs | Manual export | API scheduled export | Low |
| Config snapshots | Manual capture | CI/CD integration | Medium |
| Policy docs | File share | Document management | Low |
| Screenshots | Manual | Automated capture | High |

**Verify current best practices with web search:**
Search the web: "audit evidence collection best practices {date}"
Search the web: "SOC 2 evidence automation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### [A] Analyse - Evidence Analysis
- **A1**: Analyze evidence gaps per control
- **A2**: Evaluate automation feasibility
- **A3**: Assess evidence quality risks
- **A4**: Review multi-tenant evidence isolation

### [P] Propose - Evidence Recommendations
- **P1**: Propose evidence automation roadmap
- **P2**: Suggest evidence management platform
- **P3**: Recommend evidence retention policies
- **P4**: Propose evidence review workflow

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 2 (Design Evidence Collection) - load `step-02-c-design-collection.md`
- **C2**: Return to workflow overview
- **C3**: Export current evidence inventory

---

## Verification

- [ ] All controls mapped to evidence
- [ ] Evidence sources identified
- [ ] Quality requirements defined
- [ ] Automation opportunities assessed
- [ ] Patterns align with pattern registry

## Outputs

- Control-to-evidence mapping
- Evidence source inventory
- Quality requirements
- Automation assessment

## Next Step

Proceed to `step-02-c-design-collection.md` to design evidence collection procedures.
