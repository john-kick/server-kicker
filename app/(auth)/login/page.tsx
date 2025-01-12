"use client";

import {
  Alert,
  Button,
  CircularProgress,
  Link,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function Page(): React.JSX.Element {
  const authServerUrl = process.env.NEXT_PUBLIC_AUTH_SERVER_URL;

  if (!authServerUrl) {
    throw new Error("NEXT_PUBLIC_AUTH_SERVER_URL must be set in .env");
  }

  const router = useRouter();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        setError(`Error: ${errorData.message || response.statusText}`);
        return;
      }

      const result = await response.json();
      console.log("Login successful:", result);

      Cookies.set("token", result.token);

      router.push("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Paper elevation={1}>
        <form onSubmit={handleLogin} className="w-full max-w-md p-6 space-y-6">
          <Typography variant="h5" className="text-center font-semibold">
            Login
          </Typography>

          <div className="space-y-4">
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
            />
          </div>

          {error && <Alert severity="error">{error}</Alert>}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            className="h-12"
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>

          <Typography variant="body2" className="text-center">
            Don’t have an account?{" "}
            <Link href="/register" underline="hover">
              Register here
            </Link>
          </Typography>
        </form>
      </Paper>
    </div>
  );
}
