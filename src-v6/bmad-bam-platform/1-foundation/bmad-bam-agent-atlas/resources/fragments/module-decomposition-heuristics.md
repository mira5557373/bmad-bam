---
id: module-decomposition-heuristics
title: Module Decomposition Heuristics
category: foundation
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
tags: [modular-monolith, decomposition, foundation, cohesion-coupling]
references:
  - "Sam Newman, Building Microservices, 2nd edition (O'Reilly, 2021), chapters 2-4"
  - "Martin Fowler, Patterns of Enterprise Application Architecture (Addison-Wesley, 2002)"
  - "https://martinfowler.com/articles/microservices.html"
---

# Module Decomposition Heuristics

When you have a bounded context (`[[ddd-bounded-contexts]]`) and it starts to feel large, the question is: **split it, or keep it together?** The wrong split fragments cohesion and creates coordination tax for years. The wrong "keep together" creates a god-module that no one can refactor safely.

This fragment is the **decision aid** for that question. It does not tell you to split or not split; it gives you signals to read, a decision tree to traverse, and a small catalog of anti-pattern splits to avoid. The Atlas voice treats module decomposition as a *cohesion question*: split where cohesion is naturally weak; refuse to split where it is naturally strong, even if the resulting module is "big".

Consumed by `design-modular-monolith` (skill) when scoping initial modules and by every subsequent foundation skill that proposes a new top-level module directory.

---

## When to Use

Apply these heuristics when:

- **A context is reaching ~5,000 LOC** and three or more pull requests per week touch the same files. This is the canonical "this is getting big" signal; the heuristics tell you whether the bigness reflects a real seam.

- **Two teams are editing the same module weekly.** This is a Conway's-law signal: the module structure has fallen behind the org structure. Decomposition becomes an ownership question.

- **The module mixes data with very different change cadences.** A module that contains both the high-churn pricing engine and the rarely-changed plan catalog is a candidate to split along the cadence seam.

- **The module's tests take >2 minutes to run** because unrelated capabilities are tested together. Splitting reduces feedback latency.

- **A new compliance scope intrudes.** PCI now applies to part of the module but not all of it. Carving the PCI scope into its own module shrinks the audit surface — a cohesion win driven by an external constraint.

- **A new tenancy shape is needed.** Part of the module wants per-tenant data; part wants cross-tenant. Different tenancy shapes can sometimes coexist in one module (with discipline) but often signal a split.

- **A microservice extraction is on the roadmap.** Even if you stay modular-monolith now, the heuristics tell you whether a future service-extraction will be clean.

---

## When NOT to Use

Skip decomposition (keep the module together) when:

- **The module is <500 LOC.** Decomposition theatre on a small module costs more than the module is worth.

- **All "candidate split" sub-pieces share the same aggregate root.** If module A and proposed-split B both transactionally update the same root entity, the split would force you to introduce a distributed-transaction or saga pattern within a single context. Almost never worth it.

- **The "split" is by technical layer.** "Move all repositories to a repos module, all services to a services module" is layer-thinking, not decomposition. It does not change cohesion; it just moves files. Reject.

- **The team is <5 engineers.** Decomposition produces coordination overhead. A small team gets more value from a slightly-too-big module than from a precisely-decomposed one they cannot all keep in their heads.

- **You're decomposing under deadline pressure.** Mid-incident, mid-feature-crunch decompositions are nearly always regretted. Heuristics applied while stressed pick the convenient seam, not the right one. Defer to a planned design session.

- **The proposed split is "future-proofing for microservices".** Splitting *now* to make a hypothetical *future* extraction easier is YAGNI on architectural scale. Split when there is *current* cohesion pressure.

---

## Architecture: signals and the decision tree

### The five signals (weighted)

| Signal | Strong split indicator | Weak / no-split indicator |
|---|---|---|
| **Data cohesion** | Sub-piece A touches entirely different tables than sub-piece B; no foreign keys cross the proposed seam. | Sub-pieces share aggregate roots or are joined in every other query. |
| **Change frequency clustering** | A's files change weekly; B's change once a quarter. They are at different points in the change-frequency distribution. | A and B change together in the same PRs >60% of the time. |
| **Team ownership** | Different teams already informally own A vs. B; PR reviewers cluster cleanly. | Same team owns both; reviewers are interchangeable. |
| **Compliance / tenancy shape** | A is PCI-scope, B is not. OR A is per-tenant, B is cross-tenant. | Both inside the same compliance scope and tenancy shape. |
| **Test boundary** | A's tests run in isolation; B's tests run in isolation; cross-AB tests are rare. | Tests routinely span A and B; integration is dense. |

**Reading the signals**: 3+ strong signals → split. 0–1 strong signals → keep together. 2 strong signals → write it up, sleep on it, ask the owning team. Do *not* split on a single signal alone; one signal is almost always weaker than the inertia cost of decomposition.

### Decision tree

