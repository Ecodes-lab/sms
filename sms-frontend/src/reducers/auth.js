import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  first_name: null,
  last_name: null,
  username: null,
  schoolId: null,
  is_student: null,
  is_teacher: null,
  is_school_admin: null,
  is_system_admin: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.user.token,
    first_name: action.user.first_name,
    last_name: action.user.last_name,
    username: action.user.username,
    schoolId: action.user.schoolId,
    is_student: action.user.is_student,
    is_teacher: action.user.is_teacher,
    is_school_admin: action.user.is_school_admin,
    is_system_admin: action.user.is_system_admin,
    userId: action.user.userId,
    error: null,
    loading: false
  });
};

// const authRegisterSuccess = (state, action) => {
//   return updateObject(state, {
//     success: action.success,
//     error: null,
//     loading: false
//   });
// };


const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    first_name: null,
    last_name: null,
    username: null,
    schoolId: null,
    is_student: null,
    is_teacher: null,
    is_school_admin: null,
    is_system_admin: null,
    userId: null,
    error: null,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    // case actionTypes.AUTH_REGISTER_SUCCESS:
    //   return authRegisterSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
