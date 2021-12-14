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
      <div className="col s12">
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />

        <div className="card col s12 #e8eaf6 indigo lighten-5 z-depth-3">
          <div className="card-content">
            <h4 style={{ fontFamily: "fantasy, Critter" }}>
              Номер комнаты: {room.room.name}
              <span className="card-title activator grey-text text-darken-4">
                <i className="material-icons right">more_vert</i>
              </span>
            </h4>
          </div>
          <div className="card-action">
            <ReservateRoomModal id={room.room} date={blockedDay} />
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              Номер комнаты: {room.room.name}
              <i className="material-icons right">close</i>
            </span>
            <p>Размер комнаты: {room.room.size} человека</p>
            <p>Цена за день: {room.room.price_for_day}</p>
          </div>
        </div>
      </div>
    </>
  );
};
