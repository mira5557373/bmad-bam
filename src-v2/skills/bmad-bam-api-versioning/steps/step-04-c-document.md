# Step 4: Design Version Migration

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER design migration without Step 03 compatibility context
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ CRITICAL: Define tenant migration notification with tier-based timelines
- 📋 Document gradual rollout strategy and version analytics
- 💬 Present migration design with A/P/C menu for user confirmation
- 🌐 Use web search to verify current API migration best practices

---

## EXECUTION PROTOCOLS

- 🎯 Design version migration strategy for multi-tenant API evolution
- 💾 Record migration design in working document for Step 05
- 📖 Reference `patterns/api.md` for migration patterns
- 📖 Reference `patterns/tenant.md` for tenant notification patterns
- 🚫 DO NOT proceed without explicit user confirmation via A/P/C
- ⚠️ Flag migration timelines that may impact critical tenant operations
- 🔍 Use web search to verify migration patterns against current practices

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Backward compatibility design from Step 03
- **Pattern file:** `{project-root}/_bmad/bam/data/patterns/api.md`
- **Pattern file:** `{project-root}/_bmad/bam/data/patterns/tenant.md`
- **Output:** Version migration design with notification and rollout strategies
- **Quality gate:** Migration design informs QG-I1 operational readiness

---

## YOUR TASK

Design version migration strategy including tenant migration notifications, gradual rollout by tier, version analytics and adoption tracking, and emergency rollback procedures for safe multi-tenant API evolution.

---

## Main Sequence

### 1. Design Tenant Migration Notifications

Define notification strategy for API version changes:

| Event | Notification | Channel | Timing |
|-------|--------------|---------|--------|
| New Version Available | Announcement | Email, Dashboard | Day 0 |
| Deprecation Announced | Warning | Email, Dashboard, API | T+0 |
| Sunset Warning | Urgent | Email, API headers | T+6mo |
| Final Sunset Notice | Critical | Direct contact | T+12mo |
| Emergency Deprecation | Immediate | All channels | ASAP |

**Tenant Migration Notification Template:**

```markdown
### Notification Strategy

**Standard Version Release:**

| Phase | Timing | Channels | Content |
|-------|--------|----------|---------|
| Announcement | Release day | Blog, Email, Dashboard | New features, migration guide link |
| Reminder | +30 days | Dashboard | Adoption metrics, benefits |
| Adoption Report | +90 days | Email (opted-in) | Tenant's adoption status |

**Deprecation Notification:**

| Phase | Timing | Channels | Content |
|-------|--------|----------|---------|
| Deprecation Notice | T+0 | Email, Dashboard, Docs | Sunset date, migration guide |
| Progress Check | T+3mo | Email | Migration status, support offered |
| Urgent Warning | T+6mo | Email, Dashboard, API header | 6 months remaining |
| Critical Notice | T+9mo | Direct contact | 3 months remaining |
| Final Notice | T+11mo | All channels + support call | 30 days remaining |
| Sunset | T+12mo | API 410 response | Version removed |

**Tier-Based Notification Customization:**

| Tier | Notification Lead Time | Support Level | Extension Allowed |
|------|------------------------|---------------|-------------------|
| Free | Standard (12 mo) | Self-service docs | No |
| Pro | Standard (12 mo) | Email support | 3 months |
| Enterprise | Extended (24 mo) | Dedicated support | 6+ months |

**Notification Templates:**

```email
Subject: [Action Required] API v1 Sunset Notice - {{tenant_name}}

Hi {{contact_name}},

API v1 will be sunset on {{sunset_date}}.

Your current usage:
- Active v1 endpoints: {{endpoint_count}}
- Monthly v1 requests: {{request_count}}
- Last v1 request: {{last_request_date}}

Next steps:
1. Review migration guide: {{migration_url}}
2. Update your integration to API v2
3. Test in sandbox environment
4. Switch production traffic

Support available:
- Documentation: {{docs_url}}
- Migration guide: {{migration_url}}
- Support ticket: {{support_url}}

Enterprise customers: Contact your account manager for extended support.
```
```

Search the web: "API migration notification best practices {date}"

---

### 2. Design Gradual Rollout by Tier

Define tier-based rollout strategy for new versions:

| Phase | Tenants | Duration | Criteria to Proceed |
|-------|---------|----------|---------------------|
| Internal | Staff accounts | 1 week | No P0/P1 bugs |
| Alpha | Opted-in developers | 2 weeks | <0.1% error rate |
| Beta | Pro tier opt-in | 2 weeks | <0.05% error rate |
| GA - Enterprise | Enterprise tier | 2 weeks | Stability verified |
| GA - All | All tenants | Ongoing | Default version |

