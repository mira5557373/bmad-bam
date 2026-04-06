# Step 4: Define Acceptance Criteria

Add acceptance criteria to each story and finalize the epics document.

## Acceptance Criteria Structure

For each story, define acceptance criteria using Given/When/Then format:

```markdown
**Acceptance Criteria:**

**AC1:** {Criteria title}
- Given: {precondition}
- When: {action}
- Then: {expected outcome}

**AC2:** {Criteria title}
- Given: {precondition}
- When: {action}
- Then: {expected outcome}
```

## Required Criteria Categories

Each story must have acceptance criteria covering:

### 1. Functional Criteria
- Core functionality works as specified
- Edge cases handled appropriately

### 2. Tenant Isolation Criteria
- Operations respect tenant_id boundaries
- No cross-tenant data leakage
- Tenant context propagated correctly

### 3. Facade Contract Criteria (if story modifies facade)
- Facade method signature matches contract
- DTOs validated against schema
- Error types follow master architecture error contract

### 4. AI Behavior Criteria (if applicable)
- Agent operates within tool permission bounds
- Memory scope correctly isolated
- Kill switch can disable AI behavior

## BAM Developer Notes

Add developer notes to each story:

```markdown
**BAM Dev Notes:**
- Module boundary: {enforcement guidance}
- Tenant context: {how to access and validate}
- Facade dependencies: {facades to import, versions}
- Testing: {integration test requirements}
```

## Final Assembly

1. Compile all epics and stories into `epics.md`
2. Validate story count matches complexity guidelines
3. Verify no stories cross module boundaries without facade contracts
4. Check spike stories exist for all flagged unknowns (COMPLEX only)

## Output

Write final document to: `{output_folder}/planning-artifacts/modules/{module-name}/epics.md`

Update sprint-status.yaml: module status to 'epics-complete'

Present summary:
- Total epics: {count}
- Total stories: {count}
- Spike stories: {count}
- Estimated complexity: {SIMPLE/STANDARD/COMPLEX}
