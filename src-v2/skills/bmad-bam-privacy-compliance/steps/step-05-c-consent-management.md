# Step 05: Design Consent Management Workflow

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Focus: Design consent collection, tracking, and withdrawal workflows
- Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- Context: Compile final privacy compliance document
- Do NOT: Begin implementation or validation
- Use web search: Verify consent UX best practices and regulatory requirements

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Consent collection workflows
- Granular consent management
- Consent withdrawal mechanisms
- Consent proof/evidence capture
- Final document compilation

**OUT OF SCOPE:**
- Rights fulfillment (step 2)
- Lawful basis (step 3)
- Data export (step 4)

## Purpose

Design the consent management workflow for collecting, tracking, and withdrawing consent per GDPR requirements, including granular consent options and robust proof of consent capture.

## Prerequisites

- Steps 1-4 completed
- Processing activities requiring consent identified (step 3)
- **Load context:** `{project-root}/_bmad/bam/data/domains/compliance.md`

## Actions

### 1. Define Consent Requirements

Map processing activities to consent requirements:

| Processing Activity | Consent Type | Granularity | Withdrawal |
|---------------------|--------------|-------------|------------|
| Marketing emails | Explicit | Per channel | Immediate |
| Newsletter | Explicit | Per topic | Immediate |
| Analytics cookies | Explicit | Per category | Immediate |
| AI personalization | Explicit | Per feature | Immediate |
| Data sharing (3rd party) | Explicit | Per partner | Immediate |
| Profile enrichment | Explicit | Per source | Immediate |

**GDPR Consent Requirements:**
- Freely given (no bundling)
- Specific (per purpose)
- Informed (clear explanation)
- Unambiguous (affirmative action)
- Withdrawable (easy to revoke)

**Web Research Directive:**
```
Search the web: "GDPR consent management UX best practices {date}"
Search the web: "granular consent implementation patterns {date}"
```

### 2. Design Consent Collection Workflow

```yaml
consent_collection:
  # Consent points in user journey
  collection_points:
    registration:
      required_consents:
        - terms_of_service  # Contract basis, not consent
      optional_consents:
        - marketing_email
        - product_updates
        - third_party_offers
        
    first_login:
      optional_consents:
        - analytics_cookies
        - personalization
        
    feature_access:
      triggered_by: feature_requiring_consent
      consents:
        - ai_recommendations
        - data_enrichment
        
    preference_center:
      all_consents: manageable
      bulk_actions: true
      
  # Collection UI requirements
  ui_requirements:
    no_pre_checked: true
    clear_language: required
    purpose_explanation: per_consent
    withdrawal_info: visible
    no_dark_patterns: required
    equal_prominence: accept_and_reject
    
  # Double opt-in (recommended)
  double_opt_in:
    enabled: true
    workflow:
      - initial_consent
      - confirmation_email
      - confirmation_click
      - consent_activated
    expiry: 48_hours
```

### 3. Design Consent Proof Capture

```yaml
consent_proof:
  # Evidence captured per consent
  evidence_record:
    consent_id: uuid
    tenant_id: uuid
    subject_id: uuid
    purpose_id: uuid
    
    # What was consented to
    consent_text: string
    version: semver
    language: ISO_639_1
    
    # When and how
    granted_at: ISO8601
    method: enum[checkbox, toggle, button, double_opt_in]
    
    # Context
    collection_point: string
    ip_address: string  # Hashed for privacy
    user_agent: string
    session_id: uuid
    
    # UI proof
    screenshot_hash: string | null
    form_version: string
    
  # Integrity
  integrity:
    hash_algorithm: SHA256
    signed: true
    tamper_evident: true
    
  # Retention
  retention:
    duration: processing_duration + 5_years
    deletion: on_subject_erasure
```

### 4. Design Consent Withdrawal Workflow

