# Step 3: Result Handling Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- ⏸️ ALWAYS pause after presenting findings and await user direction

---

## Purpose

Design result aggregation, notification delivery, and error handling for completed batch jobs.

## Prerequisites

- Steps 1-2 (Job Queue Design, Execution Engine) completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-batch

---

## Actions

### 1. Design Result Aggregation

| Aggregation | Storage | Retention |
|-------------|---------|-----------|
| Individual results | S3/Blob | 7 days |
| Summary statistics | PostgreSQL | 90 days |
| Error details | Logs | 30 days |

### 2. Configure Notification Delivery

| Channel | Trigger | Content |
|---------|---------|---------|
| Webhook | Job complete | Results URL |
| Email | Large job complete | Summary + link |
| In-app | Any completion | Status update |

### 3. Design Error Handling

| Error Type | Handling | Retry |
|------------|----------|-------|
| Transient | Auto-retry | 3 times |
| Rate limit | Backoff | 5 times |
| Permanent | Mark failed | No |
| Partial | Return partial results | Report failures |

**Verify current best practices with web search:**
Search the web: "batch job result handling patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Accept result handling and complete Create mode
```

---

## Verification

- [ ] Result aggregation designed
- [ ] Notification delivery configured
- [ ] Error handling defined

---

## Outputs

- **Output to:** `{output_folder}/planning-artifacts/architecture/ai-batch-inference-design.md`

---

## Next Step

Create mode complete.
