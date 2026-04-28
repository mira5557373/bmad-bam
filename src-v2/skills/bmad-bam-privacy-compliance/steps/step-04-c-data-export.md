# Step 04: Design Data Portability Implementation

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Focus: Design data export and portability per GDPR Article 20
- Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- Context: Maintain tenant isolation during export operations
- Do NOT: Implement consent collection (step 5)
- Use web search: Verify data portability format standards

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Data export formats and schemas
- Tenant-isolated export pipelines
- Direct transfer (tenant-to-tenant)
- CCPA disclosure requirements

**OUT OF SCOPE:**
- Consent management (step 5)
- Erasure workflows (covered in step 2)
- Validation (separate mode)

## Purpose

Design the data portability system for GDPR Article 20 (right to data portability) and CCPA disclosure requirements, ensuring tenant-isolated exports in machine-readable formats.

## Prerequisites

- Steps 1-3 completed
- Data discovery architecture from step 2
- **Load context:** `{project-root}/_bmad/bam/data/domains/compliance.md`

## Actions

### 1. Define Export Data Categories

Identify what data is portable under Article 20:

| Data Category | Portable | Format | Notes |
|---------------|----------|--------|-------|
| **User-provided data** | Yes | JSON/CSV | Name, email, profile |
| **Activity data** | Yes | JSON/CSV | Actions user took |
| **Transaction data** | Yes | JSON/CSV | Purchases, invoices |
| **Uploaded files** | Yes | Original format | Documents, images |
| **Inferred data** | No | N/A | Analytics, predictions |
| **Third-party data** | Conditional | JSON | If user provided |

**Web Research Directive:**
```
Search the web: "GDPR data portability machine readable format {date}"
Search the web: "CCPA right to know response format {date}"
```

### 2. Design Export Format Schema

```yaml
export_formats:
  # Standard JSON export
  json_export:
    structure:
      metadata:
        export_date: ISO8601
        tenant_id: uuid
        subject_id: uuid
        data_categories: string[]
        format_version: "1.0"
        
      personal_data:
        profile:
          name: string
          email: string
          phone: string | null
          created_at: ISO8601
          
        preferences:
          language: string
          timezone: string
          notifications: object
          
        activity:
          events: array
          last_login: ISO8601
          session_count: number
          
      transactions:
        purchases: array
        subscriptions: array
        invoices: array
        
      uploaded_content:
        files: array  # Metadata only, files separate
        documents: array
        
    encoding: UTF-8
    compression: gzip
    
  # CSV export for spreadsheet compatibility
  csv_export:
    files:
      - profile.csv
      - activity.csv
      - transactions.csv
      - files_manifest.csv
    delimiter: comma
    encoding: UTF-8
    header: true
    
  # Direct transfer format
  transfer_format:
    protocol: HTTPS
    authentication: OAuth2
    payload: JSON
    schema_url: string
```

### 3. Design Tenant-Isolated Export Pipeline

```yaml
export_pipeline:
  # Request handling
  request:
    authentication: required
    identity_verification: required
    tenant_validation: required
    rate_limiting:
      per_subject: 1/day
      per_tenant: 100/day
      
  # Data collection (tenant-isolated)
  collection:
    sources:
      database:
        query_template: "SELECT * FROM {table} WHERE tenant_id = ? AND subject_id = ?"
        rls_enforcement: always
        
      file_storage:
        path_template: "s3://{bucket}/{tenant_id}/{subject_id}/"
        listing: tenant_scoped
        
      search_index:
        filter: "tenant_id:{tenant_id} AND subject_id:{subject_id}"
        
    # Parallel collection with timeout
    execution:
      parallel: true
      timeout_per_source: 60s
      retry_policy: 3_attempts
      
  # Compilation
  compilation:
    aggregation:
      merge_sources: true
      deduplicate: by_record_id
      
    formatting:
      primary: json
      alternative: csv
      
    packaging:
      archive: zip
      encryption: optional  # Subject can request
      max_size: 5GB
      
  # Delivery
  delivery:
    method:
      - download_link  # 24-hour expiry
      - email_notification
      - direct_transfer  # Article 20(2)
      
    security:
      link_expiry: 24h
      download_limit: 5
      audit_logged: true
```

