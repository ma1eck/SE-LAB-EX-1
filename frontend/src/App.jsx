import React, { useState } from "react";
import Column from "./Column";
import Header from "./Header";
// import AddColumn from "./AddColumn";

function App() {
  const [labels, setLabels] = useState(["Bug", "Feature", "Improvement"]);

  const [columns, setColumns] = useState([
    { id: "todo", name: "To Do" },
    { id: "inprogress", name: "In Progress" },
    { id: "done", name: "Done" },
  ]);

  const [notes, setNotes] = useState([]);
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
              notes={notes} // TODO: Pass filtered notes here instead of all notes
              setNotes={setNotes}
              labels={labels}
              confirmDeleteCol={() => confirmDeleteCol(col.id)}
              // TODO: Pass handleAddNote and handleMoveNote to Column component
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
