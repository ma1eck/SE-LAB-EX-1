import TaskCard from "./TaskCard";

function Column({
  name,
  colEn,
  notes,
  setNotes,
  labels,
  confirmDeleteCol,
  handleAddNote,
  handleMoveNote,
}) {
  // Filter notes that belong to this column
  const filteredNotes = notes.filter((n) => n.type === colEn);

  function updateNote(id, updater) {
    setNotes((prev) => prev.map((n) => (n.id === id ? updater(n) : n)));
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function addLabel(label) {
    // You may want custom logic here
  }

  return (
    <div className="column" data-col={colEn}>
      <div className="col-header">
        <h2>{name}</h2>
        <button className="cancel-btn" onClick={confirmDeleteCol}>
          ✖
        </button>
      </div>

      {/* Render TaskCards here */}
      <div className="notes-container">
        {filteredNotes.map((note) => (
          <TaskCard
            key={note.id}
            note={note}
            prevColEn={null} // You can fix this logic later
            colEn={colEn}
            nextColEn={null} // You can fix this logic later
            columns={[]} // If needed later
            labels={labels}
            onAddLabel={addLabel}
            onDelete={() => deleteNote(note.id)}
            onUpdate={(updater) => updateNote(note.id, updater)}
          />
        ))}
      </div>

      <button className="add-note-btn" onClick={handleAddNote}>
        + Add Note
      </button>
    </div>
  );
}

export default Column;
