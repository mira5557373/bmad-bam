---
name: tenant-persona-template
description: Template for WDS Saga tenant persona definitions in multi-tenant SaaS
category: workflow-design
version: 1.0.0
type: "tenant"
---

## Purpose

Template for WDS Saga tenant persona definitions in multi-tenant SaaS

# Tenant Persona Definition: {{persona_name}}

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## Persona Overview

### 1.1 Persona Identity

| Field | Value |
|-------|-------|
| Persona Name | {{persona_name}} |
| Persona Type | {{persona_type}} |
| Target Tier | {{target_tier}} |
| Industry Vertical | {{industry_vertical}} |
| Company Size | {{company_size}} |

### 1.2 Persona Summary

{{persona_summary}}

---

## Tenant Profile

### 2.1 Organization Characteristics

| Characteristic | Value | Impact on Platform |
|----------------|-------|-------------------|
| Employee Count | {{employee_count}} | {{employee_impact}} |
| User Count | {{user_count}} | {{user_impact}} |
| Data Volume | {{data_volume}} | {{data_impact}} |
| API Usage | {{api_usage}} | {{api_impact}} |
| Compliance Requirements | {{compliance_reqs}} | {{compliance_impact}} |

### 2.2 Technical Profile

| Aspect | Current State | Desired State |
|--------|---------------|---------------|
| Infrastructure | {{current_infra}} | {{desired_infra}} |
| Integration Maturity | {{current_integration}} | {{desired_integration}} |
| AI/ML Adoption | {{current_ai}} | {{desired_ai}} |
| DevOps Practices | {{current_devops}} | {{desired_devops}} |

### 2.3 Business Context

| Factor | Description |
|--------|-------------|
| Primary Business Goal | {{primary_goal}} |
| Key Pain Points | {{pain_points}} |
| Success Metrics | {{success_metrics}} |
| Budget Constraints | {{budget_constraints}} |
| Timeline Expectations | {{timeline}} |

---

## User Roles Within Tenant

### 3.1 Role Definitions

| Role | Description | Count per Tenant | Primary Actions |
|------|-------------|------------------|-----------------|
| {{role_1_name}} | {{role_1_desc}} | {{role_1_count}} | {{role_1_actions}} |
| {{role_2_name}} | {{role_2_desc}} | {{role_2_count}} | {{role_2_actions}} |
| {{role_3_name}} | {{role_3_desc}} | {{role_3_count}} | {{role_3_actions}} |
| {{role_4_name}} | {{role_4_desc}} | {{role_4_count}} | {{role_4_actions}} |

### 3.2 Role Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    Tenant Role Hierarchy                         │
│                                                                  │
│                      ┌───────────────┐                          │
│                      │  Tenant Admin │                          │
│                      └───────┬───────┘                          │
│                              │                                   │
│            ┌─────────────────┼─────────────────┐                │
│            ▼                 ▼                 ▼                │
│     ┌───────────┐     ┌───────────┐     ┌───────────┐          │
│     │ Dept Admin│     │ Dept Admin│     │ Dept Admin│          │
│     └─────┬─────┘     └─────┬─────┘     └─────┬─────┘          │
│           │                 │                 │                 │
│     ┌─────┴─────┐     ┌─────┴─────┐     ┌─────┴─────┐          │
│     ▼           ▼     ▼           ▼     ▼           ▼          │
│  ┌──────┐  ┌──────┐ ┌──────┐  ┌──────┐ ┌──────┐  ┌──────┐     │
│  │ User │  │ User │ │ User │  │ User │ │ User │  │ User │     │
│  └──────┘  └──────┘ └──────┘  └──────┘ └──────┘  └──────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Permission Matrix by Role

| Permission | Tenant Admin | Dept Admin | Power User | Standard User |
|------------|--------------|------------|------------|---------------|
| Manage users | Full | Department | No | No |
| Configure settings | Full | Limited | No | No |
| Access reports | Full | Department | Team | Self |
| Use AI agents | Full | Full | Full | {{standard_ai_access}} |
| API access | Full | Full | Limited | {{standard_api_access}} |
| Billing access | Full | No | No | No |

---

## Journey Stages

### 4.1 Tenant Lifecycle Stages

| Stage | Duration | Key Activities | Success Criteria |
|-------|----------|----------------|------------------|
| Discovery | {{discovery_duration}} | {{discovery_activities}} | {{discovery_criteria}} |
| Evaluation | {{evaluation_duration}} | {{evaluation_activities}} | {{evaluation_criteria}} |
| Onboarding | {{onboarding_duration}} | {{onboarding_activities}} | {{onboarding_criteria}} |
| Adoption | {{adoption_duration}} | {{adoption_activities}} | {{adoption_criteria}} |
| Expansion | {{expansion_duration}} | {{expansion_activities}} | {{expansion_criteria}} |
| Renewal | {{renewal_duration}} | {{renewal_activities}} | {{renewal_criteria}} |

