export const loginAction = (user) => {
  return {
    type: "LOGIN",
    payload: { user: user.user, token: user.token },
  };
};
export const signUpAction = (user) => {
  return {
    type: "SIGNUP",
    payload: { user: user.user, token: user.token },
  };
};

export const logoutAction = () => {
  return {
    type: "LOGOUT",
  };
};
