import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { AccountPage } from "./pages/AccountPage";

export const useRoutes = () => {
  const { token } = useContext(AuthContext);
  return (
    <Switch>
      {(!!token && <Redirect from="/account" to="/" />) || (
        <Route path="/account" exact>
          <AccountPage />
        </Route>
      )}
    </Switch>
  );
};
