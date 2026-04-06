# BAM Workflow Sequence (DAG)

> Defines the execution order and dependencies between BAM workflows.
> See also: [bam-index.csv](bam-index.csv), [section-reference-map.md](section-reference-map.md)

## Workflow Dependency Graph

```mermaid
graph TD
    %% Phase 1 - Analysis
    RI[Requirement Ingestion] --> MCT[Module Complexity Triage]

    %% Phase 3 - Foundation
    CMAR[Create Master Architecture] --> SF[Scaffold Foundation]
    SF --> VF[Validate Foundation]

    %% Phase 3 - Module Development (after foundation gate)
    VF --> DFC[Define Facade Contract]
    VF --> CMA[Create Module Architecture]
    CMA --> CME[Create Module Epics]
    CMA --> VM[Validate Module]

    %% Phase 4 - Implementation
    DFC --> EFC[Evolve Facade Contract]
    CME --> CMS[Cross-Module Story]
    CMS --> CV[Convergence Verification]

    %% Anytime workflows (no strict ordering)
    subgraph Anytime
        MBD[Module Boundary Design]
        TMI[Tenant Model Isolation]
        ARA[Agent Runtime Architecture]
        ICD[Internal Contract Design]
        LT[List Tools]
        MAEC[Master Architecture Emergency Change]
        FCMR[Facade Mismatch Recovery]
    end

    %% Standalone design workflows
    subgraph Design Phase
        AES[AI Eval Safety Design]
        VTC[Validate Tool Contract]
        AVR[API Version Release]
        TOD[Tenant Onboarding Design]
        TOFD[Tenant Offboarding Design]
        TAO[Tenant-Aware Observability]
        UMD[Usage Metering Design]
        AAD[AI Agent Debug]
    end
```

## Execution Phases

| Phase                      | Workflows                                                    | Gate                    |
| -------------------------- | ------------------------------------------------------------ | ----------------------- |
| 1-analysis                 | RI → MCT                                                     | —                       |
| 3-solutioning (foundation) | CMAR → SF → VF                                               | QG-M1 (Foundation Gate) |
| 3-solutioning (module)     | DFC, CMA → CME, CMA → VM, VTC, AVR, AES, TOD, TOFD, TAO, UMD | QG-M2, QG-M3            |
| 4-implementation           | EFC, CMS, AAD, CV                                            | QG-I2, QG-I3            |
| anytime                    | MBD, TMI, ARA, ICD, LT, MAEC, FCMR                           | —                       |

## Critical Path

The critical path for a new BAM project is:

1. **RI** → **MCT** (understand scope)
2. **CMAR** → **SF** → **VF** (establish foundation, pass QG-M1)
3. **DFC** + **CMA** (define contracts and module architecture in parallel)
4. **CME** → **VM** (create stories, validate module)
5. **CMS** → **CV** (cross-module integration, convergence verification)

## Gate Dependencies

- **QG-M1** (Foundation Gate): Must pass before CMA, CME, VM, DFC
- **QG-M2** (Tenant Isolation): Must pass before QG-I2
- **QG-M3** (Agent Runtime): Must pass before QG-I3
- **QG-I2** (Tenant Safety): Must pass before release
- **QG-I3** (Agent Safety): Must pass before release
- **QG-R1** (Production Readiness): Final release gate
