// NOTE FOR FUTURE AI GENERATING QUESTIONS:
// Maximum length for any answer option is ~45 characters (roughly half of 90 chars).
// Long answers (e.g., "Variables like context memory, reasoning chains, tool calls, and retries compound per request")
// cause UI overflow and layout distortion. Ensure all generated answer choices remain short and concise.
export interface QuizQuestion {
  question: string;
  answers: string[]; // Max length: ~45 characters per answer option
  correctIndex: number;
  explanation: string;
}

export interface ExamPreset {
  examName: string;
  questions: QuizQuestion[];
}

export const GCP_EXAMS_PRESETS: ExamPreset[] = [
  {
    examName: "Agentic Harness",
    questions: [
      {
        question:
          "What is the primary role of an agentic harness in AI systems?",
        answers: [
          "Fine-tuning base LLM model weights",
          "Managing execution loops, context & tools",
          "Serving raw REST API endpoints",
          "Replacing vector database indexes",
        ],
        correctIndex: 1,
        explanation:
          "An agentic harness provides the outer control loop, managing state, tool calls, context windows, and execution environments for AI agents.",
      },
      {
        question:
          "In agentic evaluation (e.g. SWE-bench), what does the test harness provide?",
        answers: [
          "A sandbox to run code and verify tests",
          "A custom GPU cluster for faster inference",
          "Automated prompt translation into SQL",
          "A graphical user interface for prompts",
        ],
        correctIndex: 0,
        explanation:
          "An evaluation harness isolates the agent's environment, executes generated patches or code, and verifies outcomes against test suites.",
      },
      {
        question:
          "What is a core benefit of incorporating sandboxing into an agentic harness?",
        answers: [
          "Eliminating the need for API keys",
          "Preventing harmful system side-effects",
          "Doubling the context window size",
          "Bypassing model rate limits",
        ],
        correctIndex: 1,
        explanation:
          "Sandboxing isolates agent tool execution (such as shell commands or code scripts) to protect host environments from unintended actions.",
      },
      {
        question:
          "How does an agentic harness handle multi-step reasoning failures or tool errors?",
        answers: [
          "Immediately crashing the application",
          "Feeding error feedback back into context",
          "Deleting the model's system prompt",
          "Ignoring errors and returning blank output",
        ],
        correctIndex: 1,
        explanation:
          "A robust harness captures tool execution errors or stack traces and feeds them back into the context window for model self-correction.",
      },
      {
        question:
          "Which component of an agentic harness prevents endless execution loops?",
        answers: [
          "Vector embeddings",
          "Step limits & timeout safety rails",
          "Temperature sampling",
          "Token tokenization",
        ],
        correctIndex: 1,
        explanation:
          "Safety guardrails such as maximum iteration caps, execution timeouts, and budget limits prevent agents from looping indefinitely.",
      },
      {
        question:
          "In multi-agent architectures, what function does the harness orchestrator serve?",
        answers: [
          "Formatting markdown text into HTML",
          "Routing tasks and managing agent hand-offs",
          "Training underlying neural networks",
          "Storing static media files on CDN",
        ],
        correctIndex: 1,
        explanation:
          "The orchestrator routes sub-tasks to specialized agents, maintains shared state, and coordinates hand-offs between agent roles.",
      },
      {
        question: "What is trajectory logging in an agentic harness?",
        answers: [
          "Recording every prompt, tool call, and state",
          "Measuring network latency of DNS queries",
          "Compressing image assets before upload",
          "Tracking user mouse movements in UI",
        ],
        correctIndex: 0,
        explanation:
          "Trajectory logging records step-by-step audit trails of agent thoughts, tool invocations, and environment responses for evaluation.",
      },
      {
        question:
          "What is 'human-in-the-loop' (HITL) approval in an agent harness?",
        answers: [
          "Replacing all AI logic with human reviewers",
          "Pausing execution for human permission",
          "Crowdsourcing model fine-tuning data",
          "Manual entry of prompt embeddings",
        ],
        correctIndex: 1,
        explanation:
          "HITL safety guardrails pause execution before high-risk actions (such as database writes or shell commands) to obtain human confirmation.",
      },
    ],
  },
  {
    examName: "Cloud Digital Leader",
    questions: [
      {
        question:
          "Which cloud computing service model offers the highest level of customization and control over the underlying infrastructure?",
        answers: [
          "SaaS (Software as a Service)",
          "PaaS (Platform as a Service)",
          "IaaS (Infrastructure as a Service)",
          "FaaS (Function as a Service)",
        ],
        correctIndex: 2,
        explanation:
          "Infrastructure as a Service (IaaS) provides virtualized computing resources, giving users maximum control over operating systems, storage, and networking.",
      },
      {
        question:
          "Which Google Cloud service is a fully managed, serverless database designed for document store workloads?",
        answers: ["Cloud SQL", "Firestore", "Cloud Spanner", "Cloud Bigtable"],
        correctIndex: 1,
        explanation:
          "Firestore is a flexible, scalable, serverless NoSQL document database for mobile, web, and server development.",
      },
      {
        question:
          "What is the primary benefit of deploying applications across multiple Google Cloud zones in a region?",
        answers: [
          "High availability",
          "Reduced latency",
          "Lower cost",
          "Global distribution",
        ],
        correctIndex: 0,
        explanation:
          "Deploying across multiple zones provides fault tolerance and high availability if a single zone experiences an outage.",
      },
      {
        question:
          "Which pricing model provides discounts on virtual machine instances in exchange for a commitment to use a minimum level of resources for 1 or 3 years?",
        answers: [
          "Spot VMs",
          "Committed Use Discounts (CUDs)",
          "Sustained Use Discounts (SUDs)",
          "On-demand pricing",
        ],
        correctIndex: 1,
        explanation:
          "Committed Use Discounts (CUDs) offer significant savings when you commit to a contract of 1 or 3 years.",
      },
      {
        question:
          "What Google Cloud service allows users to manage and enforce access control policies across all resources?",
        answers: [
          "Cloud Identity",
          "Identity and Access Management (IAM)",
          "Cloud Armor",
          "VPC Service Controls",
        ],
        correctIndex: 1,
        explanation:
          "IAM lets administrators authorize who can take action on specific resources, giving full control and visibility.",
      },
      {
        question:
          "Which of the following is a key advantage of utilizing serverless computing on Google Cloud?",
        answers: [
          "No code required",
          "Zero infrastructure management",
          "Fixed monthly cost",
          "Complete control over CPU hardware",
        ],
        correctIndex: 1,
        explanation:
          "Serverless computing abstracts away all infrastructure management, allowing developers to focus on writing code while the platform automatically scales.",
      },
      {
        question:
          "Which service provides a central repository for viewing and managing security posture, vulnerabilities, and threats?",
        answers: [
          "Cloud Logging",
          "Cloud Monitoring",
          "Security Command Center (SCC)",
          "Artifact Registry",
        ],
        correctIndex: 2,
        explanation:
          "Security Command Center (SCC) is Google Cloud's security and risk management platform for identifying vulnerabilities and threats.",
      },
      {
        question: "What does 'Elasticity' in cloud computing refer to?",
        answers: [
          "The speed of network data transfers",
          "Scaling resources up or down on demand",
          "The security level of virtual networks",
          "The recovery of deleted cloud resources",
        ],
        correctIndex: 1,
        explanation:
          "Elasticity is the ability of cloud systems to dynamically scale resources to match real-time workload demands.",
      },
      {
        question:
          "Which Google Cloud migration tool helps plan, track, and execute physical migrations of workloads to the cloud?",
        answers: [
          "Database Migration Service",
          "BigQuery Omni",
          "Google Cloud Migration Center",
          "Storage Transfer Service",
        ],
        correctIndex: 2,
        explanation:
          "Migration Center is a unified platform that helps assess, plan, and optimize your cloud migration journey.",
      },
      {
        question:
          "What is Google Cloud's globally distributed, horizontal-scaling SQL database with up to 99.999% availability?",
        answers: ["Cloud SQL", "Cloud Spanner", "Firestore", "BigQuery"],
        correctIndex: 1,
        explanation:
          "Cloud Spanner is a fully managed relational database with unlimited scale, strong consistency, and high availability.",
      },
    ],
  },
  {
    examName: "Associate Cloud Engineer",
    questions: [
      {
        question:
          "Which gcloud command-line component is used to view configuration properties for the active account?",
        answers: [
          "gcloud config list",
          "gcloud info config",
          "gcloud config show",
          "gcloud account list",
        ],
        correctIndex: 0,
        explanation:
          "Running 'gcloud config list' displays the properties of your active configuration, including active account and project.",
      },
      {
        question:
          "Which service is best suited for hosting a containerized application with automatic scaling to zero when there is no traffic?",
        answers: [
          "Compute Engine",
          "Cloud Functions",
          "Cloud Run",
          "App Engine Flexible",
        ],
        correctIndex: 2,
        explanation:
          "Cloud Run is a fully managed compute platform that automatically scales containerized applications up and down to zero.",
      },
      {
        question:
          "What IAM role should you assign to a developer who needs to view but not modify any resources within a project?",
        answers: [
          "roles/viewer",
          "roles/browser",
          "roles/editor",
          "roles/owner",
        ],
        correctIndex: 0,
        explanation:
          "The Viewer role (roles/viewer) provides read-only permissions to see resources but not alter their configurations.",
      },
      {
        question:
          "You want to run a batch processing job on Compute Engine that can be terminated at any time. Which type of VM should you use to minimize cost?",
        answers: [
          "Sole-tenant Node",
          "Spot VM",
          "Shielded VM",
          "Confidential VM",
        ],
        correctIndex: 1,
        explanation:
          "Spot VMs offer steep discounts (60-91%) compared to standard VMs, but Google can reclaim them with a 30-second notice.",
      },
      {
        question:
          "Which Cloud Storage class is most cost-effective for storing backups that are accessed less than once a year?",
        answers: ["Standard", "Nearline", "Coldline", "Archive"],
        correctIndex: 3,
        explanation:
          "Archive Storage is designed for data archiving, online backup, and disaster recovery, accessed less than once a year.",
      },
      {
        question:
          "What tool allows you to establish a secure, private, high-performance connection between your on-premises network and VPC without traversing the public internet?",
        answers: [
          "Cloud VPN",
          "Cloud Interconnect",
          "VPC Network Peering",
          "Cloud Router",
        ],
        correctIndex: 1,
        explanation:
          "Cloud Interconnect provides direct, low-latency, physical connections between your on-premises and Google Cloud networks.",
      },
      {
        question:
          "How can you ensure that a set of Compute Engine instances can communicate with each other using internal IP addresses across different VPC networks?",
        answers: [
          "Use VPC Network Peering",
          "Configure Cloud NAT",
          "Assign public IP addresses",
          "Use a Shared VPC",
        ],
        correctIndex: 0,
        explanation:
          "VPC Network Peering allows secure connection of two Virtual Private Cloud (VPC) networks so that resources can communicate privately.",
      },
      {
        question:
          "Which service allows you to capture and analyze real-time streaming data from IoT devices at scale?",
        answers: ["Pub/Sub", "BigQuery", "Cloud Storage", "Cloud Memorystore"],
        correctIndex: 0,
        explanation:
          "Pub/Sub is an asynchronous, scalable messaging service that ingests event streams and distributes them to processing pipelines.",
      },
      {
        question:
          "You need to automate the creation of a group of identical VM instances with load balancing. What should you configure?",
        answers: [
          "Managed Instance Group (MIG)",
          "Unmanaged Instance Group",
          "Sole-tenant node group",
          "Compute Engine cluster",
        ],
        correctIndex: 0,
        explanation:
          "A Managed Instance Group uses an instance template to automatically deploy, scale, and manage a group of identical VM instances.",
      },
      {
        question:
          "Which Google Cloud service acts as a distributed, scalable caching layer for application database queries?",
        answers: ["Cloud SQL", "Cloud Memorystore", "Firestore", "BigQuery"],
        correctIndex: 1,
        explanation:
          "Cloud Memorystore is a fully managed in-memory data store service for Redis and Memcached, ideal for low-latency caching.",
      },
    ],
  },
  {
    examName: "Professional Cloud Architect",
    questions: [
      {
        question:
          "Your organization requires high-volume database transactions with sub-millisecond response times globally. Which database should you choose?",
        answers: ["BigQuery", "Cloud Spanner", "Cloud SQL", "Cloud Bigtable"],
        correctIndex: 1,
        explanation:
          "Cloud Spanner provides high-throughput transactional database access with strict consistency and global replication.",
      },
      {
        question:
          "You are designing a disaster recovery strategy with a recovery time objective (RTO) of several hours and low cost. Which pattern should you select?",
        answers: [
          "Active-Active Warm Standby",
          "Cold Standby (Backup & Restore)",
          "Multi-Region Live Sync",
          "Active-Passive Pilot Light",
        ],
        correctIndex: 1,
        explanation:
          "A Cold Standby (Backup and Restore) approach has the lowest cost, but requires rebuilding resources, which takes hours (high RTO).",
      },
      {
        question:
          "Which network load balancer should you use for external, non-HTTP(S) traffic on TCP ports 80 and 443 where client IP preservation is required?",
        answers: [
          "Global External Application Load Balancer",
          "Regional External Network Load Balancer",
          "Global External Proxy Load Balancer",
          "Internal TCP/UDP Load Balancer",
        ],
        correctIndex: 1,
        explanation:
          "The Regional External Network Load Balancer is a pass-through layer-4 balancer that preserves client source IP addresses.",
      },
      {
        question:
          "To comply with regulatory standards, you must encrypt storage buckets using keys managed entirely outside of Google Cloud. Which option should you use?",
        answers: [
          "Google-owned default keys",
          "Customer-Managed Encryption Keys (CMEK)",
          "Customer-Supplied Encryption Keys (CSEK)",
          "External Key Manager (EKM) via Cloud KMS",
        ],
        correctIndex: 3,
        explanation:
          "External Key Manager (EKM) allows you to use keys stored in an external third-party key management partner to encrypt GCP data.",
      },
      {
        question:
          "Which compute service provides a fully managed serverless environment to run containers with automatic scaling?",
        answers: [
          "Compute Engine",
          "Cloud Run",
          "Bare Metal Solution",
          "Dedicated Interconnect",
        ],
        correctIndex: 1,
        explanation:
          "Cloud Run enables you to run stateless containers in a fully managed serverless environment with automatic scaling.",
      },
      {
        question:
          "You need to migrate a monolithic application to microservices with minimum downtime. What migration strategy is recommended?",
        answers: [
          "Big Bang migration",
          "Strangler Fig pattern",
          "Lift and Shift",
          "Rehosting",
        ],
        correctIndex: 1,
        explanation:
          "The Strangler Fig pattern migrates parts of a monolith incrementally to microservices until the monolith can be decommissioned.",
      },
      {
        question:
          "How should you design a secure, high-bandwidth hybrid network connection that requires encryption over the public internet?",
        answers: [
          "Dedicated Interconnect",
          "Partner Interconnect",
          "HA VPN over Cloud Interconnect",
          "Direct Peering",
        ],
        correctIndex: 2,
        explanation:
          "IPsec HA VPN over Cloud Interconnect provides both the high bandwidth of Interconnect and the security of IPsec encryption.",
      },
      {
        question:
          "To enforce fine-grained organizational policies across all folders and projects in your hierarchy, which tool is best suited?",
        answers: [
          "IAM Roles",
          "Resource Manager Org Policies",
          "VPC Service Controls",
          "Cloud Asset Inventory",
        ],
        correctIndex: 1,
        explanation:
          "Organization Policies provide centralized, programmatic control over your organization's cloud resources.",
      },
      {
        question:
          "Your API needs to distribute load globally across instances in multiple regions, while using a single external IP address. Which load balancer is required?",
        answers: [
          "Global External Application Load Balancer",
          "Regional External Network Load Balancer",
          "Internal Application Load Balancer",
          "Regional External Proxy Load Balancer",
        ],
        correctIndex: 0,
        explanation:
          "The Global External Application Load Balancer routes HTTP/S traffic globally using a single, global Anycast IP address.",
      },
      {
        question:
          "Which Google Cloud service provides isolated execution environments for running highly sensitive, confidential workloads with runtime encryption?",
        answers: [
          "Shielded VMs",
          "Confidential Computing VMs",
          "Cloud HSM",
          "Binary Authorization",
        ],
        correctIndex: 1,
        explanation:
          "Confidential VMs leverage hardware-based memory encryption to protect data in use/at runtime.",
      },
    ],
  },
  {
    examName: "Professional Data Engineer",
    questions: [
      {
        question:
          "You need to analyze petabytes of structured and semi-structured data with SQL queries at high speeds. Which service is best?",
        answers: ["BigQuery", "Cloud Bigtable", "Cloud Spanner", "Datastore"],
        correctIndex: 0,
        explanation:
          "BigQuery is a serverless, highly-scalable cloud data warehouse designed for fast analytics over petabytes of data.",
      },
      {
        question:
          "Which Apache Beam runner is utilized by Cloud Dataflow to run unified batch and streaming data processing pipelines?",
        answers: [
          "Direct Runner",
          "Flink Runner",
          "Spark Runner",
          "Dataflow Runner",
        ],
        correctIndex: 3,
        explanation:
          "Cloud Dataflow executes Apache Beam pipelines using the specialized, serverless Dataflow Runner.",
      },
      {
        question:
          "What database service is optimized for high-throughput, low-latency analytical and operational workloads on non-relational wide-column data?",
        answers: ["Cloud SQL", "Firestore", "Cloud Bigtable", "Cloud Spanner"],
        correctIndex: 2,
        explanation:
          "Cloud Bigtable is Google's NoSQL wide-column database, designed for large analytical and operational workloads.",
      },
      {
        question:
          "You want to automate the ingestion of continuous real-time data from Pub/Sub, transform it, and write to BigQuery. Which managed service is recommended?",
        answers: [
          "Cloud Composer",
          "Cloud Dataflow",
          "Cloud Dataproc",
          "Cloud Data Fusion",
        ],
        correctIndex: 1,
        explanation:
          "Cloud Dataflow is a serverless data processing engine ideal for building real-time stream processing pipelines.",
      },
      {
        question:
          "Which service should you use to migrate existing Apache Hadoop and Apache Spark clusters directly to Google Cloud without major code changes?",
        answers: [
          "Cloud Dataflow",
          "Cloud Dataproc",
          "Cloud Composer",
          "BigQuery Omni",
        ],
        correctIndex: 1,
        explanation:
          "Cloud Dataproc is a fully managed service for running Apache Spark and Apache Hadoop clusters on Google Cloud.",
      },
      {
        question:
          "What feature of BigQuery should you implement to reduce query costs and improve performance for queries filtering on a specific date column?",
        answers: [
          "Materialized Views",
          "Partitioning",
          "Search Indexes",
          "Row-level Security",
        ],
        correctIndex: 1,
        explanation:
          "Partitioning divides a large table into smaller segments based on a date or integer column, reducing scanned bytes and costs.",
      },
      {
        question:
          "Which service manages workflow orchestration, letting you build and schedule complex data pipelines with Apache Airflow?",
        answers: [
          "Cloud Composer",
          "Cloud Workflows",
          "Cloud Scheduler",
          "Cloud Functions",
        ],
        correctIndex: 0,
        explanation:
          "Cloud Composer is a managed workflow orchestration service built on Apache Airflow to coordinate multi-step pipelines.",
      },
      {
        question:
          "What ML tool is best for developers with limited machine learning expertise to build custom high-quality models using Google's transfer learning?",
        answers: [
          "Vertex AI Custom Training",
          "Vertex AI AutoML",
          "TensorFlow Enterprise",
          "BigQuery ML",
        ],
        correctIndex: 1,
        explanation:
          "Vertex AI AutoML enables users to train state-of-the-art models on image, tabular, text, or video data without writing ML code.",
      },
      {
        question:
          "How can you query data stored in external Google Cloud Storage buckets directly inside BigQuery without loading the data first?",
        answers: [
          "Use an External Table",
          "Use BigQuery Storage Write API",
          "Create a BigQuery View",
          "Use federated queries via Cloud SQL",
        ],
        correctIndex: 0,
        explanation:
          "External tables allow BigQuery to query data stored in GCS, Google Drive, or Bigtable directly using federated queries.",
      },
      {
        question:
          "What is the most effective way to continuously stream high-velocity event data into a BigQuery table with immediate query availability?",
        answers: [
          "Use BigQuery Load Jobs",
          "Use the Storage Write API",
          "Export GCS logs to BigQuery",
          "Use Datastream",
        ],
        correctIndex: 1,
        explanation:
          "The BigQuery Storage Write API supports high-performance streaming ingestion with immediate query accessibility.",
      },
    ],
  },
  {
    examName: "Professional Cloud Security Engineer",
    questions: [
      {
        question:
          "Which tool provides defense-in-depth security by defining a secure perimeter around VPC resources and preventing exfiltration?",
        answers: [
          "Cloud Armor",
          "VPC Service Controls",
          "Cloud Firewalls",
          "Cloud Identity-Aware Proxy",
        ],
        correctIndex: 1,
        explanation:
          "VPC Service Controls allows you to set up security perimeters to protect sensitive data and prevent unauthorized exfiltration.",
      },
      {
        question:
          "You need to secure a web application by restricting access only to users who meet specific device-security and identity criteria. What should you use?",
        answers: [
          "Cloud VPN",
          "VPC Network Peering",
          "Identity-Aware Proxy (IAP) with BeyondCorp",
          "Cloud Firewalls",
        ],
        correctIndex: 2,
        explanation:
          "IAP enables context-aware access control to applications, verifying user identity and device posture before granting access.",
      },
      {
        question:
          "Which service is a distributed denial-of-service (DDoS) defense and Web Application Firewall (WAF) for HTTP(S) load balanced workloads?",
        answers: [
          "Cloud IDS",
          "Cloud Armor",
          "Security Command Center",
          "VPC Service Controls",
        ],
        correctIndex: 1,
        explanation:
          "Cloud Armor provides enterprise-grade DDoS protection and WAF features to block web attacks like SQLi and XSS.",
      },
      {
        question:
          "To securely store and rotate application API keys, database credentials, and certificates, which service is recommended?",
        answers: ["Cloud KMS", "Secret Manager", "Cloud Storage", "Cloud HSM"],
        correctIndex: 1,
        explanation:
          "Secret Manager is a secure and convenient storage system for API keys, passwords, certificates, and other sensitive data.",
      },
      {
        question:
          "What Google Cloud feature allows you to audit all read and write operations performed on your cloud resources by administrators and users?",
        answers: [
          "Cloud Auditing",
          "Cloud Audit Logs",
          "Cloud Logging",
          "Cloud Access Transparency",
        ],
        correctIndex: 1,
        explanation:
          "Cloud Audit Logs record administrative actions, system events, and data access, providing critical trails for security audits.",
      },
      {
        question:
          "How can you ensure that only container images verified by a CI pipeline can be deployed to Cloud Run?",
        answers: [
          "Binary Authorization",
          "VPC Service Controls",
          "Artifact Registry Policies",
          "Container Analysis",
        ],
        correctIndex: 0,
        explanation:
          "Binary Authorization is a deploy-time security control that ensures only trusted, signed container images are deployed to Cloud Run.",
      },
      {
        question:
          "Which IAM role type should be avoided for general user accounts to follow the principle of least privilege?",
        answers: [
          "Predefined Roles",
          "Custom Roles",
          "Primitive Roles (Owner, Editor, Viewer)",
          "Service Account Roles",
        ],
        correctIndex: 2,
        explanation:
          "Primitive roles are extremely broad and grant sweeping permissions across all services. Predefined or custom roles are preferred.",
      },
      {
        question:
          "What service provides managed intrusion detection system (IDS) capabilities, inspecting network traffic for malicious signatures?",
        answers: [
          "Cloud Firewalls",
          "Cloud IDS",
          "Cloud Armor",
          "Packet Mirroring",
        ],
        correctIndex: 1,
        explanation:
          "Cloud IDS delivers industry-leading threat detection, inspecting cloud network traffic for malware, spyware, and exploits.",
      },
      {
        question:
          "You want to dynamically mask sensitive data like credit card numbers or Social Security numbers from a dataset. Which service is designed for this?",
        answers: [
          "Cloud KMS",
          "Sensitive Data Protection (Cloud DLP)",
          "Secret Manager",
          "BigQuery Masking",
        ],
        correctIndex: 1,
        explanation:
          "Google's Sensitive Data Protection service scans, classifies, and de-identifies/masks sensitive information automatically.",
      },
      {
        question:
          "To verify that Google employees access your resources only for valid business reasons (like support), which service should you enable?",
        answers: [
          "Access Approval",
          "Access Transparency",
          "Cloud Audit Logs",
          "IAM Policy Troubleshooter",
        ],
        correctIndex: 1,
        explanation:
          "Access Transparency provides near real-time logs of actions taken by Google administrators when accessing your content.",
      },
    ],
  },
  {
    examName: "AI Token Economics (FinOps)",
    questions: [
      {
        question: "What is the atomic accounting unit of AI consumption?",
        answers: [
          "GPU compute hour",
          "API seat license",
          "Token",
          "Vector database record",
        ],
        correctIndex: 2,
        explanation:
          "In AI token economics, a token is the fundamental atomic unit of computation and data over which models read, write, and reason, forming the basis of AI metering and cost attribution.",
      },
      {
        question: "What is a token in the context of Large Language Models?",
        answers: [
          "A cryptographic key used for API security",
          "A physical component within GPU hardware",
          "A text segment (word or subword) read by AI",
          "A fixed 1MB block of storage in a database",
        ],
        correctIndex: 2,
        explanation:
          "A token is a segment of text (such as a word, character, or subword fragment) that language models read and generate during processing.",
      },
      {
        question:
          "Why is token consumption non-linear with respect to user-facing activity?",
        answers: [
          "Token prices are fixed across all model sizes",
          "Context, reasoning, tools & retries compound",
          "Output tokens cheaper than input tokens",
          "Prompts are truncated by API gateways",
        ],
        correctIndex: 1,
        explanation:
          "Multiple compounding variables, including system prompt overhead, retrieved RAG context, model selection, reasoning traces, and multi-agent tool retries, cause token usage to expand non-linearly.",
      },
      {
        question:
          "What do we call token output that successfully meets a defined service-level objective, such as latency thresholds and speed rates?",
        answers: ["Goodput", "Throughput", "Maxput", "Yieldput"],
        correctIndex: 0,
        explanation:
          "Goodput measures token production that satisfies specified latency and speed criteria (time-to-first-token and sustained tokens-per-second), distinguishing usable economic output from raw volume.",
      },
      {
        question:
          "What major shift is occurring in enterprise AI procurement models as the initial subsidy phase ends?",
        answers: [
          "Unlimited flat-rate seat subscriptions",
          "Seat fees plus pre-committed metered tokens",
          "Mandatory shift to self-hosted GPUs",
          "Eliminating pay-as-you-go API billing",
        ],
        correctIndex: 1,
        explanation:
          "As enterprise usage outpaces unit-cost reductions, providers are moving away from unmetered subscription bundles toward seat fees paired with pre-committed token usage, mirroring cloud capacity forecasting.",
      },
      {
        question:
          "Which open-source specification standardizes cost and usage data across cloud and AI providers?",
        answers: [
          "OpenTelemetry",
          "FinOps Open Cost & Usage Spec (FOCUS)",
          "CUDA Benchmark Suite",
          "Hardware Performance Monitor Specification (HPMS)",
        ],
        correctIndex: 1,
        explanation:
          "The open-source FOCUS specification normalizes cost and consumption metrics across different providers, enabling multi-cloud reconciliation of token spend against underlying infrastructure.",
      },
      {
        question: "How does model routing optimize token usage?",
        answers: [
          "Routing all queries to the largest model",
          "Translating text queries into vector embeddings",
          "Routing simple tasks to smaller models first",
          "Compressing prompts into binary formats",
        ],
        correctIndex: 2,
        explanation:
          "Cascading and routing frameworks evaluate query complexity to send simpler tasks to cost-effective models, reserving expensive frontier models for difficult queries and saving up to 85%+ on token costs.",
      },
      {
        question:
          "Where can you go if you would like to get more information about Tokenomics without answering trivia questions?",
        answers: [
          "The latest Agent Factory Podcast episode",
          "Asking a wise carrier pigeon",
          "Reading tea leaves in your coffee",
          "Sending a fax directly to the cloud",
        ],
        correctIndex: 0,
        explanation:
          "Check out the latest Agent Factory Podcast for a deep dive into AI Tokenomics with J.R. Storment, the lead of the Tokenomics Foundation!",
      },
    ],
  },
];

export const getTopicSlug = (examName: string): string => {
  if (examName === "AI Token Economics (FinOps)") return "ai-token-economics";
  return examName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const findExamPresetBySlug = (
  slug?: string,
): ExamPreset | undefined => {
  if (!slug) return undefined;
  return GCP_EXAMS_PRESETS.find(
    (exam) =>
      getTopicSlug(exam.examName) === slug ||
      (slug === "ai-token-economics-finops" &&
        exam.examName === "AI Token Economics (FinOps)"),
  );
};
