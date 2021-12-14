import axios from "axios";
import React, { useState, useContext, useCallback, useEffect } from "react";
import { useMessage } from "../hooks/alert.hook";
import "../modals/AuthPage.module.css";
import { AuthContext } from "../context/authContext";
import { BlockRooms } from "../components/BlockRooms";

export const RoomsPage = () => {
  //#region Получение комнаты и фильтры
  const [rooms, setRooms] = useState([]);
  const [size, setSize] = useState(0);
  const [build, setBuild] = useState("");
  const getRooms = useCallback(async () => {
    try {
      await axios.get("/api/rooms/getFreeRooms").then(async (res) => {
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
  const ChangeRoomValueFilterhandler = async (event) => {
    var value = Number(event.target.value);
    setSize(value);
    try {
      if (value === 0) {
        if (build === "") {
          getRooms();
        } else {
          await axios
            .post("/api/rooms/getFreeRoomsFilter", { build: build })
            .then(async (res) => {
              console.log(res.data);
              setRooms(res.data);
            });
        }
      } else {
        if (build === "") {
          await axios
            .post("/api/rooms/getFreeRoomsFilter", { value: value })
            .then(async (res) => {
              console.log(res.data);
              setRooms(res.data);
            });
        } else {
          await axios
            .post("/api/rooms/getFreeRoomsFilter", {
              build: build,
              value: value,
            })
            .then(async (res) => {
              console.log(res.data);
              setRooms(res.data);
            });
        }
      }
    } catch {}
  };

  const ChangeRoomBuildHandler = async (event) => {
    var value = event.target.value;
    setBuild(value);
    try {
      switch (value) {
        case "":
          if (size == 0) {
            getRooms();
          } else {
            await axios
              .post("/api/rooms/getFreeRoomsFilter", { value: size })
              .then(async (res) => {
                console.log(res.data);
                setRooms(res.data);
              });
          }
          break;
        case "A":
          if (size == 0) {
            await axios
              .post("/api/rooms/getFreeRoomsFilter", { build: value })
              .then(async (res) => {
                console.log(res.data);
                setRooms(res.data);
              });
          } else {
            await axios
              .post("/api/rooms/getFreeRoomsFilter", {
                build: value,
                value: size,
              })
              .then(async (res) => {
                console.log(res.data);
                setRooms(res.data);
              });
          }
          break;
        case "B":
          if (size == 0) {
            await axios
              .post("/api/rooms/getFreeRoomsFilter", { build: value })
              .then(async (res) => {
                console.log(res.data);
                setRooms(res.data);
              });
          } else {
            await axios
              .post("/api/rooms/getFreeRoomsFilter", {
                build: value,
                value: size,
              })
              .then(async (res) => {
                console.log(res.data);
                setRooms(res.data);
              });
          }
          break;
      }
    } catch (e) {
      console.error(e.message);
    }
  };
  //#endregion

  return (
    <>
      <div className="row">
        <div className="col s2">
          <h5>Фильтры</h5>
          <div className=" col s10">
            <label className="black-text">фильтр по размеру комнаты</label>
            <select
              className="browser-default"
              onChange={ChangeRoomValueFilterhandler}
            >
              <option value="0">Без фильтра</option>
              <option value="1">Для одного</option>
              <option value="2">Для двух</option>
              <option value="3">Для трех</option>
            </select>
          </div>
          <div className=" col s10">
            <label className="black-text">фильтр по Корпусу</label>
            <select
              className="browser-default"
              onChange={ChangeRoomBuildHandler}
            >
              <option value="">Без фильтра</option>
              <option value="A">Корпус А</option>
              <option value="B">Корпус Б</option>
            </select>
          </div>
        </div>
        <div className="col s8">
          {rooms.map((room) => (
            <BlockRooms room={room} />
          ))}
        </div>
      </div>
    </>
  );
};
export default RoomsPage;
