---
id: ddd-bounded-contexts
title: Domain-Driven Bounded Contexts for Multi-Tenant SaaS
category: foundation
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
tags: [ddd, bounded-context, modular-monolith, foundation, ubiquitous-language]
references:
  - "https://martinfowler.com/bliki/BoundedContext.html"
  - "Vaughn Vernon, Implementing Domain-Driven Design (Addison-Wesley, 2013)"
  - "Eric Evans, Domain-Driven Design: Tackling Complexity in the Heart of Software (Addison-Wesley, 2003)"
---

# Domain-Driven Bounded Contexts for Multi-Tenant SaaS

Bounded contexts are the **primary structural concept** behind a modular monolith. Each context owns a piece of the business model — its data, its behavior, and the words people use to talk about it. The Atlas voice treats bounded contexts as the *architecture-grade* alternative to layered (controller/service/repo) decomposition: layers split a request into stages; contexts split a business into accountable units. A multi-tenant SaaS that confuses the two ends up with a hairball where Billing knows the shape of Identity and Identity reaches into Catalog.

This fragment is consumed by `design-modular-monolith` (skill) to scope the first context map and by every subsequent foundation skill as the *vocabulary* layer underneath ports, adapters, and ACLs.

---

## When to Use

Apply bounded-context decomposition when:

- **Multi-tenant SaaS spans 3+ sub-domains.** Identity (who is the user), Commerce (what did they buy), Core domain (the thing the product is *for*), Observability (what happened), and Integration (third-party data flow) are almost always present. Once you cross three distinct domain conversations, the cost of mixing their vocabularies in one model exceeds the cost of explicitly separating them.

- **Two teams or more touch the codebase.** A bounded context is the unit of *ownership*. If two teams are editing the same module, you either need to split the module along their seam or merge the teams. Owning-by-context is the cheapest way to make code-review responsibility unambiguous.

- **Different sub-domains have incompatible invariants.** Identity says "an email is unique per tenant". Marketing says "an email can belong to many lead records". Both are right, in their own context. Forcing both into one shared `email` model is how you get NULL-laden tables and conditional business logic.

- **Vocabulary mismatches keep surfacing in standups.** "When you say *user*, do you mean the SSO principal or the billing seat?" If the team has had this conversation more than twice, the contexts have already diverged in human minds; the code is just lagging.

- **Tenancy boundaries differ across sub-domains.** Billing may be cross-region for audit consolidation; Core domain may be region-pinned for residency. Different tenancy shapes per context is *normal*, and bounded contexts are the seam where that variance becomes manageable. Cross-reference `[[tenancy-decision-framework]]` for the tenancy-per-context recommendation.

- **Compliance scope varies across sub-domains.** PCI applies to Commerce, HIPAA may apply to Core, neither applies to Observability. Bounded contexts let you scope the auditor's review to *one* piece of the system rather than the whole codebase.

---

## When NOT to Use

Skip bounded-context decomposition when:

- **The product is a CRUD app over a single table.** A todo-list MVP with one entity does not have sub-domains. Don't perform DDD theatre on a 200-line codebase — it adds vocabulary overhead without dividing a real problem.

- **You have one team of <5 engineers and <12 months of runway.** Bounded contexts are *governance* infrastructure: glossaries, context maps, ACLs, integration events. A pre-PMF team should pick a flat module structure and revisit when team size or domain complexity forces the seam.

- **The "contexts" you would draw are technical layers.** "User context", "Service context", "Repository context" is not DDD — it is the layered architecture in disguise. If you can describe the context only in terms of code structure (and not in terms of business outcomes), it is not a bounded context.

- **You cannot name the ubiquitous language.** A bounded context without a written glossary will erode within a quarter as developers reuse terms across contexts. If the team cannot enumerate 5 context-specific terms today, splitting is premature.

- **The domain expert is not engaged.** DDD's value depends on the *domain expert* — the product manager, customer-success leader, or subject-matter expert — being a regular collaborator. Without them, the team will invent a "developer's model" that drifts from the business and creates the same hairball under a new name.

---

## Architecture

A bounded-context map for a typical B2B multi-tenant SaaS contains 5 recurring contexts. Each has its own data, behavior, ubiquitous language, and integration surface.

| Context | Data (root aggregates) | Behavior | Ubiquitous-language terms | Tenancy shape |
|---|---|---|---|---|
| **Identity** | Tenant, User, Principal, Role, Session | Authn, authz decisions, SSO, MFA, session lifecycle | tenant, principal, role, session, claim | Cross-tenant routing layer; tenant lookup must work pre-tenant-resolution |
| **Commerce** | Subscription, Plan, Invoice, Payment, Entitlement | Provisioning, billing cycles, dunning, revenue recognition | subscription, plan, entitlement, invoice, dunning | Per-tenant aggregate; usage events flow in from other contexts |
| **Core domain** | (product-specific) | (product-specific) — the thing customers pay for | (product-specific) | Inherits the platform's primary tenancy model (RLS/schema/cell) |
| **Observability** | Event, Metric, Log, AuditEntry | Telemetry pipelines, retention, query | event, span, audit, retention-tier | Cross-tenant for ops; tenant-tagged at write time |
| **Integration** | Connector, Webhook, ExternalRef, SyncJob | Inbound/outbound third-party data flow | connector, webhook, mapping, sync-cursor | Per-tenant credentials; per-tenant rate-limit windows |

