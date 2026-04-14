---
name: Local Development Template
description: Template for local development environment setup including Docker, multi-tenant simulation, mock services, and AI agent testing
category: architecture
version: 1.0.0
type: "operations"
---

## Purpose

Template for local development environment setup including Docker, multi-tenant simulation, mock services, and AI agent testing

# Local Development Environment Specification

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

## Overview

### 1.1 Purpose

This document specifies the local development environment for {{project_name}}, defining how developers can set up, configure, and test the multi-tenant AI platform locally using {{tenant_model}} isolation and {{ai_runtime}} orchestration.

### 1.2 Development Model

| Model | Description | Use Case |
|-------|-------------|----------|
| Full Stack | All services locally | Feature development |
| Hybrid | Local app + remote services | Integration testing |
| Minimal | Core services only | Quick iteration |
| CI Mirror | Matches CI environment | Pre-commit validation |

**Selected Model:** {{development_model}}

---

## Environment Setup

### 2.1 Setup Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                Local Development Stack                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Host Machine                         │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │    IDE      │  │   CLI       │  │  Browser    │   │   │
│  │  │  (VSCode)   │  │  Tools      │  │  DevTools   │   │   │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │   │
│  │         └─────────────────┼─────────────────┘         │   │
│  │                           ▼                           │   │
│  │  ┌──────────────────────────────────────────────────┐│   │
│  │  │              Docker Compose Stack                 ││   │
│  │  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   ││   │
│  │  │  │  App   │ │  DB    │ │ Cache  │ │ Queue  │   ││   │
│  │  │  │Servers │ │Postgres│ │ Redis  │ │ RabbitMQ│   ││   │
│  │  │  └────────┘ └────────┘ └────────┘ └────────┘   ││   │
│  │  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   ││   │
│  │  │  │ Vector │ │ Object │ │  Mock  │ │  AI    │   ││   │
│  │  │  │   DB   │ │Storage │ │Services│ │ Agent  │   ││   │
│  │  │  └────────┘ └────────┘ └────────┘ └────────┘   ││   │
│  │  └──────────────────────────────────────────────────┘│   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 System Requirements

| Component | Minimum | Recommended | Notes |
|-----------|---------|-------------|-------|
| CPU | 4 cores | 8+ cores | For container workloads |
| RAM | 8 GB | 16+ GB | Includes AI model loading |
| Disk | 20 GB | 50+ GB | SSD recommended |
| OS | macOS 12+, Ubuntu 20+, Win 11 | Latest stable | WSL2 for Windows |
| Docker | 24.0+ | Latest | Docker Desktop or Engine |
| Node.js | {{min_node_version}} | {{recommended_node_version}} | Via nvm/fnm |
| Python | {{min_python_version}} | {{recommended_python_version}} | For AI agents |

### 2.3 Tool Installation

| Tool | Purpose | Installation |
|------|---------|--------------|
| Docker Desktop | Container runtime | {{docker_install_url}} |
| Node.js | Backend/frontend runtime | nvm install {{node_version}} |
| Python | AI agent runtime | pyenv install {{python_version}} |
| pnpm | Package manager | npm install -g pnpm |
| uv | Python package manager | pip install uv |
| direnv | Environment management | brew install direnv |
| jq | JSON processing | brew install jq |
| yq | YAML processing | brew install yq |

### 2.4 Initial Setup Script

```yaml
setup_script:
  name: "{{setup_script_name}}"
  
  steps:
    - name: "Check prerequisites"
      command: "{{prereq_check_command}}"
      
    - name: "Clone repository"
      command: "git clone {{repo_url}}"
      
    - name: "Install dependencies"
      command: "pnpm install && uv sync"
      
    - name: "Setup environment"
      command: "cp .env.example .env.local"
      
    - name: "Start infrastructure"
      command: "docker compose up -d"
      
    - name: "Run migrations"
      command: "pnpm db:migrate"
      
    - name: "Seed test data"
      command: "pnpm db:seed"
      
    - name: "Verify setup"
      command: "pnpm dev:healthcheck"
```

