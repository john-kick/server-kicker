"use client";

import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function Page(): React.JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authServerUrl = process.env.NEXT_PUBLIC_AUTH_SERVER_URL;

  if (!authServerUrl) {
    throw new Error("NEXT_PUBLIC_AUTH_SERVER_URL must be set in .env");
  }

  const router = useRouter();

  const handleLogin = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch(authServerUrl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password")
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`${errorData.message || response.statusText}`);
        return;
      }

      const result = await response.json();
      console.log("Login successful:", result);

      Cookies.set("token", result.token, { sameSite: "strict" });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="paper">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          id="username"
          name="username"
          placeholder="Username"
          value={username}
          className={error ? "invalid" : ""}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          className={error ? "invalid" : ""}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? <span className="loader"></span> : "Login"}
        </button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>

      {/* {error && <span className="error">{error}</span>} */}
      {error && (
        <Alert severity="error" className="error-box">
          {error}
        </Alert>
      )}
    </div>
  );
}
