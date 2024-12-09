"use client";
import { createContext } from "react";
import { IThemeContext } from "../interfaces";

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);
