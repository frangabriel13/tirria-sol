import React, { useEffect, useState } from "react";
import s from "./Gallery.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getImages, deleteImage } from "../../../redux/actions/imageActions";
import ImageForm from "./imageForm/ImageForm";

const Gallery = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.image.images);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getImages());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteImage(id));
  };

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2>Galería de imágenes</h2>
        <button onClick={() => setShowForm(!showForm)}>Agregar</button>
        {
          showForm && <ImageForm setShowForm={setShowForm} />
        }
      </div>
      <div className={s.divImages}>
        {
          images.map((el) => (
            <div key={el.id} className={s.divImage}>
              <img src={el.url} alt={el.name} />
              <button onClick={() => handleDelete(el.id)}>Eliminar</button>
            </div>
          ))
        }
      </div>
    </div>
  );
};


export default Gallery;