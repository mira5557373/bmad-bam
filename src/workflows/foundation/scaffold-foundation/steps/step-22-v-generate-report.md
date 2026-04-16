# Step 22: Generate Validation Report

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

---

## Purpose

Generate a comprehensive validation report summarizing findings from the foundation scaffold validation steps and determining the workflow completion status.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Foundation scaffold validation performed


---

## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Notes |
|----------|--------|-------|
| Directory Structure | | src/core, shared_kernel, control_plane, ai_runtime |
| Core Components (FROZEN) | | database.py, tenant_context.py, base_entity.py, config.py |
| Shared Kernel (EXTEND ONLY) | | events.py, dtos.py, exceptions.py, value_objects.py |
| Zone Boundaries | | ZONE_BOUNDARIES.md exists, no unauthorized changes |
| Master Architecture Alignment | | Tech stack matches, tenant model matches |
| Foundation Epics | | All foundation epics defined |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing core components, zone violations, master architecture misalignment | Must fix before proceeding |
| WARNING | Optional components missing, minor documentation gaps | Should address |
| INFO | Code organization suggestions, additional utility recommendations | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All scaffold components present, zone boundaries intact, master architecture aligned |
| **CONDITIONAL** | Minor gaps (e.g., optional components missing) - document gaps and proceed |
| **NEEDS REVISION** | Missing core components, zone violations, or master architecture misalignment |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category (Directory, Core, Shared Kernel, Zones, Alignment, Epics)
- Zone boundary compliance status
- FROZEN zone integrity verification
- Required fixes list (if FAIL)
- Next steps recommendation

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with all required sections
- [ ] Patterns align with pattern registry

## Outputs

- Validation report document
- Gate decision (PASS/CONDITIONAL/FAIL)
- Zone compliance status
- Required fixes list (if applicable)

## Next Step

Based on completion status:
- **PASS:** Foundation scaffold is ready for implementation. Proceed to implement foundation epics, then run `validate-foundation` for QG-F1.
- **CONDITIONAL:** Document gaps and proceed with noted limitations.
- **NEEDS REVISION:** Return to Create mode to address missing components, zone violations, or alignment issues.

## Workflow Complete

Validation mode complete for scaffold-foundation workflow.
