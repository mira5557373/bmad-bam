---
name: runbook-creation
displayName: Runbook Creation
description: Create comprehensive operational runbooks for multi-tenant AI platform operations including incident response, AI operations, and routine procedures.
module: bam
tags: [operations, runbooks, incident-response]
---

# Runbook Creation Workflow

## Overview

This workflow creates comprehensive operational runbooks for multi-tenant AI platforms, covering incident response, routine operations, AI-specific procedures, and emergency protocols. It supports Quality Gate QG-OC (Operational Checklist Gate).

## When to Use

- Before production deployment to create operational documentation
- When adding new platform capabilities
- After significant incidents to document learnings
- During operational maturity improvements

## Modes

### Create Mode (5 steps)
Full runbook creation:
1. Assess operational needs
2. Create incident runbooks
3. Create AI operations runbooks
4. Create routine operations runbooks
5. Generate runbook collection

### Edit Mode (3 steps)
Update existing runbooks:
1. Review operational changes
2. Update affected runbooks
3. Regenerate collection

### Validate Mode (4 steps)
Verify runbook completeness:
1. Audit runbook coverage
2. Test critical procedures
3. Verify accessibility
4. Generate validation report

## Quality Gate

**Gate ID:** QG-OC  
**Gate Name:** Operational Checklist Gate  
**Pass Criteria:**
- All critical runbooks documented
- Procedures tested
- Runbooks accessible to on-call
- Review cadence established

## Recovery Protocol

If QG-OC fails for runbooks:
1. **Identify Gap:** Review coverage audit
2. **Create Runbook:** Document missing procedure
3. **Test:** Validate runbook with dry-run

## Outputs

- `runbook-collection.md` - Master runbook index
- `incident-response-runbook.md` - Incident procedures
- `ai-operations-runbook.md` - AI-specific operations
