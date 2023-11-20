import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/categoryActions';
import s from './Categories.module.css';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { Link } from 'react-router-dom';

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  console.log(categories)
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    // Cuando el componente se monta, obtén todas las categorías
    dispatch(getCategories());
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    if (categoryId) {
      // Redirige a la página de la categoría seleccionada
      navigate(`/categories/${categoryId}`);
    } else {
      // Si selecciona "Todas las categorías", redirige a la página principal de categorías
      navigate('/categories');
    }
  };

  return (
    <div className={s.categoriesContainer}>
      <h2 className={s.categoryTitle}>Categorías</h2>
      <select
        id="categorySelect"
        className={s.categorySelector}
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Categories;