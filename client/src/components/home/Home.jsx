import React from "react";
import s from "./Home.module.css";
import Cards from "../cards/Cards";
import Banner from "../banner/Banner";
import Info from "../Info/Info";
import Categories from "../categories/Categories";
import Footer from "../footer/Footer";


function Home() {
 

  return (
    <div className={s.container}>
      <Banner />
      <Info />
      <Categories />
      <Cards />
      <Footer />  
    </div>
  );
}


export default Home; 