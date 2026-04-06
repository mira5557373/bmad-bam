# Step 2: Validate Mismatch Recovery

## Validation Checklist

### Detection Phase
- [ ] Mismatch clearly identified (modules, operations, symptoms)
- [ ] Mismatch type classified (schema, signature, semantic, version)
- [ ] Evidence documented (logs, test failures, error messages)
- [ ] Discovery context recorded

### Analysis Phase
- [ ] Contract vs implementation diff documented
- [ ] Divergence origin identified
- [ ] Root cause determined
- [ ] Impact assessment completed for all consumers
- [ ] Risk level classified

### Resolution Strategy
- [ ] Resolution option selected and justified
- [ ] Alternative options considered and documented
- [ ] Constraints identified (time, coordination, risk)
- [ ] Success criteria defined
- [ ] Fallback plan documented

### Implementation
- [ ] Implementation aligns with chosen strategy
- [ ] Rollback procedure defined
- [ ] Deployment plan documented
- [ ] Monitoring additions specified

### Verification
- [ ] Contract compliance tests pass
- [ ] Consumer integration tests pass
- [ ] Staging environment validation complete
- [ ] Tenant isolation confirmed
- [ ] Performance acceptable

### Prevention
- [ ] Root cause addressed (not just symptoms)
- [ ] Process improvements identified
- [ ] Tooling gaps addressed (CI validation, monitoring)
- [ ] Documentation updated

### Cross-Cutting
- [ ] Recovery timeline is realistic
- [ ] Consumer communication completed
- [ ] Lessons learned documented
- [ ] Temporary measures have removal timeline

## Gate Decision

- **PASS**: All phases complete, verification passed, prevention measures in place
- **CONDITIONAL**: Recovery complete, minor documentation gaps - note gaps
- **FAIL**: Verification failing, root cause not addressed, or critical consumers still affected - continue recovery

Present validation results with specific findings for each phase.
