import React from "react";

function Header({ filter, setFilter, sortBy, setSortBy }) {
  return (
    <header className="header-container" style={styles.header}>
      <div className="header-brand">
        <h1 style={styles.title}>📋 Kanban Board</h1>
      </div>

      <div className="header-actions" style={styles.actions}>
        <div className="search-wrapper" style={styles.searchWrapper}>
          <span style={styles.searchIcon} aria-label="search">
            🔍
          </span>
          <input
            id="filter-input"
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search tasks..."
            style={styles.searchInput}
          />
          {filter && (
            <button
              onClick={() => setFilter("")}
              style={styles.clearBtn}
              title="Clear search"
            >
              ✖
            </button>
          )}
        </div>

        {/* Placeholder for future features like settings or profile */}
        <div
          className="user-profile"
          style={styles.profileAvatar}
          title="User Profile"
        >
          👤
        </div>
      </div>
    </header>
  );
}

// Inline styles for immediate visual improvement
// (You can move these to your index.css or App.css later)
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#34495e",
    borderRadius: "20px",
    padding: "5px 15px",
    border: "1px solid #7f8c8d",
  },
  searchIcon: {
    marginRight: "8px",
    fontSize: "0.9rem",
  },
  searchInput: {
    border: "none",
    background: "transparent",
    color: "#fff",
    outline: "none",
    width: "200px",
    fontSize: "1rem",
  },
  clearBtn: {
    background: "transparent",
    border: "none",
    color: "#bdc3c7",
    cursor: "pointer",
    fontSize: "0.8rem",
    padding: "0",
    marginLeft: "8px",
  },
  profileAvatar: {
    fontSize: "1.5rem",
    cursor: "pointer",
    backgroundColor: "#34495e",
    padding: "5px",
    borderRadius: "50%",
  },
};

export default Header;
