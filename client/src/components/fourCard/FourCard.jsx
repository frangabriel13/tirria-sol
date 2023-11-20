import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import Card from '../card/Card';
import s from './FourCard.module.css';

export default function FourCard() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  const handleProductSelect = () => {
    console.log('Product selected');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Obtener 4 productos al azar
  const getRandomProducts = (count) => {
    const shuffledProducts = products.sort(() => 0.5 - Math.random()); // Desordena los productos
    return shuffledProducts.slice(0, count); // Toma los primeros 3 productos
  };

  const randomProducts = getRandomProducts(4); // Obtén 4 productos al azar

  return (
    <div className={s.containerGlobal}>
      <div className={s.container}>
        {randomProducts.map((c) => (
          <Card
            name={c.name}
            price={c.price}
            id={c.id}
            images={c.images[0].url}
            key={c.id}
            productId={c.id}
            onSelectProduct={handleProductSelect}
          />
        ))}
      </div>
    </div>
  );
}