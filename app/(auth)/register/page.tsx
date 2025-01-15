"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import RegistrationForm from "./components/RegistrationForm";
import ValidationBox from "./components/ValidationBox";
import { useAuth } from "@/app/hooks/useAuth";
import { useValidation } from "@/app/hooks/useValidation";

export default function Page(): React.JSX.Element {
  const authServerUrl = process.env.NEXT_PUBLIC_AUTH_SERVER_URL;
  const router = useRouter();
  const { error, isLoading, makeRequest } = useAuth(authServerUrl!);

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
    } catch {
      // Error already handled in useAuth hook
    }
  };

  return (
    <div id="registration-wrapper">
      <RegistrationForm
        username={username}
        password={password}
        passwordRepetition={passwordRepetition}
        onUsernameChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
        onPasswordChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        onPasswordRepetitionChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPasswordRepetition(e.target.value)
        }
        onSubmit={handleRegistration}
        isLoading={isLoading}
        error={error}
      />
      <ValidationBox validationMessages={validationMessages} />
    </div>
  );
}
