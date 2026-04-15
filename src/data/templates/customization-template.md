---
name: Customization Template
description: Template for per-tenant customization specification including theming, feature flags, and white-label options
category: architecture
version: 1.0.0
type: "tenant"
---

## Purpose

Template for per-tenant customization specification including theming, feature flags, and white-label options

# Per-Tenant Customization Specification

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

## Overview

### 1.1 Purpose

This document specifies the per-tenant customization strategy for {{project_name}}, defining how tenants can customize their experience through theming, feature flags, configuration, and white-label options.

### 1.2 Customization Model

| Model | Description | Use Case |
|-------|-------------|----------|
| Platform Default | Standard configuration for all tenants | Starter/free tiers |
| Tenant Configuration | Per-tenant settings without code changes | Pro tiers |
| White-Label | Full branding customization | Enterprise tiers |
| Custom Extensions | Tenant-specific code extensions | Enterprise+ tiers |

**Selected Model:** {{customization_model}}

---

## Customization Strategy

### 2.1 Strategy Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  Customization Architecture                  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Platform Defaults                    │   │
│  │  (Base themes, features, configurations)              │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│                           ▼                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Tier Customization                    │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐              │   │
│  │  │  Free   │  │   Pro   │  │Enterprise│              │   │
│  │  │ (Base)  │  │ (+Config)│  │(+White  │              │   │
│  │  │         │  │         │  │  Label) │              │   │
│  │  └─────────┘  └─────────┘  └─────────┘              │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│                           ▼                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │               Per-Tenant Overrides                     │   │
│  │  (Theme, features, extensions per tenant)             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Customization Layers

| Layer | Precedence | Scope | Mutable at Runtime |
|-------|------------|-------|-------------------|
| Platform defaults | 1 (lowest) | All tenants | No |
| Tier defaults | 2 | Tenants in tier | No |
| Tenant configuration | 3 | Single tenant | Yes |
| User preferences | 4 (highest) | Single user | Yes |

### 2.3 Customization Categories

| Category | Examples | Storage | Validation |
|----------|----------|---------|------------|
| Theming | Colors, fonts, logos | {{theming_storage}} | CSS validation |
| Features | Module access, limits | {{feature_storage}} | Schema validation |
| Configuration | API settings, defaults | {{config_storage}} | Type validation |
| Extensions | Custom components, hooks | {{extension_storage}} | Security scan |
| White-Label | Domain, branding, emails | {{whitelabel_storage}} | DNS + asset validation |

---

## Theming Configuration

### 3.1 Theme Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Theme Resolution                          │
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Request   │───►│   Tenant    │───►│   Theme     │     │
│  │  (tenant_id)│    │   Resolver  │    │   Service   │     │
│  └─────────────┘    └─────────────┘    └──────┬──────┘     │
│                                               │              │
│                     ┌─────────────────────────┴─────┐       │
│                     ▼                               ▼       │
│              ┌─────────────┐              ┌─────────────┐   │
│              │   Theme     │              │   Asset     │   │
│              │   Cache     │              │   CDN       │   │
│              └─────────────┘              └─────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Theme Properties

| Property | Type | Default | Customizable By |
|----------|------|---------|-----------------|
| primary_color | hex | {{default_primary_color}} | Pro+ |
| secondary_color | hex | {{default_secondary_color}} | Pro+ |
| accent_color | hex | {{default_accent_color}} | Pro+ |
| background_color | hex | {{default_background_color}} | Pro+ |
| text_color | hex | {{default_text_color}} | Pro+ |
| font_family | string | {{default_font_family}} | Enterprise |
| font_size_base | px | {{default_font_size}} | Pro+ |
| border_radius | px | {{default_border_radius}} | Pro+ |
| logo_url | url | {{default_logo_url}} | Pro+ |
| favicon_url | url | {{default_favicon_url}} | Enterprise |
| custom_css | text | null | Enterprise |

### 3.3 Theme Configuration Schema

