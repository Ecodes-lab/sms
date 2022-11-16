import axios from "axios";
import * as actionTypes from "./actionTypes";
import { returnErrors } from "./messages";

const getSchoolListStart = () => {
  return {
    type: actionTypes.GET_SCHOOL_LIST_START
  };
};

const getSchoolListSuccess = schools => {
  return {
    type: actionTypes.GET_SCHOOL_LIST_SUCCESS,
    schools
  };
};

const getSchoolListFail = error => {
  return {
    type: actionTypes.GET_SCHOOL_LIST_FAIL,
    error: error
  };
};

export const getSchools = token => {
  return dispatch => {
    dispatch(getSchoolListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get("http://127.0.0.1:8000/schools/")
      .then(res => {
        const schools = res.data;
        dispatch(getSchoolListSuccess(schools));
      })
      .catch(err => {
        dispatch(getSchoolListFail());
      });
  };
};

const deleteSchoolStart = () => {
  return {
    type: actionTypes.DELETE_SCHOOL_START
  };
};

const deleteSchoolSuccess = school => {
  return {
    type: actionTypes.DELETE_SCHOOL_SUCCESS,
    school
  };
};

const deleteSchoolFail = error => {
  return {
    type: actionTypes.DELETE_SCHOOL_FAIL,
    error: error
  };
};

export const deleteSchool = (token, id) => {
  return dispatch => {
    dispatch(deleteSchoolStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .delete(`http://127.0.0.1:8000/schools/${id}/`)
      .then(res => {
        const school = res.data;
        dispatch(deleteSchoolSuccess(school));
      })
      .catch(err => {
        dispatch(deleteSchoolFail());
      });
  };
};

const updateSchoolStart = () => {
  return {
    type: actionTypes.UPDATE_SCHOOL_START
  };
};

const updateSchoolSuccess = school => {
  return {
    type: actionTypes.UPDATE_SCHOOL_SUCCESS,
    school
  };
};

const updateSchoolFail = error => {
  return {
    type: actionTypes.UPDATE_SCHOOL_FAIL,
    error: error
  };
};

export const updateSchool = (token, id, school) => {
  return dispatch => {
    dispatch(updateSchoolStart());
    axios.defaults.headers = {
      // "Content-Type": "multipart/form-data",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .put(`http://127.0.0.1:8000/schools/${id}/`, school)
      .then(res => {
        const school = res.data;
        dispatch(updateSchoolSuccess(school));
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch(updateSchoolFail(err));
      });
  };
};

export const updateSchoolImage = (token, id, school) => {
  return dispatch => {
    dispatch(updateSchoolStart());
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      // "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .put(`http://127.0.0.1:8000/schools/${id}/`, school)
      .then(res => {
        const school = res.data;
        dispatch(updateSchoolSuccess(school));
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch(updateSchoolFail(err));
      });
  };
};

const getSchoolDetailStart = () => {
  return {
    type: actionTypes.GET_SCHOOL_DETAIL_START
  };
};

const getSchoolDetailSuccess = school => {
  return {
    type: actionTypes.GET_SCHOOL_DETAIL_SUCCESS,
    school
  };
};

const getSchoolDetailFail = error => {
  return {
    type: actionTypes.GET_SCHOOL_DETAIL_FAIL,
    error: error
  };
};

export const getSchoolDetail = (token, id) => {
  return dispatch => {
    dispatch(getSchoolDetailStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/schools/${id}/`)
      .then(res => {
        const school = res.data;
        dispatch(getSchoolDetailSuccess(school));
      })
      .catch(err => {
        dispatch(getSchoolDetailFail());
      });
  };
};

export const createSchoolStart = () => {
  return {
    type: actionTypes.CREATE_SCHOOL_START
  };
};

export const createSchoolSuccess = school => {
  return {
    type: actionTypes.CREATE_SCHOOL_SUCCESS,
    school
  };
};

export const createSchoolFail = error => {
  return {
    type: actionTypes.CREATE_SCHOOL_FAIL,
    error: error
  };
};


export const createSchool = (token, school) => {
  return dispatch => {
    dispatch(createSchoolStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .post(`http://127.0.0.1:8000/schools/`, school)
      .then(res => {
        dispatch(createSchoolSuccess(res.data));
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch(createSchoolFail());
      });
  };
};



