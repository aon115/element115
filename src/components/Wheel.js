import React, { useRef, useState } from "react";

// Prize segments for the wheel
const PRIZES = [
  { label: "1 TON", color: "#FFD700" },
  { label: "No Win", color: "#888" },
  { label: "5 Tickets", color: "#4caf50" },
  { label: "0.1 TON", color: "#00bcd4" },
  { label: "No Win", color: "#888" },
  { label: "2 TON", color: "#ff9800" },
  { label: "No Win", color: "#888" },
  { label: "10 Tickets", color: "#e91e63" },
];

// Helper to get a random prize index (weighted for demo)
function getRandomPrizeIndex() {
  // More "No Win" slots for demo
  const weights = [1, 3, 1, 2, 3, 1, 3, 1];
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    if (r < weights[i]) return i;
    r -= weights[i];
  }
  return 0;
}

// Wheel component: handles spinning logic and animation
export default function Wheel({ user, setUser }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef();

  // Handle spin action
  const handleSpin = () => {
    if (spinning || user.tickets < 1) return;
    setSpinning(true);
    setResult(null);

    // Pick prize
    const prizeIndex = getRandomPrizeIndex();
    const spins = 5; // Full spins before stopping
    const degPerSlice = 360 / PRIZES.length;
    const finalDeg = 360 * spins + (360 - prizeIndex * degPerSlice - degPerSlice / 2);

    // Animate wheel
    wheelRef.current.style.transition = "transform 3s cubic-bezier(.17,.67,.83,.67)";
    wheelRef.current.style.transform = `rotate(${finalDeg}deg)`;

    setTimeout(() => {
      setSpinning(false);
      setResult(PRIZES[prizeIndex].label);

      // Update user tickets and balance (mock)
      setUser((u) => {
        let newTickets = u.tickets - 1;
        let newTon = u.tonBalance;
        if (PRIZES[prizeIndex].label === "1 TON") newTon += 1;
        if (PRIZES[prizeIndex].label === "2 TON") newTon += 2;
        if (PRIZES[prizeIndex].label === "0.1 TON") newTon += 0.1;
        if (PRIZES[prizeIndex].label === "5 Tickets") newTickets += 5;
        if (PRIZES[prizeIndex].label === "10 Tickets") newTickets += 10;
        return { ...u, tickets: newTickets, tonBalance: Math.round(newTon * 1000) / 1000 };
      });

      // Reset wheel position for next spin
      setTimeout(() => {
        wheelRef.current.style.transition = "none";
        wheelRef.current.style.transform = `rotate(${(360 - prizeIndex * degPerSlice - degPerSlice / 2) % 360}deg)`;
      }, 500);
    }, 3000);
  };

  return (
    <div>
      <div style={{ margin: "0 auto", width: 260, height: 260, position: "relative" }}>
        <div
          ref={wheelRef}
          style={{
            width: 260,
            height: 260,
            borderRadius: "50%",
            border: "8px solid #222",
            boxShadow: "0 4px 24px #0008",
            position: "absolute",
            top: 0,
            left: 0,
            background: "#222",
            transition: "transform 0s",
          }}
        >
          <svg width="260" height="260" style={{ borderRadius: "50%" }}>
            {PRIZES.map((prize, i) => {
              const startAngle = (i * 360) / PRIZES.length;
              const endAngle = ((i + 1) * 360) / PRIZES.length;
              const largeArc = endAngle - startAngle > 180 ? 1 : 0;
              const r = 120;
              const x1 = 130 + r * Math.cos((Math.PI * startAngle) / 180);
              const y1 = 130 + r * Math.sin((Math.PI * startAngle) / 180);
              const x2 = 130 + r * Math.cos((Math.PI * endAngle) / 180);
              const y2 = 130 + r * Math.sin((Math.PI * endAngle) / 180);
              return (
                <path
                  key={i}
                  d={`M130,130 L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`}
                  fill={prize.color}
                  stroke="#fff"
                  strokeWidth="2"
                />
              );
            })}
            {PRIZES.map((prize, i) => {
              const angle = ((i + 0.5) * 360) / PRIZES.length;
              const x = 130 + 80 * Math.cos((Math.PI * angle) / 180);
              const y = 130 + 80 * Math.sin((Math.PI * angle) / 180);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontSize="16"
                  fill="#222"
                  transform={`rotate(${angle},${x},${y})`}
                  style={{ fontWeight: "bold" }}
                >
                  {prize.label}
                </text>
              );
            })}
          </svg>
        </div>
        {/* Pointer */}
        <div
          style={{
            position: "absolute",
            top: -18,
            left: 120,
            width: 20,
            height: 36,
            background: "none",
            zIndex: 2,
          }}
        >
          <svg width="20" height="36">
            <polygon points="10,0 20,36 0,36" fill="#FFD700" stroke="#222" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div style={{ margin: "24px 0 8px", textAlign: "center" }}>
        <button
          onClick={handleSpin}
          disabled={spinning || user.tickets < 1}
          style={{
            fontSize: 20,
            padding: "12px 32px",
            borderRadius: 12,
            border: "none",
            background: spinning || user.tickets < 1 ? "#888" : "#FFD700",
            color: "#222",
            fontWeight: "bold",
            cursor: spinning || user.tickets < 1 ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px #0004",
            transition: "background 0.2s",
          }}
        >
          {spinning ? "Spinning..." : "Spin"}
        </button>
      </div>
      <div style={{ textAlign: "center", minHeight: 32 }}>
        {user.tickets < 1 && <span style={{ color: "#e91e63" }}>No tickets left. Buy more or wait for daily free spin.</span>}
        {result && <span style={{ color: "#4caf50", fontWeight: "bold" }}>Result: {result}</span>}
      </div>
      <div style={{ textAlign: "center", marginTop: 12, color: "#aaa" }}>
        Tickets: <b>{user.tickets}</b> | TON: <b>{user.tonBalance}</b>
      </div>
    </div>
  );
} 