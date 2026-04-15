# Step 1: Load Existing Security Baseline

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- PAUSE **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

Load the existing security baseline for modification.

## Prerequisites

- Existing baseline document
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Load Document

Load: `{output_folder}/planning-artifacts/security-baseline-config.md`

### 2-4. Parse, Identify, Confirm

---

## COLLABORATION MENUS (A/P/C)

### [C]ontinue
- **C1**: Accept modification scope
- **C2**: Load `step-11-e-apply-baseline-changes.md`

---

## Verification

- [ ] Document loaded
- [ ] Scope confirmed

## Outputs

- Summary and confirmed sections

## Next Step

Proceed to `step-11-e-apply-baseline-changes.md`.
