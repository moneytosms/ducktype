import { DuckTypeApp } from "@/components/ducktype-app";
import { snippets } from "@/data/snippets";

export default function Home() {
  return <DuckTypeApp snippets={snippets} />;
}
