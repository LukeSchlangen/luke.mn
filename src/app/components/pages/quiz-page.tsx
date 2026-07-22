"use client";

import { useState, useEffect, useRef } from "react";
import { DeploymentConfiguration, Theme } from "../../types";
import colorValues from "../../utils/color-values";
import Footer from "../footer";
import Navbar from "../navbar";

// NOTE FOR FUTURE AI GENERATING QUESTIONS:
// Maximum length for any answer option is ~45 characters (roughly half of 90 chars).
// Long answers (e.g., "Variables like context memory, reasoning chains, tool calls, and retries compound per request")
// cause UI overflow and layout distortion. Ensure all generated answer choices remain short and concise.
interface QuizQuestion {
  question: string;
  answers: string[]; // Max length: ~45 characters per answer option
  correctIndex: number;
  explanation: string;
}

interface ExamPreset {
  examName: string;
  questions: QuizQuestion[];
}

const GCP_EXAMS_PRESETS: ExamPreset[] = [
  {
    examName: "Cloud Digital Leader",
    questions: [
      {
        question: "Which cloud computing service model offers the highest level of customization and control over the underlying infrastructure?",
        answers: ["SaaS (Software as a Service)", "PaaS (Platform as a Service)", "IaaS (Infrastructure as a Service)", "FaaS (Function as a Service)"],
        correctIndex: 2,
        explanation: "Infrastructure as a Service (IaaS) provides virtualized computing resources, giving users maximum control over operating systems, storage, and networking."
      },
      {
        question: "Which Google Cloud service is a fully managed, serverless database designed for document store workloads?",
        answers: ["Cloud SQL", "Firestore", "Cloud Spanner", "Cloud Bigtable"],
        correctIndex: 1,
        explanation: "Firestore is a flexible, scalable, serverless NoSQL document database for mobile, web, and server development."
      },
      {
        question: "What is the primary benefit of deploying applications across multiple Google Cloud zones in a region?",
        answers: ["High availability", "Reduced latency", "Lower cost", "Global distribution"],
        correctIndex: 0,
        explanation: "Deploying across multiple zones provides fault tolerance and high availability if a single zone experiences an outage."
      },
      {
        question: "Which pricing model provides discounts on virtual machine instances in exchange for a commitment to use a minimum level of resources for 1 or 3 years?",
        answers: ["Spot VMs", "Committed Use Discounts (CUDs)", "Sustained Use Discounts (SUDs)", "On-demand pricing"],
        correctIndex: 1,
        explanation: "Committed Use Discounts (CUDs) offer significant savings when you commit to a contract of 1 or 3 years."
      },
      {
        question: "What Google Cloud service allows users to manage and enforce access control policies across all resources?",
        answers: ["Cloud Identity", "Identity and Access Management (IAM)", "Cloud Armor", "VPC Service Controls"],
        correctIndex: 1,
        explanation: "IAM lets administrators authorize who can take action on specific resources, giving full control and visibility."
      },
      {
        question: "Which of the following is a key advantage of utilizing serverless computing on Google Cloud?",
        answers: ["No code required", "Zero infrastructure management", "Fixed monthly cost", "Complete control over CPU hardware"],
        correctIndex: 1,
        explanation: "Serverless computing abstracts away all infrastructure management, allowing developers to focus on writing code while the platform automatically scales."
      },
      {
        question: "Which service provides a central repository for viewing and managing security posture, vulnerabilities, and threats?",
        answers: ["Cloud Logging", "Cloud Monitoring", "Security Command Center (SCC)", "Artifact Registry"],
        correctIndex: 2,
        explanation: "Security Command Center (SCC) is Google Cloud's security and risk management platform for identifying vulnerabilities and threats."
      },
      {
        question: "What does 'Elasticity' in cloud computing refer to?",
        answers: ["The speed of network data transfers", "Scaling resources up or down on demand", "The security level of virtual networks", "The recovery of deleted cloud resources"],
        correctIndex: 1,
        explanation: "Elasticity is the ability of cloud systems to dynamically scale resources to match real-time workload demands."
      },
      {
        question: "Which Google Cloud migration tool helps plan, track, and execute physical migrations of workloads to the cloud?",
        answers: ["Database Migration Service", "BigQuery Omni", "Google Cloud Migration Center", "Storage Transfer Service"],
        correctIndex: 2,
        explanation: "Migration Center is a unified platform that helps assess, plan, and optimize your cloud migration journey."
      },
      {
        question: "What is Google Cloud's globally distributed, horizontal-scaling SQL database with up to 99.999% availability?",
        answers: ["Cloud SQL", "Cloud Spanner", "Firestore", "BigQuery"],
        correctIndex: 1,
        explanation: "Cloud Spanner is a fully managed relational database with unlimited scale, strong consistency, and high availability."
      }
    ]
  },
  {
    examName: "Associate Cloud Engineer",
    questions: [
      {
        question: "Which gcloud command-line component is used to view configuration properties for the active account?",
        answers: ["gcloud config list", "gcloud info config", "gcloud config show", "gcloud account list"],
        correctIndex: 0,
        explanation: "Running 'gcloud config list' displays the properties of your active configuration, including active account and project."
      },
      {
        question: "Which service is best suited for hosting a containerized application with automatic scaling to zero when there is no traffic?",
        answers: ["Compute Engine", "Google Kubernetes Engine (GKE)", "Cloud Run", "App Engine Flexible"],
        correctIndex: 2,
        explanation: "Cloud Run is a fully managed compute platform that automatically scales containerized applications up and down to zero."
      },
      {
        question: "What IAM role should you assign to a developer who needs to view but not modify any resources within a project?",
        answers: ["roles/viewer", "roles/browser", "roles/editor", "roles/owner"],
        correctIndex: 0,
        explanation: "The Viewer role (roles/viewer) provides read-only permissions to see resources but not alter their configurations."
      },
      {
        question: "You want to run a batch processing job on Compute Engine that can be terminated at any time. Which type of VM should you use to minimize cost?",
        answers: ["Sole-tenant Node", "Spot VM", "Shielded VM", "Confidential VM"],
        correctIndex: 1,
        explanation: "Spot VMs offer steep discounts (60-91%) compared to standard VMs, but Google can reclaim them with a 30-second notice."
      },
      {
        question: "Which Cloud Storage class is most cost-effective for storing backups that are accessed less than once a year?",
        answers: ["Standard", "Nearline", "Coldline", "Archive"],
        correctIndex: 3,
        explanation: "Archive Storage is designed for data archiving, online backup, and disaster recovery, accessed less than once a year."
      },
      {
        question: "What tool allows you to establish a secure, private, high-performance connection between your on-premises network and VPC without traversing the public internet?",
        answers: ["Cloud VPN", "Cloud Interconnect", "VPC Network Peering", "Cloud Router"],
        correctIndex: 1,
        explanation: "Cloud Interconnect provides direct, low-latency, physical connections between your on-premises and Google Cloud networks."
      },
      {
        question: "How can you ensure that a set of Compute Engine instances can communicate with each other using internal IP addresses across different VPC networks?",
        answers: ["Use VPC Network Peering", "Configure Cloud NAT", "Assign public IP addresses", "Use a Shared VPC"],
        correctIndex: 0,
        explanation: "VPC Network Peering allows secure connection of two Virtual Private Cloud (VPC) networks so that resources can communicate privately."
      },
      {
        question: "Which service allows you to capture and analyze real-time streaming data from IoT devices at scale?",
        answers: ["Pub/Sub", "BigQuery", "Cloud Storage", "Cloud Memorystore"],
        correctIndex: 0,
        explanation: "Pub/Sub is an asynchronous, scalable messaging service that ingests event streams and distributes them to processing pipelines."
      },
      {
        question: "You need to automate the creation of a group of identical VM instances with load balancing. What should you configure?",
        answers: ["Managed Instance Group (MIG)", "Unmanaged Instance Group", "Sole-tenant node group", "Compute Engine cluster"],
        correctIndex: 0,
        explanation: "A Managed Instance Group uses an instance template to automatically deploy, scale, and manage a group of identical VM instances."
      },
      {
        question: "Which Google Cloud service acts as a distributed, scalable caching layer for application database queries?",
        answers: ["Cloud SQL", "Cloud Memorystore", "Firestore", "BigQuery"],
        correctIndex: 1,
        explanation: "Cloud Memorystore is a fully managed in-memory data store service for Redis and Memcached, ideal for low-latency caching."
      }
    ]
  },
  {
    examName: "Professional Cloud Architect",
    questions: [
      {
        question: "Your organization requires high-volume database transactions with sub-millisecond response times globally. Which database should you choose?",
        answers: ["BigQuery", "Cloud Spanner", "Cloud SQL", "Cloud Bigtable"],
        correctIndex: 1,
        explanation: "Cloud Spanner provides high-throughput transactional database access with strict consistency and global replication."
      },
      {
        question: "You are designing a disaster recovery strategy with a recovery time objective (RTO) of several hours and low cost. Which pattern should you select?",
        answers: ["Active-Active Warm Standby", "Cold Standby (Backup & Restore)", "Multi-Region Live Sync", "Active-Passive Pilot Light"],
        correctIndex: 1,
        explanation: "A Cold Standby (Backup and Restore) approach has the lowest cost, but requires rebuilding resources, which takes hours (high RTO)."
      },
      {
        question: "Which network load balancer should you use for external, non-HTTP(S) traffic on TCP ports 80 and 443 where client IP preservation is required?",
        answers: ["Global External Application Load Balancer", "Regional External Network Load Balancer", "Global External Proxy Load Balancer", "Internal TCP/UDP Load Balancer"],
        correctIndex: 1,
        explanation: "The Regional External Network Load Balancer is a pass-through layer-4 balancer that preserves client source IP addresses."
      },
      {
        question: "To comply with regulatory standards, you must encrypt storage buckets using keys managed entirely outside of Google Cloud. Which option should you use?",
        answers: ["Google-owned default keys", "Customer-Managed Encryption Keys (CMEK)", "Customer-Supplied Encryption Keys (CSEK)", "External Key Manager (EKM) via Cloud KMS"],
        correctIndex: 3,
        explanation: "External Key Manager (EKM) allows you to use keys stored in an external third-party key management partner to encrypt GCP data."
      },
      {
        question: "Which design principle helps minimize operational overhead when managing microservices running on Google Kubernetes Engine?",
        answers: ["Deploying everything to a single node", "Using Autopilot cluster mode", "Manually managing GKE node versions", "Hardcoding network configurations"],
        correctIndex: 1,
        explanation: "GKE Autopilot manages the entire underlying cluster infrastructure, including node provisioning, scaling, and security."
      },
      {
        question: "You need to migrate a monolithic application to microservices with minimum downtime. What migration strategy is recommended?",
        answers: ["Big Bang migration", "Strangler Fig pattern", "Lift and Shift", "Rehosting"],
        correctIndex: 1,
        explanation: "The Strangler Fig pattern migrates parts of a monolith incrementally to microservices until the monolith can be decommissioned."
      },
      {
        question: "How should you design a secure, high-bandwidth hybrid network connection that requires encryption over the public internet?",
        answers: ["Dedicated Interconnect", "Partner Interconnect", "HA VPN over Cloud Interconnect", "Direct Peering"],
        correctIndex: 2,
        explanation: "IPsec HA VPN over Cloud Interconnect provides both the high bandwidth of Interconnect and the security of IPsec encryption."
      },
      {
        question: "To enforce fine-grained organizational policies across all folders and projects in your hierarchy, which tool is best suited?",
        answers: ["IAM Roles", "Resource Manager Org Policies", "VPC Service Controls", "Cloud Asset Inventory"],
        correctIndex: 1,
        explanation: "Organization Policies provide centralized, programmatic control over your organization's cloud resources."
      },
      {
        question: "Your API needs to distribute load globally across instances in multiple regions, while using a single external IP address. Which load balancer is required?",
        answers: ["Global External Application Load Balancer", "Regional External Network Load Balancer", "Internal Application Load Balancer", "Regional External Proxy Load Balancer"],
        correctIndex: 0,
        explanation: "The Global External Application Load Balancer routes HTTP/S traffic globally using a single, global Anycast IP address."
      },
      {
        question: "Which Google Cloud service provides isolated execution environments for running highly sensitive, confidential workloads with runtime encryption?",
        answers: ["Shielded VMs", "Confidential Computing VMs", "Cloud HSM", "Binary Authorization"],
        correctIndex: 1,
        explanation: "Confidential VMs leverage hardware-based memory encryption to protect data in use/at runtime."
      }
    ]
  },
  {
    examName: "Professional Data Engineer",
    questions: [
      {
        question: "You need to analyze petabytes of structured and semi-structured data with SQL queries at high speeds. Which service is best?",
        answers: ["BigQuery", "Cloud Bigtable", "Cloud Spanner", "Datastore"],
        correctIndex: 0,
        explanation: "BigQuery is a serverless, highly-scalable cloud data warehouse designed for fast analytics over petabytes of data."
      },
      {
        question: "Which Apache Beam runner is utilized by Cloud Dataflow to run unified batch and streaming data processing pipelines?",
        answers: ["Direct Runner", "Flink Runner", "Spark Runner", "Dataflow Runner"],
        correctIndex: 3,
        explanation: "Cloud Dataflow executes Apache Beam pipelines using the specialized, serverless Dataflow Runner."
      },
      {
        question: "What database service is optimized for high-throughput, low-latency analytical and operational workloads on non-relational wide-column data?",
        answers: ["Cloud SQL", "Firestore", "Cloud Bigtable", "Cloud Spanner"],
        correctIndex: 2,
        explanation: "Cloud Bigtable is Google's NoSQL wide-column database, designed for large analytical and operational workloads."
      },
      {
        question: "You want to automate the ingestion of continuous real-time data from Pub/Sub, transform it, and write to BigQuery. Which managed service is recommended?",
        answers: ["Cloud Composer", "Cloud Dataflow", "Cloud Dataproc", "Cloud Data Fusion"],
        correctIndex: 1,
        explanation: "Cloud Dataflow is a serverless data processing engine ideal for building real-time stream processing pipelines."
      },
      {
        question: "Which service should you use to migrate existing Apache Hadoop and Apache Spark clusters directly to Google Cloud without major code changes?",
        answers: ["Cloud Dataflow", "Cloud Dataproc", "Cloud Composer", "BigQuery Omni"],
        correctIndex: 1,
        explanation: "Cloud Dataproc is a fully managed service for running Apache Spark and Apache Hadoop clusters on Google Cloud."
      },
      {
        question: "What feature of BigQuery should you implement to reduce query costs and improve performance for queries filtering on a specific date column?",
        answers: ["Materialized Views", "Partitioning", "Search Indexes", "Row-level Security"],
        correctIndex: 1,
        explanation: "Partitioning divides a large table into smaller segments based on a date or integer column, reducing scanned bytes and costs."
      },
      {
        question: "Which service manages workflow orchestration, letting you build and schedule complex data pipelines with Apache Airflow?",
        answers: ["Cloud Composer", "Cloud Workflows", "Cloud Scheduler", "Cloud Functions"],
        correctIndex: 0,
        explanation: "Cloud Composer is a managed workflow orchestration service built on Apache Airflow to coordinate multi-step pipelines."
      },
      {
        question: "What ML tool is best for developers with limited machine learning expertise to build custom high-quality models using Google's transfer learning?",
        answers: ["Vertex AI Custom Training", "Vertex AI AutoML", "TensorFlow Enterprise", "BigQuery ML"],
        correctIndex: 1,
        explanation: "Vertex AI AutoML enables users to train state-of-the-art models on image, tabular, text, or video data without writing ML code."
      },
      {
        question: "How can you query data stored in external Google Cloud Storage buckets directly inside BigQuery without loading the data first?",
        answers: ["Use an External Table", "Use BigQuery Storage Write API", "Create a BigQuery View", "Use federated queries via Cloud SQL"],
        correctIndex: 0,
        explanation: "External tables allow BigQuery to query data stored in GCS, Google Drive, or Bigtable directly using federated queries."
      },
      {
        question: "What is the most effective way to continuously stream high-velocity event data into a BigQuery table with immediate query availability?",
        answers: ["Use BigQuery Load Jobs", "Use the Storage Write API", "Export GCS logs to BigQuery", "Use Datastream"],
        correctIndex: 1,
        explanation: "The BigQuery Storage Write API supports high-performance streaming ingestion with immediate query accessibility."
      }
    ]
  },
  {
    examName: "Professional Cloud Security Engineer",
    questions: [
      {
        question: "Which tool provides defense-in-depth security by defining a secure perimeter around VPC resources and preventing exfiltration?",
        answers: ["Cloud Armor", "VPC Service Controls", "Cloud Firewalls", "Cloud Identity-Aware Proxy"],
        correctIndex: 1,
        explanation: "VPC Service Controls allows you to set up security perimeters to protect sensitive data and prevent unauthorized exfiltration."
      },
      {
        question: "You need to secure a web application by restricting access only to users who meet specific device-security and identity criteria. What should you use?",
        answers: ["Cloud VPN", "VPC Network Peering", "Identity-Aware Proxy (IAP) with BeyondCorp", "Cloud Firewalls"],
        correctIndex: 2,
        explanation: "IAP enables context-aware access control to applications, verifying user identity and device posture before granting access."
      },
      {
        question: "Which service is a distributed denial-of-service (DDoS) defense and Web Application Firewall (WAF) for HTTP(S) load balanced workloads?",
        answers: ["Cloud IDS", "Cloud Armor", "Security Command Center", "VPC Service Controls"],
        correctIndex: 1,
        explanation: "Cloud Armor provides enterprise-grade DDoS protection and WAF features to block web attacks like SQLi and XSS."
      },
      {
        question: "To securely store and rotate application API keys, database credentials, and certificates, which service is recommended?",
        answers: ["Cloud KMS", "Secret Manager", "Cloud Storage", "Cloud HSM"],
        correctIndex: 1,
        explanation: "Secret Manager is a secure and convenient storage system for API keys, passwords, certificates, and other sensitive data."
      },
      {
        question: "What Google Cloud feature allows you to audit all read and write operations performed on your cloud resources by administrators and users?",
        answers: ["Cloud Auditing", "Cloud Audit Logs", "Cloud Logging", "Cloud Access Transparency"],
        correctIndex: 1,
        explanation: "Cloud Audit Logs record administrative actions, system events, and data access, providing critical trails for security audits."
      },
      {
        question: "How can you ensure that only container images verified by a continuous integration (CI) pipeline can be deployed to GKE?",
        answers: ["Binary Authorization", "VPC Service Controls", "Artifact Registry Policies", "Container Analysis"],
        correctIndex: 0,
        explanation: "Binary Authorization is a deploy-time security control that ensures only trusted, signed container images are deployed to GKE."
      },
      {
        question: "Which IAM role type should be avoided for general user accounts to follow the principle of least privilege?",
        answers: ["Predefined Roles", "Custom Roles", "Primitive Roles (Owner, Editor, Viewer)", "Service Account Roles"],
        correctIndex: 2,
        explanation: "Primitive roles are extremely broad and grant sweeping permissions across all services. Predefined or custom roles are preferred."
      },
      {
        question: "What service provides managed intrusion detection system (IDS) capabilities, inspecting network traffic for malicious signatures?",
        answers: ["Cloud Firewalls", "Cloud IDS", "Cloud Armor", "Packet Mirroring"],
        correctIndex: 1,
        explanation: "Cloud IDS delivers industry-leading threat detection, inspecting cloud network traffic for malware, spyware, and exploits."
      },
      {
        question: "You want to dynamically mask sensitive data like credit card numbers or Social Security numbers from a dataset. Which service is designed for this?",
        answers: ["Cloud KMS", "Sensitive Data Protection (Cloud DLP)", "Secret Manager", "BigQuery Masking"],
        correctIndex: 1,
        explanation: "Google's Sensitive Data Protection service scans, classifies, and de-identifies/masks sensitive information automatically."
      },
      {
        question: "To verify that Google employees access your resources only for valid business reasons (like support), which service should you enable?",
        answers: ["Access Approval", "Access Transparency", "Cloud Audit Logs", "IAM Policy Troubleshooter"],
        correctIndex: 1,
        explanation: "Access Transparency provides near real-time logs of actions taken by Google administrators when accessing your content."
      }
    ]
  },
  {
    examName: "AI Token Economics (FinOps)",
    questions: [
      {
        question: "What is the atomic accounting unit of AI consumption?",
        answers: ["GPU compute hour", "API seat license", "Token", "Vector database record"],
        correctIndex: 2,
        explanation: "In AI token economics, a token is the fundamental atomic unit of computation and data over which models read, write, and reason, forming the basis of AI metering and cost attribution."
      },
      {
        question: "What do we call token output that successfully meets a defined service-level objective, such as latency thresholds and speed rates?",
        answers: ["Goodput", "Throughput", "Maxput", "Yieldput"],
        correctIndex: 0,
        explanation: "Goodput measures token production that satisfies specified latency and speed criteria (time-to-first-token and sustained tokens-per-second), distinguishing usable economic output from raw volume."
      },
      {
        question: "Why is token consumption non-linear with respect to user-facing activity?",
        answers: ["Token prices are fixed across all model sizes", "Context, reasoning, tools & retries compound", "Output tokens cheaper than input tokens", "Prompts are truncated by API gateways"],
        correctIndex: 1,
        explanation: "Multiple compounding variables—including system prompt overhead, retrieved RAG context, model selection, reasoning traces, and multi-agent tool retries—cause token usage to expand non-linearly."
      },
      {
        question: "How does AI tokenomics differ from its historical usage in distributed-ledger/cryptocurrency systems?",
        answers: ["Unit of computation, not a crypto asset", "Strictly used for blockchain contracts", "Fixed assets stored in distributed ledgers", "Energy metered per inference call"],
        correctIndex: 0,
        explanation: "Unlike blockchain tokenomics which deals with digital asset supply and ownership, AI tokenomics treats tokens as units of computational work (character clusters, sub-words, or discretized media segments)."
      },
      {
        question: "What major shift is occurring in enterprise AI procurement models as the initial subsidy phase ends?",
        answers: ["Unlimited flat-rate seat subscriptions", "Seat fees plus pre-committed metered tokens", "Mandatory shift to self-hosted GPUs", "Eliminating pay-as-you-go API billing"],
        correctIndex: 1,
        explanation: "As enterprise usage outpaces unit-cost reductions, providers are moving away from unmetered subscription bundles toward seat fees paired with pre-committed token usage, mirroring cloud capacity forecasting."
      },
      {
        question: "Which architectural pattern enables AI agents to write code to invoke tools instead of loading full JSON tool schemas on every turn, drastically reducing token usage?",
        answers: ["Zero-shot prompting", "FrugalGPT cascading", "Code Mode / Code execution tool-use", "Fine-tuning on raw JSON"],
        correctIndex: 2,
        explanation: "Code Mode enables agents to generate code to interact with tool APIs rather than loading huge enumerated function schemas into context on every interaction, cutting token overhead by up to 99%+."
      },
      {
        question: "What is the 'AI Factory' concept popularized by NVIDIA's Jensen Huang?",
        answers: ["Physical assembly line making GPU chips", "Data centers as plants producing tokens", "Automated pipeline for generating synthetic datasets", "Software for auto-training open LLMs"],
        correctIndex: 1,
        explanation: "The AI Factory framing treats data centers as production facilities where power and infrastructure inputs generate tokens as output, enabling unit-economic analysis like yield, throughput per megawatt, and cost per unit."
      },
      {
        question: "Which open-source specification standardizes cost and usage data across cloud and AI providers for FinOps practitioners?",
        answers: ["OpenTelemetry", "FOCUS (FinOps Open Cost & Usage Spec)", "CUDA Benchmark Suite", "POSIX Standard"],
        correctIndex: 1,
        explanation: "The open-source FOCUS specification normalizes cost and consumption metrics across different providers, enabling multi-cloud reconciliation of token spend against underlying infrastructure."
      },
      {
        question: "How does model routing (or LLM cascading) optimize AI token economics?",
        answers: ["Routing all queries to the largest model", "Translating text queries into vector embeddings", "Routing simple tasks to smaller models first", "Compressing prompts into binary formats"],
        correctIndex: 2,
        explanation: "Cascading and routing frameworks (such as FrugalGPT or RouteLLM) evaluate query complexity to send simpler tasks to cost-effective models, reserving expensive frontier models for difficult queries and saving up to 85%+ on token costs."
      },
      {
        question: "What metric measures the percentage of generated tokens that actually contribute to a downstream business action after removing retries and failed outputs?",
        answers: ["Power Usage Effectiveness (PUE)", "Time to First Token (TTFT)", "Token Yield Rate", "Goodput Ratio"],
        correctIndex: 2,
        explanation: "Token Yield Rate is a key value metric that tracks the proportion of generated tokens resulting in successful business outcomes, filtering out wasted tokens from retries, abandoned chats, or invalid outputs."
      }
    ]
  }
];

