"use client";
import React, { useState } from "react";
import { IProviderProps } from "../interfaces";
import { EstimateFormContext } from "../contexts";
import { IEstimateForm } from "../interfaces/IEstimateFormContext";

export function EstimateFormProvider({ children }: IProviderProps) {
  const [formData, setFormData] = useState({
    customerId: "",
    origin: "",
    destination: "",
  });
  const [resData, setResData] = useState<unknown>();
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState(false);

  const bundler = {
    formData,
    message,
    error,
    resData,
    setFormData: (data: IEstimateForm) => setFormData(data),
    setMessage: (message: string) => setMessage(message),
    setError: (Error: boolean) => setError(Error),
    setResData: (data: unknown) => setResData(data),
  };

  return (
    <EstimateFormContext.Provider value={bundler}>
      {children}
    </EstimateFormContext.Provider>
  );
}
