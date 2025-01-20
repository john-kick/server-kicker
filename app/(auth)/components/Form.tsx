import { FormEvent, ChangeEvent } from "react";

type FormProps = {
  username: string;
  password: string;
  passwordRepetition?: string;
  onUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordRepetitionChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent) => Promise<void>;
  isLoading: boolean;
  showPasswordRepetition?: boolean;
};

export default function Form({
  username,
  password,
  passwordRepetition,
  onUsernameChange,
  onPasswordChange,
  onPasswordRepetitionChange,
  onSubmit,
  isLoading,
  showPasswordRepetition = false
}: FormProps): React.JSX.Element {
  return (
    <form onSubmit={onSubmit}>
      <input
        id="username"
        name="username"
        placeholder="Username"
        value={username}
        onChange={onUsernameChange}
        required
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        required
      />
      {showPasswordRepetition && (
        <input
          id="password-repetition"
          name="password-repetition"
          type="password"
          placeholder="Repeat Password"
          value={passwordRepetition}
          onChange={onPasswordRepetitionChange!}
          required
        />
      )}
      <button type="submit" disabled={isLoading}>
        {isLoading ? (
          <span className="loader"></span>
        ) : passwordRepetition ? (
          "Register"
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}
