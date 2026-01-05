"use client";
import { useEffect, useMemo, useState } from "react";
import { loadJSON, saveJSON } from "../lib/storage";

const STORAGE_KEY = "vibeKanban" as const;

type Priority = "low" | "med" | "high";
export type Task = { id: string; title: string; note?: string; tags?: string[]; priority?: Priority };
export type BoardState = { todo: Task[]; inprogress: Task[]; done: Task[] };

const initialData: BoardState = {
  todo: [
    { id: "t1", title: "Sketch layout", note: "High-level sections", tags: ["ui"], priority: "med" },
  ],
  inprogress: [
    { id: "t2", title: "Implement drag & drop", note: "HTML5 DnD", tags: ["ux"], priority: "high" },
  ],
  done: [],
};

function uid() { return Math.random().toString(36).slice(2, 9); }

export default function KanbanBoard() {
  const [columns, setColumns] = useState<BoardState>(() => loadJSON<BoardState>(STORAGE_KEY, initialData));
  const [newTask, setNewTask] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("med");
  const [filter, setFilter] = useState("");

  useEffect(() => { saveJSON(STORAGE_KEY, columns); }, [columns]);

  const filtered = useMemo<BoardState>(() => {
    if (!filter.trim()) return columns;
    const term = filter.toLowerCase();
    const pick = (list: Task[]) => list.filter(t =>
      t.title.toLowerCase().includes(term)
      || (t.note || "").toLowerCase().includes(term)
      || (t.tags || []).some(tag => tag.toLowerCase().includes(term))
      || (t.priority || "").toLowerCase().includes(term)
    );
    return {
      todo: pick(columns.todo),
      inprogress: pick(columns.inprogress),
      done: pick(columns.done),
    };
  }, [columns, filter]);

  function onDragStart(e: React.DragEvent, fromCol: keyof BoardState, taskId: string) {
    e.dataTransfer.setData("text/plain", JSON.stringify({ fromCol, taskId }));
    e.dataTransfer.effectAllowed = "move";
  }

  function onDrop(e: React.DragEvent, toCol: keyof BoardState) {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const { fromCol, taskId } = data as { fromCol: keyof BoardState; taskId: string };
    if (!fromCol || !taskId) return;
    if (fromCol === toCol) return; // no-op
    setColumns(prev => {
      const sourceList = [...prev[fromCol]];
      const idx = sourceList.findIndex(t => t.id === taskId);
      if (idx === -1) return prev;
      const [task] = sourceList.splice(idx, 1);
      const destList = [...prev[toCol], task];
      return { ...prev, [fromCol]: sourceList, [toCol]: destList } as BoardState;
    });
  }

  function allowDrop(e: React.DragEvent) { e.preventDefault(); }

  function addTask(toCol: keyof BoardState) {
    const title = newTask.trim();
    if (!title) return;
    const tags = newTags.split(",").map(s => s.trim()).filter(Boolean);
    setColumns(prev => ({ ...prev, [toCol]: [...prev[toCol], { id: uid(), title, note: newNote.trim() || undefined, tags, priority: newPriority }] }));
    setNewTask("");
    setNewNote("");
    setNewTags("");
    setNewPriority("med");
  }

  function deleteTask(col: keyof BoardState, id: string) {
    setColumns(prev => ({ ...prev, [col]: prev[col].filter(t => t.id !== id) }));
  }

  function editTask(col: keyof BoardState, id: string, patch: Partial<Task>) {
    setColumns(prev => ({
      ...prev,
      [col]: prev[col].map(t => (t.id === id ? { ...t, ...patch } : t)),
    }));
  }

  return (
    <div className="board">
      <div className="boardHeader">
        <div className="addRow">
          <input
            className="input"
            placeholder="Add a task title..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input
            className="input noteInput"
            placeholder="Optional note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <input
            className="input noteInput"
            placeholder="tags (comma separated)"
            value={newTags}
            onChange={(e) => setNewTags(e.target.value)}
          />
          <select className="input noteInput" value={newPriority} onChange={e => setNewPriority(e.target.value as any)}>
            <option value="low">low</option>
            <option value="med">med</option>
            <option value="high">high</option>
          </select>
          <button className="primary" onClick={() => addTask("todo")}>Add to Todo</button>
        </div>
        <input
          className="input filter"
          placeholder="Filter tasks..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="columns">
        {[
          { key: "todo", label: "Todo" },
          { key: "inprogress", label: "In Progress" },
          { key: "done", label: "Complete" },
        ].map(col => (
          <div
            key={col.key}
            className="column"
            onDragOver={allowDrop}
            onDrop={(e) => onDrop(e, col.key)}
          >
            <div className="columnHeader">
              <span>{col.label}</span>
              <span className="count">{columns[col.key].length}</span>
            </div>
            <div className="cards">
              {filtered[col.key].map(task => (
                <article
                  key={task.id}
                  className="card"
                  draggable
                  onDragStart={(e) => onDragStart(e, col.key, task.id)}
                >
                  <div className="cardTitle" contentEditable suppressContentEditableWarning
                    onBlur={(e) => editTask(col.key as any, task.id, { title: e.currentTarget.textContent || "" })}
                  >{task.title}</div>

                  <div className="metaRow">
                    <div className={`pill priority ${task.priority || 'med'}`}>{task.priority || 'med'}</div>
                    <div className="tags">
                      {(task.tags || []).map(tag => (
                        <span key={tag} className="pill tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {task.note ? (
                    <div className="cardNote" contentEditable suppressContentEditableWarning
                      onBlur={(e) => editTask(col.key as any, task.id, { note: e.currentTarget.textContent || "" })}
                    >{task.note}</div>
                  ) : (
                    <button className="ghost tiny" onClick={() => editTask(col.key as any, task.id, { note: "" })}>Add note</button>
                  )}

                  <div className="cardActions">
                    <button className="ghost tiny" onClick={() => editTask(col.key as any, task.id, { priority: (task.priority==='high'?'med':task.priority==='med'?'low':'high') })}>Cycle priority</button>
                    <button className="ghost tiny danger" onClick={() => deleteTask(col.key as any, task.id)}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
