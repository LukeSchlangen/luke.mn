export interface TrendingTopic {
  id: string;
  title: string;
  category: string;
  status: "Hot" | "Emerging" | "Evergreen";
  description: string;
  keyPoints: string[];
  contentIdeas: string[];
  sourceUrl?: string;
}

export interface TrendingSnapshot {
  date: string; // ISO standard format YYYY-MM-DD
  title: string;
  description: string;
  topics: TrendingTopic[];
}

export const TRENDING_SNAPSHOTS: Record<string, TrendingSnapshot> = {
  "2026-09-11": {
    date: "2026-09-11",
    title: "September 2026 Snapshot",
    description:
      "Grounded in real-time technical updates from Google Cloud Blogs, Hacker News, and AI Developer frameworks—highlighting Gemini 3.5, Google Agent Platform, SecOps AI agents, WebMCP, and cryptographic sub-agent passes.",
    topics: [
      {
        id: "gemini-35-agent-platform",
        title: "Gemini 3.5 & Google Cloud Agent Platform",
        category: "Google Cloud AI",
        status: "Hot",
        description:
          "Google Cloud's announcement of Gemini 3.5 Flash, Google Antigravity, and the Agent Platform—providing an end-to-end framework to build, scale, govern, and deploy autonomous agentic workflows in enterprise applications.",
        keyPoints: [
          "Gemini 3.5 Flash combining frontier model intelligence with agentic tool execution.",
          "Google Antigravity integration for enterprise-wide agentic application development.",
          "Gemini Spark 24/7 personal AI agent taking autonomous actions across Google Workspace.",
        ],
        contentIdeas: [
          "Reacting to Google Cloud's Gemini 3.5 & Agent Platform Announcement",
          "Building Autonomous Workflows with Gemini 3.5 Flash & Google Antigravity",
          "How Google Cloud's Agent Platform Changes Enterprise AI Architecture",
        ],
        sourceUrl:
          "https://cloud.google.com/blog/products/ai-machine-learning/innovations-from-google-io-26-on-google-cloud",
      },
      {
        id: "google-secops-threat-hunt-agent",
        title: "Google SecOps Threat Hunt Agent & Agentic Flows",
        category: "Cloud Security & SecOps",
        status: "Hot",
        description:
          "Google Security Operations introduces Public Preview for Threat Hunt Agent and API-supported Agentic Flows, enabling autonomous SIEM triage, log latency analysis, and automated threat response.",
        keyPoints: [
          "Threat Hunt Agent for enterprise-scale threat detection and automated triage.",
          "API support for programmatic orchestration of SecOps Agentic Flows.",
          "Native log latency analysis and Cloud Logging feed diagnostics.",
        ],
        contentIdeas: [
          "Automating SIEM Triage with Google SecOps Threat Hunt Agent",
          "Building Agentic Security Operations Pipelines on Google Cloud",
          "How AI Agents Are Eliminated Modern SOC Alert Fatigue",
        ],
        sourceUrl:
          "https://security.googlecloudcommunity.com/what-s-new-in-secops-91/what-s-new-in-google-secops-2026-08-17-8112",
      },
      {
        id: "agentic-ai-subagent-passes",
        title: "AI Agents & Sub-Agent Permission Passes",
        category: "AI Security & Multi-Agent Systems",
        status: "Hot",
        description:
          "Delegating sub-tasks to autonomous AI sub-agents using cryptographically signed capability passes, fine-grained tool scopes, and rate limits to prevent prompt injection and unauthorized action drift.",
        keyPoints: [
          "Signed permission tokens (Pigeon passes) for scoped sub-agent tool execution.",
          "Mitigating prompt injection and tool misuse in multi-agent orchestration.",
          "Audit logging and human-in-the-loop revocation controls for autonomous sub-tasks.",
        ],
        contentIdeas: [
          "Securing Sub-Agent Delegation in Production AI Workflows",
          "Cryptographically Signed Tool Permissions for AI Agents",
          "Preventing Agent Drift: Scoping Sub-Agent Capabilities Safely",
        ],
        sourceUrl: "https://github.com/pigeonlabsHQ/pigeon",
      },
      {
        id: "webmcp-browser-agents",
        title: "WebMCP & Client-Side In-Browser Tool Interfaces",
        category: "Web & AI Standards",
        status: "Hot",
        description:
          "Standardizing client-side tool execution via navigator.modelContext, turning web applications into Model Context Protocol (MCP) servers for browser-native AI agents.",
        keyPoints: [
          "Exposing web app functions natively to browser AI extensions without UI scraping.",
          "Security models, permission prompting, and user consent loops for client-side tool execution.",
          "Polyfilling WebMCP across modern browsers with @mcp-b/global and local relay servers.",
        ],
        contentIdeas: [
          "Making Your Next.js App Agent-Ready with WebMCP in 10 Minutes",
          "WebMCP vs API Endpoints: Designing Client-Side Tools for Browser AI",
          "Testing WebMCP Tool Registrations with the Chrome Model Context Inspector",
        ],
        sourceUrl: "https://github.com/mcp-b/global",
      },
      {
        id: "cloud-run-serverless-ai-gpus",
        title: "Cloud Run Serverless GPUs & Async Event Pipelines",
        category: "Cloud Infrastructure",
        status: "Evergreen",
        description:
          "Deploying containerized AI microservices, serverless NVIDIA GPU inference, Eventarc/PubSub async queues, and real-time streaming LLM response handlers on Cloud Run.",
        keyPoints: [
          "NVIDIA GPU support on Cloud Run for running open-source models and sidecars.",
          "Decoupling long-running agent tasks using Pub/Sub event streams and checkpoints.",
          "Server-Sent Events (SSE) & WebSockets for real-time streaming responses in Next.js.",
        ],
        contentIdeas: [
          "Deploying Custom Model Endpoints & Sidecars on Cloud Run",
          "Serverless GPUs: Running Open Source LLMs on Cloud Run",
          "Handling Real-Time Streaming Responses with Next.js & Cloud Run",
        ],
        sourceUrl: "https://cloud.google.com/run",
      },
    ],
  },
  "2026-09-06": {
    date: "2026-09-06",
    title: "September 06, 2026 Snapshot",
    description:
      "Grounded in recent web trends across Hacker News, Google Cloud blogs, and AI developer forums focusing on sub-agent delegation, WebMCP, local agent safety, and Gemini reasoning models.",
    topics: [
      {
        id: "agentic-ai-subagent-passes",
        title: "AI Agents & Sub-Agent Permission Passes",
        category: "AI Security & Multi-Agent Systems",
        status: "Hot",
        description:
          "Delegating sub-tasks to autonomous AI sub-agents using cryptographically signed capability passes, fine-grained tool scopes, and rate limits to prevent prompt injection and unauthorized action drift.",
        keyPoints: [
          "Signed permission tokens (Pigeon passes) for scoped sub-agent tool execution.",
          "Mitigating prompt injection and tool misuse in multi-agent orchestration.",
          "Audit logging and human-in-the-loop revocation controls for autonomous sub-tasks.",
        ],
        contentIdeas: [
          "Securing Sub-Agent Delegation in Production AI Workflows",
          "Cryptographically Signed Tool Permissions for AI Agents",
          "Preventing Agent Drift: Scoping Sub-Agent Capabilities Safely",
        ],
        sourceUrl: "https://github.com/pigeonlabsHQ/pigeon",
      },
      {
        id: "webmcp-browser-agents",
        title: "WebMCP & Client-Side In-Browser Tool Interfaces",
        category: "Web & AI Standards",
        status: "Hot",
        description:
          "Standardizing client-side tool execution via navigator.modelContext, turning web applications into Model Context Protocol (MCP) servers for browser-native AI agents.",
        keyPoints: [
          "Exposing web app functions natively to browser AI extensions without UI scraping.",
          "Security models, permission prompting, and user consent loops for client-side tool execution.",
          "Polyfilling WebMCP across modern browsers with @mcp-b/global and local relay servers.",
        ],
        contentIdeas: [
          "Making Your Next.js App Agent-Ready with WebMCP in 10 Minutes",
          "WebMCP vs API Endpoints: Designing Client-Side Tools for Browser AI",
          "Testing WebMCP Tool Registrations with the Chrome Model Context Inspector",
        ],
        sourceUrl: "https://github.com/mcp-b/global",
      },
      {
        id: "open-source-agent-frameworks-rowboat",
        title: "Open-Source Multi-Agent IDEs & Local Safety Nets",
        category: "Developer Tooling",
        status: "Hot",
        description:
          "Building local-first safety sandboxes, trace inspectors, and open-source orchestration layers (such as Rowboat and Kintsugi) for multi-agent software engineering.",
        keyPoints: [
          "Local-first agent sandboxes for safe execution and evaluation of AI-generated code.",
          "Multi-agent interaction visualization, state tree debugging, and prompt trace inspection.",
          "Context sharing and transcript sync across AI assistants (Claude Code, Codex, Cursor).",
        ],
        contentIdeas: [
          "Local Safety Nets for Autonomous AI Coding Agents",
          "Inspecting Multi-Agent State Trees in Open-Source Agent IDEs",
          "Cross-Agent Context Sharing: Claude Code to Codex Workflows",
        ],
        sourceUrl: "https://github.com/rowboatlabs/rowboat",
      },
      {
        id: "gemini-context-caching-reasoning",
        title: "Gemini 2.0 Thinking Models & Context Caching",
        category: "LLM Engineering",
        status: "Hot",
        description:
          "Leveraging 2M+ token context windows, native context caching to save up to 80% on token costs, and visible chain-of-thought thinking models for complex code and logic debugging.",
        keyPoints: [
          "Context Caching to drastically reduce latency and cost for repeated multi-megabyte context.",
          "Transparent step-by-step reasoning inspectability with Gemini Flash Thinking.",
          "Native video/audio understanding without pre-transcription pipelines.",
        ],
        contentIdeas: [
          "Gemini Context Caching Masterclass: Save 80% on LLM Token Bills",
          "Debugging Complex Algorithms with Gemini Thinking Models",
          "Processing 1-Hour Long Video Inputs Natively on Google Cloud",
        ],
        sourceUrl: "https://cloud.google.com/vertex-ai",
      },
      {
        id: "cloud-run-serverless-ai-gpus",
        title: "Cloud Run Serverless GPUs & Async Event Pipelines",
        category: "Cloud Infrastructure",
        status: "Evergreen",
        description:
          "Deploying containerized AI microservices, serverless NVIDIA GPU inference, Eventarc/PubSub async queues, and real-time streaming LLM response handlers on Cloud Run.",
        keyPoints: [
          "NVIDIA GPU support on Cloud Run for running open-source models and sidecars.",
          "Decoupling long-running agent tasks using Pub/Sub event streams and checkpoints.",
          "Server-Sent Events (SSE) & WebSockets for real-time streaming responses in Next.js.",
        ],
        contentIdeas: [
          "Deploying Custom Model Endpoints & Sidecars on Cloud Run",
          "Serverless GPUs: Running Open Source LLMs on Cloud Run",
          "Handling Real-Time Streaming Responses with Next.js & Cloud Run",
        ],
        sourceUrl: "https://cloud.google.com/run",
      },
    ],
  },
  "2026-05-08": {
    date: "2026-05-08",
    title: "May 2026 Historical Snapshot",
    description:
      "Archived snapshot of trending topics, prior to the September 2026 revision.",
    topics: [
      {
        id: "agentic-ai-harness",
        title: "Agentic AI & Agent Harnesses",
        category: "AI Architecture",
        status: "Hot",
        description:
          "Multi-agent orchestration, tool calling patterns, deterministic evaluation loops, and stateful human-in-the-loop workflows.",
        keyPoints: [
          "Function/tool calling reliability and error recovery strategies.",
          "Agent memory persistence across long conversations.",
          "Evaluation benchmarks for autonomous tool-using agents.",
        ],
        contentIdeas: [
          "Building Production-Ready AI Agents with Google AI Studio & Tool Calling",
          "Evaluating Agentic Workflows: Unit Testing Your LLM Prompts & Tools",
          "Human-in-the-Loop Pattern: Gated Approvals in Serverless Agent Flows",
        ],
      },
      {
        id: "gemini-multimodal-context",
        title: "Gemini 1.5 & Multimodal Context Processing",
        category: "LLM Engineering",
        status: "Hot",
        description:
          "Leveraging 1M-2M token context windows, native video/audio understanding, structured JSON schema outputs, and prompt compression.",
        keyPoints: [
          "Processing hours of audio/video natively without pre-transcription.",
          "Context Caching to drastically reduce latency and cost for repeated context.",
          "Strict JSON schema enforcement for downstream system integration.",
        ],
        contentIdeas: [
          "Analyzing 1-Hour Long Videos Natively with Gemini 1.5 Pro",
          "Context Caching Masterclass: Save 80% on Token Costs",
          "Structured Outputs in Production: Ensuring 100% Valid JSON Responses",
        ],
      },
      {
        id: "firebase-genkit",
        title: "Firebase Genkit & Full-Stack AI Development",
        category: "Developer Frameworks",
        status: "Emerging",
        description:
          "Open-source framework for building, testing, tracing, and deploying AI-powered applications in TypeScript & Node.js.",
        keyPoints: [
          "Local Developer UI for rapid prompt engineering and flow inspection.",
          "Built-in telemetry, distributed tracing, and OpenTelemetry integration.",
          "Seamless integration with Firebase Auth, Firestore, and Cloud Functions.",
        ],
        contentIdeas: [
          "Getting Started with Firebase Genkit: From Zero to Deployed AI Flow",
          "Tracing and Monitoring Production LLM Workloads with Genkit",
          "Building a Retrieval-Augmented Generation (RAG) App in 15 Minutes",
        ],
      },
      {
        id: "cloud-run-serverless-ai",
        title: "Cloud Run for Serverless AI Microservices",
        category: "Cloud Infrastructure",
        status: "Evergreen",
        description:
          "Deploying containerized AI workloads, serverless GPU inference, streaming response handlers, and zero-scale cost efficiency.",
        keyPoints: [
          "NVIDIA GPU support on Cloud Run for local LLM & diffusion model inference.",
          "Server-Sent Events (SSE) & WebSockets for real-time streaming LLM responses.",
          "Direct integration with Vertex AI endpoints and Google Secret Manager.",
        ],
        contentIdeas: [
          "Deploying Custom Model Endpoints & Sidecars on Cloud Run",
          "Serverless GPUs: Running Open Source LLMs on Cloud Run",
          "Handling Real-Time Streaming Responses with Next.js & Cloud Run",
        ],
      },
      {
        id: "token-economics-finops",
        title: "AI Token Economics & FinOps",
        category: "Operations & Strategy",
        status: "Hot",
        description:
          "Strategies for optimizing LLM API costs, model routing (Flash vs. Pro), token budgeting, and cost allocation.",
        keyPoints: [
          "Model routing strategies: cascading queries from low-cost to high-capability models.",
          "Calculated ROI of Context Caching vs. Vector RAG for large documents.",
          "Setting rate limits, quotas, and cost guardrails in production.",
        ],
        contentIdeas: [
          "Model Routing: When to Use Gemini 1.5 Flash vs. 1.5 Pro",
          "AI FinOps 101: Preventing Runaway LLM API Bills in Cloud Run",
          "Token Budgeting for Multi-User SaaS Applications",
        ],
      },
      {
        id: "rag-vs-finetuning",
        title: "RAG vs. Fine-Tuning Decision Framework",
        category: "AI Architecture",
        status: "Evergreen",
        description:
          "Evaluating when to use Retrieval-Augmented Generation (RAG), long-context prompting, or parameter fine-tuning.",
        keyPoints: [
          "Grounding responses with Google Search Grounding vs. custom Vector Search.",
          "Fine-tuning Gemini models on Vertex AI for customized voice & domain knowledge.",
          "Trade-offs: freshness, latency, accuracy, cost, and maintenance overhead.",
        ],
        contentIdeas: [
          "RAG vs. Fine-Tuning vs. Long Context: Decision Matrix for 2025",
          "Grounding Gemini with Google Search in 5 Lines of Code",
          "Building Hybrid Search with Vertex AI Vector Search & Firestore",
        ],
      },
      {
        id: "webmcp-browser-agents",
        title: "WebMCP & In-Browser Agent Interfaces",
        category: "Web & AI Standards",
        status: "Hot",
        description:
          "Standardizing client-side tool execution via navigator.modelContext, turning web applications into Model Context Protocol (MCP) servers for browser-native AI agents.",
        keyPoints: [
          "Exposing web app functions natively to browser AI extensions without UI scraping.",
          "Security models, permission prompting, and user consent loops for client-side tool execution.",
          "Polyfilling WebMCP across modern browsers with @mcp-b/global and local relay servers.",
        ],
        contentIdeas: [
          "Making Your Next.js App Agent-Ready with WebMCP in 10 Minutes",
          "WebMCP vs API Endpoints: Designing Client-Side Tools for Browser AI",
          "Testing WebMCP Tool Registrations with the Chrome Model Context Inspector",
        ],
      },
      {
        id: "mcp-enterprise-integrations",
        title: "Model Context Protocol (MCP) Enterprise Architecture",
        category: "AI Infrastructure",
        status: "Hot",
        description:
          "Connecting LLM agents and enterprise data platforms securely using standardized Model Context Protocol (MCP) servers and cloud gateways.",
        keyPoints: [
          "Building custom MCP servers in TypeScript and Go for internal microservices.",
          "Google Cloud MCP Toolbox for Databases: Bridging Gemini CLI & Claude Desktop with Cloud SQL & BigQuery.",
          "Authentication, rate limiting, and observability patterns for production MCP servers.",
        ],
        contentIdeas: [
          "Architecting Enterprise AI Agents with Google Cloud & MCP Toolbox",
          "Building an Internal MCP Server with Node.js and Cloud Run",
          "MCP Security Best Practices: Securing Tool Calling in Production",
        ],
      },
      {
        id: "reasoning-models-chain-of-thought",
        title: "Reasoning Models & Visible Chain-of-Thought",
        category: "LLM Engineering",
        status: "Hot",
        description:
          "Leveraging transparent step-by-step reasoning models (e.g., Gemini 2.0 Flash Thinking) for complex problem solving, debugging, and verifiable AI decisions.",
        keyPoints: [
          "Extracting and inspecting internal reasoning steps before generating final outputs.",
          "Prompt design strategies tailored for reasoning LLMs in math, coding, and logical evaluation.",
          "Balancing latency vs. accuracy: choosing between instant Flash models and reasoning variants.",
        ],
        contentIdeas: [
          "Inspecting LLM Thoughts: Building Trust with Gemini 2.0 Flash Thinking",
          "Reasoning LLMs in Code Generation: Debugging Complex Algorithms Automatically",
          "Chain-of-Thought vs. Few-Shot Prompting: Benchmarking Accuracy on Edge Cases",
        ],
      },
      {
        id: "agent-evals-ci-cd",
        title: "AI Agent Evals & Automated Continuous Benchmarking",
        category: "DevOps & Evals",
        status: "Emerging",
        description:
          "Implementing deterministic and LLM-as-a-judge evaluation frameworks for agentic tool calling, prompt regressions, and multi-turn workflows.",
        keyPoints: [
          "Building CI/CD evaluation pipelines to test LLM prompt changes automatically.",
          "Measuring tool invocation accuracy, arguments parsing, and loop recovery.",
          "Synthesizing dataset ground truth for multi-step agent trajectory verification.",
        ],
        contentIdeas: [
          "Unit Testing AI Agents: Building CI/CD Eval Pipelines with GitHub Actions",
          "LLM-as-a-Judge vs. Deterministic Assertions for Tool Calling",
          "Measuring Agent Drift: How to Catch Regressions Before Production Deployments",
        ],
      },
      {
        id: "event-driven-serverless-ai",
        title: "Event-Driven Serverless AI Pipelines",
        category: "Cloud Infrastructure",
        status: "Evergreen",
        description:
          "Combining Cloud Run, Eventarc, Pub/Sub, and serverless background tasks for resilient, long-running agentic workflows and streaming responses.",
        keyPoints: [
          "Decoupling LLM request processing with pub/sub event channels for async execution.",
          "Handling extended agent tasks with serverless execution limits and checkpointing.",
          "Streaming live progress updates back to frontend clients via WebSockets & Server-Sent Events (SSE).",
        ],
        contentIdeas: [
          "Building Async AI Background Workers with Cloud Run & Pub/Sub",
          "Handling 5-Minute Agent Tasks Serverlessly on Google Cloud",
          "Real-Time SSE Agent Dashboards with Next.js and Serverless Workflows",
        ],
      },
    ],
  },
};

export const LATEST_SNAPSHOT_DATE = "2026-09-11";

export function getLatestSnapshot(): TrendingSnapshot {
  return TRENDING_SNAPSHOTS[LATEST_SNAPSHOT_DATE];
}

export function getSnapshot(date: string): TrendingSnapshot | undefined {
  return TRENDING_SNAPSHOTS[date];
}

export function getSnapshotDates(): string[] {
  return Object.keys(TRENDING_SNAPSHOTS).sort((a, b) => b.localeCompare(a));
}
