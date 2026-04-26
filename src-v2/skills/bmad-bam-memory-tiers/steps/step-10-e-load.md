# Step 10: Load Existing Memory Tier Design (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and review existing memory tier design for modification
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Parse existing document structure
- 🚫 Do NOT: Apply modifications (that's Step 11)
- 🔍 Use web search: Not required (loading step)
- ⚠️ Note: Identify sections that may need updates based on new requirements

---

## Purpose

Load and review existing memory tier design documents to identify sections requiring modification. Present current state to user for modification targeting.

---

## Prerequisites

- Existing memory tier design document exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: memory-tiers

---

## Actions

### 1. Load Existing Documents

Load the existing memory tier design:

```
{output_folder}/planning-artifacts/ai/memory-tiers-design.md
```

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current document:

| Section | Status | Key Configuration |
|---------|--------|-------------------|
| Session Memory | YES/NO | {{session_config}} |
| Conversation Memory | YES/NO | {{conversation_config}} |
| Tenant Memory | YES/NO | {{tenant_config}} |
| Global Memory | YES/NO | {{global_config}} |
| Vector Store | YES/NO | {{vector_db}} |
| Isolation | YES/NO | {{isolation_method}} |
| Compliance | YES/NO | {{compliance_frameworks}} |

### 3. Identify Current Memory Tiers

Display current memory tier configuration:

| Tier | Storage | TTL | Isolation |
|------|---------|-----|-----------|
| Session | {{storage}} | {{ttl}} | {{isolation}} |
| Conversation | {{storage}} | {{ttl}} | {{isolation}} |
| Working | {{storage}} | {{ttl}} | {{isolation}} |
| Tenant | {{storage}} | {{ttl}} | {{isolation}} |
| Global | {{storage}} | {{ttl}} | {{isolation}} |

### 4. Review Vector Store Configuration

Display current vector store settings:

| Attribute | Current Value |
|-----------|---------------|
| Vector DB | {{vector_db}} |
| Embedding Model | {{embedding_model}} |
| Dimensions | {{dimensions}} |
| Tenant Isolation | {{tenant_isolation}} |

### 5. Identify Potential Update Areas

Based on current best practices, identify areas that may need updates:

| Area | Current State | Potential Update | Priority |
|------|---------------|------------------|----------|
| Context Window | {{current}} | {{potential}} | {{priority}} |
| Compression | {{current}} | {{potential}} | {{priority}} |
| TTL Policies | {{current}} | {{potential}} | {{priority}} |
| Isolation Method | {{current}} | {{potential}} | {{priority}} |

### 6. Collect Modification Targets

Ask user which sections need modification:

```
Available sections for modification:
1. Session Memory Configuration
2. Conversation Memory Configuration
3. Tenant Memory Configuration
4. Global Memory Configuration
5. Vector Store Architecture
6. Context Window Management
7. TTL and Eviction Policies
8. Memory Compression
9. Isolation Verification
10. Compliance Features
11. Implementation Roadmap

Enter section numbers to modify (comma-separated) or describe changes:
```

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing document, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific memory tier sections
- **P (Party Mode)**: Bring architect perspectives on proposed changes
- **C (Continue)**: Proceed to apply modifications
- **[Section numbers]**: Specify which sections to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current document state, proposed modifications
- Process enhanced insights on change impact
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review proposed modifications to memory tier design"
- Present synthesized recommendations from Atlas (Platform), Nova (AI Runtime)
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply.md`

---

## Verification

- [ ] Existing document loaded successfully
- [ ] Document structure parsed
- [ ] Current memory tier configuration displayed
- [ ] Vector store settings reviewed
- [ ] Modification targets identified
- [ ] User confirmed sections to modify

---

## Outputs

- Summary of current memory tier design state
- List of sections identified for modification
- Modification scope confirmation

---

## Next Step

Proceed to `step-11-e-apply.md` with identified modifications.
