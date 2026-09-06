import { DeploymentConfiguration, Theme } from "../../types";
import ProseContainer from "../prose-container";
import CopyLinkIcon from "../copy-link-icon";
import colorValues from "../../utils/color-values";
import Navbar from "../navbar";
import Footer from "../footer";

export interface TrendingTopic {
  id: string;
  title: string;
  category: string;
  status: "Hot" | "Emerging" | "Evergreen";
  description: string;
  keyPoints: string[];
  contentIdeas: string[];
}

export const TRENDING_TOPICS: TrendingTopic[] = [
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
];

export default function TrendingPage({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  const { textColorClass, bodyBackgroundColor } = colorValues(theme);

  return (
    <div className={`w-full min-h-screen ${textColorClass}`}>
      <style>{`body { background-color: ${bodyBackgroundColor} }`}</style>
      <Navbar theme={theme} deploymentConfiguration={deploymentConfiguration} />
      <div className="m-auto max-w-prose">
        <header className="my-16">
          <ProseContainer theme={theme}>
            <div className="flex items-center gap-3">
              <h1 className="m-2 text-4xl">Trending Topics</h1>
              <span className="rounded bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-500 border border-amber-500/30">
                Luke&apos;s Idea Vault
              </span>
            </div>
            <h2 className="m-2">
              Curated list of high-impact topics relevant to AI builder advocacy,
              cloud architecture, and developer tooling.
            </h2>
          </ProseContainer>
        </header>
        <main className="space-y-8">
          <ProseContainer theme={theme}>
            <section className="space-y-6">
              {TRENDING_TOPICS.map((topic) => (
                <details
                  key={topic.id}
                  open
                  className="space-y-4 border p-4 transition-colors"
                >
                  <summary className="cursor-pointer text-xl font-bold flex flex-wrap items-center justify-between gap-2 list-none">
                    <span className="flex items-center gap-2">
                      <span>{topic.title}</span>
                      <CopyLinkIcon id={topic.id} />
                    </span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded border px-2 py-0.5 opacity-80">
                        {topic.category}
                      </span>
                      <span
                        className={`rounded px-2 py-0.5 font-semibold ${
                          topic.status === "Hot"
                            ? "bg-red-500/20 text-red-500 border border-red-500/30"
                            : topic.status === "Emerging"
                            ? "bg-blue-500/20 text-blue-500 border border-blue-500/30"
                            : "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                        }`}
                      >
                        {topic.status}
                      </span>
                    </div>
                  </summary>

                  <p className="text-sm opacity-90 leading-relaxed mt-2">
                    {topic.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-dashed border-current/20">
                    <h4 className="text-sm font-semibold uppercase tracking-wider opacity-70">
                      Key Technical Focus:
                    </h4>
                    <ul className="list-disc pl-5 text-sm space-y-1 opacity-90">
                      {topic.keyPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-dashed border-current/20">
                    <h4 className="text-sm font-semibold uppercase tracking-wider opacity-70">
                      Potential Content Ideas:
                    </h4>
                    <ul className="list-disc pl-5 text-sm space-y-1 opacity-90">
                      {topic.contentIdeas.map((idea, i) => (
                        <li key={i} className="font-medium">
                          &ldquo;{idea}&rdquo;
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </section>
          </ProseContainer>
        </main>
      </div>
      <Footer />
    </div>
  );
}
