---
id: deployment-without-cohorts
title: Deployment Without Cohorts
kind: anti-pattern
category: foundation
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
severity: high
applicability:
  - greenfield: must-avoid
  - brownfield: must-fix
references:
  - "docs/v6-final-architecture.md §6.4"
  - "https://aws.amazon.com/builders-library/automating-safe-hands-off-deployments/"
  - "https://github.com/google/site-reliability-engineering"
---

# Deployment Without Cohorts

Deploying changes to all tenants simultaneously, with no rollout cohorts, no canary, and no per-tenant rollback boundary. Every deploy is "the entire fleet at once". When a deploy is bad, every tenant is affected; when a tenant has a unique configuration that fails on the new code, the team finds out from a support ticket rather than from a canary alert.

This anti-pattern is common in young SaaS teams who optimize for deploy velocity over deploy safety. It is reasonable for a 10-tenant product; it is catastrophic at 1,000+ tenants. The transition window (typically 100–500 tenants) is when teams should adopt cohorts; many do not, and learn the lesson via a customer-visible incident.

## What it looks like

The CI/CD pipeline has one production stage. A successful build pushes to staging, runs integration tests, and on green, ships to all production tenants simultaneously. Deploys are described as "atomic" — every tenant moves to the new version at the same moment. The team rationalizes this as "consistent behavior across the fleet"; it is the same instinct as "everyone runs the same version", which sounds like a virtue.

There is no notion of a "canary" tenant or a "first cohort". There is no per-tenant feature flag for newly-rolled-out code. When a deploy goes bad, the rollback is also fleet-wide; rolling back is just as risky as the deploy that necessitated it, because the rollback affects everyone too. Some teams add automated rollback gates ("if error rate exceeds X% in 5 minutes after deploy, auto-rollback") which fire when 5% of tenants are affected by a bug — at which point the bug has already affected 50 tenants on a 1,000-tenant fleet.

Tenant-specific configuration adds another dimension. Each tenant has feature flags, configuration overrides, custom integrations, or unique data shapes. The combinatorial explosion means *no* staging environment can prove the deploy is safe for every tenant; the production deploy *is* the test for tenant-specific behavior. Without cohorts, that test runs simultaneously on all 1,000 tenants.

When something goes wrong — and it does — the team gets dozens of simultaneous incident tickets from different tenants. Triage is exponentially harder because the team has to figure out *which* tenants are affected and *why* without the data that cohorted deploys would have provided. Incident postmortems blame "we should have caught this in staging" without acknowledging that staging cannot prove what production deploys would have proven if they had been incremental.

## Why it's wrong

- **Blast radius is unbounded.** Every deploy can take down every tenant. A simple code error (null pointer, wrong dependency version, schema migration race) becomes a fleet-wide outage. The blast radius is the product of bug-rate × tenant-count; without cohorts, both terms multiply directly.

- **No early signal.** A canary cohort surfaces the bug at 1% of tenants. Without cohorts, the first signal *is* the broad incident. The team is reactive, not proactive.

- **Rollback risk equals deploy risk.** A fleet-wide rollback is just another fleet-wide deploy. If the deploy that broke things was risky, the rollback is too. Cohorted rollback (start with the most-affected cohort, then expand) is much safer.

- **Tenant-specific failures are invisible until they hit.** Tenant X has a custom integration that fails on the new code. With cohorts, you discover this at the cohort containing Tenant X (typically <50 tenants worth of blast). Without cohorts, you discover it as part of a fleet-wide incident.

- **Sales-promised SLAs become impossible.** Enterprise contracts with "99.95% per-tenant uptime" SLAs cannot be defended when every deploy is a fleet-wide change. SLA refund liability scales with tenant count.

- **Compliance posture weakens.** SOC2 CC8 (change management) auditors increasingly expect to see cohorted rollouts as evidence of change-risk control. "We deploy to everyone at once" is no longer an acceptable answer in mid-market and enterprise audit settings.

## What to do instead

- **Apply [[tenant-cohort-design]] to define rollout cohorts.** Cohorts should be deliberately heterogeneous (a mix of tenant sizes, usage patterns, and feature configurations) so that issues with any tenant archetype surface in early cohorts.

- **Apply [[rollout-strategies-comparison]] to choose a strategy.** Canary, blue-green, ring-based, percentage-based — each has trade-offs. Pick one explicitly per [[evolutionary-architecture]] and document the runbook.

- **Build a per-tenant code-version reference.** Each tenant has a "running version" attribute. Deploys are operations that advance some tenants' version. This makes rollout state inspectable from operational dashboards.

- **Add canary alerts at the cohort boundary.** When cohort 1 (1% of tenants) goes to vN+1, alerts compare cohort 1's error rate / latency / health metrics against cohort 0 (still on vN). Deviation > threshold pauses the rollout.

- **Make rollback cohort-aware.** Rollback should move *one cohort* back to the prior version, not the whole fleet. The cohort isolation enables fast, low-blast-radius mitigation.

- **Test the rollback path.** Most teams have never actually rolled back; the rollback path bit-rots. Run a rollback drill quarterly. Document the runbook.

- **Pass QG-F1 with cohort design.** QG-F1 includes deployment-topology questions; cohort design is the answer.

## Recovery path (brownfield)

If you are currently deploying without cohorts and have ≥100 production tenants, here is a phased recovery:

1. **Pick a cohort scheme.** Tenant-cohort design (random/segmented/explicit-customer-volunteer) per [[tenant-cohort-design]]. The first cohort should be small (≤5% of tenants) and skewed toward tenants who have explicitly opted into early-access (volunteers are best; they expect risk).

2. **Add cohort assignment to the tenant record.** Each tenant gets a cohort id (1, 2, 3, ...). Initial assignment can be random; over time, segment by archetype.

3. **Modify the deploy pipeline.** Deploys are now multi-stage: cohort 1 first, then 2, then ... with health-check gates between stages. Use a feature-flag service or your CI/CD system's deployment-stage feature.

4. **Build cohort-aware dashboards.** Every operational dashboard should be filterable by cohort. The "is the new version healthy" question must be answerable per cohort.

5. **Pilot with one deploy.** Pick a low-risk deploy (a config change, a small refactor) and run it through the new cohorted pipeline. Observe the metrics. Tune the health-check thresholds.

6. **Pilot a rollback.** Roll cohort 1 forward to a known-bad version (in a controlled "fire drill" deploy). Roll it back. Validate the rollback path. Document the runbook.

7. **Default all deploys through cohorts.** Once piloted, this should become the default deploy path. Exceptions (emergency hotfixes) should be rare and explicitly approved.

8. **Plan 4–8 engineer-weeks.** The recovery itself is bounded; the cultural shift (engineers learning to think in cohorts) takes longer but happens in parallel with operational improvements.

## Cross-references

- Fragment: [[tenant-cohort-design]] — cohort design principles.
- Fragment: [[rollout-strategies-comparison]] — strategy selection.
- Fragment: [[rollback-strategies]] — rollback mechanics.
- Fragment: [[evolutionary-architecture]] — broader change-management framework.
- Anti-pattern: [[tenancy-as-afterthought]] — frequently co-occurs.
- Gate: `QG-F1` — foundation gate including deployment topology.
- Spec: `docs/v6-final-architecture.md` §6.4.
