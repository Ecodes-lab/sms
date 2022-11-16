import axios from "axios";
import * as actionTypes from "./actionTypes";
import { returnErrors } from "./messages";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = user => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user
  };
};

// export const authRegisterSuccess = success => {
//   return {
//     type: actionTypes.AUTH_REGISTER_SUCCESS,
//     success: success
//   };
// };

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        const user = {
          token: res.data.key,
          first_name: res.data.user_type.first_name,
          last_name: res.data.user_type.last_name,
          username,
          userId: res.data.user,
          schoolId: res.data.user_type.school,
          is_student: res.data.user_type.is_student,
          is_teacher: res.data.user_type.is_teacher,
          is_school_admin: res.data.user_type.is_school_admin,
          is_system_admin: res.data.user_type.is_system_admin,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authRegister = (
  // token,
  // teacher
  first_name, 
  last_name, 
  username, 
  email, 
  password1, 
  password2,
  school,
  is_student, 
  is_teacher, 
  is_school_admin, 
  is_system_admin, 
  // image, 
  // date_of_birth, 
  // gender, 
  // street, 
  // city, 
  // state, 
  // country, 
  // zip_code, 
  // years_of_experience, 
  // academic_qualification, 
  // phone,
  // emergency_contact1, 
  // emergency_contact2, 
  // blood_group,
) => {
  return dispatch => {
    dispatch(authStart());

    const teacher = {
      first_name, 
      last_name, 
      username, 
      email, 
      password1, 
      password2,
      school,
      is_student, 
      is_teacher, 
      is_school_admin, 
      is_system_admin, 
      // image, 
      // date_of_birth, 
      // gender, 
      // street, 
      // city, 
      // state, 
      // country, 
      // zip_code, 
      // years_of_experience, 
      // academic_qualification, 
      // phone,
      // emergency_contact1, 
      // emergency_contact2, 
      // blood_group,
    }

    // axios.defaults.headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Token ${token}`
    // };
    axios
      .post("http://127.0.0.1:8000/rest-auth/registration/", teacher)
      .then(res => {
        // const user = {
        //   token: res.data.key,
        //   first_name,
        //   last_name,
        //   username,
        //   email,
        //   userId: res.data.user,
        //   is_student,
        //   is_teacher,
        //   is_school_admin,
        //   expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        // };
        // localStorage.setItem("registeration", JSON.stringify(user));
        // dispatch(authRegisterSuccess(res.response.data));
        // dispatch(authSuccess(user));
        // dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch(authFail(err));
      });
  };
};



export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
