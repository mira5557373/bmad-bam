---
name: sso-integration-template
description: Template for SSO/SAML/OIDC setup per tenant in multi-tenant environments
category: authentication
version: 1.0.0
type: "integration"
---

## Purpose

Template for SSO/SAML/OIDC setup per tenant in multi-tenant environments

# SSO Integration Specification: {{project_name}}

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## SSO Overview

### 1.1 Integration Identity

| Field | Value |
|-------|-------|
| Identity Provider | {{identity_provider}} |
| Protocol | {{protocol}} |
| Tenant Scope | {{tenant_scope}} |
| User Provisioning | {{user_provisioning}} |
| MFA Support | {{mfa_support}} |

### 1.2 Multi-Tenant Considerations

- Tenant isolation: {{isolation_approach}}
- Tier differentiation: {{tier_strategy}}
- SSO scope: {{sso_scope}}

### 1.3 SSO Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   SSO Integration Architecture                   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Platform (SP)                         │    │
│  │  ┌───────────┐    ┌───────────┐    ┌───────────┐        │    │
│  │  │  Tenant A │    │  Tenant B │    │  Tenant C │        │    │
│  │  │   (SAML)  │    │  (OIDC)   │    │ (Social)  │        │    │
│  │  └─────┬─────┘    └─────┬─────┘    └─────┬─────┘        │    │
│  │        │                │                │               │    │
│  │        └────────────────┼────────────────┘               │    │
│  │                         │                                │    │
│  │                  ┌──────▼──────┐                        │    │
│  │                  │   Auth      │                        │    │
│  │                  │   Router    │                        │    │
│  │                  └──────┬──────┘                        │    │
│  └─────────────────────────┼────────────────────────────────┘    │
│                            │                                      │
│         ┌──────────────────┼──────────────────┐                  │
│         ▼                  ▼                  ▼                  │
│  ┌───────────┐      ┌───────────┐      ┌───────────┐            │
│  │ Okta IdP  │      │ Azure AD  │      │  Google   │            │
│  │ (Tenant A)│      │(Tenant B) │      │ (Tenant C)│            │
│  └───────────┘      └───────────┘      └───────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

### 1.3 Supported Protocols

| Protocol | Version | Use Case | Tier Availability |
|----------|---------|----------|-------------------|
| SAML 2.0 | {{saml_version}} | Enterprise SSO | Enterprise |
| OIDC | {{oidc_version}} | Modern SSO | Pro, Enterprise |
| OAuth 2.0 | {{oauth_version}} | Social login | All |
| LDAP | {{ldap_version}} | On-premise directory | Enterprise |

---

## Tenant SSO Configuration

### 2.1 Per-Tenant SSO Settings

| Setting | Type | Description | Default |
|---------|------|-------------|---------|
| sso_enabled | boolean | Enable SSO for tenant | false |
| sso_protocol | enum | SAML/OIDC/OAuth | N/A |
| sso_provider | string | IdP name (Okta, Azure AD, etc.) | N/A |
| sso_required | boolean | Enforce SSO-only login | false |
| sso_domains | string[] | Email domains for SSO | [] |
| jit_provisioning | boolean | Just-in-time user creation | true |
| default_role | string | Role for JIT-provisioned users | {{default_role}} |

### 2.2 Tenant Configuration Data Model

```yaml
tenant_sso_config:
  tenant_id: uuid
  enabled: boolean
  protocol: enum [saml, oidc, oauth, ldap]
  provider_name: string
  
  # SAML-specific
  saml_config:
    entity_id: string
    sso_url: string
    slo_url: string
    certificate: string
    name_id_format: string
    attribute_mapping: object
    
  # OIDC-specific
  oidc_config:
    issuer: string
    client_id: string
    client_secret: encrypted_string
    authorization_endpoint: string
    token_endpoint: string
    userinfo_endpoint: string
    jwks_uri: string
    scopes: string[]
    
  # Common
  jit_provisioning: boolean
  default_role: string
  allowed_domains: string[]
  require_sso: boolean
  created_at: timestamp
  updated_at: timestamp
```

