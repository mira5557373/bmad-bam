# Step 1: Load Artifact

Load the existing foundation scaffold for validation:

- `{project_root}/src/core/` - Core foundation files
- `{project_root}/src/shared_kernel/` - Shared kernel implementations
- `{project_root}/src/control_plane/` - Control plane structure
- `{project_root}/src/ai_runtime/` - AI runtime structure
- `{project_root}/ZONE_BOUNDARIES.md` - Zone boundary documentation
- `{output_folder}/planning-artifacts/master-architecture.md` - Master architecture reference

If the foundation scaffold does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

Parse the scaffold structure and prepare for validation:

1. Inventory all scaffold files
2. Load master architecture as reference for expected structure
3. Identify any missing expected components
4. Check for unexpected files in FROZEN zones

Prepare validation context for the next step.
