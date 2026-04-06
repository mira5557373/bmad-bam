# Step 1: Define Provisioning Stages

Define the ordered stages of tenant provisioning:

| Stage | Name | Description | Rollback Strategy |
|-------|------|-------------|-------------------|
| 1 | Request Validation | Validate tenant registration request (name, slug uniqueness, tier selection) | N/A (pre-creation) |
| 2 | Tenant Record Creation | Create tenant entity in primary database with PROVISIONING status | Delete tenant record |
| 3 | Database Schema Setup | Create tenant-specific schema or apply RLS policies | Drop schema / remove policies |
| 4 | Cache Namespace Setup | Initialize tenant-prefixed cache namespace in Redis | Delete namespace keys |
| 5 | Storage Provisioning | Create tenant-prefixed storage paths (S3 bucket/prefix) | Delete storage prefix |
| 6 | Search Index Setup | Create tenant-filtered search indices | Delete indices |
| 7 | Vector Store Setup | Initialize tenant namespace in vector database | Delete namespace |
| 8 | Admin User Creation | Create initial admin user for tenant | Delete user record |
| 9 | Activation | Transition tenant status to ACTIVE | Revert to PROVISIONING |

For each stage, define:
- Pre-conditions that must be met
- Idempotency guarantees (stage can be re-run safely)
- Timeout and retry configuration
- Failure notification mechanism

**Stage Ordering Rule:** Each stage must complete successfully before the next begins. Use a state machine to track progress and support resumption after failures.
