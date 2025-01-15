import { Alert } from "@mui/material";
import { ChangeEvent, FormEvent } from "react";

type RegistrationFormProps = {
  username: string;
  password: string;
  passwordRepetition: string;
  onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPasswordRepetitionChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export default function RegistrationForm({
  username,
  password,
  passwordRepetition,
  onUsernameChange,
  onPasswordChange,
  onPasswordRepetitionChange,
  onSubmit,
  isLoading,
  error
}: RegistrationFormProps): React.JSX.Element {
  return (
    <div id="registration-form-wrapper" className="paper">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input
          id="username"
          name="username"
          placeholder="Username"
          value={username}
          className={error ? "invalid" : ""}
          onChange={onUsernameChange}
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          className={error ? "invalid" : ""}
          onChange={onPasswordChange}
          required
        />
        <input
          id="password-repetition"
          name="passwordRepetition"
          type="password"
          placeholder="Repeat Password"
          value={passwordRepetition}
          className={error ? "invalid" : ""}
          onChange={onPasswordRepetitionChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? <span className="loader" /> : "Register"}
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
      {error && (
        <Alert severity="error" className="error-box">
          {error}
        </Alert>
      )}
    </div>
  );
}
