import axios from "axios";
import React, { useState, useContext } from "react";
import { useMessage } from "../hooks/alert.hook";

import "./modal.css";
import { AuthContext } from "../context/authContext";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";

export const ReservateRoomModal = () => {
  const getFirstName = async (id) => {
    var result = "";
    if (id == null) {
      return null;
    } else {
      const firstName = await axios
        .post("/api/user/getFirstName", { id })
        .then((res) => {
          result = res.data;
        });
      return result;
    }
  };
  const getLastName = async (id) => {
    var result = "";
    if (id == null) {
      return null;
    } else {
      const firstName = await axios
        .post("/api/user/getLastName", { id })
        .then((res) => {
          result = res.data;
        });
      return result;
    }
  };

  const token = useContext(AuthContext);
  const [state, setState] = useState(false);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  getLastName(token.userId).then((value) => {
    setLastName(value);
  });
  getFirstName(token.userId).then((value) => {
    setFirstName(value);
  });

  const handleChangeDateStart = (event) => {
    setDateStart(event.value);
  };
  const handleChangeDateEnd = (event) => {
    setDateEnd(event.value);
  };

  const [formReg, setFormReg] = useState({
    login: "",
    password: "",
    first_name: "",
    last_name: "",
    date_Start: new Date(),
    date_End: new Date(),
  });
  const changeRegFormHandler = (event) => {
    setFormReg({ ...formReg, [event.target.name]: event.target.value });
  };

  const regRoomHandler = () => {
    setFormReg({ ...formReg, date_Start: dateStart });
    setFormReg({ ...formReg, date_End: dateEnd });
  };

  return (
    <React.Fragment>
      <a
        onClick={() => {
          setState(true);
        }}
        style={{ cursor: "pointer" }}
      >
        Забронировать
      </a>

      {state && (
        <div className="modal">
          <div className="modal-body">
            <h1>Бронирование номера</h1>
            <div className="row">
              <div className="col s12 m6 ">
                Дата начала заезда
                <DateTimePickerComponent
                  placeholder="Дата начала импорта"
                  format="yyyy/MM/dd HH:mm"
                  min={new Date(Date.now())}
                  onChange={handleChangeDateStart}
                  style={{ width: "auto" }}
                ></DateTimePickerComponent>
              </div>
              <div className="col s12 m6 ">
                Дата конца заезда
                <DateTimePickerComponent
                  placeholder="Дата конца импорта"
                  format="yyyy/MM/dd HH:mm"
                  min={new Date(Date.now())}
                  onChange={handleChangeDateEnd}
                  style={{ width: "auto" }}
                ></DateTimePickerComponent>
              </div>
            </div>
            <div>
              <fieldset>
                <input
                  name="first_name"
                  type="first_name"
                  value={(!!token.token && firstName) || ""}
                  placeholder="Имя"
                  autoFocus="true"
                  onChange={changeRegFormHandler}
                  required
                />
                <input
                  name="last_name"
                  type="last_name"
                  value={(!!token.token && lastName) || ""}
                  placeholder="Фамилия"
                  autoFocus="true"
                  onChange={changeRegFormHandler}
                  required
                />
                <input
                  name="login"
                  type="text"
                  value={(!!token.token && token.userLogin) || ""}
                  placeholder="Логин"
                  onChange={changeRegFormHandler}
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  onChange={changeRegFormHandler}
                  required
                />
                <div>
                  <button onClick={() => {}}>Зарезервировать Комнату</button>
                </div>
              </fieldset>
            </div>

            <button
              onClick={() => {
                setState(false);
              }}
            >
              Закрыть окно
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default ReservateRoomModal;
