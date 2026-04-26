# Step 04: Design Memory Isolation and Compliance

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Design memory isolation verification and compliance features
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Use compliance frameworks and tenant isolation patterns
- 🚫 Do NOT: Begin final compilation (that's Step 05)
- 🔍 Use web search: Verify GDPR right-to-deletion and AI memory compliance
- ⚠️ Note: Memory isolation is a critical security and compliance requirement

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Cross-tenant memory isolation verification
- Memory access audit logging
- Memory export for tenant (GDPR Article 17)
- Memory deletion on tenant offboarding
- Compliance with data protection regulations

**OUT OF SCOPE:**
- Short-term memory design (Step 02)
- Long-term memory design (Step 03)
- Final compilation (Step 05)

---

## Purpose

Design the memory isolation verification, audit logging, and compliance features that ensure tenant data remains secure and regulatory requirements are met. This step addresses GDPR right-to-erasure, data portability, and audit requirements.

---

## Prerequisites

- Step 03 completed: Long-term memory designed
- Tenant isolation strategy documented
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle
- **Load template:** `{project-root}/_bmad/bam/data/templates/memory-isolation-template.md`

**Web Research (Required):**

Search the web: "GDPR AI memory right to erasure {date}"
Search the web: "multi-tenant AI data isolation verification {date}"
Search the web: "AI agent memory audit logging best practices {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Design Cross-Tenant Memory Isolation Verification

**Isolation Verification Points:**

| Verification Point | Method | Frequency |
|--------------------|--------|-----------|
| Embedding Storage | Query with wrong tenant_id returns empty | Every write |
| Retrieval Results | Audit log confirms tenant match | Every read |
| Memory Keys | Validate tenant prefix | Every operation |
| Conversation History | Session tenant validation | Every load |
| Vector Search | Filter enforcement check | Every search |

**Isolation Test Cases:**

| Test | Input | Expected Result |
|------|-------|-----------------|
| Cross-tenant query | tenant_a queries tenant_b memories | Empty result set |
| Tenant filter bypass | Query without tenant filter | Query rejected |
| Memory key tampering | Altered tenant prefix | Operation denied |
| Embedding namespace leak | Search across namespaces | Results only from own namespace |

**Automated Isolation Verification:**

| Check | Implementation | Alert Threshold |
|-------|----------------|-----------------|
| Tenant ID in all queries | Query interceptor | Any missing |
| Result tenant validation | Post-query check | Any mismatch |
| Namespace isolation | Periodic probe | Any cross-access |
| Memory access pattern | Anomaly detection | Unusual patterns |

### 2. Design Memory Access Audit Logging

**Audit Log Schema:**

| Field | Type | Purpose |
|-------|------|---------|
| timestamp | datetime | Event time (UTC) |
| tenant_id | string | Tenant performing action |
| user_id | string | User within tenant |
| agent_id | string | Agent performing action |
| action | enum | read / write / delete / search |
| memory_tier | enum | session / conversation / tenant / global |
| memory_id | string | Specific memory accessed |
| query_vector_hash | string | Hash of search query (for search) |
| result_count | int | Number of results returned |
| latency_ms | int | Operation duration |
| success | boolean | Operation outcome |
| error_code | string | Error if failed |

**Audit Events:**

| Event | Logged Fields | Retention |
|-------|---------------|-----------|
| Memory Read | tenant, user, memory_id, tier | 90 days |
| Memory Write | tenant, user, content_hash, tier | 1 year |
| Memory Delete | tenant, user, memory_id, reason | 7 years |
| Memory Search | tenant, user, query_hash, result_count | 90 days |
| Memory Export | tenant, user, export_scope, format | 7 years |
| Isolation Violation | all fields + alert | Permanent |

**Audit Log Storage:**

| Environment | Storage | Encryption |
|-------------|---------|------------|
| Development | PostgreSQL | At rest |
| Production | Immutable log store (e.g., S3 + Glacier) | At rest + in transit |

### 3. Design Memory Export for Tenant (GDPR Data Portability)

**Export Scope Options:**

| Scope | Contents | Format |
|-------|----------|--------|
| Full Export | All tenant memories | JSON + Embeddings |
| Conversation Export | Conversation history only | JSON |
| Knowledge Export | Tenant knowledge base | JSON + Documents |
| Preference Export | User preferences | JSON |
| Custom Export | User-selected categories | JSON |

**Export Format:**

```yaml
Export Structure:
  metadata:
    tenant_id: {tenant_id}
    export_date: {timestamp}
    export_scope: {scope}
    format_version: "1.0"
  
  memories:
    conversations:
      - session_id: {id}
        messages: [{message objects}]
        created_at: {timestamp}
    
    knowledge:
      - memory_id: {id}
        content: {text}
        embedding: {vector} (optional)
        metadata: {object}
    
    preferences:
      - key: {preference_key}
        value: {preference_value}
```

**Export Process:**

| Step | Action | Duration |
|------|--------|----------|
| 1 | Validate request authorization | < 1s |
| 2 | Gather all tenant memories | < 5 min |
| 3 | Transform to export format | < 1 min |
| 4 | Encrypt export package | < 1 min |
| 5 | Generate download link | < 1s |
| 6 | Log export event | < 1s |
| 7 | Notify tenant | < 1s |

**Export Verification:**

- [ ] **CRITICAL:** Only tenant's own data included
- [ ] No cross-tenant data leakage
- [ ] No system-internal data exposed
- [ ] Export audit log created
- [ ] Encryption applied

### 4. Design Memory Deletion on Tenant Offboarding

**Deletion Scope:**

| Memory Tier | Deletion Method | Verification |
|-------------|-----------------|--------------|
| Session | Auto-expired | N/A |
| Conversation | Purge by tenant_id | Query returns empty |
| Tenant (PostgreSQL) | DELETE with tenant_id | Count = 0 |
| Tenant (Vector DB) | Delete namespace/collection | Namespace not found |
| Audit Logs | Retain per compliance | Mark as deleted tenant |

**Deletion Process:**

| Phase | Action | Reversible | Duration |
|-------|--------|------------|----------|
| 1. Initiate | Mark tenant for deletion | Yes | Immediate |
| 2. Grace Period | Allow cancellation | Yes | {{grace_days}} days |
| 3. Soft Delete | Disable access, preserve data | Yes | Immediate |
| 4. Export Offer | Generate final export | N/A | < 1 hour |
| 5. Hard Delete | Purge all tenant memories | No | < 1 hour |
| 6. Verify | Confirm complete deletion | N/A | < 5 min |
| 7. Audit | Log deletion completion | N/A | Immediate |

**Deletion Verification Checklist:**

| Check | Query | Expected |
|-------|-------|----------|
| PostgreSQL | `SELECT COUNT(*) FROM memories WHERE tenant_id = ?` | 0 |
| Vector DB | `GET namespace/{tenant_id}` | Not Found |
| Redis | `KEYS conversation:{tenant_id}:*` | Empty |
| Object Storage | `LIST prefix={tenant_id}/` | Empty |
| Audit | Deletion log entry | Present |

**CRITICAL Deletion Requirements:**

- [ ] **CRITICAL:** All memory tiers purged
- [ ] **CRITICAL:** Vector embeddings deleted
- [ ] **CRITICAL:** Backup copies handled per retention policy
- [ ] **CRITICAL:** Deletion verification logged
- [ ] **CRITICAL:** Cannot be reversed after grace period

### 5. Design Compliance Framework Mapping

**GDPR Compliance:**

| Article | Requirement | Implementation |
|---------|-------------|----------------|
| Art. 17 | Right to Erasure | Tenant deletion workflow |
| Art. 20 | Data Portability | Memory export feature |
| Art. 25 | Privacy by Design | Tenant isolation by default |
| Art. 30 | Records of Processing | Audit logging |
| Art. 32 | Security | Encryption + access controls |

**SOC 2 Compliance:**

| Criteria | Requirement | Implementation |
|----------|-------------|----------------|
| CC6.1 | Logical access controls | Tenant ID enforcement |
| CC6.3 | Restrict access | Memory tier permissions |
| CC7.1 | Detect anomalies | Isolation violation alerts |
| CC7.2 | Monitor components | Memory access audit |

**HIPAA Compliance (if applicable):**

| Requirement | Implementation |
|-------------|----------------|
| Access Controls | Tenant + user authentication |
| Audit Controls | Memory access logging |
| Integrity Controls | Content hashing |
| Transmission Security | TLS + encryption at rest |

---

## COLLABORATION MENUS (A/P/C):

After presenting memory isolation design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into compliance requirements
- **P (Party Mode)**: Bring architect perspectives on security controls
- **C (Continue)**: Proceed to compile memory tier design

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: isolation verification, compliance mapping
- Process enhanced insights on regulatory requirements
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review memory isolation and compliance design"
- Present synthesized recommendations from security and compliance perspectives
- Return to A/P/C menu

#### If 'C' (Continue):
- Save isolation and compliance design
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to: `step-05-c-complete.md`

---

## Verification

- [ ] **CRITICAL:** Cross-tenant isolation verification designed
- [ ] **CRITICAL:** Audit logging schema complete
- [ ] **CRITICAL:** Memory export process documented
- [ ] **CRITICAL:** Tenant deletion process documented
- [ ] GDPR compliance mapped
- [ ] SOC 2 compliance mapped
- [ ] Deletion verification checklist complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Cross-tenant isolation verification design
- Memory access audit log schema
- Memory export specification (GDPR data portability)
- Tenant memory deletion process
- Compliance framework mapping
- Deletion verification checklist

---

## NEXT STEP:

Proceed to `step-05-c-complete.md` to compile the complete memory tier design document.
