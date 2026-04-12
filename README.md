<div align="center">
  <img src="./nyaya-frontend/public/logo.png" alt="Nyaya-AI Logo" width="150" />
  
  # ⚖️ NYAYA-AI
  **Legal Guidance for Every Indian Citizen.**
  
  ![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge)
  ![Architecture](https://img.shields.io/badge/Architecture-RAG%20%7C%20Microservices-success?style=for-the-badge)
  ![Languages](https://img.shields.io/badge/Languages-English%20%7C%20Hindi-blueviolet?style=for-the-badge)
</div>

---

> [!CAUTION]
> **CRITICAL LEGAL DISCLAIMER** > **Nyaya-AI is an experimental Artificial Intelligence tool and NOT a registered advocate or human legal authority.** This platform provides factual information retrieved from official Indian legal acts and defines possibilities for genuine case filings. It **cannot** make binding judgments or provide actionable legal representation. For serious legal matters, always consult a registered practitioner under the Bar Council of India.

---

## 🎬 Project Documentary: The Vision & Scope

**Nyaya-AI** was conceived to bridge the massive gap between the complex Indian legal system and the everyday citizen. From property disputes to consumer rights, understanding one's legal standing often requires deciphering dense legal jargon. This project leverages the power of Local Large Language Models (LLMs) to democratize legal knowledge, offering an empathetic, bilingual (English & Hindi), and highly accessible interface.

### 🚀 The Engineering Challenge & Career Transition
As a Full Stack Engineer with a strong foundation in enterprise backend systems, Spring Boot, and microservices architecture, **Nyaya-AI** serves as my proving ground for transitioning into the **Applied AI domain**. 

The goal was not just to "wrap an API," but to build a production-grade **Retrieval-Augmented Generation (RAG) pipeline** from scratch. This project tests and validates my skills in:
* Orchestrating local AI models (Ollama) to eliminate third-party data privacy risks.
* Implementing and tuning Vector Databases (`pgvector`) for high-dimensional semantic search.
* Designing an intelligent document ingestion engine that chunks, embeds, and indexes raw legal acts (PDFs and raw text).
* Building a strict MVVM frontend architecture in Next.js to ensure real-time streaming, bilingual reactivity, and enterprise-level error handling.

---

## 💻 Tech Stack & Architecture

The architecture is built with a production-first mindset, emphasizing strong separation of concerns, security filters, and cross-origin resource sharing (CORS) configurations for distinct micro-environments.

| Layer | Technology | Purpose & Implementation |
| :--- | :--- | :--- |
| **Frontend UI** | ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) | Developed using strict MVVM design patterns. Handles UI states, theme toggling, and real-time Server-Sent Events (SSE) for chat. |
| **Styling & UX** | ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Lucide](https://img.shields.io/badge/Lucide_Icons-blue?style=for-the-badge) | Highly responsive `100vh` locked layouts with interactive, bouncy scrolling mechanisms and dynamic Color-Blind/Dark modes. |
| **Backend Core** | ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white) ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) | RESTful API architecture ensuring robust exception handling, API-Key filter chains, and asynchronous task execution. |
| **AI Orchestration**| ![LangChain](https://img.shields.io/badge/LangChain4j-gray?style=for-the-badge) ![Ollama](https://img.shields.io/badge/Ollama-white?style=for-the-badge&logo=ollama&logoColor=black) | Managing prompt templates, text-splitting, and communication with local embedding models (e.g., Llama 3 / Nomic-Embed). |
| **Vector DB** | ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) | Relational storage utilizing the `pgvector` extension via Docker Compose for efficient cosine similarity semantic searches. |

---

## 🛠️ Core Features & Capabilities

### 1. Bilingual Citizen Interface
The UI actively listens to Next.js view models to transition seamlessly between English and Hindi, ensuring language is never a barrier to justice. 

### 2. Administrator Knowledge Ingestion
A highly secure, API-Key protected admin portal allowing authorized users to upload raw text or legal PDFs (like the Consumer Protection Act). The backend processes, chunks, vectorizes, and securely commits this to the database, actively growing the AI's "brain."

### 3. Integrated Indian Helplines
An interactive carousel providing immediate, verified contact information for emergencies, including the Cyber Crime Department, National Consumer Helpline, and KIRAN Mental Health Crisis lines.

### 4. Health & Observability (DevOps)
A live glowing Actuator health-check pinging the Spring Boot backend (`/actuator/health`) directly from the footer, providing immediate system status visualization.

---

## 🔒 Security Posture

> [!IMPORTANT]
> Security is non-negotiable when dealing with legal contexts. 
> * **Zero-Data Leakage:** By utilizing local LLMs (Ollama), no user queries are sent to external third parties (like OpenAI or Anthropic).
> * **Custom Filter Chains:** Spring Security intercepts pre-flight CORS requests and strictly validates `X-API-KEY` headers before allowing vector manipulation.
> * **Global Exception Resolvers:** Bulletproof endpoint error handling prevents "double-commit" streams and masks internal server stack traces from the client.

---

## 🚧 Current Status & Roadmap

**Status:** Under Active Development.

The underlying RAG architecture, database connections, and full MVVM frontend have been successfully wired together. The focus is currently on refining the prompt injection logic for the chat streaming interface and expanding the initial corpus of Indian Legal data.

*Note: Deployment pipelines and hosting strategies are currently being finalized and are held in private repositories pending the live public demo.*

---
<div align="center">
  <i>Architected & Developed by <b>Amit Agarwal</b></i>
</div>