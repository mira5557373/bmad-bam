---
id: migration-rollback-and-abort
title: Migration Rollback and Abort
category: lifecycle
kind: fragment
module: bmad-bam-platform
persona: atlas
qg_ref: QG-D1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
tags: [rollback, abort, migration, observability, idempotent, blast-radius, multi-tenant]
references:
  - "Site Reliability Engineering (Beyer et al.) — rollback patterns + chapter on managing risk"
  - "Continuous Delivery (Humble + Farley) — rollback as a first-class concern"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/rollback-strategies.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/zero-downtime-migrations.md"
  - "src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/fragments/migration-cohort-selection.md"
---

# Migration Rollback and Abort

The runbook's rollback gate + abort criteria are the silent heroes of every migration that doesn't blow up in production. Most published migration disasters have the same shape: cohort starts, some signal degrades, the migration team debates "is this normal?", hours pass, the cohort completes despite the degradation, the degradation turns out to have been the leading edge of a much worse failure surface. The cure is to make abort + rollback decisions as automated + bias-toward-safety as possible: pre-declared triggers; pre-rehearsed rollback mechanism; idempotent execution that survives partial completion.

This fragment is the **design vocabulary** for the `rollback_gate` + `abort_criteria` + `observability_hooks` sections of `migration-runbook.json#per_axis.<axis>`. It enumerates the rollback methods, the abort-criteria taxonomy, the observability-hook patterns, and the cross-cutting concern of idempotent execution + partial-completion handling. The migration runbook locks the gate; this fragment is the pattern catalogue + rationale the runbook draws from.

The CRITICAL contract: **migration MUST be aborted if rollback_trigger fires; partial completions MUST roll back, not patch forward.** Patching forward (continuing despite an abort signal) is the most-common failure-amplification pattern in published incidents. The runbook MUST treat rollback_trigger firing as load-bearing — investigate after rollback, not while the migration is still in flight.

---

## When to Use

- **Every migration cohort.** Rollback + abort design is mandatory in the migration runbook; not optional.

- **Pre-rehearsal of rollback in dry-run.** The runbook's `dry_run_plan` exercises rollback in addition to forward-migration; a rollback that's never been rehearsed is not real.

- **Quarterly review of triggers.** Trigger thresholds drift as baseline metrics shift (p99 baseline that was 200ms is now 300ms; error-rate baseline that was 0.1% is now 0.3% with the new feature). Quarterly review prevents stale thresholds from desensitizing the gate.

- **After a near-miss.** A cohort that should have aborted but didn't surfaces a trigger-design gap; revisit + tighten.

- **After a production incident.** The incident's root cause typically maps to a missed abort signal; add the signal to the trigger set.

- **Before any new axis activation.** A runbook that previously only had tier-axis is acquiring region-axis → region-specific triggers (replication_lag_threshold; consent_audit) must be added.

---

## When NOT to Use

- **Migrations without cohorts.** If the migration is a single-step operation (rare; usually surfaced after cohort design), rollback is still relevant but the gate-trigger relationship simplifies — the gate fires + rollback executes.

- **One-shot scripts that aren't migrations.** A schema migration applied to a non-tenant-scoped table (e.g., add an index to a shared metadata table) may not need cohort-shaped rollback; standard DB-level rollback applies.

- **Pre-launch / pre-production-data.** Without live data, rollback is degenerate ("revert the code change"); the patterns apply only after data is involved.

---

## Architecture: the three pillars of safe migration

### Pillar 1: Rollback methods (mechanism choice)

The runbook's `rollback_method` enum locks the mechanism. Each method has distinct properties:

#### `blue_green_flip`

**Mechanics.** Both versions (or both region states) are running simultaneously during the cutover window. Rollback flips the routing layer (DNS, service mesh, API gateway) back to the original; the un-rolled-back version (the canonical-after-cutover state) is preserved for forward-recovery if needed.

**Pros:**
- Instant flip-back (DNS TTL bounded; service-mesh near-instant)
- No state-reattach required; tenants resume on the original side without re-bootstrap
- Compatible with zero_downtime_required (invariant 12 allows)

**Cons:**
- Doubles capacity cost during cutover window (both sides live)
- Routing-layer-flip overhead (must rehearse propagation)
- Slight risk of split-brain if both sides accept writes during the flip (mitigation: write-suspend at the side being torn down)

**Best fit:** Region-migration with zero_downtime_required; tier-upgrade where new tier requires substantial per-tenant resource provisioning.

#### `canary_revert`

