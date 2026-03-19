"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";

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
];

export default function ChatWindow({ onClose, onNewMessage }: ChatWindowProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Hi! I'm the Creative Surf assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
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
    <motion.div
      initial={!isMobile ? { opacity: 0, y: 30, scale: 0.95 } : { y: "100%" }}
      animate={!isMobile ? { opacity: 1, y: 0, scale: 1 } : { y: 0 }}
      exit={!isMobile ? { opacity: 0, y: 20, scale: 0.95 } : { y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="
        fixed bottom-24 right-6 z-[9999]
        w-[85vw] max-w-[380px] h-[550px] max-h-[75vh]
        rounded-3xl backdrop-blur-2xl
        bg-[#06080F]/90 border border-white/[0.08] shadow-[0_0_40px_rgba(0,0,0,0.5)]
        flex flex-col overflow-hidden
      "
    >
      {/* HEADER */}
      <div className="px-6 py-5 border-b border-white/[0.05] bg-white/[0.02] flex justify-between items-center relative overflow-hidden">
        {/* Subtle glow in header */}
        <div className="absolute top-0 left-1/4 w-1/2 h-full bg-cyan-500/10 blur-[20px] rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.05] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-white font-medium text-sm">CreativeAI</div>
            <div className="text-xs text-gray-400 font-light flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </div>
          </div>
        </div>

        <button 
          onClick={onClose} 
          className="relative z-10 p-2 text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-full transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* SUGGESTED PROMPTS */}
      <div className="px-4 py-3 border-b border-white/[0.02] bg-[#06080F]">
        <div className="flex flex-wrap gap-2 pb-1">
          {SUGGESTED_PROMPTS.map((p, i) => (
            <button
              key={i}
              onClick={() => sendMessage(p)}
              className="
                px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors
                bg-white/[0.03] text-gray-300 border border-white/[0.05] hover:bg-white/[0.08] hover:text-white
              "
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* MESSAGES */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`max-w-[85%] flex flex-col ${m.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
            >
              <div
                className={`
                  px-5 py-3 rounded-2xl text-[14px] leading-relaxed shadow-sm
                  ${m.sender === "user" 
                    ? "bg-white text-black rounded-br-sm font-medium" 
                    : "bg-white/[0.04] border border-white/[0.05] text-gray-200 rounded-bl-sm font-light"
                  }
                `}
              >
                {m.text}
              </div>
            </motion.div>
          ))}

          {typing && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mr-auto max-w-[80%]"
            >
              <div className="px-5 py-4 rounded-2xl rounded-bl-sm bg-white/[0.04] border border-white/[0.05] flex items-center gap-1.5">
                <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* INPUT AREA */}
      <div className="p-4 bg-white/[0.02] border-t border-white/[0.05]">
        <div className="relative flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="
              w-full pl-5 pr-14 py-3.5 rounded-full 
              bg-white/[0.05] text-white placeholder-gray-500 text-sm font-light
              border border-white/[0.1] focus:border-cyan-500/50 focus:bg-white/[0.08]
              outline-none transition-all shadow-inner
            "
            placeholder="Ask me anything..."
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            className="
              absolute right-2 top-1/2 -translate-y-1/2
              w-9 h-9 rounded-full bg-white text-black flex items-center justify-center
              hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors
            "
          >
            <Send size={16} className={input.trim() ? "translate-x-0.5" : ""} />
          </button>
        </div>
      </div>
      
    </motion.div>
  );
}
