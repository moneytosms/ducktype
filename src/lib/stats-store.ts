export type SessionRecord = {
  ts: number;
  durationSeconds: number;
  elapsedSeconds: number;
  wpm: number;
  accuracy: number;
};

export type StatsStore = {
  version: number;
  testsStarted: number;
  sessions: SessionRecord[];
};

// bump when the shape of StatsStore/SessionRecord changes; loadStats() drops
// anything from an older version instead of risking a malformed read
const SCHEMA_VERSION = 1;
const STORAGE_KEY = "ducktype.stats";
const MAX_SESSIONS = 500;

function emptyStats(): StatsStore {
  return { version: SCHEMA_VERSION, testsStarted: 0, sessions: [] };
}

export function loadStats(): StatsStore {
  if (typeof window === "undefined") return emptyStats();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStats();
    const parsed = JSON.parse(raw);
    if (parsed.version !== SCHEMA_VERSION) return emptyStats();
    return { version: SCHEMA_VERSION, testsStarted: parsed.testsStarted ?? 0, sessions: parsed.sessions ?? [] };
  } catch {
    return emptyStats();
  }
}

export function saveStats(stats: StatsStore) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function recordTestStarted(stats: StatsStore): StatsStore {
  return { ...stats, testsStarted: stats.testsStarted + 1 };
}

export function recordTestCompleted(stats: StatsStore, session: SessionRecord): StatsStore {
  return { ...stats, sessions: [...stats.sessions, session].slice(-MAX_SESSIONS) };
}

export function totalTimeTypingSeconds(stats: StatsStore) {
  return stats.sessions.reduce((sum, session) => sum + session.elapsedSeconds, 0);
}

export function bestForDuration(stats: StatsStore, durationSeconds: number) {
  const matches = stats.sessions.filter((session) => session.durationSeconds === durationSeconds);
  if (matches.length === 0) return null;
  return matches.reduce((best, session) => (session.wpm > best.wpm ? session : best));
}

export function sessionsByDay(stats: StatsStore) {
  const counts = new Map<string, number>();
  for (const session of stats.sessions) {
    const day = new Date(session.ts).toISOString().slice(0, 10);
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }
  return counts;
}

// consecutive local-calendar days with a completed test, counting back from
// today; a day without a session yet doesn't break yesterday's streak
export function currentStreak(stats: StatsStore) {
  const days = new Set(stats.sessions.map((session) => new Date(session.ts).toDateString()));
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  if (!days.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1);

  let streak = 0;
  while (days.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