### 4.2 Journey Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Tenant Journey Map                                   │
│                                                                              │
│  Discovery    Evaluation    Onboarding    Adoption    Expansion    Renewal  │
│      │            │             │            │            │           │      │
│      ▼            ▼             ▼            ▼            ▼           ▼      │
│  ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐   ┌───────┐ │
│  │ Demo  │───►│ Trial │───►│ Setup │───►│ Train │───►│ Scale │──►│ Renew │ │
│  │Request│    │ Start │    │Account│    │ Users │    │ Usage │   │ Plan  │ │
│  └───────┘    └───────┘    └───────┘    └───────┘    └───────┘   └───────┘ │
│      │            │             │            │            │           │      │
│      ▼            ▼             ▼            ▼            ▼           ▼      │
│  Touchpoint  Touchpoint    Touchpoint   Touchpoint   Touchpoint  Touchpoint │
│  - Website   - Sales       - Onboard    - Training   - Success   - Account  │
│  - Content   - Support     - Welcome    - Support    - Review    - Manager  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Critical Moments

| Moment | Stage | Description | Intervention |
|--------|-------|-------------|--------------|
| First Value | Onboarding | User completes first meaningful action | Celebration + next step guidance |
| First Integration | Adoption | Connect first external system | Integration support |
| First AI Success | Adoption | AI agent delivers value | Case study opportunity |
| Usage Plateau | Expansion | Growth stalls | Feature discovery campaign |
| Renewal Decision | Renewal | Annual review | ROI presentation |

---

## Feature Requirements

### 5.1 Must-Have Features

| Feature | Priority | Tier Availability | Persona Impact |
|---------|----------|-------------------|----------------|
| {{feature_1}} | Critical | {{feature_1_tier}} | {{feature_1_impact}} |
| {{feature_2}} | Critical | {{feature_2_tier}} | {{feature_2_impact}} |
| {{feature_3}} | High | {{feature_3_tier}} | {{feature_3_impact}} |

### 5.2 Nice-to-Have Features

| Feature | Priority | Tier Availability | Persona Impact |
|---------|----------|-------------------|----------------|
| {{nice_feature_1}} | Medium | {{nice_feature_1_tier}} | {{nice_feature_1_impact}} |
| {{nice_feature_2}} | Low | {{nice_feature_2_tier}} | {{nice_feature_2_impact}} |

### 5.3 Feature Usage Patterns

| Feature | Frequency | Peak Usage | Typical Duration |
|---------|-----------|------------|------------------|
| {{feature_1}} | {{feature_1_frequency}} | {{feature_1_peak}} | {{feature_1_duration}} |
| {{feature_2}} | {{feature_2_frequency}} | {{feature_2_peak}} | {{feature_2_duration}} |

---

## Integration Requirements

### 6.1 Required Integrations

| Integration | Type | Priority | Data Flow |
|-------------|------|----------|-----------|
| {{integration_1}} | {{integration_1_type}} | Critical | {{integration_1_flow}} |
| {{integration_2}} | {{integration_2_type}} | High | {{integration_2_flow}} |
| {{integration_3}} | {{integration_3_type}} | Medium | {{integration_3_flow}} |

### 6.2 Integration Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                 Persona Integration Landscape                    │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Source    │    │   Platform  │    │   Target    │         │
│  │   Systems   │───►│   (BAM)     │───►│   Systems   │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│        │                   │                   │                │
│        │                   │                   │                │
│  ┌─────┴─────┐       ┌─────┴─────┐       ┌─────┴─────┐         │
│  │ {{int_1}} │       │  Tenant   │       │ {{int_3}} │         │
│  │ {{int_2}} │       │  Context  │       │ {{int_4}} │         │
│  └───────────┘       └───────────┘       └───────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

---

## AI Agent Interaction

### 7.1 Agent Usage Patterns

| Agent Type | Use Case | Frequency | Complexity |
|------------|----------|-----------|------------|
| {{agent_1}} | {{agent_1_use}} | {{agent_1_freq}} | {{agent_1_complexity}} |
| {{agent_2}} | {{agent_2_use}} | {{agent_2_freq}} | {{agent_2_complexity}} |
| {{agent_3}} | {{agent_3_use}} | {{agent_3_freq}} | {{agent_3_complexity}} |

### 7.2 Agent Conversation Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| Task Delegation | User assigns task to agent | "Analyze these documents" |
| Information Query | User requests information | "What are our sales trends?" |
| Workflow Automation | User triggers automated flow | "Process these invoices" |
| Decision Support | User requests recommendations | "Suggest next actions" |

### 7.3 Agent Memory Requirements

