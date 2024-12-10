import React from "react";
import { useEstimateForm } from "../hooks/useEstimate.context";

export default function ErrorToast() {
  const { message, error } = useEstimateForm();

  return (
    <span
      className={`${
        error ? "" : "shadow-none bg-transparent"
      } items-center gap-[2rem] w-full justify-center text-red-500 rounded-md py-[0.5rem] px-[1rem] shadow-[0rem_0.3rem_0.5rem_0_rgb(150,150,150)]`}
    >
      <span className={`${error ? "" : "text-transparent"}`}>{message}</span>
    </span>
  );
}
