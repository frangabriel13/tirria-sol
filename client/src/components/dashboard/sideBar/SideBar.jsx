import React from "react";
import s from "./SideBar.module.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className={s.container}>
      <div className={s.toHome}>
        <Link to="/home">
          <i className="bi bi-house">
            <span>Inicio</span>
          </i>
        </Link>
      </div>
      <nav className={s.divNav}>
        <ul className={s.navBar}>
          <li>
            <Link to="/dashboard">
              <i className="bi bi-bar-chart-line">
                <span>General</span>
              </i>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/productos">
              <i className="bi bi-box">
                <span>Productos</span>
              </i>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/configuracion">
              <i className="bi bi-gear">
                <span>Configuración</span>
              </i>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/galeria">
              <i className="bi bi-images">
                <span>Galería</span>
              </i>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/personalizar">
              <i className="bi bi-palette">
                <span>Personalizar</span>
              </i>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};


export default SideBar;