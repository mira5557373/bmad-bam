# Step 3: Design Tenant Payment Isolation

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

Design tenant-specific payment isolation controls ensuring cardholder data is properly segregated across tenants while maintaining PCI-DSS compliance.

## Prerequisites

- PCI-DSS controls designed (Step 2 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`


---

## Inputs

- Security control matrix from Step 2
- Tenant model requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Tenant isolation patterns

---

## Actions

### 1. Design Per-Tenant Key Management

Define encryption key isolation:

| Key Type | Scope | Management | Rotation | Tenant Access |
|----------|-------|------------|----------|---------------|
| Master Key | Platform | HSM | Annual | Platform only |
| Tenant KEK | Per-tenant | HSM-derived | Quarterly | Tenant admin |
| Data Keys | Per-transaction | KEK-derived | Per-use | System only |
| Token Keys | Per-tenant | KMS | Monthly | System only |

### 2. Design Tenant Payment Data Segregation

Define data isolation per tenant model:

| Tenant Model | CHD Isolation | Token Isolation | Audit Isolation |
|--------------|---------------|-----------------|-----------------|
| RLS | Row-level policies | Tenant column | Tenant filter |
| Schema | Separate schemas | Schema-scoped | Schema prefix |
| Database | Dedicated DB | DB-scoped | Separate DB |

### 3. Design Tenant Audit Logging

Define tenant-scoped audit requirements:

| Event Type | Data Captured | Tenant Scope | Retention |
|------------|---------------|--------------|-----------|
| Payment Request | Masked PAN, amount, timestamp | Per-tenant | 1 year |
| Access Attempt | User, action, resource, result | Per-tenant | 1 year |
| Key Operation | Key ID, operation, timestamp | Per-tenant | 3 years |
| Configuration Change | Setting, old/new value, user | Per-tenant | 3 years |

### 4. Design Cross-Tenant Isolation Verification

Define isolation testing requirements:

| Test Type | Frequency | Method | Pass Criteria |
|-----------|-----------|--------|---------------|
| Data Leakage Test | Quarterly | Automated | Zero cross-tenant |
| Access Control Test | Monthly | Penetration | No unauthorized |
| Key Isolation Test | Quarterly | Crypto verification | Key uniqueness |
| Audit Segregation | Monthly | Log analysis | Proper filtering |

### 5. Design Tenant Payment API Isolation

Define API-level controls:

| Control | Implementation | Tenant Scope |
|---------|----------------|--------------|
| API Authentication | Tenant API keys | Per-tenant credentials |
| Rate Limiting | Per-tenant quotas | Isolated limits |
| Request Validation | Tenant context check | Mandatory validation |
| Response Filtering | Tenant data only | Strict filtering |

**Verify current best practices with web search:**
Search the web: "PCI DSS multi-tenant data isolation best practices {date}"
Search the web: "multi-tenant encryption key management PCI {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-3 complete the CDE scoping, security controls, and tenant isolation design.**

Present summary to user:
- CDE scope and network segmentation
- Security control coverage (all 12 requirements)
- Tenant payment isolation approach

Ask for confirmation before proceeding to PCI-DSS specification creation.

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

### [A] Analyse - Tenant Isolation Analysis
- **A1**: Analyze key management architecture security
- **A2**: Evaluate data segregation effectiveness
- **A3**: Assess audit logging completeness per tenant
- **A4**: Review isolation verification coverage

### [P] Propose - Isolation Recommendations
- **P1**: Propose HSM-based key hierarchy design
- **P2**: Suggest tenant isolation testing automation
- **P3**: Recommend audit log aggregation architecture
- **P4**: Propose tenant compliance dashboard

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 4 (Create PCI-DSS Spec) - load `step-04-c-create-pci-spec.md`
- **C2**: Return to workflow overview
- **C3**: Export current tenant isolation design

---

## Verification

- [ ] Per-tenant key management designed
- [ ] Data segregation approach defined
- [ ] Audit logging scoped per tenant
- [ ] Isolation verification tests specified
- [ ] API isolation controls defined
- [ ] Patterns align with pattern registry

## Outputs

- Tenant key management architecture
- Data segregation design
- Tenant audit logging requirements
- Isolation verification test plan
- API isolation controls

## Next Step

Proceed to `step-04-c-create-pci-spec.md` to create the comprehensive PCI-DSS compliance specification.
