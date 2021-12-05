import axios from "axios";
import React, { useState, useContext, useCallback, useEffect } from "react";
import { useMessage } from "../hooks/alert.hook";

import { AuthContext } from "../context/authContext";
import { BlockRooms } from "../components/BlockRooms";

export const RoomsPage = () => {
  //#region Получение комнаты и фильтры
  const [rooms, setRooms] = useState([]);
  const getRooms = useCallback(async () => {
    try {
      await axios.get("/api/rooms/getFreeRooms").then(async (res) => {
        console.log(res.data);
        setRooms(res.data);
      });
    } catch (e) {
      console.log(e.message);
    }
  }, []);
  useEffect(() => {
    getRooms();
  }, [getRooms]);
  window.document.addEventListener("DOMContentLoaded", function () {
    var elems = window.document.querySelectorAll("select");
    var options = window.document.querySelectorAll("options");
    var instances = window.M.FormSelect.init(elems, options);
  });
  const ChangeFilterhandler = async (event) => {
    var value = Number(event.target.value);
    console.log(value);
    try {
      if (value === 0) {
        getRooms();
      } else {
        await axios
          .post("/api/rooms/getFreeRoomsFilter", { value: value })
          .then(async (res) => {
            console.log(res.data);
            setRooms(res.data);
          });
      }
    } catch {}
  };
  //#endregion

  return (
    <>
      <div>
        <div class="input-field col s12">
          <select onChange={ChangeFilterhandler}>
            <option value="0">Без фильтра</option>
            <option value="1">Для одного</option>
            <option value="2">Для двух</option>
            <option value="3">Для трех</option>
          </select>
          <label>фильтр по размеру комнаты</label>
        </div>
      </div>
      <div className="row right">
        {rooms.map((room) => (
          <BlockRooms room={room} />
        ))}
      </div>
    </>
  );
};
export default RoomsPage;
