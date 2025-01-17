import { useState } from "react";

export function useAuth(authServerUrl: string) {
  if (!authServerUrl) {
    throw new Error("NEXT_PUBLIC_AUTH_SERVER_URL must be set in .env");
  }

  const [isLoading, setIsLoading] = useState(false);

  const makeRequest = async (
    endpoint: string,
    method: string,
    body: Record<string, unknown>
  ) => {
    setIsLoading(true);

    try {
      const response = await fetch(authServerUrl + endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || response.statusText);
      }

      return await response.json();
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, makeRequest };
}
