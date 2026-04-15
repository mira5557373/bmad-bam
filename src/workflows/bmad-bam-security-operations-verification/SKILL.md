---
name: bmad-bam-security-operations-verification
displayName: Security Operations Verification
description: Verify security operations readiness for multi-tenant AI platforms including incident response, monitoring, threat detection, and security control effectiveness.
module: bam
tags: [security, operations, compliance]
---

# Security Operations Verification Workflow

## Overview

This workflow verifies security operations readiness for multi-tenant AI platforms, including incident response capabilities, security monitoring, threat detection, and security control effectiveness. It supports Quality Gate QG-S4 (Security Gate).

## When to Use

- Before production deployment to verify security operations
- During periodic security assessments
- After security incidents for improvement verification
- When onboarding security operations team

## Modes

### Create Mode (5 steps)
Full security operations verification:
1. Audit security monitoring
2. Test incident response
3. Verify threat detection
4. Assess security controls
5. Generate verification report

### Edit Mode (3 steps)
Update existing security operations documentation:
1. Review security changes
2. Update affected sections
3. Regenerate report

### Validate Mode (4 steps)
Verify security operations implementation:
1. Run security checks
2. Execute incident drill
3. Verify detection capabilities
4. Generate validation report

## Quality Gate

**Gate ID:** QG-S4  
**Gate Name:** Security Gate  
**Pass Criteria:**
- Security monitoring complete
- Incident response tested
- Threat detection verified
- Controls effective

## Recovery Protocol

If QG-S4 fails for security operations:
1. **Identify Gap:** Review specific security operation failures
2. **Implement Control:** Add missing security capabilities
3. **Re-verify:** Run security operations verification again

## Outputs

- `security-operations-report.md` - Full assessment
- `incident-readiness-assessment.md` - IR capabilities
- `security-controls-audit.md` - Control effectiveness
