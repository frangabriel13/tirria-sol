import React from 'react';
import s from './Navbar.module.css';
import img from '../../assets/logoTirriaPng.png';

const Navbar = () => {
  return (
    <nav className={s.navbar}>
      <div className={s.logo}>
        <img src={img} alt="Logo de la empresa" />
      </div>
      <div className={s.menu}>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </div>
      <div className={s.redesociales}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className={`bi bi-facebook ${s.icon}`}></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className={`bi bi-tiktok ${s.icon}`}></i> {/* Cambiado de bi-tiktok a bi-twitter */}
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className={`bi bi-instagram ${s.icon}`}></i>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