### 2.5 Environment Variables

| Variable | Description | Default | Secret |
|----------|-------------|---------|--------|
| DATABASE_URL | PostgreSQL connection | postgres://{{db_user}}:{{db_pass}}@localhost:5432/{{db_name}} | Yes |
| REDIS_URL | Redis connection | redis://localhost:6379 | No |
| RABBITMQ_URL | RabbitMQ connection | amqp://{{mq_user}}:{{mq_pass}}@localhost:5672 | Yes |
| VECTOR_DB_URL | Vector database | http://localhost:6333 | No |
| S3_ENDPOINT | Local object storage | http://localhost:9000 | No |
| LLM_API_KEY | LLM provider key | {{llm_api_key}} | Yes |
| LLM_BASE_URL | LLM endpoint override | {{llm_base_url}} | No |
| TENANT_ISOLATION_MODE | Tenant model | {{tenant_model}} | No |
| AI_RUNTIME | Agent framework | {{ai_runtime}} | No |
| LOG_LEVEL | Logging verbosity | debug | No |
| DEBUG_MODE | Enable debugging | true | No |

---

## Docker Configuration

### 3.1 Docker Compose Structure

```
┌─────────────────────────────────────────────────────────────┐
│                   Docker Compose Profiles                    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Profile: core (default)                              │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐                    │   │
│  │  │Postgres│ │ Redis  │ │RabbitMQ│                    │   │
│  │  └────────┘ └────────┘ └────────┘                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Profile: full                                        │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │   │
│  │  │ Vector │ │ MinIO  │ │Mailhog │ │  Jaeger│        │   │
│  │  └────────┘ └────────┘ └────────┘ └────────┘        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Profile: ai                                          │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐                    │   │
│  │  │  LLM   │ │Embedding│ │ Agent  │                    │   │
│  │  │ Proxy  │ │ Server  │ │ Worker │                    │   │
│  │  └────────┘ └────────┘ └────────┘                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Service Configuration

| Service | Image | Ports | Volume | Profile |
|---------|-------|-------|--------|---------|
| postgres | postgres:{{pg_version}} | 5432 | pgdata | core |
| redis | redis:{{redis_version}} | 6379 | redisdata | core |
| rabbitmq | rabbitmq:{{rmq_version}}-management | 5672, 15672 | rmqdata | core |
| qdrant | qdrant/qdrant:{{qdrant_version}} | 6333, 6334 | qdrantdata | full |
| minio | minio/minio:{{minio_version}} | 9000, 9001 | miniodata | full |
| mailhog | mailhog/mailhog:{{mailhog_version}} | 1025, 8025 | - | full |
| jaeger | jaegertracing/all-in-one:{{jaeger_version}} | 16686, 4317 | - | full |
| litellm | ghcr.io/berriai/litellm:{{litellm_version}} | 4000 | - | ai |

### 3.3 Docker Compose Schema

```yaml
docker_compose:
  version: "{{compose_version}}"
  
  services:
    postgres:
      image: "postgres:{{pg_version}}"
      environment:
        POSTGRES_USER: "{{db_user}}"
        POSTGRES_PASSWORD: "{{db_password}}"
        POSTGRES_DB: "{{db_name}}"
      ports:
        - "5432:5432"
      volumes:
        - "pgdata:/var/lib/postgresql/data"
        - "./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql"
      healthcheck:
        test: ["CMD-SHELL", "pg_isready -U {{db_user}}"]
        interval: 5s
        timeout: 5s
        retries: 5
      profiles: ["core"]
    
    redis:
      image: "redis:{{redis_version}}"
      ports:
        - "6379:6379"
      volumes:
        - "redisdata:/data"
      healthcheck:
        test: ["CMD", "redis-cli", "ping"]
        interval: 5s
        timeout: 5s
        retries: 5
      profiles: ["core"]
    
    vector_db:
      image: "qdrant/qdrant:{{qdrant_version}}"
      ports:
        - "6333:6333"
        - "6334:6334"
      volumes:
        - "qdrantdata:/qdrant/storage"
      profiles: ["full"]
    
    llm_proxy:
      image: "ghcr.io/berriai/litellm:{{litellm_version}}"
      environment:
        - "LITELLM_CONFIG_PATH=/config/litellm.yaml"
      ports:
        - "4000:4000"
      volumes:
        - "./config/litellm.yaml:/config/litellm.yaml"
      profiles: ["ai"]
  
  volumes:
    pgdata:
    redisdata:
    qdrantdata:
    miniodata:
