import React from "react";

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
  onMove,
}) {
  return (
    <div
      className="taskCard"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
        backgroundColor: "#fff",
      }}
    >
      <p>
        <strong>Title:</strong> {note.title}
      </p>
      <p>
        <strong>Description:</strong> {note.description}
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

      {/* Movement Buttons */}
      <div
        className="card-actions"
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
        }}
      >
        <button
          onClick={() => onMove(prevColEn)}
          disabled={!prevColEn}
          title="Move Left"
        >
          &larr; Move
        </button>
        <button
          onClick={() => onMove(nextColEn)}
          disabled={!nextColEn}
          title="Move Right"
        >
          Move &rarr;
        </button>
      </div>

      <button
        type="button"
        className="cancel-btn"
        onClick={onDelete}
        style={{ color: "red", width: "100%", marginTop: "5px" }}
      >
        ✖ Delete
      </button>
    </div>
  );
}
export default TaskCard;
