# Step 4: Implement Resolution

Execute the chosen resolution strategy.

## Tasks

### If Option A: Update Contract
1. Run the evolve-facade-contract workflow
2. Document the unplanned change as emergency evolution
3. Notify affected consumers of the retroactive contract change
4. Update contract tests to match new contract

### If Option B: Fix Implementation
1. Create implementation fix with rollback plan
2. Deploy fix to staging environment
3. Run contract compliance tests
4. Deploy to production with monitoring

### If Option C: Create Adapter Layer
1. **Design Adapter**
   - Define adapter interface matching consumer expectations
   - Map adapter calls to actual provider implementation
   - Handle type transformations
   - Preserve tenant context through adapter

2. **Implement Adapter**
   - Create adapter module in consumer or shared location
   - Implement transformation logic for each affected operation
   - Add logging for adapter usage tracking
   - Include deprecation notice for temporary adapters

3. **Configure Routing**
   - Update consumer to use adapter
   - Ensure adapter is transparent to consumer business logic
   - Add feature flag for adapter bypass when ready

### If Option D: Version Fork
1. Create new contract version with current implementation
2. Maintain old contract version for existing consumers
3. Set up routing based on consumer version
4. Plan migration timeline

## Output

Implementation artifacts based on chosen strategy:
- Code changes (adapter, fix, or contract update)
- Deployment plan
- Rollback procedure
- Monitoring additions
