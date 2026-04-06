# Story: {{STORY_ID}} - {{STORY_TITLE}}

## Module

**Module:** {{MODULE_NAME}}
**Epic:** {{EPIC_ID}}

## User Story

As a {{ROLE}}, I want to {{ACTION}}, so that {{BENEFIT}}.

## Acceptance Criteria

- [ ] {{CRITERION_1}}
- [ ] {{CRITERION_2}}
- [ ] {{CRITERION_3}}

## Tenant Considerations

- [ ] All data operations scoped to tenant_id
- [ ] RLS policies cover new tables
- [ ] Tier-specific behavior documented

## AI Considerations (if applicable)

- [ ] Agent tools registered in tool registry
- [ ] Memory scope defined for AI interactions
- [ ] Eval criteria defined for AI behavior
- [ ] Kill switch configured

## Dependencies

| Dependency              | Type   | Status       |
| ----------------------- | ------ | ------------ |
| {{MODULE_NAME}}.facade  | Facade | {{DEP_STATUS}} |

## Technical Notes

{{IMPLEMENTATION_NOTES}}

## Testing Requirements

- [ ] Unit tests for domain logic
- [ ] Integration tests with tenant context
- [ ] Tenant isolation verification
