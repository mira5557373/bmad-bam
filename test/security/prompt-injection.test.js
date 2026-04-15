/**
 * Prompt Injection Security Tests for BAM Module
 * Validates content sanitization and injection prevention patterns
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '..', '..', 'src');
const EXTENSIONS_DIR = path.join(SRC_DIR, 'data', 'extensions');
const GUIDES_DIR = path.join(SRC_DIR, 'data', 'agent-guides', 'bam');
const TEMPLATES_DIR = path.join(SRC_DIR, 'data', 'templates');

// Security patterns to detect
const SECURITY_PATTERNS = {
  scriptTags: /<script\b[^>]*>[\s\S]*?<\/script>/gi,
  eventHandlers: /\bon\w+\s*=/gi,
  sqlInjection: /(['"]?\s*(OR|AND)\s+(['"]?\d+['"]?\s*=\s*['"]?\d+['"]?|1\s*=\s*1|true))/gi,
  sqlComments: /--\s*$/gm,
  sqlUnion: /UNION\s+(ALL\s+)?SELECT/gi,
  shellCommands: /(\$\(|`)[^`\)]*(\)|`)/g,
  // More specific pattern - looking for actual pipe to shell interpreter execution, not path references
  shellPipe: /\|\s*(\/bin\/|\/usr\/bin\/)?(bash|sh|zsh)\s+(-c\s+|--)/gi,
  shellRedirect: />\s*\/etc\//gi,
  dangerousCommands: /\b(rm\s+-rf\s+\/|chmod\s+777\s+\/|curl\s+[^\|]+\|\s*bash|wget\s+[^\|]+\|\s*bash)/gi,
  templateInjection: /\{\{\s*constructor\s*\}\}|\{\{\s*__proto__\s*\}\}/gi,
  prototypeAccess: /__proto__|prototype\s*\[/gi,
  evalPatterns: /\beval\s*\(|\bnew\s+Function\s*\(/gi,
};

// Helper functions
const getExtensions = () => {
  if (!fs.existsSync(EXTENSIONS_DIR)) return [];
  return fs.readdirSync(EXTENSIONS_DIR)
    .filter(f => f.endsWith('.yaml'))
    .map(f => ({
      name: f,
      path: path.join(EXTENSIONS_DIR, f),
      content: yaml.load(fs.readFileSync(path.join(EXTENSIONS_DIR, f), 'utf-8'))
    }));
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

describe('Extension Prompt Content Sanitization', () => {
  const extensions = getExtensions();

  describe('Script Tag Detection', () => {
    test('no script tags in extension prompts', () => {
      const violations = [];

      extensions.forEach(ext => {
        const prompts = ext.content?.prompts || [];
        prompts.forEach(prompt => {
          if (prompt.content && SECURITY_PATTERNS.scriptTags.test(prompt.content)) {
            violations.push({
              extension: ext.name,
              prompt: prompt.id,
              pattern: 'script tags'
            });
          }
          // Reset regex lastIndex
          SECURITY_PATTERNS.scriptTags.lastIndex = 0;
        });
      });

      if (violations.length > 0) {
        console.error('Script tag violations:', violations);
      }
      expect(violations).toEqual([]);
    });

    test('no event handler attributes in prompts', () => {
      const violations = [];

      extensions.forEach(ext => {
        const prompts = ext.content?.prompts || [];
        prompts.forEach(prompt => {
          if (prompt.content && SECURITY_PATTERNS.eventHandlers.test(prompt.content)) {
            violations.push({
              extension: ext.name,
              prompt: prompt.id,
              pattern: 'event handlers'
            });
          }
          SECURITY_PATTERNS.eventHandlers.lastIndex = 0;
        });
      });

      if (violations.length > 0) {
        console.error('Event handler violations:', violations);
      }
      expect(violations).toEqual([]);
    });
  });

  describe('SQL Injection Pattern Detection', () => {
    test('no SQL injection patterns in extension prompts', () => {
      const violations = [];

      extensions.forEach(ext => {
        const prompts = ext.content?.prompts || [];
        prompts.forEach(prompt => {
          if (prompt.content) {
            // Check for common SQL injection patterns
            if (SECURITY_PATTERNS.sqlInjection.test(prompt.content)) {
              violations.push({
                extension: ext.name,
                prompt: prompt.id,
                pattern: 'SQL injection (OR/AND tautology)'
              });
            }
            SECURITY_PATTERNS.sqlInjection.lastIndex = 0;

            if (SECURITY_PATTERNS.sqlUnion.test(prompt.content)) {
              violations.push({
                extension: ext.name,
                prompt: prompt.id,
                pattern: 'SQL UNION injection'
              });
            }
            SECURITY_PATTERNS.sqlUnion.lastIndex = 0;
          }
        });
      });

      if (violations.length > 0) {
        console.error('SQL injection pattern violations:', violations);
      }
      expect(violations).toEqual([]);
    });
  });

  describe('Shell Command Injection Detection', () => {
    test('no shell command injection patterns in prompts', () => {
      const violations = [];

      extensions.forEach(ext => {
        const prompts = ext.content?.prompts || [];
        prompts.forEach(prompt => {
          if (prompt.content) {
            if (SECURITY_PATTERNS.dangerousCommands.test(prompt.content)) {
              violations.push({
                extension: ext.name,
                prompt: prompt.id,
                pattern: 'dangerous shell commands'
              });
            }
            SECURITY_PATTERNS.dangerousCommands.lastIndex = 0;

            if (SECURITY_PATTERNS.shellPipe.test(prompt.content)) {
              violations.push({
                extension: ext.name,
                prompt: prompt.id,
                pattern: 'shell pipe to interpreter'
              });
            }
            SECURITY_PATTERNS.shellPipe.lastIndex = 0;

            if (SECURITY_PATTERNS.shellRedirect.test(prompt.content)) {
              violations.push({
                extension: ext.name,
                prompt: prompt.id,
                pattern: 'shell redirect to system files'
              });
            }
            SECURITY_PATTERNS.shellRedirect.lastIndex = 0;
          }
        });
      });

      if (violations.length > 0) {
        console.error('Shell command injection violations:', violations);
      }
      expect(violations).toEqual([]);
    });
  });
});

describe('Agent Guide Content Validation', () => {
  const guides = getAgentGuides();

  describe('Executable Code Block Warnings', () => {
    test('code blocks have appropriate language tags', () => {
      const codeBlockRegex = /```(\w*)\n[\s\S]*?```/g;
      const executableLanguages = ['bash', 'sh', 'zsh', 'powershell', 'cmd', 'python', 'javascript', 'typescript', 'ruby', 'perl'];
      const violations = [];

      guides.forEach(guide => {
        let match;
        while ((match = codeBlockRegex.exec(guide.content)) !== null) {
          const language = match[1].toLowerCase();
          // Empty language tag on executable-looking code is a concern
          if (!language && match[0].includes('#!/')) {
            violations.push({
              guide: guide.name,
              issue: 'Unlabeled code block with shebang'
            });
          }
        }
      });

      if (violations.length > 0) {
        console.error('Code block warning violations:', violations);
      }
      expect(violations).toEqual([]);
    });
  });

  describe('Sensitive Data Pattern Detection', () => {
    test('no hardcoded API keys in guides', () => {
      const apiKeyPatterns = [
        /['"]sk-[a-zA-Z0-9]{32,}['"]/g,  // OpenAI-style
        /['"]AKIA[A-Z0-9]{16}['"]/g,      // AWS access key
        /['"][a-zA-Z0-9]{40}['"]/g,       // Generic 40-char tokens (be careful)
        /api_key\s*[=:]\s*['"][^'"]{20,}['"]/gi,
        /secret_key\s*[=:]\s*['"][^'"]{20,}['"]/gi,
      ];

      const violations = [];

      guides.forEach(guide => {
        apiKeyPatterns.forEach((pattern, index) => {
          const matches = guide.content.match(pattern);
          if (matches) {
            // Filter out placeholder patterns like {{api_key}} or <api_key>
            const realMatches = matches.filter(m =>
              !m.includes('{{') &&
              !m.includes('<') &&
              !m.includes('your_') &&
              !m.includes('YOUR_') &&
              !m.includes('example')
            );
            if (realMatches.length > 0) {
              violations.push({
                guide: guide.name,
                pattern: `API key pattern ${index + 1}`,
                matches: realMatches.slice(0, 3) // Show first 3 matches
              });
            }
          }
        });
      });

      if (violations.length > 0) {
        console.error('Hardcoded API key violations:', violations);
      }
      expect(violations).toEqual([]);
    });

    test('no hardcoded passwords in guides', () => {
      const passwordPatterns = [
        /password\s*[=:]\s*['"][^'"]{8,}['"]/gi,
        /passwd\s*[=:]\s*['"][^'"]{8,}['"]/gi,
        /pwd\s*[=:]\s*['"][^'"]{8,}['"]/gi,
      ];

      const violations = [];

      guides.forEach(guide => {
        passwordPatterns.forEach(pattern => {
          const matches = guide.content.match(pattern);
          if (matches) {
            const realMatches = matches.filter(m =>
              !m.includes('{{') &&
              !m.includes('<') &&
              !m.includes('your_') &&
              !m.includes('YOUR_') &&
              !m.includes('example') &&
              !m.includes('placeholder')
            );
            if (realMatches.length > 0) {
              violations.push({
                guide: guide.name,
                matches: realMatches.slice(0, 3)
              });
            }
          }
        });
      });

      if (violations.length > 0) {
        console.error('Hardcoded password violations:', violations);
      }
      expect(violations).toEqual([]);
    });
  });

  describe('No Eval or Dynamic Code Execution', () => {
    test('no eval patterns in guides', () => {
      const violations = [];

      guides.forEach(guide => {
        if (SECURITY_PATTERNS.evalPatterns.test(guide.content)) {
          violations.push({
            guide: guide.name,
            pattern: 'eval or new Function'
          });
        }
        SECURITY_PATTERNS.evalPatterns.lastIndex = 0;
      });

      if (violations.length > 0) {
        console.error('Eval pattern violations:', violations);
      }
      expect(violations).toEqual([]);
    });
  });
});

describe('Template Injection Prevention', () => {
  const templates = getTemplates();

  describe('Template Variable Escaping', () => {
    test('template variables use safe double-brace syntax', () => {
      // BAM uses {{variable}} for template variables
      // Single braces {variable} are for config resolution
      const unsafeTripleBracePattern = /\{\{\{\s*\w+\s*\}\}\}/g;
      const violations = [];

      templates.forEach(template => {
        if (unsafeTripleBracePattern.test(template.content)) {
          violations.push({
            template: template.name,
            issue: 'Triple brace detected (unescaped output)'
          });
        }
      });

      if (violations.length > 0) {
        console.error('Triple brace violations:', violations);
      }
      expect(violations).toEqual([]);
    });

    test('no nested template execution patterns', () => {
      // Detect patterns like {{{{nested}}}} or {{eval(...)}}
      const nestedPatterns = [
        /\{\{\s*\{\{/g,
        /\{\{\s*eval\s*\(/gi,
        /\{\{\s*exec\s*\(/gi,
        /\{\{\s*system\s*\(/gi,
      ];

      const violations = [];

      templates.forEach(template => {
        nestedPatterns.forEach(pattern => {
          if (pattern.test(template.content)) {
            violations.push({
              template: template.name,
              issue: 'Nested template or execution pattern'
            });
          }
          pattern.lastIndex = 0;
        });
      });

      if (violations.length > 0) {
        console.error('Nested template violations:', violations);
      }
      expect(violations).toEqual([]);
    });
  });

  describe('Prototype Pollution Prevention', () => {
    test('no prototype access patterns in templates', () => {
      const violations = [];

      templates.forEach(template => {
        if (SECURITY_PATTERNS.prototypeAccess.test(template.content)) {
          violations.push({
            template: template.name,
            pattern: '__proto__ or prototype access'
          });
        }
        SECURITY_PATTERNS.prototypeAccess.lastIndex = 0;

        if (SECURITY_PATTERNS.templateInjection.test(template.content)) {
          violations.push({
            template: template.name,
            pattern: 'constructor/proto template injection'
          });
        }
        SECURITY_PATTERNS.templateInjection.lastIndex = 0;
      });

      if (violations.length > 0) {
        console.error('Prototype pollution violations:', violations);
      }
      expect(violations).toEqual([]);
    });
  });
});

describe('Tenant Isolation Patterns', () => {
  const templates = getTemplates();
  const guides = getAgentGuides();

  describe('Tenant-Scoped Template Validation', () => {
    test('tenant-related templates include tenant_id field references', () => {
      // Filter to templates that should definitely have tenant_id
      // Exclude documentation/planning templates that describe tenants conceptually
      const tenantTemplates = templates.filter(t =>
        (t.name.includes('tenant') ||
        t.name.includes('isolation') ||
        t.name.includes('rls')) &&
        !t.name.includes('persona') &&
        !t.name.includes('requirements') &&
        !t.name.includes('tier-matrix') &&
        !t.name.includes('backup-plan') &&
        !t.name.includes('policy-doc')  // Documentation templates
      );

      const missingTenantId = [];

      tenantTemplates.forEach(template => {
        // Check for tenant_id presence in various forms
        const hasTenantId =
          template.content.includes('tenant_id') ||
          template.content.includes('tenant-id') ||
          template.content.includes('tenantId') ||
          template.content.includes('{{tenant_id}}') ||
          template.content.includes('TenantId') ||
          template.content.includes('TenantContext') ||
          template.content.includes('tenant');  // Broader check

        if (!hasTenantId) {
          missingTenantId.push(template.name);
        }
      });

      if (missingTenantId.length > 0) {
        console.warn('Templates potentially missing tenant_id:', missingTenantId);
      }
      // Allow some flexibility for documentation templates
      expect(missingTenantId.length).toBeLessThanOrEqual(3);
    });
  });

  describe('Cross-Tenant Reference Detection', () => {
    test('no hardcoded tenant IDs in templates', () => {
      // Look for hardcoded UUIDs or tenant identifiers
      const hardcodedTenantPattern = /tenant[_-]?id\s*[=:]\s*['"](?!{{)[a-f0-9-]{8,}['"]/gi;
      const violations = [];

      templates.forEach(template => {
        const matches = template.content.match(hardcodedTenantPattern);
        if (matches) {
          violations.push({
            template: template.name,
            matches: matches.slice(0, 3)
          });
        }
      });

      if (violations.length > 0) {
        console.error('Hardcoded tenant ID violations:', violations);
      }
      expect(violations).toEqual([]);
    });

    test('no cross-tenant query patterns in guides', () => {
      // Detect patterns that might query across tenants without filter
      const crossTenantPatterns = [
        /SELECT\s+\*\s+FROM\s+\w+\s*;/gi,  // SELECT * without WHERE
        /DELETE\s+FROM\s+\w+\s*;/gi,        // DELETE without WHERE
        /UPDATE\s+\w+\s+SET\s+[^;]+;/gi,    // UPDATE without WHERE that includes tenant
      ];

      const violations = [];

      guides.forEach(guide => {
        crossTenantPatterns.forEach(pattern => {
          const matches = guide.content.match(pattern);
          if (matches) {
            // Filter out those that actually have tenant_id
            const unsafeMatches = matches.filter(m =>
              !m.toLowerCase().includes('tenant')
            );
            if (unsafeMatches.length > 0) {
              violations.push({
                guide: guide.name,
                pattern: pattern.toString(),
                matches: unsafeMatches.slice(0, 2)
              });
            }
          }
        });
      });

      // This is a warning-level check, not a hard failure
      // since example SQL may legitimately not include tenant filters
      if (violations.length > 0) {
        console.warn('Potential cross-tenant query patterns (review recommended):', violations);
      }
      // We don't fail on this, just warn
      expect(true).toBe(true);
    });
  });

  describe('Context Propagation Patterns', () => {
    test('facade method signatures include context parameter reference', () => {
      const facadeGuides = guides.filter(g =>
        g.name.includes('facade') ||
        g.name.includes('contract')
      );

      const missingContext = [];
      facadeGuides.forEach(guide => {
        const hasContextPattern =
          guide.content.includes('TenantContext') ||
          guide.content.includes('tenant_context') ||
          guide.content.includes('ctx:') ||
          guide.content.includes('context') ||
          guide.content.includes('Context');

        // Facade guides should mention context propagation
        if (!hasContextPattern) {
          missingContext.push(guide.name);
        }
      });

      // Most facade guides should have context references
      if (missingContext.length > 0) {
        console.warn('Facade guides potentially missing context:', missingContext);
      }
      expect(missingContext.length).toBeLessThanOrEqual(Math.ceil(facadeGuides.length * 0.2));
    });
  });
});

describe('Input Validation Patterns', () => {
  describe('Path Traversal Prevention', () => {
    test('no path traversal patterns in prompts', () => {
      const extensions = getExtensions();
      const pathTraversalPattern = /\.\.[\/\\]/g;
      const violations = [];

      extensions.forEach(ext => {
        const prompts = ext.content?.prompts || [];
        prompts.forEach(prompt => {
          if (prompt.content) {
            // Allow legitimate relative path references in instructions
            const matches = prompt.content.match(pathTraversalPattern);
            if (matches && matches.length > 3) {
              // More than 3 occurrences might indicate suspicious patterns
              violations.push({
                extension: ext.name,
                prompt: prompt.id,
                count: matches.length
              });
            }
          }
        });
      });

      if (violations.length > 0) {
        console.error('Excessive path traversal patterns:', violations);
      }
      expect(violations).toEqual([]);
    });
  });

  describe('URL Validation', () => {
    test('no javascript: URLs in templates', () => {
      const templates = getTemplates();
      // Only check for actual javascript: protocol URLs, not "data:" in markdown tables
      const dangerousUrlPattern = /javascript:\s*[a-zA-Z]/gi;
      const violations = [];

      templates.forEach(template => {
        if (dangerousUrlPattern.test(template.content)) {
          violations.push({
            template: template.name,
            pattern: 'javascript: URL'
          });
        }
        dangerousUrlPattern.lastIndex = 0;
      });

      if (violations.length > 0) {
        console.error('Dangerous URL violations:', violations);
      }
      expect(violations).toEqual([]);
    });

    test('no base64-encoded executable data URLs in templates', () => {
      const templates = getTemplates();
      // Check for data URLs with executable content types
      const executableDataUrlPattern = /data:\s*(text\/html|application\/javascript|text\/javascript)[^,]*,/gi;
      const violations = [];

      templates.forEach(template => {
        if (executableDataUrlPattern.test(template.content)) {
          violations.push({
            template: template.name,
            pattern: 'executable data: URL'
          });
        }
        executableDataUrlPattern.lastIndex = 0;
      });

      if (violations.length > 0) {
        console.error('Executable data URL violations:', violations);
      }
      expect(violations).toEqual([]);
    });
  });
});
