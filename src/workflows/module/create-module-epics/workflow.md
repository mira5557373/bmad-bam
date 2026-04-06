# Create Module Epics

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Generate new artifact from scratch | `steps-c/` |
| **Edit** | Load existing artifact and apply targeted modifications | `steps-e/` |
| **Validate** | Check existing artifact against quality criteria | `steps-v/` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps-c/` sequentially.

### Edit Mode
Load the existing output artifact, then follow `steps-e/` for targeted modifications.

### Validate Mode
Load the existing output artifact, then follow `steps-v/` for validation against quality criteria.
