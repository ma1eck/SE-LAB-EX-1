import React from "react";

function Header({ filter, setFilter, sortBy, setSortBy }) {
  return (
    <header
      style={{
        padding: "16px 30px",
        backgroundColor: "#0052cc",
        display: "flex",
        gap: "12px",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "white", margin: 0, flex: 1 }}>Kanban Board</h1>
      <input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ padding: "6px 10px", borderRadius: "4px", border: "none" }}
      />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{ padding: "6px 10px", borderRadius: "4px", border: "none" }}
      >
        <option value="">Default Order</option>
        <option value="title">Sort by Title</option>
        <option value="priority">Sort by Priority</option>
      </select>
    </header>
  );
}

export default Header;
