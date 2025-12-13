export const getAuthData = () => {
  const data = localStorage.getItem("auth");
  return data ? JSON.parse(data) : null;
};

export const setAuthData = (authData) => {
  localStorage.setItem("auth", JSON.stringify(authData));
};

export const clearAuthData = () => {
  localStorage.removeItem("auth");
};
