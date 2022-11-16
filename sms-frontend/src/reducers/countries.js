import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  countries: [],
  error: null,
  loading: false
};

const getCountryListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCountryListSuccess = (state, action) => {
  return updateObject(state, {
    countries: action.countries,
    error: null,
    loading: false
  });
};

const getCountryListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COUNTRY_LIST_START:
      return getCountryListStart(state, action);
    case actionTypes.GET_COUNTRY_LIST_SUCCESS:
      return getCountryListSuccess(state, action);
    case actionTypes.GET_COUNTRY_LIST_FAIL:
      return getCountryListFail(state, action);
    default:
      return state;
  }
};

export default reducer;