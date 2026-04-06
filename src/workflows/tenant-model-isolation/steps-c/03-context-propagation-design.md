# Step 3: Context Propagation Design

Define how tenant context flows across every boundary:

- JWT claim extraction → TenantContext middleware
- Async job propagation (tenant_id in job payload)
- Event context passing (tenant_id in event headers/payload)
- WebSocket connection state
- Outbound webhook headers

**Soft Gate:** Steps 1-3 complete the isolation model design. Present a summary of tenant model, isolation matrix, and context propagation decisions. Ask for confirmation before proceeding to sharing rules and compliance.