| Memory Tier | Content | Retention | Persona Importance |
|-------------|---------|-----------|-------------------|
| Session | Current conversation | Request | High |
| User | User preferences, history | {{user_memory_retention}} | {{user_memory_importance}} |
| Tenant | Org knowledge, patterns | {{tenant_memory_retention}} | {{tenant_memory_importance}} |

---

## Support Requirements

### 8.1 Support Channel Preferences

| Channel | Preference | Response Expectation | Use Case |
|---------|------------|---------------------|----------|
| Self-service | {{self_service_pref}} | Immediate | Common questions |
| Chat | {{chat_pref}} | < {{chat_response}} | Quick questions |
| Email | {{email_pref}} | < {{email_response}} | Complex issues |
| Phone | {{phone_pref}} | Immediate | Critical issues |
| Dedicated CSM | {{csm_pref}} | Scheduled | Strategic reviews |

### 8.2 Common Support Scenarios

| Scenario | Frequency | Complexity | Resolution Path |
|----------|-----------|------------|-----------------|
| {{support_scenario_1}} | {{support_1_freq}} | {{support_1_complexity}} | {{support_1_path}} |
| {{support_scenario_2}} | {{support_2_freq}} | {{support_2_complexity}} | {{support_2_path}} |
| {{support_scenario_3}} | {{support_3_freq}} | {{support_3_complexity}} | {{support_3_path}} |

---

## Success Metrics

### 9.1 Persona-Specific KPIs

| Metric | Target | Measurement | Frequency |
|--------|--------|-------------|-----------|
| Time to first value | {{ttfv_target}} | Onboarding tracking | Per tenant |
| Feature adoption rate | {{adoption_target}} | Usage analytics | Monthly |
| User activation rate | {{activation_target}} | Login + action | Weekly |
| Support ticket volume | {{support_target}} | Support system | Monthly |
| NPS score | {{nps_target}} | Survey | Quarterly |
| Expansion revenue | {{expansion_target}} | Billing system | Quarterly |

### 9.2 Health Score Components

| Component | Weight | Calculation |
|-----------|--------|-------------|
| Product usage | {{usage_weight}}% | Active users / Total users |
| Feature depth | {{feature_weight}}% | Features used / Available features |
| Support health | {{support_weight}}% | Inverse of ticket volume |
| Engagement | {{engagement_weight}}% | Session frequency + duration |
| Relationship | {{relationship_weight}}% | Meeting attendance, survey responses |

---

## Risk Factors

### 10.1 Churn Risk Indicators

| Indicator | Risk Level | Detection Method | Intervention |
|-----------|------------|------------------|--------------|
| Login decline | {{login_risk}} | Usage analytics | Engagement campaign |
| Feature abandonment | {{feature_risk}} | Usage analytics | Training offer |
| Support escalations | {{escalation_risk}} | Support tracking | Executive outreach |
| Integration failures | {{integration_risk}} | System logs | Technical support |
| Missed renewals | {{renewal_risk}} | Billing system | Urgent outreach |

### 10.2 Mitigation Strategies

| Risk | Strategy | Owner | Trigger |
|------|----------|-------|---------|
| Low engagement | Proactive training | Customer Success | < {{engagement_threshold}} sessions/week |
| Support issues | Escalation path | Support Lead | > {{support_threshold}} tickets/month |
| Integration problems | Technical review | Solutions Engineer | > {{integration_threshold}} failures/day |

---

## Persona Scenarios

### 11.1 Day in the Life

**{{role_1_name}} - Typical Day:**

{{day_in_life_description}}

### 11.2 Key Scenarios

| Scenario | Actor | Goal | Steps | Success Outcome |
|----------|-------|------|-------|-----------------|
| {{scenario_1}} | {{scenario_1_actor}} | {{scenario_1_goal}} | {{scenario_1_steps}} | {{scenario_1_success}} |
| {{scenario_2}} | {{scenario_2_actor}} | {{scenario_2_goal}} | {{scenario_2_steps}} | {{scenario_2_success}} |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "tenant lifecycle SaaS patterns {date}"
- "B2B SaaS persona research multi-tenant {date}"
- "tenant segmentation enterprise SaaS {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Verification Checklist

### 12.1 Persona Validation

- [ ] Persona based on real customer interviews
- [ ] Tier alignment verified with pricing model
- [ ] Role definitions match actual user patterns
- [ ] Journey stages validated with onboarding data
- [ ] Feature requirements prioritized correctly
- [ ] Integration requirements technically feasible
- [ ] Support requirements align with SLA

### 12.2 Multi-Tenant Considerations

- [ ] Persona maps to specific tenant tier
- [ ] Resource requirements within tier limits
- [ ] Isolation requirements documented
- [ ] Compliance requirements identified
- [ ] Data residency requirements noted

---

## Appendix A: Related Documents

- Pattern: `tenant-persona-design` in `bam-patterns.csv`
- Template: `trigger-map-template.md`
- Workflow: `bmad-bam-tenant-onboarding-design`

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
