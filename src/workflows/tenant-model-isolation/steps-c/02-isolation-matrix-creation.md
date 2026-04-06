# Step 2: Isolation Matrix Creation

Classify ALL asset types by isolation strategy:

| Asset Type        | Isolation Strategy             | Notes                      |
| ----------------- | ------------------------------ | -------------------------- |
| Database rows     | RLS with tenant_id             | Default for all tables     |
| Cache entries     | Key prefix with tenant_id      | Redis namespace isolation  |
| Log entries       | Structured field tenant_id     | For Loki filtering         |
| Agent memory      | Tenant-scoped memory tier      | Mem0 + Redis isolation     |
| AI tools          | Tenant-scoped tool permissions | Per-tenant tool access     |
| Background jobs   | Tenant_id in job payload       | ARQ/Redis queue isolation  |
| Vector embeddings | Tenant-filtered collections    | Qdrant namespace isolation |
| Analytics data    | Tenant-partitioned tables      | ClickHouse partitioning    |
| File storage      | Tenant-prefixed paths          | S3 bucket/prefix isolation |
| Search indices    | Tenant-filtered                | Meilisearch tenant filter  |
