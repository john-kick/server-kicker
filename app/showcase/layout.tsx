import React from "react";
import NavBar from "@/components/NavBar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({
  children
}: DashboardLayoutProps): React.JSX.Element {
  return (
    <div>
      <NavBar />
      <div id="page-content">
        <div id="showcase">{children}</div>
      </div>
    </div>
  );
}
