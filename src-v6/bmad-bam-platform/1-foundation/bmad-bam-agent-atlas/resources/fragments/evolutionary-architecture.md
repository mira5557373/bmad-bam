---
id: evolutionary-architecture
title: Evolutionary Architecture and Fitness Functions
category: foundation
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
tags: [evolutionary-architecture, fitness-functions, foundation, adr, invariants]
references:
  - "Neal Ford, Patrick Kua, Rebecca Parsons, Building Evolutionary Architectures (O'Reilly, 2017)"
  - "Neal Ford, Building Evolutionary Architectures, 2nd edition (O'Reilly, 2023)"
  - "Michael Nygard, Documenting Architecture Decisions (2011) — ADR origin"
---

# Evolutionary Architecture and Fitness Functions

Architectures evolve, whether by design or by entropy. **Evolutionary architecture** is the practice of designing for guided change: identifying the *invariants* that matter, encoding them as automated tests (**fitness functions**), and recording every meaningful change as an **ADR**. The result is a system that can absorb change without losing its essential properties.

For a multi-tenant SaaS modular monolith, the relevant invariants are about boundaries: bounded contexts (`[[ddd-bounded-contexts]]`) stay separated; domain code does not import adapters (`[[ports-and-adapters]]`); ACLs (`[[anti-corruption-layer]]`) actually do both directions; tenant context never leaks across seams. Each of these can be — and should be — guarded by automated tests that run on every commit.

Without fitness functions, architectural decisions decay. A code review will catch the first violation; the second; maybe the fifth. By the fiftieth, the invariant is gone and no one remembers it existed.

Consumed by `design-modular-monolith` (skill) when defining the platform's architectural invariants, and by every subsequent foundation/module skill that introduces a new invariant worth protecting.

---

## When to Use

Apply evolutionary architecture practice when:

- **An architectural decision is load-bearing for >6 months.** "We chose ports-and-adapters" is load-bearing; "we used `lodash.debounce` here" is not. The decision deserves an ADR and at least one fitness function.

- **An invariant is easy to violate accidentally.** "Domain code doesn't import SDKs" is easy to violate — a junior engineer adds `import Stripe` and the lint catches nothing without an explicit rule. Fitness function it.

- **The same architectural mistake keeps recurring in PRs.** Three rejected PRs that all reach across the bounded-context seam → write a fitness function that auto-rejects on PR 4. Convert manual review into automated check.

- **A compliance scope requires an architectural property.** "All PHI access goes through the audit module" is a property an auditor will ask about. A fitness function that proves it (and a CI artifact retaining the result) is the evidence.

- **You want to enable refactoring without architectural regression.** Refactor confidence comes from "the fitness function will catch it if I break a boundary". Without fitness functions, every refactor needs full team review.

- **The codebase is growing past one team's mental model.** A 5-engineer team holds invariants in shared memory; a 50-engineer team does not. Fitness functions externalize the architecture from human memory.

- **You want ADRs to be checked, not just written.** ADRs without fitness functions tend to be aspirational; the fitness function is the closing brace on the ADR.

---

## When NOT to Use

Skip evolutionary architecture practice when:

- **The codebase is a one-week prototype.** Fitness functions for code that will be deleted in a fortnight is overhead theatre.

- **The invariant is enforced by the type system already.** A TypeScript `readonly` modifier is itself a fitness function. Don't write a separate test that re-checks what the compiler checks.

- **The invariant is a *preference*, not an *invariant*.** "We prefer dependency injection over service locators" is a coding-style preference; a fitness function that fails CI on every service-locator usage is over-rigid. Use a linter warning instead.

- **The fitness function is unstable.** A flaky fitness function that fails 10% of the time on unrelated grounds will be muted within a week. Either fix the flakiness or remove the function.

- **You're using fitness functions as a substitute for review.** "Just make CI green" is not a review process. Fitness functions augment review; they do not replace it.

- **The team treats ADRs as documentation theater.** ADRs that no one reads (or revisits) are paper. Fitness functions without paired ADR maintenance produce orphan rules nobody remembers the reason for.

---

## Architecture

### The three pillars

1. **Identified invariants**: explicit list of architectural properties the system must preserve. Each invariant is one sentence.
2. **Fitness functions**: automated tests that prove each invariant holds. Run on every commit.
3. **ADRs (Architecture Decision Records)**: short documents capturing *why* an invariant exists, the context, the alternatives considered, the consequences accepted. Lifecycle-managed.

