"use client";
import React, { useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { IProviderProps } from "../interfaces";

export function ThemeProvider({ children }: IProviderProps) {
  const [theme, setTheme] = useState("");

  const bundler = {
    theme,
    setTheme: () => setTheme,
  };

  return (
    <ThemeContext.Provider value={bundler}>{children}</ThemeContext.Provider>
  );
}
