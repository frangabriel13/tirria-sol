import { instance } from "../../utils/axiosConfig";

export const getSizes = () => async (dispatch) => {
  try {
    const res = await instance.get("/sizes");
    dispatch({
      type: "GET_SIZES",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addSize = (size) => async (dispatch) => {
  try {
    const response = await instance.post("/sizes", size);
    dispatch({
      type: "ADD_SIZE",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};

export const updateSize = (size) => async (dispatch) => {
  try {
    const response = await instance.put(`/sizes/${size.id}`, size);
    dispatch({
      type: "UPDATE_SIZE",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};

export const deleteSize = (id) => async (dispatch) => {
  try {
    const response = await instance.delete(`/sizes/${id}`);
    dispatch({
      type: "DELETE_SIZE",
      payload: response.data,
    });
  } catch(error) {
    console.log(error);
  }
};