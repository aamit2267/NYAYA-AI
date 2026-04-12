<div align="center">
  <img src="./nyaya-frontend/public/logo.png" alt="Nyaya-AI Logo" width="150" />
  
  # ⚖️ NYAYA-AI
  **Legal Guidance for Every Indian Citizen.**
  
  ![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge)
  ![Architecture](https://img.shields.io/badge/Architecture-RAG%20%7C%20Microservices-success?style=for-the-badge)
  ![Languages](https://img.shields.io/badge/Languages-English%20%7C%20Hindi-blueviolet?style=for-the-badge)
  ![Made with Love](https://img.shields.io/badge/Made%20with%20❤️-India-saffron?style=for-the-badge)
</div>

---

> [!CAUTION]
> **CRITICAL LEGAL DISCLAIMER**
> 
> **Nyaya-AI is an experimental Artificial Intelligence tool and NOT a registered advocate or human legal authority.** This platform provides factual information retrieved from official Indian legal acts and defines possibilities for genuine case filings. It **cannot** make binding judgments or provide actionable legal representation. 
>
> ⚠️ **Limitations**:
> - Cannot replace professional legal counsel
> - Should not be used for contested matters
> - Users should verify information with qualified lawyers
> - Platform assumes no liability for misuse or misguidance
>
> **For serious legal matters, always consult a registered practitioner under the Bar Council of India.**

---

## 🎬 Project Vision & Impact

### The Problem
India's legal system is one of the world's largest and most complex. With over **50 million pending cases** in Indian courts, citizens face tremendous barriers to understanding their rights:

- 📜 **Legal jargon** in Acts & statutes is incomprehensible to average citizens
- 🔍 **Knowledge asymmetry** between lawyers and common people
- 💰 **High consultation costs** make legal advice inaccessible
- 🌐 **Language barriers** exclude 70% of non-English speakers
- ⏰ **Time constraints** for quick legal information retrieval

### The Solution
**Nyaya-AI** democratizes legal knowledge through:
- 🤖 **Intelligent RAG Pipeline** that retrieves relevant legal sections instantly
- 🔒 **Privacy-First Architecture** with local LLMs (no data sent to third parties)
- 🌍 **Bilingual Support** (English & Hindi) for broader accessibility
- ⚡ **Real-Time Streaming** responses for engaging user experience
- 📱 **Responsive Design** optimized for mobile-first India

### 🚀 The Engineering Ambition
As a Full Stack Engineer with enterprise experience, **Nyaya-AI** demonstrates mastery across the AI/ML stack:

**Backend Innovations**:
* ✅ Local LLM orchestration (Ollama) eliminating data privacy risks
* ✅ Vector database optimization (pgvector + HNSW indexing)
* ✅ Production-grade RAG pipeline from document ingestion to streaming
* ✅ Spring Boot microservices with async processing & caching

**Frontend Excellence**:
* ✅ MVVM architecture in Next.js for testability & maintainability
* ✅ Real-time SSE streaming for token-by-token LLM responses
* ✅ Bilingual state management with language toggling
* ✅ Accessibility-first design (dark mode, color-blind modes)

**System Design Highlights**:
* ✅ Horizontal scalability with stateless services
* ✅ Multi-layer security (API keys, CORS, input validation)
* ✅ Observable architecture with health checks & logging
* ✅ Cost-optimized deployment on free cloud tiers

---

## 💻 Tech Stack & Architecture

### Technology Stack by Layer

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript) | MVVM architecture, SSE streaming, bilingual UI state |
| **Styling** | ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Lucide](https://img.shields.io/badge/Lucide_Icons-blue?style=for-the-badge) | Responsive design, dark/light modes, accessibility |
| **Backend API** | ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white) ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) | Spring Boot 4.0.5, REST APIs, exception handling |
| **AI/ML** | ![LangChain](https://img.shields.io/badge/LangChain4j-gray?style=for-the-badge) ![Ollama](https://img.shields.io/badge/Ollama-white?style=for-the-badge&logo=ollama&logoColor=black) | Local LLMs, prompt orchestration, RAG pipeline |
| **Vector DB** | ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![pgvector](https://img.shields.io/badge/pgvector-green?style=for-the-badge) | Semantic search, HNSW indexing |
| **Orchestration** | ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Docker Compose](https://img.shields.io/badge/docker%20compose-blue?style=for-the-badge&logo=docker) | Container management, networking |

### Architecture Pattern
```
┌─────────────────────────────────────────┐
│   Next.js Frontend (MVVM)               │
│   • Real-time SSE Streaming             │
│   • Bilingual Support                   │
│   • Dark/Accessible Modes               │
└─────────────┬───────────────────────────┘
              │ HTTP/REST
              ↓
┌─────────────────────────────────────────┐
│   Spring Boot API Layer                 │
│   • API Key Authentication              │
│   • CORS Configuration                  │
│   • Global Exception Handling           │
└─────────────┬───────────────────────────┘
              │
    ┌─────────┴──────────┐
    ↓                    ↓
┌─────────────────┐  ┌──────────────────┐
│  Chat Service   │  │  Admin Service   │
│  + RAG Pipeline │  │  + Ingestion     │
└────────┬────────┘  └────────┬─────────┘
         │                    │
         └──────────┬─────────┘
                    ↓
      ┌─────────────────────────┐
      │  LangChain4J Agent      │
      │  • Prompt Templates     │
      │  • LLM Orchestration    │
      └───────────┬─────────────┘
                  ↓
    ┌─────────────────────────┐
    ↓                         ↓
┌─────────────────┐  ┌──────────────────┐
│  Ollama (LLM)   │  │  Ollama (Embed)  │
│  • Llama 3      │  │  • nomic-embed   │
│  • Mistral      │  │  • mxbai-embed   │
└─────────────────┘  └──────────────────┘
         │                    │
         └──────────┬─────────┘
                    ↓
        ┌──────────────────────┐
        │  PostgreSQL 16       │
        │  + pgvector          │
        │  • Document Store    │
        │  • Vector Index      │
        │  • Session History   │
        └──────────────────────┘
```

---

## 🛠️ Core Features & Capabilities

### 1. 💬 Intelligent Legal Chat Interface
- **Real-Time Streaming**: Token-by-token response generation via SSE
- **Context-Aware Responses**: RAG pipeline retrieves relevant legal sections
- **Conversation History**: Persists across sessions with unique IDs
- **Error Handling**: Graceful degradation and user-friendly error messages

**Example**:
```
User: "What are my rights as a tenant?"
Nyaya-AI: [Retrieves Rent Control Act sections]
          [Generates bilingual response with citations]
          [Streams response in real-time]
```

### 2. 🔐 Secure Administrator Portal
- **API-Key Authentication**: X-API-KEY header validation
- **Document Management**: Upload PDFs or raw text files
- **Intelligent Chunking**: Automatic text splitting with overlap
- **Batch Processing**: Async ingestion for performance
- **Audit Logging**: Track all admin actions for compliance

**Workflow**:
```
Admin uploads PDF
    ↓
Spring Boot parses & chunks
    ↓
LangChain4J generates embeddings
    ↓
pgvector indexes with HNSW
    ↓
"Ready for queries" notification
```

### 3. 🆘 Emergency Helplines Directory
- **Verified Contacts**: Curated list of Indian helplines
- **Multi-Category**: Legal, mental health, cyber crime, consumer rights
- **Quick Access**: Interactive carousel for easy browsing
- **Always Updated**: Admin-managed database

**Coverage**:
- 🚔 Cyber Crime Department
- 👨‍⚖️ Bar Council Associations
- 💪 Consumer Rights Commission
- 🧠 Mental Health Crisis Lines (KIRAN)
- 🏥 Emergency Medical Services

### 4. 📊 Health & Observability
- **Live Health Checks**: Actuator endpoint monitoring
- **Component Status**: DB, LLM, Vector DB real-time status
- **Performance Metrics**: Response latency, cache hit rates
- **Visual Feedback**: Glowing status indicator in footer

**Endpoints**:
- `/actuator/health` - Full system health
- `/actuator/metrics` - Performance data
- `/actuator/prometheus` - Metrics export

### 5. 🌍 Bilingual Support (EN/HI)
- **Complete Localization**: All UI text in English & Hindi
- **Legal Terminology**: Context-aware translations
- **Language Persistence**: User preference saved
- **RTL Support**: Ready for future 20+ Indian Languages

---

## 🚀 Quick Start

### Prerequisites
- **Docker & Docker Compose**: v20+
- **Node.js**: v18+
- **Java**: OpenJDK 21+
- **Git**: Latest version
- **4GB+ RAM**, **20GB+ Disk Space**

### Step 1️⃣ Clone the Repository

```bash
git clone https://github.com/aamit2267/NYAYA-AI.git
cd nyaya-ai
```

### Step 2️⃣ Environment Setup

```bash
# Copy environment files
cp .env.example .env
cp .env.local.example .env.local

# Edit .env with your configuration
nano .env

# Required variables:
# POSTGRES_USER=nyaya_user
# POSTGRES_PASSWORD=your_secure_password
# POSTGRES_DB=nyaya
# ADMIN_API_KEY=your_admin_api_key
```

### Step 3️⃣ Database & Service Startup

```bash
# Start PostgreSQL + pgvector (Docker)
docker-compose -f docker-compose.dev.yml up -d

# Verify PostgreSQL is running
docker ps

# Initialize database (if not auto-initialized)
docker exec nyaya_postgres_dev psql -U nyaya_user -d nyaya -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

### Step 4️⃣ Backend Setup

```bash
cd nyaya-backend

# Build Maven project
mvn clean install -DskipTests

# Start Spring Boot (Dev Mode)
mvn spring-boot:run

# Backend runs on http://localhost:8080
# Swagger UI: http://localhost:8080/swagger-ui.html
```

### Step 5️⃣ Frontend Setup

```bash
cd ../nyaya-frontend

# Install dependencies
npm install

# Create .env.local
cp .env.local.example .env.local

# Set Backend URL
echo "NEXT_PUBLIC_API_URL=http://localhost:8080" >> .env.local

# Start development server
npm run dev

# Frontend runs on http://localhost:3000
```

### Step 6️⃣ Verify Installation

```bash
# Test Backend Health
curl http://localhost:8080/actuator/health

# Test Frontend
open http://localhost:3000

# Try a simple query in the chat interface
```

**Success! 🎉** Your Nyaya-AI instance is now running locally.

---

## 📖 Usage Guide

### For Citizens (Chat Interface)

1. **Navigate to Homepage**: `http://localhost:3000`
2. **Select Language**: Toggle between English/Hindi (top-right)
3. **Ask Legal Question**: Type your query in the chat box
   - Example: "What is the Consumer Protection Act?"
4. **Review Response**: Read streamed response with citations
5. **Check Status**: Look at footer health indicator

### For Administrators (Document Upload)

1. **Access Admin Portal**: `http://localhost:3000/admin`
2. **Authenticate**: Use your `ADMIN_API_KEY`
3. **Upload Document**:
   - Click "Upload Document"
   - Select PDF or TXT file
   - Add metadata (optional)
   - Click "Process"
4. **Monitor Status**:
   - View "Chunks Processed"
   - Verify "Embeddings Indexed"
5. **Verify Upload**:
   - Ask a query related to uploaded content
   - Confirm AI retrieves correct sections

### For Developers (API Integration)

#### Chat Query Endpoint
```bash
curl -X POST http://localhost:8080/api/chat/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What are my rights as an employee?",
    "language": "en",
    "sessionId": "user-uuid"
  }'

# Response: Streams text via SSE
```

#### Document Upload Endpoint
```bash
curl -X POST http://localhost:8080/api/admin/upload \
  -H "X-API-KEY: your_admin_api_key" \
  -F "file=@Legal_Document.pdf" \
  -F "metadata={\"source\": \"Supreme Court\"}"

# Response: { "status": "success", "documentsProcessed": 5 }
```

---

## 🔒 Security Posture

### Data Privacy
✅ **Zero External API Calls**: All LLM processing happens locally via Ollama  
✅ **No Data Leakage**: User queries never sent to OpenAI/Anthropic/other third parties  
✅ **Encrypted Storage**: Sensitive fields encrypted at rest (future enhancement)  
✅ **GDPR Ready**: Can delete user data and conversation history on request  

### API Security
✅ **API Key Authentication**: X-API-KEY header validation for admin endpoints  
✅ **CORS Protection**: Strict origin validation per environment  
✅ **Rate Limiting**: 10 requests/minute per IP for chat  
✅ **Input Validation**: SQL injection & XSS prevention via parameterized queries  

### Application Security
✅ **Global Exception Handler**: Never exposes stack traces to clients  
✅ **Prompt Injection Prevention**: Context validation before LLM  
✅ **Audit Logging**: All admin actions logged with timestamps & IPs  
✅ **Secure Defaults**: HTTPS enforced, security headers included  

---

## 🗂️ Project Structure

```
nyaya-ai/
├── nyaya-backend/                   # Spring Boot API
│   ├── src/main/java/com/nyaya/backend/
│   │   ├── agent/                  # LangChain4J orchestration
│   │   ├── controller/             # REST endpoints
│   │   ├── service/                # Business logic
│   │   ├── config/                 # Spring configuration
│   │   ├── security/               # Auth & filters
│   │   ├── exception/              # Error handling
│   │   └── ...
│   ├── pom.xml                     # Maven dependencies
│   └── Dockerfile                  # Container image
│
├── nyaya-frontend/                  # Next.js UI
│   ├── src/
│   │   ├── app/                    # App Router pages
│   │   ├── components/             # React components
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── utils/                  # Utilities
│   │   └── types/                  # TypeScript types
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.dev.yml          # Local development
├── .env.example                    # Environment template
└── README.md                       # This file

```

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **[HLD.md](./docs/HLD.md)** | Architecture, components, data flows |
| **[LLD.md](./docs/LLD.md)** | Code structure, APIs, class diagrams |
| **[API.md](./docs/API.md)** | REST endpoint documentation (Swagger) |
| **[TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)** | Common issues & solutions |
| **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** | Production deployment guide |

---

## 🚧 Current Status & Roadmap

### ✅ Completed
- [x] Full-stack RAG pipeline architecture
- [x] Spring Boot API with LangChain4J integration
- [x] PostgreSQL + pgvector vector database
- [x] Next.js MVVM frontend with SSE streaming
- [x] Bilingual support (EN/HI)
- [x] API Key authentication for admin endpoints
- [x] Docker Compose local development setup
- [x] Health check & observability endpoints

### 🔄 In Progress
- [ ] Document ingestion batch processing optimization
- [ ] Prompt injection detection & prevention
- [ ] Response caching with Redis
- [ ] Enhanced LLM model evaluation

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style
- Add unit tests for new features
- Update documentation for API changes
- Test locally before submitting PR

---

## 🙏 Acknowledgments

- **LangChain Community**: For the incredible LangChain4J framework
- **Ollama Team**: For enabling local LLM inference
- **pgvector Contributors**: For vector database capabilities
- **Spring Boot Team**: For the enterprise framework
- **Next.js Community**: For frontend excellence
- **Indian Legal System**: For inspiring this project

---

## 📈 Impact & Vision

We believe that **justice should be accessible to all**, regardless of economic status or language. Nyaya-AI is a step toward democratizing legal knowledge in India.

**Our Mission**: To bridge the gap between India's complex legal system and its 1.4+ billion citizens.

**Our Vision**: A future where every Indian can understand their rights, without barriers of language, cost, or complexity.

---

<div align="center">
  
### 🌟 Star this Repository if You Believe in Accessible Justice! ⚖️

**"Law is for everyone, and everyone deserves access to law."**

---

<i>Architected & Developed by <b>Amit Agarwal</b></i>

<i>Built with ❤️ for India | 🇮🇳</i>

</div>