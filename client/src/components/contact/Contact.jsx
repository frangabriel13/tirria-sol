import React from 'react';
import s from './Contact.module.css'; // Importa tu archivo CSS

function Contact() {
  return (
    <div className={s.contactoContainer}> {/* Agrega una clase para el contenedor principal */}
      <div className={s.contactoInfo}>
        <h2 className={s.contactoTitle}>SUCURSAL</h2>
        <p className={s.contactoText}>Emilio Lamarca 343, Flores, CABA</p>
        <p className={s.contactoText}>Cel: 11 2738 6001</p>
        <a className={s.contactoLink} href="mailto:luistirria@gmail.com">luistirria@gmail.com</a>
      </div>

      <div className={s.contactoHorarios}>
        <h2 className={s.contactoTitle}>HORARIOS</h2>
        <ul className={s.contactoList}>
          <li>Lunes: 08:30-15:30</li>
          <li>Martes: 08:30-15:30</li>
          <li>Miércoles: 08:30-15:30</li>
          <li>Jueves: 08:30-15:30</li>
          <li>Viernes: 08:30-15:30</li>
          <li>Sábado: 08:00-13:00</li>
        </ul>
      </div>

      <div className={s.contactoMapa}>
        {/* Aquí puedes insertar tu mapa de Google */}
        {/* Por ejemplo: */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.0258332995327!2d-58.48080742424975!3d-34.628787458822615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc993b9b6e517%3A0xe207297b32af1130!2sEmilio%20Lamarca%20343%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700521737280!5m2!1ses!2sar"
          title="Mapa"
          width="100%"
          height="400"
          frameBorder="0"
          style={{ border: 'none' }} // Utiliza un objeto para definir el estilo
          allowFullScreen={true} // Ajusta allowFullScreen a allowFullScreen
          referrerPolicy="no-referrer-when-downgrade" // Ajusta referrerpolicy a referrerPolicy
        ></iframe>
      </div>

      <div className={s.contactoNavegacion}>
        <h2 className={s.contactoTitle}>NAVEGACIÓN</h2>
        <ul className={s.contactoList}>
          <li>INICIO</li>
          <li>TIENDA</li>
          <li>CATEGORÍAS</li>
          <li>CARRITO</li>
          <li>CONTACTO</li>
        </ul>
      </div>

      <div className={s.socialMedia}>
        <a href="https://www.facebook.com/SolFloresMod" target="_blank" rel="noopener noreferrer">
          <i className={`bi bi-facebook ${s.icon}`}></i>
        </a>
        <a href="https://www.instagram.com/sol_flores_md/" target="_blank" rel="noopener noreferrer">
          <i className={`bi bi-instagram ${s.icon}`}></i>
        </a>
        <a href="https://www.tiktok.com/@solflores.tirria" target="_blank" rel="noopener noreferrer">
          <i className={`bi bi-tiktok ${s.icon}`}></i>
        </a>
      </div>
    </div>
    
  );
}

export default Contact;