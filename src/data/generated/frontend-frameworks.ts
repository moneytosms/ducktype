import type { Snippet } from "@/types/snippet";

export const frontendFrameworkSnippets: Snippet[] = [
  {
    id: "react-usereducer-counter",
    title: "React useReducer counter",
    domain: "frontend",
    track: "State",
    language: "TypeScript",
    framework: "React",
    category: "react state",
    prompt: "Manage counter state with useReducer and typed actions.",
    shikiLang: "tsx",
    typingFocus: ["reducers", "union types", "switch statements"],
    code: String.raw`import { useReducer } from "react";

type State = { count: number };
type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
  }
}

export function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}`,
  },
  {
    id: "react-use-debounce-hook",
    title: "useDebounce custom hook",
    domain: "frontend",
    track: "Hooks",
    language: "TypeScript",
    framework: "React",
    category: "custom hooks",
    prompt: "Write a generic hook that debounces a changing value.",
    shikiLang: "tsx",
    typingFocus: ["generics", "hooks", "timers"],
    code: String.raw`import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}`,
  },
  {
    id: "react-use-local-storage-hook",
    title: "useLocalStorage custom hook",
    domain: "frontend",
    track: "Hooks",
    language: "TypeScript",
    framework: "React",
    category: "custom hooks",
    prompt: "Persist state to localStorage with a typed generic hook.",
    shikiLang: "tsx",
    typingFocus: ["generics", "try/catch", "json parsing"],
    code: String.raw`import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  function update(next: T) {
    setValue(next);
    window.localStorage.setItem(key, JSON.stringify(next));
  }

  return [value, update] as const;
}`,
  },
  {
    id: "react-memoized-total",
    title: "Memoized cart total",
    domain: "frontend",
    track: "Performance",
    language: "TypeScript",
    framework: "React",
    category: "performance",
    prompt: "Memoize an expensive derived total and a stable callback.",
    shikiLang: "tsx",
    typingFocus: ["useMemo", "useCallback", "dependency arrays"],
    code: String.raw`import { useCallback, useMemo, useState } from "react";

type Item = { id: string; price: number; qty: number };

export function CartSummary({ items }: { items: Item[] }) {
  const [discount, setDiscount] = useState(0);

  const total = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    return subtotal - discount;
  }, [items, discount]);

  const applyDiscount = useCallback((amount: number) => {
    setDiscount(amount);
  }, []);

  return (
    <div>
      <p>Total: {total.toFixed(2)}</p>
      <button onClick={() => applyDiscount(5)}>Apply $5 off</button>
    </div>
  );
}`,
  },
  {
    id: "react-theme-context",
    title: "Theme context provider",
    domain: "frontend",
    track: "State",
    language: "TypeScript",
    framework: "React",
    category: "context",
    prompt: "Create a typed context and provider for a light/dark theme.",
    shikiLang: "tsx",
    typingFocus: ["context api", "provider components", "custom hooks"],
    code: String.raw`import { createContext, ReactNode, useContext, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextValue = { theme: Theme; toggleTheme: () => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}`,
  },
  {
    id: "react-focus-input-ref",
    title: "Autofocus input with useRef",
    domain: "frontend",
    track: "Hooks",
    language: "TypeScript",
    framework: "React",
    category: "refs",
    prompt: "Focus a text input on mount using a DOM ref.",
    shikiLang: "tsx",
    typingFocus: ["refs", "dom types", "effects"],
    code: String.raw`import { useEffect, useRef } from "react";

export function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} type="text" placeholder="Search..." />;
}`,
  },
  {
    id: "react-error-boundary",
    title: "Class-based error boundary",
    domain: "frontend",
    track: "Error handling",
    language: "TypeScript",
    framework: "React",
    category: "error boundaries",
    prompt: "Catch render errors in a subtree with a class component.",
    shikiLang: "tsx",
    typingFocus: ["class components", "lifecycle methods", "typed props"],
    code: String.raw`import { Component, ErrorInfo, ReactNode } from "react";

type Props = { children: ReactNode; fallback: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Caught error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}`,
  },
  {
    id: "react-filtered-list",
    title: "Filtered list with keys",
    domain: "frontend",
    track: "Rendering",
    language: "TypeScript",
    framework: "React",
    category: "list rendering",
    prompt: "Filter a list of todos by search text and render with stable keys.",
    shikiLang: "tsx",
    typingFocus: ["array methods", "keys", "controlled input"],
    code: String.raw`import { useMemo, useState } from "react";

type Todo = { id: string; text: string; done: boolean };

export function TodoList({ todos }: { todos: Todo[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => todos.filter((todo) => todo.text.toLowerCase().includes(query.toLowerCase())),
    [todos, query],
  );

  return (
    <div>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <ul>
        {filtered.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.done ? "line-through" : "none" }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
  },
  {
    id: "react-memo-list-item",
    title: "Memoized list item",
    domain: "frontend",
    track: "Performance",
    language: "TypeScript",
    framework: "React",
    category: "performance",
    prompt: "Prevent unnecessary re-renders of a list row with React.memo.",
    shikiLang: "tsx",
    typingFocus: ["memo", "props typing", "children props"],
    code: String.raw`import { memo } from "react";

type RowProps = {
  id: string;
  label: string;
  onSelect: (id: string) => void;
};

export const ListRow = memo(function ListRow({ id, label, onSelect }: RowProps) {
  console.log("rendering", label);
  return (
    <li onClick={() => onSelect(id)}>
      {label}
    </li>
  );
});`,
  },
  {
    id: "react-functional-updates",
    title: "Functional state updates",
    domain: "frontend",
    track: "State",
    language: "TypeScript",
    framework: "React",
    category: "react state",
    prompt: "Batch multiple increments safely using functional setState.",
    shikiLang: "tsx",
    typingFocus: ["functional updates", "closures", "event handlers"],
    code: String.raw`import { useState } from "react";

export function TripleIncrement() {
  const [count, setCount] = useState(0);

  function incrementThrice() {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={incrementThrice}>+3</button>
    </div>
  );
}`,
  },
  {
    id: "next-server-component-fetch",
    title: "Server Component data fetch",
    domain: "frontend",
    track: "Server Components",
    language: "TypeScript",
    framework: "Next.js",
    category: "data fetching",
    prompt: "Fetch and render a list of posts directly in an async Server Component.",
    shikiLang: "tsx",
    typingFocus: ["async components", "fetch", "server rendering"],
    code: String.raw`type Post = { id: string; title: string };

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://api.example.com/posts", {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`,
  },
  {
    id: "next-server-action-form",
    title: "Server Action form",
    domain: "frontend",
    track: "Server Actions",
    language: "TypeScript",
    framework: "Next.js",
    category: "server actions",
    prompt: "Submit a form directly to a server action that revalidates a path.",
    shikiLang: "tsx",
    typingFocus: ["use server", "form actions", "revalidation"],
    code: String.raw`import { revalidatePath } from "next/cache";

async function createComment(formData: FormData) {
  "use server";

  const text = formData.get("text");
  await fetch("https://api.example.com/comments", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
  revalidatePath("/comments");
}

export function CommentForm() {
  return (
    <form action={createComment}>
      <textarea name="text" required />
      <button type="submit">Post</button>
    </form>
  );
}`,
  },
  {
    id: "next-generate-static-params",
    title: "generateStaticParams for blog posts",
    domain: "frontend",
    track: "Routing",
    language: "TypeScript",
    framework: "Next.js",
    category: "static generation",
    prompt: "Pre-render dynamic blog routes at build time from a slug list.",
    shikiLang: "tsx",
    typingFocus: ["static params", "dynamic routes", "async functions"],
    code: String.raw`type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const res = await fetch("https://api.example.com/posts");
  const posts: { slug: string }[] = await res.json();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Params }) {
  const res = await fetch("https://api.example.com/posts/" + params.slug);
  const post = await res.json();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}`,
  },
  {
    id: "next-middleware-auth-redirect",
    title: "Auth-redirect middleware",
    domain: "frontend",
    track: "Middleware",
    language: "TypeScript",
    framework: "Next.js",
    category: "middleware",
    prompt: "Redirect unauthenticated users away from protected routes.",
    shikiLang: "tsx",
    typingFocus: ["middleware", "cookies", "matchers"],
    code: String.raw`import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
};`,
  },
  {
    id: "next-route-handler-crud",
    title: "Route handler GET/POST",
    domain: "frontend",
    track: "Data fetching",
    language: "TypeScript",
    framework: "Next.js",
    category: "route handlers",
    prompt: "Implement a GET and POST route handler for a notes API.",
    shikiLang: "tsx",
    typingFocus: ["route handlers", "request/response types", "json parsing"],
    code: String.raw`import { NextRequest, NextResponse } from "next/server";

type Note = { id: string; body: string };

const notes: Note[] = [];

export async function GET() {
  return NextResponse.json(notes);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const note: Note = { id: crypto.randomUUID(), body: data.body };
  notes.push(note);
  return NextResponse.json(note, { status: 201 });
}`,
  },
  {
    id: "next-loading-error-boundaries",
    title: "Route error boundary",
    domain: "frontend",
    track: "Server Components",
    language: "TypeScript",
    framework: "Next.js",
    category: "suspense",
    prompt: "Add a route-level error UI file that can reset the failed segment.",
    shikiLang: "tsx",
    typingFocus: ["special files", "reset callbacks", "client components"],
    code: String.raw`"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <p>Something went wrong: {error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}`,
  },
  {
    id: "next-generate-metadata",
    title: "Dynamic generateMetadata",
    domain: "frontend",
    track: "Metadata",
    language: "TypeScript",
    framework: "Next.js",
    category: "metadata",
    prompt: "Generate per-page metadata based on route params.",
    shikiLang: "tsx",
    typingFocus: ["metadata api", "async functions", "typed params"],
    code: String.raw`import type { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch("https://api.example.com/posts/" + params.slug);
  const post = await res.json();

  return {
    title: post.title,
    description: post.summary,
    openGraph: { images: [post.coverImage] },
  };
}

export default function Page({ params }: Props) {
  return <h1>{params.slug}</h1>;
}`,
  },
  {
    id: "next-image-optimized",
    title: "next/image optimized rendering",
    domain: "frontend",
    track: "Performance",
    language: "TypeScript",
    framework: "Next.js",
    category: "images",
    prompt: "Render a responsive optimized image with a priority hint.",
    shikiLang: "tsx",
    typingFocus: ["next/image", "responsive sizes", "priority loading"],
    code: String.raw`import Image from "next/image";

export function ProductCard({ name, imageUrl }: { name: string; imageUrl: string }) {
  return (
    <div>
      <Image
        src={imageUrl}
        alt={name}
        width={400}
        height={300}
        sizes="(max-width: 768px) 100vw, 400px"
        priority
      />
      <p>{name}</p>
    </div>
  );
}`,
  },
  {
    id: "next-router-navigation",
    title: "Client navigation with useRouter",
    domain: "frontend",
    track: "Routing",
    language: "TypeScript",
    framework: "Next.js",
    category: "navigation",
    prompt: "Navigate programmatically and highlight the active pathname.",
    shikiLang: "tsx",
    typingFocus: ["client components", "usePathname", "useRouter"],
    code: String.raw`"use client";

import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav>
      {links.map((link) => (
        <button
          key={link.href}
          onClick={() => router.push(link.href)}
          style={{ fontWeight: pathname === link.href ? "bold" : "normal" }}
        >
          {link.label}
        </button>
      ))}
    </nav>
  );
}`,
  },
  {
    id: "next-dynamic-slug-page",
    title: "Dynamic [slug] page",
    domain: "frontend",
    track: "Routing",
    language: "TypeScript",
    framework: "Next.js",
    category: "dynamic routes",
    prompt: "Render a product page keyed off a dynamic slug segment.",
    shikiLang: "tsx",
    typingFocus: ["dynamic segments", "notFound", "async server components"],
    code: String.raw`import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

async function getProduct(slug: string) {
  const res = await fetch("https://api.example.com/products/" + slug);
  if (res.status === 404) return null;
  return res.json();
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug);

  if (!product) notFound();

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
    </div>
  );
}`,
  },
];
