# Step 1: Define Safety Criteria

Establish the safety requirements and evaluation criteria for the AI system:

## Safety Dimensions

Define criteria for each safety dimension:

**Content Safety:**
- Harmful content generation (violence, hate speech, illegal activity)
- PII exposure and data leakage
- Misinformation and hallucination thresholds
- Inappropriate content for context

**Behavioral Safety:**
- Action scope boundaries (what agents can/cannot do)
- Resource consumption limits (tokens, API calls, cost)
- Execution time bounds
- Escalation and approval requirements

**System Safety:**
- Tenant isolation enforcement
- Authentication and authorization checks
- Rate limiting and abuse prevention
- Kill switch activation criteria

**Operational Safety:**
- Graceful degradation requirements
- Fallback behavior specifications
- Recovery procedures
- Audit and compliance requirements

## Tier-Specific Criteria

For each tenant tier, specify:
- Safety threshold values
- Acceptable risk levels
- Monitoring sensitivity
- Response time requirements

Output: Safety criteria document with measurable thresholds for each dimension.