### Categories of fitness functions

| Category | What it checks | Example |
|---|---|---|
| **Atomic** | One specific invariant, one test | "No file in `src/<ctx>/domain/` imports from `node_modules/stripe`" |
| **Holistic** | A system-level property | "End-to-end test of tenant-A and tenant-B running concurrent requests; assert no cross-tenant data appears in either response" |
| **Triggered** | Runs on a schedule or event | "Nightly: scan all third-party SDK versions and fail if any has a published CVE" |
| **Continuous** | Always-on monitoring | "Production: error rate per bounded context; alert if a module's error rate exceeds 2σ of its 30-day baseline" |

Foundation work typically introduces atomic and holistic fitness functions; runtime concerns introduce triggered and continuous ones.

### Concrete atomic-fitness-function examples

```typescript
// fitness/no-cross-context-imports.test.ts
import { findCircularDependencies, getAllImports } from './graph-utils';

describe('architectural fitness: bounded-context import discipline', () => {
  it('commerce/domain does not import from identity/*', () => {
    const violators = getAllImports('src/commerce/domain/**')
      .filter(imp => imp.startsWith('src/identity/'));
    expect(violators).toEqual([]);
  });

  it('no module imports another module\'s domain directly', () => {
    const violations = [];
    for (const mod of MODULES) {
      const imports = getAllImports(`src/${mod}/**`);
      for (const imp of imports) {
        const match = imp.match(/^src\/([^/]+)\/domain\//);
        if (match && match[1] !== mod) {
          violations.push({ from: mod, to: match[1] });
        }
      }
    }
    expect(violations).toEqual([]);
  });

  it('every port has at least one fake adapter', () => {
    const ports = listFiles('src/**/ports/*.port.ts');
    for (const port of ports) {
      const adapters = listFiles(`src/${moduleOf(port)}/adapters/**`)
        .filter(f => fileImplements(f, port));
      const hasFake = adapters.some(a => /in-memory|fake/i.test(a));
      expect(hasFake).toBe(true);
    }
  });
});
```

These tests run in <1 second; they catch the *next* boundary violation before it merges.

### The ADR-fitness-function pair

Every load-bearing architectural decision should produce *both* an ADR and at least one fitness function. The ADR explains; the fitness function enforces. Missing either is a half-decision:

| Have ADR? | Have FF? | Outcome |
|---|---|---|
| Yes | Yes | Healthy: explained and enforced. |
| Yes | No | Aspirational: explained but will decay. |
| No | Yes | Mystery: enforced but no one remembers why. Eventually muted. |
| No | No | Folk knowledge: lives in heads, dies on team-rotation. |

### ADR format (short)

```markdown
# ADR-0042: Use ports-and-adapters for Commerce context

- Status: accepted
- Date: 2026-05-17
- Deciders: Atlas (architect), Commerce team lead
- Supersedes: —
- Related FF: fitness/no-sdk-in-commerce-domain.test.ts

## Context
Commerce integrates with Stripe today; Adyen and Braintree are on the 18-month roadmap.

## Decision
All commerce/* third-party calls go through ports defined in commerce/ports/.
Domain code does not import third-party SDK types.

## Consequences
+ Switching payment provider is one new adapter + wiring change.
+ Testability: in-memory PaymentAdapter for fast unit tests.
− Boilerplate: ~100 LOC per port (port + 2 adapters + wiring).
− Onboarding: new engineers must understand the indirection.

## Alternatives considered
- Direct Stripe calls: rejected; coupling to Stripe's SDK across 12 files.
- Repository pattern (lighter): rejected; doesn't cover non-DB integrations.
```

---

## Trade-offs

| Dimension | Pro (evolutionary architecture) | Con (evolutionary architecture) |
|---|---|---|
| **Architectural drift resistance** | Fitness functions catch drift on the PR that introduces it; the architecture stays close to its design. | Effort: each invariant needs a test, and tests need maintenance. |
| **Refactor confidence** | Refactor freely; if you break a boundary, CI tells you. | False sense of security if invariants are incomplete; "green CI" is not "architecture is correct". |
| **Onboarding** | New engineers learn the architecture by reading the fitness functions, not by absorbing folklore. | Fitness functions are code; new engineers need to read code to understand them. |
| **Compliance evidence** | ADRs + fitness function results are auditor-grade evidence of architectural controls. | Generating evidence artifacts adds CI/release-engineering work. |
| **Tool coupling** | Fitness functions live where tests live (jest, pytest, go test) — minimal new tooling. | Some invariants need custom AST tooling; not all are 10-line tests. |
| **Maintenance** | Fitness functions are unit-test-shaped and well-understood. | Stale fitness functions (guarding obsolete invariants) become noise; lifecycle them. |
| **Decision speed** | ADR + FF makes "we decided this" verifiable; no one re-litigates settled decisions. | ADR culture must be sustained; first-month enthusiasm decays without explicit ownership. |

---

## Implementation Patterns

### 1. Start with three fitness functions per context

Don't try to enumerate every invariant on day one. Start with three high-value, easy-to-write fitness functions per bounded context:

1. **Import discipline**: domain does not import from other contexts' internals or from SDKs.
2. **Port-fake parity**: every port has at least one fake adapter.
3. **Tenant context preservation**: integration events carry `tenant_id` (a JSON-schema check on the event types).

These three catch ~80% of cross-cutting architectural regressions in a typical multi-tenant SaaS.

### 2. Co-locate fitness functions with the architecture they protect

Place fitness functions adjacent to the code they guard, not in a top-level `architecture-tests/` directory. Co-location keeps them visible during everyday work; the top-level directory becomes a graveyard.

```
src/commerce/
├── domain/
├── ports/
├── adapters/
├── application/
└── architecture/
    ├── ADR-0042-ports-and-adapters.md
    ├── fitness/
    │   ├── no-sdk-in-domain.test.ts
    │   └── port-fake-parity.test.ts
    └── invariants.md            # one-page list of invariants for this context
```

### 3. ADR lifecycle states

ADRs have explicit states:

- `proposed` — under discussion; not yet binding.
- `accepted` — binding; an FF should exist or be queued.
- `deprecated` — no longer recommended; existing code may still rely on it.
- `superseded by ADR-####` — explicitly replaced; the replacement's `Supersedes` field points back.

Never delete an ADR. Mark `superseded` and link forward. The chain of supersession is the architectural history.

### 4. Holistic fitness functions for cross-context properties

Some invariants cannot be caught by import analysis. Example: "no cross-tenant data leak". A holistic fitness function spins up two tenants, exercises the API as both, and asserts isolation. This runs in integration-CI (slower, less frequent than unit tests) but on every release branch.

### 5. Fitness-function failure as a teaching moment

When a fitness function fails on a PR, the failure message should *teach*, not just block. Good message:

> `commerce/domain/pricing.ts` imports `stripe` (line 14). Domain code may not depend on third-party SDKs (ADR-0042: ports-and-adapters). Move the Stripe call into a Port + Adapter; see `src/commerce/ports/` for examples.

The link to the ADR turns every fitness-function failure into a learning event.

### 6. Quarterly fitness-function review

Schedule a 30-minute review per quarter:

- Which fitness functions fired? (Healthy: ~5–15 fires per quarter, mostly during early development.)
- Which fitness functions never fired? (Two possibilities: either the team has internalized them, or they guard nothing real. Investigate.)
- Which ADRs are stale? (Decisions overtaken by reality should be marked `superseded`.)
- Which new invariants emerged this quarter? (Add ADRs + FFs.)

### 7. Fitness functions for tenancy invariants

Multi-tenant SaaS has tenancy invariants that ARE architectural: every API request resolves a tenant; tenant context propagates across asynchronous boundaries; no query is issued without `tenant_id` in scope (for RLS-based tenancy). These should be fitness-functioned aggressively — they are the most consequential invariants in the platform. Cross-reference `[[tenancy-decision-framework]]` and `[[tenant-isolation-testing-patterns]]`.

---

## Quality Checks

- **CRITICAL:** every module has at least one **fitness function** (automated test that runs on every commit) protecting at least one of its **boundary invariants** (bounded-context isolation, port-fake parity, tenant-context preservation, or domain-doesn't-import-SDK). A module without a fitness function relies on human memory and code review to preserve its boundaries; both decay. Within ~90 days the boundary will have been violated at least once; within ~180 days the violation will be load-bearing and expensive to undo. Reviewers must confirm the fitness function exists, runs in CI, and is *not* trivially skipped (no `.skip`, no broad `pragma`).

- **Every load-bearing decision has an ADR.** "Load-bearing" means: a change to the decision would affect 2+ modules, 2+ teams, or 2+ quarters of work. ADRs are short (<1 page) and explicit (status, context, decision, consequences).

- **Every ADR has a paired fitness function or a written reason it cannot.** A few invariants are genuinely uncheckable by automation (e.g., "we prefer simplicity over generality"). Those ADRs say so explicitly.

- **No fitness function is on `.skip` indefinitely.** A skipped FF is a muted alarm. Either fix the FF, delete it, or mark the ADR `deprecated`.

- **ADR supersession chains are intact.** When ADR-0099 supersedes ADR-0042, ADR-0042 has `status: superseded by ADR-0099` and ADR-0099 has `Supersedes: ADR-0042`. Bidirectional. This is the architectural-history audit trail.

- **Fitness-function failures produce teaching error messages.** "Failed assertion" is not enough; the message should cite the ADR and point to fix examples.

- **Quarterly FF review happens.** Owner and cadence documented; results recorded.

- **Holistic fitness functions exist for tenancy invariants.** "No cross-tenant data leak" is the single most consequential invariant in multi-tenant SaaS; one or more holistic FFs cover it, running on every release branch at minimum.

- **CI surfaces fitness-function results visibly.** A failed FF must be at least as visible as a failed unit test; ideally with a distinct annotation (`architecture: FAIL` vs `unit: FAIL`).

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year):

- `fitness functions evolutionary architecture {date}` — Ford / Kua / Parsons book is canonical; ThoughtWorks publishes practitioner write-ups.
- `architecture decision record template {date}` — Nygard's original + a decade of community variants; pick one and stick to it.
- `ArchUnit dependency rules Java {date}` — JVM-ecosystem fitness-function library; useful for cross-language pattern transfer.
- `ts-arch dependency-cruiser architecture testing {date}` — TypeScript-ecosystem fitness-function tooling.
- `documenting architecture decisions ADR lifecycle {date}` — guidance on ADR statuses and supersession chains.
- `chaos engineering fitness function {date}` — overlapping practice; chaos experiments are runtime fitness functions for resilience invariants.
- `compliance architecture evidence {date}` — how to produce auditor-grade evidence from ADRs and FF artifacts.

Treat content older than 24 months as orientation; the underlying pattern is stable but tooling shifts (new FF libraries appear yearly).

---

## Cross-references

**Companion fragments:**

- [[ddd-bounded-contexts]] — context boundaries are the primary invariant to fitness-function.
- [[ports-and-adapters]] — port-fake parity is one of the highest-leverage fitness functions.
- [[anti-corruption-layer]] — "no foreign types in domain" is fitness-functionable.
- [[module-decomposition-heuristics]] — a split's seam survives only if a fitness function guards it.
- [[tenancy-decision-framework]] — tenancy invariants are the most consequential FFs in multi-tenant SaaS.

**Quality gate:**

- `QG-F1` (foundation) — foundation designs without identified invariants and at least three initial fitness functions fail this gate.
- `QG-M1`, `QG-M2`, `QG-M3` — module gates re-check that the module-level fitness functions exist and run.

**Implementation patterns:**

- [[adr-template-and-lifecycle]] — concrete ADR template + supersession workflow (forthcoming).
- [[fitness-function-co-location]] — directory layout and runner conventions (forthcoming).
- [[tenant-isolation-holistic-fitness]] — the canonical two-tenant cross-leak test (forthcoming).

**Upstream specs:**

- `docs/v6-final-architecture.md` §6.3 (fragment schema), §4.1 (Atlas voice).
- Ford / Kua / Parsons, *Building Evolutionary Architectures* (2017, 2nd ed. 2023).
- Michael Nygard, *Documenting Architecture Decisions* (2011).

**Downstream consumers:**

- `design-modular-monolith` skill (P3.1) — primary consumer; produces the initial ADR set + FFs.
- Every P2+ module skill — adds module-level FFs and ADRs.
- Atlas memory (`_bmad/_memory/atlas/architecture-decisions/`) — every ADR produced lives here.
