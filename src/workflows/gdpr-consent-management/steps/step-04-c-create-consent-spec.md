# Step 4: Create Consent Management Specification

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

Generate the comprehensive GDPR consent management specification document consolidating purpose definitions, collection mechanisms, storage architecture, and preference center requirements.

## Prerequisites

- Purpose definitions (Step 1)
- Collection design (Step 2)
- Storage architecture (Step 3)
- Soft gate checkpoint passed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load template:** `{project-root}/_bmad/bam/templates/gdpr-consent-template.md`


---

## Inputs

- All outputs from Steps 1-3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- GDPR consent template

---

## Actions

### 1. Compile Purpose Section

Document all processing purposes:

| Section | Content | Source |
|---------|---------|--------|
| Processing Activities | Complete activity inventory | Step 1 |
| Lawful Basis Mapping | Article 6 bases per activity | Step 1 |
| Purpose Categories | User-facing categories | Step 1 |
| Purpose Specifications | Article 13/14 details | Step 1 |

### 2. Document Collection Mechanisms

Compile consent collection documentation:

| Collection Type | Count | Compliance Status | Owner |
|-----------------|-------|-------------------|-------|
| Registration Forms | {Count} | Designed | {Owner} |
| Cookie Banners | {Count} | Designed | {Owner} |
| Preference Centers | {Count} | Designed | {Owner} |
| In-app Dialogs | {Count} | Designed | {Owner} |

### 3. Include Storage Architecture

Document consent storage design:

| Component | Implementation | Tenant Isolation |
|-----------|----------------|------------------|
| Consent Records | Database schema | Per tenant model |
| Proof Storage | Object storage | Tenant-scoped |
| Audit Logs | Event stream | Tenant-filtered |
| APIs | REST endpoints | Tenant-authenticated |

### 4. Define Compliance Monitoring

Establish consent compliance monitoring:

| Metric | Threshold | Alert | Dashboard |
|--------|-----------|-------|-----------|
| Consent Rate | Track trend | <50% decline | Consent analytics |
| Withdrawal Rate | Track trend | >10% increase | Privacy dashboard |
| Missing Consent | Zero tolerance | Any missing | Compliance alert |
| Version Currency | Current version | Outdated | Update reminder |

### 5. Generate Consent Management Specification

Create final specification using template:

| Document Section | Content |
|------------------|---------|
| Executive Summary | Scope, GDPR articles covered |
| Processing Purposes | Complete purpose inventory |
| Lawful Basis Mapping | Article 6 justifications |
| Consent Collection | Forms, banners, preference center |
| Consent Storage | Schema, proof, isolation |
| Consent APIs | Endpoint specifications |
| Preference Center | User self-service design |
| Compliance Monitoring | Dashboards, metrics |
| Appendices | Templates, checklists |

**Verify current best practices with web search:**
Search the web: "GDPR consent management documentation requirements {date}"
Search the web: "consent management platform compliance checklist {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A] Analyse - Specification Analysis
- **A1**: Analyze specification completeness against GDPR
- **A2**: Evaluate consent collection UX compliance
- **A3**: Assess storage architecture security
- **A4**: Review API specification completeness

### [P] Propose - Specification Enhancements
- **P1**: Propose consent automation opportunities
- **P2**: Suggest integration with CMP vendors
- **P3**: Recommend consent analytics dashboard
- **P4**: Propose continuous compliance verification

### [C] Continue - Workflow Navigation
- **C1**: Finish Create Mode - export specification to `{output_folder}/planning-artifacts/gdpr-consent-management-spec.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-consent.md`
- **C3**: Switch to Validate Mode - load `step-20-v-load-consent.md`

---

## Verification

- [ ] Purpose section complete
- [ ] Collection mechanisms documented
- [ ] Storage architecture included
- [ ] Compliance monitoring defined
- [ ] Specification exported to output folder
- [ ] Patterns align with pattern registry

## Outputs

- `{output_folder}/planning-artifacts/gdpr-consent-management-spec.md`
- Consent record schema
- Purpose-lawful basis mapping
- Consent collection UI requirements
- Preference center specification
- **Load template:** `{project-root}/_bmad/bam/templates/gdpr-consent-template.md`

## Next Step

Consent management specification complete. Options:
- Switch to Edit mode (`step-10-e-load-consent.md`) for modifications
- Switch to Validate mode (`step-20-v-load-consent.md`) for compliance checks
- Proceed to related workflow (`bmad-bam-right-to-deletion`)
