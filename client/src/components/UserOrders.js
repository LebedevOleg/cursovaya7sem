import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useMessage } from "../hooks/alert.hook";
import ReservateRoomModal from "../modals/reservate.modal";

export const UserOrders = (order) => {
  const auth = useContext(AuthContext);
  const alert = useMessage();
  console.log(order.order);

  const deleteOrder = async () => {
    if (!!order.order.uid) {
      await axios
        .post(
          "/api/rooms/deleteOrder",
          {
            id: order.order.id,
            price: Number(order.order.price),
            uID: Number(order.order.uid),
          },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        )
        .then(async (res) => {
          alert(res.data.message);
          window.location = "/account";
        });
    } else {
      await axios
        .post(
          "/api/rooms/deleteOrder",
          {
            id: order.order.id,
            price: Number(order.order.price),
          },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        )
        .then(async (res) => {
          alert(res.data.message);
          window.location = "/account";
        });
    }
  };

  return (
    <>
      <div className="col s6 m6">
        <div
          className={
            (order.order.status && "card light-blue accent-2") ||
            "card grey lighten-1"
          }
        >
          <div className="card-content black-text">
            <span className="card-title">Номер заказа: {order.order.id}</span>
            {!!order.order.first_name && (
              <h6>Имя заказчика: {order.order.first_name}</h6>
            )}
            {!!order.order.last_name && (
              <h6>Имя заказчика: {order.order.last_name}</h6>
            )}
            <p>Дата заселения: {order.order.date_on}</p>
            <p>Дата выезда: {order.order.date_out}</p>
            <p>
              Номер комнаты: {order.order.room_name} в корпусе{" "}
              {order.order.build}
            </p>
            <p>Стоимость: {order.order.price}</p>
          </div>
          <div class="card-action">
            {!order.order.status && (
              <a
                className="black-text"
                onClick={deleteOrder}
                style={{ cursor: "pointer" }}
              >
                Отменить заказ
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrders;