const getAspectClasses = (ratio: "9:16" | "16:9" | "1:1") => {
  switch (ratio) {
    case "16:9":
      return "aspect-[16/9] w-full max-w-[850px] h-auto";
    case "1:1":
      return "aspect-[1/1] w-full max-w-[550px] h-auto";
    case "9:16":
    default:
      return "aspect-[9/16] w-full max-w-[420px] h-auto max-h-[82vh]";
  }
};

const getPlayerThemeClasses = (colorTheme: "Google Cloud" | "Firebase" | "Flutter/Dart" | "Go") => {
  switch (colorTheme) {
    case "Firebase":
      return "bg-gradient-to-br from-[#DD2C00] via-[#FF6D00] to-[#FFD600] text-white";
    case "Flutter/Dart":
      return "bg-gradient-to-br from-[#02569B] via-[#0175C2] to-[#13B9FD] text-white";
    case "Go":
      return "bg-gradient-to-br from-[#00ADD8] via-[#5DC9E2] to-[#0096b7] text-white";
    case "Google Cloud":
    default:
      return "bg-[linear-gradient(135deg,#4285F4_0%,#34A853_33%,#FBBC05_66%,#EA4335_100%)] text-white";
  }
};

const getThemeGradientDefs = (colorTheme: "Google Cloud" | "Firebase" | "Flutter/Dart" | "Go") => {
  switch (colorTheme) {
    case "Firebase":
      return (
        <linearGradient id="theme-reveal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DD2C00" />
          <stop offset="50%" stopColor="#FF6D00" />
          <stop offset="100%" stopColor="#FFD600" />
        </linearGradient>
      );
    case "Flutter/Dart":
      return (
        <linearGradient id="theme-reveal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#02569B" />
          <stop offset="50%" stopColor="#0175C2" />
          <stop offset="100%" stopColor="#13B9FD" />
        </linearGradient>
      );
    case "Go":
      return (
        <linearGradient id="theme-reveal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ADD8" />
          <stop offset="50%" stopColor="#5DC9E2" />
          <stop offset="100%" stopColor="#0096b7" />
        </linearGradient>
      );
    case "Google Cloud":
    default:
      return (
        <linearGradient id="theme-reveal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="33%" stopColor="#34A853" />
          <stop offset="66%" stopColor="#FBBC05" />
          <stop offset="100%" stopColor="#EA4335" />
        </linearGradient>
      );
  }
};

