import "./index.css";
import "materialize-css";
import RegisterModal from "./modals/register.modal";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { useRoutes } from "./routes";
import { AuthContext } from "./context/authContext";
import { Loader } from "./components/Loader";
import AddMoneyModal from "./modals/AddMoney.modal";
import logo from "./pages/hotel.png";

function App() {
  const { token, login, logout, userId, userLogin, ready, isAdmin } = useAuth();
  const routes = useRoutes();
  const isAuthent = !!token;
  console.log(token);

  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthent,
        userLogin,
        isAdmin,
      }}
    >
      <div className="header__menu">
        <nav className="nav-menu #b388ff deep-purple accent-1">
          <ul className="nav-menu__row right hide-on-med-and-down">
            <li className="nav-menu__row_items">
              <a
                href="/rooms"
                style={{ fontFamily: " Adobe Poetica" }}
                className="nav-menu__row_items_a black-text"
              >
                <b>Заказать Номер</b>
              </a>
            </li>
          </ul>
          <ul className="nav-menu__row ">
            <li className="nav-menu__row_items">
              <RegisterModal />
            </li>
            <li>{!!token && <AddMoneyModal />}</li>
          </ul>
          <div className="brand-logo center">
            <img
              className="logo__image"
              src={logo}
              style={{ height: "65px" }}
              alt="Logo"
            />
          </div>
        </nav>
      </div>
      <Router>
        <div>{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
