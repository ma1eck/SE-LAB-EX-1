import React, { useState } from "react";
import Header from "./Header";
import Column from "./Column";

function App() {
  // TODO: Implement localStorage to persist columns, notes, and labels across page reloads.
  
  const [filter, setFilter] = useState("");
  
  const [columns, setColumns] = useState([
    { id: "todo", name: "To Do" },
    { id: "inProgress", name: "In Progress" },
    { id: "done", name: "Done" },
  ]);

  const [notes, setNotes] = useState([
    {
      id: "1",
      type: "todo", // matches column id
      title: "Sample Task",
      description: "This is a sample description.",
      labels: ["Feature"],
      priority: "Medium",
      createdAt: new Date().toLocaleDateString(),
    },
  ]);

  const [labels, setLabels] = useState(["Bug", "Feature", "Enhancement", "Documentation"]);

  // --- Functions ---

  const handleAddNote = (colId) => {
    const title = prompt("Enter task title:");
    if (!title) return;
    
    const description = prompt("Enter task description:") || "";
    
    const newNote = {
      id: Date.now().toString(),
      type: colId,
      title,
      description,
      labels: [],
      priority: "Low",
      createdAt: new Date().toLocaleDateString(),
    };
    
    setNotes((prev) => [...prev, newNote]);
  };

  const handleMoveNote = (noteId, targetColId) => {
    if (!targetColId) return;
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, type: targetColId } : note
      )
    );
  };

  const confirmDeleteCol = (colId) => {
    if (window.confirm("Are you sure you want to delete this column and all its tasks?")) {
      setColumns((prev) => prev.filter((col) => col.id !== colId));
      setNotes((prev) => prev.filter((note) => note.type !== colId));
    }
  };

  // TODO: Add advanced filtering and sorting mechanisms.
  // Apply text search filter to notes
  const displayedNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(filter.toLowerCase()) ||
      note.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="app-container" style={{ fontFamily: "sans-serif", backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
      <Header filter={filter} setFilter={setFilter} />

      {/* TODO: Add a button/UI to create new columns dynamically */}
      
      <main 
        className="board" 
        style={{ 
          display: "flex", 
          gap: "20px", 
          padding: "0 30px", 
          overflowX: "auto",
          alignItems: "flex-start" 
        }}
      >
        {columns.map((col) => (
          <div key={col.id} style={{ minWidth: "300px", backgroundColor: "#ebecf0", borderRadius: "8px", padding: "10px" }}>
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

      {/* TODO: Make footer links or layout more personalized later */}
      <footer style={{ textAlign: "center", padding: "20px", marginTop: "40px", color: "#7f8c8d" }}>
        <p>Developed by Developer 1 & Developer 2</p>
      </footer>
    </div>
  );
}

export default App;