**Gradual Rollout Template:**

```markdown
### Tier-Based Rollout Strategy

**Rollout Phases:**

```
Week 0-1:   Internal ───────────────────► Staff only (0.1% traffic)
Week 1-3:   Alpha ──────────────────────► Opted-in devs (1% traffic)
Week 3-5:   Beta ───────────────────────► Pro tier opt-in (5% traffic)
Week 5-7:   GA Enterprise ──────────────► Enterprise (20% traffic)
Week 7+:    GA All ─────────────────────► All tenants (100% traffic)
```

**Phase Criteria:**

| Phase | Entry Criteria | Exit Criteria | Rollback Trigger |
|-------|----------------|---------------|------------------|
| Internal | Tests pass | 7 days stable | Any P0 bug |
| Alpha | Internal complete | 14 days, <0.1% errors | P0/P1 bug, >0.5% errors |
| Beta | Alpha complete | 14 days, <0.05% errors | P0 bug, >0.2% errors |
| GA Enterprise | Beta complete | 14 days, enterprise stable | P0 bug, enterprise issue |
| GA All | Enterprise complete | Default version | P0 bug, widespread issue |

**Tenant Tier Access During Rollout:**

| Tier | Preview | Alpha | Beta | GA | Notes |
|------|---------|-------|------|----|----|
| Free | ✗ | ✗ | ✗ | ✓ | Wait for GA |
| Pro | ✗ | ✗ | Opt-in | ✓ | Beta access available |
| Enterprise | Opt-in | Opt-in | ✓ | ✓ | Early access included |

**Feature Flags for Rollout:**

```yaml
api_version_rollout:
  v3:
    status: beta
    internal_enabled: true
    alpha_percentage: 100  # All opted-in alpha users
    beta_percentage: 25    # 25% of beta tier
    enterprise_percentage: 0
    ga_percentage: 0
    opted_in_tenants:
      - tenant_alpha_1
      - tenant_alpha_2
    excluded_tenants:
      - tenant_critical_1  # Manual exclusion
```
```

Search the web: "API gradual rollout feature flags {date}"

---

### 3. Design Version Analytics and Adoption Tracking

Define metrics for tracking version adoption:

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Adoption Rate | % tenants on latest version | <80% after 6mo |
| Deprecation Usage | Requests to deprecated version | >10% after 6mo |
| Version Distribution | Breakdown by version | Sunset version >1% |
| Migration Progress | Tenants actively migrating | No progress 30 days |
| Error Rate by Version | Errors per version | >0.5% any version |

**Version Analytics Template:**

```markdown
### Version Analytics Dashboard

**Key Metrics:**

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| v2 Adoption (active tenants) | 72% | 90% | ⚠️ Below target |
| v1 Usage (deprecated) | 28% | <10% | ⚠️ Above target |
| v2 Error Rate | 0.02% | <0.1% | ✅ Healthy |
| v1 Error Rate | 0.05% | <0.1% | ✅ Healthy |

**Adoption by Tier:**

| Tier | v1 | v2 | v3 (preview) | Total Tenants |
|------|----|----|--------------|---------------|
| Free | 35% | 65% | 0% | 10,000 |
| Pro | 20% | 80% | 0% | 1,500 |
| Enterprise | 15% | 82% | 3% | 200 |

**Deprecation Tracking:**

| Version | Status | Sunset Date | Tenants Remaining | Requests/Day |
|---------|--------|-------------|-------------------|--------------|
| v1 | Deprecated | 2027-04-26 | 3,200 | 145,000 |
| v0 | Sunset | 2026-01-01 | 0 | 0 |

**Tenant Migration Funnel:**

```
Total v1 Tenants: 3,200
        │
        ├── Notified: 3,200 (100%)
        │       │
        │       ├── Acknowledged: 2,100 (66%)
        │       │       │
        │       │       ├── Started Migration: 1,400 (67%)
        │       │       │       │
        │       │       │       ├── Completed: 800 (57%)
        │       │       │       │
        │       │       │       └── In Progress: 600 (43%)
        │       │       │
        │       │       └── Not Started: 700 (33%)
        │       │
        │       └── No Response: 1,100 (34%)
        │
        └── Migration Complete: 800 (25% of total)