```yaml
tenant_theme:
  tenant_id: "{{tenant_id}}"
  theme_id: "{{theme_id}}"
  version: {{theme_version}}
  colors:
    primary: "{{primary_color}}"
    secondary: "{{secondary_color}}"
    accent: "{{accent_color}}"
    background: "{{background_color}}"
    text: "{{text_color}}"
    error: "{{error_color}}"
    warning: "{{warning_color}}"
    success: "{{success_color}}"
  typography:
    font_family: "{{font_family}}"
    font_size_base: {{font_size_base}}
    heading_scale: {{heading_scale}}
    line_height: {{line_height}}
  spacing:
    unit: {{spacing_unit}}
    scale: [{{spacing_scale}}]
  borders:
    radius: {{border_radius}}
    width: {{border_width}}
  shadows:
    enabled: {{shadows_enabled}}
    intensity: {{shadow_intensity}}
  branding:
    logo_url: "{{logo_url}}"
    logo_alt: "{{logo_alt}}"
    favicon_url: "{{favicon_url}}"
  custom:
    css: "{{custom_css}}"
    variables: {{custom_variables}}
```

### 3.4 Theme Caching Strategy

| Cache Layer | TTL | Invalidation |
|-------------|-----|--------------|
| CDN edge | {{cdn_theme_ttl}} | On theme update |
| Application cache | {{app_theme_ttl}} | On tenant update |
| Browser cache | {{browser_theme_ttl}} | Version-based |

---

## Feature Flags

### 4.1 Feature Flag Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Feature Flag System                         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Feature Flag Service                      │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │  Platform   │  │    Tier     │  │   Tenant    │   │   │
│  │  │   Flags     │  │   Flags     │  │   Flags     │   │   │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │   │
│  │         └─────────────────┼─────────────────┘         │   │
│  │                           ▼                           │   │
│  │                   ┌─────────────┐                     │   │
│  │                   │  Evaluator  │                     │   │
│  │                   │  (Context)  │                     │   │
│  │                   └──────┬──────┘                     │   │
│  │                          │                            │   │
│  │                   ┌──────▼──────┐                     │   │
│  │                   │  Decision   │                     │   │
│  │                   │  (on/off)   │                     │   │
│  │                   └─────────────┘                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Feature Flag Types

| Type | Description | Evaluation Context |
|------|-------------|-------------------|
| Release | Gradual rollout control | Tenant + percentage |
| Experiment | A/B testing variants | Tenant + user + cohort |
| Operational | Kill switches, maintenance | Global |
| Permission | Feature access control | Tenant + tier |
| Entitlement | Paid feature gating | Tenant + subscription |

### 4.3 Feature Flag Matrix

| Feature | Flag Key | Type | Default | Free | Pro | Enterprise |
|---------|----------|------|---------|------|-----|------------|
| AI Agents | {{ai_agents_flag}} | Permission | off | off | on | on |
| Custom Workflows | {{custom_workflows_flag}} | Permission | off | off | on | on |
| API Access | {{api_access_flag}} | Permission | off | limited | full | full |
| Webhooks | {{webhooks_flag}} | Permission | off | off | on | on |
| SSO | {{sso_flag}} | Permission | off | off | off | on |
| Audit Logs | {{audit_logs_flag}} | Permission | basic | basic | extended | full |
| White-Label | {{whitelabel_flag}} | Permission | off | off | off | on |
| Advanced Analytics | {{analytics_flag}} | Permission | off | off | on | on |
| Custom Integrations | {{integrations_flag}} | Permission | off | off | limited | full |
| Priority Support | {{support_flag}} | Permission | off | off | on | on |

### 4.4 Feature Flag Evaluation

| Context | Data Source | Priority |
|---------|-------------|----------|
| tenant_id | Request header / JWT | Required |
| user_id | Session / JWT | Optional |
| tier | Tenant metadata | Required |
| subscription | Billing service | Required |
| cohort | Experiment service | Optional |
| percentage | Random seed | Optional |

### 4.5 Feature Flag Configuration

```yaml
feature_flags:
  tenant_id: "{{tenant_id}}"
  evaluated_at: "{{evaluation_timestamp}}"
  flags:
    - key: "{{flag_key}}"
      enabled: {{flag_enabled}}
      value: "{{flag_value}}"
      source: "{{flag_source}}"
    - key: "{{flag_key_2}}"
      enabled: {{flag_enabled_2}}
      value: "{{flag_value_2}}"
      conditions:
        - type: percentage
          value: {{rollout_percentage}}
        - type: cohort
          value: "{{cohort_name}}"
```

---

## Tenant-Specific Configuration

### 5.1 Configuration Categories

| Category | Scope | Examples |
|----------|-------|----------|
| Business | Tenant operations | Company name, timezone, locale |
| Technical | Integration settings | API keys, endpoints, timeouts |
| Limits | Resource constraints | Storage, API calls, users |
| Notifications | Communication prefs | Email, Slack, webhooks |
| AI Settings | Agent configuration | Models, prompts, tools |