const getThemeColors = (colorTheme: "Google Cloud" | "Firebase" | "Flutter/Dart" | "Go") => {
  switch (colorTheme) {
    case "Firebase":
      return {
        primary: "#DD2C00", // Deep Red/Orange
        secondary: "#FF6D00", // Bright Orange
        accent: "#FFD600", // Warm Yellow
        extra: "#FF3D00", // Coral Red
        glow: "rgba(255, 109, 0, 0.4)",
        glowRgb: "255, 109, 0",
        rgbList: ["221, 44, 0", "255, 109, 0", "255, 214, 0", "255, 61, 0"],
        gradientStops: ["#DD2C00", "#FF6D00", "#FFD600", "#FF3D00"],
      };
    case "Flutter/Dart":
      return {
        primary: "#02569B", // Navy Blue
        secondary: "#0175C2", // Bright Blue
        accent: "#13B9FD", // Cyan/Sky
        extra: "#005C9E", // Deep Indigo
        glow: "rgba(19, 185, 253, 0.4)",
        glowRgb: "19, 185, 253",
        rgbList: ["2, 86, 155", "1, 117, 194", "19, 185, 253", "0, 92, 158"],
        gradientStops: ["#02569B", "#0175C2", "#13B9FD", "#005C9E"],
      };
    case "Go":
      return {
        primary: "#00ADD8", // Light Blue/Cyan
        secondary: "#5DC9E2", // Pale Cyan
        accent: "#0096b7", // Deep Teal
        extra: "#00E5FF", // Neon Cyan
        glow: "rgba(93, 201, 226, 0.4)",
        glowRgb: "93, 201, 226",
        rgbList: ["0, 173, 216", "93, 201, 226", "0, 150, 183", "0, 229, 255"],
        gradientStops: ["#00ADD8", "#5DC9E2", "#0096b7", "#00E5FF"],
      };
    case "Google Cloud":
    default:
      return {
        primary: "#4285F4", // Google Blue
        secondary: "#34A853", // Google Green
        accent: "#FBBC05", // Google Yellow
        extra: "#EA4335", // Google Red
        glow: "rgba(66, 133, 244, 0.4)",
        glowRgb: "66, 133, 244",
        rgbList: ["66, 133, 244", "52, 168, 83", "251, 188, 5", "234, 67, 53"],
        gradientStops: ["#4285F4", "#34A853", "#FBBC05", "#EA4335"],
      };
  }
};

interface QuizViewportProps {
  ratio: "9:16" | "16:9" | "1:1";
  phase: "edit" | 0 | 1 | 2 | 3 | 4 | 5 | 6;
  questionData: QuizQuestion;
  colorTheme: "Google Cloud" | "Firebase" | "Flutter/Dart" | "Go";
  ambientAnimation: "none" | "shimmer" | "aurora" | "mesh-liquid" | "radial-flow" | "cosmic-glow" | "fireflies" | "warp-speed" | "laser-beams" | "color-vortex" | "matrix-rain" | "spinning-logos" | "lava-lamp" | "random-shapes" | "psychedelic-swirl";
  animationSpeed: number;
  transitionTime: number;
  hidePanels: boolean;
  advancePhase: () => void;
  isBothMode?: boolean;
}

