import { useContext } from "react";
import { EstimateFormContext } from "../contexts";

export function useEstimateForm() {
  const context = useContext(EstimateFormContext);

  if (!context) {
    throw new Error("useEstimateForm must be used within a CounterProvider");
  }

  return context;
}
