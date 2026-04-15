# Step 3: Attribute Policies

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design attribute-based access control policies including attribute definitions, policy decision point architecture, and dynamic permission resolution.

---

## Prerequisites

- Step 1 and 2 completed with permission model and role hierarchy
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: security
- **Web research (if available):** Search for current ABAC policy design patterns

---

## Inputs

- Permission model design from Step 1
- Role hierarchy design from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Dynamic access requirements

---

## Actions

### 1. Define Attribute Categories

Categorize attributes for policy evaluation:

| Category | Attributes | Source | Refresh |
|----------|------------|--------|---------|
| Subject | user_id, roles, department, clearance | Identity Provider | Session |
| Resource | resource_id, owner, classification, tenant_id | Resource Metadata | Real-time |
| Action | operation, target, parameters | Request Context | Per-request |
| Environment | time, location, device_type, risk_score | Context Service | Per-request |

### 2. Design Policy Decision Architecture

Define PDP/PEP architecture:

| Component | Responsibility | Location |
|-----------|----------------|----------|
| Policy Administration Point (PAP) | Policy authoring and storage | Admin Service |
| Policy Decision Point (PDP) | Evaluate policies, return decisions | Auth Service |
| Policy Enforcement Point (PEP) | Intercept requests, enforce decisions | API Gateway + Services |
| Policy Information Point (PIP) | Provide attribute values | Multiple sources |

### 3. Configure Condition Evaluation

Define policy condition types:

| Condition Type | Syntax | Example |
|----------------|--------|---------|
| Equality | `attr == value` | `user.department == "engineering"` |
| Membership | `attr in set` | `user.roles in ["admin", "manager"]` |
| Comparison | `attr > value` | `resource.classification < user.clearance` |
| Temporal | `time within range` | `request.time within business_hours` |
| Composite | `cond1 AND cond2` | `owner == user AND status == "draft"` |

### 4. Design Dynamic Permission Resolution

Define resolution flow:

| Step | Action | Latency Budget |
|------|--------|----------------|
| 1. Cache Check | Check decision cache | 1ms |
| 2. Role Expansion | Expand inherited permissions | 5ms |
| 3. ABAC Evaluation | Evaluate attribute policies | 10ms |
| 4. Conflict Resolution | Apply precedence rules | 2ms |
| 5. Decision Logging | Log decision for audit | Async |

**Verify current best practices with web search:**
Search the web: "ABAC policy decision point architecture {date}"
Search the web: "attribute-based access control performance optimization {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the attribute policies analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific attribute categories or policy evaluation
- **P (Party Mode)**: Bring security and architecture perspectives on ABAC design
- **C (Continue)**: Accept attribute policies design and proceed to tenant scoping
- **[Specific refinements]**: Describe attribute policy concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: attribute categories, PDP architecture, condition evaluation
- Process enhanced insights on ABAC trade-offs
- Ask user: "Accept these refined attribute policy decisions? (y/n)"
- If yes, integrate into attribute policies specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review ABAC policy design for multi-tenant platform"
- Process security and architecture perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save attribute policies design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-tenant-scoping.md`

---

## Verification

- [ ] Attribute categories defined
- [ ] PDP/PEP architecture designed
- [ ] Condition evaluation configured
- [ ] Dynamic resolution flow documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Attribute category definitions
- Policy decision architecture specification
- Condition evaluation syntax guide
- Dynamic resolution flow design

---

## Next Step

Proceed to `step-04-c-tenant-scoping.md` to design tenant scoping.
