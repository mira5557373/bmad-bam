# Step 7: Export Capabilities

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOAD **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- NOTES Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- REFERENCE Reference pattern registry `web_queries` for search topics


---

## Purpose

Define data export capabilities for tenant analytics including formats, scheduling, and GDPR Article 20 compliance.

---

## Prerequisites

- Processing architecture defined (Step 6)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: export,compliance

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define export capabilities for tenant analytics:

## Export Types

| Export Type | Description | Formats | Frequency |
|-------------|-------------|---------|-----------|
| Dashboard Export | Current dashboard view | PDF, PNG | On-demand |
| Report Export | Scheduled reports | PDF, Excel, CSV | Scheduled |
| Data Export | Raw or aggregated data | CSV, JSON, Parquet | On-demand |
| Full Data Export | GDPR Article 20 | JSON, CSV | On-demand |

## Format Specifications

### PDF Export

```yaml
pdf_export:
  # Page setup
  page_size: A4
  orientation: auto  # Landscape for wide dashboards
  margins: 20mm
  
  # Content
  include:
    - dashboard_title
    - timestamp
    - tenant_branding
    - all_widgets
    - footer_with_page_numbers
    
  # Chart rendering
  chart_rendering:
    resolution: 150_dpi
    format: vector_when_possible
    
  # Scheduling
  schedule:
    enabled: true
    frequencies: [daily, weekly, monthly]
    delivery: [email, s3_bucket]
```

### Excel Export

```yaml
excel_export:
  # Workbook structure
  structure:
    summary_sheet: first
    data_sheets: per_widget
    raw_data_sheet: optional
    
  # Formatting
  formatting:
    auto_column_width: true
    header_style: bold_with_background
    number_format: locale_aware
    
  # Data limits
  limits:
    max_rows: 1_000_000
    max_columns: 16_384
    
  # Features
  features:
    pivot_tables: enabled
    charts: embedded
    formulas: summary_only
```

### CSV Export

```yaml
csv_export:
  # Format options
  encoding: UTF-8
  delimiter: comma  # Or semicolon for EU locales
  quote_style: minimal
  
  # Header handling
  headers:
    include: true
    format: snake_case
    
  # Large exports
  large_exports:
    streaming: enabled
    chunk_size: 10_000_rows
    compression: gzip
```

### JSON Export

```yaml
json_export:
  # Format options
  format: newline_delimited  # NDJSON for large exports
  pretty_print: optional
  
  # Schema
  schema_version: "1.0"
  include_metadata: true
  
  # Large exports
  large_exports:
    streaming: enabled
    compression: gzip
```

## Scheduled Reports

```yaml
scheduled_reports:
  # Report definitions
  templates:
    - name: daily_usage_summary
      schedule: "0 8 * * *"
      timezone: tenant_timezone
      content:
        - kpi_summary
        - usage_trends
        - top_features
      format: pdf
      delivery: email
      
    - name: weekly_performance
      schedule: "0 9 * * 1"
      content:
        - performance_overview
        - error_analysis
        - sla_compliance
      format: [pdf, excel]
      delivery: [email, dashboard]
      
    - name: monthly_billing
      schedule: "0 6 1 * *"
      content:
        - usage_breakdown
        - cost_by_service
        - comparison_vs_quota
      format: pdf
      delivery: email
      
  # Delivery options
  delivery:
    email:
      from: "reports@{platform_domain}"
      subject_template: "{report_name} - {date}"
      attach_or_link: attach_if_small
      
    s3_bucket:
      bucket: "{tenant_id}-reports"
      path: "{report_type}/{year}/{month}/"
      
    webhook:
      enabled: true
      retry_policy: exponential_backoff
```

## GDPR Article 20 Compliance

```yaml
gdpr_data_export:
  # Scope
  data_included:
    - all_tenant_data
    - all_user_data
    - analytics_history
    - configuration
    - audit_logs
    
  # Format requirements
  format:
    primary: json
    alternative: csv
    machine_readable: true
    structured: true
    
  # Process
  process:
    request_via: tenant_portal
    verification: admin_approval
    processing_time: max_30_days
    notification: email_on_ready
    
  # Security
  security:
    encryption: aes_256
    password_protected: true
    download_link_expiry: 7_days
    audit_logged: true
    
  # Data transformation
  transformation:
    anonymize_other_users: true
    include_schema: true
    human_readable_field_names: true
```

## Export Audit Trail

```yaml
export_audit:
  # Log all exports
  log_fields:
    - timestamp
    - user_id
    - tenant_id
    - export_type
    - format
    - row_count
    - file_size
    - ip_address
    - user_agent
    
  # Retention
  retention: 2_years
  
  # Alerts
  alerts:
    large_export:
      threshold: 100_000_rows
      notify: security_team
      
    bulk_exports:
      threshold: 10_exports_per_hour
      notify: security_team
```

## Export Rate Limits

| Tier | On-demand Exports | Scheduled Reports | Data Size Limit |
|------|-------------------|-------------------|-----------------|
| Free | 10/day | 2/month | 10 MB |
| Pro | 100/day | 20/month | 100 MB |
| Enterprise | Unlimited | Unlimited | 1 GB |

**Verify current best practices with web search:**
Search the web: "analytics data export best practices SaaS {date}"
Search the web: "GDPR Article 20 data portability implementation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After defining export capabilities, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific export formats or GDPR requirements
- **P (Party Mode)**: Bring compliance officer and product manager perspectives on exports
- **C (Continue)**: Accept export capabilities and proceed to access control
- **[Specific refinements]**: Describe additional export requirements

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: export formats, scheduling, GDPR compliance
- Process enhanced insights on export capabilities
- Ask user: "Accept this detailed export analysis? (y/n)"
- If yes, integrate into export specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review export capabilities for tenant analytics"
- Process compliance officer and product manager perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save export capabilities to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Proceed to next step: `step-08-c-access-control.md`

---

## Verification

- [ ] Export types defined
- [ ] Format specifications documented
- [ ] Scheduled reports configured
- [ ] GDPR Article 20 compliance implemented
- [ ] Export audit trail specified
- [ ] Rate limits by tier established
- [ ] Patterns align with pattern registry

---

## Outputs

- Export capabilities specification
- Scheduled reports configuration
- GDPR compliance documentation

---

## Next Step

Proceed to `step-08-c-access-control.md` to define access control.