### Context map (Conway notation)

```
        ┌─────────────┐         ┌──────────────┐
        │   Identity  │◄────────│  Integration │
        │  (upstream) │  events │  (downstream)│
        └──────┬──────┘         └──────┬───────┘
               │ session                │ events
               ▼                        ▼
        ┌─────────────────────────────────────┐
        │            Core domain              │
        │  (the product's reason to exist)    │
        └──────┬──────────────────────┬───────┘
               │ usage events         │ audit events
               ▼                      ▼
        ┌─────────────┐         ┌──────────────┐
        │  Commerce   │         │ Observability│
        │  (peer)     │         │  (downstream)│
        └─────────────┘         └──────────────┘
```

**Arrows are *upstream → downstream***: the upstream context shapes the downstream's model. Identity is upstream of almost everything because every request begins with "who is this and what tenant". Observability is downstream of everything because it absorbs whatever shape events take. Cross-reference `[[anti-corruption-layer]]` for the translation pattern that protects downstream contexts from upstream churn.

### Ubiquitous language artifact

Every context owns a glossary file (`glossary.md`) co-located with the module. Minimum 5 terms; recommended 10–20.

```yaml
# Identity context glossary (example)
tenant:
  definition: "A customer organization with an isolated data scope and billing relationship."
  not_to_be_confused_with:
    - "user (a person)"
    - "workspace (a sub-grouping within a tenant)"
principal:
  definition: "An authenticated identity, human or machine, currently presenting credentials."
session:
  definition: "A time-bounded authenticated interaction; rotates on privilege change."
claim:
  definition: "An assertion about a principal carried in a token (sub, tid, scope, exp)."
role:
  definition: "A named bundle of permissions assignable to a principal within a tenant."
```

---

## Trade-offs

| Dimension | Pro (context decomposition) | Con (context decomposition) |
|---|---|---|
| **Team ownership clarity** | Each context maps to a code-review/oncall/release boundary. Ownership questions vanish. | Cross-context features need 2+ team's approval; coordination cost up. |
| **Vocabulary precision** | Same word can mean different things in different contexts without conflict (a `User` in Identity is a principal; in Commerce is a billing seat). | Lexicon overhead: glossaries, context-map diagrams, ACL design — non-trivial governance burden. |
| **Domain expert alignment** | Domain experts can validate one context at a time; their attention is finite and contexts make it tractable. | Requires sustained domain-expert engagement; if absent, model drifts back to developer's-model. |
| **Refactor blast radius** | Refactoring within one context cannot break another; integration events define the contract. | Cross-context refactors are *more* expensive than monolithic refactors; the seam is intentional friction. |
| **Compliance scoping** | Auditors review one context at a time; PCI scope shrinks to Commerce, HIPAA to Core. | Compliance evidence has to enumerate cross-context flows explicitly; ungoverned flows = audit findings. |
| **Performance** | In-process calls between contexts are cheap (no network) — modular monolith wins over microservices here. | A future split to microservices is *facilitated* but not *free*; calls become network calls and require retry/timeout/idempotency engineering. |

---

## Implementation Patterns

### 1. Establishing a new context

1. Name the context using a business noun (Commerce, not "BillingService").
2. Write a one-paragraph **purpose statement** answering: what business outcome does this context produce, who consumes it, who owns it?
3. Author a glossary with 5+ terms before writing code (this is a hard rule — see Quality Checks).
4. Identify the aggregates (data roots) the context owns. Each aggregate has one root entity and a transactional boundary.
5. Identify the integration events the context emits (`*Created`, `*Updated`, `*StateChanged`) and the events it consumes.
6. Place the context's code in its own top-level module directory (e.g., `src/identity/`, `src/commerce/`).

### 2. Code layout per context

```
src/<context>/
├── domain/          # aggregates, value objects, domain events
├── application/     # use cases (the public API of this context)
├── ports/           # interfaces this context requires from the outside
├── adapters/        # implementations: db, http, queue, third-party
├── integration/     # event publish/subscribe wiring
└── glossary.md      # ubiquitous language for this context
```

Only `application/` is callable from other contexts. `domain/` is private. Cross-reference `[[ports-and-adapters]]` for the port/adapter convention.

### 3. Cross-context communication

