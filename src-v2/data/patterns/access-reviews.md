---
pattern_id: access-reviews
shortcode: ZAW
category: compliance
qg_ref: QG-ENT1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Access Reviews - BAM Pattern

**Loaded by:** ZAW  
**Applies to:** Periodic access certification and review  
**See also:** [tenant-rbac.md](tenant-rbac.md), [soc2-compliance.md](soc2-compliance.md)

---

## When to Use

- SOC 2 access review requirements
- Quarterly user access certification
- Privileged access management
- Dormant account detection
- Role membership validation

## When NOT to Use

- Real-time access decisions (use RBAC)
- Single-user applications
- Fully automated service accounts
- Short-lived development environments

## Architecture

### Access Review Platform

```
┌─────────────────────────────────────────────────────────────┐
│                  Access Review Engine                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │               Campaign Generator                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Campaign     │ Scope      │ Reviewers │ Due     │  │  │
│  │  │ Q1-2026-PAM  │ Privileged │ Managers  │ Apr 15  │  │  │
│  │  │ Q1-2026-ALL  │ All users  │ Managers  │ Apr 30  │  │  │
│  │  │ Tenant-A-UAR │ Tenant A   │ Admin     │ Mar 31  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Review Items                             │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ User     │ Role     │ Last Access │ Decision   │  │  │
│  │  │ user_a   │ admin    │ 2 days ago  │ Certify    │  │  │
│  │  │ user_b   │ editor   │ 90 days ago │ Review     │  │  │
│  │  │ user_c   │ viewer   │ Never       │ Revoke     │  │  │
│  │  │ svc_acct │ api      │ Daily       │ Certify    │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │               Decision Engine                          │  │
│  │  • Auto-revoke dormant (configurable)                  │  │
│  │  • Escalate privileged decisions                       │  │
│  │  • Apply decisions immediately or batched              │  │
│  │  • Generate compliance evidence                        │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Review Flow

```
Campaign Start
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Generate  │────▶│   Assign    │────▶│   Notify    │
│   Items     │     │   Reviewers │     │   Reviewers │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                    ┌─────────────────────────┘
                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Review    │────▶│   Apply     │────▶│   Report    │
│   Decisions │     │   Changes   │     │   Results   │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Decision Types

| Decision | Action | Audit | Reversible |
|----------|--------|-------|------------|
| Certify | Keep access | Log | N/A |
| Modify | Change role | Log + approval | Yes |
| Revoke | Remove access | Log + notify | Yes |
| Delegate | Forward review | Log | N/A |
| Escalate | Manager review | Log | N/A |

## Configuration Schema

```yaml
access_reviews:
  bam_controlled: true
  
  campaigns:
    - name: string
      schedule: cron
      scope:
        type: enum[all, privileged, tenant, role]
        filter: object
        
      reviewers:
        assignment: enum[manager, role_owner, explicit]
        escalation_after_days: int
        
      settings:
        due_days: int
        reminder_days: int[]
        auto_revoke_dormant: bool
        dormant_threshold_days: int
        
  review_item:
    user_id: uuid
    tenant_id: uuid
    role: string
    last_access: timestamp
    risk_score: float
    reviewer: uuid
    decision: enum[certify, modify, revoke, delegate, escalate]
    decided_at: timestamp
    justification: string
    
  automation:
    auto_certify_active: bool
    active_threshold_days: int
    auto_revoke_never_accessed: bool
    
  notifications:
    campaign_start: bool
    reminder: bool
    decision_required: bool
    access_revoked: bool
    
  compliance:
    evidence_retention_days: int
    require_justification: bool
    privileged_requires_approval: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Manager review | Context-aware | Manager burden | Org hierarchy |
| Role owner | Expert review | May not know users | Role-centric |
| Automated | Fast, consistent | May miss context | Large orgs |
| Hybrid | Balanced | Complex rules | Most cases |

## Quality Checks

- [ ] Campaigns scheduled correctly
- [ ] All users in scope included
- [ ] Reviewers assigned
- [ ] Escalation working
- [ ] Decisions applied
- [ ] Evidence generated
- [ ] **CRITICAL:** Privileged access reviewed

## Web Research Queries

- "user access review SOC 2 patterns {date}"
- "access certification automation {date}"
- "privileged access review best practices {date}"
- "dormant account detection SaaS {date}"
- "IGA access review campaigns {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-ENT1 | Access review compliance verified |
| QG-CC | Campaign completion tracked |

## Related Patterns

- [tenant-rbac.md](tenant-rbac.md) - Access control
- [soc2-compliance.md](soc2-compliance.md) - SOC 2 requirements
- [compliance-reporting.md](compliance-reporting.md) - Evidence generation
