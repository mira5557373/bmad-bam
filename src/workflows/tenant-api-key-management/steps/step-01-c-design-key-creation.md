# Step 1: Design Key Creation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Design secure API key generation, format, and storage patterns.

---

## Prerequisites

- Master architecture defined with authentication strategy
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: encryption-key-management`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`

---

## Actions

### 1. Define Key Format

Design the API key structure:

| Component | Format | Purpose |
|-----------|--------|---------|
| Prefix | `sk_live_` / `sk_test_` | Environment identification |
| Version | `v1_` | Key format version |
| Tenant ID | Base62 encoded | Tenant binding |
| Random | 32 bytes entropy | Uniqueness |
| Checksum | CRC32 last 4 chars | Validation |

Example: `sk_live_v1_t9Xk2mN_7h3KpLmN2xY9vB4wQ8rT1uI6oP3sA5dF0gH_a1b2`

### 2. Cryptographic Requirements

Specify generation security:

| Requirement | Specification |
|-------------|---------------|
| Entropy source | CSPRNG (crypto.randomBytes) |
| Minimum entropy | 256 bits |
| Hash algorithm | SHA-256 for storage |
| Salt | Per-key unique salt |
| Key derivation | PBKDF2 or Argon2 |

### 3. Storage Pattern

Define secure storage:

| Storage Type | What's Stored | Purpose |
|--------------|---------------|---------|
| Database | Hashed key + salt | Verification |
| Memory/Cache | Never | Security |
| Logs | Masked (first/last 4 chars) | Audit |
| Display | Once at creation only | User copy |

### 4. Key Metadata

Define key attributes:

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | Yes | Internal identifier |
| name | String | Yes | User-friendly name |
| description | String | No | Usage description |
| tenant_id | UUID | Yes | Owning tenant |
| scopes | Array | Yes | Permission scopes |
| expires_at | DateTime | No | Expiration time |
| created_at | DateTime | Yes | Creation timestamp |
| created_by | UUID | Yes | Creating user |
| last_used_at | DateTime | No | Last usage time |
| ip_allowlist | Array | No | Allowed IPs |

### 5. Scope/Permission Binding

Define scope structure:

| Scope Level | Example | Description |
|-------------|---------|-------------|
| Resource | `agents:*` | All agent operations |
| Action | `agents:read` | Read-only agents |
| Instance | `agents:abc123:*` | Specific agent |
| Combined | `agents:read,memory:write` | Multiple scopes |

**Verify current best practices with web search:**
Search the web: "API key generation security best practices {date}"
Search the web: "secure API key storage patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the key creation design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into cryptographic requirements and edge cases
- **P (Party Mode)**: Bring security and architect perspectives for design review
- **C (Continue)**: Accept key creation design and proceed to rotation policies
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass design context: key format, crypto requirements, storage patterns
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into key creation design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review API key creation: {summary of format and security}"
- Process collaborative analysis from security and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save key creation design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-key-rotation.md`

---

## Verification

- [ ] Key format defined with all components
- [ ] Cryptographic requirements specified
- [ ] Storage pattern follows security best practices
- [ ] Metadata attributes complete
- [ ] Scope binding mechanism defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Key format specification
- Cryptographic requirements
- Storage pattern design
- Metadata schema
- Scope binding rules
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-api-key-management-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/api-key-lifecycle-template.md`

---

## Next Step

Proceed to `step-02-c-design-key-rotation.md` to define rotation policies.
