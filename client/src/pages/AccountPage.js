import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";

export const AccountPage = () => {
  const { token, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const getOrders = useCallback(async () => {
    try {
      console.log(token);
      await axios
        .get("/api/user/getUserOrders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          console.log(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);
  return (
    <>
      <div>
        <form name="orders">
          <h3>Заказы пользователя</h3>
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
export default AccountPage;
