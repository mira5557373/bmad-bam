# Step 5: Compliance Mapping

## Purpose

Map regulatory compliance requirements to the tenant data model, ensuring the architecture supports GDPR, CCPA, and other data protection regulations. This step produces actionable implementation requirements for data export, deletion, audit trails, and data residency.

## Actions

1. **GDPR Data Export Requirements Per Tenant**
   - Define data portability scope (what data must be exportable)
   - Specify export formats (JSON, CSV, machine-readable standards)
   - Document export API requirements and rate limits
   - Establish SLA for export request fulfillment (typically 30 days)
   - Design tenant-scoped export that excludes other tenants' data

2. **Data Deletion Requirements (Right to be Forgotten)**
   - Identify all data stores containing tenant/user data
   - Define hard delete vs. soft delete policies per data type
   - Document cascade deletion rules across related entities
   - Specify retention exceptions (legal holds, regulatory requirements)
   - Design verification process to confirm complete deletion
   - Address deletion in backups and replicas

3. **Audit Trail Requirements**
   - Define audit event taxonomy (create, read, update, delete, access)
   - Specify retention period for audit logs (typically 7 years for financial)
   - Design tamper-evident audit log storage
   - Document audit log access controls and query capabilities
   - Ensure audit logs themselves are tenant-isolated

4. **Data Residency Considerations**
   - Map tenant jurisdictions to required data storage regions
   - Define region-locked data vs. globally replicable data
   - Document cross-border data transfer mechanisms (SCCs, BCRs)
   - Design tenant configuration for residency preferences

## Outputs

- Compliance requirements matrix by regulation
- Data export API specification
- Deletion workflow documentation
- Audit schema and retention policies
- Data residency configuration guide

## Questions to Consider

- Which data processing activities require explicit consent?
- How do we handle deletion requests for data shared with third parties?
- What is the audit trail retention period for each data category?
- Which tenants require specific data residency (EU, specific countries)?
- How do we verify deletion completeness across distributed systems?
