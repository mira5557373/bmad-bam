# Step 03: Secrets Rotation Design (Create Mode - ZSR)

## MANDATORY EXECUTION RULES (READ FIRST):

- STOP NEVER generate content without user input
- READ CRITICAL: ALWAYS read the complete step file before taking any action
- LOOP CRITICAL: When loading next step with 'C', ensure entire file is read
- PAUSE ALWAYS pause after presenting findings and await user direction
- TARGET Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- TARGET Focus: Design zero-downtime secret rotation policies
- SAVE Track: Document rotation strategies, dual-active periods, automation
- READ Context: Build on step-02 secrets analysis
- STOP Do NOT: Begin threat modeling (step-04)
- SEARCH Use web search: Verify current rotation best practices

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Zero-downtime rotation strategies
- Rotation automation design
- Dual-active key transitions
- Emergency rotation procedures

**OUT OF SCOPE:**
- New secret type discovery (step-02)
- Threat modeling (ZST steps)
- Incident response (ZIR steps)
- Validation (separate mode)

## YOUR TASK

Design zero-downtime secret rotation policies for all identified secret types. Create rotation schedules, automation strategies, and emergency rotation procedures for the multi-tenant platform.

---

## Purpose

Design secret rotation policies that enable zero-downtime rotation, including dual-active key transitions, automation strategies, and emergency rotation procedures for security incidents.

---

## Prerequisites

- Step 02 completed: Secret inventory and vault selection
- **Load patterns:** `{project-root}/_bmad/bam/data/patterns/secrets-management.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-s3.md` (secrets section)

**Web Research (Required):**

Search the web: "zero downtime secret rotation {date}"
Search the web: "database credential rotation patterns {date}"
Search the web: "API key rotation multi-tenant {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Rotation Schedule Matrix

Define rotation schedules per secret type:

| Secret Type | Rotation Period | Trigger | Automation | Notification |
|-------------|-----------------|---------|------------|--------------|
| Database credentials | 90 days | Scheduled | Full auto | 7 days before |
| API gateway keys | 90 days | Scheduled | Full auto | 7 days before |
| Tenant API keys | On-demand | Customer-initiated | Self-service | Immediate |
| OAuth client secrets | 30 days | Scheduled | Full auto | 7 days before |
| DEK (data encryption) | 365 days | Scheduled | Full auto | 30 days before |
| KEK (key encryption) | 365 days | Scheduled + ceremony | Semi-auto | 30 days before |
| Agent tokens | 15 min TTL | Per-execution | Full auto | N/A |
| TLS certificates | 90 days | Scheduled | Cert-manager | 14 days before |

### 2. Zero-Downtime Rotation Flow

Design dual-active key transition:

```
Step 1: Generate New          Step 2: Dual Active         Step 3: Deprecate Old
+------------------+          +------------------+         +------------------+
|  Secret v1       |          |  Secret v1 [ok]  |         |  Secret v1 [X]   |
|  (active)        |          |  Secret v2 [ok]  |         |  Secret v2 [ok]  |
|                  |          |  (both valid)    |         |  (only valid)    |
+------------------+          +------------------+         +------------------+
        |                             |                           |
        +-------- T+0 ----------------+-------- T+24h ------------+
```

**Dual-Active Period by Secret Type:**

| Secret Type | Dual-Active Period | Rationale |
|-------------|-------------------|-----------|
| Database credentials | 4 hours | Connection pool refresh |
| API keys | 24 hours | Client cache expiry |
| OAuth secrets | 1 hour | Token refresh cycle |
| Encryption keys | 7 days | Re-encryption window |
| Certificates | 7 days | Certificate propagation |

### 3. Rotation Automation Design

Design automation strategy:

| Component | Automation Level | Implementation |
|-----------|------------------|----------------|
| Rotation trigger | Full auto | Vault TTL / scheduled job |
| Secret generation | Full auto | Vault dynamic secrets |
| Distribution | Full auto | Service injection / sidecar |
| Validation | Full auto | Health check endpoints |
| Old secret revocation | Full auto | After dual-active period |
| Audit logging | Full auto | All rotation events |

**Vault Dynamic Secrets Pattern:**