### 2.3 Tier-Specific SSO Features

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Social login (Google, GitHub) | Yes | Yes | Yes |
| OIDC | No | Yes | Yes |
| SAML 2.0 | No | No | Yes |
| LDAP | No | No | Yes |
| Multiple IdPs | No | No | Yes |
| SCIM provisioning | No | No | Yes |
| Custom attribute mapping | No | Limited | Full |
| SSO enforcement | No | No | Yes |

---

## SAML Integration

### 3.1 SAML Configuration

| Parameter | Description | Example |
|-----------|-------------|---------|
| SP Entity ID | {{sp_entity_id}} | `https://app.example.com/saml/metadata` |
| SP ACS URL | {{sp_acs_url}} | `https://app.example.com/saml/acs` |
| SP SLO URL | {{sp_slo_url}} | `https://app.example.com/saml/slo` |
| SP Certificate | {{sp_cert_location}} | Platform signing certificate |
| Name ID Format | {{name_id_format}} | `emailAddress` |

### 3.2 SAML Attribute Mapping

| SAML Attribute | Platform Field | Required | Default |
|----------------|----------------|----------|---------|
| {{saml_attr_1}} | email | Yes | N/A |
| {{saml_attr_2}} | first_name | No | "User" |
| {{saml_attr_3}} | last_name | No | "" |
| {{saml_attr_4}} | groups | No | [] |
| {{saml_attr_5}} | {{custom_field}} | No | {{custom_default}} |

### 3.3 SAML Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        SAML SSO Flow                             │
│                                                                  │
│  User             SP (Platform)              IdP (Customer)     │
│   │                    │                          │              │
│   │──1. Access app────►│                          │              │
│   │                    │                          │              │
│   │◄─2. Redirect to IdP│                          │              │
│   │────────────────────┼─────3. Auth request─────►│              │
│   │                    │                          │              │
│   │◄─────────────────────────4. Login page────────│              │
│   │                    │                          │              │
│   │──────────────────────────5. Credentials──────►│              │
│   │                    │                          │              │
│   │◄─────────────────────────6. SAML Response─────│              │
│   │────7. POST to ACS──┼─────────────────────────►│              │
│   │                    │                          │              │
│   │                    │──8. Validate assertion───│              │
│   │                    │──9. Create/update user───│              │
│   │                    │──10. Create session──────│              │
│   │◄──11. Redirect to app                         │              │
│   │                    │                          │              │
└─────────────────────────────────────────────────────────────────┘
```

### 3.4 SAML Security Requirements

| Requirement | Implementation | Verification |
|-------------|----------------|--------------|
| Assertion signed | {{assertion_sign}} | {{assertion_verify}} |
| Response signed | {{response_sign}} | {{response_verify}} |
| Assertion encrypted | {{assertion_encrypt}} | {{encrypt_verify}} |
| Replay prevention | {{replay_prevention}} | {{replay_verify}} |
| Clock skew tolerance | {{clock_skew}} | {{clock_verify}} |

---

## OIDC Integration

### 4.1 OIDC Configuration

| Parameter | Description | Example |
|-----------|-------------|---------|
| Client ID | {{client_id_desc}} | Provided by IdP |
| Client Secret | {{client_secret_desc}} | Securely stored |
| Issuer | {{issuer_desc}} | `https://idp.example.com` |
| Redirect URI | {{redirect_uri}} | `https://app.example.com/oidc/callback` |
| Scopes | {{scopes}} | `openid profile email` |

### 4.2 OIDC Claim Mapping

| OIDC Claim | Platform Field | Required | Notes |
|------------|----------------|----------|-------|
| sub | external_id | Yes | Unique identifier |
| email | email | Yes | User email |
| given_name | first_name | No | |
| family_name | last_name | No | |
| groups | groups | No | Role mapping |
| {{custom_claim}} | {{custom_field}} | No | {{custom_notes}} |

