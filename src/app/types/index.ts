export const PAGE_OPTIONS = ["home", "faq", "deploy", "not-found"] as const;
export type PageOption = (typeof PAGE_OPTIONS)[number];

export const VIBE_OPTIONS = ["standard", "professional", "fun"] as const;
export type VibeOption = (typeof VIBE_OPTIONS)[number];

export const COLOR_OPTIONS = ["light", "dark"] as const;
export type ColorOption = (typeof COLOR_OPTIONS)[number];

export const TENSE_OPTIONS = ["first-person", "third-person"] as const;
export type TenseOption = (typeof TENSE_OPTIONS)[number];

export const VERBOSITY_OPTIONS = ["short", "long"] as const;
export type VerbosityOption = "short" | "long";

export type Theme = {
  page: PageOption;
  vibe: VibeOption;
  color: ColorOption;
  tense: TenseOption;
  verbosity: VerbosityOption;
};

export type DeploymentStepsFunction = ({
  appName,
  projectId,
}: {
  appName: string;
  projectId: string;
}) => string[];

export type DeploymentSteps = {
  prerequisites: DeploymentStepsFunction;
  createApplication: DeploymentStepsFunction;
  runLocally: DeploymentStepsFunction;
  deployApplication: DeploymentStepsFunction;
};

export type FrameworkDetails = {
  name: string;
  defaultApplicationName: string;
  prerequisites: DeploymentStepsFunction;
  createApplication: DeploymentStepsFunction;
  runLocally: DeploymentStepsFunction;
  deployApplication: DeploymentStepsFunction;
  targets: Record<
    TargetOption,
    {
      defaultProjectId: string;
      sources: Record<SourceOption, DeploymentSteps & { errorMessage: string }>;
    }
  >;
};

export const SOURCE_OPTIONS = ["local", "github"] as const;
export type SourceOption = (typeof SOURCE_OPTIONS)[number];

export const SOURCE_DETAILS: Record<SourceOption, { name: string }> = {
  local: {
    name: "Local",
  },
  github: {
    name: "GitHub",
  },
};

export const TARGET_OPTIONS = ["cloud-run"] as const;
export type TargetOption = (typeof TARGET_OPTIONS)[number];

export const TARGET_DETAILS = {
  "cloud-run": {
    name: "Cloud Run",
    defaultProjectId: "${GOOGLE_CLOUD_PROJECT}",
    sources: {
      local: {
        errorMessage: '',
        prerequisites: ({
          appName,
          projectId,
        }: {
          appName: string;
          projectId: string;
        }) => [`curl https://sdk.cloud.google.com | bash`],
        createApplication: ({
          appName,
          projectId,
        }: {
          appName: string;
          projectId: string;
        }) => [],
        runLocally: ({
          appName,
          projectId,
        }: {
          appName: string;
          projectId: string;
        }) => [],
        deployApplication: ({
          appName,
          projectId,
        }: {
          appName: string;
          projectId: string;
        }) => [
          `gcloud run deploy ${appName} --allow-unauthenticated --region=us-central1 --source=. --project=${projectId}`,
        ],
      },
      github: {
        errorMessage: "Currently failing steps. Investigation underway. Proceed at your own risk.",
        prerequisites: ({
          appName,
          projectId,
        }: {
          appName: string;
          projectId: string;
        }) => [
          `curl -sS https://webi.sh/gh | sh`,
          `gh auth login`,
          `curl https://sdk.cloud.google.com | bash`,
        ],
        createApplication: ({
          appName,
          projectId,
        }: {
          appName: string;
          projectId: string;
        }) => [
          `gh repo create ${appName} --private --source . --push`,
          `gcloud services enable secretmanager.googleapis.com`,
          `PROJECT_NUMBER=$(gcloud projects describe ${projectId} --format="value(projectNumber)")`,
          `CLOUD_BUILD_SERVICE_AGENT="service-\${PROJECT_NUMBER}@gcp-sa-cloudbuild.iam.gserviceaccount.com"`,
          `gcloud projects add-iam-policy-binding ${projectId} --member="serviceAccount:\${CLOUD_BUILD_SERVICE_AGENT}" --role="roles/secretmanager.admin"`,
          // `gcloud builds connections create github connection-\${PROJECT_NUMBER} --region=us-central1`,
          // `# Click the link that is generated and click continue to accept`,
          `# Visit https://github.com/apps/google-cloud-build/installations/select_target and git the cloudBuildGitHubInstallationId`,
          `echo -n $(gh auth token) | gcloud secrets create secret-\${PROJECT_NUMBER} --data-file=-`,
          `gcloud secrets add-iam-policy-binding secret-\${PROJECT_NUMBER} --member="serviceAccount:\${CLOUD_BUILD_SERVICE_AGENT}" --role="roles/secretmanager.secretAccessor"`,
          // TODO: Use variable for cloudBuildGitHubInstallationId
          `gcloud builds connections create github connection-\${PROJECT_NUMBER} --authorizer-token-secret-version=projects/${projectId}/secrets/secret-\${PROJECT_NUMBER}/versions/1 --app-installation-id=\${cloudBuildGitHubInstallationId} --region=us-central1`,
          // TODO: Use variable for GITHUB_USERNAME
          `gcloud builds repositories create repository-\${PROJECT_NUMBER} --remote-uri=$(git remote -v | grep -oP 'https://github.com/\K\S+(?=\.git)' | tail -1) --connection=connection-\${PROJECT_NUMBER} --region=us-central1`,
          `gcloud builds triggers create github --repository=projects/${projectId}/locations/us-central1/connections/connection-\${PROJECT_NUMBER}/repositories/repository-\${PROJECT_NUMBER} --branch-pattern=main --region=us-central1`
        ],
        runLocally: ({
          appName,
          projectId,
        }: {
          appName: string;
          projectId: string;
        }) => [],
        deployApplication: ({
          appName,
          projectId,
        }: {
          appName: string;
          projectId: string;
        }) => [
          `git add .`,
          `git commit -m "initial commit"`,
          `git push`,
        ],
      },
    },
  },
};

