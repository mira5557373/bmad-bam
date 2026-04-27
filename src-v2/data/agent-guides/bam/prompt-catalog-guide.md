# BAM Prompt Catalog Guide

**When to load:** During Phase 3 (Solutioning) or Phase 4 (Implementation) when designing prompt libraries, prompt versioning systems, or tenant-specific prompt management.

**Integrates with:** Architect (Nova persona), Dev agent, Tech Writer agent, QA agent

---

## Core Concepts

### What is a Prompt Catalog?

A prompt catalog is a centralized system for managing, versioning, testing, and deploying prompt templates across a multi-tenant AI platform. It enables consistent prompt engineering practices, supports tenant customization, and provides governance over prompt changes.

### Catalog Components

| Component | Purpose | Storage |
|-----------|---------|---------|
| Prompt templates | Reusable prompt structures | Version-controlled repo |
| Tenant overrides | Per-tenant customizations | Tenant config store |
| Variables registry | Dynamic prompt parameters | Configuration DB |
| Test suites | Prompt validation tests | Test framework |

### Prompt Hierarchy

| Level | Scope | Override Behavior |
|-------|-------|-------------------|
| Platform | All tenants | Base templates |
| Tier | Tenant tier | Tier-specific features |
| Tenant | Single tenant | Full customization |
| User | Individual user | Preferences only |

---

## Application Guidelines

When implementing a prompt catalog:

1. **Version all prompts**: Every prompt change must be versioned with full history
2. **Test before deploy**: Automated tests validate prompt quality before release
3. **Support rollback**: Instant rollback to previous prompt versions is required
4. **Enable tenant customization**: Allow tenants to customize prompts within guardrails
5. **Track performance**: Monitor prompt effectiveness with A/B testing

---

## Prompt Catalog Architecture

```
+-----------------------------------------------------------+
|  +----------+   +----------+   +----------+   +----------+|
|  | Template |-->| Variable |-->| Tenant   |-->| Runtime  ||
|  | Registry |   | Resolver |   | Override |   | Renderer ||
|  +----------+   +----------+   +----------+   +----------+|
|       |              |              |              |       |
|       v              v              v              v       |
|  +----------+   +----------+   +----------+   +----------+|
|  | Version  |   | Context  |   | Cache    |   | Audit    ||
|  | Control  |   | Inject   |   | Layer    |   | Log      ||
|  +----------+   +----------+   +----------+   +----------+|
+-----------------------------------------------------------+
```

### Architecture Components

| Component | Responsibility | Data Flow |
|-----------|----------------|-----------|
| Template Registry | Store and version prompts | Read on request |
| Variable Resolver | Substitute dynamic values | Runtime injection |
| Tenant Override | Apply customizations | Merge with base |
| Runtime Renderer | Produce final prompt | Output to LLM |

---

## Prompt Versioning

| Field | Description | Example |
|-------|-------------|---------|
| prompt_id | Unique identifier | `chat_assistant_v1` |
| version | Semantic version | `1.2.3` |
| author | Creator/modifier | `user@example.com` |
| created_at | Creation timestamp | `{date}-01-15` |
| status | Deployment status | `active`, `testing`, `deprecated` |
| parent_version | Previous version | `1.2.2` |

### Version Lifecycle

```
+-----------------------------------------------------------+
|   Draft -> Testing -> Staged -> Active -> Deprecated       |
|     |         |         |         |           |            |
|     v         v         v         v           v            |
|   Edit     A/B Test   Canary   Production   Archive        |
+-----------------------------------------------------------+
```

### Version States

| State | Description | Accessibility |
|-------|-------------|---------------|
| Draft | Work in progress | Author only |
| Testing | Under evaluation | Test environment |
| Staged | Ready for release | Canary users |
| Active | Production use | All users |
| Deprecated | Scheduled removal | Legacy support |

---

## Tenant Prompt Customization

| Customization Level | Capability | Governance |
|---------------------|------------|------------|
| Variables only | Fill placeholders | Automatic |
| Partial override | Modify sections | Review required |
| Full override | Complete replacement | Approval required |
| Extension | Add to base prompt | Guardrails enforced |

### Customization Flow

```
+-----------------------------------------------------------+
|   Base Template                                            |
|        |                                                   |
|        v                                                   |
|   +------------+    +------------+    +------------+       |
|   | Platform   |--->| Tier       |--->| Tenant     |       |
|   | Defaults   |    | Overrides  |    | Custom     |       |
|   +------------+    +------------+    +------------+       |
|                                             |              |
|                                             v              |
|                                       Final Prompt         |
+-----------------------------------------------------------+
```

---

## Prompt Testing

| Test Type | Purpose | Automation |
|-----------|---------|------------|
| Syntax | Valid template structure | CI/CD |
| Output quality | Expected response patterns | LLM eval |
| Safety | No harmful outputs | Guardrails check |
| Performance | Response latency | Benchmark suite |
| Regression | No quality degradation | A/B comparison |

### Test Suite Structure

| Suite | Trigger | Pass Criteria |
|-------|---------|---------------|
| Unit tests | Every commit | 100% pass |
| Integration | PR merge | 95% pass |
| Eval suite | Pre-deploy | Score > baseline |
| Safety scan | Pre-deploy | Zero violations |

---

## Prompt Performance Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Success rate | Task completion | > 90% |
| Quality score | LLM-as-judge rating | > 4.0/5.0 |
| Token efficiency | Output/input ratio | Optimized |
| User satisfaction | Feedback ratings | > 4.0/5.0 |

---

## A/B Testing Prompts

| Element | Control | Variant |
|---------|---------|---------|
| Template | Current production | Candidate |
| Traffic | 90% | 10% |
| Duration | N/A | 7 days |
| Success metric | Baseline | Statistical significance |

### A/B Decision Matrix

| Result | Action |
|--------|--------|
| Variant wins (p < 0.05) | Promote to production |
| No difference | Reject variant |
| Control wins | Keep current |
| Inconclusive | Extend test duration |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Integrate prompt catalog into agent execution
- `bmad-bam-ai-eval-safety-design` - Configure prompt safety evaluation
- `bmad-bam-tenant-onboarding-design` - Set up tenant prompt customization

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| Need prompt versioning? | Full version control required |
| Tenant wants customization? | Enable variable customization first |
| Quality degrading? | Implement regression testing |
| High prompt churn? | Add approval workflow |
| A/B testing needed? | Set up experiment framework |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Prompt patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `prompt-catalog`
- **Versioning patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `model-versioning`
- **LLMOps patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `llmops`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "prompt management systems {date}"
- Search: "prompt library patterns {date}"
- Search: "prompt versioning best practices {date}"
- Search: "prompt engineering workflow {date}"
- Search: "prompt A/B testing LLM {date}"