```

### 3.4 Profile Commands

| Command | Action | Use Case |
|---------|--------|----------|
| docker compose up -d | Start core services | Quick start |
| docker compose --profile full up -d | Start all services | Full testing |
| docker compose --profile ai up -d | Start AI services | Agent development |
| docker compose down | Stop all services | Cleanup |
| docker compose down -v | Stop + remove volumes | Full reset |

---

## Multi-Tenant Simulation

### 4.1 Simulation Architecture

```
┌─────────────────────────────────────────────────────────────┐
│               Multi-Tenant Simulation                        │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Simulated Tenants                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │  Tenant A   │  │  Tenant B   │  │  Tenant C   │   │   │
│  │  │  (Free)     │  │  (Pro)      │  │(Enterprise) │   │   │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │   │
│  │         │                │                │           │   │
│  │         ▼                ▼                ▼           │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │            Tenant Context Injector               │ │   │
│  │  │  (Header: X-Tenant-ID, JWT claim, RLS policy)   │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Default Test Tenants

| Tenant ID | Name | Tier | Features | Users |
|-----------|------|------|----------|-------|
| {{tenant_free_id}} | Acme Free | Free | Basic | 3 |
| {{tenant_pro_id}} | Beta Pro | Pro | Standard | 10 |
| {{tenant_enterprise_id}} | Gamma Corp | Enterprise | All | 50 |
| {{tenant_test_id}} | Test Tenant | Configurable | Variable | Variable |

### 4.3 Tenant Simulation Configuration

```yaml
tenant_simulation:
  enabled: true
  default_tenant: "{{default_tenant_id}}"
  
  tenants:
    - id: "{{tenant_free_id}}"
      name: "{{tenant_free_name}}"
      slug: "{{tenant_free_slug}}"
      tier: "free"
      settings:
        max_users: 3
        max_storage_gb: 1
        ai_enabled: false
        feature_flags:
          advanced_analytics: false
          custom_integrations: false
    
    - id: "{{tenant_pro_id}}"
      name: "{{tenant_pro_name}}"
      slug: "{{tenant_pro_slug}}"
      tier: "pro"
      settings:
        max_users: 25
        max_storage_gb: 50
        ai_enabled: true
        feature_flags:
          advanced_analytics: true
          custom_integrations: false
    
    - id: "{{tenant_enterprise_id}}"
      name: "{{tenant_enterprise_name}}"
      slug: "{{tenant_enterprise_slug}}"
      tier: "enterprise"
      settings:
        max_users: -1
        max_storage_gb: 1000
        ai_enabled: true
        feature_flags:
          advanced_analytics: true
          custom_integrations: true
          white_label: true

  context_injection:
    method: "{{context_method}}"
    header_name: "X-Tenant-ID"
    jwt_claim: "tenant_id"
```

### 4.4 Tenant Switching

| Method | Command/Action | Use Case |
|--------|----------------|----------|
| CLI | `pnpm dev:tenant {{tenant_id}}` | Terminal workflow |
| Header | `X-Tenant-ID: {{tenant_id}}` | API testing |
| Browser extension | Click to switch | UI testing |
| Environment | `TENANT_ID={{tenant_id}}` | Process-level |

