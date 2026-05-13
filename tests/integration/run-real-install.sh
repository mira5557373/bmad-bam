#!/usr/bin/env bash
# tests/integration/run-real-install.sh
#
# Tier-2 real-installer test — DEFERRED in v6.0.
#
# This script always exits 77 (POSIX autotest SKIP) because BMAD v6.6.0
# exposes no API to install from a local checkout:
#   - No `--from <path>` flag in `bmad install`
#   - No `BAM_LOCAL_SOURCE` env override
#   - Symlinking the cache dir triggers `git reset --hard origin/HEAD` against
#     the symlinked target, destroying local commits
#   - Bare-copying the source to the cache dir hits the same git-reset issue
#
# Verified against external/bmad-method/tools/installer/modules/community-manager.js
# (specifically line 292 in BMAD v6.6.0).
#
# A real bmad install end-to-end probe requires one of:
#   - BMAD ships a local-install API (--from-local or equivalent)
#   - CI infrastructure for push-and-pin: push branch → bmad install --pin <sha>
#   - Manual procedure in tests/integration/MANUAL.md
#
# Tier-1 (tests/audit-marketplace.sh) is the static substitute that catches
# the PR #2 bug classes Tier-2 was originally meant to catch.

set -euo pipefail

cat <<EOF
SKIP: Tier-2 real-install PASS-mode is deferred in v6.0.

  BMAD v6.6.0 has no API to install from a local checkout (verified;
  see this script's header for evidence). Automated end-to-end testing
  of the real install pipeline requires either an upstream BMAD change
  or CI infrastructure not yet built.

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
