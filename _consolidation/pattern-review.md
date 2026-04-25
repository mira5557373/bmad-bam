# Pattern-to-Guide Mapping Review

Generated: 2026-04-24

## Review Status Legend
- ✅ VERIFIED - Correct assignment
- ⚠️ REVIEW - Needs attention
- ❌ INCORRECT - Wrong assignment, needs fix

---

| abac | security | Basic: Simple rules;Advanced: External policy engine | rbac-abac-patterns;all-security-patterns | security-patterns-guide.md | |
| acceptance-criteria | gate-verification | Basic: Checklist;Advanced: Given-when-then | module-architecture | gate-verification-patterns-guide.md | |
| action-contract-8field | ai-safety | Basic: tenant_id + action_type;Advanced: Full 8-field with proofs | 8-field-action-contract-guide;run-contracts | ai-safety-patterns-guide.md | |
| agent-coordination | ai | Basic: Sequential handoff;Advanced: Swarm with emergent behavior | agent-runtime-patterns;event-driven-patterns | ai-runtime-patterns-guide.md | |
| agent-fallback | ai | agent-resilience-patterns;circuit-breaker | ai-runtime-patterns-guide.md | agent-fallback | |
| agent-memory-observability | observability | Basic: Tier metrics;Advanced: Full GDPR audit trail | memory-tiers;compliance | observability-patterns-guide.md | |
| agent-memory-optimization | ai | Basic: Fixed context window;Advanced: Hierarchical memory with compression | memory-tiers;llm-cost-optimization-guide;cost-tracking | ai-runtime-patterns-guide.md | |
| agent-negotiation | ai | Basic: Simple majority voting;Advanced: Contract net with utility functions | multi-agent-coordination;saga-orchestration-patterns | ai-runtime-patterns-guide.md | |
| agent-orchestration | ai | Basic: Sequential execution;Advanced: Dynamic orchestration with state machines | ai-runtime;agent-coordination;run-contracts | ai-runtime-patterns-guide.md | |
| agent-runtime | ai | Basic: Single agent with tools;Advanced: Hierarchical multi-agent | agent-runtime-patterns;run-contracts;memory-tiers | ai-runtime-patterns-guide.md | |
| agile-patterns | planning | Basic: Story points;Advanced: Full velocity tracking | module-architecture | discovery-patterns-guide.md | |
| ai-batch | ai | Basic: Simple queue processing;Advanced: Priority queues with cost optimization | background-jobs;llmops;cost-tracking | ai-runtime-patterns-guide.md | |
| ai-context | ai | Basic: Fixed context window;Advanced: Hierarchical context with compression | memory-tiers;context-compiler-patterns;memory-tiers | ai-runtime-patterns-guide.md | |
| ai-feedback-loop | ai | Basic: Simple ratings;Advanced: Full feedback loop with model retraining | llmops;llmops;analytics-guide | ai-runtime-patterns-guide.md | |
| ai-observability-verification | gate-verification | Basic: Request logging;Advanced: Full prompt tracing with evaluation | llmops;observability | gate-verification-patterns-guide.md | |
| ai-operations | ai | Basic: Single model deployment;Advanced: Full MLOps with model registry | llmops;llm-versioning;cost-tracking | ai-runtime-patterns-guide.md | |
| ai-runtime | ai | Basic: Single model endpoint;Advanced: Multi-model routing with tenant isolation | ai-runtime;llmops;llmops | ai-runtime-patterns-guide.md | |
| ai-runtime-config | ai | Basic: Global configuration;Advanced: Per-tenant model routing | agent-runtime-patterns;llmops;run-contracts | ai-runtime-patterns-guide.md | |
| ai-security-verification | gate-verification | Basic: Output filtering;Advanced: Full AI red teaming | ai-security;testing-agent-safety | gate-verification-patterns-guide.md | |
| ai-streaming-design | ai | Basic: SSE streaming;Advanced: Multi-tenant streaming with backpressure | ai-runtime;ai-runtime;performance-isolation | ai-runtime-patterns-guide.md | |
| ai-testing | ai | Basic: Deterministic output tests;Advanced: Stochastic testing with statistical validation | testing-agent-safety;ai-runtime;run-contracts | ai-runtime-patterns-guide.md | |
| alert-routing | observability | observability;notification-system | observability-patterns-guide.md | alert-routing | |
| api-design | integration | facade-contracts |  | Basic: REST with versioning;Advanced: Multi-protocol with SDK generation | |
| api-gateway | integration | Basic: Simple routing;Advanced: Full gateway | api-gateway-patterns;rate-limiting | integration-patterns-guide.md | |
| api-security | security | tenant-routing |  | Basic: API keys with rotation;Advanced: OAuth2 with scopes | |
| api-throttling | operations | Basic: Fixed rate limits per tenant;Advanced: Adaptive throttling with tier awareness | rate-limiting;quota-management | operations-patterns-guide.md | |
| apm-integration | observability | observability;observability-sre | observability-patterns-guide.md | apm-integration | |
| architecture-complete | gate-verification | Basic: Diagrams;Advanced: Full ADR process | module-architecture | gate-verification-patterns-guide.md | |
| audit-immutability | security | Basic: Append-only;Advanced: Cryptographic chain | audit-logging-patterns;compliance | security-patterns-guide.md | |
| audit-logging | security | compliance |  | Basic: Application logging;Advanced: Immutable audit trails with compliance mapping | |
| auto-scaling | operations | Basic: CPU-based HPA;Advanced: Custom metrics with tenant-aware scaling | capacity-planning-guide;performance-isolation;cost-tracking | operations-patterns-guide.md | |
| background-jobs | operations | Basic: Simple queue with tenant header;Advanced: Priority queues with tenant context propagation | event-driven-patterns;tenant-routing | operations-patterns-guide.md | |
| billing-integration | monetization | Basic: Simple subscription billing;Advanced: Usage-based with overage | usage-metering;cost-tracking;tenant-lifecycle | cost-patterns-guide.md | |
| cache-aside | architecture | caching-strategies;performance-isolation | architecture-patterns-guide.md | cache-aside | |
| cache-warming | operations | caching-strategies;background-jobs | operations-patterns-guide.md | cache-warming | |
| caching-strategy | operations | Basic: Simple key-value cache;Advanced: Multi-level with tenant-aware invalidation | rate-limiting;performance-isolation | operations-patterns-guide.md | |
| capacity | operations | Basic: Static capacity limits;Advanced: Dynamic capacity with demand forecasting | performance-isolation;scaling-patterns;cost-tracking | operations-patterns-guide.md | |
| cdn-caching | operations | caching-strategies;performance-isolation | operations-patterns-guide.md | cdn-caching | |
| circuit-breaker | architecture | Basic: Simple circuit breaker;Advanced: Hierarchical with bulkhead isolation | agent-resilience-patterns;api-gateway-patterns | architecture-patterns-guide.md | |
| code-quality | development | Basic: ESLint;Advanced: Full quality suite | local-development-setup | architecture-patterns-guide.md | |
| compliance | security | SaaS compliance patterns {date};data sovereignty {date} | QG-P1 | tenant-isolation | |
| compliance-continuous-verification | gate-verification | Basic: Periodic checks;Advanced: Real-time control monitoring | compliance;audit-logging-patterns | gate-verification-patterns-guide.md | |
| connection-pooling | database | tenant-routing;multi-tenant-patterns | data-patterns-guide.md | connection-pooling | |
| context-compression | ai | memory-tiers;context-compiler-patterns | ai-runtime-patterns-guide.md | context-compression | |
| context-window-observability | observability | Basic: Utilization tracking;Advanced: Full composition analysis | context-compiler-patterns;memory-tiers | observability-patterns-guide.md | |
| control-loop | runtime | Basic: In-memory state;Advanced: Distributed checkpoints | control-loop-patterns;agent-runtime-patterns | runtime-loops-patterns-guide.md | |
| cost | operations | Basic: Per-tenant cost tracking;Advanced: Full cost attribution with optimization recommendations | cost-tracking;usage-metering;llm-cost-optimization-guide | operations-patterns-guide.md | |
| cost-scaling-verification | gate-verification | Basic: Budget monitoring;Advanced: Predictive cost management | cost-tracking;scaling-patterns | gate-verification-patterns-guide.md | |
| cost-tracking | monetization | Basic: Request-based tracking;Advanced: Full resource attribution with shared cost allocation | cost-tracking;usage-metering | cost-patterns-guide.md | |
| cqrs | architecture | architecture-patterns-guide.md | cqrs | solutioning | |
| cross-tenant-coverage-verification | gate-verification | Basic: API blocking tests;Advanced: Full access path coverage | testing-isolation;tenant-isolation | gate-verification-patterns-guide.md | |
| customization | tenant | Basic: Theme variables;Advanced: Full white-label | tenant-customization-patterns;white-labeling-guide | tenant-patterns-guide.md | |
| dashboard | analytics | Basic: Pre-built dashboards;Advanced: Custom dashboard builder with tenant branding | analytics-guide;analytics-guide;observability | analytics-patterns-guide.md | |
| data-anonymization | compliance | tenant-data-anonymization |  | Basic: Simple masking;Advanced: Differential privacy with audit trail | |
| data-archival | operations | Basic: Time-based archival policies;Advanced: Compliance-driven with retrieval SLAs | compliance;saas-lifecycle | operations-patterns-guide.md | |
| data-classification-verification | gate-verification | Basic: Manual classification;Advanced: ML-assisted auto-classification | compliance;data-residency | gate-verification-patterns-guide.md | |
| data-encryption | security | tenant-isolation |  | Basic: Platform-managed keys;Advanced: Customer-managed keys (CMK) | |
| data-export | tenant | Basic: Manual CSV export;Advanced: Automated exports with multiple formats | compliance;data-residency;tenant-lifecycle | tenant-patterns-guide.md | |
| data-integrity | data | Basic: Application-level validation;Advanced: Database constraints with reconciliation | compliance;tenant-isolation;observability | data-patterns-guide.md | |
| data-masking | compliance | data-protection |  | Basic: Simple redaction;Advanced: Format-preserving encryption with tokenization | |
| data-residency | compliance | tenant-routing;compliance |  | Basic: Region pinning at signup;Advanced: Dynamic geo-routing with compliance automation | |
| dead-letter-queue | integration | Basic: Simple DLQ;Advanced: Automated retry | retry-policies;event-driven-patterns | integration-patterns-guide.md | |
| dependencies-mapped | gate-verification | Basic: Dependency list;Advanced: Dependency graph | module-architecture | gate-verification-patterns-guide.md | |
| deployment | operations | Basic: Blue-green;Advanced: Per-tenant canary | deployment;feature-toggle-patterns | operations-patterns-guide.md | |
| devops | operations | Basic: Simple CI/CD pipeline;Advanced: GitOps with tenant-aware deployments | deployment;devops-guide;observability | operations-patterns-guide.md | |
| disaster-recovery | operations | Basic: Regular backups;Advanced: Active-active geo | disaster-recovery | operations-patterns-guide.md | |
| disaster-recovery-drill-verification | gate-verification | Basic: Annual DR test;Advanced: Quarterly automated drills | disaster-recovery;deployment | gate-verification-patterns-guide.md | |
| discovery-patterns | discovery | Basic: Stakeholder interviews;Advanced: Full discovery workshop | analyst-guide | discovery-patterns-guide.md | |
| distributed-tracing | observability | observability;context-propagation-patterns | observability-patterns-guide.md | distributed-tracing | |
| documentation | operations | Basic: Auto-generated API docs;Advanced: Tenant-specific documentation portals | facade-contracts;api-gateway-patterns | operations-patterns-guide.md | |
| economic-loop | runtime | Basic: Daily limits;Advanced: Real-time per-action budgets | economic-loop-patterns;quota-management | runtime-loops-patterns-guide.md | |
| edge-caching | operations | caching-strategies;data-residency | operations-patterns-guide.md | edge-caching | |
| embedding-management | ai | model-fine-tuning-guide;vector-database-guide | ai-runtime-patterns-guide.md | embedding-management | |
| embedding-observability | observability | Basic: Generation latency;Advanced: Drift detection with quality | embedding-observability;llmops;vector-store-observability | observability-patterns-guide.md | |
| embedding-strategy | ai-lifecycle | Basic: Shared embedding model;Advanced: Tenant-specific fine-tuned embeddings | model-fine-tuning-guide;memory-tiers | ai-lifecycle-patterns-guide.md | |
| encryption-key-management | security | tenant-isolation;compliance |  | Basic: Shared keys with tenant isolation;Advanced: Customer-managed keys with HSM integration | |
| endpoint-security-verification | gate-verification | Basic: Input validation;Advanced: Full API security suite | all-security-patterns;rate-limiting | gate-verification-patterns-guide.md | |
| evaluation-patterns | ai | Basic: Accuracy metrics;Advanced: Full evaluation suite with A/B testing | testing-agent-safety;llmops;observability | ai-runtime-patterns-guide.md | |
| event-driven | integration | module-boundaries |  | Basic: Domain events;Advanced: Saga with compensation | |
| event-schema-evolution | integration | Basic: JSON;Advanced: Schema registry | facade-contracts;event-driven-patterns | integration-patterns-guide.md | |
| event-sourcing | architecture | event-sourcing-guide;event-driven-patterns | architecture-patterns-guide.md | event-sourcing | |
| experimentation | tenant | Basic: Feature flags;Advanced: Full experimentation platform | feature-toggle-patterns | tenant-patterns-guide.md | |
| facade-contracts | integration | module-boundaries |  | Basic: REST with versioning;Advanced: Multi-protocol facade | |
| facades-defined | gate-verification | Basic: REST endpoints;Advanced: Multi-protocol | module-facade-patterns | gate-verification-patterns-guide.md | |
| feature-flags | operations | experimentation;customization | operations-patterns-guide.md | feature-flags | |
| federation-a2a | runtime | Basic: Internal only;Advanced: Public marketplace with mTLS | tier-h-federation-patterns;agent-runtime-patterns | runtime-loops-patterns-guide.md | |
| file-storage | tenant | Basic: Prefix-based isolation;Advanced: Bucket-per-tenant with cross-region replication | tenant-isolation;data-residency | tenant-patterns-guide.md | |
| foundation-gate-verification | gate-verification | Basic: Checklist validation;Advanced: Automated foundation tests | tenant-isolation;ai-runtime | gate-verification-patterns-guide.md | |
| governance | operations | Basic: Manual governance;Advanced: Policy-as-code with automated enforcement | compliance;audit-logging-patterns;rbac-abac-patterns | operations-patterns-guide.md | |
| graphql | integration | facade-contracts |  | Basic: Tenant-scoped queries with context;Advanced: Federated GraphQL with per-tenant schemas | |
| health-scoring | analytics | observability;customer-success-guide | analytics-patterns-guide.md | health-scoring | |
| idempotency | architecture | Basic: Idempotency keys in headers;Advanced: Distributed deduplication with TTL | api-gateway-patterns;event-driven-patterns | architecture-patterns-guide.md | |
| identity-verification | gate-verification | Basic: Password policy;Advanced: Zero-trust identity | sso-integration-patterns;rbac-abac-patterns | gate-verification-patterns-guide.md | |
| incident-response | operations | Basic: Manual runbooks;Advanced: Automated response with tenant impact isolation | observability;notification-system;disaster-recovery;runbook-guide | operations-patterns-guide.md | |
| infrastructure | operations | Basic: Shared infrastructure;Advanced: Per-tenant infrastructure with IaC | deployment;tenant-lifecycle;disaster-recovery | operations-patterns-guide.md | |
| issue-classified | gate-verification | Basic: Severity levels;Advanced: Impact matrix | incident-response-patterns | gate-verification-patterns-guide.md | |
| learning-loop | runtime | Basic: Shared with consent;Advanced: Federated with differential privacy | learning-loop-patterns;llmops | runtime-loops-patterns-guide.md | |
| llm-cost-tracking | cost-optimization | Basic: Per-request token counting;Advanced: Full cost attribution with allocation | llm-cost-optimization-guide;usage-metering | cost-patterns-guide.md | |
| llm-observability | operations | Basic: Request logging with tokens;Advanced: Full prompt tracing with evaluation | observability;llmops;cost-tracking | operations-patterns-guide.md | |
| llmops | ai-ops | Basic: Model versioning;Advanced: Full MLOps pipeline | llmops;llm-versioning | ai-runtime-patterns-guide.md | |

Total patterns with guide assignment: 192
