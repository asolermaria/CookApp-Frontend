import { createContext, useEffect, useState } from "react";

import api from "../api/axios";

// Únicamente crea el contexto
export const AuthContext = createContext();

// Ejecuta la función y guarda los datos en el contexto y los comparte globalmente
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const getActiveUser = async () => {
      try {
        const response = await api.get("/auth/active-user");
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    getActiveUser();
  }, []);

  return (
    <AuthContext.Provider // Lo genera automáticamente createContext()
      value={{
        user,
        setUser,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
