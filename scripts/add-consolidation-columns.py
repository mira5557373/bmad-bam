#!/usr/bin/env python3
"""Add consolidation columns to bam-patterns.csv"""

import csv
import sys

# Domain mapping: pattern category prefix -> consolidated guide
# Comprehensive mapping to ensure 100% pattern coverage
DOMAIN_MAP = {
    # Tenant patterns
    'tenant': 'tenant-patterns-guide.md',
    'multi-tenant': 'tenant-patterns-guide.md',
    'isolation': 'tenant-patterns-guide.md',

    # Security patterns
    'security': 'security-patterns-guide.md',
    'auth': 'security-patterns-guide.md',
    'rbac': 'security-patterns-guide.md',
    'abac': 'security-patterns-guide.md',
    'secrets': 'security-patterns-guide.md',
    'encryption': 'security-patterns-guide.md',
    'zero-trust': 'security-patterns-guide.md',

    # AI/Agent patterns
    'ai': 'ai-runtime-patterns-guide.md',
    'agent': 'ai-runtime-patterns-guide.md',
    'llm': 'ai-runtime-patterns-guide.md',
    'ai-lifecycle': 'ai-lifecycle-patterns-guide.md',
    'ai-ops': 'ai-runtime-patterns-guide.md',
    'model': 'ai-lifecycle-patterns-guide.md',
    'prompt': 'ai-lifecycle-patterns-guide.md',

    # AI Safety
    'ai-safety': 'ai-safety-patterns-guide.md',
    'guardrail': 'ai-safety-patterns-guide.md',
    'kill-switch': 'ai-safety-patterns-guide.md',
    'grounding': 'ai-safety-patterns-guide.md',

    # Observability
    'observability': 'observability-patterns-guide.md',
    'monitoring': 'observability-patterns-guide.md',
    'logging': 'observability-patterns-guide.md',
    'tracing': 'observability-patterns-guide.md',
    'alerting': 'observability-patterns-guide.md',
    'ai-observability': 'ai-observability-patterns-guide.md',
    'llm-observability': 'ai-observability-patterns-guide.md',

    # Reliability
    'reliability': 'reliability-patterns-guide.md',
    'circuit-breaker': 'reliability-patterns-guide.md',
    'retry': 'reliability-patterns-guide.md',
    'fallback': 'reliability-patterns-guide.md',
    'resilience': 'reliability-patterns-guide.md',
    'bulkhead': 'reliability-patterns-guide.md',
    'disaster': 'reliability-patterns-guide.md',

    # MCP
    'mcp': 'mcp-patterns-guide.md',
    'tool': 'mcp-patterns-guide.md',

    # RAG/Embeddings
    'rag': 'rag-patterns-guide.md',
    'vector': 'rag-patterns-guide.md',
    'embedding': 'rag-patterns-guide.md',
    'retrieval': 'rag-patterns-guide.md',
    'chunking': 'rag-patterns-guide.md',

    # Data
    'data': 'data-patterns-guide.md',
    'database': 'data-patterns-guide.md',
    'connection': 'data-patterns-guide.md',
    'migration': 'data-patterns-guide.md',
    'query': 'data-patterns-guide.md',

    # State
    'state': 'state-patterns-guide.md',
    'cache': 'state-patterns-guide.md',
    'caching': 'state-patterns-guide.md',
    'session': 'state-patterns-guide.md',
    'checkpoint': 'state-patterns-guide.md',
    'memory': 'state-patterns-guide.md',
    'event-sourcing': 'state-patterns-guide.md',

    # Integration
    'integration': 'integration-patterns-guide.md',
    'api': 'integration-patterns-guide.md',
    'event': 'integration-patterns-guide.md',
    'webhook': 'integration-patterns-guide.md',
    'saga': 'integration-patterns-guide.md',
    'facade': 'integration-patterns-guide.md',
    'a2a': 'integration-patterns-guide.md',

    # Governance/Compliance
    'governance': 'governance-patterns-guide.md',
    'compliance': 'governance-patterns-guide.md',
    'audit': 'governance-patterns-guide.md',
    'policy': 'governance-patterns-guide.md',
    'gdpr': 'governance-patterns-guide.md',
    'soc2': 'governance-patterns-guide.md',
    'hipaa': 'governance-patterns-guide.md',

    # Operations
    'operations': 'operations-patterns-guide.md',
    'deployment': 'operations-patterns-guide.md',
    'devops': 'operations-patterns-guide.md',
    'incident': 'operations-patterns-guide.md',
    'runbook': 'operations-patterns-guide.md',
    'release': 'operations-patterns-guide.md',

    # Scaling
    'scaling': 'scaling-patterns-guide.md',
    'performance': 'scaling-patterns-guide.md',
    'rate-limit': 'scaling-patterns-guide.md',
    'capacity': 'scaling-patterns-guide.md',
    'load-balancing': 'scaling-patterns-guide.md',

    # Cost
    'cost': 'cost-patterns-guide.md',
    'billing': 'cost-patterns-guide.md',
    'metering': 'cost-patterns-guide.md',
    'quota': 'cost-patterns-guide.md',
    'monetization': 'cost-patterns-guide.md',

    # Testing
    'testing': 'testing-patterns-guide.md',
    'test': 'testing-patterns-guide.md',
    'contract': 'testing-patterns-guide.md',

    # Discovery/Planning
    'discovery': 'discovery-patterns-guide.md',
    'planning': 'discovery-patterns-guide.md',
    'requirements': 'discovery-patterns-guide.md',
    'triage': 'discovery-patterns-guide.md',

    # Runtime loops
    'runtime': 'runtime-loops-patterns-guide.md',
    'loop': 'runtime-loops-patterns-guide.md',
    'control-loop': 'runtime-loops-patterns-guide.md',

    # Quality Gates
    'gate': 'gate-verification-patterns-guide.md',
    'verification': 'gate-verification-patterns-guide.md',
    'qg': 'gate-verification-patterns-guide.md',
    'quality': 'gate-verification-patterns-guide.md',

    # Analytics
    'analytics': 'analytics-patterns-guide.md',
    'dashboard': 'analytics-patterns-guide.md',
    'reporting': 'analytics-patterns-guide.md',
    'metrics': 'analytics-patterns-guide.md',

    # Federation
    'federation': 'federation-patterns-guide.md',
    'partner': 'federation-patterns-guide.md',
    'cross-tenant': 'federation-patterns-guide.md',

    # Documentation
    'documentation': 'documentation-patterns-guide.md',
    'docs': 'documentation-patterns-guide.md',
    'changelog': 'documentation-patterns-guide.md',

    # Architecture (default)
    'architecture': 'architecture-patterns-guide.md',
    'module': 'architecture-patterns-guide.md',
    'domain': 'architecture-patterns-guide.md',
    'idempotency': 'architecture-patterns-guide.md',
}

