import axios from "axios";
import React, { useState, useContext, useCallback, useEffect } from "react";
import stlLogin from "./AuthPage.module.css";
import stlReg from "./RegisterPage.module.css";
import { useMessage } from "../hooks/alert.hook";

import "./modal.css";
import { AuthContext } from "../context/authContext";

export const AddMoneyModal = () => {
  const alert = useMessage();
  const auth = useContext(AuthContext);
  const [state, setState] = useState(false);
  const [money, setMoney] = useState(0);

  const changeMoneyHandler = (event) => {
    setMoney(event.target.valueAsNumber);
    console.log(money);
  };
  const AddMoney = async () => {
    if (money === NaN) {
      return alert("ВВЕДЕНО НЕ ЧИСЛО");
    }
    await axios
      .post(
        "/api/user/addUserMoney",
        { money },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      )
      .then(async (res) => {
        setMoney(0);
        setState(false);
        window.location = "/";
      });
  };

  return (
    <React.Fragment>
      <a
        onClick={() => {
          setState(true);
        }}
        style={{ cursor: "pointer" }}
      >
        Добавить денег на счет
      </a>

      {state && (
        <div className="modal">
          <div className="modal-body">
            <h1>Бронирование номера</h1>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="attach_money"
                  type="number"
                  class="validate"
                  onChange={changeMoneyHandler}
                />
                <label for="attach_money">
                  Введите сумму, на которую хотите пополнить свой кошелек
                </label>
              </div>
              <div>
                <button onClick={AddMoney}>Добавить на счет</button>
              </div>
            </div>
            <button
              onClick={() => {
                setMoney(0);
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

export default AddMoneyModal;
