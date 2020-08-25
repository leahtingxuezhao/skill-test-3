const initialState = {
  user: { id: 0, username: "" },
};

const GET_USER = "GET_USER";
const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export const getUser = (user) => {
  return {
    type: GET_USER,
    payload: user,
  };
};

export const userLoggedOut = () => {
  return {
    type: USER_LOGGED_OUT,
    payload: { id: 0, username: "" },
  };
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return { ...state, user: payload };
    case USER_LOGGED_OUT:
      return { ...state, user: payload };
    default:
      return state;
  }
}
