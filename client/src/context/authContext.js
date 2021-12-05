import { createContext } from "react";
import axios from "axios";
function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  userLogin: null,

  login: noop,
  logout: noop,
  isAuthent: false,
  isAdmin: false,
});
