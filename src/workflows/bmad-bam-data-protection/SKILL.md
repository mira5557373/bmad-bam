---
name: bmad-bam-data-protection
displayName: Data Protection
description: Verify data protection controls for multi-tenant AI platforms including encryption, isolation, and privacy
module: bam
tags: [security, data-protection]
---

# Data Protection Workflow

## Overview

This workflow verifies data protection controls for multi-tenant AI platforms, including encryption at rest and in transit, tenant data isolation, PII protection, and privacy controls. It supports Quality Gate QG-DR1 (Data Residency Gate).

## When to Use

- Before production deployment to verify data security
- When implementing new data handling features
- After architecture changes affecting data storage or transit
- During security audits and penetration testing

## Modes

### Create Mode (5 steps)
Full data protection verification:
1. Audit encryption controls
2. Verify tenant data isolation
3. Test PII protection
4. Validate data lifecycle
5. Generate protection report

### Edit Mode (3 steps)
Update existing data protection documentation:
1. Review data handling changes
2. Update protection mappings
3. Regenerate affected sections

### Validate Mode (4 steps)
Verify data protection implementation:
1. Run encryption tests
2. Verify isolation controls
3. Test privacy mechanisms
4. Generate validation report

## Quality Gate

**Gate ID:** QG-DR1  
**Gate Name:** Data Residency Gate  
**Pass Criteria:**
- All encryption requirements met
- Tenant isolation verified
- PII protection active
- Data lifecycle compliant

## Recovery Protocol

If QG-DR1 fails:
1. **Identify Gap:** Review findings for specific failures
2. **Implement Control:** Add missing data protection controls
3. **Re-verify:** Run data protection verification again

## Outputs

- `data-protection-report.md` - Full data protection assessment
- `encryption-audit.md` - Encryption implementation details
- `privacy-assessment.md` - Privacy controls evaluation
