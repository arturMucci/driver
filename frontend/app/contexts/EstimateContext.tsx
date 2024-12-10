"use Client";
import { createContext } from "react";
import { IEstimateFormContext } from "../interfaces";

export const EstimateFormContext = createContext<
  IEstimateFormContext | undefined
>(undefined);
