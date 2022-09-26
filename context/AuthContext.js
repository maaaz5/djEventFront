import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL, NEXT_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  //clearign the error
  const clearError = () => {
    setError(null);
  };

  //Register User
  const register = async (user) => {
    console.log(user);
  };

  //Login User
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/account/dashboard");
    } else {
      setError((prev) => (prev = data.message));
    }
  };

  //Logout User
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });
    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  //Check if User logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, clearError, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
