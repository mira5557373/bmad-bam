# Step 4: Cleanup Isolation

Define the cleanup procedures for each isolation boundary:

## Database Cleanup

| Asset | Cleanup Action | Verification |
|-------|---------------|--------------|
| Tenant record | Hard delete from tenants table | Query returns empty |
| User records | Cascade delete | No orphan users |
| Agent configs | Cascade delete | No orphan agents |
| Conversation data | Batch delete with tenant_id | Count = 0 |
| RLS policies | Remove tenant-specific policies | Policy list empty |

```sql
-- Cleanup verification query
SELECT COUNT(*) FROM information_schema.tables t
JOIN pg_policies p ON t.table_name = p.tablename
WHERE p.polname LIKE '%tenant_{tenant_id}%';
-- Should return 0
```

## Cache Cleanup

```yaml
cache_cleanup:
  pattern: "tenant:{tenant_id}:*"
  method: SCAN + DEL (batched)
  batch_size: 1000
  verification: KEYS pattern returns empty
```

## Storage Cleanup

| Storage Type | Cleanup Action | Verification |
|--------------|---------------|--------------|
| S3 Objects | Delete all objects under prefix | ListObjects empty |
| S3 Prefix | Remove prefix marker | Prefix not found |
| CDN Cache | Invalidate tenant paths | Cache miss on access |

```bash
# S3 cleanup command pattern
aws s3 rm s3://{bucket}/tenants/{tenant_id}/ --recursive
```

## Search Index Cleanup

```yaml
search_cleanup:
  action: Delete documents with tenant_id filter
  verification: Search query returns 0 results
  index_optimization: Trigger after bulk delete
```

## Vector Store Cleanup

```yaml
vector_cleanup:
  action: Delete tenant namespace/collection
  verification: Namespace not found
  storage_reclaim: Trigger compaction
```

## Analytics Data Cleanup

```sql
-- ClickHouse partition cleanup
ALTER TABLE analytics DROP PARTITION '{tenant_id}';
```

## Cleanup Verification Checklist

- [ ] Database: No records with tenant_id exist in any table
- [ ] Cache: No keys with tenant prefix exist
- [ ] Storage: Tenant prefix is empty and removed
- [ ] Search: No documents with tenant filter match
- [ ] Vector: Namespace/collection deleted
- [ ] Analytics: Partition dropped
- [ ] Logs: Tenant-specific logs archived (not deleted for audit)

## Cleanup Audit Log

Generate cleanup certificate:
```json
{
  "tenant_id": "{tenant_id}",
  "cleanup_timestamp": "ISO8601",
  "resources_deleted": {
    "database_records": 12345,
    "cache_keys": 5678,
    "storage_objects": 890,
    "vector_embeddings": 100000,
    "search_documents": 456
  },
  "verification_status": "PASSED",
  "operator": "system|admin_email"
}
```
