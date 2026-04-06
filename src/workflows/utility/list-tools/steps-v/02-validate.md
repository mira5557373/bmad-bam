# Step 2: Validate Tool Listing

## Validation Checklist

### Tool Discovery
- [ ] All expected tool locations scanned
- [ ] No scan errors reported
- [ ] Tool count matches expected range

### Tool Metadata
- [ ] Each tool has name
- [ ] Each tool has description
- [ ] Each tool has category
- [ ] Each tool has permission level
- [ ] Each tool has status

### Tool Registration
- [ ] All tools have SKILL.md files
- [ ] All tools have instructions.md files
- [ ] No orphaned tool definitions
- [ ] No duplicate tool names

### Output Quality
- [ ] Output format is valid
- [ ] No malformed entries
- [ ] Sorting is consistent
- [ ] Filters applied correctly

### Freshness
- [ ] Scan date is recent (within configured threshold)
- [ ] No stale entries for removed tools
- [ ] New tools detected and included

## Gate Decision

- **PASS**: All tools discovered, metadata complete, output valid
- **CONDITIONAL**: Minor metadata gaps (e.g., some tools missing optional fields)
- **FAIL**: Tools missing, scan errors, or invalid output format

Present validation results with specific findings.
