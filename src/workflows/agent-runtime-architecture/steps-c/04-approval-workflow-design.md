# Step 4: Approval Workflow Design

## Purpose
Design human-in-the-loop approval workflows that gate sensitive agent actions based on risk, cost, and policy requirements.

## Actions

- Define trigger conditions:
  - Risk level thresholds (high-risk actions always require approval)
  - Cost threshold (actions exceeding budget limits)
  - Sensitivity classification (PII access, external communications)
  - First-time tool usage for a tenant

- Design approval queue system:
  - Per-tenant approval queues with priority levels
  - Queue persistence (survive service restarts)
  - Assignment rules (who can approve what)
  - Bulk approval for similar requests

- Configure timeout handling:
  - Auto-deny after configurable period (default: 24 hours)
  - Notification escalation before timeout
  - Partial completion handling (save progress, resume after approval)

- Establish escalation rules:
  - Human override protocol for urgent cases
  - Escalation tiers (approver -> supervisor -> admin)
  - Emergency bypass procedures with audit logging

## Outputs
- Approval trigger rule configuration
- Queue schema and state machine definition
- Notification templates and channels
- Escalation policy document

## Questions to Consider
- How do agents handle partial approvals?
- What feedback loop exists for approval decisions?
- How are approval patterns learned to reduce friction?

**Soft Gate:** Steps 1-4 complete the core runtime design. Present a summary of orchestration model, tool registry, memory tiers, and approval workflows. Ask for confirmation before proceeding to evaluation and kill switch design.
