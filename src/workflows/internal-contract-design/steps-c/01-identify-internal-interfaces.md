# Step 1: Identify Internal Interfaces

Discover all interfaces that require formal contracts within the module:

## Interface Discovery

Survey the module for interfaces between:
- Internal services/components
- Sub-modules or packages
- Shared utilities and libraries
- Data access layers

## Interface Classification

**Facade Interfaces:**
- Module's public API exposed to other modules
- Must follow master architecture facade pattern
- Version controlled and documented

**Internal Service Interfaces:**
- Interfaces between internal components
- May be less formal but need clear contracts
- Used for component isolation and testing

**Data Interfaces:**
- Repository patterns for data access
- Event schemas for internal messaging
- Cache interfaces for state management

**Integration Interfaces:**
- External service adapters
- Third-party API wrappers
- Infrastructure service clients

## Interface Inventory

For each interface, document:
- Interface name and location
- Provider component
- Consumer components
- Current state (documented/undocumented/implicit)
- Criticality (high/medium/low)

Output: Interface inventory with classification and criticality assessment.
