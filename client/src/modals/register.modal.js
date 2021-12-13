import axios from "axios";
import React, { useState, useContext, useCallback, useEffect } from "react";
import stlLogin from "./AuthPage.module.css";
import stlReg from "./RegisterPage.module.css";
import { useMessage } from "../hooks/alert.hook";

import "./modal.css";
import { AuthContext } from "../context/authContext";
import AddMoneyModal from "./AddMoney.modal";

const RegisterModal = () => {
  //#region modal constant
  const [state, setState] = useState(false);
  const [login, setLogin] = useState(true);
  const changeRegFormHandler = (event) => {
    setFormReg({ ...formReg, [event.target.name]: event.target.value });
  };
  const [money, setMoney] = useState(0);
  const changeLoginFormHandler = (event) => {
    setFormLogin({ ...formLogin, [event.target.name]: event.target.value });
  };
  //#endregion
  const alert = useMessage();
  const { token } = useContext(AuthContext);
  const auth = useContext(AuthContext);
  const [formLogin, setFormLogin] = useState({ login: "", password: "" });
  const [formReg, setFormReg] = useState({
    login: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const registerHandler = async () => {
    const message = "";
    try {
      axios
        .post("/api/auth/register", { ...formReg })
        .then((res) => {
          setState(false);
          alert(res.data.message);
        })
        .catch((error) => {
          if (error.response) {
            if (!error.response.data.msg) {
              console.log(error.response.data);
              alert(error.response.data.message);
            } else {
              alert(error.response.data.msg.errors[0].msg);
            }
          } else if (error.request) {
            if (window.M) {
              window.M.toast({ html: error.response.data.message });
            }
          }
        });
    } catch (e) {
      message = e.message;
      console.log(message);
    }
  };
  const authHandler = async () => {
    try {
      const authCheck = await axios
        .post("/api/auth/login", { ...formLogin })
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.message);
          } else if (error.request) {
            alert(error.response.data.message);
          }
        });
      auth.login(
        authCheck.data.token,
        authCheck.data.userId,
        authCheck.data.userLogin,
        authCheck.data.IsAdmin
      );
      console.log(authCheck.data.token);
      window.location = "/account";
    } catch (e) {
      console.log(e);
    }
  };
  const getUserMoney = useCallback(async () => {
    await axios
      .get("/api/user/getUserMoney", {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(async (res) => {
        setMoney(res.data.cash);
      });
  }, []);

  useEffect(() => {
    getUserMoney();
  }, [getUserMoney]);
  return (
    <React.Fragment>
      {(token && (
        <div className="row">
          <a href="/account" className="nav-menu__row_items_a">
            <b style={{ fontFamily: " Adobe Poetica" }} className="black-text">
              {auth.userLogin} счет: {money}
            </b>
          </a>
        </div>
      )) || (
        <a
          onClick={() => {
            if (state) {
              setState(false);
            } else {
              setState(true);
            }
            setLogin(true);
          }}
          style={{ cursor: "pointer" }}
        >
          Вход/Регистрация
        </a>
      )}

      {state && (
        <>
          {login ? (
            <div style={{ position: "static", zIndex: 100000 }}>
              <div id={stlLogin.login}>
                <h1>Форма входа</h1>
                <fieldset id={stlLogin.inputs}>
                  <input
                    id={stlLogin.username}
                    type="text"
                    name="login"
                    placeholder="Логин"
                    autofocus="true"
                    required="true"
                    onChange={changeLoginFormHandler}
                  />
                  <input
                    id={stlLogin.password}
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required="true"
                    onChange={changeLoginFormHandler}
                  />
                </fieldset>
                <fieldset id={stlLogin.actions}>
                  <input
                    type="submit"
                    id={stlLogin.submit}
                    value="ВОЙТИ"
                    onClick={authHandler}
                  />
                  <a onClick={() => setLogin(false)}>Регистрация</a>
                  <a onClick={() => setState(false)}>Закрыть форму</a>
                </fieldset>
              </div>
            </div>
          ) : (
            <div id={stlReg.login}>
              <h1>Форма регистрации</h1>
              <fieldset id={stlReg.inputs}>
                <input
                  id={stlReg.password}
                  name="first_name"
                  type="first_name"
                  placeholder="Имя"
                  autoFocus="true"
                  onChange={changeRegFormHandler}
                  required
                />
                <input
                  id={stlReg.password}
                  name="last_name"
                  type="last_name"
                  placeholder="Фамилия"
                  autoFocus="true"
                  onChange={changeRegFormHandler}
                  required
                />
                <input
                  id={stlReg.username}
                  name="login"
                  type="text"
                  placeholder="Логин"
                  onChange={changeRegFormHandler}
                  required
                />
                <input
                  id={stlReg.password}
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  onChange={changeRegFormHandler}
                  required
                />
              </fieldset>
              <fieldset id={stlReg.actions}>
                <input
                  type="submit"
                  id={stlReg.submit}
                  value="Зарегистрироваться"
                  onClick={registerHandler}
                />
                <a onClick={() => setState(false)}>Закрыть форму</a>
                <a onClick={() => setLogin(true)}>ВОЙТИ</a>
              </fieldset>
            </div>
          )}
        </>
      )}
    </React.Fragment>
  );
};
export default RegisterModal;
