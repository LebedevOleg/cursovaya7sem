import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const AccountPage = () => {
  const { token, logout } = useContext(AuthContext);
  return (
    <>
      <button
        onClick={() => {
          logout();
          window.location = "/";
        }}
      >
        Выйти
      </button>
    </>
  );
};
