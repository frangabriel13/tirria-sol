import React, { useState } from 'react';
import Cards from '../cards/Cards';
import s from './Tienda.module.css';
import Categories from '../categories/Categories';
// import Info from '../info/Info';

function Tienda() {
  // Define el estado para la lista de productos
 
  return (
    <div>
      <h1 className={s.containerTitle}>Tienda</h1>
      <div className={s.container}>
        {/* <Info /> */}
        <Categories />
        <Cards />
      </div>
    </div>
  );
}

export default Tienda;