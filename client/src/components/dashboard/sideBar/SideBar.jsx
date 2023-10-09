import React from "react";
import s from "./SideBar.module.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className={s.container}>
      <Link to="/">
        <div className={s.toHome}>
          <i className="bi bi-house"></i>
        </div>
      </Link>
      <nav className={s.divNav}>
        <ul className={s.navBar}>
          <li>
            <Link to="/dashboard">
              <div className={s.divItem}>
                <i className="bi bi-bar-chart-line"></i>
                <span>General</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/productos">
              <div className={s.divItem}>
                <i className="bi bi-box"></i>
                <span>Productos</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/configuracion">
              <div className={s.divItem}>
                <i className="bi bi-gear"></i>
                <span>Configuración</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/galeria">
              <div className={s.divItem}>
                <i className="bi bi-images"></i>
                <span>Galería</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/personalizar">
              <div className={s.divItem}>
                <i className="bi bi-palette"></i>
                <span>Personalizar</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};


export default SideBar;