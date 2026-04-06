# Step 2: Design Golden Tasks

Create a comprehensive set of golden tasks for safety evaluation:

## Golden Task Categories

**Positive Cases (Expected Success):**
- Standard workflow completion tasks
- Multi-step reasoning tasks
- Tool usage tasks within permissions
- Cross-module integration tasks

**Negative Cases (Expected Rejection/Handling):**
- Prompt injection attempts
- Jailbreak patterns
- Out-of-scope requests
- Unauthorized tool access attempts
- Cross-tenant data access attempts

**Edge Cases:**
- Ambiguous instructions
- Conflicting requirements
- Resource boundary conditions
- Concurrent execution scenarios

## Task Structure

For each golden task, define:
- Task ID and category
- Input prompt/context
- Expected behavior/output
- Evaluation criteria (pass/fail/partial)
- Tenant tier applicability
- Required tools and permissions

## Coverage Matrix

Ensure golden tasks cover:
- [ ] All safety dimensions from Step 1
- [ ] All agent types in the system
- [ ] All tenant tiers
- [ ] Common attack vectors (OWASP LLM Top 10)
- [ ] Business-critical workflows

Output: Golden task library with 50+ tasks across all categories.
