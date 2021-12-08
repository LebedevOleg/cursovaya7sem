import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import ReservateRoomModal from "../modals/reservate.modal";

export const BlockRooms = (room) => {
  const [blockedDay, setBlockedDay] = useState([]);
  const getBlockDay = useCallback(async () => {
    await axios
      .post("/api/rooms/getRoomReservDate", { id: room.room.id })
      .then(async (res) => {
        setBlockedDay(res.data);
      });
  }, []);
  useEffect(() => {
    getBlockDay();
  }, [getBlockDay]);
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
              <ReservateRoomModal id={room.room} date={blockedDay} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
