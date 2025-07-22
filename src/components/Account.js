import React from "react";

// Account section: shows tickets, TON balance, and mock deposit/withdraw
export default function Account({ user }) {
  return (
    <div style={{ textAlign: "center", marginTop: 32 }}>
      <h2>Account</h2>
      <div style={{ margin: "16px 0", fontSize: 18 }}>
        <div>Tickets: <b>{user.tickets}</b></div>
        <div>TON Balance: <b>{user.tonBalance}</b></div>
      </div>
      <div style={{ margin: "24px 0", color: "#aaa" }}>
        <button
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            border: "none",
            background: "#00bcd4",
            color: "#fff",
            fontWeight: "bold",
            marginRight: 12,
            cursor: "not-allowed",
            opacity: 0.7,
          }}
          disabled
        >
          Deposit (Coming Soon)
        </button>
        <button
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            border: "none",
            background: "#e91e63",
            color: "#fff",
            fontWeight: "bold",
            cursor: "not-allowed",
            opacity: 0.7,
          }}
          disabled
        >
          Withdraw (Coming Soon)
        </button>
      </div>
      <div style={{ color: "#aaa", fontSize: 14 }}>
        Your account is linked to your Telegram ID.<br />
        More features coming soon!
      </div>
    </div>
  );
} 