import React, { useEffect, useState } from "react";
import s from "./ProductEditForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../../redux/actions/categoryActions";
import { updateProduct } from "../../../../redux/actions/productActions";

function EditProductForm({ product, onCancelEdit }) {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category.categories);
  const variations = useSelector((state) => state.variation.variations);
  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    images: product.images,
    price: product.price,
    stock: product.stock,
    categoryId: product.categoryId,
    imgMain: product.imgMain,
    isVariable: product.isVariable,
    availability: product.availability,
    variations: []
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateProduct(formData));
      onCancelEdit()
    } catch(error) {
      console.log('Error al editar el producto:', error)
    }
  }

  return(
    <div className={s.container}>
      <h3>Formulario de edición de producto</h3>
      <form onSubmit={handleSubmit}>
        <div className={s.divInput}>
          <label htmlFor="name">Nombre:</label>
          <input type="text"
            name="name" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          />
        </div>
        <div className={s.divInput}>
          <label htmlFor="description">Descripción:</label>
          <textarea name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
          />
        </div>
        <div className={s.divInput}>
          <label htmlFor="price">Precio:</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
        <div className={s.divInput}>
          <label htmlFor="category">Categoría:</label>
          <select 
            name="category" 
            value={formData.categoryId} 
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          >
            {
              categories.map((el) => (
                <option key={el.id} value={el.id}>{el.name}</option>
              ))
            }
          </select>
        </div>
        <div>
          <label htmlFor="availability">Habilidado:</label>
          <input 
            type="checkbox" 
            name="availability" 
            checked={formData.availability} 
            onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
          />
        </div>
        <div className={s.divButton}>
          <button type="button" onClick={onCancelEdit}>Cancelar</button>
          <button type="submit">Guardar Cambios</button>
        </div>
      </form>
    </div>
  )
}


export default EditProductForm;