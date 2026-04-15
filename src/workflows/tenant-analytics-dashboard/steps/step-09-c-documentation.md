# Step 9: Documentation

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOAD **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- NOTES Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- REFERENCE Reference pattern registry `web_queries` for search topics


---

## Purpose

Generate final documentation for the tenant analytics dashboard specification including all design decisions, configurations, and implementation guides.

---

## Prerequisites

- Access control defined (Step 8)
- All previous steps completed
- **Load template:** `{project-root}/_bmad/bam/data/templates/analytics-dashboard-template.md`

---


## Inputs

- Output from all previous steps in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Analytics dashboard template

---

## Actions

Generate final documentation for tenant analytics dashboard:

## Documentation Structure

```
analytics-dashboard-spec.md
├── Executive Summary
├── Analytics Requirements
│   ├── Business Analytics
│   ├── Tenant-Facing Analytics
│   ├── Platform Analytics
│   └── KPI Definitions
├── Data Architecture
│   ├── Pipeline Architecture
│   ├── Aggregation Strategy
│   ├── Data Warehouse Schema
│   └── Tenant Partitioning
├── Data Isolation
│   ├── Isolation Layers
│   ├── Query Layer Security
│   ├── Access Control Matrix
│   └── Audit Requirements
├── Dashboard Design
│   ├── Component Library
│   ├── Widget Specifications
│   ├── Dashboard Templates
│   └── Interaction Patterns
├── Visualization Standards
│   ├── Design System
│   ├── Chart Selection Guide
│   ├── Accessibility Requirements
│   └── Responsive Design
├── Processing Architecture
│   ├── Real-time Pipeline
│   ├── Batch Pipeline
│   ├── Hybrid Query Strategy
│   └── Tier-Based Processing
├── Export Capabilities
│   ├── Format Specifications
│   ├── Scheduled Reports
│   ├── GDPR Compliance
│   └── Rate Limits
├── Access Control
│   ├── Role Definitions
│   ├── Permission Matrix
│   ├── Row-Level Security
│   └── Audit Logging
├── Implementation Checklist
└── Appendix
```

## Document Generation Steps

### 1. Compile All Sections

Gather content from all previous steps:
- Step 1: Analytics requirements and KPIs
- Step 2: Data aggregation strategy
- Step 3: Tenant data isolation
- Step 4: Dashboard components
- Step 5: Visualization design
- Step 6: Real-time vs batch processing
- Step 7: Export capabilities
- Step 8: Access control

### 2. Generate Executive Summary

Summarize key decisions:
- Analytics scope and objectives
- Architecture decisions
- Security and compliance approach
- Implementation timeline estimate

### 3. Create Implementation Checklist

```markdown
## Implementation Checklist

### Phase 1: Data Infrastructure
- [ ] Configure event streaming (Kafka/Kinesis)
- [ ] Set up data warehouse (Snowflake/BigQuery)
- [ ] Implement real-time aggregation
- [ ] Configure batch processing jobs
- [ ] Validate tenant partitioning

### Phase 2: Dashboard Framework
- [ ] Implement component library
- [ ] Create widget system
- [ ] Build dashboard templates
- [ ] Configure tenant scoping

### Phase 3: Security & Access
- [ ] Implement RBAC
- [ ] Configure RLS policies
- [ ] Set up audit logging
- [ ] Test data isolation

### Phase 4: Export & Reporting
- [ ] Build export service
- [ ] Configure scheduled reports
- [ ] Implement GDPR export
- [ ] Set up rate limiting

### Phase 5: Integration & Testing
- [ ] Integration testing
- [ ] Security testing
- [ ] Performance testing
- [ ] User acceptance testing
```

### 4. Generate Technical Appendix

Include:
- Query examples
- API specifications
- Configuration templates
- Troubleshooting guide

## Output File Generation

Write final document to:
`{output_folder}/planning-artifacts/analytics-dashboard-spec.md`

Use template from:
`{project-root}/_bmad/bam/data/templates/analytics-dashboard-template.md`

**Verify current best practices with web search:**
Search the web: "analytics dashboard documentation best practices {date}"
Search the web: "technical specification templates SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After generating documentation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific documentation sections
- **P (Party Mode)**: Bring technical writer and solution architect perspectives on documentation
- **C (Continue)**: Accept documentation and complete the workflow
- **[Specific refinements]**: Describe specific sections to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: documentation structure, implementation checklist
- Process enhanced insights on documentation quality
- Ask user: "Accept this detailed documentation review? (y/n)"
- If yes, integrate into final document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review final documentation for tenant analytics dashboard"
- Process technical writer and solution architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save final analytics dashboard specification to output location
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
- Create mode complete

---

## Verification

- [ ] All sections compiled
- [ ] Executive summary generated
- [ ] Implementation checklist created
- [ ] Technical appendix included
- [ ] Document follows template structure
- [ ] Cross-references validated
- [ ] Output file written to correct location
- [ ] Patterns align with pattern registry

---

## Outputs

- `{output_folder}/planning-artifacts/analytics-dashboard-spec.md`
- Implementation checklist
- Technical appendix
- **Load template:** `{project-root}/_bmad/bam/data/templates/embedded-analytics-template.md`

---

## Next Step

Create workflow complete. Tenant analytics dashboard design ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

Create mode complete for tenant-analytics-dashboard workflow.

Next steps:
- Review generated documentation with stakeholders
- Use Edit mode to refine specific sections
- Use Validate mode to verify against quality criteria
- Proceed to implementation based on checklist
