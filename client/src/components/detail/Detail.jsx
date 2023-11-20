import React from "react";
import s from './Detail.module.css';
import ProductDetail from "../productDetails/ProductDetails";
import { useLocation } from 'react-router-dom';
import FourCard from "../fourCard/FourCard";

function Detail() {
  const location = useLocation();
  const id = location.pathname.split('/').pop(); // Obtén el último segmento de la URL como el ID
  
console.log(id)

  return (
    <div className={s.container}>
      <ProductDetail productId={id} />
      <FourCard />
    </div>
  )
}


export default Detail;