### 4.5 Isolation Verification

| Check | Command | Expected |
|-------|---------|----------|
| Data isolation | `pnpm test:isolation` | No cross-tenant access |
| RLS enforcement | `pnpm test:rls` | All queries filtered |
| Schema separation | `pnpm test:schema` | Separate namespaces |
| API isolation | `pnpm test:api` | Tenant-scoped responses |

---

## Mock Services

### 5.1 Mock Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Mock Services                            │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Mock Server                           │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │   LLM       │  │  External   │  │  Webhooks   │   │   │
│  │  │   Mocks     │  │   APIs      │  │   Sink      │   │   │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │   │
│  │         └─────────────────┼─────────────────┘         │   │
│  │                           ▼                           │   │
│  │                   ┌─────────────┐                     │   │
│  │                   │   WireMock  │                     │   │
│  │                   │   Server    │                     │   │
│  │                   └─────────────┘                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Mock Services List

| Service | Mock Provider | Port | Purpose |
|---------|---------------|------|---------|
| OpenAI API | LiteLLM + Mock | 4000 | LLM calls |
| Anthropic API | LiteLLM + Mock | 4000 | LLM calls |
| Stripe | stripe-mock | 12111 | Payments |
| SendGrid | Mailhog | 1025 | Emails |
| Twilio | twilio-mock | 8088 | SMS |
| AWS S3 | MinIO | 9000 | Object storage |
| External APIs | WireMock | 8080 | Generic mocks |

### 5.3 LLM Mock Configuration

> **Note:** Model names below are examples. Update to current versions before use.

```yaml
llm_mocks:
  provider: "litellm"
  config_path: "{{mock_config_path}}"
  
  mock_responses:
    enabled: {{mock_responses_enabled}}
    response_dir: "{{mock_response_dir}}"
    
  models:
    - name: "gpt-4o-mock"
      type: "mock"
      response_mode: "{{gpt_mock_mode}}"
      latency_ms: {{gpt_mock_latency}}
      
    - name: "claude-3-sonnet-mock"
      type: "mock"
      response_mode: "{{claude_mock_mode}}"
      latency_ms: {{claude_mock_latency}}
  
  recording:
    enabled: {{recording_enabled}}
    record_dir: "{{record_dir}}"
    
  replay:
    enabled: {{replay_enabled}}
    replay_dir: "{{replay_dir}}"
```

### 5.4 Mock Response Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| static | Fixed responses from files | Deterministic tests |
| random | Random valid responses | Fuzz testing |
| echo | Echo input with wrapper | Input validation |
| delay | Add artificial latency | Timeout testing |
| error | Return error responses | Error handling |
| real | Proxy to real API | Integration testing |

### 5.5 External API Mocks

```yaml
external_api_mocks:
  wiremock:
    port: 8080
    
  mappings:
    - name: "Payment webhook"
      request:
        method: "POST"
        url: "/webhooks/stripe"
      response:
        status: 200
        body: '{"received": true}'
    
    - name: "CRM integration"
      request:
        method: "GET"
        urlPattern: "/api/v1/contacts/.*"
      response:
        status: 200
        bodyFileName: "{{crm_mock_file}}"
    
    - name: "Analytics API"
      request:
        method: "POST"
        url: "/api/events"
      response:
        status: 202
```

---

## Test Data Seeding

### 6.1 Seeding Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Test Data Seeding                         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Seed Generator                        │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │   Tenants   │  │    Users    │  │    Data     │   │   │
│  │  │   Seeds     │  │   Seeds     │  │   Seeds     │   │   │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │   │
│  │         └─────────────────┼─────────────────┘         │   │
│  │                           ▼                           │   │
│  │                   ┌─────────────┐                     │   │
│  │                   │   Seeder    │                     │   │
│  │                   │   Engine    │                     │   │
│  │                   └──────┬──────┘                     │   │
│  │                          │                            │   │
│  │         ┌────────────────┼────────────────┐          │   │
│  │         ▼                ▼                ▼          │   │
│  │   ┌──────────┐    ┌──────────┐    ┌──────────┐      │   │
│  │   │ Postgres │    │  Vector  │    │  Cache   │      │   │
│  │   │   Data   │    │   Data   │    │   Data   │      │   │
│  │   └──────────┘    └──────────┘    └──────────┘      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Seed Categories