### 4.3 OIDC Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        OIDC SSO Flow                             │
│                                                                  │
│  User             SP (Platform)              IdP (Customer)     │
│   │                    │                          │              │
│   │──1. Access app────►│                          │              │
│   │                    │                          │              │
│   │◄─2. Redirect───────│                          │              │
│   │────────────────────┼──3. Auth request────────►│              │
│   │                    │   (code, state, nonce)   │              │
│   │                    │                          │              │
│   │◄─────────────────────────4. Login page────────│              │
│   │──────────────────────────5. Credentials──────►│              │
│   │                    │                          │              │
│   │◄─────────────────────────6. Auth code─────────│              │
│   │────7. Callback─────┼──────────────────────────│              │
│   │                    │                          │              │
│   │                    │──8. Exchange code───────►│              │
│   │                    │◄─9. Tokens (ID, Access)──│              │
│   │                    │                          │              │
│   │                    │──10. Validate ID token───│              │
│   │                    │──11. Create/update user──│              │
│   │◄──12. Session──────│                          │              │
└─────────────────────────────────────────────────────────────────┘
```

### 4.4 Token Handling

| Token | Storage | Usage | Expiration |
|-------|---------|-------|------------|
| ID Token | {{id_token_storage}} | User info extraction | {{id_token_exp}} |
| Access Token | {{access_token_storage}} | API calls to IdP | {{access_token_exp}} |
| Refresh Token | {{refresh_token_storage}} | Token renewal | {{refresh_token_exp}} |

---

## User Provisioning

### 5.1 Provisioning Methods

| Method | Description | When Used |
|--------|-------------|-----------|
| JIT (Just-in-Time) | Create user on first login | Default |
| SCIM | Automated provisioning/deprovisioning | Enterprise |
| Manual | Admin creates users | Fallback |
| Directory Sync | Periodic sync with IdP | Enterprise |

### 5.2 JIT Provisioning Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    JIT Provisioning Flow                         │
│                                                                  │
│  SSO Assertion                Platform                          │
│       │                          │                               │
│       │──1. User authenticated──►│                               │
│       │                          │                               │
│       │                    ┌─────┴─────┐                        │
│       │                    ▼           ▼                        │
│       │              User exists?  No: Create                   │
│       │                    │           │                        │
│       │              Yes: Update  ┌────┴────┐                   │
│       │                    │      │ Map     │                   │
│       │                    │      │ Claims  │                   │
│       │                    │      │ to User │                   │
│       │                    │      └────┬────┘                   │
│       │                    │           │                        │
│       │                    └─────┬─────┘                        │
│       │                          │                               │
│       │                    ┌─────▼─────┐                        │
│       │                    │  Assign   │                        │
│       │                    │  Tenant   │                        │
│       │                    │  + Role   │                        │
│       │                    └───────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 SCIM Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| SCIM Endpoint | {{scim_endpoint}} | Base URL for SCIM API |
| SCIM Token | {{scim_token_location}} | Bearer token for auth |
| User Schema | {{user_schema}} | SCIM user schema |
| Group Schema | {{group_schema}} | SCIM group schema |

### 5.4 SCIM Operations

| Operation | Endpoint | Method | Description |
|-----------|----------|--------|-------------|
| Create User | `/scim/v2/Users` | POST | Provision new user |
| Get User | `/scim/v2/Users/{id}` | GET | Retrieve user |
| Update User | `/scim/v2/Users/{id}` | PUT/PATCH | Update user |
| Delete User | `/scim/v2/Users/{id}` | DELETE | Deprovision user |
| List Users | `/scim/v2/Users` | GET | List users (filtered) |
| Create Group | `/scim/v2/Groups` | POST | Create group |
| Update Group | `/scim/v2/Groups/{id}` | PUT/PATCH | Update membership |

---

## Role and Group Mapping

### 6.1 Role Mapping Strategy

| IdP Group/Role | Platform Role | Tenant Context |
|----------------|---------------|----------------|
| {{idp_group_1}} | {{platform_role_1}} | {{context_1}} |
| {{idp_group_2}} | {{platform_role_2}} | {{context_2}} |
| {{idp_group_3}} | {{platform_role_3}} | {{context_3}} |
| Default | {{default_role}} | Current tenant |

### 6.2 Group Mapping Configuration

```yaml
group_mapping:
  tenant_id: {{tenant_id}}
  mappings:
    - idp_group: "{{idp_admin_group}}"
      platform_role: "tenant_admin"
      auto_assign: true
      
    - idp_group: "{{idp_user_group}}"
      platform_role: "user"
      auto_assign: true
      
    - idp_group: "{{idp_readonly_group}}"
      platform_role: "viewer"
      auto_assign: true
      
  default_role: "user"
  strip_domain: true
  case_insensitive: true
