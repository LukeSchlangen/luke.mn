import { Schema } from "effect";

export const PageOptionSchema = Schema.Union(
  Schema.Literal("home"),
  Schema.Literal("faq"),
  Schema.Literal("deploy"),
  Schema.Literal("short"),
  Schema.Literal("not-found"),
  Schema.Literal("qr"),
  Schema.Literal("quiz"),
);
export type PageOption = Schema.Schema.Type<typeof PageOptionSchema>;

export const PAGE_OPTIONS = [
  "home",
  "faq",
  "deploy",
  "short",
  "not-found",
  "qr",
  "quiz",
] as const;

export const VibeOptionSchema = Schema.Union(
  Schema.Literal("standard"),
  Schema.Literal("professional"),
  Schema.Literal("fun"),
);
export type VibeOption = Schema.Schema.Type<typeof VibeOptionSchema>;

export const VIBE_OPTIONS = ["standard", "professional", "fun"] as const;

export const ColorOptionSchema = Schema.Union(
  Schema.Literal("light"),
  Schema.Literal("dark"),
);
export type ColorOption = Schema.Schema.Type<typeof ColorOptionSchema>;

export const COLOR_OPTIONS = ["light", "dark"] as const;

export const TenseOptionSchema = Schema.Union(
  Schema.Literal("first-person"),
  Schema.Literal("third-person"),
);
export type TenseOption = Schema.Schema.Type<typeof TenseOptionSchema>;

export const TENSE_OPTIONS = ["first-person", "third-person"] as const;

export const VerbosityOptionSchema = Schema.Union(
  Schema.Literal("short"),
  Schema.Literal("medium"),
  Schema.Literal("long"),
);
export type VerbosityOption = Schema.Schema.Type<typeof VerbosityOptionSchema>;

export const VERBOSITY_OPTIONS = ["short", "medium", "long"] as const;

export const ThemeSchema = Schema.Struct({
  page: PageOptionSchema,
  vibe: VibeOptionSchema,
  color: ColorOptionSchema,
  tense: TenseOptionSchema,
  verbosity: VerbosityOptionSchema,
});
export type Theme = Schema.Schema.Type<typeof ThemeSchema>;

export type StepsFunction = ({ appName }: { appName: string }) => string[];

const emptySteps: StepsFunction = () => [];

const nodePrerequisite: StepsFunction = () => [
  `curl https://webi.sh/node@lts | sh`,
];

const npmRunDevSteps: StepsFunction = () => [`npm run dev`];

export type DeploymentSteps = {
  prerequisites: StepsFunction;
  createApplication: StepsFunction;
  runLocally: StepsFunction;
  deployApplication: StepsFunction;
};

export type FrameworkDetails = {
  name: string;
  defaultApplicationName: string;
  prerequisites: StepsFunction;
  createApplication: StepsFunction;
  runLocally: StepsFunction;
  deployApplication: StepsFunction;
  targets: Record<
    TargetOption,
    {
      defaultProjectId: string;
      sources: Record<
        SourceOption,
        DeploymentSteps & {
          errorMessage: ({
            framework,
          }: {
            framework: FrameworkOption;
          }) => string;
        }
      >;
    }
  >;
};

export const SourceOptionSchema = Schema.Union(
  Schema.Literal("local"),
  Schema.Literal("github"),
);
export type SourceOption = Schema.Schema.Type<typeof SourceOptionSchema>;

export const SOURCE_OPTIONS = ["local", "github"] as const;

export const SOURCE_DETAILS: Record<SourceOption, { name: string }> = {
  local: {
    name: "Local",
  },
  github: {
    name: "GitHub",
  },
};

export const TargetOptionSchema = Schema.Union(
  Schema.Literal("cloud-run"),
  Schema.Literal("vercel"),
);
export type TargetOption = Schema.Schema.Type<typeof TargetOptionSchema>;

export const TARGET_OPTIONS = ["cloud-run", "vercel"] as const;

export const TARGET_DETAILS = {
  "cloud-run": {
    name: "Cloud Run",
    defaultProjectId: "${GOOGLE_CLOUD_PROJECT}",
    sources: {
      local: {
        errorMessage: () => "",
        prerequisites: () => [`curl https://sdk.cloud.google.com | bash`],
        createApplication: emptySteps,
        runLocally: emptySteps,
        deployApplication: ({ appName }: { appName: string }) => [
          `gcloud run deploy ${appName} --allow-unauthenticated --region=us-central1 --source=.`,
        ],
      },
      github: {
        errorMessage: () => "Not implemented yet",
        prerequisites: () => [
          `curl -sS https://webi.sh/gh | sh`,
          `gh auth login`,
          `curl https://sdk.cloud.google.com | bash`,
        ],
        createApplication: ({ appName }: { appName: string }) => {
          const projectId = "${GOOGLE_CLOUD_PROJECT}";
          return [
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
            `gcloud builds connections create github connection-\${PROJECT_NUMBER} --authorizer-token-secret-version=projects/${projectId}/secrets/secret-\${PROJECT_NUMBER}/versions/1 --app-installation-id=\${cloudBuildGitHubInstallationId} --region=us-central1`,
            `gcloud builds repositories create repository-\${PROJECT_NUMBER} --remote-uri=$(git remote -v | grep -oP 'https://github.com/\K\S+(?=\.git)' | tail -1) --connection=connection-\${PROJECT_NUMBER} --region=us-central1`,
            `gcloud builds triggers create github --repository=projects/${projectId}/locations/us-central1/connections/connection-\${PROJECT_NUMBER}/repositories/repository-\${PROJECT_NUMBER} --branch-pattern=main --region=us-central1`,
          ];
        },
        runLocally: emptySteps,
        deployApplication: emptySteps,
      },
    },
  },
  vercel: {
    name: "Vercel",
    defaultProjectId: "${VERCEL_PROJECT}",
    sources: {
      local: {
        errorMessage: ({ framework }: { framework: FrameworkOption }) =>
          framework === "marko"
            ? `Not implemented yet for ${FRAMEWORK_DETAILS[framework].name}`
            : "",
        prerequisites: () => [`npm i -g vercel`],
        createApplication: emptySteps,
        runLocally: emptySteps,
        deployApplication: () => [`vercel`],
      },
      github: {
        errorMessage: () => "Not implemented yet",
        prerequisites: emptySteps,
        createApplication: emptySteps,
        runLocally: emptySteps,
        deployApplication: emptySteps,
      },
    },
  },
};

