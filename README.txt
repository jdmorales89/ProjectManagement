Vibe Coders — Project Board

Overview
Vibe Coders is a minimal, clean, dark‑mode project management app tailored for solo devs and small teams who want focus without bloat. It combines:
- A Kanban board (Todo / In Progress / Complete) with drag‑and‑drop
- A Quick Todo list for lightweight personal tasks
- A Notes area for ideas, links, or scratchpads

All data is stored in your browser via localStorage. No accounts, no servers.

Use Cases
- Plan and track a small feature or sprint
- Keep a personal backlog and daily todos side‑by‑side
- Capture notes and references while you work
- Export/import your board to move between machines or back up

Features
- Kanban: three columns, HTML5 drag‑and‑drop between columns
- Tasks: editable title and note, tags (comma‑separated), priority (low/med/high)
- Filtering: matches title, note, tags, and priority
- Quick Todos: checkbox list separate from the Kanban board
- Notes: text area for unstructured thoughts or references
- Persistence: localStorage for board, todos, and notes
- Backup: Export/Import JSON from the header
- Responsive: collapses to single column on small screens
- TypeScript: strict types for core components
- Zero heavy UI dependencies; clean, hand‑rolled dark UI

Tech Stack
- Next.js (App Router)
- React 18
- TypeScript

Getting Started
1) npm install
2) npm run dev
3) Open http://localhost:3000

Available Scripts
- npm run dev     Start the dev server
- npm run build   Build the production bundle
- npm start       Run the production server

Project Structure
./
├─ app/
│  ├─ globals.css        Global dark theme and layout styles
│  ├─ layout.tsx         Root layout and metadata
│  └─ page.tsx           Main page: header, sidebar, board
├─ components/
│  ├─ KanbanBoard.tsx    Kanban with drag‑and‑drop, tags, priority, filter
│  ├─ TodoList.tsx       Side todo list with local persistence
│  └─ Notes.tsx          Notes area with local persistence
├─ lib/
│  ├─ storage.ts         Typed helpers for localStorage (loadJSON/saveJSON)
│  └─ backup.ts          Export/Import JSON utilities
├─ next.config.js        Next.js config
├─ next-env.d.ts         Next.js TypeScript ambient types
├─ tsconfig.json         TypeScript configuration
├─ package.json          Scripts and dependencies
└─ README.txt            This file

Data Model ( persisted in localStorage )
- Key: "vibeKanban"
  {
    "todo": Task[],
    "inprogress": Task[],
    "done": Task[]
  }
  Task: {
    id: string,
    title: string,
    note?: string,
    tags?: string[],        // e.g. ["ui", "backend"]
    priority?: "low"|"med"|"high"
  }

- Key: "vibeTodos"
  Todo: { id: string, text: string, done: boolean }

- Key: "vibeNotes"
  string (plain text)

Backup & Restore
- Export JSON (header) downloads a single JSON with all keys above
- Import JSON (header) loads keys into localStorage and refreshes the page
- Files are versioned with a simple "version" and timestamp in backup.ts

Usage Tips
- Create tasks with optional note, tags (comma‑separated), and priority
- Drag cards between columns; click titles/notes to edit inline
- Use the filter to quickly narrow by title/note/tags/priority
- Use Quick Todos for ad‑hoc personal tasks that don’t belong on the board
- Keep references or thoughts in Notes (auto‑saves)

Design Notes
- Minimal, accessible dark theme that avoids a generated look
- No external state libraries; simple React state + localStorage
- HTML5 DnD for minimal footprint (no heavy drag libs)

Limitations & Roadmap Ideas
- No within‑column reordering yet
- Basic touch DnD support can be improved
- Potential enhancements: checklists, due dates, theming/light mode, PWA

Troubleshooting
- If data looks stale after import, refresh the page
- localStorage is per‑browser; use Export/Import to move devices
- Clearing browser storage will remove your data

License
- For personal and internal project use. Add a license as needed for your project.