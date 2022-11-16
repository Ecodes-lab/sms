import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  schools: [],
  currentSchool: {},
  error: null,
  loading: false
};

const getSchoolListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getSchoolListSuccess = (state, action) => {
  return updateObject(state, {
    schools: action.schools,
    error: null,
    loading: false
  });
};

const getSchoolListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};


const deleteSchoolStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const deleteSchoolSuccess = (state, action) => {
  return updateObject(state, {
    currentSchool: action.school,
    error: null,
    loading: false
  });
};

const deleteSchoolFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const updateSchoolStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const updateSchoolSuccess = (state, action) => {
  return updateObject(state, {
    currentSchool: action.school,
    error: null,
    loading: false
  });
};

const updateSchoolFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getSchoolDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getSchoolDetailSuccess = (state, action) => {
  return updateObject(state, {
    currentSchool: action.school,
    error: null,
    loading: false
  });
};

const getSchoolDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createSchoolStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createSchoolSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};


const createSchoolFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SCHOOL_LIST_START:
      return getSchoolListStart(state, action);
    case actionTypes.GET_SCHOOL_LIST_SUCCESS:
      return getSchoolListSuccess(state, action);
    case actionTypes.GET_SCHOOL_LIST_FAIL:
      return getSchoolListFail(state, action);
    case actionTypes.DELETE_SCHOOL_START:
      return deleteSchoolStart(state, action);
    case actionTypes.DELETE_SCHOOL_SUCCESS:
      return deleteSchoolSuccess(state, action);
    case actionTypes.DELETE_SCHOOL_FAIL:
      return deleteSchoolFail(state, action);
    case actionTypes.UPDATE_SCHOOL_START:
      return updateSchoolStart(state, action);
    case actionTypes.UPDATE_SCHOOL_SUCCESS:
      return updateSchoolSuccess(state, action);
    case actionTypes.UPDATE_SCHOOL_FAIL:
      return updateSchoolFail(state, action);
    case actionTypes.GET_SCHOOL_DETAIL_START:
      return getSchoolDetailStart(state, action);
    case actionTypes.GET_SCHOOL_DETAIL_SUCCESS:
      return getSchoolDetailSuccess(state, action);
    case actionTypes.GET_SCHOOL_DETAIL_FAIL:
      return getSchoolDetailFail(state, action);
    case actionTypes.CREATE_SCHOOL_START:
      return createSchoolStart(state, action);
    case actionTypes.CREATE_SCHOOL_SUCCESS:
      return createSchoolSuccess(state, action);
    case actionTypes.CREATE_SCHOOL_FAIL:
      return createSchoolFail(state, action);
    default:
      return state;
  }
};

export default reducer;