export const FrameworkOptionSchema = Schema.Union(
  Schema.Literal("angular-ssr"),
  Schema.Literal("nextjs"),
  Schema.Literal("nuxtjs"),
  Schema.Literal("remix"),
  Schema.Literal("sveltekit"),
  Schema.Literal("solidstart"),
  Schema.Literal("marko"),
);
export type FrameworkOption = Schema.Schema.Type<typeof FrameworkOptionSchema>;

export const FRAMEWORK_OPTIONS = [
  "angular-ssr",
  "nextjs",
  "nuxtjs",
  "remix",
  "sveltekit",
  "solidstart",
  "marko",
] as const;

export const FRAMEWORK_DETAILS: Record<FrameworkOption, FrameworkDetails> = {
  "angular-ssr": {
    name: "Angular SSR",
    defaultApplicationName: "angular-ssr-app",
    prerequisites: nodePrerequisite,
    createApplication: ({ appName }: { appName: string }) => [
      `npx @angular/cli new ${appName} --ssr`,
      `cd ${appName}`,
    ],
    runLocally: () => ["npm start"],
    deployApplication: emptySteps,
    targets: TARGET_DETAILS,
  },
  nuxtjs: {
    name: "Nuxt.js",
    defaultApplicationName: "nuxtjs-app",
    prerequisites: nodePrerequisite,
    createApplication: ({ appName }: { appName: string }) => [
      `npx nuxi@latest init ${appName}`,
      `cd ${appName}`,
    ],
    runLocally: npmRunDevSteps,
    deployApplication: emptySteps,
    targets: TARGET_DETAILS,
  },
  nextjs: {
    name: "Next.js",
    defaultApplicationName: "nextjs-app",
    prerequisites: nodePrerequisite,
    createApplication: ({ appName }: { appName: string }) => [
      `npx create-next-app@latest ${appName}`,
      `cd ${appName}`,
    ],
    runLocally: npmRunDevSteps,
    deployApplication: emptySteps,
    targets: TARGET_DETAILS,
  },
  remix: {
    name: "Remix",
    defaultApplicationName: "remix-app",
    prerequisites: nodePrerequisite,
    createApplication: ({ appName }: { appName: string }) => [
      `npx create-remix@latest ${appName}`,
      `cd ${appName}`,
    ],
    runLocally: npmRunDevSteps,
    deployApplication: emptySteps,
    targets: TARGET_DETAILS,
  },
  sveltekit: {
    name: "SvelteKit",
    defaultApplicationName: "sveltekit-app",
    prerequisites: nodePrerequisite,
    createApplication: ({ appName }: { appName: string }) => [
      `npm create svelte@latest ${appName}`,
      `cd ${appName}`,
    ],
    runLocally: npmRunDevSteps,
    deployApplication: emptySteps,
    targets: TARGET_DETAILS,
  },
  solidstart: {
    name: "SolidStart",
    defaultApplicationName: "solidstart-app",
    prerequisites: nodePrerequisite,
    createApplication: ({ appName }: { appName: string }) => [
      `npm init solid@latest ${appName}`,
      `cd ${appName}`,
    ],
    runLocally: npmRunDevSteps,
    deployApplication: emptySteps,
    targets: TARGET_DETAILS,
  },
  marko: {
    name: "Marko",
    defaultApplicationName: "marko-app",
    prerequisites: nodePrerequisite,
    createApplication: ({ appName }: { appName: string }) => [
      `npx @marko/create ${appName} --template webpack-express`,
      `cd ${appName}`,
    ],
    runLocally: npmRunDevSteps,
    deployApplication: emptySteps,
    targets: TARGET_DETAILS,
  },
} as const;

export const DeploymentConfigurationSchema = Schema.Struct({
  framework: FrameworkOptionSchema,
  target: TargetOptionSchema,
  source: SourceOptionSchema,
});
export type DeploymentConfiguration = Schema.Schema.Type<
  typeof DeploymentConfigurationSchema
>;