| Category | Data Types | Count | Tenant-Scoped |
|----------|------------|-------|---------------|
| Tenants | Tenant records | {{tenant_seed_count}} | No |
| Users | User accounts | {{user_seed_count}} | Yes |
| Content | Documents, files | {{content_seed_count}} | Yes |
| Agents | AI agent configs | {{agent_seed_count}} | Yes |
| Workflows | Workflow definitions | {{workflow_seed_count}} | Yes |
| Conversations | Chat history | {{conversation_seed_count}} | Yes |
| Embeddings | Vector data | {{embedding_seed_count}} | Yes |

### 6.3 Seed Configuration

```yaml
seed_config:
  mode: "{{seed_mode}}"
  truncate_first: {{truncate_first}}
  
  tenants:
    count: {{tenant_count}}
    tiers:
      free: {{free_tier_count}}
      pro: {{pro_tier_count}}
      enterprise: {{enterprise_tier_count}}
  
  users:
    per_tenant_min: {{users_min}}
    per_tenant_max: {{users_max}}
    roles:
      admin: {{admin_ratio}}
      member: {{member_ratio}}
      viewer: {{viewer_ratio}}
  
  agents:
    per_tenant: {{agents_per_tenant}}
    types: [{{agent_types}}]
  
  conversations:
    per_user_min: {{conversations_min}}
    per_user_max: {{conversations_max}}
    messages_per_conversation: {{messages_per_conversation}}
  
  embeddings:
    documents_per_tenant: {{docs_per_tenant}}
    chunks_per_document: {{chunks_per_doc}}
    embedding_dimension: {{embedding_dim}}
```

### 6.4 Seed Commands

| Command | Action | Use Case |
|---------|--------|----------|
| pnpm db:seed | Full seed | Initial setup |
| pnpm db:seed:minimal | Minimal data | Quick testing |
| pnpm db:seed:tenant {{id}} | Single tenant | Focused testing |
| pnpm db:seed:reset | Clear + reseed | Clean state |
| pnpm db:seed:agents | AI agents only | Agent development |

### 6.5 Factory Patterns

```yaml
factories:
  tenant:
    id: "uuid()"
    name: "faker.company.name()"
    slug: "faker.helpers.slugify(name)"
    tier: "faker.helpers.arrayElement(['free', 'pro', 'enterprise'])"
    created_at: "faker.date.past()"
    
  user:
    id: "uuid()"
    tenant_id: "parent.tenant.id"
    email: "faker.internet.email()"
    name: "faker.person.fullName()"
    role: "faker.helpers.arrayElement(['admin', 'member', 'viewer'])"
    
  agent:
    id: "uuid()"
    tenant_id: "parent.tenant.id"
    name: "faker.hacker.noun() + ' Agent'"
    type: "{{ai_runtime}}"
    config: "{{agent_config_template}}"
    
  conversation:
    id: "uuid()"
    tenant_id: "parent.tenant.id"
    user_id: "parent.user.id"
    agent_id: "parent.agent.id"
    created_at: "faker.date.recent()"
```

---

## AI Agent Local Testing

