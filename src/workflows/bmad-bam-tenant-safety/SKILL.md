---
name: bmad-bam-tenant-safety
displayName: Tenant Safety
description: Verify tenant safety controls and isolation mechanisms for multi-tenant AI platforms, ensuring complete data separation, resource isolation, and cross-tenant security. Supports QG-AI2.
module: bam
tags: [security, tenant, safety]
---

# Tenant Safety Workflow

## Overview

This workflow verifies tenant safety controls and isolation mechanisms for multi-tenant AI platforms, ensuring complete data separation, resource isolation, and cross-tenant security. It supports Quality Gate QG-AI2 (AI Safety Gate).

## When to Use

- Before production deployment to verify tenant isolation
- When adding new tenants or tenant tiers
- After architecture changes affecting tenant boundaries
- During security audits and penetration testing

## Modes

### Create Mode (5 steps)
Full tenant safety verification:
1. Audit data isolation
2. Test resource boundaries
3. Verify AI context separation
4. Test cross-tenant attacks
5. Generate safety report

### Edit Mode (3 steps)
Update existing tenant safety documentation:
1. Review isolation changes
2. Update affected sections
3. Regenerate report

### Validate Mode (4 steps)
Verify tenant safety implementation:
1. Run isolation tests
2. Execute cross-tenant tests
3. Verify resource limits
4. Generate validation report

## Quality Gate

**Gate ID:** QG-AI2  
**Gate Name:** AI Safety Gate  
**Pass Criteria:**
- Data isolation verified
- Resource boundaries enforced
- AI context separated
- Cross-tenant attacks blocked

## Recovery Protocol

If QG-AI2 fails for tenant safety:
1. **Identify Gap:** Review specific isolation failures
2. **Implement Control:** Add missing isolation layer
3. **Re-verify:** Run tenant safety verification again

## Outputs

- `tenant-safety-report.md` - Full assessment
- `isolation-verification.md` - Isolation test results
- `cross-tenant-test-results.md` - Attack test results
