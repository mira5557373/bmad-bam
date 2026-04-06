# Step 4: Recommend Fix

Propose remediation based on the identified failure:

For each failure type, provide specific recommendations:

**Tool failure:**
- Verify tool configuration and permissions
- Check tool sandbox settings
- Review tool input validation
- Consider adding retry logic or fallback tools

**Prompt failure:**
- Adjust system prompt for clarity
- Add examples or few-shot learning
- Reduce prompt complexity or split into steps
- Review temperature and sampling settings

**Memory failure:**
- Verify memory tier permissions
- Check for stale or corrupted memory entries
- Review memory retention policies
- Consider memory prefetching strategies

**Integration failure:**
- Check circuit breaker status
- Review retry and timeout configuration
- Verify external service health
- Consider graceful degradation patterns

**Safety trigger:**
- Review guardrail configuration
- Check if trigger was a false positive
- Adjust sensitivity thresholds if appropriate
- Document as expected behavior if correct

**Resource limit:**
- Review token budget allocation
- Consider streaming or chunking strategies
- Optimize prompt efficiency
- Adjust tier-based resource limits

Output: Debug report with root cause analysis and prioritized fix recommendations.
