---
id: anti-corruption-layer
title: Anti-Corruption Layer
category: foundation
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
tags: [anti-corruption-layer, ddd, integration, foundation, translation]
references:
  - "Eric Evans, Domain-Driven Design (2003), chapter 14"
  - "https://martinfowler.com/bliki/AnticorruptionLayer.html"
  - "Vaughn Vernon, Implementing Domain-Driven Design (2013), chapter 3"
---

# Anti-Corruption Layer

When a bounded context (`[[ddd-bounded-contexts]]`) talks to another context — internal or external — it must **never** accept the other side's schema directly into its own domain model. The other side's vocabulary, error taxonomy, and structural assumptions will leak in, and within a quarter the receiving context's model is no longer its own. Eric Evans named the defence: the **anti-corruption layer (ACL)** — a translation layer at the seam that converts foreign concepts into local ones and vice versa.

For a multi-tenant SaaS, ACLs sit between bounded contexts internally (Commerce ↔ Identity, Core ↔ Integration) and between the platform and every external system (Stripe, Salesforce, HubSpot, Auth0, third-party SSO IdPs, customer-side webhooks). The same pattern applies; the *cost* of skipping the ACL grows with the distance and volatility of the other side.

Consumed by `design-modular-monolith` (skill) when scoping context-to-context integration and by every adapter that calls an external system (see `[[ports-and-adapters]]`).

---

## When to Use

Apply an ACL when:

- **Crossing a bounded-context boundary, internal or external.** Every cross-context call or event flow gets an ACL on the consumer side. This is not negotiable for sustainable design; it is what makes contexts independently evolvable.

- **Integrating a third-party SaaS (Stripe, Salesforce, HubSpot, Snowflake).** Their schemas evolve on their cadence. An ACL absorbs the change; the domain remains stable.

- **Integrating a legacy internal system you can't change.** A legacy ERP, an acquired company's CRM. The ACL lets you build the new domain cleanly without shaping it around the legacy's quirks.

- **Receiving webhooks from customers' systems.** Customer webhook schemas are wildly heterogeneous and outside your control. ACL them at the front door — translate to a stable internal event schema, then process.

- **Migrating from an old domain model to a new one (strangler-fig).** During the migration, the new domain talks to the old via an ACL; the old keeps working while the new takes over piece by piece.

- **Two teams own adjacent contexts and one team's velocity is faster than the other.** The fast team adds an ACL between them so they're not blocked by the slow team's schema churn.

---

## When NOT to Use

Skip the ACL when:

- **Both sides of the boundary are owned by the same small team in the same context.** Inside a single bounded context, an ACL is overhead without benefit; pass domain types directly.

- **The external system is a thin commodity** (a key-value cache, a blob store, an in-process logger). The "schema" is trivial; ACL boilerplate exceeds value. A simple adapter (`[[ports-and-adapters]]`) suffices.

- **The relationship is genuinely *conformist*** — you accept the other side's model as authoritative *and* you have no intention of evolving the domain independently. Conformist relationships (in Evans's vocabulary) are valid; they just don't get an ACL. Document the choice.

- **You're building a one-off script.** Throwaway integrations don't need a translation layer; they need to run once and be deleted.

- **The "translation" is identity-mapping.** If your local type is byte-identical to the foreign type and you cannot imagine them diverging, the ACL is pure boilerplate. (Be honest: most teams under-estimate divergence; lean toward keeping the ACL.)

---

## Architecture

### The three-layer pattern

```
                ┌─────────────────────────────────┐
                │   External / other-context API  │
                └────────────────┬────────────────┘
                                 │ raw foreign schema
                                 ▼
                ┌─────────────────────────────────┐
                │  1. INBOUND TRANSLATOR          │
                │     (foreign → local)           │
                └────────────────┬────────────────┘
                                 │ local domain types
                                 ▼
                ┌─────────────────────────────────┐
                │  2. LOCAL FACADE                │
                │     (the "shape my domain      │
                │      wants to talk to")         │
                └────────────────┬────────────────┘
                                 │ domain operation
                                 ▼
                ┌─────────────────────────────────┐
                │       Local domain model        │
                │       (uses cases, aggregates)  │
                └────────────────┬────────────────┘
                                 │ local result types
                                 ▼
                ┌─────────────────────────────────┐
                │  3. OUTBOUND TRANSLATOR         │
                │     (local → foreign)           │
                └────────────────┬────────────────┘
                                 │ foreign request schema
                                 ▼
                ┌─────────────────────────────────┐
                │   External / other-context API  │
                └─────────────────────────────────┘
```

