"use client";

import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ComponentPropsWithoutRef } from "react";

export type AlertType = "info" | "success" | "warning" | "error";

const iconMap: Record<AlertType, React.ReactNode> = {
  info: <FontAwesomeIcon icon={faInfoCircle} />,
  success: <FontAwesomeIcon icon={faCheckCircle} />,
  warning: <FontAwesomeIcon icon={faExclamationTriangle} />,
  error: <FontAwesomeIcon icon={faExclamationCircle} />
};

interface AlertProps extends ComponentPropsWithoutRef<"div"> {
  id: string;
  children: React.ReactNode;
  type: AlertType;
  onDismiss?: () => void;
}

export default function Alert({
  id,
  children,
  type,
  onDismiss,
  ...props
}: AlertProps): React.JSX.Element | null {
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <div
      id={id}
      className={`alert ${type}`}
      aria-live="assertive"
      aria-atomic="true"
      {...props}
    >
      <div className="alert-icon">{iconMap[type]}</div>
      <div className="alert-content">{children}</div>
      {onDismiss && (
        <button className="text" onClick={handleDismiss} aria-label="Close">
          &times;
        </button>
      )}
    </div>
  );
}
