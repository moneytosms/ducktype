import type { Snippet } from "@/types/snippet";
import { dsaPythonSnippets } from "./generated/dsa-python";
import { dsaCppSnippets } from "./generated/dsa-cpp";
import { dsaJavaSnippets } from "./generated/dsa-java";
import { dsaGoSnippets } from "./generated/dsa-go";
import { dsaCSnippets } from "./generated/dsa-c";
import { frontendFrameworkSnippets } from "./generated/frontend-frameworks";
import { backendFrameworkSnippets } from "./generated/backend-frameworks";
import { languageIdiomSnippets } from "./generated/language-idioms";
import { devopsCommandSnippets } from "./generated/devops-commands";
import { mlSnippets } from "./generated/ml-snippets";

export const snippets: Snippet[] = [
  {
    id: "py-fastapi-health",
    title: "FastAPI health endpoint",
    domain: "backend",
    track: "REST API",
    language: "Python",
    framework: "FastAPI",

    category: "server setup",
    prompt: "Create a small JSON health endpoint with FastAPI.",
    shikiLang: "python",
    typingFocus: ["decorators", "dict literals", "async function"],
    code: String.raw`from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
async def health_check():
    return {"ok": True, "service": "ducktype-api"}`,
  },
  {
    id: "py-json-config",
    title: "Read JSON config",
    domain: "language",
    track: "Python idioms",
    language: "Python",

    category: "file io",
    prompt: "Load a JSON config file and safely read settings.",
    shikiLang: "python",
    typingFocus: ["with blocks", "path strings", "dict access"],
    code: String.raw`import json
from pathlib import Path

config_path = Path("config/app.json")

with config_path.open("r", encoding="utf-8") as file:
    config = json.load(file)

debug = config.get("debug", False)
port = int(config.get("port", 8000))`,
  },
  {
    id: "js-express-server",
    title: "Express JSON server",
    domain: "backend",
    track: "REST API",
    language: "JavaScript",
    framework: "Express",

    category: "server setup",
    prompt: "Start a small Express server with one JSON route.",
    shikiLang: "javascript",
    typingFocus: ["callbacks", "object literals", "method chains"],
    code: String.raw`import express from "express";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/api/status", (_req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.listen(port, () => {
  console.log("server listening on " + port);
});`,
  },
  {
    id: "ts-fetch-wrapper",
    title: "Typed fetch helper",
    domain: "language",
    track: "TypeScript types",
    language: "TypeScript",

    category: "api client",
    prompt: "Create a typed JSON fetch helper with error handling.",
    shikiLang: "typescript",
    typingFocus: ["generics", "template strings", "throw statements"],
    code: String.raw`type ApiError = {
  message: string;
  status: number;
};

export async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const error: ApiError = {
      message: "Request failed",
      status: response.status,
    };
    throw error;
  }

  return response.json() as Promise<T>;
}`,
  },
  {
    id: "tsx-next-form",
    title: "Next.js client form",
    domain: "frontend",
    track: "Forms",
    language: "TypeScript",
    framework: "Next.js",

    category: "react state",
    prompt: "Build a controlled form that submits a search value.",
    shikiLang: "tsx",
    typingFocus: ["JSX", "event types", "state updates"],
    code: String.raw`"use client";

import { FormEvent, useState } from "react";

export function SearchBox() {
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({ query: query.trim() });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
}`,
  },
  {
    id: "react-effect-fetch",
    title: "React effect fetch",
    domain: "frontend",
    track: "Hooks",
    language: "TypeScript",
    framework: "React",

    category: "data fetching",
    prompt: "Fetch data in an effect and ignore stale responses.",
    shikiLang: "tsx",
    typingFocus: ["hooks", "cleanup", "async functions"],
    code: String.raw`import { useEffect, useState } from "react";

type User = { id: string; name: string };

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      const response = await fetch("/api/users");
      const data = (await response.json()) as User[];
      if (!cancelled) setUsers(data);
    }

    loadUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  return users.map((user) => <p key={user.id}>{user.name}</p>);
}`,
  },
  {
    id: "bash-backup-script",
    title: "Bash backup script",
    domain: "devops",
    track: "Shell scripts",
    language: "Bash",

    category: "automation",
    prompt: "Archive a directory into a timestamped backup file.",
    shikiLang: "bash",
    typingFocus: ["variables", "quotes", "flags"],
    code: String.raw`#!/usr/bin/env bash
set -euo pipefail

source_dir="\${1:-./data}"
backup_dir="\${BACKUP_DIR:-./backups}"
timestamp="$(date +%Y%m%d-%H%M%S)"

mkdir -p "$backup_dir"
tar -czf "$backup_dir/data-$timestamp.tar.gz" "$source_dir"

echo "backup written to $backup_dir/data-$timestamp.tar.gz"`,
  },
  {
    id: "docker-node-api",
    title: "Node API Dockerfile",
    domain: "devops",
    track: "Containers",
    language: "Dockerfile",
    framework: "Docker",

    category: "container setup",
    prompt: "Build a small production Dockerfile for a Node API.",
    shikiLang: "dockerfile",
    typingFocus: ["uppercase commands", "paths", "ports"],
    code: String.raw`FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server.js"]`,
  },
  {
    id: "cpp-two-sum",
    title: "Two Sum",
    domain: "dsa",
    track: "Arrays & Hashing",
    language: "C++",

    category: "hash map",
    prompt: "Return the indices of two numbers that add up to a target.",
    shikiLang: "cpp",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["STL", "unordered_map", "loops"],
    code: String.raw`#include <unordered_map>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;

    for (int i = 0; i < nums.size(); i++) {
        int need = target - nums[i];
        if (seen.count(need)) {
            return {seen[need], i};
        }
        seen[nums[i]] = i;
    }

    return {};
}`,
  },
  {
    id: "py-longest-substring",
    title: "Longest substring without repeats",
    domain: "dsa",
    track: "Sliding Window",
    language: "Python",

    category: "strings",
    prompt: "Find the longest substring that contains no repeated characters.",
    shikiLang: "python",
    optimality: "O(n) time, O(k) space",
    typingFocus: ["window pointers", "sets", "while loops"],
    code: String.raw`def length_of_longest_substring(text: str) -> int:
    seen = set()
    left = 0
    best = 0

    for right, char in enumerate(text):
        while char in seen:
            seen.remove(text[left])
            left += 1

        seen.add(char)
        best = max(best, right - left + 1)

    return best`,
  },
  {
    id: "ts-valid-parentheses",
    title: "Valid parentheses",
    domain: "dsa",
    track: "Stack",
    language: "TypeScript",

    category: "stack",
    prompt: "Check whether every bracket closes in the right order.",
    shikiLang: "typescript",
    optimality: "O(n) time, O(n) space",
    typingFocus: ["maps", "arrays", "conditionals"],
    code: String.raw`export function isValid(input: string): boolean {
  const pairs: Record<string, string> = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  const stack: string[] = [];

  for (const char of input) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else if (stack.pop() !== pairs[char]) {
      return false;
    }
  }

  return stack.length === 0;
}`,
  },
  {
    id: "c-binary-search",
    title: "Binary search",
    domain: "dsa",
    track: "Binary Search",
    language: "C",

    category: "arrays",
    prompt: "Search a sorted integer array for a target value.",
    shikiLang: "c",
    optimality: "O(log n) time, O(1) space",
    typingFocus: ["pointers", "integer math", "while loops"],
    code: String.raw`int binary_search(const int *nums, int length, int target) {
    int left = 0;
    int right = length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) {
            return mid;
        }
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}`,
  },
  {
    id: "cpp-bfs-graph",
    title: "Graph BFS",
    domain: "dsa",
    track: "Graphs",
    language: "C++",

    category: "traversal",
    prompt: "Visit every reachable node in breadth-first order.",
    shikiLang: "cpp",
    optimality: "O(V + E) time, O(V) space",
    typingFocus: ["queues", "vectors", "visited arrays"],
    code: String.raw`#include <queue>
#include <vector>
using namespace std;

vector<int> bfs(int start, vector<vector<int>>& graph) {
    vector<int> order;
    vector<bool> visited(graph.size(), false);
    queue<int> nodes;

    visited[start] = true;
    nodes.push(start);

    while (!nodes.empty()) {
        int node = nodes.front();
        nodes.pop();
        order.push_back(node);

        for (int next : graph[node]) {
            if (!visited[next]) {
                visited[next] = true;
                nodes.push(next);
            }
        }
    }

    return order;
}`,
  },
  {
    id: "py-dp-climb",
    title: "Climbing stairs",
    domain: "dsa",
    track: "Dynamic Programming",
    language: "Python",

    category: "dp",
    prompt: "Count how many ways there are to climb stairs taking one or two steps.",
    shikiLang: "python",
    optimality: "O(n) time, O(1) space",
    typingFocus: ["tuple assignment", "for loops", "returns"],
    code: String.raw`def climb_stairs(steps: int) -> int:
    if steps <= 2:
        return steps

    prev = 1
    curr = 2

    for _ in range(3, steps + 1):
        prev, curr = curr, prev + curr

    return curr`,
  },
  {
    id: "gh-actions-node",
    title: "Node CI workflow",
    domain: "devops",
    track: "CI/CD",
    language: "YAML",
    framework: "GitHub Actions",

    category: "automation",
    prompt: "Run install, lint, and build on every pull request.",
    shikiLang: "yaml",
    typingFocus: ["indentation", "lists", "colons"],
    code: String.raw`name: ci

on:
  pull_request:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run build`,
  },
  ...dsaPythonSnippets,
  ...dsaCppSnippets,
  ...dsaJavaSnippets,
  ...dsaGoSnippets,
  ...dsaCSnippets,
  ...frontendFrameworkSnippets,
  ...backendFrameworkSnippets,
  ...languageIdiomSnippets,
  ...devopsCommandSnippets,
  ...mlSnippets,
];
