# Step 2: Design Audit Logging Architecture

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

Design comprehensive audit logging architecture that satisfies compliance requirements while maintaining tenant isolation and performance.

## Prerequisites

- Applicable compliance frameworks identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Audit Event Schema

Design the core audit event structure referencing patterns from `audit-logging-patterns.md`:

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| id | string | Unique event identifier | Always |
| timestamp | datetime | Event occurrence time (UTC) | Always |
| tenant_id | string | Tenant context identifier | Always |
| actor | object | Who performed the action | Always |
| action | object | What action was performed | Always |
| resource | object | What resource was affected | Always |
| changes | object | Before/after state changes | Conditional |
| context | object | Request and correlation context | Always |
| compliance | object | Framework and control markers | Conditional |

### 2. Define Event Categories

Categorize audit events by type:

| Category | Description | Examples | Retention |
|----------|-------------|----------|-----------|
| authentication | Login, logout, session events | Login success/failure, MFA | 2 years |
| authorization | Permission checks and grants | Role assignment, access denied | 2 years |
| data_access | Read operations on sensitive data | View PII, export data | 7 years |
| data_modification | Create, update, delete operations | Record CRUD, bulk updates | 7 years |
| configuration | System and tenant configuration | Settings change, feature toggle | 7 years |
| administrative | Admin operations | User provisioning, role changes | 7 years |
| security | Security-related events | Password change, key rotation | 7 years |
| billing | Billing and metering events | Subscription change, payment | 7 years |

### 3. Design Storage Architecture

Define audit log storage requirements:

| Requirement | Specification |
|-------------|---------------|
| Immutability | Write-once, append-only storage |
| Encryption | AES-256 at rest, TLS 1.3 in transit |
| Tenant Isolation | Logical isolation via tenant_id partition |
| High Availability | Multi-region replication |
| Search Capability | Full-text search within 30 seconds |
| Archival | Cold storage after retention threshold |

### 4. Define Retention Policies

Map retention requirements to frameworks:

| Framework | Minimum Retention | Data Types | Archive Strategy |
|-----------|-------------------|------------|------------------|
| SOC 2 | 1 year | Security events | 7 years cold |
| GDPR | Duration of processing + 3 years | PII access | Delete after retention |
| HIPAA | 6 years | PHI access | 7 years immutable |
| PCI DSS | 1 year online, 3 years archive | CHD access | Secure deletion |
| SOX | 7 years | Financial records | 7 years immutable |

### 5. Design Real-time Processing

Define real-time audit event processing:

| Processing Type | Use Case | SLA |
|-----------------|----------|-----|
| Streaming | Security alerting | < 5 seconds |
| Near Real-time | Compliance dashboards | < 1 minute |
| Batch | Compliance reports | < 1 hour |

## Soft Gate Checkpoint

**Steps 1-2 complete the audit event schema and storage design.**

Present a summary of:
- Audit event schema structure
- Event categories and retention policies
- Storage architecture decisions

Ask for confirmation before proceeding to control mapping.

**Verify current best practices with web search:**
Search the web: "design audit logging architecture best practices {date}"
Search the web: "design audit logging architecture enterprise SaaS {date}"

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

### [A] Analyse - Audit Logging Analysis
- **A1**: Analyze SOC 2 CC7.2 audit logging requirements coverage
- **A2**: Evaluate HIPAA 164.312(b) audit control specifications
- **A3**: Assess GDPR Article 30 records of processing compliance
- **A4**: Review multi-tenant audit log isolation patterns

### [P] Propose - Audit Architecture Recommendations
- **P1**: Propose framework-compliant event schema extensions
- **P2**: Suggest retention policy optimization across frameworks
- **P3**: Recommend audit log immutability implementation approach
- **P4**: Propose real-time compliance alerting thresholds

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 3 (Map Controls) - load `step-03-c-map-controls.md`
- **C2**: Return to Step 1 (Identify Frameworks)
- **C3**: Export audit logging architecture design

---

## Verification

- [ ] Audit event schema defined comprehensively
- [ ] All event categories covered
- [ ] Storage architecture supports immutability
- [ ] Retention policies align with framework requirements
- [ ] Tenant isolation maintained in design
- [ ] Patterns align with pattern registry

## Outputs

- Audit event schema definition
- Event category catalog
- Storage architecture specification
- Retention policy matrix

## Next Step

Proceed to `step-03-c-map-controls.md` to map controls to compliance frameworks.
