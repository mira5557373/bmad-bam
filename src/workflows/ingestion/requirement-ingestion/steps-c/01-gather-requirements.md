# Step 1: Gather Requirements

Load and parse the source requirement documents:

- Identify the input feature catalog file (typically large markdown, 180K-330K characters)
- Verify file exists and is accessible
- Extract document structure (headings, sections, feature lists)
- Identify document format (structured markdown, user stories, specification format)

**Input validation:**
- File path provided and valid
- Document is parseable markdown
- Contains identifiable feature/requirement sections

**Output:** Parsed requirement document ready for categorization, stored in working memory.
