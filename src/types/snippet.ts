import type { BundledLanguage } from "shiki";

export type PracticeDomain = "dsa" | "backend" | "frontend" | "devops" | "language" | "custom";

export type Snippet = {
  id: string;
  title: string;
  domain: PracticeDomain;
  track: string;
  language: string;
  framework?: string;
  category: string;
  prompt: string;
  code: string;
  shikiLang: BundledLanguage;
  optimality?: string;
  typingFocus: string[];
};

export type CaretStyle = "bar" | "block" | "underline";
export type CodeFontSize = "auto" | "sm" | "md" | "lg" | "xl" | "2xl";
export type StopOnError = "off" | "letter";
export type Funbox = "none" | "blind" | "no-backspace" | "sudden-death" | "memory" | "zen" | "assist";
export type ViewMode = "focus" | "ide";

export type DuckSettings = {
  domain: PracticeDomain;
  language: string;
  framework: string;
  track: string;
  theme: string;
  font: string;
  durationSeconds: number;
  caretStyle: CaretStyle;
  fontSize: CodeFontSize;
  showLiveWpm: boolean;
  showLiveTimer: boolean;
  showProgress: boolean;
  stopOnError: StopOnError;
  funbox: Funbox;
  viewMode: ViewMode;
};
