#!/usr/bin/env bash
# tests/integration/run-real-install.sh
#
# Tier-2 real-installer test — DEFERRED in v6.0.
#
# This script always exits 77 (POSIX autotest SKIP). The deferral is NOT
# because BMAD lacks a local-install API — it does have one:
#   bmad install --custom-source <local-path>
# verified at:
#   external/bmad-method/tools/installer/commands/install.js:36
#     "--custom-source <sources>  Comma-separated Git URLs or local paths..."
#   external/bmad-method/tools/installer/modules/custom-module-manager.js:99-110
#     parseSource() detects /, ./, ../, ~ prefixes as local
#   external/bmad-method/tools/installer/modules/custom-module-manager.js:326-329
#     resolveSource() local branch: rootDir=localPath, repoPath=null —
#     cloneRepo() never invoked, so neither CustomModuleManager.cloneRepo:427
#     nor CommunityModuleManager:292's `git reset --hard origin/HEAD` can
#     fire against the local source. (The latter only runs for community-
#     registry modules anyway — never a custom-source local path.)
#
# The reasons Tier-2 PASS-mode is deferred for v6.0:
#
#   1. BAM's marketplace layout falls into PluginResolver Strategy 5
#      (synthesized fallback), not Strategy 1. All BAM skills sit under
#      src-v6/bmad-bam-platform/*/, so the common parent is .../*/.
#      But BAM's module.yaml lives at .../bmad-bam-platform/module.yaml —
#      one level up. plugin-resolver.js:63-97 only matches Strategy 1 when
#      module.yaml + module-help.csv sit AT the common parent. Result: a
#      `bmad install --custom-source $(pwd)` would copy the 4 skills but
#      synthesize a stub module.yaml from marketplace.json metadata,
#      losing BAM's real agents:/directories:/x-bam-* extensions. Partial
#      validation only — promoted to Concern 5 backlog.
#
#   2. Hard dependency on `bmad` CLI on every contributor/CI machine.
#      Without it, Tier-2 cannot run; with it gated behind "skip when
#      missing", green CI would imply more coverage than the Strategy-5
#      degraded install actually delivers.
#
#   3. CI infrastructure for ephemeral tmpdir-as-project-root
#      (bmad install --directory <tmpdir>) + bmad-method npm-install
#      provisioning not yet built. P2.x scope.
#
# A future v6.x Tier-2 PASS-mode would look roughly like:
#   bmad install --custom-source "$(git rev-parse --show-toplevel)" \
#                --modules bmad-bam-platform \
#                --directory "$(mktemp -d)" \
#                --tools claude-code --yes
# and would land alongside the Concern-5 layout fix.
#
# In the meantime: Tier-1 (tests/audit-marketplace.sh) catches the
# regression classes Tier-2 was originally meant to catch (marketplace.json
# drift + _bmad/<ns>/ namespace collision); tests/integration/MANUAL.md
# documents the manual procedure for ad-hoc release-time verification.

set -euo pipefail

cat <<EOF
SKIP: Tier-2 real-install PASS-mode is deferred in v6.0.

  BMAD v6.6.0 DOES have a local-install API (bmad install --custom-source
  <path>). The deferral is because:
    - BAM's marketplace layout currently resolves via PluginResolver Strategy
      5 (synthesized fallback) — real module.yaml is bypassed, only partial
      validation. Tracked as Concern 5.
    - Hard dep on bmad CLI on every dev/CI machine.
    - Ephemeral tmpdir CI scaffolding (bmad install --directory) not built.

  See this script's header comment for full empirical evidence chain.

  For ad-hoc verification (e.g., before a release), see:
    tests/integration/MANUAL.md

  Tier-1 (tests/audit-marketplace.sh) catches the regression classes
  this Tier-2 was originally meant to catch:
    - marketplace.json drift (PR #2 Bug 1) → checks (a) + (e)
    - _bmad/<ns>/ namespace collision in step files (PR #2 Bug 2) → check (f)

  Tier-3 (Plan-C manual LLM probe) covers the LLM-side activation
  contract; see tests/p2/PLAN-C-RATIFICATION.md.
EOF

exit 77
