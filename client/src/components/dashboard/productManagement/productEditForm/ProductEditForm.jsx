import React, { useEffect, useState } from "react";
import s from "./ProductEditForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../../redux/actions/categoryActions";
import { getProducts, updateProduct } from "../../../../redux/actions/productActions";

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
    categories: product.categories,
    image: product.imgMain,
    isVariant: product.isVariable,
    available: product.availability,
    variations: []
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateProduct(formData));
      await dispatch(getProducts());
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
          <label htmlFor="categories">Categorías:</label>
          <select 
            name="categories" 
            value={formData.categories.map(cat => cat.id)} 
            onChange={(e) => {
              const selectedCategoryIds = Array.from(e.target.selectedOptions, option => option.value);
              const selectedCategories = categories.filter(cat => selectedCategoryIds.includes(cat.id.toString()));

              // Filtra las categorías seleccionadas que no están ya presentes en el estado
              const newCategories = selectedCategories.filter(cat => !formData.categories.some(existingCat => existingCat.id === cat.id));

              setFormData(prevData => ({ ...prevData, categories: [...prevData.categories, ...newCategories] }));
            }}
          >
            {categories.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
          <div>
            <h4>Categorías seleccionadas:</h4>
            <ul>
              {formData.categories.map(selectedCategory => (
                <div key={selectedCategory.id}>
                  <li>{selectedCategory.name}</li>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedCategories = formData.categories.filter(cat => cat.id !== selectedCategory.id);
                      setFormData({ ...formData, categories: updatedCategories });
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <label htmlFor="available">Habilidado:</label>
          <input 
            type="checkbox" 
            name="available" 
            checked={formData.available} 
            onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
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