import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import UserOrders from "../components/UserOrders";
import { AuthContext } from "../context/authContext";

export const AccountPage = () => {
  const [orders, setOrders] = useState([]);
  const auth = useContext(AuthContext);
  const getOrders = useCallback(async () => {
    try {
      await axios
        .get("/api/user/getUserOrders", {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then(async (res) => {
          setOrders(res.data);
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
        <form>
          <h3>Заказы пользователя</h3>

          <div className="row">
            {orders.map((order) => (
              <UserOrders order={order} />
            ))}
          </div>
        </form>
      </div>
      <div className="row">
        {!!auth.isAdmin && (
          <button onClick={() => (window.location = "/control")}>
            Статистика
          </button>
        )}
        <button
          onClick={() => {
            auth.logout();
            window.location = "/";
          }}
        >
          Выйти
        </button>
      </div>
    </>
  );
};
export default AccountPage;
