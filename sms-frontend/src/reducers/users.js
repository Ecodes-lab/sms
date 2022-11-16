import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  users: [],
  currentUser: {},
  error: null,
  loading: false
};

const getUserListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUserListSuccess = (state, action) => {
  return updateObject(state, {
    users: action.users,
    error: null,
    loading: false
  });
};

const getUserListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};


const deleteUserStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const deleteUserSuccess = (state, action) => {
  return updateObject(state, {
    currentUser: action.user,
    error: null,
    loading: false
  });
};

const deleteUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const updateUserStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const updateUserSuccess = (state, action) => {
  return updateObject(state, {
    currentUser: action.user,
    error: null,
    loading: false
  });
};

const updateUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getUserDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getUserDetailSuccess = (state, action) => {
  return updateObject(state, {
    currentUser: action.user,
    error: null,
    loading: false
  });
};

const getUserDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_LIST_START:
      return getUserListStart(state, action);
    case actionTypes.GET_USER_LIST_SUCCESS:
      return getUserListSuccess(state, action);
    case actionTypes.GET_USER_LIST_FAIL:
      return getUserListFail(state, action);
    case actionTypes.DELETE_USER_START:
      return deleteUserStart(state, action);
    case actionTypes.DELETE_USER_SUCCESS:
      return deleteUserSuccess(state, action);
    case actionTypes.DELETE_USER_FAIL:
      return deleteUserFail(state, action);
    case actionTypes.UPDATE_USER_START:
      return updateUserStart(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action);
    case actionTypes.UPDATE_USER_FAIL:
      return updateUserFail(state, action);
    case actionTypes.GET_USER_DETAIL_START:
      return getUserDetailStart(state, action);
    case actionTypes.GET_USER_DETAIL_SUCCESS:
      return getUserDetailSuccess(state, action);
    case actionTypes.GET_USER_DETAIL_FAIL:
      return getUserDetailFail(state, action);
    default:
      return state;
  }
};

export default reducer;
