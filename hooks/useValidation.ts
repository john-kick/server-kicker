import { useMemo } from "react";

export type ValidationResult = {
  condition: boolean;
  message: string;
};

type UseValidationParams = {
  username: string;
  password: string;
  passwordRepetition: string;
};

export function useValidation({
  username,
  password,
  passwordRepetition
}: UseValidationParams) {
  const validationMessages: ValidationResult[] = useMemo(() => {
    const validUsername = username.length > 3 && username.length < 32;
    const validPasswordLength = password.length > 8 && password.length < 128;
    const passwordContainsUppercase = /[A-Z]/.test(password);
    const passwordContainsLowercase = /[a-z]/.test(password);
    const passwordContainsNumber = /[0-9]/.test(password);
    const passwordContainsSpecialChar =
      /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(password);
    const passwordRepetitionMatches = password === passwordRepetition;

    return [
      {
        condition: validUsername,
        message: "Username length between 3 and 32 characters"
      },
      {
        condition: validPasswordLength,
        message: "Password length between 8 and 128 characters"
      },
      {
        condition: passwordContainsUppercase,
        message: "Password contains at least one uppercase letter"
      },
      {
        condition: passwordContainsLowercase,
        message: "Password contains at least one lowercase letter"
      },
      {
        condition: passwordContainsNumber,
        message: "Password contains at least one number"
      },
      {
        condition: passwordContainsSpecialChar,
        message: "Password contains at least one special character"
      },
      {
        condition: passwordRepetitionMatches,
        message: "Password and password repetition must match"
      }
    ];
  }, [username, password, passwordRepetition]);

  const isValid = validationMessages.every(
    (validation) => validation.condition
  );

  return { validationMessages, isValid };
}
