---
name: tenant-portal-template
description: Design tenant self-service portal for multi-tenant SaaS platforms
category: tenant
version: 1.0.0
type: template
web_research_enabled: true
source_verification: true
---

# Tenant Self-Service Portal Design: {{project_name}}

## Document Metadata

| Field | Value |
|-------|-------|
| Version | {{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Status | {{status}} |

## Executive Summary

{{executive_summary}}

## Portal Overview

### Purpose and Goals

| Goal | Description | Success Metric |
|------|-------------|----------------|
| Self-Service | {{self_service_desc}} | {{self_service_metric}} |
| Visibility | {{visibility_desc}} | {{visibility_metric}} |
| Control | {{control_desc}} | {{control_metric}} |
| Efficiency | {{efficiency_desc}} | {{efficiency_metric}} |

### Target Users

| User Type | Primary Tasks | Access Level |
|-----------|---------------|--------------|
| Tenant Admin | {{admin_tasks}} | {{admin_access}} |
| Tenant User | {{user_tasks}} | {{user_access}} |
| Billing Contact | {{billing_tasks}} | {{billing_access}} |
| Technical Contact | {{technical_tasks}} | {{technical_access}} |

## Feature Specifications

### Dashboard Module

| Feature | Description | Tier Availability |
|---------|-------------|-------------------|
| Usage Overview | {{usage_overview_desc}} | {{usage_overview_tiers}} |
| Health Status | {{health_status_desc}} | {{health_status_tiers}} |
| Quick Actions | {{quick_actions_desc}} | {{quick_actions_tiers}} |
| Notifications | {{notifications_desc}} | {{notifications_tiers}} |

#### Dashboard Widgets

| Widget | Data Source | Refresh Rate | Customizable |
|--------|-------------|--------------|--------------|
| API Usage | {{api_usage_source}} | {{api_usage_refresh}} | {{api_usage_custom}} |
| Error Rate | {{error_rate_source}} | {{error_rate_refresh}} | {{error_rate_custom}} |
| Active Users | {{active_users_source}} | {{active_users_refresh}} | {{active_users_custom}} |
| Cost Tracker | {{cost_tracker_source}} | {{cost_tracker_refresh}} | {{cost_tracker_custom}} |

### User Management Module

| Feature | Description | Permissions Required |
|---------|-------------|---------------------|
| User Invite | {{invite_desc}} | {{invite_permissions}} |
| User List | {{list_desc}} | {{list_permissions}} |
| Role Assignment | {{role_desc}} | {{role_permissions}} |
| User Deactivation | {{deactivate_desc}} | {{deactivate_permissions}} |

#### Role Configuration

| Role | Permissions | Scope | Editable |
|------|-------------|-------|----------|
| Admin | {{admin_perms}} | {{admin_scope}} | {{admin_editable}} |
| Developer | {{dev_perms}} | {{dev_scope}} | {{dev_editable}} |
| Viewer | {{viewer_perms}} | {{viewer_scope}} | {{viewer_editable}} |
| Custom | {{custom_perms}} | {{custom_scope}} | {{custom_editable}} |

### API Management Module

| Feature | Description | Tier Availability |
|---------|-------------|-------------------|
| API Key Management | {{api_key_desc}} | {{api_key_tiers}} |
| Usage Analytics | {{usage_analytics_desc}} | {{usage_analytics_tiers}} |
| Rate Limit View | {{rate_limit_desc}} | {{rate_limit_tiers}} |
| Webhook Config | {{webhook_config_desc}} | {{webhook_config_tiers}} |

#### API Key Operations

| Operation | Confirmation | Audit Log | Notification |
|-----------|--------------|-----------|--------------|
| Create Key | {{create_confirm}} | {{create_audit}} | {{create_notify}} |
| Rotate Key | {{rotate_confirm}} | {{rotate_audit}} | {{rotate_notify}} |
| Revoke Key | {{revoke_confirm}} | {{revoke_audit}} | {{revoke_notify}} |
| View Usage | {{view_confirm}} | {{view_audit}} | {{view_notify}} |

### Billing Module

| Feature | Description | Access Control |
|---------|-------------|----------------|
| Invoice History | {{invoice_desc}} | {{invoice_access}} |
| Payment Methods | {{payment_desc}} | {{payment_access}} |
| Usage Details | {{usage_detail_desc}} | {{usage_detail_access}} |
| Plan Management | {{plan_mgmt_desc}} | {{plan_mgmt_access}} |

#### Billing Capabilities by Tier

| Capability | Free | Pro | Enterprise |
|------------|------|-----|------------|
| View Invoices | {{free_invoices}} | {{pro_invoices}} | {{enterprise_invoices}} |
| Download Reports | {{free_reports}} | {{pro_reports}} | {{enterprise_reports}} |
| Update Payment | {{free_payment}} | {{pro_payment}} | {{enterprise_payment}} |
| Change Plan | {{free_change}} | {{pro_change}} | {{enterprise_change}} |

### Settings Module

| Setting Category | Settings | Scope | Restrictions |
|------------------|----------|-------|--------------|
| Organization | {{org_settings}} | {{org_scope}} | {{org_restrictions}} |
| Security | {{security_settings}} | {{security_scope}} | {{security_restrictions}} |
| Notifications | {{notif_settings}} | {{notif_scope}} | {{notif_restrictions}} |
| Integrations | {{integration_settings}} | {{integration_scope}} | {{integration_restrictions}} |

### Support Module

| Feature | Description | Response SLA |
|---------|-------------|--------------|
| Ticket Creation | {{ticket_create_desc}} | {{ticket_create_sla}} |
| Knowledge Base | {{kb_desc}} | {{kb_sla}} |
| Status Page | {{status_desc}} | {{status_sla}} |
| Live Chat | {{chat_desc}} | {{chat_sla}} |

## User Experience

### Navigation Structure

| Section | Primary Nav | Secondary Nav | Breadcrumb |
|---------|-------------|---------------|------------|
| Dashboard | {{dashboard_nav}} | {{dashboard_secondary}} | {{dashboard_breadcrumb}} |
| Users | {{users_nav}} | {{users_secondary}} | {{users_breadcrumb}} |
| API | {{api_nav}} | {{api_secondary}} | {{api_breadcrumb}} |
| Billing | {{billing_nav}} | {{billing_secondary}} | {{billing_breadcrumb}} |
| Settings | {{settings_nav}} | {{settings_secondary}} | {{settings_breadcrumb}} |

### Responsive Design

| Breakpoint | Layout | Navigation | Features |
|------------|--------|------------|----------|
| Desktop (>1200px) | {{desktop_layout}} | {{desktop_nav}} | {{desktop_features}} |
| Tablet (768-1200px) | {{tablet_layout}} | {{tablet_nav}} | {{tablet_features}} |
| Mobile (<768px) | {{mobile_layout}} | {{mobile_nav}} | {{mobile_features}} |

### Accessibility Requirements

| Standard | Requirement | Implementation |
|----------|-------------|----------------|
| WCAG 2.1 AA | {{wcag_requirement}} | {{wcag_implementation}} |
| Keyboard Navigation | {{keyboard_requirement}} | {{keyboard_implementation}} |
| Screen Reader | {{screen_reader_requirement}} | {{screen_reader_implementation}} |
| Color Contrast | {{contrast_requirement}} | {{contrast_implementation}} |

## Security Implementation

### Authentication

| Method | Configuration | Session Policy |
|--------|---------------|----------------|
| SSO | {{sso_config}} | {{sso_session}} |
| Password | {{password_config}} | {{password_session}} |
| MFA | {{mfa_config}} | {{mfa_session}} |

### Authorization

| Resource | Permission Model | Enforcement |
|----------|------------------|-------------|
| User Data | {{user_data_model}} | {{user_data_enforce}} |
| Billing Info | {{billing_model}} | {{billing_enforce}} |
| API Keys | {{api_keys_model}} | {{api_keys_enforce}} |
| Settings | {{settings_model}} | {{settings_enforce}} |

### Audit Logging

| Action | Logged Fields | Retention |
|--------|---------------|-----------|
| Login | {{login_fields}} | {{login_retention}} |
| User Changes | {{user_change_fields}} | {{user_change_retention}} |
| API Key Operations | {{api_key_fields}} | {{api_key_retention}} |
| Billing Actions | {{billing_fields}} | {{billing_retention}} |

## Technical Architecture

### Frontend Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Framework | {{frontend_framework}} | {{framework_rationale}} |
| State Management | {{state_mgmt}} | {{state_rationale}} |
| UI Library | {{ui_library}} | {{ui_rationale}} |
| API Client | {{api_client}} | {{api_client_rationale}} |

### API Integration

| Endpoint Category | Authentication | Rate Limit |
|-------------------|----------------|------------|
| User Management | {{user_auth}} | {{user_rate}} |
| Billing | {{billing_auth}} | {{billing_rate}} |
| Analytics | {{analytics_auth}} | {{analytics_rate}} |
| Configuration | {{config_auth}} | {{config_rate}} |

### Caching Strategy

| Data Type | Cache Location | TTL | Invalidation |
|-----------|----------------|-----|--------------|
| User Profile | {{profile_cache}} | {{profile_ttl}} | {{profile_invalidation}} |
| Usage Data | {{usage_cache}} | {{usage_ttl}} | {{usage_invalidation}} |
| Billing Info | {{billing_cache}} | {{billing_ttl}} | {{billing_invalidation}} |

## Tier-Based Features

### Feature Matrix

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| User Limit | {{free_user_limit}} | {{pro_user_limit}} | {{enterprise_user_limit}} |
| API Key Limit | {{free_api_limit}} | {{pro_api_limit}} | {{enterprise_api_limit}} |
| Analytics Retention | {{free_analytics}} | {{pro_analytics}} | {{enterprise_analytics}} |
| Custom Branding | {{free_branding}} | {{pro_branding}} | {{enterprise_branding}} |
| SSO | {{free_sso}} | {{pro_sso}} | {{enterprise_sso}} |

### Upgrade Prompts

| Trigger | Feature | CTA | Placement |
|---------|---------|-----|-----------|
| User Limit | {{user_limit_feature}} | {{user_limit_cta}} | {{user_limit_placement}} |
| Analytics | {{analytics_feature}} | {{analytics_cta}} | {{analytics_placement}} |
| API Keys | {{api_feature}} | {{api_cta}} | {{api_placement}} |

---

## Verification Checklist

### Feature Completeness

- [ ] Dashboard module implemented
- [ ] User management functional
- [ ] API key management operational
- [ ] Billing integration complete
- [ ] Settings configuration available
- [ ] Support channels connected

### Security

- [ ] Authentication flows tested
- [ ] Authorization enforced
- [ ] Audit logging enabled
- [ ] Session management secure
- [ ] Input validation complete

### User Experience

- [ ] Responsive design tested
- [ ] Accessibility audit passed
- [ ] Navigation intuitive
- [ ] Loading states implemented
- [ ] Error handling graceful

### Integration

- [ ] API endpoints connected
- [ ] Real-time updates working
- [ ] Webhooks configured
- [ ] SSO integrated
- [ ] Billing system synced

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "tenant self-service portal best practices SaaS {date}"
- "multi-tenant admin dashboard design patterns {date}"
- "SaaS billing portal UX patterns {date}"
- "role-based access control portal implementation {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Appendix

### Wireframes

{{wireframes_reference}}

### Design System

{{design_system_reference}}

### Related Documents

- Master Architecture: `{{master_architecture_link}}`
- UX Design Spec: `{{ux_spec_link}}`
- API Documentation: `{{api_docs_link}}`

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial portal design |
