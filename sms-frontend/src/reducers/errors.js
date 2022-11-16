import * as actionTypes from "../actions/actionTypes";

const initialState = {
  msg: {},
  status: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status
      };
    // case actionTypes.AUTH_REGISTER_SUCCESS:
    //   return {
    //     msg: action.payload.msg,
    //     status: action.payload.status
    //   };
    default:
      return state;
  }
}
