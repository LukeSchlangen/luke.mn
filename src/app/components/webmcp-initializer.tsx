"use client";

import { useEffect } from "react";
import "@mcp-b/global";
import { useRouter } from "next/navigation";
import pathBuilder from "../utils/path-builder";
import {
  PAGE_OPTIONS,
  VIBE_OPTIONS,
  COLOR_OPTIONS,
  TENSE_OPTIONS,
  VERBOSITY_OPTIONS,
  FRAMEWORK_OPTIONS,
  TARGET_OPTIONS,
  SOURCE_OPTIONS,
  FRAMEWORK_DETAILS,
  Theme,
  DeploymentConfiguration,
  TenseOption,
  VerbosityOption,
  PageOption,
  VibeOption,
  ColorOption,
  FrameworkOption,
  TargetOption,
  SourceOption,
} from "../types";

export default function WebMcpInitializer() {
  const router = useRouter();

  useEffect(() => {
    const mc = (navigator as any).modelContext;
    if (!mc) return;

    mc.registerTool({
      name: "get_bio",
      description: "Returns Luke Schlangen's bio in a specific tense and verbosity.",
      inputSchema: {
        type: "object",
        properties: {
          tense: {
            type: "string",
            enum: TENSE_OPTIONS,
            description: "The grammatical tense (first-person or third-person)",
          },
          verbosity: {
            type: "string",
            enum: VERBOSITY_OPTIONS,
            description: "The length of the bio (short, medium, or long)",
          },
        },
        required: ["tense", "verbosity"],
      },
      execute: async (args: { tense: TenseOption; verbosity: VerbosityOption }) => {
        const { tense, verbosity } = args;
        const isFirstPerson = tense === "first-person";

        const devAdvocate = "developer advocate at Google";
        const coFounder = "co-founder of Code Championship: a competitive computer coding program for 3rd to 9th grade students";
        const learningBelief = "learning follows excitement";
        const techStack = "Firebase, Google Cloud Run, and Google Kubernetes Engine";

        if (verbosity === "short") {
          return {
            content: [
              {
                type: "text",
                text: `${isFirstPerson ? "I am a " : "Luke is a "}${devAdvocate}.\n${isFirstPerson ? "I am a " : "He is a "}${coFounder}.\n${isFirstPerson ? "I believe " : "He believes "}${learningBelief}.`,
              },
            ],
          };
        }

        if (verbosity === "medium") {
          return {
            content: [
              {
                type: "text",
                text: `${isFirstPerson ? "I am a " : "Luke is a "}${devAdvocate} who believes ${learningBelief}. ${isFirstPerson ? "I like " : "He likes "}giving approachable talks for beginners, because everyone is a beginner at something.\n\n${isFirstPerson ? "I " : "He "}previously taught at a coding bootcamp. After that, ${isFirstPerson ? "I " : "He "}led an onboarding program for new software engineers at a Fortune 500 company. Now at Google, ${isFirstPerson ? "I like to " : "he likes to "}help developers deploy their applications to places like ${techStack}.\n\nOutside of ${isFirstPerson ? "my " : "his "}work at Google, ${isFirstPerson ? "I am a " : "he is a "}${coFounder}.`,
              },
            ],
          };
        }

        // Long bio
        return {
          content: [
            {
              type: "text",
              text: `${isFirstPerson ? "I am a " : "Luke is a "}${devAdvocate} who believes ${learningBelief}. ${isFirstPerson ? "I like " : "He likes "}giving approachable talks for beginners, because everyone is a beginner at something.\n\n${isFirstPerson ? "I am " : "He is "}working on making it easier to deploy your application to the world.\n\n${isFirstPerson ? "I " : "He "}previously taught at a coding bootcamp. After that, ${isFirstPerson ? "I " : "He "}led an onboarding program for new software engineers at a Fortune 500 company. Now at Google, ${isFirstPerson ? "I like to " : "he likes to "}help developers deploy their applications to places like ${techStack}.\n\nOutside of ${isFirstPerson ? "my " : "his "}work at Google, ${isFirstPerson ? "I am a " : "he is a "}${coFounder}.\n\nIf you want to know more about what ${isFirstPerson ? "I think" : "he thinks"}, you could check out the FAQ page.`,
            },
          ],
        };
      },
    });

    mc.registerTool({
      name: "list_faq",
      description: "Returns a list of frequently asked questions and their answers.",
      inputSchema: {
        type: "object",
        properties: {},
      },
      execute: async () => {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify([
                {
                  category: "Learning to Code",
                  questions: [
                    {
                      question: "Where should I start?",
                      answer: "It depends on what you want to do. For a career change, consider reputable schools. Harvard's CS50 is a great free guided course. Otherwise, start with a project that excites you!",
                    },
                    {
                      question: "What is a good project?",
                      answer: "Anything you are passionate about. Automating redundant tasks, creating a video game in Scratch, or building a website are all great starts.",
                    },
                  ],
                },
                {
                  category: "Software Career",
                  questions: [
                    {
                      question: "How did you get your first job in tech?",
                      answer: "Used connections, took a pay cut, and got lucky. The industry has changed since then, but these factors still play a role.",
                    },
                    {
                      question: "How did you get a job at Google?",
                      answer: "Applied four times over ten years. The successful attempt was after five years of teaching software. Persistence and relevant experience were key.",
                    },
                  ],
                },
                {
                  category: "Tech Talent Shortage",
                  questions: [
                    {
                      question: "Is the tech talent shortage real?",
                      answer: "It depends on perspective. There's a lot of entry-level talent, but companies often struggle because they are unwilling to pay market rates for senior talent or aren't good at onboarding juniors.",
                    },
                    {
                      question: "Should we be teaching computer science to students?",
                      answer: "Yes, everyone should know a bit about code as it will be an important part of their lives.",
                    },
                    {
                      question: "How can I find entry-level talent?",
                      answer: "There's plenty available. Prime Digital Academy is a great place to start looking.",
                    },
                    {
                      question: "How can I find senior talent?",
                      answer: "Post the salary in the job description. If you can't afford it, hire juniors and invest in their onboarding.",
                    },
                    {
                      question: "How can we onboard new talent?",
                      answer: "Implement daily 30-minute 'unstuck sessions' with senior engineers to show it's okay to ask for help.",
                    },
                  ],
                },
              ]),
            },
          ],
        };
      },
    });

    mc.registerTool({
      name: "get_deployment_steps",
      description: "Returns steps to create and deploy an application based on framework and target.",
      inputSchema: {
        type: "object",
        properties: {
          framework: {
            type: "string",
            enum: FRAMEWORK_OPTIONS,
            description: "The web framework to use",
          },
          target: {
            type: "string",
            enum: TARGET_OPTIONS,
            description: "The deployment target",
          },
          appName: {
            type: "string",
            description: "The name of the application",
          },
        },
        required: ["framework", "target", "appName"],
      },
      execute: async (args: { framework: FrameworkOption; target: TargetOption; appName: string }) => {
        const { framework, target, appName } = args;
        const frameworkDetails = FRAMEWORK_DETAILS[framework];
        const source = "local"; // Defaulting to local source

        const prerequisites = [
          ...frameworkDetails.prerequisites({ appName }),
          ...frameworkDetails.targets[target].sources[source].prerequisites({ appName }),
        ];
        const createApplication = [
          ...frameworkDetails.createApplication({ appName }),
          ...frameworkDetails.targets[target].sources[source].createApplication({ appName }),
        ];
        const runLocally = [
          ...frameworkDetails.runLocally({ appName }),
          ...frameworkDetails.targets[target].sources[source].runLocally({ appName }),
        ];
        const deployApplication = [
          ...frameworkDetails.deployApplication({ appName }),
          ...frameworkDetails.targets[target].sources[source].deployApplication({ appName }),
        ];

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                prerequisites,
                createApplication,
                runLocally,
                deployApplication,
              }),
            },
          ],
        };
      },
    });

    mc.registerTool({
      name: "get_theme_options",
      description: "Returns the available options for customizing the website's theme and content.",
      inputSchema: {
        type: "object",
        properties: {},
      },
      execute: async () => {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                pages: PAGE_OPTIONS,
                vibes: VIBE_OPTIONS,
                colors: COLOR_OPTIONS,
                tenses: TENSE_OPTIONS,
                verbosities: VERBOSITY_OPTIONS,
                frameworks: FRAMEWORK_OPTIONS,
                targets: TARGET_OPTIONS,
                sources: SOURCE_OPTIONS,
              }),
            },
          ],
        };
      },
    });

    mc.registerTool({
      name: "navigate_to",
      description: "Navigates the website to a specific page or theme configuration.",
      inputSchema: {
        type: "object",
        properties: {
          page: { type: "string", enum: PAGE_OPTIONS },
          vibe: { type: "string", enum: VIBE_OPTIONS },
          color: { type: "string", enum: COLOR_OPTIONS },
          tense: { type: "string", enum: TENSE_OPTIONS },
          verbosity: { type: "string", enum: VERBOSITY_OPTIONS },
          framework: { type: "string", enum: FRAMEWORK_OPTIONS },
          target: { type: "string", enum: TARGET_OPTIONS },
          source: { type: "string", enum: SOURCE_OPTIONS },
        },
      },
      execute: async (args: Theme & DeploymentConfiguration) => {
        // Build the path with current defaults for missing values
        // Note: In a real app, you might want to merge with the current URL state,
        // but pathBuilder takes everything it needs.
        const path = pathBuilder({
          page: args.page || "home",
          vibe: args.vibe || "standard",
          color: args.color || "light",
          tense: args.tense || "first-person",
          verbosity: args.verbosity || "medium",
          framework: args.framework || "angular-ssr",
          target: args.target || "cloud-run",
          source: args.source || "local",
        });

        router.push(path);
        return {
          content: [{ type: "text", text: `Navigating to ${path}` }],
        };
      },
    });
  }, [router]);

  return null;
}
