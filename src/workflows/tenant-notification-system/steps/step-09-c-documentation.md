# Step 9: Documentation

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
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Create comprehensive documentation for the notification system including architecture docs, integration guides, template authoring guidelines, and operational runbooks.

---

## Prerequisites

- Steps 1-8 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `documentation`

---


## Inputs

- All previous step outputs
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Template: `{project-root}/_bmad/bam/templates/notification-system-template.md`

---

## Actions

Create documentation deliverables:

### Architecture Documentation

| Document | Audience | Content |
|----------|----------|---------|
| System Overview | All | High-level architecture diagram, components |
| Data Model | Developers | Schema definitions, relationships |
| API Reference | Developers | Endpoints, payloads, authentication |
| Security Model | Security/Compliance | Tenant isolation, encryption, audit |

**Architecture Document Sections:**
1. Executive Summary
2. System Components
3. Data Flow Diagrams
4. Tenant Isolation Model
5. Integration Points
6. Scalability Considerations
7. Security Architecture
8. Disaster Recovery

### Integration Guides

| Channel | Guide Content |
|---------|---------------|
| Email | Provider setup, domain verification, template creation |
| SMS | Provider setup, 10DLC registration, consent management |
| Push | FCM/APNs setup, token management, payload structure |
| In-App | WebSocket connection, notification center API |

**Integration Guide Structure:**
1. Prerequisites
2. Provider Configuration
3. Authentication Setup
4. Basic Implementation
5. Advanced Features
6. Testing and Debugging
7. Production Checklist
8. Troubleshooting

### Template Authoring Guidelines

| Section | Content |
|---------|---------|
| Getting Started | Template creation workflow |
| Variables | Available variables, syntax |
| Localization | Multi-language support |
| Branding | Brand variable usage |
| Testing | Preview and test send |
| Best Practices | Subject lines, content, CTAs |

**Template Best Practices:**
- Keep subject lines under 50 characters
- Use preheader text for email
- Include clear CTAs
- Test on multiple devices/clients
- Use alt text for images
- Maintain brand consistency

### Operational Runbooks

| Runbook | Scenario |
|---------|----------|
| Provider Failover | Primary provider down |
| Queue Backlog | Processing backlog |
| Delivery Issues | High bounce/complaint rate |
| Tenant Quota | Tenant exceeded limits |
| Escalation | Alert not acknowledged |
| Data Recovery | Notification data loss |

**Runbook Structure:**
1. Trigger Conditions
2. Impact Assessment
3. Immediate Actions
4. Investigation Steps
5. Resolution Procedures
6. Verification Steps
7. Post-Incident Review
8. Prevention Measures

### Output Document Assembly

Using template: `{project-root}/_bmad/bam/templates/notification-system-template.md`

Assemble final notification system specification:

| Section | Source |
|---------|--------|
| Notification Requirements | Step 1 |
| Channel Architecture | Step 2 |
| Template Management | Step 3 |
| Tenant Preferences | Step 4 |
| Delivery Infrastructure | Step 5 |
| Tracking and Analytics | Step 6 |
| Escalation Rules | Step 7 |
| Tenant Branding | Step 8 |
| Documentation Index | Step 9 |

**Verify current best practices with web search:**
Search the web: "notification system documentation best practices {date}"
Search the web: "API documentation standards SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the documentation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into documentation completeness and coverage
- **P (Party Mode)**: Bring analyst and architect perspectives for final review
- **C (Continue)**: Finalize documentation and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass documentation context: all sections, completeness check
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into documentation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review notification system documentation: {summary of all components}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Assemble final notification-system-spec.md
- Save to `{output_folder}/planning-artifacts/notification-system-spec.md`
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
- Complete Create mode

---

## Verification

- [ ] Architecture documentation complete
- [ ] Integration guides for all channels
- [ ] Template authoring guidelines created
- [ ] Operational runbooks documented
- [ ] Final specification assembled
- [ ] All steps verified complete
- [ ] Patterns align with pattern registry

---

## Outputs

- `notification-system-spec.md` - Complete notification system specification
- Integration guide outlines
- Runbook templates
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-notification-template.md`

---

## Next Step

Create workflow complete. Notification system specification ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

Create mode complete for tenant-notification-system workflow.

**Next Steps:**
- Run Validate mode to verify specification completeness
- Use Edit mode for modifications
- Proceed to implementation planning