```

**Analytics Events to Track:**

| Event | Payload | Purpose |
|-------|---------|---------|
| version_request | tenant_id, version, endpoint | Usage tracking |
| deprecation_warning_sent | tenant_id, version, sunset_date | Notification tracking |
| migration_started | tenant_id, from_version, to_version | Progress tracking |
| migration_completed | tenant_id, from_version, to_version | Completion tracking |
| version_error | tenant_id, version, error_type | Health monitoring |
```

Search the web: "API version analytics adoption metrics {date}"

---

### 4. Design Emergency Rollback Procedures

Define rollback procedures for version issues:

| Severity | Trigger | Action | Timeline |
|----------|---------|--------|----------|
| P0 - Critical | Security issue, data loss | Immediate rollback | <1 hour |
| P1 - High | Major functionality broken | Rapid rollback | <4 hours |
| P2 - Medium | Significant issues | Planned rollback | <24 hours |
| P3 - Low | Minor issues | Fix forward | Next release |

**Emergency Rollback Template:**

```markdown
### Emergency Rollback Procedures

**Rollback Decision Matrix:**

| Issue Type | Impact | Auto-Rollback | Manual Approval |
|------------|--------|---------------|-----------------|
| Security vulnerability | All tenants | No | CISO + CTO |
| Data integrity | Any tenant | No | CTO + Engineering |
| Error rate >1% | Affected % | If >5% | If 1-5% |
| Availability <99% | All tenants | If <95% | If 95-99% |
| Tenant escalation | Enterprise | No | Account + Engineering |

**Rollback Runbook:**

**Step 1: Assess (Target: <5 minutes)**
```
□ Confirm issue scope (tenants affected, endpoints)
□ Verify issue is version-specific (not infrastructure)
□ Document current state and metrics
□ Notify on-call leadership
```

**Step 2: Decide (Target: <10 minutes)**
```
□ Determine severity (P0/P1/P2/P3)
□ Choose action: rollback vs fix-forward
□ Get required approvals per severity
□ Communicate decision to stakeholders
```

**Step 3: Execute (Target: <30 minutes for P0)**
```
□ Update version routing to previous stable
□ Disable new version in feature flags
□ Verify traffic routing correctly
□ Monitor error rates and latency
```

**Step 4: Verify (Target: <1 hour)**
```
□ Confirm error rates normalized
□ Verify affected tenants recovered
□ Check data integrity
□ Document incident
```

**Step 5: Communicate (Target: <2 hours)**
```
□ Send status update to affected tenants
□ Post status page update
□ Schedule post-mortem
□ Create tracking ticket for fix
```

**Rollback Commands:**

```bash
# Immediate version rollback (feature flag)
feature-flags set api_version_v3_enabled=false

# Route traffic to previous version
kubectl set env deployment/api-gateway DEFAULT_API_VERSION=v2

# Verify rollback
curl -H "X-API-Version: v3" https://api.example.com/health
# Expected: 400 Version Not Available

# Monitor post-rollback
kubectl logs -f deployment/api-gateway | grep "version_routing"
```

**Post-Rollback Checklist:**

| Check | Owner | Deadline |
|-------|-------|----------|
| Root cause analysis | Engineering Lead | 24 hours |
| Tenant communication | Customer Success | 4 hours |
| Fix development | Assigned Engineer | Based on severity |
| Re-release plan | Engineering Lead | 48 hours |
| Post-mortem meeting | All stakeholders | 72 hours |
```

Search the web: "API rollback procedures emergency {date}"

---

### 5. Design Migration Support Resources

Define resources to support tenant migration:

| Resource | Purpose | Format |
|----------|---------|--------|
| Migration Guide | Step-by-step instructions | Documentation |
| SDK Update Guide | SDK-specific changes | Per-SDK docs |
| Change Log | Detailed changes list | Markdown |
| Migration Tool | Automated migration helper | CLI/Script |
| Sandbox Environment | Test new version | API endpoint |

**Migration Support Template:**

```markdown
### Migration Support Resources

**Documentation:**

| Document | Location | Audience |
|----------|----------|----------|
| Migration Guide | /docs/migration/v1-to-v2 | All developers |
| Breaking Changes | /docs/changelog/v2#breaking | Technical leads |
| SDK Migration | /docs/sdk/{sdk}/v2-migration | SDK users |
| FAQ | /docs/migration/v1-to-v2/faq | All |

**Tooling:**

| Tool | Purpose | Availability |
|------|---------|--------------|
| Version Comparison | Diff API specs | Web tool |
| Request Translator | Convert v1 → v2 requests | CLI tool |
| Response Validator | Verify v2 compatibility | Test library |
| Migration Scanner | Find v1 usage in codebase | CLI tool |

**Support Channels:**

| Tier | Channel | Response Time |
|------|---------|---------------|
| Free | Documentation, Community forum | Community-driven |
| Pro | Email support, Chat | 24 hours |
| Enterprise | Dedicated support, Migration assistance | 4 hours |

**Sandbox Environment:**

```
Production: api.example.com/v1, api.example.com/v2
Sandbox: sandbox-api.example.com/v1, sandbox-api.example.com/v2