- **Inbound translator** receives foreign schema (REST response, webhook payload, integration event from another context). Validates, maps, normalizes, and produces local domain types. Any field the local domain does not care about is dropped.
- **Local facade** is the "shape my domain wants" — typically a port (`[[ports-and-adapters]]`). The domain calls the facade; the facade is implemented by the ACL.
- **Outbound translator** receives local domain types and emits foreign schema. Reverse of inbound. Handles foreign-side idempotency, retries, and rate-limits.

A **partial ACL** — one that translates inbound but not outbound, or vice versa — is the canonical anti-pattern. It looks reasonable until the day a local refactor breaks the outbound path because outbound never got the translation layer. **Both directions, always**.

### Concrete example: Salesforce ↔ Commerce ACL

```typescript
// Foreign type (Salesforce SDK)
type SfOpportunity = {
  Id: string;
  StageName: string;
  Amount__c: number | null;   // custom field
  CloseDate: string;          // YYYY-MM-DD
  Account: { Id: string; Name: string };
};

// Local domain type (Commerce context)
type CommerceOpportunity = {
  id: OpportunityId;
  stage: OpportunityStage;     // local enum: 'prospecting' | 'qualified' | 'won' | 'lost'
  amountMinorUnits: bigint | null;
  closeDate: Date;
  account: { id: AccountId; displayName: string };
};

// Inbound translator
function sfToCommerce(sf: SfOpportunity): CommerceOpportunity {
  return {
    id: opportunityIdFromString(sf.Id),
    stage: mapStage(sf.StageName),        // throws on unknown stage → ACL surfaces foreign drift
    amountMinorUnits: sf.Amount__c == null
      ? null
      : BigInt(Math.round(sf.Amount__c * 100)),
    closeDate: parseISODate(sf.CloseDate),
    account: {
      id: accountIdFromString(sf.Account.Id),
      displayName: sf.Account.Name,
    },
  };
}

// Outbound translator
function commerceToSf(c: CommerceOpportunity): Partial<SfOpportunity> {
  return {
    Id: c.id,
    StageName: unmapStage(c.stage),
    Amount__c: c.amountMinorUnits == null ? null : Number(c.amountMinorUnits) / 100,
    CloseDate: formatISODate(c.closeDate),
    Account: { Id: c.account.id, Name: c.account.displayName },
  };
}

// Local facade (port)
interface OpportunitySyncPort {
  fetch(id: OpportunityId): Promise<CommerceOpportunity>;
  upsert(o: CommerceOpportunity): Promise<void>;
}

// Adapter wires foreign client + translators behind the facade
class SalesforceOpportunityAdapter implements OpportunitySyncPort {
  constructor(private sf: SalesforceClient) {}
  async fetch(id: OpportunityId): Promise<CommerceOpportunity> {
    const sf = await this.sf.opportunity.get(id);
    return sfToCommerce(sf);
  }
  async upsert(o: CommerceOpportunity): Promise<void> {
    await this.sf.opportunity.upsert(commerceToSf(o));
  }
}
```

### Where the ACL lives in the codebase

```
src/<context>/
├── domain/                  # uses domain types only
├── application/
├── ports/
│   └── opportunity-sync.port.ts
├── adapters/
│   └── salesforce/
│       ├── salesforce-opportunity.adapter.ts
│       ├── sf-to-commerce.translator.ts   ◄── inbound ACL
│       ├── commerce-to-sf.translator.ts   ◄── outbound ACL
│       └── stage-mapping.ts                ◄── local mapping rules
└── ...
```

