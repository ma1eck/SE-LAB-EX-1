import React, { useState } from "react";
import pencilSvg from "./assets/icons/pencil.svg";

export default function TaskCard({ note, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: note.title || "",
    dueDate: note.dueDate || "",
    description: note.description || "",
  });

  const editButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
  };

  const cardStyle = {
    position: "relative",
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "16px",
    marginBottom: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    backgroundColor: "white",
    maxWidth: "400px",
  };

  function handleSave() {
    // FIX: Pass only the updated object, NOT the note.id as the first argument
    onUpdate({
      ...note,
      ...editedTask,
    });
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedTask({
      title: note.title || "",
      dueDate: note.dueDate || "",
      description: note.description || "",
    });
    setIsEditing(false);
  }

  return (
    <div style={cardStyle}>
      {!isEditing && (
        <>
          <h3>{note.title}</h3>
          <p>
            <strong>Due Date:</strong> {note.dueDate}
          </p>
          <p>{note.description}</p>

          <button
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
            title="Edit task"
            style={editButtonStyle}
          >
            <img src={pencilSvg} alt="Edit" width={18} height={18} />
          </button>
        </>
      )}

      {isEditing && (
        <>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Title"
            style={{ width: "100%", marginBottom: "8px", fontSize: "16px" }}
          />
          <input
            type="date"
            value={editedTask.dueDate}
            onChange={(e) =>
              setEditedTask((prev) => ({ ...prev, dueDate: e.target.value }))
            }
            style={{ width: "100%", marginBottom: "8px", fontSize: "16px" }}
          />
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Description"
            rows={4}
            style={{ width: "100%", fontSize: "14px" }}
          />

          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button onClick={handleSave} style={{ cursor: "pointer" }}>
              Save
            </button>
            <button onClick={handleCancel} style={{ cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
