"use client";

import KanbanBoard from "../components/KanbanBoard";
import TodoList from "../components/TodoList";
import Notes from "../components/Notes";
import { useRef, useState } from "react";
import { makeBackup, downloadJSON, importBackup } from "../lib/backup";
import { useMounted } from "../lib/useMounted";

export default function HomePage() {
  const mounted = useMounted();
  const [showSidebar, setShowSidebar] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleExport() {
    const blob = makeBackup(["vibeKanban", "vibeTodos", "vibeNotes"]);
    downloadJSON(blob);
  }

  async function handleImport(files: FileList | null) {
    if (!files || files.length === 0) return;
    await importBackup(files[0]);
    // simple hard refresh of state by reloading
    window.location.reload();
  }

  if (!mounted) return null;

  return (
    <main className="container">
      <header className="topbar">
        <div className="brand">Vibe Coders</div>
        <div className="actions">
          <button className="ghost" onClick={() => setShowSidebar(s => !s)}>
            {showSidebar ? 'Hide' : 'Show'} Side Panel
          </button>
          <button className="ghost" onClick={handleExport}>Export JSON</button>
          <button className="ghost" onClick={() => fileRef.current?.click()}>Import JSON</button>
          <input ref={fileRef} type="file" accept="application/json" style={{ display: 'none' }} onChange={(e) => handleImport(e.target.files)} />
          <a className="ghost" href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a>
        </div>
      </header>

      <section className="content">
        {showSidebar && (
          <aside className="sidebar">
            <TodoList />
            <Notes />
          </aside>
        )}
        <section className="boardArea">
          <KanbanBoard />
        </section>
      </section>

      <footer className="footer">
        <span>Built with care — no AI-gloss, just minimal design.</span>
      </footer>
    </main>
  );
}
