"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faCheckCircle,
  faExclamationTriangle,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";

export type AlertType = "info" | "success" | "warning" | "error";

const iconMap: Record<AlertType, React.ReactNode> = {
  info: <FontAwesomeIcon icon={faInfoCircle} />,
  success: <FontAwesomeIcon icon={faCheckCircle} />,
  warning: <FontAwesomeIcon icon={faExclamationTriangle} />,
  error: <FontAwesomeIcon icon={faExclamationCircle} />
};

type AlertProps = {
  children: React.ReactNode;
  type: AlertType;
  dismissible?: boolean;
  onDismiss?: () => void; // New prop for callback on dismiss
};

export default function Alert({
  children,
  type,
  dismissible = false,
  onDismiss
}: AlertProps): React.JSX.Element | null {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss(); // Call the dismiss callback
  };

  if (!isVisible) return null;

  return (
    <div className={`alert ${type}`} aria-live="assertive" aria-atomic="true">
      <div className="alert-icon">{iconMap[type]}</div>
      <div className="alert-content">{children}</div>
      {dismissible && (
        <button
          className="alert-dismiss"
          onClick={handleDismiss}
          aria-label="Close"
        >
          &times;
        </button>
      )}
    </div>
  );
}