**Mechanics.** Canary cohort (small) is reverted via reverse-migration script; the remaining cohorts are paused (never started) pending investigation. Single-cohort rollback; un-cutover cohorts are untouched.

**Pros:**
- Lowest blast-radius (only canary affected)
- Low cost (no doubled capacity)
- Simple to rehearse (per-cohort reversal is a stand-alone operation)

**Cons:**
- Reverse-migration script must exist + be tested (extra engineering investment)
- Some changes are not cleanly reversible (e.g., destructive schema changes; data anonymization that was applied during forward-migration)
- Operational pause for remaining cohorts (may be acceptable; may not, depending on deadline pressure)

**Best fit:** Tier-upgrade where reverse-migration is straightforward; risk_stratified cohort plans where canary failure is the main concern.

#### `cell_failback`

**Mechanics.** Cell-based tenancy; failback from target cell to source cell. Requires brief downtime per tenant while session state is re-attached at the source cell.

**Pros:**
- Clean state reattach at source (no drift to reconcile)
- Natural fit for cell-based tenancy

**Cons:**
- **NOT zero_downtime compatible** (per spec invariant 12). Per-tenant downtime during state reattach (typically seconds to minutes).
- Higher complexity (state-reattach orchestration)
- Source cell state must remain consistent during the cutover window for failback to succeed

**Best fit:** Cell-based deployments where zero_downtime_required is `false`. Step-07-v rejects this method when zero_downtime_required is `true`.

#### `dual_write_revert`

**Mechanics.** Both source + target accept writes during cutover (the dual-write pattern from `region-migration-playbook.md`). Rollback halts writes to target; promotes source as canonical; reconciles drift offline.

**Pros:**
- No data loss; both sides have the data
- Reconcile-offline allows careful drift resolution
- Compatible with zero_downtime_required

**Cons:**
- Requires dual-write infrastructure (often complex to set up)
- Doubles write volume during cutover window
- Drift-reconciliation can be operationally intensive (manual conflict resolution; per-tenant audit)

**Best fit:** Region-migration with strong consistency requirements; high-stakes tier-upgrade where data loss is unacceptable.

### Pillar 2: Abort criteria (when to fire)

Pre-declared, automatic, bias-toward-safety. The runbook records:

#### Universal abort criteria (apply to all axes)

- **error_rate_threshold:** error rate > 5% sustained ≥10min during migration window. (Threshold + duration both matter; brief spikes are not aborts.)
- **latency_threshold:** p99 latency > 2x pre-migration baseline sustained ≥10min. (p99 is the canonical signal; mean is too forgiving.)
- **data_integrity_violation:** ANY observed cross-tenant data leak. (No threshold; one observation aborts. Investigation precedes any restart.)
- **customer_complaint_threshold:** ≥3 customer complaints with same root cause in 24h post-cutover. (Pause; investigate; abort if root cause is migration-induced.)

#### Tier-axis specific

- **billing_prorate_audit failure:** any cohort tenant's proration calculation fails audit (per `tenant-tier-upgrade-mechanics.md`). Abort + refund + investigation.
- **feature_flip_cache_propagation_timeout:** cache propagation exceeds 30s timeout. Abort + revert tier-flip.
- **per_tenant_resource_provisioning_failure:** dedicated resource (cell, custom domain, etc.) fails to provision within SLA. Pause cohort; revert tenants whose resources failed.

#### Region-axis specific

- **replication_lag_threshold:** replication lag > 30min on reconcile during dual-write. Abort + halt + investigate replication-infrastructure.
- **consent_audit failure:** any tenant in cohort has missing or stale consent. Abort + halt + re-obtain consent before resuming.
- **dns_cutover_partial:** majority traffic doesn't reach target region within 60s post-cutover. Abort + DNS revert.
- **cert_validation_failure:** TLS handshake at target region fails for any tenant DNS. Abort + cert fix before resume.

#### Abort vs. pause vs. alert

- **Abort:** automatic rollback execution begins. Pre-declared trigger; no human-in-the-loop required at trigger time (humans investigate after rollback).
- **Pause:** automatic stop of cohort progression; subsequent cohorts not started. Human-in-the-loop required to decide abort vs. resume.
- **Alert:** notification only; no automatic action. Used for soft signals that warrant attention but don't automatically abort.

The runbook records the `action` per criterion: `abort | pause | alert`.

### Pillar 3: Observability hooks (signals to watch)

Observability is the runbook's nervous system. Without signals, abort criteria can't fire; without abort criteria firing, rollback never starts; without rollback, migration runs to completion regardless of degradation.

