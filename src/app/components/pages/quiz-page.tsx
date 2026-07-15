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

const PRESETS = [
  {
    name: "JavaScript Scopes",
    format: "markdown" as const,
    data: {
      question: "Which of the following is block-scoped in JavaScript?",
      answers: ["var", "let", "function", "both let and var"],
      correctIndex: 1,
      explanation: "'let' and 'const' are block-scoped variables introduced in ES6, meaning they are only accessible within the block they are defined. 'var' is function-scoped."
    }
  },
  {
    name: "CSS Specificity",
    format: "json" as const,
    data: {
      question: "Which CSS selector has the highest specificity?",
      answers: ["An ID selector (#id)", "A class selector (.class)", "An element selector (div)", "An inline style attribute"],
      correctIndex: 3,
      explanation: "Inline styles (e.g., style=\"...\") have the highest specificity (1000), followed by ID selectors (100), class/attribute selectors (10), and element selectors (1)."
    }
  },
  {
    name: "Next.js Dynamic Routing",
    format: "yaml" as const,
    data: {
      question: "What catch-all parameter slug in Next.js matches all nested paths including the parent?",
      answers: ["[slug]", "[...slug]", "[[...slug]]", "slug*"],
      correctIndex: 2,
      explanation: "Double square brackets [[...slug]] create an optional catch-all route, which matches the base path as well as any nested sub-paths."
    }
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
  const [questionData, setQuestionData] = useState<QuizQuestion>({
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Madrid"],
    correctIndex: 0,
    explanation: "Paris is the capital of France, situated on the Seine River."
  });
  const [rawText, setRawText] = useState(() => {
    return `# Question
What is the capital of France?

## Answers
- [x] Paris
- [ ] London
- [ ] Berlin
- [ ] Madrid

## Explanation
Paris is the capital of France, situated on the Seine River.`;
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Player phase state: "edit" | "question" | "answers" | "explanation"
  const [phase, setPhase] = useState<"edit" | "question" | "answers" | "explanation">("edit");

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

  // Presets trigger
  const applyPreset = (preset: typeof PRESETS[number]) => {
    setFormat(preset.format);
    setQuestionData(preset.data);
    setErrors([]);
    let formatted = "";
    if (preset.format === "json") {
      formatted = JSON.stringify(preset.data, null, 2);
    } else if (preset.format === "yaml") {
      formatted = formatYaml(preset.data);
    } else {
      formatted = formatMarkdown(preset.data);
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

  const handleViewportClick = () => {
    if (phase === "question") {
      setPhase("answers");
    } else if (phase === "answers") {
      setPhase("explanation");
    } else if (phase === "explanation") {
      setPhase("question");
    }
  };

  // Select dynamic gradients for player based on current website theme and vibe
  const getPlayerGradient = () => {
    if (theme.vibe === "fun") {
      return "from-fuchsia-600 via-purple-700 to-indigo-800";
    }
    if (theme.vibe === "professional") {
      return "from-slate-800 via-indigo-950 to-blue-900";
    }
    return "from-amber-500 via-orange-600 to-red-700";
  };

  // Helper classes for input elements based on Light/Dark mode
  const inputThemeClass = theme.color === "dark"
    ? "bg-gray-950 text-white border-gray-800 focus:ring-amber-500 placeholder-gray-500"
    : "bg-white text-black border-gray-200 focus:ring-orange-500 placeholder-gray-400";

  return (
    <div className={`w-full min-h-screen ${textColorClass} pb-12`}>
      <style>
        {`body { background-color: ${bodyBackgroundColor} }`}
      </style>

      <Navbar theme={theme} deploymentConfiguration={deploymentConfiguration} />

      <div className="m-auto max-w-5xl px-4 mt-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Quiz Creator & Player</h1>
          <p className="text-lg opacity-75">Create interactive 9:16 quizzes for YouTube Shorts entirely in your browser.</p>
        </header>

        {phase === "edit" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Editor Input Form Panel (Left) */}
            <div className={`lg:col-span-7 rounded-2xl p-6 shadow-xl ${textBackgroundColorClass} space-y-6 border border-gray-200/10`}>
              <div className="flex justify-between items-center border-b border-gray-200/10 pb-3">
                <h2 className="text-xl font-bold">Interactive Form</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-60">Load Preset:</span>
                  <div className="flex gap-1.5">
                    {PRESETS.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => applyPreset(p)}
                        className="text-[11px] font-bold bg-white/5 hover:bg-white/15 px-2 py-1 rounded border border-white/10 transition cursor-pointer"
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Input fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1" htmlFor="quiz-question">
                    Question Text
                  </label>
                  <textarea
                    id="quiz-question"
                    rows={2}
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

              {/* Start Buttons */}
              <button
                disabled={errors.length > 0}
                onClick={() => setPhase("question")}
                className={`w-full py-3 px-6 rounded-xl font-extrabold text-white text-base shadow-lg transition flex items-center justify-center gap-2 ${
                  errors.length > 0
                    ? "bg-gray-400 dark:bg-gray-800 cursor-not-allowed opacity-50 text-gray-500 dark:text-gray-400"
                    : "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                🎬 Start Quiz presentation (9:16)
              </button>
            </div>

            {/* Formatted Text Box Panel (Right) */}
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
                <p>💡 <b>Quick Tip:</b> You can paste raw question texts in JSON, YAML, or Markdown. The site detects the format automatically, parses the content, and updates the form in real-time!</p>
              </div>
            </div>
          </div>
        ) : (
          /* Presentation / Interactive Player Mode */
          <div className="flex flex-col items-center space-y-6">
            <div className="flex justify-between items-center w-full max-w-[360px]">
              <button
                onClick={() => setPhase("edit")}
                className={`py-1.5 px-4 rounded-xl text-sm font-bold border border-gray-200/10 hover:bg-white/5 transition flex items-center gap-1.5 cursor-pointer`}
              >
                ← Back to Creator
              </button>
              <span className="text-xs font-bold tracking-wider opacity-65 uppercase">
                {phase} view
              </span>
            </div>

            {/* 9:16 Aspect Ratio Frame */}
            <div
              onClick={handleViewportClick}
              className={`w-full max-w-[360px] h-[640px] aspect-[9/16] bg-gradient-to-br ${getPlayerGradient()} rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between p-6 select-none cursor-pointer transition-all duration-300 border border-white/10 hover:brightness-[1.02]`}
            >
              {/* Top Watermark & Details */}
              <div className="flex justify-between items-center z-10 w-full text-white/50 text-[11px] font-bold tracking-widest uppercase">
                <span>Luke Schlangen</span>
                <span>Quiz Short</span>
              </div>

              {/* Main Dynamic View Content */}
              {phase === "question" && (
                <div className="flex-1 flex flex-col justify-center items-center z-10 py-8 px-2 animate-fade-in">
                  <h2 className="text-2xl md:text-3xl font-black text-center text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-snug">
                    {questionData.question}
                  </h2>
                </div>
              )}

              {phase === "answers" && (
                <div className="flex-1 flex flex-col justify-center space-y-6 z-10 py-4 animate-fade-in">
                  {/* Small top header question to keep context */}
                  <h3 className="text-lg font-extrabold text-center text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-normal line-clamp-3">
                    {questionData.question}
                  </h3>

                  {/* Vertically stacked styled answers */}
                  <div className="space-y-3">
                    {questionData.answers.map((ans, i) => (
                      <div
                        key={i}
                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white font-bold text-left transition flex items-center gap-3 w-full shadow-md hover:bg-white/15"
                      >
                        <span className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-sm font-black text-white shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm md:text-base leading-snug break-words">
                          {ans}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {phase === "explanation" && (
                <div className="flex-1 flex flex-col justify-between space-y-6 z-10 py-4 animate-fade-in">
                  {/* Correct Answer Header */}
                  <div className="w-full bg-emerald-500/20 border border-emerald-500/30 rounded-2xl p-4 text-center mt-2 shadow-inner">
                    <span className="text-[10px] font-black text-emerald-400 tracking-widest block mb-1 uppercase">
                      ✅ Correct Answer
                    </span>
                    <p className="text-base md:text-lg font-black text-white drop-shadow">
                      {String.fromCharCode(65 + questionData.correctIndex)}: {questionData.answers[questionData.correctIndex]}
                    </p>
                  </div>

                  {/* Explanation text container */}
                  <div className="flex-1 text-center text-white text-sm md:text-base leading-relaxed px-4 overflow-y-auto max-h-[300px] bg-black/20 border border-white/10 rounded-2xl p-4 flex flex-col justify-center shadow-inner">
                    <span className="text-[10px] font-bold text-white/40 tracking-widest block mb-2 uppercase">
                      Explanation
                    </span>
                    <p className="font-medium drop-shadow-sm">
                      {questionData.explanation}
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Interactive Clue Banner */}
              <div className="flex flex-col items-center justify-center space-y-2 z-10">
                <span className="text-[10px] text-white/50 tracking-wider font-semibold uppercase animate-pulse">
                  {phase === "question" && "🖱️ Tap screen to show options..."}
                  {phase === "answers" && "🖱️ Tap screen to show explanation..."}
                  {phase === "explanation" && "🖱️ Tap screen to replay..."}
                </span>
                <div className="flex justify-center gap-1.5 w-full">
                  <div className={`h-1 flex-1 rounded-full ${phase === "question" ? "bg-white" : "bg-white/20"}`} />
                  <div className={`h-1 flex-1 rounded-full ${phase === "answers" ? "bg-white" : "bg-white/20"}`} />
                  <div className={`h-1 flex-1 rounded-full ${phase === "explanation" ? "bg-white" : "bg-white/20"}`} />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPhase("question");
                }}
                className="py-2 px-5 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold border border-white/10 transition cursor-pointer"
              >
                🔄 Restart Presenter
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPhase("edit");
                }}
                className="py-2 px-5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow transition cursor-pointer"
              >
                ✏️ Edit Question
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
