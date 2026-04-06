# Step 2: Assess Compatibility

Evaluate the impact of changes on existing API consumers:

## Compatibility Analysis

**Semantic Versioning Assessment:**
- Breaking changes present? -> Major version bump required
- New features only? -> Minor version bump
- Bug fixes only? -> Patch version bump

**Consumer Impact Assessment:**
For each breaking change:
- Estimate number of affected consumers
- Identify high-value/enterprise tenants impacted
- Calculate migration effort per consumer

**Backward Compatibility Options:**
- Can old endpoints be maintained alongside new?
- Can request transformers bridge old to new?
- What is the cost of maintaining compatibility?

## Compatibility Matrix

| Change | Current Version | New Version | Migration Effort | Consumer Impact |
|--------|-----------------|-------------|------------------|-----------------|
| ... | ... | ... | Low/Med/High | Count |

## Risk Assessment

- **High Risk**: Breaking change affecting >20% of consumers
- **Medium Risk**: Breaking change affecting <20% with clear migration
- **Low Risk**: Non-breaking changes only

Output: Compatibility assessment with risk classification and impact summary.
