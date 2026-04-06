# Step 2: Categorize by Domain

Apply domain-driven design principles to categorize requirements:

- Identify bounded contexts from requirement clusters
- Group related features by domain area (e.g., tenant management, AI runtime, billing)
- Detect ubiquitous language patterns within each domain
- Mark ambiguous requirements that span multiple domains

**Categorization criteria:**
1. **Data ownership:** Which entity types does this requirement affect?
2. **Business capability:** What business function does this enable?
3. **User persona:** Which user role is the primary beneficiary?
4. **Technical domain:** Infrastructure, application, or cross-cutting?

**Output:** Requirements organized by domain categories with initial boundary markers.

Store categorized requirements in `{output_folder}/planning-artifacts/features/by-domain/`.
