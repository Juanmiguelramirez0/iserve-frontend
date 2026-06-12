import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ loggedIn: true, role: localStorage.getItem("role") || 'student' });
    }
    setAuthReady(true);
  }, []);

  const loginWithEmail = async (email, password) => {
    const res = await fetch("https://your-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    setUser(data.user); 
    return data;
  };

  const registerWithEmail = async (email, password) => {
    // ... your register fetch logic ...
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    window.location.href = "/";
  };

  return (
    // ✅ EVERYTHING used in LoginModal or Dashboard MUST be here:
    <AuthContext.Provider value={{ 
      user, 
      authReady, 
      login,
      loginWithEmail, 
      registerWithEmail, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);