export const FRAMEWORK_OPTIONS = ["angular-ssr", "nextjs", "nuxtjs"] as const;
export type FrameworkOption = (typeof FRAMEWORK_OPTIONS)[number];

// TODO: add framework details
export const FRAMEWORK_DETAILS: Record<FrameworkOption, FrameworkDetails> = {
  "angular-ssr": {
    name: "Angular SSR",
    defaultApplicationName: "angular-ssr-app",
    prerequisites: ({
      appName,
      projectId,
    }: {
      appName: string;
      projectId: string;
    }) => [`curl https://webi.sh/node@lts | sh`],
    createApplication: ({
      appName,
      projectId,
    }: {
      appName: string;
      projectId: string;
    }) => [`npx @angular/cli new ${appName} --ssr`, `cd ${appName}`],
    runLocally: ({
      appName,
      projectId,
    }: {
      appName: string;
      projectId: string;
    }) => ["npm start"],
    deployApplication: ({
      appName,
      projectId,
    }: {
      appName: string;
      projectId: string;
    }) => [],
    targets: {
      "cloud-run": TARGET_DETAILS["cloud-run"],
    },
  },
  nuxtjs: {
    name: "Nuxt.js",
    defaultApplicationName: "nuxtjs-app",
    prerequisites: ({
      appName,
      projectId,
    }: {
      appName: string;
      projectId: string;
    }) => [`curl https://webi.sh/node@lts | sh`],
    createApplication: ({
      appName,
      projectId,
    }: {
      appName: string;
      projectId: string;
    }) => [`npx nuxi@latest init ${appName}`, `cd ${appName}`],
    runLocally: ({
      appName,
      projectId,
    }: {
      appName: string;
      projectId: string;
    }) => ["npm run dev"],
    deployApplication: ({
      appName,
      projectId,
    }: {
      appName: string;
      projectId: string;
    }) => [],
    targets: {
      "cloud-run": TARGET_DETAILS["cloud-run"],
    },
  },
  nextjs: {
    name: "Next.js",
    defaultApplicationName: "nextjs-app",
    prerequisites: ({
      appName,
      projectId,
    }: {
      appName: string;
      projectId: string;
    }) => [`curl https://webi.sh/node@lts | sh`],
    createApplication: ({
      appName,
      projectId,
    }: {
      appName: string;
      projectId: string;
    }) => [`npx create-next-app@latest ${appName}`, `cd ${appName}`],
    runLocally: ({
      appName,
      projectId,
    }: {
      appName: string;
      projectId: string;
    }) => ["npm run dev"],
    deployApplication: ({
      appName,
      projectId,
    }: {
      appName: string;
      projectId: string;
    }) => [],
    targets: {
      "cloud-run": TARGET_DETAILS["cloud-run"],
    },
  },
} as const;

export type DeploymentConfiguration = {
  framework: FrameworkOption;
  target: TargetOption;
  source: SourceOption;
};