### 5.2 Configuration Schema

```yaml
tenant_config:
  tenant_id: "{{tenant_id}}"
  version: {{config_version}}
  updated_at: "{{config_updated_at}}"
  
  business:
    company_name: "{{company_name}}"
    industry: "{{industry}}"
    timezone: "{{timezone}}"
    locale: "{{locale}}"
    date_format: "{{date_format}}"
    currency: "{{currency}}"
  
  technical:
    api_version: "{{api_version}}"
    webhook_url: "{{webhook_url}}"
    webhook_secret: "{{webhook_secret}}"
    retry_policy:
      max_attempts: {{retry_max_attempts}}
      backoff_multiplier: {{backoff_multiplier}}
    timeout_ms: {{timeout_ms}}
  
  limits:
    max_users: {{max_users}}
    max_storage_gb: {{max_storage_gb}}
    max_api_calls_per_day: {{max_api_calls}}
    max_agents: {{max_agents}}
    max_workflows: {{max_workflows}}
  
  notifications:
    email_enabled: {{email_enabled}}
    slack_webhook: "{{slack_webhook}}"
    alert_channels:
      - type: "{{alert_type}}"
        destination: "{{alert_destination}}"
  
  ai_settings:
    default_model: "{{default_model}}"
    temperature: {{temperature}}
    max_tokens: {{max_tokens}}
    enabled_tools: [{{enabled_tools}}]
    custom_prompts:
      - name: "{{prompt_name}}"
        content: "{{prompt_content}}"
```

### 5.3 Configuration Validation Rules

| Field | Validation | Error Message |
|-------|------------|---------------|
| timezone | IANA timezone format | Invalid timezone identifier |
| locale | BCP 47 format | Invalid locale code |
| webhook_url | HTTPS URL | Webhooks require HTTPS |
| max_users | >= 1, <= tier_limit | User limit exceeds tier allowance |
| max_storage_gb | >= 0, <= tier_limit | Storage limit exceeds tier |
| temperature | 0.0 - 2.0 | Temperature must be 0-2 |

### 5.4 Configuration Inheritance

| Source | Override Allowed | Merge Strategy |
|--------|------------------|----------------|
| Platform defaults | Yes | Deep merge |
| Tier defaults | Yes | Deep merge |
| Tenant config | N/A | Base config |
| Runtime overrides | Limited | Shallow merge |

---

## Extension Points

### 6.1 Extension Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Extension System                           │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                Extension Registry                       │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐ │  │
│  │  │  Hooks  │  │  UI     │  │  API    │  │  Agent  │ │  │
│  │  │         │  │ Widgets │  │Endpoints│  │  Tools  │ │  │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘ │  │
│  │       └────────────┼────────────┼────────────┘      │  │
│  │                    ▼            ▼                    │  │
│  │              ┌─────────────────────┐                 │  │
│  │              │   Extension Loader   │                 │  │
│  │              │   (Sandbox + Auth)   │                 │  │
│  │              └─────────────────────┘                 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Extension Types

| Type | Description | Isolation | Tier Required |
|------|-------------|-----------|---------------|
| Hooks | Event listeners | In-process | Pro+ |
| UI Widgets | Custom components | iframe sandbox | Enterprise |
| API Endpoints | Custom REST/GraphQL | Container | Enterprise |
| Agent Tools | Custom AI tools | Sandbox | Enterprise |
| Data Connectors | External integrations | Container | Pro+ |
| Workflow Actions | Custom workflow steps | Sandbox | Pro+ |

### 6.3 Hook Points

| Hook | Trigger | Payload | Response Expected |
|------|---------|---------|-------------------|
| pre_auth | Before authentication | credentials | Allow/deny |
| post_auth | After authentication | user_context | Enrichment |
| pre_action | Before any action | action_context | Transform/cancel |
| post_action | After any action | result_context | Transform |
| pre_agent_run | Before AI agent | agent_context | Inject context |
| post_agent_run | After AI agent | agent_result | Transform |
| on_error | On any error | error_context | Handle/escalate |
| on_limit_reached | Resource limit hit | limit_context | Handle/notify |

### 6.4 Extension Manifest

