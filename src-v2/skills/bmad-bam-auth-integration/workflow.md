# Authentication Integration

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new authentication architecture | `step-01-c-*` through `step-06-c-*` |
| **Edit** | Modify existing authentication design | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check authentication against security criteria | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless authentication architecture artifact exists.

## Sub-Workflow Selection

After mode selection, identify which sub-workflow to focus on:

| Code | Sub-Workflow | When to Use |
|------|--------------|-------------|
| **ZAS** | SSO Integration | Enterprise IdP integration (Okta, Azure AD, Google Workspace) |
| **ZAO** | OAuth Provider | Building OAuth 2.0 authorization server |
| **ZAK** | API Key Auth | Machine-to-machine authentication |
| **ZAM** | Session Management | User session design and token lifecycle |
| **Full** | Complete Flow | All authentication patterns (default) |

## Create Mode

Follow Create steps sequentially: step-01-c → step-02-c → ... → step-06-c

### Step Sequence

| Step | Focus | Sub-Workflow |
|------|-------|--------------|
| step-01-c | Requirements & IdP landscape | All |
| step-02-c | SSO protocol design (SAML/OIDC) | ZAS |
| step-03-c | IdP integration architecture | ZAS |
| step-04-c | OAuth provider design | ZAO |
| step-05-c | API key management | ZAK |
| step-06-c | Session management & documentation | ZAM + All |

## Edit Mode

Follow Edit steps: step-10-e-load → step-11-e-apply

Use Edit mode when modifying existing authentication architecture:
- Adding new IdP support
- Updating protocol configurations
- Modifying session policies
- Extending API key patterns

## Validate Mode

Follow Validate steps: step-20-v-load → step-21-v-validate → step-22-v-report

Validates against:
- **QG-S4:** Authentication security controls
- **QG-S5:** Session security requirements
- **QG-M2:** Tenant isolation in auth flows
