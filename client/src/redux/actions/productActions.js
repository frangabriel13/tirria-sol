import { instance } from '../../utils/axiosConfig';

export const getProducts = () => async (dispatch) => {
  try {
    const response = await instance.get('/products');
    dispatch({
      type: 'GET_PRODUCTS',
      payload: response.data
    })
  } catch(error) {
    console.log(error);
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    const response = await instance.get(`/products/${id}`);
    dispatch({
      type: 'GET_PRODUCT_BY_ID',
      payload: response.data
    })
  } catch(error) {
    console.log(error);
  }
};

export const addProduct = (product) => async (dispatch) => {
  try {
    console.log(product)
    const response = instance.post('/products', product);
    dispatch({
      type: 'ADD_PRODUCT',
      payload: response.data
    })
  } catch(error) {
    console.log(error);
  }
};
// Acción para realizar la búsqueda en el navbar
export const searchProducts = (searchTerm) => {
  return {
    type: 'SEARCH_PRODUCTS_NAVBAR',
    payload: searchTerm,
  };
};

export const updateProduct = (payload) => async (dispatch) => {
  try {
    const response = instance.put(`/products/${payload.id}`, payload);
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: response.data
    })
  } catch(error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const response = instance.delete(`/products/${id}`);
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: response.data
    })
  } catch(error) {
    console.log(error);
  }
};

export const filterProducts = (categoryId) => {
  return {
    type: 'FILTER_PRODUCTS',
    payload: categoryId,
  };
};