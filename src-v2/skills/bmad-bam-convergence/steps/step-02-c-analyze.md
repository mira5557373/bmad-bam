# Step 02: Analyze Cross-Module Integration Points

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Analyze cross-module integration points for QG-I1
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Facade contracts, event flows, dependency graph
- 🚫 Do NOT: Verify tenant isolation (that's Step 03)
- 🔍 Use web search: Verify integration patterns against current best practices
- ⚠️ Gate: QG-I1 - Cross-module convergence checks

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Analyzing facade contract compatibility
- Verifying event flow integration
- Checking dependency graph for cycles
- Validating data consistency patterns

**OUT OF SCOPE:**
- Tenant isolation verification (Step 03)
- Agent safety verification (Step 04)
- Final gate decisions (Step 05)

---

## Purpose

Analyze all cross-module integration points to verify facade contract stability, event flow integrity, dependency graph health, and data consistency patterns. This step addresses QG-I1 (Cross-Module Convergence) requirements.

---

## Prerequisites

- Step 01 completed: All artifacts loaded
- Integration point matrix available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: integration

---

## Inputs

- Loaded module architectures from Step 01
- Integration point matrix from Step 01
- Facade contracts and event schemas
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Analyze cross-module integration points against QG-I1 convergence criteria.

---

## Main Sequence

### 1. Facade Contract Compatibility Analysis

For each facade contract in the integration matrix:

#### 1.1 Version Stability Check

| Contract | Version | Status | Issues |
|----------|---------|--------|--------|
| {{contract}} | {{version}} | Stable/RC/Draft | {{issues}} |

**Criteria:**
- [ ] All contracts at stable version (no draft/RC)
- [ ] No breaking changes pending without migration path
- [ ] Contract tests pass for all published facades

#### 1.2 Interface Compliance Check

| Contract | TenantContext | DTO Returns | Version Header |
|----------|---------------|-------------|----------------|
| {{contract}} | YES/NO | YES/NO | YES/NO |

**Criteria:**
- [ ] All facade methods accept TenantContext as first parameter
- [ ] Return types are DTOs (no domain entity leakage)
- [ ] Version negotiation headers defined

### 2. Dependency Graph Analysis

#### 2.1 Build Dependency Graph

```mermaid
graph TD
    {{module_a}} --> {{module_b}}
    {{module_b}} --> {{module_c}}
    {{module_c}} --> {{module_d}}
```

#### 2.2 Circular Dependency Detection

| Cycle | Modules Involved | Severity | Resolution |
|-------|------------------|----------|------------|
| None detected | - | - | - |
| Cycle #1 | {{modules}} | CRITICAL | {{resolution}} |

**Criteria:**
- [ ] Zero circular dependencies detected
- [ ] All dependencies are unidirectional
- [ ] Forbidden dependency rules enforced

#### 2.3 Dependency Direction Validation

| Source | Target | Direction | Violation |
|--------|--------|-----------|-----------|
| {{src}} | {{tgt}} | Expected/Actual | YES/NO |

### 3. Event Flow Verification

#### 3.1 Event Schema Analysis

| Event | Publisher | Subscribers | Version | Compatible |
|-------|-----------|-------------|---------|------------|
| {{event}} | {{pub}} | {{count}} | {{ver}} | YES/NO |

**Criteria:**
- [ ] Event schemas follow backward-compatibility rules
- [ ] No breaking changes without major version bump
- [ ] Event consumers handle unknown fields gracefully

#### 3.2 Event Ordering Guarantees

| Event Flow | Ordering | Guarantee | Documented |
|------------|----------|-----------|------------|
| {{flow}} | Ordered/Unordered | At-least-once/Exactly-once | YES/NO |

#### 3.3 Dead Letter Configuration

| Event | DLQ Configured | Retry Policy | Alert |
|-------|----------------|--------------|-------|
| {{event}} | YES/NO | {{policy}} | YES/NO |

### 4. Data Consistency Patterns

#### 4.1 Cross-Module Data References

| Source Module | Reference Type | Target Module | Pattern |
|---------------|----------------|---------------|---------|
| {{source}} | ID Reference | {{target}} | Correct |
| {{source}} | Embedded Entity | {{target}} | VIOLATION |

**Criteria:**
- [ ] Cross-module references use IDs (not embedded entities)
- [ ] No shared database tables between modules (except shared kernel)

#### 4.2 Saga Compensation Verification

| Saga | Modules | Compensation Tested | Status |
|------|---------|---------------------|--------|
| {{saga}} | {{modules}} | YES/NO | {{status}} |

**Criteria:**
- [ ] Saga compensations tested for all cross-module transactions
- [ ] Eventual consistency windows documented

### 5. Integration Test Coverage

| Test Suite | Total | Passed | Coverage |
|------------|-------|--------|----------|
| Contract Tests | {{total}} | {{pass}} | {{cov}}% |
| Integration Tests | {{total}} | {{pass}} | {{cov}}% |
| Cross-Module Journeys | {{total}} | {{pass}} | {{cov}}% |

**Criteria:**
- [ ] Contract tests exist for every published facade
- [ ] Integration tests cover all cross-module journeys
- [ ] Minimum 80% coverage for cross-module paths

---

## COLLABORATION MENUS (A/P/C):

After completing the integration analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific integration findings
- **P (Party Mode)**: Bring architect perspectives for integration review
- **C (Continue)**: Accept analysis and proceed to tenant isolation verification
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: integration analysis findings, dependency issues, event flow gaps
- Process enhanced insights on integration patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review cross-module integration analysis for convergence: {summary}"
- Process Integration Architect (Kai) and Platform Architect (Atlas) perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document integration analysis findings
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## SUCCESS METRICS:

- [ ] All facade contracts analyzed for compatibility
- [ ] Dependency graph validated (no cycles)
- [ ] Event flow verification complete
- [ ] Data consistency patterns checked
- [ ] Integration test coverage documented

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Circular dependency detected | Run module-boundary-design to resolve |
| Breaking facade change | Run facade-mismatch-recovery workflow |
| Event schema incompatible | Version event schemas with migration path |
| Low test coverage | Create additional integration tests |

---

## Verification

- [ ] Facade contract stability verified
- [ ] Dependency graph analyzed
- [ ] Event flow patterns validated
- [ ] Data consistency confirmed
- [ ] Patterns align with pattern registry

---

## Outputs

- Facade compatibility matrix
- Dependency graph analysis
- Event flow verification results
- Data consistency findings
- Integration test coverage report

---

## NEXT STEP:

Proceed to `step-03-c-design.md` to verify tenant isolation across module boundaries.
