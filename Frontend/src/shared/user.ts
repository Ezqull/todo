export const getEmail = () => {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = atob(base64);

    const parsedPayload = JSON.parse(payload);

    return parsedPayload.sub;
  } else {
    console.log("Token nie znaleziony");
  }
};
