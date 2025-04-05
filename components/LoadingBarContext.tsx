"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

type LoadingBarContextType = {
  progress: number
  setProgress: (progress: number) => void
}

const LoadingBarContext = createContext<LoadingBarContextType | undefined>(undefined)

export const LoadingBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState(0)

  return <LoadingBarContext.Provider value={{ progress, setProgress }}>{children}</LoadingBarContext.Provider>
}

export const useLoadingBar = () => {
  const context = useContext(LoadingBarContext)
  if (context === undefined) {
    throw new Error("useLoadingBar must be used within a LoadingBarProvider")
  }
  return context
}

