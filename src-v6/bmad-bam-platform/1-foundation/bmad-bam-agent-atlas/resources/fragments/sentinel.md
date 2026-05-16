---
id: sentinel
title: Wave 0 Sentinel Fragment
category: wave-0
kind: fragment
qg_ref: null
last_reviewed: 2026-05-11
version: 0.1.0
status: experimental
author: atlas
references: []
tested_against: []
---

# Wave 0 Sentinel Fragment

This fragment exists solely so the post-install hook can synthesize a `project-context.md` containing a `BAM_LOAD_VERIFY_<uuid>` token that the smoke-test workflow can detect downstream.

## Sentinel marker

The actual sentinel token is injected at install time by `scripts/post-install.sh`, not stored in this fragment. This file is the *anchor* — it tells the synthesis script what content to wrap the sentinel in.

## After Wave 0

This fragment is retired (status: superseded) once Wave 0 selects a plan. The `bmad-bam-platform` module's real fragments arrive in P2.
