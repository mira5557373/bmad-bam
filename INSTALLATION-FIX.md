# BAM Installation Fix Guide

## Problem Summary

When BAM is installed via `npx bmad-method install` from a local path or URL, the `data/` directory (721 files) is NOT copied. This is because:

1. **BAM is installed as `source: custom`** (local path)
2. **Custom modules use "plugin resolution"** which ONLY copies skill directories
3. **The data/ directory is ignored** by plugin resolution

## How Other Modules Work

| Module | Source Type | Registry | data/ Copied? |
|--------|-------------|----------|---------------|
| TEA | `external` | registry-fallback.yaml | ✅ Yes |
| CIS | `external` | registry-fallback.yaml | ✅ Yes |
| WDS | `community` | community-index.yaml | ✅ Yes |
| BAM | `custom` | **None** | ❌ No |

## Permanent Fix: Add BAM to Registry

BAM must be added to **one of these registries**:

### Option 1: Official Registry (for BMAD org modules)
Add to `bmad-method/tools/installer/modules/registry-fallback.yaml`:

```yaml
bmad-bam:
  url: https://github.com/bmad-code-org/bmad-bam
  module-definition: src/module.yaml
  code: bmad-bam
  name: "BAM - Multi-Tenant Agentic AI SaaS"
  description: "Multi-tenant capabilities, modular monolith patterns, AI agent architecture"
  defaultSelected: false
  type: bmad-org
  npmPackage: bmad-bam
```

### Option 2: Community Registry (recommended for community modules)
Add to `bmad-plugins-marketplace/registry/community-index.yaml`:

```yaml
- name: bmad-bam
  display_name: "BAM - Multi-Tenant Agentic AI SaaS"
  code: bmad-bam
  description: "Extension module that adds multi-tenant capabilities, modular monolith patterns, and AI agent architecture"
  repository: https://github.com/bmad-code-org/bmad-bam
  module_definition: src/module.yaml
  npm_package: bmad-bam
  category: enterprise
  author: "BMAD Community"
  promoted: false
```

## Temporary Fix: Post-Install Script

Until BAM is added to a registry, run this after `npx bmad-method install`:

```bash
# From project root
./node_modules/bmad-bam/scripts/bam-post-install.sh

# Or from BAM source
./scripts/bam-post-install.sh /path/to/project
```

## Verification

After fix, verify data/ directory exists:

```bash
ls _bmad/bmad-bam/data/
# Should show: agent-guides/, checklists/, extensions/, templates/, *.csv

ls _bmad/bmad-bam/data/agent-guides/bam/ | wc -l  # Should be 189+
ls _bmad/bmad-bam/data/templates/ | wc -l         # Should be 456+
ls _bmad/bmad-bam/data/checklists/ | wc -l        # Should be 37+
ls _bmad/bmad-bam/data/extensions/ | wc -l        # Should be 32+
```

## Technical Details

### Why Plugin Resolution Fails for data/

The `installFromResolution()` method in BMB only copies:
1. Skill directories listed in `marketplace.json plugins[].skills[]`
2. `module-help.csv` file

It does NOT copy:
- `data/` directory
- `agents/` directory (unless listed as skill)
- Any other non-skill content

### Why External/Community Works

The `copyModuleWithFiltering()` method copies the **entire source directory** (minus module.yaml and config.yaml), preserving:
- `data/`
- `agents/`
- `workflows/`
- All other content

## Files Created

1. `scripts/bam-post-install.sh` - Enhanced post-install script
2. `scripts/migrate-installation.sh` - Migration for existing installations
3. `scripts/verify-install.sh` - Verification script
4. `bmb-registry-entry.yaml` - Registry entry documentation
5. `INSTALLATION-FIX.md` - This documentation