#### Universal observability hooks

- **migration_progress_dashboard:** per-cohort progress (cohorts completed; current cohort runtime; failures per cohort). Used by migration team during active cohort.
- **tenant_id_error_log:** structured-log entries during migration with `tenant_id` + `migration_axis` + `cohort_id` fields. Enables per-tenant correlation in incident investigation.
- **rollback_decision_audit:** every rollback decision (auto-fired + manual) audited with cause + timestamp + reverter. Auditor's artifact for regulatory inquiry.

#### Tier-axis specific

- **billing_prorate_audit:** every tier-upgrade billing-proration calculation captured (per `tenant-tier-upgrade-mechanics.md` Concern 2). Compliance + auditor evidence.
- **feature_flip_propagation_metric:** cache propagation time per tier-flip. Trends across cohorts surface infrastructure drift.
- **per_tenant_resource_readiness:** per-tenant async-provisioning state (provisioning → ready → failed). Customer notification waits on ready.

#### Region-axis specific

- **replication_lag_metric:** per-source/target pair replication-lag exposed to dashboards. Real-time signal.
- **consent_audit_event:** consent_verified_for_migration audit event (per `region-migration-playbook.md` Concern 1). Regulatory artifact.
- **dns_propagation_metric:** post-cutover traffic-split observation; percent-to-target over time. Confirms successful DNS cutover.
- **cross_region_latency_metric:** p99 latency by region pair. Surfaces customer-experience degradation during cutover.

#### Hook implementation patterns

- **Structured logs.** JSON-formatted log entries with tagged fields; consumed by log-aggregation (Splunk, Datadog, Loki, etc.). Cheapest; highest cardinality risk if not bounded.
- **Metrics.** Prometheus / Datadog metric series; per-tenant labels carefully managed (cardinality cap from `noisy-neighbor-detection.md`). Time-series + thresholds for alerting.
- **Audit events.** Append-only audit log; immutable; tamper-evident (typically signed); designed for regulatory inquiry. Distinct from metrics + logs.
- **Dashboards.** Aggregated views combining metrics + log signals + audit events; human-facing during active cohort.

### Pillar 4 (cross-cutting): idempotent rollback execution

Rollback may itself fail mid-execution (network blip; secondary subsystem unavailable). Rollback must be **idempotent**: re-running rollback from the beginning produces the same end state regardless of how far the prior attempt got. Without idempotency, partial rollback leaves the system in an unknown state.

**Idempotency design:**

- **Idempotency keys.** Every rollback step has an idempotency key (cohort_id + step_id + timestamp_seed). Re-applying with the same key is a no-op.
- **Step-state machine.** Rollback steps are recorded with `attempted | succeeded | failed` per step. Re-running rollback picks up from the first non-succeeded step.
- **State preconditions.** Every step checks preconditions before applying; if the precondition is already satisfied, the step is skipped.

**Partial-completion handling:**

- A rollback that completes step 1-3 then fails at step 4 leaves the system in state "step 1-3 reversed; step 4+ forward-state still applied." Re-running rollback resumes at step 4.
- If step 4 has hard-failed (the operation cannot complete; e.g., destructive operation cannot be undone), the rollback transitions to **escalate** state — manual intervention required. The runbook records the escalation path.

**Partial-completion vs. patching forward:**

- The CRITICAL contract: never patch forward from partial completion. If migration is at cohort 5 of 10, cohort 5 fails midway, and only 3 of 5 tenants in cohort 5 completed → roll back the 3 completed tenants + all of cohort 5; halt at cohort 4's completion state. Patching forward (completing the remaining 2 + continuing to cohort 6) is the most-common failure-amplification pattern.

---

## Trade-offs

| Choice | Pro | Con |
|---|---|---|
| Auto-abort (no human gate) vs. pause + human-confirm | Faster reaction; bias-to-safety | False positives waste migration windows |
| Tight thresholds (sensitive) vs. loose thresholds | More aborts catch real signals | False positive rate higher; "boy who cried wolf" effect |
| `blue_green_flip` rollback vs `canary_revert` | blue_green is instant; canary is per-cohort | blue_green is 2x cost; canary requires reverse-migration script |
| Centralized abort decision (orchestrator) vs distributed (per-step) | Easier to coordinate; single source of truth | Single point of failure; if orchestrator is down, no abort possible |
| Pre-rehearsed rollback vs ad-hoc | Pre-rehearsed catches failure modes before incident | Cost of rehearsal time + infrastructure |
| Structured-log observability vs metric-based | Logs preserve detail; useful for forensics | Higher storage cost; cardinality risk |
| Audit-event for every step vs only for key events | More-comprehensive audit | Higher cost; more noise for auditor |

