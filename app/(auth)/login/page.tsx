"use client";

import { useAlert } from "@/hooks/useAlert";
import { useAuth } from "@/hooks/useAuth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Form from "../components/Form";

export default function Page(): React.JSX.Element {
  const authServerUrl = process.env.NEXT_PUBLIC_AUTH_SERVER_URL;
  const router = useRouter();
  const { isLoading, makeRequest } = useAuth(authServerUrl!);
  const { showAlert, clearAlerts } = useAlert();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      const result = await makeRequest("/login", "POST", {
        username,
        password
      });

      Cookies.set("token", result.token, { path: "/", sameSite: "strict" });
      router.push("/dashboard");
      clearAlerts();
    } catch (err) {
      showAlert(
        "error",
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  return (
    <div id="login-form-wrapper" className="paper">
      <h1>Login</h1>
      <Form
        username={username}
        password={password}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}
        isLoading={isLoading}
      />
      <p>
        Don&apos;t have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}