```yaml
extension:
  id: "{{extension_id}}"
  name: "{{extension_name}}"
  version: "{{extension_version}}"
  tenant_id: "{{tenant_id}}"
  type: "{{extension_type}}"
  
  permissions:
    - "{{permission_1}}"
    - "{{permission_2}}"
  
  hooks:
    - event: "{{hook_event}}"
      handler: "{{handler_path}}"
      priority: {{hook_priority}}
      async: {{hook_async}}
  
  ui_components:
    - slot: "{{ui_slot}}"
      component: "{{component_url}}"
      props: {{component_props}}
  
  api_routes:
    - method: "{{http_method}}"
      path: "{{route_path}}"
      handler: "{{api_handler}}"
  
  agent_tools:
    - name: "{{tool_name}}"
      description: "{{tool_description}}"
      handler: "{{tool_handler}}"
      schema: {{tool_schema}}
  
  security:
    sandbox_mode: {{sandbox_mode}}
    allowed_domains: [{{allowed_domains}}]
    max_memory_mb: {{max_memory}}
    max_cpu_ms: {{max_cpu}}
```

### 6.5 Extension Security Controls

| Control | Implementation | Enforcement |
|---------|----------------|-------------|
| Code review | Manual + automated | Before deploy |
| Sandboxing | V8 isolate / container | Runtime |
| Permission model | Capability-based | Runtime |
| Resource limits | CPU/memory/network | Runtime |
| Audit logging | All extension actions | Async |

---

## White-Label Options

### 7.1 White-Label Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   White-Label System                         │
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │  Custom Domain  │  │  Branding       │                   │
│  │  Router         │  │  Service        │                   │
│  └────────┬────────┘  └────────┬────────┘                   │
│           │                    │                            │
│           ▼                    ▼                            │
│  ┌────────────────────────────────────────┐                 │
│  │         Tenant Resolution               │                 │
│  │  ┌──────────┐  ┌──────────┐  ┌───────┐│                 │
│  │  │  Domain  │  │  Assets  │  │ Email ││                 │
│  │  │  Mapping │  │   CDN    │  │ Config││                 │
│  │  └──────────┘  └──────────┘  └───────┘│                 │
│  └────────────────────────────────────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 White-Label Components

| Component | Customizable | Configuration |
|-----------|--------------|---------------|
| Domain | Custom domain + SSL | DNS + cert provisioning |
| Logo | Header, favicon, emails | Asset upload |
| Colors | Full theme control | Theme configuration |
| Email templates | Sender, content, design | Template editor |
| Documentation | Help center, API docs | Content management |
| Mobile app | Icon, splash, name | App store submission |
| Support | Chat widget, email | Support configuration |
| Legal | Terms, privacy, cookies | Document upload |

### 7.3 Custom Domain Configuration

```yaml
white_label_domain:
  tenant_id: "{{tenant_id}}"
  domain: "{{custom_domain}}"
  subdomain: "{{subdomain}}"
  
  dns:
    cname_target: "{{cname_target}}"
    txt_verification: "{{txt_record}}"
    verified: {{dns_verified}}
  
  ssl:
    provider: "{{ssl_provider}}"
    certificate_id: "{{cert_id}}"
    expires_at: "{{cert_expiry}}"
    auto_renew: {{auto_renew}}
  
  routing:
    primary: {{is_primary}}
    redirect_from: [{{redirect_domains}}]
  
  status:
    active: {{domain_active}}
    provisioned_at: "{{provisioned_at}}"
```

### 7.4 Email White-Labeling

| Setting | Description | Example |
|---------|-------------|---------|
| from_name | Sender display name | {{from_name}} |
| from_email | Sender email address | {{from_email}} |
| reply_to | Reply address | {{reply_to}} |
| header_logo | Logo in email header | {{header_logo_url}} |
| footer_text | Footer content | {{footer_text}} |
| unsubscribe_url | Custom unsubscribe | {{unsubscribe_url}} |

### 7.5 White-Label Email Templates

| Template | Variables | Customizable Sections |
|----------|-----------|----------------------|
| Welcome | user_name, tenant_name | Subject, body, CTA |
| Password reset | reset_link, expiry | Subject, body, security note |
| Invitation | inviter, role, link | Subject, body, CTA |
| Notification | title, message, action | Subject, body, action |
| Invoice | amount, due_date, items | Subject, layout, footer |

---

## Customization API

### 8.1 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/v1/customization/theme | GET | Get tenant theme |
| /api/v1/customization/theme | PUT | Update tenant theme |
| /api/v1/customization/features | GET | Get feature flags |
| /api/v1/customization/config | GET | Get tenant config |
| /api/v1/customization/config | PATCH | Update tenant config |
| /api/v1/customization/extensions | GET | List extensions |
| /api/v1/customization/extensions | POST | Install extension |
| /api/v1/customization/whitelabel | GET | Get white-label config |
| /api/v1/customization/whitelabel | PUT | Update white-label |