Translators are **pure functions** (no I/O), which makes them trivial to unit-test.

---

## Trade-offs

| Dimension | Pro (ACL) | Con (ACL) |
|---|---|---|
| **Schema isolation** | Foreign-side schema churn is absorbed by the translator; domain stays stable. | More code to maintain at the seam; every new field needs a translator decision. |
| **Type safety** | Domain types are precise; foreign optional/nullable fields are forced into explicit local representation. | Up-front cost: building local types is a design exercise, not free. |
| **Refactor safety** | Domain-side refactors don't break outbound calls — the translator is the only thing that changes. | Some refactors that *should* be cheap (rename a local field) require updating both translators. |
| **Testability** | Translators are pure functions, trivially testable; the foreign client is mocked at the adapter seam. | Adds a layer to onboard new engineers through. |
| **Drift detection** | An unknown foreign-side enum value throws in the translator → the system *announces* foreign change rather than silently corrupting. | The throw must be handled (graceful fallback, alert, quarantine) — design effort. |
| **Cross-system migration** | Strangler-fig migrations are far cleaner with an ACL between old and new domains. | None worth quantifying; ACL is the enabler. |
| **Performance** | Negligible: a few function calls per request. | Negligible — but watch for translator allocations in hot paths. |

---

## Implementation Patterns

### 1. Translators are pure functions

Inbound and outbound translators take a value and return a value. No I/O. No singletons. No side effects. This makes them:

- Unit-testable with one-line tests (`expect(sfToCommerce(fixture)).toEqual(expected)`).
- Refactor-safe (rename a domain field → compiler error in translator → fix once).
- Composable (you can build translators bottom-up: `mapStage`, then `mapMoney`, then `sfToCommerce` that uses them).

### 2. Translate inbound *and* outbound — always

The **CRITICAL** rule. A partial ACL (inbound only, or outbound only) leaks. Common failure modes:

- Inbound-only: outbound calls pass domain types directly to the foreign client; the foreign client's typing forces a quiet ad-hoc translation that is not reviewed, not tested, and drifts.
- Outbound-only: inbound events are unmarshalled by a JSON parser into "duck-typed" objects; domain code starts pattern-matching on foreign fields; foreign schema change silently corrupts domain state.

A 50/50 ACL is a 0% ACL. Both directions, always.

### 3. Reject unknown enum values explicitly

When the foreign side uses an enum and you map it to a local enum, **throw or quarantine on unknown values**. Do not silently map to a default. The unknown-value throw is *the early-warning signal* that the foreign side has drifted; swallowing it converts every external change into a silent data-corruption incident.

```typescript
function mapStage(sfStage: string): OpportunityStage {
  const m: Record<string, OpportunityStage> = {
    'Prospecting': 'prospecting',
    'Qualification': 'qualified',
    'Closed Won': 'won',
    'Closed Lost': 'lost',
  };
  const local = m[sfStage];
  if (!local) {
    throw new ForeignSchemaDriftError(`unknown SF stage: ${sfStage}`);
  }
  return local;
}
```

The `ForeignSchemaDriftError` should be caught at the adapter level, logged with high severity, and surfaced via an alert. It is *not* a bug in your code — it is a *change in their world*, and you want to know.

### 4. Versioned translators for stable contracts

If the foreign side publishes schema versions (Stripe API versions, Salesforce releases), version the inbound translator (`sfToCommerce_v54`, `sfToCommerce_v55`). Switch versions via wiring. Keep old versions until the foreign side retires them, then prune.

### 5. Schema validation at the inbound edge

Validate the foreign payload's shape *before* translation, with a schema library (Zod, Pydantic, JSON Schema). Validation rejects malformed inputs at the door; translation assumes well-formed input. Separating the two makes both simpler.

### 6. Tenancy preservation across the seam

Multi-tenant ACLs must preserve tenant context across the translation. The inbound translator extracts `tenant_id` (often from a foreign metadata field or a webhook header); the outbound translator stamps `tenant_id` into the foreign metadata. Losing tenancy at the seam is a cross-tenant bug waiting to happen.

### 7. Outbound idempotency

