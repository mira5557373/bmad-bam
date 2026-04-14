# AI Streaming Design

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Generate new AI Streaming Design from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Streaming Design | `steps/step-10-e-*` |
| **Validate** | Check Streaming Design against criteria | `steps/step-20-v-*` |

### Create Mode
- `step-01-c-transport-layer-design.md` - Design SSE/WebSocket
- `step-02-c-chunking-strategy-design.md` - Design chunking approach
- `step-03-c-error-handling-design.md` - Design error handling

### Edit Mode
- `step-10-e-load-existing.md` - Load existing streaming design
- `step-11-e-apply-changes.md` - Apply modifications

### Validate Mode
- `step-20-v-load-artifact.md` - Load streaming design artifacts
- `step-21-v-validate.md` - Run validation checks
- `step-22-v-generate-report.md` - Generate validation report
