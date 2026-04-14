# BAM - Multi-Tenant Agentic AI SaaS Extension for BMAD Method

[![CI](https://github.com/bmad-code-org/bmad-bam/actions/workflows/ci.yaml/badge.svg)](https://github.com/bmad-code-org/bmad-bam/actions/workflows/ci.yaml)
[![npm version](https://badge.fury.io/js/bmad-bam.svg)](https://www.npmjs.com/package/bmad-bam)

BAM (BMad-for-Agentic-Monolith) is an **extension module** for the BMAD Method that adds multi-tenant SaaS capabilities, modular monolith patterns, and AI agent architecture to your development workflow.

## Overview

BAM bridges the gap between general-purpose BMAD and the specific needs of multi-tenant AI SaaS platforms:

| BMAD Provides | BAM Adds |
|---------------|----------|
| General agile AI dev | Multi-tenant patterns |
| Single-app workflows | Module boundary design |
| Basic architecture | Tenant isolation (RLS) |
| Standard testing | AI safety evaluation |
| Generic UX design | Tier-based UX |

## Installation

```bash
npx bmad-method install
# Select BAM when prompted
```

## Components

| Component | Count | Description |
|-----------|-------|-------------|
| Agents | 0 | Pure extension module (Atlas/Nova/Kai consolidated in architect-bam) |
| Workflows | 190 | Foundation → Module → Integration → Production |
| Patterns | 50 | Pattern registry in 6 CSV files |
| Agent Guides | 188 | Context injection via WDS pattern |
| Extensions | 31 | Extend BMM, TEA, WDS, CIS agents |
| Checklists | 32 | Quality gates at every milestone |
| Templates | 453 | Architecture docs, contracts, matrices |

## Ecosystem Integration

BAM integrates seamlessly with all official BMAD modules:

- **BMM + BAM**: Multi-tenant SaaS development with modular monolith architecture
- **TEA + BAM**: Tenant isolation testing, AI safety evaluation
- **WDS + BAM**: Tenant-aware UX, tier-specific journeys
- **CIS + BAM**: SaaS feature brainstorming, AI opportunity discovery

## Quality Gates

BAM enforces 40 quality gates across 6 categories:

- **Phase gates:** QG-D1, QG-PL1
- **Core gates:** QG-F1, QG-M1-M3, QG-I1-I3, QG-P1 (8)
- **Security gates:** QG-S1-S10 (10)
- **AI gates:** QG-AI1-AI2 (2)
- **Operations gates:** QG-IR1, QG-SA1, QG-PR1, QG-DR1, QG-CP1, QG-CS1, QG-MG1, QG-OC, QG-CC (9)
- **Testing gates (TEA):** QG-TC1-TC3 (3)

```
QG-D1 → QG-PL1 → QG-F1 (Foundation) → QG-M1/M2/M3 (Module) → QG-I1/I2/I3 (Integration) → QG-P1 (Production) → DEPLOY
```

## Documentation

- [Getting Started](docs/tutorials/getting-started.md)
- [Installation Guide](docs/how-to/install-bam.md)
- [Architecture Reference](docs/reference/workflows.md)

## Development

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run specific test suites
npm run test:schema       # YAML schema validation
npm run test:workflow     # Workflow structure validation
npm run test:install      # Installation validation (Tier 1)
npm run test:extension    # Extension integration (Tier 2)
npm run test:integration  # Ecosystem integration (Tier 4)

# Validate TSA synchronization
npm run validate-tsa
```

## License

MIT License - see [LICENSE](LICENSE) for details.