Sandbox features:
- Reset data on demand
- Test migration without affecting production
- Access to all versions including preview
- Extended rate limits for migration testing
```
```

---

## COLLABORATION MENUS (A/P/C)

After presenting complete migration design:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific migration questions
- **P (Party Mode)**: Bring platform, customer success, and support perspectives
- **C (Continue)**: Accept migration design and proceed to compile step

Select an option:
```

### If 'A' (Advanced Elicitation)

Invoke `bmad-advanced-elicitation` skill to explore:

- **Notification timing:** Are notification timelines appropriate for all tiers?
- **Rollout speed:** Is gradual rollout too fast or too slow?
- **Analytics gaps:** What metrics are missing?
- **Rollback triggers:** Are thresholds appropriate?
- **Support resources:** What additional resources are needed?

Pass context: Compatibility design from Step 03, current migration analysis.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode)

Invoke `bmad-party-mode` skill with context:

```
Review API version migration design for:
Notification Strategy: {notification_plan}
Rollout Phases: {rollout_phases}
Analytics: {metrics}
Rollback: {rollback_procedures}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Platform Engineer | Rollout infrastructure | Can we implement gradual rollout? |
| Customer Success | Tenant impact | Will notification timeline work? |
| Support Engineer | Migration support | Are support resources sufficient? |
| SRE | Rollback procedures | Can we rollback safely? |

Process multi-perspective analysis and synthesize into refined design.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue)

1. Record the migration design in working document:

```yaml
# Add to api-versioning-design.md
tenant_notifications:
  new_version: [email, dashboard]
  deprecation: [email, dashboard, api_header]
  sunset_warning: [email, api_header, direct_contact]
  timeline_days:
    standard: 365
    enterprise: 730
gradual_rollout:
  phases: [internal, alpha, beta, ga_enterprise, ga_all]
  phase_duration_weeks: [1, 2, 2, 2, ongoing]
  rollback_triggers: defined
version_analytics:
  adoption_rate: tracked
  deprecation_usage: tracked
  version_distribution: tracked
  migration_progress: tracked
  error_rate_by_version: tracked
emergency_rollback:
  p0_timeline_hours: 1
  p1_timeline_hours: 4
  p2_timeline_hours: 24
  runbook: documented
migration_support:
  documentation: complete
  tooling: cli_tools
  sandbox: available
  tier_support: defined
design_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design
  - step-04-c-document  # Add this
currentStep: step-05-c-complete
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Tenant migration notification strategy defined
- ✅ Gradual rollout by tier designed with criteria
- ✅ Version analytics and adoption tracking specified
- ✅ Emergency rollback procedures documented
- ✅ Migration support resources planned
- ✅ Web search performed for migration patterns
- ✅ Step 03 compatibility context referenced
- ✅ User confirmed design via A/P/C menu
- ✅ Design recorded in working document

---

## FAILURE MODES

- ❌ Skipping tenant notifications - tenants surprised by changes
- ❌ Designing without Step 03 context - no compatibility foundation
- ❌ No gradual rollout - risky big-bang releases
- ❌ Missing rollback procedures - cannot recover from issues
- ❌ Proceeding without A/P/C confirmation - user not engaged
- ❌ Skipping web search - may miss current best practices

---

## NEXT STEP

After user confirms migration design with 'C':

1. Record the design in working document
2. Proceed to `step-05-c-complete.md` to compile API versioning design
3. The design produces:
   - Complete API versioning design document
   - Saved to `{output_folder}/planning-artifacts/api-versioning-design.md`
   - Ready for QG-I1 validation

**Transition to Step 05 with:**
- Notification strategy: `{notification_plan}`
- Rollout strategy: `{rollout_plan}`
- Analytics requirements: `{analytics_spec}`
- Rollback procedures: `{rollback_runbook}`
- Support resources: `{support_plan}`

---

## Outputs

- Documentation draft created
- Design specifications completed
- Decision records updated

