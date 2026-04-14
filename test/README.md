# BAM Test Suite

This directory contains comprehensive tests for the BAM (BMAD Agentic Multi-tenant) extension module.

## Test Suite Overview

The BAM test suite validates:

- **Schema validation** - YAML structure and BMAD pattern compliance
- **Extension integration** - WDS pattern compliance and base agent compatibility
- **Workflow structure** - CEV mode support, step sequences, and manifest validation
- **Security** - Prompt injection prevention, tenant isolation patterns
- **Integration** - Cross-component compatibility and workflow execution

## Directory Structure

```
test/
├── bmad-compat.test.js       # BMAD Method compatibility tests
├── checklist-format.test.js  # Quality gate checklist validation
├── data-schema.test.js       # CSV and pattern registry validation
├── extension.test.js         # Extension format and WDS pattern tests
├── guide-structure.test.js   # Agent guide structure validation
├── install.test.js           # BMB installer compatibility tests
├── integration.test.js       # Cross-module integration tests
├── schema.test.js            # YAML schema validation
├── structure.test.js         # Directory and file structure tests
├── template-variables.test.js # Template placeholder validation
├── tsa-sync.test.js          # TSA module synchronization tests
├── web-search.test.js        # Web search directive validation
├── workflow.test.js          # Workflow structure and CEV validation
├── security/
│   ├── prompt-injection.test.js  # Prompt injection prevention tests
│   └── tenant-isolation.test.js  # Tenant isolation pattern tests
└── integration/
    └── workflow-execution.test.js # Workflow execution integration tests
```

## How to Run Tests

### Run All Tests

```bash
npm test
```

### Run Specific Test Categories

```bash
# Schema validation
npm run test:schema

# Workflow validation
npm run test:workflow

# Installation compatibility
npm run test:install

# Extension validation
npm run test:extension

# Integration tests
npm run test:integration

# Security tests
npm run test:security

# Workflow execution tests
npm run test:workflow-execution
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

### Run Tests with Verbose Output

```bash
npm test -- --verbose
```

### Run a Single Test File

```bash
npm test -- test/schema.test.js
npm test -- test/security/prompt-injection.test.js
```

## Test Categories Explained

### Schema Tests (`schema.test.js`)

Validates YAML structure against BMAD patterns:
- Agent manifests have required fields
- Extensions follow WDS pattern (no `memories:` field)
- Module configuration is valid
- CSV help entries are properly formatted

### Extension Tests (`extension.test.js`)

Validates extension integration:
- All extensions have context loading menu items
- Extensions reference agent guides in prompts
- Menu item triggers are unique across extensions
- Prompts have id and content fields
- Menu actions reference existing prompts

### Workflow Tests (`workflow.test.js`)

Validates workflow structure:
- CEV (Create/Edit/Validate) mode support
- Step file naming convention (`step-NN-mode-description.md`)
- Manifest required fields and structure
- SKILL.md presence and frontmatter

### Security Tests

#### Prompt Injection (`security/prompt-injection.test.js`)

Validates content sanitization:
- No script tags in extension prompts
- No SQL injection patterns
- No shell command injection
- No executable code without warnings in guides
- No sensitive data patterns (API keys, passwords)
- Template variable escaping
- No prototype pollution patterns

#### Tenant Isolation (`security/tenant-isolation.test.js`)

Validates isolation patterns:
- Tenant templates include tenant_id field references
- RLS policy patterns use valid SQL syntax
- No hardcoded tenant identifiers
- Context propagation documentation exists
- Cross-tenant query prevention patterns
- Tier-based access controls documented

### Integration Tests

#### Workflow Execution (`integration/workflow-execution.test.js`)

Validates workflow execution patterns:
- Create mode steps follow sequential order (01-09/10)
- Edit mode steps use range (10-19)
- Validate mode steps use range (20-29)
- Mode transition documentation
- Prerequisites documentation
- Output template references
- Manifest and SKILL.md structure

## Test Naming Conventions

Tests follow these naming patterns:

- **describe blocks**: Noun phrases describing the component or feature
- **test blocks**: Sentences starting with action verbs (validates, checks, ensures)

Example:
```javascript
describe('Extension Format', () => {
  test('all extensions follow WDS pattern (no memories field)', () => {
    // ...
  });
});
```

## Coverage Expectations

| Category | Expected Coverage |
|----------|------------------|
| Extensions | 100% of YAML structure |
| Workflows | 100% of manifest/skill files |
| Templates | Tenant-related templates |
| Security | Critical injection patterns |
| Guides | Structure and required sections |

## CI/CD Integration

### GitHub Actions

The test suite is designed to run in CI environments:

```yaml
# Example workflow step
- name: Run Tests
  run: npm test
```

### Test Results

Tests output results in standard Jest format:
- Pass/fail counts
- Failed test details with file locations
- Console warnings for informational checks

### Exit Codes

- `0` - All tests passed
- `1` - One or more tests failed

## Adding New Tests

### 1. Create Test File

Place test files in the appropriate directory:
- Security tests: `test/security/`
- Integration tests: `test/integration/`
- Component tests: `test/`

### 2. Follow Test Structure

```javascript
/**
 * Brief description of what this test file validates
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '..', 'src');

// Helper functions
const getComponents = () => {
  // Return array of components to test
};

describe('Component Category', () => {
  describe('Subcategory', () => {
    test('specific validation', () => {
      // Test implementation
      expect(actual).toBe(expected);
    });
  });
});
```

### 3. Add to package.json (if new category)

```json
{
  "scripts": {
    "test:newcategory": "jest test/newcategory.test.js"
  }
}
```

## Troubleshooting

### Tests Fail Due to Missing Files

Ensure the `src/` directory structure is complete:
```bash
ls -la src/
ls -la src/extensions/
ls -la src/workflows/
```

### YAML Parse Errors

Validate YAML syntax:
```bash
npm run lint
```

### Test Timeouts

Increase Jest timeout for large file operations:
```javascript
jest.setTimeout(30000); // 30 seconds
```

## Related Documentation

- [CLAUDE.md](../CLAUDE.md) - Module development guidelines
- [src/workflows/module.yaml](../src/workflows/module.yaml) - Module configuration
- [src/workflows/module-help.csv](../src/workflows/module-help.csv) - Help system entries
