# Step 4: Design Security

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Design webhook security measures including HMAC signing, timestamp verification, secret rotation, and IP allowlisting.

---

## Prerequisites

- Retry logic configured (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `webhook-delivery`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-security`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design webhook security:

---

## HMAC Signature

| Aspect | Configuration |
|--------|---------------|
| Algorithm | HMAC-SHA256 |
| Header name | `X-Webhook-Signature` |
| Payload | Raw request body |
| Encoding | Hex-encoded signature |
| Format | `sha256={signature}` |

---

## Signature Generation

| Step | Action |
|------|--------|
| 1 | Retrieve tenant webhook secret |
| 2 | Create HMAC-SHA256 with secret as key |
| 3 | Sign the raw JSON payload (no modifications) |
| 4 | Encode result as hexadecimal string |
| 5 | Set header: `X-Webhook-Signature: sha256={hex_signature}` |

---

## Timestamp Verification

| Aspect | Configuration |
|--------|---------------|
| Header name | `X-Webhook-Timestamp` |
| Format | Unix timestamp (seconds) |
| Tolerance | 300 seconds (5 minutes) |
| Purpose | Prevent replay attacks |

---

## Signed Payload Format

Include timestamp in signed content:

| Component | Description |
|-----------|-------------|
| Timestamp | Unix timestamp from header |
| Payload | Raw JSON body |
| Signed string | `{timestamp}.{payload}` |
| Verification | Receiver validates: timestamp fresh + signature valid |

---

## Secret Management

| Aspect | Configuration |
|--------|---------------|
| Generation | 32-byte cryptographically random |
| Storage | Encrypted at rest (AES-256) |
| Display | Show once on creation, masked thereafter |
| Rotation | On-demand via API, automatic every 90 days |
| Dual secrets | Support two active secrets during rotation |

---

## Secret Rotation Procedure

| Step | Action | Duration |
|------|--------|----------|
| 1 | Generate new secret | Immediate |
| 2 | Mark old secret as secondary | Immediate |
| 3 | Sign with new secret | Start immediately |
| 4 | Include both signatures during transition | 24 hours |
| 5 | Revoke old secret | After transition window |
| 6 | Notify tenant of rotation | At each step |

---

## Dual Signature During Rotation

| Header | Value |
|--------|-------|
| `X-Webhook-Signature` | `sha256={new_signature}` |
| `X-Webhook-Signature-Old` | `sha256={old_signature}` |

---

## IP Allowlisting (Enterprise Tier)

| Aspect | Configuration |
|--------|---------------|
| Availability | Enterprise tier only |
| IP ranges | Configurable per webhook |
| Validation | Check source IP before delivery |
| Updates | Via API or dashboard |
| Notification | Alert on IP change attempts |

---

## Webhook Source IPs

| Region | IP Ranges |
|--------|-----------|
| US-East | `203.0.113.0/24` (example) |
| US-West | `198.51.100.0/24` (example) |
| EU-West | `192.0.2.0/24` (example) |
| AP-Southeast | `198.18.0.0/24` (example) |

---

## TLS Requirements

| Requirement | Specification |
|-------------|---------------|
| Protocol | TLS 1.2 or higher required |
| Certificate | Valid, non-expired certificate |
| Self-signed | Not accepted (Pro+Enterprise can override) |
| Verification | Full certificate chain validation |

---

## Security Headers Sent

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Webhook-Signature` | `sha256={signature}` | Payload verification |
| `X-Webhook-Timestamp` | Unix timestamp | Replay protection |
| `X-Webhook-ID` | Event UUID | Idempotency key |
| `User-Agent` | `PlatformName-Webhook/1.0` | Identification |
| `Content-Type` | `application/json` | Payload format |

**Verify current best practices with web search:**
Search the web: "webhook HMAC signature security {date}"
Search the web: "webhook security best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the security design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into security measures and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for security review
- **C (Continue)**: Accept security design and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass security context: HMAC, timestamps, rotation, IP allowlisting
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into security design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review webhook security: {summary of HMAC, rotation, TLS}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save security design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final webhook management specification
- Complete Create mode workflow

---

## Verification

- [ ] HMAC signature scheme defined
- [ ] Timestamp verification configured
- [ ] Secret management documented
- [ ] Secret rotation procedure complete
- [ ] IP allowlisting designed (enterprise)
- [ ] TLS requirements specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Webhook security specification
- HMAC implementation guide
- Secret rotation procedure

---

## Final Output

Generate the complete webhook management specification:
- `{output_folder}/planning-artifacts/integration/webhook-management-spec.md`

Include all sections:
1. Event catalog with payload schemas
2. Delivery system architecture
3. Retry logic and dead letter handling
4. Security measures and signing

---

## Next Step

Create workflow complete. Webhook management design ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

Create mode complete for webhook-management-design workflow.

Recommend running Validate mode to verify the generated specification against QG-I1 quality criteria.