---

## Implementation Patterns

### Pattern: idempotent rollback orchestrator

```python
def rollback_cohort(cohort, rollback_method, idempotency_key):
    state = load_rollback_state(idempotency_key)
    if state is None:
        state = {"steps": {}, "started_at": now()}
        save_rollback_state(idempotency_key, state)

    steps = rollback_steps_for(rollback_method, cohort)

    for step in steps:
        if state["steps"].get(step.id) == "succeeded":
            continue  # Idempotent skip
        try:
            if step.precondition_satisfied():
                state["steps"][step.id] = "skipped-precondition-satisfied"
            else:
                step.execute()
                state["steps"][step.id] = "succeeded"
        except StepFailedRecoverable as e:
            state["steps"][step.id] = "failed-recoverable"
            save_rollback_state(idempotency_key, state)
            raise
        except StepFailedHardFailure as e:
            state["steps"][step.id] = "failed-hard"
            state["escalation"] = {"step": step.id, "reason": e.reason, "operator": "on-call"}
            save_rollback_state(idempotency_key, state)
            emit_alert("rollback_escalation", state["escalation"])
            raise

    state["completed_at"] = now()
    save_rollback_state(idempotency_key, state)
    return {"status": "complete", "idempotency_key": idempotency_key}
```

The idempotency_key persists across rollback-attempt retries; resuming a rollback continues from the last-completed step.

### Pattern: abort criterion polling

```python
class AbortCriterion:
    def __init__(self, name, threshold, window, action):
        self.name = name
        self.threshold = threshold
        self.window = window  # measurement window
        self.action = action  # "abort" | "pause" | "alert"

    def evaluate(self):
        signal_value = sample_signal(self.name, self.window)
        if signal_value > self.threshold:
            return {
                "fired": True,
                "criterion": self.name,
                "value": signal_value,
                "threshold": self.threshold,
                "action": self.action
            }
        return {"fired": False}

def cohort_observation_loop(cohort, abort_criteria, sample_interval=60):
    while not cohort.completed():
        for criterion in abort_criteria:
            result = criterion.evaluate()
            if result["fired"]:
                handle_criterion_fire(cohort, result)
        sleep(sample_interval)

def handle_criterion_fire(cohort, result):
    if result["action"] == "abort":
        emit_event("abort_triggered", result)
        initiate_rollback(cohort, idempotency_key=f"cohort-{cohort.id}-abort-{result['criterion']}")
    elif result["action"] == "pause":
        emit_event("pause_triggered", result)
        pause_cohort_progression(cohort)
    elif result["action"] == "alert":
        emit_event("alert_triggered", result)
```

The sample_interval (typically 60s) governs how quickly criteria fire after the threshold is breached. Shorter intervals catch faster degradation; longer intervals reduce evaluation overhead.

### Pattern: per-step state with escalation

```python
class RollbackStep:
    def __init__(self, id, execute_fn, precondition_fn, escalation_path):
        self.id = id
        self.execute_fn = execute_fn
        self.precondition_fn = precondition_fn  # returns True if step is already done
        self.escalation_path = escalation_path

    def execute(self):
        try:
            self.execute_fn()
        except (NetworkError, TransientError) as e:
            raise StepFailedRecoverable(self.id, str(e))
        except (DestructiveOpAlreadyApplied, ResourceUnreachable) as e:
            raise StepFailedHardFailure(self.id, reason=str(e))
```

The `escalation_path` is the manual-intervention destination: which on-call rotation; what runbook to consult; what evidence to gather. Captured in the runbook ADR for post-hoc audit.

### Pattern: observability hook fan-out

```python
def emit_migration_event(event_type, cohort, tenant_id=None, fields=None):
    base_fields = {
        "event_type": event_type,
        "cohort_id": cohort.id,
        "migration_axis": cohort.axis,
        "timestamp": now().isoformat()
    }
    if tenant_id:
        base_fields["tenant_id"] = tenant_id
    if fields:
        base_fields.update(fields)

    # Fan out to all observability hooks
    log_structured(base_fields)
    metric_increment(f"migration.events.{event_type}", tags={"axis": cohort.axis, "cohort": cohort.id})
    audit_append(base_fields)
    dashboard_update(cohort.id, base_fields)
```

Single emit-point fan-out reduces drift between observability surfaces. A new hook is added once; all events flow through it automatically.

---

