import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // 1. ADD THIS MISSING LINE HERE:
  const [authReady, setAuthReady] = useState(false); 

  useEffect(() => {
    // This function checks if the user is logged in when the page first loads
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // If you have a backend check, it goes here
          // const res = await fetch("...");
          // setUser(await res.json());
        }
      } catch (err) {
        console.error("Auth initialization failed", err);
      } finally {
        // 2. THIS IS THE LINE THAT WAS CRASHING:
        // Now that we defined it above, it will work!
        setAuthReady(true); 
      }
    };

    initAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    // 3. MAKE SURE authReady IS IN THIS VALUE LIST:
    <AuthContext.Provider value={{ user, authReady, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);