"use client";

import React from "react";
import { useAlert } from "../../hooks/useAlert";

export default function AlertButtonsField() {
  const { showAlert } = useAlert();

  return (
    <div className="button-row">
      <button
        onClick={() => showAlert("info", "This is an info alert!", true)}
        className="alert-button info"
      >
        Info Alert
      </button>
      <button
        onClick={() => showAlert("success", "This is a success alert!", true)}
        className="alert-button success"
      >
        Success Alert
      </button>
      <button
        onClick={() => showAlert("warning", "This is a warning alert!", true)}
        className="alert-button warning"
      >
        Warning Alert
      </button>
      <button
        onClick={() => showAlert("error", "This is an error alert!", true)}
        className="alert-button error"
      >
        Error Alert
      </button>
    </div>
  );
}
