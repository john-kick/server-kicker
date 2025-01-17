"use client";

import { useAlert } from "@/hooks/useAlert";
import { useAuth } from "@/hooks/useAuth";
import { useValidation } from "@/hooks/useValidation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Form from "../components/Form";
import ValidationBox from "./components/ValidationBox";
import Link from "next/link";

export default function Page(): React.JSX.Element {
  const authServerUrl = process.env.NEXT_PUBLIC_AUTH_SERVER_URL;
  const router = useRouter();
  const { isLoading, makeRequest } = useAuth(authServerUrl!);
  const { showAlert, clearAlerts } = useAlert();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepetition, setPasswordRepetition] = useState("");

  const { validationMessages, isValid } = useValidation({
    username,
    password,
    passwordRepetition
  });

  const handleRegistration = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    try {
      const result = await makeRequest("/register", "POST", {
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
    <>
      <div id="registration-wrapper" className="paper">
        <h1>Register</h1>
        <Form
          username={username}
          password={password}
          passwordRepetition={passwordRepetition}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onPasswordRepetitionChange={(e) =>
            setPasswordRepetition(e.target.value)
          }
          onSubmit={handleRegistration}
          isLoading={isLoading}
          showPasswordRepetition={true}
        />
        <p>
          Already have an account? <Link href="/login">Login here</Link>
        </p>
      </div>
      <ValidationBox validationMessages={validationMessages} />
    </>
  );
}
