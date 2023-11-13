import React from "react";
import s from "./Home.module.css";
import Cards from "../cards/Cards";
import Banner from "../banner/Banner";
import Info from "../Info/Info";
// import Categories from "../categories/Categories";
import ProductDetail from "../productDetails/ProductDetails";

function Home() {
  const productId = 1; // Puedes cambiar esto al ID que desees pasar

  return (
    <div className={s.container}>
      <Banner />
      <Info />
      <ProductDetail productId={productId} />
      <Cards />
      
    </div>
  );
}


export default Home; 