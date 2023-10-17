import React, { useEffect, useState } from "react";
import s from "./Gallery.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getImages, deleteImage } from "../../../redux/actions/imageActions";
import ImageForm from "./imageForm/ImageForm";

const Gallery = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.image.images);
  const [showForm, setShowForm] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    dispatch(getImages());
  }, []);

  const handleSelect = (id) => {
    const index = selectedImages.indexOf(id);
    if (index === -1) {
      setSelectedImages([...selectedImages, id]);
    } else {
      const newSelectedImages = selectedImages.filter((el) => el !== id);
      setSelectedImages(newSelectedImages);
    }
  };

  const handleDelete = (selectedImages) => {
    selectedImages.forEach((id) => {
      dispatch(deleteImage(id));
    });
    setSelectedImages([]);
  };

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2>Galería de imágenes</h2>
        <button onClick={() => setShowForm(!showForm)}>Agregar</button>
      </div>
      {
        showForm && <ImageForm setShowForm={setShowForm} />
      }
      {
        selectedImages.length > 0 && (
          <div className={s.divSelectedImages}>
            <h3>{`Hay ${selectedImages.length} 
              elemento${selectedImages.length > 1 ? "s" : ""} 
              seleccionado${selectedImages.length > 1 ? "s" : ""}`}</h3>
            <div className={s.divActionImg}>
              <i className={`bi bi-x-lg`} onClick={() => setSelectedImages([])}></i>
              <i className={`bi bi-trash`} onClick={() => handleDelete(selectedImages)}></i>
            </div>
          </div>
        )
      }
      <div className={s.divImages}>
        {
          images.map((el) => (
            <div key={el.id} className={`${s.divImage} ${selectedImages.includes(el.id) ? s.selected : ''}`} >
              <img src={el.url} alt={el.name} onClick={() => handleSelect(el.id)} />
            </div>
          ))
        }
      </div>
    </div>
  );
};


export default Gallery;