"use client";

import { useAuth } from "@/app/hooks/useAuth";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Page(): React.JSX.Element {
  const authServerUrl = process.env.NEXT_PUBLIC_AUTH_SERVER_URL;
  const router = useRouter();
  const { error, isLoading, makeRequest } = useAuth(authServerUrl!);

  const handleLogin = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const result = await makeRequest("/login", "POST", {
      username: formData.get("username"),
      password: formData.get("password")
    });

    Cookies.set("token", result.token, { path: "/", sameSite: "strict" });
    router.push("/dashboard");
  };

  return (
    <div id="login-form-wrapper" className="paper">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          id="username"
          name="username"
          placeholder="Username"
          className={error ? "invalid" : ""}
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className={error ? "invalid" : ""}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? <span className="loader"></span> : "Login"}
        </button>
      </form>
      <p>
        Don&apos;t have an account? <a href="/register">Register here</a>
      </p>

      {error && (
        <Alert severity="error" className="error-box">
          {error}
        </Alert>
      )}
    </div>
  );
}
