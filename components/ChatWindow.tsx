"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ChatWindowProps {
  onClose: () => void;
  onNewMessage?: () => void;
}

interface ChatMessage {
  sender: "bot" | "user";
  text: string;
}

const SUGGESTED_PROMPTS = [
  "What services do you offer?",
  "Can you design a website?",
  "Do you manage social media?",
  "How much do your services cost?",
  "Can I see your portfolio?",
];

export default function ChatWindow({ onClose, onNewMessage }: ChatWindowProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Hi — I'm Creative Surf’s virtual assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, typing]);

  const pushBot = (text: string) => {
    setMessages((prev) => [...prev, { sender: "bot", text }]);
    onNewMessage?.();
  };

  const pushUser = (text: string) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
  };

  const sendMessage = async (override: string | null = null) => {
    const msg = override ?? input;
    if (!msg.trim()) return;

    pushUser(msg);
    if (!override) setInput("");

    setTyping(true);

    try {
      const res = await fetch("https://creative-surf-backend.vercel.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();
      pushBot(data.reply ?? "I'm here to help!");
    } catch {
      pushBot("Something went wrong — please try again.");
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      <motion.div
        initial={!isMobile ? { opacity: 0, y: 20 } : {}}
        animate={!isMobile ? { opacity: 1, y: 0 } : {}}
        exit={{ opacity: 0 }}
        className="
          fixed bottom-24 right-6 z-[9999]
          w-80 h-96 lg:w-96 lg:h-[520px]
          rounded-2xl backdrop-blur-xl
          bg-[#0d0f16]/80 border border-white/10 shadow-2xl
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="px-4 py-3 rounded-t-2xl text-white bg-gradient-to-r from-cyan-500 to-purple-600 flex justify-between items-center">
          <div>
            <div className="font-semibold">Creative Surf AI</div>
            <div className="text-xs opacity-80">Virtual Support</div>
          </div>

          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
            <X size={18} />
          </button>
        </div>

        {/* SUGGESTED PROMPTS */}
        <div className="px-3 py-2 border-b border-white/10 bg-[#11131a]/60">
          <div className="flex gap-2 overflow-x-auto">
            {SUGGESTED_PROMPTS.map((p, i) => (
              <button
                key={i}
                onClick={() => sendMessage(p)}
                className="
                  px-3 py-1.5 rounded-xl text-sm whitespace-nowrap
                  bg-[#1a1d27] text-gray-200 border border-white/10
                "
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* MESSAGES */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] ${m.sender === "user" ? "ml-auto" : "mr-auto"}`}
            >
              <div
                className="px-4 py-2 rounded-xl text-sm"
                style={{
                  background:
                    m.sender === "user"
                      ? "linear-gradient(90deg,#00e5ff,#8b5cf6)"
                      : "rgba(255,255,255,0.05)",
                  color: "white",
                }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="mr-auto max-w-[80%]">
              <div className="px-4 py-2 rounded-xl bg-white/10 text-gray-200">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* INPUT AREA */}
        <div className="px-3 py-3 border-t border-white/10 bg-[#11131a]/60">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="
                flex-1 px-4 py-2 rounded-xl bg-[#1a1d27] text-white border border-white/10
                outline-none
              "
              placeholder="Type your message..."
            />
            <button
              onClick={() => sendMessage()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
            >
              Send
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
