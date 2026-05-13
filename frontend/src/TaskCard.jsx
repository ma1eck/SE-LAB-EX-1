function TaskCard({
  note,
  prevColEn,
  colEn,
  nextColEn,
  columns,
  labels,
  onAddLabel,
  onDelete,
  onUpdate,
}) {
  return (
    <div className="taskCard">
      <p>
        <strong>Title:</strong> {note.title}
      </p>

      {/* Other task parameters (plain text) */}
      <p>
        <strong>ID:</strong> {note.id}
      </p>
      <p>
        <strong>Description:</strong> {note.description}
      </p>
      <p>
        <strong>Column:</strong> {colEn}
      </p>
      <p>
        <strong>Previous Column:</strong> {prevColEn ?? "None"}
      </p>
      <p>
        <strong>Next Column:</strong> {nextColEn ?? "None"}
      </p>
      <p>
        <strong>Labels:</strong> {note.labels?.join(", ") || "None"}
      </p>
      <p>
        <strong>Priority:</strong> {note.priority}
      </p>
      <p>
        <strong>Created At:</strong> {note.createdAt}
      </p>

      <button type="button" className="cancel-btn" onClick={onDelete}>
        ✖ Delete
      </button>
    </div>
  );
}

export default TaskCard;