# Phase mapping based on verification_gate
PHASE_MAP = {
    'QG-D1': 'discovery',
    'QG-PL1': 'planning',
    'QG-F1': 'foundation',
    'QG-M1': 'solutioning',
    'QG-M2': 'solutioning',
    'QG-M3': 'solutioning',
    'QG-I1': 'integration',
    'QG-I2': 'integration',
    'QG-I3': 'integration',
    'QG-P1': 'production',
    'QG-S': 'solutioning',
    'QG-AI': 'solutioning',
    'none': 'anytime',
}

def get_guide(category):
    """Get consolidated guide for category"""
    if not category:
        return 'architecture-patterns-guide.md'

    category_lower = category.lower()

    # Try exact match first
    if category_lower in DOMAIN_MAP:
        return DOMAIN_MAP[category_lower]

    # Try prefix match
    for prefix, guide in DOMAIN_MAP.items():
        if category_lower.startswith(prefix) or prefix in category_lower:
            return guide

    # Fallback based on common keywords
    if 'tenant' in category_lower:
        return 'tenant-patterns-guide.md'
    if 'agent' in category_lower or 'ai' in category_lower:
        return 'ai-runtime-patterns-guide.md'
    if 'security' in category_lower or 'auth' in category_lower:
        return 'security-patterns-guide.md'

    return 'architecture-patterns-guide.md'

def get_section(pattern_id):
    """Generate section anchor from pattern_id"""
    if not pattern_id:
        return ''
    return pattern_id.replace('_', '-')

def get_phase(gate):
    """Get phase from verification gate"""
    if not gate:
        return 'anytime'
    for prefix, phase in PHASE_MAP.items():
        if gate.startswith(prefix):
            return phase
    return 'solutioning'

def main():
    input_file = sys.argv[1] if len(sys.argv) > 1 else 'src/data/bam-patterns.csv'
    output_file = sys.argv[2] if len(sys.argv) > 2 else input_file

    rows = []
    with open(input_file, 'r', newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        original_fieldnames = list(reader.fieldnames)

        # Add new columns if not present
        new_cols = ['consolidated_guide', 'section_anchor', 'phase']
        fieldnames = original_fieldnames.copy()
        for col in new_cols:
            if col not in fieldnames:
                fieldnames.append(col)

        for row in reader:
            row['consolidated_guide'] = get_guide(row.get('category', ''))
            row['section_anchor'] = get_section(row.get('pattern_id', ''))
            row['phase'] = get_phase(row.get('verification_gate', ''))
            rows.append(row)

    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"Updated {len(rows)} patterns with consolidation columns")

if __name__ == '__main__':
    main()
