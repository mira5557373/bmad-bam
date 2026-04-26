# Step 4: Validate Completeness

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- :pencil: Maintain append-only document building
- :white_check_mark: Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making decisions
- :paperclip: Reference pattern registry `web_queries` for search topics

---

## Purpose

Validate requirements completeness through gap analysis, ambiguity resolution, stakeholder sign-off tracking, and traceability matrix generation.

---

## Prerequisites

- Step 3 completed (Map Requirements to Modules)
- All requirements mapped to modules
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `requirements`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/requirements-checklist.md`

---

## Inputs

- Module-mapped requirements from Step 3
- Source documents
- Stakeholder list
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Gap Analysis

Identify missing or incomplete requirements:

```yaml
gap_analysis:
  coverage_check:
    functional:
      total_identified: {count}
      gaps_found:
        - gap: "User notification preferences"
          severity: MEDIUM
          recommendation: "Add FR for notification settings"
          
        - gap: "Bulk operations"
          severity: LOW
          recommendation: "Consider batch processing requirements"
          
    non_functional:
      total_identified: {count}
      gaps_found:
        - gap: "Disaster recovery RTO/RPO"
          severity: HIGH
          recommendation: "Define recovery time objectives"
          
        - gap: "Data retention policies"
          severity: HIGH
          recommendation: "Specify retention by data type"
          
    multi_tenant:
      total_identified: {count}
      gaps_found:
        - gap: "Tenant data export format"
          severity: MEDIUM
          recommendation: "Define export specifications"
          
    ai_agent:
      total_identified: {count}
      gaps_found:
        - gap: "Agent error handling"
          severity: HIGH
          recommendation: "Define failure modes and recovery"
          
    compliance:
      total_identified: {count}
      gaps_found:
        - gap: "Data breach notification"
          severity: CRITICAL
          recommendation: "Add GDPR Article 33 requirement"
```

### 2. Ambiguity Resolution

Identify and resolve ambiguous requirements:

| Requirement | Ambiguity | Resolution | Status |
|-------------|-----------|------------|--------|
| FR-005 | "Fast response" undefined | Specified as < 200ms p95 | RESOLVED |
| MT-002 | "Isolated" scope unclear | Defined isolation boundaries | RESOLVED |
| AI-003 | "Context aware" undefined | Specified context injection | RESOLVED |
| NFR-003 | "High availability" undefined | Defined as 99.9% uptime | PENDING |

```yaml
ambiguity_log:
  resolved:
    - id: FR-005
      original: "System should respond fast"
      clarified: "API responses must be < 200ms at p95 under normal load"
      resolved_by: "{stakeholder}"
      date: "{date}"
      
    - id: MT-002
      original: "Tenant data must be isolated"
      clarified: "Row-level security with tenant_id enforcement on all tables"
      resolved_by: "{stakeholder}"
      date: "{date}"
      
  pending:
    - id: NFR-003
      ambiguity: "High availability target not quantified"
      proposed_resolution: "99.9% uptime SLA with defined maintenance windows"
      assigned_to: "{stakeholder}"
      due_date: "{date}"
      
    - id: AI-006
      ambiguity: "Output validation criteria undefined"
      proposed_resolution: "JSON schema validation + content safety checks"
      assigned_to: "{stakeholder}"
      due_date: "{date}"
```

### 3. Stakeholder Sign-Off Tracking

Track stakeholder approval status:

```yaml
stakeholder_signoff:
  stakeholders:
    - name: "Product Owner"
      role: "Business requirements authority"
      categories: [functional, business_rules]
      status: PENDING
      requirements_reviewed: [FR-001, FR-002, FR-003]
      sign_off_date: null
      
    - name: "Engineering Lead"
      role: "Technical requirements authority"
      categories: [non_functional, technical]
      status: APPROVED
      requirements_reviewed: [NFR-001, NFR-002, NFR-003]
      sign_off_date: "{date}"
      
    - name: "Security Officer"
      role: "Security and compliance authority"
      categories: [compliance, security]
      status: PENDING
      requirements_reviewed: [COMP-001, COMP-002, COMP-003]
      sign_off_date: null
      
    - name: "AI/ML Lead"
      role: "AI requirements authority"
      categories: [ai_agent]
      status: PENDING
      requirements_reviewed: [AI-001, AI-002, AI-003]
      sign_off_date: null
      
  summary:
    total_stakeholders: 4
    approved: 1
    pending: 3
    rejected: 0
```

### 4. Traceability Matrix

Create bidirectional traceability:

| Source | Requirement | Module | Test Case | Status |
|--------|-------------|--------|-----------|--------|
| PRD-1.1 | FR-001 | tenant-management | TC-FR-001 | DRAFT |
| PRD-1.2 | FR-002 | identity | TC-FR-002 | DRAFT |
| Interview-A | MT-001 | tenant-management | TC-MT-001 | DRAFT |
| SOC2-CC6.1 | COMP-004 | identity | TC-COMP-004 | DRAFT |

```yaml
traceability_matrix:
  forward_trace:  # Source -> Implementation
    PRD-1.1:
      requirements: [FR-001]
      modules: [tenant-management]
      test_cases: [TC-FR-001]
      
    Interview-A:
      requirements: [MT-001, MT-002]
      modules: [tenant-management]
      test_cases: [TC-MT-001, TC-MT-002]
      
    SOC2-CC6.1:
      requirements: [COMP-004]
      modules: [identity]
      test_cases: [TC-COMP-004]
      
  backward_trace:  # Implementation -> Source
    FR-001:
      sources: [PRD-1.1]
      rationale: "Tenant onboarding capability"
      
    MT-001:
      sources: [Interview-A, SOC2-CC6.1]
      rationale: "Data isolation requirement from stakeholder + compliance"
      
  coverage_metrics:
    requirements_with_source: "95%"
    requirements_with_test: "85%"
    orphaned_requirements: 2
```

**Verify current best practices with web search:**
Search the web: "requirements traceability matrix best practices {date}"
Search the web: "stakeholder sign-off process agile {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing completeness validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into gaps and ambiguities using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for validation review
- **C (Continue)**: Accept validation and proceed to compile final document
- **[Specific refinements]**: Describe what areas you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: gap analysis results, pending ambiguities, sign-off status
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review requirements completeness validation: {summary of gaps and sign-offs}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## Verification

- [ ] Gap analysis completed for all categories
- [ ] All critical ambiguities resolved or assigned
- [ ] Stakeholder sign-off status tracked
- [ ] Traceability matrix complete
- [ ] Coverage metrics calculated
- [ ] No critical gaps remaining unaddressed
- [ ] Patterns align with pattern registry

---

## Outputs

- Gap analysis report
- Ambiguity resolution log
- Stakeholder sign-off tracker
- Traceability matrix
- Coverage metrics summary

---

## Next Step

Proceed to `step-05-c-complete.md` to compile final requirements document.
