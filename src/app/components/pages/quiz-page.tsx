"use client";

import { useState, useEffect } from "react";
import { DeploymentConfiguration, Theme } from "../../types";
import colorValues from "../../utils/color-values";
import Footer from "../footer";
import Navbar from "../navbar";

interface QuizQuestion {
  question: string;
  answers: string[];
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
        answers: ["The speed of network data transfers", "The ability to scale resources up or down on demand", "The security level of virtual networks", "The recovery of deleted cloud resources"],
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
        answers: ["Cloud KMS", "Sensitive Data Protection (formerly Cloud DLP)", "Secret Manager", "BigQuery Masking"],
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
  }
];

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
  const [ambientAnimation, setAmbientAnimation] = useState<"none" | "pulse" | "float" | "glow">("none");
  const [transitionTime, setTransitionTime] = useState<number>(1.0);
  const [hidePanels, setHidePanels] = useState<boolean>(false);

  // Player phase state:
  // "edit" | 0 (Question) | 1 (A highlight) | 2 (B highlight) | 3 (C highlight) | 4 (D highlight) | 5 (Explanation)
  const [phase, setPhase] = useState<"edit" | 0 | 1 | 2 | 3 | 4 | 5>("edit");

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
    if (phase === 5) {
      setPhase(0);
    } else {
      setPhase((prev) => (prev as number) + 1 as any);
    }
  };

  const retreatPhase = () => {
    if (phase === "edit") return;
    if (phase === 0) {
      setPhase(5);
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

  // Get Custom Styled Gradients & Appearance
  const getPlayerThemeClasses = () => {
    switch (colorTheme) {
      case "Firebase":
        return "bg-gradient-to-br from-[#DD2C00] via-[#FF6D00] to-[#FFD600] text-white";
      case "Flutter/Dart":
        return "bg-gradient-to-br from-[#02569B] via-[#0175C2] to-[#13B9FD] text-white";
      case "Go":
        return "bg-gradient-to-br from-[#00ADD8] via-[#5DC9E2] to-[#0096b7] text-white";
      case "Google Cloud":
      default:
        // Beautiful Google Cloud Gradient utilizing its 4 signature colors (Blue, Green, Yellow, and Red)
        return "bg-[linear-gradient(135deg,#4285F4_0%,#34A853_33%,#FBBC05_66%,#EA4335_100%)] text-white";
    }
  };

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

  const getSpinningGradient = () => {
    switch (colorTheme) {
      case "Firebase":
        return "conic-gradient(from 0deg, #DD2C00, #FF6D00, #FFD600, #DD2C00)";
      case "Flutter/Dart":
        return "conic-gradient(from 0deg, #02569B, #0175C2, #13B9FD, #02569B)";
      case "Go":
        return "conic-gradient(from 0deg, #00ADD8, #5DC9E2, #0096b7, #00ADD8)";
      case "Google Cloud":
      default:
        return "conic-gradient(from 0deg, #4285F4, #34A853, #FBBC05, #EA4335, #4285F4)";
    }
  };

  const renderViewport = (ratio: "9:16" | "16:9" | "1:1") => {
    const isWidescreen = ratio === "16:9";

    // Dynamic classes based on 16:9 or others
    const questionTextClass = isWidescreen
      ? "text-lg md:text-xl lg:text-2xl font-black text-center text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] leading-snug"
      : "text-2xl md:text-3xl lg:text-4xl font-black text-center text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.85)] leading-snug";

    const questionTextSmallClass = isWidescreen
      ? "text-sm md:text-base lg:text-lg font-extrabold text-center text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-normal line-clamp-3"
      : "text-lg md:text-xl lg:text-2xl font-extrabold text-center text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-normal line-clamp-4";

    const answerPaddingClass = isWidescreen
      ? "p-2 px-3 lg:p-2.5 lg:px-4"
      : "p-4 lg:p-5";

    const answerTextClass = isWidescreen
      ? "text-xs md:text-sm leading-tight break-words"
      : "text-sm md:text-base lg:text-lg leading-snug break-words";

    const badgeSizeClass = isWidescreen
      ? "w-7 h-7 text-xs font-black shrink-0"
      : "w-9 h-9 text-sm lg:text-base font-black shrink-0";

    const explanationTextClass = isWidescreen
      ? "text-xs md:text-sm leading-normal font-medium drop-shadow-sm"
      : "text-sm md:text-base lg:text-lg leading-relaxed font-medium drop-shadow-sm";

    // Ambient class helper
    const getAmbientClass = (isActiveElement: boolean) => {
      if (ambientAnimation === "none" || !isActiveElement) return "";
      switch (ambientAnimation) {
        case "pulse":
          return "ambient-pulse";
        case "float":
          return "ambient-float";
        case "glow":
          return "ambient-glow";
        default:
          return "";
      }
    };

    return (
      <div
        onClick={advancePhase}
        className={`relative select-none cursor-pointer border border-white/10 rounded-none overflow-hidden shadow-2xl flex flex-col justify-between p-6 md:p-8 ${getPlayerThemeClasses()} ${getAspectClasses(ratio)}`}
        style={{
          transition: `all ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        {/* Style block for local animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes spin-gradient {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes float-anim {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          @keyframes pulse-anim {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          @keyframes glow-anim {
            0%, 100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); border-color: rgba(255,255,255,0.4); }
            50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.6); border-color: rgba(255,255,255,0.9); }
          }
          .animate-spin-gradient {
            animation: spin-gradient var(--spin-duration, 2s) linear infinite;
          }
          .ambient-float {
            animation: float-anim 3s ease-in-out infinite;
          }
          .ambient-pulse {
            animation: pulse-anim 2s ease-in-out infinite;
          }
          .ambient-glow {
            animation: glow-anim 2.5s ease-in-out infinite;
          }
        `}} />

        {/* View 1: Question Only (Phase 0) */}
        {phase === 0 && (
          <div className="flex-1 flex flex-col justify-center items-center py-8 px-4 animate-fade-in">
            <h2 className={`${questionTextClass} ${getAmbientClass(true)}`}>
              {questionData.question}
            </h2>
          </div>
        )}

        {/* Views 2, 3, 4, 5, 6: Question + Options (Phase 1 to 5) */}
        {phase !== "edit" && phase >= 1 && (
          <div className="flex-1 flex flex-col justify-center space-y-4 md:space-y-6 py-2 h-full overflow-hidden">

            {/* Question Text (Collapses/Fades in Phase 5) */}
            <div
              style={{
                maxHeight: phase === 5 ? "0px" : "150px",
                opacity: phase === 5 ? 0 : 1,
                marginBottom: phase === 5 ? "0px" : isWidescreen ? "8px" : "16px",
                overflow: "hidden",
                transition: `all ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1)`,
              }}
            >
              <h3 className={questionTextSmallClass}>
                {questionData.question}
              </h3>
            </div>

            {/* Answers & Explanation Stack */}
            <div className="flex-1 flex flex-col justify-center space-y-2 md:space-y-3 overflow-hidden">
              {questionData.answers.map((ans, i) => {
                const isHighlighted = (phase - 1) === i;
                const isCorrect = questionData.correctIndex === i;

                // Determine layout visibility/sizing in Phase 5
                const isVisibleInPhase5 = isCorrect;

                let opacity = 1;
                let maxHeight = "120px";
                let marginBot = "0px";
                let pointerEvents: "auto" | "none" = "auto";

                if (phase === 5) {
                  if (isVisibleInPhase5) {
                    opacity = 1;
                    maxHeight = "120px";
                    marginBot = "12px";
                    pointerEvents = "auto";
                  } else {
                    opacity = 0;
                    maxHeight = "0px";
                    marginBot = "0px";
                    pointerEvents = "none";
                  }
                }

                const showSpinningBorder = phase === 5 && isCorrect && ambientAnimation !== "none";

                return (
                  <div
                    key={i}
                    style={{
                      opacity,
                      maxHeight,
                      marginBottom: marginBot,
                      pointerEvents,
                      transition: `all ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1)`,
                    }}
                    className={`overflow-hidden rounded-none ${showSpinningBorder ? "p-[3px] relative" : "border"}`}
                  >
                    {showSpinningBorder && (
                      <div
                        className="absolute inset-[-50%] animate-spin-gradient"
                        style={{
                          background: getSpinningGradient(),
                          animationDuration: `${transitionTime * 2}s`,
                        }}
                      />
                    )}

                    <div
                      className={`relative z-10 rounded-none text-white font-bold text-left flex items-center gap-4 w-full h-full ${answerPaddingClass} ${
                        showSpinningBorder
                          ? "bg-black/90 border-0"
                          : isHighlighted
                          ? `bg-white/25 border-white/80 scale-[1.02] shadow-[0_0_15px_rgba(255,255,255,0.2)] ${getAmbientClass(true)}`
                          : "bg-white/5 border-white/10 opacity-50"
                      }`}
                      style={{
                        transition: `all ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1)`,
                      }}
                    >
                      <span className={`rounded-none border flex items-center justify-center transition-colors duration-300 ${badgeSizeClass} ${
                        showSpinningBorder
                          ? "bg-emerald-500 text-white border-emerald-400"
                          : isHighlighted
                          ? "bg-white text-black border-white"
                          : "bg-white/10 border-white/20 text-white"
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className={answerTextClass}>
                        {ans}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Explanation Container (Slides Up in Phase 5) */}
              <div
                style={{
                  maxHeight: phase === 5 ? (isWidescreen ? "150px" : "320px") : "0px",
                  opacity: phase === 5 ? 1 : 0,
                  marginTop: phase === 5 ? "12px" : "0px",
                  overflow: "hidden",
                  transition: `all ${transitionTime}s cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                <div className="text-center text-white px-4 py-3 md:py-4 bg-black/35 border border-white/10 rounded-none flex flex-col justify-center h-full shadow-inner overflow-y-auto max-h-[140px] md:max-h-[300px]">
                  <span className="text-[10px] md:text-xs font-bold text-white/40 tracking-widest block mb-1 uppercase">
                    Explanation
                  </span>
                  <p className={explanationTextClass}>
                    {questionData.explanation}
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}
      </div>
    );
  };

  // Input styling based on theme
  const inputThemeClass = theme.color === "dark"
    ? "bg-gray-950 text-white border-gray-800 focus:ring-amber-500 placeholder-gray-500"
    : "bg-white text-black border-gray-200 focus:ring-orange-500 placeholder-gray-400";

  return (
    <div className={`w-full min-h-screen ${textColorClass} pb-12`}>
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
      <div className="mx-auto w-full max-w-[1700px] px-4 mt-6">
        <div className={`grid grid-cols-1 ${hidePanels ? "" : "xl:grid-cols-12"} gap-6 items-start`}>

          {/* LEFT PANEL: Nested GCP Presets (Static List, No Accordion) */}
          {!hidePanels && (
            <div className={`xl:col-span-3 rounded-2xl p-4 shadow-xl ${textBackgroundColorClass} border border-gray-200/10 max-h-[85vh] overflow-y-auto`}>
              <h2 className="text-lg font-extrabold mb-4 pb-2 border-b border-gray-200/10 flex items-center justify-between">
                <span>GCP Certifications</span>
                <span className="text-xs font-normal opacity-60">50 Questions</span>
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
                                  ? "bg-amber-500/20 text-amber-400 font-bold border-l-2 border-amber-500 pl-1.5"
                                  : "text-gray-400 hover:text-white hover:bg-white/5"
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
          <div className={hidePanels ? "w-full" : "xl:col-span-9"}>
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
                      className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition shadow cursor-pointer"
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
              <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center">

                {/* 1. Large Centered Interactive Quiz Viewport */}
                <div className="flex-1 flex flex-wrap gap-8 justify-center items-center">
                  {aspectRatio === "Both" ? (
                    <>
                      {/* 9:16 Preview */}
                      <div className="flex flex-col items-center">
                        {!hidePanels && (
                          <span className="text-xs font-bold opacity-60 mb-2 uppercase tracking-widest">9:16 Viewport</span>
                        )}
                        {renderViewport("9:16")}
                      </div>

                      {/* 16:9 Preview */}
                      <div className="flex flex-col items-center">
                        {!hidePanels && (
                          <span className="text-xs font-bold opacity-60 mb-2 uppercase tracking-widest">16:9 Viewport</span>
                        )}
                        {renderViewport("16:9")}
                      </div>
                    </>
                  ) : (
                    renderViewport(aspectRatio as any)
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
                      Step Navigation ({phase === 5 ? "6" : phase + 1}/6)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={retreatPhase}
                        className="py-2 px-3 bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-bold rounded-lg transition text-center"
                      >
                        ◀ Previous
                      </button>
                      <button
                        onClick={advancePhase}
                        className="py-2 px-3 bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-bold rounded-lg transition text-center"
                      >
                        Next ▶
                      </button>
                    </div>
                    <div className="grid grid-cols-6 gap-1 mt-1">
                      {[0, 1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => setPhase(num as any)}
                          className={`py-1 text-xs font-black rounded transition ${
                            phase === num
                              ? "bg-amber-500 text-white"
                              : "bg-white/5 hover:bg-white/15 border border-white/10 text-gray-400"
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
                      Attention Animation
                    </label>
                    <div className="grid grid-cols-4 gap-1">
                      {(["none", "pulse", "float", "glow"] as const).map((anim) => (
                        <button
                          key={anim}
                          onClick={() => setAmbientAnimation(anim)}
                          className={`py-1 px-1 rounded-lg text-[10px] font-bold border transition text-center capitalize ${
                            ambientAnimation === anim
                              ? "bg-amber-500 text-white border-amber-600"
                              : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-400"
                          }`}
                        >
                          {anim}
                        </button>
                      ))}
                    </div>
                  </div>

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
                              : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-400"
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
                              : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-400"
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
                      className="w-full py-2 px-4 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold border border-white/10 transition text-center"
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
