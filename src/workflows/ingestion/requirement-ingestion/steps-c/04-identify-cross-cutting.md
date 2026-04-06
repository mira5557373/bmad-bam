# Step 4: Identify Cross-Cutting Concerns

Detect requirements that span multiple modules or represent shared infrastructure:

**Cross-cutting categories:**
1. **Security concerns:** Authentication, authorization, audit logging
2. **Observability:** Logging, metrics, tracing, alerting
3. **Tenant isolation:** Multi-tenancy patterns, data segregation
4. **Performance:** Caching, rate limiting, circuit breakers
5. **Compliance:** GDPR, SOC2, HIPAA requirements that affect all modules

**Analysis tasks:**
- Flag requirements that appear in multiple domain categories
- Identify shared kernel candidates (truly shared domain concepts)
- Detect infrastructure requirements masquerading as features
- Mark requirements needing platform-level implementation

**Cross-cutting handling:**
- Assign to dedicated cross-cutting module (e.g., `platform-core`)
- Or document as aspect applied across modules
- Never duplicate implementation across modules

**Output:** Cross-cutting concern registry in `{output_folder}/planning-artifacts/features/cross-cutting-concerns.md`.
