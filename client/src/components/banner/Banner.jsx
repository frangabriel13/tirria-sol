import React, { useState, useEffect } from "react";
import s from "./Banner.module.css";
import imgOne from "../../assets/2.png";
import imgTwo from "../../assets/3.png";
import imgThree from "../../assets/1.png";

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [imgOne, imgTwo, imgThree];

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  useEffect(() => {
    // Esta función cambiará automáticamente la imagen cada 5 segundos
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000); // Cambia la duración en milisegundos según tus preferencias

    // Limpia el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={s.banner}>
      <div className={s.slider}>
        <img src={images[currentSlide]} alt="Slide" className={s.slideImage} />
        <button className={s.prevButton} onClick={handlePrevSlide}>
          &lt;
        </button>
        <button className={s.nextButton} onClick={handleNextSlide}>
          &gt;
        </button>
      </div>
      <div className={s.navigation}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${s.dot} ${currentSlide === index ? s.activeDot : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Banner;