"use client";
import { useEffect, useState } from "react";
import { loadJSON, saveJSON } from "../lib/storage";

const STORAGE_KEY = "vibeNotes" as const;

export default function Notes() {
  const [text, setText] = useState<string>(() => loadJSON<string>(STORAGE_KEY, ""));
  useEffect(() => { saveJSON<string>(STORAGE_KEY, text); }, [text]);

  return (
    <section className="panel">
      <h2 className="panelTitle">Notes</h2>
      <textarea
        className="textarea"
        placeholder="Jot ideas, links, or snippets..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
      />
    </section>
  );
}
