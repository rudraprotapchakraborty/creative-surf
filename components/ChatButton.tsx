"use client";

import { useState } from "react";
import { X, MessageSquareText } from "lucide-react";
import ChatWindow from "./ChatWindow";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface ChatButtonProps {}

const ChatButton: React.FC<ChatButtonProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState<boolean>(false);
  const [hasNewMessage, setHasNewMessage] = useState<boolean>(false);

  const toggleChat = () => {
    if (!hasOpenedOnce) setHasOpenedOnce(true);
    setOpen((prev) => !prev);

    // Clear notification when chat opens
    if (!open) setHasNewMessage(false);
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      {/* FIXED WRAPPER */}
      <div className="fixed bottom-6 right-6 z-[10000] flex flex-col items-end gap-3">

        {/* “Click Me” bubble (first time only) */}
        {!hasOpenedOnce && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 1 // delay slightly so it pops up after page load
            }}
            className="
              px-4 py-2.5 rounded-2xl rounded-br-sm shadow-[0_0_20px_rgba(0,0,0,0.3)] 
              bg-white text-black font-medium text-sm
              border border-white/40 pointer-events-none relative
            "
          >
            Ask AI Assistant
          </motion.div>
        )}

        {/* MAIN BUTTON */}
        <motion.button
          onClick={toggleChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            w-14 h-14 rounded-full relative 
            bg-[#06080F]/90 backdrop-blur-xl
            border border-white/[0.15] shadow-[0_0_30px_rgba(0,200,255,0.15)]
            flex items-center justify-center text-white
            hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,200,255,0.3)] transition-all duration-300
          "
        >
          {/* Notification Dot */}
          {hasNewMessage && !open && (
            <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,234,255,0.8)] border-2 border-[#06080F]"></div>
          )}

          {/* First-time dot */}
          {!hasOpenedOnce && !open && !hasNewMessage && (
            <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,234,255,0.8)] border-2 border-[#06080F] animate-pulse"></div>
          )}

          {/* ICON SWITCH */}
          <AnimatePresence mode="wait">
            {!open ? (
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <img
                  src="/chatgpt.png"
                  alt="Chat Icon"
                  className="w-8 h-8 object-contain brightness-0 invert" 
                />
              </motion.div>
            ) : (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={26} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <ChatWindow
            onClose={toggleChat}
            onNewMessage={() => {
              if (!open) setHasNewMessage(true);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatButton;
