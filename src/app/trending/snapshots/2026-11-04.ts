import { TrendingSnapshot } from "../types";

export const snapshot20261104: TrendingSnapshot = {
  date: "2026-11-04",
  title: "November 4, 2026 Snapshot",
  description:
    "Grounded in verified technical releases, blogs, and community trends (Oct 31–Nov 4, 2026)—featuring Google Cloud's five rules for evaluating agent skills (ideal candidate for Luke's reaction video), the Google Cloud Developer Plugin in Antigravity Marketplace, Postman desktop's unauthorized coding agent plugin auto-install controversy, Matthew Honnibal's breakdown of Weight-Space Programming claims, and Apple WebKit's Adaptive Dark Mode in Safari 27.3 beta.",
  topics: [
    {
      id: "evaluating-agent-skills-context-window-bloat",
      title: "Five Rules for Evaluating Agent Skills Before They Bloat Your Context Window",
      category: "Google Cloud & Agent Architecture",
      status: "Hot",
      description:
        "Karl Weinmeister and Alan Blount publish Google Cloud's engineering playbook for validating SKILL.md files. They explain why copy-pasting CLI docs into markdown damages frontier models, open-source skill-reach for detecting trigger collisions, and advocate paired WITH vs. W/OUT ablation loops in isolated Harbor pods on GKE Autopilot.",
      keyPoints: [
        "Rule 1: Gate trigger collisions and security risks before spinning up containers; coding agents only inspect YAML frontmatter at turn zero, causing under-triggering or sibling hijacking.",
        "Rule 2 & 3: Never trust evals run on developer laptops due to ambient cached tokens; measure paired WITH vs. W/OUT ablation (Pass@3) rather than single-shot vibes.",
        "Rule 4 & 5: Isolate verification containers to prevent agents from reward-hacking fitness scores, and encode operational habits rather than static documentation dumps.",
        "Ideal candidate for Luke to read on camera and record a hands-on reaction video demonstrating skill-reach and agent evaluation loops.",
      ],
      contentIdeas: [
        "Reacting to Google Cloud's 5 Rules for Agent Skills: Why Your SKILL.md Is Hurting Your Agent!",
        "Stop Bloating Your Context Window: Testing skill-reach with Antigravity",
        "How We Evaluate Coding Agent Plugins in GKE Harbor Pods",
      ],
      sourceUrl:
        "https://cloud.google.com/blog/topics/developers-practitioners/evaluate-agent-skills-before-they-bloat-your-context-window",
    },
    {
      id: "google-cloud-developer-plugin-antigravity-marketplace",
      title: "Google Cloud Developer Plugin Now Available in Antigravity Marketplace",
      category: "Google Cloud & Antigravity",
      status: "Hot",
      description:
        "Google Cloud introduces the official google-cloud-developer plugin in Antigravity Marketplace Build with Google section, equipping autonomous coding agents with live documentation grounding via a pre-authorized Developer Knowledge MCP server, safety guardrails, and dynamic skill routing.",
      keyPoints: [
        "Bundles essential day-one skills: finding-google-skills, retrieving-developer-knowledge, gcloud execution guardrails, and recipe auth/onboarding rules.",
        "Includes a pre-authorized Developer Knowledge Model Context Protocol (MCP) server requiring zero API key config, OAuth tokens, or credential file edits.",
        "Dynamic discovery engine queries the google/skills catalog on demand, keeping agent context fast and token-efficient.",
        "Directly complements Luke's work on Antigravity developer tools and autonomous agent workflows.",
      ],
      contentIdeas: [
        "First Look: Google Cloud Developer Plugin in Antigravity Marketplace",
        "Zero-Config MCP: How the Google Developer Knowledge Server Works in Antigravity",
        "Dynamic Skill Routing: Solving Context Window Bloat in Autonomous Coding Agents",
      ],
      sourceUrl:
        "https://cloud.google.com/blog/topics/developers-practitioners/google-cloud-developer-plugin-now-available-in-antigravity-marketplace",
    },
    {
      id: "postman-desktop-auto-installs-agent-plugins-hooks",
      title: "Postman Desktop Auto-Installs Codex, Claude Code, and Copilot Plugins and Hooks Without Consent",
      category: "General Developer Ecosystem",
      status: "Hot",
      description:
        "A severe developer trust incident erupts on GitHub (#14370) and Hacker News as users discover recent Postman desktop updates automatically modified user configs in Codex (~/.codex/config.toml), Claude Code (~/.claude/settings.json), and Copilot, injecting persistent session hooks and unauthorized MCP connections without user opt-in.",
      keyPoints: [
        "Postman desktop launch logs revealed 'auto-existing-upgrade' running background scripts that installed CLI tools and agent plugins without prompt or confirmation.",
        "Installed SessionStart hooks in Codex instructed models to route all non-trivial API engineering work through Postman skills by default.",
        "Installer attempted self-approval of hooks by writing trusted hashes into agent configs, crossing critical host-application security boundaries.",
        "Enormous ecosystem controversy highlighting the perils of desktop apps silently tampering with developers' AI agent environments and MCP servers.",
      ],
      contentIdeas: [
        "Why Postman's Auto-Installing Agent Plugins Broke Developer Trust",
        "Agent Hook Injection: The New Security Nightmare for Claude Code and Codex",
        "How Coding Agent Workspaces Need to Enforce Explicit Permission Sandboxes",
      ],
      sourceUrl:
        "https://github.com/postmanlabs/postman-app-support/issues/14370",
    },
    {
      id: "astra-weight-space-programming-misleading-critique",
      title: "The 'Astra Can Read and Write Weights to Improve Qwen' Post Is Misleading: Breaking Down the Claims",
      category: "General Developer Ecosystem",
      status: "Hot",
      description:
        "spaCy creator Matthew Honnibal publishes an in-depth breakdown of viral 'Weight-Space Programming' claims, showing that frontier LLMs did not natively edit neural network weights from raw floats alone; rather, successful model improvements relied on Python scripting, test environments, and multi-pass practice problems.",
      keyPoints: [
        "Deconstructs the distinction between reading raw weights in context (which only worked on toy networks of 17K-172K params) and large model tuning.",
        "Demonstrates that the headline Qwen3.5-0.8B math improvement (7.9% to 48.1%) used Python scripts running the model across 50 practice problem passes, not zero-shot weight surgery.",
        "Crucial ecosystem reality check demonstrating that AI agents act as capable ML engineers writing inspection code rather than possessing mysterious intuitive weight perceptions.",
        "High-signal topic outside Google Cloud where there is virtually no existing Google Cloud content.",
      ],
      contentIdeas: [
        "Did AI Really Edit Its Own Neural Network Weights? Matthew Honnibal's Reality Check",
        "Weight-Space Programming vs Python Agent Tooling: What Actually Happened",
        "Why Prompting AI to Write PyTorch Scripts Beats 'Raw Float Intuition'",
      ],
      sourceUrl: "https://honnibal.dev/blog/astra-read-write-misleading",
    },
    {
      id: "safari-adaptive-dark-mode-webkit-27-3",
      title: "Safari Introduces Adaptive Dark Mode in 27.3: Automatic Contrast and Hue-Preserved Luminosity",
      category: "General Developer Ecosystem",
      status: "Hot",
      description:
        "Apple's WebKit team introduces Adaptive Dark Mode in Safari 27.3 beta, automatically adapting light websites to dark mode using a specialized color matrix that inverts luminosity while preserving hue, WCAG 4.5:1 text contrast ratios, and SVG/bitmap icon histograms without exposing fingerprintable CSS signals to trackers.",
      keyPoints: [
        "Solves the disparity where ~40% of web page loads are from users in dark mode, but only ~10% of websites natively support dark themes.",
        "Uses browser-level color matrix transformations to invert light backgrounds and text while leaving canvas elements, masks, and already-dark designs untouched.",
        "Includes privacy-preserving architecture: JavaScript cannot query CSS transformed colors, preventing tracker fingerprinting.",
        "Introduces developer control via `<meta name=\"color-scheme\" content=\"light only\">` and highlights best practices for modern web styling.",
      ],
      contentIdeas: [
        "Safari's Adaptive Dark Mode: How WebKit Automatically Inverts Light Websites",
        "Does Your Web App Need a Dark Mode in 2026? Testing Safari 27.3 Beta",
        "Privacy-Preserving CSS: Why Apple Concealed Dark Mode Transforms from JavaScript",
      ],
      sourceUrl:
        "https://webkit.org/blog/18541/introducing-adaptive-dark-mode/",
    },
  ],
};

export default snapshot20261104;