Outbound translators are the place to compute and attach idempotency keys for the foreign side (Stripe `Idempotency-Key` header, Salesforce external-id). Domain-shaped keys (typically a local request UUID) propagate; the translator names them in the foreign vocabulary.

---

## Quality Checks

- **CRITICAL:** the ACL translates **both directions** — inbound (foreign → local) AND outbound (local → foreign). A partial ACL is a leak: the side without translation will drift, silently corrupting either domain state (inbound leak) or foreign-side data (outbound leak). Every published "we got bitten by an upstream schema change" incident traces to a missing inbound translator; every published "we corrupted the CRM with malformed updates" incident traces to a missing outbound translator. Reviewers must confirm both translators exist and have tests before approving the integration.

- **Translators are pure functions** (no I/O, no globals, no time). Reviewers verify by running the translator tests in isolation; if they require fixtures beyond the input value, the translator is impure.

- **Unknown foreign enum values throw**, not fall through to a default. Silent defaults convert schema drift into data corruption.

- **Foreign schema is validated before translation.** Validation layer (Zod, Pydantic, JSON Schema) sits at the inbound edge; translators assume valid input.

- **Tenant context is preserved across the seam.** Inbound translators extract `tenant_id` and pass it through; outbound translators stamp `tenant_id` into foreign metadata. Missing tenant propagation = future cross-tenant incident.

- **Translator versions track foreign API versions** when the foreign side publishes them. Stripe API version, Salesforce release, etc.

- **No domain code imports foreign SDK types.** Enforce with a lint rule or fitness function (`[[evolutionary-architecture]]`). The presence of `Stripe.PaymentIntent` in `src/<context>/domain/` is an ACL leak.

- **ACL has at least one drift-detection test.** A test that feeds an *unexpected* foreign shape and asserts the translator surfaces it (throws or quarantines). This proves the early-warning mechanism works.

- **Outbound translators attach idempotency** where the foreign side supports it. Retry-safety belongs at the seam, not in the domain.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year):

- `anti-corruption layer DDD pattern {date}` — Fowler, Vernon, Evans-quoting practitioners are recurring sources.
- `webhook schema drift detection {date}` — practical guidance on detecting and responding to upstream changes; useful for the drift-detection-test pattern.
- `Stripe API versioning translator {date}` — concrete examples of versioned translators (Stripe is the canonical case).
- `Salesforce integration anti-corruption {date}` — Salesforce's custom-fields-everywhere model is the classic ACL scenario.
- `schema validation Zod Pydantic boundary {date}` — language-specific validation guidance at the inbound edge.
- `idempotency key outbound integration {date}` — patterns for safe retry across the seam.

Treat content older than 24 months as orientation; the pattern is stable but the tooling (validation libs, drift-detection products) shifts.

---

## Cross-references

**Companion fragments:**

- [[ddd-bounded-contexts]] — every context boundary is an ACL boundary.
- [[ports-and-adapters]] — the ACL lives inside the adapter; the port presents the local facade.
- [[module-decomposition-heuristics]] — when a module splits, the new seam needs an ACL on the consumer side.
- [[evolutionary-architecture]] — fitness functions enforce "no foreign types in domain".

**Quality gate:**

- `QG-F1` (foundation) — foundation designs that propose cross-context integration without an ACL fail this gate.
- `QG-M2` (tenant isolation) — ACLs that lose tenant context fail QG-M2.

**Implementation patterns:**

- [[salesforce-acl-template]] — concrete starting-point translator scaffolds (forthcoming).
- [[webhook-acl-pattern]] — front-door ACL for customer webhooks (forthcoming).

**Upstream specs:**

- `docs/v6-final-architecture.md` §6.3 (fragment schema).
- Eric Evans, *Domain-Driven Design* (2003), chapter 14 ("Maintaining Model Integrity").
- Vaughn Vernon, *Implementing DDD* (2013), chapter 3.

**Downstream consumers:**

- `design-modular-monolith` skill (P3.1) — primary consumer.
- Every P3+ skill that integrates an external system or crosses a context boundary.
