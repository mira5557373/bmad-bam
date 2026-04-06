# Facade Contract: {{MODULE_NAME}}

## Metadata

| Field     | Value              |
| --------- | ------------------ |
| Module    | {{MODULE_NAME}}    |
| Version   | {{SEMVER}}         |
| Status    | {{CONTRACT_STATUS}} |
| Owner     | {{OWNER}}          |
| Published | {{DATE}}           |

## Methods

### Commands (Write Operations)

| Method | Parameters | Return Type | Tenant-Scoped | Idempotent |
| ------ | ---------- | ----------- | ------------- | ---------- |

### Queries (Read Operations)

| Method | Parameters | Return Type | Tenant-Scoped |
| ------ | ---------- | ----------- | ------------- |

## Events Published

| Event Name | Payload Schema | Emission Trigger |
| ---------- | -------------- | ---------------- |

## Events Consumed

| Event Name | Source Module | Handler Description |
| ---------- | ------------- | ------------------- |

## Error Types

| Error                      | HTTP Status | Description                       |
| -------------------------- | ----------- | --------------------------------- |
| EntityNotFoundError        | 404         | Requested entity does not exist   |
| ValidationError            | 400         | Input validation failed           |
| PermissionDeniedError      | 403         | Insufficient permissions          |
| DependencyUnavailableError | 503         | Downstream dependency unavailable |

## Breaking Change Policy

- **Minor version** (non-breaking): Add method, add optional parameter
- **Major version** (breaking): Change return type, change required parameter, remove method
- **Deprecation timeline**: Minimum 2 sprints before removal
- **Migration guide**: Required for all major version bumps
