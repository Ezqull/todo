import { AuthRequest, BASE_URL } from "./types";

export const auth = async (isSignIn: boolean, request: AuthRequest) => {
  const url = isSignIn
    ? `${BASE_URL}/auth/authenticate`
    : `${BASE_URL}/auth/register`;
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    credentials: "include" as const,
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.token) {
      const jwtToken = data.token;
      localStorage.setItem("jwtToken", jwtToken);
      window.location.reload();
    }
  } catch (error) {
    console.error(
      `Błąd podczas ${isSignIn ? "uwierzytelniania" : "rejestracji"}:`,
      error
    );
  }
};
