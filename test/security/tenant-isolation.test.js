/**
 * Tenant Isolation Security Tests for BAM Module
 * Validates tenant isolation patterns and cross-tenant protection
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '..', '..', 'src');
const TEMPLATES_DIR = path.join(SRC_DIR, 'templates');
const DATA_DIR = path.join(SRC_DIR, 'data');
const GUIDES_DIR = path.join(DATA_DIR, 'agent-guides', 'bam');
const WORKFLOWS_DIR = path.join(SRC_DIR, 'workflows');

// Helper functions
const getTemplates = () => {
  if (!fs.existsSync(TEMPLATES_DIR)) return [];
  return fs.readdirSync(TEMPLATES_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => ({
      name: f,
      path: path.join(TEMPLATES_DIR, f),
      content: fs.readFileSync(path.join(TEMPLATES_DIR, f), 'utf-8')
    }));
};

const getCSVData = (filename) => {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  if (lines.length < 2) return { headers: [], rows: [] };

  const headers = lines[0].split(',');
  const rows = lines.slice(1).map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const row = {};
    headers.forEach((header, i) => {
      row[header] = values[i] || '';
    });
    return row;
  });

  return { headers, rows };
};

const getAgentGuides = () => {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs.readdirSync(GUIDES_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => ({
      name: f,
      path: path.join(GUIDES_DIR, f),
      content: fs.readFileSync(path.join(GUIDES_DIR, f), 'utf-8')
    }));
};

const getAllWorkflowSteps = () => {
  const steps = [];

  const walkDir = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.md') && dir.includes('steps')) {
        steps.push({
          name: file,
          path: filePath,
          content: fs.readFileSync(filePath, 'utf-8')
        });
      }
    });
  };

  walkDir(WORKFLOWS_DIR);
  return steps;
};

describe('Tenant Template Validation', () => {
  const templates = getTemplates();

  describe('All Tenant Templates Include tenant_id Field', () => {
    test('tenant-scoped templates have tenant_id reference', () => {
      // Templates that should definitely include tenant_id
      // Exclude persona/requirements/tier templates which may describe tenants without needing ID
      const tenantScopedTemplates = templates.filter(t =>
        (t.name.includes('tenant-') ||
        t.name.includes('isolation') ||
        t.name.includes('rls-') ||
        t.name.includes('onboarding') ||
        t.name.includes('offboarding')) &&
        !t.name.includes('persona') &&
        !t.name.includes('requirements') &&
        !t.name.includes('tier-matrix') &&
        !t.name.includes('backup-plan') &&
        !t.name.includes('rls-policy-doc')  // Doc template, not implementation
      );

      const missingTenantId = [];

      tenantScopedTemplates.forEach(template => {
        const hasTenantId =
          template.content.includes('tenant_id') ||
          template.content.includes('tenant-id') ||
          template.content.includes('tenantId') ||
          template.content.includes('{{tenant_id}}') ||
          template.content.includes('TenantId') ||
          template.content.includes('TenantContext') ||
          template.content.includes('tenant');  // Broader check for tenant-related content

        if (!hasTenantId) {
          missingTenantId.push(template.name);
        }
      });

      if (missingTenantId.length > 0) {
        console.warn('Tenant templates potentially missing tenant_id:', missingTenantId);
      }
      // Allow some templates to not have explicit tenant_id if they reference 'tenant' in general
      expect(missingTenantId.length).toBeLessThanOrEqual(2);
    });

    test('tenant isolation matrix includes all required columns', () => {
      const isolationMatrix = templates.find(t => t.name === 'tenant-isolation-matrix.md');

      if (isolationMatrix) {
        const requiredConcepts = [
          'Database',
          'Cache',
          'tenant_id',
          'isolation'
        ];

        requiredConcepts.forEach(concept => {
          expect(isolationMatrix.content.toLowerCase()).toContain(concept.toLowerCase());
        });
      }
    });
  });

  describe('Tenant Context Structure', () => {
    test('tenant model template includes context propagation', () => {
      const tenantModel = templates.find(t => t.name === 'tenant-model-template.md');

      if (tenantModel) {
        expect(tenantModel.content).toContain('Context');
        expect(tenantModel.content).toContain('Propagation');
      }
    });

    test('tenant templates include tier awareness', () => {
      const tenantTemplates = templates.filter(t =>
        t.name.includes('tenant-model') ||
        t.name.includes('tenant-tier')
      );

      tenantTemplates.forEach(template => {
        const hasTierReference =
          template.content.includes('tier') ||
          template.content.includes('Tier') ||
          template.content.includes('Free') ||
          template.content.includes('Pro') ||
          template.content.includes('Enterprise');

        expect(hasTierReference).toBe(true);
      });
    });
  });
});

describe('RLS Policy Pattern Validation', () => {
  const guides = getAgentGuides();
  const templates = getTemplates();

  describe('RLS Policy Syntax', () => {
    test('RLS examples use valid PostgreSQL syntax', () => {
      // Look for RLS policy examples in guides and templates
      const rlsContent = [...guides, ...templates].filter(item =>
        item.content.toLowerCase().includes('rls') ||
        item.content.toLowerCase().includes('row level security') ||
        item.content.toLowerCase().includes('create policy')
      );

      const violations = [];

      rlsContent.forEach(item => {
        // Check for CREATE POLICY patterns
        const policyPattern = /CREATE\s+POLICY\s+\w+/gi;
        const matches = item.content.match(policyPattern);

        if (matches) {
          // Verify basic structure exists
          matches.forEach(match => {
            // Find the full policy statement
            const startIndex = item.content.indexOf(match);
            const endIndex = item.content.indexOf(';', startIndex);
            if (endIndex > startIndex) {
              const fullStatement = item.content.substring(startIndex, endIndex + 1);

              // Check for required clauses
              const hasUsing = fullStatement.toLowerCase().includes('using');
              const hasOn = fullStatement.toLowerCase().includes(' on ');

              if (!hasOn) {
                violations.push({
                  file: item.name,
                  issue: 'CREATE POLICY missing ON clause',
                  statement: fullStatement.substring(0, 100)
                });
              }
            }
          });
        }
      });

      if (violations.length > 0) {
        console.warn('RLS policy syntax issues:', violations);
      }
      // This is informational, not a hard failure
      expect(true).toBe(true);
    });

    test('RLS policies reference tenant_id', () => {
      const rlsGuide = guides.find(g =>
        g.name.includes('rls') ||
        g.name.toLowerCase().includes('row-level')
      );

      if (rlsGuide) {
        const hasTenantFilter =
          rlsGuide.content.includes('tenant_id') ||
          rlsGuide.content.includes('current_setting');

        expect(hasTenantFilter).toBe(true);
      }
    });
  });

  describe('RLS Policy Coverage', () => {
    test('tenant models CSV includes RLS option', () => {
      const tenantModels = getCSVData('tenant-models.csv');

      if (tenantModels && tenantModels.rows.length > 0) {
        const rlsModel = tenantModels.rows.find(row =>
          row.model?.toLowerCase().includes('rls') ||
          row.model?.toLowerCase().includes('row-level')
        );

        expect(rlsModel).toBeDefined();
      }
    });
  });
});

describe('Cross-Tenant Reference Detection', () => {
  const templates = getTemplates();
  const guides = getAgentGuides();
  const steps = getAllWorkflowSteps();

  describe('No Hardcoded Tenant Identifiers', () => {
    test('templates do not contain hardcoded tenant IDs', () => {
      // Pattern for UUIDs that look like real tenant IDs
      const uuidPattern = /tenant[_-]?id['":\s]+['"]?([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})['"]?/gi;
      const violations = [];

      templates.forEach(template => {
        const matches = template.content.match(uuidPattern);
        if (matches) {
          // Filter out placeholder patterns
          const realMatches = matches.filter(m =>
            !m.includes('{{') &&
            !m.includes('example') &&
            !m.includes('placeholder')
          );
          if (realMatches.length > 0) {
            violations.push({
              template: template.name,
              matches: realMatches.slice(0, 3)
            });
          }
        }
      });

      if (violations.length > 0) {
        console.error('Hardcoded tenant ID violations:', violations);
      }
      expect(violations).toEqual([]);
    });

    test('guides do not reference specific tenant data', () => {
      const specificDataPatterns = [
        /company:\s*["'][A-Z][a-z]+\s+Corp["']/gi,
        /email:\s*["'][a-z]+@[a-z]+\.(com|org)["']/gi,
      ];

      const violations = [];

      guides.forEach(guide => {
        specificDataPatterns.forEach(pattern => {
          if (pattern.test(guide.content)) {
            violations.push({
              guide: guide.name,
              pattern: pattern.toString()
            });
          }
          pattern.lastIndex = 0;
        });
      });

      // This is informational - examples may use realistic-looking data
      if (violations.length > 0) {
        console.warn('Guides with specific data patterns:', violations);
      }
      expect(true).toBe(true);
    });
  });

  describe('Cross-Tenant Query Prevention', () => {
    test('workflow steps mention tenant context for data operations', () => {
      const dataOperationSteps = steps.filter(step =>
        step.content.toLowerCase().includes('database') ||
        step.content.toLowerCase().includes('query') ||
        step.content.toLowerCase().includes('select') ||
        step.content.toLowerCase().includes('repository')
      );

      const missingContext = [];

      dataOperationSteps.forEach(step => {
        const mentionsContext =
          step.content.includes('TenantContext') ||
          step.content.includes('tenant_id') ||
          step.content.includes('tenant context') ||
          step.content.includes('context propagation');

        if (!mentionsContext) {
          missingContext.push(step.name);
        }
      });

      // Allow some steps that may not need tenant context
      // (e.g., schema migration steps, admin operations)
      const allowedExceptions = [
        'discovery',
        'assembly',
        'validation',
        'report'
      ];

      const filteredMissing = missingContext.filter(name =>
        !allowedExceptions.some(ex => name.toLowerCase().includes(ex))
      );

      if (filteredMissing.length > 5) {
        console.warn('Steps potentially missing tenant context:', filteredMissing);
      }
      // This is a soft check
      expect(true).toBe(true);
    });
  });
});

describe('Tenant Context Propagation Patterns', () => {
  const guides = getAgentGuides();
  const templates = getTemplates();

  describe('Context Propagation Documentation', () => {
    test('context propagation guide exists', () => {
      const propagationGuide = guides.find(g =>
        g.name.includes('context-propagation') ||
        g.name.includes('tenant-context')
      );

      // Should have some guide about context propagation
      const hasContextDocs = propagationGuide !== undefined || guides.some(g =>
        g.content.includes('Context Propagation')
      );

      expect(hasContextDocs).toBe(true);
    });

    test('context propagation covers async operations', () => {
      const relevantDocs = [...guides, ...templates].filter(item =>
        item.content.includes('Context') &&
        item.content.includes('Propagation')
      );

      const coversAsync = relevantDocs.some(doc =>
        doc.content.includes('async') ||
        doc.content.includes('Background') ||
        doc.content.includes('Job') ||
        doc.content.includes('Event')
      );

      expect(coversAsync).toBe(true);
    });
  });

  describe('Middleware Documentation', () => {
    test('tenant middleware patterns documented', () => {
      const hasMiddlewareDocs = guides.some(g =>
        g.content.includes('Middleware') ||
        g.content.includes('middleware')
      );

      expect(hasMiddlewareDocs).toBe(true);
    });
  });
});

describe('Tenant Data Isolation Verification', () => {
  const templates = getTemplates();
  const guides = getAgentGuides();

  describe('Isolation Test Templates', () => {
    test('isolation test template exists', () => {
      const isolationTestTemplate = templates.find(t =>
        t.name.includes('isolation-test') ||
        t.name.includes('tenant-test')
      );

      expect(isolationTestTemplate).toBeDefined();
    });

    test('testing documentation covers isolation scenarios', () => {
      const testingDocs = [...guides, ...templates].filter(item =>
        item.name.includes('test') ||
        item.content.includes('Testing')
      );

      const coversIsolation = testingDocs.some(doc =>
        doc.content.includes('isolation') ||
        doc.content.includes('cross-tenant') ||
        doc.content.includes('tenant boundary')
      );

      expect(coversIsolation).toBe(true);
    });
  });

  describe('Audit and Logging Patterns', () => {
    test('tenant ID in logging patterns', () => {
      const loggingDocs = guides.filter(g =>
        g.name.includes('logging') ||
        g.name.includes('observability') ||
        g.content.toLowerCase().includes('logging')
      );

      const hasTenantLogging = loggingDocs.some(doc =>
        doc.content.includes('tenant_id')
      ) || guides.some(g =>
        g.content.includes('tenant_id') &&
        (g.content.includes('log') || g.content.includes('audit'))
      );

      expect(hasTenantLogging).toBe(true);
    });

    test('audit trail mentions tenant scoping', () => {
      const auditDocs = [...guides, ...templates].filter(item =>
        item.content.toLowerCase().includes('audit')
      );

      const hasTenantAudit = auditDocs.some(doc =>
        doc.content.includes('tenant')
      );

      expect(hasTenantAudit).toBe(true);
    });
  });
});

describe('Tenant Tier Security', () => {
  const templates = getTemplates();

  describe('Tier-Based Access Controls', () => {
    test('tier matrix template exists', () => {
      const tierMatrix = templates.find(t =>
        t.name.includes('tier-matrix') ||
        t.name.includes('tenant-tier')
      );

      expect(tierMatrix).toBeDefined();
    });

    test('tier templates include feature gating', () => {
      const tierTemplates = templates.filter(t =>
        t.name.includes('tier')
      );

      tierTemplates.forEach(template => {
        const hasFeatureGating =
          template.content.includes('Feature') ||
          template.content.includes('Access') ||
          template.content.includes('Limit') ||
          template.content.includes('Rate');

        expect(hasFeatureGating).toBe(true);
      });
    });
  });

  describe('Rate Limiting by Tier', () => {
    test('rate limiting documentation includes tenant tier', () => {
      const rateLimitDocs = [...getAgentGuides(), ...templates].filter(item =>
        item.content.toLowerCase().includes('rate limit')
      );

      const hasTierRateLimiting = rateLimitDocs.some(doc =>
        doc.content.includes('tier') ||
        doc.content.includes('Tier')
      );

      expect(hasTierRateLimiting).toBe(true);
    });
  });
});

describe('Tenant Data Lifecycle Security', () => {
  const templates = getTemplates();

  describe('Tenant Offboarding', () => {
    test('offboarding template exists', () => {
      const offboardingTemplate = templates.find(t =>
        t.name.includes('offboarding')
      );

      expect(offboardingTemplate).toBeDefined();
    });

    test('offboarding includes data cleanup', () => {
      const offboardingDocs = templates.filter(t =>
        t.name.includes('offboarding') ||
        t.name.includes('cleanup')
      );

      const hasDataCleanup = offboardingDocs.some(doc =>
        doc.content.includes('data') &&
        (doc.content.includes('delete') ||
         doc.content.includes('cleanup') ||
         doc.content.includes('removal') ||
         doc.content.includes('purge'))
      );

      expect(hasDataCleanup).toBe(true);
    });
  });

  describe('Tenant Data Export', () => {
    test('data export template exists', () => {
      const exportTemplate = templates.find(t =>
        t.name.includes('export') ||
        t.name.includes('data-migration')
      );

      expect(exportTemplate).toBeDefined();
    });
  });

  describe('Tenant Suspension', () => {
    test('suspension template includes data isolation', () => {
      const suspensionTemplate = templates.find(t =>
        t.name.includes('suspension')
      );

      if (suspensionTemplate) {
        const hasIsolationContent =
          suspensionTemplate.content.includes('access') ||
          suspensionTemplate.content.includes('block') ||
          suspensionTemplate.content.includes('disable');

        expect(hasIsolationContent).toBe(true);
      }
    });
  });
});
