import axios from "axios";
import * as actionTypes from "./actionTypes";
import { returnErrors } from "./messages";


const getUserListStart = () => {
  return {
    type: actionTypes.GET_USER_LIST_START
  };
};

const getUserListSuccess = users => {
  return {
    type: actionTypes.GET_USER_LIST_SUCCESS,
    users
  };
};

const getUserListFail = error => {
  return {
    type: actionTypes.GET_USER_LIST_FAIL,
    error: error
  };
};

export const getUsers = token => {
  return dispatch => {
    dispatch(getUserListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get("http://127.0.0.1:8000/users/")
      .then(res => {
        const users = res.data;
        dispatch(getUserListSuccess(users));
      })
      .catch(err => {
        dispatch(getUserListFail());
      });
  };
};

const deleteUserStart = () => {
  return {
    type: actionTypes.DELETE_USER_START
  };
};

const deleteUserSuccess = user => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    user
  };
};

const deleteUserFail = error => {
  return {
    type: actionTypes.DELETE_USER_FAIL,
    error: error
  };
};

export const deleteUser = (token, id) => {
  return dispatch => {
    dispatch(deleteUserStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .delete(`http://127.0.0.1:8000/users/${id}/`)
      .then(res => {
        const user = res.data;
        dispatch(deleteUserSuccess(user));
      })
      .catch(err => {
        dispatch(deleteUserFail());
      });
  };
};

const updateUserStart = () => {
  return {
    type: actionTypes.UPDATE_USER_START
  };
};

const updateUserSuccess = user => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    user
  };
};

const updateUserFail = error => {
  return {
    type: actionTypes.UPDATE_USER_FAIL,
    error: error
  };
};

export const updateUser = (token, id, user) => {
  return dispatch => {
    dispatch(updateUserStart());
    axios.defaults.headers = {
      // "Content-Type": "multipart/form-data",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .put(`http://127.0.0.1:8000/users/${id}/`, user)
      .then(res => {
        const user = res.data;
        dispatch(updateUserSuccess(user));
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch(updateUserFail(err));
      });
  };
};

// export const updateUserImage = (token, id, user) => {
//   return dispatch => {
//     dispatch(updateSchoolStart());
//     axios.defaults.headers = {
//       "Content-Type": "multipart/form-data",
//       // "Content-Type": "application/json",
//       Authorization: `Token ${token}`
//     };
//     axios
//       .put(`http://127.0.0.1:8000/users/${id}/`, user)
//       .then(res => {
//         const user = res.data;
//         dispatch(updateUserSuccess(user));
//       })
//       .catch(err => {
//         dispatch(returnErrors(err.response.data, err.response.status));
//         dispatch(updateUserFail(err));
//       });
//   };
// };

const getUserDetailStart = () => {
  return {
    type: actionTypes.GET_USER_DETAIL_START
  };
};

const getUserDetailSuccess = user => {
  return {
    type: actionTypes.GET_USER_DETAIL_SUCCESS,
    user
  };
};

const getUserDetailFail = error => {
  return {
    type: actionTypes.GET_USER_DETAIL_FAIL,
    error: error
  };
};

export const getUserDetail = (token, id) => {
  return dispatch => {
    dispatch(getUserDetailStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/users/${id}/`)
      .then(res => {
        const user = res.data;
        dispatch(getUserDetailSuccess(user));
      })
      .catch(err => {
        dispatch(getUserDetailFail());
      });
  };
};
