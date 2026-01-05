"use client";
import { useEffect, useState } from "react";
import { loadJSON, saveJSON } from "../lib/storage";

const STORAGE_KEY = "vibeTodos" as const;

type Todo = { id: string; text: string; done: boolean };

function uid() { return Math.random().toString(36).slice(2, 9); }

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => loadJSON<Todo[]>(STORAGE_KEY, [
    { id: "a1", text: "Review tasks", done: false },
  ]));
  const [text, setText] = useState("");

  useEffect(() => { saveJSON(STORAGE_KEY, todos); }, [todos]);

  function add() {
    const t = text.trim();
    if (!t) return;
    setTodos(prev => [...prev, { id: uid(), text: t, done: false }]);
    setText("");
  }

  function toggle(id) {
    setTodos(prev => prev.map(x => x.id === id ? { ...x, done: !x.done } : x));
  }

  function remove(id) {
    setTodos(prev => prev.filter(x => x.id !== id));
  }

  return (
    <section className="panel">
      <h2 className="panelTitle">Quick Todos</h2>
      <div className="row">
        <input className="input" placeholder="Add todo..." value={text} onChange={e => setText(e.target.value)} />
        <button className="primary" onClick={add}>Add</button>
      </div>
      <ul className="list">
        {todos.map(t => (
          <li key={t.id} className="listItem">
            <label className="checkbox">
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              <span className={t.done ? "strike" : ""}>{t.text}</span>
            </label>
            <button className="ghost tiny" onClick={() => remove(t.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
