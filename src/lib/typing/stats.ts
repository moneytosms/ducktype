import { countErrors } from "@/lib/typing/compare";

export type TypingStats = {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  errors: number;
  elapsedSeconds: number;
  progress: number;
};

export function calculateStats(target: string, typed: string, startedAt: number | null, now: number): TypingStats {
  const elapsedSeconds = startedAt ? Math.max((now - startedAt) / 1000, 1) : 0;
  const minutes = Math.max(elapsedSeconds / 60, 1 / 60);
  const errors = countErrors(target, typed);
  const correctCharacters = Math.max(typed.length - errors, 0);
  const rawWpm = Math.round(typed.length / 5 / minutes);
  const wpm = Math.round(correctCharacters / 5 / minutes);
  const accuracy = typed.length === 0 ? 100 : Math.max(0, Math.round((correctCharacters / typed.length) * 100));
  const progress = target.length === 0 ? 0 : Math.min(100, Math.round((typed.length / target.length) * 100));

  return {
    wpm,
    rawWpm,
    accuracy,
    consistency: estimateConsistency(typed, errors),
    errors,
    elapsedSeconds: Math.round(elapsedSeconds),
    progress,
  };
}

function estimateConsistency(typed: string, errors: number) {
  if (typed.length < 12) return 100;

  const errorPressure = Math.min(errors / typed.length, 0.5);
  const whitespacePressure = Math.abs(0.18 - typed.split(/\s/).length / typed.length);

  return Math.max(40, Math.round(100 - errorPressure * 120 - whitespacePressure * 80));
}
