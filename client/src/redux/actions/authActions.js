import { instance } from "../../utils/axiosConfig";

export const loginUser = (userData) => {
  return async function (dispatch) {
    // console.log(userData)
    const response = await instance.post("login", userData);
    const token = response.data.token;
    // console.log('token: ', token)
    localStorage.setItem("token", token);
    dispatch({
      type: 'LOGIN_USER',
      payload: token,
    });
    return response;
  };
};

export const logoutUser = () => {
  return async function (dispatch) {
    try {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      } else {
        const res = await instance.post(
          "logout",
          {},
          { withCredentials: true }
        );
        console.log(res);
      }
      dispatch({
        type: 'LOGOUT_USER',
        payload: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUser = () => {
  return async function (dispatch) {
    try {
      const response = await instance.get("me", { withCredentials: true });
      // console.log(response)
      dispatch({
        type: 'SET_USER',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'SET_USER',
        payload: undefined,
      });
    }
  };
};

export const editUser = (userData) => {
  return async function (dispatch) {
    try {
      await instance.put("/me", userData);
      dispatch({
        type: 'EDIT_USER',
        payload: userData,
      });
    } catch (error) {
      console.log(error);
    }
  };
};