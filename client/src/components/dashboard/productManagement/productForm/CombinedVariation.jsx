import React, { useState, useEffect } from "react";
import s from './CombinedVariation.module.css';
import { useDispatch, useSelector } from "react-redux";

function CombinedVariation({ 
  combinedVariation, 
  setCombinedVariation, 
  combinedActive, 
  setCombinedActive, 
  selectedSizes, 
  selectedColors,
  formData,
  setFormData
}
) {
function createCombinedVariation() {
  let newCombinedVariation = [];

  if (selectedSizes.length > 0 && selectedColors.length > 0) {
    // Si hay tamaños y colores seleccionados
    selectedSizes.forEach((size) => {
      selectedColors.forEach((color) => {
        newCombinedVariation.push({ 
          size: {id: size.id, name: size.name},  
          color: {id: color.id, name: color.name},
          price: formData.price,
          stock: formData.stock,
          available: formData.available,
          images: []
        });
      });
    });
  } else if (selectedSizes.length > 0) {
    // Si solo hay tamaños seleccionados
    selectedSizes.forEach((size) => {
      newCombinedVariation.push({ 
        size: {id: size.id, name: size.name},
        color: null,
        price: formData.price,
        stock: formData.stock,
        available: formData.available,
        images: []
      });
    });
  } else if (selectedColors.length > 0) {
    // Si solo hay colores seleccionados
    selectedColors.forEach((color) => {
      newCombinedVariation.push({ 
        size: null, 
        color: {id: color.id, name: color.name},
        price: formData.price,
        stock: formData.stock,
        available: formData.available,
        images: []
      });
    });
  } else {
    // Si no se ha seleccionado ni tamaño ni color
    newCombinedVariation.push({ 
      size: null, 
      color: null,
      price: formData.price,
      stock: formData.stock,
      available: formData.available,
      images: []
    });
  }
  
  setCombinedVariation(newCombinedVariation);

  // const allVariations = {
  //   variations: newCombinedVariation,
  // };
  const allVariations = {
    variations: newCombinedVariation.map((variation) => ({
      sizeId: variation.size ? parseInt(variation.size.id, 10) : null,
      colorId: variation.color ? parseInt(variation.color.id, 10) : null,
      price: variation.price,
      stock: variation.stock,
      available: variation.available,
      images: []
    })),
  };

  // Actualiza formData solo si es un producto variable
  if (formData.isVariant) {
    const updatedFormData = {
      ...formData,
      ...allVariations, // Agrega las variaciones al formData
    };
    setFormData(updatedFormData);
  } else {
    // Si no es un producto variable, asegúrate de eliminar las variaciones del formData
    const updatedFormData = {
      ...formData,
      ...allVariations,
      variations: [], // Limpia las variaciones en caso de que haya quedado alguna
    };
    setFormData(updatedFormData);
  }
}

useEffect(() => {
  createCombinedVariation();
}, [selectedSizes, selectedColors])

// Manejar cambios en el input de precio y stock
const handlePriceChange = (e, index) => {
  const newCombinedVariation = [...combinedVariation];
  newCombinedVariation[index].price = e.target.value;
  setCombinedVariation(newCombinedVariation);
  // Actualiza formData con las variaciones
  // const updatedFormData = {
  //   ...formData,
  //   variations: newCombinedVariation,
  // };
  const updatedFormData = {
    ...formData,
    variations: newCombinedVariation.map((variation, i) => ({
      ...variation,
      sizeId: selectedSizes[i] ? parseInt(selectedSizes[i].id, 10) : null,
    })),
  };
  setFormData(updatedFormData);
};

return(
  <div>
    <h2>Todas las variaciones</h2>
    <div className={s.container}>
      {
        combinedVariation.map((variation, index) => {
          return(
            <div key={index} className={s.variation}>
              <h3>{variation.size ? variation.size.name : ''} - {variation.color ? variation.color.name : ''}</h3>
              <label htmlFor="price">Precio:</label>
              <input 
                type="number" 
                name="price"
                placeholder="Precio"
                value={variation.price || 0}
                onChange={(e) => handlePriceChange(e, index)}
              />
            </div>
          )
        })
      }
    </div>
  </div>
)
}


export default CombinedVariation;