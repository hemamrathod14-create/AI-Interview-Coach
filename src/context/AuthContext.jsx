import { createContext, useContext, useState } from "react";
import { currentUser } from "../data/mockData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = () => setUser(currentUser);
  const signup = () => setUser(currentUser);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
