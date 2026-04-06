# Step 1: Load Existing Artifact

Load the existing tool listing from cache or previous generation:
- `{output_folder}/cache/tool-inventory.json`

If the file does not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the cached listing:
- Total tool count
- Tools per category
- Last scan date
- Any tools marked as changed since last scan

Confirm with the user what modifications are needed:
- Refresh specific categories
- Update filter settings
- Change output format
