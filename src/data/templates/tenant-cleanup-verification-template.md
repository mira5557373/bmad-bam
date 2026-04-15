---
name: tenant-cleanup-verification-template
description: Verification procedures for confirming complete tenant data removal
category: tenant
version: 1.0.0
type: "operations"
module: bam
---

## Purpose

Verification procedures for confirming complete tenant data removal

# Tenant Cleanup Verification Template

**Version:** {{version}}
**Date:** {{date}}
**Project:** {{project_name}}
**Tenant ID:** {{tenant_id}}

---

## Overview

This template defines the verification procedures for confirming complete tenant data removal during offboarding. All checks must pass before issuing cleanup certification.

---

## Database Cleanup Verification

### Table Verification Checklist

| Table | Verification Query Pattern | Expected Result | Status |
|-------|---------------------------|-----------------|--------|
| tenants | SELECT COUNT(*) WHERE tenant_id = ? | 0 rows | [ ] |
| users | SELECT COUNT(*) WHERE tenant_id = ? | 0 rows | [ ] |
| agents | SELECT COUNT(*) WHERE tenant_id = ? | 0 rows | [ ] |
| conversations | SELECT COUNT(*) WHERE tenant_id = ? | 0 rows | [ ] |
| agent_memory | SELECT COUNT(*) WHERE tenant_id = ? | 0 rows | [ ] |
| usage_events | SELECT COUNT(*) WHERE tenant_id = ? | 0 rows | [ ] |
| billing_records | SELECT COUNT(*) WHERE tenant_id = ? | 0 rows (or archived) | [ ] |

### RLS Policy Verification

| Verification | Method | Expected Result | Status |
|-------------|--------|-----------------|--------|
| RLS policies removed | List policies for tenant | No tenant-specific policies | [ ] |
| Schema dropped (if schema-per-tenant) | Check schema exists | Schema not found | [ ] |
| Database dropped (if db-per-tenant) | Check database exists | Database not found | [ ] |

---

## Cache Cleanup Verification

| Cache Type | Verification Pattern | Expected Result | Status |
|------------|---------------------|-----------------|--------|
| Redis keys | SCAN for tenant:{tenant_id}:* | 0 keys returned | [ ] |
| Session cache | Check session store | No sessions for tenant | [ ] |
| API cache | Check API response cache | No cached responses | [ ] |
| Rate limit counters | Check rate limit keys | No counters for tenant | [ ] |

---

## Storage Cleanup Verification

| Storage Type | Verification Method | Expected Result | Status |
|--------------|---------------------|-----------------|--------|
| S3 objects | LIST tenants/{tenant_id}/ | Empty listing | [ ] |
| S3 prefix | HEAD tenants/{tenant_id}/ | 404 Not Found | [ ] |
| Blob storage | List container/tenant path | Empty or not found | [ ] |
| Local files | Check filesystem path | Directory removed | [ ] |

---

## Search Index Cleanup Verification

| Search System | Verification Query | Expected Result | Status |
|---------------|-------------------|-----------------|--------|
| Elasticsearch | Query with tenant_id filter | 0 hits | [ ] |
| OpenSearch | Query with tenant_id filter | 0 hits | [ ] |
| Algolia | Query with tenant filter | 0 hits | [ ] |
| Meilisearch | Query with tenant filter | 0 hits | [ ] |

---

## Vector Store Cleanup Verification

| Vector Store | Verification Method | Expected Result | Status |
|--------------|---------------------|-----------------|--------|
| Pinecone | Query namespace | Namespace not found | [ ] |
| Weaviate | Query collection | Collection not found or empty | [ ] |
| Qdrant | Query collection | Collection not found or empty | [ ] |
| ChromaDB | Query collection | Collection not found or empty | [ ] |
| pgvector | Query with tenant filter | 0 rows | [ ] |

---

## Analytics Cleanup Verification

| Analytics Store | Verification Method | Expected Result | Status |
|-----------------|---------------------|-----------------|--------|
| ClickHouse | Query partition | Partition dropped | [ ] |
| TimescaleDB | Query chunks | No chunks for tenant | [ ] |
| BigQuery | Query dataset | No rows for tenant | [ ] |
| Snowflake | Query tables | No rows for tenant | [ ] |

---

## Message Queue Cleanup Verification

| Queue System | Verification Method | Expected Result | Status |
|--------------|---------------------|-----------------|--------|
| RabbitMQ | Check tenant queues | Queues deleted | [ ] |
| SQS | Check tenant queues | Queues deleted | [ ] |
| Kafka | Check topic partitions | No pending messages | [ ] |
| Redis Streams | XINFO for tenant streams | Streams deleted | [ ] |

---

## Cleanup Certificate

```
Cleanup Certificate
-------------------
Tenant ID: {{tenant_id}}
Cleanup Timestamp: {{cleanup_timestamp}}
Verification Timestamp: {{verification_timestamp}}

Resources Verified:
  - Database Tables: [count] tables verified empty
  - Cache Keys: [count] patterns verified absent
  - Storage Objects: [count] paths verified empty
  - Search Documents: [count] indices verified empty
  - Vector Embeddings: [count] collections verified absent
  - Analytics Data: [count] partitions verified dropped

Verification Status: [PASSED/FAILED]
Verified By: [operator_email]
Audit Log Reference: [audit_log_id]
```

---

## Web Research Queries

For platform-specific cleanup verification:
- "{database} verify tenant data deletion {date}"
- "{cache_system} verify key deletion patterns {date}"
- "{vector_store} verify collection deletion {date}"
- "multi-tenant data deletion verification best practices {date}"

---

## Final Checklist

- [ ] All database tables verified empty for tenant
- [ ] All cache keys removed
- [ ] All storage objects deleted
- [ ] All search indices cleaned
- [ ] All vector stores cleaned
- [ ] All analytics partitions dropped
- [ ] All message queues drained
- [ ] Audit log entry created
- [ ] Cleanup certificate generated
- [ ] Compliance requirements satisfied (GDPR right to erasure if applicable)

---

## Verification Checklist

- [ ] Database cleanup verified with row count queries returning zero
- [ ] RLS policies removed or schema/database dropped as appropriate
- [ ] Redis cache keys scanned and confirmed absent for tenant prefix
- [ ] Session and API response caches verified empty
- [ ] S3/Blob storage paths verified empty or not found
- [ ] Elasticsearch/OpenSearch indices return zero hits for tenant
- [ ] Vector store namespaces/collections verified absent
- [ ] ClickHouse/TimescaleDB partitions verified dropped
- [ ] Message queues drained and tenant-specific queues deleted
- [ ] Multi-tenant isolation verified (no cross-tenant data access)
- [ ] Cleanup certificate contains all required verification details
- [ ] Compliance requirements documented (GDPR, data residency)

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