### 4. Design Direct Transfer Capability

Support for Article 20(2) - direct transfer to another controller:

```yaml
direct_transfer:
  # Recipient registration
  recipient_registry:
    registration:
      controller_name: string
      controller_domain: string
      api_endpoint: URL
      oauth_config: object
      data_schemas_supported: string[]
      
    verification:
      domain_verification: DNS_TXT
      api_compatibility: schema_check
      security_assessment: required
      
  # Transfer workflow
  transfer_workflow:
    initiation:
      subject_request: required
      recipient_selection: from_registry
      data_categories: user_selected
      
    authorization:
      subject_consent: explicit
      recipient_acceptance: webhook
      
    execution:
      format: json
      protocol: HTTPS_POST
      authentication: OAuth2
      
    confirmation:
      sender_receipt: generated
      recipient_acknowledgment: required
      audit_record: created
      
  # Rollback
  failure_handling:
    retry_attempts: 3
    notification: subject_and_admin
    compensation: none  # Data already sent
```

### 5. Design CCPA Disclosure Response

For California Consumer Privacy Act (CCPA) disclosures:

```yaml
ccpa_disclosure:
  # Categories to disclose (12-month lookback)
  categories:
    collected:
      - identifiers
      - commercial_info
      - internet_activity
      - geolocation
      - professional_info
      
    sources:
      - directly_from_consumer
      - service_providers
      - third_parties
      
    purposes:
      - service_provision
      - marketing
      - analytics
      - security
      
    sold_or_shared:
      - list_third_parties
      - data_categories_shared
      
  # Response format
  response_format:
    summary:
      what_collected: categories_list
      where_from: sources_list
      why_collected: purposes_list
      who_shared_with: recipients_list
      
    detail:
      specific_pieces: json_export
      
  # Timeline
  timeline:
    acknowledgment: 10_days
    response: 45_days
    extension: +45_days_if_complex
```

### 6. Document Data Export Design

```markdown
## Data Portability Design

### Portable Data Categories
[Table from step 1]

### Export Formats
- **JSON:** Primary machine-readable format
- **CSV:** Spreadsheet-compatible alternative
- **Direct Transfer:** Controller-to-controller

### Export Pipeline
1. Request validation and identity verification
2. Tenant-isolated data collection (parallel)
3. Data compilation and formatting
4. Secure packaging and delivery

### Direct Transfer Support
- Recipient registry with verification
- OAuth2 authentication
- Subject-initiated transfers

### CCPA Disclosure
- 12-month lookback
- Category-based disclosure
- 45-day response timeline

### Tenant Isolation
- RLS enforcement on all queries
- Path-based file isolation
- Audit logging for all exports
```

## Verification

- [ ] Portable data categories identified
- [ ] Export format schemas defined
- [ ] Tenant-isolated pipeline designed
- [ ] Direct transfer capability specified
- [ ] CCPA disclosure format designed
- [ ] Web research completed for format standards

## Outputs

- Data export format specifications
- Export pipeline architecture
- Direct transfer workflow
- CCPA disclosure template

---

## SUCCESS METRICS:

- [ ] All portable data categories covered
- [ ] Machine-readable formats specified
- [ ] Tenant isolation maintained
- [ ] User confirmed design via A/P/C menu
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing data sources:** Cannot design collection - return to step 2
- **Format conflicts:** Use Advanced Elicitation (A) to clarify requirements
- **Transfer complexity:** Use Party Mode (P) for stakeholder alignment
- **User rejects design:** Iterate on approach, do not force acceptance

## Next Step

Proceed to `step-05-c-consent-management.md` to design consent workflow.

---

**Navigation:** Enter 'C' to continue to next step
