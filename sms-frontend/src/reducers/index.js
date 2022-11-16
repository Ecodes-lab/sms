import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import schools from "./schools";
import users from "./users";
import countries from "./countries";

export default combineReducers({
  errors,
  messages,
  auth,
  schools,
  users,
  countries,
});
