import { FC } from "react";
import { IProviderProps } from "../interfaces";
import { EstimateFormProvider } from "./EstimateForm.provider";
import { ThemeProvider } from "./Theme.Provider";

export const ProviderBundler: FC<IProviderProps> = ({ children }) => {
  return (
    <EstimateFormProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </EstimateFormProvider>
  );
};
