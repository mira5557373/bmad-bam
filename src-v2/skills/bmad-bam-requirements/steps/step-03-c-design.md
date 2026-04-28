# Step 3: Map Requirements to Modules

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Map categorized requirements to target modules, identify cross-module requirements, perform dependency analysis, and establish priority scoring.

---

## Prerequisites

- Step 2 completed (Categorize Requirements)
- All requirements categorized
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `module-boundary`
- **Load patterns:** `{project-root}/_bmad/bam/data/section-pattern-map.csv`

---

## Inputs

- Categorized requirements from Step 2
- Module structure definition
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Module Structure

Identify the target module architecture:

```yaml
module_structure:
  core_modules:
    - name: tenant-management
      purpose: "Tenant lifecycle and configuration"
      boundaries: ["tenant", "config", "settings"]
      
    - name: identity
      purpose: "Authentication and authorization"
      boundaries: ["auth", "users", "roles", "permissions"]
      
    - name: billing
      purpose: "Subscription and payment processing"
      boundaries: ["subscription", "payment", "invoice", "metering"]
      
    - name: ai-runtime
      purpose: "Agent orchestration and execution"
      boundaries: ["agent", "tool", "memory", "execution"]
      
  feature_modules:
    - name: "{feature-1}"
      purpose: "{description}"
      boundaries: ["{domain-terms}"]
      
    - name: "{feature-2}"
      purpose: "{description}"
      boundaries: ["{domain-terms}"]
```

### 2. Requirements to Module Assignment

Map each requirement to its owning module:

| Requirement ID | Category | Module | Justification |
|----------------|----------|--------|---------------|
| FR-001 | Functional | tenant-management | Tenant lifecycle |
| FR-002 | Functional | identity | User authentication |
| NFR-001 | Performance | platform | Cross-cutting concern |
| MT-001 | Multi-tenant | tenant-management | Core isolation |
| AI-001 | AI/Agent | ai-runtime | Agent orchestration |
| COMP-001 | Compliance | tenant-management | Tenant data handling |

```yaml
module_assignment:
  tenant-management:
    requirements:
      - FR-001
      - MT-001
      - MT-002
      - MT-005
      - MT-006
      - COMP-001
      - COMP-002
    complexity: HIGH
    
  identity:
    requirements:
      - FR-002
      - COMP-004
    complexity: MEDIUM
    
  billing:
    requirements:
      - FR-003
      - MT-003
      - MT-004
    complexity: MEDIUM
    
  ai-runtime:
    requirements:
      - AI-001
      - AI-002
      - AI-003
      - AI-004
      - AI-005
      - AI-006
    complexity: HIGH
```

### 3. Cross-Module Requirements Identification

Identify requirements that span multiple modules:

```yaml
cross_module_requirements:
  - id: CMR-001
    requirement: "Tenant context propagation"
    modules: [tenant-management, identity, ai-runtime, billing]
    pattern: "context-injection"
    critical: true
    
  - id: CMR-002
    requirement: "Audit logging"
    modules: [all]
    pattern: "audit-trail"
    critical: true
    
  - id: CMR-003
    requirement: "Feature gating"
    modules: [tenant-management, billing, feature-modules]
    pattern: "feature-flags"
    critical: false
    
  - id: CMR-004
    requirement: "Rate limiting"
    modules: [api-gateway, ai-runtime]
    pattern: "rate-limiting"
    critical: true
```

### 4. Dependency Analysis

Map dependencies between modules and requirements:

```yaml
dependency_analysis:
  module_dependencies:
    tenant-management:
      depends_on: []
      depended_by: [identity, billing, ai-runtime, feature-modules]
      
    identity:
      depends_on: [tenant-management]
      depended_by: [billing, ai-runtime, feature-modules]
      
    billing:
      depends_on: [tenant-management, identity]
      depended_by: [feature-modules]
      
    ai-runtime:
      depends_on: [tenant-management, identity]
      depended_by: [feature-modules]
      
  requirement_dependencies:
    MT-001:
      blocks: [AI-003, AI-004, MT-003, MT-004]
      blocked_by: []
      
    AI-001:
      blocks: [AI-002, AI-003, AI-004]
      blocked_by: [MT-001]
```

### 5. Priority Scoring

Calculate priority scores for requirements:

| Factor | Weight | Scoring Criteria |
|--------|--------|------------------|
| Business Value | 30% | Revenue impact, user demand |
| Dependencies | 25% | Blocking/blocked status |
| Compliance | 20% | Regulatory requirement |
| Complexity | 15% | Implementation effort |
| Risk | 10% | Technical/business risk |

```yaml
priority_scoring:
  formula: "(business_value * 0.3) + (dependency_score * 0.25) + (compliance * 0.2) + (inverse_complexity * 0.15) + (inverse_risk * 0.1)"
  
  scores:
    - requirement: MT-001
      business_value: 10
      dependency_score: 10  # Many requirements depend on this
      compliance: 10
      complexity: 8
      risk: 7
      priority_score: 9.35
      priority_tier: P0
      
    - requirement: AI-001
      business_value: 9
      dependency_score: 8
      compliance: 5
      complexity: 9
      risk: 8
      priority_score: 7.85
      priority_tier: P1
```

**Verify current best practices with web search:**
Search the web: "modular monolith requirement mapping {date}"
Search the web: "cross-cutting concerns multi-tenant architecture {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing module mapping above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into module boundaries using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for mapping review
- **C (Continue)**: Accept mapping and proceed to completeness validation
- **[Specific refinements]**: Describe what mappings you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: module assignments, cross-module requirements, dependencies
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into module mapping
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review requirements to module mapping: {summary of assignments and dependencies}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save module mapping to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## Verification

- [ ] All requirements assigned to modules
- [ ] Cross-module requirements identified
- [ ] Module dependencies mapped
- [ ] Requirement dependencies analyzed
- [ ] Priority scores calculated
- [ ] No orphaned requirements
- [ ] Patterns align with pattern registry

---

## Outputs

- Module structure definition
- Requirements to module assignment matrix
- Cross-module requirements catalog
- Dependency graph
- Priority scoring results

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-04-c-document.md` to validate completeness.
