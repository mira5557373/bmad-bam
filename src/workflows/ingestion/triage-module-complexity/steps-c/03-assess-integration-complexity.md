# Step 3: Assess Integration Complexity

Evaluate integration and external dependency factors:

## Assessment Questions (Integration)

### Q5: Dependency Count
How many facade dependencies does this module have?
- **0 (Simple):** 0-1 module dependencies
- **1 (Standard):** 2-3 module dependencies
- **2 (Complex):** 4+ module dependencies

### Q6: Event Complexity
How many domain events does this module publish?
- **0 (Simple):** No events (pure query module)
- **1 (Standard):** 1-5 domain events
- **2 (Complex):** 6+ domain events, event sourcing patterns

### Q7: External Integrations
Does this module integrate with third-party APIs?
- **0 (Simple):** No external integrations
- **1 (Standard):** 1 external integration (well-documented API)
- **2 (Complex):** 2+ external integrations, or unreliable/complex APIs

### Q8: Compliance Requirements
Are there regulatory constraints affecting this module?
- **0 (Simple):** No special compliance needs
- **1 (Standard):** Basic compliance (audit logging, data retention)
- **2 (Complex):** GDPR, SOC2, HIPAA, or industry-specific regulations

**Output:** Integration complexity scores (Q5-Q8) with justification for each.

Document specific integration points, external systems, and compliance requirements from module context.
