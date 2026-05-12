# Wave 0 Test Fixtures

Fixtures used by `tests/wave-0/run-smoke-test.sh` to verify the BAM v6 universal-glob mechanism.

## `test-bmad-project/`

A minimal BMAD-initialized project. The smoke test copies this fixture to a temp directory, installs `bmad-bam-platform` into it, then verifies the sentinel token reaches a BMAD skill's loaded context.

The fixture must remain **minimal** — adding unrelated modules would obscure what Wave 0 is testing.
