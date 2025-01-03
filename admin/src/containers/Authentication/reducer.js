import { SET_AUTH, CLEAR_AUTH } from "./constants";

const initialState = {
  authenticated: false,
  isLoading: false,
  token: null,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        authenticated: true,
      };
    case CLEAR_AUTH:
      return {
        ...state,
        authenticated: true,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
