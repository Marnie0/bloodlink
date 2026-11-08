import { createContext, useContext } from "react";

export const DonorContext = createContext(null);

export function useDonor() {
  const context = useContext(DonorContext);
  if (!context)
    throw new Error("Donor pages must be rendered inside DonorLayout.");
  return context;
}
