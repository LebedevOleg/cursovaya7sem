import logo from "./logo.svg";
import "./App.css";
import "materialize-css";
import RegisterModal from "./modals/register.modal";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { useRoutes } from "./routes";
import { AuthContext } from "./context/authContext";
import { Loader } from "./components/Loader";
import AddMoneyModal from "./modals/AddMoney.modal";

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
        <nav className="nav-menu">
          <ul className="nav-menu__row right hide-on-med-and-down">
            <li className="nav-menu__row_items">
              <a href="/rooms" className="nav-menu__row_items_a">
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
        </nav>
      </div>
      <Router>
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
