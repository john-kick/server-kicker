"use client";

import React, { createContext, ReactNode, useState } from "react";
import Alert, { AlertType } from "../components/Alert";

type AlertMessage = {
  id: string;
  type: AlertType;
  message: React.ReactNode;
  dismissible?: boolean;
  autoDismiss?: number; // Duration in seconds
};

type AlertContextType = {
  showAlert: (
    type: AlertType,
    message: React.ReactNode,
    dismissible?: boolean,
    autoDismiss?: number
  ) => void;
  clearAlerts: () => void;
};

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

let alertIdCounter = 0;

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const showAlert = (
    type: AlertType,
    message: React.ReactNode,
    dismissible = true,
    autoDismiss?: number
  ) => {
    const id = `alert-${alertIdCounter++}`;
    setAlerts((prev) => [
      { id, type, message, dismissible, autoDismiss },
      ...prev
    ]);

    if (autoDismiss) {
      setTimeout(() => handleDismiss(id), autoDismiss * 1000);
    }
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  const handleDismiss = (id: string) => {
    // Add "alert-leave" class for animation
    document.getElementById(id)?.classList.add("alert-leave");

    // Delay removal to allow animation to complete
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 300); // Matches animation duration
  };

  return (
    <AlertContext.Provider value={{ showAlert, clearAlerts }}>
      {children}
      <div className="alert-wrapper">
        {alerts.map((alert) => (
          <Alert
            id={alert.id}
            key={alert.id}
            type={alert.type}
            dismissible={alert.dismissible}
            onDismiss={() => handleDismiss(alert.id)}
          >
            {alert.message}
          </Alert>
        ))}
      </div>
    </AlertContext.Provider>
  );
};
