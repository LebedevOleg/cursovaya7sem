import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import UserOrders from "../components/UserOrders";
import { AuthContext } from "../context/authContext";

export const AdminPage = () => {
  const [allOrders, setAllOrders] = useState([]);
  const auth = useContext(AuthContext);
  const getOrders = useCallback(async () => {
    try {
      await axios
        .get("/api/user/getAllOrders", {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then(async (res) => {
          setAllOrders(res.data);
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
          <h3>Заказы всех пользователя</h3>
          <div className="row">
            {allOrders.map((order) => (
              <UserOrders order={order} />
            ))}
          </div>
        </form>
      </div>
    </>
  );
};
export default AdminPage;
