# bmad-bam-design-tenancy-model — Workflow Router

Create mode is the only mode in v0.1.0. Edit + Validate modes arrive in P2.2.

## Create mode

Sequential execution; assisted mode (default). Human-approval gates at decision points.

1. `steps/step-01-c-elicit-context.md` — gather inputs from user
2. `steps/step-02-c-load-options.md` — present options with trade-offs from fragments
3. `steps/step-03-c-decision-matrix.md` — score options against user's context
4. `steps/step-04-c-recommendation.md` — Atlas recommends + reasons
5. `steps/step-05-c-write-design.md` — produce tenancy-model.md
6. `steps/step-06-c-record-adr.md` — append ADR to Atlas's sidecar
7. `steps/step-07-v-verify-completeness.md` — gate evidence for QG-M2 (partial)
