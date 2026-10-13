import { TrendingSnapshot } from "../types";

export const snapshot20261013: TrendingSnapshot = {
  date: "2026-10-13",
  title: "October 13, 2026 Snapshot",
  description:
    "Grounded in verified technical releases, blogs, and community trends (Oct 8–Oct 13, 2026)—featuring Google Antigravity 2.0 & AI Studio Surface Selection (ideal for Luke's reaction videos), Building with Gemma 4 on Google for Developers, Cloud Run GPU Services & Firebase AI Logic, Janas SSD Expert Streaming for LLMs (high-demand trend with minimal Cloud content), and SolidCraft Parametric CAD in Rust with MCP Support (general developer ecosystem).",
  topics: [
    {
      id: "antigravity-20-ai-studio-surface-selection",
      title: "Google Antigravity 2.0: Multi-Agent Orchestration & AI Studio Gemini Surface Selection",
      category: "Google Antigravity & AI Studio",
      status: "Hot",
      description:
        "An essential official Google Cloud blog post guiding developers through selecting surfaces for Antigravity 2.0—comparing Antigravity CLI, IDE extensions, and headless SDKs for orchestrating AI Studio Gemini multi-agent workflows with state persistence.",
      keyPoints: [
        "Breakdown of surface selection choices (CLI, IDE, SDK) for building multi-agent workflows in Google Antigravity 2.0.",
        "Detailed guidance on coordinating specialized AI Studio Gemini models and agent handoffs across CLI and headless SDKs.",
        "Ideal candidate for Luke to read on camera and record a video reaction to Google Antigravity's latest developer roadmap.",
      ],
      contentIdeas: [
        "Reacting to Google Antigravity 2.0 Surface Selection & AI Studio Integration!",
        "Antigravity CLI vs IDE vs SDK: Which Multi-Agent Surface Should You Choose?",
        "Building Stateful AI Studio Agent Workflows with Antigravity 2.0",
      ],
      sourceUrl:
        "https://cloud.google.com/blog/topics/developers-practitioners/choosing-your-surface-antigravity-20-antigravity-cli-antigravity-ide-or-antigravity-sdk",
    },
    {
      id: "building-with-gemma-4-google-developers",
      title: "Building with Gemma 4: On-Device & Cloud AI Workflows",
      category: "Google Cloud & Developers",
      status: "Hot",
      description:
        "Published on the Google for Developers channel, this technical deep dive explores building production applications with Gemma 4 across both local on-device runtimes and Google Cloud Vertex AI infrastructure.",
      keyPoints: [
        "Architectural breakdown of deploying Gemma 4 models across client devices and Google Cloud.",
        "Hands-on guide to fine-tuning and serving open weights models with low latency.",
        "Matches Luke's focus on developer advocacy and Google AI ecosystem toolchains.",
      ],
      contentIdeas: [
        "Deep Dive: Building Hybrid AI Apps with Gemma 4 & Google Cloud",
        "Gemma 4 Benchmark Review: On-Device Performance vs Cloud Vertex AI",
        "How to Deploy Gemma 4 on Cloud Run Serverless Containers",
      ],
      sourceUrl: "https://www.youtube.com/watch?v=7sKHiuE7J-Y",
    },
    {
      id: "cloud-run-gpu-services-firebase-ai-logic",
      title: "Cloud Run GPU Services + Firebase AI Logic: Serverless Agent Infrastructure",
      category: "Cloud Run & Firebase",
      status: "Hot",
      description:
        "Google Cloud and Firebase showcase native serverless GPU attachments on Cloud Run integrated with Firebase AI Logic, allowing developers to host high-throughput open-weight models and agent backends with zero infrastructure boilerplate.",
      keyPoints: [
        "Combines Cloud Run serverless GPU compute with Firebase AI Logic for instant LLM inference and agent execution.",
        "Reduces cold-start latency for self-hosted model backends while scaling automatically to zero.",
        "Directly matches Luke's top interests in Cloud Run, Firebase, and scalable AI infrastructure.",
      ],
      contentIdeas: [
        "Deploying Open LLMs on Cloud Run GPU Services + Firebase AI Logic!",
        "Zero-Scale Serverless AI Agents on Cloud Run: Architecture Guide",
        "Reacting to Firebase & Cloud Run GPU Serverless Updates!",
      ],
      sourceUrl: "https://www.youtube.com/watch?v=eGnQsoS_WXo",
    },
    {
      id: "janas-ssd-expert-streaming-llms",
      title: "Janas: Run LLMs Larger Than RAM by Streaming Experts from SSD",
      category: "General Developer Ecosystem",
      status: "Hot",
      description:
        "Trending heavily on Hacker News, Janas introduces high-throughput MoE expert streaming directly from NVMe SSDs, enabling models vastly larger than system RAM to run efficiently locally. There is currently minimal Google Cloud content comparing SSD expert streaming against serverless cloud inference.",
      keyPoints: [
        "Massive community interest on Hacker News with zero/minimal Google Cloud ecosystem coverage so far.",
        "Enables consumer hardware to run massive Mixture-of-Experts LLMs without ultra-expensive unified memory or GPU RAM.",
        "Great candidate for Luke to compare local SSD expert streaming against Cloud Run serverless GPU nodes.",
      ],
      contentIdeas: [
        "Streaming 100B+ MoE Models from NVMe SSD with Janas!",
        "Local SSD Expert Streaming vs Cloud Run Serverless GPU: Speed & Cost Analysis",
        "Future of Local AI: How MoE Architectures Break the Memory Barrier",
      ],
      sourceUrl: "https://github.com/prabanta-dev/janas",
    },
    {
      id: "solidcraft-rust-parametric-cad-mcp",
      title: "SolidCraft: Open-Source Parametric CAD in Rust with Model Context Protocol (MCP)",
      category: "General Developer Ecosystem",
      status: "Hot",
      description:
        "A breakout developer ecosystem trend on Hacker News featuring SolidCraft—an open-source parametric CAD engine written in Rust with native Model Context Protocol (MCP) support, enabling AI agents to construct and modify 3D CAD geometries dynamically.",
      keyPoints: [
        "Parametric 3D CAD engine built in Rust exposing native MCP tool endpoints for LLM agents.",
        "Unique trend outside the Google Cloud ecosystem that no other Google Developer Advocate has covered yet.",
        "Ideal candidate for Luke to showcase how standard MCP tools bridge autonomous AI agents with domain-specific engineering applications.",
      ],
      contentIdeas: [
        "AI Agents Designing 3D CAD Models using SolidCraft & Model Context Protocol!",
        "Rust + MCP: The New Standard for Building Agentic Developer Tools",
        "Building Model Context Protocol Tools for Engineering & Hardware Design",
      ],
      sourceUrl: "https://github.com/bherbruck/solidcraft",
    },
  ],
};
