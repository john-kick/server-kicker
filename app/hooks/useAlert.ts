"use client";

import { useContext } from "react";
import { AlertContext } from "../provider/AlertProvider";

/**
 * Custom hook to trigger alerts using the AlertProvider context.
 * Must be used within an AlertProvider.
 */
export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }

  return context;
};
