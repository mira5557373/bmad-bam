# Step 1: Load Existing Artifact

Load the existing foundation scaffold artifacts:

- `{project_root}/src/core/` - Core foundation files
- `{project_root}/src/shared_kernel/` - Shared kernel implementations
- `{project_root}/src/control_plane/` - Control plane structure
- `{project_root}/src/ai_runtime/` - AI runtime structure
- `{project_root}/ZONE_BOUNDARIES.md` - Zone boundary documentation
- `{output_folder}/planning-artifacts/foundation-epics.md` - Foundation epics

If the foundation scaffold does not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current scaffold:

- Directory structure present
- Core files implemented (database.py, tenant_context.py, base_entity.py)
- Shared kernel components present (events.py, dtos.py, exceptions.py)
- Zone boundary rules defined
- Foundation epics status

Verify zone boundaries are intact:

| Zone        | Status |
|-------------|--------|
| FROZEN      | Check for unauthorized modifications |
| EXTEND ONLY | Check additions are valid |
| AUTONOMOUS  | List created modules |

Confirm with the user which components need modification.

**Warning:** Modifications to FROZEN zone files require explicit override confirmation. EXTEND ONLY files can only have additions, not replacements.
