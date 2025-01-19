import React from "react";

export default function DevMessageProvider(): React.JSX.Element {
  return (
    <div id="dev-message">
      <p>
        This page is still in development. If you have feedback or find any
        bugs: <strong>I DO NOT CARE!</strong>
      </p>
      <p>Also I use cookies. What are you gonna do about it?</p>
    </div>
  );
}
