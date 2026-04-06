# Provisioning UI Playbook

## Principle

Tenant provisioning progress is displayed in real-time via WebSocket
with step-level status, time estimates, and error recovery options.

## Rationale

Provisioning can take 30 seconds (FREE) to 5 minutes (ENTERPRISE).
Users need visibility into progress and clear recovery paths on failure.

## WebSocket Protocol

- **Endpoint**: `/ws/provisioning/{idempotency_key}`
- **Subscribe**: Client connects, receives current status immediately
- **Updates**: Server broadcasts on each step status change
- **Heartbeat**: Server sends every 30 seconds
- **Cleanup**: Subscription deleted on COMPLETED/ROLLED_BACK

## Status Update Payload

```json
{
  "type": "status_update",
  "state": "in_progress",
  "current_step": "ai_runtime",
  "progress": { "completed": 4, "total": 8, "percentage": 50 },
  "steps": [
    { "id": "tenant_record", "name": "Create Tenant", "status": "completed" },
    { "id": "ai_runtime", "name": "Setup AI Runtime", "status": "running" }
  ],
  "estimated_remaining_seconds": 120,
  "error": null
}
```

## Step Status Display

| Status       | Icon | Color  | User Action              |
| ------------ | ---- | ------ | ------------------------ |
| pending      | ○    | gray   | Wait                     |
| running      | ◐    | blue   | Wait                     |
| completed    | ✓    | green  | None                     |
| failed       | ✗    | red    | Retry button available   |
| skipped      | ⏭   | gray   | None (non-critical step) |
| compensating | ↩    | orange | Wait for rollback        |

## Time Estimation Strategy

| Step State | Estimate Contribution                   |
| ---------- | --------------------------------------- |
| Completed  | Actual duration (for accuracy tracking) |
| Running    | Half of configured timeout              |
| Pending    | Half of configured timeout              |
| Failed     | Zero (excluded from estimate)           |

## Error Recovery Options

| Error Type             | User Options         | System Behavior                            |
| ---------------------- | -------------------- | ------------------------------------------ |
| Retryable step failure | Retry button         | Re-execute failed step only                |
| Non-retryable failure  | Contact support link | Full compensation triggered                |
| Timeout                | Retry or cancel      | Step marked failed, compensation available |
| Partial success        | Continue or rollback | Non-critical steps skipped                 |

## Accessibility Requirements

- `aria-valuenow` on progress bar
- `aria-label` on each step status
- `aria-live="polite"` for status updates
- `aria-live="assertive"` for error messages
- Keyboard navigation for retry/cancel buttons

## Key Points

- Progress bar uses percentage from completed/total
- Time estimate sums half of timeout for pending/running steps
- Error display shows failed step name + message + retry button

## Anti-Patterns

| Anti-Pattern                     | Problem                                         | Correct Approach                     |
| -------------------------------- | ----------------------------------------------- | ------------------------------------ |
| Polling for status               | Unnecessary server load, delayed updates        | WebSocket subscription               |
| No heartbeat                     | Client can't distinguish slow from disconnected | 30-second heartbeat                  |
| No error recovery UI             | User stuck on failure                           | Retry button for retryable failures  |
| Missing accessibility attributes | Inaccessible to screen readers                  | Full ARIA attributes on all elements |

## Integration Points

- Section 22.8.6: Real-Time Status Tracking
- Section 22.8.9: Webhook Events
- Section 28.11: multi-tenant-patterns (tenant data lifecycle)

See also: saga-orchestration-patterns.md, multi-tenant-patterns.md
