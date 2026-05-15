import { useEffect, useState } from "react";

const THEME_KEY = "app-theme";

export default function LightDark() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);

    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const startTheme = prefersDark ? "dark" : "light";
      setTheme(startTheme);
      applyTheme(startTheme);
    }
  }, []);

  function applyTheme(newTheme) {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(newTheme);
  }

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  }

  return (
    <button onClick={toggleTheme} className="themeToggleBtn">
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
