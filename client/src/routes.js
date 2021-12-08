import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { AccountPage } from "./pages/AccountPage";
import AdminPage from "./pages/ControllPage";
import RoomsPage from "./pages/RoomPage";

export const useRoutes = () => {
  const { token } = useContext(AuthContext);
  return (
    <Switch>
      <Route path="/rooms" exact>
        <RoomsPage />
      </Route>
      {(!!token && <Redirect from="/account" to="/" />) || (
        <Route path="/account" exact>
          <AccountPage />
        </Route>
      )}
      <Route path="/control">
        <AdminPage />
      </Route>
    </Switch>
  );
};
