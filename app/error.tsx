// app/error.tsx
"use client";

import React from "react";

const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#f8d7da",
        color: "#721c24"
      }}
    >
      <h2>Something went wrong.</h2>
      <p>We are sorry, but something went wrong while loading the page.</p>
      <details style={{ whiteSpace: "pre-wrap" }}>
        <summary>Error details</summary>
        {error.message}
      </details>
    </div>
  );
};

export default ErrorPage;
