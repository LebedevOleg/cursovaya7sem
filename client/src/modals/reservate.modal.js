import axios from "axios";
import React, { useState, useContext } from "react";
import { useMessage } from "../hooks/alert.hook";

import "./modal.css";
import { AuthContext } from "../context/authContext";
import {
  DatePickerComponent,
  DateTimePickerComponent,
  RenderDayCellEventArgs,
} from "@syncfusion/ej2-react-calendars";

export const ReservateRoomModal = (room) => {
  const [enableButton, setEnubleButton] = useState(false);
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
  const alert = useMessage();
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
    console.log(event);
    setFormReg({ ...formReg, [event.element.name]: event.element.value });
    setDateStart(event.element.value);
  };
  const handleChangeDateEnd = (event) => {
    setFormReg({ ...formReg, [event.element.name]: event.element.value });
    setDateEnd(event.element.value);
  };
  const [formReg, setFormReg] = useState({
    login: "",
    password: "",
    first_name: "",
    last_name: "",
    date_Start: new Date(),
    date_End: new Date(),
    token: token.token,
    room_id: room.id.id,
    dayPrice: room.id.price_for_day,
  });
  const changeRegFormHandler = (event) => {
    setFormReg({ ...formReg, [event.target.name]: event.target.value });
  };

  const regRoomHandler = async () => {
    /* setFormReg({ ...formReg, date_Start: dateStart });
    setFormReg({ ...formReg, date_End: dateEnd }); */
    console.debug(formReg);
    await axios
      .post("/api/rooms/resrveRoom", { ...formReg })
      .then((res) => {
        alert("Комната успешно забронированна");
        setState(false);
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message.errors[0].msg);
        } else if (error.request) {
          alert(error.response.data.message.errors[0].msg);
        }
      });
  };
  const enabledButton = () => {
    if (dateStart == dateEnd) {
      setEnubleButton(true);
      return true;
    } else {
      setEnubleButton(false);
      return false;
    }
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
                  name="date_Start"
                  placeholder="Дата начала импорта"
                  format="yyyy/MM/dd HH:mm"
                  min={
                    // !!!!!!! СУКА БЛЯТЬ ЕБАНЫЙ РОТ СИЖУ 20 МИНУТ ЭТА ХУЙНЯ ПОДЗАЛУПНАЯ НЕ РАБОТАЕТ ЕБАЛ РОТ СОЗДАТЕЛЯ ЭТОЙ ХУЙНИ

                    new Date(Date.now())
                  }
                  change={handleChangeDateStart}
                ></DateTimePickerComponent>
              </div>
              <div className="col s12 m6 ">
                Дата конца заезда
                <DateTimePickerComponent
                  name="date_End"
                  placeholder="Дата конца импорта"
                  format="yyyy/MM/dd HH:mm"
                  min={new Date()}
                  change={handleChangeDateEnd}
                  req
                ></DateTimePickerComponent>
              </div>
            </div>
            <div>
              <fieldset>
                <input
                  name="first_name"
                  type="first_name"
                  placeholder={(!!token.token && firstName) || "Имя"}
                  autoFocus="true"
                  onLoad={changeRegFormHandler}
                  onChange={changeRegFormHandler}
                  required
                />
                <input
                  name="last_name"
                  type="last_name"
                  placeholder={(!!token.token && lastName) || "Фамилия"}
                  onLoad={changeRegFormHandler}
                  onChange={changeRegFormHandler}
                  required
                />
                <input
                  name="login"
                  type="text"
                  placeholder={(!!token.token && token.userLogin) || "Логин"}
                  onLoadStart={changeRegFormHandler}
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
                  <button onClick={regRoomHandler}>
                    Зарезервировать Комнату
                  </button>
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
