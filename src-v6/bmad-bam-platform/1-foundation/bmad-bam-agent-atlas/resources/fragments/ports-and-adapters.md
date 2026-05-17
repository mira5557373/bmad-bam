---
id: ports-and-adapters
title: Ports and Adapters (Hexagonal Architecture)
category: foundation
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
tags: [hexagonal, ports-adapters, testability, foundation, modular-monolith]
references:
  - "https://alistair.cockburn.us/hexagonal-architecture/"
  - "Robert C. Martin, Clean Architecture (Prentice Hall, 2017), chapters 19-22"
  - "Vaughn Vernon, Implementing Domain-Driven Design (2013), chapter 4"
---

# Ports and Adapters (Hexagonal Architecture)

The **ports-and-adapters** pattern (Cockburn's *hexagonal architecture*) inverts the dependency direction at the boundary of a module: the module declares interfaces (*ports*) describing what it needs from the outside world; concrete implementations (*adapters*) plug in from the periphery. The domain model never imports from the periphery; the periphery imports the domain.

For a multi-tenant SaaS modular monolith, ports-and-adapters is what makes each bounded context **testable in isolation** and **infrastructure-swappable** (Stripe today, in-memory fake in tests, an Adyen adapter in 18 months). Without it, the domain becomes coupled to Stripe's response shape, and Stripe migrations become 6-month projects.

This fragment is consumed by `design-modular-monolith` (skill) when scaffolding a new context and by every skill that introduces a third-party dependency.

---

## When to Use

Apply ports-and-adapters when:

- **Testability is critical and infrastructure is slow or shared.** Tests that hit Stripe sandbox, a real S3 bucket, or a shared dev Postgres are slow (seconds per test) and flaky. A `PaymentPort` with an `InMemoryFakeAdapter` runs in milliseconds and is deterministic. Modules with >50 tests benefit immediately.

- **A third-party dependency is *probably* going to be swapped.** Payment processors, email providers, SMS gateways, object stores, search engines, vector databases. The history of SaaS is the history of swapping these. If the answer to "could you imagine replacing X within 3 years" is yes, port the boundary.

- **The same capability is needed in production vs. dev/test environments.** Production sends real email via SES; dev captures into a file; test asserts on calls. Three adapters, one port — versus three branches in the domain code.

- **Compliance scope is shrinkable by adapter substitution.** A `SecretsPort` with a `VaultAdapter` in production and a `LocalFileAdapter` in dev keeps secrets *out* of dev environments by construction. The adapter swap is the compliance evidence.

- **Multi-region or multi-tenant requires runtime adapter selection.** EU tenants use an EU-region S3 adapter; US tenants use a US-region one. Same port, two adapter instances, runtime selection at the seam.

- **You want to defer infrastructure decisions during design.** Designing the domain first, against ports, lets the team validate domain logic before committing to specific vendors. This is the highest-leverage use of the pattern in greenfield work.

---

## When NOT to Use

Skip ports-and-adapters when:

- **The dependency is the language's standard library.** Porting `time.Now()` behind a `ClockPort` is sometimes justified (deterministic tests) but porting `strings.Split` is not. Use judgement: port what is *infrastructure*, not what is *language*.

- **The module is throwaway or a one-week prototype.** Adding ports to a throwaway script adds friction without protecting future investment.

- **There is no plausible second adapter.** "We will always use Postgres" is sometimes a true statement (the team's Postgres expertise is core, the data model exploits Postgres features). In that case the port is pure friction — the adapter cannot be swapped without rewriting half the domain. A *repository pattern* may suffice; a full port hexagon is overkill.

- **The port boundary is too fine-grained.** A port per database method (`UserExistsPort`, `UserGetPort`, `UserSavePort`, …) is *port noise*. The port should match the *capability* the domain asks for, not the methods of the underlying tool.

- **The team treats adapters as "later".** If the adapter is going to be implemented "after we ship", the port becomes vestigial scaffolding and ships with a single coupled adapter that *looks* swappable but isn't. Either commit to two adapters (production + fake) at the same PR, or skip the port.

---

## Architecture

### Conceptual model

```
                  ┌─────────────────────────────┐
                  │      DOMAIN (the hexagon)   │
                  │                             │
   inbound port   │   use cases, aggregates,    │   outbound port
   ──────────────►│   domain events             │──────────────►
                  │                             │
                  └─────────────────────────────┘
                          ▲                ▼
                          │                │
                  ┌───────┴──────┐  ┌──────┴───────┐
                  │ INBOUND      │  │ OUTBOUND     │
                  │ ADAPTERS     │  │ ADAPTERS     │
                  │ (HTTP, CLI,  │  │ (DB, Stripe, │
                  │  queue cons) │  │  S3, email)  │
                  └──────────────┘  └──────────────┘
```

- **Inbound ports** describe the use cases the domain exposes (e.g., `ProvisionTenantUseCase`). Inbound adapters call them (HTTP controller, CLI, queue consumer).
- **Outbound ports** describe what the domain needs from the outside (e.g., `PaymentPort`). Outbound adapters implement them (Stripe SDK, in-memory fake).
- The domain depends on its own ports. The adapters depend on the ports. The domain **never** depends on an adapter.

### Concrete example: `PaymentPort`

```typescript
// src/commerce/ports/payment.port.ts  -- inside the domain
export interface PaymentPort {
  charge(args: ChargeRequest): Promise<ChargeResult>;
  refund(args: RefundRequest): Promise<RefundResult>;
  // capability-shaped, NOT method-shaped:
  // one port per capability ('payment'), not one per SDK call.
}

export type ChargeRequest = {
  tenantId: TenantId;          // domain type, not Stripe's customer id
  amountMinorUnits: bigint;
  currency: ISO4217;
  idempotencyKey: string;
};

export type ChargeResult =
  | { status: 'succeeded'; receiptId: ReceiptId }
  | { status: 'declined'; reason: DeclineReason }
  | { status: 'requires_action'; nextStep: NextStep };
```

```typescript
// src/commerce/adapters/stripe-payment.adapter.ts  -- in the periphery
import Stripe from 'stripe';
import { PaymentPort } from '../ports/payment.port';

export class StripePaymentAdapter implements PaymentPort {
  constructor(private stripe: Stripe) {}

  async charge(args: ChargeRequest): Promise<ChargeResult> {
    const pi = await this.stripe.paymentIntents.create({
      amount: Number(args.amountMinorUnits),
      currency: args.currency.toLowerCase(),
      metadata: { tenant_id: args.tenantId },
    }, { idempotencyKey: args.idempotencyKey });
    return translateStripeStatusToDomain(pi);   // ACL — see anti-corruption-layer
  }
  // ...
}
```

```typescript
// src/commerce/adapters/in-memory-payment.adapter.ts  -- test/dev fake
export class InMemoryPaymentAdapter implements PaymentPort {
  private charges: ChargeRequest[] = [];
  // configurable canned responses
  public nextResult: ChargeResult = { status: 'succeeded', receiptId: 'rcpt_fake' };

  async charge(args: ChargeRequest): Promise<ChargeResult> {
    this.charges.push(args);
    return this.nextResult;
  }
  async refund() { /* ... */ }
  // test helpers (NOT part of the port):
  callsTo(method: 'charge'): ChargeRequest[] { return [...this.charges]; }
}
```

### Wiring

```typescript
// src/commerce/wiring/payment.wiring.ts
export function paymentAdapter(env: Env): PaymentPort {
  if (env.NODE_ENV === 'test') return new InMemoryPaymentAdapter();
  return new StripePaymentAdapter(new Stripe(env.STRIPE_KEY));
}
```

Wiring is the *only* code that knows about all adapters. The domain knows about none.

---

## Trade-offs

| Dimension | Pro (ports-and-adapters) | Con (ports-and-adapters) |
|---|---|---|
| **Testability** | Fakes replace external systems; tests run in milliseconds and are deterministic. | Fakes can drift from real adapter semantics; contract tests are needed (see Implementation Patterns). |
| **Swap cost** | Replacing Stripe with Adyen is one new adapter + one wiring change; domain is untouched. | The day you actually swap is the day you discover the port leaked SDK assumptions. Plan for ~20% rework even with a clean port. |
| **Design clarity** | Explicit boundary: "here is what my domain needs". Forces capability thinking. | Boilerplate: ports, adapters, fakes, wiring — non-trivial for small modules. |
| **Compliance** | Adapter substitution is compliance-friendly (no real secrets in dev). | Auditors may want evidence the swap is real, not paper — keep at least one non-production adapter actively used. |
| **Onboarding** | New engineers can read the port to understand a capability without learning the SDK. | New engineers may invent extra ports for everything, producing *port noise* — needs review discipline. |
| **Performance** | Negligible runtime overhead (one virtual call per capability). | None worth quantifying; cost is in design, not runtime. |

---

## Implementation Patterns

### 1. One port per capability

A port describes a *capability* the domain needs: payment, email sending, secret retrieval, blob storage. Methods on the port reflect *what the domain wants to do*, not what the SDK exposes. Resist the urge to map one SDK call to one port method.

Anti-pattern: `PaymentPort.createPaymentIntent`, `PaymentPort.confirmPaymentIntent`, `PaymentPort.cancelPaymentIntent`. This is Stripe's vocabulary leaking into the port. Better: `PaymentPort.charge`, with the adapter handling the SDK choreography.

### 2. Use domain types at the port

Port arguments and results use *domain types* (`TenantId`, `ChargeRequest`, `ISO4217`), not SDK types (`Stripe.Customer`, `Stripe.PaymentIntent`). Translation happens in the adapter, via an anti-corruption layer (`[[anti-corruption-layer]]`).

### 3. Every port has at least one fake adapter

This is the **CRITICAL** rule. A port without a fake is half a port — the design promises swappability but the codebase never exercises it. The fake serves three purposes:

- Fast unit tests.
- Local development without third-party credentials.
- Forcing the port to actually be capability-shaped (it is much harder to fake a leaky port).

The fake lives in the same module as the port: `src/<context>/adapters/in-memory-<capability>.adapter.ts`.

### 4. Contract tests guarantee adapter parity

A *contract test* is a test suite that runs against the port interface, parameterized by adapter. Run it against the real adapter (perhaps in a nightly job or integration-CI lane) and against the fake (every commit). Divergence between the two is a contract bug, surfacing before the fake drifts into uselessness.

```typescript
describe.each([
  ['stripe', () => new StripePaymentAdapter(testStripe())],
  ['fake',   () => new InMemoryPaymentAdapter()],
])('PaymentPort contract: %s', (name, factory) => {
  let adapter: PaymentPort;
  beforeEach(() => { adapter = factory(); });
  it('charges and returns succeeded for valid input', async () => { /* ... */ });
  it('returns declined for invalid card token', async () => { /* ... */ });
  it('is idempotent on duplicate idempotencyKey', async () => { /* ... */ });
});
```

### 5. Wiring is the only knower

A single wiring module per context (`wiring/`) constructs adapters by environment. Domain code receives the port via constructor injection. No `if (env.test)` lives inside domain code.

### 6. Port granularity heuristic

If two ports always appear together in the same use case, they may be one capability split too fine. If one port has 12 methods, it may be two capabilities glued together. Refactor when the seam reveals itself; do not optimize granularity upfront.

---

## Quality Checks

- **CRITICAL:** every port has at least one **fake/in-memory adapter** used by the test suite OR by a non-production environment, and a **contract test** that runs against both the real adapter and the fake. A port with only a production adapter is design theatre — the swappability claim is unfalsified and decays. This is the single most common ports-and-adapters anti-pattern, and the easiest to detect: grep for `implements PaymentPort` (or equivalent) and confirm at least two files match.

- **Port methods are domain-shaped, not SDK-shaped.** Reviewer reads the port file: if SDK vocabulary (e.g., `paymentIntent`, `setupIntent`, `customer`) appears in method names or argument types, reject — the SDK has leaked through the port.

- **Domain never imports an adapter.** Enforce with a lint rule or a fitness function: `src/<context>/domain/**` may not import from `src/<context>/adapters/**` or from any external SDK. Cross-reference `[[evolutionary-architecture]]` for the fitness-function pattern.

- **Adapter translates errors to domain errors.** A `Stripe.errors.StripeCardError` must not escape the adapter. The adapter catches and translates to a `ChargeResult` of `{ status: 'declined', reason: '...' }` or a domain error type. Otherwise the domain becomes coupled to the SDK's error taxonomy.

- **Adapter handles SDK-specific retries and idempotency.** The port advertises idempotency-via-key; the adapter implements it using the SDK's mechanism. The domain remains ignorant of how it's done.

- **One wiring module per context.** Adapter selection logic in scattered locations is a code-smell; consolidate to `wiring/`. If different runtime contexts (request scope, tenant scope) need different adapters, the wiring module owns that logic.

- **Adapter is the unit of credential ownership.** Secrets and credentials are read in the adapter (or its construction), never in the domain.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year) to refresh ports-and-adapters practice:

- `hexagonal architecture ports adapters {date}` — Cockburn's site is canonical; community write-ups are abundant. Look for examples in your language of choice.
- `clean architecture testability boundaries {date}` — Robert Martin's framing of the same idea; useful vocabulary cross-reference.
- `contract testing in process adapter parity {date}` — surfaces patterns for ensuring fake/real divergence is caught early.
- `dependency injection adapter wiring {date}` — DI-framework-specific guidance for adapter selection at startup.
- `in-memory fake versus mock {date}` — clarifies why a stateful in-memory fake is preferable to a per-test mock for ports.
- `port granularity capability versus method {date}` — practitioner debate; useful for justifying port-shape reviews.

Treat content older than 24 months as orientation; the pattern itself is stable but tooling (DI frameworks, contract-test runners) shifts.

---

## Cross-references

**Companion fragments:**

- [[ddd-bounded-contexts]] — ports-and-adapters operates *within* a bounded context; each context has its own port set.
- [[anti-corruption-layer]] — adapters use the ACL pattern to translate SDK types to domain types.
- [[module-decomposition-heuristics]] — when a port set grows large, the context may need to split.
- [[evolutionary-architecture]] — fitness functions enforce the "domain never imports adapter" invariant.

**Quality gate:**

- `QG-F1` (foundation) — the gate this fragment supports. A foundation design without identified ports per context fails QG-F1.

**Implementation patterns:**

- [[stripe-payment-adapter]] — concrete Stripe-as-PaymentPort implementation (forthcoming).
- [[adapter-contract-testing]] — contract-test scaffolding (forthcoming).

**Upstream specs:**

- `docs/v6-final-architecture.md` §6.3 (fragment schema).
- Alistair Cockburn, *Hexagonal Architecture* (2005).
- Robert C. Martin, *Clean Architecture* (2017), chapters 19–22.

**Downstream consumers:**

- `design-modular-monolith` skill (P3.1) — primary consumer.
- Any future P3+ skill that introduces a third-party integration (payment, email, search, vector store).
