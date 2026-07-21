import type { MtTheme } from "./mt-themes-data";

export type ThemeVars = {
  background: string;
  surface: string;
  chip: string;
  line: string;
  text: string;
  muted: string;
  pending: string;
  accent: string;
  caret: string;
  wrong: string;
  punct: string;
  punctBracket: string;
  punctQuote: string;
  punctAt: string;
};

// CSS custom-property name for each ThemeVars field.
export const THEME_VAR_NAMES: Record<keyof ThemeVars, string> = {
  background: "--background",
  surface: "--surface",
  chip: "--chip",
  line: "--line",
  text: "--text",
  muted: "--muted",
  pending: "--pending",
  accent: "--accent",
  caret: "--caret",
  wrong: "--wrong",
  punct: "--punct",
  punctBracket: "--punct-bracket",
  punctQuote: "--punct-quote",
  punctAt: "--punct-at",
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean.slice(0, 6);
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  return "#" + [r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("");
}

function mix(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex([ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t]);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function isDarkTheme(bg: string): boolean {
  return relativeLuminance(bg) < 0.5;
}

// Shiki ships ~60 bundled highlighter themes but we can't hand-pick one per
// imported theme (187 of them) — bucket by background lightness instead.
export function pickShikiTheme(bg: string): "vitesse-dark" | "vitesse-light" {
  return isDarkTheme(bg) ? "vitesse-dark" : "vitesse-light";
}

// Derives the full duck theme palette from an imported monkeytype theme,
// which only ships 10 fields (no surface/chip/line/punctuation split).
export function deriveThemeVars(mt: MtTheme): ThemeVars {
  const quote = mt.caret !== mt.main ? mt.caret : mix(mt.main, mt.text, 0.35);
  return {
    background: mt.bg,
    surface: mt.subAlt,
    chip: mix(mt.subAlt, mt.text, 0.08),
    line: mix(mt.subAlt, mt.text, 0.18),
    text: mt.text,
    muted: mt.sub,
    pending: mix(mt.sub, mt.bg, 0.5),
    accent: mt.main,
    caret: mt.caret,
    wrong: mt.error,
    punct: mt.colorfulError,
    punctBracket: mt.colorfulErrorExtra,
    punctQuote: quote,
    punctAt: mt.errorExtra,
  };
}