### 8.2 API Rate Limits

| Operation | Rate Limit | Tier Multiplier |
|-----------|------------|-----------------|
| Read config | {{read_rate}}/min | 1x/2x/5x |
| Update config | {{update_rate}}/min | 1x/2x/5x |
| Extension install | {{install_rate}}/day | 1x/2x/5x |
| Theme preview | {{preview_rate}}/min | 1x/2x/5x |

---

## Customization Governance

### 9.1 Change Management

| Change Type | Approval Required | Rollback Support |
|-------------|-------------------|------------------|
| Theme update | No | Instant |
| Feature flag | Admin | Instant |
| Configuration | Admin | Versioned |
| Extension install | Admin + Security | Manual |
| White-label domain | Admin + Ops | DNS propagation |

### 9.2 Audit Trail

| Event | Logged Data | Retention |
|-------|-------------|-----------|
| Config change | field, old_value, new_value, actor | {{config_audit_retention}} |
| Theme change | theme_id, changes, actor | {{theme_audit_retention}} |
| Extension install | extension_id, version, actor | {{extension_audit_retention}} |
| Feature flag toggle | flag_key, new_state, actor | {{flag_audit_retention}} |

---

## Implementation Checklist

### 10.1 Theming

- [ ] Theme service implemented
- [ ] Theme caching configured
- [ ] CDN integration complete
- [ ] Theme preview available
- [ ] Mobile responsive themes

### 10.2 Feature Flags

- [ ] Flag service deployed
- [ ] Evaluation context complete
- [ ] A/B testing integration
- [ ] Flag dashboard available
- [ ] Gradual rollout support

### 10.3 Configuration

- [ ] Config schema validated
- [ ] Inheritance working
- [ ] API endpoints secured
- [ ] Audit logging enabled
- [ ] Backup/restore tested

### 10.4 Extensions

- [ ] Extension registry deployed
- [ ] Sandbox environment ready
- [ ] Security scanning integrated
- [ ] Permission model enforced
- [ ] Extension marketplace (if applicable)

### 10.5 White-Label

- [ ] Custom domain provisioning
- [ ] SSL automation working
- [ ] Email templates customizable
- [ ] Asset CDN configured
- [ ] Legal documents manageable

---

## Appendix A: Configuration Schema Reference

```yaml
customization_schema:
  version: "{{schema_version}}"
  tenant_model: "{{tenant_model}}"
  
  theme:
    type: object
    required: [colors, typography]
    properties:
      colors:
        type: object
        properties:
          primary: { type: string, format: hex-color }
          secondary: { type: string, format: hex-color }
      typography:
        type: object
        properties:
          font_family: { type: string }
          font_size_base: { type: number, minimum: 10, maximum: 24 }
  
  features:
    type: object
    additionalProperties:
      type: object
      properties:
        enabled: { type: boolean }
        value: { type: string }
  
  config:
    type: object
    additionalProperties: true
    
  extensions:
    type: array
    items:
      type: object
      required: [id, type, permissions]
```

---

## Appendix B: Related Documents

- Pattern: `tenant-customization` in `bam-patterns.csv`
- Tenant Model: `tenant-model-template.md`
- Feature Flags: `experimentation-template.md`
- Security: `encryption-key-management-template.md`

---

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "tenant customization best practices {date}"
- "white-label SaaS multi-tenant patterns {date}"
- "feature flags per-tenant configuration enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] Customization layers are defined with correct precedence order
- [ ] Theme properties are documented with tier-based availability
- [ ] Theme caching strategy includes CDN, application, and browser layers
- [ ] Feature flag types are categorized (release, experiment, permission, entitlement)
- [ ] Feature flag matrix covers all features by tier (Free, Pro, Enterprise)
- [ ] Tenant configuration schema includes all required categories
- [ ] Configuration validation rules enforce tier-appropriate limits
- [ ] Extension types are documented with isolation and security requirements
- [ ] Hook points cover pre/post lifecycle events for actions and agents
- [ ] White-label components include domain, branding, and email customization
- [ ] Custom domain provisioning includes DNS verification and SSL automation
- [ ] Audit trail captures all customization changes with actor and timestamp

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
