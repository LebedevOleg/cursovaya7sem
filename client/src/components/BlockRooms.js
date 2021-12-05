import React from "react";
import ReservateRoomModal from "../modals/reservate.modal";

export const BlockRooms = (room) => {
  return (
    <>
      <div className="col s6 ">
        <h2 className="header">Номер комнаты: {room.room.name}</h2>
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <p>Размер комнаты: {room.room.size} человека</p>
            </div>
            <div className="card-action">
              <ReservateRoomModal />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
