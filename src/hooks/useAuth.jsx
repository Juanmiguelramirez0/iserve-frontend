import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

// src/hooks/useAuth.js

useEffect(() => {
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Try to get user data from backend
        const res = await fetch("https://your-backend.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          localStorage.removeItem("token"); // Token expired
        }
      }
    } catch (err) {
      console.error("Auth Check Failed:", err);
    } finally {
      // It must run even if there is an error or no token
      setAuthReady(true); 
    }
  };

  checkAuth();
}, []);

    const loginWithEmail = async (email, password) => {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        return data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ user, token, loginWithEmail, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);