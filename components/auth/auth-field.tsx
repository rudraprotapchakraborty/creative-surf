"use client"

import { useState, type ComponentType } from "react"
import { Eye, EyeOff } from "lucide-react"

interface AuthFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: "text" | "email" | "password"
  placeholder?: string
  autoComplete?: string
  required?: boolean
  hint?: string
  icon?: ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
}

/** Labelled input matching the glass card styling, with a reveal toggle for passwords. */
export function AuthField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
  hint,
  icon: Icon,
}: AuthFieldProps) {
  const [revealed, setRevealed] = useState(false)
  const isPassword = type === "password"
  const inputType = isPassword && revealed ? "text" : type

  return (
    <div>
      <label
        className="block text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: "rgb(var(--flow-text-soft))" }}
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40"
            style={{ color: "rgb(var(--flow-text))" }}
          />
        )}
        <input
          type={inputType}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} ${isPassword ? "pr-12" : "pr-4"} py-3 rounded-xl text-sm outline-none transition-all duration-200`}
          style={{
            background: "rgb(var(--flow-surface) / 0.8)",
            border: "1px solid var(--flow-border-strong)",
            color: "rgb(var(--flow-text))",
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed(v => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70 transition-opacity"
            tabIndex={-1}
          >
            {revealed ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {hint && (
        <p className="text-xs mt-1.5" style={{ color: "rgb(var(--flow-text-soft))" }}>
          {hint}
        </p>
      )}
    </div>
  )
}