### 7.1 Agent Testing Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 AI Agent Local Testing                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Test Harness                          │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │   Unit      │  │ Integration │  │   E2E       │   │   │
│  │  │   Tests     │  │   Tests     │  │   Tests     │   │   │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │   │
│  │         └─────────────────┼─────────────────┘         │   │
│  │                           ▼                           │   │
│  │                   ┌─────────────┐                     │   │
│  │                   │   Agent     │                     │   │
│  │                   │   Runner    │                     │   │
│  │                   └──────┬──────┘                     │   │
│  │                          │                            │   │
│  │         ┌────────────────┼────────────────┐          │   │
│  │         ▼                ▼                ▼          │   │
│  │   ┌──────────┐    ┌──────────┐    ┌──────────┐      │   │
│  │   │  Mock    │    │   Real   │    │  Hybrid  │      │   │
│  │   │   LLM    │    │   LLM    │    │  (Cached)│      │   │
│  │   └──────────┘    └──────────┘    └──────────┘      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Agent Test Types

| Type | LLM Mode | Scope | Speed |
|------|----------|-------|-------|
| Unit | Mock | Single tool/node | Fast |
| Integration | Mock/Cached | Full agent flow | Medium |
| E2E | Real | Complete workflow | Slow |
| Regression | Cached | Known scenarios | Medium |
| Stress | Mock | Load testing | Variable |

### 7.3 Agent Test Configuration

```yaml
agent_testing:
  runtime: "{{ai_runtime}}"
  
  llm_mode:
    default: "mock"
    integration: "cached"
    e2e: "real"
  
  mocking:
    provider: "litellm"
    response_dir: "{{agent_mock_dir}}"
    
  caching:
    enabled: true
    cache_dir: "{{agent_cache_dir}}"
    ttl_days: {{cache_ttl_days}}
    
  recording:
    enabled: {{agent_recording_enabled}}
    record_dir: "{{agent_record_dir}}"
    
  fixtures:
    conversations: "{{conversation_fixtures_dir}}"
    tool_responses: "{{tool_fixtures_dir}}"
    
  tenant_context:
    default_tenant: "{{test_tenant_id}}"
    test_user: "{{test_user_id}}"
```

### 7.4 Agent Test Commands

| Command | Action | LLM Mode |
|---------|--------|----------|
| pnpm test:agents | All agent tests | Mock |
| pnpm test:agents:unit | Unit tests only | Mock |
| pnpm test:agents:integration | Integration tests | Cached |
| pnpm test:agents:e2e | End-to-end tests | Real |
| pnpm test:agents:record | Record LLM responses | Real |
| pnpm test:agents:replay | Replay recorded | Cached |

### 7.5 Agent Debug Tools

| Tool | Purpose | Command |
|------|---------|---------|
| Agent Inspector | Visualize agent graph | pnpm agent:inspect |
| Trace Viewer | View execution trace | pnpm agent:trace |
| State Debugger | Inspect state changes | pnpm agent:state |
| Tool Tester | Test individual tools | pnpm agent:tool {{tool}} |
| Prompt Debugger | Debug prompts | pnpm agent:prompt |

### 7.6 Test Scenario Schema

```yaml
agent_test_scenario:
  name: "{{scenario_name}}"
  description: "{{scenario_description}}"
  
  setup:
    tenant_id: "{{test_tenant_id}}"
    user_id: "{{test_user_id}}"
    agent_id: "{{test_agent_id}}"
    
  input:
    message: "{{test_input_message}}"
    context: {{test_context}}
    
  expected:
    response_contains: [{{expected_phrases}}]
    tools_called: [{{expected_tools}}]
    state_changes: {{expected_state}}
    
  assertions:
    - type: "response_quality"
      threshold: {{quality_threshold}}
    - type: "latency"
      max_ms: {{max_latency}}
    - type: "token_count"
      max_tokens: {{max_tokens}}
```

---

## Development Workflow

### 8.1 Daily Workflow

| Step | Command | Frequency |
|------|---------|-----------|
| Start services | docker compose up -d | Once daily |
| Start dev server | pnpm dev | Start of work |
| Run tests | pnpm test:watch | Continuous |
| Check types | pnpm typecheck | Before commit |
| Lint | pnpm lint | Before commit |
| Stop services | docker compose down | End of day |

