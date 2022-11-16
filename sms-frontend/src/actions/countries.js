import axios from "axios";
import * as actionTypes from "./actionTypes";
import { returnErrors } from "./messages";


const getCountryListStart = () => {
  return {
    type: actionTypes.GET_COUNTRY_LIST_START
  };
};

const getCountryListSuccess = countries => {
  return {
    type: actionTypes.GET_COUNTRY_LIST_SUCCESS,
    countries
  };
};

const getCountryListFail = error => {
  return {
    type: actionTypes.GET_COUNTRY_LIST_FAIL,
    error: error
  };
};

export const getCountries = token => {
  return dispatch => {
    dispatch(getCountryListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        const countries = res.data;
        dispatch(getCountryListSuccess(countries));
      })
      .catch(err => {
        dispatch(getCountryListFail());
      });
  };
};