import React, { useState, useEffect } from "react";
import Header from "./Header";
import Column from "./Column";
import LightDark from "./LightDark";

const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 };

function App() {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const initialColumns = [
    { id: "todo", name: "To Do" },
    { id: "inProgress", name: "In Progress" },
    { id: "done", name: "Done" },
  ];

  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("columns");
    return saved ? JSON.parse(saved) : initialColumns;
  });

  const [notes, setNotes] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("notes") || "[]");
    return saved.filter((n) => typeof n === "object" && n !== null && n.id);
  });

  const [labels] = useState(["Bug", "Feature", "Enhancement", "Documentation"]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  const handleAddNote = (colId) => {
    const title = prompt("Enter task title:");
    if (!title) return;
    const description = prompt("Enter task description:") || "";
    setNotes((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: colId,
        title,
        description,
        labels: [],
        priority: "Low",
        createdAt: new Date().toLocaleDateString(),
      },
    ]);
  };

  const handleMoveNote = (noteId, targetColId) => {
    if (!targetColId) return;
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, type: targetColId } : note,
      ),
    );
  };

  const confirmDeleteCol = (colId) => {
    if (window.confirm("Delete this column and all its tasks?")) {
      setColumns((prev) => prev.filter((col) => col.id !== colId));
      setNotes((prev) => prev.filter((note) => note.type !== colId));
    }
  };

  const displayedNotes = notes
    .filter(
      (note) =>
        note?.title?.toLowerCase().includes(filter.toLowerCase()) ||
        note?.description?.toLowerCase().includes(filter.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "priority")
        return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      return 0;
    });

  return (
    <div
      className="app-container"
      style={{
        fontFamily: "sans-serif",
        backgroundColor: "#f4f5f7",
        minHeight: "100vh",
      }}
    >
      <LightDark />
      <Header
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <main
        className="board"
        style={{
          display: "flex",
          gap: "20px",
          padding: "0 30px",
          overflowX: "auto",
          alignItems: "flex-start",
        }}
      >
        {columns.map((col) => (
          <div
            key={col.id}
            style={{
              minWidth: "300px",
              backgroundColor: "#ebecf0",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <Column
              name={col.name}
              colEn={col.id}
              notes={displayedNotes}
              setNotes={setNotes}
              labels={labels}
              columns={columns}
              confirmDeleteCol={() => confirmDeleteCol(col.id)}
              handleAddNote={() => handleAddNote(col.id)}
              handleMoveNote={handleMoveNote}
            />
          </div>
        ))}
      </main>
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          marginTop: "40px",
          color: "#7f8c8d",
        }}
      >
        <p>Developed by Developer 1 & Developer 2</p>
      </footer>
    </div>
  );
}

export default App;
