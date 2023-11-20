import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../card/Card'; // Asegúrate de importar el componente Card
import { filterProducts, getProducts } from '../../redux/actions/productActions'; // Importa la acción de filtro de productos
import s from './ProductByCategory.module.css'; // Importa el archivo de estilos CSS

const ProductsByCategory = () => {
  const { categoryId } = useParams(); // Obtén el ID de la categoría desde los parámetros de la URL
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch(getProducts());
  // Siempre llama a filterProducts cuando el componente se monta
  dispatch(filterProducts(categoryId));
}, [dispatch, categoryId]);
  
  return (
    <div className={s.productsContainer}>
      <h2 className={s.categoryTitle}>Tienda</h2>
      <div className={s.productList}>
        {products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product.id}
              name={product.name}
              price={product.price}
              id={product.id}
              images={product.images[0]?.url || ''}
              productId={product.id}
            />
          ))
        ) : (
          <h1>No hay productos en esta Categoría</h1>
        )}
      </div>
    </div>
  );
  
};

export default ProductsByCategory;