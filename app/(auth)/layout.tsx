import React from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({
  children
}: DashboardLayoutProps): React.JSX.Element {
  return <div id="auth-wrapper">{children}</div>;
}
