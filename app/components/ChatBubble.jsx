"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ChatBubble() {
  const [portal, setPortal] = useState(null);

  useEffect(() => {
    let root = document.getElementById("chat-portal");
    if (!root) {
      root = document.createElement("div");
      root.id = "chat-portal";
      document.body.appendChild(root);
    }
    setPortal(root);
  }, []);

  if (!portal) return null;
  return createPortal(<ChatUI />, portal);
}

function ChatUI() {
  const icon =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/1200px-Google_Gemini_icon_2025.svg.png";

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);

  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! How can I help you? 🌟" },
  ]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const botMsg = { role: "bot", text: "" };
    setMessages((prev) => [...prev, botMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      const data = await res.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text = data.reply;
        return updated;
      });

    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text = "Error reading reply.";
        return updated;
      });
    }
  }

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 999999999999,
          pointerEvents: "auto",
        }}
        className="
          w-16 h-16 
          rounded-full bg-white/20 backdrop-blur-xl 
          border border-white/30 shadow-xl 
          flex items-center justify-center 
          transition hover:scale-110
        "
      >
        <img src={icon} className="w-10 h-10" />
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",     // ✔️ This is what keeps your chat ALWAYS bottom
            right: "24px",
            width: "90%",        // 📱 Auto shrink on mobile
            maxWidth: "370px",
            maxHeight: "70vh",   // 📱 Prevents overflow on any screen
            zIndex: 999999999999,
            pointerEvents: "auto",
          }}
          className="
            rounded-xl bg-[#0f172a]/95 text-white 
            shadow-xl border border-white/10 
            backdrop-blur-xl flex flex-col
          "
        >
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 flex justify-between">
            <span className="font-semibold flex gap-2 items-center">
              <img src={icon} className="w-6 h-6" /> Gemini Assistant
            </span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div ref={bodyRef} className="p-4 flex-1 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] ${
                    m.role === "user" ? "bg-blue-600" : "bg-white/10"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="p-3 flex gap-2 bg-black/30">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-white/10 rounded-lg outline-none"
              placeholder="Ask me anything..."
            />
            <button className="bg-blue-600 px-4 rounded-lg">Send</button>
          </form>
        </div>
      )}
    </>
  );
}
