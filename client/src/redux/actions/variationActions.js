import { instance } from "../../utils/axiosConfig";

export const getVariations = () => async (dispatch) => {
  try {
    const response = await instance.get('/variations');
    dispatch({
      type: 'GET_VARIATIONS',
      payload: response.data
    })
  } catch(error) {
    console.log(error);
  }
};

export const getVariationById = (id) => async (dispatch) => {
  try {
    const response = await instance.get(`/variations/${id}`);
    dispatch({
      type: 'GET_VARIATION_BY_ID',
      payload: response.data
    })
  } catch(error) {
    console.log(error);
  }
};

export const addVariation = (variation) => async (dispatch) => {
  try {
    const response = instance.post('/variations', variation);
    dispatch({
      type: 'ADD_VARIATION',
      payload: response.data
    })
  } catch(error) {
    console.log(error);
  }
};

export const updateVariation = (payload) => async (dispatch) => {
  try {
    const response = instance.put(`/variations/${payload.id}`, payload);
    dispatch({
      type: 'UPDATE_VARIATION',
      payload: response.data
    })
  } catch(error) {
    console.log(error);
  }
};

export const deleteVariation = (id) => async (dispatch) => {
  try {
    const response = instance.delete(`/variations/${id}`);
    dispatch({
      type: 'DELETE_VARIATION',
      payload: response.data
    })
  } catch(error) {
    console.log(error);
  }
};