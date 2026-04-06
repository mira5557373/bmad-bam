# Step 1: Load Artifact

## Purpose

This step loads the AI Agent Debug Report artifact for validation. The debug report captures diagnostic information about agent behavior, failure modes, and resolution strategies that have been applied during debugging sessions.

## Artifact Location

Load the existing debug report from `{output_folder}/planning-artifacts/debug/agent-debug-report.md`.

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- The file exists at the specified path
- The file is readable and not corrupted
- The file contains valid markdown structure
- Required sections are present in the document

## Expected Artifact Structure

The debug report should contain these required sections:
- Debug Session Summary with timestamp and scope
- Agent Identification and configuration details
- Observed Behavior describing the issue
- Root Cause Analysis with findings
- Resolution Steps applied or recommended
- Verification Results confirming the fix

## Error Handling Guidance

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If the file exists but is malformed or missing required sections, report the specific structural issues found and allow the user to decide whether to proceed with partial validation or abort.

## Next Step

Once the artifact is successfully loaded and initial structure is confirmed, proceed to Step 2: Validate Artifact to perform detailed quality criteria checks.
