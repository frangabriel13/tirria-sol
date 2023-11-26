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

//---------------------

// export const updateVariation = async (payload) => {
//   try {
//     const { id, stock, imageId } = payload;

//     // Actualizar Variation
//     await Variation.update({ stock }, { where: { id } });

//     // Si tienes la imagenId y deseas actualizar la relación
//     if (imageId) {
//       const variation = await Variation.findByPk(id);
//       await variation.setImages([imageId]);
//     }

//     console.log('Variation actualizada correctamente.');
//   } catch (error) {
//     console.error('Error en la actualización de Variation:', error);
//   }
// };


export const updateVariation = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const response = await instance.put(`/variations/${payload.id}`, payload);
    dispatch({
      type: 'UPDATE_VARIATION',
      payload: response.data
    });
  } catch (error) {
    console.error('Error en la solicitud de actualización:', error);
    console.error('Detalles del error:', error.response.data); // Agregado para mostrar detalles específicos del error
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

export const filterVariations = (variation) => {
  return {
    type: "FILTER_VARIATIONS",
    payload: variation,
  };
};