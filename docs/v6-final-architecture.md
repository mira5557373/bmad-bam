# BAM v6 — Final Architecture Specification

> **Status:** Final v0.4 (post-Round-4 self-review; 145 total gaps addressed across 4 rounds; architectural shape locked; rounds stopped due to saturation)
> **Date:** 2026-05-11
> **Supersedes:** `docs/v6-information-package.md` and `docs/v6-rdp-implementation-guide.md` as the architecture record.
> **Constraint:** Products built with BMAD/BMM/BAM must be production-ready, feature-rich, market-leader, cutting-edge. Time and money are not constraints.
> **Success criterion for v6.0:** first product reaches `RG-Launch` (release gate) using BAM family without manual workarounds; partial credit awarded for `≤ 3 mediate-conflict invocations` and `≤ 1 plan-B/C fallback`.

---

## 0. If you only read one section

Read **§3 Module Family Architecture**, **§4 Persona Roster**, and **§15 How Claude Consumes BAM**. Everything else elaborates from these three.

### 0.1 Spec exit criteria (this version is locked)

This spec is considered **locked** when ALL of the following hold:
- 4 self-review rounds completed (achieved)
- Round-over-round gap count declining (R1=28, R2=39, R3=45, R4=33 — declining)
- No unresolved architectural-shape concerns (user confirmed converged)
- All critical operational gaps addressed (achieved across R1-R4)

Further refinement of this spec happens through v6.x revisions tied to implementation feedback, not through more self-review rounds. Round 5+ rounds are explicitly out of scope.

---

## 1. Executive Summary

BAM v6 is a **family of 8 canonical BMAD modules** providing market-leader-depth knowledge, workflows, and verification gates for multi-tenant agentic AI SaaS products. It is private infrastructure for the author's own product(s), not a public BMAD ecosystem release.

