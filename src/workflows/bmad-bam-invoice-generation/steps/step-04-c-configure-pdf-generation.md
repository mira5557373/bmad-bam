# Step 4: Configure PDF Generation Pipeline

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

Design the PDF invoice generation pipeline including template management, rendering, and storage.

---

## Prerequisites

- Invoice scheduling designed (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: document-generation
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: storage-patterns

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Template Structure

| Template Section | Content | Dynamic Elements |
|------------------|---------|------------------|
| Header | Logo, company info | Tenant branding option |
| Invoice details | Numbers, dates, addresses | All dynamic |
| Line items | Usage breakdown | Dynamic rows |
| Summary | Subtotal, tax, total | Calculated |
| Footer | Payment terms, notes | Configurable |

### 2. Configure Rendering Engine

| Component | Technology | Purpose |
|-----------|------------|---------|
| Template engine | Handlebars/Jinja | Dynamic content |
| HTML renderer | Puppeteer/WeasyPrint | HTML to PDF |
| Font handling | Embedded fonts | Consistent rendering |
| Image processing | Optimized assets | Logo/graphics |

### 3. Define Localization Support

| Locale Aspect | Configuration |
|---------------|---------------|
| Language | Tenant preference or billing country |
| Number format | Locale-specific (1,234.56 vs 1.234,56) |
| Date format | ISO or locale-specific |
| Currency display | Symbol and position |
| Tax labels | Country-specific terminology |

### 4. Configure Storage Strategy

| Storage Type | Location | Retention |
|--------------|----------|-----------|
| Draft PDFs | Temporary storage | 7 days |
| Finalized PDFs | Permanent archive | 7+ years |
| Template versions | Version control | Indefinite |
| Audit copies | Compliance archive | Per regulation |

### 5. Define Quality Assurance

| Check | Implementation | Failure Action |
|-------|----------------|----------------|
| PDF validity | PDF/A validation | Regenerate |
| Content accuracy | Checksum verification | Alert |
| File size | Max 10MB limit | Optimize images |
| Accessibility | PDF/UA compliance | Optional flag |

### 6. Configure Performance Optimization

| Optimization | Technique | Benefit |
|--------------|-----------|---------|
| Parallel rendering | Worker pool | Throughput |
| Template caching | In-memory cache | Speed |
| Asset CDN | Pre-loaded assets | Latency |
| Batch processing | Queue batching | Efficiency |

**Verify current best practices with web search:**
Search the web: "PDF invoice generation at scale best practices {date}"
Search the web: "invoice PDF accessibility compliance {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the PDF generation configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into PDF architecture using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for rendering analysis
- **C (Continue)**: Accept PDF configuration and proceed to delivery design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass PDF context: templates, rendering, storage
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into PDF summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review PDF generation for invoice generation: {summary of templates and rendering}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save PDF configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-10-e-load-existing.md` (Edit mode) or validation

---

## Soft Gate Checkpoint

**Steps 1-4 complete the invoice generation pipeline design.**

Present summary of:
- Invoice schema and line item structure
- Usage aggregation and mapping
- Scheduling and retry logic
- PDF generation pipeline

Ask for confirmation before proceeding to Edit or Validate modes.

---

## Verification

- [ ] Template structure covers all invoice sections
- [ ] Rendering engine selected with rationale
- [ ] Multi-language and locale support configured
- [ ] Storage strategy meets retention requirements
- [ ] Quality assurance checks defined
- [ ] Performance optimizations specified
- [ ] Patterns align with pattern registry

---

## Outputs

- PDF generation pipeline specification
- Template requirements document
- Storage and retention policy
- **Load template:** `{project-root}/_bmad/bam/data/templates/invoice-generation-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/invoice-automation-template.md`

---

## Next Step

Create mode complete. Proceed to Edit mode (`step-10-e-load-existing.md`) for modifications or Validate mode (`step-20-v-load-artifact.md`) for quality checks.