function QuizViewport({
  ratio,
  phase,
  questionData,
  colorTheme,
  ambientAnimation,
  animationSpeed,
  transitionTime,
  hidePanels,
  advancePhase,
  isBothMode = false,
}: QuizViewportProps) {
  const themeColors = getThemeColors(colorTheme);
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);
  const answersContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [layer1FontSize, setLayer1FontSize] = useState<number | null>(null);
  const [layer2FontSize, setLayer2FontSize] = useState<number | null>(null);
  const [explanationFontSize, setExplanationFontSize] = useState<number | null>(null);
  const [cardOffsets, setCardOffsets] = useState<number[]>([0, 0, 0, 0]);
  const [correctCardHeight, setCorrectCardHeight] = useState<number | null>(null);

  const [pretext, setPretext] = useState<{
    prepare: typeof import("@chenglou/pretext").prepare;
    layout: typeof import("@chenglou/pretext").layout;
  } | null>(null);

  useEffect(() => {
    import("@chenglou/pretext").then((mod) => {
      setPretext({ prepare: mod.prepare, layout: mod.layout });
    });
  }, []);

  useEffect(() => {
    const adjustFontSize = () => {
      const container = containerRef.current;
      if (!container || !pretext) return;

      const { prepare, layout } = pretext;

      const containerRect = container.getBoundingClientRect();
      const targetWidth = containerRect.width;
      const targetHeight = containerRect.height;

      if (targetWidth === 0 || targetHeight === 0) return;

      const fontFamily = window.getComputedStyle(container).fontFamily || "system-ui, sans-serif";

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // 1. Adjust Layer 1 (Question only)
      if (layer1Ref.current) {
        const el = layer1Ref.current;
        let low = 4;
        let high = 120;
        let optimal = low;

        const normalizedQuestion = questionData.question.replace(/\s+\?/g, "\u00A0?");
        const words = normalizedQuestion.split(/\s+/).filter(Boolean);

        for (let i = 0; i < 11; i++) {
          const mid = (low + high) / 2;
          const textFontSize = mid * 1.8;
          const font = `900 ${textFontSize}px ${fontFamily}`;

          // Precise card measurements:
          // layer1Ref has p-[1.5em] (horizontal padding is 3 * mid total)
          // card has max-w-[88%] (0.88 multiplier) and p-[2em] (horizontal padding is 4 * mid total)
          const parentWidth = containerRect.width - (3 * mid);
          const cardWidth = parentWidth * 0.88;
          const questionMaxWidth = cardWidth - (4 * mid);

          if (questionMaxWidth <= 0) {
            high = mid;
            continue;
          }

          // Card height is text height + vertical padding (4 * mid)
          // We want the card to fit comfortably, leaving at least 12.5% margins on top and bottom (so max 75% height)
          const maxCardHeight = containerRect.height * 0.75;

          try {
            const prepared = prepare(normalizedQuestion, font);
            const { height } = layout(prepared, questionMaxWidth, textFontSize * 1.375);
            const totalHeight = height + 4 * mid;

            // Check single-word constraints
            let wordOverflows = false;
            if (ctx) {
              ctx.font = font;
              for (const word of words) {
                if (ctx.measureText(word).width > questionMaxWidth) {
                  wordOverflows = true;
                  break;
                }
              }
            }

            if (!wordOverflows && totalHeight <= maxCardHeight && cardWidth <= containerRect.width) {
              optimal = mid;
              low = mid;
            } else {
              high = mid;
            }
          } catch (e) {
            high = mid;
          }
        }

        setLayer1FontSize(optimal);
      }

      // 2. Adjust Layer 2 (Answers & Explanation)
      if (layer2Ref.current) {
        const el = layer2Ref.current;
        let low = 4;
        let high = 120;
        let optimal = low;

        // Spacing limits: Layer 2 content should comfortably fit within 90% height
        const maxLayer2Height = containerRect.height * 0.90;

        for (let i = 0; i < 11; i++) {
          const mid = (low + high) / 2;
          // layer2Ref has p-[1.5em] (horizontal padding is 3 * mid total)
          // cards container has max-w-[88%]
          const parentWidth = containerRect.width - (3 * mid);
          const layer2MaxWidth = parentWidth * 0.88;
          let totalHeight = 0;
          let wordOverflows = false;

          // Always calculate Layer 2 font-size based on all 4 answer cards to ensure size and dimension stability
          // for the correct answer card across all steps (including between Phase 5 and Phase 6).
          let answersHeight = 0;
          for (let j = 0; j < 4; j++) {
            const ans = questionData.answers[j];
            const normalizedAns = ans.replace(/\s+\?/g, "\u00A0?");
            const badgeAndGapWidth = (2 * 0.85 + 0.8) * mid;
            const paddingWidth = 2.2 * mid; // py-[0.8em] pl-[1.2em] pr-[1.0em] gives 2.2 * mid total horizontal padding
            const answerTextMaxWidth = layer2MaxWidth - (badgeAndGapWidth + paddingWidth);

            if (answerTextMaxWidth <= 0) {
              wordOverflows = true;
            }

            const font = `bold ${mid}px ${fontFamily}`;
            try {
              const preparedAns = prepare(normalizedAns, font);
              const { height: ansTextHeight } = layout(preparedAns, answerTextMaxWidth, mid * 1.375);
              const badgeHeight = 2 * 0.85 * mid;
              const cardHeight = Math.max(badgeHeight, ansTextHeight) + 1.6 * mid + 0.1 * mid; // padding 1.6 * mid + border 0.1 * mid
              answersHeight += cardHeight;

              // Check single-word constraints
              if (ctx && !wordOverflows) {
                ctx.font = font;
                const ansWords = normalizedAns.split(/\s+/).filter(Boolean);
                for (const word of ansWords) {
                  if (ctx.measureText(word).width > answerTextMaxWidth) {
                    wordOverflows = true;
                    break;
                  }
                }
              }
            } catch (e) {
              const charWidth = mid * 0.6;
              const estimatedWidth = normalizedAns.length * charWidth;
              const lines = Math.ceil(estimatedWidth / Math.max(1, answerTextMaxWidth)) || 1;
              const fallbackHeight = lines * mid * 1.375;
              const badgeHeight = 2 * 0.85 * mid;
              const cardHeight = Math.max(badgeHeight, fallbackHeight) + 1.7 * mid;
              answersHeight += cardHeight;
            }
          }
          // All answers total height:
          // Answers height
          // + 3 gaps of space-y-[0.6em] = 1.8 * mid
          // + inner container padding py-[0.5em] = 1.0 * mid
          // + outer padding of layer2Ref (3.0 * mid)
          totalHeight = answersHeight + 5.8 * mid;

          if (!wordOverflows && totalHeight <= maxLayer2Height) {
            optimal = mid;
            low = mid;
          } else {
            high = mid;
          }
        }

        setLayer2FontSize(optimal);

        // Calculate explanation font size independently to fit vertical space without resizing answer cards
        if (explanationRef.current) {
          const parentWidth = containerRect.width - (3 * optimal);
          const layer2MaxWidth = parentWidth * 0.88;
          const correctIndex = questionData.correctIndex;
          const ans = questionData.answers[correctIndex];
          const normalizedAns = ans.replace(/\s+\?/g, "\u00A0?");
          const badgeAndGapWidth = (2 * 0.85 + 0.8) * optimal;
          const paddingWidth = 2.2 * optimal;
          const answerTextMaxWidth = layer2MaxWidth - (badgeAndGapWidth + paddingWidth);

          let correctAnswerCardHeight = 0;
          const font = `bold ${optimal}px ${fontFamily}`;
          try {
            const preparedAns = prepare(normalizedAns, font);
            const { height: ansTextHeight } = layout(preparedAns, answerTextMaxWidth, optimal * 1.375);
            const badgeHeight = 2 * 0.85 * optimal;
            correctAnswerCardHeight = Math.max(badgeHeight, ansTextHeight) + 1.6 * optimal + 0.1 * optimal;
          } catch (e) {
            correctAnswerCardHeight = 50;
          }

          const remainingHeight = maxLayer2Height - correctAnswerCardHeight - 4.6 * optimal; // 4.6 * optimal is padding/margins/gaps

          let lowExpl = 4;
          let highExpl = optimal * 0.85; // Default explanation body size is 0.85 * optimal
          let optimalExpl = lowExpl;

          const normalizedExplanation = questionData.explanation.replace(/\s+\?/g, "\u00A0?");
          const explanationPaddingWidth = 1.6 * optimal;
          const explanationBorderWidth = 0.1 * optimal;
          const explanationTextMaxWidth = layer2MaxWidth - (explanationPaddingWidth + explanationBorderWidth);

          for (let k = 0; k < 11; k++) {
            const midExpl = (lowExpl + highExpl) / 2;
            const explanationFont = `medium ${midExpl}px ${fontFamily}`;
            const explanationHeaderFontSize = midExpl * 0.7; // Header scales relative to body font size
            const headerFont = `bold ${explanationHeaderFontSize}px ${fontFamily}`;

            let headerHeight = 0;
            try {
              const preparedHeader = prepare("EXPLANATION", headerFont);
              const { height } = layout(preparedHeader, explanationTextMaxWidth, explanationHeaderFontSize * 1.375);
              headerHeight = height;
            } catch (e) {
              headerHeight = 15;
            }

            let textHeight = 0;
            try {
              const preparedExpl = prepare(normalizedExplanation, explanationFont);
              const { height } = layout(preparedExpl, explanationTextMaxWidth, midExpl * 1.375);
              textHeight = height;
            } catch (e) {
              textHeight = 40;
            }

            const totalExplHeight = headerHeight + (0.2 * optimal) + textHeight + (1.2 * optimal) + (0.1 * optimal) + (0.6 * optimal);

            if (totalExplHeight <= remainingHeight && midExpl <= optimal * 0.85) {
              optimalExpl = midExpl;
              lowExpl = midExpl;
            } else {
              highExpl = midExpl;
            }
          }

          setExplanationFontSize(optimalExpl);
        }
      }
    };

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      adjustFontSize();
    });
    observer.observe(container);

    adjustFontSize();

    return () => {
      observer.disconnect();
    };
  }, [phase, questionData, ratio, colorTheme, transitionTime, ambientAnimation, pretext]);

  useEffect(() => {
    const updateMeasurements = () => {
      if (cardRefs.current[0]) {
        const baseTop = cardRefs.current[0].offsetTop;
        const offsets = cardRefs.current.map((card) =>
          card ? card.offsetTop - baseTop : 0
        );
        setCardOffsets(offsets);

        const targetIndex = questionData.correctIndex;
        const targetCard = cardRefs.current[targetIndex] || cardRefs.current[0];
        if (targetCard) {
          setCorrectCardHeight(targetCard.offsetHeight);
        }
      }
    };

    updateMeasurements();
    const timer = setTimeout(updateMeasurements, 50);
    window.addEventListener("resize", updateMeasurements);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateMeasurements);
    };
  }, [questionData, layer2FontSize, ratio, phase]);

  const isExpanded = hidePanels;

  const viewportStyle: React.CSSProperties = {
    transition: `all ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1)`,
    ['--anim-duration' as any]: `${10 / animationSpeed}s`,
  };

  if (isExpanded) {
    viewportStyle.maxWidth = "none";
    viewportStyle.maxHeight = "none";
    if (isBothMode) {
      if (ratio === "16:9") {
        viewportStyle.width = "min(60vw, 106.67vh)";
        viewportStyle.height = "auto";
      } else { // 9:16
        viewportStyle.width = "min(33vw, 53.44vh)";
        viewportStyle.height = "auto";
      }
    } else {
      if (ratio === "16:9") {
        viewportStyle.width = "min(95vw, 168.89vh)";
        viewportStyle.height = "auto";
      } else if (ratio === "1:1") {
        viewportStyle.width = "min(95vw, 95vh)";
        viewportStyle.height = "auto";
      } else { // 9:16
        viewportStyle.width = "min(95vw, 53.44vh)";
        viewportStyle.height = "auto";
      }
    }
  }

  return (
    <div
      ref={containerRef}
      onClick={advancePhase}
      className={`relative select-none cursor-pointer border border-white/10 rounded-none overflow-hidden shadow-2xl flex flex-col justify-between p-[1.5em] ${getPlayerThemeClasses(colorTheme)} ${getAspectClasses(ratio)}`}
      style={viewportStyle}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-gradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes draw-border {
          from {
            stroke-dashoffset: 102;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        /* Shimmer Animation CSS */
        @keyframes shimmer-move {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }

        /* Aurora Animation CSS */
        @keyframes aurora-wave-1 {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-18%) scale(1.25) rotate(12deg); opacity: 0.85; }
          100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.4; }
        }
        @keyframes aurora-wave-2 {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.45; }
          50% { transform: translateY(22%) scale(1.35) rotate(-15deg); opacity: 0.95; }
          100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.45; }
        }
        @keyframes aurora-wave-3 {
          0% { transform: translateY(0) scale(1.1) rotate(0deg); opacity: 0.35; }
          50% { transform: translateY(-16%) scale(0.9) rotate(14deg); opacity: 0.75; }
          100% { transform: translateY(0) scale(1.1) rotate(0deg); opacity: 0.35; }
        }

        /* Mesh Liquid Blobs CSS */
        @keyframes blob-bounce-1 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(120px, -150px) scale(1.4) rotate(60deg); }
          66% { transform: translate(-80px, 90px) scale(0.6) rotate(-60deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
        }
        @keyframes blob-bounce-2 {
          0% { transform: translate(0px, 0px) scale(1.2) rotate(0deg); }
          33% { transform: translate(-140px, 110px) scale(0.7) rotate(-45deg); }
          66% { transform: translate(110px, -80px) scale(1.5) rotate(90deg); }
          100% { transform: translate(0px, 0px) scale(1.2) rotate(0deg); }
        }
        @keyframes blob-bounce-3 {
          0% { transform: translate(0px, 0px) scale(0.9) rotate(0deg); }
          50% { transform: translate(130px, 130px) scale(1.3) rotate(120deg); }
          100% { transform: translate(0px, 0px) scale(0.9) rotate(0deg); }
        }

        /* Radial Flow CSS */
        @keyframes radial-pulse-1 {
          0% { transform: scale(0.8) translate(0%, 0%); opacity: 0.4; }
          50% { transform: scale(1.55) translate(12%, -10%); opacity: 0.85; }
          100% { transform: scale(0.8) translate(0%, 0%); opacity: 0.4; }
        }
        @keyframes radial-pulse-2 {
          0% { transform: scale(1.25) translate(0%, 0%); opacity: 0.45; }
          50% { transform: scale(0.7) translate(-15%, 12%); opacity: 0.95; }
          100% { transform: scale(1.25) translate(0%, 0%); opacity: 0.45; }
        }

        /* Cosmic Glow CSS */
        @keyframes cosmic-spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.3); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.65); }
          50% { opacity: 1; transform: scale(1.65); }
        }

        /* Fireflies Animation CSS */
        @keyframes firefly-drift {
          0% { transform: translateY(110%) translateX(var(--start-x, 0px)); opacity: 0; }
          15% { opacity: 0.95; }
          85% { opacity: 0.95; }
          100% { transform: translateY(-10%) translateX(calc(var(--start-x, 0px) + var(--drift-x, 40px))); opacity: 0; }
        }

        /* Warp Speed CSS */
        @keyframes warp-travel {
          0% { transform: translate(-50%, -50%) scale(0.05) rotate(var(--angle, 0deg)); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2.8) translate(0px, 200px) rotate(var(--angle, 0deg)); opacity: 0; }
        }

        /* Laser Beams CSS */
        @keyframes laser-sweep-1 {
          0% { transform: translate(-100%, -100%) rotate(-45deg); opacity: 0; }
          15% { opacity: 0.95; }
          85% { opacity: 0.95; }
          100% { transform: translate(200%, 200%) rotate(-45deg); opacity: 0; }
        }
        @keyframes laser-sweep-2 {
          0% { transform: translate(200%, -100%) rotate(45deg); opacity: 0; }
          15% { opacity: 0.95; }
          85% { opacity: 0.95; }
          100% { transform: translate(-100%, 200%) rotate(45deg); opacity: 0; }
        }

        /* Color Vortex CSS */
        @keyframes vortex-spin-primary {
          0% { transform: rotate(0deg) scale(0.9); }
          50% { transform: rotate(180deg) scale(1.4); }
          100% { transform: rotate(360deg) scale(0.9); }
        }
        @keyframes vortex-spin-secondary {
          0% { transform: rotate(360deg) scale(1.25); }
          50% { transform: rotate(180deg) scale(0.75); }
          100% { transform: rotate(0deg) scale(1.25); }
        }

        /* Matrix Rain CSS */
        @keyframes matrix-fall {
          0% { transform: translateY(-110%); opacity: 0; }
          10% { opacity: 0.85; }
          90% { opacity: 0.85; }
          100% { transform: translateY(110%); opacity: 0; }
        }

        /* Spinning Logos CSS */
        @keyframes logo-float-1 {
          0% { transform: translate(0px, 0px) rotate(0deg) scale(0.8); }
          33% { transform: translate(100px, -120px) rotate(120deg) scale(1.1); }
          66% { transform: translate(-50px, -240px) rotate(240deg) scale(0.7); }
          100% { transform: translate(0px, 0px) rotate(360deg) scale(0.8); }
        }
        @keyframes logo-float-2 {
          0% { transform: translate(0px, 0px) rotate(0deg) scale(1.1); }
          50% { transform: translate(-120px, -180px) rotate(-180deg) scale(0.7); }
          100% { transform: translate(0px, 0px) rotate(-360deg) scale(1.1); }
        }
        @keyframes logo-float-3 {
          0% { transform: translate(0px, 0px) rotate(0deg) scale(0.9); }
          33% { transform: translate(-80px, 150px) rotate(180deg) scale(1.2); }
          66% { transform: translate(90px, -80px) rotate(90deg) scale(0.6); }
          100% { transform: translate(0px, 0px) rotate(360deg) scale(0.9); }
        }
        @keyframes logo-float-4 {
          0% { transform: translate(0px, 0px) rotate(360deg) scale(0.7); }
          50% { transform: translate(110px, 140px) rotate(180deg) scale(1.1); }
          100% { transform: translate(0px, 0px) rotate(0deg) scale(0.7); }
        }

        /* Lava Lamp Bubbles CSS */
        @keyframes lava-goo-1 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-320px) scale(1.3); }
        }
        @keyframes lava-goo-2 {
          0%, 100% { transform: translateY(0) scale(1.2); }
          50% { transform: translateY(-180px) scale(0.8); }
        }
        @keyframes lava-goo-3 {
          0%, 100% { transform: translateY(0) scale(0.9); }
          50% { transform: translateY(-260px) scale(1.4); }
        }
        @keyframes lava-goo-4 {
          0%, 100% { transform: translateY(0) scale(1.1); }
          50% { transform: translateY(-120px) scale(0.7); }
        }
        @keyframes lava-goo-5 {
          0%, 100% { transform: translateY(0) scale(0.8); }
          50% { transform: translateY(-220px) scale(1.2); }
        }

        /* Random Shapes CSS */
        @keyframes shape-drift-1 {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(120px, -100px) rotate(120deg) scale(1.4); }
          66% { transform: translate(-80px, -200px) rotate(240deg) scale(0.8); }
          100% { transform: translate(0, 0) rotate(360deg) scale(1); }
        }
        @keyframes shape-drift-2 {
          0% { transform: translate(0, 0) rotate(360deg) scale(0.9); }
          50% { transform: translate(-140px, -150px) rotate(180deg) scale(1.3); }
          100% { transform: translate(0, 0) rotate(0deg) scale(0.9); }
        }
        @keyframes shape-drift-3 {
          0% { transform: translate(0, 0) rotate(0deg) scale(1.2); }
          33% { transform: translate(-90px, 120px) rotate(-120deg) scale(0.7); }
          66% { transform: translate(100px, -80px) rotate(-240deg) scale(1.5); }
          100% { transform: translate(0, 0) rotate(-360deg) scale(1.2); }
        }
        @keyframes shape-drift-4 {
          0% { transform: translate(0, 0) rotate(180deg) scale(0.8); }
          50% { transform: translate(130px, 160px) rotate(360deg) scale(1.2); }
          100% { transform: translate(0, 0) rotate(180deg) scale(0.8); }
        }

        /* Psychedelic Swirl CSS */
        @keyframes psych-spin {
          0% { transform: rotate(0deg) scale(0.9); filter: hue-rotate(0deg); }
          50% { transform: rotate(180deg) scale(1.5); filter: hue-rotate(180deg); }
          100% { transform: rotate(360deg) scale(0.9); filter: hue-rotate(360deg); }
        }
        @keyframes psych-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.4); opacity: 0.9; }
        }
        @keyframes psych-warp {
          0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          34% { border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; }
          67% { border-radius: 50% 60% 30% 70% / 60% 40% 70% 30%; }
          100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
        }

        .animate-spin-gradient {
          animation: spin-gradient var(--spin-duration, 2s) linear infinite;
        }
      `}} />

      {/* Shimmer (Flowing Gradient) background */}
      {ambientAnimation === "shimmer" && (
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none z-0"
          style={{
            background: `linear-gradient(-45deg, ${themeColors.primary}, ${themeColors.secondary}, ${themeColors.accent}, ${themeColors.extra || themeColors.primary})`,
            backgroundSize: '400% 400%',
            animation: `shimmer-move calc(var(--anim-duration) * 1.5) ease-in-out infinite`,
          }}
        />
      )}

      {/* Aurora (Dancing Lights) background */}
      {ambientAnimation === "aurora" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent">
          <div className="absolute inset-[-20%] opacity-80 mix-blend-screen filter blur-[50px]">
            {/* Wave 1 */}
            <div
              className="absolute w-[140%] h-[80%] top-[10%] left-[-20%] rounded-[100%]"
              style={{
                background: `radial-gradient(ellipse at center, rgba(${themeColors.rgbList[0]}, 0.8) 0%, transparent 70%)`,
                animation: `aurora-wave-1 calc(var(--anim-duration) * 1.6) ease-in-out infinite`,
              }}
            />
            {/* Wave 2 */}
            <div
              className="absolute w-[130%] h-[75%] top-[25%] left-[50%] ml-[-65%] rounded-[100%]"
              style={{
                background: `radial-gradient(ellipse at center, rgba(${themeColors.rgbList[1]}, 0.75) 0%, transparent 70%)`,
                animation: `aurora-wave-2 calc(var(--anim-duration) * 2.0) ease-in-out infinite`,
              }}
            />
            {/* Wave 3 */}
            <div
              className="absolute w-[150%] h-[80%] bottom-[10%] right-[-25%] rounded-[100%]"
              style={{
                background: `radial-gradient(ellipse at center, rgba(${themeColors.rgbList[2] || themeColors.rgbList[0]}, 0.7) 0%, transparent 65%)`,
                animation: `aurora-wave-3 calc(var(--anim-duration) * 1.8) ease-in-out infinite`,
              }}
            />
          </div>
        </div>
      )}

      {/* Mesh Liquid (Floating Blobs) background */}
      {ambientAnimation === "mesh-liquid" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent">
          <div className="absolute inset-[-30%] opacity-85 filter blur-[65px]">
            {/* Blob 1 */}
            <div
              className="absolute rounded-full"
              style={{
                width: '60%',
                height: '50%',
                top: '15%',
                left: '10%',
                background: `radial-gradient(circle, rgba(${themeColors.rgbList[0]}, 0.85) 0%, transparent 75%)`,
                animation: `blob-bounce-1 calc(var(--anim-duration) * 1.4) ease-in-out infinite`,
              }}
            />
            {/* Blob 2 */}
            <div
              className="absolute rounded-full"
              style={{
                width: '55%',
                height: '55%',
                bottom: '15%',
                right: '10%',
                background: `radial-gradient(circle, rgba(${themeColors.rgbList[1]}, 0.8) 0%, transparent 75%)`,
                animation: `blob-bounce-2 calc(var(--anim-duration) * 1.8) ease-in-out infinite`,
              }}
            />
            {/* Blob 3 */}
            <div
              className="absolute rounded-full"
              style={{
                width: '50%',
                height: '45%',
                top: '40%',
                left: '35%',
                background: `radial-gradient(circle, rgba(${themeColors.rgbList[2] || themeColors.rgbList[0]}, 0.75) 0%, transparent 70%)`,
                animation: `blob-bounce-3 calc(var(--anim-duration) * 2.2) ease-in-out infinite`,
              }}
            />
          </div>
        </div>
      )}

      {/* Radial Flow (Concentric Waves) background */}
      {ambientAnimation === "radial-flow" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent">
          <div className="absolute inset-[-10%] opacity-85 filter blur-[45px]">
            {/* Radial Center 1 */}
            <div
              className="absolute w-full h-full top-[-10%] left-[-10%] rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(${themeColors.rgbList[0]}, 0.75) 0%, rgba(${themeColors.rgbList[1]}, 0.3) 50%, transparent 75%)`,
                animation: `radial-pulse-1 calc(var(--anim-duration) * 1.5) ease-in-out infinite`,
              }}
            />
            {/* Radial Center 2 */}
            <div
              className="absolute w-full h-full bottom-[-15%] right-[-15%] rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(${themeColors.rgbList[2] || themeColors.rgbList[0]}, 0.7) 0%, rgba(${themeColors.rgbList[3] || themeColors.rgbList[1]}, 0.25) 50%, transparent 75%)`,
                animation: `radial-pulse-2 calc(var(--anim-duration) * 2.0) ease-in-out infinite`,
              }}
            />
          </div>
        </div>
      )}

      {/* Cosmic Glow (Nebula / Deep Space) background */}
      {ambientAnimation === "cosmic-glow" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent">
          {/* Shifting space nebula core */}
          <div
            className="absolute w-[180%] h-[180%] top-[-40%] left-[-40%] opacity-65 filter blur-[70px]"
            style={{
              background: `radial-gradient(circle at center, rgba(${themeColors.rgbList[0]}, 0.7) 0%, rgba(${themeColors.rgbList[1]}, 0.4) 35%, rgba(${themeColors.rgbList[2] || themeColors.rgbList[0]}, 0.2) 65%, transparent 80%)`,
              animation: `cosmic-spin calc(var(--anim-duration) * 3.0) linear infinite`,
            }}
          />

          {/* Twinkling stars */}
          {Array.from({ length: 8 }).map((_, i) => {
            const size = 1.5 + (i % 3) * 0.75;
            const delay = i * 0.45;
            const top = (15 + (i * 11)) % 90;
            const left = (10 + (i * 17)) % 90;
            const starColor = themeColors.gradientStops[i % themeColors.gradientStops.length];
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  background: '#ffffff',
                  boxShadow: `0 0 ${size * 3}px ${starColor}, 0 0 ${size * 6}px ${starColor}`,
                  animation: `star-twinkle calc(var(--anim-duration) * 0.35) ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Fireflies background */}
      {ambientAnimation === "fireflies" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent">
          {Array.from({ length: 18 }).map((_, i) => {
            const size = 3 + (i % 4) * 2; // size between 3px and 11px
            const startX = (i * 7) % 95; // randomized start percentages
            const driftX = -60 + ((i * 19) % 120); // drift X offset
            const delay = (i * 0.43) % 4; // delays
            const duration = 2.5 + (i % 3) * 1.2; // base duration between 2.5s and 4.9s
            const color = themeColors.gradientStops[i % themeColors.gradientStops.length];
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${startX}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  background: color,
                  boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`,
                  ['--start-x' as any]: `${startX}px`,
                  ['--drift-x' as any]: `${driftX}px`,
                  animation: `firefly-drift calc(var(--anim-duration) * ${duration / 3}) ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Warp Speed (Hyperdrive) background */}
      {ambientAnimation === "warp-speed" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15) % 360; // distributed angles
            const width = 1.5 + (i % 3) * 0.8; // line widths
            const height = 40 + (i % 4) * 25; // line lengths
            const delay = (i * 0.23) % 2.5; // delays
            const duration = 1.2 + (i % 3) * 0.6; // duration between 1.2s and 2.4s
            const color = themeColors.gradientStops[i % themeColors.gradientStops.length];
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 origin-[0%_0%]"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  background: `linear-gradient(to top, ${color}, transparent)`,
                  boxShadow: `0 0 ${width * 3}px ${color}`,
                  ['--angle' as any]: `${angle}deg`,
                  animation: `warp-travel calc(var(--anim-duration) * ${duration / 3}) cubic-bezier(0.1, 0.8, 0.1, 1) infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Laser Beams background */}
      {ambientAnimation === "laser-beams" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent">
          {Array.from({ length: 6 }).map((_, i) => {
            const isType1 = i % 2 === 0;
            const delay = i * 1.1;
            const duration = 2.8 + (i % 3) * 0.9;
            const color = themeColors.gradientStops[i % themeColors.gradientStops.length];
            return (
              <div
                key={i}
                className="absolute w-[200%] h-[4px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${color}, ${color}, transparent)`,
                  boxShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
                  top: isType1 ? '0%' : '50%',
                  left: isType1 ? '0%' : '-50%',
                  animation: `${isType1 ? 'laser-sweep-1' : 'laser-sweep-2'} calc(var(--anim-duration) * ${duration / 3}) linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Color Vortex background */}
      {ambientAnimation === "color-vortex" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent">
          <div className="absolute inset-[-40%] opacity-80 mix-blend-screen filter blur-[35px] flex items-center justify-center">
            {/* Ring 1 - Clockwise */}
            <div
              className="absolute w-[120%] h-[120%] rounded-full opacity-90"
              style={{
                background: `conic-gradient(from 0deg, ${themeColors.primary}, ${themeColors.secondary}, ${themeColors.accent}, ${themeColors.extra || themeColors.primary}, ${themeColors.primary})`,
                animation: `vortex-spin-primary calc(var(--anim-duration) * 2.5) linear infinite`,
              }}
            />
            {/* Ring 2 - Counterclockwise */}
            <div
              className="absolute w-[100%] h-[100%] rounded-full opacity-80"
              style={{
                background: `conic-gradient(from 180deg, ${themeColors.extra || themeColors.primary}, ${themeColors.accent}, ${themeColors.secondary}, ${themeColors.primary}, ${themeColors.extra || themeColors.primary})`,
                animation: `vortex-spin-secondary calc(var(--anim-duration) * 1.8) linear infinite`,
              }}
            />
            {/* Center glow overlay */}
            <div
              className="absolute w-[50%] h-[50%] rounded-full filter blur-[20px]"
              style={{
                background: `radial-gradient(circle, #ffffff 0%, rgba(${themeColors.glowRgb}, 0.8) 50%, transparent 100%)`,
              }}
            />
          </div>
        </div>
      )}

      {/* Matrix Rain background */}
      {ambientAnimation === "matrix-rain" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent flex justify-between px-2">
          {Array.from({ length: 14 }).map((_, i) => {
            const delay = (i * 0.35) % 3.0;
            const duration = 1.8 + (i % 4) * 0.7; // fall time
            const color = themeColors.gradientStops[i % themeColors.gradientStops.length];
            const size = 9 + (i % 3) * 3; // font size 9px - 15px
            const characters = ["0", "1", "X", "Y", "A", "B", "C", "D", "G", "C", "P", "<", ">", "/", "+", "="];
            const textStream = Array.from({ length: 15 }).map(() => characters[(i + Math.floor(Math.random() * 16)) % characters.length]).join("\n");
            return (
              <div
                key={i}
                className="font-mono font-black text-center select-none leading-none opacity-0 whitespace-pre"
                style={{
                  fontSize: `${size}px`,
                  color: color,
                  textShadow: `0 0 4px ${color}, 0 0 10px ${color}`,
                  animation: `matrix-fall calc(var(--anim-duration) * ${duration / 3}) linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              >
                {textStream}
              </div>
            );
          })}
        </div>
      )}

      {/* Spinning Logos background */}
      {ambientAnimation === "spinning-logos" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent">
          {Array.from({ length: 4 }).map((_, i) => {
            const delay = i * 0.95;
            const size = 50 + (i % 3) * 20; // 50px to 90px
            const floatAnim = `logo-float-${i + 1}`;
            const color = themeColors.gradientStops[i % themeColors.gradientStops.length];

            // Render theme-based distinct SVG elements
            const getThemeLogoSVG = () => {
              if (colorTheme === "Firebase") {
                return (
                  <svg className="w-full h-full" viewBox="0 0 32 32" fill="none">
                    <path d="M5.6 23.4l8.3-15.3c.4-.7 1.4-.7 1.8 0l2.3 4.3 2.1-4c.4-.7 1.4-.7 1.8 0l5.5 15c.4.9-.3 1.9-1.2 1.8l-15.2-1.2-4.5-1c-.8-.1-1.3-.8-.9-1.6z" fill={color} />
                    <path d="M14.6 3.7c-.4-.7-1.4-.7-1.8 0L3.3 21.2c-.4.8.1 1.7.9 1.6l10.4-1c.4 0 .7-.3.7-.7V3.7z" fill="#FFF" opacity="0.15" />
                  </svg>
                );
              } else if (colorTheme === "Flutter/Dart") {
                return (
                  <svg className="w-full h-full" viewBox="0 0 32 32" fill="none">
                    <path d="M16 2l-14 14 6 6 20-20H16z" fill={color} />
                    <path d="M16 30L32 14h-8L8 30h8z" fill={color} opacity="0.8" />
                  </svg>
                );
              } else if (colorTheme === "Go") {
                return (
                  <svg className="w-full h-full" viewBox="0 0 32 32" fill="none">
                    <ellipse cx="16" cy="16" rx="12" ry="7" fill={color} />
                    <circle cx="12" cy="14" r="2.5" fill="#FFF" />
                    <circle cx="12" cy="14" r="1" fill="#000" />
                    <circle cx="20" cy="14" r="2.5" fill="#FFF" />
                    <circle cx="20" cy="14" r="1" fill="#000" />
                  </svg>
                );
              } else {
                // Google Cloud G
                return (
                  <svg className="w-full h-full" viewBox="0 0 32 32" fill="none">
                    <path d="M16 4C9.37 4 4 9.37 4 16s5.37 12 12 12c5.96 0 10.44-4.22 11.66-9.6H16v-4.8h16.4C32.6 14.3 32.8 15.1 32.8 16c0 9.28-6.32 16-16.8 16C7.08 32 0 24.92 0 16S7.08 0 16 0c4.88 0 8.96 1.8 12.08 4.72L24.64 8.16C22.44 6.08 19.56 4.8 16 4z" fill={color} />
                  </svg>
                );
              }
            };

            const positions = [
              { top: '15%', left: '15%' },
              { top: '25%', right: '15%' },
              { bottom: '20%', left: '20%' },
              { bottom: '30%', right: '20%' }
            ];

            const pos = positions[i];

            return (
              <div
                key={i}
                className="absolute opacity-40 hover:opacity-80 transition duration-300"
                style={{
                  ...pos,
                  width: `${size}px`,
                  height: `${size}px`,
                  filter: `drop-shadow(0 0 12px ${color})`,
                  animation: `${floatAnim} calc(var(--anim-duration) * 1.8) ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              >
                {getThemeLogoSVG()}
              </div>
            );
          })}
        </div>
      )}

      {/* Lava Lamp Bubbles background */}
      {ambientAnimation === "lava-lamp" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent" style={{ filter: "blur(20px) contrast(20)" }}>
          {/* Black solid contrast layer to blend behind but transparent background lets gradients in */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Bottom container / liquid reservoir */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[80px]"
            style={{
              background: `linear-gradient(to top, ${themeColors.primary}, ${themeColors.secondary})`
            }}
          />

          {/* Floating rising/sinking goo blobs */}
          {Array.from({ length: 5 }).map((_, i) => {
            const delay = i * 1.5;
            const size = 60 + (i % 3) * 35; // 60px to 130px
            const duration = 7 + (i % 3) * 3; // 7s to 13s
            const left = 10 + i * 18; // spread out horizontally
            const color = themeColors.gradientStops[i % themeColors.gradientStops.length];
            const gooAnim = `lava-goo-${i + 1}`;

            return (
              <div
                key={i}
                className="absolute bottom-[-50px] rounded-full"
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `radial-gradient(circle, ${color} 0%, ${themeColors.secondary} 70%, transparent 100%)`,
                  animation: `${gooAnim} calc(var(--anim-duration) * ${duration / 4}) ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Random Shapes background */}
      {ambientAnimation === "random-shapes" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent opacity-30">
          {Array.from({ length: 8 }).map((_, i) => {
            const delay = i * 0.65;
            const size = 30 + (i % 4) * 20; // 30px to 90px
            const driftAnim = `shape-drift-${(i % 4) + 1}`;
            const color = themeColors.gradientStops[i % themeColors.gradientStops.length];

            const shapes = [
              // Triangle
              <svg key="triangle" viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={color} strokeWidth="6">
                <polygon points="50,15 90,85 10,85" />
              </svg>,
              // Perfect Circle
              <svg key="circle" viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={color} strokeWidth="6">
                <circle cx="50" cy="50" r="38" />
              </svg>,
              // Square
              <svg key="square" viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={color} strokeWidth="6">
                <rect x="15" y="15" width="70" height="70" />
              </svg>,
              // Hexagon
              <svg key="hexagon" viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={color} strokeWidth="6">
                <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" />
              </svg>,
              // Star
              <svg key="star" viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={color} strokeWidth="6">
                <polygon points="50,10 63,38 93,38 70,57 78,87 50,70 22,87 30,57 7,38 37,38" />
              </svg>,
              // Cross / Plus
              <svg key="cross" viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={color} strokeWidth="6">
                <path d="M50,10 L50,90 M10,50 L90,50" />
              </svg>
            ];

            const selectedShape = shapes[i % shapes.length];

            const positions = [
              { top: '10%', left: '20%' },
              { top: '30%', right: '15%' },
              { top: '50%', left: '10%' },
              { bottom: '25%', right: '25%' },
              { bottom: '15%', left: '30%' },
              { top: '70%', left: '75%' },
              { top: '20%', right: '45%' },
              { bottom: '45%', left: '40%' }
            ];

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  ...positions[i],
                  width: `${size}px`,
                  height: `${size}px`,
                  filter: `drop-shadow(0 0 8px ${color})`,
                  animation: `${driftAnim} calc(var(--anim-duration) * 2.2) ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              >
                {selectedShape}
              </div>
            );
          })}
        </div>
      )}

      {/* Psychedelic Swirl background */}
      {ambientAnimation === "psychedelic-swirl" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent flex items-center justify-center">
          {/* Multiple concentric pulsating and twisting gooey neon shapes */}
          {Array.from({ length: 4 }).map((_, i) => {
            const delay = i * 0.85;
            const sizePercent = 160 - i * 35; // concentric circles starting from 160% down to 55%
            const speedMultiplier = 1.0 + (i * 0.4);
            const color = themeColors.gradientStops[i % themeColors.gradientStops.length];
            const extraColor = themeColors.gradientStops[(i + 1) % themeColors.gradientStops.length];

            return (
              <div
                key={i}
                className="absolute mix-blend-screen filter blur-[20px] opacity-60"
                style={{
                  width: `${sizePercent}%`,
                  height: `${sizePercent}%`,
                  background: `conic-gradient(from 0deg, ${color}, ${extraColor}, transparent, ${color})`,
                  animation: `
                    psych-spin calc(var(--anim-duration) * ${2.8 / speedMultiplier}) linear infinite,
                    psych-pulse calc(var(--anim-duration) * 1.5) ease-in-out infinite alternate,
                    psych-warp calc(var(--anim-duration) * 2.2) ease-in-out infinite alternate
                  `,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}

          {/* Trippy strobe centerpiece */}
          <div
            className="absolute w-[35%] h-[35%] rounded-full filter blur-[25px] opacity-80 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle, #ffffff 0%, ${themeColors.primary} 40%, transparent 100%)`,
              animation: 'psych-pulse calc(var(--anim-duration) * 0.8) ease-in-out infinite alternate'
            }}
          />
        </div>
      )}

      {/* Layer 1: Question Only Layer (Phase 0) */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 flex flex-col justify-center items-center p-[1.5em]"
        style={{
          transform: phase === 0 ? "translateY(0)" : "translateY(-150%)",
          opacity: phase === 0 ? 1 : 0,
          pointerEvents: phase === 0 ? "auto" : "none",
          transition: `all ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1)`,
          fontSize: layer1FontSize ? `${layer1FontSize}px` : undefined,
        }}
      >
        <div className="w-full max-w-[88%] bg-black/80 backdrop-blur-xl border-[0.1em] border-white/15 p-[2em] rounded-3xl shadow-2xl text-center">
          <h2 className="text-[1.8em] font-black text-center text-white drop-shadow-[0_0.1em_0.2em_rgba(0,0,0,0.85)] leading-snug whitespace-normal">
            {questionData.question.replace(/\s+\?/g, "\u00A0?")}
          </h2>
        </div>
      </div>

      {/* Layer 2: Answers & Explanation Layer (Phases 1 to 6) */}
      <div
        ref={layer2Ref}
        className="absolute inset-0 flex flex-col justify-center p-[1.5em]"
        style={{
          transform: phase !== "edit" && phase >= 1 ? "translateY(0)" : "translateY(150%)",
          opacity: phase !== "edit" && phase >= 1 ? 1 : 0,
          pointerEvents: phase !== "edit" && phase >= 1 ? "auto" : "none",
          transition: `all ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1)`,
          fontSize: layer2FontSize ? `${layer2FontSize}px` : undefined,
        }}
      >
        <div className="flex-1 flex flex-col justify-center py-[0.5em] h-full overflow-visible w-full max-w-[88%] mx-auto">
          <div className="flex-1 flex flex-col justify-center overflow-visible">
            <div
              ref={answersContainerRef}
              className="relative flex flex-col space-y-[0.6em] transition-all overflow-hidden p-[0.5em] -m-[0.5em]"
              style={{
                maxHeight: phase === 6 ? (correctCardHeight ? `${correctCardHeight + (1.0 * (layer2FontSize || 16))}px` : "7em") : "40em",
                transition: `max-height ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1) ${phase === 6 ? `${transitionTime}s` : "0s"}`,
              }}
            >
              {questionData.answers.map((ans, i) => {
                const isHighlighted = phase !== "edit" && phase >= 1 && phase <= 4 && (phase - 1) === i;
                const isCorrect = questionData.correctIndex === i;

                let opacity = 1;
                let pointerEvents: "auto" | "none" = "auto";
                let transform = "translateY(0)";
                let zIndex = 1;

                if (phase === 6) {
                  const offsetPx = cardOffsets[i];
                  transform = offsetPx !== undefined && offsetPx !== 0
                    ? `translateY(-${offsetPx}px)`
                    : i > 0
                    ? `translateY(calc(-${i * 100}% - ${i * 0.6}em))`
                    : "translateY(0)";

                  if (isCorrect) {
                    opacity = 1;
                    pointerEvents = "auto";
                    zIndex = 10;
                  } else {
                    opacity = 0;
                    pointerEvents = "none";
                    zIndex = 1;
                  }
                }

                const isCorrectHighlighted = phase === 6 && isCorrect;

                let borderClass = "border-white/10";
                if (isHighlighted) {
                  borderClass = "border-white/95";
                } else if (phase === 5) {
                  borderClass = "border-white/25";
                } else if (phase !== "edit" && phase >= 1) {
                  borderClass = "border-white/15";
                }

                const revealDelay = phase === 6 ? `${transitionTime}s` : "0s";

                return (
                  <div
                    key={i}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    style={{
                      opacity,
                      maxHeight: "8em",
                      marginBottom: "0px",
                      pointerEvents,
                      transform,
                      zIndex,
                      transition: `transform ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1) ${revealDelay}, opacity ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1) ${revealDelay}`,
                    }}
                    className={`overflow-hidden rounded-[1em] relative border-[0.12em] shrink-0 text-white font-bold text-left flex items-center gap-[0.8em] w-full h-auto py-[0.8em] pl-[1.2em] pr-[1.0em] ${
                      isCorrectHighlighted
                        ? "border-transparent bg-emerald-950/95 shadow-[0_0_1.5em_rgba(16,185,129,0.25)]"
                        : isHighlighted
                        ? "bg-black/45 border-white/95 shadow-[0_0_1em_rgba(255,255,255,0.25)]"
                        : phase === 5
                        ? "bg-black/55 border-white/25"
                        : "bg-black/65 border-white/15"
                    }`}
                  >
                    {isCorrectHighlighted && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
                        <defs>
                          {getThemeGradientDefs(colorTheme)}
                        </defs>
                        <rect
                          x="0.08em"
                          y="0.08em"
                          width="calc(100% - 0.16em)"
                          height="calc(100% - 0.16em)"
                          fill="none"
                          rx="0.92em"
                          ry="0.92em"
                          stroke="url(#theme-reveal-grad)"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          pathLength="100"
                          style={{
                            strokeWidth: "0.15em",
                            strokeDasharray: "102",
                            strokeDashoffset: "102",
                            animation: `draw-border ${transitionTime}s linear forwards`,
                          }}
                        />
                      </svg>
                    )}

                    <span className={`relative z-10 rounded-full border flex items-center justify-center transition-colors duration-300 w-[2em] h-[2em] text-[0.85em] font-black shrink-0 ${
                      isCorrectHighlighted
                        ? "bg-emerald-500 text-white border-emerald-400 font-black scale-110"
                        : isHighlighted
                        ? "bg-white text-black border-white"
                        : "bg-white/10 border-white/20 text-white"
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="relative z-10 text-[1em] leading-snug whitespace-normal">
                      {ans.replace(/\s+\?/g, "\u00A0?")}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              ref={explanationRef}
              style={{
                maxHeight: phase === 6 ? "35em" : "0px",
                opacity: phase === 6 ? 1 : 0,
                marginTop: phase === 6 ? "0.6em" : "0px",
                pointerEvents: phase === 6 ? "auto" : "none",
                transition: `max-height ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1) ${phase === 6 ? `${transitionTime}s` : "0s"}, margin-top ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1) ${phase === 6 ? `${transitionTime}s` : "0s"}, opacity ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1) ${phase === 6 ? `${transitionTime}s` : "0s"}`,
                fontSize: explanationFontSize ? `${explanationFontSize / 0.85}px` : undefined,
              }}
            >
              <div
                style={{
                  transform: phase === 6 ? "translateY(0)" : "translateY(100vh)",
                  opacity: phase === 6 ? 1 : 0,
                  transition: `transform ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1) ${phase === 6 ? `${transitionTime}s` : "0s"}, opacity ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1) ${phase === 6 ? `${transitionTime}s` : "0s"}`,
                }}
                className="text-center text-white px-[0.8em] py-[0.6em] bg-black/55 border-[0.05em] border-white/10 rounded-[1em] flex flex-col justify-center h-auto shadow-inner overflow-hidden"
              >
                <span className="text-[0.6em] font-bold text-white/40 tracking-widest block mb-[0.2em] uppercase">
                  Explanation
                </span>
                <p className="text-[0.85em] leading-relaxed font-medium drop-shadow-sm">
                  {questionData.explanation.replace(/\s+\?/g, "\u00A0?")}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuizPageClient({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  const { textColorClass, bodyBackgroundColor, textBackgroundColorClass } =
    colorValues(theme);

  // Core quiz state
  const [format, setFormat] = useState<"markdown" | "json" | "yaml">("markdown");
  const [questionData, setQuestionData] = useState<QuizQuestion>(GCP_EXAMS_PRESETS[0].questions[0]);
  const [rawText, setRawText] = useState(() => {
    return `# Question
Which cloud computing service model offers the highest level of customization and control over the underlying infrastructure?

## Answers
- [ ] SaaS (Software as a Service)
- [ ] PaaS (Platform as a Service)
- [x] IaaS (Infrastructure as a Service)
- [ ] FaaS (Function as a Service)

## Explanation
Infrastructure as a Service (IaaS) provides virtualized computing resources, giving users maximum control over operating systems, storage, and networking.`;
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Style customization state
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "16:9" | "1:1" | "Both">("9:16");
  const [colorTheme, setColorTheme] = useState<"Google Cloud" | "Firebase" | "Flutter/Dart" | "Go">("Google Cloud");
  const [ambientAnimation, setAmbientAnimation] = useState<"none" | "shimmer" | "aurora" | "mesh-liquid" | "radial-flow" | "cosmic-glow" | "fireflies" | "warp-speed" | "laser-beams" | "color-vortex" | "matrix-rain" | "spinning-logos" | "lava-lamp" | "random-shapes" | "psychedelic-swirl">("none");
  const [animationSpeed, setAnimationSpeed] = useState<number>(1.0);
  const [transitionTime, setTransitionTime] = useState<number>(1.0);
  const [hidePanels, setHidePanels] = useState<boolean>(false);

  // Player phase state:
  // "edit" | 0 (Question) | 1 (A highlight) | 2 (B highlight) | 3 (C highlight) | 4 (D highlight) | 5 (All answers, pause) | 6 (Explanation & correct answer highlighted)
  const [phase, setPhase] = useState<"edit" | 0 | 1 | 2 | 3 | 4 | 5 | 6>("edit");

  // Format Helper Functions
  const formatYaml = (q: QuizQuestion) => {
    return `question: "${q.question.replace(/"/g, '\\"')}"
answers:
  - "${q.answers[0]?.replace(/"/g, '\\"') || ''}"
  - "${q.answers[1]?.replace(/"/g, '\\"') || ''}"
  - "${q.answers[2]?.replace(/"/g, '\\"') || ''}"
  - "${q.answers[3]?.replace(/"/g, '\\"') || ''}"
