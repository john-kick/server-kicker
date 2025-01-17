"use client";

import React, { createContext, useState, ReactNode } from "react";
import Alert, { AlertType } from "../components/Alert";

type AlertMessage = {
  id: string;
  type: AlertType;
  message: React.ReactNode;
  dismissible?: boolean;
};

type AlertContextType = {
  showAlert: (
    type: AlertType,
    message: React.ReactNode,
    dismissible?: boolean
  ) => void;
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
    dismissible = true
  ) => {
    const id = `alert-${alertIdCounter++}`;
    setAlerts((prev) => [{ id, type, message, dismissible }, ...prev]);
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="alert-wrapper">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            type={alert.type}
            dismissible={alert.dismissible}
            onDismiss={() => dismissAlert(alert.id)}
          >
            {alert.message}
          </Alert>
        ))}
      </div>
    </AlertContext.Provider>
  );
};