```yaml
rotation_automation:
  provider: vault  # Or cloud-native
  
  database_credentials:
    type: dynamic
    backend: database
    ttl: 1h
    max_ttl: 24h
    rotation_statements:
      - "ALTER USER {{name}} WITH PASSWORD '{{password}}';"
    
  api_keys:
    type: static_with_rotation
    rotation_period: 90d
    dual_active_period: 24h
    notification_before: 7d
    
  agent_tokens:
    type: dynamic
    backend: jwt
    ttl: 15m
    max_ttl: 1h
    claims:
      tenant_id: "{{tenant_id}}"
      scope: ["read", "execute"]
```

### 4. Emergency Rotation Procedures

Design emergency rotation for security incidents:

| Incident Type | Rotation Scope | Timeline | Notification |
|---------------|---------------|----------|--------------|
| Credential leak (single) | Affected secret only | Immediate | Affected tenant |
| Credential leak (platform) | All platform secrets | 1 hour | All tenants |
| Suspected breach | All secrets + investigation | 4 hours | All stakeholders |
| Key compromise | Full key rotation | 24 hours | All tenants |

**Emergency Rotation Runbook:**

```
EMERGENCY ROTATION PROCEDURE
================================================================================
Trigger: Security incident requiring immediate rotation

1. ASSESS (15 min)
   - Identify compromised secret(s)
   - Determine blast radius (tenants affected)
   - Classify incident severity

2. ISOLATE (30 min)
   - Revoke compromised credentials immediately
   - Block affected API keys
   - Preserve audit logs

3. ROTATE (varies)
   - Generate new secrets
   - Update all consumers
   - Verify service health

4. VERIFY (30 min)
   - Confirm old secrets are rejected
   - Verify new secrets working
   - Check cross-tenant isolation

5. DOCUMENT (24 hours)
   - Log all rotation actions
   - Update incident timeline
   - Prepare tenant notification
================================================================================
```

### 5. Tenant Self-Service Rotation

Design tenant API key self-service:

| Feature | Implementation | Security Control |
|---------|----------------|------------------|
| Key generation | Tenant portal | Authenticated, authorized |
| Key listing | Tenant portal | Masked display (last 4 chars) |
| Key rotation | Self-service button | Old key valid for 1 hour |
| Key revocation | Self-service button | Immediate invalidation |
| Usage metrics | Dashboard | Per-key request counts |

**Self-Service Flow:**

```
Tenant Admin                    Platform                      Vault
    |                              |                            |
    |-- Rotate API Key Request --->|                            |
    |                              |-- Validate Permissions --->|
    |                              |<-- Permission OK ----------|
    |                              |-- Generate New Key ------->|
    |                              |<-- New Key + Old TTL ------|
    |<-- New Key + 1h Grace -------|                            |
    |                              |                            |
    |   (1 hour later)             |                            |
    |                              |-- Revoke Old Key --------->|
    |                              |<-- Old Key Revoked --------|
```

---

## COLLABORATION MENUS (A/P/C):

After designing rotation policies, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific rotation scenarios
- **P (Party Mode)**: Bring security, ops, compliance perspectives
- **C (Continue)**: Proceed to next focus area or complete ZSR
- **[Specific scenario]**: Focus on emergency rotation, tenant self-service

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: rotation policies, automation design
- Clarify edge cases and failure scenarios
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review rotation design for operational readiness"
- Present perspectives from SRE, Security, Platform Engineering
- Return to A/P/C menu

#### If 'C' (Continue):
- Document rotation design
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Based on focus:
  - ZSR only -> Complete, run validation
  - ALL -> Proceed to `step-04-c-threat-stride.md`

---

## Verification

- [ ] Rotation schedules defined for all secret types
- [ ] Zero-downtime flow documented
- [ ] Automation strategy complete
- [ ] Emergency rotation procedures defined
- [ ] Tenant self-service rotation designed
- [ ] Web research citations documented

---

## Outputs

- Rotation schedule matrix
- Zero-downtime rotation flow
- Automation configuration schema
- Emergency rotation runbook
- Tenant self-service specification

---

## SUCCESS METRICS:

- [ ] All rotation policies defined
- [ ] Dual-active periods appropriate per secret type
- [ ] Automation feasible with selected vault
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing secret types:** Return to step-02 for inventory update
- **Automation gaps:** Identify manual processes with mitigation
- **Emergency process unclear:** Use Party Mode (P) for incident scenarios

## Next Step

Based on focus:
- **ZSR only:** ZSR section complete - run validation or select another focus
- **ALL:** Proceed to `step-04-c-threat-stride.md` for threat modeling
