import React from "react";
import TaskCard from "./TaskCard";

function Column({
  name,
  colEn,
  notes,
  setNotes,
  labels,
  columns,
  confirmDeleteCol,
  handleAddNote,
  handleMoveNote,
}) {
  // Filter notes that belong to this specific column
  const filteredNotes = notes.filter((n) => n.type === colEn);

  // Derive prev/next column IDs from the ordered columns array
  const colIndex = columns.findIndex((c) => c.id === colEn);
  const prevColEn = colIndex > 0 ? columns[colIndex - 1].id : null;
  const nextColEn =
    colIndex < columns.length - 1 ? columns[colIndex + 1].id : null;

  function updateNote(id, updater) {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? typeof updater === "function"
            ? updater(n)
            : updater
          : n,
      ),
    );
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function addLabel(noteId, label) {
    updateNote(noteId, (n) => ({
      ...n,
      labels: n.labels?.includes(label)
        ? n.labels
        : [...(n.labels ?? []), label],
    }));
  }

  return (
    <div
      className="column"
      data-col={colEn}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const noteId = e.dataTransfer.getData("text/plain");
        if (noteId) {
          handleMoveNote(noteId, colEn);
        }
      }}
    >
      <div className="col-header">
        <h2>{name}</h2>
        <button
          className="cancel-btn"
          onClick={confirmDeleteCol}
          title="Delete Column"
        >
          ✖
        </button>
      </div>

      <div className="notes-container">
        {filteredNotes.length === 0 ? (
          <p className="empty-message">No tasks here</p>
        ) : (
          filteredNotes.map((note) => (
            <TaskCard
              key={note.id}
              note={note}
              prevColEn={prevColEn}
              colEn={colEn}
              nextColEn={nextColEn}
              columns={columns}
              labels={labels}
              onAddLabel={(label) => addLabel(note.id, label)}
              onDelete={() => deleteNote(note.id)}
              onUpdate={(updater) => updateNote(note.id, updater)}
              onMove={(newColId) => handleMoveNote(note.id, newColId)}
            />
          ))
        )}
      </div>

      <button className="add-note-btn" onClick={handleAddNote}>
        + Add Note
      </button>
    </div>
  );
}

export default Column;
