import React, { useState } from "react";
import Column from "./Column";
import Header from "./Header";
import AddColumn from "./AddColumn";

function App() {
  const [labels, setLabels] = useState(["Bug", "Feature", "Improvement"]);

  const [columns, setColumns] = useState([
    { id: "todo", name: "To Do" },
    { id: "inprogress", name: "In Progress" },
    { id: "done", name: "Done" },
  ]);

  const [notes, setNotes] = useState([
    {
      id: "n1",
      title: "Fix login bug",
      description: "User cannot log in with Google OAuth.",
      type: "todo",
      labels: ["Bug"],
      priority: "High",
      createdAt: "2026-05-10",
    },
    {
      id: "n2",
      title: "Add dark mode",
      description: "Implement theme switcher UI.",
      type: "inprogress",
      labels: ["Feature"],
      priority: "Medium",
      createdAt: "2026-05-11",
    },
    {
      id: "n3",
      title: "Optimize dashboard load time",
      description: "Reduce API calls and caching improvements.",
      type: "inprogress",
      labels: ["Improvement"],
      priority: "Low",
      createdAt: "2026-05-09",
    },
    {
      id: "n4",
      title: "Refactor task-card component",
      description: "Clean old props and unused hooks.",
      type: "done",
      labels: ["Improvement"],
      priority: "Low",
      createdAt: "2026-05-05",
    },
  ]);

  const [filter, setFilter] = useState("");

  // TODO: Implement localStorage hook or useEffect to save/load notes and columns

  function confirmDeleteCol(colId) {
    if (window.confirm("Are you sure you want to delete this column?")) {
      setColumns((prev) => prev.filter((c) => c.id !== colId));
      // TODO: Decide what happens to notes in a deleted column (delete them or move them?)
    }
  }

  // TODO: Create function to handle adding a new note
  // function handleAddNote(text, colId) { ... }

  // TODO: Create function to handle moving notes between columns (drag and drop or buttons)
  // function handleMoveNote(noteId, newColId) { ... }

  return (
    <div className="App">
      <header>
        <Header filter={filter} setFilter={setFilter} />
        {/* TODO: Implement filtering logic to only show notes matching the filter state */}
      </header>

      <main>
        <div className="row">
          {columns.map((col) => (
            <Column
              key={col.id}
              name={col.name}
              colEn={col.id}
              notes={notes}
              setNotes={setNotes}
              labels={labels}
              columns={columns}
              confirmDeleteCol={() => confirmDeleteCol(col.id)}
              handleAddNote={() => handleAddNote(col.id)}
            />
          ))}
        </div>

        <AddColumn setColumns={setColumns} />
      </main>

      <footer>
        <p>Software Engineering Lab - Spring 1405</p>
        {/* TODO: change later */}
      </footer>
    </div>
  );
}

export default App;
