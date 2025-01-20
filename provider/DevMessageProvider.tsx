import React, { useState } from "react";

export default function DevMessageProvider(): React.JSX.Element | null {
  const [showMessage, setShowMessage] = useState(true);

  if (!showMessage) return null;

  const handleDismiss = () => {
    document.getElementById("dev-message")?.classList.add("leave");

    setTimeout(() => {
      setShowMessage(false);
    }, 300);
  };

  return (
    <div id="dev-message">
      <div>
        <p>
          This page is still in development. If you have feedback or find any
          bugs: <strong>I DO NOT CARE!</strong>.
        </p>
        <p>
          Also I use cookies to be able to show you this website. What are you
          gonna do about it?
        </p>
      </div>
      <button
        className="text primary"
        onClick={handleDismiss}
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
}
