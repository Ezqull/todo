import { AuthRequest, BASE_URL } from "./types";

export const isTokenExpired = (date: number): boolean => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  return date < currentTimeInSeconds;
};

export const getExpirationDateFromToken = () => {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = atob(base64);

    const parsedPayload = JSON.parse(payload);

    if (parsedPayload.exp) {
      return parsedPayload.exp * 1000;
    }
  }

  return null;
};

export const signIn = async (request: AuthRequest, rememberMe: boolean) => {
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

    if (data) {
      const jwtToken = data.accessToken;
      if (rememberMe) {
        const refreshToken = data.refreshToken;
        localStorage.setItem("refreshToken", refreshToken);
      }
      localStorage.setItem("jwtToken", jwtToken);
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

export const logOut = async () => {
  const url = `${BASE_URL}/auth/logout`;
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Błąd podczas rejestracji`, error);
  }
};

const refreshJwtToken = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Błąd podczas rejestracji`, error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  function checkAndRefreshToken() {
    const token: string = localStorage.getItem("jwtToken") as string;

    if (token && !isTokenExpired(getExpirationDateFromToken() as number)) {
      return;
    } else {
      refreshJwtToken(localStorage.getItem("refreshToken") as string);
    }
  }
  if (
    !localStorage.getItem("jwtToken") ||
    !localStorage.getItem("refreshToken")
  ) {
    return;
  }
  checkAndRefreshToken();
});
