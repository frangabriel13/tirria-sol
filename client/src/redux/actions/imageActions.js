import { instance, imageInstance } from "../../utils/axiosConfig";

export const getImages = () => async (dispatch) => {
  try {
    const response = await instance.get('/image');
    dispatch({ 
      type: 'GET_IMAGES', 
      payload: response.data 
    });
  } catch(error) {
    console.log(error);
  }
};

export const createImage = (images) => async (dispatch) => {
  try {
    const formData = new FormData();
    images.forEach(image => formData.append('images', image));
    const response = await imageInstance.post('/image', formData);
    dispatch({ 
      type: 'CREATE_IMAGE', 
      payload: response.data 
    });
  } catch(error) {
    console.log(error);
  }
};

export const deleteImage = (id) => async (dispatch) => {
  try {
    await instance.delete(`/image/${id}`);
    dispatch({ 
      type: 'DELETE_IMAGE', 
      payload: id 
    });
  } catch(error) {
    console.log(error);
  }
};