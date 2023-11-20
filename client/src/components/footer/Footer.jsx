import React from "react";
import s from "./Footer.module.css"; // Importamos el archivo de estilos personalizado

function Footer() {
  return (
    <footer className={s.footerContainer}>
      <div className={s.socialMedia}>
        <a href="https://www.facebook.com/SolFloresModa" target="_blank" rel="noopener noreferrer">
          <i className={`bi bi-facebook ${s.icon}`}></i>
        </a>
        <a href="https://www.instagram.com/sol_flores_md/" target="_blank" rel="noopener noreferrer">
          <i className={`bi bi-instagram ${s.icon}`}></i>
        </a>
        <a href="https://www.tiktok.com/@solflores.tirria" target="_blank" rel="noopener noreferrer">
          <i className={`bi bi-tiktok ${s.icon}`}></i>
        </a>
      </div>
      <div className={s.links}>
        <a href="#">Términos y condiciones</a>
        <a href="#">Política de privacidad</a>
        <a href="#">Acerca de nosotros</a>
        <a href="#">FAQ</a>
      </div>
      <div className={s.copyRight}>
        &copy; {new Date().getFullYear()} Tirria Sol Flores Indumentaria. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;