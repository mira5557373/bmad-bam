# WDS Integration Patterns

## Principle

When `design_first: true`, WDS (Web Design System) workflows are adapted for
multi-tenant agentic SaaS concerns: tenant branding, AI interaction UX,
provisioning flows, and agentic development patterns.

## Rationale

WDS provides 15 design workflows through Saga (strategy) and Freya (design)
agents. In a BAM context, these workflows must account for tenant-specific
branding, AI-driven UI components, and the unique UX challenges of agentic
interfaces (approval flows, progress indicators, trust displays).

## WDS Phase Adaptations

| WDS Phase       | BAM Adaptation                                    | Agent                      |
| --------------- | ------------------------------------------------- | -------------------------- |
| Strategy (Saga) | Tenant branding strategy, AI interaction patterns | Saga with BAM context      |
| Design (Freya)  | Tenant-aware components, agent UI patterns        | Freya with BAM context     |
| Build           | Agentic development with tenant context           | DEV with BAM + WDS context |

## Saga Agent BAM Context

When WDS is installed, Saga (analyst) replaces Mary for BAM projects:

| BAM Context Injected                    | Purpose                             |
| --------------------------------------- | ----------------------------------- |
| Tenant tier model (FREE/PRO/ENTERPRISE) | Tier-specific UX decisions          |
| AI runtime capabilities                 | Agent interaction pattern selection |
| Multi-tenant branding requirements      | Per-tenant customization scope      |
| Control-plane vs tenant-plane split     | Admin UX vs tenant UX separation    |

## Freya Agent BAM Context

When WDS is installed, Freya (UX) replaces Sally for BAM projects:

| BAM Context Injected                     | Purpose                                           |
| ---------------------------------------- | ------------------------------------------------- |
| Agent UI component requirements (S4.6.1) | HITL panels, consent dialogs, progress indicators |
| Tenant isolation in UI                   | No cross-tenant data in shared components         |
| Accessibility requirements for agent UX  | WCAG 2.2 AA for all agent interaction components  |
| Provisioning flow UX                     | Real-time status, error recovery, retry patterns  |

## Agent UI Components Requiring WDS Design

| Component               | Purpose                                     | BAM Section |
| ----------------------- | ------------------------------------------- | ----------- |
| HITLReviewPanel         | Pending agent action for human approval     | S4.6.1      |
| ConsentDialog           | Request user consent for data/tool access   | S4.6.1      |
| ArtifactViewer          | Display versioned artifacts with provenance | S4.6.1      |
| RunProgressIndicator    | Run contract budget consumption             | S4.6.1      |
| OrchestrationVisualizer | Multi-agent coordination view               | S4.6.1      |
| TrustLevelIndicator     | Agent autonomy/trust level                  | S4.6.1      |
| ContextInspector        | What context was compiled                   | S4.6.1      |
| DecisionTraceViewer     | Reasoning chain for a decision              | S4.6.1      |

## Configuration

The `design_first` config variable controls WDS integration:

- `design_first: true` — WDS workflows active, Saga/Freya replace Mary/Sally
- `design_first: false` — Standard BMM UX workflow, Sally/Mary active

## Extension Loading

| Config State          | Analyst Extension                | UX Extension                       |
| --------------------- | -------------------------------- | ---------------------------------- |
| `design_first: false` | analyst-bam.yaml (extends Mary)  | ux-bam.yaml (extends Sally)        |
| `design_first: true`  | wds-saga-bam.yaml (extends Saga) | wds-freya-bam.yaml (extends Freya) |

## Anti-Patterns

| Anti-Pattern                                       | Problem                                       | Correct Approach                                           |
| -------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------- |
| Designing agent UI without tenant context          | Missing tier-specific UX                      | Always include tenant tier in design context               |
| Ignoring accessibility for agent components        | Inaccessible approval flows                   | WCAG 2.2 AA for all agent interaction components           |
| Designing provisioning UI without real-time status | Poor user experience during long operations   | WebSocket-based progress (see provisioning-ui-patterns.md) |
| Using WDS workflows without BAM context injection  | Generic designs missing multi-tenant concerns | Load BAM extensions for Saga/Freya                         |

## Integration Points

- Section 8.4: WDS Strategy Phase Adaptations (Saga Agent)
- Section 8.5: WDS Design Phase Adaptations (Freya Agent)
- Section 8.6: WDS Build Phase Adaptations

See also: provisioning-ui-patterns.md, multi-tenant-patterns.md
