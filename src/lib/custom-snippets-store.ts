import type { BundledLanguage } from "shiki";
import type { Snippet } from "@/types/snippet";

const STORAGE_KEY = "ducktype.custom-snippets";

export function loadCustomSnippets(): Snippet[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomSnippets(snippets: Snippet[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
}

export function createCustomSnippet(input: { title: string; language: string; shikiLang: BundledLanguage; code: string }): Snippet {
  return {
    id: `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    title: input.title || "Untitled snippet",
    domain: "custom",
    track: "Custom",
    language: input.language,
    category: "custom",
    prompt: "Your own snippet.",
    code: input.code,
    shikiLang: input.shikiLang,
    typingFocus: [],
  };
}
