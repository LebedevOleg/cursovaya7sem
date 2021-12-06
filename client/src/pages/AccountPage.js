import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const AccountPage = () => {
  const { token, logout } = useContext(AuthContext);
  return (
    <>
    <div>
      <form name= "orders">
      
      </form>
    </div>
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
