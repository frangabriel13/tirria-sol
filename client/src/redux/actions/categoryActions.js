import { instance } from "../../utils/axiosConfig";

export const getCategories = () => async (dispatch) => {
  try {
    const response = await instance.get('/categories');
    dispatch({ 
      type: 'GET_CATEGORIES', 
      payload: response.data 
    });
  } catch(error) {
    console.log(error);
  }
};

export const createCategory = (category) => async (dispatch) => {
  try {
    console.log(category);
    const response = await instance.post('/categories', category);
    dispatch({ 
      type: 'CREATE_CATEGORY', 
      payload: response.data 
    });
  } catch(error) {
    console.log(error);
  }
};

export const updateCategory = (payload) => async (dispatch) => {
  try {
    const response = await instance.put(`/categories/${payload.id}`, payload);
    console.log(payload);
    dispatch({ 
      type: 'UPDATE_CATEGORY', 
      payload: response.data 
    });
  } catch(error) {
    console.log(error);
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    await instance.delete(`/categories/${id}`);
    dispatch({ 
      type: 'DELETE_CATEGORY', 
      payload: response.data 
    });
  } catch(error) {
    console.log(error);
  }
};

export const filterSubcategories = (id) => {
  return {
    type: 'FILTER_SUBCATEGORIES',
    payload: id
  };
}