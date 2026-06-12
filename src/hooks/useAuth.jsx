import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("userName");

    if (token) {
      setUser({ loggedIn: true, role: role || 'student', name: name || 'User' });
    }
    setAuthReady(true);
  }, []);

  // ✅ 1. ADD THIS: Define the 'login' function (Google Login)
  const login = async () => {
    console.log("Google Login clicked - Redirecting or Logic here");
  };

  const loginWithEmail = async (email, password) => {
    // ⚠️ CHANGE THIS to your actual Render URL
    const res = await fetch("https://iserve-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("userName", data.user.name);
    
    setUser({ ...data.user, loggedIn: true }); 
    return data;
  };

  // ✅ 2. ADD THIS: Real registration logic
  const registerWithEmail = async (email, password) => {
    const res = await fetch("https://iserve-backend.onrender.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullName: "New User" }), 
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message);
    
    return loginWithEmail(email, password); 
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  return (
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