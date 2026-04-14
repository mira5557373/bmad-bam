# Step 1: Scope Cardholder Data Environment

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

Define the Cardholder Data Environment (CDE) boundaries, identify all systems that store, process, or transmit cardholder data, and establish the scope of PCI-DSS compliance requirements.

## Prerequisites

- Master architecture document completed
- Tenant model isolation defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: PCI-DSS


---

## Inputs

- User requirements and constraints for PCI-DSS compliance
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Identify Cardholder Data Elements

Catalog all cardholder data within the platform:

| Data Element | PCI DSS Definition | Storage Location | Retention |
|--------------|-------------------|------------------|-----------|
| PAN | Primary Account Number | {Location} | {Policy} |
| Cardholder Name | Name on card | {Location} | {Policy} |
| Service Code | 3-digit code | {Location} | {Policy} |
| Expiration Date | Card expiry | {Location} | {Policy} |
| CVV/CVC | Card verification | **NEVER STORE** | N/A |
| PIN/PIN Block | Cardholder PIN | **NEVER STORE** | N/A |

### 2. Map CDE System Components

Identify all systems within CDE scope:

| System Type | Systems | In CDE Scope | Connected Systems |
|-------------|---------|--------------|-------------------|
| Payment Gateway | {List} | Yes | {Connected} |
| Database Servers | {List} | {Yes/No} | {Connected} |
| Application Servers | {List} | {Yes/No} | {Connected} |
| Network Devices | {List} | {Yes/No} | {Connected} |
| Web Servers | {List} | {Yes/No} | {Connected} |
| API Gateways | {List} | {Yes/No} | {Connected} |

### 3. Document Payment Data Flows

Map cardholder data movement:

| Flow ID | Source | Destination | CHD Elements | Encryption |
|---------|--------|-------------|--------------|------------|
| PCI-001 | Customer Browser | Payment Gateway | PAN, CVV | TLS 1.3 |
| PCI-002 | Payment Gateway | Processor | PAN, Token | mTLS |
| PCI-003 | Processor | Database | Token only | AES-256 |

### 4. Determine SAQ Level

Assess Self-Assessment Questionnaire eligibility:

| SAQ Type | Criteria | Applicable |
|----------|----------|------------|
| SAQ A | Card-not-present, fully outsourced | {Yes/No} |
| SAQ A-EP | E-commerce with redirect/iframe | {Yes/No} |
| SAQ B | Imprint/standalone terminals | {Yes/No} |
| SAQ C | Payment app systems | {Yes/No} |
| SAQ D | All others (full PCI DSS) | {Yes/No} |

### 5. Define Network Segmentation

Document CDE network boundaries:

| Zone | Purpose | CDE Status | Firewall Rules |
|------|---------|------------|----------------|
| Payment Zone | CHD processing | In-scope | Strict ingress/egress |
| Application Zone | App servers | Connected | Limited access |
| Database Zone | Data storage | In-scope | Database-only |
| Management Zone | Admin access | Connected | Jump host only |

**Verify current best practices with web search:**
Search the web: "PCI DSS v4.0 CDE scoping best practices {date}"
Search the web: "PCI DSS network segmentation requirements {date}"

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

### [A] Analyse - CDE Scope Analysis
- **A1**: Analyze third-party payment integrations for scope impact
- **A2**: Evaluate tokenization strategy for scope reduction
- **A3**: Assess cloud provider shared responsibility for PCI
- **A4**: Review multi-tenant CDE isolation requirements

### [P] Propose - Scope Recommendations
- **P1**: Propose scope reduction through tokenization
- **P2**: Suggest network segmentation architecture
- **P3**: Recommend payment processor selection criteria
- **P4**: Propose tenant-specific CDE isolation approach

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 2 (Design Security Controls) - load `step-02-c-design-controls.md`
- **C2**: Return to workflow overview
- **C3**: Export current CDE scope analysis

---

## Verification

- [ ] All cardholder data elements identified
- [ ] CDE system components cataloged
- [ ] Payment data flows mapped
- [ ] SAQ level determined
- [ ] Network segmentation defined
- [ ] Patterns align with pattern registry

## Outputs

- Cardholder data inventory
- CDE scope diagram
- Payment data flow diagram
- SAQ level determination
- Network segmentation requirements

## Next Step

Proceed to `step-02-c-design-controls.md` to design PCI-DSS security controls.
