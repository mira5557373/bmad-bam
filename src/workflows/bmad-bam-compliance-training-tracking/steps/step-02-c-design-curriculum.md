# Step 2: Design Training Curriculum

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

Design training curriculum including course catalog, learning paths, content structure, and certification requirements.

## Prerequisites

- Training requirements identified (Step 1 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Actions

### 1. Design Course Catalog

| Course ID | Course Name | Duration | Target Audience | Framework |
|-----------|-------------|----------|-----------------|-----------|
| SEC-101 | Security Awareness Fundamentals | 60 min | All employees | All |
| SEC-201 | Advanced Security for IT | 120 min | IT staff | SOC 2 |
| PRIV-101 | Data Privacy Essentials | 45 min | All employees | GDPR |
| HIPAA-101 | HIPAA for Healthcare | 90 min | Healthcare roles | HIPAA |
| PCI-101 | Payment Card Security | 60 min | Payment handlers | PCI DSS |

### 2. Define Learning Paths

| Role | Required Path | Elective Courses | Total Hours |
|------|---------------|------------------|-------------|
| New hire | SEC-101, PRIV-101, Code of Conduct | Role-specific | 3-4 hours |
| Developer | SEC-101, DEV-201 (Secure coding) | OWASP, API security | 6-8 hours |
| Support | SEC-101, PRIV-101, CUST-201 | Incident handling | 4-5 hours |
| Manager | SEC-101, MGR-201 (Risk mgmt) | Leadership security | 4-5 hours |

### 3. Define Content Structure

| Course Component | Purpose | Duration |
|------------------|---------|----------|
| Introduction video | Engage, set context | 5-10 min |
| Core modules | Deliver knowledge | 30-60 min |
| Interactive scenarios | Apply learning | 10-20 min |
| Knowledge check | Verify understanding | 10-15 min |
| Resources | Reference materials | Self-paced |

### 4. Design Certification Tracking

| Certification | Requirements | Validity | Renewal |
|---------------|--------------|----------|---------|
| Security Certified | SEC-101 + 80% quiz | 12 months | Re-take quiz |
| Privacy Certified | PRIV-101 + 80% quiz | 12 months | Re-take quiz |
| Developer Security | DEV-201 + practical | 12 months | New practical |

**Verify current best practices with web search:**
Search the web: "compliance training curriculum design {date}"
Search the web: "security awareness training best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### [A] Analyse - Curriculum Analysis
- **A1**: Analyze course coverage gaps
- **A2**: Evaluate learning path effectiveness
- **A3**: Assess content engagement strategies
- **A4**: Review certification value

### [P] Propose - Curriculum Recommendations
- **P1**: Propose microlearning integration
- **P2**: Suggest gamification elements
- **P3**: Recommend content update cadence
- **P4**: Propose multi-language support

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 3 (Design Tracking) - load `step-03-c-design-tracking.md`
- **C2**: Return to workflow overview
- **C3**: Export current curriculum design

---

## Verification

- [ ] Course catalog designed
- [ ] Learning paths defined
- [ ] Content structure specified
- [ ] Certification tracking designed
- [ ] Patterns align with pattern registry

## Outputs

- Course catalog
- Learning paths per role
- Content structure template
- Certification requirements

## Next Step

Proceed to `step-03-c-design-tracking.md` to design tracking system.
