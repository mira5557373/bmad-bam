# Step 1: Feedback Collection Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Design the feedback collection mechanisms including rating types, UI integration, and per-tenant settings.

---

## Prerequisites

- Agent runtime architecture document loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Actions

### 1. Define Feedback Types

| Type | Format | Use Case |
|------|--------|----------|
| Binary | Thumbs up/down | Quick quality signal |
| Rating | 1-5 stars | Detailed satisfaction |
| Correction | Text edit | Response improvement |
| Flag | Category selection | Safety issues |
| Comment | Free text | Detailed feedback |

### 2. Design Collection UI

| Trigger | Placement | Timing |
|---------|-----------|--------|
| Auto-prompt | End of response | Always |
| User-initiated | Feedback button | On-demand |
| Periodic | Survey modal | Weekly |

### 3. Configure Tenant Settings

| Setting | Default | Configurable |
|---------|---------|--------------|
| Feedback Enabled | true | Yes |
| Collection Types | All | Yes |
| Auto-prompt Rate | 20% | Yes |
| Data Retention | 90 days | Enterprise |

**Verify current best practices with web search:**
Search the web: "LLM user feedback collection UX {date}"
Search the web: "RLHF feedback design patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into feedback types
- **P (Party Mode)**: Bring UX and ML perspectives
- **C (Continue)**: Accept collection design and proceed to analysis
```

#### If 'C' (Continue):
- Save feedback collection design to output document
- Proceed to next step: `step-02-c-feedback-analysis-pipeline.md`

---

## Verification

- [ ] Feedback types defined
- [ ] Collection UI designed
- [ ] Tenant settings configured

---

## Outputs

- Feedback types specification
- Collection UI design
- Tenant settings configuration

---

## Next Step

Proceed to `step-02-c-feedback-analysis-pipeline.md` to design analysis pipeline.
