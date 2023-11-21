import { AuthRequest, BASE_URL } from "./types";

export const signIn = async (request: AuthRequest) => {
  const url = `${BASE_URL}/auth/authenticate`;
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
      localStorage.setItem("page", "home");
      location.reload();
    }
  } catch (error) {
    console.error(`Błąd podczas uwierzytelniania`, error);
  }
};

export const signUp = async (request: AuthRequest) => {
  const url = `${BASE_URL}/auth/register`;
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
    location.reload();
  } catch (error) {
    console.error(`Błąd podczas rejestracji`, error);
  }
};
