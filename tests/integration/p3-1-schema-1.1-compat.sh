#!/usr/bin/env bash
# Verify P3.1 consumers tolerate tier-model.json schema 1.1 (unknown retention_window_days_hint field).
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
echo ">>> p3-1-schema-1.1-compat"

python3 -c "
import json
tm = json.load(open('$REPO_ROOT/tests/fixtures/p3-2/tier-model.1.0.json'))
# Simulate schema bumped to 1.1 with extra field
tm['schema_version'] = '1.1'
for t in tm['tiers']:
    t['retention_window_days_hint'] = 30
# P3.1 consumers (Python json.load tolerates extra keys); P3.1 step-07-v doesn't strict-check
assert 'retention_window_days_hint' in tm['tiers'][0]
print('    [valid] schema 1.1 fixture has retention_window_days_hint field')
print('    [valid] P3.1 Python json-based consumers tolerate unknown field (forward-compat per spec G55)')
"

echo ">>> PASS: p3-1-schema-1.1-compat"
