# Step 03: Design Lawful Basis Tracking

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Focus: Design lawful basis tracking system per GDPR Article 6
- Track: `stepsCompleted: [1, 2, 3]` when complete
- Context: Maintain processing activity awareness
- Do NOT: Implement consent UI (step 5)
- Use web search: Verify lawful basis requirements and enforcement trends

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Lawful basis selection and tracking
- Processing activity documentation
- Legitimate interest assessments
- Legal basis audit trail

**OUT OF SCOPE:**
- Consent collection UI (step 5)
- Data export implementation (step 4)
- Rights fulfillment (step 2)

## Purpose

Design a system for tracking the lawful basis for processing personal data under GDPR Article 6, including legitimate interest assessments, contract basis documentation, and legal obligation tracking.

## Prerequisites

- Steps 1-2 completed
- Processing activities identified
- **Load context:** `{project-root}/_bmad/bam/data/domains/compliance.md`

## Actions

### 1. Map Processing Activities to Lawful Basis

Document each processing activity with its lawful basis:

| Processing Activity | Data Categories | Lawful Basis | Documentation |
|---------------------|-----------------|--------------|---------------|
| Account creation | Email, name | Contract | Terms of Service |
| Service delivery | Usage data | Contract | Service agreement |
| Marketing emails | Email | Consent | Opt-in records |
| Analytics | Behavioral | Legitimate Interest | LIA document |
| Fraud prevention | Transactions | Legitimate Interest | LIA document |
| Tax compliance | Financial | Legal Obligation | Tax regulations |
| AI personalization | Preferences | Consent | Explicit opt-in |

**Web Research Directive:**
```
Search the web: "GDPR lawful basis selection criteria {date}"
Search the web: "legitimate interest assessment template {date}"
```

### 2. Design Lawful Basis Data Model

```yaml
lawful_basis_tracking:
  # Schema for tracking lawful basis per processing activity
  processing_activity:
    id: uuid
    tenant_id: uuid
    name: string
    description: string
    data_categories: string[]
    lawful_basis: enum[consent, contract, legitimate_interest, legal_obligation, vital_interest, public_task]
    created_at: timestamp
    updated_at: timestamp
    
  # For consent-based processing
  consent_record:
    id: uuid
    tenant_id: uuid
    subject_id: uuid
    processing_activity_id: uuid
    purpose: string
    granted_at: timestamp
    withdrawn_at: timestamp | null
    method: enum[checkbox, double_opt_in, explicit]
    proof: json  # IP, timestamp, UI element
    
  # For legitimate interest
  legitimate_interest_assessment:
    id: uuid
    tenant_id: uuid
    processing_activity_id: uuid
    purpose: string
    necessity: string
    balancing_test: string
    safeguards: string[]
    opt_out_mechanism: string
    assessment_date: timestamp
    reviewer: string
    approved: boolean
    
  # For contract basis
  contract_basis:
    id: uuid
    tenant_id: uuid
    processing_activity_id: uuid
    contract_reference: string
    necessity_justification: string
    contract_signed_at: timestamp
    
  # For legal obligation
  legal_obligation:
    id: uuid
    tenant_id: uuid
    processing_activity_id: uuid
    regulation_reference: string
    jurisdiction: string
    retention_period: interval
```

### 3. Design Legitimate Interest Assessment Workflow

```yaml
lia_workflow:
  # Three-part test structure
  assessment_structure:
    part_1_purpose:
      question: "What is the legitimate interest?"
      documentation:
        - business_purpose
        - benefit_to_data_subject
        - benefit_to_third_party
      required: true
      
    part_2_necessity:
      question: "Is the processing necessary for the purpose?"
      documentation:
        - less_intrusive_alternatives_considered
        - proportionality_assessment
        - data_minimization_applied
      required: true
      
    part_3_balancing:
      question: "Do the individual's interests override?"
      documentation:
        - impact_on_individuals
        - reasonable_expectations
        - relationship_with_individual
        - vulnerability_of_subjects
      required: true
      
  # Safeguards to document
  safeguards:
    - opt_out_mechanism
    - transparency_measures
    - data_minimization
    - retention_limits
    - access_controls
    
  # Review requirements
  review_schedule:
    initial: before_processing
    periodic: annual
    trigger: change_in_processing
```

