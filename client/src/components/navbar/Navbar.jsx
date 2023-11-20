import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Importa useSelector para acceder al estado global
import s from './Navbar.module.css';
import img from '../../assets/logoTirriaPng.png';
import Search from '../search/Search';

const Navbar = () => {
  // Usa useSelector para acceder al estado global
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Calcula la cantidad total de elementos en el carrito
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={s.navbar}>
      <div className={s.logo}>
        <Link to="/">
          <img src={img} alt="Logo de la empresa" />
        </Link>
      </div>
      <div className={s.menu}>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/tienda">Tienda</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </div>

      {/* Coloca el componente Search aquí */}
      <Search />

      <div className={s.cart}>
        {/* Agrega un enlace a la página del carrito */}
        <Link to="/cart">
          <i className={`bi bi-cart ${s.icon}`}></i>
          {/* Muestra la cantidad de elementos en el carrito */}
          {cartCount > 0 && <span className={s.cartCount}>{cartCount}</span>}
        </Link>
      </div>

      <div className={s.redesociales}>
        <a href="https://www.facebook.com/SolFloresModa" target="_blank" rel="noopener noreferrer">
          <i className={`bi bi-facebook ${s.icon}`}></i>
        </a>
        <a href="https://www.tiktok.com/@solflores.tirria" target="_blank" rel="noopener noreferrer">
          <i className={`bi bi-tiktok ${s.icon}`}></i> {/* Cambiado de bi-tiktok a bi-twitter */}
        </a>
        <a href="https://www.instagram.com/sol_flores_md/" target="_blank" rel="noopener noreferrer">
          <i className={`bi bi-instagram ${s.icon}`}></i>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;



