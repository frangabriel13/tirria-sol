import { instance } from "../../utils/axiosConfig";

export const getColors = () => async (dispatch) => {
  try {
    const response = await instance.get("/colors");
    dispatch({
      type: "GET_COLORS",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};

export const addColor = (color) => async (dispatch) => {
  try {
    const response = await instance.post("/colors", color);
    dispatch({
      type: "ADD_COLOR",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};

export const updateColor = (color) => async (dispatch) => {
  try {
    const response = await instance.put(`/colors/${color.id}`, color);
    dispatch({
      type: "UPDATE_COLOR",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};

export const deleteColor = (color) => async (dispatch) => {
  try {
    const response = await instance.delete(`/colors/${color.id}`);
    dispatch({
      type: "DELETE_COLOR",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};