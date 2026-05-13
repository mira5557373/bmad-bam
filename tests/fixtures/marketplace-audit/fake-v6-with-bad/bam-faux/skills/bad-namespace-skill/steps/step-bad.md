---
step_id: bad-step
auto_runnable: true
gate: machine-checkable
---

# Bad step — references a non-existent namespace

Load the fragment from `_bmad/wrongns/agents/atlas/resources/fragments/foo.md`. This step exists only to exercise check (f); it references `_bmad/wrongns/` which is not a known module code.
