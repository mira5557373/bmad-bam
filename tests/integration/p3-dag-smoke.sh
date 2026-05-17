#!/usr/bin/env bash
# Lightweight cross-skill DAG smoke for P3.1 + P3.2 platform chain.

set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
echo ">>> p3-dag-smoke"

# Verify 9 platform skill directories exist
SKILLS=(
    bmad-bam-design-tenancy-model
    bmad-bam-design-modular-monolith
    bmad-bam-design-tenant-tier-model
    bmad-bam-design-deployment-topology
    bmad-bam-design-finops-model
    bmad-bam-design-tenant-onboarding
    bmad-bam-design-tenant-offboarding
    bmad-bam-design-multi-tenant-testing
    bmad-bam-design-tenant-migration-tooling
)
for s in "${SKILLS[@]}"; do
    [ -d "$REPO_ROOT/src-v6/bmad-bam-platform/2-modules/$s" ] || { echo "FAIL: missing $s"; exit 1; }
done
echo "    [present] 9 platform skill directories"

# Verify onboarding manifest has correct required inputs
python3 -c "
import yaml
m = yaml.safe_load(open('$REPO_ROOT/src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenant-onboarding/bmad-skill-manifest.yaml'))
reqs = [i['artifact'] for i in m['inputs'] if i.get('required')]
assert 'tier-model.json' in reqs, 'onboarding must require tier-model.json'
assert 'tenancy-decision.json' in reqs, 'onboarding must require tenancy-decision.json'
print('    [valid] onboarding manifest required inputs')
"

# Verify tier-model 1.1 retention_window_days_hint referenced in offboarding step-01
grep -q "retention_window_days_hint" "$REPO_ROOT/src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenant-offboarding/steps/step-01-c-elicit-context.md" || { echo "FAIL: offboarding step-01 missing retention_window_days_hint reference"; exit 1; }
echo "    [valid] offboarding step-01 references tier-model 1.1 field"

# Verify hook-id cross-refs documented in migration step-07
grep -qE "provisioning_hooks.*id|hook_ids" "$REPO_ROOT/src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenant-migration-tooling/steps/step-07-v-verify-completeness.md" || { echo "FAIL: migration step-07 missing hook cross-ref check"; exit 1; }
echo "    [valid] migration step-07 references upstream hooks"

# Verify references_degraded semantics
grep -q "references_degraded" "$REPO_ROOT/src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenant-migration-tooling/steps/step-07-v-verify-completeness.md" || { echo "FAIL: missing references_degraded check"; exit 1; }
echo "    [valid] migration step-07 enforces references_degraded semantics"

echo ">>> PASS: p3-dag-smoke"