```
START: should we split module M into A and B?
  │
  ├─ Do A and B share an aggregate root?
  │   └─ YES ──► DO NOT SPLIT. Saga/distributed-transaction cost
  │             dominates any cohesion win. Revisit only if the
  │             aggregate root itself is decomposable.
  │   └─ NO  ──► continue
  │
  ├─ Is the proposed split along technical-layer lines
  │  (controllers/services/repos/entities)?
  │   └─ YES ──► REJECT. This is not decomposition; this is
  │             layer-shuffling. Do not split.
  │   └─ NO  ──► continue
  │
  ├─ Count strong signals from the table above (data cohesion,
  │  change frequency, team ownership, compliance/tenancy, test boundary)
  │   ├─ 0–1 strong signals ──► DO NOT SPLIT. Inertia wins.
  │   ├─ 2 strong signals   ──► WRITE AN ADR, SLEEP ON IT.
  │   │                         If the team still agrees in a week, split.
  │   │                         If not, the signals were noise.
  │   └─ 3+ strong signals  ──► SPLIT.
  │                             Define the seam concretely:
  │                             - new public interface (use cases / events)
  │                             - data ownership boundary
  │                             - test boundary
  │                             - ownership boundary (named team)
  │
  └─ END
```

### Cohesion shapes (named patterns)

| Shape | Description | Decomposition stance |
|---|---|---|
| **Coherent aggregate** | All code revolves around one root entity (`Order`, `Subscription`, `Conversation`). | Keep together. The root is the seam. |
| **Workflow with stages** | A long process with distinct stages (`onboarding`, `provisioning`, `activation`). | Sometimes split by stage if stages are owned by different teams; usually keep together. |
| **Capability cluster** | A bag of related but independent capabilities (`reports`, `exports`, `dashboards`). | Often split. Each capability can become its own module. |
| **Cross-cutting concern** | Logging, auth, feature-flags. | Never decompose into a "concerns module" — that becomes a god-module. Cross-reference `[[ports-and-adapters]]` and inject. |
| **Compliance-scoped slice** | A subset of the module is PCI / HIPAA / FedRAMP scope. | Split to shrink the audit surface. |

---

## Trade-offs

| Dimension | Pro (split) | Con (split) |
|---|---|---|
| **Testability** | Smaller test surface per module; faster CI feedback. | Cross-module integration tests need new scaffolding (event fixtures, port stubs). |
| **Cognitive load** | New engineers can grok one smaller module at a time. | Cross-module mental model is now needed; "where does X live" becomes a real question. |
| **Refactor blast radius** | A bug in A cannot break B's tests; safety up. | A refactor that needs to span A and B is now harder; coordination cost up. |
| **Deployment** | Still deployed together (modular-monolith); no deploy-time wins. | True. Decomposition's payoff is *cognitive and ownership*, not deployment. |
| **Future microservice extraction** | A clean module → clean service extraction. | If extraction never happens, you paid the cohesion-split cost for an option you never exercised. |
| **Team scalability** | Two teams can own two modules without colliding. | Sub-Dunbar teams suffer overhead disproportionate to size. |
| **Coordination cost** | Within-module changes are independent; cross-module changes go through events / use cases. | Cross-module changes are *strictly* more expensive than within-module changes. |

---

## Implementation Patterns

### 1. The "honest split" checklist

Before executing a split, the proposing engineer writes a 1-page note answering:

1. Which signals from the table fired? (Cite specific files / change history.)
2. What is the seam? (Public use-cases, events, data ownership.)
3. Who owns each side after the split? (Named team or named individual.)
4. What cross-module tests are needed? How will they run?
5. What is the rollback path if the split turns out wrong in 3 months?

If question 5 cannot be answered, the split is *premature*; the team should wait for stronger signal.

### 2. Splitting via strangler-fig within the monolith

A safe split sequence:

1. Identify the seam; draw the proposed module boundary on a context map.
2. Introduce a *new* public interface (use cases, events) that the "to-be-extracted" code already implements internally.
3. Migrate callers to use the new interface (still in the old module).
4. Move the code behind the new interface into the new module directory.
5. Add a lint/fitness function that bans the old import path.

This keeps the codebase shippable at every commit.

### 3. Anti-patterns to refuse

- **"Common" or "shared" or "utils" modules** that grow without bound. Every team adds to them; no team owns them. These are decomposition's failure mode. Refuse the name. If something is genuinely cross-cutting, it should be a port (`[[ports-and-adapters]]`).
- **Module-per-entity.** One module for `User`, one for `Order`, one for `Product`. This is entity-thinking; entities are not cohesion boundaries. The seam is the *aggregate root + behavior*, not the table.
- **Module-per-feature-flag.** Carving out experimental code into its own module so it can be deleted later sounds clean and almost never actually gets deleted.
- **Premature service split.** Extracting a module to a microservice on day one of feeling cohesion pressure. The decomposition decision and the deployment decision are separate; make them separately.

