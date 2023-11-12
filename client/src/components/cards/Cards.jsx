import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import Card from '../card/Card';
import s from './Cards.module.css';

export default function Cards() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 24;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={s.containerGlobal}>
      <div className={s.container}>
        {currentProducts.map((product) => (
          <Card
            key={product.id}
            name={product.name}
            price={product.price}
            id={product.id}
            images={product.images[0]?.url || ''}
            productId={product.id}
          />
        ))}
      </div>
      <div className={s.pagination}>
        <button onClick={goToPrevPage} className={s.page}>
          {'<'}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? s.activePage : s.page}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={goToNextPage} className={s.page}>
          {'>'}
        </button>
      </div>
    </div>
  );
}