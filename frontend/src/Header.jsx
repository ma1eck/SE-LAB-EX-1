import React from "react";

function Header({ filter, setFilter }) {
  return (
    <div className="header-container">
      <h1>Kanban Board</h1>
      <div className="filter-section">
        <label htmlFor="filter-input">Filter: </label>
        <input
          id="filter-input"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search notes..."
        />
        {/* TODO: Add logic/buttons for sorting if needed */}
      </div>
    </div>
  );
}

export default Header;
