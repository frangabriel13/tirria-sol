import React from 'react';
import s from './Info.module.css';
import imagen from "../../assets/promo1.png";
import imagen2 from "../../assets/promo2.png";
import imagen3 from "../../assets/promo3.png";


const Info = () => {
  return (
    <div>
    <div className={s.container}>
      <div className={s.iconContainer}>
        <i className={`bi bi-truck ${s.icon}`}></i>
        <span className={s.text}>Envíos a todo el país</span>
      </div>
      <div className={s.separator}></div>
      <div className={s.iconContainer}>
        <i className={`bi bi-credit-card ${s.icon}`}></i>
        <span className={s.text}>Varios métodos de pago</span>
      </div>
      <div className={s.separator}></div>
      <div className={s.iconContainer}>
        <i className={`bi bi-geo-alt ${s.icon}`}></i>
        <span className={s.text}>Bogotá 3412, CABA, Zona Flores</span>
      </div>
    </div>
    <div>
      <img className={s.imgBan} src={imagen} alt="Descripción de la imagen" style={{ width: '100%', height: 'auto' }} />
      <img className={s.imgBan} src={imagen2} alt="Descripción de la imagen" style={{ width: '100%', height: 'auto' }} />
      <img className={s.imgBan} src={imagen3} alt="Descripción de la imagen" style={{ width: '100%', height: 'auto' }} />
    </div>
    <div className={s.instagramer} >
    <i className={`bi bi-instagram ${s.icon}`}> Seguinos en Redes Sociales</i>
    <h1 className={s.tittle}>
          <a
              className={`${s.buttonIg} ${s.tittle}`}
              href="https://www.instagram.com/sol_flores_md/"
              target="_blank"
              rel="noopener noreferrer"
              >
                IG @sol_flores_md
          </a>
          <a
              className={`${s.buttonIg} ${s.tittle}`}
              href="https://www.tiktok.com/@solflores.tirria"
              
              >
                TikTok @solflores.tirria
          </a>

     </h1>  
    
      
    </div>
    </div>
  );
};

export default Info;