correctIndex: ${q.correctIndex}
explanation: "${q.explanation.replace(/"/g, '\\"')}"`;
  };

  const formatMarkdown = (q: QuizQuestion) => {
    return `# Question
${q.question}

## Answers
- [${q.correctIndex === 0 ? 'x' : ' '}] ${q.answers[0] || ''}
- [${q.correctIndex === 1 ? 'x' : ' '}] ${q.answers[1] || ''}
- [${q.correctIndex === 2 ? 'x' : ' '}] ${q.answers[2] || ''}
- [${q.correctIndex === 3 ? 'x' : ' '}] ${q.answers[3] || ''}

## Explanation
${q.explanation}`;
  };

  // Parser & Validation Functions
  const validateQuestion = (q: QuizQuestion): string[] => {
    const errs: string[] = [];
    if (!q.question.trim()) {
      errs.push("Question text is required.");
    }
    if (!q.answers || q.answers.length !== 4) {
      errs.push(`Exactly 4 answers are required (currently ${q.answers?.length || 0}).`);
    } else {
      q.answers.forEach((ans, i) => {
        if (!ans.trim()) {
          errs.push(`Answer ${String.fromCharCode(65 + i)} cannot be empty.`);
        }
      });
    }
    if (q.correctIndex < 0 || q.correctIndex > 3) {
      errs.push("One answer must be marked as correct.");
    }
    if (!q.explanation.trim()) {
      errs.push("Explanation is required.");
    }
    return errs;
  };

  const parseText = (text: string): { data: QuizQuestion | null; errors: string[]; format: "json" | "yaml" | "markdown" } => {
    const trimmedText = text.trim();

    // 1. JSON Detection
    if (trimmedText.startsWith("{") || trimmedText.startsWith("[")) {
      try {
        const obj = JSON.parse(trimmedText) as any;
        const question = (obj.question || "").toString();
        const answers = Array.isArray(obj.answers) ? obj.answers.map((a: any) => (a || "").toString()) : [];
        let correctIndex = -1;
        if (typeof obj.correctIndex === "number") {
          correctIndex = obj.correctIndex;
        } else if (typeof obj.correctAnswer === "string" && answers.length > 0) {
          correctIndex = answers.indexOf(obj.correctAnswer);
        }
        const explanation = (obj.explanation || "").toString();

        const qObj = { question, answers, correctIndex, explanation };
        return {
          data: qObj,
          errors: validateQuestion(qObj),
          format: "json",
        };
      } catch (e: any) {
        return {
          data: null,
          errors: ["Invalid JSON format: " + e.message],
          format: "json",
        };
      }
    }

    // 2. YAML Detection
    if (trimmedText.includes("question:") && trimmedText.includes("answers:")) {
      try {
        const lines = text.split("\n");
        let question = "";
        let answers: string[] = [];
        let correctIndex = -1;
        let explanation = "";
        let currentSection = "";

        for (let line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;

          if (trimmed.startsWith("question:")) {
            question = trimmed.substring("question:".length).trim().replace(/^['"]|['"]$/g, "");
            currentSection = "question";
          } else if (trimmed.startsWith("answers:")) {
            currentSection = "answers";
          } else if (trimmed.startsWith("correctIndex:")) {
            correctIndex = parseInt(trimmed.substring("correctIndex:".length).trim(), 10);
            currentSection = "correctIndex";
          } else if (trimmed.startsWith("explanation:")) {
            explanation = trimmed.substring("explanation:".length).trim().replace(/^['"]|['"]$/g, "");
            currentSection = "explanation";
          } else if (trimmed.startsWith("-") && currentSection === "answers") {
            const ans = trimmed.substring(1).trim().replace(/^['"]|['"]$/g, "");
            answers.push(ans);
          } else {
            if (currentSection === "question") {
              question += " " + trimmed.replace(/^['"]|['"]$/g, "");
            } else if (currentSection === "explanation") {
              explanation += " " + trimmed.replace(/^['"]|['"]$/g, "");
            }
          }
        }

        const qObj = { question, answers, correctIndex, explanation };
        return {
          data: qObj,
          errors: validateQuestion(qObj),
          format: "yaml",
        };
      } catch (e: any) {
        return {
          data: null,
          errors: ["Invalid YAML format: " + e.message],
          format: "yaml",
        };
      }
    }

    // 3. Fallback to Markdown
    try {
      const lines = text.split("\n");
      let currentSec = "";
      let qLines: string[] = [];
      let eLines: string[] = [];
      let answers: string[] = [];
      let correctIndex = -1;

      for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed.toLowerCase().startsWith("# question")) {
          currentSec = "question";
          continue;
        } else if (trimmed.toLowerCase().startsWith("## answers") || trimmed.toLowerCase().startsWith("# answers")) {
          currentSec = "answers";
          continue;
        } else if (trimmed.toLowerCase().startsWith("## explanation") || trimmed.toLowerCase().startsWith("# explanation")) {
          currentSec = "explanation";
          continue;
        }

        if (currentSec === "question") {
          if (trimmed !== "") qLines.push(trimmed);
        } else if (currentSec === "explanation") {
          if (trimmed !== "") eLines.push(trimmed);
        } else if (currentSec === "answers") {
          const match = trimmed.match(/^[-*]\s*\[\s*([xX\s]?)\s*\]\s*(.*)$/);
          if (match) {
            const isCorrect = match[1].toLowerCase() === "x";
            const ansText = match[2].trim();
            if (isCorrect) {
              correctIndex = answers.length;
            }
            answers.push(ansText);
          } else if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
            answers.push(trimmed.substring(1).trim());
          }
        }
      }

      const question = qLines.join("\n").trim();
      const explanation = eLines.join("\n").trim();

      const qObj = { question, answers, correctIndex, explanation };
      return {
        data: qObj,
        errors: validateQuestion(qObj),
        format: "markdown",
      };
    } catch (e: any) {
      return {
        data: null,
        errors: ["Invalid Markdown format: " + e.message],
        format: "markdown",
      };
    }
  };

  // Synchronizers
  const handleFormChange = (updated: QuizQuestion) => {
    setQuestionData(updated);
    const validationErrs = validateQuestion(updated);
    setErrors(validationErrs);

    let formatted = "";
    if (format === "json") {
      formatted = JSON.stringify(updated, null, 2);
    } else if (format === "yaml") {
      formatted = formatYaml(updated);
    } else {
      formatted = formatMarkdown(updated);
    }
    setRawText(formatted);
  };

  const handleRawTextChange = (text: string) => {
    setRawText(text);
    const result = parseText(text);
    if (result.errors.length > 0) {
      setErrors(result.errors);
    } else {
      setErrors([]);
      if (result.data) {
        setQuestionData(result.data);
        setFormat(result.format);
      }
    }
  };

  const handleFormatChange = (newFormat: "markdown" | "json" | "yaml") => {
    setFormat(newFormat);
    let formatted = "";
    if (newFormat === "json") {
      formatted = JSON.stringify(questionData, null, 2);
    } else if (newFormat === "yaml") {
      formatted = formatYaml(questionData);
    } else {
      formatted = formatMarkdown(questionData);
    }
    setRawText(formatted);
  };

  // Presets load
  const loadQuestionPreset = (q: QuizQuestion) => {
    setQuestionData(q);
    setErrors([]);
    let formatted = "";
    if (format === "json") {
      formatted = JSON.stringify(q, null, 2);
    } else if (format === "yaml") {
      formatted = formatYaml(q);
    } else {
      formatted = formatMarkdown(q);
    }
    setRawText(formatted);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Failed to copy text.");
    }
  };

  const advancePhase = () => {
    if (phase === "edit") return;
    if (phase === 6) {
      setPhase(0);
    } else {
      setPhase((prev) => (prev as number) + 1 as any);
    }
  };

  const retreatPhase = () => {
    if (phase === "edit") return;
    if (phase === 0) {
      setPhase(6);
    } else {
      setPhase((prev) => (prev as number) - 1 as any);
    }
  };

  // Keyboard navigation for presentation mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHidePanels(false);
      }
      if (phase === "edit") return;
      if (e.key === "ArrowRight") {
        advancePhase();
      } else if (e.key === "ArrowLeft") {
        retreatPhase();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Input styling based on theme
  const inputThemeClass = theme.color === "dark"
    ? "bg-gray-950 text-white border-gray-800 focus:ring-amber-500 placeholder-gray-500"
    : "bg-white text-black border-gray-200 focus:ring-orange-500 placeholder-gray-400";

  return (
    <div className={`w-full ${hidePanels ? "h-screen overflow-hidden flex flex-col justify-center items-center" : "min-h-screen pb-12"} ${textColorClass}`}>
      <style>
        {`body { background-color: ${bodyBackgroundColor} }`}
      </style>

      {!hidePanels && (
        <Navbar theme={theme} deploymentConfiguration={deploymentConfiguration} />
      )}

      {/* Floating Panel Restorer Button for Recording Mode */}
      {hidePanels && (
        <button
          onClick={() => setHidePanels(false)}
          className="fixed top-4 right-4 z-50 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs px-4 py-2.5 shadow-2xl transition cursor-pointer flex items-center gap-2 border border-amber-400/20"
          title="Press ESC or click to restore control panel layout"
        >
          <span>👁️ Show Control Panels</span>
          <span className="opacity-60 text-[9px] bg-black/20 px-1 py-0.5 rounded">ESC</span>
        </button>
      )}

      {/* Main Container Layout */}
      <div className={hidePanels ? "w-full h-full flex items-center justify-center overflow-hidden" : "mx-auto w-full max-w-[1700px] px-4 mt-6"}>
        <div className={hidePanels ? "w-full h-full flex items-center justify-center" : `grid grid-cols-1 ${hidePanels ? "" : "xl:grid-cols-12"} gap-6 items-start`}>

          {/* LEFT PANEL: Nested GCP Presets (Static List, No Accordion) */}
          {!hidePanels && (
            <div className={`xl:col-span-3 rounded-2xl p-4 shadow-xl ${textBackgroundColorClass} border border-gray-200/10 max-h-[85vh] overflow-y-auto`}>
              <h2 className="text-lg font-extrabold mb-4 pb-2 border-b border-gray-200/10 flex items-center justify-between">
                <span>Quiz Collections</span>
                <span className="text-xs font-normal opacity-60">
                  {GCP_EXAMS_PRESETS.reduce((acc, e) => acc + e.questions.length, 0)} Questions
                </span>
              </h2>
              <div className="space-y-6">
                {GCP_EXAMS_PRESETS.map((exam, examIdx) => (
                  <div key={examIdx} className="space-y-2">
                    <h3 className="text-sm font-black text-amber-500 uppercase tracking-wide">
                      {exam.examName}
                    </h3>
                    <ul className="space-y-1.5 ml-2 border-l border-gray-200/10 pl-2">
                      {exam.questions.map((q, qIdx) => {
                        const isSelected = questionData.question === q.question;
                        return (
                          <li key={qIdx}>
                            <button
                              onClick={() => loadQuestionPreset(q)}
                              className={`w-full text-left text-xs py-1 px-2 rounded-lg transition-all duration-150 ${
                                isSelected
                                  ? theme.color === "dark"
                                    ? "bg-amber-500/20 text-amber-400 font-bold border-l-2 border-amber-500 pl-1.5"
                                    : "bg-amber-500/15 text-amber-700 font-bold border-l-2 border-amber-500 pl-1.5"
                                  : theme.color === "dark"
                                  ? "text-gray-400 hover:text-white hover:bg-white/5"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                              }`}
                            >
                              <span className="opacity-50 mr-1">Q{qIdx + 1}:</span>
                              <span className="line-clamp-2 inline align-middle">{q.question}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MAIN CENTER PANEL: Editor OR Presentation Screen */}
          <div className={hidePanels ? "w-full h-full flex items-center justify-center" : "xl:col-span-9"}>
            {phase === "edit" ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Form Editor */}
                <div className={`lg:col-span-7 rounded-2xl p-6 shadow-xl ${textBackgroundColorClass} space-y-6 border border-gray-200/10`}>
                  <div className="flex justify-between items-center border-b border-gray-200/10 pb-3">
                    <h2 className="text-xl font-bold">Interactive Form</h2>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1" htmlFor="quiz-question">
                        Question Text
                      </label>
                      <textarea
                        id="quiz-question"
                        rows={3}
                        value={questionData.question}
                        onChange={(e) => handleFormChange({ ...questionData, question: e.target.value })}
                        placeholder="Enter the question text..."
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 resize-none ${inputThemeClass}`}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">Answers (Check the correct one)</label>
                      {questionData.answers.map((ans, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <input
                            type="radio"
                            id={`correct-ans-${i}`}
                            name="correctAnswerSelection"
                            checked={questionData.correctIndex === i}
                            onChange={() => handleFormChange({ ...questionData, correctIndex: i })}
                            className="w-5 h-5 accent-orange-500 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={ans}
                            onChange={(e) => {
                              const nextAnswers = [...questionData.answers];
                              nextAnswers[i] = e.target.value;
                              handleFormChange({ ...questionData, answers: nextAnswers });
                            }}
                            placeholder={`Option ${String.fromCharCode(65 + i)}`}
                            className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${inputThemeClass}`}
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1" htmlFor="quiz-explanation">
                        Explanation
                      </label>
                      <textarea
                        id="quiz-explanation"
                        rows={3}
                        value={questionData.explanation}
                        onChange={(e) => handleFormChange({ ...questionData, explanation: e.target.value })}
                        placeholder="Explain why the answer is correct..."
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 resize-none ${inputThemeClass}`}
                      />
                    </div>
                  </div>

                  {/* Errors Panel */}
                  {errors.length > 0 && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl p-4 text-sm font-medium space-y-1">
                      <p className="font-bold">⚠️ Correct the following issues:</p>
                      <ul className="list-disc list-inside space-y-0.5 opacity-90 pl-1">
                        {errors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Start Button */}
                  <button
                    disabled={errors.length > 0}
                    onClick={() => setPhase(0)}
                    className={`w-full py-3.5 px-6 rounded-xl font-extrabold text-white text-base shadow-lg transition flex items-center justify-center gap-2 ${
                      errors.length > 0
                        ? "bg-gray-400 dark:bg-gray-800 cursor-not-allowed opacity-50 text-gray-500 dark:text-gray-400"
                        : "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                    }`}
                  >
                    🎬 Launch Quiz Player Screen
                  </button>
                </div>

                {/* Raw Copy/Paste Box */}
                <div className={`lg:col-span-5 rounded-2xl p-6 shadow-xl ${textBackgroundColorClass} space-y-4 border border-gray-200/10`}>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Raw Copy / Paste</h2>
                    <select
                      value={format}
                      onChange={(e) => handleFormatChange(e.target.value as any)}
                      className={`px-3 py-1 rounded-lg border text-xs font-bold focus:outline-none ${inputThemeClass}`}
                    >
                      <option value="markdown">Markdown</option>
                      <option value="json">JSON</option>
                      <option value="yaml">YAML</option>
                    </select>
                  </div>

                  <div className="relative">
                    <textarea
                      id="quiz-raw-text"
                      rows={14}
                      value={rawText}
                      onChange={(e) => handleRawTextChange(e.target.value)}
                      placeholder="Paste or type formatted Markdown, JSON, or YAML here to parse directly..."
                      className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 font-mono text-xs leading-relaxed resize-y ${inputThemeClass}`}
                    />
                    <button
                      onClick={handleCopy}
                      className={`absolute top-3 right-3 p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition shadow cursor-pointer ${
                        theme.color === "dark"
                          ? "bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                          : "bg-black/10 hover:bg-black/20 border border-black/20 text-gray-800"
                      }`}
                      title="Copy to Clipboard"
                    >
                      {copied ? "✅ Copied!" : "📋 Copy"}
                    </button>
                  </div>

                  <div className="text-xs opacity-60 space-y-1">
                    <p>💡 <b>Quick Tip:</b> You can paste raw questions in JSON, YAML, or Markdown. The site detects the format, parses the content, and updates the form in real-time!</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Presentation / Interactive Player Mode with Side Controls */
              <div className={hidePanels ? "w-full h-full flex items-center justify-center" : "flex flex-col lg:flex-row gap-8 items-stretch justify-center"}>

                {/* 1. Large Centered Interactive Quiz Viewport */}
                <div className={hidePanels ? "w-full h-full flex flex-row gap-8 justify-center items-center" : "flex-1 flex flex-wrap gap-8 justify-center items-center"}>
                  {aspectRatio === "Both" ? (
                    <>
                      {/* 9:16 Preview */}
                      <div className={hidePanels ? "flex flex-col items-center" : "flex flex-col items-center w-full max-w-[420px]"}>
                        {!hidePanels && (
                          <span className="text-xs font-bold opacity-60 mb-2 uppercase tracking-widest">9:16 Viewport</span>
                        )}
                        <QuizViewport
                          ratio="9:16"
                          phase={phase}
                          questionData={questionData}
                          colorTheme={colorTheme}
                          ambientAnimation={ambientAnimation}
                          animationSpeed={animationSpeed}
                          transitionTime={transitionTime}
                          hidePanels={hidePanels}
                          advancePhase={advancePhase}
                          isBothMode={true}
                        />
                      </div>

                      {/* 16:9 Preview */}
                      <div className={hidePanels ? "flex flex-col items-center" : "flex flex-col items-center w-full max-w-[850px]"}>
                        {!hidePanels && (
                          <span className="text-xs font-bold opacity-60 mb-2 uppercase tracking-widest">16:9 Viewport</span>
                        )}
                        <QuizViewport
                          ratio="16:9"
                          phase={phase}
                          questionData={questionData}
                          colorTheme={colorTheme}
                          ambientAnimation={ambientAnimation}
                          animationSpeed={animationSpeed}
                          transitionTime={transitionTime}
                          hidePanels={hidePanels}
                          advancePhase={advancePhase}
                          isBothMode={true}
                        />
                      </div>
                    </>
                  ) : (
                    <QuizViewport
                      ratio={aspectRatio as any}
                      phase={phase}
                      questionData={questionData}
                      colorTheme={colorTheme}
                      ambientAnimation={ambientAnimation}
                      animationSpeed={animationSpeed}
                      transitionTime={transitionTime}
                      hidePanels={hidePanels}
                      advancePhase={advancePhase}
                    />
                  )}
                </div>

                {/* 2. Side Control Column */}
                {!hidePanels && (
                  <div className={`w-full lg:w-[320px] rounded-2xl p-6 shadow-xl ${textBackgroundColorClass} border border-gray-200/10 flex flex-col justify-between space-y-6 self-start`}>

                  {/* Top: Header Info */}
                  <div>
                    <h3 className="text-base font-extrabold mb-1">Presenter Panel</h3>
                    <p className="text-xs text-gray-400">Customization & control options. Out of camera frame.</p>
                  </div>

                  {/* Playback step selector */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider opacity-60">
                      Step Navigation ({phase + 1}/7)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={retreatPhase}
                        className={`py-2 px-3 border text-xs font-bold rounded-lg transition text-center ${
                          theme.color === "dark"
                            ? "bg-white/5 hover:bg-white/15 border-white/10 text-white"
                            : "bg-black/5 hover:bg-black/10 border-black/10 text-gray-900"
                        }`}
                      >
                        ◀ Previous
                      </button>
                      <button
                        onClick={advancePhase}
                        className={`py-2 px-3 border text-xs font-bold rounded-lg transition text-center ${
                          theme.color === "dark"
                            ? "bg-white/5 hover:bg-white/15 border-white/10 text-white"
                            : "bg-black/5 hover:bg-black/10 border-black/10 text-gray-900"
                        }`}
                      >
                        Next ▶
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mt-1">
                      {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                        <button
                          key={num}
                          onClick={() => setPhase(num as any)}
                          className={`py-1 text-xs font-black rounded transition ${
                            phase === num
                              ? "bg-amber-500 text-white"
                              : theme.color === "dark"
                              ? "bg-white/5 hover:bg-white/15 border border-white/10 text-gray-400 hover:text-white"
                              : "bg-black/5 hover:bg-black/10 border border-black/10 text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          {num + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Transition Speed control */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider opacity-60">
                      <span>Transition Duration</span>
                      <span className="text-amber-500">{transitionTime.toFixed(1)}s</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="3.0"
                      step="0.1"
                      value={transitionTime}
                      onChange={(e) => setTransitionTime(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 bg-white/10"
                    />
                  </div>

                  {/* Ambient Animation controls */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider opacity-60">
                      Background Animation
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {([
                        "none",
                        "shimmer",
                        "aurora",
                        "mesh-liquid",
                        "radial-flow",
                        "cosmic-glow",
                        "fireflies",
                        "warp-speed",
                        "laser-beams",
                        "color-vortex",
                        "matrix-rain",
                        "spinning-logos",
                        "lava-lamp",
                        "random-shapes",
                        "psychedelic-swirl"
                      ] as const).map((anim) => (
                        <button
                          key={anim}
                          onClick={() => setAmbientAnimation(anim)}
                          className={`py-1 px-1 rounded-lg font-bold border transition text-center text-[10px] ${
                            ambientAnimation === anim
                              ? "bg-amber-500 text-white border-amber-600"
                              : theme.color === "dark"
                              ? "bg-white/5 hover:bg-white/10 border-white/10 text-gray-400 hover:text-white"
                              : "bg-black/5 hover:bg-black/10 border-black/10 text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          {anim === "none" ? "None" :
                           anim === "shimmer" ? "Shimmer" :
                           anim === "aurora" ? "Aurora" :
                           anim === "mesh-liquid" ? "Liquid" :
                           anim === "radial-flow" ? "Radial" :
                           anim === "cosmic-glow" ? "Cosmic" :
                           anim === "fireflies" ? "Fireflies" :
                           anim === "warp-speed" ? "Warp" :
                           anim === "laser-beams" ? "Laser" :
                           anim === "color-vortex" ? "Vortex" :
                           anim === "matrix-rain" ? "Matrix" :
                           anim === "spinning-logos" ? "Logos 🌀" :
                           anim === "lava-lamp" ? "Lava 🔮" :
                           anim === "random-shapes" ? "Shapes 🔺" :
                           anim === "psychedelic-swirl" ? "Trippy 💫" : anim}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Animation Speed Control */}
                  {ambientAnimation !== "none" && (
                    <div className="space-y-2 pt-1 transition-all duration-300">
                      <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider opacity-60">
                        <span>Animation Speed</span>
                        <span className="text-amber-500">{animationSpeed.toFixed(1)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="10.0"
                        step="0.1"
                        value={animationSpeed}
                        onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                        className="w-full accent-amber-500 bg-white/10"
                      />
                    </div>
                  )}

                  {/* Aspect Ratio controls */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider opacity-60">
                      Aspect Ratio
                    </label>
                    <div className="grid grid-cols-4 gap-1">
                      {(["9:16", "16:9", "1:1", "Both"] as const).map((ratio) => (
                        <button
                          key={ratio}
                          onClick={() => setAspectRatio(ratio)}
                          className={`py-1.5 px-1 rounded-lg text-[10px] font-bold border transition text-center ${
                            aspectRatio === ratio
                              ? "bg-amber-500 text-white border-amber-600"
                              : theme.color === "dark"
                              ? "bg-white/5 hover:bg-white/10 border-white/10 text-gray-400 hover:text-white"
                              : "bg-black/5 hover:bg-black/10 border-black/10 text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Theme controls */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider opacity-60">
                      Color Theme
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["Google Cloud", "Firebase", "Flutter/Dart", "Go"] as const).map((style) => (
                        <button
                          key={style}
                          onClick={() => setColorTheme(style)}
                          className={`py-2 px-2.5 rounded-lg text-xs font-bold border transition text-left flex flex-col justify-between ${
                            colorTheme === style
                              ? "bg-amber-500 text-white border-amber-600"
                              : theme.color === "dark"
                              ? "bg-white/5 hover:bg-white/10 border-white/10 text-gray-400 hover:text-white"
                              : "bg-black/5 hover:bg-black/10 border-black/10 text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <span>{style}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Exit Controls */}
                  <div className="pt-4 border-t border-gray-200/10 space-y-2">
                    <button
                      onClick={() => setHidePanels(true)}
                      className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow transition text-center"
                    >
                      📷 Hide Panels (Recording Mode)
                    </button>
                    <button
                      onClick={() => setPhase("edit")}
                      className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow transition text-center"
                    >
                      ✏️ Edit Question / Form
                    </button>
                    <button
                      onClick={() => {
                        setPhase(0);
                      }}
                      className={`w-full py-2 px-4 rounded-xl text-xs font-semibold border transition text-center ${
                        theme.color === "dark"
                          ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                          : "bg-black/5 hover:bg-black/10 border-black/10 text-gray-900"
                      }`}
                    >
                      🔄 Reset presentation
                    </button>
                  </div>

                </div>
                )}

              </div>
            )}
          </div>

        </div>
      </div>

      {!hidePanels && (
        <div className="mt-12">
          <Footer />
        </div>
      )}
    </div>
  );
}
