import React, { useEffect, useState } from "react";
import s from './Images.module.css';
import { useDispatch, useSelector } from "react-redux";
import { createImage, getImages } from "../../../../redux/actions/imageActions";
import ImageForm from '../../gallery/imageForm/ImageForm';

function Images({ images, setOpenGallery, setImagesData, setFormData, formData }) {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const imagesPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const imagesToDisplay = images.slice(startIndex, endIndex);

  const handleSelect = (id) => {
    const image = images.find((el) => el.id === id);
    const isSelected = selectedImages.some((el) => el.id === id);
  
    if (isSelected) {
      const updatedImages = selectedImages.filter((el) => el.id !== id);
      setSelectedImages(updatedImages);
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleSetImages = () => {
    setImagesData(selectedImages);
    setOpenGallery(false);
    setFormData((prev) => ({ ...prev, images: selectedImages }));
  };

  return(
    <div className={s.container}>
      <h2>Galería</h2>
      <div className={s.divImages}>
        {
          imagesToDisplay.map((el) => (
            <div className={`${s.images}`} key={el.id}
            style={{
              filter: selectedImages.some(img => img.id === el.id) ? 'grayscale(80%)' : 'none',
              border: selectedImages.some(img => img.id === el.id) ? '2px solid #00a65a' : 'none',
            }}>
              <img src={el.url} alt={el.name} onClick={() => handleSelect(el.id)} />
              {/* <button type="button" onClick={() => handleSelect(el.id)}>Seleccionar</button> */}
            </div>
          ))
        }
      </div>
      <div className={s.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= images.length}
        >
          Siguiente
        </button>
      </div>
      <div className={s.divForm}>
        <button className={s.btn} onClick={() => setShowForm(true)} >Subir archivos</button>
        {
          showForm && (
            <ImageForm setShowForm={setShowForm} />
          )
        }
      </div>
      <div className={s.divBtn}>
        <button className={s.btnAdd} onClick={() => handleSetImages()}>Agregar</button>
        <button className={s.btnCancel} onClick={() => setOpenGallery(false)}>Cancelar</button>
      </div>
    </div>
  )
}


export default Images;