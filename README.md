# 🎯 Vibe Coders — Project Board

A minimal, clean, dark-mode project management app tailored for solo devs and small teams who want focus without bloat.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jdmorales89/ProjectManagement)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## ✨ Features

- **Kanban Board** — Three columns (Todo / In Progress / Complete) with HTML5 drag-and-drop
- **Task Management** — Editable titles, notes, tags, and priorities (low/med/high)
- **Smart Filtering** — Search across title, note, tags, and priority
- **Quick Todos** — Side panel checkbox list for personal tasks
- **Notes Area** — Scratchpad for ideas, links, or references
- **LocalStorage Persistence** — All data stored in your browser (no server required)
- **Backup & Restore** — Export/Import JSON from the header
- **Responsive Design** — Collapses to single column on mobile
- **TypeScript** — Strict typing for maintainability
- **Zero Dependencies** — No heavy UI libraries, just clean hand-rolled dark UI

## 🚀 Live Demo

🔗 **[View Live App](https://your-app.vercel.app)** _(Update this link after deployment)_

## 📦 Tech Stack

- [Next.js 14](https://nextjs.org/) — React framework with App Router
- [React 18](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- LocalStorage API — Client-side persistence

## 🏃 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/jdmorales89/ProjectManagement.git
cd ProjectManagement

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Run production build
```

## 📁 Project Structure

```
./
├── app/
│   ├── globals.css        # Global dark theme and layout styles
│   ├── layout.tsx         # Root layout and metadata
│   └── page.tsx           # Main page: header, sidebar, board
├── components/
│   ├── KanbanBoard.tsx    # Kanban with drag-and-drop, tags, priority, filter
│   ├── TodoList.tsx       # Side todo list with local persistence
│   └── Notes.tsx          # Notes area with local persistence
├── lib/
│   ├── storage.ts         # Typed helpers for localStorage
│   ├── backup.ts          # Export/Import JSON utilities
│   └── useMounted.ts      # Hook to prevent hydration errors
├── next.config.js         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 💾 Data Model

All data is stored in browser localStorage:

### Kanban Board (`vibeKanban`)
```typescript
{
  todo: Task[],
  inprogress: Task[],
  done: Task[]
}

type Task = {
  id: string
  title: string
  note?: string
  tags?: string[]           // e.g. ["ui", "backend"]
  priority?: "low"|"med"|"high"
}
```

### Quick Todos (`vibeTodos`)
```typescript
type Todo = {
  id: string
  text: string
  done: boolean
}
```

### Notes (`vibeNotes`)
```typescript
string  // Plain text
```

## 🎨 Usage

### Creating Tasks
1. Enter a task title in the top input
2. Optionally add a note, tags (comma-separated), and priority
3. Click "Add to Todo"

### Managing Tasks
- **Drag & Drop** — Move cards between columns
- **Edit Inline** — Click title or note to edit (blur to save)
- **Cycle Priority** — Click "Cycle priority" to rotate low → med → high
- **Filter** — Use the filter box to search by title/note/tags/priority
- **Delete** — Click "Delete" to remove a card

### Backup & Restore
- **Export JSON** — Download all data (board, todos, notes) as a JSON file
- **Import JSON** — Upload a backup file to restore data (refreshes page)

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import your repository
4. Vercel auto-detects Next.js and deploys
5. Get a live URL like `your-app.vercel.app`

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jdmorales89/ProjectManagement)

### Other Options
- **Netlify** — Similar one-click deploy
- **Self-hosted** — Run `npm run build && npm start`

## ⚠️ Limitations & Roadmap

**Current Limitations:**
- No within-column reordering (drag only moves between columns)
- Basic touch/mobile drag support
- Data is per-browser (use Export/Import to move devices)

**Potential Enhancements:**
- [ ] Within-column drag reordering
- [ ] Better mobile/touch support
- [ ] Checklists and subtasks
- [ ] Due dates and reminders
- [ ] Theme toggle (light/dark mode)
- [ ] PWA support (installable, offline-first)
- [ ] Keyboard shortcuts

## 🛠️ Troubleshooting

**Data looks stale after import?**
- Refresh the page after importing

**LocalStorage not working?**
- Check browser privacy settings
- LocalStorage is per-domain and per-browser

**Want to clear all data?**
- Open browser DevTools → Application → LocalStorage → Delete `vibeKanban`, `vibeTodos`, `vibeNotes`

## 📄 License

MIT License — Free for personal and commercial use.

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs via [Issues](https://github.com/jdmorales89/ProjectManagement/issues)
- Submit pull requests
- Suggest features

## 👤 Author

**Juan Morales**
- GitHub: [@jdmorales89](https://github.com/jdmorales89)

---

Built with care — no AI-gloss, just minimal design. 🎨
