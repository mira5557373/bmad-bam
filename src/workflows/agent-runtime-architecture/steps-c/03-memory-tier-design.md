# Step 3: Memory Tier Design

| Tier     | Scope                     | Storage      | Retention        |
| -------- | ------------------------- | ------------ | ---------------- |
| Session  | Single conversation       | Redis        | Session duration |
| User     | Per-user across sessions  | Mem0         | Configurable     |
| Tenant   | Shared within tenant      | Mem0 + Redis | Tenant lifecycle |
| Global   | Platform-wide             | Mem0         | Permanent        |
| Episodic | Event-triggered snapshots | PostgreSQL   | Configurable     |

Define isolation rules: tenant memory NEVER leaks to other tenants.
