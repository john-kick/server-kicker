// Utility functions for validation
export function validateUsername(username: string): string | undefined {
  const usernameRules = new Map<RegExp, string>([
    [/^.+$/, "Username must not be empty"],
    [/^.{3,32}$/, "Username must be between 3 and 32 characters long"],
    [
      /^[a-zA-Z0-9._]+$/,
      'Username may only contain letters, numbers, ".", and "_"'
    ],
    [/^(?!.*[_.]{2})/, 'Username may not contain consecutive "." or "_"'],
    [/^[^_.]/, 'Username must not start with "." or "_"'],
    [/[^_.]$/, 'Username must not end with "." or "_"']
  ]);

  for (const [regex, message] of usernameRules) {
    if (!regex.test(username)) {
      return message;
    }
  }
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  const passwordRules = new Map<RegExp, string>([
    [/^.+$/, "Password must not be empty"],
    [/.{8,64}/, "Password must be between 8 and 64 characters long"],
    [/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)"],
    [/[a-z]/, "Password must contain at least one lowercase letter (a-z)"],
    [/[0-9]/, "Password must contain at least one digit (0-9)"],
    [
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character (e.g., !@#$%^&*)"
    ],
    [/^\S*$/, "Password must not contain spaces"]
  ]);

  for (const [regex, message] of passwordRules) {
    if (!regex.test(password)) {
      return message;
    }
  }
  return undefined;
}

export function validatePasswordRepetition(
  password: string,
  repeatedPassword: string
): string | undefined {
  if (!repeatedPassword) {
    return "Password repetition must not be empty";
  }
  if (password !== repeatedPassword) {
    return "Passwords do not match";
  }
  return undefined;
}
