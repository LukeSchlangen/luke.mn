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

// TODO: add framework details
export const FRAMEWORK_DETAILS = {
  "angular-ssr": {
    name: "Angular SSR",
    description: "Angular SSR",
    defaultApplicationName: "angular-ssr-app",
    prerequisites: ({ appName }: { appName: string }) => [
      `curl https://webi.sh/node@lts | sh`,
    ],
    createApplication: ({ appName }: { appName: string }) => [
      `npx @angular/cli new ${appName} --ssr`,
      `cd ${appName}`,
    ],
    runLocally: ({ appName }: { appName: string }) => ["npm start"],
    deployApplication: ({ appName }: { appName: string }) => [],
    supportedDeploymentTargets: {
      "cloud-run": {
        prerequisites: ({ appName }: { appName: string }) => [
          `curl https://sdk.cloud.google.com | bash`,
        ],
        createApplication: ({ appName }: { appName: string }) => [],
        runLocally: ({ appName }: { appName: string }) => [],
        deployApplication: ({ appName }: { appName: string }) => [],
        supportedSourceOptions: {
          local: {
            prerequisites: ({ appName }: { appName: string }) => [],
            createApplication: ({ appName }: { appName: string }) => [],
            runLocally: ({ appName }: { appName: string }) => [],
            deployApplication: ({ appName }: { appName: string }) => [
              `gcloud run deploy ${appName} --allow-unauthenticated --region=us-central1 --source=.`,
            ],
          },
        },
      },
    },
  },
  "nextjs": {
    name: "Next.js",
    description: "Next.js",
    defaultApplicationName: "nextjs-app",
    prerequisites: ({ appName }: { appName: string }) => [
      `curl https://webi.sh/node@lts | sh`,
    ],
    createApplication: ({ appName }: { appName: string }) => [
      `npx create-next-app@latest ${appName}`,
      `cd ${appName}`,
    ],
    runLocally: ({ appName }: { appName: string }) => ["npm run dev"],
    deployApplication: ({ appName }: { appName: string }) => [],
    supportedDeploymentTargets: {
      "cloud-run": {
        prerequisites: ({ appName }: { appName: string }) => [
          `curl https://sdk.cloud.google.com | bash`,
        ],
        createApplication: ({ appName }: { appName: string }) => [],
        runLocally: ({ appName }: { appName: string }) => [],
        deployApplication: ({ appName }: { appName: string }) => [],
        supportedSourceOptions: {
          local: {
            prerequisites: ({ appName }: { appName: string }) => [],
            createApplication: ({ appName }: { appName: string }) => [],
            runLocally: ({ appName }: { appName: string }) => [],
            deployApplication: ({ appName }: { appName: string }) => [
              `gcloud run deploy ${appName} --allow-unauthenticated --region=us-central1 --source=.`,
            ],
          },
        },
      },
    },
  },
} as const;

export type FrameworkOption = keyof typeof FRAMEWORK_DETAILS;
export const FRAMEWORK_OPTIONS = Object.keys(
  FRAMEWORK_DETAILS,
) as FrameworkOption[];

export const TARGET_OPTIONS = ["cloud-run"] as const;
export type TargetOption = (typeof TARGET_OPTIONS)[number];

export const SOURCE_OPTIONS = ["local"] as const;
export type SourceOption = (typeof SOURCE_OPTIONS)[number];

export type DeploymentConfiguration = {
  framework: FrameworkOption;
  target: TargetOption;
  source: SourceOption;
};