```

### 6.3 Role Sync Behavior

| Scenario | Behavior | Configurable |
|----------|----------|--------------|
| Group added in IdP | Add role in platform | Yes |
| Group removed in IdP | Remove role in platform | Yes |
| User deactivated in IdP | {{deactivate_behavior}} | Yes |
| Conflicting roles | {{conflict_behavior}} | Yes |

---

## Session Management

### 7.1 Session Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| Session duration | {{session_duration}} | Max session length |
| Idle timeout | {{idle_timeout}} | Inactivity timeout |
| Concurrent sessions | {{concurrent_sessions}} | Max active sessions |
| Session binding | {{session_binding}} | IP/device binding |

### 7.2 Single Logout (SLO)

| SLO Type | Support | Implementation |
|----------|---------|----------------|
| SP-initiated | {{sp_slo_support}} | {{sp_slo_impl}} |
| IdP-initiated | {{idp_slo_support}} | {{idp_slo_impl}} |
| Back-channel | {{back_channel_support}} | {{back_channel_impl}} |
| Front-channel | {{front_channel_support}} | {{front_channel_impl}} |

### 7.3 Session Termination Events

| Event | Action | Propagation |
|-------|--------|-------------|
| User logout | {{logout_action}} | {{logout_propagation}} |
| IdP session end | {{idp_end_action}} | {{idp_end_propagation}} |
| User deactivated | {{deactivate_action}} | {{deactivate_propagation}} |
| SSO config changed | {{config_change_action}} | {{config_change_propagation}} |

---

## Multi-Tenant SSO Security

### 8.1 Tenant Isolation

| Control | Implementation | Verification |
|---------|----------------|--------------|
| IdP configuration isolation | Per-tenant config | Config audit |
| User-tenant binding | Strict validation | Login test |
| Cross-tenant prevention | Domain validation | Attack test |
| Certificate isolation | Per-tenant certs | Cert audit |

### 8.2 Domain Verification

| Step | Action | Verification |
|------|--------|--------------|
| 1 | Tenant claims domain | DNS record required |
| 2 | Add TXT/CNAME record | {{dns_verification}} |
| 3 | Platform verifies DNS | Automated check |
| 4 | Domain activated | SSO enabled for domain |

### 8.3 Security Controls

| Control | Implementation | Notes |
|---------|----------------|-------|
| Certificate validation | {{cert_validation}} | {{cert_notes}} |
| Audience validation | {{audience_validation}} | {{audience_notes}} |
| Issuer validation | {{issuer_validation}} | {{issuer_notes}} |
| Signature validation | {{signature_validation}} | {{signature_notes}} |
| Nonce validation | {{nonce_validation}} | {{nonce_notes}} |

---

## Fallback and Recovery

### 9.1 Login Fallback Options

| Scenario | Fallback | Admin Override |
|----------|----------|----------------|
| IdP unavailable | {{idp_unavailable_fallback}} | {{idp_unavailable_override}} |
| SSO misconfigured | {{misconfig_fallback}} | {{misconfig_override}} |
| User not in IdP | {{not_in_idp_fallback}} | {{not_in_idp_override}} |
| Certificate expired | {{cert_expired_fallback}} | {{cert_expired_override}} |

### 9.2 Emergency Access

| Access Type | Availability | Audit |
|-------------|--------------|-------|
| Break-glass account | {{break_glass_avail}} | {{break_glass_audit}} |
| Admin bypass | {{admin_bypass_avail}} | {{admin_bypass_audit}} |
| Recovery codes | {{recovery_codes_avail}} | {{recovery_codes_audit}} |

### 9.3 SSO Troubleshooting

| Issue | Diagnostic | Resolution |
|-------|------------|------------|
| Auth loop | {{auth_loop_diag}} | {{auth_loop_fix}} |
| Invalid signature | {{sig_invalid_diag}} | {{sig_invalid_fix}} |
| Attribute missing | {{attr_missing_diag}} | {{attr_missing_fix}} |
| Clock skew | {{clock_skew_diag}} | {{clock_skew_fix}} |

---

## Admin Configuration UI

### 10.1 SSO Setup Wizard

| Step | Screen | Actions |
|------|--------|---------|
| 1 | Select protocol | Choose SAML/OIDC |
| 2 | Configure IdP | Enter IdP details |
| 3 | Attribute mapping | Map claims to fields |
| 4 | Test connection | Verify SSO works |
| 5 | Enable SSO | Activate for tenant |

### 10.2 SSO Management Features

| Feature | Access | Notes |
|---------|--------|-------|
| View SSO status | Tenant Admin | |
| Update IdP config | Tenant Admin | |
| Download SP metadata | Tenant Admin | |
| View SSO logs | Tenant Admin | {{log_retention}} |
| Disable SSO | Tenant Admin | Requires confirmation |
| Force SSO | Tenant Admin | Enterprise only |

---

## Monitoring and Observability

### 11.1 SSO Metrics

| Metric | Type | Labels |
|--------|------|--------|
| sso_login_total | Counter | tenant_id, protocol, success |
| sso_login_latency | Histogram | tenant_id, protocol |
| sso_errors_total | Counter | tenant_id, error_type |
| sso_provisioning_total | Counter | tenant_id, action |

### 11.2 SSO Events

| Event | Logged Fields | Retention |
|-------|---------------|-----------|
| SSO login attempt | {{login_fields}} | {{login_retention}} |
| SSO login success | {{success_fields}} | {{success_retention}} |
| SSO login failure | {{failure_fields}} | {{failure_retention}} |
| User provisioned | {{provision_fields}} | {{provision_retention}} |
| Config changed | {{config_fields}} | {{config_retention}} |

### 11.3 Alerts

| Alert | Condition | Severity |
|-------|-----------|----------|
| SSO error spike | Error rate > {{error_threshold}} | {{error_severity}} |
| IdP unreachable | Connection timeout | {{timeout_severity}} |
| Certificate expiring | < {{cert_warn_days}} days | {{cert_severity}} |

---

## Testing Strategy

### 12.1 Test Scenarios

| Scenario | Test Type | Environment |
|----------|-----------|-------------|
| SAML login flow | Integration | {{saml_test_env}} |
| OIDC login flow | Integration | {{oidc_test_env}} |
| JIT provisioning | Integration | {{jit_test_env}} |
| SCIM sync | Integration | {{scim_test_env}} |
| SLO flow | Integration | {{slo_test_env}} |
| Cross-tenant isolation | Security | {{isolation_test_env}} |

### 12.2 Test IdPs

| IdP | Test Type | Configuration |
|-----|-----------|---------------|
| Mock IdP | Unit/Integration | {{mock_idp_config}} |
| Okta Dev | Integration | {{okta_dev_config}} |
| Azure AD Test | Integration | {{azure_test_config}} |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "SSO integration best practices {date}"
- "SAML OIDC multi-tenant enterprise {date}"
- "identity federation SaaS patterns {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

### 14.1 Integration Checklist

- [ ] IdP metadata configured correctly
- [ ] SP metadata provided to customer
- [ ] Attribute mapping verified
- [ ] JIT provisioning tested
- [ ] SLO tested
- [ ] Error handling tested
- [ ] Fallback mechanisms tested

### 14.2 Multi-Tenant Checklist

- [ ] Tenant isolation verified
- [ ] Domain verification implemented
- [ ] Cross-tenant login blocked
- [ ] Per-tenant configuration isolated
- [ ] Audit logging includes tenant
- [ ] Tier restrictions enforced

---

## Appendix A: Related Documents

- Pattern: `sso-integration` in `bam-patterns.csv`
- Template: `tenant-model-template.md`
- Workflow: `bmad-bam-tenant-onboarding-design`

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
