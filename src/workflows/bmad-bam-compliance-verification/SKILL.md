---
name: bmad-bam-compliance-verification
displayName: Compliance Verification
description: Verify multi-tenant AI platform compliance with regulatory frameworks (SOC2, GDPR, HIPAA). Use when the user requests to 'verify compliance' or 'compliance audit'.
module: bam
tags: [compliance, security, governance]
---

# Compliance Verification Workflow

## Overview

This workflow verifies that multi-tenant AI platforms comply with regulatory frameworks including SOC2, GDPR, HIPAA, and industry-specific requirements. It supports Quality Gate QG-CP1 (Compliance Policy Gate).

## When to Use

- Before production deployment to verify regulatory compliance
- During periodic compliance audits
- After significant architecture changes affecting data handling
- When onboarding tenants with specific compliance requirements

## Modes

### Create Mode (5 steps)
Full compliance verification from scratch:
1. Assess compliance requirements
2. Audit data handling practices
3. Verify access controls
4. Test audit logging
5. Generate compliance report

### Edit Mode (3 steps)
Update existing compliance documentation:
1. Review changes against compliance baseline
2. Update compliance mappings
3. Regenerate affected sections

### Validate Mode (4 steps)
Verify compliance implementation:
1. Run compliance checks
2. Verify control implementations
3. Test audit capabilities
4. Generate validation report

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Quality Gate

**Gate ID:** QG-CP1  
**Gate Name:** Compliance Policy Gate  
**Pass Criteria:**
- All required controls implemented
- No critical compliance gaps
- Audit logging verified
- Data handling compliant

## Recovery Protocol

If QG-CP1 fails:
1. **Identify Gap:** Review compliance findings for specific failures
2. **Implement Control:** Add missing compliance controls
3. **Re-verify:** Run compliance verification again

## Outputs

- `compliance-verification-report.md` - Full compliance assessment
- `compliance-findings.md` - Detailed findings by framework
- `remediation-plan.md` - Action items for gaps
