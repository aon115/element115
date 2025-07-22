import React, { useState } from "react";
import Wheel from "./components/Wheel";
import Menu from "./components/Menu";
import Account from "./components/Account";
import Invite from "./components/Invite";

// Main App component: handles menu navigation and user state
export default function App() {
  // "spin", "account", "invite"
  const [section, setSection] = useState("spin");

  // Mock user data for MVP
  const [user, setUser] = useState({
    id: "123456",
    username: "telegram_user",
    tickets: 1,
    tonBalance: 0.0,
  });

  return (
    <div style={{ minHeight: "100vh", background: "#181c24", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 400, margin: "0 auto", paddingBottom: 80 }}>
        <h1 style={{ textAlign: "center", margin: "24px 0 8px" }}>Spin to Win TON</h1>
        <p style={{ textAlign: "center", marginBottom: 24, color: "#aaa" }}>
          Try your luck! 1 free spin daily. More spins with TON or Stars.
        </p>
        {section === "spin" && <Wheel user={user} setUser={setUser} />}
        {section === "account" && <Account user={user} />}
        {section === "invite" && <Invite />}
      </div>
      <Menu section={section} setSection={setSection} />
    </div>
  );
} 