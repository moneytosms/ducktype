import type { DuckSettings, Snippet } from "@/types/snippet";

// canonical Blind 150 / NeetCode roadmap order
export const dsaCategoryOrder = [
  "Arrays & Hashing",
  "Two Pointers",
  "Sliding Window",
  "Stack",
  "Binary Search",
  "Linked List",
  "Trees",
  "Tries",
  "Heap / Priority Queue",
  "Backtracking",
  "Graphs",
  "Advanced Graphs",
  "1-D Dynamic Programming",
  "Dynamic Programming",
  "2-D Dynamic Programming",
  "Greedy",
  "Intervals",
  "Math & Geometry",
  "Bit Manipulation",
];

export const defaultSettings: DuckSettings = {
  domain: "backend",
  language: "Python",
  framework: "FastAPI",
  track: "REST API",
  theme: "mallard",
  font: "JetBrains Mono",
  durationSeconds: 60,
  caretStyle: "bar",
  fontSize: "auto",
  showLiveWpm: true,
  showLiveTimer: true,
  showProgress: true,
  stopOnError: "off",
  funbox: "none",
  viewMode: "focus",
};

export function matchSnippets(snippets: Snippet[], settings: DuckSettings) {
  const matches = snippets.filter((snippet) => {
    const frameworkMatches = settings.framework === "Any" || !settings.framework || snippet.framework === settings.framework;
    const trackMatches = settings.track === "Any" || !settings.track || snippet.track === settings.track;

    return snippet.domain === settings.domain && snippet.language === settings.language && frameworkMatches && trackMatches;
  });

  return matches.length > 0 ? matches : snippets.filter((snippet) => snippet.domain === settings.domain);
}

export function selectSnippet(snippets: Snippet[], settings: DuckSettings, offset = 0) {
  const pool = matchSnippets(snippets, settings);
  return pool[Math.abs(offset) % Math.max(pool.length, 1)] ?? snippets[0];
}

export function getFilters(snippets: Snippet[], domain?: Snippet["domain"], language?: string) {
  const scoped = domain ? snippets.filter((snippet) => snippet.domain === domain) : snippets;
  const frameworkScoped = language ? scoped.filter((snippet) => snippet.language === language) : scoped;
  const tracks = unique(scoped.map((snippet) => snippet.track));
  const orderedTracks = domain === "dsa" ? sortByOrder(tracks, dsaCategoryOrder) : tracks;
  return {
    domains: unique(snippets.map((snippet) => snippet.domain)),
    languages: unique(scoped.map((snippet) => snippet.language)),
    frameworks: ["Any", ...unique(frameworkScoped.map((snippet) => snippet.framework).filter(Boolean) as string[])],
    tracks: ["Any", ...orderedTracks],
  };
}

function sortByOrder(values: string[], order: string[]) {
  return [...values].sort((a, b) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

export function getDomainDefaults(snippets: Snippet[], domain: Snippet["domain"]) {
  const first = snippets.find((snippet) => snippet.domain === domain);
  return first
    ? { language: first.language, framework: "Any", track: "Any" }
    : { language: "Any", framework: "Any", track: "Any" };
}

function unique<T>(values: T[]) {
  return Array.from(new Set(values));
}
