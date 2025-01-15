"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Button,
  CircularProgress,
  Link,
  Paper,
  TextField,
  Typography
} from "@mui/material";

export default function Page(): React.JSX.Element {
  const authServerUrl = process.env.NEXT_PUBLIC_AUTH_SERVER_URL;

  if (!authServerUrl) {
    throw new Error("NEXT_PUBLIC_AUTH_SERVER_URL must be set in .env");
  }

  const router = useRouter();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepetition, setPasswordRepetition] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    usernameLength: false,
    passwordLength: false,
    containsUppercase: false,
    containsLowercase: false,
    containsNumber: false,
    containsSpecialChar: false,
    passwordRepetitionMatches: true
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  // Helper validation functions
  const validateUsername = (username: string): boolean => {
    return username.length > 3 && username.length < 32;
  };

  const validatePasswordLength = (password: string): boolean => {
    return password.length > 8 && password.length < 128;
  };

  const validatePasswordContainsUppercase = (password: string): boolean => {
    return /[A-Z]/g.test(password);
  };

  const validatePasswordContainsLowercase = (password: string): boolean => {
    return /[a-z]/g.test(password);
  };

  const validatePasswordContainsNumber = (password: string): boolean => {
    return /[0-9]/g.test(password);
  };

  const validatePasswordContainsSpecialChar = (password: string): boolean => {
    return /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(password);
  };

  const validatePasswordRepetitionMatches = (
    password: string,
    repetition: string
  ): boolean => {
    return password === repetition;
  };

  // Handling changes
  const handleUsernameChange = (username: string) => {
    setUsername(username);
    setValidationErrors((prev) => ({
      ...prev,
      usernameLength: validateUsername(username)
    }));
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    setValidationErrors((prev) => ({
      ...prev,
      passwordLength: validatePasswordLength(password),
      containsUppercase: validatePasswordContainsUppercase(password),
      containsLowercase: validatePasswordContainsLowercase(password),
      containsNumber: validatePasswordContainsNumber(password),
      containsSpecialChar: validatePasswordContainsSpecialChar(password)
    }));
  };

  const handlePasswordRepetitionChange = (repetition: string) => {
    setPasswordRepetition(repetition);
    setValidationErrors((prev) => ({
      ...prev,
      passwordRepetitionMatches: validatePasswordRepetitionMatches(
        password,
        repetition
      )
    }));
  };

  // Form submission
  const handleRegister = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    if (
      !validationErrors.usernameLength ||
      !validationErrors.passwordLength ||
      !validationErrors.containsUppercase ||
      !validationErrors.containsLowercase ||
      !validationErrors.containsNumber ||
      !validationErrors.containsSpecialChar ||
      !validationErrors.passwordRepetitionMatches
    ) {
      setError(
        "Username, password and password repetition must match the conditions on the right."
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(authServerUrl + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || response.statusText}`);
        return;
      }

      const result = await response.json();
      console.log("Registration successful:", result);

      localStorage.setItem("token", result.token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Alerts for each validation
  const validationMessages = [
    {
      condition: validationErrors.usernameLength,
      message: "Username length between 3 and 32 characters"
    },
    {
      condition: validationErrors.passwordLength,
      message: "Password length between 8 and 128 characters"
    },
    {
      condition: validationErrors.containsLowercase,
      message: "Password contains at least one lowercase letter"
    },
    {
      condition: validationErrors.containsUppercase,
      message: "Password contains at least one uppercase letter"
    },
    {
      condition: validationErrors.containsNumber,
      message: "Password contains at least one number"
    },
    {
      condition: validationErrors.containsSpecialChar,
      message: "Password contains at least one special character"
    },
    {
      condition: validationErrors.passwordRepetitionMatches,
      message: "Password and password repetition must match"
    }
  ];

  return (
    <div>
      <Paper elevation={1}>
        <form onSubmit={handleRegister}>
          <Typography variant="h5">Register</Typography>

          <div>
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <TextField
              id="password-repetition"
              name="password-repetition"
              label="Password repetition"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={passwordRepetition}
              onChange={(e) => handlePasswordRepetitionChange(e.target.value)}
            />
          </div>

          {error && <Alert severity="error">{error}</Alert>}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>

          <Typography variant="body2">
            Already have an account?{" "}
            <Link href="/login" underline="hover">
              Login here
            </Link>
          </Typography>
        </form>
      </Paper>
      <Paper elevation={1}>
        <div>
          {validationMessages.map((validation, index) => (
            <Alert
              key={index}
              severity={validation.condition ? "success" : "warning"}
            >
              {validation.message}
            </Alert>
          ))}
        </div>
      </Paper>
    </div>
  );
}
