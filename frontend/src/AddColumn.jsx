import { useState } from "react";

function AddColumn({ setColumns }) {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  function handleAdd() {
    const trimmed = name.trim();
    if (!trimmed) return;
    setColumns((prev) => [
      ...prev,
      { id: trimmed.toLowerCase().replace(/\s+/g, "-"), name: trimmed },
    ]);
    setName("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button className="add-col-btn" onClick={() => setOpen(true)}>
        + Add Column
      </button>
    );
  }

  return (
    <div className="add-col-form">
      <input
        type="text"
        placeholder="Column name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        autoFocus
      />
      <button onClick={handleAdd}>Add</button>
      <button onClick={() => setOpen(false)}>Cancel</button>
    </div>
  );
}

export default AddColumn;