### 4. Reversibility plan

Every split should be *reversible* for ~3 months. Practical reversibility means:

- The new module name is not yet in any external doc, customer-facing URL, or telemetry alias.
- The old module's directory is preserved (empty or with a redirect README) so reverting touches one PR.
- The team agrees on the 3-month checkpoint date.

Splits that miss the checkpoint without review become load-bearing whether they were right or not.

### 5. Signal measurement

Most signals can be measured cheaply:

- **Change frequency clustering**: `git log --since=12.months.ago --name-only -- <path> | sort | uniq -c | sort -rn` shows which files change together.
- **Test boundary**: in a green CI run, measure which test files cover which module files (jest --coverage / pytest-cov / Go's `cover`).
- **PR co-occurrence**: parse PR file lists; for each pair of files, count how often they appear in the same PR.
- **Team ownership**: `git log --since=12.months.ago --format='%aN' -- <path> | sort | uniq -c` shows who is editing what.

A 1-day measurement spike before a major split is almost always worth it.

---

## Quality Checks

- **CRITICAL:** the split is justified on **data-cohesion AND change-frequency clustering**, NOT on layer-types. A proposed split whose *only* signal is "let's separate controllers from services" is rejected at QG-F1. Layer-shuffling does not change cohesion; it just moves files. Every published "module restructure that we later regretted" post-mortem traces back to this anti-pattern. Reviewers must explicitly confirm which signals from the table fired.

- **No shared aggregate root across the proposed seam.** If split-candidates A and B both transactionally write to the same root entity, refuse the split or refactor the root first.

- **Each resulting module has a named owner.** A module without an owner is a future god-module; ownership accountability is a hard requirement of the split.

- **Cross-module dependencies are unidirectional after the split.** If A imports B and B imports A, the seam is wrong — either re-draw the seam or do not split.

- **The split has a written rollback plan**, valid for ~3 months. Splits without rollback plans are commitments made under the illusion of certainty.

- **Public interfaces are defined before code moves.** First introduce the new use-cases / events, then migrate callers, then move code. Splits that move code first and define interfaces after produce hairballs.

- **CI feedback time does not regress.** A split that *increases* test runtime (because of new integration scaffolding) is a regression; measure before/after.

- **No "common"/"shared"/"utils" module appears as a side-effect.** If the split needs a holding bin for cross-cutting code, the holding bin is itself an anti-pattern. Use ports or absorb the code back into one side.

- **Each module's compliance scope is explicit.** If A is in PCI scope and B is not, the split is partially motivated by compliance shrinkage; document the audit-boundary as part of the split.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year):

- `modular monolith decomposition heuristics {date}` — Newman, Khononov, and Riccomini are recurring authoritative authors.
- `cohesion coupling metrics codebase {date}` — academic and industry guidance on measuring cohesion; useful for the signal-measurement step.
- `strangler fig pattern module split {date}` — Fowler's strangler-fig, applied within a monolith rather than across services.
- `Conway's law team module alignment {date}` — empirical reports on how org structure shapes module structure (and vice versa).
- `microservice extraction signals {date}` — when a *module* split should also become a *service* extraction; defers the question, but useful context.
- `aggregate boundary refactoring {date}` — DDD-flavored guidance on splitting or merging aggregates, which is the prerequisite for many module splits.

Treat content older than 36 months as orientation; the underlying patterns are stable but the empirical guidance (sizes, signal thresholds) shifts with codebase scale.

---

## Cross-references

**Companion fragments:**

- [[ddd-bounded-contexts]] — the prerequisite: you must have bounded contexts before you can meaningfully discuss splitting one.
- [[ports-and-adapters]] — cross-cutting concerns become ports, not "shared" modules.
- [[anti-corruption-layer]] — when a split introduces a new seam between contexts, the consumer side adds an ACL.
- [[evolutionary-architecture]] — fitness functions guard the seam after the split.

**Quality gate:**

- `QG-F1` (foundation) — primary gate. Proposed splits in foundation design are reviewed against this fragment.
- `QG-M1` (module architecture) — splits proposed during P2 module work are also reviewed against this fragment.

**Implementation patterns:**

- [[strangler-fig-within-monolith]] — concrete sequence for splitting a module safely (forthcoming).
- [[git-cohesion-measurement]] — git-history-based signal measurement scripts (forthcoming).

**Upstream specs:**

- `docs/v6-final-architecture.md` §6.3 (fragment schema), §4.1 (Atlas voice).
- Sam Newman, *Building Microservices, 2nd ed.* (2021), chapters 2–4.
- Martin Fowler, *Patterns of Enterprise Application Architecture* (2002).

**Downstream consumers:**

- `design-modular-monolith` skill (P3.1) — consults this fragment when proposing initial module set.
- Any P2+ module-architecture skill — consults this fragment when proposing intra-module splits.
