# Step 1: Discovery

## Purpose

Gather all existing inputs and context before making architecture decisions. This step ensures the architecture is built on a complete understanding of product requirements, existing technology decisions, and organizational constraints. Discovery prevents rework by identifying gaps early.

## Actions

1. **Load Available Inputs**
   - Locate and review Product Brief or PRD if available
   - Load TSA `tech-radar.yaml` for technology adoption status
   - Load TSA `tsa-versions.yaml` for version constraints
   - Gather any existing architecture documents or diagrams
   - Review domain model documentation if present
   - Collect non-functional requirements (scale, latency, compliance)

2. **Analyze Input Quality**
   - Assess completeness of product requirements
   - Identify missing stakeholder input
   - Flag conflicting requirements
   - Note areas requiring clarification
   - Evaluate existing architecture decisions for relevance

3. **Identify Gaps**
   - Document missing requirements critical for architecture
   - List technology decisions not yet made
   - Identify integration points without documentation
   - Note compliance requirements not addressed
   - Flag performance targets not defined

4. **Confirm Scope (Interactive Mode)**
   - If not running headless, present discovery findings to user
   - Review identified gaps and confirm priority
   - Agree on assumptions for missing information
   - Confirm scope boundaries for architecture work
   - Establish decision-making authority for unresolved items

## Outputs

- Discovery summary document
- Gap analysis with prioritized items
- Confirmed scope statement
- Assumptions log with rationale
- Input document inventory

## Questions to Consider

- Are product requirements stable or likely to change significantly?
- What technology decisions are already locked vs. open for discussion?
- Who are the stakeholders for architecture decisions?
- What is the timeline pressure affecting architectural choices?
- Are there existing systems to integrate or replace?
