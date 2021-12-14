import axios from "axios";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { useMessage } from "../hooks/alert.hook";

import "./modal.css";
import { AuthContext } from "../context/authContext";
import {
  DatePickerComponent,
  DateTimePickerComponent,
  RenderDayCellEventArgs,
} from "@syncfusion/ej2-react-calendars";
import { DateTimeSelect } from "../components/DatePicker";

export const ReservateRoomModal = (room) => {
  const [enableButton, setEnubleButton] = useState(false);
  const getFirstName = useCallback(async (id) => {
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
  }, []);
  const getLastName = useCallback(async (id) => {
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
  }, []);
  const alert = useMessage();
  const token = useContext(AuthContext);
  const [state, setState] = useState(false);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [load, setload] = useState(false);

  useEffect(() => {
    getLastName(token.userId).then((res) => {
      setLastName(res);
    });
    getFirstName(token.userId).then((res) => {
      setFirstName(res);
    });
  }, [setLastName, setFirstName]);

  const handleChangeDateStart = (event) => {
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
    setload(true);
    if (room.date.length != 0) {
      for (var i = 0; i < room.date.length; i++) {
        var dateInRes = new Date(room.date[i].date_on);
        var dateOutRes = new Date(room.date[i].date_out);
        var dateInChoose = new Date(formReg.date_Start);
        var dateOutChoose = new Date(formReg.date_End);
        if (dateInRes > dateInChoose && dateOutRes < dateOutChoose) {
          return alert("Выбранный промежуток пересекает уже существующий");
        }
      }
    }

    await axios
      .post("/api/rooms/resrveRoom", { ...formReg })
      .then((res) => {
        alert("Комната успешно забронированна");
        setload(false);
        setState(false);
        window.location = "/rooms";
      })
      .catch((error) => {
        if (error.response) {
          setload(false);
          alert(error.response.data.message.errors[0].msg);
        } else if (error.request) {
          setload(false);
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

  const onRenderCellStart = (args) => {
    if (room.date.length != 0) {
      for (var i = 0; i < room.date.length; i++) {
        var dateIn = new Date(room.date[i].date_on);
        var dateOut = new Date(room.date[i].date_out);
        if (
          args.date.getDate() >= dateIn.getDate() &&
          args.date.getDate() <= dateOut.getDate() &&
          args.date.getMonth() == dateIn.getMonth() &&
          args.date.getMonth() == dateOut.getMonth() &&
          args.date.getYear() == dateIn.getYear() &&
          args.date.getYear() == dateOut.getYear()
        ) {
          args.isDisabled = true;
        }
      }
      if (dateEnd != null) {
        var date = new Date(dateEnd);
        if (args.date >= date) {
          args.isDisabled = true;
        }
      }
    }
  };

  const onRenderCellEnd = (args) => {
    if (room.date.length != 0) {
      for (var i = 0; i < room.date.length; i++) {
        var dateIn = new Date(room.date[i].date_on);
        var dateOut = new Date(room.date[i].date_out);
        if (
          args.date.getDate() >= dateIn.getDate() &&
          args.date.getDate() <= dateOut.getDate() &&
          args.date.getMonth() == dateIn.getMonth() &&
          args.date.getMonth() == dateOut.getMonth() &&
          args.date.getYear() == dateIn.getYear() &&
          args.date.getYear() == dateOut.getYear()
        ) {
          args.isDisabled = true;
        }
      }
    }
    var date = new Date(dateStart);
    if (args.date <= date) {
      args.isDisabled = true;
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
            {(!load && (
              <div>
                <h1>Бронирование номера</h1>
                <div className="row">
                  <div className="col s12 m6 ">
                    Дата начала заезда
                    <DateTimePickerComponent
                      name="date_Start"
                      placeholder="Дата начала импорта"
                      format="yyyy/MM/dd HH:mm"
                      min={new Date(Date.now())}
                      renderDayCell={onRenderCellStart}
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
                      renderDayCell={onRenderCellEnd}
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
                      placeholder={
                        (!!token.token && token.userLogin) || "Логин"
                      }
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

                  <p>
                    Цена за день снятия этого номера {room.id.price_for_day}{" "}
                    условных единиц
                  </p>
                </div>
                <button
                  onClick={() => {
                    setState(false);
                    setDateEnd(new Date());
                    setDateStart(new Date());
                  }}
                >
                  Закрыть окно
                </button>
              </div>
            )) || (
              <div style={{ textAlign: "center", margin: "2rem 0" }}>
                <div class="preloader-wrapper active">
                  <div class="spinner-layer spinner-red-only">
                    <div class="circle-clipper left">
                      <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                      <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                      <div class="circle"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ReservateRoomModal;
