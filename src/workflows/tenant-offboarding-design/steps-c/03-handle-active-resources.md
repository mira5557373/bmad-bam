# Step 3: Handle Active Resources

Define procedures for handling active tenant resources during offboarding:

## Active Session Handling

| Session Type | Handling Strategy | Grace Period |
|--------------|-------------------|--------------|
| Web Sessions | Invalidate tokens, redirect to offboarding page | Immediate |
| API Sessions | Return 403 with offboarding message | Immediate |
| WebSocket Connections | Send disconnect event, close connection | 5 minutes |
| Mobile App Sessions | Push notification, token invalidation | 1 hour |

## Running Job Handling

| Job Type | Handling Strategy | Max Wait |
|----------|-------------------|----------|
| Sync API Requests | Complete in-flight, reject new | 30 seconds |
| Background Jobs | Allow completion, no new scheduling | 1 hour |
| Scheduled Tasks | Cancel pending, complete running | 15 minutes |
| Long-Running Agents | Graceful shutdown signal | 30 minutes |
| Batch Exports | Complete if started, cancel if pending | 2 hours |

## Agent Runtime Cleanup

```yaml
agent_shutdown_sequence:
  1. Stop accepting new conversations
  2. Send "session ending" message to active conversations
  3. Save conversation state to memory tier
  4. Complete tool executions in progress
  5. Release LLM API connections
  6. Mark agent as OFFLINE
  7. Archive agent configuration
```

## Integration Disconnection

| Integration Type | Disconnection Action |
|------------------|---------------------|
| OAuth Connections | Revoke tokens, notify provider |
| Webhook Endpoints | Disable endpoints, queue cleanup |
| API Keys | Invalidate immediately |
| SSO Connections | Remove from IdP, notify admin |

## Resource Lock Prevention

Before starting offboarding:
1. Acquire distributed lock on tenant resources
2. Set tenant status to OFFBOARDING
3. Block all write operations
4. Allow read-only access during grace period
5. Release lock after archive creation

## Notification Sequence

```
T-7 days:  Email warning to tenant admin
T-3 days:  Email reminder with export option
T-1 day:   Final warning, export deadline
T-0:       Offboarding initiated
T+1 hour:  Active sessions terminated
T+24h:     Suspension complete notification
```
