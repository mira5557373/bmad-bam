---
pattern_id: multi-modal-rag
shortcode: ZMM
category: advanced-ai
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Multi-Modal RAG - BAM Pattern

**Loaded by:** ZMM  
**Applies to:** Image/audio/video retrieval, cross-modal search, multi-modal embeddings

---

## When to Use

- RAG systems requiring image, audio, or video understanding
- Cross-modal search (find images from text, text from images)
- Document understanding with mixed content (PDFs with diagrams)
- Multi-tenant systems with diverse media content
- Knowledge bases combining text and visual information

## When NOT to Use

- Text-only retrieval systems
- Real-time processing with strict latency requirements
- Systems without multi-modal model access
- Simple keyword-based search

## Architecture

### Multi-Modal Processing Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                   Multi-Modal RAG System                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Ingestion Pipeline                      │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐      │   │
│  │  │  Text   │  │  Image  │  │  Audio  │  │  Video  │      │   │
│  │  │ Parser  │  │ Encoder │  │ Encoder │  │ Encoder │      │   │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘      │   │
│  │       │            │            │            │            │   │
│  │       └────────────┴────────────┴────────────┘            │   │
│  │                          │                                 │   │
│  │                          ▼                                 │   │
│  │               ┌─────────────────────┐                     │   │
│  │               │  Unified Embedding  │                     │   │
│  │               │      Space          │                     │   │
│  │               └─────────────────────┘                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Tenant Vector Store                     │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │  tenant_id │ modality │ embedding │ metadata         │ │   │
│  │  │  RLS Policy: WHERE tenant_id = current_tenant()     │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Retrieval Engine                        │   │
│  │  Query ──► Multi-Modal Encode ──► Cross-Modal Search      │   │
│  │                                         │                  │   │
│  │                              ┌──────────┴──────────┐      │   │
│  │                              ▼                     ▼      │   │
│  │                         Text Results          Image Results │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Embedding Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| CLIP | Aligned text-image space | Image search from text |
| ImageBind | 6-modality alignment | Cross-modal search |
| Whisper + CLIP | Audio transcription + vision | Podcast/video search |
| ColPali | Document + layout aware | PDF with diagrams |
| Late Fusion | Separate then combine | Flexible retrieval |

### Modality-Specific Processing

| Modality | Preprocessing | Embedding Model | Chunk Strategy |
|----------|---------------|-----------------|----------------|
| Text | Tokenization, cleaning | text-embedding-3 | Semantic chunks |
| Image | Resize, normalize | CLIP ViT-L/14 | Full image + patches |
| Audio | Transcribe + acoustic | Whisper + CLAP | Time-windowed |
| Video | Frame extraction | CLIP per frame | Keyframe + scene |
| PDF | OCR + layout | ColPali | Page + section |

## Configuration Schema

```yaml
bam_controlled: true

multi_modal_rag:
  embedding_models:
    text:
      model: "text-embedding-3-large"
      dimensions: 3072
      
    image:
      model: "clip-vit-l-14"
      dimensions: 768
      preprocessing:
        resize: [224, 224]
        normalize: true
        
    audio:
      transcription_model: "whisper-large-v3"
      embedding_model: "text-embedding-3-large"
      chunk_duration_seconds: 30
      
    video:
      frame_extraction:
        fps: 1
        keyframe_only: true
      embedding_model: "clip-vit-l-14"
      
  unified_space:
    projection_method: "learned_linear"
    target_dimensions: 768
    alignment_loss: "contrastive"
    
  vector_store:
    backend: "pgvector"
    table: "multi_modal_embeddings"
    indexes:
      - type: "hnsw"
        m: 16
        ef_construction: 64
    tenant_isolation: "rls"
    
  retrieval:
    default_top_k: 10
    reranking:
      enabled: true
      model: "cross-encoder/ms-marco-MiniLM-L-12-v2"
    cross_modal:
      enabled: true
      weight_text: 0.4
      weight_image: 0.3
      weight_other: 0.3
      
  tenant_config:
    tier_limits:
      free:
        modalities: ["text"]
        max_documents: 1000
        max_storage_gb: 1
        
      pro:
        modalities: ["text", "image"]
        max_documents: 50000
        max_storage_gb: 50
        
      enterprise:
        modalities: ["text", "image", "audio", "video"]
        max_documents: 1000000
        max_storage_gb: 500
        custom_models: true
        
  processing:
    batch_size: 32
    async_ingestion: true
    queue: "multi_modal_ingest"
    workers: 4
```

### Multi-Modal Document Schema

```yaml
multi_modal_document:
  document_id: "doc_uuid_001"
  tenant_id: "tenant_123"
  created_at: "2026-04-30T12:00:00Z"
  
  source:
    type: "pdf"
    filename: "technical_report.pdf"
    size_bytes: 2500000
    
  content:
    text_chunks:
      - chunk_id: "chunk_001"
        content: "Executive summary..."
        embedding: [0.1, 0.2, ...]
        page: 1
        
    images:
      - image_id: "img_001"
        description: "System architecture diagram"
        embedding: [0.3, 0.4, ...]
        page: 5
        bounding_box: [100, 200, 500, 600]
        
    tables:
      - table_id: "tbl_001"
        caption: "Performance metrics"
        structured_data: {...}
        embedding: [0.5, 0.6, ...]
        page: 8
        
  relationships:
    - from: "chunk_001"
      to: "img_001"
      type: "references"
      
  metadata:
    language: "en"
    total_pages: 25
    modalities: ["text", "image", "table"]
    processing_time_ms: 45000
```

## Trade-offs

| Approach | Benefit | Cost |
|----------|---------|------|
| Unified embedding space | Cross-modal search | Training/alignment overhead |
| Separate embeddings | Simpler implementation | No cross-modal capability |
| Real-time processing | Fresh content | High compute requirements |
| Batch processing | Cost efficiency | Delayed availability |
| High-res images | Better understanding | Storage and compute costs |

## Cross-Modal Search Patterns

| Query Modality | Target Modality | Use Case |
|----------------|-----------------|----------|
| Text | Image | "Find diagrams showing microservices" |
| Image | Text | Upload screenshot, find documentation |
| Text | Audio | "Find podcast discussing AI safety" |
| Text | Video | "Show onboarding tutorial videos" |
| Image | Image | Visual similarity search |

## Web Research Queries

- "multi-modal RAG architecture patterns {date}"
- "CLIP ImageBind retrieval systems {date}"
- "cross-modal search implementation {date}"
- "multi-tenant vector store best practices {date}"
- "ColPali document understanding {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Multi-modal embeddings isolated by tenant |
| QG-AI1 | Cross-modal search respects tenant boundaries |
| QG-AI1 | Media processing within tier limits |

## Related Patterns

- [semantic-chunking.md](semantic-chunking.md) - Text chunking strategies
- [embedding-pipeline.md](embedding-pipeline.md) - Embedding generation
- [hybrid-search.md](hybrid-search.md) - Combined search patterns
- [knowledge-refresh.md](knowledge-refresh.md) - Content refresh
