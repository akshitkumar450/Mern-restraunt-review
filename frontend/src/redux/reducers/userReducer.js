const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));
const initialState = {
  user: user ? user : null,
  token: token ? token : null,
};

export const userReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "SIGNUP":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
      };

    default:
      return state;
  }
};
