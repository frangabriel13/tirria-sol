import { instance } from "../../utils/axiosConfig";

export const addUser = (user) => async (dispatch) => {
  try {
    const response = await instance.post("/users", user);
    dispatch({
      type: "ADD_USER",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};