### 4. Design Lawful Basis Audit Trail

```yaml
audit_trail:
  # Every lawful basis change logged
  events:
    - basis_selected:
        who: user_id
        what: processing_activity_id
        basis: lawful_basis
        when: timestamp
        documentation: reference
        
    - consent_granted:
        who: subject_id
        what: processing_activity_id
        when: timestamp
        how: collection_method
        proof: evidence_json
        
    - consent_withdrawn:
        who: subject_id
        what: processing_activity_id
        when: timestamp
        effect: immediate | end_of_period
        
    - lia_approved:
        who: reviewer_id
        what: processing_activity_id
        when: timestamp
        assessment: lia_document_id
        
    - basis_changed:
        who: user_id
        what: processing_activity_id
        from_basis: old_basis
        to_basis: new_basis
        when: timestamp
        reason: string
        
  # Retention for audit
  retention:
    consent_records: duration_of_processing + 5_years
    lia_documents: duration_of_processing + 5_years
    audit_logs: 7_years
```

### 5. Design Processing Register Integration

Connect lawful basis tracking to GDPR Article 30 processing register:

```yaml
processing_register:
  # Article 30(1) required information
  register_entry:
    controller_info:
      name: string
      contact: string
      dpo_contact: string
      
    processing_activity:
      name: string
      purpose: string[]
      lawful_basis: reference  # Link to lawful_basis_tracking
      
    data_subjects:
      categories: string[]
      estimated_count: number
      
    data_categories:
      personal_data: string[]
      special_categories: string[]
      
    recipients:
      internal: string[]
      external: string[]
      third_countries: string[]
      
    transfers:
      countries: string[]
      safeguards: string[]  # SCCs, adequacy, etc.
      
    retention:
      criteria: string
      period: interval
      
    security_measures:
      technical: string[]
      organizational: string[]
      
  # Per-tenant register
  tenant_scoping:
    separate_registers: per_tenant
    consolidated_view: controller_only
```

### 6. Document Lawful Basis Design

```markdown
## Lawful Basis Tracking Design

### Processing Activities Inventory
[Table from step 1]

### Data Model
- Processing activity records with lawful basis
- Consent records with proof of consent
- LIA documents with three-part test
- Contract basis documentation
- Legal obligation references

### Legitimate Interest Assessment Workflow
1. Purpose identification
2. Necessity assessment
3. Balancing test
4. Safeguards documentation
5. Review and approval

### Audit Trail Requirements
- All basis changes logged
- Consent events captured
- LIA approvals recorded
- 7-year retention for audit logs

### Processing Register Integration
- Article 30 compliant register
- Per-tenant isolation
- Automated updates from basis tracking
```

## Verification

- [ ] All processing activities mapped to lawful basis
- [ ] Lawful basis data model designed
- [ ] LIA workflow documented
- [ ] Audit trail requirements specified
- [ ] Processing register integration designed
- [ ] Web research completed for current requirements

## Outputs

- Lawful basis tracking design
- LIA workflow specification
- Audit trail requirements
- Processing register integration

---

## SUCCESS METRICS:

- [ ] All six lawful bases covered
- [ ] Tenant isolation maintained
- [ ] Audit requirements addressed
- [ ] User confirmed design via A/P/C menu
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing processing activities:** Cannot map basis - return to gather activities
- **Unclear legal requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting bases:** Use Party Mode (P) for legal review
- **User rejects design:** Iterate on approach, do not force acceptance

## Next Step

Proceed to `step-04-c-data-export.md` to design data portability implementation.

---

**Navigation:** Enter 'C' to continue to next step
