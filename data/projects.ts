export interface Project {
  title: string;
  role: string;
  tags: string[];
  description: string[];
  url: string;
  accentColor: string;
  accentBg: string;
  mockupUrl: string;
}

export const projects: Project[] = [
  {
    title: "CyberGuard AI",
    role: "Developer",
    tags: [".NET 8", "FastAPI", "LangGraph", "OpenSearch", "Docker"],
    url: "cyberguard.lakshaycodes.dev",
    accentColor: "#CCFF00",
    accentBg: "rgba(204,255,0,",
    mockupUrl: "cyberguard.lakshaycodes.dev",
    description: [
      "An agentic RAG platform for security advisory intelligence. Combines a .NET 8 API gateway with five Python FastAPI microservices for vulnerability search, PDF analysis, and operational monitoring, all surfaced through a Next.js dashboard.",
      "Built hybrid retrieval over GitHub Security Advisories using OpenSearch BM25 and vector search with Jina AI embeddings. The agentic RAG workflow adds retrieval routing, document grading, query rewriting, and answer generation via LangGraph, with local LLM inference through Ollama.",
      "Orchestrated the full stack with Docker Compose: .NET gateway, LangChain and LangGraph AI services, Hangfire recurring advisory ingestion, Langfuse observability tracing, PostgreSQL, Redis, and OpenSearch, with JWT and optional Google and GitHub OAuth authentication.",
    ],
  },
  {
    title: "KnowGraph",
    role: "Developer",
    tags: [".NET 8", "Neo4j", "FastAPI", "Ollama", "Docker"],
    url: "knowgraph.lakshaycodes.dev",
    accentColor: "#63B3ED",
    accentBg: "rgba(99,179,237,",
    mockupUrl: "knowgraph.lakshaycodes.dev",
    description: [
      "An AI-powered causal event graph system for understanding why complex world events happen through interactive cause-and-effect chains. Built with a .NET 8 REST API using Clean Architecture (MediatR, CQRS, FluentValidation) and a Python FastAPI AI sidecar for local LLM inference.",
      "Models events as directed graph nodes in Neo4j with typed causal edges (DirectlyCaused, ContributedTo, Contested, Enabled, Prevented) and supports multi-perspective analysis through Mainstream, Geopolitical, Structural, Economic, and Revisionist lenses. EF Core handles PostgreSQL persistence for users, chains, and audit data.",
      "The AI sidecar uses Ollama for local LLM inference and Qdrant for vector search, generating causal chain suggestions and event summaries with no external API keys required. The full stack runs on Docker Compose with JWT auth, Redis caching, Serilog structured logging, and ASP.NET health checks.",
    ],
  },
];
