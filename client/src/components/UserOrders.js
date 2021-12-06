import React from "react";
import ReservateRoomModal from "../modals/reservate.modal";

export const BlockRooms = (order) => {
  return (
    <>
      <div class="row">
        <div class="col s12 m6">
          <div
            class={
              (order.order.status && "card light-blue accent-2") ||
              "card grey lighten-1"
            }
          >
            <div class="card-content black-text">
              <span class="card-title">Номер заказа: {order.order.id}</span>
              <p>Дата заселения: {order.order.date_on}</p>
              <p>Дата выезда: {order.order.date_out}</p>
              <p>
                Номер комнаты: {order.order.room_name} в корпусе
                {order.order.build}
              </p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
