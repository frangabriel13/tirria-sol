import React from "react";
import s from './Detail.module.css';
import ProductDetail from "../productDetails/ProductDetails";
import { useLocation } from 'react-router-dom';
// import CardFour from "../cardsFour/CardFour";

function Detail() {
  const location = useLocation();
  const id = location.pathname.split('/').pop(); // Obtén el último segmento de la URL como el ID
  
console.log(id)

  return (
    <div className={s.container}>
      <ProductDetail productId={id} />
      {/* <CardFour /> */}
    </div>
  )
}


export default Detail;