| Dimension | Value |
|---|---|
| Modules | 8 (`bmad-bam-platform`, `data`, `ai`, `rag`, `integration`, `trust`, `ops`, `ux`) |
| Personas | 6 (Atlas, Nova, Kai, Cipher, Rune, Iris) |
| Workflow skills | 135 across the family |
| Customize templates | ~15 overlays on BMAD core skills |
| Quality gates | ~28 (each spec'd with criticality + depends-on + criteria + evidence) |
| Release gates | 8 (composite, orchestrated) |
| Knowledge fragments | 350-550 substantive markdown fragments |
| Patterns | 500-700 decision-ready pattern files |
| Vertical add-on packs | 6-8 (opt-in, in `bmad-bam-trust`) |
| MCP servers shipped | 1 (`bmad-bam-mcp` — stdio transport, fs-permission auth) |
| Anti-patterns | 26 |
| Glossary terms | ~40 |
| Effort estimate | ~3200-4000h across 3 waves (+16-40h Wave 0) |
| Release waves | Wave 0 smoke test → v6.0 (4 modules) → v6.1 (2 modules) → v6.2 (2 modules) |

**Shift from v3:** v3 was one mega-module with 38 skills + 112 patterns competing for attention in a single customize folder. v6 is 8 focused modules each installable independently, each with its own persona, each with deep coverage in one coherent domain.

---

## 2. Locked Context & Constraints

| Decision | Value | Implication |
|---|---|---|
| Audience | Private — your product(s) only | Skip semver/marketplace plumbing; internal versioning only |
| Product domain | Horizontal SaaS platform | Breadth + configurability over deep vertical specialization; verticals are opt-in fragment packs |
| Scale target | SMB (1K–100K tenants) | Defaults: RLS + sharding, automation-first onboarding, FinOps quotas, fair-use enforcement |
| Model strategy | Multi-provider smart routing | AI module covers Claude/GPT/Gemini routing, eval normalization, fallback chains; Anthropic-specific patterns primary |
| Team | Solo developer + Claude | Personas function as collaborative cast; Kai arbitrates conflicts; gates emphasize AI-driven self-verification |
| Personas | 6 (Atlas, Nova, Kai, Cipher, Rune, Iris) | Locked. No mid-stream additions during v6.0. |
| OpenSRE | Deferred to v6.2 evaluation | Rune is design-time only in v6.0 |
| Constraint | Production-ready market leader, cutting-edge | Maximum knowledge depth; no scope compromise |

---

## 3. Module Family Architecture

### 3.1 The 8 modules

| # | Module | Owner | Domain |
|---|---|---|---|
| 1 | `bmad-bam-platform` | Atlas 🏛️ | Tenant isolation, modular monolith decomposition, deployment topology, FinOps, tenant tier, billing/payment/tax, rate limiting, tenant migration |
| 2 | `bmad-bam-data` | Atlas 🏛️ | Schema, CDC, event sourcing, CQRS, lakehouse, feature stores, stream processing, search index, graph DB, synthetic data, data export, residency, retention |
| 3 | `bmad-bam-ai` | Nova 🌟 | Multi-provider routing, agent orchestration + collaboration, memory tiers + compression, prompt engineering + architecture, eval (offline/online/adversarial/bias-fairness), safety guardrails, prompt-injection defense, tenant-prompt isolation, KV-cache isolation, shadow mode, tool execution, model lifecycle |
| 4 | `bmad-bam-rag` | Nova 🌟 | Vector stores, embeddings, hybrid search, rerank, GraphRAG, multi-modal RAG, contextual retrieval, late chunking, knowledge graphs, retrieval eval |
| 5 | `bmad-bam-integration` | Kai 🔗 | Module facades, public API, contracts, convergence, gateway, cross-module messaging, real-time, webhooks, sagas, circuit-breaker, idempotency, versioning |
| 6 | `bmad-bam-trust` | Cipher 🔐 | Zero-trust, RBAC/ABAC, BYOK/HSM, audit trails, compliance frameworks, vulnerability management, PII handling, consent management, content moderation, DLP, AI agent identity, AI regulatory tracking, model cards, vertical add-ons |
| 7 | `bmad-bam-ops` | Rune ⚙️ | OpenTelemetry + tenant-scoped traces, SLOs/error budgets, runbooks-as-code, chaos engineering, DR planning, incident response, feature flags, canary, on-call, AI cost spike alerts, tenant data sovereignty validator, customer success tooling, agent debugging |
| 8 | `bmad-bam-ux` | Iris 🎨 | White-label theming, design tokens, accessibility per cohort, multi-locale, brand isolation, agentic UX patterns, trust UI, progressive disclosure, AI-empty-states, onboarding UX, feature deprecation UX |

### 3.2 Dependency graph

```
                ┌────────────────────┐
                │ bmad-bam-platform  │ ◄── root
                └─────────┬──────────┘
                          │
   ┌───────┬─────────┬────┼─────────┬────────┬────────┐
   │       │         │    │         │        │        │
┌──▼──┐ ┌──▼─┐  ┌────▼─┐ ┌▼─────┐ ┌─▼────┐ ┌─▼──┐
│data │ │ ai │  │trust │ │integ.│ │ ops  │ │ ux │
└─────┘ └─┬──┘  └──────┘ └──────┘ └──────┘ └────┘
          │
       ┌──▼─┐
       │rag │
       └────┘
```

- **All modules depend on `platform`** — directly or transitively
- `rag` depends on `ai` (which depends on `platform`)
- `data`, `ai`, `integration`, `trust`, `ops`, `ux` depend directly on `platform`
- Install: `bmad install bmad-bam-ai` auto-pulls `platform`; `bmad install bmad-bam-rag` auto-pulls `ai` + `platform`
- **Minimum install:** `bmad-bam-platform` alone is valid (foundation-only mode for early projects)

### 3.3 Coexistence with other BMAD modules

- Independent of `bmad-tea`, `bmad-wds`, `bmad-cis`. No hard dependency.
- Optional integrations: `bmad-tea` → `ai` references tea fragments; `bmad-wds` → `ux` references wds patterns; `bmad-cis` → `ai` references cis patterns.

### 3.4 Module versioning policy

- **Per-module semver:** `bmad-bam-<module>@MAJOR.MINOR.PATCH`
- **MAJOR:** breaking change to module contracts (workflow inputs, customize-templates, gate criteria, persona voice/role)
- **MINOR:** new workflows, patterns, gates, or backward-compatible enhancements; persona additions
- **PATCH:** bug fixes, doc updates, fragment refreshes
- **Persona evolution policy:**
  - Voice change or role redefinition → MAJOR (objective test: persona's opening framing in workflow steps changes; e.g., Atlas no longer leads with "load-bearing decisions first")
  - New pattern affinities / additional persona pairings → MINOR
  - Wording / formatting → PATCH
- **Persona deprecation:** a persona may be retired in MAJOR version. Required: (a) `status: deprecated` in persona definition, (b) migration ADR template, (c) 1-major-version grace period before removal, (d) sidecar memory archived to `_bmad/_memory/_archived/<persona>/` not deleted
- **Family versioning:** `bam-family@vX.Y` is shorthand for a known-good combination, published in compatibility matrix
- **Module dependencies declared in module.yaml:**
  ```yaml
  requires:
    bmad: ">=6.4.0,<7.0.0"
    bmad-bam-platform: ">=6.0.0,<7.0.0"
  ```

### 3.5 Compatibility matrix + forward compatibility

`bmad-bam-platform/data/compatibility-matrix.csv` is authoritative:

```csv
bam_version,module,module_version,bmad_min,bmad_max,notes
6.0.0,platform,6.0.0,6.4.0,,initial release
6.0.0,data,6.0.0,6.4.0,,initial release
...
```

Synced to `_bmad/bam/compatibility-matrix.csv` on install.

**Forward compatibility policy:**
- **Minor BMAD upgrade** (e.g., 6.4.0 → 6.5.0): triggers `bmad-bam-smoke-test` re-run automatically
- **Major BMAD upgrade** (e.g., 6.x → 7.0): blocks BAM module use until compatibility-matrix is updated and re-verified
- **BAM module upgrade:** runs `bmad-bam-smoke-test` on every module install / upgrade

### 3.6 Hook idempotency

All post-install hooks MUST be:

1. **Idempotent** — re-runnable without side effects (use `mkdir -p`, check-before-create)
2. **Atomic** — write to temp file then atomic-rename
3. **Failure-safe** — leave previous successful state intact on failure
4. **Logged** — to `_bmad/bam/install-logs/<module>-<timestamp>.log`

### 3.7 Uninstall behavior + persona orphan policy

`bmad uninstall bmad-bam-<module>`:

- Removes module's `_bmad/<module>/` directory
- Removes module's customize-template entries
- **Preserves** `_bmad/bam/user/`, `_bmad/_memory/<persona>/`, `_bmad/bam/evidence/`
- Logs uninstall to `_bmad/bam/install-logs/`
- Updates `_bmad/bam/family.json` to reflect installed state

**Persona orphan policy:** When the last module a persona owns is uninstalled:

- Persona marked `status: orphaned` in `_bmad/bam/family.json`
- Sidecar at `_bmad/_memory/<persona>/` preserved
- `bmad-bam-start` prompts user to either:
  - Re-install the owning module, OR
  - Migrate ADRs to active personas via `record-decision --migrate-from <orphaned>`
  - OR explicitly archive the persona (sets `status: archived`; sidecar moves to `_bmad/_memory/_archived/<persona>/`)

**Install-failure half-orphan handling:** If a module install fails mid-way (persona registered but customize-templates not applied, or vice versa):
- `family.json` records partial state: `{ "module": "ux", "status": "install-failed", "rollback-required": true }`
- `bmad-bam-start` detects on next run, offers `bmad-bam-rollback <module>` to clean partial state
- Half-registered persona has `status: half-orphaned` until rollback completes

### 3.8 What BAM expects from the host project + monorepo handling

| Expectation | Why |
|---|---|
| `_bmad/config.toml` exists | Standard BMM config |
| BMAD method installed at `>= 6.4.0` | Universal-glob mechanism |
| `{project-root}` placeholder resolves | Path resolution |
| Git initialized | ADR commit discipline |
| Write access to `_bmad/` | Installation + memory persistence |

**Monorepo handling:**
- **Default:** one `_bmad/` per BMAD project (per `_bmad/config.toml`). If monorepo has multiple BMAD projects, each gets independent BAM install.
- **Shared mode** (opt-in via `_bmad/bam/family.json: shared-mode: true`): one `_bmad/bam/` at monorepo root; per-product `_bmad/<product>/<module>/project-context.md` files; patterns shared, decisions per-product via `_bmad/_memory/<product>/<persona>/` paths (product-scoped sidecars).
- **Recommendation:** start with default (per-product); migrate to shared mode if patterns drift across products.

No assumptions about: programming language, database tech, deployment target, test framework, IDE.

### 3.9 Backup / restore

`_bmad/_memory/` and `_bmad/bam/evidence/` may be irreplaceable. Backup procedure:

- **Auto-backup:** `bmad-bam-start` on first-run-of-session creates `_bmad/bam/backups/<timestamp>.tar.gz` if last backup > 7 days
- **Manual backup:** `bmad bmad-bam-backup` workflow creates timestamped archive
- **Restore:** `bmad bmad-bam-restore <archive>` workflow validates archive integrity (checksum + family.json reconciliation) before restoring
- **Recommendation:** git-track `_bmad/_memory/` and `_bmad/bam/evidence/` separately from product code (per-persona ADRs may contain sensitive design info — use private repo or git-crypt)
- **Backup rotation policy:** keep last 4 weekly backups + last 12 monthly backups; older auto-pruned to manage disk size (which can grow to 100s of MB after months on a large project)

---

## 4. Persona Roster

### 4.1 The 6 personas

| Persona | Icon | Role | Owns modules | Voice |
|---|---|---|---|---|
| **Atlas** | 🏛️ | Platform Architect | platform, data | Structural engineer: load-bearing decisions first, every gate explicit |
| **Nova** | 🌟 | AI Runtime Architect | ai, rag | Gradient-descent metaphors: bound loss function, isolate tenant, eval-driven |
| **Kai** | 🔗 | Integration Architect | integration | Contract attorney with engineering rigor; **default arbiter** for conflicts |
| **Cipher** | 🔐 | Security & Compliance | trust | Paranoid auditor: assume breach, log everything, map control to evidence |
| **Rune** | ⚙️ | SRE & Observability | ops | YAML + Helm chart fragments, SLO talk, postmortem candor |
| **Iris** | 🎨 | Multi-Tenant UX | ux | Theme tokens, accessibility-first, brand-isolation by default |

**Persona tone profiles** (override in `_bmad/bam/user/user.toml: persona-tone: {persona: profile}`):
- `default` — voice as above
- `formal-enterprise` — softer metaphors, more compliance language; for B2B enterprise products
- `casual-developer` — more direct, less formal; for developer-tool products
- `concise` — strips voice flourishes; for fast iteration sessions

### 4.2 Solo-developer-with-AI ergonomics

- `@Atlas` / `@Nova` / `@Kai` / `@Cipher` / `@Rune` / `@Iris` — invoke individually
- `bmad-party-mode` (external) auto-registers all 6; summon multiple at once
- Personas function as collaborative cast for solo developer

### 4.3 Sidecar memory — ADR directory format

```
_bmad/_memory/<persona>/
├── architecture-decisions/
│   ├── INDEX.md
│   ├── 2026-05-11-001-use-rls.md
│   └── ...
├── runtime-preferences.md
└── integration-history.md
```

**ADR file format** (MADR-lite):

```markdown
---
id: 2026-05-11-001
title: Use RLS for tenant isolation
status: accepted   # proposed | accepted | superseded | deprecated
date: 2026-05-11
persona: atlas
related-personas: [cipher]
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:                   # explicit assumptions made
  - tenant count remains <1000 through year 1
dependencies-on-other-decisions: # ADR ids
  - 2026-05-08-003-postgres-as-primary-db
generated-by: claude-opus-4-7  # AI attribution; null if user-written
authored-by: user              # user | <persona> | collaborative
---

## Context
## Decision
## Consequences
## Alternatives Considered
```

**Authorship convention:** AI persona drafts; user approves. `authored-by: collaborative` when ADR went through ≥1 round of user revision. `generated-by` always discloses model that produced the draft.

**Append-only.** Supersession creates a new ADR with `supersedes: <id>`; original gets `status: superseded` + `superseded-by: <new-id>`. Superseded ADR's `consequences` annotated with "Superseded — see {new-id} for current consequences."

**Privacy:** ADRs may contain sensitive design info; git-track at user discretion; never auto-commit to public repos.

### 4.4 BMM existing-persona overlays

BAM doesn't replace BMM personas — it overlays them via customize-templates:

| BMM persona | BAM overlay adds |
|---|---|
| Mary (Analyst) | Tenant requirement elicitation, compliance impact, tier modeling |
| John (PM) | Tenant tier definitions, feature-flag rollout, white-label, AI roadmap |
| Sally (UX) | Multi-tenant theming references to Iris's patterns |
| Winston (Architect) | Cross-references to all 6 BAM personas |
| Amelia (Dev) | Tenant-context propagation; tenant-leakage in code review |
| Paige (Tech-Writer) | Multi-tenant docs structure (admin / end-user / dev audiences) |

BMM persona overlays declare `bmm-persona-version: ">=6.4.0"`; BMM persona MAJOR bumps require BAM overlay update.

**BMM persona deprecation handling:** if BMM deprecates a persona (e.g., Paige retired in BMM v7), BAM's overlay enters grace period:
- 1-major-version grace period (the entire BMM major where deprecation happened)
- BAM overlay marked `status: deprecated-upstream` in customize-template
- Migration ADR template appended to relevant BAM persona's sidecar
- Removed in BAM's next MAJOR release after BMM deprecation

### 4.5 Persona conflict resolution + escalation

When two BAM personas give contradicting recommendations, **Kai is default arbiter**.

**Process** (`@Kai mediate <topic>` or `bmad mediate-conflict`):

1. User invokes Kai with conflicting positions
2. Kai loads both personas' patterns + sidecar memory
3. Kai produces `conflict-resolution.md` with positions, trade-offs, decision criteria, recommended path
4. User approves or escalates
5. Approved resolution recorded as ADRs in BOTH personas' sidecars

**Escalation chain when Kai is a party:**

- **Step 1:** User-direct decision (solo+AI)
- **Step 2:** Escalate to BMM's Winston (BMAD master architect) — broader integration view
- **Step 3:** Captured as ADR in `_bmad/_memory/_meta/` (cross-persona decisions)

**Cross-module persona invocation mechanism:**

BAM workflows can invoke BMM personas via fully-qualified syntax `@bmm:winston` (vs `@kai` which is BAM-implicit). Discovery:
- `bmad list-personas --all` lists all installed personas across modules (BAM + BMM + others)
- `mediate-conflict` workflow's escalation step uses `@bmm:winston` to summon Winston when Kai is a party
- Cross-module persona invocation respects each module's `agents:` block declarations in module.yaml
- If target persona is not installed (e.g., BMM uninstalled or persona deprecated), workflow falls back to **user-direct decision** with notice

Workflows that touch multiple personas auto-pause for mediation when contradictions detected.

### 4.6 Persona pairing patterns

For cross-domain decisions, invoke multiple via `bmad-party-mode`:

- `@Atlas @Nova` — AI runtime that respects tenant boundaries
- `@Atlas @Cipher` — tenant isolation + compliance
- `@Nova @Cipher` — AI safety + content moderation
- `@Kai @Rune` — facade contracts + SLO targets
- `@Iris @Cipher` — accessibility + privacy / consent UI
- `@Atlas @Rune` — deployment topology + DR

When `> 2` personas needed, Kai included by default as integration thread.

**Performance note:** Each persona adds ~3-5K tokens of context. For complex pairings, prefer sequential invocation over party-mode to manage context budget.

---

## 5. Workflow Surface (135 workflows)

### 5.0 Workflow naming convention

| Prefix | Meaning | Output type |
|---|---|---|
| `design-*` | Creates new architectural artifact | Design document |
| `plan-*` | Plans migration / transition (often brownfield) | Migration plan |
| `verify-*` | Verification gate workflow | Gate evidence |
| `audit-*` | Retrospective check of existing system | Audit report |
| `analyze-*` | Brownfield assessment | Assessment report |
| `record-*` | Captures decision into sidecar memory | ADR file |
| `refresh-*` | Re-runs background queries | Drift report |
| `mediate-*` | Cross-persona conflict resolution | Resolution document |
| `waive-*` | Records gate waiver | Waiver document |

### 5.0.1 Workflow manifest (inputs/outputs/capabilities/execution mode)

```yaml
inputs:
  - artifact: product-brief.md
    required: true
    resolver: latest-in-docs                # locked: latest | specific-path | latest-in-docs

outputs:
  - artifact: tenancy-model.md
    location: "{project-root}/docs/architecture/"   # placeholder-based, configurable
    required: true
  - sidecar: architecture-decisions/{date}-tenancy-model.md
    persona: atlas
  - gate-evidence: QG-F1/tenancy-criteria.md
    conditional: pass-only

execution_mode:
  default: assisted                          # auto-runnable steps execute; gates pause
  alternatives: [manual, fully-auto]

recommended_capabilities:                    # workflow fails-fast if model lacks
  - extended-thinking                        # complex reasoning steps
  - prompt-caching                           # long fragment loads

minimum_persona_version: "6.0.0"            # tracks persona evolution

sub-workflows:                               # workflow composition
  - design-finops-model                      # may be invoked as sub-step
    invocation: optional                     # optional | required | sequential

latency-budget: "30min"                     # wall-clock expectation; CI verifies
cluster: foundation                          # sub-cluster within module for navigation
```

**Sub-workflow recursion rules:**
- Max depth: 3 levels (workflow → sub-workflow → sub-sub-workflow)
- No cycles permitted; cycle detection at build time
- Sub-workflow outputs returned to parent step
- Each sub-workflow runs in its own ADR scope

**Resolver rules (locked):**
- `latest`: most recently modified file by name
- `latest-in-docs`: most recent under `{project-root}/docs/`
- `specific-path`: declared absolute path under `{project-root}`

### 5.1 `bmad-bam-platform` (16 skills — Atlas)

1. `design-tenancy-model` — RLS / schema-per-tenant / cell-based decision; sharding
2. `design-modular-monolith` — bounded contexts, ports & adapters
3. `design-deployment-topology` — blue-green / canary with tenant cohorts
4. `design-finops-model` — unit economics, per-tenant cost attribution, quotas
5. `design-tenant-tier-model` — free/starter/pro/business/enterprise
6. `design-tenant-onboarding` — automation-first SMB flow
7. `design-tenant-offboarding` — right-to-deletion, export, retention
8. `design-multi-tenant-testing` — isolation, noisy-neighbor, quota, RLS bypass
9. `design-billing-integration` — Stripe / Paddle / Maxio
10. `design-payment-tenant-mapping` — payment-processor tenant scoping
11. `design-tax-compliance` — sales tax / VAT / GST per jurisdiction
12. `design-rate-limit-per-tenant` — quota enforcement detail
13. `design-tenant-rate-arbitrage` — preventing tier-jumping abuse
14. `design-tenant-migration-tooling` — moving tenants between tiers / regions
15. `analyze-existing-tenancy` *(brownfield)*
16. `plan-tenancy-retrofit` *(brownfield)*

### 5.2 `bmad-bam-data` (14 skills — Atlas)

1. `design-schema-architecture`
2. `design-cdc-pipeline` — Debezium / Outbox / Postgres logical decoding
3. `design-event-sourcing`
4. `design-cqrs`
5. `design-lakehouse` — Iceberg / Delta / Hudi
6. `design-feature-store`
7. `design-stream-processing` — Kafka / Pulsar / RedPanda
8. `design-search-index` — Elasticsearch / Meilisearch / Typesense
9. `design-graph-database` — Neo4j / Memgraph
10. `design-synthetic-data` — for training / test fixtures
11. `design-data-export-formats` — SaaS portability standards
12. `design-data-residency` — *where data lives*
13. `design-retention-deletion` — GDPR right-to-deletion
14. `plan-data-migration` *(brownfield)*

### 5.3 `bmad-bam-ai` (27 skills — Nova)

Grouped by cluster for navigation:

**Cluster: routing-and-orchestration**
1. `design-model-routing` — cost / capability-aware Claude/GPT/Gemini
2. `design-agent-orchestration` — planner-executor, supervisor-worker, swarm
3. `design-agent-collaboration-protocol` — agent-to-agent
4. `design-tool-execution` — sandboxes, computer use, code execution

**Cluster: memory-and-prompt**
5. `design-memory-architecture` — working / episodic / semantic tiers
6. `design-agent-memory-compression` — long-context hierarchical summarization
7. `design-self-improving-agent` — continual learning / online fine-tune
8. `design-prompt-engineering` — prompt construction discipline
9. `design-prompt-architecture` — system-level prompt structure

**Cluster: safety-and-isolation**
10. `design-prompt-injection-defense` — explicit, distinct from safety guardrails
11. `design-prompt-leak-prevention` — system prompt protection
12. `design-tenant-prompt-isolation` — tenant prompts shouldn't bleed via shared models
13. `design-model-cache-isolation` — KV cache cross-tenant attack surface
14. `design-safety-guardrails` — content filtering, hallucination, output validation

**Cluster: eval**
15. `design-offline-eval` — deterministic, LLM-judge, regression
16. `design-online-eval` — 1% production sampling, drift
17. `design-adversarial-eval` — red-teaming, jailbreak resistance
18. `design-bias-fairness-eval` — demographic-subgroup eval
19. `design-eval-first-spec` — write eval before product

**Cluster: lifecycle-and-finops**
20. `design-shadow-mode` — new models in shadow before promotion
21. `design-model-lifecycle` — upgrades, deprecation, fallback, A/B
22. `design-ai-finops` — token attribution per call / provider / tenant / user; cache attribution
23. `design-ai-safety-policy` — model deprecation UX, content policy, escalation

**Cluster: roadmap-and-synthesis**
24. `design-ai-product-roadmap`
25. `design-ai-runtime` — synthesis workflow; gates QG-M3
26. `audit-ai-runtime` — runtime safety + tenant-leakage audit
27. `plan-ai-bolt-on` *(brownfield)*

### 5.4 `bmad-bam-rag` (8 skills — Nova)

1. `design-vector-store` — Pinecone / Qdrant / Weaviate / pgvector
2. `design-hybrid-search` — BM25 + dense + sparse fusion
3. `design-graph-rag` — knowledge graph construction
4. `design-multi-modal-rag` — text + image + audio retrieval
5. `design-contextual-retrieval` — Anthropic-style contextual chunks
6. `design-chunking` — semantic / late chunking / hierarchical
7. `design-knowledge-graph` — entity extraction, relationship modeling
8. `design-retrieval-eval` — precision@k, NDCG, latency, recall@k

### 5.5 `bmad-bam-integration` (13 skills — Kai)

1. `design-module-facades` — public API per module, versioning
2. `design-cross-module-messaging` — in-process event bus vs async queue
3. `design-api-gateway` — auth, rate limiting, routing, OpenAPI
4. `design-public-api` — REST / GraphQL / SDK strategy
5. `design-realtime-architecture` — WebSockets / SSE / WebRTC / durable objects / CRDTs
6. `design-webhook-system` — delivery guarantees, retry, signing
7. `design-saga-pattern` — distributed transactions
8. `design-circuit-breaker` — resilience patterns
9. `design-idempotency-keys` — request-level idempotency
10. `verify-convergence` — QG-I1/I2/I3
11. `plan-api-versioning` — expand-contract
12. `audit-integration` — contract drift, facade violations
13. `plan-module-extraction` — strangler-fig

### 5.6 `bmad-bam-trust` (16 skills — Cipher)

1. `design-zero-trust` — mTLS, identity propagation
2. `design-rbac-abac` — per-tenant role / attribute
3. `design-key-management` — BYOK, HSM, customer-managed regions
4. `design-audit-trail` — immutable logs, tamper-evidence
5. `design-pii-handling` — discovery, masking, minimization
6. `design-consent-management` — GDPR / CCPA consent flows
7. `design-content-moderation` — AI input / output filtering
8. `design-data-loss-prevention` — DLP for AI outputs
9. `design-ai-agent-identity` — audit trail for "user X via agent Y"
10. `design-ai-regulatory-tracking` — EU AI Act / US state law monitor
11. `design-model-card-publishing` — responsible AI disclosure
12. `map-compliance` — GDPR / HIPAA / SOC2 / PCI / ISO27001 / EU AI Act / NIST AI RMF / ISO 42001
13. `design-residency-controls` — controls *enforcing* residency
14. `design-vulnerability-mgmt` — SBOM, dependency scanning, CVE response
15. `verify-trust-controls` — QG-S1/S2, QG-C1/C2/C3
16. `audit-trust-posture` — security + compliance gap analysis

### 5.7 `bmad-bam-ops` (16 skills — Rune)

1. `design-observability` — OTel, tenant-scoped traces, AI-call instrumentation
2. `design-slo-error-budget` — per-service + per-tenant SLOs
3. `design-runbook-system` — runbooks-as-code (definition)
4. `design-runbook-automation` — runbook execution / triggered automation
5. `design-incident-response` — on-call (solo + AI variant), escalation
6. `design-on-call-handoff` — AI-augmented handoff at shift change
7. `design-chaos-engineering` — game days, fault injection
8. `design-canary-analysis` — statistical canary evaluation
9. `design-feature-flag-system` — LaunchDarkly / Unleash / PostHog / Statsig
10. `design-disaster-recovery` — RPO / RTO, failover drills
11. `design-ai-cost-spike-alert` — anomalous-cost detection per tenant
12. `design-tenant-data-sovereignty-validator` — runtime verification (vs design-time)
13. `design-customer-success-tooling` — observability for CS teams
14. `design-agent-debugging-tools` — debugging AI agents in prod
15. `verify-production-readiness` — QG-O1-3, QG-R1-3, QG-D1, QG-P1
16. `audit-operations` — observability + SRE + DR gap analysis

### 5.8 `bmad-bam-ux` (12 skills — Iris)

1. `design-theme-token-architecture` — design tokens, white-label
2. `design-accessibility-cohort` — WCAG per tenant tier
3. `design-multi-locale` — i18n, RTL, locale-aware AI responses
4. `design-white-label` — brand isolation, custom domain, email templates
5. `design-tenant-ui-customization` — feature-flag UI, tenant dashboards
6. `design-agent-ui-patterns` — chat / command-palette / sidebar / embedded
7. `design-trust-ui` — confidence indicators, sources, citations
8. `design-progressive-disclosure-ai` — revealing AI capabilities gradually
9. `design-empty-state-ai` — AI-generated empty states
10. `design-onboarding-ux` — user-facing first-run
11. `design-feature-deprecation-ux` — communicating feature removal
12. `audit-ux-consistency` — theme drift, accessibility regression

### 5.9 Cross-family workflows (12) — live in `bmad-bam-platform`

1. `bmad-bam-start` — entry orchestrator; greenfield / brownfield; module install + start workflows
2. `bmad-bam-smoke-test` — Wave 0 universal-glob verification; Plan A/B/C selection
3. `bmad-bam-backup` — timestamped archive of `_bmad/_memory/` + `_bmad/bam/evidence/`
4. `bmad-bam-restore` — validates + restores from archive
5. `bmad-bam-upgrade` — BAM-to-BAM module upgrade procedure (§10.4)
6. `bmad-bam-rollback` — clean partial-install state after install failure
7. `design-build-vs-buy` — systematic build / buy / open-source decision
8. `record-decision` — ADR workflow
9. `mediate-conflict` — Kai-led cross-persona conflict resolution
10. `refresh-knowledge` — re-runs `{date}` web queries; drift report
11. `waive-gate` — records gate waiver with expiration + compensating control
12. `verify-production-readiness-final` — composite gate across installed modules
13. `release-gate-orchestrator` — composes quality gates into release gates

**Total: 135 workflows** (16 + 14 + 27 + 8 + 13 + 16 + 16 + 12 + 13 cross-family = 135).

### 5.10 AI-augmented workflow execution mode

Each workflow step declares:

```yaml
---
step_id: 03-c-tenancy-decision
auto-runnable: false           # locked default: false (safe; opt-in to auto)
gate: human-approval           # or machine-checkable
inputs: [step-02-output]
outputs: [tenancy-decision.md]
---
```

- `auto-runnable: true` — AI executes step autonomously
- `auto-runnable: false` (default) — AI prepares step but pauses for human approval
- `gate: human-approval` — explicit decision point; never auto-runs
- `gate: machine-checkable` — AI validates against criteria; advances on pass

`execution_mode` in manifest:
- `assisted` (default for solo+AI) — auto-runnable steps execute; gates pause
- `manual` — every step pauses
- `fully-auto` — for trusted recurring workflows like `refresh-knowledge`
- `fully-auto --dry-run` — execute autonomously but write outputs to `_bmad/bam/cache/dry-runs/`; user reviews before applying

**Eval of auto-runnable steps:** each auto-runnable step ships a test fixture in workflow's `tests/` directory; CI runs tests on every PR.

---

## 6. Knowledge Architecture

### 6.0 `_bmad/bam/` umbrella directory structure

```
_bmad/
├── bam/                                  # BAM family umbrella
│   ├── family.json                       # {installed: [...], plan: A|B|C, shared-mode: bool}
│   ├── compatibility-matrix.csv
│   ├── customize-merge-rules.toml
│   ├── install-logs/
│   ├── backups/                          # auto-backup archives
│   ├── cache/                            # refresh-knowledge cached results, web-search results, workflow dry-runs (TTL: 30 days for web; persistent for dry-runs)
│   ├── locks/                            # file-based locks (`.lock` per workflow run); heartbeat-refreshed every 60s; stale locks (no heartbeat > 5 min) auto-cleared by `bmad-bam-start`
│   ├── cross-family-output/              # cross-family workflow outputs
│   ├── evidence/                         # gate evidence storage
│   │   └── <gate-id>/YYYY-MM-DD-NNN/
│   ├── release-runs/                     # release gate execution state
│   ├── standards/                        # family-wide standards (shared)
│   ├── docs/                             # auto-generated documentation
│   └── user/                             # user customization layer
│       ├── personas/
│       ├── patterns/
│       ├── workflows/
│       ├── gates/
│       ├── overrides/
│       └── user.toml
├── platform/                             # per-module synthesis
│   └── project-context.md
├── data/
│   └── project-context.md
├── ...
└── _memory/                              # persona sidecars
    ├── _meta/                            # cross-persona decisions (e.g., Kai escalation)
    ├── _archived/                        # archived orphaned personas
    └── <persona>/
        ├── architecture-decisions/
        ├── runtime-preferences.md
        └── integration-history.md
```

### 6.1 Per-module directory shape

```
bmad-bam-<module>/
├── module.yaml
├── agents/<persona>/
│   └── resources/
│       ├── <module>-index.csv
│       └── fragments/
├── skills/                          # 6-27 workflow skills (CEV)
│   └── bmad-bam-<workflow>/
│       ├── SKILL.md
│       ├── bmad-skill-manifest.yaml
│       ├── customize.toml
│       ├── workflow.md
│       ├── steps/
│       ├── templates/
│       └── tests/                   # workflow test fixtures
├── data/
│   ├── patterns/
│   ├── anti-patterns/
│   ├── checklists/
│   ├── csvs/
│   ├── standards/                   # module-specific (family-wide in _bmad/bam/standards/)
│   └── vertical-addons/             # opt-in packs (trust module only)
├── customize-templates/
├── mcp-server/                      # platform module only
├── tests/                           # module-level tests
└── scripts/
    └── post-install.sh
```

### 6.2 Fragment / pattern frontmatter schema

```yaml
---
id: model-routing-cost-aware
title: Cost-Aware Multi-Provider Model Routing
category: ai-runtime
kind: pattern                          # pattern | anti-pattern | fragment
qg_ref: QG-M3
last_reviewed: 2026-05-11
version: 1.0.0
status: active                         # active | deprecated | experimental
author: nova                           # persona or 'community'
references:                            # external citations
  - "https://docs.anthropic.com/..."
  - "https://arxiv.org/abs/..."
tested-against:                        # verification platforms with date
  - platform: "AWS Bedrock"
    verified: 2026-04-15
  - platform: "GCP Vertex AI"
    verified: 2026-03-22
---
```

10 fields (5 base + 2 governance + 3 provenance). Body carries substance.

### 6.3 Fragment body structure (~400-600 lines)

```markdown
## When to Use
## When NOT to Use
## Architecture
## Trade-offs
## Implementation Patterns
## Quality Checks
## Web Research Queries
## Cross-references
```

### 6.4 CSV index schema

```csv
id,name,description,tags,tier,fragment_file
model-routing-cost-aware,Cost-Aware Model Routing,Route LLM calls by cost/capability,"ai,routing,finops",core,fragments/model-routing-cost-aware.md
```

Columns: `id, name, description, tags, tier (core/extended/specialized), fragment_file`.

#### 6.4.1 Cross-referencing conventions (markdown-viewer compatible)

- **Fragment → fragment:** `[link text](../fragments/fragment-id.md) <!-- id: fragment-id -->`
- **Fragment → pattern:** `[link text](../../data/patterns/pattern-id.md) <!-- id: pattern-id -->`
- **Workflow step → pattern:** in step frontmatter: `pattern_ref: pattern-id`
- **Workflow step → fragment:** in step frontmatter: `fragment_ref: fragment-id`

Both relative path (markdown-renders correctly) and HTML-comment id (resolver finds in any module). `bmad-workflow-builder` validates at build.

**Rename handling:** `bmad-bam-rename-fragment <old-id> <new-id>` workflow refactors all cross-references atomically. Compile-time check in CI flags any orphaned references introduced by manual renames.

#### 6.4.2 Pattern → workflow referencing

```markdown
## Used by workflows
- `design-model-routing` (primary)
- `design-ai-finops` (secondary)
```

Auto-generated from CSV indexes during `bmad-bam-platform` post-install.

### 6.5 Anti-patterns library

Each module ships `data/anti-patterns/` with `kind: anti-pattern` in frontmatter:

```yaml
---
id: single-model-lockin
title: Single-Model Vendor Lock-in
category: ai-runtime
kind: anti-pattern
related-patterns: [model-routing-cost-aware]
last_reviewed: 2026-05-11
version: 1.0.0
status: active
author: nova
---
```

### 6.6 Standards (family-wide + per-module)

**Family-wide** in `_bmad/bam/standards/` (after install):

- `std-validation.md` — validation format used by `verify-*` workflows
- `std-convergence.md` — convergence verification format
- `std-gate.md` — quality gate document format
- `std-frontmatter.md` — frontmatter schema reference
- `std-anti-pattern.md` — anti-pattern document format
- `std-adr.md` — ADR template
- `std-conflict-resolution.md` — conflict-resolution document format

Family-wide standards live in `bmad-bam-platform/data/standards/` and sync to `_bmad/bam/standards/` on install.

**Per-module** `data/standards/` only when module extends family-wide standards (e.g., `bmad-bam-trust` extends `std-gate.md` for compliance gates).

### 6.7 Vertical add-on packs (canonical-source + reference model)

Vertical packs live canonically in `bmad-bam-trust/data/vertical-addons/<pack-id>/`. Other affected modules **reference** fragments via cross-references, **not** by duplicating files. This avoids sync drift.

Each pack ships `manifest.yaml`:

```yaml
id: vertical-healthcare
title: Healthcare Vertical Pack
canonical-location: bmad-bam-trust/data/vertical-addons/vertical-healthcare/
affected-modules:
  trust: [phi-redaction, hipaa-controls, baa-templates]
  data:                                # data module references via fragment-ref
    - reference: trust:phi-redaction
      context: phi-storage             # specifies which context fragment is loaded in
    - reference: trust:hipaa-retention
      context: data-retention
  ai:
    - reference: trust:clinical-evidence-eval
      context: medical-eval
customize-overlays:
  - skill: bmad-create-prd
    modules: [trust, ai]
  - skill: bmad-validate-prd
    modules: [trust]
```

**Install:** `bmad install-vertical-pack vertical-healthcare` installs to canonical location + registers references in affected modules' index CSVs + applies overlays. **No duplication.** Updates to fragments propagate automatically via reference resolution.

**8 packs:**

| Pack | Affected modules | Adds |
|---|---|---|
| `vertical-healthcare` | trust, data, ai | HIPAA + PHI + clinical evidence eval + FDA SaMD |
| `vertical-finance` | trust, data, integration | SOC2 + PCI-DSS + transaction integrity + audit |
| `vertical-legal` | trust, data, ai | Privilege protection + citation grounding + matter-scoped |
| `vertical-education` | trust, data | FERPA + COPPA + student residency |
| `vertical-government` | trust, ops | FedRAMP + StateRAMP + sovereign cloud |
| `vertical-eu` | trust, ai | GDPR + EU AI Act high-risk + DPIA |
| `vertical-pharma` | trust, data, ops | GxP + 21 CFR Part 11 + audit |
| `vertical-retail` | trust, ux | PCI-DSS + consent + dynamic pricing |

### 6.8 Knowledge currency governance — topic-specific thresholds

| Field | Purpose |
|---|---|
| `last_reviewed` | Date of last review |
| `version` | Semver (major = breaking decision change) |
| `status` | `active` / `deprecated` / `experimental` |

**Topic-specific staleness thresholds:**

| Topic category | Stale after |
|---|---|
| Model routing / AI runtime patterns | 30 days |
| RAG / retrieval | 60 days |
| Compliance / regulatory | 90 days |
| Tenant isolation / security | 90 days |
| Modular monolith / foundational architecture | 180 days |
| UX / accessibility | 90 days |
| SRE / observability | 60 days |

`refresh-knowledge` flags fragments past their topic-specific threshold.

**Event-driven refresh (in addition to time-driven):**

Events that immediately flag patterns/fragments for refresh, regardless of `last_reviewed` date:

| Event | Affects |
|---|---|
| Major foundation-model release (e.g., GPT-5, Claude 5) | All `category: ai-runtime` fragments with `recommended_capabilities` referencing affected model |
| Regulatory change (EU AI Act amendment, state privacy law) | All `category: compliance` fragments in affected jurisdiction |
| Security disclosure (CVE in framework BAM references) | All fragments with that framework in `tested-against` |
| MAJOR BMAD version release | All customize-templates + persona overlays |
| New BAM module added | All cross-family workflow patterns referencing module-installation graph |

User can register events via `bmad-bam-event <type> <description>`; recorded to `_bmad/bam/events.log`; next `refresh-knowledge` reads log and flags affected fragments.

**Offline / air-gapped mode:** `refresh-knowledge --offline` skips web queries; flags fragments past threshold without re-querying; useful for air-gapped environments. Manual refresh by user expected in offline mode.

**Maintenance burden:** ~20h / quarter refresh; ~40h / year deprecation handling.

### 6.9 Knowledge graph navigation

- Per-module CSV index (primary lookup)
- Auto-generated `_bmad/bam/docs/PATTERNS.md` (family-wide catalog)
- Auto-generated `_bmad/bam/docs/WORKFLOWS.md` (workflow → pattern reverse map)
- MCP server `query-pattern` for semantic search
- `bmad-bam-start` recommends workflow sequences per project profile

### 6.10 Context budget management

With 8 modules' `project-context.md` files + persona sidecars + fragments + patterns, context can exceed budget. Spec:

- **Tier-1 (always loaded):** `_bmad/<module>/project-context.md` for installed modules — synthesis files only (~2-5K tokens each)
- **Tier-2 (workflow-invocation loaded):** persona definition + sidecar memory for invoked persona only
- **Tier-3 (step-invocation loaded):** specific fragments / patterns referenced in step frontmatter
- **Tier-4 (on-demand):** vertical-addon fragments only if installed pack matches workflow

**Budget guardrails in `_bmad/bam/family.json`:**

```json
{
  "context-budget": {
    "tier1-total-max-tokens": 40000,
    "tier1-per-module-max-tokens": {
      "platform": 5000,
      "data": 4000,
      "ai": 8000,                        // ai is the densest module
      "rag": 4000,
      "integration": 5000,
      "trust": 6000,
      "ops": 4000,
      "ux": 4000
    },
    "tier2-max-tokens": 20000,
    "warn-at-tier3-tokens": 30000,
    "fail-at-total-tokens": 150000
  }
}
```

`bmad-bam-start` checks budget on session start; warns if approaching limits. Per-module limits enforced at `project-context.md` generation time; oversize synthesis files truncated with warning.

---

## 7. Customize Templates

### 7.1 The universal-glob mechanism

BMAD v6.4.0+ ships every core skill's `customize.toml` with:

```toml
[agent]
persistent_facts = [
  "file:{project-root}/**/project-context.md",
]
```

Each BAM module's post-install hook generates `_bmad/<module>/project-context.md`. BMAD's universal glob auto-loads into every core skill's context.

**Detection:** `bmad-bam-smoke-test` verifies universal-glob presence in user's BMAD install before relying on it.

### 7.2 Customize-templates inventory (~15)

| BMAD skill | BAM modules | Adds |
|---|---|---|
| `bmad-brainstorm` | platform, ai, trust | Multi-tenant brainstorming; tenancy/AI/compliance lenses |
| `bmad-create-product-brief` | platform, ai, trust | Tier modeling, AI capability mapping, compliance scope |
| `bmad-create-research-prompt` | trust | Compliance framework selection |
| `bmad-create-prd` | platform, ai, trust | Tenant requirements, AI safety, compliance impact |
| `bmad-validate-prd` | all 8 | Tenant / AI / compliance / observability / UX verification |
| `bmad-create-architecture` | all 8 | Cross-references all 6 personas; pattern catalog; gates |
| `bmad-create-story` | platform, ux | Tenant-scoped AC; UX considerations |
| `bmad-check-implementation-readiness` | all 8 | QG-* gate references |
| `bmad-code-review` | platform | Tenant-context propagation; tenant-leakage |
| `bmad-correct-course` | all 8 | Retrospective discipline; drift detection |
| `bmad-retrospective` | platform, ai, trust, ops | Tenant / AI / compliance / SLO retrospective |
| `bmad-qa-generate-e2e-tests` | platform | Multi-tenant test scenarios |
| `bmad-investigate` | ai, trust | AI capability + compliance deep-dives |
| `bmad-checkpoint-preview` | ops | Production-readiness preview |
| `bmad-design-test-strategy` | platform, ai | Multi-tenant test strategy + AI eval coverage |

### 7.3 Wave 0 — `bmad-bam-smoke-test` workflow

`bmad-bam-smoke-test` runs:

1. Verify BMAD `>= 6.4.0` installed
2. Verify universal-glob present in BMAD core skills' `customize.toml`
3. Install `bmad-bam-platform` in test mode
4. Generate `_bmad/platform/project-context.md` with sentinel token `BAM_LOAD_VERIFY_<uuid>`
5. Run `bmad-create-architecture` with debug logging; check sentinel token appears in loaded context
6. Run `bmad-create-prd` with same check
7. **Select plan** based on outcomes:
   - **Plan A** if steps 5-6 pass without manual `bmad-customize`
   - **Plan B** if A fails but explicit `customize.toml` overlay in install hook passes
   - **Plan C** if B fails but manual `bmad-customize bmad-bam-platform` passes
8. Persist plan in `_bmad/bam/family.json: { "plan": "A|B|C" }`
9. Re-run on every BMAD upgrade (auto-triggered by `bmad-bam-start`)

**Wave 0 effort:** ~16-40h (range absorbs Plan B/C investigation).

### 7.4 BMM phase integration

| BMM Phase | BAM contribution |
|---|---|
| **Phase 0 (Init)** | BAM not yet installed; no contribution |
| **Phase 1 (Analysis)** | Cipher compliance overlay; Atlas tenancy overlay; Nova AI capability overlay |
| **Phase 2 (Plan)** | All 6 personas via PRD overlays; QG-F1 fires at exit |
| **Phase 3 (Solutioning)** | Each persona owns module-architecture skill; per-module QGs fire |
| **Phase 4 (Implementation)** | Tenant-context in code review; QG-TC4 continuous |
| **Pre-prod** | QG-O1-3, QG-R1-3, QG-C1-3, QG-S1-2, QG-D1, QG-P1 fire |
| **Production** | `refresh-knowledge` monthly; release gates on demand |

### 7.5 Template merging strategy

When 2+ BAM modules overlay the same BMAD skill:

1. **Default merge order:** install order (first installed → first applied)
2. **Override:** `_bmad/bam/customize-merge-rules.toml` is user-editable, takes precedence
3. **Sections additive:** `principles`, `persistent_facts`, `activation_steps_append` concatenated
4. **Menu entries:** unioned; conflicts (same `code`) raise install error
5. **Settings:** explicit merge strategy per setting:
   - `model:` → last-write-wins (warned)
   - `temperature:` → last-write-wins (warned)
   - `max_tokens:` → MIN of all (safest)
   - Boolean flags → OR (any module wanting `true` wins)

---

## 8. Quality Gates & Release Gates

### 8.1 Quality gates (~28) — schema with criticality + depends-on

Each gate document (`<module>/data/checklists/QG-*.md`) has frontmatter:

```yaml
---
id: QG-M2
title: Tenant Isolation
module: bmad-bam-platform
phase: solutioning
criticality: blocking          # blocking | advisory
depends-on: [QG-F1, QG-M1]    # other gates that must pass first
evidence-depends-on:           # specific evidence files required
  - QG-M1/criteria-met.md
  - QG-F1/tenancy-decision.md
auto-checkable: 60%            # per-gate; not blanket
human-review: 40%
---
```

**Criticality default = advisory.** Blocking gates explicitly marked. **Per-gate ratios:** the auto-checkable / human-review percentages above are per-gate-specific (e.g., QG-O1 Observability may be 80% auto-checkable since it's instrumentation-based; QG-C2 Compliance Evidence may be 10% auto-checkable since it requires human attestation).

**Gate catalog (summary):**

| Gate | Module | Phase | Criticality | Summary |
|---|---|---|---|---|
| QG-F1 Foundation | platform | End Phase 2 | blocking | Tenancy + monolith + FinOps + tier defined |
| QG-M1 Platform Module Arch | platform | Phase 3 | blocking | Module boundaries + facade contracts |
| QG-M2 Tenant Isolation | platform | Phase 3 | blocking | Isolation verified; tests defined |
| QG-M3 AI Runtime | ai | Phase 3 | blocking | Model routing + safety + eval coverage |
| QG-DA1 Data Architecture | data | Phase 3 | blocking | Schema + CDC + retention defined |
| QG-RQ1 RAG Quality | rag | Phase 3 | advisory | Retrieval eval thresholds met |
| QG-UX1 UX Consistency | ux | Phase 3 | advisory | Theme tokens + accessibility per tier |
| QG-I1 Integration Boundaries | integration | Phase 3 | blocking | Public APIs documented; idempotency |
| QG-I2 Convergence | integration | Phase 3 | blocking | All facades converge |
| QG-I3 Cross-Module Messaging | integration | Phase 3 | blocking | Event schemas versioned |
| QG-O1 Observability | ops | Pre-prod | blocking | All services / AI instrumented |
| QG-O2 SLO Definition | ops | Pre-prod | blocking | Per-service + per-tenant SLOs |
| QG-O3 Cost Visibility | ops | Pre-prod | advisory | Cost per call / tenant / model surfaced |
| QG-R1 Runbook Coverage | ops | Pre-prod | blocking | Top-N incident runbooks tested |
| QG-R2 Chaos Discipline | ops | Pre-prod | advisory | Game day executed |
| QG-R3 On-call Readiness | ops | Pre-prod | advisory | Rotation defined |
| QG-C1 Compliance Map | trust | Pre-prod | blocking | Frameworks mapped to controls |
| QG-C2 Compliance Evidence | trust | Pre-prod | blocking | Evidence collected per control |
| QG-C3 Compliance Audit | trust | Pre-prod | blocking | External audit dry-run passes |
| QG-S1 Zero-Trust | trust | Pre-prod | blocking | mTLS verified; identity propagation |
| QG-S2 Model / Tool Safety | trust | Pre-prod | blocking | Adversarial eval + output guardrails |
| QG-D1 DR Plan | ops | Pre-prod | blocking | RPO / RTO defined; failover documented |
| QG-DR2 DR Drill | ops | Annual | advisory | Drill executed against RPO / RTO |
| QG-P1 Production Readiness | platform | Pre-launch | blocking | All P1-required gates pass |
| QG-TC4 Tenant Context | platform | Continuous | advisory | No tenant-context leakage |

Detailed criteria in owning module's `data/checklists/<gate>.md`.

### 8.2 Release gates (8)

| Release gate | Composes | Trigger |
|---|---|---|
| RG-Launch | QG-F1, all M*, all I*, all O*, all R*, all C*, all S*, QG-D1, QG-P1 | Initial product launch |
| RG-Tenant-Onboard | QG-TC4, QG-S1, QG-C1 (Compliance Map subset for tenant region), QG-C2 (Compliance Evidence subset) | New tenant signs up |
| RG-Model-Upgrade | QG-M3, QG-S2, QG-O3 | Provider releases new model |
| RG-Region-Launch | QG-C* (residency), QG-D1, QG-O* | New geographic region |
| RG-Audit | QG-C1-3, QG-S1-2, audit-trust-posture | External audit |
| RG-DR-Test | QG-DR2 | Quarterly DR drill |
| RG-Version-Bump | QG-M* (regression), QG-I*, QG-O3 | Major version of any module |
| RG-Module-Split | QG-I1-3, plan-module-extraction | Extracting module to service |

### 8.3 Release gate orchestration logic

`release-gate-orchestrator`:

1. Resolve composition (list QG-* required)
2. Build dependency graph (gates' `depends-on` + `evidence-depends-on` fields)
3. **Verify evidence prerequisites** — before running a gate, check that all files in its `evidence-depends-on` exist and are not stale (i.e., reflect current code state)
4. **Parallel where possible** — independent gates run concurrently
5. **Stop-on-blocking-fail** — gates with `criticality: blocking` halt run on fail
6. **Report-all-advisory** — advisory failures recorded; group by severity in summary to reduce noise
7. Persist state to `_bmad/bam/release-runs/<rg-id>-YYYY-MM-DD-NNN/`
8. Produce `release-summary.md` with pass / fail / waiver per gate
9. Append ADR in Kai's sidecar

### 8.4 Gate evidence storage

```
_bmad/bam/evidence/<gate-id>/YYYY-MM-DD-NNN/
├── criteria-met.md
├── artifacts/
├── decision.md
└── retrospective.md
```

Evidence git-tracked. **Encryption-at-rest:** deferred to v6.x design doc — depends on deployment model (local-only, cloud-backed, multi-user). Note in `_bmad/bam/evidence/README.md` warning about sensitive content.

### 8.5 Continuous gates (QG-TC4 specifics)

QG-TC4 fires on:
- Every PR review via `bmad-code-review` customize-template
- Every story validation via `bmad-create-story`
- Every implementation-readiness check

Execution: hooked into BMAD code-review skill output; evidence per-PR in `_bmad/bam/evidence/QG-TC4/`.

### 8.6 Gate waiver process

`waive-gate <gate-id>` workflow:

1. Prompts for: reason, expiration date, compensating control
2. Records waiver as `_bmad/bam/evidence/<gate-id>/YYYY-MM-DD-NNN/waiver.md`
3. Waivers visible in `release-summary.md`
4. Waivers auto-expire; expired waivers re-trigger gate
5. **Expiration enforcement:** checked on (a) every release-gate-orchestrator run, (b) every `bmad-bam-start` session-start, (c) on-demand via `bmad-bam-waivers --check-expired`

**Waiver chain (locked for solo+AI):**
- User-direct (only signer)
- Auto-logged with timestamp + reason
- ADR recorded in Cipher's sidecar (compliance traceability)

For multi-team future: chain extensible via `_bmad/bam/user/user.toml: waiver-approvers: [...]`.

---

## 9. Tool Integration

### 9.1 bmad-builder usage

| Artifact | Built via |
|---|---|
| 8 module.yaml | `bmad-module-builder` |
| 6 persona declarations | `bmad-agent-builder` |
| ~135 workflows | `bmad-workflow-builder` |
| Eval suites | `bmad-eval-runner` |
| BMB setup | `bmad-bmb-setup` |

### 9.2 bmad-party-mode integration

All 6 BAM personas auto-register from `module.yaml agents:` block.

### 9.3 bmad-retrospective integration

Each persona's `bmad-retrospective` customize overlay adds domain-specific retrospective questions.

### 9.4 i18n inheritance

All personas respect BMM's `communication_language`; artifacts respect `document_output_language`.

### 9.5 MCP server for BAM knowledge — transport + auth locked

`bmad-bam-platform/mcp-server/`:

- **Transport: stdio** (local-only, Anthropic best practice)
- **Auth: filesystem permissions only** (server reads `_bmad/` with current user's permissions)
- **For remote access:** v6.x design doc (tightening required; current scope is local Claude Code use)

**Tools exposed:**

| Tool | Purpose |
|---|---|
| `query-pattern` | Get pattern by id / tag |
| `query-fragment` | Get fragment by id |
| `list-personas` | List installed BAM personas |
| `get-persona-memory` | Read sidecar memory |
| `record-decision` | Append ADR |
| `query-gate` | Get gate criteria |
| `record-gate-evidence` | Store gate evidence |
| `list-installed-modules` | Read `_bmad/bam/family.json` |

MCP server optional; Claude Code uses universal-glob directly.

### 9.6 BAM testing strategy

Each module ships `tests/`:

| Category | Scope |
|---|---|
| `workflow-smoke-tests/` | Each workflow runs to completion on fixtures |
| `workflow-latency-tests/` | Verifies workflow `latency-budget` field is respected |
| `pattern-validation/` | Frontmatter + cross-refs + `last_reviewed` currency |
| `customize-template-tests/` | Overlays apply cleanly |
| `gate-evidence-tests/` | Gates produce well-formed evidence |
| `family-integration-tests/` (platform + per-module) | Each module ships its own integration scenarios |
| `auto-runnable-step-evals/` | Pass/fail + quality-score (0-1.0) for auto-runnable step outputs |

CI runs all on every PR. Test naming follows BMAD framework.

**Auto-runnable step eval frame:**
- **Pass/fail:** binary; step produced an output that matches expected output schema
- **Quality-score (0.0-1.0):** LLM-judge or deterministic rubric grades content quality; threshold per workflow declared in `bmad-skill-manifest.yaml`: `auto-runnable-quality-threshold: 0.80`
- Below-threshold outputs flagged; user reviews

### 9.7 Auto-generated documentation

Post-install hook updates `_bmad/bam/docs/`:

| File | Content |
|---|---|
| `INDEX.md` | Installed modules + versions + smoke-test plan |
| `WORKFLOWS.md` | All workflows with descriptions, inputs, outputs |
| `PATTERNS.md` | All patterns with shortcodes, categories |
| `GATES.md` | All gates with criteria summary |
| `PERSONAS.md` | All personas + owned modules + pairings |

Each doc carries `last-updated: <ISO timestamp>` for version tracking.

### 9.9 BAM runtime telemetry / health

BAM ships local-only telemetry to detect runtime issues:

```
_bmad/bam/telemetry/
├── health.json                 # last-known status per module
├── workflow-runs.log           # workflow invocation history (timestamped)
├── error-events.log            # errors during workflow / template loading
└── refresh-history.log         # refresh-knowledge run outcomes
```

`bmad-bam-health` workflow:
- Reads `family.json`, verifies all installed modules' files present + non-empty
- Verifies customize-templates load without errors (re-runs smoke-test if any fail)
- Reports installed-module versions vs compatibility-matrix
- Surfaces locks held > 5 min (stuck workflow runs)
- Flags fragments past topic-specific staleness threshold (count summary)

Runs automatically on `bmad-bam-start`; manually via `bmad bmad-bam-health`.

**No external telemetry.** Health data stays in `_bmad/bam/telemetry/`; never transmitted off-machine.

### 9.8 User customization layer + non-overridable defaults

`_bmad/bam/user/` is user-owned and survives BAM upgrades.

**Load order:** BMAD core → BAM modules → User layer (highest priority).

**Non-overridable BAM defaults** (cannot be overridden by user layer; enforced at load time):

| Default | Reason |
|---|---|
| `audit-trail: required = true` | Compliance evidence chain |
| `tenant-isolation: enabled = true` | Multi-tenancy core safety |
| `pii-redaction: ai-outputs = true` | Privacy law compliance |
| `key-rotation: max-age-days <= 90` | Security baseline |
| `model-rollback: required = true` (for production deploys) | AI safety |
| `evidence-immutability: append-only = true` | Audit traceability |

User attempting to override emits install/load error with reference to this list.

---

## 10. Release Path

### 10.1 Wave plan

| Wave | Modules | Effort | Outcome |
|---|---|---|---|
| **Wave 0** | smoke-test prototype | ~16-40h | Universal-glob verified; Plan A/B/C selected |
| **v6.0** | platform, data, ai, ux | ~1500h | Foundation + data + AI runtime + UX. End-to-end SaaS design with full UX |
| **v6.1** | rag, integration | ~700h | Knowledge layer + cross-module boundaries |
| **v6.2** | trust, ops | ~1100h | Audit-ready + production-ready. OpenSRE evaluation decision |
| **v6.x** | Vertical packs + brownfield + refresh | ongoing | Additional verticals, regulatory, multi-region |

**Total Wave 0 → v6.2: ~3200-4000h.**

### 10.5 Concrete timeline (solo developer)

To make the effort tangible:

| Scenario | Hours/week | Wave 0 | v6.0 | v6.1 | v6.2 | Total elapsed |
|---|---|---|---|---|---|---|
| Part-time (10h) | 10 | 2-4 wk | 38 wk | 17 wk | 28 wk | ~85 wk (~1.6 yr) |
| Half-time (20h) | 20 | 1-2 wk | 19 wk | 9 wk | 14 wk | ~43 wk (~10 mo) |
| Full-time (40h) | 40 | 1 wk | 10 wk | 4 wk | 7 wk | ~22 wk (~5 mo) |
| Heavy (80h) | 80 | <1 wk | 5 wk | 2 wk | 4 wk | ~11 wk (~3 mo) |

**Opportunity cost note:** every hour on BAM is an hour not building the product BAM serves. For solo developer, prioritize Wave 0 + v6.0 platform module first; defer ai/data/ux until product needs them.

### 10.2 Why this order

- `platform` root dep — ships first
- `data` cohesive with platform (Atlas owns both)
- `ai` ships in v6.0 — core differentiator
- `ux` ships in v6.0 — white-labeling foundational for first tenant
- `rag` + `integration` in v6.1 — needed before full production
- `trust` + `ops` in v6.2 — gates `RG-Launch`

### 10.3 Verification per wave

| Wave | Verification |
|---|---|
| Wave 0 | Universal-glob load verified; Plan selected; `bmad-bam-smoke-test` passes |
| v6.0 | All 4 modules' workflows run in sample project; customize templates auto-load; QG-F1 + QG-M1-3 + QG-DA1 + QG-UX1 fire correctly |
| v6.1 | Integration + RAG workflows; QG-I1-3 + QG-RQ1; convergence verification clean |
| v6.2 | Full RG-Launch composite; all gates fire and produce evidence; OpenSRE decision documented |

**Wave skipping:** v6.0 → v6.2 (skip v6.1) is permitted but flagged in `family.json` and requires explicit user acknowledgment of missing RAG + integration patterns.

**Wave rollback:** If post-install verification fails, automatic rollback to previous wave's state via `_bmad/bam/install-logs/<wave>/rollback.sh`. User notified; root cause analysis required before re-attempt.

### 10.4 BAM-to-BAM upgrade procedure

`bmad-bam-upgrade <target-version>`:

1. Verify target version compatible with installed BMAD (compatibility-matrix.csv)
2. Run `bmad-bam-backup` automatically
3. Update each installed module to target version (in dependency order)
4. Re-run `bmad-bam-smoke-test`
5. Re-sync compatibility-matrix.csv
6. Run per-module `audit-*` workflows to catch drift
7. Update `_bmad/bam/family.json`
8. Report changes in `_bmad/bam/docs/UPGRADE-NOTES-<version>.md`

If smoke test fails: automatic rollback via backup restore.

---

## 11. Anti-Patterns / What v6 Does NOT Do

| Anti-pattern | Why avoided |
|---|---|
| Single mega-module | v3 problem; 8 modules give selective install |
| Hand-rolled module.yaml | Use `bmad-module-builder` |
| Public-release plumbing | Private use; no marketplace.json, no semver contract |
| Hard dependency on OpenSRE | Deferred to v6.2 evaluation |
| Replacing BMM personas | Overlay via customize-templates |
| Persona-per-module rigidity | Atlas + Nova each own 2 modules |
| Rich frontmatter | 10 fields max; body carries substance |
| Hardcoded `{date}` | Use placeholder; `refresh-knowledge` re-runs queries |
| Bundling vertical compliance defaults | Verticals opt-in fragment packs |
| `memories` key in TOML | Always `persistent_facts` |
| Building on un-versioned BMAD dependency | Always pin `bmad: ">=6.4.0,<7.0.0"` |
| Generating content without user input | BMAD core rule reinforced |
| Skipping smoke tests after Plan A worked once | Re-run on every BMAD upgrade |
| Trusting LLM outputs as compliance evidence | Compliance requires human sign-off |
| Conflating tenant-isolation tests with general tests | Dedicated suite with per-tenant fixtures |
| Vector DB as source of truth | Vector DB is cache; canonical data in OLTP / lakehouse |
| AI behind opaque API without eval visibility | Every AI call carries trace context |
| Shipping models without rollback plan | `design-model-lifecycle` mandates rollback |
| Hardcoding model names in patterns | Use `{model-id}` placeholder; model names change |
| Tightly coupling BAM workflows to specific cloud | Patterns cover multiple providers |
| Last-minute compliance evidence collection | Continuous via `audit-trust-posture` cadence |
| Premature cost optimization | Correctness first; then design-ai-finops |
| LLM for high-stakes decisions without human review | Always human-in-loop for blocking gates |
| PII in vector embeddings | Re-identification risk; redact before embedding |
| Skipping persona memory because solo dev | Memory compounds across sessions; required discipline |
| Eval over-fitting to easy cases | Adversarial + bias-fairness eval required |
| AI-generated content without attribution | Every AI-drafted ADR / artifact carries `generated-by: <model>` field |
| Skipping persona introspection | Personas occasionally `record-decision` about their own operation, captured in `_meta/` sidecar |
| Treating BAM as code | BAM is design-time methodology, not import-as-library; don't `require('bam-patterns')` in product code |
| Stale CLAUDE.md | Root CLAUDE.md describes current BAM version; updated alongside spec |
| Multi-persona pile-on | Don't invoke all 6 personas for every question; dilutes signal — start with 1-2, expand only on need |
| Cargo-cult sub-pattern application | Apply foundational patterns (QG-F1) before advanced ones |
| Missing `{date}` placeholder | Patterns become stale silently if hardcoded year; use placeholder + refresh-knowledge |

---

## 12. Open Questions / Future Work

| Topic | Target | Promotion criteria |
|---|---|---|
| OpenSRE integration depth | v6.2 evaluation | Decision before v6.2 ships |
| Vertical-specific deeper packs (FDA AI guidance, EU AI Act high-risk specifics) | v6.x | Triggered by: first product in that vertical |
| Multi-region patterns | v6.x | Triggered by: first region-launch |
| Real-time-first agent patterns | v6.x | Triggered by: industry maturation or product need |
| Open-weights inference patterns (vLLM / TGI / SGLang) | v6.x | Triggered by: model strategy expansion |
| Edge inference patterns (WebGPU / on-device) | v6.x | Triggered by: edge becomes product strategy |
| Evidence encryption-at-rest | v6.x | Triggered by: cloud-backed deployment or multi-user |
| MCP server remote-access auth | v6.x | Triggered by: non-Claude-Code MCP client need |
| Marketplace / public release | v7+ | Explicit decision to open-source |
| Sustainability / green-AI tracking | v6.x | Triggered by: regulatory or customer requirement |
| AI agent personhood / legal frameworks | v6.x | Triggered by: regulatory evolution |

**General promotion criteria:** production incident exposes gap, user-discovered gap, regulatory change, major model-family release, BMAD version-bump compatibility break.

---

## 13. Migration from v3

### 13.1 Migration path

1. Wave 0 verifies new mechanism
2. v3 stays installed through v6.0 development; not removed until v6.2 ships
3. Knowledge port: v3's 112 patterns + 30 fragments reviewed for inclusion
4. Skill port: v3's 5 retained skills map to v6 workflows
5. Sidecar memory port: v3's monolithic memory files → per-persona sidecars
6. External submodules (`external/bmad-method`, `external/bmad-tea`, etc.) remain as references during v6 development; retired after v6.2 ships
7. `CLAUDE.md` updated to describe v6 (currently describes v3); v3 `CLAUDE.md` archived to `docs/v3/CLAUDE.md`

### 13.2 Migration completion checklist

| Item | Target | Tracked in |
|---|---|---|
| Patterns ported | 60-80 of 112 | `MIGRATION-V2-TO-V3.md` updates |
| Skills mapped | 5 of 5 | Migration map appendix |
| Memories ported | All 3 sidecar files → per-persona ADRs | `record-decision` runs |
| CSV registries reconciled | 6 v3 CSVs → 8+ v6 module CSVs | Per-module index validation |
| Customize templates ported | v3's 3 → v6's ~15 | Customize inventory |
| Vertical packs identified | 0 of 6-8 (greenfield) | Trust backlog |
| Smoke test passed | Yes/No, plan selected | `_bmad/bam/family.json` |
| External submodules retired | After v6.2 ships | Submodule status |
| `CLAUDE.md` updated for v6 | Before v6.0 ship | Repo root |
| First product reaches RG-Launch | Pending | Release run record |

**Migration declared complete when:** all 10 checklist items checked off AND v6.2 has shipped AND first product reaches RG-Launch. Until all three hold, v3 stays installed alongside.

---

## 14. Glossary

- **ADR** — Architecture Decision Record (in persona sidecar)
- **Agent (BMAD)** — first-class persona in `module.yaml agents:` block
- **Agent (BAM persona)** — Atlas / Nova / Kai / Cipher / Rune / Iris
- **Agent (runtime AI)** — LLM-based agent executing in product runtime
- **Auto-runnable** — workflow-step attribute; AI executes vs pauses for approval (default: false)
- **BAM** — BMAD Agentic Multi-tenant; private extension family
- **BAM family** — the 8 BAM modules collectively
- **BMM** — bmad-method, canonical BMAD methodology module
- **CEV** — Create / Edit / Validate; workflow modes
- **Composite gate** — release gate composed of multiple quality gates
- **Cross-family workflow** — lives in `platform`; operates across installed BAM modules
- **Customize merge** — how BAM modules' customize-templates combine for the same BMAD skill
- **Customize template** — TOML overlay extending BMAD core skill via universal-glob
- **Drift report** — output of `refresh-knowledge`
- **Eval-driven development** — write eval before product feature
- **Family version** — known-good combo of module versions
- **Forward compatibility policy** — minor BMAD upgrade triggers smoke-test re-run; major requires matrix update
- **Fragment** — substantive knowledge content at `agents/<persona>/resources/fragments/`
- **Kai escalation** — when Kai is party to conflict: user-direct → Winston → `_meta/` ADR
- **MCP** — Model Context Protocol (Anthropic standard); stdio transport, fs-permission auth (v6.0)
- **Module family** — group of related canonical BMAD modules
- **Non-overridable default** — BAM default user-layer cannot override (e.g., audit trail required)
- **Orphan persona** — persona whose owning module(s) all uninstalled
- **Pattern** — decision-ready architectural guidance at `data/patterns/`
- **Persona arbiter** — Kai; default arbiter for inter-persona conflicts
- **Persona overlay** — customize-template extending a BMM persona
- **Phase** — BMM lifecycle stage (Analysis, Plan-Workflows, Solutioning, Implementation)
- **Plan A/B/C** — Wave 0 outcomes (universal-glob / customize-overlay / manual customize)
- **QG-** — Quality Gate
- **RG-** — Release Gate
- **Runtime** — product execution environment (vs design-time = BAM/BMAD)
- **Sidecar memory** — per-persona project-local memory at `_bmad/_memory/<persona>/`
- **Smoke test** — `bmad-bam-smoke-test` workflow verifying universal-glob
- **Solo+AI** — operating mode: single developer + Claude as collaborator
- **Tenant** — isolated customer organization within multi-tenant SaaS
- **Tenant context** — per-request identifier propagated through all code paths
- **Tenant tier** — pricing / feature / support level
- **Tier (knowledge)** — fragment classification: core / extended / specialized
- **Universal glob** — `file:{project-root}/**/project-context.md` in BMAD core customize.toml
- **User customization layer** — `_bmad/bam/user/` for user-owned overrides
- **Vertical add-on pack** — opt-in fragment bundle spanning affected modules
- **Voice** — persona's communication style (Atlas voice: structural engineer; etc.)
- **Wave** — BAM family release stage (Wave 0, v6.0, v6.1, v6.2, v6.x)

---

## 15. How Claude Consumes BAM

### 15.1 Discovery
Claude reads `_bmad/bam/family.json` for installed modules + plan in effect.

### 15.2 Context load (tiered)
BMAD's universal-glob loads Tier-1 (`_bmad/<module>/project-context.md` synthesis files). Tier-2 (persona definition + sidecar) loads on persona invocation. Tier-3 (specific fragments/patterns) loads on step invocation. Tier-4 (vertical addons) on-demand.

### 15.3 Persona invocation
User says `@Atlas`; Claude loads persona definition + `_bmad/_memory/atlas/`.

### 15.4 Workflow selection
User runs `bmad <skill>` — Claude executes CEV steps with `auto-runnable` honoring `execution_mode`. Unknown workflow → fuzzy-match suggestion based on `_bmad/bam/docs/WORKFLOWS.md`.

### 15.5 Conflict mediation
When Claude detects conflicting persona recommendations within a workflow, surfaces conflict; offers `@Kai mediate` (or escalation if Kai is party).

### 15.6 Decision recording
After workflow completion, Claude prompts `record-decision` to capture choices as ADRs.

### 15.7 Gate validation
On workflow conclusion AT a QG-* gate boundary (declared in workflow manifest, not heuristically), Claude offers `verify-*` workflow; evidence to `_bmad/bam/evidence/`.

### 15.8 Refresh awareness
Claude reads `last_reviewed` against topic-specific thresholds; flags stale fragments for `refresh-knowledge`.

### 15.9 Cross-tool access
If MCP server installed, external agents access BAM via stdio MCP. Claude Code uses universal-glob directly (MCP server is for non-CC clients).

### 15.10 Failure handling
Workflow failures: log to `_bmad/bam/install-logs/`; preserve partial outputs; offer resume from last successful step.

### 15.11 Context budget guarding
`bmad-bam-start` checks Tier-1/2/3 budgets per `family.json: context-budget`; warns approaching limits; fails hard at total budget.

### 15.12 Hot-reload during session
BAM module changes during active session: Claude detects via `_bmad/bam/install-logs/` watchers; offers session re-init (re-reads `family.json` + project-context.md files).

---

## 16. Changelog

| Version | Date | Note |
|---|---|---|
| 0.1 | 2026-05-11 | Initial spec; 8 modules, 6 personas, ~80 workflows |
| 0.2 | 2026-05-11 | Round 2 self-review: 39 gaps addressed. ~107 workflows; gate criteria; Kai arbiter; module versioning; `_bmad/bam/` umbrella; ADR directory; MCP server; AI-augmented execution mode; testing strategy; auto-docs; user customization layer; glossary +20; new §15 Claude perspective; anti-patterns +8; ~617 → ~1190 lines |
| 0.3 | 2026-05-11 | Round 3 self-review: 45 gaps addressed; tech defaults locked. ~133 workflows (added 22 cutting-edge + 2 cross-family); context budget management (§6.10); persona orphan policy; Kai-in-conflict escalation; non-overridable defaults; forward compatibility policy; monorepo handling; backup/restore; upgrade procedure (§10.4); BAM-to-BAM upgrade; topic-specific staleness; family-wide standards; vertical pack manifests; MCP transport=stdio + fs-perm auth; auto-runnable default=false; recommended_capabilities field; resolver rules; markdown-compatible cross-refs; gate criticality + depends-on fields; anti-patterns +8; glossary +10; new §17 Known Issues; ~1190 → ~1361 lines |
| 0.4 | 2026-05-11 | Round 4 self-review (final): 33 gaps addressed; rounds stopped (saturation). 135 workflows (+2 cross-family: bmad-bam-upgrade, bmad-bam-rollback); cross-module persona invocation (`@bmm:winston`); vertical pack canonical-source + reference model (no duplication); event-driven refresh triggers; cross-module evidence graph (`evidence-depends-on`); workflow sub-composition + recursion rules; ADR fields (assumptions, dependencies, generated-by); BMM persona deprecation grace period; persona tone profiles; per-module context budgets; Nova workflow clusters; latency budgets; auto-runnable eval frame (pass/fail + quality-score); BAM runtime telemetry (§9.9); concrete weeks-based timeline (§10.5); migration completion criterion; offline mode; backup rotation; install-failure half-orphan; lock heartbeat semantics; rename refactor tool; tested-against-date per-platform; gate auto/human ratios per-gate; waiver expiration enforcement triggers; anti-patterns +7; spec exit criteria (§0.1); ~1361 → ~1500 lines |

---

## 17. Known Issues / Limitations

### 17.1 Known limitations of v6.0 scope

- **MCP server remote access not supported.** v6.0 ships stdio + filesystem permissions only. Remote MCP requires v6.x design doc.
- **Evidence encryption-at-rest deferred.** `_bmad/bam/evidence/` plain markdown; users with sensitive compliance evidence must layer git-crypt or external encryption.
- **Multi-product monorepo shared-mode untested in Wave 0.** Default per-product mode is tested; shared-mode is design-only in v6.0.
- **OpenSRE integration absent.** Evaluation deferred to v6.2.
- **No automated v2 → v6 migration.** Manual port via checklist (§13.2).
- **Vertical packs ship empty in v6.0.** Manifests defined; content arrives in v6.x as products in those verticals come online.
- **External submodules retained.** `external/bmad-method`, `bmad-tea`, etc. stay as references through v6.2; removed afterward.
- **i18n of personas not addressed.** Personas English-only; user with non-English `communication_language` gets translated artifacts but English persona prompts.
- **Air-gapped operation limited.** `refresh-knowledge --offline` works but no automatic currency refresh; user must manually update fragments.
- **Local-only operation.** BAM has no remote sync; team collaboration happens through git only. No multi-user "cloud BAM."
- **No CLI for non-Claude-Code platforms.** BAM workflows run through `bmad` command in Claude Code; Cursor / Codex / VSCode users need MCP server integration (§9.5).
- **Hot-reload limitations.** Some BMAD core skills cache loaded customize-templates; full hot-reload may require session restart.
- **Inconsistent ADRs within session.** If user invokes Atlas then Atlas's persona patterns change mid-session (e.g., via module upgrade), early-session and late-session ADRs reflect different Atlas versions.

### 17.2 Beta / experimental features

| Feature | Status | Notes |
|---|---|---|
| `design-self-improving-agent` | experimental | Continual-learning patterns evolve fast; expect frequent refresh |
| Multi-modal RAG patterns | experimental | Industry still maturing; expect frequent updates |
| `bmad-bam-restore` | beta | Restore tested against backups taken within same BAM version only |
| Hot-reload during session (§15.12) | beta | Some BMAD core skills cache; full hot-reload may require session restart |
| Wave skipping (§10.3) | advisory-only | v6.0 → v6.2 skip works but increases integration risk |

### 17.3 Open architectural questions in v6.x

- How does BAM evolve when BMAD itself ships breaking changes?
- Should `_bmad/bam/user/` support multiple "user profiles" for multi-machine same-user scenarios?
- Should persona sidecar memory be queryable cross-project (e.g., Atlas's decisions across all my projects)?
- How do we measure "BAM workflow quality" beyond gate evidence?
