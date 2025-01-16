"use client";

import AlertsField from "./components/AlertsField";
import ButtonField from "./components/ButtonField";

export default function Page() {
  return (
    <>
      <h1 id="page-title">Showcase</h1>
      <section>
        <ButtonField />
      </section>
      <section>
        <AlertsField />
      </section>
    </>
  );
}