- **Synchronous in-process**: call another context's `application/` use case through a published interface. Never reach into another context's `domain/`.
- **Asynchronous in-process**: publish an integration event; the consuming context subscribes. Events carry a stable schema (versioned), not raw aggregates.
- **Translation at the seam**: every event consumer translates the incoming schema to its own model via an anti-corruption layer. See `[[anti-corruption-layer]]`.

### 4. Context maturity ladder

| Maturity | Signal | Next step |
|---|---|---|
| L0: implicit | Context lives only in developer heads | Write the purpose statement and glossary |
| L1: documented | Glossary exists; code does not reflect it | Move code into a context-named directory |
| L2: structural | Code is grouped; cross-context calls are ad-hoc | Define `application/` public surface; ban deeper imports |
| L3: governed | Public surface enforced (lint rule, fitness function) | Add integration events; add ACL on incoming events |
| L4: evolutionary | Fitness functions guard boundaries in CI | Cross-reference `[[evolutionary-architecture]]` for the fitness-function pattern |

---

## Quality Checks

- **CRITICAL:** every bounded context has a written **purpose statement** (one paragraph, answering: what business outcome, for whom, owned by whom) AND a **ubiquitous-language glossary** with at least 5 terms, both committed alongside the context's code. Without these two artifacts, the boundary erodes within a quarter: developers reuse terms across contexts, vocabulary drifts, and within 90 days the context is indistinguishable from its neighbors. This is the single most common failure mode in DDD adoption — do not skip.

- **Context names are business nouns**, not technical roles. "Commerce" not "BillingService"; "Identity" not "AuthAPI". A name that contains a software-layer word ("Service", "API", "Manager") signals that the context is actually a layer and the decomposition is wrong.

- **No cross-context reach-through.** Module `commerce` may not import from `identity/domain/`. It may only call `identity/application/` use cases or subscribe to identity integration events. Enforce with a lint rule or a fitness function (cross-reference `[[evolutionary-architecture]]`).

- **Each context emits versioned integration events**, never raw aggregates. An aggregate is a private implementation detail; a versioned event is a published contract.

- **Domain expert reviews glossary changes.** Adding or renaming a term in the glossary requires sign-off from the named domain expert. Drift in the glossary is drift in the business model.

- **Context map updated on every new context.** A new top-level module without a corresponding context-map update is a refactor-debt generator.

- **Tenancy shape declared per context.** Identity is typically cross-tenant; Commerce is per-tenant; Core inherits the platform model. Declaring tenancy per context catches misalignment early.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year) to keep DDD vocabulary current and check for emerging community practice:

- `domain driven design bounded context multi tenant SaaS {date}` — finds practitioner write-ups and conference talks; DDD Europe and Explore DDD are reliable sources.
- `ubiquitous language glossary patterns {date}` — surfaces how mature DDD teams maintain glossaries (often as code-adjacent markdown or YAML with CI checks).
- `bounded context vs microservice {date}` — clarifies the distinction (a microservice is one *deployment* shape for a context; a modular-monolith context is another).
- `context mapping patterns conformist customer supplier {date}` — Evans's seven context-mapping patterns; useful when designing upstream/downstream relationships.
- `event storming workshop facilitation {date}` — the most common practical technique for discovering context boundaries with domain experts.
- `modular monolith vs microservice when to split {date}` — checks whether the team should stay modular-monolith or extract a context to a service; defers the question to `[[module-decomposition-heuristics]]`.

Treat content older than 36 months as orientation; DDD vocabulary is stable but the *tooling* (event-storming software, fitness-function frameworks) shifts.

---

## Cross-references

**Companion fragments:**

- [[ports-and-adapters]] — how each context exposes ports and isolates adapters.
- [[anti-corruption-layer]] — translation pattern at the seam between contexts.
- [[module-decomposition-heuristics]] — practical signals for when a context should be split further or extracted.
- [[evolutionary-architecture]] — fitness functions that protect context boundaries over time.
- [[tenancy-decision-framework]] — tenancy shape can vary per context; this framework is consulted *per context*, not once globally.

**Quality gate:**

- `QG-F1` (foundation) — the gate this fragment supports. A foundation design without a context map and per-context glossaries fails QG-F1.

**Implementation patterns:**

- [[integration-events-versioning]] — event-schema lifecycle (forthcoming).
- [[context-map-as-code]] — keeping the context map in version control (forthcoming).

**Upstream specs:**

- `docs/v6-final-architecture.md` §6.3 (fragment schema), §4.1 (Atlas voice).
- Eric Evans, *Domain-Driven Design* (2003), chapters 4 and 14.
- Vaughn Vernon, *Implementing DDD* (2013), chapters 2 and 3.

**Downstream consumers:**

- `design-modular-monolith` skill (P3.1) — primary consumer; uses this fragment to scope the first context map.
- Every other foundation skill, indirectly, because vocabulary precision propagates.