### 8.2 Branch Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                   Development Branch Flow                    │
│                                                              │
│  main ──────●───────────●───────────●───────────●────────   │
│              │           ▲                       ▲           │
│              │           │                       │           │
│  feature ────┴─────●─────┴─────●─────────────────┴──────    │
│                    │           │                             │
│                    │           │                             │
│  local ────────────┴───────────┴─────────────────────────   │
│                    │           │                             │
│               commit + test  PR + CI                        │
└─────────────────────────────────────────────────────────────┘
```

### 8.3 Pre-commit Hooks

| Hook | Action | Blocking |
|------|--------|----------|
| lint-staged | Lint changed files | Yes |
| type-check | TypeScript check | Yes |
| test:affected | Test changed modules | Yes |
| secrets-scan | Detect secrets | Yes |
| commit-msg | Validate commit format | Yes |

---

## Troubleshooting

### 9.1 Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Port already in use | Previous container running | `docker compose down` |
| Database connection failed | Container not ready | Wait or `docker compose restart postgres` |
| LLM timeout | Mock not configured | Check `litellm.yaml` config |
| Tenant not found | Missing seed data | `pnpm db:seed` |
| Agent test failure | Stale cache | `pnpm agent:cache:clear` |

### 9.2 Debug Commands

| Command | Purpose |
|---------|---------|
| docker compose logs -f {{service}} | View service logs |
| pnpm db:studio | Open database UI |
| pnpm dev:debug | Start with debugger |
| pnpm agent:trace {{id}} | View agent execution |

---

## Implementation Checklist

### 10.1 Environment Setup

- [ ] Prerequisites installed
- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Environment variables configured

### 10.2 Docker Configuration

- [ ] Docker Compose working
- [ ] All profiles tested
- [ ] Health checks passing
- [ ] Volumes persisting

### 10.3 Multi-Tenant Simulation

- [ ] Test tenants seeded
- [ ] Tenant switching works
- [ ] Isolation verified
- [ ] Context injection working

### 10.4 Mock Services

- [ ] LLM mocks configured
- [ ] External API mocks ready
- [ ] Recording/replay tested
- [ ] Mock responses valid

### 10.5 AI Agent Testing

- [ ] Agent test harness ready
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] E2E workflow validated

---

## Appendix A: Configuration Reference

```yaml
local_dev_config:
  tenant_model: "{{tenant_model}}"
  ai_runtime: "{{ai_runtime}}"
  
  docker:
    compose_version: "{{compose_version}}"
    default_profile: "core"
    
  database:
    host: "localhost"
    port: 5432
    user: "{{db_user}}"
    password: "{{db_password}}"
    
  ai:
    llm_proxy_port: 4000
    default_mock_mode: "static"
    
  testing:
    parallel_workers: {{test_workers}}
    coverage_threshold: {{coverage_threshold}}
```

---

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "local development environment best practices {date}"
- "multi-tenant development setup SaaS patterns {date}"
- "Docker compose local dev enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] System requirements are documented with minimum and recommended specs
- [ ] Tool installation instructions are complete and tested
- [ ] Initial setup script runs successfully on a fresh machine
- [ ] All environment variables are documented with defaults
- [ ] Docker Compose profiles cover all development scenarios
- [ ] Multi-tenant simulation includes tenants for each tier
- [ ] Tenant switching mechanisms work correctly
- [ ] Mock services are configured for all external dependencies
- [ ] LLM mock configuration supports multiple response modes
- [ ] Test data seeding creates realistic multi-tenant data
- [ ] AI agent test harness supports unit, integration, and E2E tests
- [ ] Troubleshooting guide covers common setup issues

---

## Appendix B: Related Documents

- Pattern: `local-development` in `bam-patterns.csv`
- Docker: `docker-compose.yml`
- Environment: `.env.example`
- Testing: `testing-strategy-template.md`

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