```yaml
consent_withdrawal:
  # Withdrawal mechanisms
  mechanisms:
    preference_center:
      access: always_available
      authentication: required
      immediate_effect: true
      
    one_click_unsubscribe:
      scope: email_consent_only
      authentication: token_in_link
      immediate_effect: true
      
    api:
      endpoint: "DELETE /api/v1/consents/{consent_id}"
      authentication: required
      immediate_effect: true
      
    support_request:
      channel: [email, chat, phone]
      verification: identity_check
      processing_time: 24_hours
      
  # Withdrawal effects
  effects:
    immediate:
      - stop_processing
      - update_consent_record
      - trigger_downstream_updates
      
    downstream_propagation:
      - marketing_systems
      - analytics_platforms
      - third_party_integrations
      
  # Confirmation
  confirmation:
    notification: email
    content:
      - consent_withdrawn
      - effective_date
      - resubscription_info
      
  # Audit
  audit:
    withdrawal_logged: true
    retention: same_as_consent
```

### 5. Design Granular Consent Management

```yaml
granular_consent:
  # Consent categories
  categories:
    essential:
      description: "Required for service operation"
      user_configurable: false
      lawful_basis: contract
      
    analytics:
      description: "Understanding how you use our service"
      user_configurable: true
      default: false
      subcategories:
        - usage_analytics
        - performance_monitoring
        - error_tracking
        
    marketing:
      description: "Promotional communications"
      user_configurable: true
      default: false
      subcategories:
        - email_marketing
        - product_updates
        - partner_offers
        
    personalization:
      description: "Customized experience"
      user_configurable: true
      default: false
      subcategories:
        - ai_recommendations
        - content_personalization
        - advertising
        
  # Preference center UI
  preference_center:
    sections:
      - category_overview
      - subcategory_toggles
      - partner_list
      - consent_history
      
    actions:
      - accept_all
      - reject_all
      - save_preferences
      - download_preferences
      
    accessibility:
      wcag_level: AA
      keyboard_navigation: true
      screen_reader: compatible
```

### 6. Compile Final Privacy Compliance Document

Compile all steps into the final document:

```markdown
# Privacy Compliance Design

## Document Metadata
- **Created:** {{date}}
- **Version:** 1.0
- **Tenant Model:** {tenant_model}
- **Applicable Frameworks:** [GDPR | CCPA | Both]

## 1. Compliance Context
[From step 1: frameworks, scope, sub-workflows]

## 2. Data Subject Rights Implementation
[From step 2: rights mapping, data discovery, timeline automation]

## 3. Lawful Basis Tracking
[From step 3: processing activities, basis model, LIA workflow, audit trail]

## 4. Data Portability
[From step 4: export formats, pipeline, direct transfer, CCPA disclosure]

## 5. Consent Management
[This step: collection workflow, proof capture, withdrawal, granular consent]

## Quality Gate Checklist (QG-CC)
- [ ] All data subject rights implemented
- [ ] Lawful basis documented for all processing
- [ ] Consent proof captured with integrity
- [ ] Data export within timeline requirements
- [ ] Withdrawal effective immediately
- [ ] **CRITICAL:** Cross-tenant data isolation verified

## Next Steps
1. Run Validate mode to verify QG-CC compliance
2. Proceed to `bmad-bam-compliance-mapping` for control mapping
3. Proceed to `bmad-bam-audit-logging` for audit implementation
```

**Load template:** `{project-root}/_bmad/bam/data/templates/privacy-compliance-template.md`

## Verification

- [ ] Consent requirements mapped to processing activities
- [ ] Collection workflow designed
- [ ] Consent proof capture specified
- [ ] Withdrawal workflow documented
- [ ] Granular consent UI designed
- [ ] Final document compiled
- [ ] Web research completed for consent UX best practices

## Outputs

- `{output_folder}/planning-artifacts/compliance/privacy-compliance.md`
- Consent collection workflow
- Consent proof schema
- Preference center specifications

---

## SUCCESS METRICS:

- [ ] All consent requirements addressed
- [ ] GDPR consent criteria met
- [ ] Tenant isolation maintained
- [ ] User confirmed design via A/P/C menu
- [ ] Final artifact created at output location
- [ ] Frontmatter stepsCompleted updated to [1,2,3,4,5]

## FAILURE MODES:

- **Missing processing activities:** Cannot map consents - return to step 3
- **UX conflicts:** Use Advanced Elicitation (A) to clarify requirements
- **Stakeholder disagreement:** Use Party Mode (P) for alignment
- **User rejects design:** Iterate on approach, do not force acceptance

## Next Step

Create mode complete. Run **Validate mode** to verify against QG-CC criteria.

---

**Navigation:** Enter 'V' to switch to Validate mode, or 'E' to edit