## Quality Checks

- **CRITICAL:** Migration MUST be aborted if rollback_trigger fires; partial completions MUST roll back, not patch forward.

- **Rollback rehearsed in dry-run.** The dry_run_plan exercises rollback in addition to forward-migration. Un-rehearsed rollback is not real.

- **All four pillars present in the runbook.** rollback_method + rollback_trigger + abort_criteria + observability_hooks all populated. step-07-v rejects empty/missing pillars (rollback_trigger empty is ERROR; abort_criteria + observability_hooks empty are WARN).

- **Idempotent rollback execution.** Every rollback step has an idempotency key; re-running produces the same state. The runbook records the idempotency-key scheme.

- **Per-step preconditions checked.** Before applying a step, check preconditions; skip-if-satisfied prevents double-execution.

- **Hard-failure escalation path defined.** Steps that may hard-fail have a documented escalation path in the runbook.

- **Triggers tuned to current baseline.** Quarterly review: do thresholds reflect current baseline? Stale thresholds desensitize the gate.

- **Auto-abort for hard signals; pause for soft signals.** data_integrity_violation is hard (immediate abort); customer_complaint is soft (pause + investigate). Action level per criterion.

- **Audit trail on every rollback decision.** Whether the decision was auto-fired by a trigger or manual operator-initiated, the audit captures cause + timestamp + reverter.

- **Per-axis criteria included.** Tier-axis adds billing-related criteria; region-axis adds replication + DNS + consent criteria. The runbook validates per-axis completeness.

- **Cardinality bound on per-tenant metrics.** Per-tenant metric labels are bounded per `noisy-neighbor-detection.md`; otherwise migration observability blows up the metrics-system.

- **Rollback completion confirmed by re-observation.** After rollback completes, the cohort is re-observed for a stability window (typically 1-6h) to confirm rollback didn't introduce its own issues.

---

## Web Research Queries

Refresh empirical inputs annually. Replace `{date}` with current year.

- `rollback strategy production migration {date}` — practitioner patterns.
- `idempotent rollback distributed systems {date}` — research + library guidance.
- `abort criteria canary deployment {date}` — SRE community guidance.
- `feature flag rollback partial completion {date}` — feature-management vendor docs.
- `Prometheus alert threshold migration {date}` — monitoring tooling guidance.
- `audit log immutable migration {date}` — compliance / audit infrastructure patterns.
- `SRE error budget rollback {date}` — Google SRE patterns.
- `post incident analysis migration rollback {date}` — public post-incident write-ups.

---

## Cross-references

**Companion fragments:**
- [[rollback-strategies]] — broader rollback-strategy context; this fragment is the migration-specific specialization
- [[zero-downtime-migrations]] — zero-downtime patterns; rollback method eligibility depends on zero_downtime_required
- [[migration-cohort-selection]] — cohort sizing; cohort failure triggers rollback
- [[tenant-tier-upgrade-mechanics]] — tier-axis specific concerns; billing_prorate_audit is a tier-axis abort criterion
- [[region-migration-playbook]] — region-axis specific concerns; replication_lag + consent_audit are region-axis abort criteria
- [[noisy-neighbor-detection]] — cardinality bounds on per-tenant metrics during migration

**Glossary:**
- `rollback-gate` (P3.2 implied; defined in this fragment)
- `abort-criteria` (introduced here)

**Quality gate:**
- `QG-D1` v0.1.0 — primary consumer; rollback_gate + abort_criteria + observability_hooks validation sources here
- `QG-M2` v1.1.0 — mirror consumer

**Anti-pattern:**
- [[tier-upgrade-without-billing-prorate]] — adjacent; billing_prorate_audit abort criterion is the runbook-side remediation for this anti-pattern
- [[tenancy-as-afterthought]] (P3.1) — adjacent family; teams that delivered tenancy late typically also ship migrations without robust rollback

**Schemas:**
- `migration-runbook.json` schema (spec §3.5) — `per_axis.<axis>.rollback_gate + abort_criteria + observability_hooks` populates from this fragment's enumeration

**Downstream consumers:**
- `bmad-bam-design-tenant-migration-tooling` step-02 — loads rollback method options + abort defaults + observability defaults from this fragment
- `bmad-bam-design-tenant-migration-tooling` step-04 — locks rollback gate + abort criteria + observability hooks

**Upstream specs:**
- `docs/superpowers/specs/2026-05-17-p3-2-lifecycle-design.md` §2.4 (skill purpose), §3.5 (migration-runbook schema), §5.1.1 (fragment registration)
