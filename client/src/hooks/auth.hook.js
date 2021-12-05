import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ready, setReady] = useState(false);
  const [userLogin, setUserLogin] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const login = useCallback((megaToken, id, name, admin) => {
    setUserId(id);
    setToken(megaToken);
    setUserLogin(name);
    setIsAdmin(admin);
    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: megaToken,
        userLogin: name,
        isAdmin: admin,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserLogin(null);
    setIsAdmin(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId, data.userLogin, data.isAdmin);
    }
    setReady(true);
  }, [login]);

  return {
    login,
    logout,
    token,
    userId,
    userLogin,
    ready,
    isAdmin,
  };
};
