import React from "react";

// Simple SVG icons for menu
const icons = {
  spin: (
    <svg width="28" height="28" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="12" fill="#FFD700" stroke="#222" strokeWidth="2"/>
      <path d="M14 4v6M14 18v6M4 14h6M18 14h6" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  account: (
    <svg width="28" height="28" viewBox="0 0 28 28">
      <circle cx="14" cy="10" r="6" fill="#00bcd4" stroke="#222" strokeWidth="2"/>
      <rect x="5" y="18" width="18" height="6" rx="3" fill="#00bcd4" stroke="#222" strokeWidth="2"/>
    </svg>
  ),
  invite: (
    <svg width="28" height="28" viewBox="0 0 28 28">
      <rect x="4" y="8" width="20" height="12" rx="4" fill="#e91e63" stroke="#222" strokeWidth="2"/>
      <path d="M4 8l10 8 10-8" stroke="#222" strokeWidth="2" fill="none"/>
    </svg>
  ),
};

// Bottom menu navigation
export default function Menu({ section, setSection }) {
  return (
    <nav
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        background: "#222",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: 64,
        borderTop: "1px solid #333",
        zIndex: 10,
      }}
    >
      {["spin", "account", "invite"].map((key) => (
        <button
          key={key}
          onClick={() => setSection(key)}
          style={{
            background: "none",
            border: "none",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: section === key ? "#FFD700" : "#aaa",
            fontWeight: section === key ? "bold" : "normal",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          {icons[key]}
          <span style={{ marginTop: 2 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
        </button>
      ))}
    </nav>
  );
} 