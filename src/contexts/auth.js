import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user");

    if(userToken){
      const userInfo = JSON.parse(userToken)
      setUser(userInfo);
    }

  }, []);

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};