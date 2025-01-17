"use client";

import AlertsField from "./components/AlertsField";
import AlertButtonsField from "./components/AlertButtons";
import ButtonField from "./components/ButtonField";

export default function Page() {
  return (
    <>
      <h1 id="page-title">Showcase</h1>

      <section>
        <h2>General Buttons</h2>
        <ButtonField />
      </section>

      <section>
        <h2>Alert Buttons Showcase</h2>
        <AlertButtonsField />
      </section>

      <section>
        <h2>Alerts Field</h2>
        <AlertsField />
      </section>
    </>
  );
}
