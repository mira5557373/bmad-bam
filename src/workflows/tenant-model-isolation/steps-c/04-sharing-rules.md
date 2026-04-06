# Step 4: Sharing Rules

## Purpose

Define explicit rules for what data and resources can be shared across tenant boundaries. This step establishes the architecture for cross-tenant data (control plane only), shared reference data, and tenant-agnostic resources while maintaining strict isolation for tenant-specific data.

## Actions

1. **Define Cross-Tenant Data (Admin/Control-Plane Only)**
   - Identify platform-level administrative data that spans tenants
   - Document control plane resources (billing aggregates, usage metrics)
   - Specify access controls for platform administrators
   - Define audit requirements for cross-tenant data access

2. **Define Shared Reference Data**
   - Catalog reference data types: subscription plans, feature flags, system configurations
   - Determine caching strategies for shared reference data
   - Document versioning approach for reference data changes
   - Specify invalidation patterns when reference data updates

3. **Define Tenant-Agnostic Resources**
   - List public assets (documentation, marketing content, public APIs)
   - Identify shared infrastructure components (CDN assets, public endpoints)
   - Document static resources that require no tenant context

4. **Establish Sharing Boundaries**
   - Create decision matrix: "Can this data be shared? Under what conditions?"
   - Define explicit deny-list for data that must never be shared
   - Document escalation path for sharing rule exceptions

## Outputs

- Sharing rules specification document
- Data classification matrix (shared vs. isolated)
- Reference data catalog with caching policies
- Cross-tenant access control policies

## Validation Criteria

- [ ] Every data entity is classified as shared or tenant-isolated
- [ ] Cross-tenant access requires explicit authorization
- [ ] Reference data has defined update and invalidation procedures
- [ ] No tenant-specific data appears in shared categories
