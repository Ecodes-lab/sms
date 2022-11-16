import * as actionTypes from "../actions/actionTypes";

const initialState = {
  leads: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_LEADS:
      return {
        ...state,
        leads: action.payload
      };
    case actionTypes.DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter(lead => lead.id !== action.payload)
      };
    case actionTypes.ADD_LEAD:
      return {
        ...state,
        leads: [...state.leads, action.payload]
      };
    case actionTypes.CLEAR_LEADS:
      return {
        ...state,
        leads: []
      };
    default:
      return state;
  }
}
